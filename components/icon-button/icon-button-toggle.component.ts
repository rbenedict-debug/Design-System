import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsIconButtonToggleVariant =
  | 'icon'
  | 'filled'
  | 'outlined'
  | 'outlined-letter';

export type DsIconButtonToggleSize = 'sm' | 'md';

/**
 * Onflo Design System — Icon Button Toggle
 *
 * A stateful icon button that toggles between selected and unselected states.
 * Extends the ds-icon-button class API with ds-icon-button-toggle.
 *
 * For direct class usage without Angular:
 *   <button
 *     class="ds-icon-button ds-icon-button-toggle ds-icon-button--outlined"
 *     aria-pressed="true"
 *     aria-label="Save"
 *   >
 *     <svg>...</svg>
 *   </button>
 *
 * ⚠️  ADA: Always provide ariaLabel — icon buttons have no visible text.
 *
 * @example
 *   <ds-icon-button-toggle variant="outlined" [(selected)]="isSaved" ariaLabel="Save">
 *     <svg>...</svg>
 *   </ds-icon-button-toggle>
 */
@Component({
  selector: 'ds-icon-button-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon-button-toggle.component.html',
  styleUrls: ['./icon-button-toggle.component.scss'],
})
export class DsIconButtonToggleComponent {
  /** Visual style. Default: 'icon' (ghost) */
  @Input() variant: DsIconButtonToggleVariant = 'icon';

  /** Size scale. Default: 'md' (40px) */
  @Input() size: DsIconButtonToggleSize = 'md';

  /** Accessible label — required for screen readers. */
  @Input() ariaLabel = '';

  /** Whether the toggle is currently selected/pressed. */
  @Input() selected = false;

  /** Disables the button and applies disabled styling. */
  @Input() disabled = false;

  /** Native button type attribute. Default: 'button' */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Emits the new selected state — enables [(selected)] two-way binding. */
  @Output() selectedChange = new EventEmitter<boolean>();

  /** Emits the native MouseEvent when the button is clicked. */
  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return [
      'ds-icon-button',
      'ds-icon-button-toggle',
      `ds-icon-button--${this.variant}`,
      this.size === 'sm' ? 'ds-icon-button--sm' : '',
      this.selected ? 'is-selected' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
      this.clicked.emit(event);
    }
  }
}
