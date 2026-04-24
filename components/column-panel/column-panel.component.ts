/**
 * Onflo Design System — Column Panel
 *
 * AG Grid custom tool panel for column configuration.
 * Implements IToolPanelAngularComp — register via toolPanelDef in gridOptions.
 *
 * Features:
 *   - Comfort/Compact density toggle
 *   - Column visibility toggle (checkbox per column, drag to reorder)
 *   - Pivot Mode toggle
 *   - Row Groups section — active items as draggable/removable cards; "Add Column"
 *     opens a fixed-position overlay with search across all enableRowGroup columns
 *   - Values (aggregation) section — same Add Column pattern
 *   - Column Labels section (pivot mode) — same Add Column pattern
 *
 *   All three pickers show every eligible column (including already-active ones,
 *   shown with a filled checkbox). Clicking an active column removes it; clicking
 *   an inactive column adds it. Drag-to-reorder on active cards syncs back to the
 *   AG Grid API (remove-all / re-add-in-order).
 *
 * AG Grid usage:
 *   gridOptions = {
 *     sideBar: {
 *       toolPanels: [{
 *         id: 'columns',
 *         labelDefault: 'Columns',
 *         labelKey: 'columns',
 *         iconKey: 'columns',
 *         toolPanel: DsColumnPanelComponent,
 *       }]
 *     }
 *   }
 *
 * Standalone usage (for a custom toggle side panel):
 *   <ds-column-panel
 *     [columns]="myColumns"
 *     [(density)]="density"
 *     (densityChange)="onDensityChange($event)"
 *     (columnVisibilityChange)="onColVisibility($event)"
 *   />
 *
 * ADA:
 *   Column checkboxes use role="checkbox" + aria-checked.
 *   Density buttons use aria-pressed.
 *   Pivot toggle is a native <input type="checkbox">.
 *   Add Column buttons use aria-expanded to reflect picker state.
 *   Picker overlay: role="dialog" with aria-label; Escape closes it.
 */

import {
  Component, Input, Output, EventEmitter, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef, HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TableDensity = 'comfort' | 'compact';

export interface ColumnPanelItem {
  /** AG Grid column ID. */
  colId: string;
  /** Display name shown in the panel row. */
  label: string;
  /** Whether the column is currently visible. */
  visible: boolean;
  /**
   * When true the row is non-interactive (standalone usage only — shown at reduced
   * opacity with no pointer events). Not used when driven by the AG Grid API, where
   * lockVisible columns are hidden from the list entirely.
   */
  system?: boolean;
}

export interface ColumnVisibilityChange {
  colId: string;
  visible: boolean;
}

/** Minimal AG Grid API surface needed by the column panel. */
export interface AgColumnPanelApi {
  getAllGridColumns(): AgPanelColumn[];
  setColumnVisible(key: string, visible: boolean): void;
  moveColumn(key: string, toIndex: number): void;
  isPivotMode(): boolean;
  setPivotMode(mode: boolean): void;
  getRowGroupColumns(): AgPanelColumn[];
  addRowGroupColumn(key: string): void;
  removeRowGroupColumn(key: string): void;
  getValueColumns(): AgPanelColumn[];
  addValueColumn(key: string): void;
  removeValueColumn(key: string): void;
  getPivotColumns(): AgPanelColumn[];
  addPivotColumn(key: string): void;
  removePivotColumn(key: string): void;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}

export interface AgPanelColumn {
  getColId(): string;
  getColDef(): {
    headerName?: string;
    /**
     * Set true on colDef to hide this column from the Column Visibility list entirely.
     * The column still exists in the grid — it is just not shown in ds-column-panel.
     * Use on system columns that should never be toggled (checkbox cols, pinned action cols).
     */
    lockVisible?: boolean;
    suppressMovable?: boolean;
    /** Set true on colDef to allow this column to appear in the row groups picker. */
    enableRowGroup?: boolean;
    /** Set true on colDef to allow this column to appear in the values (aggregation) picker. */
    enableValue?: boolean;
    /** Set true on colDef to allow this column to appear in the pivot column labels picker. */
    enablePivot?: boolean;
    /**
     * Set true to prevent UI-based pinning changes (drag-to-pin and column menu pin options).
     * The column can still be pinned/unpinned via API. Use on system columns that should
     * always remain pinned or always remain unpinned.
     */
    lockPinned?: boolean;
    /**
     * Set true on colDef to hide this column from the tool panel column list entirely.
     * The column still exists in the grid — it is just not shown in ds-column-panel.
     * Use for internal system columns that consumers should never toggle or reorder.
     */
    suppressColumnsToolPanel?: boolean;
  };
  isVisible(): boolean;
}

/**
 * State persisted by the tool panel — returned from getState() and restored via
 * initialState in agInit. Integrates with AG Grid's grid state save/restore system.
 */
export interface DsColumnPanelState {
  /** Which density is currently active. */
  density?: TableDensity;
  /** Whether the Column Visibility section is expanded. */
  colVisibilityExpanded?: boolean;
}

export interface AgToolPanelParams {
  api: AgColumnPanelApi;

  // ── Standard IToolPanelParams ─────────────────────────────────────────────
  /**
   * Call this whenever internal panel state changes so AG Grid's grid state
   * save/restore system knows the state has updated. Pass as `onStateUpdated`
   * from IToolPanelParams.
   */
  onStateUpdated?: () => void;
  /**
   * Previously saved panel state to restore on init. Populated by AG Grid when
   * grid state is restored. Contains whatever getState() returned last time.
   */
  initialState?: DsColumnPanelState;

  // ── toolPanelParams — merged onto params by AG Grid ───────────────────────
  // Set via sideBar.toolPanels[n].toolPanelParams in gridOptions.

  /** Hide the Pivot Mode toggle row. Default: false (shown). */
  suppressPivotMode?: boolean;
  /** Hide the Row Groups section (header, chips, Add Column picker). Default: false (shown). */
  suppressRowGroups?: boolean;
  /** Hide the Values (aggregation) section. Default: false (shown). */
  suppressValues?: boolean;
}

/** A column entry in the row-group, value, or pivot picker. */
export interface ColumnPickerOption {
  colId: string;
  label: string;
}

/** A picker option that also carries its active (already-added) state. */
export interface ColumnPickerOptionWithState extends ColumnPickerOption {
  active: boolean;
}

@Component({
  selector: 'ds-column-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './column-panel.component.html',
  styleUrls: ['./column-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsColumnPanelComponent implements OnDestroy {

  /** Column list — auto-populated when [api] is bound, otherwise set manually. */
  @Input() columns: ColumnPanelItem[] = [];

  /** Whether the Column Visibility section is expanded (controls the collapse toggle). */
  colVisibilityExpanded = true;

  /** Current row density. Use [(density)] for two-way binding. */
  @Input() density: TableDensity = 'comfort';

  /** Whether pivot mode is enabled. */
  @Input() pivotMode = false;

  /** Active row group columns shown as draggable cards in the Row Groups section. */
  activeRowGroups: ColumnPickerOption[] = [];

  /** Active value (aggregation) columns shown as draggable cards in the Values section. */
  activeValueColumns: ColumnPickerOption[] = [];

  /** Active pivot columns shown as draggable cards in the Column Labels section. */
  activePivotColumns: ColumnPickerOption[] = [];

  /** Whether the Pivot Mode row is hidden (set via suppressPivotMode toolPanelParam). */
  suppressPivotMode = false;

  /** Whether the Row Groups section is hidden (set via suppressRowGroups toolPanelParam). */
  suppressRowGroups = false;

  /** Whether the Values section is hidden (set via suppressValues toolPanelParam). */
  suppressValues = false;

  // ── Picker overlay state ──────────────────────────────────────────────────

  /** Which section's picker is currently open, or null if closed. */
  activePickerSection: 'rowGroup' | 'value' | 'pivot' | null = null;

  /** Current search text inside the open picker. */
  pickerSearchText = '';

  /** Position of the picker overlay (set when opening). */
  pickerPos: { top?: string; bottom?: string; left: string } = { left: '0' };

  // ── Drag state for active-item card reordering ────────────────────────────

  /** Which list is currently being dragged within. */
  private _activeDragSource: 'rowGroup' | 'value' | 'pivot' | null = null;

  // ── Outputs ───────────────────────────────────────────────────────────────

  @Output() densityChange = new EventEmitter<TableDensity>();
  @Output() columnVisibilityChange = new EventEmitter<ColumnVisibilityChange>();
  @Output() pivotModeChange = new EventEmitter<boolean>();

  private _api: AgColumnPanelApi | null = null;
  private _onStateUpdated?: () => void;
  private readonly _colChanged   = (): void => this._syncColumns();
  private readonly _pivotChanged = (): void => this._syncPivot();
  private readonly _groupChanged = (): void => this._syncGroups();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid IToolPanelAngularComp ─────────────────────────────────────────

  agInit(params: AgToolPanelParams): void {
    this._api = params.api;
    this._onStateUpdated = params.onStateUpdated;

    // Restore previously saved panel state (AG Grid grid state save/restore).
    if (params.initialState) {
      if (params.initialState.density !== undefined) {
        this.density = params.initialState.density;
      }
      if (params.initialState.colVisibilityExpanded !== undefined) {
        this.colVisibilityExpanded = params.initialState.colVisibilityExpanded;
      }
    }

    // toolPanelParams — hide sections as configured by the consumer.
    this.suppressPivotMode  = params.suppressPivotMode  ?? false;
    this.suppressRowGroups  = params.suppressRowGroups  ?? false;
    this.suppressValues     = params.suppressValues     ?? false;

    params.api.addEventListener('columnVisible',        this._colChanged);
    params.api.addEventListener('columnMoved',          this._colChanged);
    params.api.addEventListener('pivotModeChanged',     this._pivotChanged);
    params.api.addEventListener('columnPivotChanged',   this._pivotChanged);
    params.api.addEventListener('columnRowGroupChanged', this._groupChanged);
    params.api.addEventListener('columnValueChanged',   this._groupChanged);
    this._syncColumns();
    this._syncPivot();
    this._syncGroups();
  }

  /**
   * Returns current panel state for AG Grid's grid state save/restore system.
   * AG Grid calls this when saving grid state (e.g. before page navigation).
   */
  getState(): DsColumnPanelState {
    return {
      density: this.density,
      colVisibilityExpanded: this.colVisibilityExpanded,
    };
  }

  /** Called by AG Grid when the tool panel is refreshed. */
  refresh(): void {
    this._syncColumns();
    this._syncPivot();
    this._syncGroups();
  }

  ngOnDestroy(): void {
    this._api?.removeEventListener('columnVisible',        this._colChanged);
    this._api?.removeEventListener('columnMoved',          this._colChanged);
    this._api?.removeEventListener('pivotModeChanged',     this._pivotChanged);
    this._api?.removeEventListener('columnPivotChanged',   this._pivotChanged);
    this._api?.removeEventListener('columnRowGroupChanged', this._groupChanged);
    this._api?.removeEventListener('columnValueChanged',   this._groupChanged);
  }

  // ── Outside-click + Escape: close picker ─────────────────────────────────

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.activePickerSection !== null) {
      this.activePickerSection = null;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activePickerSection !== null) {
      this.activePickerSection = null;
      this.cdr.markForCheck();
    }
  }

  // ── Sync helpers ──────────────────────────────────────────────────────────

  private _syncColumns(): void {
    if (!this._api) { return; }
    this.columns = this._api.getAllGridColumns()
      .filter(col => {
        const def = col.getColDef();
        return def.suppressColumnsToolPanel !== true && def.lockVisible !== true;
      })
      .map(col => ({
        colId:   col.getColId(),
        label:   col.getColDef().headerName ?? col.getColId(),
        visible: col.isVisible(),
      }));
    this.cdr.markForCheck();
  }

  private _syncPivot(): void {
    if (!this._api) { return; }
    this.pivotMode = this._api.isPivotMode();
    this.activePivotColumns = this._api.getPivotColumns().map(col => ({
      colId: col.getColId(),
      label: col.getColDef().headerName ?? col.getColId(),
    }));
    this.cdr.markForCheck();
  }

  private _syncGroups(): void {
    if (!this._api) { return; }
    this.activeRowGroups = this._api.getRowGroupColumns().map(col => ({
      colId: col.getColId(),
      label: col.getColDef().headerName ?? col.getColId(),
    }));
    this.activeValueColumns = this._api.getValueColumns().map(col => ({
      colId: col.getColId(),
      label: col.getColDef().headerName ?? col.getColId(),
    }));
    this.cdr.markForCheck();
  }

  // ── Picker overlay ────────────────────────────────────────────────────────

  /**
   * Options for the currently-open picker. Includes ALL eligible columns for the
   * active section (regardless of column visibility state), with `active: true` for
   * columns already in the list. Filtered by pickerSearchText.
   */
  get currentPickerOptions(): ColumnPickerOptionWithState[] {
    if (!this._api || !this.activePickerSection) { return []; }

    const text = this.pickerSearchText.trim().toLowerCase();
    let list: ColumnPickerOptionWithState[];

    if (this.activePickerSection === 'rowGroup') {
      const activeIds = new Set(this.activeRowGroups.map(g => g.colId));
      list = this._api.getAllGridColumns()
        .filter(col => col.getColDef().enableRowGroup === true && col.getColDef().lockVisible !== true)
        .map(col => ({
          colId:  col.getColId(),
          label:  col.getColDef().headerName ?? col.getColId(),
          active: activeIds.has(col.getColId()),
        }));
    } else if (this.activePickerSection === 'value') {
      const activeIds = new Set(this.activeValueColumns.map(v => v.colId));
      list = this._api.getAllGridColumns()
        .filter(col => col.getColDef().enableValue === true && col.getColDef().lockVisible !== true)
        .map(col => ({
          colId:  col.getColId(),
          label:  col.getColDef().headerName ?? col.getColId(),
          active: activeIds.has(col.getColId()),
        }));
    } else {
      const activeIds = new Set(this.activePivotColumns.map(p => p.colId));
      list = this._api.getAllGridColumns()
        .filter(col => col.getColDef().enablePivot === true && col.getColDef().lockVisible !== true)
        .map(col => ({
          colId:  col.getColId(),
          label:  col.getColDef().headerName ?? col.getColId(),
          active: activeIds.has(col.getColId()),
        }));
    }

    if (text) {
      list = list.filter(o => o.label.toLowerCase().includes(text));
    }

    return list;
  }

  togglePicker(section: 'rowGroup' | 'value' | 'pivot', event: Event): void {
    event.stopPropagation();
    const btn = event.currentTarget as HTMLElement;

    if (this.activePickerSection === section) {
      this.activePickerSection = null;
      this.cdr.markForCheck();
      return;
    }

    this.activePickerSection = section;
    this.pickerSearchText = '';
    this._positionPicker(btn);
    this.cdr.markForCheck();
  }

  onPickerSearchInput(event: Event): void {
    this.pickerSearchText = (event.target as HTMLInputElement).value;
    this.cdr.markForCheck();
  }

  /**
   * Toggle a column in/out of the active section. Already-active columns are
   * removed; inactive columns are added. The picker stays open for multi-select.
   */
  selectPickerOption(opt: ColumnPickerOptionWithState, event: Event): void {
    event.stopPropagation();

    if (this.activePickerSection === 'rowGroup') {
      if (opt.active) {
        this._api?.removeRowGroupColumn(opt.colId);
      } else {
        this._api?.addRowGroupColumn(opt.colId);
      }
      this._syncGroups();
    } else if (this.activePickerSection === 'value') {
      if (opt.active) {
        this._api?.removeValueColumn(opt.colId);
      } else {
        this._api?.addValueColumn(opt.colId);
      }
      this._syncGroups();
    } else if (this.activePickerSection === 'pivot') {
      if (opt.active) {
        this._api?.removePivotColumn(opt.colId);
      } else {
        this._api?.addPivotColumn(opt.colId);
      }
      this._syncPivot();
    }
  }

  private _positionPicker(btn: HTMLElement): void {
    const rect = btn.getBoundingClientRect();
    const overlayHeight = 296; // search row (40px) + up to 6 options (40px each) + border
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < overlayHeight + 8) {
      // Not enough room below — open upward
      this.pickerPos = {
        bottom: `${window.innerHeight - rect.top + 4}px`,
        left:   `${rect.left}px`,
        top:    undefined,
      };
    } else {
      // Enough room below — open downward
      this.pickerPos = {
        top:    `${rect.bottom + 4}px`,
        left:   `${rect.left}px`,
        bottom: undefined,
      };
    }
  }

  // ── Remove active items ───────────────────────────────────────────────────

  removeRowGroupColumn(colId: string): void {
    this._api?.removeRowGroupColumn(colId);
    this._syncGroups();
  }

  removeValueColumn(colId: string): void {
    this._api?.removeValueColumn(colId);
    this._syncGroups();
  }

  removePivotColumn(colId: string): void {
    this._api?.removePivotColumn(colId);
    this._syncPivot();
  }

  // ── Drag-to-reorder: Column Visibility list ───────────────────────────────

  onDragStart(event: DragEvent, index: number): void {
    event.dataTransfer?.setData('text/plain', String(index));
  }

  onDrop(event: DragEvent, toIndex: number): void {
    event.preventDefault();
    const fromIndex = +(event.dataTransfer?.getData('text/plain') ?? '-1');
    if (fromIndex < 0 || fromIndex === toIndex) { return; }

    // Locally reorder for immediate UI feedback.
    const moved = this.columns.splice(fromIndex, 1)[0];
    this.columns.splice(toIndex, 0, moved);

    if (this._api) {
      // this.columns is a filtered subset of getAllGridColumns() — lockVisible and
      // suppressColumnsToolPanel columns are excluded. Panel indices ≠ grid indices,
      // so we can't pass toIndex directly to moveColumn(). Instead, anchor on a
      // neighbor column's grid index to find the correct insertion point.
      const allGridCols = this._api.getAllGridColumns();

      let targetGridIndex: number;
      if (toIndex > fromIndex) {
        // Moved forward in the list — insert after the column now just before it.
        const anchorColId = this.columns[toIndex - 1].colId;
        targetGridIndex = allGridCols.findIndex(c => c.getColId() === anchorColId);
      } else {
        // Moved backward in the list — insert before the column now just after it.
        const anchorColId = this.columns[toIndex + 1].colId;
        targetGridIndex = allGridCols.findIndex(c => c.getColId() === anchorColId);
      }

      if (targetGridIndex >= 0) {
        this._api.moveColumn(moved.colId, targetGridIndex);
      }
    }
    this.cdr.markForCheck();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // ── Drag-to-reorder: active card lists (row groups / values / pivot) ──────

  onActiveItemDragStart(event: DragEvent, index: number, source: 'rowGroup' | 'value' | 'pivot'): void {
    this._activeDragSource = source;
    event.dataTransfer?.setData('text/plain', String(index));
  }

  onActiveItemDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onActiveItemDrop(event: DragEvent, toIndex: number, source: 'rowGroup' | 'value' | 'pivot'): void {
    event.preventDefault();
    if (this._activeDragSource !== source) { return; }
    this._activeDragSource = null;

    const fromIndex = +(event.dataTransfer?.getData('text/plain') ?? '-1');
    if (fromIndex < 0 || fromIndex === toIndex) { return; }

    if (source === 'rowGroup') {
      this._reorder(this.activeRowGroups, fromIndex, toIndex);
      this._syncRowGroupsToGrid();
    } else if (source === 'value') {
      this._reorder(this.activeValueColumns, fromIndex, toIndex);
      this._syncValueColumnsToGrid();
    } else {
      this._reorder(this.activePivotColumns, fromIndex, toIndex);
      this._syncPivotColumnsToGrid();
    }

    this.cdr.markForCheck();
  }

  private _reorder(list: ColumnPickerOption[], from: number, to: number): void {
    const moved = list.splice(from, 1)[0];
    list.splice(to, 0, moved);
  }

  private _syncRowGroupsToGrid(): void {
    if (!this._api) { return; }
    const ids = this.activeRowGroups.map(g => g.colId);
    ids.forEach(id => this._api!.removeRowGroupColumn(id));
    ids.forEach(id => this._api!.addRowGroupColumn(id));
  }

  private _syncValueColumnsToGrid(): void {
    if (!this._api) { return; }
    const ids = this.activeValueColumns.map(v => v.colId);
    ids.forEach(id => this._api!.removeValueColumn(id));
    ids.forEach(id => this._api!.addValueColumn(id));
  }

  private _syncPivotColumnsToGrid(): void {
    if (!this._api) { return; }
    const ids = this.activePivotColumns.map(p => p.colId);
    ids.forEach(id => this._api!.removePivotColumn(id));
    ids.forEach(id => this._api!.addPivotColumn(id));
  }

  // ── Column Visibility section ─────────────────────────────────────────────

  toggleColVisibility(): void {
    this.colVisibilityExpanded = !this.colVisibilityExpanded;
    this._onStateUpdated?.();
  }

  onDensityChange(value: TableDensity): void {
    this.density = value;
    this.densityChange.emit(value);
    this._onStateUpdated?.();
  }

  toggleColumnVisibility(col: ColumnPanelItem): void {
    if (col.system) { return; }
    const newVisible = !col.visible;
    col.visible = newVisible;
    this._api?.setColumnVisible(col.colId, newVisible);
    this.columnVisibilityChange.emit({ colId: col.colId, visible: newVisible });
  }

  togglePivotMode(): void {
    this.pivotMode = !this.pivotMode;
    this._api?.setPivotMode(this.pivotMode);
    this.pivotModeChange.emit(this.pivotMode);
  }

  // ── Icon helpers ──────────────────────────────────────────────────────────

  checkboxIcon(col: ColumnPanelItem): string {
    return col.visible ? 'check_box' : 'check_box_outline_blank';
  }

  checkboxClass(col: ColumnPanelItem): string {
    return col.visible ? 'ds-column-panel__col-checkbox--checked' : '';
  }
}
