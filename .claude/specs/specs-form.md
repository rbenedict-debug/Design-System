# Component Specs — Form Controls

Button, Icon Button, Input, Textarea, Select, Autocomplete, Checkbox, Toggle

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
