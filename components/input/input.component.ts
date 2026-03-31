import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
 * Based on Angular Material mat-form-field + matInput (appearance="outline").
 * Import MatFormFieldModule + MatInputModule in your Angular module.
 *
 * The host <ds-input> element acts as the .ds-input composite wrapper:
 *   - @HostBinding adds ds-input / is-error / is-disabled / is-readonly classes
 *   - data-mouse-focus attribute is set on mousedown/touchstart and removed on
 *     focusout — this is the composite wrapper focus ring suppression pattern.
 *     SCSS uses :focus-within for border-color and
 *     :focus-within:not([data-mouse-focus]) for the box-shadow focus ring only.
 *
 * @example
 *   <ds-input label="Email" placeholder="you@company.com" [(value)]="email" />
 *   <ds-input label="Search" leadingIcon="search" trailingIcon="close"
 *             [(value)]="query" (trailingAction)="clear()" />
 *   <ds-input label="Amount" prefix="$" [isError]="true" errorText="Required" />
 */
@Component({
  selector: 'ds-input',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsInputComponent implements OnInit {

  // ── Host element bindings ─────────────────────────────────────────────────
  // <ds-input> acts as the .ds-input composite wrapper — state classes
  // applied here let existing _input.scss rules (label, helper, icons) match.

  @HostBinding('class.ds-input')    readonly hostClass  = true;
  @HostBinding('class.is-error')    get hostError()     { return this.isError; }
  @HostBinding('class.is-disabled') get hostDisabled()  { return this.disabled; }
  @HostBinding('class.is-readonly') get hostReadonly()  { return this.readOnly; }

  constructor(private el: ElementRef<HTMLElement>) {}

  // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────
  // Set attribute on mousedown/touchstart (fires before focusin) so the SCSS
  // :focus-within:not([data-mouse-focus]) rule never fires for pointer focus.
  // Remove on focusout so keyboard re-focus to this field shows the ring again.

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

  /** Error message shown below the field when isError is true. */
  @Input() errorText = '';

  /** Applies error styling and shows errorText. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  /** Makes the field read-only. */
  @Input() readOnly = false;

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emits the new value on every keystroke. */
  @Output() valueChange    = new EventEmitter<string>();

  /** Emits when the trailing action button is clicked. */
  @Output() trailingAction = new EventEmitter<void>();

  // ── Internal ──────────────────────────────────────────────────────────────

  private _inputId = '';
  get inputId(): string { return this._inputId; }

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
    this._inputId = `ds-input-${slug}-${Math.random().toString(36).slice(2)}`;
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(this.value);
  }

  onTrailingAction(): void {
    this.trailingAction.emit();
  }
}
