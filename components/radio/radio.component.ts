import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Onflo Design System — Radio Button
 *
 * A standalone Angular component wrapping the ds-radio CSS class API.
 * For direct class usage without Angular:
 *   <label class="ds-radio">
 *     <input type="radio" class="ds-radio__control" name="group" />
 *     <span class="ds-radio__dot"></span>
 *     <span class="ds-radio__label">Option</span>
 *   </label>
 *
 * @example
 *   <div class="ds-radio-group">
 *     <ds-radio label="Option A" value="a" [selectedValue]="selected" name="plan" (selectedValueChange)="selected = $event" />
 *     <ds-radio label="Option B" value="b" [selectedValue]="selected" name="plan" (selectedValueChange)="selected = $event" />
 *   </div>
 */
@Component({
  selector: 'ds-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class DsRadioComponent {
  /** Label text displayed next to the radio button. */
  @Input() label = '';

  /** The value this radio represents. */
  @Input() value = '';

  /** The currently selected value in the group. */
  @Input() selectedValue = '';

  /** Radio group name — must match across all radios in the group. */
  @Input() name = '';

  /** Applies error styling. */
  @Input() isError = false;

  /** Disables the radio button. */
  @Input() disabled = false;

  /** Emits the new selected value when this radio is selected. */
  @Output() selectedValueChange = new EventEmitter<string>();

  readonly inputId = `ds-radio-${Math.random().toString(36).slice(2)}`;

  get isChecked(): boolean {
    return this.selectedValue === this.value;
  }

  get wrapperClasses(): string {
    return [
      'ds-radio',
      this.isError ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onChange(): void {
    if (!this.disabled) {
      this.selectedValueChange.emit(this.value);
    }
  }
}
