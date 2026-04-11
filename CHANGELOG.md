# Changelog

All notable changes to the Onflo Design System are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.1.0] — 2026-04-11

### Foundation
- Design token system — two-tier architecture (ref primitives + semantic aliases), light and dark mode, Figma export pipeline via `scripts/generate-tokens.js`
- SCSS variable mirror and typography mixin library (`_variables.scss`, `_mixins.scss`)
- Self-contained visual preview (`preview/index.html`) with token swatches, component demos, and light/dark toggle
- Angular library build via ng-packagr — ships `dist/components.css`, `dist/layout.css`, and ESM bundle
- Motion tokens: `--motion-duration-short` (150ms), `--motion-duration-medium` (200ms), `--motion-duration-long` (300ms)

### Components added
**Actions:** Button, Icon Button, Icon Button Toggle

**Form inputs:** Input, Textarea, Select, Autocomplete, Checkbox, Radio, Toggle, Datepicker, Date Range Picker

**Display:** Icon (Material Symbols Rounded), Badge, Avatar, Label, Chip, Tag, Skeleton, Empty State, Tooltip, Alert, Spinner, Progress, Divider

**Containers:** Card, Card Item, Accordion, Dialog, Modal, Save Bar, Hover Card

**Navigation:** Nav Button, Agent Status, Nav Sidebar, Nav Tab, Top Nav, Nav Expand, Subnav Button, Subnav Header, Subnav Subheader, Tabs, Paginator

**Data / table:** Table Header Cell, Table Row Cell, AG Grid Paginator, Table Toolbar, Column Panel

**Content:** List, Menu, Snackbar, Search, Rich Text Editor

**Utilities:** `ds-sr-only`

### Layout patterns
- `ds-page-layout` — full app shell (nav sidebar + top nav + collapsible subnav + scrollable content area)
- `ds-split-page` — two-panel resizable layout; each panel scrolls independently

### Infrastructure
- AGENT-GUIDE.md for consuming project AI agent integration
- Per-domain component specs under `.claude/specs/`
- Composition patterns guide (`specs-compositions.md`)
- ADA standards documentation
- Preview build script (`scripts/build-preview.js`)
- GitHub Actions CI — build validation on every push and PR

---

## Versioning policy

This package follows [Semantic Versioning](https://semver.org/):
- **Patch** (0.1.x) — bug fixes, visual corrections, no API changes
- **Minor** (0.x.0) — new components or inputs, backwards-compatible
- **Major** (x.0.0) — breaking changes to component APIs or token names

Breaking changes will always include a migration note in this file before the version ships.
