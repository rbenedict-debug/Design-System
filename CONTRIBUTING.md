# Contributing to the Onflo Design System

---

## Token update workflow (Designers → Developers)

This is the process for updating design tokens when values change in Figma.

### Step 1 — Export from Figma

In Figma, open the Onflo design file and export the three variable collections:

| Figma collection | Save as |
|---|---|
| `ref` → Light mode | `ref 3/Light.tokens.json` |
| `ref` → Dark mode | `ref 3/Dark.tokens.json` |
| `Mode 1` (design tokens) | `Mode 1.tokens 3.json` |

By default the generator looks in `~/Downloads`. If your files are elsewhere, set the `ONFLO_TOKEN_DIR` environment variable:

```bash
ONFLO_TOKEN_DIR=/path/to/your/exports npm run generate-tokens
```

### Step 2 — Regenerate

```bash
npm run generate-tokens
```

This reads the three JSON files and regenerates:
- `tokens/css/` — all CSS custom property files
- `tokens/scss/` — all SCSS variable and mixin files

### Step 3 — Review the diff

```bash
git diff tokens/
```

Check that only expected values changed. If something looks wrong, compare against Figma before proceeding.

### Step 4 — Commit and open a PR

```bash
git checkout -b tokens/update-YYYY-MM-DD
git add tokens/
git commit -m "Update design tokens from Figma — YYYY-MM-DD"
```

Open a pull request. Tag Rebecca for review.

Once merged, all projects that import from this repo automatically get the updated values on their next build.

---

## Token architecture — two-tier system

Understanding this helps you make smart decisions when Figma changes come through.

```
Tier 1 — Primitives (ref tokens)
  tokens/css/ref-light.css    ← raw values, light mode
  tokens/css/ref-dark.css     ← raw values, dark mode

Tier 2 — Semantic tokens (design tokens)
  tokens/css/design-tokens.css  ← purpose-driven aliases
```

**Tier 1** contains raw colour values, sizes, and type definitions.
**Tier 2** assigns meaning to those values: `--color-surface-nav-active` points to `var(--ref-color-primary-blue-default)`.

When the primary blue changes in Figma, you update the ref value once — every surface, text, border, and overlay token that references it updates automatically.

**You should never need to edit the generated files manually.** Run the script.

---

## Adding a new component

> Components will be added in Step 2 of the design system build.

When that work begins:

1. Create a new Angular component inside this repo under `components/`
2. Use only `--color-*`, `--spacing-*`, `--radius-*`, and `--shadow-*` tokens in the component's SCSS — no hard-coded values
3. Add the component's rendered states to `preview/index.html`
4. Document props and usage in the README

---

## Questions

Reach out to **Rebecca** for anything related to design decisions, new tokens, or component requests.
