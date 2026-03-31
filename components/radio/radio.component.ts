import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';

/**
 * Onflo Design System — Radio Button
 *
 * Use inside <ds-radio-group> which owns value management via mat-radio-group.
 * For direct class usage without Angular:
 *   <label class="ds-radio">
 *     <input type="radio" class="ds-radio__control" name="group" />
 *     <span class="ds-radio__dot"></span>
 *     <span class="ds-radio__label">Option</span>
 *   </label>
 *
 * @example
 *   <ds-radio-group [(value)]="selected" name="plan">
 *     <ds-radio label="Option A" value="a" />
 *     <ds-radio label="Option B" value="b" />
 *   </ds-radio-group>
 */
@Component({
  selector: 'ds-radio',
  standalone: true,
  imports: [CommonModule, MatRadioModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsRadioComponent {
  /** Label text displayed next to the radio button. */
  @Input() label = '';

  /** The value this radio represents. */
  @Input() value = '';

  /** Applies error styling. */
  @Input() isError = false;

  /** Disables the radio button. */
  @Input() disabled = false;
}

/**
 * Onflo Design System — Radio Group
 *
 * Wraps mat-radio-group to manage selection state across child ds-radio buttons.
 *
 * @example
 *   <ds-radio-group [(value)]="selected" name="plan">
 *     <ds-radio label="Option A" value="a" />
 *     <ds-radio label="Option B" value="b" />
 *   </ds-radio-group>
 */
@Component({
  selector: 'ds-radio-group',
  standalone: true,
  imports: [MatRadioModule],
  template: `
    <mat-radio-group
      class="ds-radio-group"
      [value]="value"
      [name]="name"
      (change)="onChange($event)"
    >
      <ng-content />
    </mat-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsRadioGroupComponent {
  /** Currently selected value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Optional group name — shared across all child radios. */
  @Input() name = '';

  /** Emits the newly selected value. */
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: MatRadioChange): void {
    this.valueChange.emit(event.value);
  }
}
