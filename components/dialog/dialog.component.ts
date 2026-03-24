/**
 * ds-dialog
 *
 * Based on Angular Material mat-dialog.
 * Import MatDialogModule in your Angular module.
 *
 * In Angular use MatDialog.open() to open dialogs programmatically.
 * The SCSS classes can theme the MatDialog panel directly.
 *
 * @example
 * // In your component:
 * this.dialog.open(MyDialogComponent, { panelClass: 'ds-dialog' });
 *
 * // Or static HTML demo:
 * <div class="ds-dialog-backdrop">
 *   <div class="ds-dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
 *     <div class="ds-dialog__header">...</div>
 *     <div class="ds-dialog__content">...</div>
 *     <div class="ds-dialog__actions">...</div>
 *   </div>
 * </div>
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDialogComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon?: string;
  @Input() iconVariant: 'default' | 'error' | 'warning' | 'success' | 'info' = 'default';
  @Input() align: 'left' | 'center' = 'left';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
