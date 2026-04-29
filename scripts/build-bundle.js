#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const sources = [
  'tokens/css/ref-light.css',
  'tokens/css/ref-dark.css',
  'tokens/css/design-tokens.css',
  'dist/components.css',
  'dist/layout.css',
];

const parts = sources.map(rel => {
  const file = path.join(root, rel);
  return `/* ── ${rel} ── */\n${fs.readFileSync(file, 'utf8').trim()}`;
});

const out = path.join(root, 'dist/onflo.css');
fs.writeFileSync(out, parts.join('\n\n') + '\n');
console.log(`Built dist/onflo.css (${(fs.statSync(out).size / 1024).toFixed(1)} KB)`);
