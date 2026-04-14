/**
 * Onflo Design System — Table Status Bar
 *
 * Pinned aggregate row displayed between the data rows and the paginator.
 * Shows row counts (left) and optional numeric aggregate values (right).
 *
 * Standalone usage — bind inputs manually from your component:
 *   <ds-table-status-bar
 *     [rowCount]="displayedRows"
 *     [totalRowCount]="allRows"
 *     [average]="colAvg"
 *     [sum]="colSum"
 *   />
 *
 * AG Grid status bar usage:
 *   gridOptions = {
 *     statusBar: {
 *       statusPanels: [
 *         { statusPanel: DsTableStatusBarComponent, align: 'full-width' }
 *       ]
 *     }
 *   }
 *   When registered as a status panel, AG Grid calls agInit(params) and the
 *   component self-populates row counts from the grid API. Aggregate values
 *   are driven by range selection — bind them externally or extend agInit
 *   to hook into rangeSelectionChanged events.
 *
 * HTML class API:
 *   <div class="ds-table-status-bar">
 *     <div class="ds-table-status-bar__counts">
 *       <span class="ds-table-status-bar__stat">
 *         <span class="ds-table-status-bar__stat-label">Rows:</span>
 *         <span class="ds-table-status-bar__stat-value">100</span>
 *       </span>
 *       <span class="ds-table-status-bar__stat">
 *         <span class="ds-table-status-bar__stat-label">Total Rows:</span>
 *         <span class="ds-table-status-bar__stat-value">200</span>
 *       </span>
 *     </div>
 *     <div class="ds-table-status-bar__aggregates">
 *       <span class="ds-table-status-bar__stat">
 *         <span class="ds-table-status-bar__stat-label">Average:</span>
 *         <span class="ds-table-status-bar__stat-value">42.5</span>
 *       </span>
 *       <!-- ... -->
 *     </div>
 *   </div>
 *
 * Figma: primitive/table-status-bar
 * ADA: aria-live="polite" on the aggregates region so screen readers announce changes.
 */

import {
  Component, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Minimal AG Grid API surface needed by the status bar. */
export interface AgStatusBarApi {
  getDisplayedRowCount(): number;
  getModel(): { getRowCount?(): number } | null;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}

export interface AgStatusPanelParams {
  api: AgStatusBarApi;
}

@Component({
  selector: 'ds-table-status-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-status-bar.component.html',
  styleUrls: ['./table-status-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTableStatusBarComponent implements OnDestroy {

  /** Number of currently displayed (filtered) rows. */
  @Input() rowCount: number | null = null;

  /** Total row count in the dataset (pre-filter). */
  @Input() totalRowCount: number | null = null;

  /** Average value of the selected range / column. */
  @Input() average: number | null = null;

  /** Count of numeric cells in the selection. */
  @Input() count: number | null = null;

  /** Minimum value in the selection. */
  @Input() min: number | null = null;

  /** Maximum value in the selection. */
  @Input() max: number | null = null;

  /** Sum of values in the selection. */
  @Input() sum: number | null = null;

  private _api: AgStatusBarApi | null = null;
  private readonly _modelUpdated = (): void => this._syncRowCount();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid IStatusPanelAngularComp ────────────────────────────────────────

  agInit(params: AgStatusPanelParams): void {
    this._api = params.api;
    params.api.addEventListener('modelUpdated', this._modelUpdated);
    params.api.addEventListener('filterChanged', this._modelUpdated);
    this._syncRowCount();
  }

  /** Called by AG Grid when the status bar panel should refresh its data. */
  refresh(): void {
    this._syncRowCount();
  }

  ngOnDestroy(): void {
    this._api?.removeEventListener('modelUpdated', this._modelUpdated);
    this._api?.removeEventListener('filterChanged', this._modelUpdated);
  }

  private _syncRowCount(): void {
    if (!this._api) { return; }
    this.rowCount = this._api.getDisplayedRowCount();
    this.totalRowCount = this._api.getModel()?.getRowCount?.() ?? this.rowCount;
    this.cdr.markForCheck();
  }

  // ── Display helpers ───────────────────────────────────────────────────────

  hasAggregates(): boolean {
    return this.average !== null || this.count !== null
        || this.min !== null || this.max !== null || this.sum !== null;
  }

  formatNumber(value: number): string {
    return value.toLocaleString();
  }
}
