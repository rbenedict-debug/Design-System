/**
 * Onflo Design System — Table Row Cell
 *
 * AG Grid custom cell renderer for the Onflo table system.
 * Uses Onflo tokens and Material Symbols — no AG Grid default styles.
 *
 * AG Grid usage (in your column def):
 *   {
 *     field: 'name',
 *     cellRenderer: DsTableRowCellComponent
 *   }
 *
 * Standalone usage:
 *   <ds-table-row-cell [value]="'Acme Corp'" />
 *   <ds-table-row-cell [value]="'$4,200'" align="right" />
 *
 * Figma: primitive/table-row-cell
 * Properties: align, cellData, gripper, checkbox, tier1Indent, tier2Indent, state
 * Used inside: component/table-row
 *
 * ADA: role="gridcell"; aria-selected on row selection; keyboard-accessible edit cells.
 */

import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy,
  ChangeDetectorRef, HostListener, OnDestroy, AfterViewChecked,
  ViewChild, ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsTableRowContextMenuEvent } from './table-context-menu.component';

export type TableCellAlign = 'left' | 'right';
export type TableCellState = 'default' | 'hover' | 'focus';

/** Minimal interface for AG Grid cell renderer params. */
export interface AgCellRendererParams {
  /** Raw cell value (from field or valueGetter) — before valueFormatter is applied. */
  value: unknown;
  /**
   * Pre-formatted string produced by the column's valueFormatter, or null/undefined
   * when no valueFormatter is defined. Always prefer this over String(value) when
   * displaying text so that valueFormatter is honoured.
   */
  valueFormatted?: string | null;
  node: {
    /** Full row data object — useful for reading sibling fields in custom renderers. */
    data: unknown;
    /** Row node ID (from getRowId() or AG Grid's internal counter). */
    id?: string;
    isSelected(): boolean;
    /**
     * Programmatically select or deselect this row.
     * Used by the checkbox keyboard/click handler to toggle selection when
     * suppressRowClickSelection is true in gridOptions.
     */
    setSelected?(selected: boolean, clearSelection?: boolean): void;
    addEventListener(event: string, listener: () => void): void;
    removeEventListener(event: string, listener: () => void): void;
  };
  colDef?: {
    cellRendererParams?: Partial<DsTableRowCellComponent>;
  };
  /**
   * Registers a DOM element as the row drag handle for this cell.
   * Call in agInit (or after the handle element has rendered) when the column
   * uses rowDrag: true and a custom drag handle element is needed.
   *
   * @param dragElement  The element to use as the drag handle.
   * @param dragStartPixels  Pixels of movement before drag starts (default 4).
   * @param value  Optional drag value override shown in the drag ghost.
   * @param suppressVisibilityChange  When true, AG Grid won't auto-show/hide the
   *   handle based on rowDrag visibility rules (rowDragManaged, etc.).
   */
  registerRowDragger?(
    dragElement: HTMLElement,
    dragStartPixels?: number,
    value?: string,
    suppressVisibilityChange?: boolean,
  ): void;
}

@Component({
  selector: 'ds-table-row-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-row-cell.component.html',
  styleUrls: ['./table-row-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'gridcell',
  },
})
export class DsTableRowCellComponent implements OnDestroy, AfterViewChecked {

  /** Cell value text. Overridden by agInit params.value. */
  @Input() value: string | null = null;

  /** Text alignment of cell content. */
  @Input() align: TableCellAlign = 'left';

  /** Whether to render cell data text (can be false for action-only cells). */
  @Input() cellData = true;

  /** Show row drag gripper handle. */
  @Input() gripper = false;

  /** Show row selection checkbox. */
  @Input() checkbox = false;

  /** Checked state for the selection checkbox. */
  @Input() checked = false;

  /** Indeterminate state for the selection checkbox. */
  @Input() indeterminate = false;

  /** Apply 32px tier-1 indent (for tree/grouped rows, depth 1). */
  @Input() tier1Indent = false;

  /** Apply 64px tier-2 indent (for tree/grouped rows, depth 2). */
  @Input() tier2Indent = false;

  /** Visual interaction state — typically driven by AG Grid row events. */
  @Input() state: TableCellState = 'default';

  /**
   * Emits on right-click (contextmenu) when this component is used inside AG Grid.
   * Use with suppressContextMenu: true in grid options to disable AG Grid's built-in
   * context menu, then show <ds-table-context-menu> at the emitted coords.
   */
  @Output() rowContextMenu = new EventEmitter<DsTableRowContextMenuEvent>();

  /** Template ref for the gripper button — used to register the AG Grid row dragger. */
  @ViewChild('gripperEl') gripperEl?: ElementRef<HTMLElement>;

  private agParams?: AgCellRendererParams;
  private rowSelectedListener?: () => void;
  /** Prevents re-registration on every change detection cycle once registered. */
  private gripperRegistered = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // ── AG Grid ICellRendererAngularComp interface ──────────────

  /** Called by AG Grid when this component is the cellRenderer. */
  agInit(params: AgCellRendererParams): void {
    this.agParams = params;
    this.applyParams(params);

    // Sync checked state when row selection changes
    this.rowSelectedListener = () => {
      this.checked = params.node.isSelected();
      this.cdr.markForCheck();
    };
    params.node.addEventListener('rowSelected', this.rowSelectedListener);
  }

  /** Called by AG Grid when the cell value changes. */
  refresh(params: AgCellRendererParams): boolean {
    this.applyParams(params);
    this.cdr.markForCheck();
    return true;
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: MouseEvent): void {
    if (!this.agParams) return;
    event.preventDefault();
    event.stopPropagation();
    this.rowContextMenu.emit({
      x: event.clientX,
      y: event.clientY,
      params: this.agParams,
    });
  }

  /**
   * Registers the gripper element as the AG Grid row drag handle once it
   * appears in the DOM. Runs after each change detection cycle but the
   * `gripperRegistered` flag ensures it only registers once.
   *
   * We cannot register in agInit directly because agInit runs before the
   * template has rendered the *ngIf="gripper" button — so the ElementRef
   * is not yet available at that point.
   */
  ngAfterViewChecked(): void {
    if (!this.gripperRegistered
        && this.agParams?.registerRowDragger
        && this.gripperEl?.nativeElement) {
      this.agParams.registerRowDragger(this.gripperEl.nativeElement);
      this.gripperRegistered = true;
    }
  }

  ngOnDestroy(): void {
    if (this.agParams && this.rowSelectedListener) {
      this.agParams.node.removeEventListener('rowSelected', this.rowSelectedListener);
    }
  }

  private applyParams(params: AgCellRendererParams): void {
    // Use valueFormatted when available so colDef.valueFormatter is honoured.
    this.value = params.valueFormatted != null
      ? params.valueFormatted
      : (params.value != null ? String(params.value) : null);
    this.checked = params.node.isSelected();
    // Merge any extra params from colDef.cellRendererParams
    const extra = params.colDef?.cellRendererParams ?? {};
    if (extra.align)       this.align = extra.align;
    if (extra.gripper)     this.gripper = extra.gripper;
    if (extra.checkbox)    this.checkbox = extra.checkbox;
    if (extra.tier1Indent) this.tier1Indent = extra.tier1Indent;
    if (extra.tier2Indent) this.tier2Indent = extra.tier2Indent;
  }

  // ── Checkbox helpers ─────────────────────────────────────────

  /**
   * Toggle row selection when the checkbox is activated via click or keyboard.
   * Calls node.setSelected() so AG Grid's selection state stays in sync — this
   * correctly handles suppressRowClickSelection: true in gridOptions, where
   * clicking the row itself does not select it and the checkbox is the only trigger.
   */
  onCheckboxClick(): void {
    this.agParams?.node.setSelected?.(!this.checked);
  }

  get checkboxIcon(): string {
    if (this.indeterminate) return 'indeterminate_check_box';
    if (this.checked)       return 'check_box';
    return 'check_box_outline_blank';
  }

  get checkboxClass(): string {
    return (this.checked || this.indeterminate)
      ? 'ds-table-row-cell__checkbox--checked'
      : '';
  }

  // ── Display value ────────────────────────────────────────────

  get displayValue(): string {
    return this.value ?? '';
  }
}
