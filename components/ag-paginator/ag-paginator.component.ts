/**
 * ds-ag-paginator
 *
 * Custom AG Grid pagination panel — replaces the built-in AG Grid
 * pagination bar with Onflo design tokens and Material Symbols icons.
 *
 * AG Grid status bar usage:
 *   gridOptions = {
 *     suppressPaginationPanel: true,
 *     pagination: true,
 *     statusBar: {
 *       statusPanels: [
 *         { statusPanel: DsAgPaginatorComponent, align: 'right' }
 *       ]
 *     }
 *   }
 *
 * Standalone usage (place below the grid):
 *   <ds-ag-paginator [api]="gridApi" />
 *
 * ADA: Navigation buttons have aria-label. Range label is aria-live="polite"
 *      so screen readers announce page changes automatically.
 */

import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSelectComponent, DsSelectOption } from '../select/select.component';

/** Minimal AG Grid API interface — avoids a hard ag-grid-community dependency. */
export interface AgPaginationApi {
  paginationGetCurrentPage(): number;
  paginationGetPageSize(): number;
  paginationGetTotalPages(): number;
  paginationGetRowCount(): number;
  paginationGoToFirstPage(): void;
  paginationGoToPreviousPage(): void;
  paginationGoToNextPage(): void;
  paginationGoToLastPage(): void;
  paginationSetPageSize(size: number): void;
  addEventListener(event: string, callback: () => void): void;
  removeEventListener(event: string, callback: () => void): void;
}

/** Params injected by AG Grid when registered as a status panel component. */
export interface AgPaginatorStatusPanelParams {
  api: AgPaginationApi;
}

@Component({
  selector: 'ds-ag-paginator',
  standalone: true,
  imports: [CommonModule, DsSelectComponent],
  templateUrl: './ag-paginator.component.html',
  styleUrls: ['./ag-paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAgPaginatorComponent implements OnInit, OnDestroy {
  /**
   * AG Grid API instance.
   * Set this when using the component standalone (outside the grid status bar).
   * When used as a status panel, AG Grid injects the API via agInit().
   */
  @Input() set api(value: AgPaginationApi | null) {
    this._api = value;
    if (value) { this.attachToGrid(value); }
  }
  get api(): AgPaginationApi | null { return this._api; }
  private _api: AgPaginationApi | null = null;

  /** Page size options shown in the select. */
  @Input() pageSizeOptions: number[] = [100, 250, 500, 1000];

  currentPage = 0;
  pageSize    = 25;
  totalRows   = 0;
  totalPages  = 0;

  private readonly _paginationListener = (): void => this.syncFromGrid();

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid status panel lifecycle ────────────────────────────────────────

  /** Called by AG Grid when this component is registered as a status panel. */
  agInit(params: AgPaginatorStatusPanelParams): void {
    this.attachToGrid(params.api);
  }

  ngOnInit(): void {
    // api binding is handled via the setter or agInit — nothing to do here.
  }

  ngOnDestroy(): void {
    this.detachFromGrid();
  }

  // ── Grid sync ─────────────────────────────────────────────────────────────

  private attachToGrid(api: AgPaginationApi): void {
    this.detachFromGrid();
    this._api = api;
    api.addEventListener('paginationChanged', this._paginationListener);
    this.syncFromGrid();
  }

  private detachFromGrid(): void {
    this._api?.removeEventListener('paginationChanged', this._paginationListener);
  }

  private syncFromGrid(): void {
    if (!this._api) { return; }
    this.currentPage = this._api.paginationGetCurrentPage();
    this.pageSize    = this._api.paginationGetPageSize();
    this.totalRows   = this._api.paginationGetRowCount();
    this.totalPages  = this._api.paginationGetTotalPages();
    this.cdr.markForCheck();
  }

  // ── Computed display values ───────────────────────────────────────────────

  get rangeStart(): number {
    if (this.totalRows === 0) { return 0; }
    return this.currentPage * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalRows);
  }

  get isFirstPage(): boolean { return this.currentPage === 0; }
  get isLastPage(): boolean  { return this.currentPage >= this.totalPages - 1; }

  /** Current page size as a string for ds-select value binding. */
  get pageSizeStr(): string { return String(this.pageSize); }

  /** Page size options mapped to DsSelectOption[] for ds-select. */
  get pageSizeSelectOptions(): DsSelectOption[] {
    return this.pageSizeOptions.map(n => ({ value: String(n), label: String(n) }));
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  firstPage(): void { this._api?.paginationGoToFirstPage(); }
  prevPage(): void  { this._api?.paginationGoToPreviousPage(); }
  nextPage(): void  { this._api?.paginationGoToNextPage(); }
  lastPage(): void  { this._api?.paginationGoToLastPage(); }

  onPageSizeChange(value: string): void {
    const size = +value;
    if (!isNaN(size)) { this._api?.paginationSetPageSize(size); }
  }
}
