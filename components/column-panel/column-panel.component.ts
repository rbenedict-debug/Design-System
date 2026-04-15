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
 *   - Row Groups section — shows active groups as removable chips; "Add Column"
 *     opens an inline picker menu listing all groupable columns
 *   - Values (aggregation) section — "Add Column" opens same picker pattern
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
 *   Add Column buttons use aria-expanded to reflect menu state.
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

/** A column entry in the row-group or value picker menu. */
export interface ColumnPickerOption {
  colId: string;
  label: string;
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

  /** Active row group columns shown as chips in the Row Groups section. */
  activeRowGroups: ColumnPickerOption[] = [];

  /** Active value (aggregation) columns shown as chips in the Values section. */
  activeValueColumns: ColumnPickerOption[] = [];

  /** Whether the row-group column picker menu is open. */
  showRowGroupMenu = false;

  /** Whether the value column picker menu is open. */
  showValueMenu = false;

  /** Whether the Pivot Mode row is hidden (set via suppressPivotMode toolPanelParam). */
  suppressPivotMode = false;

  /** Whether the Row Groups section is hidden (set via suppressRowGroups toolPanelParam). */
  suppressRowGroups = false;

  /** Whether the Values section is hidden (set via suppressValues toolPanelParam). */
  suppressValues = false;

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
    this._api?.removeEventListener('columnRowGroupChanged', this._groupChanged);
    this._api?.removeEventListener('columnValueChanged',   this._groupChanged);
  }

  // ── Outside-click: close open menus ──────────────────────────────────────

  @HostListener('document:click')
  onDocumentClick(): void {
    if (this.showRowGroupMenu || this.showValueMenu) {
      this.showRowGroupMenu = false;
      this.showValueMenu    = false;
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

  // ── Column picker options (excludes already-active columns + system cols) ─

  get rowGroupMenuOptions(): ColumnPickerOption[] {
    const activeIds = new Set(this.activeRowGroups.map(g => g.colId));
    if (!this._api) { return []; }
    return this._api.getAllGridColumns()
      .filter(col => {
        const def = col.getColDef();
        return def.enableRowGroup === true
          && def.lockVisible !== true
          && !activeIds.has(col.getColId());
      })
      .map(col => ({
        colId: col.getColId(),
        label: col.getColDef().headerName ?? col.getColId(),
      }));
  }

  get valueMenuOptions(): ColumnPickerOption[] {
    const activeIds = new Set(this.activeValueColumns.map(v => v.colId));
    if (!this._api) { return []; }
    return this._api.getAllGridColumns()
      .filter(col => {
        const def = col.getColDef();
        return def.enableValue === true
          && def.lockVisible !== true
          && !activeIds.has(col.getColId());
      })
      .map(col => ({
        colId: col.getColId(),
        label: col.getColDef().headerName ?? col.getColId(),
      }));
  }

  // ── User actions ──────────────────────────────────────────────────────────

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

  // ── Row Groups picker ─────────────────────────────────────────────────────

  toggleRowGroupMenu(event: Event): void {
    event.stopPropagation();
    this.showRowGroupMenu = !this.showRowGroupMenu;
    this.showValueMenu    = false;
  }

  selectRowGroupColumn(col: ColumnPickerOption, event: Event): void {
    event.stopPropagation();
    this._api?.addRowGroupColumn(col.colId);
    this.showRowGroupMenu = false;
    this._syncGroups();
  }

  removeRowGroupColumn(colId: string): void {
    this._api?.removeRowGroupColumn(colId);
    this._syncGroups();
  }

  // ── Values picker ─────────────────────────────────────────────────────────

  toggleValueMenu(event: Event): void {
    event.stopPropagation();
    this.showValueMenu    = !this.showValueMenu;
    this.showRowGroupMenu = false;
  }

  selectValueColumn(col: ColumnPickerOption, event: Event): void {
    event.stopPropagation();
    this._api?.addValueColumn(col.colId);
    this.showValueMenu = false;
    this._syncGroups();
  }

  removeValueColumn(colId: string): void {
    this._api?.removeValueColumn(colId);
    this._syncGroups();
  }

  // ── Drag-to-reorder ───────────────────────────────────────────────────────

  onDragStart(event: DragEvent, index: number): void {
    event.dataTransfer?.setData('text/plain', String(index));
  }

  onDrop(event: DragEvent, toIndex: number): void {
    event.preventDefault();
    const fromIndex = +(event.dataTransfer?.getData('text/plain') ?? '-1');
    if (fromIndex < 0 || fromIndex === toIndex) { return; }

    const moved = this.columns.splice(fromIndex, 1)[0];
    this.columns.splice(toIndex, 0, moved);

    if (this._api) {
      this._api.moveColumn(moved.colId, toIndex);
    }
    this.cdr.markForCheck();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  // ── Icon helpers ──────────────────────────────────────────────────────────

  checkboxIcon(col: ColumnPanelItem): string {
    return col.visible ? 'check_box' : 'check_box_outline_blank';
  }

  checkboxClass(col: ColumnPanelItem): string {
    return col.visible ? 'ds-column-panel__col-checkbox--checked' : '';
  }
}
