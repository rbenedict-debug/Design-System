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

### Textarea (`ds-textarea`) — *not yet built*
- Separate component from `ds-input` — used for description / long-form text
- Will be resizable vertically, no fixed height

---

## Preview (`preview/index.html`)

- **Self-contained** — all token CSS and component CSS is inlined. No external file dependencies.
- Token CSS lives between `<!-- ONFLO-TOKENS:START -->` and `<!-- ONFLO-TOKENS:END -->` sentinel markers (auto-updated by `npm run generate-tokens`)
- Component CSS lives in a **separate `<style>` block after the sentinel** — never inside the sentinel block
- Every component gets: a sidebar nav link, a section with description + source path, live interactive demo rows
- Demo row pattern: label (180px wide) + items flex row with `gap: 12px`

---

## What NOT to do

- Never hardcode hex, rgba, or px values in component SCSS — always use tokens
- Never add size variants to `ds-input` — height is fixed at 42px
- Never skip `aria-label` on icon buttons
- Never use `outline` for focus — always use `box-shadow` focus ring
- Never put content inside the `<!-- ONFLO-TOKENS:START/END -->` block except token CSS
- Never use `:has()` to infer icon presence in buttons — icon vs. no-icon are separate Figma variants
- Never reference `--ref-*` tokens directly in component styles — go through semantic `--color-*` / `--spacing-*` etc.

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
