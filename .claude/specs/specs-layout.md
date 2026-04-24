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

### Page content edit scope

When Rebecca says **"change the page content to X"**, **"build a table on this page"**, **"put a dashboard here"**, or any similar instruction to replace or swap what a page shows:

- **Only modify the contents of `ds-page-content__main`** (or, on a split layout, the specified `ds-split-page__panel--left` or `ds-split-page__panel--right`).
- **Never touch `ds-page-content__heading`** — the `<h1 class="ds-page-content__title">` and any `<ds-tabs>` inside it are structural and must be preserved exactly as-is. The heading sits ABOVE the content area and is NEVER placed inside `__main`.
- **Never remove or replace the `<main class="ds-page-content">` shell** — it always wraps `__heading` and either `__main` (regular/table/dashboard pages) or `ds-split-page` directly (split-layout pages).
- If switching from a split layout to a regular layout: remove `ds-split-page` and add `<div class="ds-page-content__main">` in its place. If switching from regular to split: remove `__main` and add `<div class="ds-split-page">` directly. The heading above never changes in either case.

**Correct scope:**
```
ds-page-content
  ds-page-content__heading   ← NEVER touch this (sits above the content area)
    h1.ds-page-content__title
  ds-page-content__main      ← edit ONLY this (replace its contents)
    [replace contents here]
```

**Dashboard exception — `ds-page-content__main--dashboard`:**

`ds-page-content__main` is a card (border-radius + box-shadow). Dashboard pages must NOT use the plain `__main` because it creates a double-layer: the card wrapping the metric cards and chart tiles which have their own elevation. Use the `--dashboard` modifier instead — it strips the card shell so tiles float directly on the page-floor background.

**Canonical dashboard page structure** — the page title is visible in `__heading` (same as any other page), `ds-dashboard-toolbar` sits between the heading and main as a sibling flex child (it does not scroll), and only the bento grid tiles are inside `__main--dashboard` (which scrolls):

```html
<main class="ds-page-content ds-page-content--dashboard" role="main">
  <div class="ds-page-content__dashboard-header">

    <!-- Use --row when pairing the title with a date/status line beside it.
         If there is no metadata, use plain ds-page-content__heading. -->
    <div class="ds-page-content__heading ds-page-content__heading--row">
      <h1 class="ds-page-content__title">Support Dashboard</h1>
      <p class="ds-page-content__meta">April 20, 2026 · Last updated 2 minutes ago</p>
    </div>

    <!-- Toolbar controls — no __identity needed when title is in __heading -->
    <div class="ds-dashboard-toolbar">
      <div class="ds-dashboard-toolbar__controls">…</div>
    </div>

  </div><!-- /.ds-page-content__dashboard-header -->

  <!-- Dashboard tiles — ds-page-content--dashboard scrolls, not this element -->
  <div class="ds-page-content__main ds-page-content__main--dashboard">
    <!-- metric cards, chart tiles -->
  </div>
</main>
```

Never put `ds-dashboard-toolbar` inside `__main--dashboard` — it would scroll with the content. Never use `style="background: ...; border-radius: 0; box-shadow: none"` inline overrides to work around the card — use the `--dashboard` modifier.

---

### Subnav + nav-expand rules

These rules apply to every page in every Onflo application:

1. **Every page shell must include `<nav class="ds-subnav">`** inside `ds-page-layout__body`, even if the subnav has no items yet. Never omit the subnav element.
2. **Every page shell must include `<ds-nav-expand>`** (the show/hide toggle button). It is always a direct child of `ds-page-layout`, absolutely positioned at the right edge of the subnav. Never omit it.
3. Both elements must be wired together — `[open]` on `<ds-nav-expand>` reflects subnav state, `(toggle)` flips it, and `.is-collapsed` is applied to `.ds-subnav` when closed.

---

### Top-nav structural rules

These rules apply to every page shell:

1. **`ds-top-nav__tabs` is always present** — never omit the tab strip `<div class="ds-top-nav__tabs">`, even if it starts with only one tab.
2. **All action icon buttons must be inside `<div class="ds-top-nav__actions">`** — never place them directly as children of `<header class="ds-top-nav">`. The wrapper is what enforces the horizontal row layout.
3. **`__actions` is always a single flat flex row** — `flex-direction: row` is explicit in the SCSS. Never nest a column-direction container inside it. Each button (or `__action-badge` wrapper) is a direct child.
4. **Each button uses `ds-top-nav__action-btn`** — 32×32px circular button. If it needs a badge, wrap it in `ds-top-nav__action-badge`; the button itself stays a direct child of that wrapper, not buried deeper.

**Canonical structure:**
```html
<header class="ds-top-nav" role="banner">
  <div class="ds-top-nav__tabs">
    <!-- ds-nav-tab items -->
  </div>
  <div class="ds-top-nav__actions">
    <button class="ds-top-nav__action-btn" type="button" aria-label="Chatsy">…</button>
    <div class="ds-top-nav__action-badge">
      <button class="ds-top-nav__action-btn ds-top-nav__action-btn--orange" type="button" aria-label="Notifications, 3 new">…</button>
      <div class="ds-badge-indicator" aria-hidden="true">3</div>
    </div>
    <button class="ds-top-nav__action-btn ds-top-nav__action-btn--navy" type="button" aria-label="Profile — Rebecca B.">R</button>
  </div>
</header>
```

---

### Nav-sidebar structural rules

These rules apply to every page shell:

1. **`ds-nav-sidebar__logo` is always first** — the Onflo logo SVG is always the first child of `ds-nav-sidebar`. Never omit it, replace it with text, or move it.
2. **`ds-nav-sidebar__nav` holds all nav buttons** — every `ds-nav-button` item must be inside this wrapper. Never place nav buttons as direct children of `ds-nav-sidebar`.
3. **`ds-nav-sidebar__bottom` is always last** — holds `ds-agent-status` (and any other bottom-pinned elements). Never omit it.
4. **Selected state: `is-selected` + `aria-pressed="true"` + `ds-icon--filled`** — all three must move together. Unselected: no modifier class, `aria-pressed="false"`, plain `ds-icon` (no `--filled`).
5. **Never add inline `style` attributes to `ds-nav-sidebar` or any of its children** — all sizing and layout is owned by the component SCSS. Inline overrides (e.g. `style="flex-shrink: 0"`) conflict with the component and must never be used.

**Canonical structure:**
```html
<nav class="ds-nav-sidebar" role="navigation" aria-label="Main navigation">
  <div class="ds-nav-sidebar__logo">
    <!-- Onflo logo SVG -->
  </div>
  <div class="ds-nav-sidebar__nav">
    <button class="ds-nav-button is-selected" type="button" aria-pressed="true" aria-label="Tickets">
      <span class="ds-icon ds-icon--filled" aria-hidden="true">inbox</span>
      <span class="ds-nav-button__label">Tickets</span>
    </button>
    <button class="ds-nav-button" type="button" aria-pressed="false" aria-label="Contacts">
      <span class="ds-icon" aria-hidden="true">contacts</span>
      <span class="ds-nav-button__label">Contacts</span>
    </button>
    <!-- additional nav buttons -->
  </div>
  <div class="ds-nav-sidebar__bottom">
    <button class="ds-agent-status" type="button" aria-pressed="true" aria-label="Call agent status: Online">
      <div class="ds-agent-status__icon">
        <span class="ds-icon" aria-hidden="true">support_agent</span>
      </div>
      <div class="ds-agent-status__status">
        <span>Online</span>
        <span class="ds-icon" aria-hidden="true">keyboard_arrow_down</span>
      </div>
      <span class="ds-agent-status__indicator" aria-hidden="true"></span>
    </button>
  </div>
</nav>
```

---

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
| `.ds-page-content__heading--row` | Heading row (dashboard) | Switches heading to `flex-direction: row; justify-content: space-between` — places `__meta` date/subtitle beside the title |
| `.ds-page-content__title` | H1 | Title H1 typography (`--ref-typescale-title-h1-*`) |
| `.ds-page-content__meta` | Page metadata | Body Small typography, `--color-text-secondary` — use for date/status text beside the title in `--row` mode |
| `.ds-page-content__main` | Content card | `flex: 1; overflow-y: auto` — scroll boundary; heading and save bar remain fixed above/below. **Not used on split or dashboard pages.** |
| `.ds-page-content__main--table` | Content card (table pages) | Adds `overflow: hidden; display: flex; flex-direction: column` — use instead of plain `__main` on any page containing an AG Grid; hands scroll control to the grid's own viewport |
| `.ds-ag-grid` | AG Grid host element | `flex: 1 1 0; min-height: 0; width: 100%` — apply on `ag-grid-angular` inside `__main--table` to fill remaining height correctly |
| `<ds-save-bar>` (when used) | Save footer | Sibling of `.ds-page-content__main`, never inside it — stays below the card regardless of scroll |

#### Angular wiring

- `ds-nav-sidebar` and `ds-top-nav` use the **CSS class API** — raw `<nav>` and `<header>` elements with class names. Do **not** import `NavSidebarComponent` or `TopNavComponent`; do **not** use `<ds-nav-sidebar>` or `<ds-top-nav>` as Angular selectors.
- `ds-nav-expand` is used as an Angular selector (`<ds-nav-expand>`). Import `NavExpandComponent`.
- `ds-subnav` is **CSS-only** — no Angular component. Manage `is-collapsed` on the element via host component state.
- Toggle open/closed state: bind `(toggle)` output on `<ds-nav-expand>` to flip a boolean, apply `.is-collapsed` to `.ds-subnav`, and update `[open]` on `<ds-nav-expand>`.
- Inner nav primitives (`<ds-nav-button>`, `<ds-agent-status>`, `<ds-nav-tab>`, `<ds-subnav-button>`, `<ds-subnav-header>`) ARE Angular selectors — import them individually.

```typescript
// Host component (simplified)
import {
  NavExpandComponent,    // <ds-nav-expand>
  NavButtonComponent,    // <ds-nav-button>
  AgentStatusComponent,  // <ds-agent-status>
  NavTabComponent,       // <ds-nav-tab>
} from '@onflo/design-system';

// Do NOT import:
// NavSidebarComponent  → shell uses <nav class="ds-nav-sidebar"> (CSS class API)
// TopNavComponent      → shell uses <header class="ds-top-nav"> (CSS class API)

subNavOpen = true;

onToggleSubnav() {
  this.subNavOpen = !this.subNavOpen;
}
```

```html
<div class="ds-page-layout">
  <!-- CSS class API — not <ds-nav-sidebar> -->
  <nav class="ds-nav-sidebar" role="navigation" aria-label="Main navigation">
    <div class="ds-nav-sidebar__logo"><!-- logo --></div>
    <div class="ds-nav-sidebar__nav">
      <ds-nav-button type="home" aria-label="Home" />
    </div>
    <div class="ds-nav-sidebar__bottom">
      <ds-agent-status />
      <ds-agent-status />
    </div>
  </nav>

  <div class="ds-page-layout__content">
    <!-- CSS class API — not <ds-top-nav> -->
    <header class="ds-top-nav" role="banner">
      <div class="ds-top-nav__tabs">
        <ds-nav-tab label="Page" [active]="true" />
      </div>
      <div class="ds-top-nav__actions">
        <!-- action buttons -->
      </div>
    </header>

    <div class="ds-page-layout__body">
      <nav class="ds-subnav" [class.is-collapsed]="!subNavOpen" role="navigation" aria-label="Section navigation">
        <!-- subnav items -->
      </nav>
      <main class="ds-page-content" role="main">
        <!-- content -->
      </main>
    </div>
  </div>

  <!-- Angular selector — NavExpandComponent IS imported -->
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

Regular pages (non-split, non-dashboard) use this structure. `__heading` is required on every page. `__main` is required on regular pages only — split pages replace it with `ds-split-page` directly; dashboard pages replace it with `ds-page-content__main--dashboard`.

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

When switching a page from split layout to a regular layout: remove the `ds-split-page` element (which is a direct child of `ds-page-content`) and replace it with `<div class="ds-page-content__main"><!-- page content --></div>`. Keep `__heading` intact — it is never modified when changing layout types.

---

### Split Page Layout (`ds-split-page`)

- **Purpose**: Two-panel content area for detail views — a list or context panel beside a primary content panel. Placed as a **direct child of `ds-page-content`** (sibling of `ds-page-content__heading`) — never wrapped in `ds-page-content__main`. Each `ds-split-page__panel` already provides its own card shell (background, border-radius, box-shadow), so adding `__main` would create a double-card. The page title (`ds-page-content__heading` + `ds-page-content__title`) stays fixed above the panels.

#### HTML structure

Always use this full `ds-page-content` shell when switching a page to a split layout:

```html
<main class="ds-page-content" role="main">

  <!-- Title — fixed above the panels, never inside them -->
  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Page Title</h1>
    <!-- <ds-tabs> here if the page has section tabs -->
  </div>

  <!-- Split panels are DIRECT children of ds-page-content — never wrap in ds-page-content__main.
       Each ds-split-page__panel already provides its own card shell (bg + border-radius + box-shadow).
       Wrapping in __main would create a double-card: a card wrapping cards. -->
  <div class="ds-split-page">
    <div class="ds-split-page__panel ds-split-page__panel--left">
      <!-- left panel content -->
    </div>
    <div class="ds-split-page__panel ds-split-page__panel--right">
      <!-- right panel content -->
    </div>
  </div>

</main>
```

Resizable variant (add `ds-split-page--resizable` + handle element):

```html
<div class="ds-split-page ds-split-page--resizable">
  <div class="ds-split-page__panel ds-split-page__panel--left"></div>
  <div class="ds-split-page__handle" aria-hidden="true">
    <div class="ds-split-page__handle-line"></div>
    <span class="ds-icon" aria-hidden="true">drag_indicator</span>
    <div class="ds-split-page__handle-line"></div>
  </div>
  <div class="ds-split-page__panel ds-split-page__panel--right"></div>
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
