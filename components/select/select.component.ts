import { Component, Input, Output, EventEmitter, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DsSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Onflo Design System — Select / Dropdown
 *
 * A standalone Angular component wrapping the ds-select CSS class API.
 * For direct class usage without Angular:
 *   <div class="ds-select">
 *     <label class="ds-select__label" for="id">Label</label>
 *     <div class="ds-select__field">
 *       <select id="id" class="ds-select__control">
 *         <option value="">Choose one...</option>
 *       </select>
 *       <span class="ds-icon ds-icon--sm ds-select__arrow">expand_more</span>
 *     </div>
 *   </div>
 *
 * @example
 *   <ds-select label="Country" [(value)]="country" [options]="countries" />
 *   <ds-select label="Status" [isError]="true" errorText="Required" />
 */
@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class DsSelectComponent implements OnInit {
  private _lastWasMouse = false;
  private _selectId = '';

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

  /** Marks the field as required. */
  @Input() required = false;

  /** Placeholder option text. Default: '' */
  @Input() placeholder = 'Select an option';

  /** Currently selected value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Options array. */
  @Input() options: DsSelectOption[] = [];

  /** Helper text shown below the field. */
  @Input() helperText = '';

  /** Error message shown below the field. */
  @Input() errorText = '';

  /** Applies error styling. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  /** Emits new value when selection changes. */
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
    this._selectId = `ds-select-${this.label.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).slice(2)}`;
  }

  get selectId(): string {
    return this._selectId;
  }

  get selectHelperId(): string {
    return this.selectId + '-helper';
  }

  get wrapperClasses(): string {
    return [
      'ds-select',
      this.isError ? 'is-error' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get displayHelper(): string {
    if (this.isError && this.errorText) return this.errorText;
    return this.helperText;
  }

  onChange(event: Event): void {
    this.value = (event.target as HTMLSelectElement).value;
    this.valueChange.emit(this.value);
  }
}
