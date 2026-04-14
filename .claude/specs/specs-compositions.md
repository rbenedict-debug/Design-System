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

### Grid sizing — read this first

AG Grid requires its host element to have an explicit height. Without one the grid renders at 0 height or forces the outer container to scroll everything as one tall document, bypassing AG Grid's row virtualization entirely.

The correct pattern uses two purpose-built CSS classes:

| Class | Where | What it does |
|---|---|---|
| `ds-page-content__main--table` | On `ds-page-content__main` | Changes the outer container to `overflow: hidden; display: flex; flex-direction: column` so the grid can own its scroll viewport |
| `ds-ag-grid` | On `ag-grid-angular` | Sets `flex: 1 1 0; min-height: 0; width: 100%` — fills remaining height; `min-height: 0` prevents flex overflow on small viewports |

**Never use `domLayout="autoHeight"` on a paginated table.** Auto-height renders every row into the DOM at once, disabling row virtualization. The grid becomes unresponsive past ~500 rows. Normal mode (the default — no `domLayout` attribute) is always correct for Onflo tables.

### AG Grid theme class

AG Grid requires a theme class on the grid element for its structural CSS to apply (viewport sizing, column borders, horizontal scrollbar, pinned column shadows). Without it the grid renders as a collapsed box with no visible structure.

Add the theme class alongside `ds-ag-grid` on the same element:
- **AG Grid v31+ (recommended):** `ag-theme-base` — structural CSS only, no built-in colours; our DS tokens handle all visual styling
- **AG Grid v28–v30:** `ag-theme-alpine` — override colours and fonts via CSS variables

### Full composition

```html
<main class="ds-page-content" role="main">

  <div class="ds-page-content__heading">
    <h1 class="ds-page-content__title">Contacts</h1>
  </div>

  <!-- Add --table modifier — changes overflow and enables flex column layout -->
  <div class="ds-page-content__main ds-page-content__main--table">

    <!-- 74px fixed — always outermost, directly above the grid -->
    <ds-table-toolbar
      [searchPlaceholder]="'Search contacts'"
      [showActions]="true"
      (searchValueChange)="onSearch($event)"
      (filterActiveChange)="onFilterToggle($event)"
      (settingsActiveChange)="onSettingsToggle($event)">

      <ng-container toolbar-actions>
        <ds-button variant="filled">New Contact</ds-button>
      </ng-container>

    </ds-table-toolbar>

    <!-- 56px fixed — auto-hides when no row groups are active -->
    <ds-table-row-groups-bar [api]="gridApi" />

    <!-- AG Grid — ds-ag-grid fills remaining height; theme class required -->
    <ag-grid-angular
      class="ds-ag-grid ag-theme-quartz"
      [defaultColDef]="defaultColDef"
      [columnTypes]="columnTypes"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [rowHeight]="56"
      [headerHeight]="56"
      [groupRowHeight]="56"
      [pagination]="true"
      [suppressPaginationPanel]="true"
      [suppressContextMenu]="true"
      [suppressHeaderContextMenu]="true"
      (gridReady)="onGridReady($event)">
    </ag-grid-angular>

    <!-- 56px fixed — replaces AG Grid's built-in paginator entirely -->
    <ds-ag-paginator [api]="gridApi" />

  </div>

</main>
```

### Column panel placement

The column panel slides in from the right edge of `ds-page-content__main`. Bind `[data-panel-open]` on `ds-page-content__main--table` when the settings toolbar button is active, and include `ds-column-panel` as a sibling of the grid (not inside it):

```html
<div class="ds-page-content__main ds-page-content__main--table"
     [attr.data-panel-open]="settingsActive || null">

  <ds-table-toolbar ... (settingsActiveChange)="settingsActive = $event" />
  <ds-table-row-groups-bar [api]="gridApi" />
  <ag-grid-angular class="ds-ag-grid ag-theme-quartz" ... />
  <ds-ag-paginator [api]="gridApi" />

  <!-- Column panel — 300px, slides in from right when data-panel-open is set -->
  <ds-column-panel [api]="gridApi" [(density)]="density" />

</div>
```

### Angular component wiring

```typescript
import {
  DS_TABLE_DEFAULT_COL_DEF,
  DS_TABLE_COLUMN_TYPES,
  DsTableGroupRowCellComponent,
  DsTableGroupExpansionStore,
  DsAgPaginatorComponent,
  DsTableStatusBarComponent,
} from '@onflo/design-system';

export class ContactsTableComponent {
  readonly defaultColDef = DS_TABLE_DEFAULT_COL_DEF;
  readonly columnTypes = DS_TABLE_COLUMN_TYPES;

  gridApi: GridApi | null = null;
  settingsActive = false;
  density: TableDensity = 'comfort';

  private expansionStore = new DsTableGroupExpansionStore('contacts-table');

  columnDefs: ColDef[] = [
    { field: 'name',   headerName: 'Name',   flex: 1,   minWidth: 150 },
    { field: 'email',  headerName: 'Email',  flex: 1,   minWidth: 150 },
    { field: 'status', headerName: 'Status', width: 120, type: 'dsGroupable' },
  ];

  gridOptions: GridOptions = {
    groupDisplayType: 'groupRows',             // Enterprise — requires license
    groupRowRenderer: DsTableGroupRowCellComponent,
    isGroupOpenByDefault: (p) => this.expansionStore.isGroupOpenByDefault(p),
    onRowGroupOpened: (e) => this.expansionStore.onRowGroupOpened(e),
    statusBar: {
      statusPanels: [
        { statusPanel: DsTableStatusBarComponent, align: 'full-width' },
        { statusPanel: DsAgPaginatorComponent,    align: 'right' },
      ],
    },
  };

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    // Fit columns after first render — required when any column uses flex: 1
    setTimeout(() => this.gridApi?.sizeColumnsToFit(), 0);
  }

  onSettingsToggle(active: boolean): void {
    this.settingsActive = active;
    // Re-fit columns after the column panel opens/closes (container width changes)
    setTimeout(() => this.gridApi?.sizeColumnsToFit(), 300);
  }

  // ── Context menu ──────────────────────────────────────────────────────────
  ctxItems: DsContextMenuItem[] = [];
  ctxX = 0; ctxY = 0; ctxVisible = false;

  onHeaderContextMenu(e: DsTableRowContextMenuEvent): void {
    this.ctxItems   = buildDefaultHeaderContextMenuItems(e.params.column.getColId(), this.gridApi!);
    this.ctxX       = e.x;
    this.ctxY       = e.y;
    this.ctxVisible = true;
  }

  onRowContextMenu(e: DsTableRowContextMenuEvent): void {
    this.ctxItems   = buildDefaultRowContextMenuItems(e.params.value);
    this.ctxX       = e.x;
    this.ctxY       = e.y;
    this.ctxVisible = true;
  }
}
```

And include the context menu element in the template:

```html
<div class="ds-page-content__main ds-page-content__main--table"
     [attr.data-panel-open]="settingsActive || null">

  <ds-table-toolbar
    (settingsActiveChange)="onSettingsToggle($event)"
    ... />

  <ag-grid-angular
    ...
    [suppressContextMenu]="true"
    [suppressHeaderContextMenu]="true"
    (gridReady)="onGridReady($event)" />

  <ds-ag-paginator [api]="gridApi" />
  <ds-column-panel [api]="gridApi" [(density)]="density" />

</div>

<!-- Context menu — one instance, outside the grid DOM -->
<ds-table-context-menu
  [items]="ctxItems"
  [x]="ctxX" [y]="ctxY"
  [visible]="ctxVisible"
  (closed)="ctxVisible = false" />
```

Wire `(headerContextMenu)` on `ds-table-header-cell` and `(rowContextMenu)` on `ds-table-row-cell` via column defs:

```typescript
columnDefs: ColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    headerComponentParams: { headerContextMenu: this.onHeaderContextMenu.bind(this) },
    cellRendererParams:    { rowContextMenu:    this.onRowContextMenu.bind(this)    },
  },
];
```

**Rules:**
- Always use `ds-page-content__main--table` on the outer container — never use the default `__main` for table pages
- Always add a theme class (`ag-theme-quartz` or `ag-theme-base`) on `ag-grid-angular` alongside `ds-ag-grid`
- Always set `suppressPaginationPanel: true` — `ds-ag-paginator` replaces the built-in paginator
- Always set `suppressContextMenu: true` and `suppressHeaderContextMenu: true` — DS context menus replace the built-in ones
- Always include `<ds-column-panel [api]="gridApi">` and wire `settingsActiveChange` to `[attr.data-panel-open]` — column panel is part of every table
- Always include `<ds-table-context-menu>` and wire `(headerContextMenu)` / `(rowContextMenu)` — context menu is part of every table
- Always call `sizeColumnsToFit()` in `onGridReady` when any column uses `flex: 1`, and again when the column panel opens/closes
- Never use `domLayout="autoHeight"` on a paginated table
- `ds-table-toolbar` always sits directly above `ag-grid-angular` inside `__main--table` — it must be outside the AG Grid DOM
- `ds-table-row-groups-bar` sits between the toolbar and the grid — auto-hides when no groups are active; bind `[api]="gridApi"` to auto-sync
- Page-level tabs go in `ds-page-content__heading`, never inside `__main--table`
- Left toolbar slot is for primary actions only (New, Import, Export) — secondary/destructive actions go in a `ds-menu` inside `[toolbar-trailing]`

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

    <!-- Section heading — always h2 (h1 is the page title) -->
    <h2 class="ds-form-section-title">Personal Information</h2>

    <ds-input label="First name" [(value)]="form.firstName"
              [isError]="hasError('firstName')"
              [errorMessage]="getError('firstName')" />

    <ds-divider />

    <!-- Next section -->
    <h2 class="ds-form-section-title">Status</h2>

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

Use `ds-skeleton` while content is fetching. Two patterns depending on context:

**General content (single bar):**
```html
@if (loading) {
  <ds-skeleton ariaLabel="Loading content">
    <div class="ds-skeleton__line"></div>
  </ds-skeleton>
} @else {
  <!-- real content -->
}
```

**Table rows (repeat lines to match expected row count):**
```html
@if (loading) {
  <ds-skeleton ariaLabel="Loading table data">
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
    <div class="ds-skeleton__line"></div>
  </ds-skeleton>
} @else {
  <!-- ag-grid -->
}
```

**Rules:**
- `ds-skeleton` sets `aria-busy="true"` on itself automatically — do not add it to the outer container
- `ds-skeleton` has no `[rows]` input — project `ds-skeleton__line` and `ds-skeleton__rect` elements via `<ng-content>`
- Never show skeleton and real content simultaneously — swap atomically
- Use `ds-skeleton` when the content shape is known; use `ds-spinner` when unknown or when a user action triggered the wait
- For in-button loading: `ds-spinner` inside the button + disable the button — never a full-page skeleton for a button action

---

### Empty state

Use `ds-empty-state` when a content area has loaded but has no data to show. It displays a branded illustration and a message. Do not use a Material Symbol icon as a substitute — the empty state has its own dedicated illustration.

```html
<!-- Table empty state — sm vertical (default) -->
<ds-empty-state heading="No data available" />

<!-- Filtered empty — sm vertical with action -->
<ds-empty-state
  heading="No results found"
  description="Try adjusting your search or clearing your filters.">
  <ds-button variant="outlined" (click)="clearFilters()">Clear filters</ds-button>
</ds-empty-state>

<!-- Full-page empty — lg vertical -->
<ds-empty-state
  size="lg"
  heading="Nothing here yet"
  description="Create your first item to get started.">
  <ds-button variant="filled" (click)="onCreate()">Create item</ds-button>
</ds-empty-state>

<!-- Compact horizontal — for constrained vertical space (dashboard cards) -->
<ds-empty-state size="sm" layout="horizontal" heading="No data available" />
```

**Rules:**
- Always distinguish loading (skeleton) from empty (empty state) — never show empty state while still fetching
- Use `size="sm"` inside table rows, cards, and compact containers; `size="lg"` for full-page empty views
- Write a specific `heading` — "No contacts found" is better than "No data available"
- For filtered-empty (search/filter returned zero): use different copy than truly-empty ("No results for this search" vs "No contacts yet") and include a clear-filters action
- Never use `ds-skeleton` to represent an empty state — skeleton signals content is still loading
