import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

export type DsIconButtonVariant = 'icon' | 'filled' | 'outlined' | 'monogram';
export type DsIconButtonSize = 'sm' | 'md';

/**
 * Onflo Design System — Icon Button
 *
 * A standalone Angular component wrapping the ds-icon-button CSS class API.
 * For direct class usage without Angular:
 *   <button class="ds-icon-button ds-icon-button--filled" aria-label="Save">
 *     <svg>...</svg>
 *   </button>
 *
 * ⚠️  ADA: Always provide ariaLabel — icon buttons have no visible text.
 *
 * @example
 *   <ds-icon-button variant="filled" ariaLabel="Save">
 *     <svg>...</svg>
 *   </ds-icon-button>
 *
 *   <ds-icon-button variant="outlined" size="sm" [isError]="true" ariaLabel="Alert">
 *     <svg>...</svg>
 *   </ds-icon-button>
 */
@Component({
  selector: 'ds-icon-button',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsIconButtonComponent {
  /** Visual style. Default: 'icon' (ghost) */
  @Input() variant: DsIconButtonVariant = 'icon';

  /** Size scale. Default: 'md' (40px) */
  @Input() size: DsIconButtonSize = 'md';

  /** Accessible label — required for screen readers. No visible text on icon buttons. */
  @Input({ required: true }) ariaLabel!: string;

  /** Applies error styling via .is-error class. */
  @Input() isError = false;

  /** Disables the button and applies disabled styling. */
  @Input() disabled = false;

  /** Native button type attribute. Default: 'button' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Emits the native MouseEvent when the button is clicked. */
  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return [
      'ds-icon-button',
      `ds-icon-button--${this.variant}`,
      this.size === 'sm' ? 'ds-icon-button--sm' : '',
      this.isError ? 'is-error' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.clicked.emit(event);
    }
  }
}
