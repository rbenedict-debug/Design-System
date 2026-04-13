/**
 * Onflo Design System — Table Column Definition Utilities
 *
 * Pre-built defaultColDef and columnTypes for AG Grid + Onflo Design System.
 *
 * Quick start in your component:
 *
 *   import {
 *     DS_TABLE_DEFAULT_COL_DEF,
 *     DS_TABLE_COLUMN_TYPES,
 *   } from '@onflo/design-system';
 *
 *   gridOptions: GridOptions = {
 *     defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
 *     columnTypes: DS_TABLE_COLUMN_TYPES,
 *     columnDefs: [
 *       { field: 'name',   headerName: 'Name',   flex: 1, minWidth: 120 },
 *       { field: 'amount', headerName: 'Amount',  type: 'dsNumeric', aggFunc: 'sum' },
 *       { field: 'dept',   headerName: 'Dept',    type: 'dsGroupable' },
 *       { field: 'sel',    headerName: '',        type: 'dsCheckbox' },
 *     ],
 *   };
 */

import { DsTableHeaderCellComponent } from './table-header-cell.component';
import { DsTableHeaderGroupCellComponent } from './table-header-group-cell.component';
import { DsTableRowCellComponent } from './table-row-cell.component';

/**
 * Default column group definition — applies DsTableHeaderGroupCellComponent to
 * every column group automatically. Set as defaultColGroupDef in gridOptions.
 *
 * Usage:
 *   gridOptions = {
 *     defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
 *     defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF,
 *   }
 */
export const DS_TABLE_DEFAULT_COL_GROUP_DEF = {
  headerGroupComponent: DsTableHeaderGroupCellComponent,
};

/**
 * Default column definition — applies Onflo header and cell renderers to every
 * column automatically. Override any property on individual colDefs as needed.
 *
 * Sets:
 *   - headerComponent → DsTableHeaderCellComponent
 *   - cellRenderer → DsTableRowCellComponent
 *   - sortable: true
 *   - resizable: true
 *   - minWidth: 80
 *
 * Does NOT set filter — add that yourself in defaultColDef or per-column via columnTypes.
 *
 * Usage:
 *   gridOptions = { defaultColDef: DS_TABLE_DEFAULT_COL_DEF }
 */
export const DS_TABLE_DEFAULT_COL_DEF = {
  headerComponent: DsTableHeaderCellComponent,
  cellRenderer: DsTableRowCellComponent,
  sortable: true,
  resizable: true,
  minWidth: 80,
};

/**
 * Column type definitions for common Onflo table patterns.
 * Register via columnTypes in gridOptions; apply per-column via type: 'dsNumeric' etc.
 * Multiple types can be combined: type: ['dsGroupable', 'dsNumeric'].
 *
 * Usage:
 *   gridOptions = { columnTypes: DS_TABLE_COLUMN_TYPES }
 *
 * Types:
 *   dsRightAligned — right-aligns both header label and cell text (no filter override)
 *   dsNumeric      — right-aligned + agNumberColumnFilter; use with aggFunc for aggregation
 *   dsGroupable    — sets enableRowGroup: true so the column appears in the row groups picker
 *   dsAggregatable — sets enableValue: true so the column appears in the values picker
 *   dsDate         — agDateColumnFilter with ISO-string comparator
 *   dsCheckbox     — fixed 56px checkbox-only column (no label, no resize, no sort/filter)
 *                    Pair with rowSelection + onRowSelected in gridOptions for actual selection.
 *   dsPinned       — pinned to the right, not movable or resizable; for action columns
 */
export const DS_TABLE_COLUMN_TYPES: Record<string, object> = {

  /** Right-align header and cell text — use for codes, IDs, or any right-read string. */
  dsRightAligned: {
    headerComponentParams: { align: 'right' },
    cellRendererParams: { align: 'right' },
  },

  /**
   * Numeric column — right-aligned with number filter.
   * Add aggFunc: 'sum' | 'avg' | 'min' | 'max' per-column to enable aggregation in the
   * group row cell and status bar. Also set enableValue: true (or type: 'dsAggregatable')
   * if you want the column to appear in the values picker inside ds-column-panel.
   */
  dsNumeric: {
    headerComponentParams: { align: 'right' },
    cellRendererParams: { align: 'right' },
    filter: 'agNumberColumnFilter',
  },

  /**
   * Groupable column — sets enableRowGroup: true so the column appears in the
   * ds-column-panel row groups picker and ds-table-row-groups-bar drop zone,
   * allowing users to drag it into an active group at runtime.
   *
   * NOTE — enableRowGroup vs rowGroup:
   *   enableRowGroup: true  → column CAN be grouped (appears in picker/drop zone).
   *                           Set this via dsGroupable type.
   *   rowGroup: true        → column IS grouped on grid init (default active group).
   *                           Set this directly on the colDef, not via a type.
   *
   * Requires AG Grid Enterprise. Also set in gridOptions:
   *   groupDisplayType: 'groupRows'
   *   groupRowRenderer: DsTableGroupRowCellComponent
   */
  dsGroupable: {
    enableRowGroup: true,
  },

  /**
   * Aggregatable column — makes the column appear in the values picker inside
   * ds-column-panel. Set aggFunc per-column ('sum' | 'avg' | 'min' | 'max' | 'count').
   */
  dsAggregatable: {
    enableValue: true,
  },

  /**
   * Date column with ISO date string comparator.
   * Expects cell values to be ISO 8601 date strings (e.g. '2024-03-15').
   * Use valueFormatter on the column to display in your preferred locale format.
   */
  dsDate: {
    filter: 'agDateColumnFilter',
    filterParams: {
      comparator: (filterDate: Date, cellValue: string | null) => {
        if (!cellValue) { return -1; }
        const cellDate = new Date(cellValue);
        if (isNaN(cellDate.getTime())) { return -1; }
        if (cellDate < filterDate) { return -1; }
        if (cellDate > filterDate) { return 1; }
        return 0;
      },
    },
  },

  /**
   * Checkbox-only column — 56px fixed width, no label, no resize, no sort, no filter.
   * The Onflo cell renderer syncs the checkbox with AG Grid's row selection state via
   * node.isSelected() — but you must still configure rowSelection in gridOptions and
   * handle selection events yourself.
   *
   * Typical usage alongside:
   *   gridOptions = {
   *     rowSelection: 'multiple',
   *     suppressRowClickSelection: true,
   *   }
   */
  dsCheckbox: {
    width: 56,
    minWidth: 56,
    maxWidth: 56,
    resizable: false,
    suppressMovable: true,
    sortable: false,
    filter: false,
    headerComponentParams: { checkbox: true },
    cellRendererParams: { checkbox: true, cellData: false },
  },

  /**
   * Pinned right column — fixed position at the trailing edge, not movable or resizable,
   * and locked so users cannot change the pin state via drag or the column menu.
   * Use for action buttons or icon-only columns that should always be visible.
   * Set an explicit width per-column (e.g. width: 56 for a single icon button).
   *
   * lockPinned: true prevents UI-based pin changes (drag-to-pin, column menu).
   * The column can still be pinned/unpinned programmatically via the grid API.
   */
  dsPinned: {
    pinned: 'right',
    lockPinned: true,
    resizable: false,
    suppressMovable: true,
    sortable: false,
    filter: false,
  },
};
