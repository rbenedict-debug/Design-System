import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule, MatCheckboxChange } from '@angular/material/checkbox';

/**
 * Onflo Design System — Checkbox
 *
 * A standalone Angular component wrapping the ds-checkbox CSS class API.
 * For direct class usage without Angular:
 *   <label class="ds-checkbox">
 *     <input type="checkbox" class="ds-checkbox__control" />
 *     <span class="ds-checkbox__box"></span>
 *     <span class="ds-checkbox__label">Label</span>
 *   </label>
 *
 * @example
 *   <ds-checkbox label="Remember me" [(checked)]="remember" />
 *   <ds-checkbox label="Select all" [indeterminate]="someSelected" [(checked)]="allSelected" />
 *   <ds-checkbox label="Accept terms" [isError]="true" />
 */
@Component({
  selector: 'ds-checkbox',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCheckboxComponent {
  /** Label text displayed next to the checkbox. */
  @Input() label = '';

  /** Whether the checkbox is checked. Use [(checked)] for two-way binding. */
  @Input() checked = false;

  /** Indeterminate state (partially selected). */
  @Input() indeterminate = false;

  /** Applies error styling. */
  @Input() isError = false;

  /** Disables the checkbox. */
  @Input() disabled = false;

  /** Emits the new checked value when toggled. */
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: MatCheckboxChange): void {
    this.checked = event.checked;
    this.checkedChange.emit(this.checked);
  }
}
