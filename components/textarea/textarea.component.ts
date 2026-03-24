import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Onflo Design System — Textarea
 *
 * A standalone Angular component wrapping the ds-textarea CSS class API.
 * For direct class usage without Angular:
 *   <div class="ds-textarea">
 *     <label class="ds-textarea__label" for="id">Label</label>
 *     <div class="ds-textarea__field">
 *       <textarea id="id" class="ds-textarea__control" rows="4"></textarea>
 *     </div>
 *     <span class="ds-textarea__helper">Helper text</span>
 *   </div>
 *
 * @example
 *   <ds-textarea label="Notes" placeholder="Add notes..." [(value)]="notes" />
 *   <ds-textarea label="Description" [isError]="true" errorText="Required field" />
 */
@Component({
  selector: 'ds-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class DsTextareaComponent {
  /** Label text shown above the field. */
  @Input() label = '';

  /** Marks the field as required. */
  @Input() required = false;

  /** Placeholder text. */
  @Input() placeholder = '';

  /** Current value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Number of rows. Default: 4 */
  @Input() rows = 4;

  /** Helper text shown below the field. */
  @Input() helperText = '';

  /** Error message shown below the field. */
  @Input() errorText = '';

  /** Applies error styling. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  /** Makes the field read-only. */
  @Input() readOnly = false;

  /** Emits the new value on every keystroke. */
  @Output() valueChange = new EventEmitter<string>();

  get textareaId(): string {
    return `ds-textarea-${this.label.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2)}`;
  }

  get wrapperClasses(): string {
    return [
      'ds-textarea',
      this.isError ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
      this.readOnly ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get displayHelper(): string {
    if (this.isError && this.errorText) return this.errorText;
    return this.helperText;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }
}
