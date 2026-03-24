#!/usr/bin/env node
/**
 * Onflo Design System — Token Generator
 *
 * Reads Figma variable export JSON files and generates:
 *
 *   tokens/css/
 *     index.css          — CSS entry point (import this in Angular)
 *     ref-light.css      — primitive palette, light mode (:root)
 *     ref-dark.css       — primitive palette, dark mode ([data-theme="dark"])
 *     design-tokens.css  — semantic aliases via var(--ref-*)
 *
 *   tokens/scss/
 *     index.scss         — SCSS entry point (@use this in Angular)
 *     _variables.scss    — SCSS variables wrapping all design tokens
 *     _mixins.scss       — typography mixins for every type scale step
 *
 * ── Two-tier token architecture ──────────────────────────────────────────────
 *
 *   Tier 1  ref-light / ref-dark  → raw Figma values as --ref-* CSS vars
 *   Tier 2  design-tokens         → semantic aliases via var(--ref-*)
 *
 *   Changing a ref value propagates instantly to every design token that
 *   references it — no manual updates required.
 *
 * ── Configuring Figma export paths ───────────────────────────────────────────
 *
 *   By default the script reads from ~/Downloads (where Figma exports land).
 *   Override with the ONFLO_TOKEN_DIR environment variable:
 *
 *     ONFLO_TOKEN_DIR=/path/to/exports node scripts/generate-tokens.js
 *
 *   Expected files inside that directory:
 *     ref 3/Light.tokens.json   ← light mode primitives
 *     ref 3/Dark.tokens.json    ← dark mode primitives
 *     Mode 1.tokens 3.json      ← semantic design tokens
 *
 * ── Usage ─────────────────────────────────────────────────────────────────────
 *
 *   node scripts/generate-tokens.js
 *   npm run generate-tokens
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Input / output paths ──────────────────────────────────────────────────────

const INPUT_DIR  = process.env.ONFLO_TOKEN_DIR ?? path.join(process.env.HOME, 'Downloads');
const LIGHT_PATH = path.join(INPUT_DIR, 'ref 3', 'Light.tokens.json');
const DARK_PATH  = path.join(INPUT_DIR, 'ref 3', 'Dark.tokens.json');
const MODE_PATH  = path.join(INPUT_DIR, 'Mode 1.tokens 3.json');

const REPO_ROOT  = path.join(__dirname, '..');
const CSS_DIR    = path.join(REPO_ROOT, 'tokens', 'css');
const SCSS_DIR   = path.join(REPO_ROOT, 'tokens', 'scss');

// ── String helpers ────────────────────────────────────────────────────────────

function kebab(str) {
  return str.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function camel(str) {
  return str
    .trim()
    .replace(/[-\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, c => c.toLowerCase());
}

const WEIGHT_MAP = {
  thin: 100, extralight: 200, light: 300, regular: 400,
  medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900,
};

function fontWeightValue(str) {
  const key = str.toLowerCase().replace(/\s+/g, '');
  return WEIGHT_MAP[key] ?? str;
}

// ── CSS value helpers ─────────────────────────────────────────────────────────

function cssColor(val) {
  if (typeof val !== 'object' || !val.hex) return String(val);
  if (typeof val.alpha === 'number' && val.alpha < 0.9999) {
    const r = Math.round(val.components[0] * 255);
    const g = Math.round(val.components[1] * 255);
    const b = Math.round(val.components[2] * 255);
    return `rgba(${r}, ${g}, ${b}, ${parseFloat(val.alpha.toFixed(3))})`;
  }
  return val.hex;
}

function resolveAlias(str) {
  const match = str.match(/^\{(.+)\}$/);
  if (!match) return null;
  return `var(--ref-${match[1].split('.').map(kebab).join('-')})`;
}

function refCssValue(token) {
  const { $type: type, $value: val } = token;
  if (type === 'color') return cssColor(val);
  if (type === 'number') {
    if (val >= 999) return '9999px';
    return `${Math.round(val * 100) / 100}px`;
  }
  if (type === 'string') {
    if (typeof val === 'string' && val.startsWith('{')) {
      const ref = resolveAlias(val);
      if (ref) return ref;
    }
    const numeric = fontWeightValue(String(val));
    if (typeof numeric === 'number') return String(numeric);
    return `"${val}"`;
  }
  return String(val);
}

// ── Token path → CSS var name ─────────────────────────────────────────────────

function refPathToVar(parts) {
  const top  = parts[0];
  const rest = parts.slice(1);
  if (top === 'colors') {
    const group = rest[0] === 'neutrals' ? 'neutral' : rest[0];
    return `--ref-color-${group}-${rest.slice(1).map(kebab).join('-')}`;
  }
  if (top === 'corner radius') {
    const size = kebab(rest[0]);
    return `--ref-radius-${{ small: 'sm', medium: 'md', large: 'lg', xlarge: 'xl' }[size] ?? size}`;
  }
  if (top === 'typeface') return `--ref-typeface-${rest.map(kebab).join('-')}`;
  if (top === 'typescale') return `--ref-typescale-${rest.map(kebab).join('-')}`;
  return `--ref-${[top, ...rest].map(kebab).join('-')}`;
}

function designPathToVar(parts) {
  const top  = parts[0];
  const rest = parts.slice(1).map(kebab).join('-');
  if (top === 'spacing') return rest ? `--spacing-${rest}` : '--spacing';
  if (top === 'radius')  return rest ? `--radius-${rest}`  : '--radius';
  if (top === 'shadow')  return rest ? `--shadow-${rest}`  : '--shadow';
  if (top === 'overlay') return rest ? `--overlay-${rest}` : '--overlay';
  return rest ? `--color-${kebab(top)}-${rest}` : `--color-${kebab(top)}`;
}

// ── Token walker ──────────────────────────────────────────────────────────────

function walkTokens(obj, parts, onToken) {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$') || !value || typeof value !== 'object') continue;
    const next = [...parts, key];
    if (value.$type !== undefined) onToken(next, value);
    else walkTokens(value, next, onToken);
  }
}

// ── CSS generation ────────────────────────────────────────────────────────────

const REF_ORDER  = ['colors', 'typeface', 'typescale', 'corner radius', 'spacing', 'shadow', 'overlay'];
const REF_LABELS = {
  colors: 'Colour Primitives', typeface: 'Typeface', typescale: 'Type Scale',
  'corner radius': 'Border Radius', spacing: 'Spacing', shadow: 'Shadow',
  overlay: 'Overlay / Interaction',
};

function buildRefCSS(selector, tokens) {
  const sections = {};
  walkTokens(tokens, [], (parts, token) => {
    const s = parts[0];
    (sections[s] = sections[s] ?? []).push([refPathToVar(parts), refCssValue(token)]);
  });
  const lines = [`${selector} {`];
  for (const key of [...REF_ORDER, ...Object.keys(sections)]) {
    if (!sections[key] || lines.some(l => l.includes(`/* ── ${REF_LABELS[key] ?? key}`))) continue;
    const label = REF_LABELS[key] ?? key;
    lines.push(`\n  /* ── ${label} ${'─'.repeat(Math.max(0, 48 - label.length))} */`);
    sections[key].forEach(([n, v]) => lines.push(`  ${n}: ${v};`));
  }
  lines.push('}');
  return lines.join('\n');
}

const DESIGN_ORDER  = ['surface', 'text', 'border', 'spacing', 'radius', 'shadow', 'overlay'];
const DESIGN_LABELS = {
  surface: 'Surface', text: 'Text', border: 'Border', spacing: 'Spacing',
  radius: 'Border Radius', shadow: 'Shadow', overlay: 'Overlay / Interaction',
};

function designCssValue(token) {
  const alias = token.$extensions?.['com.figma.aliasData']?.targetVariableName;
  if (token.$type === 'color' && alias?.startsWith('colors/')) {
    return `var(${refPathToVar(alias.split('/'))})`;
  }
  if (token.$type === 'number') {
    const v = token.$value;
    return v >= 999 ? '9999px' : `${Math.round(v * 100) / 100}px`;
  }
  return cssColor(token.$value);
}

function buildDesignCSS(tokens) {
  const sections = {};
  walkTokens(tokens, [], (parts, token) => {
    const s = parts[0];
    (sections[s] = sections[s] ?? []).push([designPathToVar(parts), designCssValue(token)]);
  });
  const lines = [':root {'];
  for (const key of [...DESIGN_ORDER, ...Object.keys(sections)]) {
    if (!sections[key] || lines.some(l => l.includes(`/* ── ${DESIGN_LABELS[key] ?? key}`))) continue;
    const label = DESIGN_LABELS[key] ?? key;
    lines.push(`\n  /* ── ${label} ${'─'.repeat(Math.max(0, 48 - label.length))} */`);
    sections[key].forEach(([n, v]) => lines.push(`  ${n}: ${v};`));
  }
  lines.push('}');
  return lines.join('\n');
}

// ── SCSS generation ───────────────────────────────────────────────────────────

function buildScssVariables(designTokens) {
  const sections = {};
  walkTokens(designTokens, [], (parts, token) => {
    const top    = parts[0];
    const cssVar = designPathToVar(parts);

    // SCSS variable name: $surface-page, $text-primary, $spacing-lg, etc.
    const restParts = parts.slice(1).map(kebab);
    const scssName  = restParts.length
      ? `$${kebab(top)}-${restParts.join('-')}`
      : `$${kebab(top)}`;

    let scssValue;
    if (top === 'spacing' || top === 'radius') {
      // Static values — embed directly so SCSS can use them in calc()
      const v = token.$value;
      scssValue = v >= 999 ? '9999px' : `${Math.round(v * 100) / 100}px`;
    } else {
      // Theme-aware — wrap CSS custom property
      scssValue = `var(${cssVar})`;
    }

    (sections[top] = sections[top] ?? []).push([scssName, scssValue]);
  });

  const label = (key) => {
    const map = {
      surface: 'Surface colours', text: 'Text colours', border: 'Border colours',
      spacing: 'Spacing (static px — safe to use in calc())',
      radius: 'Border radius (static px)',
      shadow: 'Shadow colours', overlay: 'Overlay / interaction colours',
    };
    return map[key] ?? key;
  };

  const lines = [
    '// Onflo Design System — SCSS Variables',
    '// Auto-generated. Do not edit manually.',
    '// Regenerate: npm run generate-tokens',
    '//',
    '// Usage:',
    '//   @use \'@onflo/design-system/tokens/scss\' as ds;',
    '//',
    '//   .button {',
    '//     background: ds.$surface-brand-bold;',
    '//     color:      ds.$text-on-brand;',
    '//     padding:    ds.$spacing-sm ds.$spacing-lg;',
    '//     border-radius: ds.$radius-sm;',
    '//   }',
    '',
  ];

  for (const key of [...DESIGN_ORDER, ...Object.keys(sections)]) {
    if (!sections[key] || lines.some(l => l.includes(`// ── ${label(key)}`))) continue;
    lines.push(`// ── ${label(key)} ${'─'.repeat(Math.max(0, 52 - label(key).length))}`);
    sections[key].forEach(([n, v]) => lines.push(`${n}: ${v} !default;`));
    lines.push('');
  }

  return lines.join('\n');
}

function buildScssMixins(refTokens) {
  // Collect typescale entries grouped by scale step
  const steps = {};
  walkTokens(refTokens, [], (parts, token) => {
    if (parts[0] !== 'typescale') return;
    const step = kebab(parts[1]);  // e.g. "display", "title-h1", "body-large"
    const prop = kebab(parts[2]);  // e.g. "font", "weight", "size", "line-height", "tracking"
    (steps[step] = steps[step] ?? {})[prop] = `var(${refPathToVar(parts)})`;
  });

  const CSS_PROP = {
    font: 'font-family', weight: 'font-weight', size: 'font-size',
    'line-height': 'line-height', tracking: 'letter-spacing',
    'weight-prominent': 'font-weight',
  };

  const PROP_ORDER = ['font', 'weight', 'size', 'line-height', 'tracking'];

  const lines = [
    '// Onflo Design System — SCSS Typography Mixins',
    '// Auto-generated. Do not edit manually.',
    '// Regenerate: npm run generate-tokens',
    '//',
    '// Usage:',
    '//   @use \'@onflo/design-system/tokens/scss\' as ds;',
    '//',
    '//   h1 { @include ds.type-title-h1; }',
    '//   p  { @include ds.type-body-medium; }',
    '',
  ];

  for (const [step, props] of Object.entries(steps)) {
    lines.push(`@mixin type-${step} {`);
    const emitted = new Set();
    for (const prop of [...PROP_ORDER, ...Object.keys(props)]) {
      const cssProp = CSS_PROP[prop];
      if (!props[prop] || !cssProp || emitted.has(cssProp)) continue;
      emitted.add(cssProp);
      lines.push(`  ${cssProp}: ${props[prop]};`);
    }
    lines.push('}');
    lines.push('');
  }

  return lines.join('\n');
}

// ── Preview HTML — inline token block ─────────────────────────────────────────

function buildPreviewInlineCSS(lightTokens, darkTokens, designTokens) {
  const I = '      '; // indent inside :root / [data-theme="dark"]

  function refVars(tokens) {
    const out = [];
    walkTokens(tokens, [], (parts, token) => {
      out.push(`${I}${refPathToVar(parts)}: ${refCssValue(token)};`);
    });
    return out.join('\n');
  }

  function designVars(tokens) {
    const out = [];
    walkTokens(tokens, [], (parts, token) => {
      out.push(`${I}${designPathToVar(parts)}: ${designCssValue(token)};`);
    });
    return out.join('\n');
  }

  // Dark mode: all ref overrides + semantic shadow/overlay overrides
  // (shadow/overlay design tokens use direct rgba values, not var(--ref-*),
  //  so they need explicit dark-mode overrides here)
  function darkVars(tokens) {
    const out = [];
    walkTokens(tokens, [], (parts, token) => {
      out.push(`${I}${refPathToVar(parts)}: ${refCssValue(token)};`);
      if (parts[0] === 'shadow' || parts[0] === 'overlay') {
        out.push(`${I}${designPathToVar(parts)}: ${refCssValue(token)};`);
      }
    });
    return out.join('\n');
  }

  return [
    '  <style>',
    '    /* ── Onflo Design Tokens — inlined for self-contained preview ──────────── */',
    '    /* Auto-updated by: npm run generate-tokens                                  */',
    '',
    '    :root {',
    refVars(lightTokens),
    '',
    `${I}/* ── Semantic design tokens ── */`,
    designVars(designTokens),
    '    }',
    '',
    '    [data-theme="dark"] {',
    darkVars(darkTokens),
    '    }',
    '  </style>',
  ].join('\n');
}

function updatePreviewHTML(inlineCSS) {
  const previewPath = path.join(REPO_ROOT, 'preview', 'index.html');
  const START = '<!-- ONFLO-TOKENS:START -->';
  const END   = '<!-- ONFLO-TOKENS:END -->';
  let html = fs.readFileSync(previewPath, 'utf8');
  const si = html.indexOf(START);
  const ei = html.indexOf(END);
  if (si === -1 || ei === -1) {
    console.warn('  ⚠  Token markers not found in preview/index.html — skipping preview update.');
    return;
  }
  html = html.slice(0, si) + START + '\n' + inlineCSS + '\n' + END + html.slice(ei + END.length);
  fs.writeFileSync(previewPath, html, 'utf8');
  console.log('  ✓ preview/index.html  (inline tokens updated)');
}

// ── Main ──────────────────────────────────────────────────────────────────────

const HEADER = `/*
 * Onflo Design System — Generated Tokens
 * ⚠️  Do not edit manually.
 * Regenerate: npm run generate-tokens
 */\n\n`;

// Validate input files exist
for (const [name, p] of [['Light', LIGHT_PATH], ['Dark', DARK_PATH], ['Mode 1', MODE_PATH]]) {
  if (!fs.existsSync(p)) {
    console.error(`\n✗ Missing: ${p}`);
    console.error(`  Set ONFLO_TOKEN_DIR to your Figma export directory.`);
    console.error(`  See CONTRIBUTING.md for the full workflow.\n`);
    process.exit(1);
  }
}

const lightTokens  = JSON.parse(fs.readFileSync(LIGHT_PATH, 'utf8'));
const darkTokens   = JSON.parse(fs.readFileSync(DARK_PATH,  'utf8'));
const designTokens = JSON.parse(fs.readFileSync(MODE_PATH,  'utf8'));

fs.mkdirSync(CSS_DIR,  { recursive: true });
fs.mkdirSync(SCSS_DIR, { recursive: true });

const cssFiles = {
  'ref-light.css':     HEADER + buildRefCSS(':root',               lightTokens),
  'ref-dark.css':      HEADER + buildRefCSS('[data-theme="dark"]', darkTokens),
  'design-tokens.css': HEADER + buildDesignCSS(designTokens),
  'index.css': HEADER +
    `/* Import all Onflo token layers */\n` +
    `@import './ref-light.css';\n` +
    `@import './ref-dark.css';\n` +
    `@import './design-tokens.css';\n`,
};

const scssFiles = {
  '_variables.scss': buildScssVariables(designTokens),
  '_mixins.scss':    buildScssMixins(lightTokens),
  'index.scss': [
    '// Onflo Design System — SCSS entry point',
    '// Auto-generated. Do not edit manually.',
    '',
    "@forward 'variables';",
    "@forward 'mixins';",
    '',
  ].join('\n'),
};

for (const [file, content] of Object.entries(cssFiles)) {
  fs.writeFileSync(path.join(CSS_DIR, file), content, 'utf8');
  console.log(`  ✓ tokens/css/${file}`);
}
for (const [file, content] of Object.entries(scssFiles)) {
  fs.writeFileSync(path.join(SCSS_DIR, file), content, 'utf8');
  console.log(`  ✓ tokens/scss/${file}`);
}

updatePreviewHTML(buildPreviewInlineCSS(lightTokens, darkTokens, designTokens));

console.log('\n✓ Token generation complete.');
console.log('  CSS  → tokens/css/index.css');
console.log('  SCSS → tokens/scss/index.scss');
console.log('  HTML → preview/index.html');
