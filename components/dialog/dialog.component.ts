import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsDialogAlign = 'left' | 'center';

/**
 * Onflo Design System — Dialog
 *
 * A focused overlay for confirmations, forms, and alerts.
 * All body content is projected via the [dialog-body] slot;
 * action buttons are projected via [dialog-actions].
 * Pair with a backdrop when rendering outside MatDialog.
 *
 * ADA: Focus must be trapped while open (use Angular CDK FocusTrap or
 * MatDialog). Escape dismisses — caller handles close logic. Focus returns
 * to trigger on close. Set titleId to wire up aria-labelledby to the heading
 * inside the body slot.
 *
 * @example
 *   <!-- Angular component -->
 *   <ds-dialog titleId="confirm-dlg" align="left">
 *     <div dialog-body>
 *       <h2 class="ds-dialog__title" id="confirm-dlg">Confirm delete?</h2>
 *       <p class="ds-dialog__text">This action cannot be undone.</p>
 *     </div>
 *     <div dialog-actions>
 *       <ds-button variant="text" (clicked)="close()">Cancel</ds-button>
 *       <ds-button variant="filled" (clicked)="delete()">Delete</ds-button>
 *     </div>
 *   </ds-dialog>
 *
 *   <!-- Via MatDialog service -->
 *   this.dialog.open(MyDialogComponent, {
 *     panelClass: 'ds-dialog-overlay',
 *   });
 */
@Component({
  selector: 'ds-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDialogComponent {
  /** Text alignment of the body and actions row. Default: 'left'. */
  @Input() align: DsDialogAlign = 'left';

  /** Whether to render the divider line between body and actions. Default: true. */
  @Input() showDivider = true;

  /** ID of the heading element inside [dialog-body] — wired to aria-labelledby. */
  @Input() titleId?: string;
}
