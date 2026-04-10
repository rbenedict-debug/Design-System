import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ElementRef,
  Renderer2,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Onflo Design System — Rich Text Editor
 *
 * A full-featured rich text editor using CKEditor 5 as the content engine,
 * skinned to the Onflo token system. The component provides its own toolbar
 * (Bold, Italic, Underline, Remove Formatting, Link, Bulleted List, Numbered
 * List) and suppresses CKEditor's built-in toolbar chrome.
 *
 * ─── Required npm packages (install in the consuming app) ───────────────────
 *   npm install @ckeditor/ckeditor5-angular @ckeditor/ckeditor5-build-classic
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Then uncomment the CKEditor imports below before using this component.
 *
 * Features:
 *   • Configurable placeholder text
 *   • Keyboard-accessible toolbar buttons with aria-pressed active states
 *   • Optional bottom-right drag-resize handle ([showResize])
 *   • Optional expand button ([showExpand]) — opens a larger modal editor
 *     that syncs content back on close
 *   • Error / disabled / focused states
 *   • Escape closes the expand modal
 *
 * Usage:
 *   <ds-rich-text-editor
 *     label="Message"
 *     placeholder="Type your message…"
 *     [(value)]="body"
 *     [showResize]="true"
 *     [showExpand]="true"
 *     style="height: 240px;"
 *   />
 *
 * ADA:
 *   • [label] wires aria-labelledby on the CKEditor editable region
 *   • Toolbar buttons have aria-label + aria-pressed
 *   • Expand modal: role="dialog" + aria-modal="true"; Escape closes
 *   • Focus returned to expand button on modal close
 *
 * Not an Angular Material component — no mat-form-field wrapper.
 */

// ── CKEditor imports ─────────────────────────────────────────────────────────
// Uncomment after installing @ckeditor/ckeditor5-angular and
// @ckeditor/ckeditor5-build-classic:
//
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

let rteIdCounter = 0;

@Component({
  selector: 'ds-rich-text-editor',
  standalone: true,
  imports: [
    CommonModule,
    // CKEditorModule,  ← uncomment after installing CKEditor packages
  ],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsRichTextEditorComponent implements OnInit, OnDestroy {

  // ── Host element bindings ──────────────────────────────────────────────────
  @HostBinding('class.ds-rich-text-editor') readonly hostClass  = true;
  @HostBinding('class.is-focused')   get hostFocused()   { return this.isFocused; }
  @HostBinding('class.is-error')     get hostError()     { return this.isError; }
  @HostBinding('class.is-disabled')  get hostDisabled()  { return this.disabled; }
  @HostBinding('class.is-resizing')  get hostResizing()  { return this._isResizing; }

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {
    this.editorId = `ds-rte-${++rteIdCounter}`;
  }

  // ── Inputs ─────────────────────────────────────────────────────────────────
  /** Accessible label rendered above the editor and linked via aria-labelledby. */
  @Input() label = '';

  /** Required marker — adds * to the label. */
  @Input() required = false;

  /** Placeholder text shown when the editor is empty. */
  @Input() placeholder = 'Type here…';

  /** Current HTML content. Use [(value)] for two-way binding. */
  @Input() value = '';

  /** Helper text shown below the shell. */
  @Input() helperText = '';

  /** Error message shown below the shell when isError is true. */
  @Input() errorText = '';

  /** Applies the error border and shows errorText. */
  @Input() isError = false;

  /** Disables the editor and toolbar. */
  @Input() disabled = false;

  /** Show the drag-resize handle in the bottom-right corner. Default true. */
  @Input() showResize = true;

  /** Show the expand button that opens a larger modal editor. Default true. */
  @Input() showExpand = true;

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emits the new HTML string on every content change. */
  @Output() valueChange = new EventEmitter<string>();

  // ── Internal ───────────────────────────────────────────────────────────────
  readonly editorId: string;

  // Uncomment after installing CKEditor:
  // readonly Editor = ClassicEditor;

  editorInstance:         any = null;
  expandedEditorInstance: any = null;

  isFocused    = false;
  isExpanded   = false;
  expandedValue = '';

  // Toolbar active states (updated from CKEditor command values)
  isBold         = false;
  isItalic       = false;
  isUnderline    = false;
  isBulletedList = false;
  isNumberedList = false;

  private _isResizing    = false;
  private _resizeCleanup: (() => void) | null = null;
  private _expandBtnEl:   HTMLElement | null = null;

  ngOnInit(): void {
    // Height defaults — host can be given an explicit height via [style.height]
    // or the parent can control it; no default height set here.
  }

  ngOnDestroy(): void {
    this._resizeCleanup?.();
  }

  // ── CKEditor configuration ─────────────────────────────────────────────────
  get editorConfig() {
    return {
      // Empty items — we suppress CKEditor's native toolbar via CSS
      toolbar: { items: [] },
      placeholder: this.placeholder,
      language: 'en',
    };
  }

  // ── CKEditor event handlers ────────────────────────────────────────────────

  /** Called when the main editor instance is ready. */
  onEditorReady(editor: any): void {
    this.editorInstance = editor;

    // Wire aria-labelledby on CKEditor's contenteditable region
    if (this.label) {
      const editableEl = editor.ui?.view?.editable?.element as HTMLElement | undefined;
      if (editableEl) {
        editableEl.setAttribute('aria-labelledby', `${this.editorId}-label`);
      }
    }

    // Track command active states on every document change
    editor.model.document.on('change', () => {
      this.ngZone.run(() => this._syncToolbarState(editor));
    });

    this.cdr.markForCheck();
  }

  /** Called when the main editor content changes. */
  onEditorChange({ editor }: { editor: any }): void {
    const data = editor.getData() as string;
    this.value = data;
    this.valueChange.emit(data);
  }

  /** Called when the main editor gains focus. */
  onEditorFocus(_payload: any): void {
    this.isFocused = true;
    this.cdr.markForCheck();
  }

  /** Called when the main editor loses focus. */
  onEditorBlur(_payload: any): void {
    this.isFocused = false;
    this.cdr.markForCheck();
  }

  // ── Expanded editor handlers ───────────────────────────────────────────────

  /** Called when the expanded modal editor is ready. */
  onExpandedEditorReady(editor: any): void {
    this.expandedEditorInstance = editor;

    if (this.label) {
      const editableEl = editor.ui?.view?.editable?.element as HTMLElement | undefined;
      if (editableEl) {
        editableEl.setAttribute('aria-labelledby', `${this.editorId}-label`);
      }
    }

    editor.model.document.on('change', () => {
      this.ngZone.run(() => this._syncToolbarState(editor));
    });

    // Move focus to the editor when modal opens
    editor.editing?.view?.focus();
  }

  /** Called when the expanded editor content changes. */
  onExpandedEditorChange({ editor }: { editor: any }): void {
    this.expandedValue = editor.getData() as string;
  }

  // ── Toolbar commands ───────────────────────────────────────────────────────

  /**
   * Execute a CKEditor command by name.
   * @param command  e.g. 'bold', 'italic', 'underline', 'removeFormat',
   *                      'link', 'bulletedList', 'numberedList'
   * @param expanded When true, targets the expanded modal editor.
   */
  execCommand(command: string, expanded = false): void {
    const editor = expanded ? this.expandedEditorInstance : this.editorInstance;
    if (!editor) return;

    editor.execute(command);
    editor.editing?.view?.focus();
    this._syncToolbarState(editor);
    this.cdr.markForCheck();
  }

  private _syncToolbarState(editor: any): void {
    this.isBold         = !!(editor.commands?.get('bold')?.value);
    this.isItalic       = !!(editor.commands?.get('italic')?.value);
    this.isUnderline    = !!(editor.commands?.get('underline')?.value);
    this.isBulletedList = !!(editor.commands?.get('bulletedList')?.value);
    this.isNumberedList = !!(editor.commands?.get('numberedList')?.value);
    this.cdr.markForCheck();
  }

  // ── Expand / collapse ──────────────────────────────────────────────────────

  /** Opens the expanded modal editor. */
  expand(triggerEl?: HTMLElement): void {
    this._expandBtnEl = triggerEl ?? null;
    this.expandedValue = this.editorInstance?.getData() ?? this.value;
    // Reset expanded toolbar state to match current content
    this.isBold = this.isItalic = this.isUnderline
                = this.isBulletedList = this.isNumberedList = false;
    this.isExpanded = true;
    this.cdr.markForCheck();
  }

  /** Closes the expanded modal editor, syncing content back to the main editor. */
  closeExpand(): void {
    if (this.expandedEditorInstance) {
      const newData = this.expandedEditorInstance.getData() as string;
      this.value = newData;
      this.valueChange.emit(newData);
      this.editorInstance?.setData?.(newData);
    }
    this.isExpanded = false;
    this.cdr.markForCheck();

    // Return focus to the button that opened the modal
    this._expandBtnEl?.focus();
    this._expandBtnEl = null;
  }

  /** Escape key closes the expand modal (bubbles from host). */
  @HostListener('keydown.escape', ['$event'])
  onEscape(event: Event): void {
    if (this.isExpanded) {
      event.stopPropagation();
      this.closeExpand();
    }
  }

  // ── Resize handle ──────────────────────────────────────────────────────────

  /** Starts a JS-based vertical resize on mousedown of the resize handle. */
  onResizeStart(event: MouseEvent): void {
    event.preventDefault();

    const hostEl      = this.el.nativeElement;
    const startY      = event.clientY;
    const startHeight = hostEl.offsetHeight;

    this._isResizing = true;
    this.cdr.markForCheck();

    this.ngZone.runOutsideAngular(() => {
      const onMove = (e: MouseEvent) => {
        const newHeight = Math.max(120, startHeight + (e.clientY - startY));
        this.renderer.setStyle(hostEl, 'height', `${newHeight}px`);
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
