# Onflo Design System — Setup Guide

This guide has two parts:

- **Part A — Design-team setup.** What designers need to mock up real-feeling pages
  in an Angular project. Lightweight; no Material / AG Grid / Highcharts required.
- **Part B — Engineering handoff.** What eng adds on top to wire reactive behavior,
  data tables, and charts when the project moves into production.

Designers should follow Part A and stop. Eng will pick up Part B at handoff.

---

## Why two parts?

The Onflo Design System is shipped as an Angular component library so design and eng
share one artifact end-to-end. But it has **two independent surfaces**:

1. **CSS class API** (`<button class="ds-button ds-button--filled">`) — pure CSS,
   no Angular Material involved, renders correctly with just `dist/onflo.css` + fonts.
2. **Angular component API** (`<ds-button variant="filled">`) — wraps Angular Material
   for full reactive behavior; needs Material, plus AG Grid / Highcharts for table
   and chart components.

Designers use the CSS class API. Eng adds Material + AG Grid + Highcharts when they
swap to the component API at handoff. Mixing the two paths is the most common cause
of "it doesn't look like the preview" pain — keep them separate.

---

# Part A — Design-team setup

One-time setup per machine. ~30 seconds.

## Prerequisites

- **Claude Code** installed (`npm install -g @anthropic-ai/claude-code`)
- **Node.js** ≥ 18 (`node -v` to check)
- **Git** installed (`git --version` to check)
- An Angular project (`ng new my-design-project --style=scss --routing=false` if you
  don't have one yet)

## Step 1 — Install the design system

The design system is hosted as a public GitHub repository. There's no registry,
no token, no `.npmrc`, no SSH key required — npm clones the repo directly at
the tag you specify.

In your Angular project's root directory:

```bash
npm install github:rbenedict-debug/Design-System#v0.2.1
```

Replace `v0.2.1` with the latest published tag. Find the latest tag at
[github.com/rbenedict-debug/Design-System/tags](https://github.com/rbenedict-debug/Design-System/tags),
or ask Claude: *"What's the latest design system tag?"*

The package will install at `node_modules/@onflo/design-system/` (the package
name in code is `@onflo/design-system` regardless of where it was installed from).

> You will see peer dependency warnings about `@angular/material` after install.
> **Safe to ignore for design-team work** — the CSS class API doesn't use Material.
> AG Grid and Highcharts are marked optional and will not warn at all.

> **Why pin to a tag, not a branch?** Pointing at `#main` would silently update the
> design system mid-mockup every time you run `npm install`. Pinning to a tag is
> deterministic — your project looks the same today and three months from now,
> until you intentionally bump.

## Step 2 — Wire up styles, fonts, and animations

Three small edits to your Angular project. None of them require any extra packages.

### 2a — `angular.json` styles array

```json
"styles": [
  "node_modules/@onflo/design-system/dist/onflo.css",
  "src/styles.scss"
]
```

That's it — just the one bundle. `dist/onflo.css` contains tokens, components, and
layout patterns in the correct order. Do **not** also import `tokens/css/index.css`
or `dist/components.css` separately — that's the most common cause of broken styling.

### 2b — Required fonts in `src/index.html`

Add these inside `<head>`. Without them, every icon renders as raw text
("search", "close", etc.) and typography falls back to the OS default sans-serif —
nothing will look like the preview.

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
  rel="stylesheet" />
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
  rel="stylesheet" />
```

The brand typeface token is `"Proxima Nova", "DM Sans", system-ui, sans-serif`.
Designers don't need a Proxima Nova license — DM Sans (free, loaded above) is
exactly what the preview uses. When Eng wires up the licensed Proxima Nova
webfont in production, it takes precedence automatically.

### 2c — Animations provider in `src/app/app.config.ts`

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...existing providers
    provideAnimationsAsync(),
  ]
};
```

## Step 3 — Add the design system rules to your project's CLAUDE.md

Create or open `CLAUDE.md` in your project root and add this block at the top:

```markdown
# Design System

This project uses the Onflo Design System.
**Mode: design** — use the CSS class API only (e.g. `<button class="ds-button">`).
Do not import `Ds*Component` classes or use `mat-*` directives.

@node_modules/@onflo/design-system/AGENT-GUIDE.md
```

The `Mode: design` line tells Claude to stay on the lightweight class-API path
and skip code that would require Material / AG Grid / Highcharts.

## Step 4 — Verify

```bash
ng serve
```

Drop this on a page:

```html
<button class="ds-button ds-button--filled">Save</button>
<span class="ds-icon">search</span>
```

If the button is blue with rounded corners and the icon renders as a magnifying
glass (not the literal word "search"), setup is correct. **You're done with Part A.**

If something looks wrong, see Troubleshooting below.

## Step 5 — Start building

```bash
claude
```

Claude will load your `CLAUDE.md`, which pulls in the design system rules,
and stick to the class API automatically. Ask it to build pages, layouts, or
mock data tables — it knows the component vocabulary.

**Visual reference:** open `node_modules/@onflo/design-system/preview/index.html`
in your browser for a complete catalog of every component, layout, and token.

---

## Day-to-day workflow

**Starting work:**
```bash
claude
```
The design system rules are loaded automatically.

**Getting design system updates:**
Look up the latest tag at
[github.com/rbenedict-debug/Design-System/tags](https://github.com/rbenedict-debug/Design-System/tags),
then:
```bash
npm install github:rbenedict-debug/Design-System#vX.Y.Z
```
Replace `vX.Y.Z` with the new tag. Then restart Claude Code so it picks up the
new component definitions. (`@latest` does not work for git-installed packages —
you must specify the tag explicitly.)

**Checking what components are available:**
Ask Claude: *"What design system components are available for navigation?"*
Or open the visual reference at `node_modules/@onflo/design-system/preview/index.html`.

---

## Troubleshooting

**`npm install` fails with "could not resolve" or "404 Not Found":**
The tag you pinned doesn't exist. Check
[github.com/rbenedict-debug/Design-System/tags](https://github.com/rbenedict-debug/Design-System/tags)
for the actual tag names. Tag names start with `v` (e.g. `v0.2.1`, not `0.2.1`).

**`npm install` warns about a missing `@angular/material` peer dependency:**
Expected — Material is not installed in design mode. Safe to ignore.

**Claude doesn't seem to know about the design system:**
Check that `CLAUDE.md` contains the `@node_modules/@onflo/design-system/AGENT-GUIDE.md`
line. Run `cat CLAUDE.md` to verify.

**Components look unstyled / square / no colors:**
Your `angular.json` `styles` array is probably missing `dist/onflo.css` or has it in
the wrong place. Re-read Step 2a. Restart `ng serve` after editing `angular.json` —
the dev server doesn't pick up styles-array changes on its own.

**Icons render as the literal text "search", "close", etc.:**
The Material Symbols Rounded font isn't loaded. Add the `<link>` tags from Step 2b
to `src/index.html` and hard-refresh the browser.

**Text looks like Times / system serif instead of the preview:**
The DM Sans `<link>` tag is missing from `src/index.html`. Add it (Step 2b) and
hard-refresh.

**Claude is generating `<ds-button>` or `import { DsButtonComponent }` and the build fails:**
Your project `CLAUDE.md` is missing the `Mode: design` line. Without it, Claude
defaults to the full Angular component API which needs Material installed. Add the
line from Step 3 and restart Claude.

**I need a component that doesn't exist:**
Build what you need using design tokens for all visual values.
Flag it to Rebecca — she evaluates new patterns for addition to the design system.

---

# Part B — Engineering handoff

> **For eng team only.** Designers, you can stop reading at the end of Part A.

When eng inherits a design-team project, they layer on the dependencies and code
the design path intentionally avoided. The design-team setup stays valid — eng adds,
they don't replace.

## What changes

| Concern | Design-team setup | Eng additions |
|---|---|---|
| HTML | `<button class="ds-button">` | optionally swap to `<ds-button>` for reactive behavior |
| `angular.json` styles | `onflo.css` only | prepend `prebuilt-themes/azure-blue.css` (or your chosen Material theme) |
| Peer deps | warnings ignored | install `@angular/material`, `@angular/cdk` |
| Tables | static `<table class="ds-table">` markup | install `ag-grid-community ^33`, use `onfloTheme` from the design system |
| Charts | inline SVG mockups | install `highcharts ^11`, use `<ds-chart>` |
| CLAUDE.md | `Mode: design` | change to `Mode: engineering` (or remove the line) |

## Step B1 — Install runtime peer deps

```bash
npm install @angular/material @angular/cdk ag-grid-community highcharts
```

(Drop the ones you don't need — e.g. omit `ag-grid-community` if there are no
data tables in the project.)

## Step B2 — Add Material theme to `angular.json`

```json
"styles": [
  "node_modules/@angular/material/prebuilt-themes/azure-blue.css",
  "node_modules/@onflo/design-system/dist/onflo.css",
  "src/styles.scss"
]
```

Order matters: Material theme **first**, then `onflo.css` (so Onflo's overrides win).

## Step B3 — Switch CLAUDE.md mode

Update the project's `CLAUDE.md`:

```markdown
# Design System

This project uses the Onflo Design System.
**Mode: engineering** — use the Angular component API where reactive behavior is
needed; keep CSS class API for static markup.

@node_modules/@onflo/design-system/AGENT-GUIDE.md
```

## Step B4 — Swap class API to component API where it matters

Anywhere a `ds-*` class appears that needs reactive behavior (form binding, click
handlers, dynamic state), swap to the matching Angular component:

```html
<!-- before (design-team) -->
<button class="ds-button ds-button--filled">Save</button>

<!-- after (eng) -->
<ds-button variant="filled" (clicked)="save()">Save</ds-button>
```

```typescript
import { DsButtonComponent } from '@onflo/design-system';

@Component({
  imports: [DsButtonComponent],
  // ...
})
```

Static markup (cards, layouts, headings, dividers) can stay as classes — there's
no benefit to the component form when there's no behavior to wire.

## Step B5 — Wire AG Grid for real tables

If the project has tables built as static `<table class="ds-table">` markup, replace
them with AG Grid using `onfloTheme`:

```typescript
import { onfloTheme } from '@onflo/design-system';

gridOptions: GridOptions = {
  theme: onfloTheme,
  // ... your column defs and data
};
```

Do **not** import `ag-theme-quartz.css` — `onfloTheme` is the programmatic theme
and conflicts with the legacy CSS theme.

## Step B6 — Wire Highcharts for real charts

Replace SVG mockups with `<ds-chart>`:

```html
<ds-chart type="line" [series]="seriesData" [categories]="months" />
```

Highcharts is registered automatically by `<ds-chart>` on first render.

---

## Eng troubleshooting

**`mat-flat-button` renders as an unstyled native button:**
The Material prebuilt theme is missing from `angular.json` (Step B2). Material's
structural CSS comes from the prebuilt theme — Onflo's `onflo.css` re-skins it but
doesn't replace it.

**AG Grid renders as plain HTML / no theme:**
Make sure `theme: onfloTheme` is set in `gridOptions` and `ag-theme-quartz.css` is
**not** imported anywhere. The two conflict.

**Highcharts colors don't match the Onflo palette:**
The Onflo theme is applied automatically by `<ds-chart>`. If you're using Highcharts
outside of `<ds-chart>`, call `Highcharts.setOptions(onfloChartTheme)` once at
bootstrap.
