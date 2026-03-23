#!/usr/bin/env node
/**
 * Onflo Design System — Token Generator
 *
 * Reads Figma variable export JSON files and generates CSS custom properties:
 *   tokens/ref-light.css     — full primitive token set (light mode, :root)
 *   tokens/ref-dark.css      — full primitive token set ([data-theme="dark"])
 *   tokens/design-tokens.css — semantic tokens referencing primitives via var()
 *   tokens/index.css         — single import entry point
 *
 * Two-tier token architecture:
 *   Tier 1  ref-light / ref-dark  → raw values keyed as --ref-*
 *   Tier 2  design-tokens         → semantic aliases via var(--ref-*)
 *                                   Spacing, radius are static (no theme change)
 *                                   so their px values are written directly.
 *
 * Usage:
 *   node scripts/generate-tokens.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── File paths ────────────────────────────────────────────────────────────────

const DOWNLOADS  = path.join(process.env.HOME, 'Downloads');
const LIGHT_PATH = path.join(DOWNLOADS, 'ref 3', 'Light.tokens.json');
const DARK_PATH  = path.join(DOWNLOADS, 'ref 3', 'Dark.tokens.json');
const MODE_PATH  = path.join(DOWNLOADS, 'Mode 1.tokens 3.json');
const OUT_DIR    = path.join(__dirname, '..', 'tokens');

// ── String utils ──────────────────────────────────────────────────────────────

/** Convert any string to kebab-case CSS identifier fragment. */
function kebab(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')   // spaces → hyphens
    .replace(/[^a-z0-9-]/g, ''); // strip non-CSS chars
}

// Font weight name → CSS numeric weight
const WEIGHT_MAP = {
  thin: 100, extralight: 200, light: 300, regular: 400,
  medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900,
};

function fontWeightValue(str) {
  const key = str.toLowerCase().replace(/\s+/g, '');
  return WEIGHT_MAP[key] ?? str; // return numeric or pass through
}

// ── Value helpers ─────────────────────────────────────────────────────────────

/** Render a colour token's $value as a CSS colour string. */
function cssColor(val) {
  if (typeof val !== 'object' || !val.hex) return String(val);
  if (typeof val.alpha === 'number' && val.alpha < 0.9999) {
    const r = Math.round(val.components[0] * 255);
    const g = Math.round(val.components[1] * 255);
    const b = Math.round(val.components[2] * 255);
    const a = parseFloat(val.alpha.toFixed(3));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return val.hex;
}

/** Resolve a Figma alias string like "{typeface.Brand}" → CSS var name. */
function resolveAlias(str) {
  // e.g. "{typeface.weight.Extra Bold}" → "--ref-typeface-weight-extra-bold"
  const match = str.match(/^\{(.+)\}$/);
  if (!match) return null;
  const parts = match[1].split('.').map(kebab);
  return `--ref-${parts.join('-')}`;
}

// ── Ref token key → CSS var name ──────────────────────────────────────────────

/**
 * Map a ref-token key path (array of keys) to a --ref-* CSS var name.
 *
 * Key normalisation rules:
 *   "colors"         stays implicit (becomes "color" prefix)
 *   "corner radius"  → "radius"
 *   "neutrals"       → "neutral"
 *   "Extra Bold"     → "extra-bold"   (via kebab())
 */
function refPathToVar(parts) {
  const top  = parts[0];
  const rest = parts.slice(1);

  if (top === 'colors') {
    const group = rest[0] === 'neutrals' ? 'neutral' : rest[0];
    const name  = rest.slice(1).map(kebab).join('-');
    return `--ref-color-${group}-${name}`;
  }

  if (top === 'corner radius') {
    // Normalise size names: Small→sm, Medium→md, Large→lg, XLarge→xl, Full→full
    const size = kebab(rest[0]);
    const abbrev = { small: 'sm', medium: 'md', large: 'lg', xlarge: 'xl' }[size] ?? size;
    return `--ref-radius-${abbrev}`;
  }

  if (top === 'typeface') {
    return `--ref-typeface-${rest.map(kebab).join('-')}`;
  }

  if (top === 'typescale') {
    return `--ref-typescale-${rest.map(kebab).join('-')}`;
  }

  // shadow, overlay, spacing — straightforward
  return `--ref-${[top, ...rest].map(kebab).join('-')}`;
}

/**
 * Render a ref token's $value as a CSS value string.
 * Handles colour objects, plain numbers (→ px), strings (including aliases).
 */
function refCssValue(token) {
  const type = token.$type;
  const val  = token.$value;

  if (type === 'color')  return cssColor(val);

  if (type === 'number') {
    // "Full" radius → pill shorthand; round to 2dp to avoid float noise
    if (val >= 999) return '9999px';
    const rounded = Math.round(val * 100) / 100;
    return `${rounded}px`;
  }

  if (type === 'string') {
    // Check for Figma alias reference e.g. "{typeface.Brand}"
    if (typeof val === 'string' && val.startsWith('{')) {
      const refVar = resolveAlias(val);
      if (refVar) return `var(${refVar})`;
    }

    // Font weight names get mapped to numeric CSS weights
    const numeric = fontWeightValue(String(val));
    if (typeof numeric === 'number') return String(numeric);

    // Plain string (font family) — wrap in quotes
    return `"${val}"`;
  }

  return String(val);
}

// ── Walk a token file, skip $ keys ───────────────────────────────────────────

/**
 * Recursively walk a Figma token object.
 * Calls onToken(pathParts, token) for each leaf token.
 * Skips keys starting with "$" (internal Figma fields like $type/$value/$extensions).
 */
function walkTokens(obj, pathParts, onToken) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;               // skip internal fields
    if (!value || typeof value !== 'object') continue;

    const next = [...pathParts, key];

    if (value.$type !== undefined) {
      onToken(next, value);                          // leaf token
    } else {
      walkTokens(value, next, onToken);              // group — recurse
    }
  }
}

// ── Ref CSS ───────────────────────────────────────────────────────────────────

const REF_SECTION_ORDER = [
  'colors', 'typeface', 'typescale', 'corner radius',
  'spacing', 'shadow', 'overlay',
];

const REF_SECTION_LABELS = {
  'colors':        'Colour Primitives',
  'typeface':      'Typeface',
  'typescale':     'Type Scale',
  'corner radius': 'Border Radius',
  'spacing':       'Spacing',
  'shadow':        'Shadow',
  'overlay':       'Overlay / Interaction',
};

function buildRefCSS(selector, tokens) {
  // Gather tokens per top-level section
  const sections = {};

  walkTokens(tokens, [], (parts, token) => {
    const section = parts[0];
    if (!sections[section]) sections[section] = [];
    sections[section].push([refPathToVar(parts), refCssValue(token)]);
  });

  const lines = [`${selector} {`];

  const emitted = new Set();
  for (const key of [...REF_SECTION_ORDER, ...Object.keys(sections)]) {
    if (emitted.has(key) || !sections[key]) continue;
    emitted.add(key);
    const label = REF_SECTION_LABELS[key] ?? key;
    lines.push(`\n  /* ── ${label} ${'─'.repeat(Math.max(0, 48 - label.length))} */`);
    for (const [name, value] of sections[key]) {
      lines.push(`  ${name}: ${value};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

// ── Design token CSS ──────────────────────────────────────────────────────────

/**
 * Map a design token path to a semantic CSS var name.
 *   ["surface", "page"]       → --color-surface-page
 *   ["text",    "primary"]    → --color-text-primary
 *   ["spacing", "lg"]         → --spacing-lg
 *   ["radius",  "sm"]         → --radius-sm
 *   ["shadow",  "elevation-1"]→ --shadow-elevation-1
 *   ["overlay", "hovered"]    → --overlay-hovered
 */
function designPathToVar(parts) {
  const top  = parts[0];
  const rest = parts.slice(1).map(kebab).join('-');

  if (top === 'spacing') return rest ? `--spacing-${rest}` : '--spacing';
  if (top === 'radius')  return rest ? `--radius-${rest}`  : '--radius';
  if (top === 'shadow')  return rest ? `--shadow-${rest}`  : '--shadow';
  if (top === 'overlay') return rest ? `--overlay-${rest}` : '--overlay';

  return rest ? `--color-${kebab(top)}-${rest}` : `--color-${kebab(top)}`;
}

/**
 * Resolve a design token's CSS value:
 *   - Colour token with colour ref alias → var(--ref-color-*)
 *   - Number token (spacing / radius)   → raw px  (theme-invariant)
 *   - Shadow / overlay colours          → resolved rgba() (no matching ref var)
 */
function designCssValue(token) {
  const aliasPath = token.$extensions?.['com.figma.aliasData']?.targetVariableName;
  const type      = token.$type;

  if (type === 'color' && aliasPath && aliasPath.startsWith('colors/')) {
    // Map e.g. "colors/neutrals/surface" → var(--ref-color-neutral-surface)
    const parts = aliasPath.split('/');
    return `var(${refPathToVar(parts)})`;
  }

  if (type === 'number') {
    const v = token.$value;
    if (v >= 999) return '9999px';
    const rounded = Math.round(v * 100) / 100;
    return `${rounded}px`;
  }

  // Shadows, overlays, and any unresolved colour → raw value
  return cssColor(token.$value);
}

const DESIGN_SECTION_ORDER = [
  'surface', 'text', 'border', 'spacing', 'radius', 'shadow', 'overlay',
];

const DESIGN_SECTION_LABELS = {
  surface: 'Surface',
  text:    'Text',
  border:  'Border',
  spacing: 'Spacing',
  radius:  'Border Radius',
  shadow:  'Shadow',
  overlay: 'Overlay / Interaction',
};

function buildDesignTokensCSS(tokens) {
  const sections = {};

  walkTokens(tokens, [], (parts, token) => {
    const section = parts[0];
    if (!sections[section]) sections[section] = [];
    sections[section].push([designPathToVar(parts), designCssValue(token)]);
  });

  const lines = [':root {'];

  const emitted = new Set();
  for (const key of [...DESIGN_SECTION_ORDER, ...Object.keys(sections)]) {
    if (emitted.has(key) || !sections[key]) continue;
    emitted.add(key);
    const label = DESIGN_SECTION_LABELS[key] ?? key;
    lines.push(`\n  /* ── ${label} ${'─'.repeat(Math.max(0, 48 - label.length))} */`);
    for (const [name, value] of sections[key]) {
      lines.push(`  ${name}: ${value};`);
    }
  }

  lines.push('}');
  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

const HEADER = `/*
 * Onflo Design System — Generated Tokens
 * ⚠️  Do not edit manually.
 * Regenerate: node scripts/generate-tokens.js
 */\n\n`;

const lightTokens  = JSON.parse(fs.readFileSync(LIGHT_PATH, 'utf8'));
const darkTokens   = JSON.parse(fs.readFileSync(DARK_PATH,  'utf8'));
const designTokens = JSON.parse(fs.readFileSync(MODE_PATH,  'utf8'));

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = {
  'ref-light.css':     HEADER + buildRefCSS(':root',               lightTokens),
  'ref-dark.css':      HEADER + buildRefCSS('[data-theme="dark"]', darkTokens),
  'design-tokens.css': HEADER + buildDesignTokensCSS(designTokens),
  'index.css': HEADER +
    `/**\n` +
    ` * Import this single file in your Angular styles.scss:\n` +
    ` *   @import '~@onflo/tokens/index.css';\n` +
    ` * or in angular.json styles array.\n` +
    ` */\n` +
    `@import './ref-light.css';\n` +
    `@import './ref-dark.css';\n` +
    `@import './design-tokens.css';\n`,
};

for (const [filename, content] of Object.entries(files)) {
  const outPath = path.join(OUT_DIR, filename);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`✓ tokens/${filename}`);
}

console.log('\nDone. Import tokens/index.css in your Angular styles.scss (or angular.json).');
