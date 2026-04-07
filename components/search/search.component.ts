import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Onflo Design System — Search Field
 *
 * A search-specific variant of ds-input. The host element carries both
 * ds-input and ds-search classes and role="search", so all ds-input field
 * styles apply without duplication.
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

  // ── Host element bindings ─────────────────────────────────────────────────
  // Applying ds-input alongside ds-search means all ds-input SCSS rules
  // (field border, hover, focus ring, disabled, icon colours, action button)
  // apply automatically — no duplication in _search.scss.

  @HostBinding('class.ds-input')    readonly hostDsInput  = true;
  @HostBinding('class.ds-search')   readonly hostDsSearch = true;
  @HostBinding('attr.role')         readonly hostRole     = 'search';
  @HostBinding('class.is-disabled') get hostDisabled()    { return this.disabled; }

  constructor(private el: ElementRef<HTMLElement>) {}

  // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────
  // Same pattern as DsInputComponent — suppresses the ADA focus ring
  // (box-shadow via :focus-within:not([data-mouse-focus])) when focus
  // was initiated by a pointer device rather than keyboard.

  @HostListener('mousedown')
  @HostListener('touchstart')
  onPointerDown(): void {
    this.el.nativeElement.setAttribute('data-mouse-focus', '');
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.el.nativeElement.removeAttribute('data-mouse-focus');
  }

  // ── Inputs ────────────────────────────────────────────────────────────────

  /** Accessible label for the input. Required for ADA — no visible label is shown. */
  @Input() ariaLabel = 'Search';

  /** Placeholder text shown when the field is empty. */
  @Input() placeholder = 'Search';

  /** Current value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Show the leading search icon. Default: true. */
  @Input() leadingIcon = true;

  /** Disables the field. */
  @Input() disabled = false;

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emits the new value on every keystroke. */
  @Output() valueChange = new EventEmitter<string>();

  /** Emits the current value when the user presses Enter. */
  @Output() search = new EventEmitter<string>();

  /** Emits when the clear button is clicked. */
  @Output() cleared = new EventEmitter<void>();

  // ── Internal ──────────────────────────────────────────────────────────────

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
