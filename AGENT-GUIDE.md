# Onflo Design System — Agent Guide

This file is loaded by Claude Code sessions in consuming projects. It defines the rules
for how the design system must be used. Read it fully before generating any UI code.

---

## CRITICAL: This package is read-only

**Never create, edit, delete, or modify any file inside `node_modules/@onflo/design-system/`.**
Never suggest that a team member modify the design system files from within their project.
All design system changes go through the Onflo Design System repository directly (owned by Rebecca).

---

## What this design system is

The Onflo Design System is the single source of truth for all UI in Onflo products.
It is built on **Angular (standalone components)** with **Angular Material** as the behavioral
foundation, and **.NET Core** on the backend. Every visual decision — color, spacing, typography,
radius, shadow, interaction states — is expressed as a CSS design token.

---

## Installation

The package is distributed via GitHub Packages under the `@onflo` scope.

**1. Add to your project's `.npmrc`** (create if it doesn't exist):
```
@onflo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` should be a GitHub Personal Access Token with `read:packages` scope,
set as an environment variable or in your CI secrets.

**2. Install:**
```bash
npm install @onflo/design-system
```

**3. Add to your project's `CLAUDE.md`:**
```
@node_modules/@onflo/design-system/AGENT-GUIDE.md
```

---

## Non-negotiable rules

### 1. Always use design tokens — no exceptions

**Never hardcode any visual value.** This includes:
- Colors: no hex (`#0B6EB4`), no rgb/rgba, no named colors (`blue`)
- Spacing: no raw `px` or `rem` values — use `--spacing-*`
- Typography: no raw font sizes — use `--ref-typescale-*` or `@include ds.type-*` mixins
- Radius: no raw `border-radius` values — use `--radius-*`
- Shadows: no raw `box-shadow` values — use `--shadow-elevation-*`

**Always use:**
```scss
// CSS custom properties (anywhere)
color: var(--color-text-primary);
background: var(--color-surface-page);
padding: var(--spacing-lg);
border-radius: var(--radius-md);

// SCSS variables (in .scss files, after @use)
@use '@onflo/design-system/tokens/scss/variables' as ds;
color: ds.$text-primary;
```

**Token reference — prefix meanings:**
| Prefix | Purpose |
|---|---|
| `--color-surface-*` | Backgrounds and fills |
| `--color-text-*` | All text |
| `--color-border-*` | Borders, dividers, focus rings |
| `--color-icon-*` | Icon colors |
| `--overlay-*` | Hover/pressed/focused interaction tints |
| `--spacing-*` | Padding, margin, gap (xs=4px, sm=8px, md=12px, lg=16px, xl=24px) |
| `--radius-*` | Border radii (sm, md, lg, full) |
| `--shadow-elevation-*` | Box shadows (1–3) |
| `--ref-typescale-*` | Typography scale (never reference directly in components — use semantic tokens) |

### 2. Always use existing components when they exist

Before writing any UI element from scratch, check the component list below.
If a matching component exists, use it — do not recreate it.

**How to import:**
```typescript
import { DsButtonComponent } from '@onflo/design-system';
import { DsInputComponent } from '@onflo/design-system';
// etc.
```

**Every component also has a CSS class API** (no Angular required):
```html
<button class="ds-button ds-button--filled">Label</button>
```

### 3. When a component does not exist

If you are helping explore a new design pattern that has no matching component:
- You **may** create a new component for that project
- You **must still use design tokens** for all visual values — no exceptions
- Note in your output that this is a candidate for the Onflo Design System
- Rebecca will evaluate it for addition to the system

### 4. Focus rings — always keyboard-only

Always use:
```scss
&:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
```
Never `outline`. Never `:focus` alone. Never `border-color` as the focus indicator.

For composite wrappers using `:focus-within`:
```scss
&:focus-within:not([data-mouse-focus]) { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
```

### 5. Dark mode

Apply `data-theme="dark"` to `<html>`. All `--color-*` tokens update automatically.
Never write separate dark-mode rules — the token system handles it.

---

## Component library

All components are Angular standalone components with a matching CSS class API.
BEM naming: `.ds-{component}`, `.ds-{component}__{element}`, `.ds-{component}--{modifier}`.

### Form inputs
| Component | Selector | Import |
|---|---|---|
| Text input | `<ds-input>` | `DsInputComponent` |
| Textarea | `<ds-textarea>` | `DsTextareaComponent` |
| Select dropdown | `<ds-select>` | `DsSelectComponent` |
| Autocomplete | `<ds-autocomplete>` | `DsAutocompleteComponent` |
| Checkbox | `<ds-checkbox>` | `DsCheckboxComponent` |
| Radio / group | `<ds-radio>`, `<ds-radio-group>` | `DsRadioComponent` |
| Toggle / switch | `<ds-toggle>` | `DsToggleComponent` |
| Date picker | `<ds-datepicker>` | `DsDatepickerComponent` |
| Date range picker | `<ds-date-range-picker>` | `DsDateRangePickerComponent` |

### Actions
| Component | Selector | Import |
|---|---|---|
| Button | `<ds-button>` | `DsButtonComponent` |
| Icon button | `<ds-icon-button>` | `DsIconButtonComponent` |
| Icon button toggle | use `ds-icon-button-toggle` class | `DsIconButtonToggleComponent` |

### Display
| Component | Selector | Import |
|---|---|---|
| Icon (Material Symbols Rounded) | `<ds-icon>` or `<span class="ds-icon">` | `DsIconComponent` |
| Badge indicator | `<ds-badge>` | `DsBadgeComponent` |
| Label (display tag) | `<ds-label>` | `DsLabelComponent` |
| Tag (removable/add/more) | `<ds-tag>` | `DsTagComponent` |
| Chip | `<ds-chip>` | `DsChipComponent` |
| Avatar | `<ds-avatar>` | `DsAvatarComponent` |
| Alert | `<ds-alert>` | `DsAlertComponent` |
| Tooltip | `[dsTooltip]` directive | `DsTooltipDirective` |
| Skeleton | `<ds-skeleton>` | `DsSkeletonComponent` |
| Empty state | `<ds-empty-state>` | `DsEmptyStateComponent` |
| Spinner | `<ds-spinner>` | `DsSpinnerComponent` |
| Progress bar | `<ds-progress>` | `DsProgressComponent` |
| Divider | `<ds-divider>` | `DsDividerComponent` |

### Layout & containers
| Component | Selector | Import |
|---|---|---|
| Card (vertical) | `<ds-card>` | `DsCardComponent` |
| Card item (horizontal) | `<ds-card-item>` | `DsCardItemComponent` |
| Dialog | `<ds-dialog>` | `DsDialogComponent` |
| Modal | `<ds-modal>` | `DsModalComponent` |
| Accordion | `<ds-accordion>` | `DsAccordionComponent` |
| Hover card | `<ds-hover-card>` | `DsHoverCardComponent` |
| Save bar | `<ds-save-bar>` | `DsSaveBarComponent` |

### Navigation

> **Import name pattern:** Navigation primitives export **without** the `Ds` prefix —
> e.g. `NavButtonComponent`, not `DsNavButtonComponent`. This is intentional and differs from
> form/display components (`DsButtonComponent`, `DsInputComponent`) which do use the prefix.
> Always copy the Import column below exactly — do not add or remove the prefix.

> **Shell components use the CSS class API — do not import as Angular components:**
> `ds-nav-sidebar` → `<nav class="ds-nav-sidebar">` (not `<ds-nav-sidebar>`) — `NavSidebarComponent` is **never imported** in consuming projects.
> `ds-top-nav` → `<header class="ds-top-nav">` (not `<ds-top-nav>`) — `TopNavComponent` is **never imported** in consuming projects.
> Only the inner primitives in the table below are used as Angular selectors.

| Component | Selector | Import |
|---|---|---|
| Tabs | `<ds-tabs>` + `<ds-tab>` | `DsTabsComponent` |
| Nav tab (in top-nav) | `<ds-nav-tab>` | `NavTabComponent` |
| Nav button (in sidebar) | `<ds-nav-button>` | `NavButtonComponent` |
| Nav expand (subnav toggle) | `<ds-nav-expand>` | `NavExpandComponent` |
| Sub-nav button | `<ds-subnav-button>` | `SubnavButtonComponent` |
| Sub-nav header | `<ds-subnav-header>` | `SubnavHeaderComponent` |
| Sub-nav subheader *(settings only)* | `<ds-subnav-subheader>` | `SubnavSubheaderComponent` |
| Agent status (in sidebar) | `<ds-agent-status>` | `AgentStatusComponent` |
| Paginator | `<ds-paginator>` | `DsPaginatorComponent` |

### Data / table

> **AG Grid prerequisite check — do this before writing any table code.**
> `ds-table-header-cell`, `ds-table-row-cell`, `ds-ag-paginator`, and `ds-table-toolbar` are AG Grid custom renderers. They require a real AG Grid instance.
>
> **Step 1 — Check `package.json` for `ag-grid-angular`.**
> - **Found** → proceed to the wiring pattern below.
> - **Not found** → install Community (free) edition before writing any table code:
>   ```bash
>   npm install ag-grid-community ag-grid-angular
>   ```
>   Then add AG Grid's structural CSS to the `styles` array in `angular.json`:
>   ```json
>   "styles": [
>     "node_modules/ag-grid-community/styles/ag-grid.css",
>     "node_modules/ag-grid-community/styles/ag-theme-quartz.css"
>   ]
>   ```
>   **Never install `ag-grid-enterprise`** — it is a paid product. Only install it if the user explicitly asks for it.
>
> **Step 2 — Confirm the AG Grid CSS is in `angular.json`.** Even if `ag-grid-angular` is already in `package.json`, the styles entries may be missing. Without them the grid renders with no visible structure. If they are absent, add them before writing table code.

| Component | Selector | Import |
|---|---|---|
| Table header cell | `<ds-table-header-cell>` | `DsTableHeaderCellComponent` |
| Table row cell | `<ds-table-row-cell>` | `DsTableRowCellComponent` |
| Table toolbar | `<ds-table-toolbar>` | `DsTableToolbarComponent` |
| AG Grid paginator | `<ds-ag-paginator>` | `DsAgPaginatorComponent` |

### Filtering

Full filter system for table pages. Always use both components together — `ds-filter` is the modal and `ds-filter-bar` is the applied-filters strip that appears between the toolbar and the table.

| Component | Selector | Import |
|---|---|---|
| Filter modal | `<ds-filter>` | `DsFilterComponent` |
| Applied filters bar | `<ds-filter-bar>` | `DsFilterBarComponent` |

**Also import these types from `@onflo/design-system`:**

| Type | Purpose |
|---|---|
| `FilterGroup` | Top-level filter group definition (icon, label, options or tiers) |
| `FilterTier` | Sub-section within a group (checkbox list, date-range, cost-range, numeric-range) |
| `FilterOption` | A single selectable option `{ id, label }` |
| `FilterSelection` | Committed selection state — emitted by `ds-filter`, consumed by `ds-filter-bar` |
| `SavedFilterSet` | A named saved filter set stored in localStorage |
| `EMPTY_FILTER_SELECTION` | Use as the default value for `filterSelection` |
| `getActiveFilterCount` | Returns total active filter count from a `FilterSelection` |

**Canonical wiring — always use this exact pattern for filtered table pages:**

```html
<div class="ds-page-content__main ds-page-content__main--table"
     [attr.data-panel-open]="settingsActive || null">

  <ds-table-toolbar
    [(filterActive)]="filterOpen"
    [filterBadgeCount]="filterCount"
    [(settingsActive)]="settingsActive"
  />

  <ds-filter-bar
    [hidden]="filterCount === 0"
    [selection]="filterSelection"
    [groups]="filterGroups"
    (selectionChange)="onFilterSelectionChange($event)"
    (filterClick)="filterOpen = true"
  />

  <ag-grid-angular class="ds-ag-grid ag-theme-quartz" ... />
  <ds-ag-paginator [api]="gridApi" />
  <ds-column-panel [api]="gridApi" [(density)]="density" />

</div>

<ds-filter
  [(open)]="filterOpen"
  [groups]="filterGroups"
  [(selection)]="filterSelection"
  [savedSetsKey]="'onflo-filter-sets-{context}'"
  (filterCountChange)="filterCount = $event"
/>
```

Replace `{context}` in `savedSetsKey` with a unique, lowercase slug for the page (e.g. `onflo-filter-sets-assets`, `onflo-filter-sets-contacts`). This namespaces saved sets per page so users don't see sets from other contexts.

Full component class wiring and group configuration reference: `.claude/specs/specs-filter.md`
Full composition rules: `.claude/specs/specs-compositions.md` → "Filtered Table Page"

#### AG Grid wiring — always use this pattern

> **Reminder**: Only reach this section after completing the prerequisite check above — packages installed, AG Grid CSS confirmed in `angular.json`.

Any time you create or modify an AG Grid table in a consuming project, ALWAYS use the pre-built exports from the design system. Do not set `headerComponent` or `cellRenderer` manually — use `DS_TABLE_DEFAULT_COL_DEF` which does this for you.

**Minimum required setup:**
```typescript
import {
  onfloTheme,
  DS_TABLE_DEFAULT_COL_DEF,
  DS_TABLE_COLUMN_TYPES,
} from '@onflo/design-system';

// In gridOptions:
theme: onfloTheme,
defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
columnTypes: DS_TABLE_COLUMN_TYPES,
suppressPaginationPanel: true,
suppressContextMenu: true,
suppressHeaderContextMenu: true,
```

**Column panel density — required bindings:**

`ds-column-panel` contains a density toggle (Comfort / Compact). Wire it so the toggle actually
updates the grid row heights. Without these bindings the toggle renders but has no effect:

```typescript
// Component class:
density: 'comfort' | 'compact' = 'comfort';

onDensityChange(value: 'comfort' | 'compact'): void {
  this.density = value;
  this.gridApi?.resetRowHeights();
  // Re-fit columns after ~300ms (CSS transition completes)
  setTimeout(() => this.gridApi?.sizeColumnsToFit(), 300);
}
```

```html
<!-- Template — always include [(density)] and (densityChange) -->
<ds-column-panel
  [api]="gridApi"
  [(density)]="density"
  (densityChange)="onDensityChange($event)"
/>
```

**Column type shortcuts** (`type: 'dsCheckbox'` etc.):
- `dsCheckbox` — 56px fixed checkbox column; pair with `rowSelection: 'multiple'`
- `dsNumeric` — right-aligned + number filter; add `aggFunc: 'sum'` per-column for totals
- `dsDate` — date filter with ISO string comparator
- `dsGroupable` — enables the column in the row groups picker (Enterprise)
- `dsPinned` — pins right, locked, no resize; use for action button columns

Full integration pattern with template, component class, and all options is in `.claude/specs/specs-table.md` → "Angular Integration — Canonical Wiring Pattern".

### Dashboard

> **Highcharts prerequisite check — do this before writing any dashboard chart code.**
> `ds-chart` wraps Highcharts. The library is NOT bundled — it is a peer dependency.
>
> **Step 1 — Check `package.json` for `highcharts`.**
> - **Found** → proceed.
> - **Not found** → install before writing any chart code:
>   ```bash
>   npm install highcharts
>   ```
>   **Never install `highcharts-angular`** — the DS ships its own wrapper; no extra dep is needed.
>
> **Step 2 — Never call `Highcharts.setOptions()` from app code.** `DsChartComponent` applies `onfloChartTheme` automatically on first render. Calling it again from the app will override the Onflo theme.

| Component | Selector | Import |
|---|---|---|
| Chart (Highcharts wrapper) | `<ds-chart>` | `DsChartComponent` |
| Metric card (KPI tile) | `<ds-metric-card>` | `DsMetricCardComponent` |
| Dashboard toolbar | `<ds-dashboard-toolbar>` | `DsDashboardToolbarComponent` |

**Dashboard page structure — three required classes (always together):**

1. `ds-page-content--dashboard` on `<main>` — removes `gap` so the canvas uses negative margins correctly
2. `ds-page-content__dashboard-header` wrapper around `__heading` + toolbar — keeps heading and toolbar stationary while the tile canvas scrolls
3. `ds-page-content__main--dashboard` for the tile canvas — strips the card shell so metric cards and chart tiles float directly on the page surface

Never use plain `ds-page-content__main` on a dashboard — it wraps the tiles in a card, creating a double-layer effect. Always use `--dashboard`.

**`ds-dashboard-toolbar` in the page shell — omit `[title]` and `[subtitle]`:**

In the canonical page layout, the page title lives in `ds-page-content__heading` (`<h1 class="ds-page-content__title">`). Do not also pass `[title]` to `<ds-dashboard-toolbar>` — that renders a second `<h1>` inside the toolbar (`__identity` block), breaking heading hierarchy. The toolbar only renders `__controls` in this context:

```html
<div class="ds-page-content__dashboard-header">
  <div class="ds-page-content__heading ds-page-content__heading--row">
    <h1 class="ds-page-content__title">Support Dashboard</h1>
    <p class="ds-page-content__meta">April 20, 2026 · Last updated 2 min ago</p>
  </div>
  <!-- No [title] or [subtitle] — page heading provides those -->
  <ds-dashboard-toolbar
    [filterActive]="filterOpen"
    (filterClick)="filterOpen = true">
  </ds-dashboard-toolbar>
</div>
```

Full specs: `.claude/specs/specs-dashboard.md`

---

### Content
| Component | Selector | Import |
|---|---|---|
| List | `<ds-list>` + `<ds-list-item>` | `DsListComponent` |
| Menu | `<ds-menu>` | `DsMenuComponent` |
| Snackbar | service | `DsSnackbarComponent` |
| Rich text editor | `<ds-rich-text-editor>` | `DsRichTextEditorComponent` |
| Search | `<ds-search>` | `DsSearchComponent` |

### Utilities
| Utility | Class | Use case |
|---|---|---|
| Screen reader only | `ds-sr-only` | Visually hides an element while keeping it accessible to screen readers |
| Form section title | `ds-form-section-title` | `<h2>` heading for named sections within a page body or form — Title H3 typography |

---

## Page layout patterns

These are CSS-only patterns — no Angular component. Import `dist/layout.css` in `angular.json` (see CSS imports section above).

### Rules — non-negotiable

1. **Every page MUST have a page title** — `<h1 class="ds-page-content__title">` inside `ds-page-content__heading`. This is required for ADA heading structure; screen readers use H1 to identify the page.
2. **Exception: Inbox and Ticket View** — these pages have no visible title by design. They must still include a hidden H1 using `ds-sr-only` so screen reader users retain heading navigation.
3. **Never write a raw `<h1>` outside of `ds-page-content__title`** — the token-based typography and layout are embedded in this class.
4. **Regular pages require `ds-page-content__main`** — it provides the card shell (background, border-radius, shadow). Never add these yourself. Exception: split-layout pages use `ds-split-page` as a direct child of `ds-page-content` instead (the panels provide their own card shells); dashboard pages use `ds-page-content__main--dashboard`.
5. **Tabs under the title** — when a page has section tabs, place `<ds-tabs>` inside `ds-page-content__heading` immediately after the `<h1>`. Never place tabs outside the heading block.

### App shell (`ds-page-layout`) — HTML skeleton

Use this exact structure on every page. The nav-sidebar, top-nav, subnav, and ds-nav-expand are
**never simplified** — every page has all of them. Customize the active nav button and the page
content area (`ds-page-content__main` for regular pages; `ds-split-page` as a direct child for split
pages; `ds-page-content__main--dashboard` for dashboards).

```html
<div class="ds-page-layout">

  <!-- Left: main nav rail — exact structure required on every page -->
  <nav class="ds-nav-sidebar" role="navigation" aria-label="Main navigation">

    <!-- Logo mark — always first -->
    <div class="ds-nav-sidebar__logo">
      <!-- Onflo logo SVG here -->
    </div>

    <!-- Nav buttons — set [selected]="true" on the active page's button only -->
    <div class="ds-nav-sidebar__nav">
      <ds-nav-button type="home"      aria-label="Home" />
      <ds-nav-button type="tickets"   aria-label="Tickets" />
      <ds-nav-button type="assets"    aria-label="Assets" />
      <ds-nav-button type="users"     aria-label="Users" />
      <ds-nav-button type="analytics" aria-label="Analytics" />
      <ds-nav-button type="campaigns" aria-label="Campaigns" />
      <ds-nav-button type="requests"  aria-label="Requests" />
      <ds-nav-button type="systems"   aria-label="Systems" />
      <ds-nav-button type="settings"  aria-label="Settings" />
    </div>

    <!-- Bottom slot — always both agent-status components -->
    <div class="ds-nav-sidebar__bottom">
      <ds-agent-status />
      <ds-agent-status />
    </div>

  </nav>

  <!-- Right column: top-nav stacked above body -->
  <div class="ds-page-layout__content">

    <!-- Top nav — exact structure required on every page -->
    <header class="ds-top-nav" role="banner">

      <!-- Browser-style document tabs — always present (even if only one tab) -->
      <div class="ds-top-nav__tabs">
        <ds-nav-tab [active]="true">Page Name</ds-nav-tab>
      </div>

      <!-- Action buttons — always inside __actions, never direct children of <header> -->
      <div class="ds-top-nav__actions">
        <button class="ds-top-nav__action-btn ds-top-nav__action-btn--orange"
                type="button" aria-label="Chatsy">
          <span class="ds-icon">chat</span>
        </button>
        <div class="ds-top-nav__action-badge">
          <button class="ds-top-nav__action-btn"
                  type="button" aria-label="Notifications">
            <span class="ds-icon">notifications</span>
          </button>
        </div>
        <button class="ds-top-nav__action-btn ds-top-nav__action-btn--green"
                type="button" aria-label="New">
          <span class="ds-icon">add</span>
        </button>
        <button class="ds-top-nav__action-btn"
                type="button" aria-label="Help">
          <span class="ds-icon">help</span>
        </button>
        <button class="ds-top-nav__action-btn ds-top-nav__action-btn--navy"
                type="button" aria-label="Profile">
          <span class="ds-icon ds-icon--filled">account_circle</span>
        </button>
      </div>

    </header>

    <div class="ds-page-layout__body">

      <!-- Collapsible sub-nav panel — always present; content varies by section -->
      <nav class="ds-subnav" [class.is-collapsed]="!subNavOpen"
           role="navigation" aria-label="Section navigation">
        <!-- ds-subnav-header / ds-subnav-button items -->
      </nav>

      <!-- Main content area -->
      <main class="ds-page-content" role="main">

        <!-- Heading block: title + optional tabs -->
        <div class="ds-page-content__heading">
          <h1 class="ds-page-content__title">Page Title</h1>
          <!-- <ds-tabs> goes here when page has section tabs -->
        </div>

        <!-- Content card: all page body content lives here -->
        <div class="ds-page-content__main">
          <!-- page content -->
        </div>

      </main>

    </div><!-- /.ds-page-layout__body -->

  </div><!-- /.ds-page-layout__content -->

  <!-- Subnav expand/collapse toggle — always present, wired to subNavOpen -->
  <ds-nav-expand [open]="subNavOpen" (toggle)="onToggleSubnav()" />

</div><!-- /.ds-page-layout -->
```

**Selected nav button** — use `[selected]="true"` on the `<ds-nav-button>` for the active page.
The component manages `is-selected`, `aria-pressed`, and the filled icon internally:
```html
<!-- Correct — let the component manage state -->
<ds-nav-button type="users" aria-label="Users" [selected]="true" />

<!-- Wrong — host attributes don't reach the inner <button> -->
<ds-nav-button type="users" class="is-selected" aria-pressed="true" />
```

**Which nav components to import** — the shell skeleton uses the CSS class API for `ds-nav-sidebar`
and `ds-top-nav` (native `<nav>` and `<header>` elements with class names). Only import Angular
components for elements that use DS Angular selectors in the template:

```typescript
// Import these — used as Angular selectors (<ds-nav-button>, <ds-agent-status>, etc.)
import {
  NavButtonComponent,    // <ds-nav-button>
  AgentStatusComponent,  // <ds-agent-status>
  NavTabComponent,       // <ds-nav-tab>
  NavExpandComponent,    // <ds-nav-expand>
  SubnavButtonComponent, // <ds-subnav-button>
  SubnavHeaderComponent, // <ds-subnav-header>
} from '@onflo/design-system';

// Do NOT import these — the shell uses CSS class API, not Angular selectors:
// NavSidebarComponent  → <nav class="ds-nav-sidebar"> (no <ds-nav-sidebar> selector)
// TopNavComponent      → <header class="ds-top-nav">   (no <ds-top-nav> selector)
```

**Inbox / Ticket View exception** — hidden title, no heading block visible:
```html
<main class="ds-page-content" role="main">
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title ds-sr-only">Inbox</h1>
    <!-- no visible title — sr-only H1 preserves ADA heading structure -->
  </div>
  <div class="ds-page-content__main">
    <!-- page content -->
  </div>
</main>
```

### Sub-nav collapse (Angular wiring)

`ds-subnav` has no Angular component — manage `is-collapsed` via host state:

```typescript
subNavOpen = true;
onToggleSubnav() { this.subNavOpen = !this.subNavOpen; }
```

```html
<nav class="ds-subnav" [class.is-collapsed]="!subNavOpen" ...>
<ds-nav-expand [open]="subNavOpen" (toggle)="onToggleSubnav()" />
```

### CSS class reference

| Class | Purpose |
|---|---|
| `.ds-page-layout` | Root shell — `position: relative; display: flex` |
| `.ds-page-layout__content` | Right column — top-nav stacked above body |
| `.ds-page-layout__body` | Row — subnav beside page-content |
| `.ds-subnav` | Collapsible sub-nav panel (`width: 195px` default) |
| `.ds-subnav.is-collapsed` | Hidden state — `width: 0; opacity: 0; pointer-events: none` |
| `.ds-page-content` | Main content area — flex column |
| `.ds-page-content__heading` | Title + optional tabs row |
| `.ds-page-content__title` | `<h1>` — Title H1 typography, required on every page |
| `.ds-page-content__main` | Content card — background, radius, shadow |

---

### Regular page content (`ds-page-content`)

Regular pages (non-split, non-dashboard) require both children inside `<main>`. `__heading` is mandatory on every page. `__main` is mandatory on regular pages only — split pages replace it with `ds-split-page` directly (outside `__main`); dashboard pages replace it with `ds-page-content__main--dashboard`.

```html
<main class="ds-page-content" role="main">

  <!-- Required: title row (and optional tabs) — never remove or move this -->
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Page Title</h1>
    <!-- <ds-tabs> here if the page has section tabs -->
  </div>

  <!-- Required: content card — all page body content goes here -->
  <div class="ds-page-content__main">
    <!-- page content -->
  </div>

</main>
```

`ds-page-content__main` provides the card background, border-radius, and shadow — never add these yourself. When switching a page from split layout back to a regular layout: remove the `ds-split-page` element and replace it with `<div class="ds-page-content__main"><!-- page content --></div>`. Keep `__heading` intact — it never changes when switching layout types.

---

### Split page (`ds-split-page`)

Two panels side by side. `ds-split-page` is a **direct child of `ds-page-content`** — placed as a sibling of `__heading`, **never wrapped in `ds-page-content__main`**. Each `ds-split-page__panel` already provides its own card shell (background, border-radius, box-shadow); wrapping in `__main` would create a double-card.

**Always use this full structure when a page uses a split layout:**

```html
<main class="ds-page-content" role="main">

  <!-- Title — fixed above the panels, never inside them -->
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Page Title</h1>
    <!-- <ds-tabs> here if the page has section tabs -->
  </div>

  <!-- Split panels are DIRECT children of ds-page-content — never wrap in ds-page-content__main.
       Each ds-split-page__panel already provides its own card shell (bg + border-radius + box-shadow). -->
  <div class="ds-split-page ds-split-page--7030">
    <div class="ds-split-page__panel ds-split-page__panel--left"><!-- left content --></div>
    <div class="ds-split-page__panel ds-split-page__panel--right"><!-- right content --></div>
  </div>

</main>
```

**Resizable variant** (add `CdkDragModule` on the handle for production):

```html
<div class="ds-split-page ds-split-page--resizable">
  <div class="ds-split-page__panel ds-split-page__panel--left"></div>
  <div class="ds-split-page__handle" aria-hidden="true">
    <div class="ds-split-page__handle-line"></div>
    <span class="ds-icon" aria-hidden="true">drag_indicator</span>
    <div class="ds-split-page__handle-line"></div>
  </div>
  <div class="ds-split-page__panel ds-split-page__panel--right"></div>
</div>
```

Ratio modifiers: `ds-split-page--7030` · `ds-split-page--3070` · `ds-split-page--7525` · `ds-split-page--2575` · (no modifier = 50/50)

---

## Icons

Use **Material Symbols Rounded** via the `ds-icon` utility:
```html
<span class="ds-icon">search</span>               <!-- outlined, 24px -->
<span class="ds-icon ds-icon--filled">search</span> <!-- filled -->
<span class="ds-icon ds-icon--sm">close</span>      <!-- 20px -->
```
Or Angular component:
```html
<ds-icon name="search" />
<ds-icon name="bookmark" [filled]="true" size="sm" />
```

---

## Breakpoints

This system is desktop-only — mobile devices are redirected to the Onflo mobile app.
Minimum supported viewport: **1024px** (landscape tablet).

| Name | Width | When to use |
|---|---|---|
| `md` | 1024px | Minimum — landscape tablet / small laptop |
| `lg` | 1280px | Standard laptop / desktop |
| `xl` | 1440px | Large desktop |
| `2xl` | 1920px | Ultrawide |

**In consuming project SCSS:**
```scss
@use '@onflo/design-system/tokens/scss/breakpoints' as ds;

.my-component {
  padding: var(--spacing-lg);

  @include ds.respond-to('xl') {
    padding: var(--spacing-xl);
  }
}

// Or use the variable directly:
@media (min-width: ds.$breakpoint-lg) { ... }
```

---

## CSS import in Angular projects

Three stylesheets must be included — tokens first, then components, then layout (if using page layout patterns). All three are required for full-page applications.

**In `angular.json` styles array:**
```json
"styles": [
  "node_modules/@onflo/design-system/tokens/css/index.css",
  "node_modules/@onflo/design-system/dist/components.css",
  "node_modules/@onflo/design-system/dist/layout.css",
  "src/styles.scss"
]
```

`tokens/css/index.css` — design tokens (CSS custom properties)
`dist/components.css` — component CSS class API (`.ds-icon`, `.ds-button`, `ds-sr-only`, etc.)
`dist/layout.css` — page layout patterns (`.ds-page-layout`, `.ds-split-page`)
Order matters: tokens → components → layout → project styles.

**SCSS tokens in component stylesheets:**
```scss
@use 'node_modules/@onflo/design-system/tokens/scss/variables' as ds;
```

---

## Angular Material dependency

This design system uses Angular Material as the behavioral foundation.
Consuming projects must have Angular Material installed and `provideAnimations()` (or `provideAnimationsAsync()`) in their app config.

The design system themes Material components globally — do not apply your own Material theme. Import the design system tokens CSS before any other styles.

---

## What to check before building any UI element

1. Does this component exist in the list above? → Use it.
2. Is there a CSS class API version that fits? → Use it.
3. Are all colors/spacing/typography using tokens? → Required.
4. Is the focus ring keyboard-only via `:focus-visible`? → Required.
5. Does the component exist in Angular Material (behavior only)? → Wrap it with Onflo styles, don't re-implement the behavior.
6. Are you combining multiple components into a page section? → Read the composition patterns first.

---

## Composition patterns

When building page sections that assemble multiple components together, consult the relevant spec file before writing code.

**`node_modules/@onflo/design-system/.claude/specs/specs-compositions.md`** covers:
- **Component selection** — which component to use when options overlap (dialog vs modal vs snackbar; label vs tag vs chip vs badge; skeleton vs spinner)
- **Data table page** — toolbar + AG Grid + paginator assembly rules
- **Filtered table page** — toolbar + filter bar + filter modal + AG Grid full wiring
- **Form / detail page** — field layout, error handling, save-bar placement
- **Empty and loading states** — skeleton vs spinner, aria-busy wiring, empty state structure

**`node_modules/@onflo/design-system/.claude/specs/specs-dashboard.md`** covers:
- **Dashboard page** — `ds-metric-card` + `ds-chart` bento grid layout, `ds-dashboard-toolbar` placement, required page structure classes (`--dashboard`, `__dashboard-header`, `__main--dashboard`)

---

## Preview reference

The design system ships a visual reference at `node_modules/@onflo/design-system/preview/index.html`.
Open it directly in a browser for a quick visual overview of available components and tokens.
This is for human reference — the source of truth for implementation is always the component source files.
