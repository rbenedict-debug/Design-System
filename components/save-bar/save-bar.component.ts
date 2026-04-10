import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsButtonComponent } from '../button/button.component';

export type DsSaveBarVariant = 'default' | 'error';

/**
 * Onflo Design System — Save Bar
 *
 * Persistent bar that appears when a user has unsaved changes. Provides
 * Cancel, Save Progress, and Save and Exit actions. Use when a form or
 * settings page has unsaved changes that require explicit save or discard.
 * Do not use when changes auto-save.
 *
 * Default variant: blue border, info dot — "You have unsaved changes"
 * Error variant: red border, error dot — "Required information missing"
 *
 * ADA: announces its appearance via role="status" (default) / role="alert" (error).
 *
 * @example
 *   <ds-save-bar
 *     (cancelClick)="onCancel()"
 *     (saveProgressClick)="onSaveProgress()"
 *     (saveAndExitClick)="onSaveAndExit()" />
 *
 *   <ds-save-bar
 *     variant="error"
 *     message="Please complete all required fields."
 *     (cancelClick)="onCancel()"
 *     (saveProgressClick)="onSaveProgress()"
 *     (saveAndExitClick)="onSaveAndExit()" />
 */
@Component({
  selector: 'ds-save-bar',
  standalone: true,
  imports: [CommonModule, DsButtonComponent],
  templateUrl: './save-bar.component.html',
  styleUrls: ['./save-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSaveBarComponent {
  /** Visual/semantic variant. Default: 'default' */
  @Input() variant: DsSaveBarVariant = 'default';

  /** Message text. Falls back to the variant default if not provided. */
  @Input() message = '';

  /** Cancel button label. */
  @Input() cancelLabel = 'Cancel';

  /** Save Progress button label. */
  @Input() saveProgressLabel = 'Save Progress';

  /** Save and Exit button label. */
  @Input() saveAndExitLabel = 'Save and Exit';

  /** Emits when Cancel is clicked. */
  @Output() cancelClick = new EventEmitter<void>();

  /** Emits when Save Progress is clicked. */
  @Output() saveProgressClick = new EventEmitter<void>();

  /** Emits when Save and Exit is clicked. */
  @Output() saveAndExitClick = new EventEmitter<void>();

  get hostClass(): string {
    return this.variant === 'error'
      ? 'ds-save-bar ds-save-bar--error'
      : 'ds-save-bar';
  }

  get role(): string {
    return this.variant === 'error' ? 'alert' : 'status';
  }

  get displayMessage(): string {
    if (this.message) return this.message;
    return this.variant === 'error'
      ? 'Required information missing'
      : 'You have unsaved changes';
  }

  onCancel(): void {
    this.cancelClick.emit();
  }

  onSaveProgress(): void {
    this.saveProgressClick.emit();
  }

  onSaveAndExit(): void {
    this.saveAndExitClick.emit();
  }
}
