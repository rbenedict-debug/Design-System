/**
 * ds-snackbar
 *
 * Toast notification component backed by Angular Material MatSnackBar service.
 * Always launched at the top-center of the viewport.
 *
 * Service usage (recommended):
 *   const ref = this.snackBar.openFromComponent(DsSnackbarComponent, {
 *     data: {
 *       message:     'Changes saved.',
 *       variant:     'text-only',           // 'text-only' | 'text-action' | 'text-longer-action'
 *       actionLabel: 'Undo',                // required for text-action / text-longer-action
 *       showClose:   false,
 *     },
 *     panelClass:         'ds-snackbar-panel',
 *     duration:           5000,             // omit for action variants that require user input
 *     verticalPosition:   'top',
 *     horizontalPosition: 'center',
 *   });
 *   ref.onAction().subscribe(() => { /* handle action *\/ });
 *
 * Template usage (CSS class API):
 *   <div class="ds-snackbar ds-snackbar--text-action ds-snackbar--has-close"
 *        role="status" aria-live="polite">
 *     <span class="ds-snackbar__message">Item moved to archive.</span>
 *     <button class="ds-button ds-button--filled ds-button--sm" type="button">Undo</button>
 *     <button class="ds-snackbar__close" type="button" aria-label="Dismiss">
 *       <span class="ds-icon ds-icon--sm">close</span>
 *     </button>
 *   </div>
 */

import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, Optional, Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { DsButtonComponent } from '../button/button.component';

export type DsSnackbarVariant = 'text-only' | 'text-action' | 'text-longer-action';

export interface DsSnackbarData {
  message?:     string;
  variant?:     DsSnackbarVariant;
  actionLabel?: string;
  showClose?:   boolean;
}

@Component({
  selector: 'ds-snackbar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, DsButtonComponent],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSnackbarComponent {

  constructor(
    @Optional() private snackBarRef: MatSnackBarRef<DsSnackbarComponent>,
    @Optional() @Inject(MAT_SNACK_BAR_DATA) private data: DsSnackbarData | null,
  ) {
    if (data) {
      if (data.message     !== undefined) this.message     = data.message;
      if (data.variant     !== undefined) this.variant     = data.variant;
      if (data.actionLabel !== undefined) this.actionLabel = data.actionLabel;
      if (data.showClose   !== undefined) this.showClose   = data.showClose;
    }
  }

  @Input() message     = '';
  @Input() variant:    DsSnackbarVariant = 'text-only';
  @Input() actionLabel = '';
  @Input() showClose   = false;

  @Output() action    = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  get hasAction(): boolean {
    return this.variant === 'text-action' || this.variant === 'text-longer-action';
  }

  get isLongerAction(): boolean {
    return this.variant === 'text-longer-action';
  }

  onAction(): void {
    this.action.emit();
    this.snackBarRef?.dismissWithAction();
  }

  onDismiss(): void {
    this.dismissed.emit();
    this.snackBarRef?.dismiss();
  }
}
