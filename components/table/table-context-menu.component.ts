/**
 * Onflo Design System — Table Context Menu
 *
 * Right-click context menu for AG Grid column headers and data rows.
 * Visual styling uses the existing ds-menu CSS class API — no new visual
 * language introduced; this component is purely a positioned overlay.
 *
 * ── Setup ────────────────────────────────────────────────────────────────────
 *
 * 1. Add to grid options:
 *      suppressContextMenu: true        — disables AG Grid's row context menu
 *      suppressHeaderContextMenu: true  — disables AG Grid's header context menu
 *
 * 2. Place once in your page/layout template:
 *      <ds-table-context-menu
 *        [visible]="ctxVisible"
 *        [x]="ctxX"
 *        [y]="ctxY"
 *        [items]="ctxItems"
 *        (closed)="ctxVisible = false"
 *      />
 *
 * 3. Wire context menu events on your column definitions:
 *
 *    Header (on the headerComponent):
 *      (headerContextMenu)="onHeaderRightClick($event)"
 *
 *    Row cell (on the cellRenderer):
 *      (rowContextMenu)="onRowRightClick($event)"
 *
 * ── Default item builders ─────────────────────────────────────────────────────
 *
 *   import {
 *     buildDefaultHeaderContextMenuItems,
 *     buildDefaultRowContextMenuItems,
 *   } from '@onflo/design-system';
 *
 *   onHeaderRightClick(e: DsTableHeaderContextMenuEvent): void {
 *     this.ctxItems = buildDefaultHeaderContextMenuItems(
 *       e.params.column.getColId(),
 *       e.params.api,
 *     );
 *     this.ctxX = e.x;
 *     this.ctxY = e.y;
 *     this.ctxVisible = true;
 *   }
 *
 *   onRowRightClick(e: DsTableRowContextMenuEvent): void {
 *     this.ctxItems = buildDefaultRowContextMenuItems(e.params.value);
 *     this.ctxX = e.x;
 *     this.ctxY = e.y;
 *     this.ctxVisible = true;
 *   }
 *
 * ── Customising items ─────────────────────────────────────────────────────────
 *
 * Spread, replace, or filter the default arrays per project:
 *
 *   this.ctxItems = [
 *     ...buildDefaultHeaderContextMenuItems(colId, api),
 *     { separator: true },
 *     { label: 'My Custom Action', icon: 'star', action: () => doSomething() },
 *   ];
 *
 * ADA: role="menu" on panel; role="menuitem" per item; Escape closes;
 *      aria-disabled on disabled items; focus moves to panel on open.
 */

import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges,
  ViewChild, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef,
  HostListener, AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// ── Item type ─────────────────────────────────────────────────────────────────

/** A single entry in a DsTableContextMenuComponent item list. */
export interface DsContextMenuItem {
  /** Display label. Ignored when separator is true. */
  label?: string;
  /** Material Symbols Rounded icon name (sm, outlined by default). */
  icon?: string;
  /** Render a horizontal divider rule. All other fields are ignored. */
  separator?: boolean;
  /** Disable the item — greyed out, pointer-events none, aria-disabled set. */
  disabled?: boolean;
  /** Apply red destructive interaction styling (same as ds-menu__item--destructive). */
  destructive?: boolean;
  /** Called when the item is clicked (not called when disabled). */
  action?: () => void;
}

// ── Event types (emitted by DsTableHeaderCellComponent / DsTableRowCellComponent) ──

/**
 * Emitted by DsTableHeaderCellComponent on right-click.
 * params.api exposes the AG Grid methods needed for the default header actions.
 */
export interface DsTableHeaderContextMenuEvent {
  /** Cursor clientX — use as the x input on DsTableContextMenuComponent. */
  x: number;
  /** Cursor clientY — use as the y input on DsTableContextMenuComponent. */
  y: number;
  params: {
    column: {
      getColId(): string;
      getActualWidth(): number;
      getSort?(): string | null | undefined;
      getSortDef?(): { direction: 'asc' | 'desc' | null } | null;
    };
    api: {
      setColumnWidth(colId: string, width: number, finished?: boolean): void;
      applyColumnState(params: {
        state: Array<{ colId: string; sort?: 'asc' | 'desc' | null }>;
        defaultState?: { sort?: null };
      }): void;
      setColumnPinned(colId: string, pinned: 'left' | 'right' | null): void;
      autoSizeColumn(colId: string, skipHeader?: boolean): void;
      resetColumnState(): void;
      addRowGroupColumn(colId: string): void;
    };
  };
}

/**
 * Emitted by DsTableRowCellComponent on right-click.
 * params.value is the raw cell value — pass it to buildDefaultRowContextMenuItems().
 */
export interface DsTableRowContextMenuEvent {
  /** Cursor clientX — use as the x input on DsTableContextMenuComponent. */
  x: number;
  /** Cursor clientY — use as the y input on DsTableContextMenuComponent. */
  y: number;
  params: {
    value: unknown;
  };
}

// ── Default item builders ─────────────────────────────────────────────────────

/**
 * Builds the default right-click item list for a column header cell.
 *
 * Default actions:
 *   Sort Ascending | Sort Descending | Clear Sort
 *   ─────────────────────────────────────────────
 *   Pin Left | Pin Right | Unpin
 *   ─────────────────────────────────────────────
 *   Auto Size Column | Reset Columns
 *   ─────────────────────────────────────────────
 *   Group by Column
 *
 * @param colId  The column ID from AgHeaderParams.column.getColId().
 * @param api    The grid API from AgHeaderParams.api.
 */
export function buildDefaultHeaderContextMenuItems(
  colId: string,
  api: DsTableHeaderContextMenuEvent['params']['api'],
): DsContextMenuItem[] {
  return [
    {
      label: 'Sort Ascending',
      icon: 'arrow_upward_alt',
      action: () => api.applyColumnState({
        state: [{ colId, sort: 'asc' }],
        defaultState: { sort: null },
      }),
    },
    {
      label: 'Sort Descending',
      icon: 'arrow_downward_alt',
      action: () => api.applyColumnState({
        state: [{ colId, sort: 'desc' }],
        defaultState: { sort: null },
      }),
    },
    {
      label: 'Clear Sort',
      action: () => api.applyColumnState({
        state: [{ colId, sort: null }],
      }),
    },
    { separator: true },
    {
      label: 'Pin Left',
      icon: 'push_pin',
      action: () => api.setColumnPinned(colId, 'left'),
    },
    {
      label: 'Pin Right',
      icon: 'push_pin',
      action: () => api.setColumnPinned(colId, 'right'),
    },
    {
      label: 'Unpin',
      action: () => api.setColumnPinned(colId, null),
    },
    { separator: true },
    {
      label: 'Auto Size Column',
      icon: 'fit_width',
      action: () => api.autoSizeColumn(colId),
    },
    {
      label: 'Reset Columns',
      action: () => api.resetColumnState(),
    },
    { separator: true },
    {
      label: 'Group by Column',
      icon: 'group_work',
      action: () => api.addRowGroupColumn(colId),
    },
  ];
}

/**
 * Builds the default right-click item list for a data row cell.
 *
 * Default actions: Copy (copies the cell value string to the clipboard).
 *
 * @param value  The cell value from AgCellRendererParams.value.
 */
export function buildDefaultRowContextMenuItems(value: unknown): DsContextMenuItem[] {
  return [
    {
      label: 'Copy',
      icon: 'content_copy',
      action: () => {
        const text = value != null ? String(value) : '';
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).catch(() => {});
        } else {
          // Fallback for non-secure contexts (HTTP)
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
      },
    },
  ];
}

// ── Component ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'ds-table-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-context-menu.component.html',
  styleUrls: ['./table-context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTableContextMenuComponent implements OnChanges, AfterViewInit {

  /** Items to display. Use DsContextMenuItem[] — build with the default builders or custom arrays. */
  @Input() items: DsContextMenuItem[] = [];

  /** Horizontal cursor position (event.clientX) where the menu should open. */
  @Input() x = 0;

  /** Vertical cursor position (event.clientY) where the menu should open. */
  @Input() y = 0;

  /** Controls visibility. Bind to a boolean in your component; set false in (closed). */
  @Input() visible = false;

  /** Emitted when the menu requests to close — backdrop click, Escape, or item click. */
  @Output() closed = new EventEmitter<void>();

  @ViewChild('panel') private panelRef?: ElementRef<HTMLElement>;

  /** Final position after viewport boundary check — bound in the template. */
  adjustedX = 0;
  adjustedY = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['x'] || changes['y'] || changes['visible']) {
      // Start at cursor position; adjustPosition() corrects after the panel renders.
      this.adjustedX = this.x;
      this.adjustedY = this.y;
      if (this.visible) {
        // One tick for *ngIf to stamp the panel into the DOM before measuring.
        setTimeout(() => {
          this.adjustPosition();
          this.panelRef?.nativeElement?.focus();
        }, 0);
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.visible) this.adjustPosition();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.visible) this.close();
  }

  close(): void {
    this.closed.emit();
  }

  onItemClick(item: DsContextMenuItem): void {
    if (item.disabled) return;
    item.action?.();
    this.close();
  }

  /**
   * Full WCAG keyboard handling for role="menu":
   *   Escape     — close
   *   ArrowDown  — move focus to next item (wraps)
   *   ArrowUp    — move focus to previous item (wraps)
   *   Home       — move focus to first item
   *   End        — move focus to last item
   */
  onPanelKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this._moveFocus(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._moveFocus(-1);
        break;
      case 'Home':
        event.preventDefault();
        this._focusItem(0);
        break;
      case 'End':
        event.preventDefault();
        this._focusItem('last');
        break;
    }
  }

  private _getMenuItems(): HTMLButtonElement[] {
    return Array.from(
      this.panelRef?.nativeElement.querySelectorAll<HTMLButtonElement>(
        'button[role="menuitem"]:not([disabled])'
      ) ?? []
    );
  }

  private _moveFocus(direction: 1 | -1): void {
    const items = this._getMenuItems();
    if (!items.length) return;
    const idx = items.indexOf(document.activeElement as HTMLButtonElement);
    items[(idx + direction + items.length) % items.length]?.focus();
  }

  private _focusItem(position: number | 'last'): void {
    const items = this._getMenuItems();
    if (!items.length) return;
    const target = position === 'last' ? items[items.length - 1] : items[position];
    target?.focus();
  }

  /** Flips the panel above/left when it would overflow the viewport. */
  private adjustPosition(): void {
    const el = this.panelRef?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let x = this.x;
    let y = this.y;
    if (x + rect.width  > window.innerWidth)  x = Math.max(0, x - rect.width);
    if (y + rect.height > window.innerHeight) y = Math.max(0, y - rect.height);
    this.adjustedX = x;
    this.adjustedY = y;
    this.cdr.markForCheck();
  }
}
