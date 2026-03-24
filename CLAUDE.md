# Onflo Design System — Claude Working Rules

This file is read automatically by Claude Code at the start of every session.
It contains the rules, conventions, and decisions that govern this design system.
Update it whenever a new rule is established or an existing one changes.

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
  icon/                    # ds-icon utility (Material Symbols Rounded)
  button/                  # ds-button
  icon-button/             # ds-icon-button + ds-icon-button-toggle
  input/                   # ds-input
  checkbox/                # ds-checkbox
  radio/                   # ds-radio + ds-radio-group
  toggle/                  # ds-toggle
  badge/                   # ds-badge
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

We use **Material Symbols Rounded** with the variable font FILL axis for outlined/filled:

```html
<!-- Add to index.html in Angular projects -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
```

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
- Focus ring: always `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` — never `outline`
- **Note:** `overflow: hidden` on an element does NOT clip its own `box-shadow` — only a parent's `overflow: hidden` clips a child's shadow. So `box-shadow` focus rings are safe on any element regardless of its own overflow setting.
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
- Sizes: `xs` | `sm` | `md` (default) | `lg`
- **Icon vs. no-icon are separate Figma variants** — do not use `:has()` to infer padding. Spacing rules TBD from Figma spec.
- States: default, hover, focus, active, disabled

### Icon Button (`ds-icon-button`)
- Variants: `icon` (ghost) | `filled` | `outlined` | `monogram`
- Sizes: `sm` (32px) | `md` (40px, default) — always circular (`--radius-full`)
- Toggle: add `ds-icon-button-toggle` class; use `[aria-pressed]` + `.is-selected`
- Toggle variants: `icon` | `filled` | `outlined` | `outlined-letter`
- ADA: always include `aria-label` — icon buttons have no visible text

### Input Field (`ds-input`)
- **Height: always 42px — fixed, no size variants**
- For multi-line / description text: use `ds-textarea` (separate component, not yet built)
- Has: label, helper text, error text, leading icon, trailing action button, prefix text, suffix text
- States: default, hover, focus, error (`.is-error`), disabled (`.is-disabled`), read-only (`.is-readonly`)
- ADA: `aria-invalid="true"` on `<input>` when error; `role="alert"` on error message; `aria-describedby` links input to helper

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

### Textarea (`ds-textarea`)
- Separate component from `ds-input` — used for description / long-form text
- Resizable vertically, no fixed height

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

## Preview (`preview/index.html`)

- **Self-contained** — all token CSS and component CSS is inlined. No external file dependencies.
- Token CSS lives between `<!-- ONFLO-TOKENS:START -->` and `<!-- ONFLO-TOKENS:END -->` sentinel markers (auto-updated by `npm run generate-tokens`)
- Component CSS lives in a **separate `<style>` block after the sentinel** — never inside the sentinel block
- Every component gets: a sidebar nav link, a section with description + source path, live interactive demo rows
- Demo row pattern: label (180px wide) + items flex row with `gap: 12px`

---

## ADA / Accessibility Standards

All components must meet WCAG 2.1 AA. These rules are non-negotiable.

### Focus ring
- **Always** use `:focus-visible` (not `:focus`) for the visible focus ring — `:focus-visible` only activates during keyboard navigation, never on mouse clicks. This is correct ADA behaviour.
- The two-rule pattern every interactive element must follow:
  ```scss
  &:focus         { outline: none; }           // suppress browser default on ALL focus
  &:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); } // keyboard only
  ```
- **Never** use `outline` as the focus indicator — it cannot be styled consistently across browsers
- **Never** use `border-color` as a substitute for the focus ring — borders affect layout and are inconsistent
- `overflow: hidden` on an element does NOT clip its own `box-shadow` (only a parent's `overflow: hidden` clips a child's shadow), so `box-shadow` focus rings are safe on any element regardless of its own overflow setting

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
- Never use `outline` for focus — always use `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)`
- Never use `border-color` for focus rings — box-shadow is the correct ADA pattern and is not clipped by an element's own `overflow: hidden`
- Never put content inside the `<!-- ONFLO-TOKENS:START/END -->` block except token CSS
- Never use `:has()` to infer icon presence in buttons — icon vs. no-icon are separate Figma variants
- Never reference `--ref-*` tokens directly in component styles — go through semantic `--color-*` / `--spacing-*` etc.

---

## Angular Material Design Foundation

Every Onflo component is based on an Angular Material component. The Onflo design system provides the visual layer (tokens, typography, spacing, interaction states) while Angular Material provides the behavioral layer (accessibility, keyboard navigation, animations, CDK primitives).

### How it works

In Angular applications, developers import both the Angular Material module AND the Onflo SCSS:

```scss
// In styles.scss or component.scss
@use '@onflo/design-system/components';
```

```typescript
// In your Angular module or standalone component
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
// etc.
```

The Onflo SCSS overrides/themes Material components using global class overrides and CSS custom property (CSS variable) overrides. The `::ng-deep` pattern is avoided in favour of global SCSS that targets the Material component's generated class names.

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
| `ds-badge` | `MatBadgeModule` | matBadge directive |
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

### Theming approach

1. **CSS custom properties** — All tokens are exposed as CSS variables. Material's `--mat-*` CSS variable overrides are used where possible (Angular Material M3+ API).
2. **Global SCSS overrides** — The Onflo component SCSS targets both the Onflo CSS class API (`.ds-*`) and, in global stylesheets, the generated Material class names (`.mat-*`, `.mdc-*`).
3. **No `::ng-deep`** in the Onflo library itself. Projects consuming the library use their own global override files if needed.
4. **Focus rings** — Always `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)`. Never `outline`. This overrides Material's default focus indicator.

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
