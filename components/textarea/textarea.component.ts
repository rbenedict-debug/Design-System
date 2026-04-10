import {
  Component, Input, Output, EventEmitter,
  ElementRef, HostListener, HostBinding,
  ChangeDetectionStrategy, ChangeDetectorRef,
  OnInit, OnDestroy,
  Renderer2, NgZone,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Onflo Design System — Textarea
 *
 * Based on Angular Material mat-form-field + matInput (appearance="outline", textarea).
 * Import MatFormFieldModule + MatInputModule in your Angular module.
 *
 * No fixed height — resizable via the custom drag handle in the bottom-right corner,
 * matching ds-rich-text-editor resize behaviour. Use ds-input for single-line fields.
 *
 * The host <ds-textarea> element acts as the .ds-textarea composite wrapper:
 *   - @HostBinding adds ds-textarea / is-error / is-disabled / is-readonly classes
 *   - data-mouse-focus suppression pattern (same as ds-input) — keyboard-only focus ring
 *
 * @example
 *   <ds-textarea label="Notes" placeholder="Add notes..." [(value)]="notes" />
 *   <ds-textarea label="Description" [isError]="true" errorText="Required field" />
 */
@Component({
  selector: 'ds-textarea',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTextareaComponent implements OnInit, OnDestroy {

  // ── Host element bindings ─────────────────────────────────────────────────

  @HostBinding('class.ds-textarea')  readonly hostClass    = true;
  @HostBinding('class.is-error')     get hostError()       { return this.isError; }
  @HostBinding('class.is-disabled')  get hostDisabled()    { return this.disabled; }
  @HostBinding('class.is-readonly')  get hostReadonly()    { return this.readOnly; }
  @HostBinding('class.is-resizing')  get hostResizing()    { return this._isResizing; }

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
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

  /** Marks the field as required (adds asterisk to label). */
  @Input() required = false;

  /** Placeholder text. */
  @Input() placeholder = '';

  /** Current value. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Number of rows. Default: 4 */
  @Input() rows = 4;

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
  @Output() valueChange = new EventEmitter<string>();

  // ── Internal ──────────────────────────────────────────────────────────────

  private _textareaId  = '';
  private _isResizing  = false;
  private _resizeCleanup: (() => void) | null = null;

  get textareaId(): string { return this._textareaId; }

  ngOnInit(): void {
    const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
    this._textareaId = `ds-textarea-${slug}-${Math.random().toString(36).slice(2)}`;
  }

  ngOnDestroy(): void {
    this._resizeCleanup?.();
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.valueChange.emit(this.value);
  }

  // ── Resize handle ──────────────────────────────────────────────────────────

  /** Starts a JS-based vertical resize on mousedown of the resize handle. */
  onResizeStart(event: MouseEvent): void {
    event.preventDefault();

    const textareaEl = this.el.nativeElement.querySelector('textarea') as HTMLTextAreaElement | null;
    if (!textareaEl) return;

    const startY      = event.clientY;
    const startHeight = textareaEl.offsetHeight;

    this._isResizing = true;
    this.cdr.markForCheck();

    this.ngZone.runOutsideAngular(() => {
      const onMove = (e: MouseEvent) => {
        const newHeight = Math.max(80, startHeight + (e.clientY - startY));
        this.renderer.setStyle(textareaEl, 'height', `${newHeight}px`);
      };

      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup',   onUp);
        this.ngZone.run(() => {
          this._isResizing = false;
          this.cdr.markForCheck();
        });
      };

      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup',   onUp);

      this._resizeCleanup = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup',   onUp);
      };
    });
  }
}
