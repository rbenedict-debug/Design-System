import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsButtonVariant =
  | 'filled'
  | 'outlined'
  | 'text'
  | 'destructive'
  | 'destructive-outlined';

export type DsButtonSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Onflo Design System — Button
 *
 * A standalone Angular component wrapping the ds-button CSS class API.
 * For direct class usage without the Angular component, use:
 *   <button class="ds-button ds-button--filled">Label</button>
 *
 * @example
 *   <ds-button variant="filled" (clicked)="onSave()">Save</ds-button>
 *   <ds-button variant="outlined" size="sm" [disabled]="true">Cancel</ds-button>
 *   <ds-button variant="destructive">Delete</ds-button>
 */
@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class DsButtonComponent {
  /** Visual style. Default: 'filled' */
  @Input() variant: DsButtonVariant = 'filled';

  /** Size scale. Default: 'md' */
  @Input() size: DsButtonSize = 'md';

  /** Disables the button and applies disabled styling. */
  @Input() disabled = false;

  /** Native button type attribute. Default: 'button' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Emits the native MouseEvent when the button is clicked. */
  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return [
      'ds-button',
      `ds-button--${this.variant}`,
      `ds-button--${this.size}`,
    ].join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
