import { Component, Input, Output, EventEmitter, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Onflo Design System — Search Field
 *
 * A standalone Angular component for search/filter inputs.
 * Shows a leading search icon and a clear (×) button when the field has a value.
 *
 * ADA: Always provide an ariaLabel. Wire up an aria-live region in the parent
 * to announce result counts as the user types.
 *
 * @example
 *   <ds-search placeholder="Search items..." [(value)]="query" (search)="onSearch($event)" />
 *
 *   <ds-search
 *     ariaLabel="Filter products"
 *     placeholder="Filter by name…"
 *     [leadingIcon]="false"
 *     [(value)]="filter"
 *     (cleared)="resetFilter()"
 *   />
 */
@Component({
  selector: 'ds-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSearchComponent {
  /** Accessible label for the input. Required for ADA — visible label is not shown. */
  @Input() ariaLabel = 'Search';

  /** Placeholder text shown when the field is empty. */
  @Input() placeholder = 'Search';

  /** Current value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Show the leading search icon. Default: true. */
  @Input() leadingIcon = true;

  /** Disables the field. */
  @Input() disabled = false;

  /** Emits the new value on every keystroke. */
  @Output() valueChange = new EventEmitter<string>();

  /** Emits the current value when the user presses Enter. */
  @Output() search = new EventEmitter<string>();

  /** Emits when the clear button is clicked. */
  @Output() cleared = new EventEmitter<void>();

  get wrapperClasses(): string {
    return [
      'ds-search',
      !this.leadingIcon ? 'ds-search--no-icon' : '',
      this.disabled ? 'is-disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get hasValue(): boolean {
    return this.value.length > 0;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search.emit(this.value);
    }
  }

  onClear(): void {
    this.value = '';
    this.valueChange.emit('');
    this.cleared.emit();
  }
}
