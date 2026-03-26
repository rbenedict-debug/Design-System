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

## Component Specifications

### Button (`ds-button`)
- Variants: `filled` | `outlined` | `text` | `destructive` | `destructive-outlined`
- Sizes: `xs` (24px) | `sm` (32px) | `md` (42px, default) | `lg` (56px) — heights fixed via `min-height`
- **Padding (horizontal only, no vertical)**:
  - No icon: `xs=--spacing-sm (8px)`, `sm=--spacing-lg (16px)`, `md=--spacing-xl (24px)`, `lg=32px (calc(xl+sm))`
  - Icon present: icon side uses `--spacing-lg (16px)`, non-icon side keeps full padding
  - Apply `ds-button--leading-icon` for leading icon, `ds-button--trailing-icon` for trailing icon — do NOT use `:has()` to infer padding
- **Icon size**: `xs=12px`, `sm=16px`, `md=18px`, `lg=20px` — applies to both `__icon` SVG wrapper and `ds-icon` Material Symbol spans inside the button
- Typography: label-large (`--ref-typescale-label-large-*`), weight-prominent (`--ref-typeface-weight-bold` = 600) — applies to all sizes except XS (label-small)
- **Outlined border**: `--color-border-primary` (grey) — NOT `--color-border-brand` (blue). Text color is `--color-text-brand` (blue).
- **Destructive (text)**: transparent bg, no border, `--color-text-primary` — looks neutral by default. On hover/active: `--overlay-accent-red-hovered/pressed` bg + `--color-text-accent-red` text (icon follows via `currentColor`).
- **Destructive Outlined**: transparent bg, `--color-border-primary` (grey) border, `--color-text-primary` — looks like a normal outlined button by default. On hover/active: red overlay + `--color-text-accent-red` + `--color-border-accent-red`. Neither destructive variant uses red by default — red only appears on interaction.
- States: default, hover, focus, active, disabled, `.is-error`, `.is-loading`
- **Error state** (`.is-error`): filled → `--color-surface-error` bg + `--color-text-error`; outlined/destructive-outlined → `--color-border-error` border + `--color-text-error`; text/destructive → `--color-text-error` only. Hover uses `--overlay-accent-red-hovered`.
- **Loading state** (`.is-loading`): `cursor: wait`, `pointer-events: none`, CSS spinner via `::before` (14px circle border, `currentColor`, `border-top-color: transparent`, 0.7s spin animation `ds-btn-spin`)

### Icon Button (`ds-icon-button`)
- Variants: `icon` (ghost) | `filled` | `outlined` | `monogram`
- Sizes: `sm` (32px) | `md` (42px, default) — always `--radius-sm` (rounded square, NOT circular)
- **Outlined default**: grey border (`--color-border-primary`) + grey icon (`--color-icon-default`) + white bg (`--color-surface-page`) — turns blue on hover/focus/active
- Toggle: add `ds-icon-button-toggle` class; use `[aria-pressed]` + `.is-selected`
- Toggle variants: `icon` | `filled` | `outlined` | `outlined-letter`
- **Icon toggle selected**: NO background fill — only icon color changes to `--color-icon-brand`. Caller swaps icon content (e.g. outline → filled Material Symbol) for visual state change.
- **Outlined-letter toggle**: uses `--color-text-primary`/`--color-text-brand` (text tokens, not icon tokens); letter font = `--ref-typescale-title-h2-*` (20px, bold); unselected = white bg + grey border; selected = `--color-surface-brand` + `--color-border-active`
- ADA: always include `aria-label` — icon buttons have no visible text

### Input Field (`ds-input`)
- **Height: always 42px — fixed, no size variants**
- Has: label, helper text, error text, leading icon, trailing action button, prefix text, suffix text
- **Label typography**: label-medium, `weight-prominent` (600/bold = `--ref-typescale-label-medium-weight-prominent`), `--color-text-secondary` — label does NOT turn red in error state
- **Helper/supporting text typography**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens
- **Error icon**: filled `error` Material Symbol (`ds-icon--filled ds-input__error-icon`) always appears in the trailing position when `is-error && !disabled` — replaces the trailing action button
- **Error state**: red border (`--color-border-input-error`), red helper text, filled error icon — label stays `--color-text-secondary` (NOT red), trailing action button is hidden
- States: default, hover, focus, error (`.is-error`), disabled (`.is-disabled`), read-only (`.is-readonly`)
- ADA: `aria-invalid="true"` on `<input>` when error; `role="alert"` on error message; `aria-describedby` links input to helper
- Multi-line text: use `ds-textarea` (separate component — resizable, no fixed height)

### Textarea (`ds-textarea`)
- **No fixed height — resizable** (min-height 96px); Angular Material base: `MatFormFieldModule` + `MatInputModule` (textarea)
- **Label typography**: label-medium, `weight-prominent` (600/bold = `--ref-typescale-label-medium-weight-prominent`), `--color-text-secondary` — same as ds-input. Label does NOT turn red in error state.
- **Helper/supporting text typography**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens — same as ds-input.
- **Error state**: red border (`--color-border-input-error`), red helper text, label stays `--color-text-secondary` (NOT red)
- **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern — same as ds-input

### Select (`ds-select`)
- **Visual design**: identical to ds-input — same 42px height, same label/helper/error token usage, same field appearance. They are the same component in Figma.
- **Angular Material**: `MatSelectModule` — native `<select>` element with custom arrow icon
- **Height: always 42px — fixed, matches ds-input**
- **Label typography**: label-medium, `weight-prominent` (600/bold), `--color-text-secondary` — label does NOT turn red in error state
- **Helper/supporting text**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens — same as ds-input
- **Arrow icon**: `expand_more` Material Symbol (`ds-select__arrow`) — hidden in error state
- **Error state**: red border (`--color-border-input-error`), red helper text, filled `error` icon replaces arrow (same pattern as ds-input error icon replacing trailing action), label stays `--color-text-secondary`
- **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern — same as ds-input
- States: default, hover, focus, error (`.is-error`), disabled (`.is-disabled`)

### Checkbox (`ds-checkbox`)
- **Touch target**: 42×42px circle (`__touch` wrapper) — matches ADA touch target minimum
- **Visual icon**: 24×24px Material Symbols Rounded via `::after` on `__box`
  - Unchecked: `check_box_outline_blank` FILL=0, colour `--color-border-input`
  - Checked: `check_box` FILL=1, colour `--color-surface-brand-bold`
  - Indeterminate: `indeterminate_check_box` FILL=1, colour `--color-surface-brand-bold`
  - Error unchecked: colour `--color-border-input-error`
  - Error checked/indeterminate: colour `--color-surface-accent-red-bold`
  - Disabled: colour `--color-icon-disabled`
- **State layer** (`__touch`): hover=`--overlay-hovered`, pressed=`--overlay-pressed`
- **Error state layer**: hover=`--overlay-accent-red-hovered`, pressed=`--overlay-accent-red-pressed`
- **Focus**: `box-shadow: 0 0 0 2px --color-border-ada-focus-ring` on `__touch` (keyboard only)
- **Error focus**: `box-shadow: 0 0 0 2px --color-border-input-error` on `__touch`
- **ADA**: `aria-checked="mixed"` for indeterminate state; must have a visible label
- **Gap**: `var(--spacing-xs)` — touch target provides visual padding
- Angular Material base: `MatCheckboxModule`

### Toggle / Switch (`ds-toggle`)
- **Track**: 52×32px, `padding: var(--spacing-xs)` (4px), radius-full
- **Off track**: `--color-surface-default` (light grey, no border)
- **On track**: `--color-surface-brand-bold` (blue)
- **Disabled track**: `--color-surface-disabled` + `border: 2px solid --color-border-subtle`
- **Thumb**: 24×24px, `--color-icon-on-brand` (white), no shadow
- **Thumb translate when on**: 20px (52 − 2×4 − 24 = 20)
- **State layer**: `::before` on thumb, `inset: -8px` (creates 40px circle) — hover/pressed overlays
- **Icon variant**: `ds-toggle--icon` modifier — `::after` shows `check` (on) or `close` (off) via Material Symbols; icon colours: on=`--color-surface-brand-bold`, off=`--color-text-secondary`
- **ADA**: `role="switch"` + `aria-checked` on the hidden input; must have a visible label
- **Focus**: `box-shadow: 0 0 0 3px --color-border-ada-focus-ring` on track (keyboard only)
- Angular Material base: `MatSlideToggleModule`

### Tabs (`ds-tabs` + `ds-tab`)
- **Height: always 48px — fixed**
- Text colour: always `--color-text-primary` in all states (default, hover, selected, disabled)
- Font weight: always bold (`--ref-typeface-weight-bold`) — never changes between states
- Selected indicator: 2px bar `position: absolute; bottom: 0` inside the tab (not outside at `-2px`)
- Selected indicator colour: `--color-surface-nav-active`
- Badge: 6px notification dot (`ds-tabs__dot`) — **never a count badge**. Use `[showBadge]="true"` on `ds-tab`.
- Focus: `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` — standard ADA focus ring (same as all components)
- Min-width: 56px; border-bottom of container: 1px (not 2px)
- ADA: `role="tablist"` on container, `role="tab"` + `aria-selected` on buttons, arrow key / Home / End navigation via `@HostListener('keydown')`
- Angular Material base: `MatTabsModule` (mat-tab-group + mat-tab)

### Badge (`ds-badge-indicator`)
- **This component is the notification indicator only** — not a label, chip, or status tag
- **Two sizes** (Figma: Large / Small):
  - **Large (count)**: `min-width: 20px; height: 20px` — red circle with white number. Label Small typography (12px), bold weight (600).
  - **Small (dot)**: add `ds-badge-indicator--dot` — 6×6px solid red circle, no text.
- **Color**: always `--color-surface-accent-red-bold` bg + `--color-text-on-bold` text. Not themeable.
- **Overlay mode** (on icon buttons): wrap host + button in `<div class="ds-badge-indicator__host">` — host gets `position: relative`; badge is centered on the button's top-right corner: count badge `top: -10px; right: -10px`, dot badge `top: -3px; right: -3px`
- **Badge size pairing**: MD button (42px) → Large count badge only. SM button (32px) → Small dot badge only.
- **Inline mode** (in tabs / nav): place `ds-badge-indicator` directly inside the tab `<button>` after the label text (no host wrapper needed — stays `inline-flex`)
- **ADA**: element is always `aria-hidden="true"`; count/dot must be announced via `aria-label` on the parent button (e.g. `aria-label="Activity, 3 new"`)
- **Angular**: `<ds-badge [count]="3" />` or `<ds-badge [dot]="true" />`
- Angular Material base: `MatBadgeModule`

### Alert (`ds-alert`)
- **Sizes**: `sm` (default) | `lg`
- **Variants**: `info` | `success` | `warning` | `error`
- **SM layout**: single row — tinted background + colored border, icon + `__content` (title + body) side-by-side. `align-items: flex-start`, `gap: --spacing-sm`, `padding: --spacing-md`
- **LG layout**: two-section — `__header` (tinted bg, icon + `__label` text, `align-items: center`) + `__body` (white `--color-surface-overlay` bg, body text only). Header padding: `--spacing-md`, body padding: `--spacing-lg`
- **Icon**: 24px Material Symbols Rounded, `FILL=1` (filled). Colors: `--color-icon-info/success/warning/error`
- **Title typography** (SM `__title`): `--ref-typescale-title-h3-*` (16px, bold, 24px line-height)
- **Label typography** (LG `__label`): `--ref-typescale-label-large-*` (16px, bold-prominent, 16px line-height)
- **Body typography** (`__message`): `--ref-typescale-body-medium-*` (14px, regular, 20px line-height)
- **Surface colors**: `--color-surface-{variant}` for SM bg and LG header bg; `--color-surface-overlay` for LG outer/body bg
- **Border colors**: `--color-border-{variant}`, 1px solid, `--radius-md`
- **ADA**: `role="alert"` for error/warning; `aria-live="polite"` for info/success. Never color alone — icon + text both convey status. No Angular Material base — custom component.

### Tooltip (`ds-tooltip` / `[dsTooltip]`)
- **Typography**: Body Small — `--ref-typescale-body-small-*` (12px, 16px line-height, 0.4px tracking, regular weight, plain typeface)
- **Background**: `--color-surface-tooltip` (black/neutral-tooltip)
- **Text**: `--color-text-tooltip` (white/inverse)
- **Padding**: `var(--spacing-xs) var(--spacing-sm)` = 4px 8px
- **Border radius**: `var(--radius-sm)`
- **Min height**: 24px
- **Max width**: 200px (multi-line wraps at this width)
- **Positions**: `above` (default) | `below` | `left` | `right` — values match Angular Material's `TooltipPosition` type
- **No arrow** — plain rounded rectangle only; matches Figma design exactly. The Angular Material `::before` arrow is suppressed via `display: none` on `.mdc-tooltip__surface::before`.
- **ADA**: Required on all icon-only buttons; triggers on both hover and keyboard focus; `role="tooltip"` on the tooltip element
- **Angular**: `[dsTooltip]="'text'"` directive + `[dsTooltipPosition]`, `[dsTooltipShowDelay]`, `[dsTooltipHideDelay]`, `[dsTooltipDisabled]` inputs. `DsTooltipDirective` composes `MatTooltip` via `hostDirectives` — no custom DOM manipulation. Onflo tokens applied via global `.mat-mdc-tooltip` overrides in `_tooltip.scss`. Angular Material base: `MatTooltipModule`

### Hover Card (`ds-hover-card`)
- **Variants**: `bottom` (default) | `top`
  - `bottom` — card appears below the cursor; 4px accent border on **top** edge
  - `top` — card appears above the cursor; 4px accent border on **bottom** edge
- **Width**: 360px — fixed
- **Background**: `--color-surface-page` (white)
- **Border**: 4px `--color-border-hover` (light blue) on the accent edge only — no border on the other three sides
- **Border radius**: `--radius-lg` (16px)
- **Shadow**: `0 3px 12px 6px var(--shadow-elevation-3), 0 4px 4px 0 var(--shadow-elevation-3)` — matches Figma elevation
- **Body padding**: `var(--spacing-lg)` (16px); gap between items: `var(--spacing-md)` (12px)
- **Enter animation**: `opacity 0 → 1` + `translateY(-4px → 0)` (bottom), `translateY(4px → 0)` (top); 0.12s ease
- **Visibility**: controlled by `.is-visible` class; `pointer-events: none` always (card never captures pointer)
- **Typography helpers** (optional convenience classes):
  - `__title` — Title H3 (16px, bold, 24px line-height, `--color-text-primary`)
  - `__subtitle` — Title H4 (14px, bold, 20px line-height, `--color-text-secondary`)
  - `__text` — Body Medium (14px, regular, 20px line-height, `--color-text-primary`)
- **Angular inputs**: `[variant]="'bottom' | 'top'"`, `[offsetX]` (default 16), `[offsetY]` (default 16)
- **Angular content projection**: default slot = trigger element; `[card-content]` attr slot = card body content
- **Cursor tracking**: `mousemove` runs outside Angular zone via `NgZone.runOutsideAngular` + `Renderer2.listen`; position written directly via `renderer.setStyle` bypassing CD
- **Keyboard**: also shown on `focusin` (positioned near the trigger rect); hidden on `focusout`
- **ADA**: `role="tooltip"` + `[attr.aria-hidden]` on card; do not hide critical actions behind hover only
- **No Angular Material base** — custom component

### Label (`ds-label`)
- **Variants (color)**: `green` | `red` | `yellow` | `brand` | `blue` | `navy` | `teal` | `orange` | `purple` | `pink` | `disabled`
- **Sizes**: `xs` (24px) | `sm` (32px) | `md` (42px, default)
- **Outline**: `ds-label--outline` adds 1px colored border; default (no modifier) = fill only, no border
- **Heights**: fixed — 42px (md), 32px (sm), 24px (xs)
- **Padding**: horizontal only — 16px (md), 12px (sm), 10px (xs)
- **Typography**: `--ref-typescale-label-medium-*` (14px, `weight-prominent`=bold, 14px line-height, 0.25px tracking)
- **Text color**: always `--color-text-primary` for all color variants; `--color-text-disabled` for disabled
- **Display-only**: not interactive, not removable — use `ds-chip` for removable items
- **No Angular Material base** — custom component

#### Pill style (`ds-label--pill`)
- **Modifier**: `ds-label--pill` — overrides `border-radius` to `var(--radius-full)` (fully rounded); adjusts padding
- **Pill padding**: MD = `0 12px`, SM = `0 12px`, XS = `0 8px` (tighter than rectangular)
- **Dot indicator**: optional status dot — add `ds-label--has-dot` + `<span class="ds-label__dot" aria-hidden="true"></span>` as first child
  - Dot = 10px solid circle, colored via `--label-dot-color` CSS var (set per variant to `--color-border-accent-{color}`)
  - With dot: left padding reduces — MD/SM = `8px`, XS = `4px`
- **Angular inputs**: `[pill]="true"` and `[dot]="true"` on `<ds-label>`; dot element rendered automatically when `pill && dot`

### Table Header Cell (`ds-table-header-cell`)
- **Primitive** — internal component used inside `component/table-header-row`. AG Grid custom header renderer.
- **Height: 56px — fixed**
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Properties**: `align` (left/right), `sorting`, `filtering`, `menuControl`, `checkbox`, `pipeLeft`, `pipeRight`
- **Label typography**: `--ref-typescale-label-medium-*`, weight-prominent (bold), truncated with ellipsis
- **Resize bar**: 2px × 14px, `--color-border-primary`, inside 16px handle container; `pipeRight = true` by default, `pipeLeft = false` by default; `--active` modifier on the trailing handle enables `cursor: col-resize` and drag behavior
- **Resize drag**: `(mousedown)` on the right handle starts a drag that calls `params.api.setColumnWidth()` and emits `(widthChange)`; `AgHeaderParams` interface includes `column.getActualWidth()` and `api.setColumnWidth(key, newWidth)`
- **Icon buttons** (sort / filter / menu): use `<ds-icon-button size="sm" variant="icon">` — 32×32px ghost
- **Sort button**: `arrow_upward_alt` icon — only shown when column IS sorted. Sort state class on the icon span: `__sort-icon--asc` (brand), `__sort-icon--desc` (brand + rotate 180°). **When unsorted (`sortDirection === null`), do NOT render the sort button at all — no arrow shown.**
- **Filter button**: `<span class="ds-icon ds-icon--filled">filter_alt</span>` — always filled icon; default ghost colour (`--color-icon-default`)
- **Menu button**: icon uses `__menu-icon` class — `--color-icon-default` (grey ghost, turns brand on hover via ghost button styles); passes wrapper `div#menuBtnEl` to `onMenuClick()` as AG Grid positioning anchor
- **Checkbox** (select-all): `check_box_outline_blank` | `check_box` (filled, brand) | `indeterminate_check_box` (filled, brand)
- **Checkbox-only column**: auto-detected when `checkbox === true && !label` — applies `--checkbox-only` modifier (56px fixed width, both resize handles hidden); use with no `label` input
- **Right align**: `ds-table-header-cell__content--right` applies `justify-content: flex-end`
- **AG Grid**: implements `IHeaderAngularComp` — receives `agInit(params)`, `refresh(params)`, cleans up `sortChanged` listener and resize drag listeners in `ngOnDestroy`
- **No Angular Material base** — custom component

### Table Row Cell (`ds-table-row-cell`)
- **Primitive** — internal component used inside `component/table-row`. AG Grid custom cell renderer.
- **Height: 56px — fixed**
- **Padding**: `16px` horizontal (not resize handles — different from header cell)
- **Border-bottom**: 1px `--color-border-subtle` (lighter than header's `--color-border-secondary`)
- **States**: Default (transparent) | Hover (`.is-hovered` → `--overlay-hovered`) | Focus (`.is-focused` → `--overlay-focused`)
- **Properties**: `align` (left/right), `cellData`, `gripper`, `checkbox`, `tier1Indent` (32px), `tier2Indent` (64px)
- **Cell data typography**: `--ref-typescale-body-medium-*`, regular weight (400), 14px, 20px line-height, truncated with ellipsis
- **Left align**: `__data` has `flex: 1 0 0` (fills space). **Right align**: `__data--right` + `__content--right` (justify-end + shrink)
- **Gripper**: 32×32px ghost button, `drag_indicator` icon, cursor `grab` / `grabbing`
- **Checkbox**: same icon pattern as header checkbox — `check_box_outline_blank` / `check_box` / `indeterminate_check_box`
- **Tier indents**: `__indent--tier1` = 32px spacer, `__indent--tier2` = 64px spacer (for tree/grouped row hierarchy)
- **AG Grid**: implements `ICellRendererAngularComp` — `agInit(params)`, `refresh(params)`, syncs `checked` via `rowSelected` event
- **No Angular Material base** — custom component

### AG Grid Paginator (`ds-ag-paginator`)
- **Purpose**: Custom pagination panel that replaces AG Grid's built-in paginator. Use with `suppressPaginationPanel: true`.
- **Height**: 56px — fixed (matches AG Grid row / header height)
- **Background**: `--color-surface-subtle`; padding: `0 var(--spacing-lg)`; content: right-aligned
- **Integration**: Register as a status bar panel OR use standalone below the grid. Exposes `[api]` input (`AgPaginationApi`) and calls `agInit(params)` when used as a status panel.
- **"Items per page" selector**: Native `<select>` styled as `ds-input` — 80px × 42px, left-padding 16px, `arrow_drop_down` icon overlay (pointer-events: none), `--radius-sm`
- **Range text**: `"1 - 50 of 200"` format (hyphen with spaces); Body Small typography (`--ref-typescale-body-small-*`); `--color-text-primary`; `aria-live="polite"`
- **Nav buttons**: 4 ghost buttons — `first_page`, `keyboard_arrow_left`, `keyboard_arrow_right`, `last_page`; 42×42px; `--radius-sm` (not `--radius-full`); disabled when at first/last page
- **Layout**: outer `gap: var(--spacing-lg)` (16px) between counter and pagination groups; inner groups `gap: var(--spacing-xs)` (4px)
- **ADA**: All nav buttons have `aria-label`; range label is `aria-live="polite"`
- **No Angular Material base** — custom component

### Table Toolbar (`ds-table-toolbar`)
- **Purpose**: Toolbar above an AG Grid table — holds search, filter, settings, and action controls.
- **Height**: 74px — fixed
- **Layout**: two `flex: 1 0 0` panels side-by-side with `gap: var(--spacing-xl)` (24px); padding `0 var(--spacing-lg)` (16px)
- **Left panel** (`__left`): action buttons slot — `flex: 1 0 0`, `gap: var(--spacing-sm)`. Omit the `__left` div (or `[showActions]="false"`) for search-only mode; right panel fills full width.
- **Right panel** (`__right`): `flex: 1 0 0`, `gap: var(--spacing-sm)`. Contains: search (flex-fills remaining space), optional `[toolbar-extra]` content, filter toggle, settings toggle, optional download / `[toolbar-trailing]` content.
- **Icon buttons**: The Angular component uses `ds-icon-button-toggle` (variant="outlined") for filter and settings, and `ds-icon-button` (variant="outlined") for download. The `__btn` CSS class is preserved for the HTML class API and projected `[toolbar-trailing]` slot content only — it mirrors `ds-icon-button--outlined` behavior.
- **Content projection slots**:
  - `[toolbar-actions]` — left-side action buttons
  - `[toolbar-extra]` — right-side extras between search and fixed icon buttons (filter/date chips, dropdowns)
  - `[toolbar-trailing]` — right-side trailing buttons after settings (replaces or supplements download)
- **Inputs**: `showActions` (bool, default true), `searchPlaceholder`, `searchAriaLabel`, `searchValue`, `filterActive`, `settingsActive`, `showDownload` (bool, default true)
- **Outputs**: `searchValueChange`, `search`, `filterActiveChange`, `settingsActiveChange`, `downloadClick`
- **ADA**: Filter/settings buttons expose `aria-pressed`; all icon buttons have `aria-label`
- **No Angular Material base** — custom component

---

## Preview (`preview/index.html`)

- **Self-contained** — all token CSS and component CSS is inlined. No external file dependencies.
- Token CSS lives between `<!-- ONFLO-TOKENS:START -->` and `<!-- ONFLO-TOKENS:END -->` sentinel markers (auto-updated by `npm run generate-tokens`)
- Component CSS lives in a **separate `<style>` block after the sentinel** — never inside the sentinel block
- Every component gets: a sidebar nav link, a section with description + source path, live interactive demo rows
- Demo row pattern: label (180px wide) + items flex row with `gap: 12px`

### Table components — shared full sim

Table-family components (`ds-table-header-cell`, `ds-table-row-cell`, `ds-ag-paginator`, `ds-table-toolbar`, and any future AG Grid primitives) follow a different preview rule:

- **No sim demo-row inside the individual component section.** Each component section shows only its own isolated variants (states, modifiers, etc.).
- **One shared `#table` section** sits at the top of the table group (before `#table-header-cell`) and contains a single comprehensive full simulation: toolbar → header row → data rows → paginator.
- **Update the `#table` sim whenever a new table component is added** — add it to the sim so the composed view stays current.
- The `#table` nav link appears first in the table group in the sidebar.

---

## ADA / Accessibility Standards

All components must meet WCAG 2.1 AA. These rules are non-negotiable.

### Focus ring
- **Always** use `:focus-visible` (not `:focus`) for the visible focus ring — `:focus-visible` only activates during keyboard navigation, never on mouse clicks. This is correct ADA behaviour.
- Two patterns apply depending on element type:

  **Simple elements** (buttons, links, tabs — any element that is itself the focusable target):
  ```scss
  &:focus         { outline: none; }           // suppress browser default on ALL focus
  &:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); } // keyboard only
  ```

  **Composite wrappers** (ds-input, ds-select, ds-textarea — wrapper divs that use `:focus-within` because the inner `<input>` receives focus, not the wrapper):
  ```scss
  // Composite wrappers using :focus-within (ds-input, ds-select, ds-textarea)
  &:focus-within                         { /* border-color change only — no ring */ }
  &:focus-within:not([data-mouse-focus]) { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
  // data-mouse-focus is set on mousedown/touchstart via HostListener in the Angular component
  // and via the preview's JS handler — it suppresses the ring for pointer-initiated focus.
  ```
- **Never** use `outline` as the focus indicator — it cannot be styled consistently across browsers
- **Never** use `border-color` as a substitute for the focus ring — borders affect layout and are inconsistent
- `overflow: hidden` on an element does NOT clip its own `box-shadow` — only a parent's clips a child's. `box-shadow` focus rings are safe regardless of an element's own overflow.

### Roles and ARIA
- Buttons that open/close: `aria-expanded`
- Icon-only buttons: always `aria-label` — no exceptions
- Tabs: `role="tablist"` on container, `role="tab"` + `aria-selected` on each tab button
- Inputs: `aria-invalid="true"` when in error state; `role="alert"` on error messages; `aria-describedby` linking input to helper/error text
- Disabled interactive elements: `aria-disabled="true"` (keep in tab order for screen readers) OR `disabled` attribute (removes from tab order) — use `disabled` for form controls, `aria-disabled` for custom interactive elements
- Loading/skeleton states: `aria-busy="true"` on the container being loaded

### Keyboard navigation
- All interactive elements must be reachable and operable via keyboard
- Tabs component: arrow keys (Left/Right) move between tabs; Home/End jump to first/last; Enter/Space select
- Dialogs: trap focus inside when open; Escape closes; return focus to trigger on close
- Menus: arrow keys navigate items; Escape closes and returns focus to trigger

### Colour contrast
- All text must meet WCAG AA contrast ratios: 4.5:1 for body text, 3:1 for large text and UI components
- Never convey information with colour alone — always pair with an icon, label, or pattern

---

## Git Workflow

- **Commit frequently** — commit after each component change or addition
- **Push in batches of 10** — only push to remote after 10 or more components have been changed or added since the last push
- **Always update CLAUDE.md** during each change (before committing), regardless of whether a push is due
- Track the count mentally: after a push, the counter resets to 0

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
| `ds-dialog` | `MatDialogModule` | mat-dialog |
| `ds-menu` | `MatMenuModule` | mat-menu |
| `ds-accordion` | `MatExpansionModule` | mat-accordion + mat-expansion-panel |
| `ds-chip` | `MatChipsModule` | mat-chip |
| `ds-divider` | `MatDividerModule` | mat-divider |
| `ds-list` | `MatListModule` | mat-list + mat-list-item |
| `ds-paginator` | `MatPaginatorModule` | mat-paginator |
| `ds-snackbar` | `MatSnackBarModule` | MatSnackBar service |
| `ds-label` | Custom | Display-only tag — no Material equivalent |
| `ds-skeleton` | Custom | No Material equivalent — aria-busy pattern |
| `ds-ag-paginator` | Custom | AG Grid custom pagination panel — no Material equivalent |

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
