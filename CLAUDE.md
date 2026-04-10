# Onflo Design System — Claude Working Rules

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
  icon/                    # ds-icon utility (Material Symbols Rounded)
  button/                  # ds-button
  icon-button/             # ds-icon-button + ds-icon-button-toggle
  input/                   # ds-input
  checkbox/                # ds-checkbox
  radio/                   # ds-radio + ds-radio-group
  toggle/                  # ds-toggle
  badge/                   # ds-badge-indicator (notification count / dot)
  alert/                   # ds-alert
  tooltip/                 # ds-tooltip
  select/                  # ds-select
  textarea/                # ds-textarea (no fixed height — resizable)
  avatar/                  # ds-avatar
  progress/                # ds-progress
  tabs/                    # ds-tabs + ds-tab
  card/                    # ds-card
  dialog/                  # ds-dialog
  menu/                    # ds-menu
  accordion/               # ds-accordion
  chip/                    # ds-chip
  tag/                     # ds-tag (navy pill — removable / more / add variants)
  divider/                 # ds-divider
  list/                    # ds-list
  paginator/               # ds-paginator
  spinner/                 # ds-spinner
  snackbar/                # ds-snackbar
  label/                   # ds-label (display-only tag)
  skeleton/                # ds-skeleton
  search/                  # ds-search
  table/                   # ds-table-header-cell + ds-table-row-cell (AG Grid custom renderers)
  ag-paginator/            # ds-ag-paginator (AG Grid custom pagination panel)
  table-toolbar/           # ds-table-toolbar (toolbar above AG Grid — search, filter, actions)
  hover-card/              # ds-hover-card (cursor-following floating info card)
  nav-button/              # ds-nav-button (navigation rail button — primitive for nav-sidebar)
  agent-status/            # ds-agent-status (support agent online/offline toggle — primitive for nav-sidebar)
  nav-sidebar/             # ds-nav-sidebar (main left navigation sidebar composition)
  nav-tab/                 # ds-nav-tab (browser-style document tab — primitive for top-nav)
  top-nav/                 # ds-top-nav (main top navigation bar composition — tabs + action buttons)
  nav-expand/              # ds-nav-expand (sub-nav panel expand/collapse toggle — primitive for page layout)
  save-bar/                # ds-save-bar (unsaved changes bar — Cancel / Save Progress / Save and Exit)
  modal/                   # ds-modal (full-featured modal — sticky header, scrollable body, optional tabs + actions footer)
  datepicker/              # ds-datepicker (single) + ds-date-range-picker (range)
preview/
  index.html               # Self-contained visual token + component reference
  page-layout/             # ds-page-layout (standard app shell — top-nav + nav-sidebar + optional sub-nav panel)
  split-page/              # ds-split-page (resizable two-pane layout — primary content + detail panel)
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
| `ds-select` | `MatSelectModule` | mat-select inside mat-form-field |
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
| `ds-card` | `MatCardModule` | mat-card |
| `ds-dialog` | `MatDialogModule` (optional) | Slot-based dialog panel — body slot (`[dialog-body]`) + actions slot (`[dialog-actions]`); left-aligned only; `[titleId]` wires `aria-labelledby`; `panelClass: 'ds-dialog-overlay'` when using MatDialog |
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
| `ds-search` | Custom | No Material equivalent — internal building block for ds-table-toolbar |
| `ds-ag-paginator` | Custom | AG Grid custom pagination panel — no Material equivalent |
| `ds-hover-card` | Custom | No Material equivalent — cursor-following floating card |
| `ds-nav-button` | Custom | No Material equivalent — navigation rail button primitive for nav-sidebar |
| `ds-agent-status` | Custom | No Material equivalent — support agent online/offline toggle primitive for nav-sidebar |
| `ds-nav-sidebar` | Custom | No Material equivalent — main left navigation sidebar composition (composes nav-button + agent-status) |
| `ds-nav-tab` | Custom | No Material equivalent — browser-style document tab primitive for top-nav; `[more]="true"` collapses to 26px overflow indicator showing "..." |
| `ds-top-nav` | Custom | No Material equivalent — main top navigation bar composition (composes nav-tab + action buttons) |
| `ds-nav-expand` | Custom | No Material equivalent — sub-nav panel expand/collapse toggle; `[open]` reflects current panel state; `(toggle)` emitted on click; icons: `right_panel_open` / `right_panel_close` (FILL=1, brand blue) |
| `ds-save-bar` | Custom | No Material equivalent — unsaved-changes bar; variants: `default` (blue border, info dot) / `error` (red border, error dot); outputs: `(cancelClick)`, `(saveProgressClick)`, `(saveAndExitClick)`; ADA: `role="status"` (default) / `role="alert"` (error) |
| `ds-modal` | `MatDialogModule` (optional) | Full-featured modal — sticky header, scrollable body, optional tabs slot (`[modal-tabs]`), optional actions footer (`[modal-actions]`); variants: `close` (×) / `collapse` (minimize); sizes: `fixed` (500px) / `full` (fills backdrop); `(dismissClick)` output; panelClass: `'ds-modal-overlay'` when using MatDialog |
| `ds-table-header-cell` | Custom | No Material equivalent — AG Grid custom header renderer |
| `ds-table-row-cell` | Custom | No Material equivalent — AG Grid custom cell renderer |
| `ds-table-toolbar` | Custom | No Material equivalent — AG Grid table toolbar |
| `ds-page-layout` | Custom | No Material equivalent — app shell composition (composes top-nav + nav-sidebar + ds-nav-expand); sub-nav open state managed via `[open]` input on ds-nav-expand and host class `.is-sub-nav-open` on the shell |
| `ds-split-page` | CdkDrag (CDK only) | No Material equivalent — two-pane resizable layout; resize handle uses CDK drag for production, fixed 50/50 split acceptable in prototypes; replace with `CdkDragModule` in engineering handoff |

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

---

## Git Workflow

- **Commit frequently** — commit after each component change or addition
- **Push in batches of 10** — only push to remote after 10 or more components have been changed or added since the last push
- **Always update CLAUDE.md** during each change (before committing), regardless of whether a push is due
- Track the count mentally: after a push, the counter resets to 0

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

---

## Extended Reference Files

Detailed specs are split into focused files — import these for deep work on specific areas:

@.claude/component-specs.md
@.claude/ada-standards.md
@.claude/preview-rules.md
