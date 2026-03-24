/**
 * Onflo Design System — Table Header Cell
 *
 * AG Grid custom header renderer for the Onflo table system.
 * Uses Onflo tokens and Material Symbols — no AG Grid default styles.
 *
 * AG Grid usage (in your column def):
 *   {
 *     headerComponent: DsTableHeaderCellComponent,
 *     headerComponentParams: { align: 'right', sorting: true }
 *   }
 *
 * Standalone usage:
 *   <ds-table-header-cell label="Name" [sorting]="true" />
 *
 * Figma: primitive/table-header-cell
 * Properties: align, sorting, filtering, checkbox, pipeLeft, pipeRight, menuControl
 * Used inside: component/table-header-row
 *
 * ADA: aria-sort on the host element; aria-label on all icon buttons.
 */

import {
  Component, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type TableHeaderAlign = 'left' | 'right';
export type TableSortDirection = 'asc' | 'desc' | null;

/** Minimal interface for AG Grid header params — avoids hard ag-grid-community dep. */
export interface AgHeaderParams {
  displayName: string;
  enableSorting: boolean;
  enableMenu: boolean;
  column: {
    getSort(): string | null | undefined;
    addEventListener(event: string, listener: () => void): void;
    removeEventListener(event: string, listener: () => void): void;
    getColId(): string;
  };
  progressSort(multiSort?: boolean): void;
  showColumnMenu(source: HTMLElement): void;
}

@Component({
  selector: 'ds-table-header-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-header-cell.component.html',
  styleUrls: ['./table-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-sort]': 'ariaSortValue',
    'role': 'columnheader',
  },
})
export class DsTableHeaderCellComponent implements OnDestroy {

  /** Column header label. Overridden by agInit displayName when used as AG Grid renderer. */
  @Input() label = 'Header Label';

  /** Text alignment of cell contents. */
  @Input() align: TableHeaderAlign = 'left';

  /** Show sort icon button — clicking cycles asc → desc → none. */
  @Input() sorting = false;

  /** Show filter icon button. */
  @Input() filtering = false;

  /** Show column menu (more_vert) button. */
  @Input() menuControl = false;

  /** Show checkbox (select-all) at the leading edge. */
  @Input() checkbox = false;

  /** Show left resize pipe. */
  @Input() pipeLeft = false;

  /** Show right resize pipe (default on). */
  @Input() pipeRight = true;

  /** Current sort direction — can be set externally or driven by AG Grid. */
  @Input() sortDirection: TableSortDirection = null;

  /** Checked state for the select-all checkbox. */
  @Input() checked = false;

  /** Indeterminate state for the select-all checkbox. */
  @Input() indeterminate = false;

  private agParams?: AgHeaderParams;
  private sortChangedListener?: () => void;

  constructor(private cdr: ChangeDetectorRef) {}

  // ── AG Grid IHeaderAngularComp interface ────────────────────

  /** Called by AG Grid when this component is the headerComponent. */
  agInit(params: AgHeaderParams): void {
    this.agParams = params;
    this.label = params.displayName;
    this.sorting = params.enableSorting;
    this.menuControl = params.enableMenu;

    this.sortChangedListener = () => {
      const raw = params.column.getSort();
      this.sortDirection = (raw === 'asc' || raw === 'desc') ? raw : null;
      this.cdr.markForCheck();
    };

    params.column.addEventListener('sortChanged', this.sortChangedListener);
    this.sortChangedListener();
  }

  /** Called by AG Grid to refresh the header. */
  refresh(params: AgHeaderParams): boolean {
    this.label = params.displayName;
    this.cdr.markForCheck();
    return true;
  }

  ngOnDestroy(): void {
    if (this.agParams && this.sortChangedListener) {
      this.agParams.column.removeEventListener('sortChanged', this.sortChangedListener);
    }
  }

  // ── Sort ────────────────────────────────────────────────────

  onSortClick(event: MouseEvent): void {
    if (this.agParams) {
      this.agParams.progressSort((event as MouseEvent & { shiftKey: boolean }).shiftKey);
    } else {
      const cycle: TableSortDirection[] = [null, 'asc', 'desc'];
      const idx = cycle.indexOf(this.sortDirection);
      this.sortDirection = cycle[(idx + 1) % cycle.length];
    }
  }

  get sortIcon(): string {
    // Always use arrow_upward_alt — rotate 180° for desc via CSS modifier
    return 'arrow_upward_alt';
  }

  get sortBtnClass(): string {
    if (this.sortDirection === 'asc')  return 'ds-table-header-cell__icon-btn--sort-asc';
    if (this.sortDirection === 'desc') return 'ds-table-header-cell__icon-btn--sort-desc';
    return 'ds-table-header-cell__icon-btn--sort-none';
  }

  get ariaSortValue(): string | null {
    if (!this.sorting) return null;
    if (this.sortDirection === 'asc')  return 'ascending';
    if (this.sortDirection === 'desc') return 'descending';
    return 'none';
  }

  // ── Menu / Filter ───────────────────────────────────────────

  onMenuClick(triggerEl: HTMLElement): void {
    if (this.agParams) {
      this.agParams.showColumnMenu(triggerEl);
    }
  }

  // ── Checkbox ────────────────────────────────────────────────

  get checkboxIcon(): string {
    if (this.indeterminate) return 'indeterminate_check_box';
    if (this.checked) return 'check_box';
    return 'check_box_outline_blank';
  }

  get checkboxClass(): string {
    if (this.indeterminate || this.checked) return 'ds-table-header-cell__checkbox--checked';
    return '';
  }
}
