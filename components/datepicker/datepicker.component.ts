import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

/**
 * Onflo Design System — Date Picker
 *
 * Single-date field built on Angular Material MatDatepicker.
 * Styled to match ds-input: 42px height, same label, helper, and error token usage.
 * Requires MatDatepickerModule + MatNativeDateModule (or a date adapter module) in
 * the host module or standalone imports.
 *
 * The host <ds-datepicker> element acts as the .ds-datepicker composite wrapper:
 *   - @HostBinding adds ds-datepicker / is-error / is-disabled classes
 *   - data-mouse-focus suppression pattern — keyboard-only focus ring
 *
 * @example
 *   <ds-datepicker label="Appointment date" [(value)]="date" />
 *   <ds-datepicker label="Due date" [minDate]="today" [isError]="true" errorText="Date required" />
 */
@Component({
  selector: 'ds-datepicker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDatepickerComponent implements OnInit {

  // ── Host element bindings ─────────────────────────────────────────────────

  @HostBinding('class.ds-datepicker') readonly hostClass   = true;
  @HostBinding('class.is-error')      get hostError()      { return this.isError; }
  @HostBinding('class.is-disabled')   get hostDisabled()   { return this.disabled; }

  constructor(private el: ElementRef<HTMLElement>) {}

  // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────

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

  /** Placeholder text shown in the input. Default: 'MM/DD/YYYY' */
  @Input() placeholder = 'MM/DD/YYYY';

  /** Currently selected date. Use [(value)] for two-way binding. */
  @Input() value: Date | null = null;

  /** Minimum selectable date. */
  @Input() minDate: Date | null = null;

  /** Maximum selectable date. */
  @Input() maxDate: Date | null = null;

  /** Helper text shown below the field. */
  @Input() helperText = '';

  /** Error message shown below the field when isError is true. */
  @Input() errorText = '';

  /** Applies error styling and shows errorText. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emits the selected Date (or null) when the value changes. */
  @Output() valueChange = new EventEmitter<Date | null>();

  // ── Internal ──────────────────────────────────────────────────────────────

  private _fieldId = '';
  get fieldId(): string { return this._fieldId; }

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'date';
    this._fieldId = `ds-datepicker-${slug}-${Math.random().toString(36).slice(2)}`;
  }

}
