# Component Specifications

Detailed per-component specs for the Onflo Design System. Referenced from root CLAUDE.md.

---

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
- Angular Material base: `MatButtonModule`

---

### Icon Button (`ds-icon-button`)
- Variants: `icon` (ghost) | `filled` | `outlined` | `monogram`
- Sizes: `sm` (32px) | `md` (42px, default) — always `--radius-sm` (rounded square, NOT circular)
- **Outlined default**: grey border (`--color-border-primary`) + grey icon (`--color-icon-default`) + white bg (`--color-surface-page`) — turns blue on hover/focus/active
- Toggle: add `ds-icon-button-toggle` class; use `[aria-pressed]` + `.is-selected`
- Toggle variants: `icon` | `filled` | `outlined` | `outlined-letter`
- **Icon toggle selected**: NO background fill — only icon color changes to `--color-icon-brand`. Caller swaps icon content (e.g. outline → filled Material Symbol) for visual state change.
- **Outlined-letter toggle**: uses `--color-text-primary`/`--color-text-brand` (text tokens, not icon tokens); letter font = `--ref-typescale-title-h2-*` (20px, bold); unselected = white bg + grey border; selected = `--color-surface-brand` + `--color-border-active`
- ADA: always include `aria-label` — icon buttons have no visible text
- Angular Material base: `MatIconButtonModule`

---

### Input Field (`ds-input`)
- **Height: always 42px — fixed, no size variants**
- Has: label, helper text, error text, leading icon, trailing action button, prefix text, suffix text
- **Label typography**: label-small, `weight-prominent` (bold = `--ref-typescale-label-small-weight-prominent`), `--color-text-primary` — label does NOT turn red in error state
- **Helper/supporting text typography**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens
- **Error icon**: filled `error` Material Symbol (`ds-icon--filled ds-input__error-icon`) always appears in the trailing position when `is-error && !disabled` — replaces the trailing action button
- **Error state**: red border (`--color-border-input-error`), red helper text, filled error icon — label stays `--color-text-primary` (NOT red), trailing action button is hidden
- States: default, hover, focus, error (`.is-error`), disabled (`.is-disabled`), read-only (`.is-readonly`)
- ADA: `aria-invalid="true"` on `<input>` when error; `role="alert"` on error message; `aria-describedby` links input to helper
- Multi-line text: use `ds-textarea` (separate component — resizable, no fixed height)
- Angular Material base: `MatFormFieldModule` + `MatInputModule`

---

### Textarea (`ds-textarea`)
- **No fixed height — resizable** (min-height 96px); Angular Material base: `MatFormFieldModule` + `MatInputModule` (textarea)
- **Label typography**: label-small, `weight-prominent` (bold = `--ref-typescale-label-small-weight-prominent`), `--color-text-primary` — same as ds-input. Label does NOT turn red in error state.
- **Helper/supporting text typography**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens — same as ds-input.
- **Error state**: red border (`--color-border-input-error`), red helper text, label stays `--color-text-primary` (NOT red)
- **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern — same as ds-input

---

### Select (`ds-select`)
- **Visual design**: identical to ds-input — same 42px height, same label/helper/error token usage, same field appearance. They are the same component in Figma.
- **Angular Material**: `MatSelectModule` — `mat-select` inside `mat-form-field`; provides `role="listbox"`, keyboard navigation, and screen reader announcements out of the box
- **Height: always 42px — fixed, matches ds-input**
- **Label typography**: label-small, `weight-prominent` (bold), `--color-text-primary` — label does NOT turn red in error state
- **Helper/supporting text**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens — same as ds-input
- **Arrow icon**: `arrow_drop_down` Material Symbol (`ds-select__arrow`) via `matSuffix` — Material's built-in arrow is suppressed via `.mat-mdc-select-arrow-wrapper { display: none }`. Arrow hidden in error state.
- **Dropdown panel**: `panelClass="ds-select__panel"` on `<mat-select>` — global styles in `_select.scss` theme the CDK overlay panel. Selected option shows `--color-text-brand`. Material's `mat-pseudo-checkbox` is suppressed (hidden); accessible via `aria-selected`.
- **Error state**: red border (`--color-border-input-error`), red helper text, filled `error` icon replaces arrow, label stays `--color-text-primary`
- **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern — same as ds-input
- States: default, hover, focus, error (`.is-error`), disabled (`.is-disabled`)
- **No typing / no filtering** — for type-to-filter behaviour use `ds-autocomplete`

---

### Autocomplete (`ds-autocomplete`)
- **Purpose**: Type-to-filter input. Visually identical to ds-input (same 42px height, same label/helper/error token pattern). The dropdown panel is owned by the consumer — `ds-autocomplete` provides only the input field chrome and the `matAutocomplete` trigger connection.
- **Angular Material**: `MatAutocompleteModule` + `MatInputModule` inside `MatFormFieldModule`
- **Height: always 42px — fixed, matches ds-input**
- **Label typography**: label-small, `weight-prominent` (bold), `--color-text-primary` — label does NOT turn red in error state
- **Helper/supporting text**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens
- **Arrow icon**: `arrow_drop_down` Material Symbol (`ds-autocomplete__arrow`) via `matSuffix` — always shown except in error state (replaced by the error icon). Turns `--color-icon-brand` on focus when not in error. Disabled state: `--color-icon-disabled`.
- **Error state**: red border (`--color-border-input-error`), red helper text, filled `error` icon as `matSuffix` (arrow hidden), label stays `--color-text-primary`
- **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern — same as ds-input
- States: default, hover, focus, error (`.is-error`), disabled (`.is-disabled`), read-only (`.is-readonly`)
- **Inputs**: `label`, `placeholder`, `helperText`, `errorText`, `value`, `disabled`, `readonly`, `required`, `isError`, `panel` (MatAutocomplete — required)
- **Outputs**: `valueChange` (string, fires on every keystroke), `optionSelected` (forwarded `MatAutocompleteSelectedEvent` from `panel.optionSelected`)
- **Consumer pattern**:
  ```html
  <!-- Consumer owns the panel, options, and filtering -->
  <mat-autocomplete #auto panelClass="ds-autocomplete__panel" (optionSelected)="onSelect($event)">
    <mat-option *ngFor="let opt of filtered" [value]="opt.value">{{ opt.label }}</mat-option>
  </mat-autocomplete>

  <ds-autocomplete
    label="Search"
    [panel]="auto"
    [value]="query"
    (valueChange)="filter($event)"
  />
  ```
- **Panel theming**: opt-in — consumer adds `panelClass="ds-autocomplete__panel"` on their `<mat-autocomplete>`. Global styles in `_autocomplete.scss` apply the Onflo panel theme (matching ds-menu/ds-select panel look).
- **No Angular Material base for panel**: the panel is the consumer's `<mat-autocomplete>` — `ds-autocomplete` only owns the trigger input

---

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

---

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

---

### Card (`ds-card`)
- **Variants**: `outlined` (1px `--color-border-subtle` border, no shadow) | `elevated` (transparent border, double shadow)
- **Header** (`__header`): optional — rendered when any of `[icon]`, `[title]`, `[subtitle]`, or `[showClose]` is set
  - `__header-icon`: Material Symbol, `--color-icon-brand`, `flex-shrink: 0`, `margin-top: 2px` (aligns to cap height)
  - `__header-text`: `flex: 1`, `min-width: 0` — column for title + subtitle
  - `__close`: icon button (`ds-icon-button--icon ds-icon-button--sm`), `margin: -4px -4px 0 0` to align to top-right edge
- **Title** (`__title`): Title H4 (14px bold, `--ref-typescale-title-h4-*`), `--color-text-primary`
- **Subtitle** (`__subtitle`): Label Small (regular, `--ref-typescale-label-small-*`), `--color-text-secondary`
- **Body** (`__body`): `padding: --spacing-lg`; top padding reduced to `--spacing-sm` when header is present above
- **Actions** (`__actions`): optional footer — `border-top: 1px solid --color-border-subtle`; right-aligned (`justify-content: flex-end`); `gap: --spacing-sm`; padding `--spacing-sm --spacing-lg`. Use `__actions--start` for left-aligned actions.
- **Angular**: `[icon]` string (Symbol name) · `[title]` string · `[subtitle]` string · `[showClose]` bool · `(closeClick)` output. Project body content into default slot; project footer buttons into `[card-actions]` (presence detected via `@ContentChild(DsCardActionsDirective)`).
- Angular Material base: `MatCardModule`

---

### Card Item (`ds-card-item`)
- **Height**: `min-height: 56px` — flexible, grows for two-line content
- **Variants**: `outlined` (default, `--color-border-subtle` border) | `elevated` (shadow, transparent border)
- **Interactive** (`--interactive`): `cursor: pointer`; `::after` overlay — hover=`--overlay-hovered`, focus=`--overlay-focused`, press=`--overlay-pressed`; focus ring: `:focus-visible` only — `box-shadow: 0 0 0 3px --color-border-ada-focus-ring`
- **Layout**: `display: flex; align-items: center; gap: --spacing-md; padding: 0 --spacing-md`
- **Leading** (`__leading`): optional — `flex-shrink: 0`; `color: --color-icon-default`; `z-index: 1` (above overlay)
- **Body** (`__body`): `flex: 1; min-width: 0`; column flex for primary + secondary; `z-index: 1`
  - `__primary`: Body Medium (14px regular), `--color-text-primary`, truncated with ellipsis
  - `__secondary`: Body Small (12px regular), `--color-text-secondary`, truncated with ellipsis, `margin-top: 1px`
- **Trailing** (`__trailing`): optional static icon — `flex-shrink: 0`; `color: --color-icon-default`; `z-index: 1`
- **Action** (`__action`): optional — `flex-shrink: 0; z-index: 1`. Wrap the action button here; add `onclick="event.stopPropagation()"` (HTML) or `(click)="$event.stopPropagation()"` (Angular template) so clicks don't bubble to the card click handler.
- **Disabled** (`.is-disabled`): `pointer-events: none`; text/icons muted to `--color-text-disabled` / `--color-icon-disabled`
- **ADA**: `role="button"` + `tabindex="0"` on the `__interactive` div when interactive; `aria-disabled="true"` when disabled; keyboard: Enter + Space activate
- **Angular**: `[primary]` string · `[secondary]` string · `[interactive]` bool · `[variant]` string · `[disabled]` bool · `(cardClick)` output. Slots: `[leading]`, `[trailing]`, `[card-action]` — detected via `@ContentChild`. The `__action` wrapper in the Angular template calls `$event.stopPropagation()` automatically.
- No Angular Material base — custom component

---

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

---

### Badge (`ds-badge-indicator`)
- **This component is the notification indicator only** — not a label, chip, or status tag
- **Two sizes** (Figma: Large / Small):
  - **Large (count)**: `min-width: 20px; height: 20px` — red circle with white number. Label Small typography (12px), bold weight (600).
  - **Small (dot)**: add `ds-badge-indicator--dot` — 6×6px solid red circle, no text.
- **Color**: always `--color-surface-accent-red-bold` bg + `--color-text-on-bold` text. Not themeable.
- **Overlay mode** (on icon buttons): wrap host + button in `<div class="ds-badge-indicator__host">` — host gets `position: relative`; badge is centered on the button's top-right corner: count badge `top: -4px; right: -4px`, dot badge `top: -1px; right: -1px`
- **Badge size pairing**: MD button (42px) → Large count badge only. SM button (32px) → Small dot badge only.
- **Inline mode** (in tabs / nav): place `ds-badge-indicator` directly inside the tab `<button>` after the label text (no host wrapper needed — stays `inline-flex`)
- **ADA**: element is always `aria-hidden="true"`; count/dot must be announced via `aria-label` on the parent button (e.g. `aria-label="Activity, 3 new"`)
- **Angular**: `<ds-badge [count]="3" />` or `<ds-badge [dot]="true" />`
- Angular Material base: `MatBadgeModule`

---

### Dialog (`ds-dialog`)
- **Purpose**: Focused overlay for confirmations, forms, and alerts — not complex enough to need its own page.
- **Slots**: `[dialog-body]` holds all body content (title, body text, form fields); `[dialog-actions]` holds the button row. Both slots are always present.
- **Alignment**: left only — no center variant
- **Structure**: body slot → optional divider (`showDivider=true` by default) → actions row
- **Container**: `min-width: 280px`, `max-width: 560px`, `border-radius: --radius-md` (8px), `--color-surface-page` bg, double shadow elevation
- **Body padding**: `var(--spacing-lg)` top + sides, no bottom padding (divider spacing handles the gap below)
- **Body gap**: `var(--spacing-md)` (12px) between projected child elements
- **Divider**: 1px `--color-border-subtle` line, `margin-top: var(--spacing-lg)` (16px above the line)
- **Actions padding**: `var(--spacing-lg)` (16px) on all sides; `gap: var(--spacing-sm)` (8px) between buttons
- **Typography helpers** (optional convenience classes for projected content):
  - `ds-dialog__title` — Title H3 (16px, bold)
  - `ds-dialog__text` — Body Medium (14px, regular, 20px line-height, `--color-text-primary`)
- **`titleId` input**: string matching the `id` on the heading element inside `[dialog-body]` — wired to `aria-labelledby` on the dialog root
- **Backdrop**: `ds-dialog-backdrop` CSS class wraps the dialog in a full-screen scrim. For production use Angular CDK / `MatDialog` instead.
- **MatDialog integration**: set `panelClass: 'ds-dialog-overlay'` to strip Material's default container chrome
- **ADA**: `role="dialog"` + `aria-modal="true"` on the root; `aria-labelledby` via `titleId`; focus trapped while open (caller responsibility); Escape dismisses (caller handles close logic); focus returns to trigger on close
- Angular Material base: `MatDialogModule` (optional — for overlay/focus management)

---

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

---

### Tooltip (`ds-tooltip` / `[dsTooltip]`)
- **Typography**: Body Small — `--ref-typescale-body-small-*` (12px, 16px line-height, 0.4px tracking, regular weight, plain typeface)
- **Background**: `--color-surface-tooltip` (black/neutral-tooltip)
- **Text**: `--color-text-tooltip` (white/inverse)
- **Padding**: `var(--spacing-xs) var(--spacing-sm)` = 4px 8px
- **Border radius**: `var(--radius-sm)`
- **Min height**: 24px
- **Max width**: 300px (multi-line wraps at this width)
- **Positions**: `above` (default) | `below` | `left` | `right` — values match Angular Material's `TooltipPosition` type
- **No arrow** — plain rounded rectangle only; matches Figma design exactly. The Angular Material `::before` arrow is suppressed via `display: none` on `.mdc-tooltip__surface::before`.
- **ADA**: Required on all icon-only buttons; triggers on both hover and keyboard focus; `role="tooltip"` on the tooltip element
- **Angular**: `[dsTooltip]="'text'"` directive + `[dsTooltipPosition]`, `[dsTooltipShowDelay]`, `[dsTooltipHideDelay]`, `[dsTooltipDisabled]` inputs. `DsTooltipDirective` composes `MatTooltip` via `hostDirectives` — no custom DOM manipulation. Onflo tokens applied via global `.mat-mdc-tooltip` overrides in `_tooltip.scss`. Angular Material base: `MatTooltipModule`

---

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

---

### List (`ds-list` + `ds-list-item`)
- **Container** (`ds-list`): `<ul role="list">` wrapper — `border-radius: --radius-md`, 1px `--color-border-subtle` border, `overflow: hidden`
- **Item** (`ds-list-item`): flex row, `gap: --spacing-md`, `padding: --spacing-md --spacing-lg`, `min-height: 48px`
- **Text inputs**: `primary` (required), `secondary` (optional), `overline` (optional — uppercase label-small, letter-spacing token with 0.06em fallback)
- **Variants**: `1-line` (default) | `2-lines` | `3-lines` — set via `[variant]` input; `--3-lines` modifier clamps secondary to 2 lines via `-webkit-line-clamp: 2`
- **Leading slot**: `<ng-content select="[leading]">` — place `[leading]` attribute on projected content (`<span leading class="ds-icon">`, `<ds-checkbox leading />`, etc.)
- **Trailing slot**: `<ng-content select="[trailing]">` — same pattern; use `ds-icon--sm` for trailing chevrons
- **Slot guards**: `@ContentChild('[leading]', { static: false })` + `@ContentChild('[trailing]', { static: false })` with `ngAfterContentInit` + `markForCheck()` — wrapper divs only render when content is projected (prevents phantom flex gaps in OnPush)
- **Interactive modifier**: `ds-list-item--interactive` — adds hover (`--overlay-hovered`), pressed (`--overlay-pressed`), `:focus-visible` ring. Use in menus, nav lists. Do NOT use in pure selection lists (checkbox-only).
- **Disabled**: `.is-disabled` — `pointer-events: none`; text → `--color-text-disabled`; icons → `--color-icon-disabled` (scoped to `> .ds-icon` inside slots)
- **Focus ring**: `:focus-visible` only — `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` (outset, keyboard-only, standard simple-element ADA pattern)
- **ADA**: `role="listitem"` on items; `tabindex="0"` + `aria-disabled` on interactive/disabled items; checkbox in leading slot must have `aria-label` (caller responsibility)
- Angular Material base: `MatListModule`

---

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

---

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

---

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

---

### AG Grid Paginator (`ds-ag-paginator`)
- **Purpose**: Custom pagination panel that replaces AG Grid's built-in paginator. Use with `suppressPaginationPanel: true`.
- **Height**: 56px — fixed (matches AG Grid row / header height)
- **Background**: `--color-surface-subtle`; padding: `0 var(--spacing-lg)`; content: right-aligned
- **Integration**: Register as a status bar panel OR use standalone below the grid. Exposes `[api]` input (`AgPaginationApi`) and calls `agInit(params)` when used as a status panel.
- **"Items per page" selector**: `ds-select` component — 96px wide (constrained via `ds-ag-paginator__size-select` class), no label, `[options]` bound to `pageSizeSelectOptions` (number array mapped to `DsSelectOption[]`), `(valueChange)` calls `paginationSetPageSize`. The "Items per page:" span is `aria-hidden="true"` (visual label only). Always use `ds-select` — never a raw native `<select>`.
- **Range text**: `"1 - 50 of 200"` format (hyphen with spaces); Body Small typography (`--ref-typescale-body-small-*`); `--color-text-primary`; `aria-live="polite"`
- **Nav buttons**: 4 ghost buttons — `first_page`, `keyboard_arrow_left`, `keyboard_arrow_right`, `last_page`; 42×42px; `--radius-sm` (not `--radius-full`); disabled when at first/last page
- **Layout**: outer `gap: var(--spacing-lg)` (16px) between counter and pagination groups; inner groups `gap: var(--spacing-xs)` (4px)
- **ADA**: All nav buttons have `aria-label`; range label is `aria-live="polite"`
- **No Angular Material base** — custom component

---

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

### Agent Status (`ds-agent-status`)
- **Purpose**: Nav sidebar toggle for support agent availability — call queue or live chat. Tapping opens a status picker (dropdown is a separate composition, not part of this primitive).
- **Size**: 64×64px — fixed (matches `ds-nav-button` width; taller to accommodate the icon circle)
- **Variants**: `call` (icon: `support_agent`) | `live` (icon: `forum`) — Material Symbols Rounded, outlined, 24px
- **States**: online (default) | offline (`.is-offline` modifier)
- **Icon circle**: 42×42px, `border-radius: --radius-full`, bg: `--color-surface-subtle`
  - Online: icon colour `--color-icon-default`
  - Offline: icon colour `--color-icon-disabled`
- **Status row**: flex row, `gap: --spacing-xs`; Label Small typography (`--ref-typescale-label-small-*`), weight-prominent (600), `--color-text-primary`; chevron `keyboard_arrow_down` at 12px
  - Chevron: `--color-icon-default` (online), `--color-icon-disabled` (offline)
- **Indicator dot**: 10px circle, `border-radius: --radius-full`, absolute at `right: 11px; top: 33px` (bottom-right of icon circle)
  - Online: `--color-icon-accent-green`
  - Offline: `--color-icon-disabled`
- **Interaction overlay**: `::after` pseudo-element — hover: `--overlay-hovered`, active: `--overlay-pressed`
- **Focus ring**: `:focus-visible` only — `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)`
- **ADA**: `aria-label` = `"<Variant> agent status: <Online|Offline>"`; `aria-pressed` = online boolean
- **Angular inputs**: `[variant]="'call' | 'live'"`, `[online]="true | false"`
- **No Angular Material base** — custom component

---

## Page Layouts

CSS-only composition patterns. No component folder in `components/` — styles and demo HTML live in `preview/index.html`. Reference the preview for the canonical HTML structure.

---

### Page Layout (`ds-page-layout`)

- **Purpose**: Full application shell combining `ds-nav-sidebar`, `ds-top-nav`, an optional collapsible sub-navigation panel (`ds-subnav`), and a main content area.

#### HTML structure

```html
<div class="ds-page-layout">

  <!-- Left: nav sidebar -->
  <nav class="ds-nav-sidebar" role="navigation" aria-label="Main navigation">
    <!-- ds-nav-button items, ds-agent-status at bottom -->
  </nav>

  <!-- Right: top-nav + body -->
  <div class="ds-page-layout__content">

    <header class="ds-top-nav" role="banner">
      <!-- ds-nav-tab items, action buttons -->
    </header>

    <div class="ds-page-layout__body">

      <!-- Optional collapsible sub-nav panel -->
      <nav class="ds-subnav" role="navigation" aria-label="Section navigation">
        <!-- ds-subnav-button items and ds-subnav-header sections -->
      </nav>

      <!-- Main content area -->
      <main class="ds-page-content" role="main">
        <div class="ds-page-content__heading">
          <h1 class="ds-page-content__title">Page Title</h1>
          <!-- optional ds-tabs -->
        </div>
        <div class="ds-page-content__main">
          <!-- page body content -->
        </div>
      </main>

    </div><!-- /.ds-page-layout__body -->

  </div><!-- /.ds-page-layout__content -->

  <!-- Floating expand/collapse toggle (absolutely positioned at subnav right edge) -->
  <button class="ds-nav-expand"
          type="button"
          aria-label="Collapse sub navigation"
          aria-expanded="true">
    <span class="ds-icon ds-icon--filled" aria-hidden="true">right_panel_open</span>
  </button>

</div><!-- /.ds-page-layout -->
```

#### CSS class API

| Class | Element | Purpose |
|---|---|---|
| `.ds-page-layout` | Root | Outer shell — `position: relative; display: flex; height: 640px` |
| `.ds-page-layout__content` | Right column | `flex: 1; flex-direction: column` — top-nav stacked above body |
| `.ds-page-layout__body` | Body row | `flex: 1; display: flex` — subnav beside page-content |
| `.ds-subnav` | Sub-nav panel | `width: 195px; flex-shrink: 0` — collapsible side panel |
| `.ds-subnav.is-collapsed` | Sub-nav panel | `width: 0; opacity: 0; pointer-events: none` — hidden state |
| `ds-subnav-button` | Sub-nav leaf item | 32px button — selected: brand blue bg + white text; Angular: `<ds-subnav-button [label]="..." [selected]="..." />` |
| `ds-subnav-subheader` | Sub-nav section group — **settings subnav only** | Expandable row with vertical accent line + child items; **always nested inside `ds-subnav-header`**; never used in general page navigation subnav panels; Angular: `<ds-subnav-subheader [text]="..." [(expanded)]="...">` |
| `ds-subnav-header` | Sub-nav top header | Expandable top-level row with 12px icon + Label Small text; Angular: `<ds-subnav-header [text]="..." [icon]="..." [(expanded)]="...">` |
| `.ds-page-content` | Main area | `flex: 1; display: flex; flex-direction: column` |
| `.ds-page-content__heading` | Heading row | Title + optional tabs |
| `.ds-page-content__title` | H1 | Title H1 typography (`--ref-typescale-title-h1-*`) |
| `.ds-page-content__main` | Content card | `flex: 1; background: --color-surface-page; border-radius: --radius-lg; box-shadow: elevation-1` |

#### Angular wiring

- `ds-nav-sidebar`, `ds-top-nav`, `ds-nav-expand` are all Angular standalone components — import them in the host module/component.
- `ds-subnav` is a **CSS-only** pattern — no Angular component. Manage `is-collapsed` on the element via host component state.
- Toggle open/closed state: bind `(toggle)` output on `<ds-nav-expand>` to flip a boolean, apply `.is-collapsed` to `.ds-subnav`, and update `[open]` on `<ds-nav-expand>`.
- The `ds-nav-expand` button is absolutely positioned at the right edge of the sub-nav; its `left` value shifts when the panel collapses — this is handled by the `.ds-page-layout .ds-nav-expand.is-collapsed` CSS rule in the preview.

```typescript
// Host component (simplified)
subNavOpen = true;

onToggleSubnav() {
  this.subNavOpen = !this.subNavOpen;
}
```

```html
<div class="ds-page-layout">
  <ds-nav-sidebar />
  <div class="ds-page-layout__content">
    <ds-top-nav />
    <div class="ds-page-layout__body">
      <nav class="ds-subnav" [class.is-collapsed]="!subNavOpen" role="navigation" aria-label="Section navigation">
        <!-- subnav items -->
      </nav>
      <main class="ds-page-content" role="main">
        <!-- content -->
      </main>
    </div>
  </div>
  <ds-nav-expand [open]="subNavOpen" (toggle)="onToggleSubnav()" />
</div>
```

#### Prototype vs production

| Aspect | Hi-fi prototype | Production (engineering handoff) |
|---|---|---|
| Sub-nav collapse JS | Inline `onclick` toggling `.is-collapsed` | Angular state binding via `[class.is-collapsed]` |
| `ds-nav-expand` toggle | `onclick="toggleSubnav()"` | `(toggle)` output bound to host component method |
| Shell height | Fixed `640px` for preview frame | `height: 100vh` or `flex: 1` inside app root layout |
| `ds-subnav` items | Static HTML buttons | `*ngFor` over route config or menu items |
| ADA `aria-expanded` | Manually toggled in JS | Bound to `subNavOpen` boolean |

---

### Split Page Layout (`ds-split-page`)

- **Purpose**: Two-panel content area for detail views — a list or context panel beside a primary content panel. Used inside `ds-page-content__main`.

#### HTML structure

```html
<!-- Fixed 50/50 split (prototype default) -->
<!-- Engineering: replace with CdkDragModule for resizable handle -->
<div class="ds-split-page">
  <div class="ds-split-page__panel ds-split-page__panel--left">
    <!-- left panel content -->
  </div>
  <div class="ds-split-page__panel ds-split-page__panel--right">
    <!-- right panel content -->
  </div>
</div>

<!-- Resizable split (add ds-split-page--resizable + handle element) -->
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

#### CSS class API

| Class | Element | Purpose |
|---|---|---|
| `.ds-split-page` | Root | `display: flex; height: 100%; gap: 16px` |
| `.ds-split-page__panel` | Panel | `flex: 1 1 0; background: --color-surface-page; border-radius: --radius-lg; overflow: hidden` |
| `.ds-split-page__panel--left` | Left panel | Left content area |
| `.ds-split-page__panel--right` | Right panel | Right content area |
| `.ds-split-page__handle` | Drag handle | `width: 18px; flex-shrink: 0; cursor: col-resize` — visible only with `--resizable` modifier |
| `.ds-split-page__handle-line` | Handle accent | 2px vertical line above/below the drag icon |
| `.ds-split-page--resizable` | Root modifier | Shows the drag handle element |
| `.ds-split-page--7030` | Root modifier | 70/30 flex split |
| `.ds-split-page--3070` | Root modifier | 30/70 flex split |
| `.ds-split-page--7525` | Root modifier | 75/25 flex split |
| `.ds-split-page--2575` | Root modifier | 25/75 flex split |
| `.is-dragging` | Root state | Applied during active drag — `cursor: col-resize !important` on root and all children |

#### Angular wiring

- No Angular component — this is a pure CSS pattern. Apply classes directly to your template elements.
- For resizable panels, use `@angular/cdk/drag-drop` — import `CdkDragModule`.
- Bind `cdkDrag cdkDragLockAxis="x"` on the `.ds-split-page__handle` element.
- On `(cdkDragMoved)`, update the `flex-grow` values of both panels based on drag delta.
- On `(cdkDragStarted)` / `(cdkDragEnded)`, toggle `.is-dragging` on the root.

```typescript
import { CdkDragModule, CdkDragMove } from '@angular/cdk/drag-drop';

// In host component
onHandleDrag(event: CdkDragMove, container: HTMLElement) {
  const totalWidth = container.offsetWidth;
  const handleX = event.pointerPosition.x - container.getBoundingClientRect().left;
  const leftRatio = Math.max(0.2, Math.min(0.8, handleX / totalWidth));
  this.leftFlex = leftRatio;
  this.rightFlex = 1 - leftRatio;
}
```

```html
<div class="ds-split-page ds-split-page--resizable" #splitContainer [class.is-dragging]="isDragging">
  <div class="ds-split-page__panel ds-split-page__panel--left" [style.flex]="leftFlex + ' 1 0'"></div>
  <div class="ds-split-page__handle"
       cdkDrag cdkDragLockAxis="x"
       (cdkDragStarted)="isDragging = true"
       (cdkDragEnded)="isDragging = false"
       (cdkDragMoved)="onHandleDrag($event, splitContainer)"
       aria-label="Drag to resize panels" role="separator" aria-orientation="vertical" tabindex="0">
    <div class="ds-split-page__handle-line"></div>
    <span class="ds-icon" aria-hidden="true">drag_indicator</span>
    <div class="ds-split-page__handle-line"></div>
  </div>
  <div class="ds-split-page__panel ds-split-page__panel--right" [style.flex]="rightFlex + ' 1 0'"></div>
</div>
```

#### Prototype vs production

| Aspect | Hi-fi prototype | Production (engineering handoff) |
|---|---|---|
| Resize behavior | Static flex ratio OR demo-only `mousedown`/`mousemove` JS | `CdkDragModule` from `@angular/cdk/drag-drop` |
| Split ratio | Hardcoded modifier class (e.g. `ds-split-page--7030`) | Dynamic `[style.flex]` bindings driven by drag state |
| Handle ADA | `aria-hidden="true"` in prototype | `role="separator"`, `aria-orientation="vertical"`, `tabindex="0"`, keyboard arrow keys to resize |
| Default ratio | 50/50 (no modifier) acceptable for prototypes | Product team specifies the starting ratio per view |
