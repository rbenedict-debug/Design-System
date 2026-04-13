# Component Specs — Layout, Navigation Primitives & Utilities

Agent Status, Page Layout, Split Page Layout, Utilities (ds-sr-only)

---

### Agent Status (`ds-agent-status`)
- **Purpose**: Nav sidebar toggle for support agent availability — call queue or live chat. Tapping opens a status picker (dropdown is a separate composition, not part of this primitive).
- **Size**: 64×64px — fixed (matches `ds-nav-button` width; taller to accommodate the icon circle)
- **Variants**: `call` (icon: `support_agent`) | `live` (icon: `forum`) — Material Symbols Rounded, outlined, 24px
- **States**: online (default) | offline (`.is-offline` modifier)
- **Icon circle**: 42×42px, `border-radius: --radius-full`, bg: `--color-surface-subtle`
  - Online: icon colour `--color-icon-default`
  - Offline: icon colour `--color-icon-disabled`
- **Status row**: flex row, `gap: --spacing-xs`; Label Small typography (`--ref-typescale-label-small-*`), weight-prominent (600), `--color-text-primary`; chevron `keyboard_arrow_down` at 12px
  - Chevron: `--color-icon-default` (online), `--color-icon-disabled` (offline)
- **Indicator dot**: 10px circle, `border-radius: --radius-full`, absolute at `right: 11px; top: 33px` (bottom-right of icon circle)
  - Online: `--color-icon-accent-green`
  - Offline: `--color-icon-disabled`
- **Interaction overlay**: `::after` pseudo-element — hover: `--overlay-hovered`, active: `--overlay-pressed`
- **Focus ring**: `:focus-visible` only — `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)`
- **ADA**: `aria-label` = `"<Variant> agent status: <Online|Offline>"`; `aria-pressed` = online boolean
- **Angular inputs**: `[variant]="'call' | 'live'"`, `[online]="true | false"`
- **No Angular Material base** — custom component

---

## Page Layouts

CSS-only composition patterns. SCSS lives in `layout/page-layout/` and `layout/split-page/` and compiles into `dist/layout.css` (separate from `dist/components.css`). Consuming projects add `"node_modules/@onflo/design-system/dist/layout.css"` to their `angular.json` styles array. The preview (`preview/index.html`) provides interactive demos — the preview wraps these in a 640px fixed-height frame; production apps use `height: 100%` on the app root. Reference the preview for canonical HTML structure.

### Page title rules

These rules apply to every page in every Onflo application:

1. **Every page must have `<h1 class="ds-page-content__title">`** inside `ds-page-content__heading`. This is the single H1 per page — required for ADA heading structure and screen reader navigation.
2. **Exception — Inbox and Ticket View**: These pages have no visible title by design. They must still include a hidden H1: `<h1 class="ds-page-content__title ds-sr-only">Inbox</h1>`. Never omit the H1 entirely.
3. **Tabs under the title**: When a page has section tabs, `<ds-tabs>` goes inside `ds-page-content__heading` immediately after the `<h1>`.
4. **Never write a raw `<h1>` with custom styles** — the typography is defined by `ds-page-content__title`. Always use the class.

---

### Page Layout (`ds-page-layout`)

- **Purpose**: Full application shell combining `ds-nav-sidebar`, `ds-top-nav`, an optional collapsible sub-navigation panel (`ds-subnav`), and a main content area.

#### HTML structure

```html
<div class="ds-page-layout">

  <!-- Left: nav sidebar -->
  <nav class="ds-nav-sidebar" role="navigation" aria-label="Main navigation">
    <!-- ds-nav-button items, ds-agent-status at bottom -->
  </nav>

  <!-- Right: top-nav + body -->
  <div class="ds-page-layout__content">

    <header class="ds-top-nav" role="banner">
      <!-- ds-nav-tab items, action buttons -->
    </header>

    <div class="ds-page-layout__body">

      <!-- Optional collapsible sub-nav panel -->
      <nav class="ds-subnav" role="navigation" aria-label="Section navigation">
        <!-- ds-subnav-button items and ds-subnav-header sections -->
      </nav>

      <!-- Main content area -->
      <main class="ds-page-content" role="main">
        <div class="ds-page-content__heading">
          <h1 class="ds-page-content__title">Page Title</h1>
          <!-- optional ds-tabs -->
        </div>
        <div class="ds-page-content__main">
          <!-- page body content -->
        </div>
      </main>

    </div><!-- /.ds-page-layout__body -->

  </div><!-- /.ds-page-layout__content -->

  <!-- Floating expand/collapse toggle (absolutely positioned at subnav right edge) -->
  <button class="ds-nav-expand"
          type="button"
          aria-label="Collapse sub navigation"
          aria-expanded="true">
    <span class="ds-icon ds-icon--filled" aria-hidden="true">right_panel_open</span>
  </button>

</div><!-- /.ds-page-layout -->
```

#### CSS class API

| Class | Element | Purpose |
|---|---|---|
| `.ds-page-layout` | Root | Outer shell — `position: relative; display: flex; height: 640px` |
| `.ds-page-layout__content` | Right column | `flex: 1; flex-direction: column` — top-nav stacked above body |
| `.ds-page-layout__body` | Body row | `flex: 1; display: flex` — subnav beside page-content |
| `.ds-subnav` | Sub-nav panel | `width: 195px; flex-shrink: 0` — collapsible side panel |
| `.ds-subnav.is-collapsed` | Sub-nav panel | `width: 0; opacity: 0; pointer-events: none` — hidden state |
| `ds-subnav-button` | Sub-nav leaf item | 32px button — selected: brand blue bg + white text; Angular: `<ds-subnav-button [label]="..." [selected]="..." />` |
| `ds-subnav-subheader` | Sub-nav section group — **settings subnav only** | Expandable row with vertical accent line + child items; **always nested inside `ds-subnav-header`**; never used in general page navigation subnav panels; Angular: `<ds-subnav-subheader [text]="..." [(expanded)]="...">` |
| `ds-subnav-header` | Sub-nav top header | Expandable top-level row with 12px icon + Label Small text; Angular: `<ds-subnav-header [text]="..." [icon]="..." [(expanded)]="...">` |
| `.ds-page-content` | Main area | `flex: 1; display: flex; flex-direction: column; gap: --spacing-lg` |
| `.ds-page-content__heading` | Heading row | `flex-shrink: 0` — title + optional tabs, never scrolls |
| `.ds-page-content__title` | H1 | Title H1 typography (`--ref-typescale-title-h1-*`) |
| `.ds-page-content__main` | Content card | `flex: 1; overflow-y: auto` — scroll boundary; heading and save bar remain fixed above/below |
| `.ds-page-content__main--table` | Content card (table pages) | Adds `overflow: hidden; display: flex; flex-direction: column` — use instead of plain `__main` on any page containing an AG Grid; hands scroll control to the grid's own viewport |
| `.ds-ag-grid` | AG Grid host element | `flex: 1 1 0; min-height: 0; width: 100%` — apply on `ag-grid-angular` inside `__main--table` to fill remaining height correctly |
| `<ds-save-bar>` (when used) | Save footer | Sibling of `.ds-page-content__main`, never inside it — stays below the card regardless of scroll |

#### Angular wiring

- `ds-nav-sidebar`, `ds-top-nav`, `ds-nav-expand` are all Angular standalone components — import them in the host module/component.
- `ds-subnav` is a **CSS-only** pattern — no Angular component. Manage `is-collapsed` on the element via host component state.
- Toggle open/closed state: bind `(toggle)` output on `<ds-nav-expand>` to flip a boolean, apply `.is-collapsed` to `.ds-subnav`, and update `[open]` on `<ds-nav-expand>`.
- The `ds-nav-expand` button is absolutely positioned at the right edge of the sub-nav; its `left` value shifts when the panel collapses — this is handled by the `.ds-page-layout .ds-nav-expand.is-collapsed` CSS rule in the preview.

```typescript
// Host component (simplified)
subNavOpen = true;

onToggleSubnav() {
  this.subNavOpen = !this.subNavOpen;
}
```

```html
<div class="ds-page-layout">
  <ds-nav-sidebar />
  <div class="ds-page-layout__content">
    <ds-top-nav />
    <div class="ds-page-layout__body">
      <nav class="ds-subnav" [class.is-collapsed]="!subNavOpen" role="navigation" aria-label="Section navigation">
        <!-- subnav items -->
      </nav>
      <main class="ds-page-content" role="main">
        <!-- content -->
      </main>
    </div>
  </div>
  <ds-nav-expand [open]="subNavOpen" (toggle)="onToggleSubnav()" />
</div>
```

#### Prototype vs production

| Aspect | Hi-fi prototype | Production (engineering handoff) |
|---|---|---|
| Sub-nav collapse JS | Inline `onclick` toggling `.is-collapsed` | Angular state binding via `[class.is-collapsed]` |
| `ds-nav-expand` toggle | `onclick="toggleSubnav()"` | `(toggle)` output bound to host component method |
| Shell height | Fixed `640px` for preview frame | `height: 100vh` or `flex: 1` inside app root layout |
| `ds-subnav` items | Static HTML buttons | `*ngFor` over route config or menu items |
| ADA `aria-expanded` | Manually toggled in JS | Bound to `subNavOpen` boolean |

---

### Regular Page Content (`ds-page-content`)

Every page uses this structure inside `<main class="ds-page-content">` — with or without a split layout. Both children are required: never omit or collapse `__heading` or `__main`.

```html
<main class="ds-page-content" role="main">

  <!-- Required: heading row — title + optional tabs; never scrolls -->
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Page Title</h1>
    <!-- <ds-tabs> here if the page has section tabs -->
  </div>

  <!-- Required: content card — scroll boundary; provides bg, radius, shadow -->
  <div class="ds-page-content__main">
    <!-- page content -->
  </div>

  <!-- Optional: save bar — sibling of __main, never inside it -->
  <!-- <ds-save-bar> -->

</main>
```

When switching a page from split layout to a regular layout: replace the `ds-split-page` markup inside `__main` with the page content directly. Keep `__heading` and `__main` intact — neither is part of the split page pattern; both are required on every page.

---

### Split Page Layout (`ds-split-page`)

- **Purpose**: Two-panel content area for detail views — a list or context panel beside a primary content panel. Lives inside `ds-page-content__main`. The page title (`ds-page-content__heading` + `ds-page-content__title`) is a **sibling of `__main`** — it stays fixed above the panels and must never be placed inside them.

#### HTML structure

Always use this full `ds-page-content` shell when switching a page to a split layout:

```html
<main class="ds-page-content" role="main">

  <!-- Title stays OUTSIDE __main — fixed above the panels, never inside them -->
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Page Title</h1>
    <!-- <ds-tabs> here if the page has section tabs -->
  </div>

  <!-- Fixed split (prototype default) — Engineering: replace with CdkDragModule for resizable handle -->
  <div class="ds-page-content__main">
    <div class="ds-split-page">
      <div class="ds-split-page__panel ds-split-page__panel--left">
        <!-- left panel content -->
      </div>
      <div class="ds-split-page__panel ds-split-page__panel--right">
        <!-- right panel content -->
      </div>
    </div>
  </div>

</main>
```

Resizable variant (add `ds-split-page--resizable` + handle element):

```html
<div class="ds-page-content__main">
  <div class="ds-split-page ds-split-page--resizable">
    <div class="ds-split-page__panel ds-split-page__panel--left"></div>
    <div class="ds-split-page__handle" aria-hidden="true">
      <div class="ds-split-page__handle-line"></div>
      <span class="ds-icon" aria-hidden="true">drag_indicator</span>
      <div class="ds-split-page__handle-line"></div>
    </div>
    <div class="ds-split-page__panel ds-split-page__panel--right"></div>
  </div>
</div>
```

#### CSS class API

| Class | Element | Purpose |
|---|---|---|
| `.ds-split-page` | Root | `display: flex; height: 100%; gap: --spacing-lg` |
| `.ds-split-page__panel` | Panel | `flex: 1 1 0; overflow-y: auto` — each panel scrolls independently, same as `ds-page-content__main` |
| `.ds-split-page__panel--left` | Left panel | Left content area |
| `.ds-split-page__panel--right` | Right panel | Right content area |
| `.ds-split-page__handle` | Drag handle | `width: 18px; flex-shrink: 0; cursor: col-resize` — visible only with `--resizable` modifier |
| `.ds-split-page__handle-line` | Handle accent | 2px vertical line above/below the drag icon |
| `.ds-split-page--resizable` | Root modifier | Shows the drag handle element |
| `.ds-split-page--7030` | Root modifier | 70/30 flex split |
| `.ds-split-page--3070` | Root modifier | 30/70 flex split |
| `.ds-split-page--7525` | Root modifier | 75/25 flex split |
| `.ds-split-page--2575` | Root modifier | 25/75 flex split |
| `.is-dragging` | Root state | Applied during active drag — `cursor: col-resize !important` on root and all children |

#### Angular wiring

- No Angular component — this is a pure CSS pattern. Apply classes directly to your template elements.
- For resizable panels, use `@angular/cdk/drag-drop` — import `CdkDragModule`.
- Bind `cdkDrag cdkDragLockAxis="x"` on the `.ds-split-page__handle` element.
- On `(cdkDragMoved)`, update the `flex-grow` values of both panels based on drag delta.
- On `(cdkDragStarted)` / `(cdkDragEnded)`, toggle `.is-dragging` on the root.

```typescript
import { CdkDragModule, CdkDragMove } from '@angular/cdk/drag-drop';

// In host component
onHandleDrag(event: CdkDragMove, container: HTMLElement) {
  const totalWidth = container.offsetWidth;
  const handleX = event.pointerPosition.x - container.getBoundingClientRect().left;
  const leftRatio = Math.max(0.2, Math.min(0.8, handleX / totalWidth));
  this.leftFlex = leftRatio;
  this.rightFlex = 1 - leftRatio;
}
```

```html
<div class="ds-split-page ds-split-page--resizable" #splitContainer [class.is-dragging]="isDragging">
  <div class="ds-split-page__panel ds-split-page__panel--left" [style.flex]="leftFlex + ' 1 0'"></div>
  <div class="ds-split-page__handle"
       cdkDrag cdkDragLockAxis="x"
       (cdkDragStarted)="isDragging = true"
       (cdkDragEnded)="isDragging = false"
       (cdkDragMoved)="onHandleDrag($event, splitContainer)"
       aria-label="Drag to resize panels" role="separator" aria-orientation="vertical" tabindex="0">
    <div class="ds-split-page__handle-line"></div>
    <span class="ds-icon" aria-hidden="true">drag_indicator</span>
    <div class="ds-split-page__handle-line"></div>
  </div>
  <div class="ds-split-page__panel ds-split-page__panel--right" [style.flex]="rightFlex + ' 1 0'"></div>
</div>
```

#### Prototype vs production

| Aspect | Hi-fi prototype | Production (engineering handoff) |
|---|---|---|
| Resize behavior | Static flex ratio OR demo-only `mousedown`/`mousemove` JS | `CdkDragModule` from `@angular/cdk/drag-drop` |
| Split ratio | Hardcoded modifier class (e.g. `ds-split-page--7030`) | Dynamic `[style.flex]` bindings driven by drag state |
| Handle ADA | `aria-hidden="true"` in prototype | `role="separator"`, `aria-orientation="vertical"`, `tabindex="0"`, keyboard arrow keys to resize |
| Default ratio | 50/50 (no modifier) acceptable for prototypes | Product team specifies the starting ratio per view |

---

## Utilities

Utility classes live in `components/utilities/_utilities.scss` and compile into `dist/components.css`. These are single-purpose CSS helpers — not components.

---

### Screen Reader Only (`ds-sr-only`)

- **Purpose**: Visually hides an element while keeping it fully accessible to screen readers and other assistive technology. An element with `ds-sr-only` is removed from visual flow (`position: absolute; width/height: 1px`) but remains in the DOM and accessible tree.
- **Source**: `components/utilities/_utilities.scss`
- **Ships in**: `dist/components.css`

#### When to use

The primary use case in Onflo is the **page title exception**:

Every page requires `<h1 class="ds-page-content__title">` for ADA heading structure. Two pages — **Inbox** and **Ticket View** — have no visible title by design, but the H1 must still exist for screen reader users. Apply `ds-sr-only` to hide it visually without removing it from the accessibility tree.

```html
<!-- Standard page — visible title -->
<div class="ds-page-content__heading">
  <h1 class="ds-page-content__title">Contacts</h1>
</div>

<!-- Inbox / Ticket View — hidden title -->
<div class="ds-page-content__heading">
  <h1 class="ds-page-content__title ds-sr-only">Inbox</h1>
</div>
```

#### CSS class API

| Class | Purpose |
|---|---|
| `.ds-sr-only` | Visually hidden, accessible to screen readers |

#### Rules

- Combine with the element's own class — do not replace it: `class="ds-page-content__title ds-sr-only"` not just `ds-sr-only`
- Do not use `display: none` or `visibility: hidden` as an alternative — those hide content from screen readers too
- Do not use `ds-sr-only` to hide interactive elements (buttons, links) — only use on non-interactive content
- `ds-sr-only` uses both `clip` (legacy) and `clip-path: inset(50%)` (modern) for maximum browser compatibility

#### What NOT to do

- Never omit the H1 on inbox/ticket pages — add it with `ds-sr-only` instead

---

### Form Section Title (`ds-form-section-title`)

- **Purpose**: Heading for a named section within a page body or form. Always applied to an `<h2>` — the page `<h1>` is the page title; section titles are the next level down in the heading hierarchy.
- **Source**: `components/utilities/_utilities.scss`
- **Ships in**: `dist/components.css`
- **Typography**: Title H3 scale (`--ref-typescale-title-h3-*`), `--color-text-primary`, `margin: 0`

#### Usage

```html
<h2 class="ds-form-section-title">Personal Information</h2>
```

Use `ds-divider` between sections to visually separate field groups:

```html
<h2 class="ds-form-section-title">Personal Information</h2>
<ds-input label="First name" ... />
<ds-input label="Last name" ... />

<ds-divider />

<h2 class="ds-form-section-title">Account Settings</h2>
<ds-select label="Role" ... />
```

#### CSS class API

| Class | Purpose |
|---|---|
| `.ds-form-section-title` | Section heading — Title H3 typography, primary text colour |

#### Rules

- Always use on an `<h2>` — never `<h3>` or lower (unless the page has a deeper hierarchy and the context requires it)
- Never skip heading levels — the page `<h1>` must exist (visibly or via `ds-sr-only`) before using `<h2>` section titles
- Do not add extra `margin-top` — use `ds-divider` to create visual separation between sections
