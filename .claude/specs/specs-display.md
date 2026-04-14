# Component Specs — Display & Content

Card, Card Item, Tabs, Badge, List, Label, Empty State

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
  - **Large (count)**: `min-width: 20px; height: 20px` — coloured circle with white number. Label Small typography (12px), bold weight (600).
  - **Small (dot)**: add `ds-badge-indicator--dot` — 6×6px solid coloured circle, no text.
- **Color variants**: `red` (default) | `blue` | `grey` — all use `--color-text-on-bold` (white) text.
  - `red` (no modifier): `--color-surface-accent-red-bold` — notification / alert
  - `blue` (`ds-badge-indicator--blue`): `--color-surface-brand-bold` — informational
  - `grey` (`ds-badge-indicator--grey`): `--color-icon-subtle` — neutral / inactive
- **Angular `[variant]` input**: `'red'` (default) | `'blue'` | `'grey'` — adds the corresponding modifier class automatically.
- **Overlay mode** (on icon buttons): wrap host + button in `<div class="ds-badge-indicator__host">` — host gets `position: relative`; badge is centered on the button's top-right corner: count badge `top: -4px; right: -4px`, dot badge `top: -1px; right: -1px`
- **Badge size pairing**: MD button (42px) → Large count badge only. SM button (32px) → Small dot badge only.
- **Inline mode** (in tabs / nav): place `ds-badge-indicator` directly inside the tab `<button>` after the label text (no host wrapper needed — stays `inline-flex`)
- **ADA**: element is always `aria-hidden="true"`; count/dot must be announced via `aria-label` on the parent button (e.g. `aria-label="Activity, 3 new"`)
- **Angular**: `<ds-badge [count]="3" />` or `<ds-badge [dot]="true" />`
- Angular Material base: `MatBadgeModule`

---

### List (`ds-list` + `ds-list-item`)
- **Container** (`ds-list`): `<ul role="list">` wrapper — `border-radius: --radius-md`, 1px `--color-border-subtle` border, `overflow: hidden`
- **Item** (`ds-list-item`): flex row, `gap: --spacing-md`, `padding: --spacing-md --spacing-lg`, `min-height: 48px`
- **Text inputs**: `primary` (required), `secondary` (optional), `overline` (optional — uppercase label-small, letter-spacing token with 0.06em fallback)
- **Variants**: `1-line` (default) | `2-lines` | `3-lines` — set via `[variant]` input
  - `--2-lines` modifier: secondary text truncated to 1 line with ellipsis (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`)
  - `--3-lines` modifier: secondary wraps to 2 lines via `-webkit-line-clamp: 2`; leading/trailing slots shift to `align-items: flex-start` (top-aligned)
- **Divided variant**: `ds-list--divided` on the `<ul>` adds `border-bottom: 1px solid --color-border-subtle` between items. **Off by default** — use only for menus and dense data lists where separators aid scanability.
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
- **Pill padding**: MD = `0 16px`, SM = `0 12px`, XS = `0 8px` (symmetrical when no dot)
- **Dot indicator**: optional status dot — add `ds-label--has-dot` + `<span class="ds-label__dot" aria-hidden="true"></span>` as first child
  - Dot = 10px solid circle, colored via `--label-dot-color` CSS var (set per variant to `--color-border-accent-{color}`)
  - With dot: left padding reduces (right stays same) — MD = `12px`, SM = `8px`, XS = `4px`
- **Angular inputs**: `[pill]="true"` and `[dot]="true"` on `<ds-label>`; dot element rendered automatically when `pill && dot`

---

### Empty State (`ds-empty-state`)
- **Purpose**: Branded illustration + message for content areas with no data. Use any time a list, table, card, or page body returns zero results.
- **Sizes**: `sm` (default) | `lg`
  - `sm` — 48px graphic, Label Medium typography — use inside tables, cards, compact containers
  - `lg` — 97px graphic, Label Large typography — use for full-page empty views
- **Layouts**: `vertical` (default) | `horizontal`
  - `vertical` — graphic stacked above text; works in most containers
  - `horizontal` — graphic beside text; use when vertical space is constrained (e.g. small dashboard card)
- **Illustration**: inline SVG magnifying glass with question mark, `currentColor` — adapts to dark mode via `color: --color-icon-disabled` on `__graphic`
- **Heading typography**:
  - SM: `--ref-typescale-label-medium-*`, `weight-prominent` (600), `--color-text-secondary`
  - LG: `--ref-typescale-label-large-*`, `weight-prominent` (600), `--color-text-secondary`
- **Description typography**: `--ref-typescale-body-small-*`, regular weight, `--color-text-secondary` — optional
- **Actions slot**: `<ng-content />` inside `__body` — project `ds-button` or any action element; optional
- **Gap**: `--spacing-xs` (4px) between graphic and body for sm; `--spacing-sm` (8px) for lg
- **ADA**: `__graphic` is `aria-hidden="true"` (decorative illustration); heading text conveys the state to screen readers; no `role` needed on root
- **Inputs**: `[size]="'sm' | 'lg'"`, `[layout]="'vertical' | 'horizontal'"`, `[heading]="string"`, `[description]="string"`
- **Default heading**: `'No data available'` — always override with a context-specific message in production
- **No Angular Material base** — custom component
