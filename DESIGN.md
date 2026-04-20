# Onflo Design System — Design Reference

This file is the source of truth for Claude Design.
It resolves all design tokens to concrete values so AI tools can use them directly.

For engineering conventions see `CLAUDE.md`. For consuming-project usage see `AGENT-GUIDE.md`.

---

## Brand

**Product:** Onflo — a B2B SaaS platform for K–12 education support teams.
**Tone:** Professional, clear, data-dense. No decorative flourishes. Interfaces carry real workload.
**Font:** Proxima Nova (400 regular, 500 medium, 600 semi-bold, 700 bold)
**Icons:** Material Symbols Rounded — variable font, FILL axis controls outlined (0) vs filled (1)

---

## Color Palette

### Brand

| Role | Hex | Usage |
|---|---|---|
| Brand Blue | `#0B6EB4` | Primary actions, active nav, links, brand accents |
| Brand Blue bg | `#EEFAFF` | Tinted surface behind brand elements |
| Brand Blue nav bg | `#F5F8FC` | Navigation sidebar background |
| Light Blue | `#43ADF2` | Focus ring, hover borders, info icons |
| Light Blue bg | `#EEFAFF` | Info surface |
| Navy | `#0B3057` | Navy accent text/icons |
| Navy bg | `#EEF2F7` | Navy tinted surface |

### Neutrals

| Role | Hex | Usage |
|---|---|---|
| Text Primary | `#2D3638` | Body copy, headings, default text |
| Text Secondary | `#73737F` | Subtext, placeholders, subtle labels |
| Text Disabled | `#9F9F9F` | Disabled text and icons |
| Border Primary | `#9F9F9F` | Default input borders |
| Border Soft | `#CACACA` | Secondary borders |
| Border Subtle | `#E9E9E9` | Dividers, table grid lines |
| Surface White | `#FFFFFF` | Cards, inputs, overlays, modal backgrounds |
| Surface Default | `#F6F6F6` | Elevated surface (cards on a page) |
| Surface Soft | `#FCFCFC` | Subtly elevated surface |
| Black (tooltip) | `#000000` | Tooltip background |

### Semantic / Status

| Role | Default hex | Background hex | Usage |
|---|---|---|---|
| Error / Red | `#D70917` | `#FFF2F2` | Error states, destructive actions |
| Warning / Yellow | `#FFBF00` | `#FFF3D8` | Warning states |
| Success / Green | `#45A55F` | `#EEFCE4` | Success states |
| Info / Light Blue | `#43ADF2` | `#EEFAFF` | Informational states |

### Accent Palette (tags, charts, badges)

| Name | Default hex | Background hex |
|---|---|---|
| Teal | `#159B8E` | `#EDFAF8` |
| Orange | `#EB6E08` | `#FFF4EC` |
| Purple | `#622682` | `#F7EFFE` |
| Pink | `#E91E63` | `#FFF0F5` |

### Dark Surface Overrides (dark-surface contexts only)

| Role | Value |
|---|---|
| Error text on dark | `#FF4D55` |
| Error border on dark | `#FF4D55` |
| Error surface on dark | `#2A1215` |
| Border subtle on dark | `rgba(255,255,255,0.15)` |

### Interaction Overlays (semi-transparent tints over filled surfaces)

| State | Value |
|---|---|
| Hovered | `rgba(67,173,242,0.08)` |
| Pressed | `rgba(67,173,242,0.12)` |
| Focused | `rgba(67,173,242,0.12)` |
| Dragged | `rgba(67,173,242,0.16)` |

---

## Typography

**Font family:** Proxima Nova (all styles)

| Style | Size | Line height | Weight | Letter spacing |
|---|---|---|---|---|
| Display | 48px | 56px | 700 | −0.5px |
| H1 | 24px | 28px | 600 | 0 |
| H2 | 20px | 28px | 600 | 0 |
| H3 | 16px | 24px | 600 | 0.15px |
| H4 | 14px | 20px | 600 | 0.1px |
| Body Large | 16px | 24px | 400 (500 prominent) | 0.15px |
| Body Medium | 14px | 20px | 400 (500 prominent) | 0.25px |
| Body Small | 12px | 16px | 400 (500 prominent) | 0.4px |
| Label Large | 16px | 16px | 500 (600 prominent) | 0.1px |
| Label Medium | 14px | 14px | 500 (600 prominent) | 0.25px |
| Label Small | 12px | 12px | 500 (600 prominent) | 0.4px |

---

## Spacing Scale

| Token | Value | Common use |
|---|---|---|
| xs | 4px | Tight gaps (icon + label, chip padding) |
| sm | 8px | Default component internal gap |
| md | 12px | Form field internal padding |
| lg | 16px | Component-to-component gap |
| xl | 24px | Section internal padding |
| page | 48px | Page-level margins |

---

## Border Radius

| Token | Value | Use |
|---|---|---|
| sm | 6px | Chips, tags, small badges |
| md | 8px | Inputs, buttons, cards (default) |
| lg | 16px | Dialogs, modals, panels |
| xl | 24px | Large cards |
| full | 9999px | Pill shapes, avatars |

---

## Elevation / Shadow

Shadows use `rgba(65,65,65,N)` — a neutral dark at varying opacity.

| Level | Opacity | Use |
|---|---|---|
| Elevation 1 | 0.06 | Cards floating on page background |
| Elevation 2 | 0.10 | Dropdowns, popovers |
| Elevation 3 | 0.12 | Dialogs, modals |

---

## Motion

| Token | Value | Use |
|---|---|---|
| Short | 150ms | Micro-interactions (hover, toggle) |
| Medium | 200ms | Component transitions (expand, reveal) |
| Long | 300ms | Page-level transitions |

Easing: standard ease-in-out. Always respect `prefers-reduced-motion`.

---

## Icons

**Set:** Material Symbols Rounded
**FILL axis:** 0 = outlined (default), 1 = filled

| Size class | px | Use |
|---|---|---|
| xs | 16px | Dense data cells |
| sm | 20px | Form field adornments, compact UI |
| default | 24px | Standard buttons, nav items |
| lg | 32px | Section headers |
| xl | 40px | Empty-state illustrations |

---

## Layout

### App shell

```
┌──────────────────────────────────────────┐
│  Top Nav (65px)                          │
├──────┬───────────────────────────────────┤
│ Nav  │  Sub-nav (195px, optional)  │ Page│
│ Rail │                             │ Area│
│ 80px │                             │     │
└──────┴─────────────────────────────────-─┘
```

- **Nav sidebar:** 80px wide icon rail — nav buttons + agent status toggle at bottom
- **Subnav panel:** 195px — collapsible section headers, leaf nav buttons
- **Top nav:** 65px — document tabs + action buttons
- **Page content:** fills remaining width; 48px horizontal page margin
- **No mobile breakpoints** — Onflo redirects mobile users to a native app

### Breakpoints (desktop-only)

| Name | px | Viewport |
|---|---|---|
| md | 1024px | Landscape tablet / small laptop (minimum) |
| lg | 1280px | Standard laptop |
| xl | 1440px | Large desktop |
| 2xl | 1920px | Ultrawide |

---

## Component Inventory

### Forms

| Component | Selector | Variants / Notes |
|---|---|---|
| Input | `ds-input` | Default, error, disabled, readonly; fixed 42px height; label + helper + error slots |
| Textarea | `ds-textarea` | Same states as input; resizable |
| Select | `ds-select` | Dropdown panel styled to match input |
| Autocomplete | `ds-autocomplete` | Consumer owns filtering; panel ref passed via `[panel]` |
| Datepicker | `ds-datepicker` | Single date; calendar popup; same field height as input |
| Date range picker | `ds-date-range-picker` | Start + end date inputs in one field |
| Checkbox | `ds-checkbox` | Default, checked, indeterminate, disabled |
| Radio + group | `ds-radio` + `ds-radio-group` | Standard radio button set |
| Toggle | `ds-toggle` | On/off slide toggle |

### Actions

| Component | Selector | Variants / Notes |
|---|---|---|
| Button | `ds-button` | Filled (primary), outlined (secondary), text (tertiary); sizes: sm / md / lg; states: default / hover / active / disabled / loading; icon-left / icon-right / icon-only |
| Button Group | `ds-button-group` | Inline-flex wrapper for segmented button sets |
| Icon Button | `ds-icon-button` | Icon-only; always requires aria-label |

### Display

| Component | Selector | Variants / Notes |
|---|---|---|
| Badge | `ds-badge-indicator` | Numeric or dot; uses matBadge directive |
| Alert | `ds-alert` | Info / success / warning / error; inline only |
| Tooltip | `ds-tooltip` | matTooltip; single line, dark bg |
| Avatar | `ds-avatar` | Image or initials; sizes: sm / md / lg |
| Progress bar | `ds-progress` | Determinate / indeterminate |
| Spinner | `ds-spinner` | Circular; sizes: sm / md / lg |
| Skeleton | `ds-skeleton` | Loading placeholder; aria-busy pattern |
| Empty state | `ds-empty-state` | Zero-data state; sizes: sm / lg; layouts: vertical / horizontal; optional action slot |
| Tabs | `ds-tabs` | Horizontal tab bar; keyboard navigable |
| Card | `ds-card` | Outlined / elevated variants |
| Card item | `ds-card-item` | Compact 56px horizontal card |
| Accordion | `ds-accordion` | Collapsible section; mat-expansion-panel |
| Chip | `ds-chip` | Filter / input chip; removable |
| Tag | `ds-tag` | Navy bg + white text; md (32px) / sm (24px); read-only / removable / add variants |
| Divider | `ds-divider` | Horizontal line |
| List | `ds-list` | mat-list; supports leading icon / avatar / meta |
| Paginator | `ds-paginator` | Page navigation; items-per-page selector |
| Snackbar | `ds-snackbar` | Bottom toast; info / success / error |
| Label | `ds-label` | Display-only status tag (not a form label) |
| Hover card | `ds-hover-card` | Cursor-following floating card |
| Save bar | `ds-save-bar` | Unsaved-changes bar; default (blue) / error (red) |
| Rich text editor | `ds-rich-text-editor` | CKEditor 5 wrapper; custom toolbar |

### Overlays

| Component | Selector | Variants / Notes |
|---|---|---|
| Dialog | `ds-dialog` | Left-aligned only; body + actions content slots |
| Modal | `ds-modal` | Full-featured; sticky header; scrollable body; tabs slot; close or collapse dismiss; fixed (500px) / full-width sizes |
| Menu | `ds-menu` | Context / dropdown menu; mat-menu base |

### Navigation

| Component | Selector | Notes |
|---|---|---|
| Nav sidebar | `ds-nav-sidebar` | 80px icon rail; composes nav-button + agent-status |
| Nav button | `ds-nav-button` | Rail nav item primitive |
| Agent status | `ds-agent-status` | Online/offline toggle at bottom of rail |
| Top nav | `ds-top-nav` | 65px bar; document tabs + action buttons |
| Nav tab | `ds-nav-tab` | Browser-style document tab; `[more]` collapses to "..." |
| Nav expand | `ds-nav-expand` | Sub-nav panel open/close toggle |
| Subnav header | `ds-subnav-header` | Top-level collapsible section header in subnav |
| Subnav subheader | `ds-subnav-subheader` | Settings subnav only — expandable group within a header |
| Subnav button | `ds-subnav-button` | Leaf nav item; selected = brand blue bg + white text |

### Filtering

Always use both components together — `ds-filter` is the slide-over modal and `ds-filter-bar` is the applied-filters strip that sits between the toolbar and the table. `ds-filter-bar` is hidden when no filters are active.

| Component | Selector | Notes |
|---|---|---|
| Filter modal | `ds-filter` | Slide-over panel; filter groups containing checkboxes, date ranges, numeric ranges; supports saved filter sets (namespaced per page via `savedSetsKey`) |
| Applied filters bar | `ds-filter-bar` | Horizontal strip of active filter chips; hidden when filter count is 0; each chip is removable |

### Data / Dashboard

| Component | Selector | Notes |
|---|---|---|
| Chart | `ds-chart` | Highcharts wrapper; types: line / area / bar / column / donut / pie; Onflo palette baked in |
| Metric card | `ds-metric-card` | KPI tile; value + label + icon + trend; default / brand variants |

### Table (AG Grid)

| Component | Role |
|---|---|
| `ds-table-header-cell` | Custom AG Grid header renderer |
| `ds-table-row-cell` | Custom AG Grid cell renderer |
| `ds-table-toolbar` | Search + filter + column panel toggle bar above grid |
| `ds-column-panel` | Custom AG Grid tool panel — density, visibility, groups, values |
| `ds-ag-paginator` | Custom AG Grid pagination panel |
| `ds-table-status-bar` | Aggregate row above paginator (sum, avg, count, min, max) |
| `ds-table-context-menu` | Right-click overlay for header + row cells |
| `ds-table-row-groups-bar` | Drag target for row group chips between toolbar and header |
| `ds-table-group-row-cell` | Group row renderer for `groupDisplayType: 'groupRows'` |
| `onfloTheme` | Pre-configured AG Grid theme (Quartz + Material icons + Onflo tokens) |

### Layout (CSS-only)

| Pattern | Selector | Notes |
|---|---|---|
| Page layout | `ds-page-layout` | App shell: top nav + rail + subnav + content area |
| Split page | `ds-split-page` | Two-pane resizable layout; CDK drag for resize handle |

---

## Design Conventions

- **No mobile layouts** — minimum viewport is 1024px
- **Focus ring** — always `box-shadow: 0 0 0 3px #43ADF2`; never outline or border
- **Destructive actions** — always paired with a non-destructive primary button; never the sole CTA
- **Dialog alignment** — left-aligned only; no centered dialogs
- **Icon buttons** — always carry an accessible label; never unlabelled
- **Heading on every page** — every page has an `h1`; visually hide it with `ds-sr-only` if the page has no visible title (e.g. inbox, ticket view)
- **Surface hierarchy**: page floor (`#F6F6F6` effectively `#FFFFFF` via token) → elevated card (`#F6F6F6`) → overlay (`#FFFFFF`)
- **Dark surface** is a scoped context (e.g. dark panels, banners), not a full dark mode theme
