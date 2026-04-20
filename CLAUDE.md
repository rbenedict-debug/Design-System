# Onflo Design System — Claude Working Rules

> **Consuming project?** You should be loading `AGENT-GUIDE.md`, not this file.
> This file contains working rules for the design system repository itself (Rebecca's session only).
> Add `@node_modules/@onflo/design-system/AGENT-GUIDE.md` to your project's CLAUDE.md instead.

---

## THIS REPOSITORY IS READ-ONLY FOR ALL CONSUMING PROJECTS

If Claude Code is running inside a project that has installed `@onflo/design-system` as a
dependency, it must **never** create, edit, or delete files inside this package.
All design system changes are made in this repository by Rebecca only.

---

## Project Overview

**Owner:** Rebecca Benedict (design system lead — Figma + engineering)
**Stack:** Angular (standalone components) + .NET Core

> **Claude Design users:** Read `DESIGN.md` — it has resolved hex values, typography specs, spacing, and the full component inventory in a format Claude Design can use directly.
**Purpose:** Shared component and token library for the Onflo product suite.

---

## Repository Structure

```
tokens/
  css/
    ref-light.css          # Tier 1 — primitive palette (light)
    ref-dark.css           # Tier 1 — primitive palette (dark)
    design-tokens.css      # Tier 2 — semantic aliases (references --ref-* only)
  scss/
    _variables.scss        # SCSS mirror of design-tokens.css
components/
  index.scss               # Barrel: @use all components
  # One directory per component — selector matches ds-{name}:
  icon/ button/ icon-button/ input/ textarea/ select/ autocomplete/
  checkbox/ radio/ toggle/ datepicker/
  badge/ alert/ tooltip/ avatar/ progress/ spinner/ snackbar/ skeleton/ empty-state/
  tabs/ card/ dialog/ menu/ accordion/ chip/ tag/ divider/ list/ paginator/
  label/ search/ table/ ag-paginator/ table-toolbar/ column-panel/ hover-card/ save-bar/ modal/
  # table/ also contains: table-context-menu (right-click overlay for header + row cells)
  nav-button/ agent-status/ nav-sidebar/ nav-tab/ top-nav/ nav-expand/
  subnav-button/ subnav-subheader/ subnav-header/  # subnav-subheader: settings subnav only
  rich-text-editor/
  chart/                    # ds-chart — Highcharts wrapper (peer dep: highcharts >=11)
  metric-card/              # ds-metric-card — KPI tile for dashboards
  dashboard-toolbar/        # ds-dashboard-toolbar — floating page-level toolbar for dashboards
  utilities/                # Utility classes (ds-sr-only, etc.) — ships in dist/components.css
layout/
  index.scss               # Barrel: @use all layout patterns → dist/layout.css
  page-layout/             # ds-page-layout — app shell (CSS-only, no Angular component)
  split-page/              # ds-split-page — two-pane resizable layout (CSS-only)
preview/
  index.html               # Self-contained visual token + component reference
```

---

## Token System

### Two-tier architecture — NEVER break this rule

**Tier 1 — Ref primitives** (`tokens/css/ref-light.css`, `ref-dark.css`):
- All raw values: hex colours, px sizes, font names, raw rgba
- Named `--ref-*` (e.g. `--ref-color-primary-blue-default`)
- Never referenced directly in component CSS

**Tier 2 — Semantic aliases** (`tokens/css/design-tokens.css`):
- Map meaning → primitive: `--color-surface-brand: var(--ref-color-primary-blue-bg)`
- **Must only reference `var(--ref-*)` — never hardcode hex, px, or rgba**
- These are the tokens all components use

### Token naming prefixes
| Prefix | Purpose |
|---|---|
| `--color-surface-*` | Background fills |
| `--color-text-*` | Text colours |
| `--color-border-*` | Border colours |
| `--color-icon-*` | Icon colours |
| `--overlay-*` | Interaction tints (hover/pressed/focused) — semi-transparent |
| `--spacing-*` | Spacing scale (xs=4, sm=8, md=12, lg=16, xl=24, page=48) |
| `--radius-*` | Border radii (sm, md, lg, full) |
| `--shadow-elevation-*` | Box shadows (1–3) |
| `--ref-typescale-*` | Typography scale |

### Breakpoints — SCSS only

Breakpoints are SCSS variables (not CSS custom properties — `@media` queries can't use `var()`).

| Variable | Value | Viewport |
|---|---|---|
| `$breakpoint-md` | 1024px | Landscape tablet / small laptop (minimum supported) |
| `$breakpoint-lg` | 1280px | Standard laptop / desktop |
| `$breakpoint-xl` | 1440px | Large desktop |
| `$breakpoint-2xl` | 1920px | Ultrawide |

Use the `respond-to()` mixin — never write raw `@media` values:

```scss
@use '@onflo/design-system/tokens/scss/breakpoints' as bp;

.my-element {
  width: 100%;
  @include bp.respond-to('lg') { width: 50%; }
}
```

No mobile breakpoints — the product redirects mobile devices to a native app.

---

## Icons — Material Symbols Rounded

We use **Material Symbols Rounded** with the variable font FILL axis for outlined/filled.

### Usage
```html
<span class="ds-icon">search</span>                  <!-- outlined (default) -->
<span class="ds-icon ds-icon--filled">search</span>  <!-- filled -->
<span class="ds-icon ds-icon--sm">close</span>        <!-- sm = 20px -->
```

### Angular component
```html
<ds-icon name="search" />
<ds-icon name="bookmark" [filled]="true" size="sm" />
```

### Sizes
| Class | px | opsz axis |
|---|---|---|
| `ds-icon--xs` | 16px | 20 |
| `ds-icon--sm` | 20px | 20 |
| *(default)* | 24px | 24 |
| `ds-icon--lg` | 32px | 48 |
| `ds-icon--xl` | 40px | 48 |

---

## Component Rules

### General
- Every component has a **CSS class API** (works without Angular) AND an **Angular standalone component**
- BEM naming: `.ds-{component}`, `.ds-{component}__{element}`, `.ds-{component}--{modifier}`
- State classes: `.is-error`, `.is-disabled`, `.is-readonly`, `.is-selected`
- Interactive states: `:hover`, `:focus-visible`, `:active`, `:disabled`
- **Focus ring: keyboard-only, always.** Use `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` — never `outline`. For simple elements (buttons, links) use `:focus-visible`. For composite wrapper components that use `:focus-within`, you MUST use the `data-mouse-focus` suppression pattern — never apply `box-shadow` directly on `:focus-within` alone, as this fires on mouse clicks.
- Overlay tints (hover/pressed/focused on filled surfaces): use `::after` pseudo-element with `var(--overlay-hovered)` etc.

### Component file structure
```
components/{name}/
  _{name}.scss                     # Source styles (use design tokens only)
  {name}.component.ts              # Standalone Angular component
  {name}.component.html            # Template
  {name}.component.scss            # Minimal — just @use '{name}'
```

---

## Angular Material Foundation

Onflo = visual layer (tokens, spacing, interaction states). Angular Material = behavioral layer (a11y, keyboard nav, CDK). Onflo SCSS themes Material via global class overrides targeting `.mat-*` / `.mdc-*` — no `::ng-deep`.

### Component → Angular Material mapping

| Onflo Component | Angular Material Module | Notes |
|---|---|---|
| `ds-icon` | n/a — Material Symbols Rounded font | CSS class API only |
| `ds-button` | `MatButtonModule` | mat-flat-button, mat-stroked-button, mat-button; toggle via `[selected]` input (adds `.is-selected` + `aria-pressed`); pair with `ds-button-group` |
| `ds-button-group` | Custom | CSS-only wrapper — `display: inline-flex; gap: --spacing-sm`; add `role="group"` + `aria-label`; buttons inside use `ds-button--outlined.is-selected` + `aria-pressed` |
| `ds-icon-button` | `MatIconButtonModule` | mat-icon-button |
| `ds-input` | `MatFormFieldModule` + `MatInputModule` | mat-form-field + matInput |
| `ds-textarea` | `MatFormFieldModule` + `MatInputModule` | mat-form-field + matInput (textarea) |
| `ds-select` | `MatSelectModule` | mat-select inside mat-form-field; `panelClass="ds-select__panel"` themes the dropdown |
| `ds-autocomplete` | `MatAutocompleteModule` + `MatInputModule` | matInput + matAutocomplete; consumer owns panel and filtering; pass panel ref via `[panel]` |
| `ds-datepicker` | `MatDatepickerModule` + `MatNativeDateModule` | matInput `[matDatepicker]` + `mat-datepicker-toggle`; styled to match ds-input (42px, same label/helper/error tokens); calendar popup globally styled via `.mat-datepicker-content`; value binding uses `[(ngModel)]` internally (`FormsModule` bundled in the standalone component) |
| `ds-date-range-picker` | `MatDatepickerModule` + `MatNativeDateModule` | `mat-date-range-input` with `matStartDate` / `matEndDate` inputs + `mat-date-range-picker`; same field appearance as ds-datepicker; start/end value binding uses `[(ngModel)]` internally (`FormsModule` bundled in the standalone component) |
| `ds-checkbox` | `MatCheckboxModule` | mat-checkbox |
| `ds-radio` + `ds-radio-group` | `MatRadioModule` | mat-radio-group + mat-radio-button |
| `ds-toggle` | `MatSlideToggleModule` | mat-slide-toggle |
| `ds-badge-indicator` | `MatBadgeModule` | matBadge directive |
| `ds-alert` | Custom | No Material equivalent — role="alert" |
| `ds-tooltip` | `MatTooltipModule` | matTooltip directive |
| `ds-avatar` | Custom | No Material equivalent |
| `ds-progress` | `MatProgressBarModule` | mat-progress-bar |
| `ds-spinner` | `MatProgressSpinnerModule` | mat-progress-spinner |
| `ds-tabs` | `MatTabsModule` | mat-tab-group + mat-tab |
| `ds-card` | `MatCardModule` | variants: `outlined` / `elevated` |
| `ds-card-item` | Custom | Compact 56px horizontal card |
| `ds-dialog` | `MatDialogModule` (optional) | slots: `[dialog-body]` + `[dialog-actions]`; left-aligned only; `panelClass: 'ds-dialog-overlay'` |
| `ds-menu` | `MatMenuModule` | mat-menu |
| `ds-accordion` | `MatExpansionModule` | mat-accordion + mat-expansion-panel |
| `ds-chip` | `MatChipsModule` | mat-chip |
| `ds-tag` | `MatChipsModule` | mat-chip — navy background + text-primary. Variants: default (removable/read-only), more (+N overflow), add (dashed-border button). Sizes: md (32px) / sm (24px) |
| `ds-divider` | `MatDividerModule` | mat-divider |
| `ds-list` | `MatListModule` | mat-list + mat-list-item |
| `ds-paginator` | `MatPaginatorModule` | mat-paginator |
| `ds-snackbar` | `MatSnackBarModule` | MatSnackBar service |
| `ds-label` | Custom | Display-only tag — no Material equivalent |
| `ds-skeleton` | Custom | No Material equivalent — aria-busy pattern |
| `ds-empty-state` | Custom | No Material equivalent — illustration + message for zero-data states; sizes: sm / lg; layouts: vertical / horizontal; content projection for optional actions |
| `ds-search` | Custom | No Material equivalent — internal building block for ds-table-toolbar |
| `ds-ag-paginator` | Custom | AG Grid custom pagination panel — no Material equivalent |
| `ds-hover-card` | Custom | No Material equivalent — cursor-following floating card |
| `ds-nav-button` | Custom | No Material equivalent — navigation rail button primitive for nav-sidebar |
| `ds-agent-status` | Custom | No Material equivalent — support agent online/offline toggle primitive for nav-sidebar |
| `ds-nav-sidebar` | Custom | No Material equivalent — main left navigation sidebar composition (composes nav-button + agent-status) |
| `ds-nav-tab` | Custom | No Material equivalent — browser-style document tab primitive for top-nav; `[more]="true"` collapses to 26px overflow indicator showing "..." |
| `ds-top-nav` | Custom | No Material equivalent — main top navigation bar composition (composes nav-tab + action buttons) |
| `ds-nav-expand` | Custom | No Material equivalent — sub-nav panel expand/collapse toggle; `[open]` reflects current panel state; `(toggle)` emitted on click; icons: `right_panel_open` / `right_panel_close` (FILL=1, brand blue) |
| `ds-subnav-button` | Custom | No Material equivalent — leaf navigation item (32px, full width); selected = brand blue bg + white text; optional `[showFilter]` trailing `filter_alt` icon button (uses div+role="button" wrapper to avoid nested `<button>`); `[label]`, `[selected]`, `[disabled]`, `[showFilter]` inputs; `(navClick)`, `(filterClick)` outputs |
| `ds-subnav-subheader` | Custom | No Material equivalent — **settings subnav only** — expandable section grouping label (32px row) **always nested inside `ds-subnav-header`**; never used in general page navigation subnav panels; `arrow_right` when collapsed, `arrow_drop_down` when expanded; children indented 8px with left vertical accent line (`--color-border-brand`); `[text]`, `[expanded]`, `[(expanded)]`, `[disabled]`; children projected via `ng-content` |
| `ds-subnav-header` | Custom | No Material equivalent — top-level collapsible section header (32px row); 12px `[icon]` (defaults to `language`) + `[text]` label + expand arrow; Label Small typography; `--color-icon-subtle` default / `--color-icon-brand` expanded; children indented 8px (no vertical line); `[text]`, `[icon]`, `[expanded]`, `[(expanded)]`, `[disabled]`; children projected via `ng-content` |
| `ds-save-bar` | Custom | No Material equivalent — unsaved-changes bar; variants: `default` (blue border, info dot) / `error` (red border, error dot); outputs: `(cancelClick)`, `(saveProgressClick)`, `(saveAndExitClick)`; ADA: `role="status"` (default) / `role="alert"` (error) |
| `ds-modal` | `MatDialogModule` (optional) | Full-featured modal — sticky header, scrollable body, optional tabs slot (`[modal-tabs]`), optional actions footer (`[modal-actions]`); variants: `close` (×) / `collapse` (minimize); sizes: `fixed` (500px) / `full` (fills backdrop); `(dismissClick)` output; panelClass: `'ds-modal-overlay'` when using MatDialog |
| `onfloTheme` | n/a — AG Grid theme object | Pre-configured AG Grid theme. Consumers set `theme: onfloTheme` in gridOptions. Built on Quartz + `iconSetMaterial`. Static sizing params (rowHeight/headerHeight 56px, iconSize 20, spacing 8) set via `withParams()`; color/font/border tokens applied via CSS custom properties in `_table-ag-theme.scss`. AG Grid's native borders disabled — custom renderers own all border rendering. |
| `ds-table-header-cell` | Custom | No Material equivalent — AG Grid custom header renderer |
| `ds-table-header-group-cell` | Custom | No Material equivalent — AG Grid custom group header renderer; wire via `DS_TABLE_DEFAULT_COL_GROUP_DEF` as `defaultColGroupDef`; shows expand/collapse chevron when group `isExpandable()`; same height/background/label style as `ds-table-header-cell` |
| `ds-table-row-cell` | Custom | No Material equivalent — AG Grid custom cell renderer |
| `ds-table-status-bar` | Custom | No Material equivalent — aggregate values row pinned above paginator (Rows, Total Rows, Average, Count, Min, Max, Sum); implements minimal AG Grid status panel API |
| `ds-table-row-groups-bar` | Custom | No Material equivalent — bar between toolbar and header; drag target for row group columns + removable chips; bind `[api]` to auto-sync; auto-hides via `[hidden]` when no groups active; **no density toggle** (density is column panel only) |
| `ds-table-group-row-cell` | Custom | No Material equivalent — AG Grid `groupRowRenderer` for `groupDisplayType: 'groupRows'`; 4 nesting levels (24px each); animated chevron; aggregation display; pair with `DsTableGroupExpansionStore` for localStorage expansion persistence |
| `ds-column-panel` | Custom | No Material equivalent — AG Grid custom tool panel; sections: density toggle, Column Visibility (collapsible), pivot mode, row groups (active chips + inline picker menu), values (active chips + inline picker menu); width 300px; shown via `[data-panel-open]` on container; whole panel scrolls via `overflow-y: auto`; columns with `lockVisible: true` (checkbox cols, pinned action cols) are **hidden** from Column Visibility — not shown as disabled; columns with `suppressColumnsToolPanel: true` are also hidden |
| `ds-table-toolbar` | Custom | No Material equivalent — AG Grid table toolbar |
| `ds-filter` | Custom | No Material equivalent — full-screen filter modal; `[(open)]`, `[groups]`, `[(selection)]`; **always pass `[savedSetsKey]="'onflo-filter-sets-{page}'"` for the Save/Load Filters button to appear** — omit only if saved sets are intentionally disabled; footer has Cancel + Apply Filters; saved sets toggle dynamically labels "Save Filters" or "Load Filters" based on draft state |
| `ds-filter-bar` | Custom | No Material equivalent — applied-filter chips strip; `[selection]`, `[groups]`, `[hidden]="filterCount === 0"`, `(selectionChange)`, `(filterClick)`; always paired with `ds-filter`; see `specs-filter.md` for the canonical wiring pattern |
| `ds-table-context-menu` | Custom | No Material equivalent — right-click context menu for AG Grid header cells and row cells; uses `.ds-menu` CSS class API exactly (same visual as `ds-menu`); `position: fixed` overlay with backdrop; viewport boundary flip; `[items]`, `[x]`, `[y]`, `[visible]`, `(closed)`; default builders: `buildDefaultHeaderContextMenuItems(colId, api)` (sort/pin/auto-size/reset/group) and `buildDefaultRowContextMenuItems(value)` (copy); requires `suppressContextMenu: true` + `suppressHeaderContextMenu: true` in grid options; `(headerContextMenu)` output on `ds-table-header-cell`, `(rowContextMenu)` output on `ds-table-row-cell` |
| `ds-page-layout` | Custom | CSS-only app shell; SCSS in `layout/page-layout/`, ships as `dist/layout.css` |
| `ds-split-page` | CdkDrag (CDK only) | CSS-only two-pane layout; SCSS in `layout/split-page/`, ships as `dist/layout.css`; use `CdkDragModule` for production resize |
| `ds-rich-text-editor` | Custom (CKEditor 5) | No Angular Material equivalent — third-party CKEditor 5. Requires `@ckeditor/ckeditor5-angular` + `@ckeditor/ckeditor5-build-classic`. Custom toolbar calls `editor.execute()` commands; native CKEditor toolbar is suppressed via CSS. Inputs: `[label]`, `[placeholder]`, `[(value)]`, `[disabled]`, `[isError]`, `[showResize]`, `[showExpand]`. Resize = JS mousedown drag on host height. Expand = `position:fixed` overlay with a second editor instance that syncs back on close. |
| `ds-chart` | Custom (Highcharts) | No Angular Material equivalent — wraps Highcharts with the Onflo color palette, typography, tooltip, and grid-line styles baked in. Requires `highcharts >=11` as a peer dep. The `onfloChartTheme` object is applied globally on first render via `Highcharts.setOptions()`. Inputs: `[type]` ('line' \| 'area' \| 'bar' \| 'column' \| 'donut' \| 'pie'), `[series]` (Highcharts.SeriesOptionsType[]), `[categories]` (string[]), `[title]`, `[height]` (default 300), `[legend]` (default true), `[loading]`, `[options]` (Highcharts.Options — merged last as escape hatch). 'donut' maps to pie with 60% innerSize. |
| `ds-metric-card` | Custom | No Material equivalent — KPI tile for dashboards. Inputs: `[value]` (string \| number), `[label]`, `[icon]` (Material Symbol name), `[trend]` (number; positive = green trending_up, negative = red trending_down), `[trendLabel]`, `[variant]` ('default' \| 'brand'), `[loading]` (shows skeleton). **Header layout:** label on the left, filled icon on the right (`justify-content: space-between`). **Visual:** no border — uses `--shadow-elevation-1/2` box-shadow so cards float on a `--color-surface-page` page background. Brand variant adds `border: 1px solid var(--color-border-brand)` on top of elevation. |
| `ds-dashboard-toolbar` | Custom | No Material equivalent — floating page-level toolbar for dashboards. No enclosing box — each control is an individually elevated element (same `box-shadow` as metric cards, no borders). **Left:** `__identity` block with `__title` + optional `__subtitle` (bare text on canvas). **Right:** `__controls` row containing projected `[toolbar-filters]` quick-filter controls + `__btn` icon buttons for filter and more. Inputs: `[title]`, `[subtitle]`. Outputs: `(filterClick)`, `(moreClick)`. Quick filters (e.g. `__date-select`) use the `data-mouse-focus` focus-ring suppression pattern. `__btn.is-active` marks the filter button as toggled. |

---

## Highcharts Chart Theme

### `components/chart/chart-theme.ts` — the Onflo Highcharts theme
Exports `onfloChartTheme` (Highcharts.Options) and `ONFLO_CHART_COLORS` (string[]).

**Key rules:**
- All values are **hardcoded** to match the Onflo ref token palette — Highcharts options are JavaScript objects, `var()` is not valid there.
- Series color order: brand blue → green → yellow → red → light blue → teal → orange → purple → navy.
- `chart.backgroundColor: 'transparent'` — the chart inherits the container background.
- `credits.enabled: false` — always.
- Animation duration: 200ms across all series and chart (matches `--motion-duration-fast`).
- The theme is applied once per app session via a static flag in `DsChartComponent`. Consuming apps that use Highcharts outside of `ds-chart` should call `Highcharts.setOptions(onfloChartTheme)` once at bootstrap.

### Token mapping (hardcoded values → what they map to)
| Value | Token |
|---|---|
| `#0B6EB4` | `--ref-color-primary-blue-default` |
| `#2D3638` | `--ref-color-neutral-text-default` |
| `#73737F` | `--ref-color-neutral-text-soft` |
| `#E9E9E9` | `--ref-color-neutral-border-subtle` |
| `#FFFFFF` | `--ref-color-neutral-surface` |

**Never change the chart theme colors to `var()` references** — Highcharts won't resolve them.

---

## AG Grid Theme Architecture

The table family uses a two-file approach to theme AG Grid:

### `components/table/table-ag-theme.ts` — programmatic params
Exports `onfloTheme` (Quartz base + Material icon set). Contains only **static, non-tokenized values** that can be set at build time:
- `rowHeight: 56`, `headerHeight: 56` — must be set here (not just CSS) for AG Grid's virtual DOM height calculation
- `iconSize: 20` — matches `ds-icon--sm`
- `spacing: 8` — matches `--spacing-sm`
- All native AG Grid borders disabled (`rowBorder: false` etc.) — custom renderers manage their own borders

### `components/table/_table-ag-theme.scss` — CSS variable overrides
Targets `.ag-root-wrapper`. Contains all **token-referencing values** that must resolve at runtime:
- Colors, fonts, shadows, checkbox styles — mapped to Onflo `--color-*`, `--ref-*` tokens
- `--ag-row-hover-color: transparent` and `--ag-selected-row-background-color: transparent` — intentionally transparent because `_table-row-cell.scss` handles those via `.ag-row-hover` / `.ag-row-selected` class hooks on `ds-table-row-cell` directly. Applying both would double the semi-transparent overlay.

### Density switching
Row height defaults to 56px (standard). To switch density at runtime, set CSS custom properties on the grid's host element **and** update `ds-table-header-cell` / `ds-table-row-cell` host heights to match:
```scss
// Comfortable (68px):
.my-grid-host { --ag-row-height: 68px; --ag-header-height: 68px; }
// Compact (42px):
.my-grid-host { --ag-row-height: 42px; --ag-header-height: 42px; }
```

### What the theme covers vs. what custom renderers cover

| Zone | Who owns it |
|---|---|
| Cell content (headers, data rows) | `ds-table-header-cell`, `ds-table-row-cell` — own DOM, own tokens |
| Row hover / selection background | `_table-row-cell.scss` via `.ag-row-hover` / `.ag-row-selected` hooks |
| Filter menus, column menus | `onfloTheme` + `_table-ag-theme.scss` |
| No-rows overlay, loading overlay | `onfloTheme` + `_table-ag-theme.scss` |
| Sidebar container (around column panel) | `onfloTheme` + `_table-ag-theme.scss` |
| Set filter checkboxes | `_table-ag-theme.scss` checkbox CSS vars |
| Column panel content | `ds-column-panel` — fully custom |

---

## What NOT to do

- Never hardcode hex, rgba, or px values in component SCSS — always use tokens
- Never add size variants to `ds-input` — height is fixed at 42px
- Never skip `aria-label` on icon buttons
- Never use `outline` or `border-color` for focus — always `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)`
- Never put content inside the `<!-- ONFLO-TOKENS:START/END -->` block except token CSS
- Never use `:has()` to infer icon presence in buttons — icon vs. no-icon are separate Figma variants
- Never reference `--ref-*` tokens directly in component styles — go through semantic `--color-*` / `--spacing-*` etc.
- Never apply `box-shadow` focus ring directly on `:focus-within` — always pair with `:not([data-mouse-focus])` guard or the ring will fire on mouse clicks
- Never use `:focus` where `:focus-visible` is appropriate — `:focus-visible` is keyboard-only by design for simple elements
- Never omit the `<h1 class="ds-page-content__title">` on any page — use `ds-sr-only` to hide it visually for pages with no visible title (inbox, ticket view); omitting it entirely breaks screen reader heading navigation

---

## Git Workflow

- **Commit frequently** — commit after each component change or addition
- **Push in batches of 10** — only push to remote after 10 or more components have been changed or added since the last push
- **Always update CLAUDE.md** during each change (before committing), regardless of whether a push is due
- Track the count mentally: after a push, the counter resets to 0

---

## Cutting a Release

The package publishes automatically to GitHub Packages when a version tag is pushed.
GitHub Actions runs the build and `npm publish` — no manual steps needed.

**Steps:**

```bash
# 1. Bump version in package.json (semver: patch = fixes, minor = new components, major = breaking)
# Edit package.json "version" field manually

# 2. Verify the build compiles cleanly
npm run build

# 3. Commit the version bump
git add package.json
git commit -m "chore: bump version to x.x.x"

# 4. Tag and push — Actions publishes automatically
git tag vx.x.x
git push origin main --tags
```

**What ships in the package** (`files` field in `package.json`):
- `dist/` — compiled components + CSS
- `tokens/` — CSS and SCSS tokens
- `AGENT-GUIDE.md` — loaded by consuming project CLAUDE.md files
- `preview/index.html` — visual component reference
- `.claude/specs/` — composition patterns referenced by `AGENT-GUIDE.md`

Internal files that do **not** ship: `CLAUDE.md`, `DESIGN.md`, `docs/`, `scripts/`,
`preview-rules.md`, `.claude/settings.local.json`, `ng-package.json`, `public-api.ts`, `tsconfig.json`.

> **Note:** Publishing requires the repo to be under the `onflo` GitHub org.
> The workflow is wired and ready — it will fire automatically once the repo is transferred.

---

## Adding a New Component

1. Create `components/{name}/_{name}.scss` — styles using only `--color-*`, `--spacing-*`, etc.
2. Create `components/{name}/{name}.component.ts` — standalone Angular, `selector: 'ds-{name}'`
3. Create `components/{name}/{name}.component.html`
4. Create `components/{name}/{name}.component.scss` — `@use '{name}'` only
5. Add `@use '{name}/{name}'` to `components/index.scss`
6. Add the component CSS inline to `preview/index.html` (second `<style>` block)
7. Add sidebar nav link and demo section to `preview/index.html`
8. Commit with message: `Add {Name} component (Step 2 — Nth component)`

> **Layout patterns** (app shell compositions, not UI components) go in `layout/` instead —
> SCSS in `layout/{name}/_{name}.scss`, added to `layout/index.scss`, ships as `dist/layout.css`.
> No Angular component needed; CSS-only. Reference the Page Layouts section in `.claude/specs/specs-layout.md`.

---

## Extended Reference Files

@.claude/ada-standards.md
@.claude/preview-rules.md

Per-component specs are in `.claude/specs/` — read the relevant file before adding or modifying any component:
- `specs-form.md` — Button, Icon Button, Input, Textarea, Select, Autocomplete, Checkbox, Toggle
- `specs-display.md` — Card, Card Item, Tabs, Badge, List, Label
- `specs-overlay.md` — Dialog, Alert, Tooltip, Hover Card
- `specs-table.md` — Table Header Cell, Table Row Cell, AG Paginator, Table Toolbar
- `specs-layout.md` — Agent Status, Page Layout, Split Page, Utilities (ds-sr-only)
- `specs-compositions.md` — Component selection guide + page-level composition patterns (data table, form/detail, empty/loading states)
- `specs-motion.md` — Motion duration tokens, easing curves, prefers-reduced-motion rules
- `specs-dashboard.md` — Chart (ds-chart + Highcharts theme), Metric Card (ds-metric-card), Dashboard Toolbar (ds-dashboard-toolbar)
- `specs-filter.md` — Filter modal (ds-filter), Filter Bar (ds-filter-bar), canonical wiring pattern, data interfaces
