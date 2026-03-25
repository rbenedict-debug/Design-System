import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'tel'
  | 'url';

/**
 * Onflo Design System — Input Field
 *
 * A standalone Angular component wrapping the ds-input CSS class API.
 * For direct class usage without Angular:
 *   <div class="ds-input">
 *     <label class="ds-input__label" for="id">Label</label>
 *     <div class="ds-input__field">
 *       <input id="id" class="ds-input__control" placeholder="..." />
 *     </div>
 *     <span class="ds-input__helper">Helper text</span>
 *   </div>
 *
 * @example
 *   <ds-input label="Email" placeholder="you@company.com" [(value)]="email" />
 *
 *   <ds-input
 *     label="Search"
 *     leadingIcon="search"
 *     trailingIcon="close"
 *     placeholder="Search..."
 *     [(value)]="query"
 *     (trailingAction)="clearSearch()"
 *   />
 *
 *   <ds-input
 *     label="Amount"
 *     prefix="$"
 *     suffix="USD"
 *     type="number"
 *     [isError]="true"
 *     errorText="Must be a positive number"
 *   />
 */
@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class DsInputComponent {
  private _lastWasMouse = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('mousedown')
  @HostListener('touchstart')
  onPointerDown(): void { this._lastWasMouse = true; }

  @HostListener('keydown')
  onKeyDown(): void { this._lastWasMouse = false; }

  @HostListener('focusin')
  onFocusIn(): void {
    if (this._lastWasMouse) {
      this.elementRef.nativeElement.setAttribute('data-mouse-focus', '');
    }
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.elementRef.nativeElement.removeAttribute('data-mouse-focus');
    this._lastWasMouse = false;
  }

  /** Label text shown above the field. */
  @Input() label = '';

  /** Marks the field as required (adds asterisk to label). */
  @Input() required = false;

  /** Input type. Default: 'text' */
  @Input() type: DsInputType = 'text';

  /** Placeholder text. */
  @Input() placeholder = '';

  /** Current value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Material Symbols icon name for the leading (left) icon. */
  @Input() leadingIcon = '';

  /** Material Symbols icon name for the trailing (right) icon or action. */
  @Input() trailingIcon = '';

  /** Prefix text shown inside the field before the input (e.g. "$"). */
  @Input() prefix = '';

  /** Suffix text shown inside the field after the input (e.g. "USD"). */
  @Input() suffix = '';

  /** Helper text shown below the field. */
  @Input() helperText = '';

  /** Error message shown below the field (replaces helperText when isError). */
  @Input() errorText = '';

  /** Applies error styling and shows errorText. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  /** Makes the field read-only. */
  @Input() readOnly = false;

  /** Emits the new value on every keystroke. */
  @Output() valueChange = new EventEmitter<string>();

  /** Emits when the trailing icon/action button is clicked. */
  @Output() trailingAction = new EventEmitter<void>();

  get wrapperClasses(): string {
    return [
      'ds-input',
      this.isError ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
      this.readOnly ? 'is-readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get inputId(): string {
    return `ds-input-${this.label.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2)}`;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }

  onTrailingAction(): void {
    this.trailingAction.emit();
  }
}
