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
 *   - Row Groups section with "Add Column" affordance
 *   - Values (aggregation) section with "Add Column" affordance
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
 */

import {
  Component, Input, Output, EventEmitter, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
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
   * When true the row is non-interactive (e.g. checkbox col, actions col).
   * Displayed at reduced opacity with no pointer events.
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
  getValueColumns(): AgPanelColumn[];
  addValueColumn(key: string): void;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}

export interface AgPanelColumn {
  getColId(): string;
  getColDef(): { headerName?: string; lockVisible?: boolean; suppressMovable?: boolean };
  isVisible(): boolean;
}

export interface AgToolPanelParams {
  api: AgColumnPanelApi;
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

  // ── Outputs ───────────────────────────────────────────────────────────────

  @Output() densityChange = new EventEmitter<TableDensity>();
  @Output() columnVisibilityChange = new EventEmitter<ColumnVisibilityChange>();
  @Output() pivotModeChange = new EventEmitter<boolean>();
  @Output() addRowGroupColumn = new EventEmitter<void>();
  @Output() addValueColumn = new EventEmitter<void>();

  private _api: AgColumnPanelApi | null = null;
  private readonly _colChanged  = (): void => this._syncColumns();
  private readonly _pivotChanged = (): void => this._syncPivot();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid IToolPanelAngularComp ─────────────────────────────────────────

  agInit(params: AgToolPanelParams): void {
    this._api = params.api;
    params.api.addEventListener('columnVisible', this._colChanged);
    params.api.addEventListener('columnMoved', this._colChanged);
    params.api.addEventListener('pivotModeChanged', this._pivotChanged);
    this._syncColumns();
    this._syncPivot();
  }

  /** Called by AG Grid when the tool panel is refreshed. */
  refresh(): void {
    this._syncColumns();
    this._syncPivot();
  }

  ngOnDestroy(): void {
    this._api?.removeEventListener('columnVisible', this._colChanged);
    this._api?.removeEventListener('columnMoved', this._colChanged);
    this._api?.removeEventListener('pivotModeChanged', this._pivotChanged);
  }

  // ── Sync helpers ──────────────────────────────────────────────────────────

  private _syncColumns(): void {
    if (!this._api) { return; }
    this.columns = this._api.getAllGridColumns().map(col => ({
      colId: col.getColId(),
      label: col.getColDef().headerName ?? col.getColId(),
      visible: col.isVisible(),
      system: col.getColDef().lockVisible === true,
    }));
    this.cdr.markForCheck();
  }

  private _syncPivot(): void {
    if (!this._api) { return; }
    this.pivotMode = this._api.isPivotMode();
    this.cdr.markForCheck();
  }

  // ── User actions ──────────────────────────────────────────────────────────

  toggleColVisibility(): void {
    this.colVisibilityExpanded = !this.colVisibilityExpanded;
  }

  onDensityChange(value: TableDensity): void {
    this.density = value;
    this.densityChange.emit(value);
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

  onAddRowGroupColumn(): void {
    this.addRowGroupColumn.emit();
  }

  onAddValueColumn(): void {
    this.addValueColumn.emit();
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
