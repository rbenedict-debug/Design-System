/**
 * Onflo Design System — Table Row Groups Bar
 *
 * Displayed between the table toolbar and the column header row when row
 * grouping is active or available. Provides:
 *   - A drop zone for dragging columns to set row groups (AG Grid native DnD)
 *   - Chips showing the currently active row group columns (removable)
 *   - A Comfort / Compact density toggle
 *
 * Standalone usage:
 *   <ds-table-row-groups-bar
 *     [(density)]="rowDensity"
 *     [rowGroups]="activeGroups"
 *     (removeGroup)="onRemoveGroup($event)"
 *   />
 *
 * AG Grid integration:
 *   Bind [api] after the grid is ready. The component will subscribe to
 *   columnRowGroupChanged events and keep the chip list in sync automatically.
 *   Emit densityChange to update grid rowHeight via api.resetRowHeights().
 *
 * HTML class API:
 *   <div class="ds-table-row-groups-bar">
 *     <div class="ds-table-row-groups-bar__drop-zone">
 *       <span class="ds-icon ds-table-row-groups-bar__drag-icon">drag_indicator</span>
 *       <span class="ds-table-row-groups-bar__placeholder">Drag here to set row groups</span>
 *       <div class="ds-table-row-groups-bar__chips">
 *         <!-- ds-tag chips here -->
 *       </div>
 *     </div>
 *     <div class="ds-table-row-groups-bar__density">
 *       <div class="ds-density-toggle">
 *         <button class="ds-density-toggle__btn is-selected">Comfort</button>
 *         <button class="ds-density-toggle__btn">Compact</button>
 *       </div>
 *     </div>
 *   </div>
 *
 * Figma: component/table-row-groups-bar
 * ADA: Density buttons use aria-pressed; remove buttons on chips have aria-label.
 */

import {
  Component, Input, Output, EventEmitter, OnDestroy,
  ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TableDensity = 'comfort' | 'compact';

export interface TableRowGroup {
  /** AG Grid column ID. */
  colId: string;
  /** Display label for the chip. */
  label: string;
}

/** Minimal AG Grid API surface needed by the row groups bar. */
export interface AgRowGroupsApi {
  getRowGroupColumns(): { getColId(): string; getColDef(): { headerName?: string } }[];
  removeRowGroupColumn(key: string): void;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}

@Component({
  selector: 'ds-table-row-groups-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-row-groups-bar.component.html',
  styleUrls: ['./table-row-groups-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTableRowGroupsBarComponent implements OnDestroy {

  /** Active row group columns shown as chips. Ignored when [api] is bound. */
  @Input() rowGroups: TableRowGroup[] = [];

  /** Current density. Use [(density)] for two-way binding. */
  @Input() density: TableDensity = 'comfort';

  /** Emits the new density when the toggle changes. */
  @Output() densityChange = new EventEmitter<TableDensity>();

  /**
   * Emits the colId of the row group the user wants to remove.
   * When [api] is bound this is handled automatically; still emitted for external listeners.
   */
  @Output() removeGroup = new EventEmitter<string>();

  private _api: AgRowGroupsApi | null = null;
  private readonly _groupChanged = (): void => this._syncGroups();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid integration ───────────────────────────────────────────────────

  /** Bind after the grid is ready to enable automatic sync with column state. */
  @Input() set api(value: AgRowGroupsApi | null) {
    this._detach();
    this._api = value;
    if (value) {
      value.addEventListener('columnRowGroupChanged', this._groupChanged);
      this._syncGroups();
    }
  }

  ngOnDestroy(): void {
    this._detach();
  }

  private _detach(): void {
    this._api?.removeEventListener('columnRowGroupChanged', this._groupChanged);
  }

  private _syncGroups(): void {
    if (!this._api) { return; }
    this.rowGroups = this._api.getRowGroupColumns().map(col => ({
      colId: col.getColId(),
      label: col.getColDef().headerName ?? col.getColId(),
    }));
    this.cdr.markForCheck();
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  onRemoveGroup(colId: string): void {
    this._api?.removeRowGroupColumn(colId);
    // Also update local state for standalone usage
    if (!this._api) {
      this.rowGroups = this.rowGroups.filter(g => g.colId !== colId);
    }
    this.removeGroup.emit(colId);
  }

  onDensityChange(value: TableDensity): void {
    this.density = value;
    this.densityChange.emit(value);
  }
}
