# Onflo Design System — Team Setup Guide

One-time setup per machine. Takes about 5 minutes.

---

## Prerequisites

- **Claude Code** installed (`npm install -g @anthropic-ai/claude-code`)
- **Node.js** ≥ 18 (`node -v` to check)
- **Git** installed (`git --version` to check)

---

## Step 1 — Add your SSH key to GitHub

This is how your machine authenticates to access the private repository.
You only do this once per machine.

**Check if you already have an SSH key:**
```bash
ls ~/.ssh/id_ed25519.pub
```
If the file exists, skip to "Add key to GitHub" below.

**Generate a new SSH key** (replace with your work email):
```bash
ssh-keygen -t ed25519 -C "your.name@onflo.com"
```
Press Enter three times to accept the defaults.

**Add key to GitHub:**
1. Copy your public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. Go to **GitHub → Settings → SSH and GPG keys → New SSH key**
3. Paste the key, name it (e.g. "Work MacBook"), and save
4. Test the connection:
   ```bash
   ssh -T git@github.com
   ```
   You should see: `Hi username! You've successfully authenticated`

---

## Step 2 — Authenticate with GitHub Packages

The design system is distributed via GitHub Packages under the `@onflo` scope. You need a GitHub Personal Access Token (PAT) with `read:packages` to install it.

**Generate a token:**
1. Go to **GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)**
2. Click **Generate new token (classic)**
3. Check `read:packages`, set an expiry, and generate
4. Copy the token — you only see it once

**Add it to your shell profile** (`~/.zshrc` or `~/.bash_profile`):
```bash
export GITHUB_TOKEN=ghp_your_token_here
```
Then reload: `source ~/.zshrc`

**Add the registry to your Angular project's `.npmrc`** (create in project root):
```
@onflo:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

---

## Step 3 — Install the design system in your project

In your Angular project's root directory:

```bash
npm install @onflo/design-system
```

This installs the package as `@onflo/design-system` in your `node_modules`.

**To get the latest version** when a new release is published:
```bash
npm install @onflo/design-system@latest
```

> You can also ask Claude: *"Update the design system to the latest version"* — it will run this command for you.

---

## Step 4 — Wire up styles, fonts, and animations

The design system ships a single bundled CSS file (`dist/onflo.css`) containing tokens,
component styles, and layout patterns in the correct order. Consumers must also load
an Angular Material prebuilt theme (so `mat-*` directives have their structural CSS)
and the Google Fonts that the design system targets.

### 4a — `angular.json` styles array

Order matters. Material theme first, then Onflo (so Onflo's overrides win):

```json
"styles": [
  "node_modules/@angular/material/prebuilt-themes/azure-blue.css",
  "node_modules/@onflo/design-system/dist/onflo.css",
  "src/styles.scss"
]
```

> Do **not** also import `tokens/css/index.css` or `dist/components.css` separately —
> `dist/onflo.css` already contains them in the correct order. Splitting the imports
> is the most common cause of broken styling (square inputs, missing radii, wrong padding).

### 4b — Required fonts in `src/index.html`

Add these inside `<head>`. Without them, every `ds-icon` renders as raw text
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
Design-team projects don't need a Proxima Nova license — DM Sans (free, loaded above)
matches what the preview uses. When Eng wires up the licensed Proxima Nova webfont
in production, it takes precedence automatically.

### 4c — Animations provider in `src/app/app.config.ts`

```typescript
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...existing providers
    provideAnimationsAsync(),
  ]
};
```

### 4d — Verify

After running `ng serve`, drop a button on a page and check it visually:

```html
<button class="ds-button ds-button--filled">Save</button>
<span class="ds-icon">search</span>
```

If the button is blue with rounded corners and the icon renders as a magnifying glass
(not the literal text "search"), setup is correct. If not, re-check the order of the
`styles` array and that the font `<link>` tags are in `index.html`.

---

## Step 5 — Add the design system rules to your project's CLAUDE.md

Create or open `CLAUDE.md` in your project root and add this block at the top:

```markdown
# Design System

This project uses the Onflo Design System.

@node_modules/@onflo/design-system/AGENT-GUIDE.md
```

This tells Claude to load the design system rules automatically in every session.
Claude will know which components exist, how to use tokens, and what it must never do.

---

## Step 6 — Start Claude Code

```bash
claude
```

Claude will automatically load your CLAUDE.md, which loads the design system rules.
You're ready to build.

---

## Day-to-day workflow

**Starting work:**
```bash
claude
```
That's it. The design system rules are loaded automatically.

**Getting design system updates:**
```bash
npm install @onflo/design-system@latest
```
Then restart Claude Code. It will pick up the new component definitions immediately.

**Checking what components are available:**
Ask Claude: *"What design system components are available for navigation?"*
Or open the visual reference: `open node_modules/@onflo/design-system/preview/index.html`

---

## Troubleshooting

**`npm install` fails with 401 / permission error:**
Your `GITHUB_TOKEN` is missing or doesn't have `read:packages` scope. Check that the env var is set (`echo $GITHUB_TOKEN`) and that your `.npmrc` file is in the project root, not home directory. Redo Step 2.

**`ssh -T git@github.com` says permission denied:**
Make sure you added the public key (`.pub` file) to GitHub, not the private key. Redo Step 1.

**Claude doesn't seem to know about the design system:**
Check that `CLAUDE.md` contains the `@node_modules/@onflo/design-system/AGENT-GUIDE.md` line.
Run `cat CLAUDE.md` to verify.

**Components look unstyled / square / no colors:**
Your `angular.json` `styles` array is probably missing `dist/onflo.css` or the Material
prebuilt theme, or has them in the wrong order. Re-read Step 4a — the order must be
Material theme → `onflo.css` → your local styles. Restart `ng serve` after editing
`angular.json` (the dev server does not pick up styles-array changes on its own).

**Icons render as the literal text "search", "close", etc.:**
The Material Symbols Rounded font isn't loaded. Add the `<link>` tags from Step 4b
to `src/index.html` and hard-refresh the browser.

**Text looks like Times / system serif instead of the preview:**
The DM Sans `<link>` tag is missing from `src/index.html`. Add it (Step 4b) and
hard-refresh. Designers don't need Proxima Nova — DM Sans is the documented fallback.

**I need a component that doesn't exist:**
Build what you need using design tokens for all visual values.
Flag it to Rebecca — she evaluates new patterns for addition to the design system.
