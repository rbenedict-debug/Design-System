import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy, OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';

export interface DsSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Onflo Design System — Select / Dropdown
 *
 * Based on Angular Material mat-form-field + mat-select (appearance="outline").
 * mat-select provides role="listbox", keyboard navigation, and screen reader
 * announcements out of the box.
 *
 * The host <ds-select> element acts as the .ds-select composite wrapper:
 *   - @HostBinding adds ds-select / is-error / is-disabled classes
 *   - data-mouse-focus suppression pattern — keyboard-only focus ring
 *
 * @example
 *   <ds-select label="Country" [(value)]="country" [options]="countries" />
 *   <ds-select label="Status" [isError]="true" errorText="Required" />
 */
@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSelectComponent implements OnInit {

  // ── Host element bindings ─────────────────────────────────────────────────

  @HostBinding('class.ds-select')   readonly hostClass   = true;
  @HostBinding('class.is-error')    get hostError()      { return this.isError; }
  @HostBinding('class.is-disabled') get hostDisabled()   { return this.disabled; }

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

  /** Placeholder shown when no option is selected. */
  @Input() placeholder = 'Select an option';

  /** Currently selected value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Options array. */
  @Input() options: DsSelectOption[] = [];

  /** Helper text shown below the field. */
  @Input() helperText = '';

  /** Error message shown below the field when isError is true. */
  @Input() errorText = '';

  /** Applies error styling and shows errorText. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emits the new value string when the selection changes. */
  @Output() valueChange = new EventEmitter<string>();

  // ── Internal ──────────────────────────────────────────────────────────────

  private _selectId = '';
  get selectId(): string { return this._selectId; }

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
    this._selectId = `ds-select-${slug}-${Math.random().toString(36).slice(2)}`;
  }

  onSelectionChange(event: MatSelectChange): void {
    this.value = event.value as string;
    this.valueChange.emit(this.value);
  }
}
