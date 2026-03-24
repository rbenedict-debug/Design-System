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
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '../icon-button/icon-button.component';

export type TableHeaderAlign = 'left' | 'right';
export type TableSortDirection = 'asc' | 'desc' | null;

/** Minimal interface for AG Grid header params — avoids hard ag-grid-community dep. */
export interface AgHeaderParams {
  displayName: string;
  enableSorting: boolean;
  enableMenu: boolean;
  column: {
    getSort(): string | null | undefined;
    getActualWidth(): number;
    getColId(): string;
    addEventListener(event: string, listener: () => void): void;
    removeEventListener(event: string, listener: () => void): void;
  };
  api: {
    setColumnWidth(key: string, newWidth: number): void;
  };
  progressSort(multiSort?: boolean): void;
  showColumnMenu(source: HTMLElement): void;
}

@Component({
  selector: 'ds-table-header-cell',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent],
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
  @Input() label = '';

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

  /** Emits the new column width in px when the user drags the resize handle. */
  @Output() widthChange = new EventEmitter<number>();

  private agParams?: AgHeaderParams;
  private sortChangedListener?: () => void;

  // Resize drag state
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  private boundMouseMove?: (e: MouseEvent) => void;
  private boundMouseUp?: () => void;

  constructor(private cdr: ChangeDetectorRef) {}

  // ── Checkbox-only detection ──────────────────────────────────

  /** True when this column shows only a checkbox with no label text. */
  get isCheckboxOnly(): boolean {
    return this.checkbox && !this.label;
  }

  /** Whether the left resize pipe is shown (suppressed on checkbox-only columns). */
  get showLeftPipe(): boolean {
    return !this.isCheckboxOnly && this.pipeLeft;
  }

  /** Whether the right resize pipe is shown (suppressed on checkbox-only columns). */
  get showRightPipe(): boolean {
    return !this.isCheckboxOnly && this.pipeRight;
  }

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
    this._cleanupResizeListeners();
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

  get sortIconClass(): string {
    if (this.sortDirection === 'asc')  return 'ds-table-header-cell__sort-icon--asc';
    if (this.sortDirection === 'desc') return 'ds-table-header-cell__sort-icon--desc';
    return 'ds-table-header-cell__sort-icon--none';
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

  // ── Resize drag ─────────────────────────────────────────────

  onResizeStart(event: MouseEvent): void {
    if (this.isCheckboxOnly) return;
    event.preventDefault();
    event.stopPropagation();

    this.resizeStartX = event.clientX;
    this.resizeStartWidth = this.agParams?.column.getActualWidth() ?? 200;

    this.boundMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - this.resizeStartX;
      const newWidth = Math.max(50, this.resizeStartWidth + delta);
      this.agParams?.api?.setColumnWidth(this.agParams.column.getColId(), newWidth);
      this.widthChange.emit(newWidth);
    };

    this.boundMouseUp = () => this._cleanupResizeListeners();

    document.addEventListener('mousemove', this.boundMouseMove);
    document.addEventListener('mouseup', this.boundMouseUp);
  }

  private _cleanupResizeListeners(): void {
    if (this.boundMouseMove) {
      document.removeEventListener('mousemove', this.boundMouseMove);
      this.boundMouseMove = undefined;
    }
    if (this.boundMouseUp) {
      document.removeEventListener('mouseup', this.boundMouseUp);
      this.boundMouseUp = undefined;
    }
  }
}
