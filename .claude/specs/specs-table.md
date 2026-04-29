# Component Specs — Table Components

Table Header Cell, Table Row Cell, Table Status Bar, Table Row Groups Bar, AG Grid Paginator, Table Toolbar, Column Panel

> See preview-rules.md for the shared `#table` sim rule — individual component sections show isolated variants only; the shared table section shows the composed toolbar → row-groups-bar → header → rows → status-bar → paginator view.

---

## Angular Integration — Canonical Wiring Pattern

This is the complete, correct way to wire the Onflo table system into an Angular component. Claude Code agents in consuming projects MUST use this pattern as-is.

**Community vs Enterprise**: The core table (headers, rows, pagination, toolbar, filters) works with `ag-grid-community` (free). Enterprise (`ag-grid-enterprise`) is only needed for row grouping (`groupDisplayType`, `DsTableGroupRowCellComponent`) and column grouping (`defaultColGroupDef`). Never install Enterprise unless the user explicitly asks for one of those features.

### Imports

```typescript
import {
  onfloTheme,
  DS_TABLE_DEFAULT_COL_DEF,
  DS_TABLE_DEFAULT_COL_GROUP_DEF,
  DS_TABLE_COLUMN_TYPES,
} from '@onflo/design-system';
```

### Grid options object

```typescript
import { GridOptions } from 'ag-grid-community';

gridOptions: GridOptions = {
  // ── Layer 1: Programmatic theme (sets row/header height, icon size, borders off) ──
  theme: onfloTheme,

  // ── Layer 2: DS Angular components as AG Grid renderers ─────────────────────────
  defaultColDef:      DS_TABLE_DEFAULT_COL_DEF,       // wires DsTableHeaderCellComponent + DsTableRowCellComponent
  defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF, // wires DsTableHeaderGroupCellComponent (Enterprise)
  columnTypes:        DS_TABLE_COLUMN_TYPES,           // dsCheckbox, dsNumeric, dsDate, dsGroupable, dsPinned

  // ── Layer 3: AG Grid structural CSS (already in _table-ag-theme.scss via dist) ──
  // No action needed — consumed automatically when @onflo/design-system CSS is imported.

  // ── Required settings ────────────────────────────────────────────────────────────
  suppressPaginationPanel:      true,   // DS ag-paginator takes over
  suppressContextMenu:          true,   // use ds-table-context-menu instead
  suppressHeaderContextMenu:    true,   // use ds-table-context-menu instead

  // ── Column definitions ────────────────────────────────────────────────────────────
  columnDefs: [
    { field: 'name',   headerName: 'Name',   flex: 1, minWidth: 120 },
    { field: 'amount', headerName: 'Amount', type: 'dsNumeric', aggFunc: 'sum' },
    { field: 'dept',   headerName: 'Dept',   type: 'dsGroupable' },
    { colId: '_sel',   headerName: '', type: 'dsCheckbox', pinned: 'left' },
  ],
};
```

### Template

The toolbar, grid, and paginator must sit inside `ds-page-content__main--table` — this modifier sets the flex column container that gives the grid its explicit height. Without it the grid collapses.

```html
<div class="ds-page-content__main ds-page-content__main--table"
     [attr.data-panel-open]="settingsActive || null">
  <ds-table-toolbar
    [(settingsActive)]="settingsActive"
  />
  <ag-grid-angular
    class="ds-ag-grid ag-theme-quartz"
    [gridOptions]="gridOptions"
    (gridReady)="onGridReady($event)"
    (gridSizeChanged)="onGridSizeChanged($event)"
  />
  <ds-ag-paginator [api]="gridApi" />
  <ds-column-panel [api]="gridApi" [(density)]="density" />
</div>
```

### Component class

```typescript
import { Component } from '@angular/core';
import { GridApi, GridReadyEvent, GridSizeChangedEvent } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import {
  onfloTheme,
  DS_TABLE_DEFAULT_COL_DEF,
  DS_TABLE_COLUMN_TYPES,
  DsTableToolbarComponent,
  DsAgPaginatorComponent,
  DsColumnPanelComponent,
} from '@onflo/design-system';

@Component({
  standalone: true,
  imports: [AgGridAngular, DsTableToolbarComponent, DsAgPaginatorComponent, DsColumnPanelComponent],
  templateUrl: './my-page.component.html',
})
export class MyPageComponent {
  gridApi?: GridApi;
  settingsActive = false;
  density: 'comfort' | 'compact' = 'comfort';

  gridOptions = {
    theme: onfloTheme,
    defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
    columnTypes: DS_TABLE_COLUMN_TYPES,
    pagination: true,
    paginationPageSize: 50,
    suppressPaginationPanel: true,
    suppressContextMenu: true,
    suppressHeaderContextMenu: true,
    columnDefs: [
      { field: 'name',   headerName: 'Name',   flex: 1, minWidth: 120 },
      { field: 'amount', headerName: 'Amount', type: 'dsNumeric', aggFunc: 'sum' },
      { colId: '_sel',   headerName: '', type: 'dsCheckbox', pinned: 'left' },
    ],
  };

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
    setTimeout(() => this.gridApi?.sizeColumnsToFit(), 0);
  }

  onGridSizeChanged(event: GridSizeChangedEvent): void {
    event.api.sizeColumnsToFit();
  }
}
```

### What each layer does

| Layer | What it sets | How it's applied |
|---|---|---|
| `onfloTheme` | rowHeight/headerHeight (56px), iconSize (20px), spacing (8px), all native borders off | JS object passed to `theme:` in gridOptions |
| `DS_TABLE_DEFAULT_COL_DEF` | `headerComponent: DsTableHeaderCellComponent`, `cellRenderer: DsTableRowCellComponent` | Applied to every column automatically via `defaultColDef` |
| `DS_TABLE_COLUMN_TYPES` | Pre-configured column type presets (dsCheckbox, dsNumeric, etc.) | Applied per-column via `type: 'dsNumeric'` etc. |
| `_table-ag-theme.scss` | Colors, fonts, filter menus, overlays, sidebar chrome | Ships in `dist/components.css` — applied via `.ag-root-wrapper` CSS overrides |

### Custom cell content

For columns that need badge/chip/icon content instead of plain text, use a custom Angular component as `cellRenderer` for that column:

```typescript
// In your column def — overrides the defaultColDef cellRenderer for this column only
{ field: 'status', headerName: 'Status', cellRenderer: StatusBadgeCellComponent }
```

The custom component must implement `agInit(params)` and `refresh(params)` — see `DsTableRowCellComponent` source for reference.

### Enterprise row grouping

```typescript
gridOptions = {
  // ...standard setup above...
  groupDisplayType: 'groupRows',
  groupRowRenderer: DsTableGroupRowCellComponent,   // import from '@onflo/design-system'
};
```

---

## Grid Layout and Sizing

### Container requirements

AG Grid requires an explicit height on its host element. The correct approach for Onflo data table pages uses two CSS classes shipped in `dist/layout.css`:

**`ds-page-content__main--table`** — Add this modifier to `ds-page-content__main` on any page that contains a table. It changes the container to `overflow: hidden; display: flex; flex-direction: column`, handing scroll control to AG Grid's own viewport.

**`ds-ag-grid`** — Add this class to the `ag-grid-angular` element. Sets `flex: 1 1 0; min-height: 0; width: 100%`. The `min-height: 0` is non-negotiable — without it, a flex child cannot shrink below its intrinsic content height and the grid overflows the parent on smaller viewports.

### domLayout

| Mode | When to use | Notes |
|---|---|---|
| *(default — normal)* | Always, for paginated tables | AG Grid scrolls internally; row virtualisation active; correct for all Onflo use |
| `autoHeight` | Never on paginated tables | Renders all rows into the DOM simultaneously, disabling virtualisation; blocks browser past ~500 rows |
| `print` | Print/export only | No scrollbars; renders all content; only use when generating a print view |

Never set `domLayout="autoHeight"` on a production table. If a page designer requests a full-height grid with no scrollbar, the correct answer is to size the grid container correctly so the grid fills the viewport — not to disable virtualisation.

### AG Grid theme class

The DS uses AG Grid's v31+ programmatic Theme API. With this approach the theme object injects its own CSS and applies the `ag-theme-quartz` class to the grid's root wrapper internally.

Add `ag-theme-quartz` to the same element as `ds-ag-grid` — it is harmless/redundant with the programmatic API, but it ensures AG Grid's own structural CSS selector scoping is correct for any rules that still rely on it:

```html
<ag-grid-angular class="ds-ag-grid ag-theme-quartz" ...>
```

Do **not** also load `ag-theme-quartz.css` in `angular.json` — that file is for the legacy CSS-variable approach and conflicts with the programmatic theme. Only `ag-grid.css` is needed.

```html
<ag-grid-angular class="ds-ag-grid ag-theme-quartz" ...>
```

The Onflo DS does not import AG Grid theme CSS — consuming projects must add it to their `angular.json` styles array (or equivalent) from `ag-grid-community/styles/`.

### Responsive sizing

AG Grid fires `gridSizeChanged` when its container is resized. Use this to auto-size columns or hide/show columns based on available width:

```typescript
onGridSizeChanged(event: GridSizeChangedEvent): void {
  // Auto-size all columns to fit the new container width
  event.api.sizeColumnsToFit();
}
```

Bind in the template: `(gridSizeChanged)="onGridSizeChanged($event)"`.

---

## Column Groups (`DsTableHeaderGroupCellComponent`)

Column groups nest related columns under a shared header row. The group header renders above the individual column headers.

### Setup

```typescript
gridOptions = {
  defaultColDef:      DS_TABLE_DEFAULT_COL_DEF,
  defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF,  // wires DsTableHeaderGroupCellComponent
  columnDefs: [
    {
      headerName: 'Contact',
      marryChildren: true,    // keeps columns adjacent when others are pinned/moved
      children: [
        { field: 'firstName', headerName: 'First name', flex: 1 },
        { field: 'lastName',  headerName: 'Last name',  flex: 1 },
      ],
    },
    { field: 'email', headerName: 'Email', flex: 1 },
  ],
};
```

### Expandable groups

Mark some children with `columnGroupShow` to make the group collapsible. The chevron appears automatically when the group is expandable.

```typescript
{
  headerName: 'Contact',
  openByDefault: false,
  children: [
    { field: 'firstName', headerName: 'First name' },            // always visible
    { field: 'lastName',  headerName: 'Last name',  columnGroupShow: 'open'   },  // open only
    { field: 'phone',     headerName: 'Phone',       columnGroupShow: 'closed' },  // closed only
  ],
}
```

### Visual spec

- **Height**: controlled by AG Grid group header row height — matches `headerHeight` (56px)
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Label**: label-medium weight-prominent, truncated with ellipsis — same as `ds-table-header-cell`
- **Chevron**: `chevron_right` (sm, `--color-icon-default`) — only rendered when group `isExpandable()`; rotates 90° with `--motion-duration-short` ease when expanded; turns `--color-icon-brand` when expanded
- **No sort, filter, or menu buttons** — those belong on individual column headers
- **No resize handle on the group** — individual child column headers have their own resize pipes; AG Grid handles group resize natively via its own resize grip if `resizable: true` on the group

### `marryChildren: true`

Keeps all columns in the group adjacent. Without it, users can drag columns out of the group, breaking the group boundary. Set on any group where the visual grouping must always be intact.

### `suppressStickyLabel`

By default the group label stays sticky as the user scrolls horizontally (so the label remains visible even when the leftmost child column has scrolled off-screen). Set `suppressStickyLabel: true` on the group def to disable this behaviour.

---

## Column Sizing

### Resize pipe — drag and double-click

The right resize pipe on `ds-table-header-cell` supports two gestures:

| Gesture | Behaviour |
|---|---|
| **Drag** | `setColumnWidth(colId, newWidth, false)` during drag (real-time reflow of flex columns); `setColumnWidth(colId, finalWidth, true)` on release (finalizes state, fires `columnResized`) |
| **Double-click** | `autoSizeColumn(colId)` — sizes the column to fit its content (considers only currently rendered rows, max ~50 rows with default buffer) |

### flex vs fixed width

```typescript
{ field: 'name',   flex: 1, minWidth: 120 }  // fills remaining space
{ field: 'status', width: 120 }               // fixed; flex columns absorb the delta
```

Once a user drags a flex column's resize pipe, AG Grid converts it to a fixed width. This is AG Grid behaviour — no special handling needed.

### `autoSizeStrategy` (grid option)

For initial column sizing on grid load:

```typescript
gridOptions = {
  autoSizeStrategy: { type: 'fitGridWidth', defaultMinWidth: 80 },
  // or:
  autoSizeStrategy: { type: 'fitCellContents' },
};
```

`fitGridWidth` — scales columns proportionally to fill the grid width (similar to `sizeColumnsToFit()`).
`fitCellContents` — sizes each column to fit its rendered cell content on load.

### `sizeColumnsToFit()` for responsive resize

Call on `gridSizeChanged` to re-fit columns when the container is resized:

```typescript
onGridSizeChanged(e: GridSizeChangedEvent): void {
  e.api.sizeColumnsToFit();
}
```

Note: `suppressSizeToFit: true` on a colDef excludes that column from `sizeColumnsToFit()` — use this on fixed-width system columns (e.g. checkbox column) to prevent them from being stretched.

### Shift-drag

Holding ⇧ Shift while dragging a resize pipe takes space from the adjacent column, keeping the total grid width constant. This is handled natively by AG Grid when `colResizeDefault: 'shift'` is set on the grid options. Our custom resize drag does not implement shift-resize — if this behaviour is required, remove the custom resize pipe and rely on AG Grid's built-in resize grip instead.

---

## Column Moving

Column reordering is handled natively by AG Grid via drag on the label area (the label has `cursor: grab`). No custom code is needed in the DS.

### Key grid options

| Option | Default | Purpose |
|---|---|---|
| `suppressColumnMoveAnimation` | false | Disable the slide animation during reorder — set true on slower platforms |
| `suppressDragLeaveHidesColumns` | false | Prevent columns from being hidden when dragged outside the grid boundary |
| `suppressMoveWhenColumnDragging` | false | Prevent real-time column movement during drag (columns snap to position on drop) |

### Per-column locking

| Property | Effect |
|---|---|
| `suppressMovable: true` | Blocks drag-to-reorder for this column; API can still move it |
| `lockPosition: 'left' \| 'right'` | Fixes position permanently — even API calls cannot displace it; use for system columns that must always be first/last |

Both are included in the `dsCheckbox` and `dsPinned` column types in `DS_TABLE_COLUMN_TYPES`.

---

## Column Pinning

Pinning is set via `pinned: 'left' | 'right'` on a colDef, or by the user dragging a column to the grid edge and holding for ~1 second. The context menu actions "Pin Left", "Pin Right", and "Unpin" are included in `buildDefaultHeaderContextMenuItems`.

### Pinned column borders

AG Grid adds `.ag-pinned-left-header` and `.ag-pinned-right-header` to the pinned header containers. The DS SCSS adds the inner edge border automatically:

```scss
.ag-pinned-left-header  .ds-table-header-cell { border-right: 1px solid var(--color-border-secondary); }
.ag-pinned-right-header .ds-table-header-cell { border-left:  1px solid var(--color-border-secondary); }
// Same rule is in _table-header-group-cell.scss for group headers.
```

### `lockPinned`

```typescript
{ field: 'actions', type: 'dsPinned', width: 56 }
// dsPinned includes: pinned: 'right', lockPinned: true, suppressMovable: true, resizable: false
```

`lockPinned: true` prevents the user from unpinning the column via drag or the column menu. The column can still be moved programmatically. Use on system action columns that must always be pinned.

### Pinned section width constraint

AG Grid enforces a minimum 50px center viewport — if pinned columns are too wide, AG Grid auto-unpins rightmost columns. Control which columns are auto-unpinned via the `processUnpinnedColumns` grid option.

---

## Column Spanning

`colSpan` makes data cells span across multiple columns. It applies to row cells only — for spanning header cells, use column groups instead.

```typescript
{
  field: 'category',
  colSpan: (params) => params.data.isGroupHeader ? 4 : 1,
}
```

`DsTableRowCellComponent` works transparently with `colSpan` — AG Grid controls the cell width and the component just renders within it.

**Constraints:**
- Spanning cannot cross pinned/unpinned boundaries — a cell can only span within its own region (left-pinned, center, or right-pinned)
- Cell range selection does not work correctly with spanned cells
- Best suited for read-only report layouts; avoid in interactive tables with sorting/reordering

---

## Row Grouping (Enterprise)

Row grouping is an **AG Grid Enterprise** feature. It requires the `RowGroupingModule` and an Enterprise license. All four grouping modes work with the DS component system but the DS provides a native renderer only for `groupRows` mode.

---

### `rowGroup: true` vs `enableRowGroup: true`

These are completely different properties that are frequently confused:

| Property | Effect | Where to set |
|---|---|---|
| `rowGroup: true` on a colDef | The column is **grouped by default on grid init** | Directly on the colDef |
| `enableRowGroup: true` on a colDef | The column **can be dragged into a group** by the user (appears in ds-column-panel and ds-table-row-groups-bar) | Via `type: 'dsGroupable'` or directly |

`DS_TABLE_COLUMN_TYPES.dsGroupable` sets `enableRowGroup: true` only — it does not activate grouping on load. To group on load, also add `rowGroup: true` to the colDef:

```typescript
{ field: 'department', headerName: 'Department', type: 'dsGroupable', rowGroup: true }
// This column appears in the picker AND is grouped by default.
```

---

### `groupDisplayType` — four modes

| Mode | Description | DS native renderer? |
|---|---|---|
| `'singleColumn'` *(default)* | One auto-generated group column; all hierarchy levels nested within it | No — AG Grid's `agGroupCellRenderer` |
| `'multipleColumns'` | One auto-generated group column per hierarchy level | No — AG Grid's `agGroupCellRenderer` |
| `'groupRows'` | Full-width group rows replace the group column | **Yes** — `DsTableGroupRowCellComponent` |
| `'custom'` | Developer provides entirely custom group columns | Consumer-supplied |

**Use `groupRows` for all Onflo tables.** It integrates with `DsTableGroupRowCellComponent`, `DsTableGroupExpansionStore`, and the aggregates pattern.

`singleColumn` and `multipleColumns` use AG Grid's built-in `agGroupCellRenderer` for the group cell content. The auto group column header still uses `DsTableHeaderCellComponent` (inherited from `defaultColDef`), but the cell content is AG Grid's own renderer and will not automatically match DS visual styling.

---

### `groupRows` mode — complete setup

```typescript
import {
  DsTableGroupRowCellComponent,
  DsTableGroupExpansionStore,
  DS_TABLE_DEFAULT_COL_DEF,
  DS_TABLE_COLUMN_TYPES,
} from '@onflo/design-system';

const store = new DsTableGroupExpansionStore('my-page-grid');

gridOptions: GridOptions = {
  // Required for groupRows mode
  groupDisplayType: 'groupRows',
  groupRowRenderer: DsTableGroupRowCellComponent,

  // Optional — hide child count badge in the group row
  groupRowRendererParams: { suppressCount: false },

  // Column config
  defaultColDef:   DS_TABLE_DEFAULT_COL_DEF,
  columnTypes:     DS_TABLE_COLUMN_TYPES,
  columnDefs: [
    { field: 'department', headerName: 'Department', type: 'dsGroupable', rowGroup: true },
    { field: 'name',       headerName: 'Name',       flex: 1 },
    { field: 'amount',     headerName: 'Amount',     type: ['dsNumeric', 'dsAggregatable'], aggFunc: 'sum' },
  ],

  // Expansion persistence
  getRowId:             (p) => String(p.data.id),
  isGroupOpenByDefault: (p) => store.isGroupOpenByDefault(p),
  onRowGroupOpened:     (e) => store.onRowGroupOpened(e),

  // Expand all groups on load (-1) or N levels (0 = all collapsed)
  groupDefaultExpanded: 0,

  // Keep group rows sticky at top during scroll (default: true — set false to disable)
  suppressGroupRowsSticky: false,
};
```

### `groupRowRendererParams` options for `DsTableGroupRowCellComponent`

| Option | Type | Default | Purpose |
|---|---|---|---|
| `suppressCount` | boolean | `false` | Hide the "(N)" child count badge — useful when row counts appear in the status bar |
| `suppressDoubleClickExpand` | boolean | `false` | Disable expand/collapse on double-click |
| `suppressEnterExpand` | boolean | `false` | Disable expand/collapse on Enter key |

---

### `singleColumn` / `multipleColumns` mode — autoGroupColumnDef

When not using `groupRows`, configure the auto-generated group column(s) via `autoGroupColumnDef`. This is merged with `defaultColDef` but AG Grid always uses `agGroupCellRenderer` for the cell — your `defaultColDef.cellRenderer` is ignored on the auto group column.

```typescript
gridOptions = {
  groupDisplayType: 'singleColumn',   // or 'multipleColumns'
  defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF,
  defaultColDef:      DS_TABLE_DEFAULT_COL_DEF,

  autoGroupColumnDef: {
    headerName: 'Group',
    minWidth: 220,
    // AG Grid's agGroupCellRenderer handles the chevron + count;
    // innerRenderer controls the text content within the cell.
    cellRendererParams: {
      suppressCount: true,    // hide "(N)" count
      innerRenderer: null,    // null = show the group value text directly
    },
  },
};
```

`checkboxLocation: 'autoGroupColumn'` embeds selection checkboxes in the group column instead of a dedicated checkbox column:

```typescript
rowSelection: {
  mode: 'multiRow',
  checkboxLocation: 'autoGroupColumn',
}
```

---

### Group expansion

| Option | Type | Default | Purpose |
|---|---|---|---|
| `groupDefaultExpanded` | number | `0` | Levels expanded on grid init; `-1` = all open |
| `isGroupOpenByDefault` | callback | — | Per-group open/closed decision; use with `DsTableGroupExpansionStore` |
| `suppressGroupRowsSticky` | boolean | `false` | Prevents group rows from sticking at the top during scroll |
| `groupHideOpenParents` | boolean | `false` | Hides a group row when it is expanded (only child rows visible) |
| `groupHideParentOfSingleChild` | boolean / `'leafGroupsOnly'` | `false` | Removes group row wrappers when a group has only one child |

---

### Column visibility when grouping

By default, AG Grid hides the original data column when it becomes a row group (the data is already shown in the group row label). Control this with:

```typescript
// Prevent AG Grid from auto-hiding/showing columns when they're grouped/ungrouped
suppressGroupChangesColumnVisibility: true,
```

When `suppressGroupChangesColumnVisibility: false` (default), consumers can still show the original column manually via `ds-column-panel`.

---

### Group row selection

Requires `rowSelection.mode: 'multiRow'`. The `groupSelects` option controls how selecting a group row affects its descendants:

| `groupSelects` value | Behaviour |
|---|---|
| `'self'` | Group selection has no effect on children |
| `'descendants'` | Selecting the group selects all descendants |
| `'filteredDescendants'` | Selecting the group selects only filtered-in descendants |

```typescript
rowSelection: {
  mode: 'multiRow',
  groupSelects: 'descendants',
  checkboxLocation: 'autoGroupColumn',  // show checkbox in group row
}
```

**Important**: When using `'descendants'` or `'filteredDescendants'`, `api.getSelectedNodes()` and `api.getSelectedRows()` return only **leaf rows**, not group nodes.

---

### Group sorting

Groups inherit the sort order of their grouped column by default. To set a custom group order:

**`initialGroupOrderComparator`** — sets the initial order of groups before any user sort:

```typescript
gridOptions = {
  initialGroupOrderComparator: (params) =>
    params.nodeA.allLeafChildren.length - params.nodeB.allLeafChildren.length,
  // Sorts groups largest-first on load.
  // Note: runs before aggregation — cannot use aggData here.
};
```

**`autoGroupColumnDef.comparator`** — custom sort when the user clicks the group column header (decoupled from the underlying grouped column's comparator):

```typescript
autoGroupColumnDef: {
  comparator: (valueA, valueB, nodeA, nodeB) =>
    nodeA.allLeafChildren.length - nodeB.allLeafChildren.length,
}
```

**Mixed sort indicator**: In `singleColumn` mode, if the grouped columns have conflicting sort directions, the group column header shows a "mixed sort" icon. This is AG Grid behaviour — no DS handling required.

**`groupMaintainOrder: true`** — prevents groups from reordering when non-group columns are sorted (maintains the visual group position while sorting data within groups).

---

### Group row dragging

#### Managed drag (Enterprise, client-side only)

AG Grid automatically updates group membership when a row is dragged to a new group:

```typescript
gridOptions = {
  rowDragManaged:             true,  // AG Grid manages reorder
  refreshAfterGroupEdit:      true,  // re-evaluate grouping after drag changes a value
  suppressMoveWhenRowDragging: true, // show drop target only (better performance)
  getRowId: (p) => String(p.data.id),  // required for managed drag
};
```

`refreshAfterGroupEdit: true` is required — without it, the grid does not re-evaluate group membership after the dragged row's column value changes.

`rowDragManaged` only works with the **client-side row model**. Do not set it with server-side or infinite row models.

#### Unmanaged drag (any row model)

Handle group membership updates in application code via drag events:

```typescript
gridOptions = {
  rowDragManaged: false,
  // rowDrag on colDef can be a callback to restrict dragging to leaf rows:
  // rowDrag: (params) => !params.node.group,
};

onRowDragMove(event: RowDragMoveEvent): void {
  // Update the group column value on the dragged row's data, then:
  this.gridApi.applyTransaction({ update: [updatedRow] });
}
```

---

## Row Configuration

### Row IDs (`getRowId`)

Always define `getRowId` in gridOptions when rows have a stable identifier. AG Grid uses it to:
- Maintain selection state across data updates (e.g. after `setRowData` or `applyTransaction`)
- Preserve scroll position and focused cell after an update
- Correctly diff row data in `rowModelType: 'clientSide'` transactions

```typescript
gridOptions = {
  getRowId: (params) => String(params.data.id),
};
```

Without `getRowId`, AG Grid generates internal IDs based on row index. These reset on any data change, causing selection loss and scroll jumps.

**Immutability flag**: When using `getRowId`, also set `immutableData: true` (AG Grid v28) or use `applyTransaction` (v29+) for efficient data updates without full re-renders.

---

### Row Height and Density

Row height is controlled by the `rowHeight` grid option. **Header height is always 56px and never changes with density** — only row height changes.

Tie row height to the Onflo density toggle via a component property:

```typescript
readonly ROW_HEIGHT_COMFORT = 68;
readonly ROW_HEIGHT_COMPACT = 42;

density: TableDensity = 'comfort';

get rowHeight(): number {
  return this.density === 'comfort' ? this.ROW_HEIGHT_COMFORT : this.ROW_HEIGHT_COMPACT;
}

onDensityChange(value: TableDensity): void {
  this.density = value;
  // Tell AG Grid to re-measure all row heights — required when rowHeight is dynamic.
  this.gridApi?.resetRowHeights();
}
```

Bind in the template:

```html
<ag-grid-angular [rowHeight]="rowHeight" ...>
<ds-column-panel [(density)]="density" (densityChange)="onDensityChange($event)" />
```

`resetRowHeights()` is required — AG Grid caches row heights and won't update the layout without it. `rowHeight` alone only takes effect on next grid init if you don't call `resetRowHeights()`.

**Group row height**: For `groupDisplayType: 'groupRows'`, also set `groupRowHeight` to match:

```typescript
gridOptions = {
  rowHeight: this.rowHeight,
  groupRowHeight: this.rowHeight,
};
```

---

### Row Sorting

Sorting is driven by the column header (`ds-table-header-cell`) — no extra grid config is required for basic sorting. Additional options:

| Option | Default | Purpose |
|---|---|---|
| `sortingOrder` (grid or colDef) | `['asc', 'desc', null]` | Cycle order for sort states. Set `['asc', 'desc']` to prevent un-sorting. |
| `multiSortKey` | `'ctrl'` | Hold Ctrl to add a secondary sort without clearing the first. |
| `accentedSort` | `false` | Treat accented characters (é, ñ) as distinct from their unaccented equivalents. |
| `suppressMultiSort` | `false` | Disable multi-column sort entirely — one sort at a time. |

```typescript
gridOptions = {
  sortingOrder: ['asc', 'desc', null],
  multiSortKey: 'ctrl',
  accentedSort: true,
};
```

**Server-side sort**: Set `sortModel` via `api.setSortModel()` and handle `sortChanged` event to fetch new data. The header cell's `setSort()` call still triggers the sort UI; you intercept it in `sortChanged`.

---

### Row Numbers

AG Grid has no built-in row number column. Add a read-only `valueGetter` column:

```typescript
{
  colId: 'rowNumber',
  headerName: '#',
  width: 56,
  suppressMovable: true,
  sortable: false,
  filter: false,
  resizable: false,
  valueGetter: (params) => String((params.node?.rowIndex ?? 0) + 1),
  cellRendererParams: { align: 'right', cellData: true },
}
```

Note: `rowIndex` is the display index, not the data index. It changes with sorting and filtering, which is typically the correct behaviour for visible row numbers.

---

### Row Dragging

Row dragging lets users reorder rows by dragging. It requires AG Grid Enterprise for `rowDragManaged: true` (automatic reorder); client-side unmanaged drag is available in Community.

#### Basic setup (managed)

```typescript
gridOptions = {
  rowDragManaged: true,       // AG Grid handles the reorder automatically
  rowDragEntireRow: false,    // drag only from the drag handle column
};
```

Add a column with `rowDrag: true` — AG Grid renders its own drag handle in that column by default:

```typescript
{ field: 'name', rowDrag: true, ... }
```

#### Custom gripper with DsTableRowCellComponent

To use the Onflo gripper icon instead of AG Grid's default handle, set `cellRendererParams: { gripper: true }` on the column and omit AG Grid's default handle. AG Grid will call `registerRowDragger` on our component after `agInit`:

```typescript
{
  field: 'name',
  rowDrag: true,
  cellRendererParams: { gripper: true },
  // The DS cell renderer calls registerRowDragger(gripperEl) automatically
  // in ngAfterViewChecked once the button has rendered.
}
```

`DsTableRowCellComponent.agInit` stores the params; `ngAfterViewChecked` registers the gripper button with AG Grid via `params.registerRowDragger(gripperEl.nativeElement)` the first time the element is in the DOM.

#### Unmanaged drag (custom reorder logic)

Set `rowDragManaged: false` and listen to drag events to apply your own sort order:

```typescript
gridOptions = {
  rowDragManaged: false,
};

onRowDragEnd(event: RowDragEndEvent): void {
  // event.overNode is the row the dragged row was dropped onto
  // Reorder your data array and call api.setRowData() or applyTransaction()
}
```

#### Key drag options

| Option | Purpose |
|---|---|
| `rowDragManaged: true` | AG Grid automatically reorders rows (Enterprise) |
| `rowDragEntireRow: true` | Entire row is the drag handle (no column restriction) |
| `rowDragMultiRow: true` | Drag multiple selected rows together |
| `suppressRowDrag: true` | Disable drag entirely (e.g. during a sort) |

---

### Row Styles (AG Grid row container classes)

AG Grid applies state classes to the `.ag-row` wrapper element, not to our cell renderer. The DS SCSS in `_table-row-cell.scss` targets these classes at the global scope to style our cells correctly:

| Class on `.ag-row` | DS SCSS target | Background |
|---|---|---|
| `.ag-row-hover` | `.ag-row-hover .ds-table-row-cell` | `--overlay-hovered` |
| `.ag-row-selected` | `.ag-row-selected .ds-table-row-cell` | `--overlay-focused` |
| `.ag-row-selected.ag-row-hover` | both together | `--overlay-focused` (selection wins) |
| `.ag-row-pinned` | `.ag-row-pinned .ds-table-row-cell` | `--color-surface-subtle`, no border-bottom |

These are the only row state classes the DS needs to handle. Do not add `rowStyle` or `getRowStyle` to gridOptions — all state styling is handled via CSS.

**Pinned vs totals bar**: `.ag-row-pinned` targets AG Grid's native row pinning (`pinnedTopRowData` / `pinnedBottomRowData`). The `ds-table-status-bar` is a separate component, not an AG Grid pinned row. Do not confuse the two.

---

### Row Pinning

Pin a static row at the top or bottom of the grid (independent of sort/filter):

```typescript
gridOptions = {
  pinnedTopRowData: [{ id: 'summary', label: 'Average', amount: 4200 }],
  pinnedBottomRowData: [{ id: 'total', label: 'Total', amount: 84000 }],
};
```

Pinned rows render with `.ag-row-pinned` and receive the subtle background + no border from the DS SCSS rules above.

**Not to be confused with `ds-table-status-bar`** — the status bar is outside the AG Grid viewport, positioned between the grid and paginator. Use it for aggregate totals. Use `pinnedTopRowData`/`pinnedBottomRowData` when the pinned row must scroll horizontally with the grid columns (e.g. column-level averages).

---

### Row Pagination

```typescript
gridOptions = {
  pagination: true,
  paginationPageSize: 50,
  suppressPaginationPanel: true,   // required — use ds-ag-paginator instead
};
```

`paginationPageSize` sets the initial page size. The `ds-ag-paginator` component syncs via the pagination API and allows users to change the page size.

| Option | Purpose |
|---|---|
| `paginationAutoPageSize` | Auto-calculates page size to fill the viewport — incompatible with fixed row height density toggle |
| `paginateChildRows` | (Enterprise) Paginate expanded group rows rather than top-level groups |
| `suppressPaginationPanel` | Required — always set to suppress AG Grid's built-in pagination UI |

**`paginateChildRows`**: When `true` and row grouping is active, pagination counts individual child rows rather than group-level rows. This keeps the page size consistent but means users may see an incomplete group at the page boundary. Use only when consistency of count matters more than group integrity.

---

### Row Spanning

`colSpan` makes a single cell span across multiple adjacent columns. This is a column-level callback — it runs per cell:

```typescript
{
  field: 'category',
  colSpan: (params) => params.data?.isHeader ? 4 : 1,
}
```

`DsTableRowCellComponent` is transparent to `colSpan` — AG Grid sets the cell's DOM width and our component renders within it.

**Constraints:**
- Spanning cannot cross pinned/unpinned boundaries
- Cell range selection breaks on spanned cells
- Row virtualisation is less efficient with spanned cells (AG Grid disables partial-span buffering)
- Best for read-only report layouts; avoid in interactive tables

For spanning header cells, use column groups (see Column Groups section) instead.

---

## Column Configuration

### defaultColDef

Always set `DS_TABLE_DEFAULT_COL_DEF` as your `defaultColDef`. It wires `DsTableHeaderCellComponent` and `DsTableRowCellComponent` across every column automatically. Override per-column as needed.

```typescript
import { DS_TABLE_DEFAULT_COL_DEF, DS_TABLE_COLUMN_TYPES } from '@onflo/design-system';

gridOptions: GridOptions = {
  defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
  columnTypes: DS_TABLE_COLUMN_TYPES,
};
```

`DS_TABLE_DEFAULT_COL_DEF` sets: `headerComponent`, `cellRenderer`, `sortable: true`, `resizable: true`, `minWidth: 80`. It does NOT set `filter` — add that yourself if you need a default filter across all columns:

```typescript
defaultColDef: {
  ...DS_TABLE_DEFAULT_COL_DEF,
  filter: 'agTextColumnFilter',  // or true for auto-detection
}
```

### columnTypes — DS_TABLE_COLUMN_TYPES

| Type | Purpose |
|---|---|
| `dsRightAligned` | Right-aligns header + cell text (no filter override) |
| `dsNumeric` | Right-aligned + `agNumberColumnFilter` |
| `dsGroupable` | Sets `enableRowGroup: true` — column appears in row groups picker |
| `dsAggregatable` | Sets `enableValue: true` — column appears in values picker |
| `dsDate` | `agDateColumnFilter` with ISO string comparator |
| `dsCheckbox` | Fixed 56px, no label/sort/filter — for row selection columns |
| `dsPinned` | Pinned right, not movable/resizable — for action columns |

Multiple types can be composed: `type: ['dsGroupable', 'dsNumeric']`.

### Column definition patterns

**Flex + fixed width:**
```typescript
{ field: 'name',   flex: 1, minWidth: 120 }  // fills remaining space
{ field: 'status', width: 120 }               // fixed width
```

**Right-aligned numeric with aggregation:**
```typescript
{
  field: 'amount',
  headerName: 'Amount',
  type: ['dsNumeric', 'dsAggregatable'],
  aggFunc: 'sum',
}
```

**Groupable column (Enterprise):**
```typescript
{
  field: 'department',
  headerName: 'Department',
  type: 'dsGroupable',
}
// Also required in gridOptions:
//   groupDisplayType: 'groupRows'
//   groupRowRenderer: DsTableGroupRowCellComponent
//   enableRowGroup: true  (grid-level flag, separate from per-column flag)
```

**Initial hidden column (togglable via column panel):**
```typescript
{ field: 'notes', headerName: 'Notes', hide: true }
// Do not use initialHide here — use hide for columns that start hidden.
```

**Pinned system column (locked, non-hideable):**
```typescript
{ field: 'actions', headerName: '', type: 'dsPinned', width: 56, lockVisible: true }
// lockVisible: true marks the column as system in ds-column-panel (no checkbox).
```

**Checkbox selection column:**
```typescript
{ field: '', colId: 'select', type: 'dsCheckbox' }
// Pair with:
//   gridOptions.rowSelection = 'multiple'
//   gridOptions.suppressRowClickSelection = true
```

**valueFormatter — always honoured:**
```typescript
{
  field: 'amount',
  type: 'dsNumeric',
  valueFormatter: ({ value }) => `$${Number(value).toLocaleString()}`,
}
// DsTableRowCellComponent reads params.valueFormatted first, so formatters work.
```

### Column locking reference

| Property | Effect |
|---|---|
| `pinned: 'left' \| 'right'` | Anchors column to a grid edge; user can still unpin via context menu |
| `lockPosition: 'left' \| 'right'` | Locks position even via API — cannot be unpinned or reordered |
| `suppressMovable: true` | Prevents drag-to-reorder; API can still move it |
| `lockVisible: true` | Column panel shows the row at 40% opacity with no interaction; API can still hide it |

### Key enableRowGroup / enableValue rules

- `enableRowGroup: true` **must** be set on every column that should appear in the row groups picker (`ds-column-panel`) or the drop zone (`ds-table-row-groups-bar`). Without it the column is filtered out of both pickers.
- `enableValue: true` **must** be set on every column that should appear in the values (aggregation) picker. Without it the column won't appear even if `aggFunc` is set.
- `aggFunc` on a colDef is separate from `enableValue` — set both when you want a column to aggregate AND be user-configurable in the panel.

---

---

## Tree Data (Enterprise)

Tree data renders a parent-child hierarchy where each row can have children — unlike row grouping (which aggregates flat data by a shared field value). Both require AG Grid Enterprise.

| Feature | Row Grouping | Tree Data |
|---|---|---|
| Data shape | Flat array; AG Grid groups by field values | Hierarchical paths or nested records |
| Child count | Aggregated count of leaf rows in the group | Count of all descendants including groups |
| Display type | `groupDisplayType` (groupRows, singleColumn, etc.) | `treeDataDisplayType: 'auto' | 'custom'` |
| Configuration | `rowGroup: true` on colDef | `treeData: true` + path/children callback |

### Enabling tree data

```typescript
gridOptions = {
  treeData: true,
  getDataPath: (data) => data.orgHierarchy,  // returns string[] path e.g. ['Erica', 'Malcolm']
  getRowId: (params) => params.data.id,       // required for transactions and managed drag
};
```

### Three data supply methods

**Path-based** (`getDataPath`): flat array where each row has a path array:
```typescript
rowData = [
  { id: '1', name: 'Erica',   orgHierarchy: ['Erica'] },
  { id: '2', name: 'Malcolm', orgHierarchy: ['Erica', 'Malcolm'] },
];
getDataPath: (data) => data.orgHierarchy,
```

**Nested records** (`treeDataChildrenField`): rows contain a children array:
```typescript
rowData = [{ name: 'Erica', children: [{ name: 'Malcolm' }] }];
gridOptions = {
  treeData: true,
  treeDataChildrenField: 'children',
};
// Constraint: transactions (applyTransaction) are not supported with treeDataChildrenField.
```

**Self-referential** (`treeDataParentIdField`): each row references its parent by ID:
```typescript
rowData = [
  { id: '1', name: 'Erica',   parentId: null },
  { id: '2', name: 'Malcolm', parentId: '1' },
];
gridOptions = {
  treeData: true,
  treeDataParentIdField: 'parentId',
  getRowId: (p) => p.data.id,  // required
};
```

### Group column for tree data

Like row grouping, tree data uses `agGroupCellRenderer` in an auto-generated group column. Configure via `autoGroupColumnDef`:

```typescript
autoGroupColumnDef: {
  headerName: 'Organisation',
  minWidth: 260,
  field: 'name',               // display this field inside the group cell
  cellRendererParams: {
    suppressCount: true,       // hide descendant count (all descendants, including groups)
    suppressDoubleClickExpand: false,
  },
};
```

**Important**: The auto group column cell uses AG Grid's `agGroupCellRenderer`, not `DsTableRowCellComponent`. The data columns (non-group) use our renderer. The `tier1Indent`/`tier2Indent` inputs on `DsTableRowCellComponent` are for standalone/preview use only — AG Grid tree data handles indentation automatically inside the group column.

### Tree data selection

Same API as row grouping selection:

```typescript
rowSelection: {
  mode: 'multiRow',
  groupSelects: 'descendants',       // 'self' | 'descendants' | 'filteredDescendants'
  checkboxLocation: 'autoGroupColumn',
  headerCheckbox: false,
}
```

### Tree data row dragging

Managed drag requires `treeDataParentIdField`:

```typescript
gridOptions = {
  treeData: true,
  treeDataParentIdField: 'parentId',
  getRowId:                    (p) => p.data.id,
  rowDragManaged:              true,
  suppressMoveWhenRowDragging: true,
  rowDragInsertDelay:          500,    // ms delay before expanding a parent on hover
};
autoGroupColumnDef = {
  rowDrag: true,   // show drag handle in the group column
};
```

Managed drag prevents cyclic parent-child relationships automatically. Use `isRowValidDropPosition` callback to restrict drops (e.g. prevent files being dropped onto other files).

---

## Master-Detail (Enterprise)

Master-detail displays a detail panel below an expanded master row. The detail panel can contain any content — typically a nested AG Grid. Requires AG Grid Enterprise (`MasterDetailModule`).

### Required setup

```typescript
gridOptions = {
  masterDetail: true,
  detailCellRendererParams: {
    // The detail grid's full configuration
    detailGridOptions: {
      columnDefs: [
        { field: 'callId',     headerName: 'Call ID' },
        { field: 'direction',  headerName: 'Direction' },
        { field: 'duration',   headerName: 'Duration', type: 'dsNumeric' },
      ],
      defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
    },

    // Supply row data to each detail grid instance
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },

    // Refresh strategy when master row data updates
    refreshStrategy: 'rows',   // 'rows' | 'everything' | 'nothing'
  },

  // Optional: which rows show the expand control
  isRowMaster: (data) => data.callRecords?.length > 0,

  // Fixed or auto height for the detail panel
  detailRowHeight: 300,        // fixed px; use detailRowAutoHeight: true for dynamic
  keepDetailRows: true,        // preserve detail grids when collapsed (default: false)
  keepDetailRowsCount: 10,     // max cached detail grids (default: 10)
};
```

### `isRowMaster` — controlling which rows can expand

```typescript
isRowMaster: (data) => Boolean(data.children?.length),
```

After a transaction update, `isRowMaster` is re-evaluated. Rows that lose their detail data can be programmatically collapsed before the transaction:

```typescript
if (rowNode.expanded && !data.children?.length) {
  rowNode.setExpanded(false);
}
this.gridApi.applyTransaction({ update: [data] });
```

### Refresh strategies

| Strategy | Behaviour | Use when |
|---|---|---|
| `'rows'` *(default)* | Calls `getDetailRowData` and updates detail grid rows via `setRowData` | Detail data changes; want to preserve grid state (scroll, selection, column state) |
| `'everything'` | Destroys and recreates the entire detail panel | Template changes; need a completely fresh grid instance |
| `'nothing'` | No automatic refresh | Application manages detail refresh manually |

With `'rows'`: also set `getRowId` on the detail grid options to enable efficient individual row updates rather than full replacement.

### Accessing detail grid APIs

```typescript
// Access a specific detail grid by row ID
const info = this.gridApi.getDetailGridInfo(`detail_${rowId}`);
info?.api?.sizeColumnsToFit();

// Iterate all active detail grids
this.gridApi.forEachDetailGridInfo((info) => {
  info.api?.sizeColumnsToFit();
});
```

### Custom detail cell renderer

Replace the default detail panel with any content (forms, charts, custom grids):

```typescript
gridOptions = {
  masterDetail: true,
  detailCellRenderer: MyCustomDetailComponent,
  detailCellRendererParams: { /* passed to agInit(params) */ },
};
```

The custom component receives `params.node` (master row node) and `params.data` (master row data). Implement `refresh(params): boolean` — return `true` if the component updates itself; `false` forces recreation.

If the custom detail contains a nested AG Grid, register it with the master:
```typescript
agInit(params): void {
  const id = params.node.id;
  params.api.addDetailGridInfo(id, { id, api: this.detailGridApi });
}
ngOnDestroy(): void {
  this.masterApi.removeDetailGridInfo(this.rowId);
}
```

### Nested master-detail

Configure a detail grid to also be a master grid — just set `masterDetail: true` inside `detailGridOptions`. No special API is needed for the nesting.

```typescript
detailCellRendererParams: {
  detailGridOptions: {
    masterDetail: true,                  // level 2 is also a master
    detailRowAutoHeight: true,           // recommended for nested levels
    detailCellRendererParams: { ... },   // level 3 config
    getDetailRowData: (p) => p.successCallback(p.data.children),
  },
  getDetailRowData: (p) => p.successCallback(p.data.items),
}
```

Set `detailRowAutoHeight: true` on inner levels to remove per-level scrollbars — only the top-level master grid scrolls.

---

## Overlays

AG Grid shows built-in overlays for loading, no-rows, and no-matching-rows states. These sit inside the grid viewport (not above the toolbar or paginator).

### Built-in overlays

| Overlay | Condition | Suppress with |
|---|---|---|
| Loading | `loading: true` on grid options, or while data fetch is pending | `suppressOverlays: ['agLoadingOverlay']` |
| No rows | Grid has no row data | `suppressOverlays: ['agNoRowsOverlay']` |
| No matching rows | Data exists but active filters exclude all rows | `suppressOverlays: ['agNoMatchingRowsOverlay']` |
| Exporting | CSV/Excel export in progress | `suppressOverlays: ['agExportingOverlay']` |

Customise built-in overlay text (no custom component needed):

```typescript
overlayComponentParams: {
  loading: { overlayText: 'Fetching data…' },
  noRows:  { overlayText: 'No records found' },
}
```

### Manual overlay control

```typescript
// Show loading overlay programmatically
this.gridApi.showLoadingOverlay();

// Show no-rows overlay
this.gridApi.showNoRowsOverlay();

// Hide all overlays
this.gridApi.hideOverlay();
```

Or use the `activeOverlay` grid option to show a specific overlay regardless of grid state:

```typescript
// In your component
this.gridOptions.activeOverlay = 'agLoadingOverlay';
// Set to undefined to clear
```

### Custom overlay with DS components

Use `loadingOverlayComponent` / `noRowsOverlayComponent` to provide DS-styled overlays. The component must implement `agInit(params)` (AG Grid Angular overlay interface):

```typescript
@Component({
  selector: 'app-table-loading-overlay',
  standalone: true,
  imports: [DsSpinnerComponent],
  template: `
    <div style="display:flex;align-items:center;justify-content:center;height:100%;gap:12px">
      <ds-spinner diameter="32" />
      <span style="font:var(--ref-typescale-body-medium-size)/1 var(--ref-typescale-body-medium-font);
                   color:var(--color-text-secondary)">Loading…</span>
    </div>
  `,
})
export class TableLoadingOverlayComponent {
  agInit(_params: unknown): void {}
}

// No-rows overlay using ds-empty-state
@Component({
  selector: 'app-table-no-rows-overlay',
  standalone: true,
  imports: [DsEmptyStateComponent],
  template: `<ds-empty-state size="sm" title="No results" />`,
})
export class TableNoRowsOverlayComponent {
  agInit(_params: unknown): void {}
}
```

Register in gridOptions:

```typescript
gridOptions = {
  loadingOverlayComponent:  TableLoadingOverlayComponent,
  noRowsOverlayComponent:   TableNoRowsOverlayComponent,
};
```

---

## Performance

### Row and column virtualisation

AG Grid only renders rows and columns visible in the viewport (plus a small buffer). This is on by default and critical for performance. Never disable it for production tables.

| Option | Default | Effect |
|---|---|---|
| `rowBuffer` | `10` | Extra rows rendered outside the viewport; increase for smoother scroll at the cost of initial render time |
| `suppressRowVirtualisation` | `false` | Renders **all rows** into the DOM — never enable on large datasets |
| `suppressColumnVirtualisation` | `false` | Renders **all columns** into the DOM — avoid on wide tables |

### Row animation

`animateRows: true` is the default. Animations fire on filter, sort, and group expand/collapse. Disable for tables with frequent programmatic updates or very large datasets:

```typescript
gridOptions = {
  animateRows: false,   // eliminates DOM transition overhead on data changes
};
```

### Row hover highlighting

The DS SCSS adds a hover overlay via `.ag-row-hover .ds-table-row-cell`. AG Grid adds `.ag-row-hover` on every `mouseenter` event, which forces a CSS class recalculation per row. Disable if scroll performance is poor:

```typescript
gridOptions = {
  suppressRowHoverHighlight: true,
  // Note: disabling this means .ag-row-hover CSS rules in _table-row-cell.scss
  // will never fire. The hover background will not appear while this is set.
};
```

Only set this if profiling confirms hover highlight is a bottleneck. Most tables do not need it.

### Vertical scroll debouncing

```typescript
gridOptions = {
  debounceVerticalScrollbar: true,
  // Defers scroll processing until the user pauses, reducing per-frame work.
  // Trade-off: slight lag before new rows appear. Use for tables with heavy cell renderers.
};
```

### Deferred cell renderer

For expensive cell renderers, use `deferRender: true` on `cellRendererParams`. AG Grid shows a skeleton cell during fast scrolling and renders the real component when the user pauses:

```typescript
defaultColDef: {
  ...DS_TABLE_DEFAULT_COL_DEF,
  cellRendererParams: {
    ...DS_TABLE_DEFAULT_COL_DEF.cellRendererParams,
    deferRender: true,
  },
}
```

### Key performance anti-patterns

| Anti-pattern | Fix |
|---|---|
| `domLayout: 'autoHeight'` on paginated table | Use `normal` (default) — keeps virtualisation active |
| `suppressRowVirtualisation: true` | Remove — never disable virtualisation for production data |
| `rowDragManaged` on server-side model | Use unmanaged drag instead |
| `detailRowAutoHeight` on a table with 1000+ master rows | Renders all detail DOM — use fixed `detailRowHeight` instead |
| `animateRows: true` on frequently refreshed data | Set `animateRows: false` |
| Many columns with `width: 100%` / `flex` and no min-width | Set `minWidth: 80` via `DS_TABLE_DEFAULT_COL_DEF` (already set) |

### Massive row counts

AG Grid uses a "stretching" technique to work around browser max-div-height limits (Chrome: ~32M px). For datasets beyond ~500,000 rows, scroll speed appears faster than normal because the grid applies a position offset proportional to scroll percentage.

Recommended approach for very large datasets: use **pagination** (`pagination: true`, `paginationPageSize: 100–500`) rather than virtualised infinite scroll. Pagination keeps DOM and memory usage bounded regardless of total row count.

---

### Full table composition order (top to bottom)

1. `ds-table-toolbar` (74px) — always present
2. `ds-table-row-groups-bar` (56px) — present when row grouping is available
3. AG Grid header row with `ds-table-header-cell` (56px — fixed, never changes)
4. AG Grid data rows with `ds-table-row-cell` (56px comfortable / 42px compact)
5. Horizontal scrollbar (styled via `.ag-hscroll`)
6. `ds-table-status-bar` (56px) — present when aggregate values should be shown
7. `ds-ag-paginator` (56px)
8. `ds-column-panel` (300px, right side) — slides in/out via `[data-panel-open]` on container

---

### Required wiring checklist — every table must include all of these

These are non-negotiable. Omitting any of them produces visual or behavioural defects.

#### Theme and default column def

```typescript
import { onfloTheme, DS_TABLE_DEFAULT_COL_DEF } from '@onflo/design-system';

gridOptions = {
  theme: onfloTheme,                      // REQUIRED — sets cell padding, heights, borders, icon set
  defaultColDef: DS_TABLE_DEFAULT_COL_DEF, // REQUIRED — wires DsTableHeaderCellComponent + DsTableRowCellComponent to every column
};
```

`onfloTheme` sets `cellHorizontalPadding: 0` — if this is missing, AG Grid's Quartz base injects 24px padding per cell side, creating a visible gap between columns and a dead-space gap after the last column. **Never bypass `onfloTheme` or override `cellHorizontalPadding` back to a non-zero value.**

#### Paginator

```typescript
gridOptions = {
  pagination: true,
  suppressPaginationPanel: true,   // REQUIRED — ds-ag-paginator replaces AG Grid's built-in panel
};
```

```html
<!-- Always include ds-ag-paginator immediately below ag-grid-angular -->
<ds-ag-paginator [api]="gridApi" />
```

#### Context menus

```typescript
gridOptions = {
  suppressContextMenu: true,         // REQUIRED — disables AG Grid's built-in row right-click menu
  suppressHeaderContextMenu: true,   // REQUIRED — disables AG Grid's built-in header right-click menu
};
```

```html
<!-- Include ds-table-context-menu once, outside the grid -->
<ds-table-context-menu
  [items]="ctxItems"
  [x]="ctxX" [y]="ctxY"
  [visible]="ctxVisible"
  (closed)="ctxVisible = false" />
```

Wire both header and row contextmenu events:

```typescript
// In column defs — header context menu
defaultColDef = {
  ...DS_TABLE_DEFAULT_COL_DEF,
};
// DsTableHeaderCellComponent emits (headerContextMenu) — use DS_TABLE_DEFAULT_COL_GROUP_DEF
// for header group cells. Bind at the column level or via a wrapper component.

// Row context menu wired via DsTableRowCellComponent's (rowContextMenu) output.
// See ds-table-context-menu spec for buildDefaultHeaderContextMenuItems() and
// buildDefaultRowContextMenuItems() helper functions.
```

#### Column panel

```html
<!-- Outer container receives data-panel-open to reveal the column panel -->
<div class="ds-page-content__main ds-page-content__main--table"
     [attr.data-panel-open]="settingsActive || null">

  <ds-table-toolbar (settingsActiveChange)="settingsActive = $event" ... />
  <ag-grid-angular ... />
  <ds-ag-paginator [api]="gridApi" />

  <!-- 300px side panel — display:none by default, shown when ancestor has data-panel-open -->
  <ds-column-panel [api]="gridApi" [(density)]="density" />

</div>
```

The `settingsActive` value comes from `ds-table-toolbar`'s `(settingsActiveChange)` output — the toolbar's settings toggle button drives this automatically.

#### Layout class — never use the wrong main class for tables

```html
<!-- Table pages: always use --table modifier -->
<main class="ds-page-content__main ds-page-content__main--table">

<!-- Non-table pages: use default -->
<main class="ds-page-content__main">
```

#### domLayout

**Never use `domLayout: 'autoHeight'` on a paginated table.** `autoHeight` expands the grid to show all rows, ignoring pagination — the visible row count becomes meaningless. Use a fixed-height container with `height: 100%` on `ag-grid-angular` instead.

```html
<!-- WRONG — do not do this for paginated tables -->
<ag-grid-angular [domLayout]="'autoHeight'" />

<!-- CORRECT — fixed height container, grid fills it -->
<div style="flex: 1; overflow: hidden;">
  <ag-grid-angular style="height: 100%;" />
</div>
```

#### sizeColumnsToFit for responsive containers

Call `api.sizeColumnsToFit()` when the grid is inside a container whose width changes (e.g. the page layout resizes when the column panel opens). Wire it via `onGridReady` and `onColumnPanelVisibleChanged`:

```typescript
onGridReady(event: GridReadyEvent): void {
  this.gridApi = event.api;
  // Let AG Grid do its initial sizing pass first, then fit columns
  setTimeout(() => this.gridApi?.sizeColumnsToFit(), 0);
}

// Re-fit when the column panel opens/closes (container width changes)
onSettingsToggle(active: boolean): void {
  this.settingsActive = active;
  setTimeout(() => this.gridApi?.sizeColumnsToFit(), 300); // after CSS transition
}
```

---

### Table Header Cell (`ds-table-header-cell`)
- **Primitive** — internal component used inside `component/table-header-row`. AG Grid custom header renderer.
- **Height: 56px — fixed**
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Properties**: `align` (left/right), `sorting`, `filtering`, `menuControl`, `checkbox`, `pipeLeft`, `pipeRight`
- **Label typography**: `--ref-typescale-label-medium-*`, weight-prominent (bold), truncated with ellipsis
- **Resize bar**: 2px × 14px, `--color-border-primary`, inside 16px handle container; `pipeRight = true` by default, `pipeLeft = false` by default; `--active` modifier on the trailing handle enables `cursor: col-resize` and drag behavior
- **Resize drag**: `(mousedown)` on the right handle starts a drag. During drag: `setColumnWidth(colId, newWidth, false)` — `finished: false` keeps the resize in-progress so AG Grid flex columns redistribute in real-time. On `mouseup`: `setColumnWidth(colId, finalWidth, true)` — `finished: true` signals AG Grid to finalize state and fire `columnResized`. `AgHeaderParams` interface: `column.getActualWidth()`, `api.setColumnWidth(key, newWidth, finished?)`
- **Flex column pattern**: set `flex: 1` (no explicit `width`) on columns that should fill remaining space. Fixed columns keep an explicit `width`. When the user drags to resize a fixed column, AG Grid automatically redistributes the remaining width across flex columns. No extra code required — the `finished` flag protocol above is what enables real-time reflow during drag.
- **Icon buttons** (sort / filter / menu): use `<ds-icon-button size="sm" variant="icon">` — 32×32px ghost
- **Sort button**: `arrow_upward_alt` icon — only shown when column IS sorted. Sort state class on the icon span: `__sort-icon--asc` (brand), `__sort-icon--desc` (brand + rotate 180°). **When unsorted (`sortDirection === null`), do NOT render the sort button at all — no arrow shown.**
- **Filter button**: `<span class="ds-icon ds-icon--filled">filter_alt</span>` — always filled icon; default ghost colour (`--color-icon-default`)
- **Menu button**: icon uses `__menu-icon` class — `--color-icon-default` (grey ghost, turns brand on hover via ghost button styles); passes wrapper `div#menuBtnEl` to `onMenuClick()` as AG Grid positioning anchor
- **Checkbox** (select-all): `check_box_outline_blank` | `check_box` (filled, brand) | `indeterminate_check_box` (filled, brand). In AG Grid, `agInit` subscribes to `selectionChanged` to sync `checked`/`indeterminate` from `api.getSelectedNodes().length` vs `api.getDisplayedRowCount()`. Click (or Enter/Space) calls `api.selectAllFiltered()` (falls back to `api.selectAll()`) when unchecked; calls `api.deselectAll()` when checked or indeterminate. The checkbox div has `role="checkbox"`, `aria-checked="true|false|mixed"`, `tabindex="0"`. These APIs must be included in the `AgHeaderParams.api` duck-type — see `AgHeaderParams` in `table-header-cell.component.ts`.
- **Checkbox-only column**: auto-detected when `checkbox === true && !label` — applies `--checkbox-only` modifier (56px fixed width, both resize handles hidden); use with no `label` input
- **Right align**: `ds-table-header-cell__content--right` applies `justify-content: flex-end`
- **AG Grid**: implements `IHeaderAngularComp` — receives `agInit(params)`, `refresh(params)`, cleans up `sortChanged` listener and resize drag listeners in `ngOnDestroy`
- **No Angular Material base** — custom component

---

### Table Row Cell (`ds-table-row-cell`)
- **Primitive** — internal component used inside `component/table-row`. AG Grid custom cell renderer.
- **Height: 56px — fixed**
- **Padding**: `16px` horizontal (not resize handles — different from header cell)
- **Border-bottom**: 1px `--color-border-subtle` (lighter than header's `--color-border-secondary`)
- **States**: Default (transparent) | Hover (`--overlay-hovered`) | Focus/Selected (`--overlay-focused`) | Pinned (`--color-surface-subtle`, no border). In AG Grid, states are driven by AG Grid row container classes (`.ag-row-hover`, `.ag-row-selected`, `.ag-row-pinned`) targeting our cell via global SCSS — not by Angular `state` input. The `.is-hovered`/`.is-focused` inputs apply in standalone/preview only.
- **Properties**: `align` (left/right), `cellData`, `gripper`, `checkbox`, `tier1Indent` (32px), `tier2Indent` (64px)
- **Cell data typography**: `--ref-typescale-body-medium-*`, regular weight (400), 14px, 20px line-height, truncated with ellipsis
- **Left align**: `__data` has `flex: 1 0 0` (fills space). **Right align**: `__data--right` + `__content--right` (justify-end + shrink)
- **Gripper**: 32×32px ghost button (`#gripperEl`), `drag_indicator` icon, cursor `grab` / `grabbing`. When `gripper: true` is set via `cellRendererParams`, the component registers the button with AG Grid's row drag API via `params.registerRowDragger(gripperEl.nativeElement)` in `ngAfterViewChecked` (deferred because `*ngIf` renders after `agInit`). Requires `rowDrag: true` on the colDef.
- **Checkbox**: same icon pattern as header checkbox — `check_box_outline_blank` / `check_box` / `indeterminate_check_box`
- **Tier indents**: `__indent--tier1` = 32px spacer, `__indent--tier2` = 64px spacer (for tree/grouped row hierarchy)
- **AG Grid**: implements `ICellRendererAngularComp` — `agInit(params)`, `refresh(params)`, syncs `checked` via `rowSelected` event; `AgCellRendererParams` includes `registerRowDragger?` for custom drag handle registration
- **No Angular Material base** — custom component

---

### Table Header Group Cell (`ds-table-header-group-cell`)
- **Purpose**: AG Grid custom group header renderer — displays the shared column group header above a set of child column headers. Wire via `DS_TABLE_DEFAULT_COL_GROUP_DEF` as `defaultColGroupDef` in gridOptions.
- **Height**: Controlled by AG Grid `groupHeaderHeight` option — defaults to `headerHeight` (56px)
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary` — same as `ds-table-header-cell`
- **Label typography**: `--ref-typescale-label-medium-*`, weight-prominent, truncated with ellipsis
- **Chevron** (`chevron_right`, sm): rendered only when `columnGroup.isExpandable()` returns true (i.e. some children have `columnGroupShow`); rotates 90° with `--motion-duration-short` ease when expanded; `--color-icon-brand` when expanded, `--color-icon-default` when collapsed
- **Expand/collapse**: `onExpandToggle()` calls `params.setExpanded(!isExpanded)`; subscribes to `expandedChanged` event on `columnGroup` to sync state; cleaned up in `ngOnDestroy`
- **ADA**: host has `role="columnheader"`; `[attr.aria-expanded]` is set only when `isExpandable` is true (null when not expandable); chevron button has `aria-label` = "Expand/Collapse column group"
- **Pinned column borders**: `.ag-pinned-left-header .ds-table-header-group-cell` and `.ag-pinned-right-header .ds-table-header-group-cell` add the inner edge border matching `ds-table-header-cell`
- **No sort, filter, or menu buttons** — those are per individual column headers
- **AG Grid**: implements `IHeaderGroupAngularComp` — `agInit(params)`, `refresh(params)`, cleans up `expandedChanged` listener in `ngOnDestroy`; `AgHeaderGroupParams` interface exposes `columnGroup.isExpandable()`, `columnGroup.isExpanded()`, `columnGroup.getDisplayedLeafColumns()`, `setExpanded()`
- **No Angular Material base** — custom component

---

### Table Context Menu (`ds-table-context-menu`)
- **Purpose**: `position: fixed` right-click overlay for AG Grid column headers and row cells. Uses the `ds-menu` CSS class API — same visual language as `ds-menu`, no new styling introduced.
- **Required grid options**: `suppressContextMenu: true` + `suppressHeaderContextMenu: true` — disables AG Grid's built-in menus so the DS menu can take over
- **Inputs**: `[items]` (`DsContextMenuItem[]`), `[x]` (clientX), `[y]` (clientY), `[visible]` (boolean)
- **Output**: `(closed)` — emit when the menu should close; set `[visible]="false"` in handler
- **Wiring**: `DsTableHeaderCellComponent` emits `(headerContextMenu)` on right-click; `DsTableRowCellComponent` emits `(rowContextMenu)` on right-click; both expose event types `DsTableHeaderContextMenuEvent` and `DsTableRowContextMenuEvent`
- **Default builders**:
  - `buildDefaultHeaderContextMenuItems(colId, api)` → Sort Ascending/Descending/Clear, Pin Left/Right/Unpin, Auto Size/Reset Columns, Group by Column
  - `buildDefaultRowContextMenuItems(value)` → Copy (clipboard API with textarea fallback for non-secure contexts)
- **`DsContextMenuItem`**: `{ label?, icon?, separator?, disabled?, destructive?, action? }` — spread/extend the defaults per page
- **Viewport flip**: menu flips above/left when it would overflow the viewport edge; `adjustPosition()` runs after each open via `setTimeout(0)` to let the panel render before measuring
- **Focus**: panel receives focus on open for keyboard accessibility
- **ADA**: `role="menu"` on panel; `role="menuitem"` on each item; `aria-disabled` on disabled items; Escape closes via `@HostListener('document:keydown.escape')`
- **One instance per page/layout** — place `<ds-table-context-menu>` once; reuse across header and row events by updating `[items]`, `[x]`, `[y]`, `[visible]`
- **No Angular Material base** — custom component

---

### AG Grid Paginator (`ds-ag-paginator`)
- **Purpose**: Custom pagination panel that replaces AG Grid's built-in paginator. Use with `suppressPaginationPanel: true`.
- **Height**: 56px — fixed (matches AG Grid row / header height)
- **Background**: `--color-surface-subtle`; padding: `0 var(--spacing-lg)`; content: right-aligned
- **Integration**: Register as a status bar panel OR use standalone below the grid. Exposes `[api]` input (`AgPaginationApi`) and calls `agInit(params)` when used as a status panel.
- **"Items per page" selector**: `ds-select` component — 96px wide (constrained via `ds-ag-paginator__size-select` class), no label, `[options]` bound to `pageSizeSelectOptions` (number array mapped to `DsSelectOption[]`), `(valueChange)` calls `paginationSetPageSize`. The "Items per page:" span is `aria-hidden="true"` (visual label only). Always use `ds-select` — never a raw native `<select>`.
- **Range text**: `"1 - 50 of 200"` format (hyphen with spaces); Body Small typography (`--ref-typescale-body-small-*`); `--color-text-primary`; `aria-live="polite"`
- **Nav buttons**: 4 ghost buttons — `first_page`, `keyboard_arrow_left`, `keyboard_arrow_right`, `last_page`; 42×42px; `--radius-sm` (not `--radius-full`); disabled when at first/last page
- **Layout**: outer `gap: var(--spacing-lg)` (16px) between counter and pagination groups; inner groups `gap: var(--spacing-xs)` (4px)
- **ADA**: All nav buttons have `aria-label`; range label is `aria-live="polite"`
- **No Angular Material base** — custom component

---

### Table Status Bar (`ds-table-status-bar`)
- **Purpose**: Pinned aggregate row displayed between the data rows and the paginator.
- **Height**: 56px — fixed
- **Background**: `--color-surface-subtle`; **border-top**: 1px `--color-border-subtle`
- **Layout**: left `__counts` region (row counts) and right `__aggregates` region (numeric aggregates); `justify-content: space-between`; padding `0 var(--spacing-lg)`
- **Stat pair**: `__stat` contains `__stat-label` (label-medium regular, `--color-text-primary`) + `__stat-value` (label-medium weight-prominent, `--color-text-primary`)
- **Gap between pairs**: `--spacing-xl` (24px) within each region
- **Counts**: "Rows: X" and "Total Rows: X" — shown on left
- **Aggregates**: "Average: X", "Count: X", "Min: X", "Max: X", "Sum: X" — shown on right; region has `aria-live="polite"` so screen readers announce changes
- **AG Grid integration**: implements minimal status panel API — subscribe to `modelUpdated` and `filterChanged` events to keep row counts in sync; aggregate values driven by range selection (bound externally)
- **No Angular Material base** — custom component

---

### Table Row Groups Bar (`ds-table-row-groups-bar`)
- **Purpose**: Bar between toolbar and column header row; provides a drop target for row groups and shows active groups as removable chips.
- **Height**: 56px — fixed
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Layout**: single `__drop-zone` fills full width
- **Drop zone**: `drag_indicator` icon (sm, `--color-icon-subtle`) + `__placeholder` text ("Drag here to set row groups", label-medium weight-prominent, `--color-text-primary`) + `__chips` (row group chip tags); placeholder hidden when chips are present
- **Chips**: use `ds-tag ds-tag--sm` with close button; emit `(removeGroup)` on close; automatically synced from AG Grid when `[api]` is bound
- **AG Grid integration**: bind `[api]` after grid ready to auto-sync row group columns
- **Visibility**: auto-hides via `[hidden]` host binding when `rowGroups.length === 0`; consumer controls when to render the element
- **Drop zone is visual only**: the "Drag here to set row groups" placeholder and `drag_indicator` icon are decorative — the bar does not implement drag event handlers. Actual grouping is driven programmatically via `ds-column-panel` (Add Column picker calls `api.addRowGroupColumn()`). AG Grid's native column-header drag-to-group targets the built-in row group panel (`rowGroupPanelShow`), not our custom bar.
- **No density toggle** — density belongs in `ds-column-panel` only
- **No Angular Material base** — custom component

---

### Table Group Row Cell (`ds-table-group-row-cell`)
- **Purpose**: AG Grid custom renderer for full-width group rows. Set as `groupRowRenderer` in gridOptions when using `groupDisplayType: 'groupRows'`. **Requires AG Grid Enterprise license** — `groupRows` is an Enterprise-only feature.
- **`enableRowGroup: true`** must be set on any colDef that consumers can add to a row group (via `ds-column-panel` or `ds-table-row-groups-bar`). Without it, those columns will not group correctly when added programmatically. This is separate from `rowGroup: true` which activates grouping on grid init — see Row Grouping section.
- **Height**: fills AG Grid row height (controlled by `rowHeight` / `groupRowHeight` grid options); `min-height: 40px` ensures compact mode renders correctly
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Layout (left to right)**: indent spacer + toggle button + label ("FieldName: Value") + count "(N)" + flex spacer + aggregates region
- **Indent spacer**: `24px × level` — 4 levels supported (0 = no indent, 1 = 24px, 2 = 48px, 3 = 72px); width set via inline style from `params.node.level`
- **Toggle button**: 32×32px, `border-radius: var(--radius-sm)`, transparent background, hover/active overlay via `::after`; focus ring keyboard-only via `:focus-visible`; `aria-expanded` reflects expansion state; `aria-label` = "[Expand/Collapse] FieldName: Value"
- **Chevron**: `chevron_right` icon (20px), `--color-icon-default`; rotates 90° with 150ms ease when expanded; expanded state sets `--color-icon-brand`
- **Field label** (`__field`): label-medium regular, `--color-text-secondary`; e.g. "Department: "
- **Group value** (`__value`): label-medium weight-prominent, `--color-text-primary`; truncated with ellipsis
- **Count** (`__count`): label-medium regular, `--color-text-secondary`; e.g. "(4)"
- **Aggregates region** (`__aggregates`): right-aligned; `gap: var(--spacing-xl)` between stat pairs; each `__stat` has `__stat-label` (label-medium regular, `--color-text-secondary`) + `__stat-value` (label-medium weight-prominent, `--color-text-primary`); populated from `params.node.aggData` when `aggFunc` is set on column definitions; `aria-hidden="true"` (announced via status bar)
- **Column header lookup**: uses `params.api.getColumn(field)?.getColDef()?.headerName` for display label; falls back to capitalised field name
- **`groupRowRendererParams`**: AG Grid merges these onto `params` before calling `agInit`. Supported: `suppressCount` (hide the "(N)" count badge), `suppressDoubleClickExpand`, `suppressEnterExpand`. Set in `gridOptions.groupRowRendererParams`.
- **AG Grid integration**: duck-types `ICellRendererAngularComp` (no hard ag-grid import) — `agInit(params)`, `refresh(params)`, listens to `expandedChanged` node event; cleans up in `ngOnDestroy`; host element `display: block; width: 100%; height: 100%` to fill full-width AG Grid cell
- **No Angular Material base** — custom component

### Table Group Expansion Store (`DsTableGroupExpansionStore`)
- **Purpose**: Plain TypeScript class (no Angular DI) for persisting row group expand/collapse state to `localStorage` across page navigations.
- **Constructor**: `new DsTableGroupExpansionStore(storageKey: string)` — `storageKey` must be unique per grid instance
- **`isGroupOpenByDefault(params)`**: pass as `isGroupOpenByDefault` in AG Grid gridOptions; returns `true` for previously-opened groups; default is collapsed
- **`onRowGroupOpened(event)`**: pass as `onRowGroupOpened` in AG Grid gridOptions; stores open state, removes closed state
- **`clear()`**: removes all stored expansion state for this grid
- **Key format**: full ancestor path joined with `→` (e.g. `country:USA→department:Engineering`) — survives column reordering, is stable across navigations
- **Storage errors** (quota exceeded): silently ignored — state loss on quota overflow is acceptable

---

### Column Panel (`ds-column-panel`)
- **Purpose**: AG Grid custom tool panel for column configuration. Slides in from the right when the gear toolbar button is active.
- **Width**: 300px — fixed; **background**: `--color-surface-subtle`; **border-left**: 1px `--color-border-secondary`
- **Display**: `display: none` by default; shown via `[data-panel-open]` on the enclosing container OR via `display: flex` on the Angular component host
- **Sections (top to bottom)**:
  1. **Density toggle** — `ds-density-toggle` fills full panel width; Comfort/Compact; `is-selected` + `aria-pressed` on each button
  2. **Column Visibility** — collapsible section header (`<button aria-expanded>` + `visibility` icon + "Column Visibility"); col-list shown/hidden by adjacent-sibling CSS rule
  3. Divider + **Pivot Mode** — single row with label + `ds-toggle` switch on the right _(hidden by `suppressPivotMode`)_
  4. Divider + **Row Groups** — section header (`drag_indicator` icon + "Row Groups"); active group chips (`__group-chips`, `ds-tag ds-tag--sm`); `__add-btn` with `aria-expanded`; inline `ds-column-panel__picker` menu _(hidden by `suppressRowGroups`)_
  5. Divider + **Values** — section header (`functions` icon + "Values"); active value chips; `__add-btn` with `aria-expanded`; inline picker menu _(hidden by `suppressValues`)_
- **Column row** (`__col-row`, 42px): `__col-checkbox` (42×42 touch target, icon-based checkbox) + `__col-drag` (drag_indicator sm, `--color-icon-subtle`) + `__col-name` (body-medium, fills remaining space); `--system` modifier suppresses interaction (opacity 0.4, no pointer events)
- **Checkbox icon**: `check_box_outline_blank` (unchecked, `--color-border-input`) / `check_box` filled (checked, `--color-surface-brand-bold`); `role="checkbox"` + `aria-checked`
- **Active group chips** (`__group-chips`): flex-wrap container of `ds-tag ds-tag--sm` chips with remove buttons; hidden when empty; remove button calls `removeRowGroupColumn(colId)` / `removeValueColumn(colId)`
- **Add button** (`__add-btn`): 42px height, full width, `add_circle_outline` icon + "Add Column" text, `--color-text-brand` / `--color-icon-brand`; `aria-expanded` reflects picker state
- **Inline picker menu** (`ds-column-panel__picker`): `ds-menu` class + `__picker` modifier; renders in normal document flow (no absolute positioning — panel has `overflow-y: auto`); lists columns filtered by `enableRowGroup`/`enableValue` and not already active; outside-click closes via `@HostListener('document:click')` with `event.stopPropagation()` on button and menu clicks; empty state shows "All columns grouped" / "All columns added"
- **Drag to reorder**: HTML5 drag API — `dragstart` stores index, `dragover` + `drop` calls `api.moveColumn()`
- **Pivot Mode toggle**: native `<input type="checkbox">` inside `ds-toggle`; calls `api.setPivotMode()`
- **AG Grid integration**: implements IToolPanelAngularComp — `agInit(params)` + `refresh()` + `getState()`; subscribes to `columnVisible`, `columnMoved`, `pivotModeChanged`, `columnRowGroupChanged`, `columnValueChanged` events
- **Grid state save/restore**: `getState()` returns `{ density, colVisibilityExpanded }`; `agInit` restores from `params.initialState`; density and col-visibility collapse changes call `params.onStateUpdated()` so AG Grid knows state has changed. Wire via standard `IToolPanelParams` — AG Grid passes these automatically.
- **`suppressColumnsToolPanel: true` on colDef**: hides that column from the Column Visibility list entirely (column still exists in the grid). Use for internal system columns (e.g. checkbox col, actions col) that consumers should never toggle. Columns with `lockVisible: true` still appear but are rendered with `--system` modifier (non-interactive).
- **toolPanelParams** (set via `sideBar.toolPanels[n].toolPanelParams` in gridOptions):
  - `suppressPivotMode: true` — hides Pivot Mode row and its divider
  - `suppressRowGroups: true` — hides Row Groups section and its divider
  - `suppressValues: true` — hides Values section and its divider
- **sideBar registration**:
  ```typescript
  sideBar: {
    toolPanels: [{
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: DsColumnPanelComponent,
      toolPanelParams: {
        suppressPivotMode: true,   // optional
        suppressRowGroups: false,  // optional
        suppressValues: false,     // optional
      },
    }],
  }
  ```
- **No Angular Material base** — custom component

---

### Table Toolbar (`ds-table-toolbar`)

#### Rules — follow these every time a table is created

1. **The toolbar is always present.** Every table has a `ds-table-toolbar`. There is no table without one.
2. **Search is always present.** The search bar (`ds-search`) is always included in the right panel. It is never optional.
3. **Search spans full width when there are no actions.** If the table has no primary actions, omit `__left` entirely — the right panel fills the full toolbar width and search expands to fill it.
4. **Primary actions go on the left, search + controls go on the right.** Never mix action buttons into the right panel or icon buttons into the left panel.
5. **Right panel slot order is fixed:** search → `[toolbar-extra]` (optional chips/dropdowns) → filter toggle → settings toggle → download (or `[toolbar-trailing]`). Do not reorder.

#### What counts as a primary action (left panel)

Use filled or outlined `ds-button` — never icon-only buttons — for:
- **Add / Create** — e.g. "Add Contact", "New Ticket" → `variant="filled"`
- **Bulk actions** — e.g. "Bulk Edit", "Assign" — only visible when rows are selected → `variant="outlined"`
- **Destructive** — e.g. "Delete" — only visible when rows are selected → `variant="outlined"` (destructive pairing rules apply)
- **More options** — overflow menu for secondary actions → `variant="outlined"` with `more_vert` icon

If a table is read-only (no adds, no edits, no deletes), omit `__left` entirely — do not render an empty left panel.

#### Structure reference

```html
<!-- With actions -->
<div class="ds-table-toolbar">
  <div class="ds-table-toolbar__left">
    <button class="ds-button ds-button--filled" type="button">Add Contact</button>
    <button class="ds-button ds-button--outlined" type="button">Bulk Edit</button>
  </div>
  <div class="ds-table-toolbar__right">
    <div class="ds-search ...">...</div>          <!-- always present, flex-fills -->
    <!-- [toolbar-extra] chips/dropdowns here if needed -->
    <button class="ds-table-toolbar__btn ds-table-toolbar__btn--toggle"
            type="button" aria-pressed="false" aria-label="Toggle filters">
      <span class="ds-icon">filter_alt</span>
    </button>
    <button class="ds-table-toolbar__btn ds-table-toolbar__btn--toggle"
            type="button" aria-pressed="false" aria-label="Column settings">
      <span class="ds-icon">settings</span>
    </button>
    <button class="ds-table-toolbar__btn" type="button" aria-label="Download">
      <span class="ds-icon">download</span>
    </button>
  </div>
</div>

<!-- Search-only (no actions) — __left omitted, right fills full width -->
<div class="ds-table-toolbar">
  <div class="ds-table-toolbar__right">
    <div class="ds-search ...">...</div>
    <button class="ds-table-toolbar__btn ds-table-toolbar__btn--toggle" ...>...</button>
    <button class="ds-table-toolbar__btn ds-table-toolbar__btn--toggle" ...>...</button>
    <button class="ds-table-toolbar__btn" ...>...</button>
  </div>
</div>
```

#### Component details
- **Height**: 74px — fixed
- **Layout**: two `flex: 1 0 0` panels side-by-side; `gap: var(--spacing-xl)` (24px) between panels; padding `0 var(--spacing-lg)` (16px)
- **Left panel** (`__left`): `flex: 1 0 0`, `gap: var(--spacing-sm)`. Omit entirely (or `[showActions]="false"` in Angular) when no primary actions exist.
- **Right panel** (`__right`): `flex: 1 0 0`, `gap: var(--spacing-sm)`. Search inside always has `flex: 1 0 0` — fills all remaining space.
- **Icon buttons**: Angular component uses `ds-icon-button-toggle` (variant="outlined") for filter and settings; `ds-icon-button` (variant="outlined") for download. `__btn` CSS class is for the HTML class API and `[toolbar-trailing]` slot only.
- **Angular content projection slots**:
  - `[toolbar-actions]` — left-side action buttons
  - `[toolbar-extra]` — right-side extras between search and fixed icon buttons (filter/date chips, dropdowns)
  - `[toolbar-trailing]` — right-side trailing buttons after settings (replaces or supplements download)
- **Angular inputs**: `showActions` (bool, default true), `searchPlaceholder`, `searchAriaLabel`, `searchValue`, `filterActive`, `settingsActive`, `showDownload` (bool, default true)
- **Angular outputs**: `searchValueChange`, `search`, `filterActiveChange`, `settingsActiveChange`, `downloadClick`
- **ADA**: Filter/settings buttons expose `aria-pressed`; all icon buttons require `aria-label`
- **No Angular Material base** — custom component
