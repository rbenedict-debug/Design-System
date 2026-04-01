#!/usr/bin/env node
const sass = require('sass');
const fs   = require('fs');
const path = require('path');

const repoRoot    = path.resolve(__dirname, '..');
const entryPath   = path.resolve(repoRoot, 'components/index.scss');
const previewPath = path.resolve(repoRoot, 'preview/index.html');

const START = '<!-- ONFLO-COMPONENTS:START -->';
const END   = '<!-- ONFLO-COMPONENTS:END -->';

try {
  const result = sass.compile(entryPath, { loadPaths: [repoRoot] });

  const html = fs.readFileSync(previewPath, 'utf8');

  const startIdx = html.indexOf(START);
  const endIdx   = html.indexOf(END);

  if (startIdx === -1 || endIdx === -1) {
    throw new Error('Could not find ONFLO-COMPONENTS sentinel comments in preview/index.html');
  }

  const replacement =
    START + '<style>\n' + result.css + '\n</style>' + END;

  const updated =
    html.slice(0, startIdx) + replacement + html.slice(endIdx + END.length);

  fs.writeFileSync(previewPath, updated, 'utf8');
  console.log('build-preview: preview/index.html updated successfully.');
} catch (err) {
  console.error('build-preview: failed to build preview.', err.message || err);
  process.exit(1);
}
