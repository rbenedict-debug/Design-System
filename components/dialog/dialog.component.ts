/**
 * ds-dialog
 *
 * Based on Angular Material MatDialogModule.
 * Import MatDialogModule in your Angular module.
 *
 * Usage — via service (recommended):
 *   this.dialog.open(MyDialogComponent, {
 *     panelClass: 'ds-dialog',
 *     width: '480px',
 *   });
 *   // Inside MyDialogComponent, inject MatDialogRef and call ref.close()
 *
 * Usage — as a wrapper component launched via service:
 *   this.dialog.open(DsDialogComponent, {
 *     panelClass: 'ds-dialog-overlay',
 *     data: { title: 'Confirm', ... }
 *   });
 *
 * Usage — static HTML (CSS class API, no Angular required):
 *   <div class="ds-dialog-backdrop" role="presentation">
 *     <div class="ds-dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
 *       <div class="ds-dialog__header">...</div>
 *       <div class="ds-dialog__content">...</div>
 *       <div class="ds-dialog__actions">...</div>
 *     </div>
 *   </div>
 */

import {
  Component, Input, Output, EventEmitter,
  ChangeDetectionStrategy, Optional, Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule, MatDialogRef, MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DsDialogData {
  title?: string;
  subtitle?: string;
  icon?: string;
  iconVariant?: 'default' | 'error' | 'warning' | 'success' | 'info';
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

@Component({
  selector: 'ds-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDialogComponent {

  constructor(
    @Optional() private dialogRef: MatDialogRef<DsDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: DsDialogData | null,
  ) {
    // When launched via service, populate inputs from injected data
    if (data) {
      if (data.title       !== undefined) this.title       = data.title;
      if (data.subtitle    !== undefined) this.subtitle    = data.subtitle;
      if (data.icon        !== undefined) this.icon        = data.icon;
      if (data.iconVariant !== undefined) this.iconVariant = data.iconVariant;
      if (data.align       !== undefined) this.align       = data.align;
      if (data.size        !== undefined) this.size        = data.size;
    }
  }

  @Input() title = '';
  @Input() subtitle = '';
  @Input() icon?: string;
  @Input() iconVariant: 'default' | 'error' | 'warning' | 'success' | 'info' = 'default';
  @Input() align: 'left' | 'center' = 'left';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
    this.dialogRef?.close();
  }
}
