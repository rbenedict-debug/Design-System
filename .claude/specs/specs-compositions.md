# Composition Patterns

These patterns document how Onflo components assemble into complete UI sections.
Individual component specs live in their respective `specs-*.md` files — this file covers
how they work together and which component to reach for when options overlap.

---

## Component Selection

Use this table when multiple components seem like valid options.

### Overlay / feedback

| Scenario | Use |
|---|---|
| Confirmation before a destructive action | `ds-dialog` |
| Short message requiring one decision (no scrolling body) | `ds-dialog` |
| Complex content, scrollable body, tabbed layout, multi-step flow | `ds-modal` |
| Non-blocking status update after an action (auto-dismisses) | `ds-snackbar` |
| Undo pattern after a reversible action | `ds-snackbar` (with action) |
| Inline error or warning the user must read before proceeding | `ds-alert` |
| Contextual hint on hover / keyboard focus (non-critical) | `[dsTooltip]` |
| Rich content preview on hover (non-critical, not actionable) | `ds-hover-card` |

Never put critical actions or required information behind a tooltip or hover card.

### Labels / tags / badges

| Scenario | Use |
|---|---|
| Status or category label on a record (read-only, no interaction) | `ds-label` |
| Removable filter applied by the user | `ds-tag` (removable variant) |
| "+N more" overflow indicator | `ds-tag` (more variant) |
| Add-new inline action styled as a tag | `ds-tag` (add variant) |
| Selectable filter chip (toggles on/off) | `ds-chip` |
| Numeric count on a nav item or avatar (unread, pending) | `ds-badge` |

### Loading states

| Scenario | Use |
|---|---|
| Content shape is known — text lines, cards, table rows | `ds-skeleton` |
| Content shape is unknown or operation is very short | `ds-spinner` |
| Full-page data load on initial route | `ds-skeleton` (page-level) |
| In-button async action (after user triggers something) | `ds-spinner` inside button |

---

## Data Table Page

Use when the primary content of a page is an AG Grid table.

```html
<div class="ds-page-content__main">

  <!-- Toolbar always sits directly above the grid -->
  <ds-table-toolbar
    [searchPlaceholder]="'Search...'"
    [showActions]="true"
    (searchValueChange)="onSearch($event)"
    (filterActiveChange)="onFilterToggle($event)"
    (settingsActiveChange)="onSettingsToggle($event)">

    <!-- Left: primary actions -->
    <ng-container toolbar-actions>
      <ds-button variant="filled">New Item</ds-button>
    </ng-container>

    <!-- Right: extras between search and filter/settings buttons -->
    <!-- Use toolbar-extra for date filters, dropdown filters, etc. -->

  </ds-table-toolbar>

  <!-- AG Grid — fills remaining height -->
  <ag-grid-angular
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [suppressPaginationPanel]="true">
  </ag-grid-angular>

  <!-- Paginator replaces AG Grid's built-in — always use this, never the AG Grid default -->
  <ds-ag-paginator [api]="gridApi" />

</div>
```

**Rules:**
- `ds-table-toolbar` always sits outside the AG Grid instance, directly before it inside `ds-page-content__main`
- Always set `suppressPaginationPanel: true` on the grid — `ds-ag-paginator` replaces it entirely
- Page-level tabs (if the page has sections) go in `ds-page-content__heading`, never inside `ds-page-content__main`
- Column panel and filter panels are positioned relative to the toolbar buttons — they are not part of the grid DOM
- `ds-table-toolbar` `[showActions]="false"` collapses the left panel; the right panel (search + controls) fills the full width — use this for read-only / view-only table pages
- Left toolbar slot is for primary actions only (New, Import, Export) — secondary/destructive actions go in a `ds-menu` triggered from an icon button in `[toolbar-trailing]`
- Never put pagination controls inside the toolbar

---

## Page content structure

Every page's content area follows this flex column layout. Understanding it is required before placing `ds-save-bar` or any fixed footer element correctly.

```
.ds-page-content  (flex column, gap: --spacing-lg)
  ├── .ds-page-content__heading   (flex-shrink: 0)  — title + optional tabs, never scrolls
  ├── .ds-page-content__main      (flex: 1, overflow-y: auto)  — scrollable body card
  └── <ds-save-bar>               (flex-shrink: 0)  — below the card, never scrolls
```

- `ds-page-content__main` is the scroll boundary — content inside it scrolls, everything outside does not
- `ds-save-bar` is a sibling of `ds-page-content__main`, not inside it — it always stays visible below the body card regardless of scroll position
- The `gap: var(--spacing-lg)` on `ds-page-content` handles spacing between heading, body, and save bar automatically — do not add manual margins

---

## Form / Detail Page

Use when the primary content of a page is a form with editable fields.

### Pattern A — Conditional save bar

Save bar appears only when the form has unsaved changes. Use for settings-style pages where the user edits fields and explicitly saves when ready.

```html
<main class="ds-page-content" role="main">

  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Settings</h1>
  </div>

  <div class="ds-page-content__main">

    <!-- Server-side error: above the first affected section, not top of page -->
    @if (serverError) {
      <ds-alert variant="error" size="sm">{{ serverError }}</ds-alert>
    }

    <!-- Form fields -->
    <ds-input label="First name" [(value)]="form.firstName"
              [isError]="hasError('firstName')"
              [errorMessage]="getError('firstName')" />

    <ds-divider />

    <ds-select label="Status" [options]="statusOptions"
               [(value)]="form.status" />

  </div>

  <!-- Sibling of ds-page-content__main — appears when dirty, stays outside scroll area -->
  @if (formDirty) {
    <ds-save-bar
      [variant]="saveError ? 'error' : 'default'"
      (cancelClick)="onCancel()"
      (saveProgressClick)="onSaveProgress()"
      (saveAndExitClick)="onSaveAndExit()" />
  }

</main>
```

### Pattern B — Persistent save bar

Save bar is always visible. Use for editor-style pages where the user works continuously and saves progress at any point.

```html
<main class="ds-page-content" role="main">

  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Editor</h1>
  </div>

  <div class="ds-page-content__main">
    <!-- editor content -->
  </div>

  <!-- Always present — not conditional -->
  <ds-save-bar
    [variant]="saveError ? 'error' : 'default'"
    (cancelClick)="onCancel()"
    (saveProgressClick)="onSaveProgress()"
    (saveAndExitClick)="onSaveAndExit()" />

</main>
```

**Rules:**
- `ds-save-bar` is always a sibling of `ds-page-content__main`, never inside it
- Never show `ds-save-bar` and a separate save/cancel button row simultaneously — pick one pattern per page
- Use Pattern A (conditional) for settings pages; use Pattern B (persistent) for editors and long-running work sessions
- Field-level validation errors go on the individual field via `[isError]` + `[errorMessage]` — never use `ds-alert` for field validation
- `ds-alert` is for server-side / API errors that affect the whole form or aren't tied to a single field
- `ds-save-bar` variant switches to `error` when a save attempt fails — do not hide or remove the bar on error
- Use `ds-divider` to visually separate field groups within the body card

---

## Empty and Loading States

### Loading

Show `ds-skeleton` while content is fetching. Apply `aria-busy="true"` on the container being replaced — not on the skeleton elements themselves.

```html
<!-- Table loading — ds-skeleton uses content projection, not a [rows] input -->
@if (loading) {
  <ds-skeleton ariaLabel="Loading table data">
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line ds-skeleton__line--sm"></div>
    <!-- repeat to approximate the expected content shape -->
  </ds-skeleton>
} @else {
  <!-- real content -->
}
```

**Rules:**
- Never show skeleton and real content at the same time — swap atomically
- `ds-skeleton` sets `aria-busy="true"` on itself automatically — do not add it again to the outer container
- `ds-skeleton` has no `[rows]` input — populate it via content projection using `ds-skeleton__line` and `ds-skeleton__rect` elements
- Use `ds-skeleton` when you know the content shape (table rows, card lists, form fields)
- Use `ds-spinner` when shape is unknown or the wait is triggered by a user action (button click, form submit)
- For in-button loading: put `ds-spinner` inside the button and disable the button — never show a full-page skeleton for a button action

### Empty state

Show when data has loaded but there are genuinely zero results — not a loading state, not an error.

```html
<div class="ds-page-content__main">
  @if (rows.length === 0 && !loading) {
    <div class="empty-state">
      <span class="ds-icon ds-icon--lg" aria-hidden="true">inbox</span>
      <p>No items yet.</p>
      <ds-button variant="filled" (click)="onCreate()">Create your first item</ds-button>
    </div>
  } @else {
    <!-- real content -->
  }
</div>
```

**Rules:**
- Always distinguish between loading (show skeleton) and empty (show empty state) — never show an empty state while data is still fetching
- Empty state copy should state what is empty and offer a next action when one exists
- Use a large icon (`ds-icon--lg`) as a visual anchor — not an illustration (no custom SVGs)
- Never use `ds-skeleton` to represent an empty state — skeleton implies content is coming
- For filtered-empty (search/filter returns zero results): show a different message than truly-empty ("No results for X" vs "No items yet") and include a clear-filters action
