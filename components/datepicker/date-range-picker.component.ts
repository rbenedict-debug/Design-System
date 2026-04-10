import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

export interface DsDateRange {
  start: Date | null;
  end: Date | null;
}

/**
 * Onflo Design System — Date Range Picker
 *
 * Two-date range field built on Angular Material MatDateRangePicker.
 * Displays start – end date inputs in a single 42px field, styled to match
 * ds-input. Requires MatDatepickerModule + MatNativeDateModule in the host module.
 *
 * The host <ds-date-range-picker> element acts as the .ds-date-range-picker wrapper:
 *   - @HostBinding adds ds-date-range-picker / is-error / is-disabled classes
 *   - data-mouse-focus suppression pattern — keyboard-only focus ring
 *
 * @example
 *   <ds-date-range-picker label="Stay dates"
 *     [(startDate)]="checkIn" [(endDate)]="checkOut" />
 *   <ds-date-range-picker label="Report period"
 *     [isError]="true" errorText="Date range required" />
 */
@Component({
  selector: 'ds-date-range-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDateRangePickerComponent implements OnInit {

  // ── Host element bindings ─────────────────────────────────────────────────

  @HostBinding('class.ds-date-range-picker') readonly hostClass   = true;
  @HostBinding('class.is-error')             get hostError()      { return this.isError; }
  @HostBinding('class.is-disabled')          get hostDisabled()   { return this.disabled; }

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

  /** Marks the field as required. */
  @Input() required = false;

  /** Placeholder for the start date input. */
  @Input() startPlaceholder = 'Start date';

  /** Placeholder for the end date input. */
  @Input() endPlaceholder = 'End date';

  /** Currently selected start date. Use [(startDate)] for two-way binding. */
  @Input() startDate: Date | null = null;

  /** Currently selected end date. Use [(endDate)] for two-way binding. */
  @Input() endDate: Date | null = null;

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

  /** Emits the new start date when it changes. */
  @Output() startDateChange = new EventEmitter<Date | null>();

  /** Emits the new end date when it changes. */
  @Output() endDateChange = new EventEmitter<Date | null>();

  /** Emits a {start, end} object whenever either date changes. */
  @Output() rangeChange = new EventEmitter<DsDateRange>();

  // ── Internal ──────────────────────────────────────────────────────────────

  private _startId = '';
  private _endId   = '';
  get startId(): string { return this._startId; }
  get endId():   string { return this._endId; }

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'date-range';
    const uid  = Math.random().toString(36).slice(2);
    this._startId = `ds-date-range-start-${slug}-${uid}`;
    this._endId   = `ds-date-range-end-${slug}-${uid}`;
  }

  onStartDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.startDate = event.value;
    this.startDateChange.emit(this.startDate);
    this.rangeChange.emit({ start: this.startDate, end: this.endDate });
  }

  onEndDateChange(event: MatDatepickerInputEvent<Date>): void {
    this.endDate = event.value;
    this.endDateChange.emit(this.endDate);
    this.rangeChange.emit({ start: this.startDate, end: this.endDate });
  }
}
