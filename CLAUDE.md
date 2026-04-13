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
| `ds-button` | `MatButtonModule` | mat-flat-button, mat-stroked-button, mat-button |
| `ds-icon-button` | `MatIconButtonModule` | mat-icon-button |
| `ds-input` | `MatFormFieldModule` + `MatInputModule` | mat-form-field + matInput |
| `ds-textarea` | `MatFormFieldModule` + `MatInputModule` | mat-form-field + matInput (textarea) |
| `ds-select` | `MatSelectModule` | mat-select inside mat-form-field; `panelClass="ds-select__panel"` themes the dropdown |
| `ds-autocomplete` | `MatAutocompleteModule` + `MatInputModule` | matInput + matAutocomplete; consumer owns panel and filtering; pass panel ref via `[panel]` |
| `ds-datepicker` | `MatDatepickerModule` + `MatNativeDateModule` | matInput `[matDatepicker]` + `mat-datepicker-toggle`; styled to match ds-input (42px, same label/helper/error tokens); calendar popup globally styled via `.mat-datepicker-content` |
| `ds-date-range-picker` | `MatDatepickerModule` + `MatNativeDateModule` | `mat-date-range-input` with `matStartDate` / `matEndDate` inputs + `mat-date-range-picker`; same field appearance as ds-datepicker |
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
| `ds-table-header-cell` | Custom | No Material equivalent — AG Grid custom header renderer |
| `ds-table-row-cell` | Custom | No Material equivalent — AG Grid custom cell renderer |
| `ds-table-status-bar` | Custom | No Material equivalent — aggregate values row pinned above paginator (Rows, Total Rows, Average, Count, Min, Max, Sum); implements minimal AG Grid status panel API |
| `ds-table-row-groups-bar` | Custom | No Material equivalent — bar between toolbar and header; drag target for row group columns + removable chips; bind `[api]` to auto-sync |
| `ds-column-panel` | Custom | No Material equivalent — AG Grid custom tool panel; sections: density toggle, Column Visibility (collapsible — `<button aria-expanded>` header, no internal scroll), pivot mode, row groups, values; width 300px; shown via `[data-panel-open]` on container; whole panel scrolls via `overflow-y: auto` |
| `ds-table-toolbar` | Custom | No Material equivalent — AG Grid table toolbar |
| `ds-table-context-menu` | Custom | No Material equivalent — right-click context menu for AG Grid header cells and row cells; uses `.ds-menu` CSS class API exactly (same visual as `ds-menu`); `position: fixed` overlay with backdrop; viewport boundary flip; `[items]`, `[x]`, `[y]`, `[visible]`, `(closed)`; default builders: `buildDefaultHeaderContextMenuItems(colId, api)` (sort/pin/auto-size/reset/group) and `buildDefaultRowContextMenuItems(value)` (copy); requires `suppressContextMenu: true` + `suppressHeaderContextMenu: true` in grid options; `(headerContextMenu)` output on `ds-table-header-cell`, `(rowContextMenu)` output on `ds-table-row-cell` |
| `ds-page-layout` | Custom | CSS-only app shell; SCSS in `layout/page-layout/`, ships as `dist/layout.css` |
| `ds-split-page` | CdkDrag (CDK only) | CSS-only two-pane layout; SCSS in `layout/split-page/`, ships as `dist/layout.css`; use `CdkDragModule` for production resize |
| `ds-rich-text-editor` | Custom (CKEditor 5) | No Angular Material equivalent — third-party CKEditor 5. Requires `@ckeditor/ckeditor5-angular` + `@ckeditor/ckeditor5-build-classic`. Custom toolbar calls `editor.execute()` commands; native CKEditor toolbar is suppressed via CSS. Inputs: `[label]`, `[placeholder]`, `[(value)]`, `[disabled]`, `[isError]`, `[showResize]`, `[showExpand]`. Resize = JS mousedown drag on host height. Expand = `position:fixed` overlay with a second editor instance that syncs back on close. |

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

## Template Sync Workflow

The project template at `~/Developer/Onflo-Project-Template` installs the DS as a local tarball:
`vendor/onflo-design-system-{version}.tgz`. Changes to the DS do **not** automatically appear
in the template — the tarball must be rebuilt and reinstalled manually.

**When to sync:** whenever explicitly asked, or after any batch push where the template should
reflect the new state of the DS.

**Steps — run all commands from the DS repo root:**

```bash
# 1. Build dist/ (compiles Angular components + CSS)
npm run build

# 2. Pack the tarball
npm pack
# → creates onflo-design-system-{version}.tgz in the DS root

# 3. Replace the tarball in the template's vendor directory
mv onflo-design-system-$(node -p "require('./package.json').version").tgz \
   ../Onflo-Project-Template/vendor/onflo-design-system-$(node -p "require('./package.json').version").tgz

# 4. If the version number changed — update the template's package.json too:
#    "file:./vendor/onflo-design-system-{NEW_VERSION}.tgz"
#    (If version is unchanged, skip this step — the filename is the same)

# 5. Reinstall in the template
cd ../Onflo-Project-Template && npm install
```

**After syncing:**
- Verify `node_modules/@onflo/design-system/dist/` in the template reflects the new build
- Commit the updated tarball in the template repo (`vendor/onflo-design-system-{version}.tgz`)
- If `package.json` changed (version bump), commit that too

**What ships in the tarball** (`files` field in `package.json`):
- `dist/` — compiled components + CSS
- `tokens/` — CSS and SCSS tokens
- `AGENT-GUIDE.md` — loaded by the template's `CLAUDE.md`
- `preview/index.html` — visual component reference
- `.claude/specs/` — composition patterns referenced by `AGENT-GUIDE.md`

Internal files that do **not** ship: `CLAUDE.md`, `docs/`, `scripts/`, `preview-rules.md`,
`.claude/settings.local.json`, `ng-package.json`, `public-api.ts`, `tsconfig.json`.

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
