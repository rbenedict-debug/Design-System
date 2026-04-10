# Onflo Design System

The single source of truth for UI foundations across all Onflo products — design tokens, component patterns, and interaction guidelines for Angular + .NET Core.

---

## What's in this repo

| Path | What it is |
|---|---|
| `tokens/css/` | CSS custom properties — import in any Angular project |
| `tokens/scss/` | SCSS variables + typography mixins |
| `preview/index.html` | Live visual reference — open in a browser |
| `scripts/generate-tokens.js` | Regenerates all token files from a Figma export |

---

## For Designers

**View the token reference:** Open `preview/index.html` in any browser.
No server needed — just open the file directly. It includes a light/dark mode toggle, all colour swatches (click any to copy the CSS var name), typography scale, spacing, radius, and shadows.

**Updating tokens from Figma:**
When the token values change in Figma, export the three variable files and hand them to a developer to regenerate. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

**Naming convention:**
Every token you see in Figma Variables has a matching CSS custom property:
- `surface / page` in Figma → `--color-surface-page` in code
- `text / primary` → `--color-text-primary`
- `spacing / lg` → `--spacing-lg`

---

## For Developers

### Quick start — new Angular project

**Step 1.** Install the design system from GitHub (SSH — see [SETUP.md](./SETUP.md) for first-time SSH setup):

```bash
npm install git+ssh://git@github.com/rbenedict-debug/Design-System.git
```

**Step 2.** Add the token CSS to `angular.json`:

```json
"styles": [
  "node_modules/@onflo/design-system/tokens/css/index.css",
  "src/styles.scss"
]
```

**Step 3.** Add `provideAnimationsAsync()` to your app config (required by Angular Material):

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig = { providers: [provideAnimationsAsync()] };
```

**Step 4.** Add the design system rules to your project's `CLAUDE.md`:

```markdown
# Design System
@node_modules/@onflo/design-system/AGENT-GUIDE.md
```

**Step 5.** Start using components:

```typescript
import { DsButtonComponent, DsInputComponent } from '@onflo/design-system';
```

**To get the latest updates** (run whenever Rebecca pushes changes):

```bash
npm update @onflo/design-system
```

See [SETUP.md](./SETUP.md) for full setup instructions including SSH key setup.

---

### Using tokens in component styles

#### CSS custom properties (works in any file)

```scss
.card {
  background:    var(--color-surface-page);
  border:        1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding:       var(--spacing-lg);
  box-shadow:    0 2px 4px var(--shadow-elevation-2);
}
```

#### SCSS variables (import the SCSS module first)

```scss
@use 'node_modules/@onflo/design-system/tokens/scss/variables' as ds;

.card {
  background:    ds.$surface-page;
  border:        1px solid ds.$border-subtle;
  border-radius: ds.$radius-md;
  padding:       ds.$spacing-lg;
}
```

#### Typography mixins

Apply a complete type style in one line:

```scss
@use 'node_modules/@onflo/design-system/tokens/scss/variables' as ds;

h1 { @include ds.type-title-h1; }
h2 { @include ds.type-title-h2; }
p  { @include ds.type-body-medium; }

.label { @include ds.type-label-small; }
```

Available mixins:
- `type-display`
- `type-title-h1` / `type-title-h2` / `type-title-h3` / `type-title-h4`
- `type-body-large` / `type-body-medium` / `type-body-small`
- `type-label-large` / `type-label-medium` / `type-label-small`

---

### Dark mode

Apply `data-theme="dark"` to the root `<html>` element. All `--color-*` tokens update automatically — no code changes needed in your components.

```typescript
// theme.service.ts
setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

// Restore on load
const saved = localStorage.getItem('theme') ?? 'light';
document.documentElement.setAttribute('data-theme', saved);
```

```html
<!-- app.component.html -->
<button (click)="themeService.setTheme('dark')">Dark</button>
<button (click)="themeService.setTheme('light')">Light</button>
```

This works because the design tokens use a two-tier architecture:

```
[data-theme="dark"]          ← ref-dark.css overrides these
  --ref-color-primary-blue-default: #3D9BE0

:root
  --ref-color-primary-blue-default: #0B6EB4   ← ref-light.css

  --color-surface-nav-active: var(--ref-color-primary-blue-default)
  ↑ design-tokens.css — always points to the ref, never a hard value
```

Changing `data-theme` on `<html>` updates the ref layer, which cascades to every design token instantly.

---

### Token reference

| Token group | CSS prefix | SCSS prefix | Used for |
|---|---|---|---|
| Surface colours | `--color-surface-*` | `ds.$surface-*` | Backgrounds, containers |
| Text colours | `--color-text-*` | `ds.$text-*` | All text |
| Border colours | `--color-border-*` | `ds.$border-*` | Dividers, outlines, focus rings |
| Spacing | `--spacing-*` | `ds.$spacing-*` | Padding, margin, gap |
| Border radius | `--radius-*` | `ds.$radius-*` | Rounded corners |
| Shadows | `--shadow-*` | `ds.$shadow-*` | Elevation |
| Overlays | `--overlay-*` | `ds.$overlay-*` | Hover/pressed/focus overlays |

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Angular |
| Backend | .NET Core |
| Token source | Figma Variables |
| Token format | CSS custom properties + SCSS |
| Theming | `[data-theme]` attribute on `<html>` |

---

## Updating tokens

When the design team updates Figma and exports new variable files, run:

```bash
npm run generate-tokens
```

Then commit the updated files in `tokens/`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

For questions or to contribute a component pattern, reach out to **Rebecca**.
