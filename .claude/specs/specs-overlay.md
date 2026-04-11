# Component Specs — Overlays & Feedback

Dialog, Alert, Tooltip, Hover Card

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
