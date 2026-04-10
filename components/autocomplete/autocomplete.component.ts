import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy, OnInit, OnChanges, OnDestroy, SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { Subscription } from 'rxjs';

/**
 * Onflo Design System — Autocomplete
 *
 * Wraps a matInput with matAutocomplete support. Visually identical to
 * ds-input (42px, same label / helper / error token pattern). The consumer
 * owns the <mat-autocomplete> panel and all filtering logic — this component
 * provides only the input field chrome and the panel connection.
 *
 * The host <ds-autocomplete> element acts as the .ds-autocomplete composite wrapper:
 *   - @HostBinding adds ds-autocomplete / is-error / is-disabled classes
 *   - data-mouse-focus suppression pattern — keyboard-only focus ring
 *
 * @example
 *   <!-- Consumer template -->
 *   <mat-autocomplete #auto (optionSelected)="onSelect($event)">
 *     <mat-option *ngFor="let opt of filtered" [value]="opt">{{ opt }}</mat-option>
 *   </mat-autocomplete>
 *
 *   <ds-autocomplete
 *     label="Search"
 *     [panel]="auto"
 *     [value]="query"
 *     (valueChange)="filter($event)"
 *   />
 */
@Component({
  selector: 'ds-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAutocompleteComponent implements OnInit, OnChanges, OnDestroy {

  // ── Host element bindings ─────────────────────────────────────────────────

  @HostBinding('class.ds-autocomplete')  readonly hostClass  = true;
  @HostBinding('class.is-error')         get hostError()     { return this.isError; }
  @HostBinding('class.is-disabled')      get hostDisabled()  { return this.disabled; }

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

  /** Placeholder shown inside the input. */
  @Input() placeholder = '';

  /** Current input value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Helper text shown below the field. */
  @Input() helperText = '';

  /** Error message shown below the field when isError is true. */
  @Input() errorText = '';

  /** Applies error styling and shows errorText. */
  @Input() isError = false;

  /** Disables the field. */
  @Input() disabled = false;

  /** Makes the field read-only (no typing, no autocomplete panel). */
  @Input() readonly = false;

  /**
   * The MatAutocomplete panel created by the consumer.
   * Required — wire up a <mat-autocomplete #auto> in your template
   * and pass the ref: [panel]="auto".
   */
  @Input() panel!: MatAutocomplete;

  // ── Outputs ───────────────────────────────────────────────────────────────

  /** Emits the raw string value on every keystroke. */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Forwarded from panel.optionSelected — emits when the user picks an option.
   * Also listen directly on your <mat-autocomplete> (optionSelected) if preferred.
   */
  @Output() optionSelected = new EventEmitter<MatAutocompleteSelectedEvent>();

  // ── Internal ──────────────────────────────────────────────────────────────

  private _selectId = '';
  get selectId(): string { return this._selectId; }

  private _panelSub: Subscription | null = null;

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
    this._selectId = `ds-autocomplete-${slug}-${Math.random().toString(36).slice(2)}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['panel']) {
      this._panelSub?.unsubscribe();
      this._panelSub = null;
      if (this.panel) {
        this._panelSub = this.panel.optionSelected.subscribe(
          (event: MatAutocompleteSelectedEvent) => this.optionSelected.emit(event),
        );
      }
    }
  }

  ngOnDestroy(): void {
    this._panelSub?.unsubscribe();
  }

  onInput(event: Event): void {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
