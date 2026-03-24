import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Onflo Design System — Toggle / Switch
 *
 * A standalone Angular component wrapping the ds-toggle CSS class API.
 * For direct class usage without Angular:
 *   <label class="ds-toggle">
 *     <input type="checkbox" class="ds-toggle__control" />
 *     <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
 *     <span class="ds-toggle__label">Label</span>
 *   </label>
 *
 * @example
 *   <ds-toggle label="Enable notifications" [(checked)]="notificationsOn" />
 *   <ds-toggle label="Dark mode" [(checked)]="darkMode" />
 */
@Component({
  selector: 'ds-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class DsToggleComponent {
  /** Label text displayed next to the toggle. */
  @Input() label = '';

  /** Whether the toggle is on (checked). Use [(checked)] for two-way binding. */
  @Input() checked = false;

  /** Disables the toggle. */
  @Input() disabled = false;

  /** Emits the new checked value when toggled. */
  @Output() checkedChange = new EventEmitter<boolean>();

  readonly inputId = `ds-toggle-${Math.random().toString(36).slice(2)}`;

  get wrapperClasses(): string {
    return [
      'ds-toggle',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
  }
}
