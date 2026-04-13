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
  ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '../icon-button/icon-button.component';
import { DsTableHeaderContextMenuEvent } from './table-context-menu.component';

export type TableHeaderAlign = 'left' | 'right';
export type TableSortDirection = 'asc' | 'desc' | null;

/** Minimal interface for AG Grid header params — avoids hard ag-grid-community dep. */
export interface AgHeaderParams {
  /** Column header display text (respects headerValueGetter). */
  displayName: string;
  /** Whether sorting is enabled on this column (from colDef.sortable). */
  enableSorting: boolean;
  /** Whether the column menu button should be shown (from colDef.suppressMenu). */
  enableMenu: boolean;
  /**
   * Whether a dedicated filter icon button should be shown (AG Grid v29+).
   * Maps to the `filtering` input. Falls back to the custom `filtering`
   * headerComponentParam when not provided by older AG Grid versions.
   */
  enableFilterButton?: boolean;
  column: {
    /**
     * Returns the current sort direction.
     * AG Grid v28 and earlier — use getSortDef when available.
     */
    getSort?(): string | null | undefined;
    /**
     * Returns the sort definition object — preferred API (AG Grid v29+).
     * `direction` is 'asc' | 'desc' | null; method returns null when column
     * is not sortable.
     */
    getSortDef?(): { direction: 'asc' | 'desc' | null } | null;
    getActualWidth(): number;
    getColId(): string;
    /** Whether a filter is currently active on this column. */
    isFilterActive(): boolean;
    addEventListener(event: string, listener: () => void): void;
    removeEventListener(event: string, listener: () => void): void;
  };
  api: {
    /**
     * finished: false during drag (flex columns reflow in real-time),
     * finished: true on release (AG Grid finalizes state and fires columnResized).
     * Columns with flex: 1 in their colDef automatically fill remaining space.
     */
    setColumnWidth(key: string, newWidth: number, finished?: boolean): void;
    /** Sets a specific sort state on one or more columns. Used by the context menu sort actions. */
    applyColumnState(params: {
      state: Array<{ colId: string; sort?: 'asc' | 'desc' | null }>;
      defaultState?: { sort?: null };
    }): void;
    /** Pins or unpins a column. Pass null to unpin. */
    setColumnPinned(colId: string, pinned: 'left' | 'right' | null): void;
    /** Auto-sizes a column to fit its content. */
    autoSizeColumn(colId: string, skipHeader?: boolean): void;
    /** Resets all column state (widths, visibility, order, pin, sort) to defaults. */
    resetColumnState(): void;
    /** Adds a column to the active row group set. */
    addRowGroupColumn(colId: string): void;
  };
  /** Advance sort direction through the cycle: none → asc → desc → none. */
  progressSort(multiSort?: boolean): void;
  /** Set an explicit sort direction. Use null to clear the sort. */
  setSort(sort: 'asc' | 'desc' | null, multiSort?: boolean): void;
  /** Show the column menu popup anchored to the supplied element. */
  showColumnMenu(source: HTMLElement): void;
  /** Show the filter popup anchored to the supplied element (AG Grid v29+). */
  showFilter(source: HTMLElement): void;
  // ── Custom params from headerComponentParams — merged into params by AG Grid ──
  /** Text alignment override passed via headerComponentParams. */
  align?: TableHeaderAlign;
  /** Explicit filter button visibility override via headerComponentParams. */
  filtering?: boolean;
  /** Show left resize pipe via headerComponentParams. */
  pipeLeft?: boolean;
  /** Show right resize pipe via headerComponentParams. */
  pipeRight?: boolean;
  /** Show select-all checkbox via headerComponentParams. */
  checkbox?: boolean;
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

  /**
   * Emits on right-click (contextmenu) when this component is used inside AG Grid.
   * Use with suppressHeaderContextMenu: true in grid options to disable AG Grid's
   * built-in header menu, then show <ds-table-context-menu> at the emitted coords.
   */
  @Output() headerContextMenu = new EventEmitter<DsTableHeaderContextMenuEvent>();

  /** Whether a filter is currently active on this column — drives the filter icon colour. */
  filterActive = false;

  private agParams?: AgHeaderParams;
  private sortChangedListener?: () => void;
  private filterChangedListener?: () => void;

  // Resize drag state
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  private resizeCurrentWidth = 0;
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
    this._applyAgParams(params);

    // Sort state — try getSortDef (v29+) first, fall back to getSort (v28-)
    this.sortChangedListener = () => {
      const rawDir = params.column.getSortDef
        ? params.column.getSortDef()?.direction ?? null
        : params.column.getSort?.() ?? null;
      this.sortDirection = (rawDir === 'asc' || rawDir === 'desc') ? rawDir : null;
      this.cdr.markForCheck();
    };
    params.column.addEventListener('sortChanged', this.sortChangedListener);
    this.sortChangedListener();

    // Filter active state
    this.filterChangedListener = () => {
      this.filterActive = params.column.isFilterActive();
      this.cdr.markForCheck();
    };
    params.column.addEventListener('filterChanged', this.filterChangedListener);
    this.filterChangedListener();
  }

  /** Called by AG Grid to refresh the header when the column definition changes. */
  refresh(params: AgHeaderParams): boolean {
    this.agParams = params;
    this._applyAgParams(params);
    this.cdr.markForCheck();
    return true;
  }

  ngOnDestroy(): void {
    if (this.agParams) {
      if (this.sortChangedListener) {
        this.agParams.column.removeEventListener('sortChanged', this.sortChangedListener);
      }
      if (this.filterChangedListener) {
        this.agParams.column.removeEventListener('filterChanged', this.filterChangedListener);
      }
    }
    this._cleanupResizeListeners();
  }

  /**
   * Reads standard AG Grid params and any custom headerComponentParams merged
   * in by AG Grid. Called on agInit and refresh.
   */
  private _applyAgParams(params: AgHeaderParams): void {
    this.label = params.displayName;
    this.sorting = params.enableSorting;
    this.menuControl = params.enableMenu;
    // enableFilterButton (AG Grid v29+) takes precedence over custom filtering param.
    this.filtering = params.enableFilterButton ?? params.filtering ?? false;
    // Custom params from headerComponentParams — only override if explicitly provided.
    if (params.align     !== undefined) this.align     = params.align;
    if (params.pipeLeft  !== undefined) this.pipeLeft  = params.pipeLeft;
    if (params.pipeRight !== undefined) this.pipeRight = params.pipeRight;
    if (params.checkbox  !== undefined) this.checkbox  = params.checkbox;
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

  onFilterClick(triggerEl: HTMLElement): void {
    if (this.agParams) {
      this.agParams.showFilter(triggerEl);
    }
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    if (!this.agParams) return;
    event.preventDefault();
    event.stopPropagation();
    this.headerContextMenu.emit({
      x: event.clientX,
      y: event.clientY,
      params: this.agParams,
    });
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
    this.resizeCurrentWidth = this.resizeStartWidth;

    this.boundMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - this.resizeStartX;
      this.resizeCurrentWidth = Math.max(50, this.resizeStartWidth + delta);
      // finished: false — AG Grid keeps the resize in progress so flex columns
      // redistribute their space in real-time as the user drags.
      this.agParams?.api?.setColumnWidth(
        this.agParams.column.getColId(),
        this.resizeCurrentWidth,
        false,
      );
      this.widthChange.emit(this.resizeCurrentWidth);
    };

    this.boundMouseUp = () => {
      // finished: true — AG Grid finalizes column state, fires columnResized,
      // and flex columns settle to their final widths.
      this.agParams?.api?.setColumnWidth(
        this.agParams!.column.getColId(),
        this.resizeCurrentWidth,
        true,
      );
      this._cleanupResizeListeners();
    };

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
