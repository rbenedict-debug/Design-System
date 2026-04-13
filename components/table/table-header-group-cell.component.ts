/**
 * Onflo Design System — Table Header Group Cell
 *
 * AG Grid custom group header renderer for the Onflo table system.
 * Matches the visual language of DsTableHeaderCellComponent — same height,
 * background, border, and label typography.
 *
 * AG Grid usage (in your gridOptions):
 *   gridOptions = {
 *     defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF,
 *     columnDefs: [
 *       {
 *         headerName: 'Contact',
 *         headerGroupComponent: DsTableHeaderGroupCellComponent, // or via defaultColGroupDef
 *         openByDefault: false,
 *         marryChildren: true,
 *         children: [
 *           { field: 'firstName', headerName: 'First name' },
 *           { field: 'lastName',  headerName: 'Last name'  },
 *         ],
 *       },
 *     ],
 *   };
 *
 * Expandable groups:
 *   Mark some children with columnGroupShow: 'open' so the group
 *   has columns that only appear when expanded. This makes the group
 *   expandable and shows the expand/collapse chevron automatically.
 *
 * Figma: primitive/table-header-group-cell
 * ADA: expand button has aria-label + aria-expanded; role="columnheader" on host.
 */

import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsIconButtonComponent } from '../icon-button/icon-button.component';

/** Minimal interface for AG Grid group header params — avoids hard ag-grid dep. */
export interface AgHeaderGroupParams {
  /** Group display text (respects headerValueGetter on the group def). */
  displayName: string;
  columnGroup: {
    /** Whether the group has columns that can be shown/hidden by expanding/collapsing. */
    isExpandable(): boolean;
    /** Whether the group is currently in an expanded state. */
    isExpanded(): boolean;
    /** The column group definition (headerName, marryChildren, etc.). */
    getColGroupDef(): { headerName?: string; marryChildren?: boolean } | null;
    /**
     * Currently visible leaf columns in this group — useful when implementing
     * group-level resize (resize each leaf proportionally).
     */
    getDisplayedLeafColumns(): Array<{
      getColId(): string;
      getActualWidth(): number;
    }>;
    addEventListener(event: string, listener: () => void): void;
    removeEventListener(event: string, listener: () => void): void;
  };
  /** Call to programmatically expand or collapse the group. */
  setExpanded(expanded: boolean): void;
  /** Show the column group menu (Enterprise). Optional — not all group headers expose this. */
  showColumnMenu?(source: HTMLElement): void;
  /** Set a dynamic tooltip on the group header cell. */
  setTooltip?(value: string, shouldDisplayTooltip?: () => boolean): void;
}

@Component({
  selector: 'ds-table-header-group-cell',
  standalone: true,
  imports: [CommonModule, DsIconButtonComponent],
  templateUrl: './table-header-group-cell.component.html',
  styleUrls: ['./table-header-group-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'columnheader',
    '[attr.aria-expanded]': 'isExpandable ? isExpanded : null',
  },
})
export class DsTableHeaderGroupCellComponent implements OnDestroy {

  /** Group display name — set by agInit. */
  label = '';

  /** Whether the group has expandable/collapsible children. */
  isExpandable = false;

  /** Whether the group is currently expanded. */
  isExpanded = false;

  private agParams?: AgHeaderGroupParams;
  private expandedListener?: () => void;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  // ── AG Grid IHeaderGroupAngularComp interface ───────────────────────────────

  /** Called by AG Grid when this component is the headerGroupComponent. */
  agInit(params: AgHeaderGroupParams): void {
    this.agParams = params;
    this.label = params.displayName;
    this.isExpandable = params.columnGroup.isExpandable();
    this.isExpanded = params.columnGroup.isExpanded();

    this.expandedListener = () => {
      this.isExpanded = params.columnGroup.isExpanded();
      this.cdr.markForCheck();
    };
    params.columnGroup.addEventListener('expandedChanged', this.expandedListener);
  }

  /** Called by AG Grid when the column group definition changes. */
  refresh(params: AgHeaderGroupParams): boolean {
    this.agParams = params;
    this.label = params.displayName;
    this.isExpandable = params.columnGroup.isExpandable();
    this.cdr.markForCheck();
    return true;
  }

  ngOnDestroy(): void {
    if (this.agParams && this.expandedListener) {
      this.agParams.columnGroup.removeEventListener('expandedChanged', this.expandedListener);
    }
  }

  // ── Expand / collapse ───────────────────────────────────────────────────────

  onExpandToggle(): void {
    if (this.agParams) {
      this.agParams.setExpanded(!this.isExpanded);
    }
  }

  get expandAriaLabel(): string {
    return this.isExpanded ? 'Collapse column group' : 'Expand column group';
  }
}
