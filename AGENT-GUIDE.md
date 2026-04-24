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
| Component | Selector | Import |
|---|---|---|
| Tabs | `<ds-tabs>` + `<ds-tab>` | `DsTabsComponent` |
| Top nav bar | `<ds-top-nav>` | `DsTopNavComponent` |
| Nav tab | `<ds-nav-tab>` | `DsNavTabComponent` |
| Nav sidebar | `<ds-nav-sidebar>` | `DsNavSidebarComponent` |
| Nav button | `<ds-nav-button>` | `DsNavButtonComponent` |
| Nav expand | `<ds-nav-expand>` | `DsNavExpandComponent` |
| Sub-nav button | `<ds-subnav-button>` | `DsSubnavButtonComponent` |
| Sub-nav header | `<ds-subnav-header>` | `DsSubnavHeaderComponent` |
| Sub-nav subheader | `<ds-subnav-subheader>` | `DsSubnavSubheaderComponent` |
| Agent status | `<ds-agent-status>` | `DsAgentStatusComponent` |
| Paginator | `<ds-paginator>` | `DsPaginatorComponent` |

### Data / table

> **STOP — AG Grid prerequisite check required.**
> `ds-table-header-cell`, `ds-table-row-cell`, `ds-ag-paginator`, and `ds-table-toolbar` are **AG Grid custom renderers**. They cannot be used without a real AG Grid instance.
> Before writing any table code, check the project's `package.json` for `ag-grid-angular`.
> - **Found** → proceed with the wiring pattern below.
> - **Not found** → do NOT install AG Grid or write any AG Grid code. Tell the user that AG Grid is required and ask whether they want to add it. AG Grid Enterprise is a paid product — never add it without explicit confirmation.

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

> **Reminder**: Only reach this section if you have already confirmed `ag-grid-angular` is in `package.json`. If it is not, stop and ask the user — do not add AG Grid without explicit approval.

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

**Column type shortcuts** (`type: 'dsCheckbox'` etc.):
- `dsCheckbox` — 56px fixed checkbox column; pair with `rowSelection: 'multiple'`
- `dsNumeric` — right-aligned + number filter; add `aggFunc: 'sum'` per-column for totals
- `dsDate` — date filter with ISO string comparator
- `dsGroupable` — enables the column in the row groups picker (Enterprise)
- `dsPinned` — pins right, locked, no resize; use for action button columns

Full integration pattern with template, component class, and all options is in `.claude/specs/specs-table.md` → "Angular Integration — Canonical Wiring Pattern".

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
4. **Never skip `ds-page-content__main`** — all page body content goes inside this card shell. Never add `background`, `border-radius`, or `box-shadow` yourself; `ds-page-content__main` provides them.
5. **Tabs under the title** — when a page has section tabs, place `<ds-tabs>` inside `ds-page-content__heading` immediately after the `<h1>`. Never place tabs outside the heading block.

### App shell (`ds-page-layout`) — HTML skeleton

```html
<div class="ds-page-layout">

  <!-- Left: main nav rail -->
  <nav class="ds-nav-sidebar" role="navigation" aria-label="Main navigation">
    <!-- ds-nav-button items; ds-agent-status at bottom -->
  </nav>

  <!-- Right column: top-nav stacked above body -->
  <div class="ds-page-layout__content">

    <header class="ds-top-nav" role="banner">
      <!-- ds-nav-tab items, action icon buttons -->
    </header>

    <div class="ds-page-layout__body">

      <!-- Optional collapsible sub-nav panel (CSS-only — no Angular component) -->
      <nav class="ds-subnav" role="navigation" aria-label="Section navigation">
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

  <!-- Subnav expand/collapse toggle (absolutely positioned) -->
  <button class="ds-nav-expand" type="button"
          aria-label="Collapse sub navigation" aria-expanded="true">
    <span class="ds-icon ds-icon--filled" aria-hidden="true">right_panel_open</span>
  </button>

</div><!-- /.ds-page-layout -->
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

Every page — regardless of whether it has a split layout or not — requires this structure inside `<main>`. Both children are mandatory: never omit `__heading` or `__main`.

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

`ds-page-content__main` provides the card background, border-radius, and shadow — never add these yourself. When switching a page from split layout back to a regular layout, replace the `ds-split-page` markup inside `__main` with the page content directly; keep `__heading` and `__main` intact.

---

### Split page (`ds-split-page`)

Two panels side by side inside `ds-page-content__main`. The page title (`ds-page-content__heading`) is a **sibling of `__main`, not inside it** — it sits above the panels and never moves.

**Always use this full structure when a page uses a split layout:**

```html
<main class="ds-page-content" role="main">

  <!-- Title stays OUTSIDE __main — fixed above the panels, never inside them -->
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Page Title</h1>
    <!-- <ds-tabs> here if the page has section tabs -->
  </div>

  <!-- Split page lives INSIDE __main -->
  <div class="ds-page-content__main">
    <div class="ds-split-page ds-split-page--7030">
      <div class="ds-split-page__panel ds-split-page__panel--left"><!-- left content --></div>
      <div class="ds-split-page__panel ds-split-page__panel--right"><!-- right content --></div>
    </div>
  </div>

</main>
```

**Resizable variant** (add `CdkDragModule` on the handle for production):

```html
<div class="ds-page-content__main">
  <div class="ds-split-page ds-split-page--resizable">
    <div class="ds-split-page__panel ds-split-page__panel--left"></div>
    <div class="ds-split-page__handle" aria-hidden="true">
      <div class="ds-split-page__handle-line"></div>
      <span class="ds-icon" aria-hidden="true">drag_indicator</span>
      <div class="ds-split-page__handle-line"></div>
    </div>
    <div class="ds-split-page__panel ds-split-page__panel--right"></div>
  </div>
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

When building page sections that assemble multiple components together, consult
`node_modules/@onflo/design-system/.claude/specs/specs-compositions.md` before writing code.

It covers:
- **Component selection** — which component to use when options overlap (dialog vs modal vs snackbar; label vs tag vs chip vs badge; skeleton vs spinner)
- **Data table page** — toolbar + AG Grid + paginator assembly rules
- **Filtered table page** — toolbar + filter bar + filter modal + AG Grid full wiring
- **Form / detail page** — field layout, error handling, save-bar placement
- **Empty and loading states** — skeleton vs spinner, aria-busy wiring, empty state structure

---

## Preview reference

The design system ships a visual reference at `node_modules/@onflo/design-system/preview/index.html`.
Open it directly in a browser for a quick visual overview of available components and tokens.
This is for human reference — the source of truth for implementation is always the component source files.
