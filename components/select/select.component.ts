import {
  Component, Input, Output, EventEmitter,
  ElementRef, ViewChild, HostListener, HostBinding,
  ChangeDetectionStrategy, OnInit, ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { DsMenuComponent } from '../menu/menu.component';

export interface DsSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Onflo Design System — Select / Dropdown (combobox)
 *
 * Based on Angular Material mat-form-field + matInput (appearance="outline").
 * The dropdown panel uses ds-menu with the single-select checkmark pattern.
 * Users can type to filter options or click to browse — matching standard
 * combobox / autocomplete behaviour.
 *
 * Import MatFormFieldModule + MatInputModule + MatMenuModule in your module.
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
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatMenuModule, DsMenuComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSelectComponent implements OnInit {

  // ── Host element bindings ─────────────────────────────────────────────────

  @HostBinding('class.ds-select')   readonly hostClass   = true;
  @HostBinding('class.is-error')    get hostError()      { return this.isError; }
  @HostBinding('class.is-disabled') get hostDisabled()   { return this.disabled; }

  constructor(
    private el: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
  ) {}

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

  /** Placeholder option text. */
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

  /** Emits new value when selection changes. */
  @Output() valueChange = new EventEmitter<string>();

  // ── Internal ──────────────────────────────────────────────────────────────

  @ViewChild('selectInput') inputRef!: ElementRef<HTMLInputElement>;

  menuOpen = false;
  filterText = '';

  private _selectId = '';
  get selectId(): string { return this._selectId; }

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
    this._selectId = `ds-select-${slug}-${Math.random().toString(36).slice(2)}`;
  }

  get selectedLabel(): string {
    return this.options.find(o => o.value === this.value)?.label ?? '';
  }

  /** Placeholder shown in the input: selected label when closed, hint when open. */
  get inputPlaceholder(): string {
    if (this.menuOpen) return this.selectedLabel || this.placeholder;
    return this.placeholder;
  }

  /** Options filtered by what the user has typed. */
  get filteredOptions(): DsSelectOption[] {
    if (!this.filterText) return this.options;
    const q = this.filterText.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  onMenuOpened(): void {
    this.menuOpen = true;
    this.filterText = '';
    // Clear input so user can start typing to filter
    if (this.inputRef) this.inputRef.nativeElement.value = '';
    this.cdr.markForCheck();
  }

  onMenuClosed(): void {
    this.menuOpen = false;
    this.filterText = '';
    // Restore selected label in the input
    if (this.inputRef) this.inputRef.nativeElement.value = this.selectedLabel;
    this.cdr.markForCheck();
  }

  onInput(event: Event): void {
    this.filterText = (event.target as HTMLInputElement).value;
    this.cdr.markForCheck();
  }

  onOptionSelect(opt: DsSelectOption): void {
    if (opt.disabled) return;
    this.value = opt.value;
    this.filterText = '';
    this.valueChange.emit(this.value);
    // Input will be updated via onMenuClosed
  }
}
