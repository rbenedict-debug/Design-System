/**
 * Onflo Design System — Table Group Row Cell
 *
 * AG Grid custom renderer for full-width group rows.
 * Set as `groupRowRenderer` in gridOptions when using groupDisplayType: 'groupRows'.
 *
 * AG Grid usage:
 *   gridOptions = {
 *     groupDisplayType: 'groupRows',
 *     groupRowRenderer: DsTableGroupRowCellComponent,
 *   };
 *
 * Features:
 *   - 4 nesting levels with 24px indent per level
 *   - Animated chevron expand/collapse toggle
 *   - "FieldName: Value" label with child row count
 *   - Aggregated column values shown on the right (requires aggFunc on colDefs)
 *
 * Expansion state persistence (across page navigations):
 *   import { DsTableGroupExpansionStore } from '@onflo/design-system';
 *   const store = new DsTableGroupExpansionStore('my-grid-groups');
 *   gridOptions = {
 *     ...,
 *     isGroupOpenByDefault: (params) => store.isGroupOpenByDefault(params),
 *     onRowGroupOpened:     (event)  => store.onRowGroupOpened(event),
 *   };
 *
 * Figma: primitive/table-group-row-cell
 * ADA: expand/collapse toggle button has aria-expanded and aria-label;
 *      aggregate region is aria-hidden (decorative — announced via status bar).
 * No Angular Material base — custom component.
 */

import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/** Minimal AG Grid params surface for a group row cell renderer. */
export interface AgGroupRowCellParams {
  node: {
    /** The grouped value at this level (e.g. "Engineering"). */
    key: string | null;
    /** The field (column) being grouped (e.g. "department"). */
    field: string | null;
    /** Nesting depth — 0 = outermost group. */
    level: number;
    /** Whether this group is currently expanded. */
    expanded: boolean;
    /** Total count of leaf rows under this group node (or null). */
    allChildrenCount: number | null;
    /** Aggregated values keyed by field — populated when aggFunc is set on colDefs. */
    aggData: Record<string, unknown> | null;
    /** Expand or collapse this group node. */
    setExpanded(expanded: boolean): void;
    addEventListener(event: string, cb: () => void): void;
    removeEventListener(event: string, cb: () => void): void;
  };
  api: {
    /** Look up a column to resolve its display header name. */
    getColumn(key: string): { getColDef(): { headerName?: string } } | null;
  };
}

/** A single aggregated stat shown on the right of the group row. */
export interface DsGroupAggStat {
  label: string;
  value: string;
}

@Component({
  selector: 'ds-table-group-row-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-group-row-cell.component.html',
  styleUrls: ['./table-group-row-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Fill the full-width AG Grid group row cell.
    'style': 'display: block; width: 100%; height: 100%;',
  },
})
export class DsTableGroupRowCellComponent implements OnDestroy {

  value       = '';
  fieldLabel  = '';
  /** Clamped to 0–3 (4 levels). */
  level       = 0;
  expanded    = false;
  childCount: number | null = null;
  aggregates: DsGroupAggStat[] = [];

  private _params?: AgGroupRowCellParams;

  // Arrow fn so we don't lose `this` when passed to addEventListener.
  private readonly _expandedListener = (): void => {
    if (this._params) {
      this.expanded = this._params.node.expanded;
      this.cdr.markForCheck();
    }
  };

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid ICellRendererAngularComp ─────────────────────────────────────

  agInit(params: AgGroupRowCellParams): void {
    this._params = params;
    this._apply(params);
    params.node.addEventListener('expandedChanged', this._expandedListener);
  }

  refresh(params: AgGroupRowCellParams): boolean {
    this._params = params;
    this._apply(params);
    this.cdr.markForCheck();
    return true;
  }

  ngOnDestroy(): void {
    this._params?.node.removeEventListener('expandedChanged', this._expandedListener);
  }

  // ── Template helpers ─────────────────────────────────────────────────────

  /** Left indent width in px — 24px per nesting level. */
  get indentWidth(): number {
    return this.level * 24;
  }

  onToggle(event: Event): void {
    event.stopPropagation();
    this._params?.node.setExpanded(!this.expanded);
  }

  // ── Private ──────────────────────────────────────────────────────────────

  private _apply(params: AgGroupRowCellParams): void {
    this.value      = params.node.key ?? '';
    this.level      = Math.min(params.node.level, 3);
    this.expanded   = params.node.expanded;
    this.childCount = params.node.allChildrenCount;
    this.fieldLabel = this._resolveFieldLabel(params);
    this.aggregates = this._resolveAggregates(params);
  }

  private _resolveFieldLabel(params: AgGroupRowCellParams): string {
    const field = params.node.field;
    if (!field) { return ''; }
    const headerName = params.api.getColumn(field)?.getColDef()?.headerName;
    if (headerName) { return headerName; }
    // Fallback: capitalise first letter of the raw field name.
    return field.charAt(0).toUpperCase() + field.slice(1);
  }

  private _resolveAggregates(params: AgGroupRowCellParams): DsGroupAggStat[] {
    const aggData = params.node.aggData;
    if (!aggData) { return []; }
    return Object.entries(aggData)
      .filter(([, val]) => val != null)
      .map(([field, val]) => {
        const headerName = params.api.getColumn(field)?.getColDef()?.headerName;
        const label = headerName ?? (field.charAt(0).toUpperCase() + field.slice(1));
        const value = typeof val === 'number'
          ? val.toLocaleString()
          : String(val);
        return { label, value };
      });
  }
}
