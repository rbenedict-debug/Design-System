/**
 * ds-snackbar
 *
 * Based on Angular Material MatSnackBar service.
 * Import MatSnackBarModule in your Angular module.
 *
 * Usage — via service (recommended):
 *   const ref = this.snackBar.openFromComponent(DsSnackbarComponent, {
 *     data: { message: 'Saved.', actionLabel: 'Undo', variant: 'success', icon: 'check_circle' },
 *     panelClass: 'ds-snackbar-host',
 *     duration: 4000,
 *   });
 *
 * Usage — directly in template (CSS class API, no service needed):
 *   <ds-snackbar message="Saved successfully." variant="success" />
 *
 * @example
 *   <div class="ds-snackbar-host">
 *     <div class="ds-snackbar ds-snackbar--success" role="status" aria-live="polite">
 *       <span class="ds-icon ds-snackbar__icon">check_circle</span>
 *       <span class="ds-snackbar__message">Saved successfully.</span>
 *       <button class="ds-snackbar__action">Undo</button>
 *       <button class="ds-snackbar__close" aria-label="Dismiss">
 *         <span class="ds-icon ds-icon--sm">close</span>
 *       </button>
 *     </div>
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

export interface DsSnackbarData {
  message?: string;
  actionLabel?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  icon?: string;
  dismissible?: boolean;
}

@Component({
  selector: 'ds-snackbar',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSnackbarComponent {

  constructor(
    @Optional() private snackBarRef: MatSnackBarRef<DsSnackbarComponent>,
    @Optional() @Inject(MAT_SNACK_BAR_DATA) private data: DsSnackbarData | null,
  ) {
    // When launched via service, populate inputs from injected data
    if (data) {
      if (data.message    !== undefined) this.message     = data.message;
      if (data.actionLabel !== undefined) this.actionLabel = data.actionLabel;
      if (data.variant    !== undefined) this.variant     = data.variant;
      if (data.icon       !== undefined) this.icon        = data.icon;
      if (data.dismissible !== undefined) this.dismissible = data.dismissible;
    }
  }

  @Input() message = '';
  @Input() actionLabel = '';
  @Input() variant: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() icon?: string;
  @Input() dismissible = true;

  @Output() action    = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();

  onAction(): void {
    this.action.emit();
    this.snackBarRef?.dismissWithAction();
  }

  onDismiss(): void {
    this.dismissed.emit();
    this.snackBarRef?.dismiss();
  }
}
