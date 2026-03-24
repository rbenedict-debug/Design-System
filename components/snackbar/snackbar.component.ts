/**
 * ds-snackbar
 *
 * Based on Angular Material MatSnackBar.
 * Import MatSnackBarModule in your Angular module.
 *
 * In Angular, inject MatSnackBar and call snackBar.open() or
 * snackBar.openFromComponent() using a component styled with ds-snackbar classes.
 *
 * @example
 * <div class="ds-snackbar-host">
 *   <div class="ds-snackbar ds-snackbar--success" role="status" aria-live="polite">
 *     <span class="ds-icon ds-snackbar__icon">check_circle</span>
 *     <span class="ds-snackbar__message">Saved successfully.</span>
 *     <button class="ds-snackbar__action">Undo</button>
 *     <button class="ds-snackbar__close" aria-label="Dismiss">
 *       <span class="ds-icon ds-icon--sm">close</span>
 *     </button>
 *   </div>
 * </div>
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSnackbarComponent {
  @Input() message = '';
  @Input() actionLabel = '';
  @Input() variant: 'default' | 'success' | 'error' | 'warning' = 'default';
  @Input() icon?: string;
  @Input() dismissible = true;
  @Output() action = new EventEmitter<void>();
  @Output() dismissed = new EventEmitter<void>();
}
