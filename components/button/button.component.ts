import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

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
 * Variant → Material directive mapping:
 *   filled              → mat-flat-button
 *   outlined            → mat-stroked-button
 *   text / destructive / destructive-outlined → mat-button
 *
 * @example
 *   <ds-button variant="filled" (clicked)="onSave()">Save</ds-button>
 *   <ds-button variant="outlined" size="sm" [disabled]="true">Cancel</ds-button>
 *   <ds-button variant="destructive">Delete</ds-button>
 */
@Component({
  selector: 'ds-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsButtonComponent {
  /** Visual style. Default: 'filled' */
  @Input() variant: DsButtonVariant = 'filled';

  /** Size scale. Default: 'md' */
  @Input() size: DsButtonSize = 'md';

  /** Disables the button and applies disabled styling. */
  @Input() disabled = false;

  /**
   * Toggle state. When set (true or false), marks this as a toggle button:
   * - Adds `.is-selected` class when true
   * - Binds `aria-pressed` on the native button element
   * Pair with `ds-button-group` wrapper for full toggle group semantics.
   */
  @Input() selected: boolean | null = null;

  /** Native button type attribute. Default: 'button' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Emits the native MouseEvent when the button is clicked. */
  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const base = `ds-button ds-button--${this.variant} ds-button--${this.size}`;
    return this.selected === true ? `${base} is-selected` : base;
  }

  /** Returns 'true'/'false' when this is a toggle button, null otherwise. */
  get ariaPressed(): 'true' | 'false' | null {
    if (this.selected === null) { return null; }
    return this.selected ? 'true' : 'false';
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
