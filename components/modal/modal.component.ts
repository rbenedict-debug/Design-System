import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

let modalIdCounter = 0;

/** Marker directive — place on the tabs container projected into the modal tabs slot.
 *  @example <div modal-tabs><ds-tabs>...</ds-tabs></div>
 */
@Directive({ selector: '[modal-tabs]', standalone: true })
export class DsModalTabsDirective {}

/** Marker directive — place on the actions container projected into the modal footer slot.
 *  @example <div modal-actions><ds-button variant="filled">Save</ds-button></div>
 */
@Directive({ selector: '[modal-actions]', standalone: true })
export class DsModalActionsDirective {}

export type DsModalVariant = 'close' | 'collapse';
export type DsModalSize = 'fixed' | 'full';

/**
 * Onflo Design System — Modal
 *
 * A full-featured modal panel with a sticky header, always-scrollable body,
 * optional tabs below the header, and an optional sticky actions footer.
 *
 * Two dismiss variants:
 *   close    — shows a × icon; use when the modal completes or cancels a task
 *   collapse — shows a collapse_content icon; use when minimizing to a tray or sidebar
 *
 * Two sizes:
 *   fixed — 500px wide, centered in the backdrop (default)
 *   full  — fills the full backdrop area (width 100%, height 100%)
 *
 * Content slots (via directives on projected elements):
 *   [modal-tabs]    — tabs row rendered below the header (detected automatically)
 *   [modal-actions] — footer action buttons (detected automatically; omit for no footer)
 *   (default)       — scrollable body content
 *
 * ADA:
 *   role="dialog" + aria-modal="true" on the modal host.
 *   Escape handling and focus trapping are the caller's responsibility
 *   (use Angular CDK FocusTrap or MatDialog for production).
 *   The (dismissClick) output fires on the dismiss button click — caller closes the modal.
 *
 * @example
 *   <ds-modal title="Edit Profile" subtitle="Update your account details"
 *             variant="close" size="fixed"
 *             (dismissClick)="closeModal()">
 *
 *     <!-- Optional tabs -->
 *     <div modal-tabs>
 *       <ds-tabs>
 *         <ds-tab label="Details" [active]="true" />
 *         <ds-tab label="Settings" />
 *       </ds-tabs>
 *     </div>
 *
 *     <!-- Scrollable body (no padding — add your own inside) -->
 *     <div style="padding: 16px;">
 *       <p>Profile form content goes here.</p>
 *     </div>
 *
 *     <!-- Optional actions footer -->
 *     <div modal-actions>
 *       <ds-button variant="text" (clicked)="closeModal()">Cancel</ds-button>
 *       <ds-button variant="filled" (clicked)="save()">Save</ds-button>
 *     </div>
 *
 *   </ds-modal>
 */
@Component({
  selector: 'ds-modal',
  standalone: true,
  imports: [CommonModule, DsModalTabsDirective, DsModalActionsDirective],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsModalComponent implements AfterContentInit {
  /** Modal heading — always visible in the sticky header. */
  @Input() title = '';

  /** Optional subtext below the title (body-medium style). */
  @Input() subtitle = '';

  /** Dismiss button icon variant. 'close' shows ×; 'collapse' shows collapse_content. */
  @Input() variant: DsModalVariant = 'close';

  /** Width mode. 'fixed' = 500px; 'full' = fills backdrop. */
  @Input() size: DsModalSize = 'fixed';

  /** Emits when the dismiss (close / collapse) button is clicked. */
  @Output() dismissClick = new EventEmitter<void>();

  @ContentChild(DsModalTabsDirective) private _tabsRef?: DsModalTabsDirective;
  @ContentChild(DsModalActionsDirective) private _actionsRef?: DsModalActionsDirective;

  hasTabs = false;
  hasActions = false;

  /** Unique ID for aria-labelledby wiring. */
  readonly titleId: string;

  constructor(private cdr: ChangeDetectorRef) {
    this.titleId = `ds-modal-title-${++modalIdCounter}`;
  }

  ngAfterContentInit(): void {
    this.hasTabs = !!this._tabsRef;
    this.hasActions = !!this._actionsRef;
    this.cdr.markForCheck();
  }

  onDismiss(): void {
    this.dismissClick.emit();
  }
}
