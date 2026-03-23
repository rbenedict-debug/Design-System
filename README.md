# Onflo Design System

The Onflo Design System is the internal source of truth for UI components, design tokens, and interaction patterns used across Onflo products. Built with Angular and .NET Core, it bridges the gap between design and engineering — ensuring a consistent, accessible, and scalable experience across every surface we ship.

---

## Design Principles

- **Consistency** — One visual language across all products, reducing cognitive load for users and decision fatigue for teams.
- **Accessibility** — Components are built to meet WCAG standards by default, not as an afterthought.
- **Scalability** — Designed to grow with the product — new components and patterns slot in without breaking what exists.
- **Designer-Developer Alignment** — Designers and engineers share the same vocabulary, tokens, and components, so what gets designed is what gets built.

---

## Quick Start (Engineers)

Install the package:

```bash
npm install @onflo/design-system
```

Import the module in your Angular app:

```typescript
import { OnfloDesignSystemModule } from '@onflo/design-system';

@NgModule({
  imports: [OnfloDesignSystemModule],
})
export class AppModule {}
```

Use a component:

```html
<onflo-button variant="primary">Get Started</onflo-button>
```

> **Note:** Package not yet published. Update install instructions once available.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Angular |
| Backend | .NET Core |
| Token source | Figma Variables (exported via Tokens Studio) |
| Token output | CSS Custom Properties |

---

## Design Tokens

Tokens follow a **two-tier architecture** that mirrors the Figma Variables setup:

### Tier 1 — Ref Tokens (primitives)
Raw values exported directly from Figma. Light and dark modes are separate files.

| File | Purpose |
|---|---|
| `tokens/ref-light.css` | Light mode primitive palette (`:root`) |
| `tokens/ref-dark.css` | Dark mode overrides (`[data-theme="dark"]`) |

**Naming:** `--ref-color-*`, `--ref-typescale-*`, `--ref-spacing-*`, `--ref-radius-*`

Includes: colours (primary, neutral, accent), typeface, type scale, spacing, border radius, shadow, overlay.

### Tier 2 — Design Tokens (semantic)
Named, purpose-driven aliases that point to ref tokens via `var()`. When you update a raw value in the ref layer, every design token that references it updates automatically.

| File | Purpose |
|---|---|
| `tokens/design-tokens.css` | Semantic aliases (surface, text, border, spacing, radius…) |

**Naming:** `--color-surface-*`, `--color-text-*`, `--color-border-*`, `--spacing-*`, `--radius-*`

### Entry Point

```scss
// styles.scss
@import 'tokens/index.css';
```

Or add to `angular.json`:
```json
"styles": ["tokens/index.css", "src/styles.scss"]
```

### Dark Mode

Apply `data-theme="dark"` to the `<html>` element to activate dark mode:

```typescript
document.documentElement.setAttribute('data-theme', 'dark');
```

### Regenerating Tokens

After re-exporting from Figma, drop the updated JSON files in the same location and run:

```bash
node scripts/generate-tokens.js
```

Source files expected:
- `~/Downloads/ref 3/Light.tokens.json`
- `~/Downloads/ref 3/Dark.tokens.json`
- `~/Downloads/Mode 1.tokens 3.json`

---

## For Designers

Design resources including Figma component libraries, design tokens, and usage guidelines are available internally.

- **Figma Library:** _Link coming soon_
- **Design Tokens:** _Link coming soon_
- **Component Specs:** _Link coming soon_

Reach out to the design team to get access to the Figma workspace.

---

## Contributing & Support

Want to contribute a component or pattern? **Reach out to Rebecca.**

For questions or support, contact the team via your internal channels.
