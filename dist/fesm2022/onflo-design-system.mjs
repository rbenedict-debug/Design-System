import * as i0 from '@angular/core';
import { signal, Input, ChangeDetectionStrategy, Component, EventEmitter, Output, HostListener, HostBinding, ViewChild, Optional, Inject, Directive, ContentChild, TemplateRef, ContentChildren } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import * as i2$1 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i3 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';
import * as i4 from '@angular/material/menu';
import { MatMenuModule } from '@angular/material/menu';
import * as i1$1 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i1$2 from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import * as i2$2 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i2$3 from '@angular/material/chips';
import { MatChipsModule } from '@angular/material/chips';
import * as i1$3 from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as i2$4 from '@angular/material/divider';
import { MatDividerModule } from '@angular/material/divider';
import * as i1$4 from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import * as i1$5 from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import * as i2$5 from '@angular/material/progress-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import * as i2$6 from '@angular/material/radio';
import { MatRadioModule } from '@angular/material/radio';
import * as i1$6 from '@angular/material/snack-bar';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';
import * as i1$7 from '@angular/material/progress-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as i2$7 from '@angular/material/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import * as i2$8 from '@angular/material/slide-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import * as i1$8 from '@angular/material/tooltip';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * ds-accordion
 *
 * Based on Angular Material mat-expansion-panel inside mat-accordion.
 * Import MatExpansionModule in your Angular module.
 *
 * @example
 * <ds-accordion>
 *   <ds-accordion-panel title="General Settings" icon="settings">
 *     Content here
 *   </ds-accordion-panel>
 *   <ds-accordion-panel title="Notifications" [open]="true">
 *     Content here
 *   </ds-accordion-panel>
 * </ds-accordion>
 */
class DsAccordionPanelComponent {
    title = '';
    icon;
    /** Initial expanded state. mat-expansion-panel owns open/close after first render. */
    set openInput(value) { this.open.set(value); }
    open = signal(false, ...(ngDevMode ? [{ debugName: "open" }] : /* istanbul ignore next */ []));
    toggle() { this.open.set(!this.open()); }
    disabled = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAccordionPanelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsAccordionPanelComponent, isStandalone: true, selector: "ds-accordion-panel", inputs: { title: "title", icon: "icon", openInput: ["open", "openInput"], disabled: "disabled" }, ngImport: i0, template: `
    <mat-expansion-panel
      class="ds-accordion__panel"
      [expanded]="open()"
      [disabled]="disabled"
      [hideToggle]="true"
    >
      <mat-expansion-panel-header
        class="ds-accordion__trigger"
        collapsedHeight="auto"
        expandedHeight="auto"
      >
        <span *ngIf="icon" class="ds-accordion__trigger-icon">{{ icon }}</span>
        <span class="ds-accordion__trigger-label">{{ title }}</span>
        <span class="ds-icon ds-accordion__chevron">expand_more</span>
      </mat-expansion-panel-header>
      <div class="ds-accordion__content">
        <ng-content />
      </div>
    </mat-expansion-panel>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatExpansionModule }, { kind: "component", type: i2.MatExpansionPanel, selector: "mat-expansion-panel", inputs: ["hideToggle", "togglePosition"], outputs: ["afterExpand", "afterCollapse"], exportAs: ["matExpansionPanel"] }, { kind: "component", type: i2.MatExpansionPanelHeader, selector: "mat-expansion-panel-header", inputs: ["expandedHeight", "collapsedHeight", "tabIndex"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAccordionPanelComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ds-accordion-panel',
                    standalone: true,
                    imports: [CommonModule, MatExpansionModule],
                    template: `
    <mat-expansion-panel
      class="ds-accordion__panel"
      [expanded]="open()"
      [disabled]="disabled"
      [hideToggle]="true"
    >
      <mat-expansion-panel-header
        class="ds-accordion__trigger"
        collapsedHeight="auto"
        expandedHeight="auto"
      >
        <span *ngIf="icon" class="ds-accordion__trigger-icon">{{ icon }}</span>
        <span class="ds-accordion__trigger-label">{{ title }}</span>
        <span class="ds-icon ds-accordion__chevron">expand_more</span>
      </mat-expansion-panel-header>
      <div class="ds-accordion__content">
        <ng-content />
      </div>
    </mat-expansion-panel>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { title: [{
                type: Input
            }], icon: [{
                type: Input
            }], openInput: [{
                type: Input,
                args: ['open']
            }], disabled: [{
                type: Input
            }] } });
class DsAccordionComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsAccordionComponent, isStandalone: true, selector: "ds-accordion", ngImport: i0, template: `<mat-accordion class="ds-accordion" multi><ng-content /></mat-accordion>`, isInline: true, styles: [".ds-accordion{display:flex;flex-direction:column;gap:0}.ds-accordion__panel{border:1px solid var(--color-border-accordion);border-radius:var(--radius-md);overflow:hidden;background:var(--color-surface-page)}.ds-accordion__panel+.ds-accordion__panel{margin-top:var(--spacing-xs)}.ds-accordion__panel.is-open{box-shadow:0 2px 8px var(--shadow-elevation-1)}.ds-accordion__panel.is-open .ds-accordion__chevron{transform:rotate(180deg)}.ds-accordion__trigger{appearance:none;border:none;background:transparent;width:100%;display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-md) var(--spacing-lg);cursor:pointer;color:var(--color-text-primary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-medium-line-height);text-align:left;position:relative;transition:background .12s ease}.ds-accordion__trigger:focus{outline:none}.ds-accordion__trigger:hover:not(:disabled){background:var(--overlay-hovered)}.ds-accordion__trigger:focus-visible{box-shadow:inset 0 0 0 3px var(--color-border-ada-focus-ring)}.ds-accordion__trigger:active:not(:disabled){background:var(--overlay-pressed)}.ds-accordion__trigger:disabled,.ds-accordion__trigger[aria-disabled=true]{color:var(--color-text-disabled);cursor:not-allowed}.ds-accordion__trigger:disabled .ds-accordion__trigger-icon,.ds-accordion__trigger[aria-disabled=true] .ds-accordion__trigger-icon{color:var(--color-icon-disabled)}.ds-accordion__trigger:disabled .ds-accordion__chevron,.ds-accordion__trigger[aria-disabled=true] .ds-accordion__chevron{color:var(--color-icon-disabled)}.ds-accordion__trigger-icon{font-family:Material Symbols Rounded;font-size:20px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:var(--color-icon-brand);flex-shrink:0;font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.ds-accordion__trigger-label{flex:1;min-width:0}.ds-accordion__trigger-description{font-size:var(--ref-typescale-label-small-size);color:var(--color-text-secondary);font-weight:var(--ref-typeface-weight-regular);margin-top:2px;display:block}.ds-accordion__chevron{font-family:Material Symbols Rounded;font-size:20px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:var(--color-icon-subtle);flex-shrink:0;transition:transform .2s ease;font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.ds-accordion__content{padding:var(--spacing-md) var(--spacing-lg) var(--spacing-lg);border-top:1px solid var(--color-border-subtle);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);color:var(--color-text-secondary);background:var(--color-surface-page)}.ds-accordion__content[hidden]{display:none}.mat-expansion-panel{--mat-expansion-container-background-color: var(--color-surface-page);--mat-expansion-container-shape: var(--radius-md);--mat-expansion-header-text-color: var(--color-text-primary);--mat-expansion-header-text-font: var(--ref-typeface-brand);--mat-expansion-header-text-size: var(--ref-typescale-label-medium-size);--mat-expansion-header-text-weight: var(--ref-typeface-weight-medium);--mat-expansion-header-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-expansion-header-hover-state-layer-opacity: 0;--mat-expansion-header-focus-state-layer-opacity: 0}.mat-expansion-panel.ds-accordion__panel{border:1px solid var(--color-border-accordion);box-shadow:none;overflow:hidden}.mat-expansion-panel.ds-accordion__panel+.mat-expansion-panel.ds-accordion__panel{margin-top:var(--spacing-xs)}.mat-expansion-panel.ds-accordion__panel.mat-expanded{box-shadow:0 2px 8px var(--shadow-elevation-1)}.mat-expansion-panel.ds-accordion__panel.mat-expanded .ds-accordion__chevron{transform:rotate(180deg)}.mat-expansion-panel .mat-expansion-panel-body{padding:0}\n"], dependencies: [{ kind: "ngmodule", type: MatExpansionModule }, { kind: "directive", type: i2.MatAccordion, selector: "mat-accordion", inputs: ["hideToggle", "displayMode", "togglePosition"], exportAs: ["matAccordion"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-accordion', standalone: true, imports: [MatExpansionModule], template: `<mat-accordion class="ds-accordion" multi><ng-content /></mat-accordion>`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".ds-accordion{display:flex;flex-direction:column;gap:0}.ds-accordion__panel{border:1px solid var(--color-border-accordion);border-radius:var(--radius-md);overflow:hidden;background:var(--color-surface-page)}.ds-accordion__panel+.ds-accordion__panel{margin-top:var(--spacing-xs)}.ds-accordion__panel.is-open{box-shadow:0 2px 8px var(--shadow-elevation-1)}.ds-accordion__panel.is-open .ds-accordion__chevron{transform:rotate(180deg)}.ds-accordion__trigger{appearance:none;border:none;background:transparent;width:100%;display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-md) var(--spacing-lg);cursor:pointer;color:var(--color-text-primary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-medium-line-height);text-align:left;position:relative;transition:background .12s ease}.ds-accordion__trigger:focus{outline:none}.ds-accordion__trigger:hover:not(:disabled){background:var(--overlay-hovered)}.ds-accordion__trigger:focus-visible{box-shadow:inset 0 0 0 3px var(--color-border-ada-focus-ring)}.ds-accordion__trigger:active:not(:disabled){background:var(--overlay-pressed)}.ds-accordion__trigger:disabled,.ds-accordion__trigger[aria-disabled=true]{color:var(--color-text-disabled);cursor:not-allowed}.ds-accordion__trigger:disabled .ds-accordion__trigger-icon,.ds-accordion__trigger[aria-disabled=true] .ds-accordion__trigger-icon{color:var(--color-icon-disabled)}.ds-accordion__trigger:disabled .ds-accordion__chevron,.ds-accordion__trigger[aria-disabled=true] .ds-accordion__chevron{color:var(--color-icon-disabled)}.ds-accordion__trigger-icon{font-family:Material Symbols Rounded;font-size:20px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:var(--color-icon-brand);flex-shrink:0;font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.ds-accordion__trigger-label{flex:1;min-width:0}.ds-accordion__trigger-description{font-size:var(--ref-typescale-label-small-size);color:var(--color-text-secondary);font-weight:var(--ref-typeface-weight-regular);margin-top:2px;display:block}.ds-accordion__chevron{font-family:Material Symbols Rounded;font-size:20px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:var(--color-icon-subtle);flex-shrink:0;transition:transform .2s ease;font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.ds-accordion__content{padding:var(--spacing-md) var(--spacing-lg) var(--spacing-lg);border-top:1px solid var(--color-border-subtle);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);color:var(--color-text-secondary);background:var(--color-surface-page)}.ds-accordion__content[hidden]{display:none}.mat-expansion-panel{--mat-expansion-container-background-color: var(--color-surface-page);--mat-expansion-container-shape: var(--radius-md);--mat-expansion-header-text-color: var(--color-text-primary);--mat-expansion-header-text-font: var(--ref-typeface-brand);--mat-expansion-header-text-size: var(--ref-typescale-label-medium-size);--mat-expansion-header-text-weight: var(--ref-typeface-weight-medium);--mat-expansion-header-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-expansion-header-hover-state-layer-opacity: 0;--mat-expansion-header-focus-state-layer-opacity: 0}.mat-expansion-panel.ds-accordion__panel{border:1px solid var(--color-border-accordion);box-shadow:none;overflow:hidden}.mat-expansion-panel.ds-accordion__panel+.mat-expansion-panel.ds-accordion__panel{margin-top:var(--spacing-xs)}.mat-expansion-panel.ds-accordion__panel.mat-expanded{box-shadow:0 2px 8px var(--shadow-elevation-1)}.mat-expansion-panel.ds-accordion__panel.mat-expanded .ds-accordion__chevron{transform:rotate(180deg)}.mat-expansion-panel .mat-expansion-panel-body{padding:0}\n"] }]
        }] });

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
class DsSearchComponent {
    el;
    // ── Host element bindings ─────────────────────────────────────────────────
    // Applying ds-input alongside ds-search means all ds-input SCSS rules
    // (field border, hover, focus ring, disabled, icon colours, action button)
    // apply automatically — no duplication in _search.scss.
    hostDsInput = true;
    hostDsSearch = true;
    hostRole = 'search';
    get hostDisabled() { return this.disabled; }
    constructor(el) {
        this.el = el;
    }
    // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────
    // Same pattern as DsInputComponent — suppresses the ADA focus ring
    // (box-shadow via :focus-within:not([data-mouse-focus])) when focus
    // was initiated by a pointer device rather than keyboard.
    onPointerDown() {
        this.el.nativeElement.setAttribute('data-mouse-focus', '');
    }
    onFocusOut() {
        this.el.nativeElement.removeAttribute('data-mouse-focus');
    }
    // ── Inputs ────────────────────────────────────────────────────────────────
    /** Accessible label for the input. Required for ADA — no visible label is shown. */
    ariaLabel = 'Search';
    /** Placeholder text shown when the field is empty. */
    placeholder = 'Search';
    /** Current value. Use [(value)] for two-way binding. */
    value = '';
    /** Show the leading search icon. Default: true. */
    leadingIcon = true;
    /** Disables the field. */
    disabled = false;
    // ── Outputs ───────────────────────────────────────────────────────────────
    /** Emits the new value on every keystroke. */
    valueChange = new EventEmitter();
    /** Emits the current value when the user presses Enter. */
    search = new EventEmitter();
    /** Emits when the clear button is clicked. */
    cleared = new EventEmitter();
    // ── Internal ──────────────────────────────────────────────────────────────
    get hasValue() {
        return this.value.length > 0;
    }
    onInput(event) {
        this.value = event.target.value;
        this.valueChange.emit(this.value);
    }
    onKeydown(event) {
        if (event.key === 'Enter') {
            this.search.emit(this.value);
        }
    }
    onClear() {
        this.value = '';
        this.valueChange.emit('');
        this.cleared.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSearchComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsSearchComponent, isStandalone: true, selector: "ds-search", inputs: { ariaLabel: "ariaLabel", placeholder: "placeholder", value: "value", leadingIcon: "leadingIcon", disabled: "disabled" }, outputs: { valueChange: "valueChange", search: "search", cleared: "cleared" }, host: { listeners: { "mousedown": "onPointerDown()", "touchstart": "onPointerDown()", "focusout": "onFocusOut()" }, properties: { "class.ds-input": "this.hostDsInput", "class.ds-search": "this.hostDsSearch", "attr.role": "this.hostRole", "class.is-disabled": "this.hostDisabled" } }, ngImport: i0, template: "<!-- ds-search is a variant of ds-input \u2014 the host carries both classes.\n     Use ds-input__* classes throughout so ds-input styles apply without duplication. -->\n\n<div class=\"ds-input__field\">\n\n  <!-- Leading search icon \u2014 decorative, non-interactive -->\n  <span *ngIf=\"leadingIcon\" class=\"ds-icon ds-icon--sm ds-input__icon\" aria-hidden=\"true\">search</span>\n\n  <!-- Input control -->\n  <input\n    class=\"ds-input__control\"\n    type=\"search\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    [disabled]=\"disabled\"\n    [attr.aria-label]=\"ariaLabel\"\n    autocomplete=\"off\"\n    (input)=\"onInput($event)\"\n    (keydown)=\"onKeydown($event)\"\n  />\n\n  <!-- Clear button \u2014 visible only when the field has a value -->\n  <button\n    *ngIf=\"hasValue && !disabled\"\n    class=\"ds-input__action\"\n    type=\"button\"\n    aria-label=\"Clear search\"\n    (click)=\"onClear()\"\n  >\n    <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n  </button>\n\n</div>\n", styles: [".ds-search input[type=search]::-webkit-search-decoration,.ds-search input[type=search]::-webkit-search-cancel-button{display:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSearchComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-search', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- ds-search is a variant of ds-input \u2014 the host carries both classes.\n     Use ds-input__* classes throughout so ds-input styles apply without duplication. -->\n\n<div class=\"ds-input__field\">\n\n  <!-- Leading search icon \u2014 decorative, non-interactive -->\n  <span *ngIf=\"leadingIcon\" class=\"ds-icon ds-icon--sm ds-input__icon\" aria-hidden=\"true\">search</span>\n\n  <!-- Input control -->\n  <input\n    class=\"ds-input__control\"\n    type=\"search\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    [disabled]=\"disabled\"\n    [attr.aria-label]=\"ariaLabel\"\n    autocomplete=\"off\"\n    (input)=\"onInput($event)\"\n    (keydown)=\"onKeydown($event)\"\n  />\n\n  <!-- Clear button \u2014 visible only when the field has a value -->\n  <button\n    *ngIf=\"hasValue && !disabled\"\n    class=\"ds-input__action\"\n    type=\"button\"\n    aria-label=\"Clear search\"\n    (click)=\"onClear()\"\n  >\n    <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n  </button>\n\n</div>\n", styles: [".ds-search input[type=search]::-webkit-search-decoration,.ds-search input[type=search]::-webkit-search-cancel-button{display:none}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hostDsInput: [{
                type: HostBinding,
                args: ['class.ds-input']
            }], hostDsSearch: [{
                type: HostBinding,
                args: ['class.ds-search']
            }], hostRole: [{
                type: HostBinding,
                args: ['attr.role']
            }], hostDisabled: [{
                type: HostBinding,
                args: ['class.is-disabled']
            }], onPointerDown: [{
                type: HostListener,
                args: ['mousedown']
            }, {
                type: HostListener,
                args: ['touchstart']
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout']
            }], ariaLabel: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], value: [{
                type: Input
            }], leadingIcon: [{
                type: Input
            }], disabled: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], search: [{
                type: Output
            }], cleared: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Menu
 *
 * Based on Angular Material mat-menu.
 * Import MatMenuModule in your Angular module.
 *
 * Usage: add a template reference to <ds-menu> and pass its .matMenu to
 * [matMenuTriggerFor] on the trigger element. Place items inside using
 * mat-menu-item + the ds-menu CSS class API for full styling.
 *
 * Positioning: 4px (--spacing-xs) gap from trigger via [yOffset]="4" on the
 * [matMenuTriggerFor] directive. The CDK overlay auto-flips above or left/right
 * when the panel would overflow the viewport.
 *
 * @example — Basic menu
 *   <button [matMenuTriggerFor]="myMenu.matMenu" [yOffset]="4">Options</button>
 *   <ds-menu #myMenu>
 *     <button mat-menu-item class="ds-menu__item">
 *       <span class="ds-icon ds-icon--sm ds-menu__item-icon">edit</span>Edit
 *     </button>
 *     <hr class="ds-menu__divider" />
 *     <button mat-menu-item class="ds-menu__item ds-menu__item--destructive">
 *       <span class="ds-icon ds-icon--sm ds-menu__item-icon">delete</span>Delete
 *     </button>
 *   </ds-menu>
 *
 * @example — With search
 *   <ds-menu #myMenu [search]="true" searchPlaceholder="Find action…" [(searchValue)]="query">
 *     <!-- filtered items -->
 *   </ds-menu>
 *
 * @example — With checkboxes (single or multi-select)
 *   <button mat-menu-item class="ds-menu__item ds-menu__item--selected">
 *     <span class="ds-menu__item-check"><span class="ds-icon ds-icon--filled">check</span></span>
 *     Option A
 *   </button>
 *   <button mat-menu-item class="ds-menu__item">
 *     <span class="ds-menu__item-check"></span>
 *     Option B
 *   </button>
 *
 * @example — Submenu (multi-level)
 *   <button mat-menu-item class="ds-menu__item" [matMenuTriggerFor]="subMenu.matMenu">
 *     <span class="ds-icon ds-icon--sm ds-menu__item-icon">folder</span>
 *     Move to
 *     <span class="ds-menu__item-trailing"><span class="ds-icon ds-icon--sm">chevron_right</span></span>
 *   </button>
 *   <ds-menu #subMenu>
 *     <button mat-menu-item class="ds-menu__item">Inbox</button>
 *     <button mat-menu-item class="ds-menu__item">Archive</button>
 *   </ds-menu>
 */
class DsMenuComponent {
    /** Exposes the mat-menu reference for use with [matMenuTriggerFor]. */
    matMenu;
    /** Show a sticky search field at the top of the menu panel. */
    search = false;
    /** Placeholder text for the search field. */
    searchPlaceholder = 'Search';
    /** Current search value. Use [(searchValue)] for two-way binding. */
    searchValue = '';
    /** Emits on every keystroke in the search field. */
    searchValueChange = new EventEmitter();
    onSearchChange(value) {
        this.searchValue = value;
        this.searchValueChange.emit(value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsMenuComponent, isStandalone: true, selector: "ds-menu", inputs: { search: "search", searchPlaceholder: "searchPlaceholder", searchValue: "searchValue" }, outputs: { searchValueChange: "searchValueChange" }, viewQueries: [{ propertyName: "matMenu", first: true, predicate: ["menu"], descendants: true }], ngImport: i0, template: "<mat-menu #menu=\"matMenu\" panelClass=\"ds-menu\">\n  <!-- Search bar \u2014 pinned above the scrollable item list.\n       stopPropagation prevents mat-menu from closing on click and\n       prevents arrow keys from triggering item navigation. -->\n  <div *ngIf=\"search\"\n       class=\"ds-menu__search\"\n       (click)=\"$event.stopPropagation()\"\n       (keydown)=\"$event.stopPropagation()\">\n    <ds-search\n      [placeholder]=\"searchPlaceholder\"\n      [value]=\"searchValue\"\n      [ariaLabel]=\"searchPlaceholder\"\n      (valueChange)=\"onSearchChange($event)\"\n    />\n  </div>\n\n  <ng-content />\n</mat-menu>\n", styles: [".ds-menu{background:var(--color-surface-page);border:1px solid var(--color-border-subtle);border-radius:var(--radius-md);box-shadow:0 4px 4px 0 var(--shadow-elevation-3),0 3px 12px 6px var(--shadow-elevation-3);min-width:160px;max-width:280px;padding:var(--spacing-xs) 0;display:flex;flex-direction:column}.ds-menu__section-label{display:flex;align-items:center;gap:var(--spacing-sm);min-height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);-webkit-user-select:none;user-select:none}.ds-menu__section-label[role=menuitemcheckbox]{appearance:none;border:none;background:transparent;width:100%;text-align:left;cursor:pointer;transition:background .1s ease}.ds-menu__section-label[role=menuitemcheckbox]:focus{outline:none}.ds-menu__section-label[role=menuitemcheckbox]:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-menu__section-label[role=menuitemcheckbox]:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.ds-menu__section-label[role=menuitemcheckbox]:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-menu__search{position:sticky;top:0;z-index:1;background:var(--color-surface-page);padding:var(--spacing-xs) var(--spacing-sm);flex-shrink:0}.ds-menu__item{appearance:none;border:none;background:transparent;display:flex;align-items:center;gap:var(--spacing-sm);width:100%;min-height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);cursor:pointer;text-align:left;text-decoration:none;border-radius:0;transition:background .1s ease,color .1s ease;position:relative}.ds-menu__item:focus{outline:none}.ds-menu__item:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-menu__item:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.ds-menu__item:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-menu__item--indent{padding-left:calc(var(--spacing-lg) + 24px)}.ds-menu__item--selected{color:var(--color-text-brand)}.ds-menu__item--destructive:hover:not(.is-disabled),.ds-menu__item--destructive:focus-visible,.ds-menu__item--destructive:active:not(.is-disabled){color:var(--color-text-accent-red)}.ds-menu__item--destructive:hover:not(.is-disabled) .ds-menu__item-icon,.ds-menu__item--destructive:focus-visible .ds-menu__item-icon,.ds-menu__item--destructive:active:not(.is-disabled) .ds-menu__item-icon{color:var(--color-icon-error)}.ds-menu__item--destructive:hover:not(.is-disabled){background:var(--overlay-accent-red-hovered)}.ds-menu__item--destructive:focus-visible{box-shadow:inset 0 0 0 2px var(--color-border-accent-red)}.ds-menu__item--destructive:active:not(.is-disabled){background:var(--overlay-accent-red-pressed)}.ds-menu__item.is-disabled{color:var(--color-text-disabled);cursor:not-allowed;pointer-events:none}.ds-menu__item.is-disabled .ds-menu__item-icon{color:var(--color-icon-disabled)}.ds-menu__item .mat-mdc-checkbox:hover .mdc-checkbox,.ds-menu__item .mat-mdc-checkbox:active .mdc-checkbox{background:transparent!important}.ds-menu__item-icon{color:var(--color-icon-default);flex-shrink:0}.ds-menu__item-trailing{margin-left:auto;display:flex;align-items:center;gap:var(--spacing-xs);color:var(--color-text-secondary);font-size:var(--ref-typescale-label-small-size);flex-shrink:0}.ds-menu__item-check{width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--color-icon-brand)}.ds-menu__item-check .ds-icon{font-size:18px}.ds-menu__divider{height:1px;background:var(--color-border-subtle);border:none;margin:var(--spacing-xs) 0}.mat-mdc-menu-panel.ds-menu{border-radius:var(--radius-md);background:var(--color-surface-page);border:1px solid var(--color-border-subtle);box-shadow:0 4px 4px 0 var(--shadow-elevation-3),0 3px 12px 6px var(--shadow-elevation-3);min-width:160px;max-width:280px;--mat-menu-container-elevation-shadow: none;overflow-y:auto;max-height:400px}.mat-mdc-menu-panel.ds-menu::-webkit-scrollbar{width:6px}.mat-mdc-menu-panel.ds-menu::-webkit-scrollbar-track{background:transparent}.mat-mdc-menu-panel.ds-menu::-webkit-scrollbar-thumb{background:var(--color-surface-scroll);border-radius:var(--radius-full)}.mat-mdc-menu-panel.ds-menu{scrollbar-color:var(--color-surface-scroll) transparent;scrollbar-width:thin}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-content{padding:var(--spacing-xs) 0}.mat-mdc-menu-panel.ds-menu .ds-menu__search{position:sticky;top:0;z-index:1;background:var(--color-surface-page);padding:var(--spacing-xs) var(--spacing-sm)}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label{display:flex;align-items:center;gap:var(--spacing-sm);min-height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);-webkit-user-select:none;user-select:none}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]{appearance:none;border:none;background:transparent;width:100%;text-align:left;cursor:pointer;transition:background .1s ease}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:focus{outline:none}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:hover:not([disabled]){background:var(--overlay-hovered)}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:active:not([disabled]){background:var(--overlay-pressed)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);min-height:48px;padding:var(--spacing-md) var(--spacing-lg);--mat-menu-item-hover-state-layer-opacity: 0;--mat-menu-item-focus-state-layer-opacity: 0;--mat-menu-item-pressed-state-layer-opacity: 0}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:hover:not([disabled]){background:var(--overlay-hovered)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:active:not([disabled]){background:var(--overlay-pressed)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:focus{outline:none}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item[disabled]{color:var(--color-text-disabled);opacity:1}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item[disabled] .ds-menu__item-icon{color:var(--color-icon-disabled)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--indent{padding-left:calc(var(--spacing-lg) + 24px)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--selected{color:var(--color-text-brand)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:hover:not([disabled]),.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:focus-visible,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:active:not([disabled]){color:var(--color-text-accent-red)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:hover:not([disabled]) .ds-menu__item-icon,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:focus-visible .ds-menu__item-icon,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:active:not([disabled]) .ds-menu__item-icon{color:var(--color-icon-error)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:hover:not([disabled]){background:var(--overlay-accent-red-hovered)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:focus-visible{box-shadow:inset 0 0 0 2px var(--color-border-accent-red)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:active:not([disabled]){background:var(--overlay-accent-red-pressed)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item .mat-mdc-checkbox:hover .mdc-checkbox,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item .mat-mdc-checkbox:active .mdc-checkbox{background:transparent!important}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.mat-mdc-menu-submenu-trigger:after{display:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i4.MatMenu, selector: "mat-menu", inputs: ["backdropClass", "aria-label", "aria-labelledby", "aria-describedby", "xPosition", "yPosition", "overlapTrigger", "hasBackdrop", "class", "classList"], outputs: ["closed", "close"], exportAs: ["matMenu"] }, { kind: "component", type: DsSearchComponent, selector: "ds-search", inputs: ["ariaLabel", "placeholder", "value", "leadingIcon", "disabled"], outputs: ["valueChange", "search", "cleared"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-menu', standalone: true, imports: [CommonModule, MatMenuModule, DsSearchComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-menu #menu=\"matMenu\" panelClass=\"ds-menu\">\n  <!-- Search bar \u2014 pinned above the scrollable item list.\n       stopPropagation prevents mat-menu from closing on click and\n       prevents arrow keys from triggering item navigation. -->\n  <div *ngIf=\"search\"\n       class=\"ds-menu__search\"\n       (click)=\"$event.stopPropagation()\"\n       (keydown)=\"$event.stopPropagation()\">\n    <ds-search\n      [placeholder]=\"searchPlaceholder\"\n      [value]=\"searchValue\"\n      [ariaLabel]=\"searchPlaceholder\"\n      (valueChange)=\"onSearchChange($event)\"\n    />\n  </div>\n\n  <ng-content />\n</mat-menu>\n", styles: [".ds-menu{background:var(--color-surface-page);border:1px solid var(--color-border-subtle);border-radius:var(--radius-md);box-shadow:0 4px 4px 0 var(--shadow-elevation-3),0 3px 12px 6px var(--shadow-elevation-3);min-width:160px;max-width:280px;padding:var(--spacing-xs) 0;display:flex;flex-direction:column}.ds-menu__section-label{display:flex;align-items:center;gap:var(--spacing-sm);min-height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);-webkit-user-select:none;user-select:none}.ds-menu__section-label[role=menuitemcheckbox]{appearance:none;border:none;background:transparent;width:100%;text-align:left;cursor:pointer;transition:background .1s ease}.ds-menu__section-label[role=menuitemcheckbox]:focus{outline:none}.ds-menu__section-label[role=menuitemcheckbox]:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-menu__section-label[role=menuitemcheckbox]:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.ds-menu__section-label[role=menuitemcheckbox]:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-menu__search{position:sticky;top:0;z-index:1;background:var(--color-surface-page);padding:var(--spacing-xs) var(--spacing-sm);flex-shrink:0}.ds-menu__item{appearance:none;border:none;background:transparent;display:flex;align-items:center;gap:var(--spacing-sm);width:100%;min-height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);cursor:pointer;text-align:left;text-decoration:none;border-radius:0;transition:background .1s ease,color .1s ease;position:relative}.ds-menu__item:focus{outline:none}.ds-menu__item:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-menu__item:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.ds-menu__item:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-menu__item--indent{padding-left:calc(var(--spacing-lg) + 24px)}.ds-menu__item--selected{color:var(--color-text-brand)}.ds-menu__item--destructive:hover:not(.is-disabled),.ds-menu__item--destructive:focus-visible,.ds-menu__item--destructive:active:not(.is-disabled){color:var(--color-text-accent-red)}.ds-menu__item--destructive:hover:not(.is-disabled) .ds-menu__item-icon,.ds-menu__item--destructive:focus-visible .ds-menu__item-icon,.ds-menu__item--destructive:active:not(.is-disabled) .ds-menu__item-icon{color:var(--color-icon-error)}.ds-menu__item--destructive:hover:not(.is-disabled){background:var(--overlay-accent-red-hovered)}.ds-menu__item--destructive:focus-visible{box-shadow:inset 0 0 0 2px var(--color-border-accent-red)}.ds-menu__item--destructive:active:not(.is-disabled){background:var(--overlay-accent-red-pressed)}.ds-menu__item.is-disabled{color:var(--color-text-disabled);cursor:not-allowed;pointer-events:none}.ds-menu__item.is-disabled .ds-menu__item-icon{color:var(--color-icon-disabled)}.ds-menu__item .mat-mdc-checkbox:hover .mdc-checkbox,.ds-menu__item .mat-mdc-checkbox:active .mdc-checkbox{background:transparent!important}.ds-menu__item-icon{color:var(--color-icon-default);flex-shrink:0}.ds-menu__item-trailing{margin-left:auto;display:flex;align-items:center;gap:var(--spacing-xs);color:var(--color-text-secondary);font-size:var(--ref-typescale-label-small-size);flex-shrink:0}.ds-menu__item-check{width:18px;height:18px;flex-shrink:0;display:flex;align-items:center;justify-content:center;color:var(--color-icon-brand)}.ds-menu__item-check .ds-icon{font-size:18px}.ds-menu__divider{height:1px;background:var(--color-border-subtle);border:none;margin:var(--spacing-xs) 0}.mat-mdc-menu-panel.ds-menu{border-radius:var(--radius-md);background:var(--color-surface-page);border:1px solid var(--color-border-subtle);box-shadow:0 4px 4px 0 var(--shadow-elevation-3),0 3px 12px 6px var(--shadow-elevation-3);min-width:160px;max-width:280px;--mat-menu-container-elevation-shadow: none;overflow-y:auto;max-height:400px}.mat-mdc-menu-panel.ds-menu::-webkit-scrollbar{width:6px}.mat-mdc-menu-panel.ds-menu::-webkit-scrollbar-track{background:transparent}.mat-mdc-menu-panel.ds-menu::-webkit-scrollbar-thumb{background:var(--color-surface-scroll);border-radius:var(--radius-full)}.mat-mdc-menu-panel.ds-menu{scrollbar-color:var(--color-surface-scroll) transparent;scrollbar-width:thin}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-content{padding:var(--spacing-xs) 0}.mat-mdc-menu-panel.ds-menu .ds-menu__search{position:sticky;top:0;z-index:1;background:var(--color-surface-page);padding:var(--spacing-xs) var(--spacing-sm)}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label{display:flex;align-items:center;gap:var(--spacing-sm);min-height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);-webkit-user-select:none;user-select:none}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]{appearance:none;border:none;background:transparent;width:100%;text-align:left;cursor:pointer;transition:background .1s ease}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:focus{outline:none}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:hover:not([disabled]){background:var(--overlay-hovered)}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-menu-panel.ds-menu .ds-menu__section-label[role=menuitemcheckbox]:active:not([disabled]){background:var(--overlay-pressed)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);min-height:48px;padding:var(--spacing-md) var(--spacing-lg);--mat-menu-item-hover-state-layer-opacity: 0;--mat-menu-item-focus-state-layer-opacity: 0;--mat-menu-item-pressed-state-layer-opacity: 0}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:hover:not([disabled]){background:var(--overlay-hovered)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:active:not([disabled]){background:var(--overlay-pressed)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:focus{outline:none}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item:focus-visible{background:var(--overlay-focused);box-shadow:inset 0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item[disabled]{color:var(--color-text-disabled);opacity:1}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item[disabled] .ds-menu__item-icon{color:var(--color-icon-disabled)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--indent{padding-left:calc(var(--spacing-lg) + 24px)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--selected{color:var(--color-text-brand)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:hover:not([disabled]),.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:focus-visible,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:active:not([disabled]){color:var(--color-text-accent-red)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:hover:not([disabled]) .ds-menu__item-icon,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:focus-visible .ds-menu__item-icon,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:active:not([disabled]) .ds-menu__item-icon{color:var(--color-icon-error)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:hover:not([disabled]){background:var(--overlay-accent-red-hovered)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:focus-visible{box-shadow:inset 0 0 0 2px var(--color-border-accent-red)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.ds-menu__item--destructive:active:not([disabled]){background:var(--overlay-accent-red-pressed)}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item .mat-mdc-checkbox:hover .mdc-checkbox,.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item .mat-mdc-checkbox:active .mdc-checkbox{background:transparent!important}.mat-mdc-menu-panel.ds-menu .mat-mdc-menu-item.mat-mdc-menu-submenu-trigger:after{display:none}\n"] }]
        }], propDecorators: { matMenu: [{
                type: ViewChild,
                args: ['menu']
            }], search: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], searchValue: [{
                type: Input
            }], searchValueChange: [{
                type: Output
            }] } });

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
class DsSelectComponent {
    el;
    cdr;
    // ── Host element bindings ─────────────────────────────────────────────────
    hostClass = true;
    get hostError() { return this.isError; }
    get hostDisabled() { return this.disabled; }
    constructor(el, cdr) {
        this.el = el;
        this.cdr = cdr;
    }
    // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────
    onPointerDown() {
        this.el.nativeElement.setAttribute('data-mouse-focus', '');
    }
    onFocusOut() {
        this.el.nativeElement.removeAttribute('data-mouse-focus');
    }
    // ── Inputs ────────────────────────────────────────────────────────────────
    /** Label text shown above the field. */
    label = '';
    /** Marks the field as required. */
    required = false;
    /** Placeholder option text. */
    placeholder = 'Select an option';
    /** Currently selected value. Use [(value)] for two-way binding. */
    value = '';
    /** Options array. */
    options = [];
    /** Helper text shown below the field. */
    helperText = '';
    /** Error message shown below the field when isError is true. */
    errorText = '';
    /** Applies error styling and shows errorText. */
    isError = false;
    /** Disables the field. */
    disabled = false;
    // ── Outputs ───────────────────────────────────────────────────────────────
    /** Emits new value when selection changes. */
    valueChange = new EventEmitter();
    // ── Internal ──────────────────────────────────────────────────────────────
    inputRef;
    menuOpen = false;
    filterText = '';
    _selectId = '';
    get selectId() { return this._selectId; }
    ngOnInit() {
        const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
        this._selectId = `ds-select-${slug}-${Math.random().toString(36).slice(2)}`;
    }
    get selectedLabel() {
        return this.options.find(o => o.value === this.value)?.label ?? '';
    }
    /** Placeholder shown in the input: selected label when closed, hint when open. */
    get inputPlaceholder() {
        if (this.menuOpen)
            return this.selectedLabel || this.placeholder;
        return this.placeholder;
    }
    /** Options filtered by what the user has typed. */
    get filteredOptions() {
        if (!this.filterText)
            return this.options;
        const q = this.filterText.toLowerCase();
        return this.options.filter(o => o.label.toLowerCase().includes(q));
    }
    onMenuOpened() {
        this.menuOpen = true;
        this.filterText = '';
        // Clear input so user can start typing to filter
        if (this.inputRef)
            this.inputRef.nativeElement.value = '';
        this.cdr.markForCheck();
    }
    onMenuClosed() {
        this.menuOpen = false;
        this.filterText = '';
        // Restore selected label in the input
        if (this.inputRef)
            this.inputRef.nativeElement.value = this.selectedLabel;
        this.cdr.markForCheck();
    }
    onInput(event) {
        this.filterText = event.target.value;
        this.cdr.markForCheck();
    }
    onOptionSelect(opt) {
        if (opt.disabled)
            return;
        this.value = opt.value;
        this.filterText = '';
        this.valueChange.emit(this.value);
        // Input will be updated via onMenuClosed
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSelectComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsSelectComponent, isStandalone: true, selector: "ds-select", inputs: { label: "label", required: "required", placeholder: "placeholder", value: "value", options: "options", helperText: "helperText", errorText: "errorText", isError: "isError", disabled: "disabled" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "mousedown": "onPointerDown()", "touchstart": "onPointerDown()", "focusout": "onFocusOut()" }, properties: { "class.ds-select": "this.hostClass", "class.is-error": "this.hostError", "class.is-disabled": "this.hostDisabled" } }, viewQueries: [{ propertyName: "inputRef", first: true, predicate: ["selectInput"], descendants: true }], ngImport: i0, template: "<!-- External label \u2014 sits above the mat-form-field, not floating inside it -->\n<label *ngIf=\"label\" class=\"ds-select__label\" [for]=\"selectId\">\n  {{ label }}<span *ngIf=\"required\" class=\"ds-select__required\" aria-hidden=\"true\">*</span>\n</label>\n\n<!-- mat-form-field owns the field box and border (same visual as ds-input) -->\n<mat-form-field\n  appearance=\"outline\"\n  subscriptSizing=\"dynamic\"\n  class=\"ds-select__field-wrapper\"\n>\n  <!-- Text input \u2014 user can type to filter options; click / focus opens ds-menu -->\n  <input\n    #selectInput\n    matInput\n    [id]=\"selectId\"\n    [placeholder]=\"inputPlaceholder\"\n    [disabled]=\"disabled\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"isError ? 'true' : null\"\n    [attr.aria-describedby]=\"(helperText || errorText) ? selectId + '-helper' : null\"\n    [matMenuTriggerFor]=\"optionsMenu.matMenu\"\n    autocomplete=\"off\"\n    spellcheck=\"false\"\n    (menuOpened)=\"onMenuOpened()\"\n    (menuClosed)=\"onMenuClosed()\"\n    (input)=\"onInput($event)\"\n  >\n\n  <!-- Arrow icon \u2014 hidden in error state via is-error host class -->\n  <span *ngIf=\"!isError\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-select__arrow\" aria-hidden=\"true\">arrow_drop_down</span>\n\n  <!-- Error icon \u2014 replaces arrow in error state -->\n  <span *ngIf=\"isError && !disabled\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-icon--filled ds-select__error-icon\" aria-hidden=\"true\">error</span>\n\n</mat-form-field>\n\n<!-- Options via ds-menu \u2014 single-select checkmark pattern -->\n<ds-menu #optionsMenu>\n  <button\n    *ngFor=\"let opt of filteredOptions\"\n    mat-menu-item\n    class=\"ds-menu__item\"\n    [class.ds-menu__item--selected]=\"value === opt.value\"\n    [disabled]=\"opt.disabled ?? false\"\n    (click)=\"onOptionSelect(opt)\"\n  >\n    <!-- Only the selected item renders ds-menu__item-check \u2014 unselected stay flush left -->\n    <span *ngIf=\"value === opt.value\" class=\"ds-menu__item-check\">\n      <span class=\"ds-icon ds-icon--filled\" aria-hidden=\"true\">check</span>\n    </span>\n    {{ opt.label }}\n  </button>\n</ds-menu>\n\n<!-- Helper / error text \u2014 external, below the field -->\n<span\n  *ngIf=\"(isError && errorText) || helperText\"\n  class=\"ds-select__helper\"\n  [id]=\"selectId + '-helper'\"\n  [attr.role]=\"isError ? 'alert' : null\"\n>{{ isError && errorText ? errorText : helperText }}</span>\n", styles: [".ds-select{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-select__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-secondary);-webkit-user-select:none;user-select:none}.ds-select__required{color:var(--color-text-error);margin-left:2px}.ds-select__field{display:flex;align-items:center;height:42px;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm);padding:0 var(--spacing-md);cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease;position:relative;appearance:none;-webkit-appearance:none;outline:none;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);text-align:left;width:100%}.ds-select__field:hover{border-color:var(--color-border-input-hover)}.ds-select__field:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select:focus-within .ds-select__field{border-color:var(--color-border-input-active)}.ds-select:focus-within:not([data-mouse-focus]) .ds-select__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select__value{flex:1;min-width:0;color:var(--color-text-primary)}.ds-select__value--placeholder{color:var(--color-text-placeholder)}.ds-select__control{flex:1;min-width:0;border:none;outline:none;background:transparent;appearance:none;-webkit-appearance:none;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);cursor:pointer;padding-right:var(--spacing-sm)}.ds-select__control:disabled{cursor:not-allowed}.ds-select__control option[value=\"\"]{color:var(--color-text-placeholder)}.ds-select__arrow{color:var(--color-icon-subtle);flex-shrink:0;pointer-events:none;transition:transform .15s ease}.ds-select__helper{font-family:var(--ref-typeface-plain);font-size:var(--ref-typescale-body-small-size);line-height:var(--ref-typescale-body-small-line-height);color:var(--color-text-secondary)}.ds-select__error-icon{color:var(--color-icon-error);flex-shrink:0;pointer-events:none}.ds-select.is-error .ds-select__field{border-color:var(--color-border-input-error)}.ds-select.is-error .ds-select__helper{color:var(--color-text-error)}.ds-select.is-error .ds-select__arrow{display:none}.ds-select.is-error:focus-within .ds-select__field{border-color:var(--color-border-input-error)}.ds-select.is-error:focus-within:not([data-mouse-focus]) .ds-select__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select.is-disabled{pointer-events:none}.ds-select.is-disabled .ds-select__field{background:var(--color-surface-input-disabled);border-color:var(--color-border-subtle)}.ds-select.is-disabled .ds-select__control{color:var(--color-text-disabled);cursor:not-allowed}.ds-select.is-disabled .ds-select__value{color:var(--color-text-disabled)}.ds-select .mat-mdc-form-field{width:100%}.ds-select{--mat-form-field-container-height: 42px;--mat-form-field-container-vertical-padding: 0px;--mdc-outlined-text-field-container-shape: var(--radius-sm);--mdc-outlined-text-field-outline-width: 1px;--mdc-outlined-text-field-outline-color: var(--color-border-input);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-hover);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-font: var(--ref-typeface-brand);--mdc-outlined-text-field-input-text-size: var(--ref-typescale-label-medium-size);--mdc-outlined-text-field-input-text-weight: var(--ref-typeface-weight-regular);--mdc-outlined-text-field-input-text-line-height: var(--ref-typescale-label-medium-line-height);--mdc-outlined-text-field-input-text-color: var(--color-text-primary);--mdc-outlined-text-field-disabled-input-text-color: var(--color-text-disabled);--mdc-outlined-text-field-input-text-placeholder-color: var(--color-text-placeholder)}.ds-select .mat-mdc-floating-label,.ds-select .mdc-floating-label,.ds-select .mat-mdc-form-field-subscript-wrapper{display:none}.ds-select .mat-mdc-text-field-wrapper{background:var(--color-surface-input);padding:0 var(--spacing-md);transition:border-color .15s ease,box-shadow .15s ease;cursor:pointer}.ds-select:focus-within:not(.is-error) .ds-select__arrow{color:var(--color-icon-brand)}.ds-select:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select.is-error{--mdc-outlined-text-field-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-error)}.ds-select.is-error:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select.is-disabled{--mdc-outlined-text-field-disabled-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-disabled-outline-opacity: 1}.ds-select.is-disabled .mat-mdc-text-field-wrapper{background:var(--color-surface-input-disabled)}.ds-select.is-disabled .ds-select__label{color:var(--color-text-disabled)}.ds-select.is-disabled .ds-select__arrow{color:var(--color-icon-disabled)}.ds-select.is-disabled .ds-select__helper{color:var(--color-text-disabled)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }, { kind: "ngmodule", type: MatMenuModule }, { kind: "component", type: i4.MatMenuItem, selector: "[mat-menu-item]", inputs: ["role", "disabled", "disableRipple"], exportAs: ["matMenuItem"] }, { kind: "directive", type: i4.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", inputs: ["mat-menu-trigger-for", "matMenuTriggerFor", "matMenuTriggerData", "matMenuTriggerRestoreFocus"], outputs: ["menuOpened", "onMenuOpen", "menuClosed", "onMenuClose"], exportAs: ["matMenuTrigger"] }, { kind: "component", type: DsMenuComponent, selector: "ds-menu", inputs: ["search", "searchPlaceholder", "searchValue"], outputs: ["searchValueChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSelectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-select', standalone: true, imports: [CommonModule, MatFormFieldModule, MatInputModule, MatMenuModule, DsMenuComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- External label \u2014 sits above the mat-form-field, not floating inside it -->\n<label *ngIf=\"label\" class=\"ds-select__label\" [for]=\"selectId\">\n  {{ label }}<span *ngIf=\"required\" class=\"ds-select__required\" aria-hidden=\"true\">*</span>\n</label>\n\n<!-- mat-form-field owns the field box and border (same visual as ds-input) -->\n<mat-form-field\n  appearance=\"outline\"\n  subscriptSizing=\"dynamic\"\n  class=\"ds-select__field-wrapper\"\n>\n  <!-- Text input \u2014 user can type to filter options; click / focus opens ds-menu -->\n  <input\n    #selectInput\n    matInput\n    [id]=\"selectId\"\n    [placeholder]=\"inputPlaceholder\"\n    [disabled]=\"disabled\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"isError ? 'true' : null\"\n    [attr.aria-describedby]=\"(helperText || errorText) ? selectId + '-helper' : null\"\n    [matMenuTriggerFor]=\"optionsMenu.matMenu\"\n    autocomplete=\"off\"\n    spellcheck=\"false\"\n    (menuOpened)=\"onMenuOpened()\"\n    (menuClosed)=\"onMenuClosed()\"\n    (input)=\"onInput($event)\"\n  >\n\n  <!-- Arrow icon \u2014 hidden in error state via is-error host class -->\n  <span *ngIf=\"!isError\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-select__arrow\" aria-hidden=\"true\">arrow_drop_down</span>\n\n  <!-- Error icon \u2014 replaces arrow in error state -->\n  <span *ngIf=\"isError && !disabled\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-icon--filled ds-select__error-icon\" aria-hidden=\"true\">error</span>\n\n</mat-form-field>\n\n<!-- Options via ds-menu \u2014 single-select checkmark pattern -->\n<ds-menu #optionsMenu>\n  <button\n    *ngFor=\"let opt of filteredOptions\"\n    mat-menu-item\n    class=\"ds-menu__item\"\n    [class.ds-menu__item--selected]=\"value === opt.value\"\n    [disabled]=\"opt.disabled ?? false\"\n    (click)=\"onOptionSelect(opt)\"\n  >\n    <!-- Only the selected item renders ds-menu__item-check \u2014 unselected stay flush left -->\n    <span *ngIf=\"value === opt.value\" class=\"ds-menu__item-check\">\n      <span class=\"ds-icon ds-icon--filled\" aria-hidden=\"true\">check</span>\n    </span>\n    {{ opt.label }}\n  </button>\n</ds-menu>\n\n<!-- Helper / error text \u2014 external, below the field -->\n<span\n  *ngIf=\"(isError && errorText) || helperText\"\n  class=\"ds-select__helper\"\n  [id]=\"selectId + '-helper'\"\n  [attr.role]=\"isError ? 'alert' : null\"\n>{{ isError && errorText ? errorText : helperText }}</span>\n", styles: [".ds-select{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-select__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-secondary);-webkit-user-select:none;user-select:none}.ds-select__required{color:var(--color-text-error);margin-left:2px}.ds-select__field{display:flex;align-items:center;height:42px;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm);padding:0 var(--spacing-md);cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease;position:relative;appearance:none;-webkit-appearance:none;outline:none;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);text-align:left;width:100%}.ds-select__field:hover{border-color:var(--color-border-input-hover)}.ds-select__field:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select:focus-within .ds-select__field{border-color:var(--color-border-input-active)}.ds-select:focus-within:not([data-mouse-focus]) .ds-select__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select__value{flex:1;min-width:0;color:var(--color-text-primary)}.ds-select__value--placeholder{color:var(--color-text-placeholder)}.ds-select__control{flex:1;min-width:0;border:none;outline:none;background:transparent;appearance:none;-webkit-appearance:none;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);cursor:pointer;padding-right:var(--spacing-sm)}.ds-select__control:disabled{cursor:not-allowed}.ds-select__control option[value=\"\"]{color:var(--color-text-placeholder)}.ds-select__arrow{color:var(--color-icon-subtle);flex-shrink:0;pointer-events:none;transition:transform .15s ease}.ds-select__helper{font-family:var(--ref-typeface-plain);font-size:var(--ref-typescale-body-small-size);line-height:var(--ref-typescale-body-small-line-height);color:var(--color-text-secondary)}.ds-select__error-icon{color:var(--color-icon-error);flex-shrink:0;pointer-events:none}.ds-select.is-error .ds-select__field{border-color:var(--color-border-input-error)}.ds-select.is-error .ds-select__helper{color:var(--color-text-error)}.ds-select.is-error .ds-select__arrow{display:none}.ds-select.is-error:focus-within .ds-select__field{border-color:var(--color-border-input-error)}.ds-select.is-error:focus-within:not([data-mouse-focus]) .ds-select__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select.is-disabled{pointer-events:none}.ds-select.is-disabled .ds-select__field{background:var(--color-surface-input-disabled);border-color:var(--color-border-subtle)}.ds-select.is-disabled .ds-select__control{color:var(--color-text-disabled);cursor:not-allowed}.ds-select.is-disabled .ds-select__value{color:var(--color-text-disabled)}.ds-select .mat-mdc-form-field{width:100%}.ds-select{--mat-form-field-container-height: 42px;--mat-form-field-container-vertical-padding: 0px;--mdc-outlined-text-field-container-shape: var(--radius-sm);--mdc-outlined-text-field-outline-width: 1px;--mdc-outlined-text-field-outline-color: var(--color-border-input);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-hover);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-font: var(--ref-typeface-brand);--mdc-outlined-text-field-input-text-size: var(--ref-typescale-label-medium-size);--mdc-outlined-text-field-input-text-weight: var(--ref-typeface-weight-regular);--mdc-outlined-text-field-input-text-line-height: var(--ref-typescale-label-medium-line-height);--mdc-outlined-text-field-input-text-color: var(--color-text-primary);--mdc-outlined-text-field-disabled-input-text-color: var(--color-text-disabled);--mdc-outlined-text-field-input-text-placeholder-color: var(--color-text-placeholder)}.ds-select .mat-mdc-floating-label,.ds-select .mdc-floating-label,.ds-select .mat-mdc-form-field-subscript-wrapper{display:none}.ds-select .mat-mdc-text-field-wrapper{background:var(--color-surface-input);padding:0 var(--spacing-md);transition:border-color .15s ease,box-shadow .15s ease;cursor:pointer}.ds-select:focus-within:not(.is-error) .ds-select__arrow{color:var(--color-icon-brand)}.ds-select:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select.is-error{--mdc-outlined-text-field-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-error)}.ds-select.is-error:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-select.is-disabled{--mdc-outlined-text-field-disabled-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-disabled-outline-opacity: 1}.ds-select.is-disabled .mat-mdc-text-field-wrapper{background:var(--color-surface-input-disabled)}.ds-select.is-disabled .ds-select__label{color:var(--color-text-disabled)}.ds-select.is-disabled .ds-select__arrow{color:var(--color-icon-disabled)}.ds-select.is-disabled .ds-select__helper{color:var(--color-text-disabled)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class.ds-select']
            }], hostError: [{
                type: HostBinding,
                args: ['class.is-error']
            }], hostDisabled: [{
                type: HostBinding,
                args: ['class.is-disabled']
            }], onPointerDown: [{
                type: HostListener,
                args: ['mousedown']
            }, {
                type: HostListener,
                args: ['touchstart']
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout']
            }], label: [{
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], value: [{
                type: Input
            }], options: [{
                type: Input
            }], helperText: [{
                type: Input
            }], errorText: [{
                type: Input
            }], isError: [{
                type: Input
            }], disabled: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], inputRef: [{
                type: ViewChild,
                args: ['selectInput']
            }] } });

/**
 * ds-ag-paginator
 *
 * Custom AG Grid pagination panel — replaces the built-in AG Grid
 * pagination bar with Onflo design tokens and Material Symbols icons.
 *
 * AG Grid status bar usage:
 *   gridOptions = {
 *     suppressPaginationPanel: true,
 *     pagination: true,
 *     statusBar: {
 *       statusPanels: [
 *         { statusPanel: DsAgPaginatorComponent, align: 'right' }
 *       ]
 *     }
 *   }
 *
 * Standalone usage (place below the grid):
 *   <ds-ag-paginator [api]="gridApi" />
 *
 * ADA: Navigation buttons have aria-label. Range label is aria-live="polite"
 *      so screen readers announce page changes automatically.
 */
class DsAgPaginatorComponent {
    cdr;
    /**
     * AG Grid API instance.
     * Set this when using the component standalone (outside the grid status bar).
     * When used as a status panel, AG Grid injects the API via agInit().
     */
    set api(value) {
        this._api = value;
        if (value) {
            this.attachToGrid(value);
        }
    }
    get api() { return this._api; }
    _api = null;
    /** Page size options shown in the select. */
    pageSizeOptions = [100, 250, 500, 1000];
    currentPage = 0;
    pageSize = 25;
    totalRows = 0;
    totalPages = 0;
    _paginationListener = () => this.syncFromGrid();
    constructor(cdr) {
        this.cdr = cdr;
    }
    // ── AG Grid status panel lifecycle ────────────────────────────────────────
    /** Called by AG Grid when this component is registered as a status panel. */
    agInit(params) {
        this.attachToGrid(params.api);
    }
    ngOnInit() {
        // api binding is handled via the setter or agInit — nothing to do here.
    }
    ngOnDestroy() {
        this.detachFromGrid();
    }
    // ── Grid sync ─────────────────────────────────────────────────────────────
    attachToGrid(api) {
        this.detachFromGrid();
        this._api = api;
        api.addEventListener('paginationChanged', this._paginationListener);
        this.syncFromGrid();
    }
    detachFromGrid() {
        this._api?.removeEventListener('paginationChanged', this._paginationListener);
    }
    syncFromGrid() {
        if (!this._api) {
            return;
        }
        this.currentPage = this._api.paginationGetCurrentPage();
        this.pageSize = this._api.paginationGetPageSize();
        this.totalRows = this._api.paginationGetRowCount();
        this.totalPages = this._api.paginationGetTotalPages();
        this.cdr.markForCheck();
    }
    // ── Computed display values ───────────────────────────────────────────────
    get rangeStart() {
        if (this.totalRows === 0) {
            return 0;
        }
        return this.currentPage * this.pageSize + 1;
    }
    get rangeEnd() {
        return Math.min((this.currentPage + 1) * this.pageSize, this.totalRows);
    }
    get isFirstPage() { return this.currentPage === 0; }
    get isLastPage() { return this.currentPage >= this.totalPages - 1; }
    /** Current page size as a string for ds-select value binding. */
    get pageSizeStr() { return String(this.pageSize); }
    /** Page size options mapped to DsSelectOption[] for ds-select. */
    get pageSizeSelectOptions() {
        return this.pageSizeOptions.map(n => ({ value: String(n), label: String(n) }));
    }
    // ── Navigation ────────────────────────────────────────────────────────────
    firstPage() { this._api?.paginationGoToFirstPage(); }
    prevPage() { this._api?.paginationGoToPreviousPage(); }
    nextPage() { this._api?.paginationGoToNextPage(); }
    lastPage() { this._api?.paginationGoToLastPage(); }
    onPageSizeChange(value) {
        const size = +value;
        if (!isNaN(size)) {
            this._api?.paginationSetPageSize(size);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAgPaginatorComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsAgPaginatorComponent, isStandalone: true, selector: "ds-ag-paginator", inputs: { api: "api", pageSizeOptions: "pageSizeOptions" }, ngImport: i0, template: "<div class=\"ds-ag-paginator\">\n  <div class=\"ds-ag-paginator__inner\">\n\n    <!-- Items per page selector -->\n    <div class=\"ds-ag-paginator__counter\">\n      <span class=\"ds-ag-paginator__label\" aria-hidden=\"true\">Items per page:</span>\n      <ds-select\n        class=\"ds-ag-paginator__size-select\"\n        [options]=\"pageSizeSelectOptions\"\n        [value]=\"pageSizeStr\"\n        (valueChange)=\"onPageSizeChange($event)\"\n      />\n    </div>\n\n    <!-- Range + navigation -->\n    <div class=\"ds-ag-paginator__pagination\">\n      <span class=\"ds-ag-paginator__range\" aria-live=\"polite\">\n        {{ totalRows === 0 ? '0' : rangeStart }} - {{ rangeEnd }} of {{ totalRows }}\n      </span>\n\n      <div class=\"ds-ag-paginator__nav\">\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"First page\"\n          [disabled]=\"isFirstPage\"\n          (click)=\"firstPage()\"\n        >\n          <span class=\"ds-icon\">first_page</span>\n        </button>\n\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"Previous page\"\n          [disabled]=\"isFirstPage\"\n          (click)=\"prevPage()\"\n        >\n          <span class=\"ds-icon\">keyboard_arrow_left</span>\n        </button>\n\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"Next page\"\n          [disabled]=\"isLastPage\"\n          (click)=\"nextPage()\"\n        >\n          <span class=\"ds-icon\">keyboard_arrow_right</span>\n        </button>\n\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"Last page\"\n          [disabled]=\"isLastPage\"\n          (click)=\"lastPage()\"\n        >\n          <span class=\"ds-icon\">last_page</span>\n        </button>\n      </div>\n    </div>\n\n  </div>\n</div>\n", styles: [".ds-ag-paginator{display:flex;align-items:center;justify-content:flex-end;height:56px;min-height:35px;padding:0 var(--spacing-lg);background:var(--color-surface-subtle);overflow:hidden}.ds-ag-paginator__inner{display:flex;align-items:center;gap:var(--spacing-lg)}.ds-ag-paginator__counter{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-ag-paginator__label{font-family:var(--ref-typescale-body-small-font);font-size:var(--ref-typescale-body-small-size);font-weight:var(--ref-typescale-body-small-weight);line-height:var(--ref-typescale-body-small-line-height);letter-spacing:var(--ref-typescale-body-small-tracking);color:var(--color-text-primary);white-space:nowrap}.ds-ag-paginator__size-select{width:96px;flex-shrink:0}.ds-ag-paginator__pagination{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-ag-paginator__range{font-family:var(--ref-typescale-body-small-font);font-size:var(--ref-typescale-body-small-size);font-weight:var(--ref-typescale-body-small-weight);line-height:var(--ref-typescale-body-small-line-height);letter-spacing:var(--ref-typescale-body-small-tracking);color:var(--color-text-primary);white-space:nowrap}.ds-ag-paginator__nav{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-ag-paginator__btn{appearance:none;-webkit-appearance:none;border:none;background:transparent;width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-default);border-radius:var(--radius-sm);padding:var(--spacing-xs);flex-shrink:0;transition:background .12s ease}.ds-ag-paginator__btn:focus{outline:none}.ds-ag-paginator__btn:hover:not(:disabled){background:var(--overlay-hovered)}.ds-ag-paginator__btn:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-ag-paginator__btn:active:not(:disabled){background:var(--overlay-pressed)}.ds-ag-paginator__btn:disabled{color:var(--color-icon-disabled);cursor:not-allowed}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "component", type: DsSelectComponent, selector: "ds-select", inputs: ["label", "required", "placeholder", "value", "options", "helperText", "errorText", "isError", "disabled"], outputs: ["valueChange"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAgPaginatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-ag-paginator', standalone: true, imports: [CommonModule, DsSelectComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ds-ag-paginator\">\n  <div class=\"ds-ag-paginator__inner\">\n\n    <!-- Items per page selector -->\n    <div class=\"ds-ag-paginator__counter\">\n      <span class=\"ds-ag-paginator__label\" aria-hidden=\"true\">Items per page:</span>\n      <ds-select\n        class=\"ds-ag-paginator__size-select\"\n        [options]=\"pageSizeSelectOptions\"\n        [value]=\"pageSizeStr\"\n        (valueChange)=\"onPageSizeChange($event)\"\n      />\n    </div>\n\n    <!-- Range + navigation -->\n    <div class=\"ds-ag-paginator__pagination\">\n      <span class=\"ds-ag-paginator__range\" aria-live=\"polite\">\n        {{ totalRows === 0 ? '0' : rangeStart }} - {{ rangeEnd }} of {{ totalRows }}\n      </span>\n\n      <div class=\"ds-ag-paginator__nav\">\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"First page\"\n          [disabled]=\"isFirstPage\"\n          (click)=\"firstPage()\"\n        >\n          <span class=\"ds-icon\">first_page</span>\n        </button>\n\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"Previous page\"\n          [disabled]=\"isFirstPage\"\n          (click)=\"prevPage()\"\n        >\n          <span class=\"ds-icon\">keyboard_arrow_left</span>\n        </button>\n\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"Next page\"\n          [disabled]=\"isLastPage\"\n          (click)=\"nextPage()\"\n        >\n          <span class=\"ds-icon\">keyboard_arrow_right</span>\n        </button>\n\n        <button\n          class=\"ds-ag-paginator__btn\"\n          type=\"button\"\n          aria-label=\"Last page\"\n          [disabled]=\"isLastPage\"\n          (click)=\"lastPage()\"\n        >\n          <span class=\"ds-icon\">last_page</span>\n        </button>\n      </div>\n    </div>\n\n  </div>\n</div>\n", styles: [".ds-ag-paginator{display:flex;align-items:center;justify-content:flex-end;height:56px;min-height:35px;padding:0 var(--spacing-lg);background:var(--color-surface-subtle);overflow:hidden}.ds-ag-paginator__inner{display:flex;align-items:center;gap:var(--spacing-lg)}.ds-ag-paginator__counter{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-ag-paginator__label{font-family:var(--ref-typescale-body-small-font);font-size:var(--ref-typescale-body-small-size);font-weight:var(--ref-typescale-body-small-weight);line-height:var(--ref-typescale-body-small-line-height);letter-spacing:var(--ref-typescale-body-small-tracking);color:var(--color-text-primary);white-space:nowrap}.ds-ag-paginator__size-select{width:96px;flex-shrink:0}.ds-ag-paginator__pagination{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-ag-paginator__range{font-family:var(--ref-typescale-body-small-font);font-size:var(--ref-typescale-body-small-size);font-weight:var(--ref-typescale-body-small-weight);line-height:var(--ref-typescale-body-small-line-height);letter-spacing:var(--ref-typescale-body-small-tracking);color:var(--color-text-primary);white-space:nowrap}.ds-ag-paginator__nav{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-ag-paginator__btn{appearance:none;-webkit-appearance:none;border:none;background:transparent;width:42px;height:42px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-default);border-radius:var(--radius-sm);padding:var(--spacing-xs);flex-shrink:0;transition:background .12s ease}.ds-ag-paginator__btn:focus{outline:none}.ds-ag-paginator__btn:hover:not(:disabled){background:var(--overlay-hovered)}.ds-ag-paginator__btn:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-ag-paginator__btn:active:not(:disabled){background:var(--overlay-pressed)}.ds-ag-paginator__btn:disabled{color:var(--color-icon-disabled);cursor:not-allowed}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { api: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }] } });

class AgentStatusComponent {
    variant = 'call';
    online = true;
    get icon() {
        return this.variant === 'call' ? 'support_agent' : 'forum';
    }
    get statusLabel() {
        return this.online ? 'Online' : 'Offline';
    }
    get ariaLabel() {
        const typeName = this.variant === 'call' ? 'Call agent' : 'Live agent';
        return `${typeName} status: ${this.statusLabel}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: AgentStatusComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: AgentStatusComponent, isStandalone: true, selector: "ds-agent-status", inputs: { variant: "variant", online: "online" }, host: { styleAttribute: "display: contents" }, ngImport: i0, template: "<button\n  class=\"ds-agent-status\"\n  [class.is-offline]=\"!online\"\n  type=\"button\"\n  [attr.aria-pressed]=\"online\"\n  [attr.aria-label]=\"ariaLabel\"\n>\n  <div class=\"ds-agent-status__icon\">\n    <span class=\"ds-icon\" aria-hidden=\"true\">{{ icon }}</span>\n  </div>\n  <div class=\"ds-agent-status__status\">\n    <span>{{ statusLabel }}</span>\n    <span class=\"ds-icon\" aria-hidden=\"true\">keyboard_arrow_down</span>\n  </div>\n  <span class=\"ds-agent-status__indicator\" aria-hidden=\"true\"></span>\n</button>\n", styles: [".ds-agent-status{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--spacing-xs);width:64px;height:64px;box-sizing:border-box;border-radius:var(--radius-sm);overflow:hidden;background:transparent;border:none;cursor:pointer;position:relative}.ds-agent-status:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-agent-status:hover:after{background:var(--overlay-hovered)}.ds-agent-status:active:after{background:var(--overlay-pressed)}.ds-agent-status:focus{outline:none}.ds-agent-status:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-agent-status__icon{position:relative;display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:var(--radius-full);background:var(--color-surface-subtle);flex-shrink:0}.ds-agent-status__icon .ds-icon{font-size:24px;color:var(--color-icon-default)}.ds-agent-status__status{display:flex;align-items:center;justify-content:center;gap:var(--spacing-xs);font-family:var(--ref-typescale-label-small-font);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typescale-label-small-weight-prominent);line-height:var(--ref-typescale-label-small-line-height);letter-spacing:var(--ref-typescale-label-small-tracking);color:var(--color-text-primary);white-space:nowrap}.ds-agent-status__status .ds-icon{font-size:12px;color:var(--color-icon-default);line-height:1}.ds-agent-status__indicator{position:absolute;right:11px;top:33px;width:10px;height:10px;border-radius:var(--radius-full);background:var(--color-icon-accent-green);pointer-events:none;z-index:1}.ds-agent-status.is-offline .ds-agent-status__icon .ds-icon,.ds-agent-status.is-offline .ds-agent-status__status .ds-icon{color:var(--color-icon-disabled)}.ds-agent-status.is-offline .ds-agent-status__indicator{background:var(--color-icon-disabled)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: AgentStatusComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-agent-status', standalone: true, imports: [CommonModule], host: { style: 'display: contents' }, template: "<button\n  class=\"ds-agent-status\"\n  [class.is-offline]=\"!online\"\n  type=\"button\"\n  [attr.aria-pressed]=\"online\"\n  [attr.aria-label]=\"ariaLabel\"\n>\n  <div class=\"ds-agent-status__icon\">\n    <span class=\"ds-icon\" aria-hidden=\"true\">{{ icon }}</span>\n  </div>\n  <div class=\"ds-agent-status__status\">\n    <span>{{ statusLabel }}</span>\n    <span class=\"ds-icon\" aria-hidden=\"true\">keyboard_arrow_down</span>\n  </div>\n  <span class=\"ds-agent-status__indicator\" aria-hidden=\"true\"></span>\n</button>\n", styles: [".ds-agent-status{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--spacing-xs);width:64px;height:64px;box-sizing:border-box;border-radius:var(--radius-sm);overflow:hidden;background:transparent;border:none;cursor:pointer;position:relative}.ds-agent-status:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-agent-status:hover:after{background:var(--overlay-hovered)}.ds-agent-status:active:after{background:var(--overlay-pressed)}.ds-agent-status:focus{outline:none}.ds-agent-status:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-agent-status__icon{position:relative;display:flex;align-items:center;justify-content:center;width:42px;height:42px;border-radius:var(--radius-full);background:var(--color-surface-subtle);flex-shrink:0}.ds-agent-status__icon .ds-icon{font-size:24px;color:var(--color-icon-default)}.ds-agent-status__status{display:flex;align-items:center;justify-content:center;gap:var(--spacing-xs);font-family:var(--ref-typescale-label-small-font);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typescale-label-small-weight-prominent);line-height:var(--ref-typescale-label-small-line-height);letter-spacing:var(--ref-typescale-label-small-tracking);color:var(--color-text-primary);white-space:nowrap}.ds-agent-status__status .ds-icon{font-size:12px;color:var(--color-icon-default);line-height:1}.ds-agent-status__indicator{position:absolute;right:11px;top:33px;width:10px;height:10px;border-radius:var(--radius-full);background:var(--color-icon-accent-green);pointer-events:none;z-index:1}.ds-agent-status.is-offline .ds-agent-status__icon .ds-icon,.ds-agent-status.is-offline .ds-agent-status__status .ds-icon{color:var(--color-icon-disabled)}.ds-agent-status.is-offline .ds-agent-status__indicator{background:var(--color-icon-disabled)}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], online: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Alert / Banner
 *
 * Inline status banner for communicating success, warning, error, or info.
 * Use role="alert" for urgent messages; aria-live="polite" for informational ones.
 * Never rely on colour alone — icon and text both convey status.
 *
 * SM (default) — compact single row: tinted background, icon + title + body.
 * LG — two-section layout: tinted header band (icon + title), white body below.
 *
 * @example
 *   <ds-alert variant="info" title="Heads up" message="Your trial ends in 3 days." />
 *   <ds-alert variant="error" size="lg" title="Something went wrong" message="Please try again." [dismissible]="true" />
 *   <ds-alert variant="info" size="lg" title="Info" message="Details." actionLabel="Cancel" primaryActionLabel="Confirm" />
 *   <ds-alert variant="warning" message="Short message." [dismissible]="true" />
 */
class DsAlertComponent {
    /** Alert semantic variant. Default: 'info' */
    variant = 'info';
    /** Size variant. 'sm' = compact inline; 'lg' = two-section with header band. Default: 'sm' */
    size = 'sm';
    /** Bold title text. SM: shown above body. LG: shown in tinted header band. */
    title = '';
    /** Body message text. SM: shown below title. LG: shown in white body section. */
    message = '';
    /** Shows a dismiss (×) button. */
    dismissible = false;
    /** Secondary action button label (text style, brand colour). Shown bottom-right. */
    actionLabel = '';
    /** Primary action button label (filled style). Shown bottom-right after secondary. */
    primaryActionLabel = '';
    /** Whether the alert is currently visible. */
    visible = true;
    /** Emits when the dismiss button is clicked. */
    dismissed = new EventEmitter();
    /** Emits when the secondary action button is clicked. */
    actionClicked = new EventEmitter();
    /** Emits when the primary action button is clicked. */
    primaryActionClicked = new EventEmitter();
    get alertClasses() {
        const sizeClass = this.size === 'lg' ? ' ds-alert--lg' : '';
        return `ds-alert ds-alert--${this.variant}${sizeClass}`;
    }
    get iconName() {
        const icons = {
            info: 'info',
            success: 'check_circle',
            warning: 'warning',
            error: 'error',
        };
        return icons[this.variant];
    }
    onDismiss() {
        this.visible = false;
        this.dismissed.emit();
    }
    onAction() {
        this.actionClicked.emit();
    }
    onPrimaryAction() {
        this.primaryActionClicked.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsAlertComponent, isStandalone: true, selector: "ds-alert", inputs: { variant: "variant", size: "size", title: "title", message: "message", dismissible: "dismissible", actionLabel: "actionLabel", primaryActionLabel: "primaryActionLabel" }, outputs: { dismissed: "dismissed", actionClicked: "actionClicked", primaryActionClicked: "primaryActionClicked" }, ngImport: i0, template: "<div *ngIf=\"visible\" [class]=\"alertClasses\" role=\"alert\">\n\n  <!-- SM: single-row layout (icon + content side-by-side, tinted bg) -->\n  <ng-container *ngIf=\"size === 'sm'\">\n    <div class=\"ds-alert__header\">\n      <span class=\"ds-icon ds-alert__icon\" aria-hidden=\"true\">{{ iconName }}</span>\n      <div class=\"ds-alert__content\">\n        <div class=\"ds-alert__text\">\n          <strong *ngIf=\"title\" class=\"ds-alert__title\">{{ title }}</strong>\n          <p *ngIf=\"message\" class=\"ds-alert__message\">{{ message }}</p>\n          <ng-content></ng-content>\n        </div>\n        <div *ngIf=\"actionLabel || primaryActionLabel\" class=\"ds-alert__buttons\">\n          <button\n            *ngIf=\"actionLabel\"\n            type=\"button\"\n            class=\"ds-alert__action\"\n            (click)=\"onAction()\"\n          >{{ actionLabel }}</button>\n          <button\n            *ngIf=\"primaryActionLabel\"\n            type=\"button\"\n            class=\"ds-alert__primary-action\"\n            (click)=\"onPrimaryAction()\"\n          >{{ primaryActionLabel }}</button>\n        </div>\n      </div>\n      <button\n        *ngIf=\"dismissible\"\n        type=\"button\"\n        class=\"ds-alert__dismiss\"\n        aria-label=\"Dismiss alert\"\n        (click)=\"onDismiss()\"\n      >\n        <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n      </button>\n    </div>\n  </ng-container>\n\n  <!-- LG: two-section layout (tinted header band + white body) -->\n  <ng-container *ngIf=\"size === 'lg'\">\n    <div class=\"ds-alert__header\">\n      <span class=\"ds-icon ds-alert__icon\" aria-hidden=\"true\">{{ iconName }}</span>\n      <span class=\"ds-alert__label\">{{ title }}</span>\n      <button\n        *ngIf=\"dismissible\"\n        type=\"button\"\n        class=\"ds-alert__dismiss\"\n        aria-label=\"Dismiss alert\"\n        (click)=\"onDismiss()\"\n      >\n        <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n      </button>\n    </div>\n    <div class=\"ds-alert__body\">\n      <div class=\"ds-alert__text\">\n        <p *ngIf=\"message\" class=\"ds-alert__message\">{{ message }}</p>\n        <ng-content></ng-content>\n      </div>\n      <div *ngIf=\"actionLabel || primaryActionLabel\" class=\"ds-alert__buttons\">\n        <button\n          *ngIf=\"actionLabel\"\n          type=\"button\"\n          class=\"ds-alert__action\"\n          (click)=\"onAction()\"\n        >{{ actionLabel }}</button>\n        <button\n          *ngIf=\"primaryActionLabel\"\n          type=\"button\"\n          class=\"ds-alert__primary-action\"\n          (click)=\"onPrimaryAction()\"\n        >{{ primaryActionLabel }}</button>\n      </div>\n    </div>\n  </ng-container>\n\n</div>\n", styles: [".ds-alert{border-radius:var(--radius-md);border:1px solid transparent;overflow:hidden;position:relative}.ds-alert__header{display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-md)}.ds-alert__icon{flex-shrink:0;align-self:flex-start;font-size:24px;line-height:24px;font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.ds-alert__content{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--spacing-lg)}.ds-alert__text{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-alert__title{font-family:var(--ref-typescale-title-h3-font);font-size:var(--ref-typescale-title-h3-size);font-weight:var(--ref-typescale-title-h3-weight);line-height:var(--ref-typescale-title-h3-line-height);letter-spacing:var(--ref-typescale-title-h3-tracking);color:var(--color-text-primary)}.ds-alert__message{font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typescale-body-medium-weight);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);margin:0}.ds-alert__label{flex:1;min-width:0;font-family:var(--ref-typescale-label-large-font);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typescale-label-large-weight-prominent);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);color:var(--color-text-primary)}.ds-alert__body{padding:var(--spacing-lg);background:var(--color-surface-overlay);display:flex;flex-direction:column;gap:var(--spacing-lg)}.ds-alert__buttons{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-md)}.ds-alert__action{appearance:none;border:none;background:transparent;padding:0 var(--spacing-lg);height:42px;cursor:pointer;font-family:var(--ref-typescale-label-large-font);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typescale-label-large-weight-prominent);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);color:var(--color-text-brand);border-radius:var(--radius-sm);display:inline-flex;align-items:center;white-space:nowrap;position:relative}.ds-alert__action:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);background:transparent;pointer-events:none}.ds-alert__action:hover:after{background:var(--overlay-hovered)}.ds-alert__action:active:after{background:var(--overlay-pressed)}.ds-alert__action:focus{outline:none}.ds-alert__action:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-alert__primary-action{appearance:none;border:none;background:var(--color-surface-brand-bold);padding:0 var(--spacing-xl);height:42px;cursor:pointer;font-family:var(--ref-typescale-label-large-font);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typescale-label-large-weight-prominent);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);color:var(--color-text-on-brand);border-radius:var(--radius-sm);display:inline-flex;align-items:center;white-space:nowrap;overflow:hidden;position:relative}.ds-alert__primary-action:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none}.ds-alert__primary-action:hover:after{background:var(--overlay-hovered)}.ds-alert__primary-action:active:after{background:var(--overlay-pressed)}.ds-alert__primary-action:focus{outline:none}.ds-alert__primary-action:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-alert__dismiss{appearance:none;border:none;background:transparent;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:32px;height:32px;border-radius:var(--radius-sm);color:var(--color-icon-default);margin-left:auto;align-self:center;position:relative}.ds-alert__dismiss:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);background:transparent;pointer-events:none}.ds-alert__dismiss:hover:after{background:var(--overlay-hovered)}.ds-alert__dismiss:active:after{background:var(--overlay-pressed)}.ds-alert__dismiss:focus{outline:none}.ds-alert__dismiss:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-alert--lg .ds-alert__header{align-items:center}.ds-alert--info{background:var(--color-surface-info);border-color:var(--color-border-info);color:var(--color-text-primary)}.ds-alert--info .ds-alert__icon{color:var(--color-icon-info)}.ds-alert--info.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--info.ds-alert--lg .ds-alert__header{background:var(--color-surface-info)}.ds-alert--success{background:var(--color-surface-success);border-color:var(--color-border-success);color:var(--color-text-primary)}.ds-alert--success .ds-alert__icon{color:var(--color-icon-success)}.ds-alert--success.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--success.ds-alert--lg .ds-alert__header{background:var(--color-surface-success)}.ds-alert--warning{background:var(--color-surface-warning);border-color:var(--color-border-warning);color:var(--color-text-primary)}.ds-alert--warning .ds-alert__icon{color:var(--color-icon-warning)}.ds-alert--warning.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--warning.ds-alert--lg .ds-alert__header{background:var(--color-surface-warning)}.ds-alert--error{background:var(--color-surface-error);border-color:var(--color-border-error);color:var(--color-text-primary)}.ds-alert--error .ds-alert__icon{color:var(--color-icon-error)}.ds-alert--error.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--error.ds-alert--lg .ds-alert__header{background:var(--color-surface-error)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-alert', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"visible\" [class]=\"alertClasses\" role=\"alert\">\n\n  <!-- SM: single-row layout (icon + content side-by-side, tinted bg) -->\n  <ng-container *ngIf=\"size === 'sm'\">\n    <div class=\"ds-alert__header\">\n      <span class=\"ds-icon ds-alert__icon\" aria-hidden=\"true\">{{ iconName }}</span>\n      <div class=\"ds-alert__content\">\n        <div class=\"ds-alert__text\">\n          <strong *ngIf=\"title\" class=\"ds-alert__title\">{{ title }}</strong>\n          <p *ngIf=\"message\" class=\"ds-alert__message\">{{ message }}</p>\n          <ng-content></ng-content>\n        </div>\n        <div *ngIf=\"actionLabel || primaryActionLabel\" class=\"ds-alert__buttons\">\n          <button\n            *ngIf=\"actionLabel\"\n            type=\"button\"\n            class=\"ds-alert__action\"\n            (click)=\"onAction()\"\n          >{{ actionLabel }}</button>\n          <button\n            *ngIf=\"primaryActionLabel\"\n            type=\"button\"\n            class=\"ds-alert__primary-action\"\n            (click)=\"onPrimaryAction()\"\n          >{{ primaryActionLabel }}</button>\n        </div>\n      </div>\n      <button\n        *ngIf=\"dismissible\"\n        type=\"button\"\n        class=\"ds-alert__dismiss\"\n        aria-label=\"Dismiss alert\"\n        (click)=\"onDismiss()\"\n      >\n        <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n      </button>\n    </div>\n  </ng-container>\n\n  <!-- LG: two-section layout (tinted header band + white body) -->\n  <ng-container *ngIf=\"size === 'lg'\">\n    <div class=\"ds-alert__header\">\n      <span class=\"ds-icon ds-alert__icon\" aria-hidden=\"true\">{{ iconName }}</span>\n      <span class=\"ds-alert__label\">{{ title }}</span>\n      <button\n        *ngIf=\"dismissible\"\n        type=\"button\"\n        class=\"ds-alert__dismiss\"\n        aria-label=\"Dismiss alert\"\n        (click)=\"onDismiss()\"\n      >\n        <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n      </button>\n    </div>\n    <div class=\"ds-alert__body\">\n      <div class=\"ds-alert__text\">\n        <p *ngIf=\"message\" class=\"ds-alert__message\">{{ message }}</p>\n        <ng-content></ng-content>\n      </div>\n      <div *ngIf=\"actionLabel || primaryActionLabel\" class=\"ds-alert__buttons\">\n        <button\n          *ngIf=\"actionLabel\"\n          type=\"button\"\n          class=\"ds-alert__action\"\n          (click)=\"onAction()\"\n        >{{ actionLabel }}</button>\n        <button\n          *ngIf=\"primaryActionLabel\"\n          type=\"button\"\n          class=\"ds-alert__primary-action\"\n          (click)=\"onPrimaryAction()\"\n        >{{ primaryActionLabel }}</button>\n      </div>\n    </div>\n  </ng-container>\n\n</div>\n", styles: [".ds-alert{border-radius:var(--radius-md);border:1px solid transparent;overflow:hidden;position:relative}.ds-alert__header{display:flex;align-items:center;gap:var(--spacing-sm);padding:var(--spacing-md)}.ds-alert__icon{flex-shrink:0;align-self:flex-start;font-size:24px;line-height:24px;font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.ds-alert__content{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--spacing-lg)}.ds-alert__text{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-alert__title{font-family:var(--ref-typescale-title-h3-font);font-size:var(--ref-typescale-title-h3-size);font-weight:var(--ref-typescale-title-h3-weight);line-height:var(--ref-typescale-title-h3-line-height);letter-spacing:var(--ref-typescale-title-h3-tracking);color:var(--color-text-primary)}.ds-alert__message{font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typescale-body-medium-weight);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);margin:0}.ds-alert__label{flex:1;min-width:0;font-family:var(--ref-typescale-label-large-font);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typescale-label-large-weight-prominent);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);color:var(--color-text-primary)}.ds-alert__body{padding:var(--spacing-lg);background:var(--color-surface-overlay);display:flex;flex-direction:column;gap:var(--spacing-lg)}.ds-alert__buttons{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-md)}.ds-alert__action{appearance:none;border:none;background:transparent;padding:0 var(--spacing-lg);height:42px;cursor:pointer;font-family:var(--ref-typescale-label-large-font);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typescale-label-large-weight-prominent);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);color:var(--color-text-brand);border-radius:var(--radius-sm);display:inline-flex;align-items:center;white-space:nowrap;position:relative}.ds-alert__action:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);background:transparent;pointer-events:none}.ds-alert__action:hover:after{background:var(--overlay-hovered)}.ds-alert__action:active:after{background:var(--overlay-pressed)}.ds-alert__action:focus{outline:none}.ds-alert__action:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-alert__primary-action{appearance:none;border:none;background:var(--color-surface-brand-bold);padding:0 var(--spacing-xl);height:42px;cursor:pointer;font-family:var(--ref-typescale-label-large-font);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typescale-label-large-weight-prominent);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);color:var(--color-text-on-brand);border-radius:var(--radius-sm);display:inline-flex;align-items:center;white-space:nowrap;overflow:hidden;position:relative}.ds-alert__primary-action:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none}.ds-alert__primary-action:hover:after{background:var(--overlay-hovered)}.ds-alert__primary-action:active:after{background:var(--overlay-pressed)}.ds-alert__primary-action:focus{outline:none}.ds-alert__primary-action:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-alert__dismiss{appearance:none;border:none;background:transparent;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:32px;height:32px;border-radius:var(--radius-sm);color:var(--color-icon-default);margin-left:auto;align-self:center;position:relative}.ds-alert__dismiss:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);background:transparent;pointer-events:none}.ds-alert__dismiss:hover:after{background:var(--overlay-hovered)}.ds-alert__dismiss:active:after{background:var(--overlay-pressed)}.ds-alert__dismiss:focus{outline:none}.ds-alert__dismiss:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-alert--lg .ds-alert__header{align-items:center}.ds-alert--info{background:var(--color-surface-info);border-color:var(--color-border-info);color:var(--color-text-primary)}.ds-alert--info .ds-alert__icon{color:var(--color-icon-info)}.ds-alert--info.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--info.ds-alert--lg .ds-alert__header{background:var(--color-surface-info)}.ds-alert--success{background:var(--color-surface-success);border-color:var(--color-border-success);color:var(--color-text-primary)}.ds-alert--success .ds-alert__icon{color:var(--color-icon-success)}.ds-alert--success.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--success.ds-alert--lg .ds-alert__header{background:var(--color-surface-success)}.ds-alert--warning{background:var(--color-surface-warning);border-color:var(--color-border-warning);color:var(--color-text-primary)}.ds-alert--warning .ds-alert__icon{color:var(--color-icon-warning)}.ds-alert--warning.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--warning.ds-alert--lg .ds-alert__header{background:var(--color-surface-warning)}.ds-alert--error{background:var(--color-surface-error);border-color:var(--color-border-error);color:var(--color-text-primary)}.ds-alert--error .ds-alert__icon{color:var(--color-icon-error)}.ds-alert--error.ds-alert--lg{background:var(--color-surface-overlay)}.ds-alert--error.ds-alert--lg .ds-alert__header{background:var(--color-surface-error)}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], title: [{
                type: Input
            }], message: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], actionLabel: [{
                type: Input
            }], primaryActionLabel: [{
                type: Input
            }], dismissed: [{
                type: Output
            }], actionClicked: [{
                type: Output
            }], primaryActionClicked: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Avatar
 *
 * A standalone Angular component wrapping the ds-avatar CSS class API.
 * Renders an image if src is provided; falls back to initials or a generic icon.
 *
 * For direct class usage without Angular:
 *   <div class="ds-avatar ds-avatar--md">
 *     <img class="ds-avatar__img" src="..." alt="Name" />
 *   </div>
 *
 * @example
 *   <ds-avatar src="photo.jpg" initials="RB" alt="Rebecca Benedict" />
 *   <ds-avatar initials="JD" size="lg" />
 *   <ds-avatar size="sm" />
 */
class DsAvatarComponent {
    /** Image URL. Falls back to initials or icon if empty or on error. */
    src = '';
    /** Initials to show when no image is available (max 2 chars). */
    initials = '';
    /** Alt text for the image. */
    alt = '';
    /** Size variant. Default: 'md' */
    size = 'md';
    /** Whether the image failed to load. */
    imageError = false;
    get avatarClasses() {
        return `ds-avatar ds-avatar--${this.size}`;
    }
    get showImage() {
        return !!this.src && !this.imageError;
    }
    get showInitials() {
        return !this.showImage && !!this.initials;
    }
    get showIcon() {
        return !this.showImage && !this.initials;
    }
    get displayInitials() {
        return this.initials.slice(0, 2).toUpperCase();
    }
    ngOnInit() {
        this.imageError = false;
    }
    onImageError() {
        this.imageError = true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAvatarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsAvatarComponent, isStandalone: true, selector: "ds-avatar", inputs: { src: "src", initials: "initials", alt: "alt", size: "size" }, ngImport: i0, template: "<div [class]=\"avatarClasses\" [attr.aria-label]=\"alt || initials || 'Avatar'\">\n  <!-- Image -->\n  <img\n    *ngIf=\"showImage\"\n    class=\"ds-avatar__img\"\n    [src]=\"src\"\n    [alt]=\"alt\"\n    (error)=\"onImageError()\"\n  />\n\n  <!-- Initials fallback -->\n  <span *ngIf=\"showInitials\" class=\"ds-avatar__initials\" aria-hidden=\"true\">\n    {{ displayInitials }}\n  </span>\n\n  <!-- Icon fallback -->\n  <span *ngIf=\"showIcon\" class=\"ds-icon ds-icon--filled\" aria-hidden=\"true\">person</span>\n</div>\n", styles: [".ds-avatar{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--radius-full);overflow:hidden;flex-shrink:0;background:var(--color-surface-brand);position:relative}.ds-avatar--xs{width:24px;height:24px}.ds-avatar--xs .ds-avatar__initials{font-size:9px}.ds-avatar--xs .ds-icon{font-size:14px}.ds-avatar--sm{width:32px;height:32px}.ds-avatar--sm .ds-avatar__initials{font-size:11px}.ds-avatar--sm .ds-icon{font-size:18px}.ds-avatar--md,.ds-avatar:not([class*=ds-avatar--]){width:40px;height:40px}.ds-avatar--md .ds-avatar__initials,.ds-avatar:not([class*=ds-avatar--]) .ds-avatar__initials{font-size:14px}.ds-avatar--md .ds-icon,.ds-avatar:not([class*=ds-avatar--]) .ds-icon{font-size:22px}.ds-avatar--lg{width:56px;height:56px}.ds-avatar--lg .ds-avatar__initials{font-size:18px}.ds-avatar--lg .ds-icon{font-size:30px}.ds-avatar--xl{width:72px;height:72px}.ds-avatar--xl .ds-avatar__initials{font-size:24px}.ds-avatar--xl .ds-icon{font-size:38px}.ds-avatar__img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}.ds-avatar__initials{font-family:var(--ref-typeface-brand);font-weight:var(--ref-typeface-weight-bold);color:var(--color-text-brand);line-height:1;text-transform:uppercase;letter-spacing:.02em;-webkit-user-select:none;user-select:none}.ds-avatar .ds-icon{color:var(--color-icon-brand);font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsAvatarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-avatar', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div [class]=\"avatarClasses\" [attr.aria-label]=\"alt || initials || 'Avatar'\">\n  <!-- Image -->\n  <img\n    *ngIf=\"showImage\"\n    class=\"ds-avatar__img\"\n    [src]=\"src\"\n    [alt]=\"alt\"\n    (error)=\"onImageError()\"\n  />\n\n  <!-- Initials fallback -->\n  <span *ngIf=\"showInitials\" class=\"ds-avatar__initials\" aria-hidden=\"true\">\n    {{ displayInitials }}\n  </span>\n\n  <!-- Icon fallback -->\n  <span *ngIf=\"showIcon\" class=\"ds-icon ds-icon--filled\" aria-hidden=\"true\">person</span>\n</div>\n", styles: [".ds-avatar{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--radius-full);overflow:hidden;flex-shrink:0;background:var(--color-surface-brand);position:relative}.ds-avatar--xs{width:24px;height:24px}.ds-avatar--xs .ds-avatar__initials{font-size:9px}.ds-avatar--xs .ds-icon{font-size:14px}.ds-avatar--sm{width:32px;height:32px}.ds-avatar--sm .ds-avatar__initials{font-size:11px}.ds-avatar--sm .ds-icon{font-size:18px}.ds-avatar--md,.ds-avatar:not([class*=ds-avatar--]){width:40px;height:40px}.ds-avatar--md .ds-avatar__initials,.ds-avatar:not([class*=ds-avatar--]) .ds-avatar__initials{font-size:14px}.ds-avatar--md .ds-icon,.ds-avatar:not([class*=ds-avatar--]) .ds-icon{font-size:22px}.ds-avatar--lg{width:56px;height:56px}.ds-avatar--lg .ds-avatar__initials{font-size:18px}.ds-avatar--lg .ds-icon{font-size:30px}.ds-avatar--xl{width:72px;height:72px}.ds-avatar--xl .ds-avatar__initials{font-size:24px}.ds-avatar--xl .ds-icon{font-size:38px}.ds-avatar__img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}.ds-avatar__initials{font-family:var(--ref-typeface-brand);font-weight:var(--ref-typeface-weight-bold);color:var(--color-text-brand);line-height:1;text-transform:uppercase;letter-spacing:.02em;-webkit-user-select:none;user-select:none}.ds-avatar .ds-icon{color:var(--color-icon-brand);font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}\n"] }]
        }], propDecorators: { src: [{
                type: Input
            }], initials: [{
                type: Input
            }], alt: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Badge
 *
 * Notification indicator primitive. Two sizes matching Figma Large / Small:
 *
 * **Large (count circle)** — 20px red circle with white number:
 *   <ds-badge [count]="3" />
 *
 * **Small (dot)** — 6×6px red dot:
 *   <ds-badge [dot]="true" />
 *
 * **Overlay on icon button** — wrap with `.ds-badge-indicator__host`:
 *   <div class="ds-badge-indicator__host">
 *     <ds-icon-button aria-label="Notifications, 3 unread" ... />
 *     <ds-badge [count]="3" />
 *   </div>
 *
 * **Inline in tab / nav item** — place directly after label text:
 *   <button class="ds-tabs__tab" aria-label="Inbox, 5 new">
 *     Inbox&nbsp;<ds-badge [count]="5" />
 *   </button>
 *
 * ADA: The rendered span is aria-hidden="true".
 *      Always announce the count via aria-label on the parent element.
 */
class DsBadgeComponent {
    /** Count value shown inside the circle (Large size). Ignored when dot=true. */
    count = '';
    /** Renders as a 6×6px dot with no text (Small size). */
    dot = false;
    get indicatorClasses() {
        return ['ds-badge-indicator', this.dot ? 'ds-badge-indicator--dot' : '']
            .filter(Boolean)
            .join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsBadgeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsBadgeComponent, isStandalone: true, selector: "ds-badge", inputs: { count: "count", dot: "dot" }, ngImport: i0, template: "<span [class]=\"indicatorClasses\" aria-hidden=\"true\">\n  <ng-container *ngIf=\"!dot\">{{ count }}</ng-container>\n</span>\n", styles: [".ds-badge-indicator{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;max-width:36px;padding:0 var(--spacing-xs);border-radius:var(--radius-full);background:var(--color-surface-accent-red-bold);color:var(--color-text-on-bold);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-bold);line-height:1;letter-spacing:var(--ref-typescale-label-small-tracking);overflow:hidden;white-space:nowrap;pointer-events:none;flex-shrink:0;vertical-align:middle}.ds-badge-indicator--dot{width:6px;height:6px;min-width:6px;max-width:6px;padding:0}.mat-badge{--mat-badge-background-color: var(--color-surface-accent-red-bold);--mat-badge-text-color: var(--color-text-on-bold);--mat-badge-text-size: var(--ref-typescale-label-small-size);--mat-badge-text-weight: var(--ref-typeface-weight-bold);--mat-badge-container-size: 20px;--mat-badge-container-shape: var(--radius-full)}.mat-badge.mat-badge-small{--mat-badge-container-size: 6px}.ds-badge-indicator__host{position:relative;display:inline-flex}.ds-badge-indicator__host .ds-badge-indicator{position:absolute;top:-4px;right:-4px}.ds-badge-indicator__host .ds-badge-indicator--dot{top:-1px;right:-1px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsBadgeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-badge', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span [class]=\"indicatorClasses\" aria-hidden=\"true\">\n  <ng-container *ngIf=\"!dot\">{{ count }}</ng-container>\n</span>\n", styles: [".ds-badge-indicator{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;max-width:36px;padding:0 var(--spacing-xs);border-radius:var(--radius-full);background:var(--color-surface-accent-red-bold);color:var(--color-text-on-bold);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-bold);line-height:1;letter-spacing:var(--ref-typescale-label-small-tracking);overflow:hidden;white-space:nowrap;pointer-events:none;flex-shrink:0;vertical-align:middle}.ds-badge-indicator--dot{width:6px;height:6px;min-width:6px;max-width:6px;padding:0}.mat-badge{--mat-badge-background-color: var(--color-surface-accent-red-bold);--mat-badge-text-color: var(--color-text-on-bold);--mat-badge-text-size: var(--ref-typescale-label-small-size);--mat-badge-text-weight: var(--ref-typeface-weight-bold);--mat-badge-container-size: 20px;--mat-badge-container-shape: var(--radius-full)}.mat-badge.mat-badge-small{--mat-badge-container-size: 6px}.ds-badge-indicator__host{position:relative;display:inline-flex}.ds-badge-indicator__host .ds-badge-indicator{position:absolute;top:-4px;right:-4px}.ds-badge-indicator__host .ds-badge-indicator--dot{top:-1px;right:-1px}\n"] }]
        }], propDecorators: { count: [{
                type: Input
            }], dot: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Button
 *
 * A standalone Angular component wrapping the ds-button CSS class API.
 * For direct class usage without the Angular component, use:
 *   <button class="ds-button ds-button--filled">Label</button>
 *
 * Variant → Material directive mapping:
 *   filled              → mat-flat-button
 *   outlined            → mat-stroked-button
 *   text / destructive / destructive-outlined → mat-button
 *
 * @example
 *   <ds-button variant="filled" (clicked)="onSave()">Save</ds-button>
 *   <ds-button variant="outlined" size="sm" [disabled]="true">Cancel</ds-button>
 *   <ds-button variant="destructive">Delete</ds-button>
 */
class DsButtonComponent {
    /** Visual style. Default: 'filled' */
    variant = 'filled';
    /** Size scale. Default: 'md' */
    size = 'md';
    /** Disables the button and applies disabled styling. */
    disabled = false;
    /** Native button type attribute. Default: 'button' */
    type = 'button';
    /** Emits the native MouseEvent when the button is clicked. */
    clicked = new EventEmitter();
    get buttonClasses() {
        return `ds-button ds-button--${this.variant} ds-button--${this.size}`;
    }
    handleClick(event) {
        if (!this.disabled) {
            this.clicked.emit(event);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsButtonComponent, isStandalone: true, selector: "ds-button", inputs: { variant: "variant", size: "size", disabled: "disabled", type: "type" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<ng-container [ngSwitch]=\"variant\">\n\n  <!-- filled \u2192 mat-flat-button -->\n  <button\n    *ngSwitchCase=\"'filled'\"\n    mat-flat-button\n    [class]=\"buttonClasses\"\n    [disabled]=\"disabled\"\n    [type]=\"type\"\n    [disableRipple]=\"true\"\n    (click)=\"handleClick($event)\"\n  >\n    <ng-content select=\"[slot='icon-leading']\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"[slot='icon-trailing']\"></ng-content>\n  </button>\n\n  <!-- outlined \u2192 mat-stroked-button -->\n  <button\n    *ngSwitchCase=\"'outlined'\"\n    mat-stroked-button\n    [class]=\"buttonClasses\"\n    [disabled]=\"disabled\"\n    [type]=\"type\"\n    [disableRipple]=\"true\"\n    (click)=\"handleClick($event)\"\n  >\n    <ng-content select=\"[slot='icon-leading']\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"[slot='icon-trailing']\"></ng-content>\n  </button>\n\n  <!-- text / destructive / destructive-outlined \u2192 mat-button -->\n  <button\n    *ngSwitchDefault\n    mat-button\n    [class]=\"buttonClasses\"\n    [disabled]=\"disabled\"\n    [type]=\"type\"\n    [disableRipple]=\"true\"\n    (click)=\"handleClick($event)\"\n  >\n    <ng-content select=\"[slot='icon-leading']\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"[slot='icon-trailing']\"></ng-content>\n  </button>\n\n</ng-container>\n", styles: [".ds-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-sm);white-space:nowrap;flex-shrink:0;min-height:42px;border:1px solid transparent;border-radius:var(--radius-sm);padding:0 var(--spacing-xl);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);cursor:pointer;position:relative;overflow:hidden;text-decoration:none;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease}.ds-button:focus{outline:none}.ds-button:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .1s ease}.ds-button__icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:18px;height:18px}.ds-button__icon svg{width:100%;height:100%}.ds-button .ds-icon{font-size:18px;width:18px;height:18px}.ds-button--xs{font-size:var(--ref-typescale-label-small-size);min-height:24px;padding:0 var(--spacing-sm);gap:var(--spacing-sm);border-radius:var(--radius-sm)}.ds-button--xs .ds-button__icon,.ds-button--xs .ds-icon{width:12px;height:12px;font-size:12px}.ds-button--sm{min-height:32px;padding:0 var(--spacing-lg)}.ds-button--sm .ds-button__icon,.ds-button--sm .ds-icon{width:16px;height:16px;font-size:16px}.ds-button--lg{min-height:56px;padding:0 calc(var(--spacing-xl) + var(--spacing-sm))}.ds-button--lg .ds-button__icon,.ds-button--lg .ds-icon{width:20px;height:20px;font-size:20px}.ds-button--leading-icon{padding-left:var(--spacing-lg)}.ds-button--trailing-icon{padding-right:var(--spacing-lg)}.ds-button--sm.ds-button--leading-icon{padding-left:var(--spacing-sm)}.ds-button--sm.ds-button--trailing-icon{padding-right:var(--spacing-sm)}.ds-button--lg.ds-button--leading-icon{padding-left:var(--spacing-xl)}.ds-button--lg.ds-button--trailing-icon{padding-right:var(--spacing-xl)}.ds-button--filled{background:var(--color-surface-brand-bold);color:var(--color-text-on-brand)}.ds-button--filled:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-button--filled:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--filled:focus-visible:after{background:var(--overlay-focused)}.ds-button--filled:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-button--filled.is-error{background:var(--color-surface-error);color:var(--color-text-error);border-color:transparent}.ds-button--filled.is-error:hover:not(:disabled):after{background:var(--overlay-accent-red-hovered)}.ds-button--filled.is-error:active:not(:disabled):after{background:var(--overlay-accent-red-pressed)}.ds-button--outlined{background:transparent;color:var(--color-text-brand);border-color:var(--color-border-primary)}.ds-button--outlined:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover)}.ds-button--outlined:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--outlined:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active)}.ds-button--outlined.is-error{color:var(--color-text-error);border-color:var(--color-border-error)}.ds-button--outlined.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered);border-color:var(--color-border-error)}.ds-button--outlined.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button--text{background:transparent;color:var(--color-text-brand);border-color:transparent}.ds-button--text:hover:not(:disabled){background:var(--overlay-hovered)}.ds-button--text:focus-visible{background:var(--overlay-focused);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--text:active:not(:disabled){background:var(--overlay-pressed)}.ds-button--text.is-error{color:var(--color-text-error)}.ds-button--text.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered)}.ds-button--text.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button--destructive{background:transparent;color:var(--color-text-primary);border-color:transparent}.ds-button--destructive:hover:not(:disabled){background:var(--overlay-accent-red-hovered);color:var(--color-text-accent-red)}.ds-button--destructive:focus-visible{background:var(--overlay-accent-red-focused);color:var(--color-text-accent-red);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--destructive:active:not(:disabled){background:var(--overlay-accent-red-pressed);color:var(--color-text-accent-red)}.ds-button--destructive.is-error{color:var(--color-text-error)}.ds-button--destructive.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered)}.ds-button--destructive.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button--destructive-outlined{background:transparent;color:var(--color-text-primary);border-color:var(--color-border-primary)}.ds-button--destructive-outlined:hover:not(:disabled){background:var(--overlay-accent-red-hovered);color:var(--color-text-accent-red);border-color:var(--color-border-accent-red)}.ds-button--destructive-outlined:focus-visible{background:var(--overlay-accent-red-focused);color:var(--color-text-accent-red);border-color:var(--color-border-accent-red);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--destructive-outlined:active:not(:disabled){background:var(--overlay-accent-red-pressed);color:var(--color-text-accent-red);border-color:var(--color-border-accent-red)}.ds-button--destructive-outlined.is-error{color:var(--color-text-error);border-color:var(--color-border-error)}.ds-button--destructive-outlined.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered);border-color:var(--color-border-error)}.ds-button--destructive-outlined.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button:disabled,.ds-button[aria-disabled=true]{cursor:not-allowed}.ds-button:disabled:after,.ds-button[aria-disabled=true]:after{background:transparent!important}.ds-button--filled:disabled{background:var(--color-surface-disabled);color:var(--color-text-disabled);border-color:transparent}.ds-button--outlined:disabled,.ds-button--destructive-outlined:disabled{background:transparent;color:var(--color-text-disabled);border-color:var(--color-border-subtle)}.ds-button--text:disabled,.ds-button--destructive:disabled{background:transparent;color:var(--color-text-disabled);border-color:transparent}.ds-button.is-loading{cursor:wait;pointer-events:none}.ds-button.is-loading:before{content:\"\";width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:ds-btn-spin .7s linear infinite;flex-shrink:0}@keyframes ds-btn-spin{to{transform:rotate(360deg)}}.mat-mdc-raised-button.ds-button,.mat-mdc-outlined-button.ds-button,.mat-mdc-text-button.ds-button{--mdc-filled-button-container-color: transparent;--mdc-filled-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit;--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-outline-color: transparent;--mdc-filled-button-container-elevation: 0;--mdc-filled-button-hover-container-elevation: 0;--mdc-filled-button-focus-container-elevation: 0;--mdc-filled-button-pressed-container-elevation: 0;--mat-filled-button-hover-state-layer-opacity: 0;--mat-filled-button-focus-state-layer-opacity: 0;--mat-filled-button-pressed-state-layer-opacity: 0;--mat-outlined-button-hover-state-layer-opacity: 0;--mat-outlined-button-focus-state-layer-opacity: 0;--mat-outlined-button-pressed-state-layer-opacity: 0;--mat-text-button-hover-state-layer-opacity: 0;--mat-text-button-focus-state-layer-opacity: 0;--mat-text-button-pressed-state-layer-opacity: 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1$1.MatButton, selector: "    button[matButton], a[matButton], button[mat-button], button[mat-raised-button],    button[mat-flat-button], button[mat-stroked-button], a[mat-button], a[mat-raised-button],    a[mat-flat-button], a[mat-stroked-button]  ", inputs: ["matButton"], exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-button', standalone: true, imports: [CommonModule, MatButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container [ngSwitch]=\"variant\">\n\n  <!-- filled \u2192 mat-flat-button -->\n  <button\n    *ngSwitchCase=\"'filled'\"\n    mat-flat-button\n    [class]=\"buttonClasses\"\n    [disabled]=\"disabled\"\n    [type]=\"type\"\n    [disableRipple]=\"true\"\n    (click)=\"handleClick($event)\"\n  >\n    <ng-content select=\"[slot='icon-leading']\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"[slot='icon-trailing']\"></ng-content>\n  </button>\n\n  <!-- outlined \u2192 mat-stroked-button -->\n  <button\n    *ngSwitchCase=\"'outlined'\"\n    mat-stroked-button\n    [class]=\"buttonClasses\"\n    [disabled]=\"disabled\"\n    [type]=\"type\"\n    [disableRipple]=\"true\"\n    (click)=\"handleClick($event)\"\n  >\n    <ng-content select=\"[slot='icon-leading']\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"[slot='icon-trailing']\"></ng-content>\n  </button>\n\n  <!-- text / destructive / destructive-outlined \u2192 mat-button -->\n  <button\n    *ngSwitchDefault\n    mat-button\n    [class]=\"buttonClasses\"\n    [disabled]=\"disabled\"\n    [type]=\"type\"\n    [disableRipple]=\"true\"\n    (click)=\"handleClick($event)\"\n  >\n    <ng-content select=\"[slot='icon-leading']\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"[slot='icon-trailing']\"></ng-content>\n  </button>\n\n</ng-container>\n", styles: [".ds-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-sm);white-space:nowrap;flex-shrink:0;min-height:42px;border:1px solid transparent;border-radius:var(--radius-sm);padding:0 var(--spacing-xl);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-large-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-label-large-line-height);letter-spacing:var(--ref-typescale-label-large-tracking);cursor:pointer;position:relative;overflow:hidden;text-decoration:none;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease}.ds-button:focus{outline:none}.ds-button:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .1s ease}.ds-button__icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:18px;height:18px}.ds-button__icon svg{width:100%;height:100%}.ds-button .ds-icon{font-size:18px;width:18px;height:18px}.ds-button--xs{font-size:var(--ref-typescale-label-small-size);min-height:24px;padding:0 var(--spacing-sm);gap:var(--spacing-sm);border-radius:var(--radius-sm)}.ds-button--xs .ds-button__icon,.ds-button--xs .ds-icon{width:12px;height:12px;font-size:12px}.ds-button--sm{min-height:32px;padding:0 var(--spacing-lg)}.ds-button--sm .ds-button__icon,.ds-button--sm .ds-icon{width:16px;height:16px;font-size:16px}.ds-button--lg{min-height:56px;padding:0 calc(var(--spacing-xl) + var(--spacing-sm))}.ds-button--lg .ds-button__icon,.ds-button--lg .ds-icon{width:20px;height:20px;font-size:20px}.ds-button--leading-icon{padding-left:var(--spacing-lg)}.ds-button--trailing-icon{padding-right:var(--spacing-lg)}.ds-button--sm.ds-button--leading-icon{padding-left:var(--spacing-sm)}.ds-button--sm.ds-button--trailing-icon{padding-right:var(--spacing-sm)}.ds-button--lg.ds-button--leading-icon{padding-left:var(--spacing-xl)}.ds-button--lg.ds-button--trailing-icon{padding-right:var(--spacing-xl)}.ds-button--filled{background:var(--color-surface-brand-bold);color:var(--color-text-on-brand)}.ds-button--filled:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-button--filled:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--filled:focus-visible:after{background:var(--overlay-focused)}.ds-button--filled:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-button--filled.is-error{background:var(--color-surface-error);color:var(--color-text-error);border-color:transparent}.ds-button--filled.is-error:hover:not(:disabled):after{background:var(--overlay-accent-red-hovered)}.ds-button--filled.is-error:active:not(:disabled):after{background:var(--overlay-accent-red-pressed)}.ds-button--outlined{background:transparent;color:var(--color-text-brand);border-color:var(--color-border-primary)}.ds-button--outlined:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover)}.ds-button--outlined:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--outlined:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active)}.ds-button--outlined.is-error{color:var(--color-text-error);border-color:var(--color-border-error)}.ds-button--outlined.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered);border-color:var(--color-border-error)}.ds-button--outlined.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button--text{background:transparent;color:var(--color-text-brand);border-color:transparent}.ds-button--text:hover:not(:disabled){background:var(--overlay-hovered)}.ds-button--text:focus-visible{background:var(--overlay-focused);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--text:active:not(:disabled){background:var(--overlay-pressed)}.ds-button--text.is-error{color:var(--color-text-error)}.ds-button--text.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered)}.ds-button--text.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button--destructive{background:transparent;color:var(--color-text-primary);border-color:transparent}.ds-button--destructive:hover:not(:disabled){background:var(--overlay-accent-red-hovered);color:var(--color-text-accent-red)}.ds-button--destructive:focus-visible{background:var(--overlay-accent-red-focused);color:var(--color-text-accent-red);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--destructive:active:not(:disabled){background:var(--overlay-accent-red-pressed);color:var(--color-text-accent-red)}.ds-button--destructive.is-error{color:var(--color-text-error)}.ds-button--destructive.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered)}.ds-button--destructive.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button--destructive-outlined{background:transparent;color:var(--color-text-primary);border-color:var(--color-border-primary)}.ds-button--destructive-outlined:hover:not(:disabled){background:var(--overlay-accent-red-hovered);color:var(--color-text-accent-red);border-color:var(--color-border-accent-red)}.ds-button--destructive-outlined:focus-visible{background:var(--overlay-accent-red-focused);color:var(--color-text-accent-red);border-color:var(--color-border-accent-red);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-button--destructive-outlined:active:not(:disabled){background:var(--overlay-accent-red-pressed);color:var(--color-text-accent-red);border-color:var(--color-border-accent-red)}.ds-button--destructive-outlined.is-error{color:var(--color-text-error);border-color:var(--color-border-error)}.ds-button--destructive-outlined.is-error:hover:not(:disabled){background:var(--overlay-accent-red-hovered);border-color:var(--color-border-error)}.ds-button--destructive-outlined.is-error:active:not(:disabled){background:var(--overlay-accent-red-pressed)}.ds-button:disabled,.ds-button[aria-disabled=true]{cursor:not-allowed}.ds-button:disabled:after,.ds-button[aria-disabled=true]:after{background:transparent!important}.ds-button--filled:disabled{background:var(--color-surface-disabled);color:var(--color-text-disabled);border-color:transparent}.ds-button--outlined:disabled,.ds-button--destructive-outlined:disabled{background:transparent;color:var(--color-text-disabled);border-color:var(--color-border-subtle)}.ds-button--text:disabled,.ds-button--destructive:disabled{background:transparent;color:var(--color-text-disabled);border-color:transparent}.ds-button.is-loading{cursor:wait;pointer-events:none}.ds-button.is-loading:before{content:\"\";width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:ds-btn-spin .7s linear infinite;flex-shrink:0}@keyframes ds-btn-spin{to{transform:rotate(360deg)}}.mat-mdc-raised-button.ds-button,.mat-mdc-outlined-button.ds-button,.mat-mdc-text-button.ds-button{--mdc-filled-button-container-color: transparent;--mdc-filled-button-label-text-color: inherit;--mdc-outlined-button-label-text-color: inherit;--mdc-text-button-label-text-color: inherit;--mdc-outlined-button-outline-color: transparent;--mdc-filled-button-container-elevation: 0;--mdc-filled-button-hover-container-elevation: 0;--mdc-filled-button-focus-container-elevation: 0;--mdc-filled-button-pressed-container-elevation: 0;--mat-filled-button-hover-state-layer-opacity: 0;--mat-filled-button-focus-state-layer-opacity: 0;--mat-filled-button-pressed-state-layer-opacity: 0;--mat-outlined-button-hover-state-layer-opacity: 0;--mat-outlined-button-focus-state-layer-opacity: 0;--mat-outlined-button-pressed-state-layer-opacity: 0;--mat-text-button-hover-state-layer-opacity: 0;--mat-text-button-focus-state-layer-opacity: 0;--mat-text-button-pressed-state-layer-opacity: 0}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });

/**
 * ds-card
 *
 * Based on Angular Material mat-card.
 * Import MatCardModule in your Angular module.
 *
 * @example
 * <ds-card variant="outlined">
 *   <ds-card-header title="Card Title" subtitle="Subtitle" icon="folder" />
 *   <ds-card-content>Content here</ds-card-content>
 *   <ds-card-actions>
 *     <button class="ds-button ds-button--filled">Save</button>
 *   </ds-card-actions>
 * </ds-card>
 */
class DsCardComponent {
    /** Visual variant: 'outlined' | 'elevated' */
    variant = 'outlined';
    /** Makes the card interactive with hover/press states */
    interactive = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsCardComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsCardComponent, isStandalone: true, selector: "ds-card", inputs: { variant: "variant", interactive: "interactive" }, ngImport: i0, template: "<mat-card\n  class=\"ds-card\"\n  [class.ds-card--outlined]=\"variant === 'outlined'\"\n  [class.ds-card--elevated]=\"variant === 'elevated'\"\n  [class.ds-card--interactive]=\"interactive\"\n>\n  <ng-content />\n</mat-card>\n", styles: [".ds-card{background:var(--color-surface-page);border-radius:var(--radius-md);overflow:hidden;position:relative;transition:box-shadow .15s ease,border-color .15s ease}.ds-card--outlined{border:1px solid var(--color-border-subtle);box-shadow:none}.ds-card--elevated{border:1px solid transparent;box-shadow:0 1px 4px var(--shadow-elevation-1),0 2px 8px var(--shadow-elevation-2)}.ds-card--interactive{cursor:pointer}.ds-card--interactive:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .12s ease;border-radius:inherit}.ds-card--interactive:hover:after{background:var(--overlay-hovered)}.ds-card--interactive:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring);outline:none}.ds-card--interactive:focus-visible:after{background:var(--overlay-focused)}.ds-card--interactive:active:after{background:var(--overlay-pressed)}.ds-card__header{display:flex;align-items:flex-start;gap:var(--spacing-md);padding:var(--spacing-lg);padding-bottom:0}.ds-card__header-icon{color:var(--color-icon-brand);font-size:24px;width:24px;height:24px;flex-shrink:0;margin-top:2px}.ds-card__header-text{flex:1;min-width:0}.ds-card__header-action{flex-shrink:0;margin:-4px -4px 0 0}.ds-card__title{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-title-h4-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h4-line-height);color:var(--color-text-primary);margin:0}.ds-card__subtitle{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);margin:2px 0 0}.ds-card__content{padding:var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);color:var(--color-text-secondary)}.ds-card__header+.ds-card__content{padding-top:var(--spacing-sm)}.ds-card__media{width:100%;display:block;object-fit:cover;background:var(--color-surface-default)}.ds-card__media--square{aspect-ratio:1/1}.ds-card__media--wide{aspect-ratio:16/9}.ds-card__actions{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-sm);padding:var(--spacing-sm) var(--spacing-lg);border-top:1px solid var(--color-border-subtle)}.ds-card__actions--start{justify-content:flex-start}.ds-card--horizontal{display:flex;align-items:stretch}.ds-card--horizontal .ds-card__media{width:80px;flex-shrink:0;object-fit:cover}.ds-card--horizontal .ds-card__body{flex:1;min-width:0;display:flex;flex-direction:column}.ds-card--horizontal .ds-card__content{flex:1}.mat-mdc-card{--mdc-elevated-card-container-color: var(--color-surface-page);--mdc-outlined-card-container-color: var(--color-surface-page);--mdc-outlined-card-outline-color: var(--color-border-subtle);border-radius:var(--radius-md);box-shadow:none}.mat-mdc-card.ds-card--elevated{border:1px solid transparent;box-shadow:0 1px 4px var(--shadow-elevation-1),0 2px 8px var(--shadow-elevation-2)}.mat-mdc-card.ds-card--outlined{border:1px solid var(--color-border-subtle);box-shadow:none}\n"], dependencies: [{ kind: "ngmodule", type: MatCardModule }, { kind: "component", type: i1$2.MatCard, selector: "mat-card", inputs: ["appearance"], exportAs: ["matCard"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-card', standalone: true, imports: [MatCardModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-card\n  class=\"ds-card\"\n  [class.ds-card--outlined]=\"variant === 'outlined'\"\n  [class.ds-card--elevated]=\"variant === 'elevated'\"\n  [class.ds-card--interactive]=\"interactive\"\n>\n  <ng-content />\n</mat-card>\n", styles: [".ds-card{background:var(--color-surface-page);border-radius:var(--radius-md);overflow:hidden;position:relative;transition:box-shadow .15s ease,border-color .15s ease}.ds-card--outlined{border:1px solid var(--color-border-subtle);box-shadow:none}.ds-card--elevated{border:1px solid transparent;box-shadow:0 1px 4px var(--shadow-elevation-1),0 2px 8px var(--shadow-elevation-2)}.ds-card--interactive{cursor:pointer}.ds-card--interactive:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .12s ease;border-radius:inherit}.ds-card--interactive:hover:after{background:var(--overlay-hovered)}.ds-card--interactive:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring);outline:none}.ds-card--interactive:focus-visible:after{background:var(--overlay-focused)}.ds-card--interactive:active:after{background:var(--overlay-pressed)}.ds-card__header{display:flex;align-items:flex-start;gap:var(--spacing-md);padding:var(--spacing-lg);padding-bottom:0}.ds-card__header-icon{color:var(--color-icon-brand);font-size:24px;width:24px;height:24px;flex-shrink:0;margin-top:2px}.ds-card__header-text{flex:1;min-width:0}.ds-card__header-action{flex-shrink:0;margin:-4px -4px 0 0}.ds-card__title{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-title-h4-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h4-line-height);color:var(--color-text-primary);margin:0}.ds-card__subtitle{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);margin:2px 0 0}.ds-card__content{padding:var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);color:var(--color-text-secondary)}.ds-card__header+.ds-card__content{padding-top:var(--spacing-sm)}.ds-card__media{width:100%;display:block;object-fit:cover;background:var(--color-surface-default)}.ds-card__media--square{aspect-ratio:1/1}.ds-card__media--wide{aspect-ratio:16/9}.ds-card__actions{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-sm);padding:var(--spacing-sm) var(--spacing-lg);border-top:1px solid var(--color-border-subtle)}.ds-card__actions--start{justify-content:flex-start}.ds-card--horizontal{display:flex;align-items:stretch}.ds-card--horizontal .ds-card__media{width:80px;flex-shrink:0;object-fit:cover}.ds-card--horizontal .ds-card__body{flex:1;min-width:0;display:flex;flex-direction:column}.ds-card--horizontal .ds-card__content{flex:1}.mat-mdc-card{--mdc-elevated-card-container-color: var(--color-surface-page);--mdc-outlined-card-container-color: var(--color-surface-page);--mdc-outlined-card-outline-color: var(--color-border-subtle);border-radius:var(--radius-md);box-shadow:none}.mat-mdc-card.ds-card--elevated{border:1px solid transparent;box-shadow:0 1px 4px var(--shadow-elevation-1),0 2px 8px var(--shadow-elevation-2)}.mat-mdc-card.ds-card--outlined{border:1px solid var(--color-border-subtle);box-shadow:none}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], interactive: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Checkbox
 *
 * A standalone Angular component wrapping the ds-checkbox CSS class API.
 * For direct class usage without Angular:
 *   <label class="ds-checkbox">
 *     <input type="checkbox" class="ds-checkbox__control" />
 *     <span class="ds-checkbox__box"></span>
 *     <span class="ds-checkbox__label">Label</span>
 *   </label>
 *
 * @example
 *   <ds-checkbox label="Remember me" [(checked)]="remember" />
 *   <ds-checkbox label="Select all" [indeterminate]="someSelected" [(checked)]="allSelected" />
 *   <ds-checkbox label="Accept terms" [isError]="true" />
 */
class DsCheckboxComponent {
    /** Label text displayed next to the checkbox. */
    label = '';
    /** Whether the checkbox is checked. Use [(checked)] for two-way binding. */
    checked = false;
    /** Indeterminate state (partially selected). */
    indeterminate = false;
    /** Applies error styling. */
    isError = false;
    /** Disables the checkbox. */
    disabled = false;
    /** Emits the new checked value when toggled. */
    checkedChange = new EventEmitter();
    onChange(event) {
        this.checked = event.checked;
        this.checkedChange.emit(this.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsCheckboxComponent, isStandalone: true, selector: "ds-checkbox", inputs: { label: "label", checked: "checked", indeterminate: "indeterminate", isError: "isError", disabled: "disabled" }, outputs: { checkedChange: "checkedChange" }, ngImport: i0, template: "<mat-checkbox\n  class=\"ds-checkbox\"\n  [class.is-error]=\"isError\"\n  [checked]=\"checked\"\n  [indeterminate]=\"indeterminate\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"true\"\n  (change)=\"onChange($event)\"\n>\n  <span *ngIf=\"label\" class=\"ds-checkbox__label\">{{ label }}</span>\n  <ng-content></ng-content>\n</mat-checkbox>\n", styles: [".ds-checkbox{display:inline-flex;align-items:center;gap:var(--spacing-xs);cursor:pointer;-webkit-user-select:none;user-select:none}.ds-checkbox__control{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.ds-checkbox__touch{flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;transition:background-color .15s ease,box-shadow .15s ease}.ds-checkbox:hover:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-hovered)}.ds-checkbox:active:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-pressed)}.ds-checkbox__control:focus{outline:none}.ds-checkbox__control:focus-visible~.ds-checkbox__touch{background:var(--overlay-pressed);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-checkbox__box{width:24px;height:24px;display:flex;align-items:center;justify-content:center;position:relative}.ds-checkbox__box:after{content:\"check_box_outline_blank\";font-family:Material Symbols Rounded;font-size:24px;font-style:normal;font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24;line-height:1;color:var(--color-border-input);transition:color .15s ease}.ds-checkbox__control:checked~.ds-checkbox__touch .ds-checkbox__box:after{content:\"check_box\";font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24;color:var(--color-surface-brand-bold)}.ds-checkbox__control:indeterminate~.ds-checkbox__touch .ds-checkbox__box:after{content:\"indeterminate_check_box\";font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24;color:var(--color-surface-brand-bold)}.ds-checkbox__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary)}.ds-checkbox.is-error .ds-checkbox__box:after{color:var(--color-border-input-error)}.ds-checkbox.is-error .ds-checkbox__label{color:var(--color-text-error)}.ds-checkbox.is-error:hover:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-accent-red-hovered)}.ds-checkbox.is-error:active:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-accent-red-pressed)}.ds-checkbox.is-error .ds-checkbox__control:focus-visible~.ds-checkbox__touch{background:var(--overlay-accent-red-pressed);box-shadow:0 0 0 2px var(--color-border-input-error)}.ds-checkbox.is-error .ds-checkbox__control:checked~.ds-checkbox__touch .ds-checkbox__box:after,.ds-checkbox.is-error .ds-checkbox__control:indeterminate~.ds-checkbox__touch .ds-checkbox__box:after{color:var(--color-surface-accent-red-bold)}.ds-checkbox.is-disabled,.ds-checkbox:has(.ds-checkbox__control:disabled){cursor:not-allowed;pointer-events:none}.ds-checkbox.is-disabled .ds-checkbox__box:after,.ds-checkbox:has(.ds-checkbox__control:disabled) .ds-checkbox__box:after{color:var(--color-icon-disabled)}.ds-checkbox.is-disabled .ds-checkbox__label,.ds-checkbox:has(.ds-checkbox__control:disabled) .ds-checkbox__label{color:var(--color-text-disabled)}.mat-mdc-checkbox.ds-checkbox{--mdc-checkbox-selected-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-selected-checkmark-color: var(--color-text-on-brand);--mdc-checkbox-unselected-icon-color: var(--color-border-input);--mdc-checkbox-selected-focus-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-selected-hover-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-selected-pressed-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-unselected-focus-icon-color: var(--color-border-input);--mdc-checkbox-unselected-hover-icon-color: var(--color-border-input);--mdc-checkbox-unselected-pressed-icon-color: var(--color-border-input);--mdc-checkbox-disabled-selected-icon-color: var(--color-icon-disabled);--mdc-checkbox-disabled-unselected-icon-color: var(--color-icon-disabled);--mdc-checkbox-disabled-selected-checkmark-color: var(--color-surface-page);--mdc-checkbox-state-layer-size: 42px;--mat-checkbox-checked-hover-state-layer-opacity: 0;--mat-checkbox-checked-focus-state-layer-opacity: 0;--mat-checkbox-checked-pressed-state-layer-opacity: 0;--mat-checkbox-unchecked-hover-state-layer-opacity: 0;--mat-checkbox-unchecked-focus-state-layer-opacity: 0;--mat-checkbox-unchecked-pressed-state-layer-opacity: 0;--mat-checkbox-label-text-font: var(--ref-typeface-brand);--mat-checkbox-label-text-size: var(--ref-typescale-label-medium-size);--mat-checkbox-label-text-weight: var(--ref-typeface-weight-regular);--mat-checkbox-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-checkbox-label-text-color: var(--color-text-primary);--mat-checkbox-disabled-label-color: var(--color-text-disabled)}.mat-mdc-checkbox.ds-checkbox .mdc-checkbox__focus-ring{display:none}.mat-mdc-checkbox.ds-checkbox:not(.mat-mdc-checkbox-disabled):hover .mdc-checkbox{background:var(--overlay-hovered);border-radius:var(--radius-full)}.mat-mdc-checkbox.ds-checkbox:not(.mat-mdc-checkbox-disabled):active .mdc-checkbox{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-checkbox.ds-checkbox:has(.mdc-checkbox__native-control:focus-visible) .mdc-checkbox{background:var(--overlay-pressed);border-radius:var(--radius-full);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-checkbox.ds-checkbox.is-error{--mdc-checkbox-unselected-icon-color: var(--color-border-input-error);--mdc-checkbox-unselected-focus-icon-color: var(--color-border-input-error);--mdc-checkbox-unselected-hover-icon-color: var(--color-border-input-error);--mdc-checkbox-unselected-pressed-icon-color: var(--color-border-input-error);--mdc-checkbox-selected-icon-color: var(--color-surface-accent-red-bold);--mdc-checkbox-selected-focus-icon-color: var(--color-surface-accent-red-bold);--mdc-checkbox-selected-hover-icon-color: var(--color-surface-accent-red-bold);--mdc-checkbox-selected-pressed-icon-color: var(--color-surface-accent-red-bold)}.mat-mdc-checkbox.ds-checkbox.is-error:not(.mat-mdc-checkbox-disabled):hover .mdc-checkbox{background:var(--overlay-accent-red-hovered)}.mat-mdc-checkbox.ds-checkbox.is-error:not(.mat-mdc-checkbox-disabled):active .mdc-checkbox{background:var(--overlay-accent-red-pressed)}.mat-mdc-checkbox.ds-checkbox.is-error:has(.mdc-checkbox__native-control:focus-visible) .mdc-checkbox{background:var(--overlay-accent-red-pressed);box-shadow:0 0 0 2px var(--color-border-input-error)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatCheckboxModule }, { kind: "component", type: i2$2.MatCheckbox, selector: "mat-checkbox", inputs: ["aria-label", "aria-labelledby", "aria-describedby", "aria-expanded", "aria-controls", "aria-owns", "id", "required", "labelPosition", "name", "value", "disableRipple", "tabIndex", "color", "disabledInteractive", "checked", "disabled", "indeterminate"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-checkbox', standalone: true, imports: [CommonModule, MatCheckboxModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-checkbox\n  class=\"ds-checkbox\"\n  [class.is-error]=\"isError\"\n  [checked]=\"checked\"\n  [indeterminate]=\"indeterminate\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"true\"\n  (change)=\"onChange($event)\"\n>\n  <span *ngIf=\"label\" class=\"ds-checkbox__label\">{{ label }}</span>\n  <ng-content></ng-content>\n</mat-checkbox>\n", styles: [".ds-checkbox{display:inline-flex;align-items:center;gap:var(--spacing-xs);cursor:pointer;-webkit-user-select:none;user-select:none}.ds-checkbox__control{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.ds-checkbox__touch{flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;transition:background-color .15s ease,box-shadow .15s ease}.ds-checkbox:hover:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-hovered)}.ds-checkbox:active:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-pressed)}.ds-checkbox__control:focus{outline:none}.ds-checkbox__control:focus-visible~.ds-checkbox__touch{background:var(--overlay-pressed);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-checkbox__box{width:24px;height:24px;display:flex;align-items:center;justify-content:center;position:relative}.ds-checkbox__box:after{content:\"check_box_outline_blank\";font-family:Material Symbols Rounded;font-size:24px;font-style:normal;font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24;line-height:1;color:var(--color-border-input);transition:color .15s ease}.ds-checkbox__control:checked~.ds-checkbox__touch .ds-checkbox__box:after{content:\"check_box\";font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24;color:var(--color-surface-brand-bold)}.ds-checkbox__control:indeterminate~.ds-checkbox__touch .ds-checkbox__box:after{content:\"indeterminate_check_box\";font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24;color:var(--color-surface-brand-bold)}.ds-checkbox__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary)}.ds-checkbox.is-error .ds-checkbox__box:after{color:var(--color-border-input-error)}.ds-checkbox.is-error .ds-checkbox__label{color:var(--color-text-error)}.ds-checkbox.is-error:hover:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-accent-red-hovered)}.ds-checkbox.is-error:active:not(.is-disabled) .ds-checkbox__touch{background:var(--overlay-accent-red-pressed)}.ds-checkbox.is-error .ds-checkbox__control:focus-visible~.ds-checkbox__touch{background:var(--overlay-accent-red-pressed);box-shadow:0 0 0 2px var(--color-border-input-error)}.ds-checkbox.is-error .ds-checkbox__control:checked~.ds-checkbox__touch .ds-checkbox__box:after,.ds-checkbox.is-error .ds-checkbox__control:indeterminate~.ds-checkbox__touch .ds-checkbox__box:after{color:var(--color-surface-accent-red-bold)}.ds-checkbox.is-disabled,.ds-checkbox:has(.ds-checkbox__control:disabled){cursor:not-allowed;pointer-events:none}.ds-checkbox.is-disabled .ds-checkbox__box:after,.ds-checkbox:has(.ds-checkbox__control:disabled) .ds-checkbox__box:after{color:var(--color-icon-disabled)}.ds-checkbox.is-disabled .ds-checkbox__label,.ds-checkbox:has(.ds-checkbox__control:disabled) .ds-checkbox__label{color:var(--color-text-disabled)}.mat-mdc-checkbox.ds-checkbox{--mdc-checkbox-selected-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-selected-checkmark-color: var(--color-text-on-brand);--mdc-checkbox-unselected-icon-color: var(--color-border-input);--mdc-checkbox-selected-focus-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-selected-hover-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-selected-pressed-icon-color: var(--color-surface-brand-bold);--mdc-checkbox-unselected-focus-icon-color: var(--color-border-input);--mdc-checkbox-unselected-hover-icon-color: var(--color-border-input);--mdc-checkbox-unselected-pressed-icon-color: var(--color-border-input);--mdc-checkbox-disabled-selected-icon-color: var(--color-icon-disabled);--mdc-checkbox-disabled-unselected-icon-color: var(--color-icon-disabled);--mdc-checkbox-disabled-selected-checkmark-color: var(--color-surface-page);--mdc-checkbox-state-layer-size: 42px;--mat-checkbox-checked-hover-state-layer-opacity: 0;--mat-checkbox-checked-focus-state-layer-opacity: 0;--mat-checkbox-checked-pressed-state-layer-opacity: 0;--mat-checkbox-unchecked-hover-state-layer-opacity: 0;--mat-checkbox-unchecked-focus-state-layer-opacity: 0;--mat-checkbox-unchecked-pressed-state-layer-opacity: 0;--mat-checkbox-label-text-font: var(--ref-typeface-brand);--mat-checkbox-label-text-size: var(--ref-typescale-label-medium-size);--mat-checkbox-label-text-weight: var(--ref-typeface-weight-regular);--mat-checkbox-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-checkbox-label-text-color: var(--color-text-primary);--mat-checkbox-disabled-label-color: var(--color-text-disabled)}.mat-mdc-checkbox.ds-checkbox .mdc-checkbox__focus-ring{display:none}.mat-mdc-checkbox.ds-checkbox:not(.mat-mdc-checkbox-disabled):hover .mdc-checkbox{background:var(--overlay-hovered);border-radius:var(--radius-full)}.mat-mdc-checkbox.ds-checkbox:not(.mat-mdc-checkbox-disabled):active .mdc-checkbox{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-checkbox.ds-checkbox:has(.mdc-checkbox__native-control:focus-visible) .mdc-checkbox{background:var(--overlay-pressed);border-radius:var(--radius-full);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-checkbox.ds-checkbox.is-error{--mdc-checkbox-unselected-icon-color: var(--color-border-input-error);--mdc-checkbox-unselected-focus-icon-color: var(--color-border-input-error);--mdc-checkbox-unselected-hover-icon-color: var(--color-border-input-error);--mdc-checkbox-unselected-pressed-icon-color: var(--color-border-input-error);--mdc-checkbox-selected-icon-color: var(--color-surface-accent-red-bold);--mdc-checkbox-selected-focus-icon-color: var(--color-surface-accent-red-bold);--mdc-checkbox-selected-hover-icon-color: var(--color-surface-accent-red-bold);--mdc-checkbox-selected-pressed-icon-color: var(--color-surface-accent-red-bold)}.mat-mdc-checkbox.ds-checkbox.is-error:not(.mat-mdc-checkbox-disabled):hover .mdc-checkbox{background:var(--overlay-accent-red-hovered)}.mat-mdc-checkbox.ds-checkbox.is-error:not(.mat-mdc-checkbox-disabled):active .mdc-checkbox{background:var(--overlay-accent-red-pressed)}.mat-mdc-checkbox.ds-checkbox.is-error:has(.mdc-checkbox__native-control:focus-visible) .mdc-checkbox{background:var(--overlay-accent-red-pressed);box-shadow:0 0 0 2px var(--color-border-input-error)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], checked: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], isError: [{
                type: Input
            }], disabled: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }] } });

/**
 * ds-chip
 *
 * Based on Angular Material mat-chip.
 * Import MatChipsModule in your Angular module.
 *
 * @example
 * <ds-chip label="Design" icon="local_offer" (removed)="onRemove()" />
 * <ds-chip label="Error item" [error]="true" (removed)="onRemove()" />
 * <ds-chip label="No remove" [removable]="false" />
 */
class DsChipComponent {
    label = '';
    icon;
    removable = true;
    disabled = false;
    error = false;
    active = false;
    removed = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsChipComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsChipComponent, isStandalone: true, selector: "ds-chip", inputs: { label: "label", icon: "icon", removable: "removable", disabled: "disabled", error: "error", active: "active" }, outputs: { removed: "removed" }, ngImport: i0, template: "<mat-chip\n  class=\"ds-chip\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [class.is-active]=\"active\"\n  [disabled]=\"disabled\"\n  (removed)=\"removed.emit()\"\n>\n  <span *ngIf=\"icon\" class=\"ds-icon ds-icon--sm ds-chip__icon\">{{ icon }}</span>\n  <span class=\"ds-chip__label\">{{ label }}</span>\n  <button\n    *ngIf=\"removable\"\n    matChipRemove\n    class=\"ds-chip__remove\"\n    [attr.aria-label]=\"'Remove ' + label\"\n  >\n    <span class=\"ds-icon ds-icon--sm\">close</span>\n  </button>\n</mat-chip>\n", styles: [".ds-chip{display:inline-flex;align-items:center;gap:var(--spacing-xs);height:32px;padding:0 var(--spacing-md);background:var(--color-surface-brand);border:1px solid transparent;border-radius:var(--radius-full);font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-brand);cursor:default;overflow:hidden;position:relative}.ds-chip:after{content:\"\";position:absolute;inset:0;pointer-events:none}.ds-chip:focus{outline:none}.ds-chip:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-chip:hover:not(.is-disabled):not(.is-error){border-color:var(--color-border-hover)}.ds-chip:hover:not(.is-disabled):not(.is-error):after{background:var(--overlay-hovered)}.ds-chip:active:not(.is-disabled):not(.is-error){border-color:var(--color-border-active)}.ds-chip:active:not(.is-disabled):not(.is-error):after{background:var(--overlay-pressed)}.ds-chip.is-active:not(.is-disabled){border-color:var(--color-border-active)}.ds-chip.is-error{background:var(--color-surface-error);border-color:var(--color-border-input-error);color:var(--color-text-error)}.ds-chip.is-error .ds-chip__icon,.ds-chip.is-error .ds-chip__remove{color:var(--color-icon-error)}.ds-chip.is-disabled{background:var(--color-surface-disabled);border-color:var(--color-border-subtle);color:var(--color-text-disabled);pointer-events:none}.ds-chip.is-disabled .ds-chip__icon,.ds-chip.is-disabled .ds-chip__remove{color:var(--color-icon-disabled)}.ds-chip__icon{color:var(--color-icon-brand);flex-shrink:0;position:relative;z-index:1}.ds-chip__label{white-space:nowrap;position:relative;z-index:1}.ds-chip__remove{appearance:none;border:none;background:transparent;padding:0;width:20px;height:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-brand);border-radius:var(--radius-full);flex-shrink:0;position:relative;z-index:1;transition:background .12s}.ds-chip__remove:hover{background:var(--overlay-hovered)}.ds-chip__remove:focus{outline:none}.ds-chip__remove:focus-visible{box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-chip-list{display:flex;flex-wrap:wrap;gap:var(--spacing-xs);align-items:center}.mat-mdc-chip{--mdc-chip-container-height: 32px;--mdc-chip-container-shape: var(--radius-full);--mdc-chip-flat-container-color: var(--color-surface-brand);--mdc-chip-outline-color: transparent;--mdc-chip-label-text-color: var(--color-text-brand);--mdc-chip-label-text-font: var(--ref-typescale-label-medium-font);--mdc-chip-label-text-size: var(--ref-typescale-label-medium-size);--mdc-chip-label-text-weight: var(--ref-typescale-label-medium-weight-prominent);--mdc-chip-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mdc-chip-label-text-tracking: var(--ref-typescale-label-medium-tracking);--mat-chip-trailing-action-color: var(--color-icon-brand);--mat-chip-disabled-trailing-action-color: var(--color-icon-disabled);--mat-chip-hover-state-layer-opacity: 0;--mat-chip-focus-state-layer-opacity: 0;--mat-chip-selected-state-layer-opacity: 0;--mdc-chip-disabled-label-text-color: var(--color-text-disabled)}.mat-mdc-chip:hover:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-hover)}.mat-mdc-chip:active:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-active)}.mat-mdc-chip.is-active:not(.mat-mdc-chip-disabled){--mdc-chip-outline-color: var(--color-border-active)}.mat-mdc-chip.is-error{--mdc-chip-flat-container-color: var(--color-surface-error);--mdc-chip-outline-color: var(--color-border-input-error);--mdc-chip-label-text-color: var(--color-text-error);--mat-chip-trailing-action-color: var(--color-icon-error)}.mat-mdc-chip.is-disabled,.mat-mdc-chip.mat-mdc-chip-disabled{--mdc-chip-flat-container-color: var(--color-surface-disabled);--mdc-chip-outline-color: var(--color-border-subtle);--mdc-chip-label-text-color: var(--color-text-disabled)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatChipsModule }, { kind: "component", type: i2$3.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "directive", type: i2$3.MatChipRemove, selector: "[matChipRemove]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsChipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-chip', standalone: true, imports: [CommonModule, MatChipsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-chip\n  class=\"ds-chip\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [class.is-active]=\"active\"\n  [disabled]=\"disabled\"\n  (removed)=\"removed.emit()\"\n>\n  <span *ngIf=\"icon\" class=\"ds-icon ds-icon--sm ds-chip__icon\">{{ icon }}</span>\n  <span class=\"ds-chip__label\">{{ label }}</span>\n  <button\n    *ngIf=\"removable\"\n    matChipRemove\n    class=\"ds-chip__remove\"\n    [attr.aria-label]=\"'Remove ' + label\"\n  >\n    <span class=\"ds-icon ds-icon--sm\">close</span>\n  </button>\n</mat-chip>\n", styles: [".ds-chip{display:inline-flex;align-items:center;gap:var(--spacing-xs);height:32px;padding:0 var(--spacing-md);background:var(--color-surface-brand);border:1px solid transparent;border-radius:var(--radius-full);font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-brand);cursor:default;overflow:hidden;position:relative}.ds-chip:after{content:\"\";position:absolute;inset:0;pointer-events:none}.ds-chip:focus{outline:none}.ds-chip:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-chip:hover:not(.is-disabled):not(.is-error){border-color:var(--color-border-hover)}.ds-chip:hover:not(.is-disabled):not(.is-error):after{background:var(--overlay-hovered)}.ds-chip:active:not(.is-disabled):not(.is-error){border-color:var(--color-border-active)}.ds-chip:active:not(.is-disabled):not(.is-error):after{background:var(--overlay-pressed)}.ds-chip.is-active:not(.is-disabled){border-color:var(--color-border-active)}.ds-chip.is-error{background:var(--color-surface-error);border-color:var(--color-border-input-error);color:var(--color-text-error)}.ds-chip.is-error .ds-chip__icon,.ds-chip.is-error .ds-chip__remove{color:var(--color-icon-error)}.ds-chip.is-disabled{background:var(--color-surface-disabled);border-color:var(--color-border-subtle);color:var(--color-text-disabled);pointer-events:none}.ds-chip.is-disabled .ds-chip__icon,.ds-chip.is-disabled .ds-chip__remove{color:var(--color-icon-disabled)}.ds-chip__icon{color:var(--color-icon-brand);flex-shrink:0;position:relative;z-index:1}.ds-chip__label{white-space:nowrap;position:relative;z-index:1}.ds-chip__remove{appearance:none;border:none;background:transparent;padding:0;width:20px;height:20px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-brand);border-radius:var(--radius-full);flex-shrink:0;position:relative;z-index:1;transition:background .12s}.ds-chip__remove:hover{background:var(--overlay-hovered)}.ds-chip__remove:focus{outline:none}.ds-chip__remove:focus-visible{box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-chip-list{display:flex;flex-wrap:wrap;gap:var(--spacing-xs);align-items:center}.mat-mdc-chip{--mdc-chip-container-height: 32px;--mdc-chip-container-shape: var(--radius-full);--mdc-chip-flat-container-color: var(--color-surface-brand);--mdc-chip-outline-color: transparent;--mdc-chip-label-text-color: var(--color-text-brand);--mdc-chip-label-text-font: var(--ref-typescale-label-medium-font);--mdc-chip-label-text-size: var(--ref-typescale-label-medium-size);--mdc-chip-label-text-weight: var(--ref-typescale-label-medium-weight-prominent);--mdc-chip-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mdc-chip-label-text-tracking: var(--ref-typescale-label-medium-tracking);--mat-chip-trailing-action-color: var(--color-icon-brand);--mat-chip-disabled-trailing-action-color: var(--color-icon-disabled);--mat-chip-hover-state-layer-opacity: 0;--mat-chip-focus-state-layer-opacity: 0;--mat-chip-selected-state-layer-opacity: 0;--mdc-chip-disabled-label-text-color: var(--color-text-disabled)}.mat-mdc-chip:hover:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-hover)}.mat-mdc-chip:active:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-active)}.mat-mdc-chip.is-active:not(.mat-mdc-chip-disabled){--mdc-chip-outline-color: var(--color-border-active)}.mat-mdc-chip.is-error{--mdc-chip-flat-container-color: var(--color-surface-error);--mdc-chip-outline-color: var(--color-border-input-error);--mdc-chip-label-text-color: var(--color-text-error);--mat-chip-trailing-action-color: var(--color-icon-error)}.mat-mdc-chip.is-disabled,.mat-mdc-chip.mat-mdc-chip-disabled{--mdc-chip-flat-container-color: var(--color-surface-disabled);--mdc-chip-outline-color: var(--color-border-subtle);--mdc-chip-label-text-color: var(--color-text-disabled)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], icon: [{
                type: Input
            }], removable: [{
                type: Input
            }], disabled: [{
                type: Input
            }], error: [{
                type: Input
            }], active: [{
                type: Input
            }], removed: [{
                type: Output
            }] } });

/**
 * ds-dialog
 *
 * Based on Angular Material MatDialogModule.
 * Import MatDialogModule in your Angular module.
 *
 * Usage — via service (recommended):
 *   this.dialog.open(MyDialogComponent, {
 *     panelClass: 'ds-dialog',
 *     width: '480px',
 *   });
 *   // Inside MyDialogComponent, inject MatDialogRef and call ref.close()
 *
 * Usage — as a wrapper component launched via service:
 *   this.dialog.open(DsDialogComponent, {
 *     panelClass: 'ds-dialog-overlay',
 *     data: { title: 'Confirm', ... }
 *   });
 *
 * Usage — static HTML (CSS class API, no Angular required):
 *   <div class="ds-dialog-backdrop" role="presentation">
 *     <div class="ds-dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title">
 *       <div class="ds-dialog__header">...</div>
 *       <div class="ds-dialog__content">...</div>
 *       <div class="ds-dialog__actions">...</div>
 *     </div>
 *   </div>
 */
class DsDialogComponent {
    dialogRef;
    data;
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        // When launched via service, populate inputs from injected data
        if (data) {
            if (data.title !== undefined)
                this.title = data.title;
            if (data.subtitle !== undefined)
                this.subtitle = data.subtitle;
            if (data.icon !== undefined)
                this.icon = data.icon;
            if (data.iconVariant !== undefined)
                this.iconVariant = data.iconVariant;
            if (data.align !== undefined)
                this.align = data.align;
            if (data.size !== undefined)
                this.size = data.size;
        }
    }
    title = '';
    subtitle = '';
    icon;
    iconVariant = 'default';
    align = 'left';
    size = 'md';
    closed = new EventEmitter();
    close() {
        this.closed.emit();
        this.dialogRef?.close();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsDialogComponent, deps: [{ token: i1$3.MatDialogRef, optional: true }, { token: MAT_DIALOG_DATA, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsDialogComponent, isStandalone: true, selector: "ds-dialog", inputs: { title: "title", subtitle: "subtitle", icon: "icon", iconVariant: "iconVariant", align: "align", size: "size" }, outputs: { closed: "closed" }, ngImport: i0, template: "<!-- Dialog box \u2014 rendered as content inside Material's overlay (no backdrop here).\n     Material's panelClass=\"ds-dialog\" applies the ds-dialog styles to the container.\n     For static HTML usage, wrap this in <div class=\"ds-dialog-backdrop\">. -->\n<div\n  class=\"ds-dialog\"\n  [class.ds-dialog--sm]=\"size === 'sm'\"\n  [class.ds-dialog--lg]=\"size === 'lg'\"\n  [class.ds-dialog--xl]=\"size === 'xl'\"\n  [class.ds-dialog--center]=\"align === 'center'\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  [attr.aria-labelledby]=\"title ? 'ds-dlg-title' : null\"\n>\n  <div class=\"ds-dialog__header\" *ngIf=\"title\">\n    <span\n      *ngIf=\"icon\"\n      class=\"ds-icon ds-dialog__icon\"\n      [class]=\"'ds-dialog__icon--' + iconVariant\"\n    >{{ icon }}</span>\n    <div class=\"ds-dialog__title-group\">\n      <h2 class=\"ds-dialog__title\" id=\"ds-dlg-title\">{{ title }}</h2>\n      <p *ngIf=\"subtitle\" class=\"ds-dialog__subtitle\">{{ subtitle }}</p>\n    </div>\n    <button class=\"ds-dialog__close\" (click)=\"close()\" aria-label=\"Close dialog\">\n      <span class=\"ds-icon ds-icon--sm\">close</span>\n    </button>\n  </div>\n\n  <div class=\"ds-dialog__content\">\n    <ng-content select=\"[slot=content]\" />\n  </div>\n\n  <div class=\"ds-dialog__actions\">\n    <ng-content select=\"[slot=actions]\" />\n  </div>\n</div>\n", styles: [".ds-dialog-backdrop{position:fixed;inset:0;background:var(--color-surface-scrim);display:flex;align-items:center;justify-content:center;z-index:1000;padding:var(--spacing-xl)}.ds-dialog{background:var(--color-surface-page);border-radius:var(--radius-lg);box-shadow:0 8px 24px var(--shadow-elevation-3),0 2px 8px var(--shadow-elevation-2);width:100%;max-width:480px;max-height:calc(100vh - 96px);display:flex;flex-direction:column;overflow:hidden}.ds-dialog--sm{max-width:360px}.ds-dialog--lg{max-width:640px}.ds-dialog--xl{max-width:800px}.ds-dialog--center .ds-dialog__header{flex-direction:column;align-items:center;text-align:center;padding-bottom:0}.ds-dialog--center .ds-dialog__close{position:absolute;top:var(--spacing-md);right:var(--spacing-md)}.ds-dialog--center .ds-dialog__icon{margin-bottom:var(--spacing-sm)}.ds-dialog--center .ds-dialog__content{text-align:center}.ds-dialog--center .ds-dialog__actions{justify-content:center}.ds-dialog__header{display:flex;align-items:flex-start;gap:var(--spacing-md);padding:var(--spacing-xl) var(--spacing-xl) var(--spacing-md);position:relative;flex-shrink:0}.ds-dialog__icon{font-size:24px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--color-icon-brand);margin-top:2px}.ds-dialog__icon--error{color:var(--color-icon-error)}.ds-dialog__icon--warning{color:var(--color-icon-warning)}.ds-dialog__icon--success{color:var(--color-icon-success)}.ds-dialog__icon--info{color:var(--color-icon-info)}.ds-dialog__title-group{flex:1;min-width:0}.ds-dialog__title{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-title-h3-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h3-line-height);color:var(--color-text-primary);margin:0 0 4px}.ds-dialog__subtitle{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);margin:0}.ds-dialog__close{appearance:none;border:none;background:transparent;padding:var(--spacing-xs);margin:-var(--spacing-xs);cursor:pointer;color:var(--color-icon-subtle);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .12s,background .12s}.ds-dialog__close:hover{color:var(--color-icon-default);background:var(--overlay-hovered)}.ds-dialog__close:focus{outline:none}.ds-dialog__close:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-dialog__divider{height:1px;background:var(--color-border-subtle);flex-shrink:0;margin:0 var(--spacing-xl)}.ds-dialog__content{flex:1;overflow-y:auto;padding:var(--spacing-md) var(--spacing-xl);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);color:var(--color-text-secondary)}.ds-dialog__content:first-child{padding-top:var(--spacing-xl)}.ds-dialog__actions{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-sm);padding:var(--spacing-md) var(--spacing-xl) var(--spacing-xl);flex-shrink:0;border-top:1px solid var(--color-border-subtle)}.mat-mdc-dialog-container.ds-dialog-overlay{background:transparent;box-shadow:none;border-radius:0;padding:0;--mdc-dialog-container-color: transparent;--mdc-dialog-container-elevation: none;--mdc-dialog-container-shape: 0}.mat-mdc-dialog-container.ds-dialog-overlay .mat-mdc-dialog-surface{background:transparent;box-shadow:none;border-radius:0;padding:0}.cdk-overlay-backdrop.ds-dialog-backdrop{background:var(--color-surface-scrim)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatDialogModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-dialog', standalone: true, imports: [CommonModule, MatDialogModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- Dialog box \u2014 rendered as content inside Material's overlay (no backdrop here).\n     Material's panelClass=\"ds-dialog\" applies the ds-dialog styles to the container.\n     For static HTML usage, wrap this in <div class=\"ds-dialog-backdrop\">. -->\n<div\n  class=\"ds-dialog\"\n  [class.ds-dialog--sm]=\"size === 'sm'\"\n  [class.ds-dialog--lg]=\"size === 'lg'\"\n  [class.ds-dialog--xl]=\"size === 'xl'\"\n  [class.ds-dialog--center]=\"align === 'center'\"\n  role=\"dialog\"\n  aria-modal=\"true\"\n  [attr.aria-labelledby]=\"title ? 'ds-dlg-title' : null\"\n>\n  <div class=\"ds-dialog__header\" *ngIf=\"title\">\n    <span\n      *ngIf=\"icon\"\n      class=\"ds-icon ds-dialog__icon\"\n      [class]=\"'ds-dialog__icon--' + iconVariant\"\n    >{{ icon }}</span>\n    <div class=\"ds-dialog__title-group\">\n      <h2 class=\"ds-dialog__title\" id=\"ds-dlg-title\">{{ title }}</h2>\n      <p *ngIf=\"subtitle\" class=\"ds-dialog__subtitle\">{{ subtitle }}</p>\n    </div>\n    <button class=\"ds-dialog__close\" (click)=\"close()\" aria-label=\"Close dialog\">\n      <span class=\"ds-icon ds-icon--sm\">close</span>\n    </button>\n  </div>\n\n  <div class=\"ds-dialog__content\">\n    <ng-content select=\"[slot=content]\" />\n  </div>\n\n  <div class=\"ds-dialog__actions\">\n    <ng-content select=\"[slot=actions]\" />\n  </div>\n</div>\n", styles: [".ds-dialog-backdrop{position:fixed;inset:0;background:var(--color-surface-scrim);display:flex;align-items:center;justify-content:center;z-index:1000;padding:var(--spacing-xl)}.ds-dialog{background:var(--color-surface-page);border-radius:var(--radius-lg);box-shadow:0 8px 24px var(--shadow-elevation-3),0 2px 8px var(--shadow-elevation-2);width:100%;max-width:480px;max-height:calc(100vh - 96px);display:flex;flex-direction:column;overflow:hidden}.ds-dialog--sm{max-width:360px}.ds-dialog--lg{max-width:640px}.ds-dialog--xl{max-width:800px}.ds-dialog--center .ds-dialog__header{flex-direction:column;align-items:center;text-align:center;padding-bottom:0}.ds-dialog--center .ds-dialog__close{position:absolute;top:var(--spacing-md);right:var(--spacing-md)}.ds-dialog--center .ds-dialog__icon{margin-bottom:var(--spacing-sm)}.ds-dialog--center .ds-dialog__content{text-align:center}.ds-dialog--center .ds-dialog__actions{justify-content:center}.ds-dialog__header{display:flex;align-items:flex-start;gap:var(--spacing-md);padding:var(--spacing-xl) var(--spacing-xl) var(--spacing-md);position:relative;flex-shrink:0}.ds-dialog__icon{font-size:24px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--color-icon-brand);margin-top:2px}.ds-dialog__icon--error{color:var(--color-icon-error)}.ds-dialog__icon--warning{color:var(--color-icon-warning)}.ds-dialog__icon--success{color:var(--color-icon-success)}.ds-dialog__icon--info{color:var(--color-icon-info)}.ds-dialog__title-group{flex:1;min-width:0}.ds-dialog__title{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-title-h3-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h3-line-height);color:var(--color-text-primary);margin:0 0 4px}.ds-dialog__subtitle{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);margin:0}.ds-dialog__close{appearance:none;border:none;background:transparent;padding:var(--spacing-xs);margin:-var(--spacing-xs);cursor:pointer;color:var(--color-icon-subtle);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:color .12s,background .12s}.ds-dialog__close:hover{color:var(--color-icon-default);background:var(--overlay-hovered)}.ds-dialog__close:focus{outline:none}.ds-dialog__close:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-dialog__divider{height:1px;background:var(--color-border-subtle);flex-shrink:0;margin:0 var(--spacing-xl)}.ds-dialog__content{flex:1;overflow-y:auto;padding:var(--spacing-md) var(--spacing-xl);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);color:var(--color-text-secondary)}.ds-dialog__content:first-child{padding-top:var(--spacing-xl)}.ds-dialog__actions{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-sm);padding:var(--spacing-md) var(--spacing-xl) var(--spacing-xl);flex-shrink:0;border-top:1px solid var(--color-border-subtle)}.mat-mdc-dialog-container.ds-dialog-overlay{background:transparent;box-shadow:none;border-radius:0;padding:0;--mdc-dialog-container-color: transparent;--mdc-dialog-container-elevation: none;--mdc-dialog-container-shape: 0}.mat-mdc-dialog-container.ds-dialog-overlay .mat-mdc-dialog-surface{background:transparent;box-shadow:none;border-radius:0;padding:0}.cdk-overlay-backdrop.ds-dialog-backdrop{background:var(--color-surface-scrim)}\n"] }]
        }], ctorParameters: () => [{ type: i1$3.MatDialogRef, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_DIALOG_DATA]
                }] }], propDecorators: { title: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], icon: [{
                type: Input
            }], iconVariant: [{
                type: Input
            }], align: [{
                type: Input
            }], size: [{
                type: Input
            }], closed: [{
                type: Output
            }] } });

/**
 * ds-divider
 *
 * Based on Angular Material mat-divider.
 * Import MatDividerModule in your Angular module.
 *
 * @example
 * <ds-divider />
 * <ds-divider variant="inset" />
 * <ds-divider variant="subhead" label="Section" />
 * <ds-divider variant="vertical" />
 */
class DsDividerComponent {
    /** 'full' | 'inset' | 'middle-inset' | 'subhead' | 'vertical' | 'vertical-inset' */
    variant = 'full';
    label = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsDividerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsDividerComponent, isStandalone: true, selector: "ds-divider", inputs: { variant: "variant", label: "label" }, ngImport: i0, template: "<ng-container [ngSwitch]=\"variant\">\n  <!-- Subhead variant \u2014 no Material equivalent, stays custom -->\n  <div\n    *ngSwitchCase=\"'subhead'\"\n    class=\"ds-divider ds-divider--subhead\"\n    role=\"separator\"\n  >\n    <span *ngIf=\"label\" class=\"ds-divider__label\">{{ label }}</span>\n  </div>\n\n  <!-- Middle-inset \u2014 no Material equivalent, stays custom -->\n  <hr *ngSwitchCase=\"'middle-inset'\" class=\"ds-divider ds-divider--middle-inset\" role=\"separator\" />\n\n  <!-- Vertical inset -->\n  <mat-divider *ngSwitchCase=\"'vertical-inset'\" [vertical]=\"true\" [inset]=\"true\"></mat-divider>\n\n  <!-- Vertical -->\n  <mat-divider *ngSwitchCase=\"'vertical'\" [vertical]=\"true\"></mat-divider>\n\n  <!-- Horizontal inset -->\n  <mat-divider *ngSwitchCase=\"'inset'\" [inset]=\"true\"></mat-divider>\n\n  <!-- Default: horizontal full -->\n  <mat-divider *ngSwitchDefault></mat-divider>\n</ng-container>\n", styles: [".ds-divider{display:block;border:none;background:var(--color-border-subtle);flex-shrink:0;height:1px;width:100%}.ds-divider--inset{margin-left:var(--spacing-xl)}.ds-divider--middle-inset{margin-left:var(--spacing-xl);margin-right:var(--spacing-xl)}.ds-divider--subhead{display:flex;align-items:center;gap:var(--spacing-md);height:auto;background:transparent}.ds-divider--subhead:before,.ds-divider--subhead:after{content:\"\";flex:1;height:1px;background:var(--color-border-subtle)}.ds-divider__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);white-space:nowrap;letter-spacing:.06em;text-transform:uppercase}.ds-divider--vertical{height:100%;width:1px;display:inline-block}.ds-divider--vertical.ds-divider--inset{margin:var(--spacing-md) 0;height:auto;flex:1}.ds-divider--vertical.ds-divider--middle-inset{margin:var(--spacing-md) 0;flex:1}.mat-divider{border-color:var(--color-border-subtle)}.mat-divider-inset:not(.mat-divider-vertical){margin-left:var(--spacing-xl)}.mat-divider-vertical.mat-divider-inset{margin:var(--spacing-md) 0;height:auto;flex:1}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "ngmodule", type: MatDividerModule }, { kind: "component", type: i2$4.MatDivider, selector: "mat-divider", inputs: ["vertical", "inset"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsDividerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-divider', standalone: true, imports: [CommonModule, MatDividerModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container [ngSwitch]=\"variant\">\n  <!-- Subhead variant \u2014 no Material equivalent, stays custom -->\n  <div\n    *ngSwitchCase=\"'subhead'\"\n    class=\"ds-divider ds-divider--subhead\"\n    role=\"separator\"\n  >\n    <span *ngIf=\"label\" class=\"ds-divider__label\">{{ label }}</span>\n  </div>\n\n  <!-- Middle-inset \u2014 no Material equivalent, stays custom -->\n  <hr *ngSwitchCase=\"'middle-inset'\" class=\"ds-divider ds-divider--middle-inset\" role=\"separator\" />\n\n  <!-- Vertical inset -->\n  <mat-divider *ngSwitchCase=\"'vertical-inset'\" [vertical]=\"true\" [inset]=\"true\"></mat-divider>\n\n  <!-- Vertical -->\n  <mat-divider *ngSwitchCase=\"'vertical'\" [vertical]=\"true\"></mat-divider>\n\n  <!-- Horizontal inset -->\n  <mat-divider *ngSwitchCase=\"'inset'\" [inset]=\"true\"></mat-divider>\n\n  <!-- Default: horizontal full -->\n  <mat-divider *ngSwitchDefault></mat-divider>\n</ng-container>\n", styles: [".ds-divider{display:block;border:none;background:var(--color-border-subtle);flex-shrink:0;height:1px;width:100%}.ds-divider--inset{margin-left:var(--spacing-xl)}.ds-divider--middle-inset{margin-left:var(--spacing-xl);margin-right:var(--spacing-xl)}.ds-divider--subhead{display:flex;align-items:center;gap:var(--spacing-md);height:auto;background:transparent}.ds-divider--subhead:before,.ds-divider--subhead:after{content:\"\";flex:1;height:1px;background:var(--color-border-subtle)}.ds-divider__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);white-space:nowrap;letter-spacing:.06em;text-transform:uppercase}.ds-divider--vertical{height:100%;width:1px;display:inline-block}.ds-divider--vertical.ds-divider--inset{margin:var(--spacing-md) 0;height:auto;flex:1}.ds-divider--vertical.ds-divider--middle-inset{margin:var(--spacing-md) 0;flex:1}.mat-divider{border-color:var(--color-border-subtle)}.mat-divider-inset:not(.mat-divider-vertical){margin-left:var(--spacing-xl)}.mat-divider-vertical.mat-divider-inset{margin:var(--spacing-md) 0;height:auto;flex:1}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

/**
 * ds-hover-card
 *
 * A floating information card that follows the cursor, revealed on hover/focus.
 * Cursor tracking runs outside Angular's zone for performance — position updates
 * bypass change detection and write directly to the card's inline style.
 *
 * Variants:
 *   'bottom' (default) — card appears below the cursor; accent border on top
 *   'top'              — card appears above the cursor; accent border on bottom
 *
 * Content projection:
 *   Default slot       — the trigger element (anything the user hovers over)
 *   [card-content]     — content rendered inside the floating card
 *
 * ADA: Content is also accessible via keyboard focus; do not hide critical
 *      actions behind hover only.
 *
 * @example
 * <ds-hover-card variant="bottom">
 *   <button>Hover me</button>
 *   <div card-content>
 *     <p class="ds-hover-card__title">Order #4821</p>
 *     <p class="ds-hover-card__subtitle">Pending review</p>
 *     <p class="ds-hover-card__text">3 items · Submitted 2 hours ago</p>
 *   </div>
 * </ds-hover-card>
 */
class DsHoverCardComponent {
    renderer;
    ngZone;
    cdr;
    /** Position variant. 'bottom' = card below cursor (default); 'top' = card above cursor. */
    variant = 'bottom';
    /** Horizontal distance between cursor and card edge (px). */
    offsetX = 16;
    /** Vertical distance between cursor and card edge (px). */
    offsetY = 16;
    triggerEl;
    cardEl;
    isVisible = false;
    removeMouseMoveListener;
    constructor(renderer, ngZone, cdr) {
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.cdr = cdr;
    }
    ngAfterViewInit() {
        // Mousemove runs outside Angular zone — position updates bypass CD entirely
        this.ngZone.runOutsideAngular(() => {
            this.removeMouseMoveListener = this.renderer.listen(this.triggerEl.nativeElement, 'mousemove', (e) => this.updatePosition(e));
        });
    }
    ngOnDestroy() {
        this.removeMouseMoveListener?.();
    }
    onMouseEnter(e) {
        this.isVisible = true;
        this.cdr.markForCheck();
        this.updatePosition(e);
    }
    onMouseLeave() {
        this.isVisible = false;
        this.cdr.markForCheck();
    }
    onFocusIn(e) {
        this.isVisible = true;
        this.cdr.markForCheck();
        const rect = e.currentTarget.getBoundingClientRect();
        this.positionNearRect(rect);
    }
    onFocusOut() {
        this.isVisible = false;
        this.cdr.markForCheck();
    }
    updatePosition(e) {
        const card = this.cardEl?.nativeElement;
        if (!card)
            return;
        const cardH = card.offsetHeight;
        const cardW = card.offsetWidth || 360;
        let x = e.clientX + this.offsetX;
        let y = this.variant === 'top'
            ? e.clientY - cardH - this.offsetY
            : e.clientY + this.offsetY;
        // Clamp to viewport so card never overflows screen edge
        x = Math.max(8, Math.min(x, window.innerWidth - cardW - 8));
        y = Math.max(8, Math.min(y, window.innerHeight - cardH - 8));
        this.renderer.setStyle(card, 'left', `${x}px`);
        this.renderer.setStyle(card, 'top', `${y}px`);
    }
    positionNearRect(rect) {
        const card = this.cardEl?.nativeElement;
        if (!card)
            return;
        const cardH = card.offsetHeight;
        const cardW = card.offsetWidth || 360;
        let x = rect.left;
        let y = this.variant === 'top'
            ? rect.top - cardH - 8
            : rect.bottom + 8;
        x = Math.max(8, Math.min(x, window.innerWidth - cardW - 8));
        y = Math.max(8, Math.min(y, window.innerHeight - cardH - 8));
        this.renderer.setStyle(card, 'left', `${x}px`);
        this.renderer.setStyle(card, 'top', `${y}px`);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsHoverCardComponent, deps: [{ token: i0.Renderer2 }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsHoverCardComponent, isStandalone: true, selector: "ds-hover-card", inputs: { variant: "variant", offsetX: "offsetX", offsetY: "offsetY" }, viewQueries: [{ propertyName: "triggerEl", first: true, predicate: ["triggerEl"], descendants: true }, { propertyName: "cardEl", first: true, predicate: ["cardEl"], descendants: true }], ngImport: i0, template: "<div #triggerEl\n     class=\"ds-hover-card__trigger\"\n     (mouseenter)=\"onMouseEnter($event)\"\n     (mouseleave)=\"onMouseLeave()\"\n     (focusin)=\"onFocusIn($event)\"\n     (focusout)=\"onFocusOut()\">\n  <ng-content />\n</div>\n<div #cardEl\n     class=\"ds-hover-card\"\n     [class.ds-hover-card--top]=\"variant === 'top'\"\n     [class.is-visible]=\"isVisible\"\n     role=\"tooltip\"\n     [attr.aria-hidden]=\"!isVisible\">\n  <div class=\"ds-hover-card__body\">\n    <ng-content select=\"[card-content]\" />\n  </div>\n</div>\n", styles: [".ds-hover-card__trigger{display:inline-block}.ds-hover-card{position:fixed;z-index:9999;width:360px;pointer-events:none;background:var(--color-surface-page);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 3px 12px 6px var(--shadow-elevation-3),0 4px 4px 0 var(--shadow-elevation-3);border-top:4px solid var(--color-border-hover)}.ds-hover-card--top{border-top:none;border-bottom:4px solid var(--color-border-hover)}.ds-hover-card{opacity:0;transform:translateY(-4px);transition:opacity .12s ease,transform .12s ease}.ds-hover-card.is-visible{opacity:1;transform:translateY(0)}.ds-hover-card--top{transform:translateY(4px)}.ds-hover-card--top.is-visible{transform:translateY(0)}.ds-hover-card__body{display:flex;flex-direction:column;gap:var(--spacing-md);padding:var(--spacing-lg)}.ds-hover-card__title{font-family:var(--ref-typescale-title-h3-font);font-size:var(--ref-typescale-title-h3-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h3-line-height);letter-spacing:var(--ref-typescale-title-h3-tracking);color:var(--color-text-primary);margin:0}.ds-hover-card__subtitle{font-family:var(--ref-typescale-title-h4-font);font-size:var(--ref-typescale-title-h4-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h4-line-height);letter-spacing:var(--ref-typescale-title-h4-tracking);color:var(--color-text-secondary);margin:0}.ds-hover-card__text{font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typescale-body-medium-weight);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);margin:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsHoverCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-hover-card', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div #triggerEl\n     class=\"ds-hover-card__trigger\"\n     (mouseenter)=\"onMouseEnter($event)\"\n     (mouseleave)=\"onMouseLeave()\"\n     (focusin)=\"onFocusIn($event)\"\n     (focusout)=\"onFocusOut()\">\n  <ng-content />\n</div>\n<div #cardEl\n     class=\"ds-hover-card\"\n     [class.ds-hover-card--top]=\"variant === 'top'\"\n     [class.is-visible]=\"isVisible\"\n     role=\"tooltip\"\n     [attr.aria-hidden]=\"!isVisible\">\n  <div class=\"ds-hover-card__body\">\n    <ng-content select=\"[card-content]\" />\n  </div>\n</div>\n", styles: [".ds-hover-card__trigger{display:inline-block}.ds-hover-card{position:fixed;z-index:9999;width:360px;pointer-events:none;background:var(--color-surface-page);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 3px 12px 6px var(--shadow-elevation-3),0 4px 4px 0 var(--shadow-elevation-3);border-top:4px solid var(--color-border-hover)}.ds-hover-card--top{border-top:none;border-bottom:4px solid var(--color-border-hover)}.ds-hover-card{opacity:0;transform:translateY(-4px);transition:opacity .12s ease,transform .12s ease}.ds-hover-card.is-visible{opacity:1;transform:translateY(0)}.ds-hover-card--top{transform:translateY(4px)}.ds-hover-card--top.is-visible{transform:translateY(0)}.ds-hover-card__body{display:flex;flex-direction:column;gap:var(--spacing-md);padding:var(--spacing-lg)}.ds-hover-card__title{font-family:var(--ref-typescale-title-h3-font);font-size:var(--ref-typescale-title-h3-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h3-line-height);letter-spacing:var(--ref-typescale-title-h3-tracking);color:var(--color-text-primary);margin:0}.ds-hover-card__subtitle{font-family:var(--ref-typescale-title-h4-font);font-size:var(--ref-typescale-title-h4-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-title-h4-line-height);letter-spacing:var(--ref-typescale-title-h4-tracking);color:var(--color-text-secondary);margin:0}.ds-hover-card__text{font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typescale-body-medium-weight);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);margin:0}\n"] }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }], propDecorators: { variant: [{
                type: Input
            }], offsetX: [{
                type: Input
            }], offsetY: [{
                type: Input
            }], triggerEl: [{
                type: ViewChild,
                args: ['triggerEl']
            }], cardEl: [{
                type: ViewChild,
                args: ['cardEl']
            }] } });

/**
 * Onflo Design System — Icon
 *
 * Renders a Material Symbols Rounded icon. Supports outlined (default)
 * and filled styles via the variable font FILL axis.
 *
 * The font must be loaded in your app's index.html:
 *   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
 *
 * @example
 *   <ds-icon name="search" />
 *   <ds-icon name="bookmark" [filled]="true" />
 *   <ds-icon name="close" size="sm" />
 */
class DsIconComponent {
    /** Material Symbols icon name (e.g. "search", "bookmark", "close"). */
    name = '';
    /** Filled style (FILL=1). Default: false (outlined). */
    filled = false;
    /** Size. Default: 'md' (24px). */
    size = 'md';
    get classes() {
        return [
            'ds-icon',
            this.size !== 'md' ? `ds-icon--${this.size}` : '',
            this.filled ? 'ds-icon--filled' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsIconComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsIconComponent, isStandalone: true, selector: "ds-icon", inputs: { name: "name", filled: "filled", size: "size" }, ngImport: i0, template: `<span [class]="classes" [attr.aria-hidden]="true">{{ name }}</span>`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsIconComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ds-icon',
                    standalone: true,
                    template: `<span [class]="classes" [attr.aria-hidden]="true">{{ name }}</span>`,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { name: [{
                type: Input,
                args: [{ required: true }]
            }], filled: [{
                type: Input
            }], size: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Icon Button
 *
 * A standalone Angular component wrapping the ds-icon-button CSS class API.
 * For direct class usage without Angular:
 *   <button class="ds-icon-button ds-icon-button--filled" aria-label="Save">
 *     <svg>...</svg>
 *   </button>
 *
 * ⚠️  ADA: Always provide ariaLabel — icon buttons have no visible text.
 *
 * @example
 *   <ds-icon-button variant="filled" ariaLabel="Save">
 *     <svg>...</svg>
 *   </ds-icon-button>
 *
 *   <ds-icon-button variant="outlined" size="sm" [isError]="true" ariaLabel="Alert">
 *     <svg>...</svg>
 *   </ds-icon-button>
 */
class DsIconButtonComponent {
    /** Visual style. Default: 'icon' (ghost) */
    variant = 'icon';
    /** Size scale. Default: 'md' (40px) */
    size = 'md';
    /** Accessible label — required for screen readers. No visible text on icon buttons. */
    ariaLabel;
    /** Applies error styling via .is-error class. */
    isError = false;
    /** Disables the button and applies disabled styling. */
    disabled = false;
    /** Native button type attribute. Default: 'button' */
    type = 'button';
    /** Emits the native MouseEvent when the button is clicked. */
    clicked = new EventEmitter();
    get buttonClasses() {
        return [
            'ds-icon-button',
            `ds-icon-button--${this.variant}`,
            this.size === 'sm' ? 'ds-icon-button--sm' : '',
            this.isError ? 'is-error' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    handleClick(event) {
        if (!this.disabled) {
            this.clicked.emit(event);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsIconButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsIconButtonComponent, isStandalone: true, selector: "ds-icon-button", inputs: { variant: "variant", size: "size", ariaLabel: "ariaLabel", isError: "isError", disabled: "disabled", type: "type" }, outputs: { clicked: "clicked" }, ngImport: i0, template: "<button\n  mat-icon-button\n  [class]=\"buttonClasses\"\n  [disabled]=\"disabled\"\n  [type]=\"type\"\n  [attr.aria-label]=\"ariaLabel\"\n  [disableRipple]=\"true\"\n  (click)=\"handleClick($event)\"\n>\n  <!-- Icon slot: <svg> or <ds-icon> goes here -->\n  <ng-content></ng-content>\n</button>\n", styles: [".ds-icon-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-sm);border:1px solid transparent;padding:0;cursor:pointer;position:relative;overflow:hidden;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease}.ds-icon-button:focus{outline:none}.ds-icon-button:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .1s ease}.ds-icon-button>svg,.ds-icon-button .ds-icon-button__icon{width:24px;height:24px;display:block;flex-shrink:0;pointer-events:none}.ds-icon-button .ds-icon-button__label{font-family:var(--ref-typeface-brand);font-size:14px;font-weight:var(--ref-typeface-weight-medium);line-height:1;-webkit-user-select:none;user-select:none;pointer-events:none}.ds-icon-button--outlined-letter .ds-icon-button__label{font-size:var(--ref-typescale-title-h2-size);font-weight:var(--ref-typescale-title-h2-weight);line-height:1}.ds-icon-button--sm{width:32px;height:32px}.ds-icon-button--sm>svg,.ds-icon-button--sm .ds-icon-button__icon{width:20px;height:20px}.ds-icon-button--sm .ds-icon-button__label{font-size:12px}.ds-icon-button--icon{background:transparent;color:var(--color-icon-default)}.ds-icon-button--icon:hover:not(:disabled){background:var(--overlay-hovered)}.ds-icon-button--icon:focus-visible{background:var(--overlay-focused);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--icon:active:not(:disabled){background:var(--overlay-pressed)}.ds-icon-button--icon.is-error{color:var(--color-icon-error)}.ds-icon-button--filled{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button--filled:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--filled:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--filled:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--filled:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--filled.is-error{background:var(--color-surface-accent-red-bold);color:var(--color-icon-on-brand)}.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button--outlined:hover:not(:disabled){background:var(--overlay-hovered);color:var(--color-icon-brand);border-color:var(--color-border-input-hover)}.ds-icon-button--outlined:focus-visible{background:var(--overlay-focused);color:var(--color-icon-brand);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--outlined:active:not(:disabled){background:var(--overlay-pressed);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button--outlined.is-error{color:var(--color-icon-error);border-color:var(--color-border-accent-red)}.ds-icon-button--monogram{background:var(--color-surface-brand);color:var(--color-text-brand)}.ds-icon-button--monogram:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--monogram:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--monogram:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--monogram:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--monogram.is-error{background:var(--color-surface-accent-red);color:var(--color-icon-error)}.ds-icon-button:disabled{cursor:not-allowed}.ds-icon-button:disabled:after{background:transparent!important}.ds-icon-button--icon:disabled{background:transparent;color:var(--color-icon-disabled)}.ds-icon-button--filled:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button--outlined:disabled{background:transparent;color:var(--color-icon-disabled);border-color:var(--color-border-subtle)}.ds-icon-button--monogram:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled)}.ds-icon-button-toggle.ds-icon-button--icon{color:var(--color-icon-default)}.ds-icon-button-toggle.ds-icon-button--icon.is-selected,.ds-icon-button-toggle.ds-icon-button--icon[aria-pressed=true]{color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled{background:var(--color-surface-brand);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled.is-selected,.ds-icon-button-toggle.ds-icon-button--filled[aria-pressed=true]{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button-toggle.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined:hover:not(:disabled){border-color:var(--color-border-input-hover);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined:focus-visible{border-color:var(--color-border-input-active);color:var(--color-icon-brand);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined:active:not(:disabled){border-color:var(--color-border-active);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter{background:var(--color-surface-page);color:var(--color-text-primary);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-text-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle:disabled.is-selected,.ds-icon-button-toggle:disabled[aria-pressed=true]{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button-toggle:disabled.is-selected:after,.ds-icon-button-toggle:disabled[aria-pressed=true]:after{background:transparent!important}.mat-mdc-icon-button.ds-icon-button{--mat-icon-button-hover-state-layer-opacity: 0;--mat-icon-button-focus-state-layer-opacity: 0;--mat-icon-button-pressed-state-layer-opacity: 0;--mdc-icon-button-state-layer-size: 42px}.mat-mdc-icon-button.ds-icon-button.ds-icon-button--sm{--mdc-icon-button-state-layer-size: 32px}\n"], dependencies: [{ kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsIconButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-icon-button', standalone: true, imports: [MatButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  [class]=\"buttonClasses\"\n  [disabled]=\"disabled\"\n  [type]=\"type\"\n  [attr.aria-label]=\"ariaLabel\"\n  [disableRipple]=\"true\"\n  (click)=\"handleClick($event)\"\n>\n  <!-- Icon slot: <svg> or <ds-icon> goes here -->\n  <ng-content></ng-content>\n</button>\n", styles: [".ds-icon-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-sm);border:1px solid transparent;padding:0;cursor:pointer;position:relative;overflow:hidden;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease}.ds-icon-button:focus{outline:none}.ds-icon-button:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .1s ease}.ds-icon-button>svg,.ds-icon-button .ds-icon-button__icon{width:24px;height:24px;display:block;flex-shrink:0;pointer-events:none}.ds-icon-button .ds-icon-button__label{font-family:var(--ref-typeface-brand);font-size:14px;font-weight:var(--ref-typeface-weight-medium);line-height:1;-webkit-user-select:none;user-select:none;pointer-events:none}.ds-icon-button--outlined-letter .ds-icon-button__label{font-size:var(--ref-typescale-title-h2-size);font-weight:var(--ref-typescale-title-h2-weight);line-height:1}.ds-icon-button--sm{width:32px;height:32px}.ds-icon-button--sm>svg,.ds-icon-button--sm .ds-icon-button__icon{width:20px;height:20px}.ds-icon-button--sm .ds-icon-button__label{font-size:12px}.ds-icon-button--icon{background:transparent;color:var(--color-icon-default)}.ds-icon-button--icon:hover:not(:disabled){background:var(--overlay-hovered)}.ds-icon-button--icon:focus-visible{background:var(--overlay-focused);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--icon:active:not(:disabled){background:var(--overlay-pressed)}.ds-icon-button--icon.is-error{color:var(--color-icon-error)}.ds-icon-button--filled{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button--filled:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--filled:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--filled:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--filled:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--filled.is-error{background:var(--color-surface-accent-red-bold);color:var(--color-icon-on-brand)}.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button--outlined:hover:not(:disabled){background:var(--overlay-hovered);color:var(--color-icon-brand);border-color:var(--color-border-input-hover)}.ds-icon-button--outlined:focus-visible{background:var(--overlay-focused);color:var(--color-icon-brand);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--outlined:active:not(:disabled){background:var(--overlay-pressed);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button--outlined.is-error{color:var(--color-icon-error);border-color:var(--color-border-accent-red)}.ds-icon-button--monogram{background:var(--color-surface-brand);color:var(--color-text-brand)}.ds-icon-button--monogram:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--monogram:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--monogram:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--monogram:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--monogram.is-error{background:var(--color-surface-accent-red);color:var(--color-icon-error)}.ds-icon-button:disabled{cursor:not-allowed}.ds-icon-button:disabled:after{background:transparent!important}.ds-icon-button--icon:disabled{background:transparent;color:var(--color-icon-disabled)}.ds-icon-button--filled:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button--outlined:disabled{background:transparent;color:var(--color-icon-disabled);border-color:var(--color-border-subtle)}.ds-icon-button--monogram:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled)}.ds-icon-button-toggle.ds-icon-button--icon{color:var(--color-icon-default)}.ds-icon-button-toggle.ds-icon-button--icon.is-selected,.ds-icon-button-toggle.ds-icon-button--icon[aria-pressed=true]{color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled{background:var(--color-surface-brand);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled.is-selected,.ds-icon-button-toggle.ds-icon-button--filled[aria-pressed=true]{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button-toggle.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined:hover:not(:disabled){border-color:var(--color-border-input-hover);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined:focus-visible{border-color:var(--color-border-input-active);color:var(--color-icon-brand);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined:active:not(:disabled){border-color:var(--color-border-active);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter{background:var(--color-surface-page);color:var(--color-text-primary);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-text-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle:disabled.is-selected,.ds-icon-button-toggle:disabled[aria-pressed=true]{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button-toggle:disabled.is-selected:after,.ds-icon-button-toggle:disabled[aria-pressed=true]:after{background:transparent!important}.mat-mdc-icon-button.ds-icon-button{--mat-icon-button-hover-state-layer-opacity: 0;--mat-icon-button-focus-state-layer-opacity: 0;--mat-icon-button-pressed-state-layer-opacity: 0;--mdc-icon-button-state-layer-size: 42px}.mat-mdc-icon-button.ds-icon-button.ds-icon-button--sm{--mdc-icon-button-state-layer-size: 32px}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: [{ required: true }]
            }], isError: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], clicked: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Icon Button Toggle
 *
 * A stateful icon button that toggles between selected and unselected states.
 * Extends the ds-icon-button class API with ds-icon-button-toggle.
 *
 * For direct class usage without Angular:
 *   <button
 *     class="ds-icon-button ds-icon-button-toggle ds-icon-button--outlined"
 *     aria-pressed="true"
 *     aria-label="Save"
 *   >
 *     <svg>...</svg>
 *   </button>
 *
 * ⚠️  ADA: Always provide ariaLabel — icon buttons have no visible text.
 *
 * @example
 *   <ds-icon-button-toggle variant="outlined" [(selected)]="isSaved" ariaLabel="Save">
 *     <svg>...</svg>
 *   </ds-icon-button-toggle>
 */
class DsIconButtonToggleComponent {
    /** Visual style. Default: 'icon' (ghost) */
    variant = 'icon';
    /** Size scale. Default: 'md' (40px) */
    size = 'md';
    /** Accessible label — required for screen readers. No visible text on icon buttons. */
    ariaLabel;
    /** Whether the toggle is currently selected/pressed. */
    selected = false;
    /** Disables the button and applies disabled styling. */
    disabled = false;
    /** Native button type attribute. Default: 'button' */
    type = 'button';
    /** Emits the new selected state — enables [(selected)] two-way binding. */
    selectedChange = new EventEmitter();
    /** Emits the native MouseEvent when the button is clicked. */
    clicked = new EventEmitter();
    get buttonClasses() {
        return [
            'ds-icon-button',
            'ds-icon-button-toggle',
            `ds-icon-button--${this.variant}`,
            this.size === 'sm' ? 'ds-icon-button--sm' : '',
            this.selected ? 'is-selected' : '',
        ]
            .filter(Boolean)
            .join(' ');
    }
    handleClick(event) {
        if (!this.disabled) {
            this.selected = !this.selected;
            this.selectedChange.emit(this.selected);
            this.clicked.emit(event);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsIconButtonToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsIconButtonToggleComponent, isStandalone: true, selector: "ds-icon-button-toggle", inputs: { variant: "variant", size: "size", ariaLabel: "ariaLabel", selected: "selected", disabled: "disabled", type: "type" }, outputs: { selectedChange: "selectedChange", clicked: "clicked" }, ngImport: i0, template: "<button\n  mat-icon-button\n  [class]=\"buttonClasses\"\n  [disabled]=\"disabled\"\n  [type]=\"type\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-pressed]=\"selected\"\n  [disableRipple]=\"true\"\n  (click)=\"handleClick($event)\"\n>\n  <!-- Icon slot: <svg> or <ds-icon> goes here -->\n  <ng-content></ng-content>\n</button>\n", styles: [".ds-icon-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-sm);border:1px solid transparent;padding:0;cursor:pointer;position:relative;overflow:hidden;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease}.ds-icon-button:focus{outline:none}.ds-icon-button:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .1s ease}.ds-icon-button>svg,.ds-icon-button .ds-icon-button__icon{width:24px;height:24px;display:block;flex-shrink:0;pointer-events:none}.ds-icon-button .ds-icon-button__label{font-family:var(--ref-typeface-brand);font-size:14px;font-weight:var(--ref-typeface-weight-medium);line-height:1;-webkit-user-select:none;user-select:none;pointer-events:none}.ds-icon-button--outlined-letter .ds-icon-button__label{font-size:var(--ref-typescale-title-h2-size);font-weight:var(--ref-typescale-title-h2-weight);line-height:1}.ds-icon-button--sm{width:32px;height:32px}.ds-icon-button--sm>svg,.ds-icon-button--sm .ds-icon-button__icon{width:20px;height:20px}.ds-icon-button--sm .ds-icon-button__label{font-size:12px}.ds-icon-button--icon{background:transparent;color:var(--color-icon-default)}.ds-icon-button--icon:hover:not(:disabled){background:var(--overlay-hovered)}.ds-icon-button--icon:focus-visible{background:var(--overlay-focused);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--icon:active:not(:disabled){background:var(--overlay-pressed)}.ds-icon-button--icon.is-error{color:var(--color-icon-error)}.ds-icon-button--filled{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button--filled:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--filled:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--filled:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--filled:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--filled.is-error{background:var(--color-surface-accent-red-bold);color:var(--color-icon-on-brand)}.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button--outlined:hover:not(:disabled){background:var(--overlay-hovered);color:var(--color-icon-brand);border-color:var(--color-border-input-hover)}.ds-icon-button--outlined:focus-visible{background:var(--overlay-focused);color:var(--color-icon-brand);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--outlined:active:not(:disabled){background:var(--overlay-pressed);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button--outlined.is-error{color:var(--color-icon-error);border-color:var(--color-border-accent-red)}.ds-icon-button--monogram{background:var(--color-surface-brand);color:var(--color-text-brand)}.ds-icon-button--monogram:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--monogram:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--monogram:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--monogram:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--monogram.is-error{background:var(--color-surface-accent-red);color:var(--color-icon-error)}.ds-icon-button:disabled{cursor:not-allowed}.ds-icon-button:disabled:after{background:transparent!important}.ds-icon-button--icon:disabled{background:transparent;color:var(--color-icon-disabled)}.ds-icon-button--filled:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button--outlined:disabled{background:transparent;color:var(--color-icon-disabled);border-color:var(--color-border-subtle)}.ds-icon-button--monogram:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled)}.ds-icon-button-toggle.ds-icon-button--icon{color:var(--color-icon-default)}.ds-icon-button-toggle.ds-icon-button--icon.is-selected,.ds-icon-button-toggle.ds-icon-button--icon[aria-pressed=true]{color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled{background:var(--color-surface-brand);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled.is-selected,.ds-icon-button-toggle.ds-icon-button--filled[aria-pressed=true]{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button-toggle.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined:hover:not(:disabled){border-color:var(--color-border-input-hover);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined:focus-visible{border-color:var(--color-border-input-active);color:var(--color-icon-brand);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined:active:not(:disabled){border-color:var(--color-border-active);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter{background:var(--color-surface-page);color:var(--color-text-primary);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-text-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle:disabled.is-selected,.ds-icon-button-toggle:disabled[aria-pressed=true]{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button-toggle:disabled.is-selected:after,.ds-icon-button-toggle:disabled[aria-pressed=true]:after{background:transparent!important}.mat-mdc-icon-button.ds-icon-button{--mat-icon-button-hover-state-layer-opacity: 0;--mat-icon-button-focus-state-layer-opacity: 0;--mat-icon-button-pressed-state-layer-opacity: 0;--mdc-icon-button-state-layer-size: 42px}.mat-mdc-icon-button.ds-icon-button.ds-icon-button--sm{--mdc-icon-button-state-layer-size: 32px}\n"], dependencies: [{ kind: "ngmodule", type: MatButtonModule }, { kind: "component", type: i1$1.MatIconButton, selector: "button[mat-icon-button], a[mat-icon-button], button[matIconButton], a[matIconButton]", exportAs: ["matButton", "matAnchor"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsIconButtonToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-icon-button-toggle', standalone: true, imports: [MatButtonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  mat-icon-button\n  [class]=\"buttonClasses\"\n  [disabled]=\"disabled\"\n  [type]=\"type\"\n  [attr.aria-label]=\"ariaLabel\"\n  [attr.aria-pressed]=\"selected\"\n  [disableRipple]=\"true\"\n  (click)=\"handleClick($event)\"\n>\n  <!-- Icon slot: <svg> or <ds-icon> goes here -->\n  <ng-content></ng-content>\n</button>\n", styles: [".ds-icon-button{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-sm);border:1px solid transparent;padding:0;cursor:pointer;position:relative;overflow:hidden;transition:background-color .15s ease,border-color .15s ease,box-shadow .15s ease}.ds-icon-button:focus{outline:none}.ds-icon-button:after{content:\"\";position:absolute;inset:0;background:transparent;pointer-events:none;transition:background .1s ease}.ds-icon-button>svg,.ds-icon-button .ds-icon-button__icon{width:24px;height:24px;display:block;flex-shrink:0;pointer-events:none}.ds-icon-button .ds-icon-button__label{font-family:var(--ref-typeface-brand);font-size:14px;font-weight:var(--ref-typeface-weight-medium);line-height:1;-webkit-user-select:none;user-select:none;pointer-events:none}.ds-icon-button--outlined-letter .ds-icon-button__label{font-size:var(--ref-typescale-title-h2-size);font-weight:var(--ref-typescale-title-h2-weight);line-height:1}.ds-icon-button--sm{width:32px;height:32px}.ds-icon-button--sm>svg,.ds-icon-button--sm .ds-icon-button__icon{width:20px;height:20px}.ds-icon-button--sm .ds-icon-button__label{font-size:12px}.ds-icon-button--icon{background:transparent;color:var(--color-icon-default)}.ds-icon-button--icon:hover:not(:disabled){background:var(--overlay-hovered)}.ds-icon-button--icon:focus-visible{background:var(--overlay-focused);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--icon:active:not(:disabled){background:var(--overlay-pressed)}.ds-icon-button--icon.is-error{color:var(--color-icon-error)}.ds-icon-button--filled{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button--filled:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--filled:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--filled:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--filled:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--filled.is-error{background:var(--color-surface-accent-red-bold);color:var(--color-icon-on-brand)}.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button--outlined:hover:not(:disabled){background:var(--overlay-hovered);color:var(--color-icon-brand);border-color:var(--color-border-input-hover)}.ds-icon-button--outlined:focus-visible{background:var(--overlay-focused);color:var(--color-icon-brand);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--outlined:active:not(:disabled){background:var(--overlay-pressed);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button--outlined.is-error{color:var(--color-icon-error);border-color:var(--color-border-accent-red)}.ds-icon-button--monogram{background:var(--color-surface-brand);color:var(--color-text-brand)}.ds-icon-button--monogram:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button--monogram:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button--monogram:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button--monogram:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button--monogram.is-error{background:var(--color-surface-accent-red);color:var(--color-icon-error)}.ds-icon-button:disabled{cursor:not-allowed}.ds-icon-button:disabled:after{background:transparent!important}.ds-icon-button--icon:disabled{background:transparent;color:var(--color-icon-disabled)}.ds-icon-button--filled:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button--outlined:disabled{background:transparent;color:var(--color-icon-disabled);border-color:var(--color-border-subtle)}.ds-icon-button--monogram:disabled{background:var(--color-surface-disabled);color:var(--color-icon-disabled)}.ds-icon-button-toggle.ds-icon-button--icon{color:var(--color-icon-default)}.ds-icon-button-toggle.ds-icon-button--icon.is-selected,.ds-icon-button-toggle.ds-icon-button--icon[aria-pressed=true]{color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled{background:var(--color-surface-brand);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--filled.is-selected,.ds-icon-button-toggle.ds-icon-button--filled[aria-pressed=true]{background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand)}.ds-icon-button-toggle.ds-icon-button--outlined{background:var(--color-surface-page);color:var(--color-icon-default);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined:hover:not(:disabled){border-color:var(--color-border-input-hover);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined:focus-visible{border-color:var(--color-border-input-active);color:var(--color-icon-brand);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined:active:not(:disabled){border-color:var(--color-border-active);color:var(--color-icon-brand)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-icon-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter{background:var(--color-surface-page);color:var(--color-text-primary);border-color:var(--color-border-primary)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]{background:var(--color-surface-brand);color:var(--color-text-brand);border-color:var(--color-border-active)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled):after{background:var(--overlay-hovered)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:hover:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:hover:not(:disabled){border-color:var(--color-border-input-hover)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible:after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible:after{background:var(--overlay-focused)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:focus-visible,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:focus-visible{border-color:var(--color-border-input-active);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled):after,.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled):after{background:var(--overlay-pressed)}.ds-icon-button-toggle.ds-icon-button--outlined-letter.is-selected:active:not(:disabled),.ds-icon-button-toggle.ds-icon-button--outlined-letter[aria-pressed=true]:active:not(:disabled){border-color:var(--color-border-active)}.ds-icon-button-toggle:disabled.is-selected,.ds-icon-button-toggle:disabled[aria-pressed=true]{background:var(--color-surface-disabled);color:var(--color-icon-disabled);border-color:transparent}.ds-icon-button-toggle:disabled.is-selected:after,.ds-icon-button-toggle:disabled[aria-pressed=true]:after{background:transparent!important}.mat-mdc-icon-button.ds-icon-button{--mat-icon-button-hover-state-layer-opacity: 0;--mat-icon-button-focus-state-layer-opacity: 0;--mat-icon-button-pressed-state-layer-opacity: 0;--mdc-icon-button-state-layer-size: 42px}.mat-mdc-icon-button.ds-icon-button.ds-icon-button--sm{--mdc-icon-button-state-layer-size: 32px}\n"] }]
        }], propDecorators: { variant: [{
                type: Input
            }], size: [{
                type: Input
            }], ariaLabel: [{
                type: Input,
                args: [{ required: true }]
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], type: [{
                type: Input
            }], selectedChange: [{
                type: Output
            }], clicked: [{
                type: Output
            }] } });

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
class DsInputComponent {
    el;
    // ── Host element bindings ─────────────────────────────────────────────────
    // <ds-input> acts as the .ds-input composite wrapper — state classes
    // applied here let existing _input.scss rules (label, helper, icons) match.
    hostClass = true;
    get hostError() { return this.isError; }
    get hostDisabled() { return this.disabled; }
    get hostReadonly() { return this.readOnly; }
    constructor(el) {
        this.el = el;
    }
    // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────
    // Set attribute on mousedown/touchstart (fires before focusin) so the SCSS
    // :focus-within:not([data-mouse-focus]) rule never fires for pointer focus.
    // Remove on focusout so keyboard re-focus to this field shows the ring again.
    onPointerDown() {
        this.el.nativeElement.setAttribute('data-mouse-focus', '');
    }
    onFocusOut() {
        this.el.nativeElement.removeAttribute('data-mouse-focus');
    }
    // ── Inputs ────────────────────────────────────────────────────────────────
    /** Label text shown above the field. */
    label = '';
    /** Marks the field as required (adds asterisk to label). */
    required = false;
    /** Input type. Default: 'text' */
    type = 'text';
    /** Placeholder text. */
    placeholder = '';
    /** Current value. Use [(value)] for two-way binding. */
    value = '';
    /** Material Symbols icon name for the leading (left) icon. */
    leadingIcon = '';
    /** Material Symbols icon name for the trailing (right) icon or action. */
    trailingIcon = '';
    /** Prefix text shown inside the field before the input (e.g. "$"). */
    prefix = '';
    /** Suffix text shown inside the field after the input (e.g. "USD"). */
    suffix = '';
    /** Helper text shown below the field. */
    helperText = '';
    /** Error message shown below the field when isError is true. */
    errorText = '';
    /** Applies error styling and shows errorText. */
    isError = false;
    /** Disables the field. */
    disabled = false;
    /** Makes the field read-only. */
    readOnly = false;
    // ── Outputs ───────────────────────────────────────────────────────────────
    /** Emits the new value on every keystroke. */
    valueChange = new EventEmitter();
    /** Emits when the trailing action button is clicked. */
    trailingAction = new EventEmitter();
    // ── Internal ──────────────────────────────────────────────────────────────
    _inputId = '';
    get inputId() { return this._inputId; }
    ngOnInit() {
        const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
        this._inputId = `ds-input-${slug}-${Math.random().toString(36).slice(2)}`;
    }
    onInput(event) {
        this.value = event.target.value;
        this.valueChange.emit(this.value);
    }
    onTrailingAction() {
        this.trailingAction.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsInputComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsInputComponent, isStandalone: true, selector: "ds-input", inputs: { label: "label", required: "required", type: "type", placeholder: "placeholder", value: "value", leadingIcon: "leadingIcon", trailingIcon: "trailingIcon", prefix: "prefix", suffix: "suffix", helperText: "helperText", errorText: "errorText", isError: "isError", disabled: "disabled", readOnly: "readOnly" }, outputs: { valueChange: "valueChange", trailingAction: "trailingAction" }, host: { listeners: { "mousedown": "onPointerDown()", "touchstart": "onPointerDown()", "focusout": "onFocusOut()" }, properties: { "class.ds-input": "this.hostClass", "class.is-error": "this.hostError", "class.is-disabled": "this.hostDisabled", "class.is-readonly": "this.hostReadonly" } }, ngImport: i0, template: "<!-- External label \u2014 sits above the mat-form-field, not floating inside it -->\n<label *ngIf=\"label\" class=\"ds-input__label\" [for]=\"inputId\">\n  {{ label }}<span *ngIf=\"required\" class=\"ds-input__required\" aria-hidden=\"true\">*</span>\n</label>\n\n<!-- mat-form-field owns the field box, border, prefix/suffix slots, and matInput -->\n<mat-form-field\n  appearance=\"outline\"\n  subscriptSizing=\"dynamic\"\n  class=\"ds-input__field-wrapper\"\n>\n\n  <!-- Leading icon -->\n  <span *ngIf=\"leadingIcon\" matPrefix\n    class=\"ds-icon ds-icon--sm ds-input__icon\" aria-hidden=\"true\">{{ leadingIcon }}</span>\n\n  <!-- Prefix text -->\n  <span *ngIf=\"prefix\" matPrefix\n    class=\"ds-input__prefix\" aria-hidden=\"true\">{{ prefix }}</span>\n\n  <!-- Input control -->\n  <input\n    matInput\n    [id]=\"inputId\"\n    [type]=\"type\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readOnly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"isError ? 'true' : null\"\n    [attr.aria-describedby]=\"(helperText || errorText) ? inputId + '-helper' : null\"\n    (input)=\"onInput($event)\"\n  />\n\n  <!-- Suffix text -->\n  <span *ngIf=\"suffix\" matSuffix\n    class=\"ds-input__suffix\" aria-hidden=\"true\">{{ suffix }}</span>\n\n  <!-- Error icon \u2014 replaces trailing action in error state -->\n  <span *ngIf=\"isError && !disabled\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-icon--filled ds-input__error-icon\" aria-hidden=\"true\">error</span>\n\n  <!-- Trailing action button (clear, show/hide, etc.) -->\n  <button *ngIf=\"trailingIcon && !disabled && !isError\" matSuffix\n    class=\"ds-input__action\" type=\"button\"\n    [attr.aria-label]=\"'Clear ' + label\"\n    (click)=\"onTrailingAction()\">\n    <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">{{ trailingIcon }}</span>\n  </button>\n\n  <!-- Trailing icon \u2014 decorative only when disabled -->\n  <span *ngIf=\"trailingIcon && disabled\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-input__icon\" aria-hidden=\"true\">{{ trailingIcon }}</span>\n\n</mat-form-field>\n\n<!-- Helper / error text \u2014 external, below the field -->\n<span\n  *ngIf=\"(isError && errorText) || helperText\"\n  class=\"ds-input__helper\"\n  [id]=\"inputId + '-helper'\"\n  [attr.role]=\"isError ? 'alert' : null\"\n>{{ isError && errorText ? errorText : helperText }}</span>\n", styles: [".ds-input{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-input__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-secondary);-webkit-user-select:none;user-select:none}.ds-input__required{color:var(--color-text-error);margin-left:2px}.ds-input__field{display:flex;align-items:center;gap:var(--spacing-xs);height:42px;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm);padding:0 var(--spacing-md);cursor:text;transition:border-color .15s ease,box-shadow .15s ease}.ds-input__field:hover{border-color:var(--color-border-input-hover)}.ds-input:focus-within .ds-input__field{border-color:var(--color-border-input-active)}.ds-input:focus-within:not([data-mouse-focus]) .ds-input__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input__control{flex:1;min-width:0;border:none;outline:none;background:transparent;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);caret-color:var(--color-border-input-active)}.ds-input__control::placeholder{color:var(--color-text-placeholder)}.ds-input__control:disabled{cursor:not-allowed}.ds-input__icon{color:var(--color-icon-subtle);flex-shrink:0;pointer-events:none}.ds-input__error-icon{color:var(--color-icon-error);flex-shrink:0;pointer-events:none}.ds-input__action{appearance:none;border:none;background:transparent;padding:2px;margin:-2px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-icon-subtle);border-radius:var(--radius-sm);flex-shrink:0;transition:color .1s ease}.ds-input__action:hover{color:var(--color-icon-default)}.ds-input__action:focus{outline:none}.ds-input__action:focus-visible{box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-input__prefix,.ds-input__suffix{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);color:var(--color-text-secondary);white-space:nowrap;-webkit-user-select:none;user-select:none;flex-shrink:0}.ds-input__prefix{padding-right:2px}.ds-input__suffix{padding-left:2px}.ds-input__helper{font-family:var(--ref-typeface-plain);font-size:var(--ref-typescale-body-small-size);line-height:var(--ref-typescale-body-small-line-height);color:var(--color-text-secondary)}.ds-input.is-error .ds-input__field{border-color:var(--color-border-input-error)}.ds-input.is-error .ds-input__action{display:none}.ds-input.is-error .ds-input__helper{color:var(--color-text-error)}.ds-input.is-error:focus-within .ds-input__field{border-color:var(--color-border-input-error)}.ds-input.is-error:focus-within:not([data-mouse-focus]) .ds-input__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input.is-disabled{pointer-events:none}.ds-input.is-disabled .ds-input__field{background:var(--color-surface-input-disabled);border-color:var(--color-border-subtle)}.ds-input.is-disabled .ds-input__label,.ds-input.is-disabled .ds-input__control{color:var(--color-text-disabled)}.ds-input.is-readonly .ds-input__field{background:var(--color-surface-default);border-color:var(--color-border-subtle);cursor:default}.ds-input.is-readonly .ds-input__control{cursor:default;color:var(--color-text-secondary)}.ds-input .mat-mdc-form-field{width:100%}.ds-input{--mat-form-field-container-height: 42px;--mat-form-field-container-vertical-padding: 0px;--mdc-outlined-text-field-container-shape: var(--radius-sm);--mdc-outlined-text-field-outline-width: 1px;--mdc-outlined-text-field-outline-color: var(--color-border-input);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-hover);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-color: var(--color-text-primary);--mdc-outlined-text-field-input-text-placeholder-color: var(--color-text-placeholder);--mdc-outlined-text-field-caret-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-font: var(--ref-typeface-brand);--mdc-outlined-text-field-input-text-size: var(--ref-typescale-label-medium-size);--mdc-outlined-text-field-input-text-weight: var(--ref-typeface-weight-regular);--mdc-outlined-text-field-input-text-line-height: var(--ref-typescale-label-medium-line-height)}.ds-input .mat-mdc-floating-label,.ds-input .mdc-floating-label,.ds-input .mat-mdc-form-field-subscript-wrapper{display:none}.ds-input .mat-mdc-text-field-wrapper{background:var(--color-surface-input);padding:0 var(--spacing-md);transition:border-color .15s ease,box-shadow .15s ease}.ds-input:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input.is-error{--mdc-outlined-text-field-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-error)}.ds-input.is-error:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input.is-disabled{--mdc-outlined-text-field-disabled-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-disabled-input-text-color: var(--color-text-disabled);--mdc-outlined-text-field-disabled-outline-opacity: 1}.ds-input.is-disabled .mat-mdc-text-field-wrapper{background:var(--color-surface-input-disabled)}.ds-input.is-disabled .ds-input__label{color:var(--color-text-disabled)}.ds-input.is-disabled .ds-input__icon{color:var(--color-icon-disabled)}.ds-input.is-disabled .ds-input__helper{color:var(--color-text-disabled)}.ds-input.is-readonly{--mdc-outlined-text-field-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-hover-outline-color: var(--color-border-subtle)}.ds-input.is-readonly .mat-mdc-text-field-wrapper{background:var(--color-surface-default);cursor:default}.ds-input.is-readonly .mdc-text-field__input{cursor:default;color:var(--color-text-secondary)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i2$1.MatPrefix, selector: "[matPrefix], [matIconPrefix], [matTextPrefix]", inputs: ["matTextPrefix"] }, { kind: "directive", type: i2$1.MatSuffix, selector: "[matSuffix], [matIconSuffix], [matTextSuffix]", inputs: ["matTextSuffix"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsInputComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-input', standalone: true, imports: [CommonModule, MatFormFieldModule, MatInputModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- External label \u2014 sits above the mat-form-field, not floating inside it -->\n<label *ngIf=\"label\" class=\"ds-input__label\" [for]=\"inputId\">\n  {{ label }}<span *ngIf=\"required\" class=\"ds-input__required\" aria-hidden=\"true\">*</span>\n</label>\n\n<!-- mat-form-field owns the field box, border, prefix/suffix slots, and matInput -->\n<mat-form-field\n  appearance=\"outline\"\n  subscriptSizing=\"dynamic\"\n  class=\"ds-input__field-wrapper\"\n>\n\n  <!-- Leading icon -->\n  <span *ngIf=\"leadingIcon\" matPrefix\n    class=\"ds-icon ds-icon--sm ds-input__icon\" aria-hidden=\"true\">{{ leadingIcon }}</span>\n\n  <!-- Prefix text -->\n  <span *ngIf=\"prefix\" matPrefix\n    class=\"ds-input__prefix\" aria-hidden=\"true\">{{ prefix }}</span>\n\n  <!-- Input control -->\n  <input\n    matInput\n    [id]=\"inputId\"\n    [type]=\"type\"\n    [placeholder]=\"placeholder\"\n    [value]=\"value\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readOnly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"isError ? 'true' : null\"\n    [attr.aria-describedby]=\"(helperText || errorText) ? inputId + '-helper' : null\"\n    (input)=\"onInput($event)\"\n  />\n\n  <!-- Suffix text -->\n  <span *ngIf=\"suffix\" matSuffix\n    class=\"ds-input__suffix\" aria-hidden=\"true\">{{ suffix }}</span>\n\n  <!-- Error icon \u2014 replaces trailing action in error state -->\n  <span *ngIf=\"isError && !disabled\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-icon--filled ds-input__error-icon\" aria-hidden=\"true\">error</span>\n\n  <!-- Trailing action button (clear, show/hide, etc.) -->\n  <button *ngIf=\"trailingIcon && !disabled && !isError\" matSuffix\n    class=\"ds-input__action\" type=\"button\"\n    [attr.aria-label]=\"'Clear ' + label\"\n    (click)=\"onTrailingAction()\">\n    <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">{{ trailingIcon }}</span>\n  </button>\n\n  <!-- Trailing icon \u2014 decorative only when disabled -->\n  <span *ngIf=\"trailingIcon && disabled\" matSuffix\n    class=\"ds-icon ds-icon--sm ds-input__icon\" aria-hidden=\"true\">{{ trailingIcon }}</span>\n\n</mat-form-field>\n\n<!-- Helper / error text \u2014 external, below the field -->\n<span\n  *ngIf=\"(isError && errorText) || helperText\"\n  class=\"ds-input__helper\"\n  [id]=\"inputId + '-helper'\"\n  [attr.role]=\"isError ? 'alert' : null\"\n>{{ isError && errorText ? errorText : helperText }}</span>\n", styles: [".ds-input{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-input__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-secondary);-webkit-user-select:none;user-select:none}.ds-input__required{color:var(--color-text-error);margin-left:2px}.ds-input__field{display:flex;align-items:center;gap:var(--spacing-xs);height:42px;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm);padding:0 var(--spacing-md);cursor:text;transition:border-color .15s ease,box-shadow .15s ease}.ds-input__field:hover{border-color:var(--color-border-input-hover)}.ds-input:focus-within .ds-input__field{border-color:var(--color-border-input-active)}.ds-input:focus-within:not([data-mouse-focus]) .ds-input__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input__control{flex:1;min-width:0;border:none;outline:none;background:transparent;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);caret-color:var(--color-border-input-active)}.ds-input__control::placeholder{color:var(--color-text-placeholder)}.ds-input__control:disabled{cursor:not-allowed}.ds-input__icon{color:var(--color-icon-subtle);flex-shrink:0;pointer-events:none}.ds-input__error-icon{color:var(--color-icon-error);flex-shrink:0;pointer-events:none}.ds-input__action{appearance:none;border:none;background:transparent;padding:2px;margin:-2px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-icon-subtle);border-radius:var(--radius-sm);flex-shrink:0;transition:color .1s ease}.ds-input__action:hover{color:var(--color-icon-default)}.ds-input__action:focus{outline:none}.ds-input__action:focus-visible{box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-input__prefix,.ds-input__suffix{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);color:var(--color-text-secondary);white-space:nowrap;-webkit-user-select:none;user-select:none;flex-shrink:0}.ds-input__prefix{padding-right:2px}.ds-input__suffix{padding-left:2px}.ds-input__helper{font-family:var(--ref-typeface-plain);font-size:var(--ref-typescale-body-small-size);line-height:var(--ref-typescale-body-small-line-height);color:var(--color-text-secondary)}.ds-input.is-error .ds-input__field{border-color:var(--color-border-input-error)}.ds-input.is-error .ds-input__action{display:none}.ds-input.is-error .ds-input__helper{color:var(--color-text-error)}.ds-input.is-error:focus-within .ds-input__field{border-color:var(--color-border-input-error)}.ds-input.is-error:focus-within:not([data-mouse-focus]) .ds-input__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input.is-disabled{pointer-events:none}.ds-input.is-disabled .ds-input__field{background:var(--color-surface-input-disabled);border-color:var(--color-border-subtle)}.ds-input.is-disabled .ds-input__label,.ds-input.is-disabled .ds-input__control{color:var(--color-text-disabled)}.ds-input.is-readonly .ds-input__field{background:var(--color-surface-default);border-color:var(--color-border-subtle);cursor:default}.ds-input.is-readonly .ds-input__control{cursor:default;color:var(--color-text-secondary)}.ds-input .mat-mdc-form-field{width:100%}.ds-input{--mat-form-field-container-height: 42px;--mat-form-field-container-vertical-padding: 0px;--mdc-outlined-text-field-container-shape: var(--radius-sm);--mdc-outlined-text-field-outline-width: 1px;--mdc-outlined-text-field-outline-color: var(--color-border-input);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-hover);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-color: var(--color-text-primary);--mdc-outlined-text-field-input-text-placeholder-color: var(--color-text-placeholder);--mdc-outlined-text-field-caret-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-font: var(--ref-typeface-brand);--mdc-outlined-text-field-input-text-size: var(--ref-typescale-label-medium-size);--mdc-outlined-text-field-input-text-weight: var(--ref-typeface-weight-regular);--mdc-outlined-text-field-input-text-line-height: var(--ref-typescale-label-medium-line-height)}.ds-input .mat-mdc-floating-label,.ds-input .mdc-floating-label,.ds-input .mat-mdc-form-field-subscript-wrapper{display:none}.ds-input .mat-mdc-text-field-wrapper{background:var(--color-surface-input);padding:0 var(--spacing-md);transition:border-color .15s ease,box-shadow .15s ease}.ds-input:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input.is-error{--mdc-outlined-text-field-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-error)}.ds-input.is-error:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-input.is-disabled{--mdc-outlined-text-field-disabled-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-disabled-input-text-color: var(--color-text-disabled);--mdc-outlined-text-field-disabled-outline-opacity: 1}.ds-input.is-disabled .mat-mdc-text-field-wrapper{background:var(--color-surface-input-disabled)}.ds-input.is-disabled .ds-input__label{color:var(--color-text-disabled)}.ds-input.is-disabled .ds-input__icon{color:var(--color-icon-disabled)}.ds-input.is-disabled .ds-input__helper{color:var(--color-text-disabled)}.ds-input.is-readonly{--mdc-outlined-text-field-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-hover-outline-color: var(--color-border-subtle)}.ds-input.is-readonly .mat-mdc-text-field-wrapper{background:var(--color-surface-default);cursor:default}.ds-input.is-readonly .mdc-text-field__input{cursor:default;color:var(--color-text-secondary)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class.ds-input']
            }], hostError: [{
                type: HostBinding,
                args: ['class.is-error']
            }], hostDisabled: [{
                type: HostBinding,
                args: ['class.is-disabled']
            }], hostReadonly: [{
                type: HostBinding,
                args: ['class.is-readonly']
            }], onPointerDown: [{
                type: HostListener,
                args: ['mousedown']
            }, {
                type: HostListener,
                args: ['touchstart']
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout']
            }], label: [{
                type: Input
            }], required: [{
                type: Input
            }], type: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], value: [{
                type: Input
            }], leadingIcon: [{
                type: Input
            }], trailingIcon: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], helperText: [{
                type: Input
            }], errorText: [{
                type: Input
            }], isError: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], trailingAction: [{
                type: Output
            }] } });

/**
 * ds-label
 *
 * Custom Onflo component — display-only colored label for categorizing content.
 * Not interactive or removable. Use ds-chip for removable items.
 *
 * @example
 * <ds-label color="green">Active</ds-label>
 * <ds-label color="red" size="sm">Urgent</ds-label>
 * <ds-label color="brand" [outline]="true">Brand</ds-label>
 * <ds-label color="navy" icon="info">Informational</ds-label>
 *
 * Pill style (fully rounded):
 * <ds-label color="green" [pill]="true">Active</ds-label>
 * <ds-label color="green" [pill]="true" [dot]="true">Active</ds-label>
 * <ds-label color="green" [pill]="true" [outline]="true" [dot]="true">Active</ds-label>
 */
class DsLabelComponent {
    /** Color variant */
    color = 'brand';
    /** Size */
    size = 'md';
    /** Outline style (adds colored border) */
    outline = false;
    /** Optional leading icon (Material Symbols name) */
    icon;
    /** Pill style — fully rounded shape */
    pill = false;
    /** Show status dot (pill style only) */
    dot = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsLabelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsLabelComponent, isStandalone: true, selector: "ds-label", inputs: { color: "color", size: "size", outline: "outline", icon: "icon", pill: "pill", dot: "dot" }, ngImport: i0, template: "<span\n  class=\"ds-label\"\n  [class]=\"'ds-label--' + color\"\n  [class.ds-label--sm]=\"size === 'sm'\"\n  [class.ds-label--xs]=\"size === 'xs'\"\n  [class.ds-label--outline]=\"outline\"\n  [class.ds-label--pill]=\"pill\"\n  [class.ds-label--has-dot]=\"pill && dot\"\n>\n  <span *ngIf=\"icon\" class=\"ds-label__icon\">{{ icon }}</span>\n  <span *ngIf=\"pill && dot\" class=\"ds-label__dot\" aria-hidden=\"true\"></span>\n  <ng-content />\n</span>\n", styles: [".ds-label{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-xs);height:42px;padding:0 16px;border-radius:var(--radius-sm);border:1px solid transparent;font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-primary);white-space:nowrap;vertical-align:middle}.ds-label--sm{height:32px;padding:0 12px}.ds-label--xs{height:24px;padding:0 10px}.ds-label--green{background:var(--color-surface-accent-green);--label-dot-color: var(--color-border-accent-green)}.ds-label--green.ds-label--outline{border-color:var(--color-border-accent-green)}.ds-label--red{background:var(--color-surface-accent-red);--label-dot-color: var(--color-border-accent-red)}.ds-label--red.ds-label--outline{border-color:var(--color-border-accent-red)}.ds-label--yellow{background:var(--color-surface-accent-yellow);--label-dot-color: var(--color-border-accent-yellow)}.ds-label--yellow.ds-label--outline{border-color:var(--color-border-accent-yellow)}.ds-label--brand{background:var(--color-surface-brand);--label-dot-color: var(--color-border-brand)}.ds-label--brand.ds-label--outline{border-color:var(--color-border-brand)}.ds-label--blue{background:var(--color-surface-accent-blue);--label-dot-color: var(--color-border-accent-blue)}.ds-label--blue.ds-label--outline{border-color:var(--color-border-accent-blue)}.ds-label--navy{background:var(--color-surface-accent-navy);--label-dot-color: var(--color-border-accent-navy)}.ds-label--navy.ds-label--outline{border-color:var(--color-border-accent-navy)}.ds-label--teal{background:var(--color-surface-accent-teal);--label-dot-color: var(--color-border-accent-teal)}.ds-label--teal.ds-label--outline{border-color:var(--color-border-accent-teal)}.ds-label--orange{background:var(--color-surface-accent-orange);--label-dot-color: var(--color-border-accent-orange)}.ds-label--orange.ds-label--outline{border-color:var(--color-border-accent-orange)}.ds-label--purple{background:var(--color-surface-accent-purple);--label-dot-color: var(--color-border-accent-purple)}.ds-label--purple.ds-label--outline{border-color:var(--color-border-accent-purple)}.ds-label--pink{background:var(--color-surface-accent-pink);--label-dot-color: var(--color-border-accent-pink)}.ds-label--pink.ds-label--outline{border-color:var(--color-border-accent-pink)}.ds-label--disabled{background:var(--color-surface-disabled);color:var(--color-text-disabled);--label-dot-color: var(--color-border-subtle)}.ds-label--disabled.ds-label--outline{border-color:var(--color-border-subtle)}.ds-label__icon{font-family:Material Symbols Rounded;font-size:12px;width:12px;height:12px;display:flex;align-items:center;justify-content:center;font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.ds-label--pill{border-radius:var(--radius-full);padding:0 12px}.ds-label--pill.ds-label--sm{padding:0 12px}.ds-label--pill.ds-label--xs{padding:0 8px}.ds-label--pill.ds-label--has-dot{padding-left:var(--spacing-sm)}.ds-label--pill.ds-label--has-dot.ds-label--xs{padding-left:var(--spacing-xs)}.ds-label__dot{width:10px;height:10px;border-radius:50%;background:var(--label-dot-color, var(--color-border-primary));flex-shrink:0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-label', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<span\n  class=\"ds-label\"\n  [class]=\"'ds-label--' + color\"\n  [class.ds-label--sm]=\"size === 'sm'\"\n  [class.ds-label--xs]=\"size === 'xs'\"\n  [class.ds-label--outline]=\"outline\"\n  [class.ds-label--pill]=\"pill\"\n  [class.ds-label--has-dot]=\"pill && dot\"\n>\n  <span *ngIf=\"icon\" class=\"ds-label__icon\">{{ icon }}</span>\n  <span *ngIf=\"pill && dot\" class=\"ds-label__dot\" aria-hidden=\"true\"></span>\n  <ng-content />\n</span>\n", styles: [".ds-label{display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-xs);height:42px;padding:0 16px;border-radius:var(--radius-sm);border:1px solid transparent;font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-primary);white-space:nowrap;vertical-align:middle}.ds-label--sm{height:32px;padding:0 12px}.ds-label--xs{height:24px;padding:0 10px}.ds-label--green{background:var(--color-surface-accent-green);--label-dot-color: var(--color-border-accent-green)}.ds-label--green.ds-label--outline{border-color:var(--color-border-accent-green)}.ds-label--red{background:var(--color-surface-accent-red);--label-dot-color: var(--color-border-accent-red)}.ds-label--red.ds-label--outline{border-color:var(--color-border-accent-red)}.ds-label--yellow{background:var(--color-surface-accent-yellow);--label-dot-color: var(--color-border-accent-yellow)}.ds-label--yellow.ds-label--outline{border-color:var(--color-border-accent-yellow)}.ds-label--brand{background:var(--color-surface-brand);--label-dot-color: var(--color-border-brand)}.ds-label--brand.ds-label--outline{border-color:var(--color-border-brand)}.ds-label--blue{background:var(--color-surface-accent-blue);--label-dot-color: var(--color-border-accent-blue)}.ds-label--blue.ds-label--outline{border-color:var(--color-border-accent-blue)}.ds-label--navy{background:var(--color-surface-accent-navy);--label-dot-color: var(--color-border-accent-navy)}.ds-label--navy.ds-label--outline{border-color:var(--color-border-accent-navy)}.ds-label--teal{background:var(--color-surface-accent-teal);--label-dot-color: var(--color-border-accent-teal)}.ds-label--teal.ds-label--outline{border-color:var(--color-border-accent-teal)}.ds-label--orange{background:var(--color-surface-accent-orange);--label-dot-color: var(--color-border-accent-orange)}.ds-label--orange.ds-label--outline{border-color:var(--color-border-accent-orange)}.ds-label--purple{background:var(--color-surface-accent-purple);--label-dot-color: var(--color-border-accent-purple)}.ds-label--purple.ds-label--outline{border-color:var(--color-border-accent-purple)}.ds-label--pink{background:var(--color-surface-accent-pink);--label-dot-color: var(--color-border-accent-pink)}.ds-label--pink.ds-label--outline{border-color:var(--color-border-accent-pink)}.ds-label--disabled{background:var(--color-surface-disabled);color:var(--color-text-disabled);--label-dot-color: var(--color-border-subtle)}.ds-label--disabled.ds-label--outline{border-color:var(--color-border-subtle)}.ds-label__icon{font-family:Material Symbols Rounded;font-size:12px;width:12px;height:12px;display:flex;align-items:center;justify-content:center;font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.ds-label--pill{border-radius:var(--radius-full);padding:0 12px}.ds-label--pill.ds-label--sm{padding:0 12px}.ds-label--pill.ds-label--xs{padding:0 8px}.ds-label--pill.ds-label--has-dot{padding-left:var(--spacing-sm)}.ds-label--pill.ds-label--has-dot.ds-label--xs{padding-left:var(--spacing-xs)}.ds-label__dot{width:10px;height:10px;border-radius:50%;background:var(--label-dot-color, var(--color-border-primary));flex-shrink:0}\n"] }]
        }], propDecorators: { color: [{
                type: Input
            }], size: [{
                type: Input
            }], outline: [{
                type: Input
            }], icon: [{
                type: Input
            }], pill: [{
                type: Input
            }], dot: [{
                type: Input
            }] } });

/**
 * ds-list / ds-list-item
 *
 * Based on Angular Material mat-list / mat-list-item.
 *
 * Leading and trailing slots accept any projected content via attribute selectors:
 *   [leading]  — leading icon, checkbox, avatar, etc.
 *   [trailing] — trailing icon, chevron, etc.
 *
 * @example
 * <!-- Icon leading (nav / interactive list) -->
 * <ds-list>
 *   <ds-list-item primary="Settings" [interactive]="true">
 *     <span leading class="ds-icon">settings</span>
 *   </ds-list-item>
 * </ds-list>
 *
 * <!-- Checkbox leading (selection list) -->
 * <ds-list>
 *   <ds-list-item overline="Team" primary="Alice Johnson" secondary="alice@co.com" variant="3-lines">
 *     <ds-checkbox leading aria-label="Select Alice Johnson" />
 *   </ds-list-item>
 * </ds-list>
 *
 * <!-- Text only -->
 * <ds-list>
 *   <ds-list-item primary="Simple item" />
 * </ds-list>
 */
/** Marker directive — place on any projected leading-slot element: `<span leading class="ds-icon">` */
class DsLeadingDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsLeadingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.7", type: DsLeadingDirective, isStandalone: true, selector: "[leading]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsLeadingDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[leading]', standalone: true }]
        }] });
/** Marker directive — place on any projected trailing-slot element: `<span trailing class="ds-icon ds-icon--sm">` */
class DsTrailingDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTrailingDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.7", type: DsTrailingDirective, isStandalone: true, selector: "[trailing]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTrailingDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[trailing]', standalone: true }]
        }] });
class DsListItemComponent {
    cdr;
    primary = '';
    secondary = '';
    overline = '';
    interactive = false;
    disabled = false;
    /**
     * '1-line' | '2-lines' | '3-lines'
     * Note: '1-line' and '2-lines' produce the natural single/two-text layout with no
     * CSS modifier. '3-lines' applies `.ds-list-item--3-lines` which clamps the secondary
     * text to 2 lines via -webkit-line-clamp.
     */
    variant = '1-line';
    _leadingRef;
    _trailingRef;
    hasLeading = false;
    hasTrailing = false;
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngAfterContentInit() {
        this.hasLeading = !!this._leadingRef;
        this.hasTrailing = !!this._trailingRef;
        this.cdr.markForCheck();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsListItemComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.7", type: DsListItemComponent, isStandalone: true, selector: "ds-list-item", inputs: { primary: "primary", secondary: "secondary", overline: "overline", interactive: "interactive", disabled: "disabled", variant: "variant" }, queries: [{ propertyName: "_leadingRef", first: true, predicate: DsLeadingDirective, descendants: true }, { propertyName: "_trailingRef", first: true, predicate: DsTrailingDirective, descendants: true }], ngImport: i0, template: "<mat-list-item\n  class=\"ds-list-item\"\n  [class.ds-list-item--interactive]=\"interactive\"\n  [class.ds-list-item--3-lines]=\"variant === '3-lines'\"\n  [class.is-disabled]=\"disabled\"\n  [attr.tabindex]=\"interactive ? 0 : null\"\n  [attr.aria-disabled]=\"disabled || null\"\n>\n  @if (hasLeading) {\n    <div class=\"ds-list-item__leading\">\n      <ng-content select=\"[leading]\" />\n    </div>\n  }\n  <div class=\"ds-list-item__content\">\n    @if (overline) {\n      <span class=\"ds-list-item__overline\">{{ overline }}</span>\n    }\n    <span class=\"ds-list-item__primary\">{{ primary }}</span>\n    @if (secondary) {\n      <span class=\"ds-list-item__secondary\">{{ secondary }}</span>\n    }\n  </div>\n  @if (hasTrailing) {\n    <div class=\"ds-list-item__trailing\">\n      <ng-content select=\"[trailing]\" />\n    </div>\n  }\n  <ng-content />\n</mat-list-item>\n", styles: [".ds-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;background:var(--color-surface-page);border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--color-border-subtle)}.ds-list-item{display:flex;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-lg);background:transparent;border-bottom:1px solid var(--color-border-subtle);position:relative;min-height:48px;cursor:default;transition:background .12s ease}.ds-list-item:last-child{border-bottom:none}.ds-list-item--interactive{cursor:pointer}.ds-list-item--interactive:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-list-item--interactive:focus{outline:none}.ds-list-item--interactive:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-list-item--interactive:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-list-item.is-disabled{pointer-events:none}.ds-list-item.is-disabled .ds-list-item__primary,.ds-list-item.is-disabled .ds-list-item__secondary,.ds-list-item.is-disabled .ds-list-item__overline{color:var(--color-text-disabled)}.ds-list-item.is-disabled .ds-list-item__leading>.ds-icon,.ds-list-item.is-disabled .ds-list-item__trailing>.ds-icon{color:var(--color-icon-disabled)}.ds-list-item__leading{display:flex;align-items:center;justify-content:center;flex-shrink:0}.ds-list-item__leading>.ds-icon{color:var(--color-icon-default);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.ds-list-item__content{flex:1;min-width:0;display:flex;flex-direction:column}.ds-list-item__overline{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);letter-spacing:var(--ref-typescale-label-small-tracking, .06em);text-transform:uppercase}.ds-list-item__primary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ds-list-item__secondary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary)}.ds-list-item--3-lines .ds-list-item__secondary{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal}.ds-list-item__trailing{display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:auto}.ds-list-item__trailing>.ds-icon{color:var(--color-icon-subtle);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.mat-mdc-list{--mat-list-active-indicator-color: transparent;padding:0}.mat-mdc-list-item{--mdc-list-list-item-container-color: transparent;--mdc-list-list-item-one-line-container-height: 48px;--mdc-list-list-item-two-line-container-height: 48px;--mdc-list-list-item-three-line-container-height: 48px;--mdc-list-list-item-hover-state-layer-opacity: 0;--mdc-list-list-item-focus-state-layer-opacity: 0;--mdc-list-list-item-pressed-state-layer-opacity: 0}.mat-mdc-list-item .mdc-list-item__content{display:contents}\n"], dependencies: [{ kind: "ngmodule", type: MatListModule }, { kind: "component", type: i1$4.MatListItem, selector: "mat-list-item, a[mat-list-item], button[mat-list-item]", inputs: ["activated"], exportAs: ["matListItem"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsListItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-list-item', standalone: true, imports: [DsLeadingDirective, DsTrailingDirective, MatListModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-list-item\n  class=\"ds-list-item\"\n  [class.ds-list-item--interactive]=\"interactive\"\n  [class.ds-list-item--3-lines]=\"variant === '3-lines'\"\n  [class.is-disabled]=\"disabled\"\n  [attr.tabindex]=\"interactive ? 0 : null\"\n  [attr.aria-disabled]=\"disabled || null\"\n>\n  @if (hasLeading) {\n    <div class=\"ds-list-item__leading\">\n      <ng-content select=\"[leading]\" />\n    </div>\n  }\n  <div class=\"ds-list-item__content\">\n    @if (overline) {\n      <span class=\"ds-list-item__overline\">{{ overline }}</span>\n    }\n    <span class=\"ds-list-item__primary\">{{ primary }}</span>\n    @if (secondary) {\n      <span class=\"ds-list-item__secondary\">{{ secondary }}</span>\n    }\n  </div>\n  @if (hasTrailing) {\n    <div class=\"ds-list-item__trailing\">\n      <ng-content select=\"[trailing]\" />\n    </div>\n  }\n  <ng-content />\n</mat-list-item>\n", styles: [".ds-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;background:var(--color-surface-page);border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--color-border-subtle)}.ds-list-item{display:flex;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-lg);background:transparent;border-bottom:1px solid var(--color-border-subtle);position:relative;min-height:48px;cursor:default;transition:background .12s ease}.ds-list-item:last-child{border-bottom:none}.ds-list-item--interactive{cursor:pointer}.ds-list-item--interactive:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-list-item--interactive:focus{outline:none}.ds-list-item--interactive:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-list-item--interactive:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-list-item.is-disabled{pointer-events:none}.ds-list-item.is-disabled .ds-list-item__primary,.ds-list-item.is-disabled .ds-list-item__secondary,.ds-list-item.is-disabled .ds-list-item__overline{color:var(--color-text-disabled)}.ds-list-item.is-disabled .ds-list-item__leading>.ds-icon,.ds-list-item.is-disabled .ds-list-item__trailing>.ds-icon{color:var(--color-icon-disabled)}.ds-list-item__leading{display:flex;align-items:center;justify-content:center;flex-shrink:0}.ds-list-item__leading>.ds-icon{color:var(--color-icon-default);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.ds-list-item__content{flex:1;min-width:0;display:flex;flex-direction:column}.ds-list-item__overline{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);letter-spacing:var(--ref-typescale-label-small-tracking, .06em);text-transform:uppercase}.ds-list-item__primary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ds-list-item__secondary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary)}.ds-list-item--3-lines .ds-list-item__secondary{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal}.ds-list-item__trailing{display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:auto}.ds-list-item__trailing>.ds-icon{color:var(--color-icon-subtle);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.mat-mdc-list{--mat-list-active-indicator-color: transparent;padding:0}.mat-mdc-list-item{--mdc-list-list-item-container-color: transparent;--mdc-list-list-item-one-line-container-height: 48px;--mdc-list-list-item-two-line-container-height: 48px;--mdc-list-list-item-three-line-container-height: 48px;--mdc-list-list-item-hover-state-layer-opacity: 0;--mdc-list-list-item-focus-state-layer-opacity: 0;--mdc-list-list-item-pressed-state-layer-opacity: 0}.mat-mdc-list-item .mdc-list-item__content{display:contents}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { primary: [{
                type: Input
            }], secondary: [{
                type: Input
            }], overline: [{
                type: Input
            }], interactive: [{
                type: Input
            }], disabled: [{
                type: Input
            }], variant: [{
                type: Input
            }], _leadingRef: [{
                type: ContentChild,
                args: [DsLeadingDirective]
            }], _trailingRef: [{
                type: ContentChild,
                args: [DsTrailingDirective]
            }] } });
class DsListComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsListComponent, isStandalone: true, selector: "ds-list", ngImport: i0, template: `<mat-list class="ds-list"><ng-content /></mat-list>`, isInline: true, styles: [".ds-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;background:var(--color-surface-page);border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--color-border-subtle)}.ds-list-item{display:flex;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-lg);background:transparent;border-bottom:1px solid var(--color-border-subtle);position:relative;min-height:48px;cursor:default;transition:background .12s ease}.ds-list-item:last-child{border-bottom:none}.ds-list-item--interactive{cursor:pointer}.ds-list-item--interactive:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-list-item--interactive:focus{outline:none}.ds-list-item--interactive:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-list-item--interactive:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-list-item.is-disabled{pointer-events:none}.ds-list-item.is-disabled .ds-list-item__primary,.ds-list-item.is-disabled .ds-list-item__secondary,.ds-list-item.is-disabled .ds-list-item__overline{color:var(--color-text-disabled)}.ds-list-item.is-disabled .ds-list-item__leading>.ds-icon,.ds-list-item.is-disabled .ds-list-item__trailing>.ds-icon{color:var(--color-icon-disabled)}.ds-list-item__leading{display:flex;align-items:center;justify-content:center;flex-shrink:0}.ds-list-item__leading>.ds-icon{color:var(--color-icon-default);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.ds-list-item__content{flex:1;min-width:0;display:flex;flex-direction:column}.ds-list-item__overline{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);letter-spacing:var(--ref-typescale-label-small-tracking, .06em);text-transform:uppercase}.ds-list-item__primary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ds-list-item__secondary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary)}.ds-list-item--3-lines .ds-list-item__secondary{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal}.ds-list-item__trailing{display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:auto}.ds-list-item__trailing>.ds-icon{color:var(--color-icon-subtle);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.mat-mdc-list{--mat-list-active-indicator-color: transparent;padding:0}.mat-mdc-list-item{--mdc-list-list-item-container-color: transparent;--mdc-list-list-item-one-line-container-height: 48px;--mdc-list-list-item-two-line-container-height: 48px;--mdc-list-list-item-three-line-container-height: 48px;--mdc-list-list-item-hover-state-layer-opacity: 0;--mdc-list-list-item-focus-state-layer-opacity: 0;--mdc-list-list-item-pressed-state-layer-opacity: 0}.mat-mdc-list-item .mdc-list-item__content{display:contents}\n"], dependencies: [{ kind: "ngmodule", type: MatListModule }, { kind: "component", type: i1$4.MatList, selector: "mat-list", exportAs: ["matList"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-list', standalone: true, imports: [MatListModule], template: `<mat-list class="ds-list"><ng-content /></mat-list>`, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".ds-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;background:var(--color-surface-page);border-radius:var(--radius-md);overflow:hidden;border:1px solid var(--color-border-subtle)}.ds-list-item{display:flex;align-items:center;gap:var(--spacing-md);padding:var(--spacing-md) var(--spacing-lg);background:transparent;border-bottom:1px solid var(--color-border-subtle);position:relative;min-height:48px;cursor:default;transition:background .12s ease}.ds-list-item:last-child{border-bottom:none}.ds-list-item--interactive{cursor:pointer}.ds-list-item--interactive:hover:not(.is-disabled){background:var(--overlay-hovered)}.ds-list-item--interactive:focus{outline:none}.ds-list-item--interactive:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-list-item--interactive:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-list-item.is-disabled{pointer-events:none}.ds-list-item.is-disabled .ds-list-item__primary,.ds-list-item.is-disabled .ds-list-item__secondary,.ds-list-item.is-disabled .ds-list-item__overline{color:var(--color-text-disabled)}.ds-list-item.is-disabled .ds-list-item__leading>.ds-icon,.ds-list-item.is-disabled .ds-list-item__trailing>.ds-icon{color:var(--color-icon-disabled)}.ds-list-item__leading{display:flex;align-items:center;justify-content:center;flex-shrink:0}.ds-list-item__leading>.ds-icon{color:var(--color-icon-default);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.ds-list-item__content{flex:1;min-width:0;display:flex;flex-direction:column}.ds-list-item__overline{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary);letter-spacing:var(--ref-typescale-label-small-tracking, .06em);text-transform:uppercase}.ds-list-item__primary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-medium);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ds-list-item__secondary{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary)}.ds-list-item--3-lines .ds-list-item__secondary{display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;white-space:normal}.ds-list-item__trailing{display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-left:auto}.ds-list-item__trailing>.ds-icon{color:var(--color-icon-subtle);font-variation-settings:\"FILL\" 0,\"wght\" 400,\"GRAD\" 0,\"opsz\" 20}.mat-mdc-list{--mat-list-active-indicator-color: transparent;padding:0}.mat-mdc-list-item{--mdc-list-list-item-container-color: transparent;--mdc-list-list-item-one-line-container-height: 48px;--mdc-list-list-item-two-line-container-height: 48px;--mdc-list-list-item-three-line-container-height: 48px;--mdc-list-list-item-hover-state-layer-opacity: 0;--mdc-list-list-item-focus-state-layer-opacity: 0;--mdc-list-list-item-pressed-state-layer-opacity: 0}.mat-mdc-list-item .mdc-list-item__content{display:contents}\n"] }]
        }] });

const NAV_BUTTON_CONFIG = {
    tickets: { icon: 'inbox', filled: true, label: 'Tickets' },
    assets: { icon: 'desktop_mac', filled: false, label: 'Assets' },
    analytics: { icon: 'equalizer', filled: false, label: 'Analytics' },
    settings: { icon: 'settings', filled: true, label: 'Settings' },
    campaigns: { icon: 'campaign', filled: false, label: 'Campaign' },
    home: { icon: 'home', filled: false, label: 'Home' },
    requests: { icon: 'inbox', filled: true, label: 'Requests' },
    systems: { icon: 'monitor_heart', filled: false, label: 'Systems' },
};
class NavButtonComponent {
    type = 'tickets';
    selected = false;
    get config() {
        return NAV_BUTTON_CONFIG[this.type];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: NavButtonComponent, isStandalone: true, selector: "ds-nav-button", inputs: { type: "type", selected: "selected" }, host: { styleAttribute: "display: contents" }, ngImport: i0, template: "<button\n  class=\"ds-nav-button\"\n  [class.is-selected]=\"selected\"\n  type=\"button\"\n  [attr.aria-pressed]=\"selected\"\n  [attr.aria-label]=\"config.label\"\n>\n  <span class=\"ds-icon\" [class.ds-icon--filled]=\"config.filled\" aria-hidden=\"true\">{{ config.icon }}</span>\n  <span class=\"ds-nav-button__label\">{{ config.label }}</span>\n</button>\n", styles: [".ds-nav-button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--spacing-xs);width:64px;height:52px;padding:4px 16px;box-sizing:border-box;border-radius:var(--radius-sm);overflow:hidden;background:transparent;border:none;color:var(--color-icon-nav);cursor:pointer;font-family:var(--ref-typescale-label-small-font);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typescale-label-small-weight-prominent);line-height:var(--ref-typescale-label-small-line-height);letter-spacing:var(--ref-typescale-label-small-tracking);text-align:center;position:relative}.ds-nav-button:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-nav-button:hover:after{background:var(--overlay-hovered)}.ds-nav-button:active:after{background:var(--overlay-pressed)}.ds-nav-button:focus{outline:none}.ds-nav-button:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-nav-button .ds-icon{color:currentColor;flex-shrink:0;font-size:24px}.ds-nav-button__label{white-space:nowrap}.ds-nav-button.is-selected{background:var(--color-surface-nav-active);color:var(--color-icon-nav-active)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-nav-button', standalone: true, imports: [CommonModule], host: { style: 'display: contents' }, template: "<button\n  class=\"ds-nav-button\"\n  [class.is-selected]=\"selected\"\n  type=\"button\"\n  [attr.aria-pressed]=\"selected\"\n  [attr.aria-label]=\"config.label\"\n>\n  <span class=\"ds-icon\" [class.ds-icon--filled]=\"config.filled\" aria-hidden=\"true\">{{ config.icon }}</span>\n  <span class=\"ds-nav-button__label\">{{ config.label }}</span>\n</button>\n", styles: [".ds-nav-button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--spacing-xs);width:64px;height:52px;padding:4px 16px;box-sizing:border-box;border-radius:var(--radius-sm);overflow:hidden;background:transparent;border:none;color:var(--color-icon-nav);cursor:pointer;font-family:var(--ref-typescale-label-small-font);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typescale-label-small-weight-prominent);line-height:var(--ref-typescale-label-small-line-height);letter-spacing:var(--ref-typescale-label-small-tracking);text-align:center;position:relative}.ds-nav-button:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-nav-button:hover:after{background:var(--overlay-hovered)}.ds-nav-button:active:after{background:var(--overlay-pressed)}.ds-nav-button:focus{outline:none}.ds-nav-button:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-nav-button .ds-icon{color:currentColor;flex-shrink:0;font-size:24px}.ds-nav-button__label{white-space:nowrap}.ds-nav-button.is-selected{background:var(--color-surface-nav-active);color:var(--color-icon-nav-active)}\n"] }]
        }], propDecorators: { type: [{
                type: Input
            }], selected: [{
                type: Input
            }] } });

class NavExpandComponent {
    /** Whether the sub-navigation panel is currently open. */
    open = true;
    /** Emitted when the button is clicked — caller toggles the panel. */
    toggle = new EventEmitter();
    get ariaLabel() {
        return this.open ? 'Collapse navigation' : 'Expand navigation';
    }
    get iconName() {
        return this.open ? 'right_panel_open' : 'right_panel_close';
    }
    onClick() {
        this.toggle.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavExpandComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: NavExpandComponent, isStandalone: true, selector: "ds-nav-expand", inputs: { open: "open" }, outputs: { toggle: "toggle" }, host: { styleAttribute: "display: contents" }, ngImport: i0, template: "<button\n  class=\"ds-nav-expand\"\n  type=\"button\"\n  [attr.aria-expanded]=\"open\"\n  [attr.aria-label]=\"ariaLabel\"\n  (click)=\"onClick()\"\n>\n  <span class=\"ds-icon ds-icon--filled\" aria-hidden=\"true\">{{ iconName }}</span>\n</button>\n", styles: [".ds-nav-expand{position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;padding:0;border:none;border-radius:4px;overflow:hidden;background:var(--color-surface-page);box-shadow:0 1px 8px 0 var(--shadow-elevation-3),0 2px 3px 0 var(--shadow-elevation-3);color:var(--color-icon-brand);cursor:pointer}.ds-nav-expand .ds-icon{font-size:20px;line-height:1;color:currentColor}.ds-nav-expand:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-nav-expand:hover:after{background:var(--overlay-hovered)}.ds-nav-expand:active:after{background:var(--overlay-pressed)}.ds-nav-expand:focus{outline:none}.ds-nav-expand:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavExpandComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-nav-expand', standalone: true, imports: [CommonModule], host: { style: 'display: contents' }, template: "<button\n  class=\"ds-nav-expand\"\n  type=\"button\"\n  [attr.aria-expanded]=\"open\"\n  [attr.aria-label]=\"ariaLabel\"\n  (click)=\"onClick()\"\n>\n  <span class=\"ds-icon ds-icon--filled\" aria-hidden=\"true\">{{ iconName }}</span>\n</button>\n", styles: [".ds-nav-expand{position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;padding:0;border:none;border-radius:4px;overflow:hidden;background:var(--color-surface-page);box-shadow:0 1px 8px 0 var(--shadow-elevation-3),0 2px 3px 0 var(--shadow-elevation-3);color:var(--color-icon-brand);cursor:pointer}.ds-nav-expand .ds-icon{font-size:20px;line-height:1;color:currentColor}.ds-nav-expand:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-nav-expand:hover:after{background:var(--overlay-hovered)}.ds-nav-expand:active:after{background:var(--overlay-pressed)}.ds-nav-expand:focus{outline:none}.ds-nav-expand:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}\n"] }]
        }], propDecorators: { open: [{
                type: Input
            }], toggle: [{
                type: Output
            }] } });

class NavSidebarComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavSidebarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: NavSidebarComponent, isStandalone: true, selector: "ds-nav-sidebar", host: { styleAttribute: "display: contents" }, ngImport: i0, template: "<nav class=\"ds-nav-sidebar\" role=\"navigation\" aria-label=\"Main navigation\">\n  <div class=\"ds-nav-sidebar__logo\">\n    <ng-content select=\"[logo]\" />\n  </div>\n  <div class=\"ds-nav-sidebar__nav\">\n    <ng-content select=\"[nav]\" />\n  </div>\n  <div class=\"ds-nav-sidebar__bottom\">\n    <ng-content select=\"[bottom]\" />\n  </div>\n</nav>\n", styles: [".ds-nav-sidebar{display:flex;flex-direction:column;align-items:center;width:80px;height:100%;padding:var(--spacing-xs);box-sizing:border-box;gap:var(--spacing-md);overflow:hidden;background:var(--color-surface-nav);box-shadow:0 1px 10px 4px var(--shadow-elevation-2),0 4px 3px 0 var(--shadow-elevation-2);position:relative;z-index:1}.ds-nav-sidebar__logo{width:100%;padding:var(--spacing-md);box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ds-nav-sidebar__nav{display:flex;flex-direction:column;gap:var(--spacing-md);align-items:center;flex-shrink:0}.ds-nav-sidebar__bottom{display:flex;flex-direction:column;gap:var(--spacing-md);align-items:center;margin-top:auto;padding-bottom:var(--spacing-lg);flex-shrink:0}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-nav-sidebar', standalone: true, host: { style: 'display: contents' }, template: "<nav class=\"ds-nav-sidebar\" role=\"navigation\" aria-label=\"Main navigation\">\n  <div class=\"ds-nav-sidebar__logo\">\n    <ng-content select=\"[logo]\" />\n  </div>\n  <div class=\"ds-nav-sidebar__nav\">\n    <ng-content select=\"[nav]\" />\n  </div>\n  <div class=\"ds-nav-sidebar__bottom\">\n    <ng-content select=\"[bottom]\" />\n  </div>\n</nav>\n", styles: [".ds-nav-sidebar{display:flex;flex-direction:column;align-items:center;width:80px;height:100%;padding:var(--spacing-xs);box-sizing:border-box;gap:var(--spacing-md);overflow:hidden;background:var(--color-surface-nav);box-shadow:0 1px 10px 4px var(--shadow-elevation-2),0 4px 3px 0 var(--shadow-elevation-2);position:relative;z-index:1}.ds-nav-sidebar__logo{width:100%;padding:var(--spacing-md);box-sizing:border-box;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ds-nav-sidebar__nav{display:flex;flex-direction:column;gap:var(--spacing-md);align-items:center;flex-shrink:0}.ds-nav-sidebar__bottom{display:flex;flex-direction:column;gap:var(--spacing-md);align-items:center;margin-top:auto;padding-bottom:var(--spacing-lg);flex-shrink:0}\n"] }]
        }] });

class NavTabComponent {
    label = '';
    active = false;
    /** Collapsed overflow indicator — shows "..." at 26px width, no close button. */
    more = false;
    /** Emitted when the tab body is clicked (activate this tab). */
    tabClick = new EventEmitter();
    /** Emitted when the × close button is clicked. */
    tabClose = new EventEmitter();
    onTabClick() {
        this.tabClick.emit();
    }
    onCloseClick(event) {
        event.stopPropagation();
        this.tabClose.emit();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "21.2.7", type: NavTabComponent, isStandalone: true, selector: "ds-nav-tab", inputs: { label: "label", active: "active", more: "more" }, outputs: { tabClick: "tabClick", tabClose: "tabClose" }, host: { styleAttribute: "display: contents" }, ngImport: i0, template: "<div\n  class=\"ds-nav-tab\"\n  [class.is-active]=\"active\"\n  [class.ds-nav-tab--more]=\"more\"\n  role=\"button\"\n  tabindex=\"0\"\n  [attr.aria-pressed]=\"more ? null : active\"\n  [attr.aria-label]=\"more ? 'More tabs' : label + (active ? ' tab \u2014 active' : ' tab')\"\n  (click)=\"onTabClick()\"\n  (keydown.enter)=\"onTabClick()\"\n  (keydown.space)=\"$event.preventDefault(); onTabClick()\"\n>\n  <div class=\"ds-nav-tab__content\">\n    @if (more) {\n      <span class=\"ds-nav-tab__label\">...</span>\n    } @else {\n      <span class=\"ds-nav-tab__label\">{{ label }}</span>\n      <button\n        class=\"ds-nav-tab__close\"\n        type=\"button\"\n        [attr.aria-label]=\"'Close ' + label + ' tab'\"\n        (click)=\"onCloseClick($event)\"\n      >\n        <span class=\"ds-icon ds-icon--xs\" aria-hidden=\"true\">close_small</span>\n      </button>\n    }\n  </div>\n</div>\n", styles: [".ds-nav-tab{display:flex;align-items:stretch;height:32px;width:130px;border-radius:var(--radius-sm) var(--radius-sm) 0 0;flex-shrink:0;position:relative;overflow:hidden;cursor:pointer;-webkit-user-select:none;user-select:none;box-sizing:border-box;background:var(--color-surface-default)}.ds-nav-tab:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-nav-tab:hover:after{background:var(--overlay-hovered)}.ds-nav-tab:active:after{background:var(--overlay-pressed)}.ds-nav-tab:focus{outline:none}.ds-nav-tab:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-nav-tab__content{display:flex;flex:1 0 0;align-items:center;gap:var(--spacing-xs);padding-left:var(--spacing-sm);min-width:0}.ds-nav-tab__label{flex:1 0 0;font-family:var(--ref-typescale-label-small-font);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typescale-label-small-weight-prominent);line-height:var(--ref-typescale-label-small-line-height);letter-spacing:var(--ref-typescale-label-small-tracking);color:var(--color-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.ds-nav-tab__close{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;padding:0;margin:0;border:none;background:transparent;cursor:pointer;border-radius:var(--radius-sm);color:var(--color-icon-subtle);position:relative;z-index:1}.ds-nav-tab__close:hover{background:var(--overlay-hovered)}.ds-nav-tab__close:active{background:var(--overlay-pressed)}.ds-nav-tab__close:focus{outline:none}.ds-nav-tab__close:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-nav-tab--more{width:26px}.ds-nav-tab.is-active{background:var(--color-surface-brand-bold)}.ds-nav-tab.is-active .ds-nav-tab__label{color:var(--color-text-on-brand)}.ds-nav-tab.is-active .ds-nav-tab__close{color:var(--color-icon-on-brand)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: NavTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-nav-tab', standalone: true, imports: [CommonModule], host: { style: 'display: contents' }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ds-nav-tab\"\n  [class.is-active]=\"active\"\n  [class.ds-nav-tab--more]=\"more\"\n  role=\"button\"\n  tabindex=\"0\"\n  [attr.aria-pressed]=\"more ? null : active\"\n  [attr.aria-label]=\"more ? 'More tabs' : label + (active ? ' tab \u2014 active' : ' tab')\"\n  (click)=\"onTabClick()\"\n  (keydown.enter)=\"onTabClick()\"\n  (keydown.space)=\"$event.preventDefault(); onTabClick()\"\n>\n  <div class=\"ds-nav-tab__content\">\n    @if (more) {\n      <span class=\"ds-nav-tab__label\">...</span>\n    } @else {\n      <span class=\"ds-nav-tab__label\">{{ label }}</span>\n      <button\n        class=\"ds-nav-tab__close\"\n        type=\"button\"\n        [attr.aria-label]=\"'Close ' + label + ' tab'\"\n        (click)=\"onCloseClick($event)\"\n      >\n        <span class=\"ds-icon ds-icon--xs\" aria-hidden=\"true\">close_small</span>\n      </button>\n    }\n  </div>\n</div>\n", styles: [".ds-nav-tab{display:flex;align-items:stretch;height:32px;width:130px;border-radius:var(--radius-sm) var(--radius-sm) 0 0;flex-shrink:0;position:relative;overflow:hidden;cursor:pointer;-webkit-user-select:none;user-select:none;box-sizing:border-box;background:var(--color-surface-default)}.ds-nav-tab:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-nav-tab:hover:after{background:var(--overlay-hovered)}.ds-nav-tab:active:after{background:var(--overlay-pressed)}.ds-nav-tab:focus{outline:none}.ds-nav-tab:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-nav-tab__content{display:flex;flex:1 0 0;align-items:center;gap:var(--spacing-xs);padding-left:var(--spacing-sm);min-width:0}.ds-nav-tab__label{flex:1 0 0;font-family:var(--ref-typescale-label-small-font);font-size:var(--ref-typescale-label-small-size);font-weight:var(--ref-typescale-label-small-weight-prominent);line-height:var(--ref-typescale-label-small-line-height);letter-spacing:var(--ref-typescale-label-small-tracking);color:var(--color-text-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}.ds-nav-tab__close{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0;padding:0;margin:0;border:none;background:transparent;cursor:pointer;border-radius:var(--radius-sm);color:var(--color-icon-subtle);position:relative;z-index:1}.ds-nav-tab__close:hover{background:var(--overlay-hovered)}.ds-nav-tab__close:active{background:var(--overlay-pressed)}.ds-nav-tab__close:focus{outline:none}.ds-nav-tab__close:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-nav-tab--more{width:26px}.ds-nav-tab.is-active{background:var(--color-surface-brand-bold)}.ds-nav-tab.is-active .ds-nav-tab__label{color:var(--color-text-on-brand)}.ds-nav-tab.is-active .ds-nav-tab__close{color:var(--color-icon-on-brand)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], active: [{
                type: Input
            }], more: [{
                type: Input
            }], tabClick: [{
                type: Output
            }], tabClose: [{
                type: Output
            }] } });

/**
 * ds-paginator
 *
 * Based on Angular Material mat-paginator.
 * Import MatPaginatorModule in your Angular module.
 *
 * @example
 * <ds-paginator
 *   [total]="243"
 *   [pageSize]="10"
 *   [pageIndex]="0"
 *   (pageChange)="onPageChange($event)"
 * />
 */
class DsPaginatorComponent {
    total = 0;
    pageSize = 10;
    pageIndex = 0;
    pageSizeOptions = [10, 25, 50, 100];
    showFirstLastButtons = true;
    pageChange = new EventEmitter();
    onPage(event) {
        this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize, length: event.length });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsPaginatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsPaginatorComponent, isStandalone: true, selector: "ds-paginator", inputs: { total: "total", pageSize: "pageSize", pageIndex: "pageIndex", pageSizeOptions: "pageSizeOptions", showFirstLastButtons: "showFirstLastButtons" }, outputs: { pageChange: "pageChange" }, ngImport: i0, template: "<mat-paginator\n  class=\"ds-paginator\"\n  [length]=\"total\"\n  [pageSize]=\"pageSize\"\n  [pageIndex]=\"pageIndex\"\n  [pageSizeOptions]=\"pageSizeOptions\"\n  [showFirstLastButtons]=\"showFirstLastButtons\"\n  (page)=\"onPage($event)\"\n></mat-paginator>\n", styles: [".ds-paginator{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-xl);padding:var(--spacing-sm) var(--spacing-lg);background:var(--color-surface-page);border-top:1px solid var(--color-border-subtle);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);color:var(--color-text-secondary);flex-wrap:wrap}.ds-paginator__page-size{display:flex;align-items:center;gap:var(--spacing-sm)}.ds-paginator__label{white-space:nowrap;color:var(--color-text-secondary);font-size:var(--ref-typescale-label-small-size)}.ds-paginator__select{appearance:none;border:1px solid var(--color-border-input);border-radius:var(--radius-sm);background:var(--color-surface-input);color:var(--color-text-primary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);padding:3px var(--spacing-lg) 3px var(--spacing-sm);cursor:pointer;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%2373737F'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 6px center;min-width:64px}.ds-paginator__select:focus{outline:none}.ds-paginator__select:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-paginator__select:hover{border-color:var(--color-border-input-hover)}.ds-paginator__range-label{white-space:nowrap;color:var(--color-text-secondary);font-size:var(--ref-typescale-label-small-size);min-width:80px;text-align:center}.ds-paginator__nav{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-paginator__btn{appearance:none;border:none;background:transparent;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-default);border-radius:var(--radius-sm);transition:background .12s,color .12s}.ds-paginator__btn:focus{outline:none}.ds-paginator__btn:hover:not(:disabled){background:var(--overlay-hovered)}.ds-paginator__btn:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-paginator__btn:active:not(:disabled){background:var(--overlay-pressed)}.ds-paginator__btn:disabled{color:var(--color-icon-disabled);cursor:not-allowed}.mat-mdc-paginator{--mat-paginator-container-background-color: var(--color-surface-page);--mat-paginator-container-text-color: var(--color-text-secondary);--mat-paginator-enabled-icon-color: var(--color-icon-default);--mat-paginator-disabled-icon-color: var(--color-icon-disabled);--mat-paginator-select-trigger-text-size: var(--ref-typescale-label-small-size);border-top:1px solid var(--color-border-subtle)}.mat-mdc-paginator .mat-mdc-paginator-container{justify-content:flex-end;gap:var(--spacing-xl);padding:var(--spacing-sm) var(--spacing-lg);min-height:unset;flex-wrap:wrap;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size)}.mat-mdc-paginator .mat-mdc-paginator-page-size{align-items:center;margin:0}.mat-mdc-paginator .mat-mdc-paginator-page-size-label{margin:0 var(--spacing-sm) 0 0;color:var(--color-text-secondary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);white-space:nowrap}.mat-mdc-paginator .mat-mdc-paginator-range-actions{gap:0}.mat-mdc-paginator .mat-mdc-paginator-range-label{margin:0 var(--spacing-xl);color:var(--color-text-secondary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);min-width:80px;text-align:center}.mat-mdc-paginator .mat-mdc-paginator-navigation-first,.mat-mdc-paginator .mat-mdc-paginator-navigation-previous,.mat-mdc-paginator .mat-mdc-paginator-navigation-next,.mat-mdc-paginator .mat-mdc-paginator-navigation-last{--mdc-icon-button-state-layer-size: 32px;--mat-icon-button-hover-state-layer-opacity: 0;--mat-icon-button-focus-state-layer-opacity: 0;--mat-icon-button-pressed-state-layer-opacity: 0;width:32px;height:32px;padding:0;border-radius:var(--radius-sm)}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:focus,.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:focus,.mat-mdc-paginator .mat-mdc-paginator-navigation-next:focus,.mat-mdc-paginator .mat-mdc-paginator-navigation-last:focus{outline:none}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:hover:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:hover:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-next:hover:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-last:hover:not([disabled]){background:var(--overlay-hovered)}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:focus-visible,.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:focus-visible,.mat-mdc-paginator .mat-mdc-paginator-navigation-next:focus-visible,.mat-mdc-paginator .mat-mdc-paginator-navigation-last:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:active:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:active:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-next:active:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-last:active:not([disabled]){background:var(--overlay-pressed)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select{width:auto;margin:0}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-form-field-subscript-wrapper,.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mdc-line-ripple{display:none}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-text-field-wrapper{padding:0;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-text-field-wrapper:hover{border-color:var(--color-border-input-hover)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-form-field-flex{height:unset;align-items:center;padding:0 var(--spacing-sm)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-form-field-infix{padding:3px 0;min-height:unset;width:48px}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-select-trigger{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);color:var(--color-text-primary)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-select-arrow{color:var(--color-icon-subtle)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-text-field-wrapper:focus-within:not([data-mouse-focus]){box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}\n"], dependencies: [{ kind: "ngmodule", type: MatPaginatorModule }, { kind: "component", type: i1$5.MatPaginator, selector: "mat-paginator", inputs: ["color", "pageIndex", "length", "pageSize", "pageSizeOptions", "hidePageSize", "showFirstLastButtons", "selectConfig", "disabled"], outputs: ["page"], exportAs: ["matPaginator"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsPaginatorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-paginator', standalone: true, imports: [MatPaginatorModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-paginator\n  class=\"ds-paginator\"\n  [length]=\"total\"\n  [pageSize]=\"pageSize\"\n  [pageIndex]=\"pageIndex\"\n  [pageSizeOptions]=\"pageSizeOptions\"\n  [showFirstLastButtons]=\"showFirstLastButtons\"\n  (page)=\"onPage($event)\"\n></mat-paginator>\n", styles: [".ds-paginator{display:flex;align-items:center;justify-content:flex-end;gap:var(--spacing-xl);padding:var(--spacing-sm) var(--spacing-lg);background:var(--color-surface-page);border-top:1px solid var(--color-border-subtle);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);color:var(--color-text-secondary);flex-wrap:wrap}.ds-paginator__page-size{display:flex;align-items:center;gap:var(--spacing-sm)}.ds-paginator__label{white-space:nowrap;color:var(--color-text-secondary);font-size:var(--ref-typescale-label-small-size)}.ds-paginator__select{appearance:none;border:1px solid var(--color-border-input);border-radius:var(--radius-sm);background:var(--color-surface-input);color:var(--color-text-primary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);padding:3px var(--spacing-lg) 3px var(--spacing-sm);cursor:pointer;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='%2373737F'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\");background-repeat:no-repeat;background-position:right 6px center;min-width:64px}.ds-paginator__select:focus{outline:none}.ds-paginator__select:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-paginator__select:hover{border-color:var(--color-border-input-hover)}.ds-paginator__range-label{white-space:nowrap;color:var(--color-text-secondary);font-size:var(--ref-typescale-label-small-size);min-width:80px;text-align:center}.ds-paginator__nav{display:flex;align-items:center;gap:var(--spacing-xs)}.ds-paginator__btn{appearance:none;border:none;background:transparent;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-default);border-radius:var(--radius-sm);transition:background .12s,color .12s}.ds-paginator__btn:focus{outline:none}.ds-paginator__btn:hover:not(:disabled){background:var(--overlay-hovered)}.ds-paginator__btn:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-paginator__btn:active:not(:disabled){background:var(--overlay-pressed)}.ds-paginator__btn:disabled{color:var(--color-icon-disabled);cursor:not-allowed}.mat-mdc-paginator{--mat-paginator-container-background-color: var(--color-surface-page);--mat-paginator-container-text-color: var(--color-text-secondary);--mat-paginator-enabled-icon-color: var(--color-icon-default);--mat-paginator-disabled-icon-color: var(--color-icon-disabled);--mat-paginator-select-trigger-text-size: var(--ref-typescale-label-small-size);border-top:1px solid var(--color-border-subtle)}.mat-mdc-paginator .mat-mdc-paginator-container{justify-content:flex-end;gap:var(--spacing-xl);padding:var(--spacing-sm) var(--spacing-lg);min-height:unset;flex-wrap:wrap;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size)}.mat-mdc-paginator .mat-mdc-paginator-page-size{align-items:center;margin:0}.mat-mdc-paginator .mat-mdc-paginator-page-size-label{margin:0 var(--spacing-sm) 0 0;color:var(--color-text-secondary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);white-space:nowrap}.mat-mdc-paginator .mat-mdc-paginator-range-actions{gap:0}.mat-mdc-paginator .mat-mdc-paginator-range-label{margin:0 var(--spacing-xl);color:var(--color-text-secondary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);min-width:80px;text-align:center}.mat-mdc-paginator .mat-mdc-paginator-navigation-first,.mat-mdc-paginator .mat-mdc-paginator-navigation-previous,.mat-mdc-paginator .mat-mdc-paginator-navigation-next,.mat-mdc-paginator .mat-mdc-paginator-navigation-last{--mdc-icon-button-state-layer-size: 32px;--mat-icon-button-hover-state-layer-opacity: 0;--mat-icon-button-focus-state-layer-opacity: 0;--mat-icon-button-pressed-state-layer-opacity: 0;width:32px;height:32px;padding:0;border-radius:var(--radius-sm)}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:focus,.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:focus,.mat-mdc-paginator .mat-mdc-paginator-navigation-next:focus,.mat-mdc-paginator .mat-mdc-paginator-navigation-last:focus{outline:none}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:hover:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:hover:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-next:hover:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-last:hover:not([disabled]){background:var(--overlay-hovered)}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:focus-visible,.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:focus-visible,.mat-mdc-paginator .mat-mdc-paginator-navigation-next:focus-visible,.mat-mdc-paginator .mat-mdc-paginator-navigation-last:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.mat-mdc-paginator .mat-mdc-paginator-navigation-first:active:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-previous:active:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-next:active:not([disabled]),.mat-mdc-paginator .mat-mdc-paginator-navigation-last:active:not([disabled]){background:var(--overlay-pressed)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select{width:auto;margin:0}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-form-field-subscript-wrapper,.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mdc-line-ripple{display:none}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-text-field-wrapper{padding:0;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-text-field-wrapper:hover{border-color:var(--color-border-input-hover)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-form-field-flex{height:unset;align-items:center;padding:0 var(--spacing-sm)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-form-field-infix{padding:3px 0;min-height:unset;width:48px}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-select-trigger{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);color:var(--color-text-primary)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-select-arrow{color:var(--color-icon-subtle)}.mat-mdc-paginator .mat-mdc-paginator-page-size-select .mat-mdc-text-field-wrapper:focus-within:not([data-mouse-focus]){box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}\n"] }]
        }], propDecorators: { total: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], pageIndex: [{
                type: Input
            }], pageSizeOptions: [{
                type: Input
            }], showFirstLastButtons: [{
                type: Input
            }], pageChange: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Progress / Loader
 *
 * A standalone Angular component wrapping the ds-progress CSS class API.
 * For direct class usage without Angular:
 *   <!-- Determinate -->
 *   <div class="ds-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
 *     <div class="ds-progress__track"><div class="ds-progress__fill" style="width:60%"></div></div>
 *   </div>
 *   <!-- Indeterminate -->
 *   <div class="ds-progress ds-progress--indeterminate" role="progressbar">
 *     <div class="ds-progress__track"><div class="ds-progress__fill"></div></div>
 *   </div>
 *
 * @example
 *   <ds-progress [value]="uploadProgress" label="Uploading file..." />
 *   <ds-progress label="Processing..." />   ← indeterminate (no value)
 */
class DsProgressComponent {
    /**
     * Progress value from 0–100. Null or undefined = indeterminate (animated).
     */
    value = null;
    /** Accessible label for the progress bar. */
    label = '';
    get isIndeterminate() {
        return this.value === null || this.value === undefined;
    }
    get clampedValue() {
        if (this.isIndeterminate)
            return 0;
        return Math.min(100, Math.max(0, this.value));
    }
    get mode() {
        return this.isIndeterminate ? 'indeterminate' : 'determinate';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsProgressComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsProgressComponent, isStandalone: true, selector: "ds-progress", inputs: { value: "value", label: "label" }, ngImport: i0, template: "<div class=\"ds-progress\">\n  <span *ngIf=\"label\" class=\"ds-progress__label\">{{ label }}</span>\n  <mat-progress-bar\n    [mode]=\"mode\"\n    [value]=\"clampedValue\"\n    [attr.aria-label]=\"label || 'Loading'\"\n  ></mat-progress-bar>\n</div>\n", styles: ["@keyframes ds-progress-indeterminate{0%{left:-35%;right:100%}40%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes ds-progress-indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}.ds-progress{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-progress__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary)}.ds-progress__track{width:100%;height:6px;background:var(--color-surface-default);border-radius:var(--radius-full);overflow:hidden;position:relative}.ds-progress__fill{height:100%;background:var(--color-surface-brand-bold);border-radius:var(--radius-full);transition:width .3s ease;max-width:100%}.ds-progress--indeterminate .ds-progress__fill{width:35%;position:absolute;top:0;bottom:0;left:-35%;animation:ds-progress-indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.ds-progress--indeterminate .ds-progress__track:after{content:\"\";position:absolute;inset:0 100% 0 -200%;background:var(--color-surface-brand-bold);border-radius:var(--radius-full);animation:ds-progress-indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) 1.15s infinite}.mat-mdc-progress-bar{--mdc-linear-progress-active-indicator-color: var(--color-surface-brand-bold);--mdc-linear-progress-track-color: var(--color-surface-default);--mdc-linear-progress-active-indicator-height: 6px;--mdc-linear-progress-track-height: 6px;border-radius:var(--radius-full);overflow:hidden}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatProgressBarModule }, { kind: "component", type: i2$5.MatProgressBar, selector: "mat-progress-bar", inputs: ["color", "value", "bufferValue", "mode"], outputs: ["animationEnd"], exportAs: ["matProgressBar"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsProgressComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-progress', standalone: true, imports: [CommonModule, MatProgressBarModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ds-progress\">\n  <span *ngIf=\"label\" class=\"ds-progress__label\">{{ label }}</span>\n  <mat-progress-bar\n    [mode]=\"mode\"\n    [value]=\"clampedValue\"\n    [attr.aria-label]=\"label || 'Loading'\"\n  ></mat-progress-bar>\n</div>\n", styles: ["@keyframes ds-progress-indeterminate{0%{left:-35%;right:100%}40%{left:100%;right:-90%}to{left:100%;right:-90%}}@keyframes ds-progress-indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}to{left:107%;right:-8%}}.ds-progress{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-progress__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-small-size);line-height:var(--ref-typescale-label-small-line-height);color:var(--color-text-secondary)}.ds-progress__track{width:100%;height:6px;background:var(--color-surface-default);border-radius:var(--radius-full);overflow:hidden;position:relative}.ds-progress__fill{height:100%;background:var(--color-surface-brand-bold);border-radius:var(--radius-full);transition:width .3s ease;max-width:100%}.ds-progress--indeterminate .ds-progress__fill{width:35%;position:absolute;top:0;bottom:0;left:-35%;animation:ds-progress-indeterminate 2.1s cubic-bezier(.65,.815,.735,.395) infinite}.ds-progress--indeterminate .ds-progress__track:after{content:\"\";position:absolute;inset:0 100% 0 -200%;background:var(--color-surface-brand-bold);border-radius:var(--radius-full);animation:ds-progress-indeterminate-short 2.1s cubic-bezier(.165,.84,.44,1) 1.15s infinite}.mat-mdc-progress-bar{--mdc-linear-progress-active-indicator-color: var(--color-surface-brand-bold);--mdc-linear-progress-track-color: var(--color-surface-default);--mdc-linear-progress-active-indicator-height: 6px;--mdc-linear-progress-track-height: 6px;border-radius:var(--radius-full);overflow:hidden}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], label: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Radio Button
 *
 * Use inside <ds-radio-group> which owns value management via mat-radio-group.
 * For direct class usage without Angular:
 *   <label class="ds-radio">
 *     <input type="radio" class="ds-radio__control" name="group" />
 *     <span class="ds-radio__dot"></span>
 *     <span class="ds-radio__label">Option</span>
 *   </label>
 *
 * @example
 *   <ds-radio-group [(value)]="selected" name="plan">
 *     <ds-radio label="Option A" value="a" />
 *     <ds-radio label="Option B" value="b" />
 *   </ds-radio-group>
 */
class DsRadioComponent {
    /** Label text displayed next to the radio button. */
    label = '';
    /** The value this radio represents. */
    value = '';
    /** Applies error styling. */
    isError = false;
    /** Disables the radio button. */
    disabled = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsRadioComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsRadioComponent, isStandalone: true, selector: "ds-radio", inputs: { label: "label", value: "value", isError: "isError", disabled: "disabled" }, ngImport: i0, template: "<mat-radio-button\n  class=\"ds-radio\"\n  [class.is-error]=\"isError\"\n  [value]=\"value\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"true\"\n>\n  <span *ngIf=\"label\" class=\"ds-radio__label\">{{ label }}</span>\n  <ng-content></ng-content>\n</mat-radio-button>\n", styles: [".ds-radio{display:inline-flex;align-items:center;gap:var(--spacing-xs);cursor:pointer;-webkit-user-select:none;user-select:none;position:relative}.ds-radio__control{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.ds-radio__touch{flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;transition:background .15s ease,box-shadow .15s ease;position:relative}.ds-radio:hover:not(.is-disabled) .ds-radio__touch{background:var(--overlay-hovered)}.ds-radio:active:not(.is-disabled) .ds-radio__touch{background:var(--overlay-pressed)}.ds-radio__control:focus{outline:none}.ds-radio__control:focus-visible~.ds-radio__touch{background:var(--overlay-pressed);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-radio__dot{flex-shrink:0;width:20px;height:20px;border-radius:var(--radius-full);border:2px solid var(--color-border-input);background:var(--color-surface-input);display:flex;align-items:center;justify-content:center;transition:background-color .15s ease,border-color .15s ease;pointer-events:none}.ds-radio__dot:after{content:\"\";display:block;width:10px;height:10px;border-radius:var(--radius-full);background:var(--color-surface-brand-bold);opacity:0;transform:scale(.4);transition:opacity .15s ease,transform .15s ease}.ds-radio__control:checked~.ds-radio__touch .ds-radio__dot{border-color:var(--color-surface-brand-bold)}.ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after{opacity:1;transform:scale(1)}.ds-radio__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary)}.ds-radio.is-error .ds-radio__dot{border-color:var(--color-border-input-error)}.ds-radio.is-error .ds-radio__label{color:var(--color-text-error)}.ds-radio.is-error .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot{border-color:var(--color-surface-accent-red-bold)}.ds-radio.is-error .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after{background:var(--color-surface-accent-red-bold)}.ds-radio.is-disabled,.ds-radio:has(.ds-radio__control:disabled){cursor:not-allowed;pointer-events:none}.ds-radio.is-disabled .ds-radio__touch,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__touch{background:none}.ds-radio.is-disabled .ds-radio__dot,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__dot{background:var(--color-surface-disabled);border-color:var(--color-border-subtle)}.ds-radio.is-disabled .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot{border-color:var(--color-border-subtle)}.ds-radio.is-disabled .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after{background:var(--color-icon-disabled)}.ds-radio.is-disabled .ds-radio__label,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__label{color:var(--color-text-disabled)}.ds-radio-group{display:flex;flex-direction:column;gap:0}.mat-mdc-radio-button.ds-radio{--mdc-radio-selected-icon-color: var(--color-surface-brand-bold);--mdc-radio-unselected-icon-color: var(--color-border-input);--mdc-radio-selected-focus-icon-color: var(--color-surface-brand-bold);--mdc-radio-selected-hover-icon-color: var(--color-surface-brand-bold);--mdc-radio-selected-pressed-icon-color: var(--color-surface-brand-bold);--mdc-radio-unselected-focus-icon-color: var(--color-border-input);--mdc-radio-unselected-hover-icon-color: var(--color-border-input);--mdc-radio-unselected-pressed-icon-color: var(--color-border-input);--mdc-radio-disabled-selected-icon-color: var(--color-icon-disabled);--mdc-radio-disabled-unselected-icon-color: var(--color-icon-disabled);--mdc-radio-state-layer-size: 42px;--mat-radio-checked-hover-state-layer-opacity: 0;--mat-radio-checked-focus-state-layer-opacity: 0;--mat-radio-checked-pressed-state-layer-opacity: 0;--mat-radio-unchecked-hover-state-layer-opacity: 0;--mat-radio-unchecked-focus-state-layer-opacity: 0;--mat-radio-unchecked-pressed-state-layer-opacity: 0;--mat-radio-label-text-font: var(--ref-typeface-brand);--mat-radio-label-text-size: var(--ref-typescale-label-medium-size);--mat-radio-label-text-weight: var(--ref-typeface-weight-regular);--mat-radio-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-radio-label-text-color: var(--color-text-primary);--mat-radio-disabled-label-color: var(--color-text-disabled)}.mat-mdc-radio-button.ds-radio .mat-mdc-focus-indicator{display:none}.mat-mdc-radio-button.ds-radio:not(.mat-mdc-radio-disabled):hover .mdc-radio{background:var(--overlay-hovered);border-radius:var(--radius-full)}.mat-mdc-radio-button.ds-radio:not(.mat-mdc-radio-disabled):active .mdc-radio{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-radio-button.ds-radio:has(.mdc-radio__native-control:focus-visible) .mdc-radio{background:var(--overlay-pressed);border-radius:var(--radius-full);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-radio-button.ds-radio.is-error{--mdc-radio-unselected-icon-color: var(--color-border-input-error);--mdc-radio-unselected-focus-icon-color: var(--color-border-input-error);--mdc-radio-unselected-hover-icon-color: var(--color-border-input-error);--mdc-radio-unselected-pressed-icon-color: var(--color-border-input-error);--mdc-radio-selected-icon-color: var(--color-surface-accent-red-bold);--mdc-radio-selected-focus-icon-color: var(--color-surface-accent-red-bold);--mdc-radio-selected-hover-icon-color: var(--color-surface-accent-red-bold);--mdc-radio-selected-pressed-icon-color: var(--color-surface-accent-red-bold)}.mat-mdc-radio-button.ds-radio.is-error:not(.mat-mdc-radio-disabled):hover .mdc-radio{background:var(--overlay-accent-red-hovered)}.mat-mdc-radio-button.ds-radio.is-error:not(.mat-mdc-radio-disabled):active .mdc-radio{background:var(--overlay-accent-red-pressed)}.mat-mdc-radio-button.ds-radio.is-error:has(.mdc-radio__native-control:focus-visible) .mdc-radio{background:var(--overlay-accent-red-pressed);box-shadow:0 0 0 2px var(--color-border-input-error)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatRadioModule }, { kind: "component", type: i2$6.MatRadioButton, selector: "mat-radio-button", inputs: ["id", "name", "aria-label", "aria-labelledby", "aria-describedby", "disableRipple", "tabIndex", "checked", "value", "labelPosition", "disabled", "required", "color", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioButton"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsRadioComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-radio', standalone: true, imports: [CommonModule, MatRadioModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-radio-button\n  class=\"ds-radio\"\n  [class.is-error]=\"isError\"\n  [value]=\"value\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"true\"\n>\n  <span *ngIf=\"label\" class=\"ds-radio__label\">{{ label }}</span>\n  <ng-content></ng-content>\n</mat-radio-button>\n", styles: [".ds-radio{display:inline-flex;align-items:center;gap:var(--spacing-xs);cursor:pointer;-webkit-user-select:none;user-select:none;position:relative}.ds-radio__control{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.ds-radio__touch{flex-shrink:0;width:42px;height:42px;border-radius:var(--radius-full);display:flex;align-items:center;justify-content:center;transition:background .15s ease,box-shadow .15s ease;position:relative}.ds-radio:hover:not(.is-disabled) .ds-radio__touch{background:var(--overlay-hovered)}.ds-radio:active:not(.is-disabled) .ds-radio__touch{background:var(--overlay-pressed)}.ds-radio__control:focus{outline:none}.ds-radio__control:focus-visible~.ds-radio__touch{background:var(--overlay-pressed);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-radio__dot{flex-shrink:0;width:20px;height:20px;border-radius:var(--radius-full);border:2px solid var(--color-border-input);background:var(--color-surface-input);display:flex;align-items:center;justify-content:center;transition:background-color .15s ease,border-color .15s ease;pointer-events:none}.ds-radio__dot:after{content:\"\";display:block;width:10px;height:10px;border-radius:var(--radius-full);background:var(--color-surface-brand-bold);opacity:0;transform:scale(.4);transition:opacity .15s ease,transform .15s ease}.ds-radio__control:checked~.ds-radio__touch .ds-radio__dot{border-color:var(--color-surface-brand-bold)}.ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after{opacity:1;transform:scale(1)}.ds-radio__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary)}.ds-radio.is-error .ds-radio__dot{border-color:var(--color-border-input-error)}.ds-radio.is-error .ds-radio__label{color:var(--color-text-error)}.ds-radio.is-error .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot{border-color:var(--color-surface-accent-red-bold)}.ds-radio.is-error .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after{background:var(--color-surface-accent-red-bold)}.ds-radio.is-disabled,.ds-radio:has(.ds-radio__control:disabled){cursor:not-allowed;pointer-events:none}.ds-radio.is-disabled .ds-radio__touch,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__touch{background:none}.ds-radio.is-disabled .ds-radio__dot,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__dot{background:var(--color-surface-disabled);border-color:var(--color-border-subtle)}.ds-radio.is-disabled .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot{border-color:var(--color-border-subtle)}.ds-radio.is-disabled .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__control:checked~.ds-radio__touch .ds-radio__dot:after{background:var(--color-icon-disabled)}.ds-radio.is-disabled .ds-radio__label,.ds-radio:has(.ds-radio__control:disabled) .ds-radio__label{color:var(--color-text-disabled)}.ds-radio-group{display:flex;flex-direction:column;gap:0}.mat-mdc-radio-button.ds-radio{--mdc-radio-selected-icon-color: var(--color-surface-brand-bold);--mdc-radio-unselected-icon-color: var(--color-border-input);--mdc-radio-selected-focus-icon-color: var(--color-surface-brand-bold);--mdc-radio-selected-hover-icon-color: var(--color-surface-brand-bold);--mdc-radio-selected-pressed-icon-color: var(--color-surface-brand-bold);--mdc-radio-unselected-focus-icon-color: var(--color-border-input);--mdc-radio-unselected-hover-icon-color: var(--color-border-input);--mdc-radio-unselected-pressed-icon-color: var(--color-border-input);--mdc-radio-disabled-selected-icon-color: var(--color-icon-disabled);--mdc-radio-disabled-unselected-icon-color: var(--color-icon-disabled);--mdc-radio-state-layer-size: 42px;--mat-radio-checked-hover-state-layer-opacity: 0;--mat-radio-checked-focus-state-layer-opacity: 0;--mat-radio-checked-pressed-state-layer-opacity: 0;--mat-radio-unchecked-hover-state-layer-opacity: 0;--mat-radio-unchecked-focus-state-layer-opacity: 0;--mat-radio-unchecked-pressed-state-layer-opacity: 0;--mat-radio-label-text-font: var(--ref-typeface-brand);--mat-radio-label-text-size: var(--ref-typescale-label-medium-size);--mat-radio-label-text-weight: var(--ref-typeface-weight-regular);--mat-radio-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-radio-label-text-color: var(--color-text-primary);--mat-radio-disabled-label-color: var(--color-text-disabled)}.mat-mdc-radio-button.ds-radio .mat-mdc-focus-indicator{display:none}.mat-mdc-radio-button.ds-radio:not(.mat-mdc-radio-disabled):hover .mdc-radio{background:var(--overlay-hovered);border-radius:var(--radius-full)}.mat-mdc-radio-button.ds-radio:not(.mat-mdc-radio-disabled):active .mdc-radio{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-radio-button.ds-radio:has(.mdc-radio__native-control:focus-visible) .mdc-radio{background:var(--overlay-pressed);border-radius:var(--radius-full);box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.mat-mdc-radio-button.ds-radio.is-error{--mdc-radio-unselected-icon-color: var(--color-border-input-error);--mdc-radio-unselected-focus-icon-color: var(--color-border-input-error);--mdc-radio-unselected-hover-icon-color: var(--color-border-input-error);--mdc-radio-unselected-pressed-icon-color: var(--color-border-input-error);--mdc-radio-selected-icon-color: var(--color-surface-accent-red-bold);--mdc-radio-selected-focus-icon-color: var(--color-surface-accent-red-bold);--mdc-radio-selected-hover-icon-color: var(--color-surface-accent-red-bold);--mdc-radio-selected-pressed-icon-color: var(--color-surface-accent-red-bold)}.mat-mdc-radio-button.ds-radio.is-error:not(.mat-mdc-radio-disabled):hover .mdc-radio{background:var(--overlay-accent-red-hovered)}.mat-mdc-radio-button.ds-radio.is-error:not(.mat-mdc-radio-disabled):active .mdc-radio{background:var(--overlay-accent-red-pressed)}.mat-mdc-radio-button.ds-radio.is-error:has(.mdc-radio__native-control:focus-visible) .mdc-radio{background:var(--overlay-accent-red-pressed);box-shadow:0 0 0 2px var(--color-border-input-error)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], value: [{
                type: Input
            }], isError: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });
/**
 * Onflo Design System — Radio Group
 *
 * Wraps mat-radio-group to manage selection state across child ds-radio buttons.
 *
 * @example
 *   <ds-radio-group [(value)]="selected" name="plan">
 *     <ds-radio label="Option A" value="a" />
 *     <ds-radio label="Option B" value="b" />
 *   </ds-radio-group>
 */
class DsRadioGroupComponent {
    /** Currently selected value. Use [(value)] for two-way binding. */
    value = '';
    /** Optional group name — shared across all child radios. */
    name = '';
    /** Emits the newly selected value. */
    valueChange = new EventEmitter();
    onChange(event) {
        this.valueChange.emit(event.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsRadioGroupComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsRadioGroupComponent, isStandalone: true, selector: "ds-radio-group", inputs: { value: "value", name: "name" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: `
    <mat-radio-group
      class="ds-radio-group"
      [value]="value"
      [name]="name"
      (change)="onChange($event)"
    >
      <ng-content />
    </mat-radio-group>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: MatRadioModule }, { kind: "directive", type: i2$6.MatRadioGroup, selector: "mat-radio-group", inputs: ["color", "name", "labelPosition", "value", "selected", "disabled", "required", "disabledInteractive"], outputs: ["change"], exportAs: ["matRadioGroup"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsRadioGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ds-radio-group',
                    standalone: true,
                    imports: [MatRadioModule],
                    template: `
    <mat-radio-group
      class="ds-radio-group"
      [value]="value"
      [name]="name"
      (change)="onChange($event)"
    >
      <ng-content />
    </mat-radio-group>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], propDecorators: { value: [{
                type: Input
            }], name: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

/**
 * ds-skeleton
 *
 * Custom Onflo component — placeholder loading state that mimics content shapes.
 *
 * @example
 * <!-- Text line skeletons -->
 * <ds-skeleton>
 *   <div class="ds-skeleton__line"></div>
 *   <div class="ds-skeleton__line ds-skeleton__line--sm"></div>
 * </ds-skeleton>
 *
 * <!-- Card skeleton -->
 * <div class="ds-skeleton ds-skeleton--card">
 *   <div class="ds-skeleton__rect ds-skeleton__rect--sm"></div>
 *   <div class="ds-skeleton__line ds-skeleton__line--lg"></div>
 *   <div class="ds-skeleton__line ds-skeleton__line--md"></div>
 * </div>
 */
class DsSkeletonComponent {
    ariaLabel = 'Loading content';
    card = false;
    row = false;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSkeletonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsSkeletonComponent, isStandalone: true, selector: "ds-skeleton", inputs: { ariaLabel: "ariaLabel", card: "card", row: "row" }, ngImport: i0, template: "<div\n  class=\"ds-skeleton\"\n  [class.ds-skeleton--card]=\"card\"\n  [class.ds-skeleton--row]=\"row\"\n  aria-busy=\"true\"\n  [attr.aria-label]=\"ariaLabel\"\n>\n  <ng-content />\n</div>\n", styles: ["@keyframes ds-shimmer{0%{background-position:-400px 0}to{background-position:400px 0}}.ds-skeleton__rect,.ds-skeleton__circle,.ds-skeleton__line{background:linear-gradient(90deg,var(--color-surface-default) 25%,var(--color-border-subtle) 50%,var(--color-surface-default) 75%);background-size:800px 100%;animation:ds-shimmer 1.6s ease-in-out infinite;border-radius:var(--radius-sm)}.ds-skeleton{display:flex;flex-direction:column;gap:var(--spacing-sm)}.ds-skeleton__line{height:14px;width:100%}.ds-skeleton__line--xs{width:30%}.ds-skeleton__line--sm{width:50%}.ds-skeleton__line--md{width:70%}.ds-skeleton__line--lg{width:90%}.ds-skeleton__line--xl{width:100%}.ds-skeleton__line--tall{height:20px}.ds-skeleton__line--h1{height:28px}.ds-skeleton__circle{border-radius:var(--radius-full);width:40px;height:40px;flex-shrink:0}.ds-skeleton__circle--sm{width:28px;height:28px}.ds-skeleton__circle--lg{width:56px;height:56px}.ds-skeleton__rect{border-radius:var(--radius-md);width:100%;height:120px}.ds-skeleton__rect--sm{height:64px}.ds-skeleton__rect--lg{height:200px}.ds-skeleton__rect--full{height:320px}.ds-skeleton--row{flex-direction:row;align-items:center}.ds-skeleton--card{border:1px solid var(--color-border-subtle);border-radius:var(--radius-md);padding:var(--spacing-lg);gap:var(--spacing-md)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSkeletonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-skeleton', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ds-skeleton\"\n  [class.ds-skeleton--card]=\"card\"\n  [class.ds-skeleton--row]=\"row\"\n  aria-busy=\"true\"\n  [attr.aria-label]=\"ariaLabel\"\n>\n  <ng-content />\n</div>\n", styles: ["@keyframes ds-shimmer{0%{background-position:-400px 0}to{background-position:400px 0}}.ds-skeleton__rect,.ds-skeleton__circle,.ds-skeleton__line{background:linear-gradient(90deg,var(--color-surface-default) 25%,var(--color-border-subtle) 50%,var(--color-surface-default) 75%);background-size:800px 100%;animation:ds-shimmer 1.6s ease-in-out infinite;border-radius:var(--radius-sm)}.ds-skeleton{display:flex;flex-direction:column;gap:var(--spacing-sm)}.ds-skeleton__line{height:14px;width:100%}.ds-skeleton__line--xs{width:30%}.ds-skeleton__line--sm{width:50%}.ds-skeleton__line--md{width:70%}.ds-skeleton__line--lg{width:90%}.ds-skeleton__line--xl{width:100%}.ds-skeleton__line--tall{height:20px}.ds-skeleton__line--h1{height:28px}.ds-skeleton__circle{border-radius:var(--radius-full);width:40px;height:40px;flex-shrink:0}.ds-skeleton__circle--sm{width:28px;height:28px}.ds-skeleton__circle--lg{width:56px;height:56px}.ds-skeleton__rect{border-radius:var(--radius-md);width:100%;height:120px}.ds-skeleton__rect--sm{height:64px}.ds-skeleton__rect--lg{height:200px}.ds-skeleton__rect--full{height:320px}.ds-skeleton--row{flex-direction:row;align-items:center}.ds-skeleton--card{border:1px solid var(--color-border-subtle);border-radius:var(--radius-md);padding:var(--spacing-lg);gap:var(--spacing-md)}\n"] }]
        }], propDecorators: { ariaLabel: [{
                type: Input
            }], card: [{
                type: Input
            }], row: [{
                type: Input
            }] } });

/**
 * ds-snackbar
 *
 * Toast notification component backed by Angular Material MatSnackBar service.
 * Always launched at the top-center of the viewport.
 *
 * Service usage (recommended):
 *   const ref = this.snackBar.openFromComponent(DsSnackbarComponent, {
 *     data: {
 *       message:     'Changes saved.',
 *       variant:     'text-only',           // 'text-only' | 'text-action' | 'text-longer-action'
 *       actionLabel: 'Undo',                // required for text-action / text-longer-action
 *       showClose:   false,
 *     },
 *     panelClass:         'ds-snackbar-panel',
 *     duration:           5000,             // omit for action variants that require user input
 *     verticalPosition:   'top',
 *     horizontalPosition: 'center',
 *   });
 *   ref.onAction().subscribe(() => { /* handle action *\/ });
 *
 * Template usage (CSS class API):
 *   <div class="ds-snackbar ds-snackbar--text-action ds-snackbar--has-close"
 *        role="status" aria-live="polite">
 *     <span class="ds-snackbar__message">Item moved to archive.</span>
 *     <button class="ds-button ds-button--filled ds-button--sm" type="button">Undo</button>
 *     <button class="ds-snackbar__close" type="button" aria-label="Dismiss">
 *       <span class="ds-icon ds-icon--sm">close</span>
 *     </button>
 *   </div>
 */
class DsSnackbarComponent {
    snackBarRef;
    data;
    constructor(snackBarRef, data) {
        this.snackBarRef = snackBarRef;
        this.data = data;
        if (data) {
            if (data.message !== undefined)
                this.message = data.message;
            if (data.variant !== undefined)
                this.variant = data.variant;
            if (data.actionLabel !== undefined)
                this.actionLabel = data.actionLabel;
            if (data.showClose !== undefined)
                this.showClose = data.showClose;
        }
    }
    message = '';
    variant = 'text-only';
    actionLabel = '';
    showClose = false;
    action = new EventEmitter();
    dismissed = new EventEmitter();
    get hasAction() {
        return this.variant === 'text-action' || this.variant === 'text-longer-action';
    }
    get isLongerAction() {
        return this.variant === 'text-longer-action';
    }
    onAction() {
        this.action.emit();
        this.snackBarRef?.dismissWithAction();
    }
    onDismiss() {
        this.dismissed.emit();
        this.snackBarRef?.dismiss();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSnackbarComponent, deps: [{ token: i1$6.MatSnackBarRef, optional: true }, { token: MAT_SNACK_BAR_DATA, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsSnackbarComponent, isStandalone: true, selector: "ds-snackbar", inputs: { message: "message", variant: "variant", actionLabel: "actionLabel", showClose: "showClose" }, outputs: { action: "action", dismissed: "dismissed" }, ngImport: i0, template: "<div\n  class=\"ds-snackbar\"\n  [class.ds-snackbar--text-action]=\"variant === 'text-action'\"\n  [class.ds-snackbar--text-longer-action]=\"variant === 'text-longer-action'\"\n  [class.ds-snackbar--has-close]=\"showClose\"\n  role=\"status\"\n  aria-live=\"polite\"\n>\n\n  <!-- text-longer-action: column layout \u2014 message on top, action row below -->\n  <ng-container *ngIf=\"isLongerAction; else rowLayout\">\n    <span class=\"ds-snackbar__message\">{{ message }}</span>\n    <div class=\"ds-snackbar__action-row\">\n      <ds-button size=\"sm\" variant=\"filled\" (clicked)=\"onAction()\">{{ actionLabel }}</ds-button>\n      <button\n        *ngIf=\"showClose\"\n        class=\"ds-snackbar__close\"\n        type=\"button\"\n        aria-label=\"Dismiss\"\n        (click)=\"onDismiss()\"\n      >\n        <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n      </button>\n    </div>\n  </ng-container>\n\n  <!-- text-only / text-action: single row layout -->\n  <ng-template #rowLayout>\n    <span class=\"ds-snackbar__message\">{{ message }}</span>\n    <ds-button\n      *ngIf=\"hasAction\"\n      size=\"sm\"\n      variant=\"filled\"\n      (clicked)=\"onAction()\"\n    >{{ actionLabel }}</ds-button>\n    <button\n      *ngIf=\"showClose\"\n      class=\"ds-snackbar__close\"\n      type=\"button\"\n      aria-label=\"Dismiss\"\n      (click)=\"onDismiss()\"\n    >\n      <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n    </button>\n  </ng-template>\n\n</div>\n", styles: ["@keyframes ds-snackbar-enter{0%{transform:translateY(-8px);opacity:0}to{transform:translateY(0);opacity:1}}.ds-snackbar{display:flex;flex-direction:row;align-items:flex-start;width:fit-content;max-width:480px;padding:var(--spacing-lg);background:var(--color-surface-tooltip);color:var(--color-text-inverse);border-radius:var(--radius-sm);box-shadow:0 3px 12px 6px var(--shadow-elevation-3),0 4px 4px 0 var(--shadow-elevation-3);animation:ds-snackbar-enter .2s ease}.ds-snackbar--text-action{width:344px;gap:var(--spacing-md);align-items:center}.ds-snackbar--text-longer-action{width:344px;flex-direction:column;gap:var(--spacing-md)}.ds-snackbar--has-close:not(.ds-snackbar--text-longer-action){width:344px;padding-right:var(--spacing-sm);align-items:center}.ds-snackbar--has-close.ds-snackbar--text-longer-action{width:344px;padding-right:var(--spacing-sm)}.ds-snackbar__message{flex:1;min-width:0;font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);font-weight:var(--ref-typescale-body-medium-weight);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-inverse)}.ds-snackbar__action-row{display:flex;justify-content:flex-end;align-items:center;gap:var(--spacing-sm);width:100%}.ds-snackbar__close{position:relative;overflow:hidden;appearance:none;border:none;background:transparent;width:32px;min-width:32px;height:32px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-text-inverse);padding:0;flex-shrink:0}.ds-snackbar__close:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);pointer-events:none}.ds-snackbar__close:hover:after{background:#ffffff1f}.ds-snackbar__close:active:after{background:#ffffff2e}.ds-snackbar__close:focus{outline:none}.ds-snackbar__close:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.mat-mdc-snack-bar-container.ds-snackbar-panel{background:transparent;box-shadow:none;padding:0;min-width:unset;max-width:unset;--mdc-snackbar-container-color: transparent;--mdc-snackbar-supporting-text-color: transparent;--mat-snack-bar-button-color: transparent}.mat-mdc-snack-bar-container.ds-snackbar-panel .mdc-snackbar__surface{background:transparent;box-shadow:none;padding:0;min-width:unset;max-width:unset;border-radius:0}.mat-mdc-snack-bar-container.ds-snackbar-panel .mat-mdc-snack-bar-actions{display:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatSnackBarModule }, { kind: "component", type: DsButtonComponent, selector: "ds-button", inputs: ["variant", "size", "disabled", "type"], outputs: ["clicked"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSnackbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-snackbar', standalone: true, imports: [CommonModule, MatSnackBarModule, DsButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"ds-snackbar\"\n  [class.ds-snackbar--text-action]=\"variant === 'text-action'\"\n  [class.ds-snackbar--text-longer-action]=\"variant === 'text-longer-action'\"\n  [class.ds-snackbar--has-close]=\"showClose\"\n  role=\"status\"\n  aria-live=\"polite\"\n>\n\n  <!-- text-longer-action: column layout \u2014 message on top, action row below -->\n  <ng-container *ngIf=\"isLongerAction; else rowLayout\">\n    <span class=\"ds-snackbar__message\">{{ message }}</span>\n    <div class=\"ds-snackbar__action-row\">\n      <ds-button size=\"sm\" variant=\"filled\" (clicked)=\"onAction()\">{{ actionLabel }}</ds-button>\n      <button\n        *ngIf=\"showClose\"\n        class=\"ds-snackbar__close\"\n        type=\"button\"\n        aria-label=\"Dismiss\"\n        (click)=\"onDismiss()\"\n      >\n        <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n      </button>\n    </div>\n  </ng-container>\n\n  <!-- text-only / text-action: single row layout -->\n  <ng-template #rowLayout>\n    <span class=\"ds-snackbar__message\">{{ message }}</span>\n    <ds-button\n      *ngIf=\"hasAction\"\n      size=\"sm\"\n      variant=\"filled\"\n      (clicked)=\"onAction()\"\n    >{{ actionLabel }}</ds-button>\n    <button\n      *ngIf=\"showClose\"\n      class=\"ds-snackbar__close\"\n      type=\"button\"\n      aria-label=\"Dismiss\"\n      (click)=\"onDismiss()\"\n    >\n      <span class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">close</span>\n    </button>\n  </ng-template>\n\n</div>\n", styles: ["@keyframes ds-snackbar-enter{0%{transform:translateY(-8px);opacity:0}to{transform:translateY(0);opacity:1}}.ds-snackbar{display:flex;flex-direction:row;align-items:flex-start;width:fit-content;max-width:480px;padding:var(--spacing-lg);background:var(--color-surface-tooltip);color:var(--color-text-inverse);border-radius:var(--radius-sm);box-shadow:0 3px 12px 6px var(--shadow-elevation-3),0 4px 4px 0 var(--shadow-elevation-3);animation:ds-snackbar-enter .2s ease}.ds-snackbar--text-action{width:344px;gap:var(--spacing-md);align-items:center}.ds-snackbar--text-longer-action{width:344px;flex-direction:column;gap:var(--spacing-md)}.ds-snackbar--has-close:not(.ds-snackbar--text-longer-action){width:344px;padding-right:var(--spacing-sm);align-items:center}.ds-snackbar--has-close.ds-snackbar--text-longer-action{width:344px;padding-right:var(--spacing-sm)}.ds-snackbar__message{flex:1;min-width:0;font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);line-height:var(--ref-typescale-body-medium-line-height);font-weight:var(--ref-typescale-body-medium-weight);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-inverse)}.ds-snackbar__action-row{display:flex;justify-content:flex-end;align-items:center;gap:var(--spacing-sm);width:100%}.ds-snackbar__close{position:relative;overflow:hidden;appearance:none;border:none;background:transparent;width:32px;min-width:32px;height:32px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-text-inverse);padding:0;flex-shrink:0}.ds-snackbar__close:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);pointer-events:none}.ds-snackbar__close:hover:after{background:#ffffff1f}.ds-snackbar__close:active:after{background:#ffffff2e}.ds-snackbar__close:focus{outline:none}.ds-snackbar__close:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.mat-mdc-snack-bar-container.ds-snackbar-panel{background:transparent;box-shadow:none;padding:0;min-width:unset;max-width:unset;--mdc-snackbar-container-color: transparent;--mdc-snackbar-supporting-text-color: transparent;--mat-snack-bar-button-color: transparent}.mat-mdc-snack-bar-container.ds-snackbar-panel .mdc-snackbar__surface{background:transparent;box-shadow:none;padding:0;min-width:unset;max-width:unset;border-radius:0}.mat-mdc-snack-bar-container.ds-snackbar-panel .mat-mdc-snack-bar-actions{display:none}\n"] }]
        }], ctorParameters: () => [{ type: i1$6.MatSnackBarRef, decorators: [{
                    type: Optional
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [MAT_SNACK_BAR_DATA]
                }] }], propDecorators: { message: [{
                type: Input
            }], variant: [{
                type: Input
            }], actionLabel: [{
                type: Input
            }], showClose: [{
                type: Input
            }], action: [{
                type: Output
            }], dismissed: [{
                type: Output
            }] } });

/**
 * ds-spinner
 *
 * Based on Angular Material mat-progress-spinner.
 * Import MatProgressSpinnerModule in your Angular module.
 *
 * @example
 * <!-- Indeterminate -->
 * <ds-spinner aria-label="Loading" />
 *
 * <!-- Determinate at 60% -->
 * <ds-spinner mode="determinate" [value]="60" />
 *
 * <!-- Small white spinner inside a button -->
 * <ds-spinner size="sm" color="white" />
 */
class DsSpinnerComponent {
    /** 'indeterminate' | 'determinate' */
    mode = 'indeterminate';
    /** Progress value 0–100 (only for determinate mode) */
    value = 0;
    /** 'sm' | 'md' | 'lg' */
    size = 'md';
    /** 'brand' | 'white' | 'subtle' */
    color = 'brand';
    ariaLabel = 'Loading';
    get diameter() {
        const sizes = { sm: 24, md: 40, lg: 56 };
        return sizes[this.size];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSpinnerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsSpinnerComponent, isStandalone: true, selector: "ds-spinner", inputs: { mode: "mode", value: "value", size: "size", color: "color", ariaLabel: "ariaLabel" }, ngImport: i0, template: "<mat-progress-spinner\n  [mode]=\"mode\"\n  [value]=\"value\"\n  [diameter]=\"diameter\"\n  [strokeWidth]=\"3\"\n  [class.ds-spinner--white]=\"color === 'white'\"\n  [class.ds-spinner--subtle]=\"color === 'subtle'\"\n  [attr.aria-label]=\"ariaLabel\"\n></mat-progress-spinner>\n", styles: ["@keyframes ds-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes ds-stroke{0%{stroke-dashoffset:113px}50%{stroke-dashoffset:28px}to{stroke-dashoffset:113px}}.ds-spinner{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex-shrink:0}.ds-spinner--sm{width:24px;height:24px}.ds-spinner--lg{width:56px;height:56px}.ds-spinner__svg{width:100%;height:100%;animation:ds-spin 1.4s linear infinite;transform-origin:center center}.ds-spinner__track{fill:none;stroke:var(--color-border-subtle);stroke-width:3}.ds-spinner__circle{fill:none;stroke:var(--color-surface-brand-bold);stroke-width:3;stroke-linecap:round;stroke-dasharray:113px;animation:ds-stroke 1.4s ease-in-out infinite;transform-origin:center center}.ds-spinner__fill{fill:none;stroke:var(--color-surface-brand-bold);stroke-width:3;stroke-linecap:round;stroke-dasharray:113px;transition:stroke-dashoffset .3s ease;transform-origin:center center;transform:rotate(-90deg)}.ds-spinner--determinate .ds-spinner__svg,.ds-spinner--determinate .ds-spinner__fill{animation:none}.ds-spinner--white .ds-spinner__circle,.ds-spinner--white .ds-spinner__fill{stroke:var(--color-text-inverse)}.ds-spinner--subtle .ds-spinner__circle,.ds-spinner--subtle .ds-spinner__fill{stroke:var(--color-icon-subtle)}.mat-mdc-progress-spinner{--mdc-circular-progress-active-indicator-color: var(--color-surface-brand-bold)}.mat-mdc-progress-spinner.ds-spinner--white{--mdc-circular-progress-active-indicator-color: var(--color-text-inverse)}.mat-mdc-progress-spinner.ds-spinner--subtle{--mdc-circular-progress-active-indicator-color: var(--color-icon-subtle)}\n"], dependencies: [{ kind: "ngmodule", type: MatProgressSpinnerModule }, { kind: "component", type: i1$7.MatProgressSpinner, selector: "mat-progress-spinner, mat-spinner", inputs: ["color", "mode", "value", "diameter", "strokeWidth"], exportAs: ["matProgressSpinner"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsSpinnerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-spinner', standalone: true, imports: [MatProgressSpinnerModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-progress-spinner\n  [mode]=\"mode\"\n  [value]=\"value\"\n  [diameter]=\"diameter\"\n  [strokeWidth]=\"3\"\n  [class.ds-spinner--white]=\"color === 'white'\"\n  [class.ds-spinner--subtle]=\"color === 'subtle'\"\n  [attr.aria-label]=\"ariaLabel\"\n></mat-progress-spinner>\n", styles: ["@keyframes ds-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes ds-stroke{0%{stroke-dashoffset:113px}50%{stroke-dashoffset:28px}to{stroke-dashoffset:113px}}.ds-spinner{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;flex-shrink:0}.ds-spinner--sm{width:24px;height:24px}.ds-spinner--lg{width:56px;height:56px}.ds-spinner__svg{width:100%;height:100%;animation:ds-spin 1.4s linear infinite;transform-origin:center center}.ds-spinner__track{fill:none;stroke:var(--color-border-subtle);stroke-width:3}.ds-spinner__circle{fill:none;stroke:var(--color-surface-brand-bold);stroke-width:3;stroke-linecap:round;stroke-dasharray:113px;animation:ds-stroke 1.4s ease-in-out infinite;transform-origin:center center}.ds-spinner__fill{fill:none;stroke:var(--color-surface-brand-bold);stroke-width:3;stroke-linecap:round;stroke-dasharray:113px;transition:stroke-dashoffset .3s ease;transform-origin:center center;transform:rotate(-90deg)}.ds-spinner--determinate .ds-spinner__svg,.ds-spinner--determinate .ds-spinner__fill{animation:none}.ds-spinner--white .ds-spinner__circle,.ds-spinner--white .ds-spinner__fill{stroke:var(--color-text-inverse)}.ds-spinner--subtle .ds-spinner__circle,.ds-spinner--subtle .ds-spinner__fill{stroke:var(--color-icon-subtle)}.mat-mdc-progress-spinner{--mdc-circular-progress-active-indicator-color: var(--color-surface-brand-bold)}.mat-mdc-progress-spinner.ds-spinner--white{--mdc-circular-progress-active-indicator-color: var(--color-text-inverse)}.mat-mdc-progress-spinner.ds-spinner--subtle{--mdc-circular-progress-active-indicator-color: var(--color-icon-subtle)}\n"] }]
        }], propDecorators: { mode: [{
                type: Input
            }], value: [{
                type: Input
            }], size: [{
                type: Input
            }], color: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }] } });

/**
 * Onflo Design System — Table Header Cell
 *
 * AG Grid custom header renderer for the Onflo table system.
 * Uses Onflo tokens and Material Symbols — no AG Grid default styles.
 *
 * AG Grid usage (in your column def):
 *   {
 *     headerComponent: DsTableHeaderCellComponent,
 *     headerComponentParams: { align: 'right', sorting: true }
 *   }
 *
 * Standalone usage:
 *   <ds-table-header-cell label="Name" [sorting]="true" />
 *
 * Figma: primitive/table-header-cell
 * Properties: align, sorting, filtering, checkbox, pipeLeft, pipeRight, menuControl
 * Used inside: component/table-header-row
 *
 * ADA: aria-sort on the host element; aria-label on all icon buttons.
 */
class DsTableHeaderCellComponent {
    cdr;
    /** Column header label. Overridden by agInit displayName when used as AG Grid renderer. */
    label = '';
    /** Text alignment of cell contents. */
    align = 'left';
    /** Show sort icon button — clicking cycles asc → desc → none. */
    sorting = false;
    /** Show filter icon button. */
    filtering = false;
    /** Show column menu (more_vert) button. */
    menuControl = false;
    /** Show checkbox (select-all) at the leading edge. */
    checkbox = false;
    /** Show left resize pipe. */
    pipeLeft = false;
    /** Show right resize pipe (default on). */
    pipeRight = true;
    /** Current sort direction — can be set externally or driven by AG Grid. */
    sortDirection = null;
    /** Checked state for the select-all checkbox. */
    checked = false;
    /** Indeterminate state for the select-all checkbox. */
    indeterminate = false;
    /** Emits the new column width in px when the user drags the resize handle. */
    widthChange = new EventEmitter();
    agParams;
    sortChangedListener;
    // Resize drag state
    resizeStartX = 0;
    resizeStartWidth = 0;
    boundMouseMove;
    boundMouseUp;
    constructor(cdr) {
        this.cdr = cdr;
    }
    // ── Checkbox-only detection ──────────────────────────────────
    /** True when this column shows only a checkbox with no label text. */
    get isCheckboxOnly() {
        return this.checkbox && !this.label;
    }
    /** Whether the left resize pipe is shown (suppressed on checkbox-only columns). */
    get showLeftPipe() {
        return !this.isCheckboxOnly && this.pipeLeft;
    }
    /** Whether the right resize pipe is shown (suppressed on checkbox-only columns). */
    get showRightPipe() {
        return !this.isCheckboxOnly && this.pipeRight;
    }
    // ── AG Grid IHeaderAngularComp interface ────────────────────
    /** Called by AG Grid when this component is the headerComponent. */
    agInit(params) {
        this.agParams = params;
        this.label = params.displayName;
        this.sorting = params.enableSorting;
        this.menuControl = params.enableMenu;
        this.sortChangedListener = () => {
            const raw = params.column.getSort();
            this.sortDirection = (raw === 'asc' || raw === 'desc') ? raw : null;
            this.cdr.markForCheck();
        };
        params.column.addEventListener('sortChanged', this.sortChangedListener);
        this.sortChangedListener();
    }
    /** Called by AG Grid to refresh the header. */
    refresh(params) {
        this.label = params.displayName;
        this.cdr.markForCheck();
        return true;
    }
    ngOnDestroy() {
        if (this.agParams && this.sortChangedListener) {
            this.agParams.column.removeEventListener('sortChanged', this.sortChangedListener);
        }
        this._cleanupResizeListeners();
    }
    // ── Sort ────────────────────────────────────────────────────
    onSortClick(event) {
        if (this.agParams) {
            this.agParams.progressSort(event.shiftKey);
        }
        else {
            const cycle = [null, 'asc', 'desc'];
            const idx = cycle.indexOf(this.sortDirection);
            this.sortDirection = cycle[(idx + 1) % cycle.length];
        }
    }
    get sortIconClass() {
        if (this.sortDirection === 'asc')
            return 'ds-table-header-cell__sort-icon--asc';
        if (this.sortDirection === 'desc')
            return 'ds-table-header-cell__sort-icon--desc';
        return 'ds-table-header-cell__sort-icon--none';
    }
    get ariaSortValue() {
        if (!this.sorting)
            return null;
        if (this.sortDirection === 'asc')
            return 'ascending';
        if (this.sortDirection === 'desc')
            return 'descending';
        return 'none';
    }
    // ── Menu / Filter ───────────────────────────────────────────
    onMenuClick(triggerEl) {
        if (this.agParams) {
            this.agParams.showColumnMenu(triggerEl);
        }
    }
    // ── Checkbox ────────────────────────────────────────────────
    get checkboxIcon() {
        if (this.indeterminate)
            return 'indeterminate_check_box';
        if (this.checked)
            return 'check_box';
        return 'check_box_outline_blank';
    }
    get checkboxClass() {
        if (this.indeterminate || this.checked)
            return 'ds-table-header-cell__checkbox--checked';
        return '';
    }
    // ── Resize drag ─────────────────────────────────────────────
    onResizeStart(event) {
        if (this.isCheckboxOnly)
            return;
        event.preventDefault();
        event.stopPropagation();
        this.resizeStartX = event.clientX;
        this.resizeStartWidth = this.agParams?.column.getActualWidth() ?? 200;
        this.boundMouseMove = (e) => {
            const delta = e.clientX - this.resizeStartX;
            const newWidth = Math.max(50, this.resizeStartWidth + delta);
            this.agParams?.api?.setColumnWidth(this.agParams.column.getColId(), newWidth);
            this.widthChange.emit(newWidth);
        };
        this.boundMouseUp = () => this._cleanupResizeListeners();
        document.addEventListener('mousemove', this.boundMouseMove);
        document.addEventListener('mouseup', this.boundMouseUp);
    }
    _cleanupResizeListeners() {
        if (this.boundMouseMove) {
            document.removeEventListener('mousemove', this.boundMouseMove);
            this.boundMouseMove = undefined;
        }
        if (this.boundMouseUp) {
            document.removeEventListener('mouseup', this.boundMouseUp);
            this.boundMouseUp = undefined;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTableHeaderCellComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTableHeaderCellComponent, isStandalone: true, selector: "ds-table-header-cell", inputs: { label: "label", align: "align", sorting: "sorting", filtering: "filtering", menuControl: "menuControl", checkbox: "checkbox", pipeLeft: "pipeLeft", pipeRight: "pipeRight", sortDirection: "sortDirection", checked: "checked", indeterminate: "indeterminate" }, outputs: { widthChange: "widthChange" }, host: { attributes: { "role": "columnheader" }, properties: { "attr.aria-sort": "ariaSortValue" } }, ngImport: i0, template: "<div\n  class=\"ds-table-header-cell\"\n  [class.ds-table-header-cell--right]=\"align === 'right'\"\n  [class.ds-table-header-cell--checkbox-only]=\"isCheckboxOnly\"\n>\n\n  <!-- Left resize handle -->\n  <div class=\"ds-table-header-cell__resize-handle\">\n    <span *ngIf=\"showLeftPipe\" class=\"ds-table-header-cell__resize-bar\"></span>\n  </div>\n\n  <!-- Content: checkbox \u00B7 label \u00B7 sort button -->\n  <div\n    class=\"ds-table-header-cell__content\"\n    [class.ds-table-header-cell__content--right]=\"align === 'right'\"\n  >\n    <!-- Select-all checkbox -->\n    <div\n      *ngIf=\"checkbox\"\n      class=\"ds-table-header-cell__checkbox\"\n      [class]=\"checkboxClass\"\n    >\n      <span class=\"ds-icon\" [class.ds-icon--filled]=\"checked || indeterminate\">\n        {{ checkboxIcon }}\n      </span>\n    </div>\n\n    <!-- Column label -->\n    <span *ngIf=\"label\" class=\"ds-table-header-cell__label\">{{ label }}</span>\n\n    <!-- Sort button -->\n    <ds-icon-button\n      *ngIf=\"sorting\"\n      size=\"sm\"\n      variant=\"icon\"\n      [ariaLabel]=\"'Sort: ' + (sortDirection ?? 'none')\"\n      (clicked)=\"onSortClick($event)\"\n    >\n      <span class=\"ds-icon\" [ngClass]=\"sortIconClass\">arrow_upward_alt</span>\n    </ds-icon-button>\n  </div>\n\n  <!-- Trailing actions: menu \u00B7 filter \u00B7 right resize handle -->\n  <div class=\"ds-table-header-cell__actions\">\n\n    <!-- Column menu button -->\n    <div #menuBtnEl *ngIf=\"menuControl\">\n      <ds-icon-button\n        size=\"sm\"\n        variant=\"icon\"\n        ariaLabel=\"Column options\"\n        (clicked)=\"onMenuClick(menuBtnEl)\"\n      >\n        <span class=\"ds-icon ds-table-header-cell__menu-icon\">more_vert</span>\n      </ds-icon-button>\n    </div>\n\n    <!-- Filter button (filled icon) -->\n    <ds-icon-button\n      *ngIf=\"filtering\"\n      size=\"sm\"\n      variant=\"icon\"\n      ariaLabel=\"Filter column\"\n    >\n      <span class=\"ds-icon ds-icon--filled\">filter_alt</span>\n    </ds-icon-button>\n\n    <!-- Right resize handle \u2014 draggable -->\n    <div\n      class=\"ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing\"\n      [class.ds-table-header-cell__resize-handle--active]=\"showRightPipe\"\n      (mousedown)=\"onResizeStart($event)\"\n    >\n      <span *ngIf=\"showRightPipe\" class=\"ds-table-header-cell__resize-bar\"></span>\n    </div>\n\n  </div>\n\n</div>\n", styles: [".ds-table-header-cell{display:flex;align-items:center;height:56px;width:100%;background:var(--color-surface-subtle);border-bottom:1px solid var(--color-border-secondary);box-sizing:border-box;overflow:hidden;position:relative}.ds-table-header-cell--checkbox-only{width:56px;flex-shrink:0}.ds-table-header-cell--checkbox-only .ds-table-header-cell__resize-handle{display:none}.ds-table-header-cell--dragging{background:var(--overlay-hovered);outline:2px solid var(--color-border-brand);outline-offset:-2px;cursor:grabbing}.ds-table-header-cell__resize-handle{display:flex;flex-direction:column;align-items:center;justify-content:center;width:16px;height:100%;flex-shrink:0}.ds-table-header-cell__resize-handle--trailing{justify-content:center;align-items:flex-end}.ds-table-header-cell__resize-handle--active{cursor:col-resize}.ds-table-header-cell__resize-bar{width:2px;height:14px;background:var(--color-border-primary);border-radius:1px}.ds-table-header-cell__content{display:flex;align-items:center;gap:var(--spacing-sm);flex:1 0 0;min-width:0;height:100%}.ds-table-header-cell__content--right{justify-content:flex-end}.ds-table-header-cell__label{font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:1}.ds-table-header-cell__checkbox{display:flex;align-items:center;justify-content:center;width:42px;height:42px;flex-shrink:0;cursor:pointer}.ds-table-header-cell__checkbox .ds-icon{color:var(--color-border-input)}.ds-table-header-cell__checkbox--checked .ds-icon,.ds-table-header-cell__checkbox--indeterminate .ds-icon{color:var(--color-surface-brand-bold)}.ds-table-header-cell__actions{display:flex;align-items:center;justify-content:flex-end;min-width:16px;height:100%;flex-shrink:0}.ds-table-header-cell__sort-icon--asc{color:var(--color-icon-brand)}.ds-table-header-cell__sort-icon--desc{color:var(--color-icon-brand);transform:rotate(180deg);display:inline-block}.ds-table-header-cell__sort-icon--none{color:var(--color-icon-subtle);opacity:.5}.ds-table-header-cell__menu-icon{color:var(--color-icon-default)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: DsIconButtonComponent, selector: "ds-icon-button", inputs: ["variant", "size", "ariaLabel", "isError", "disabled", "type"], outputs: ["clicked"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTableHeaderCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-table-header-cell', standalone: true, imports: [CommonModule, DsIconButtonComponent], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.aria-sort]': 'ariaSortValue',
                        'role': 'columnheader',
                    }, template: "<div\n  class=\"ds-table-header-cell\"\n  [class.ds-table-header-cell--right]=\"align === 'right'\"\n  [class.ds-table-header-cell--checkbox-only]=\"isCheckboxOnly\"\n>\n\n  <!-- Left resize handle -->\n  <div class=\"ds-table-header-cell__resize-handle\">\n    <span *ngIf=\"showLeftPipe\" class=\"ds-table-header-cell__resize-bar\"></span>\n  </div>\n\n  <!-- Content: checkbox \u00B7 label \u00B7 sort button -->\n  <div\n    class=\"ds-table-header-cell__content\"\n    [class.ds-table-header-cell__content--right]=\"align === 'right'\"\n  >\n    <!-- Select-all checkbox -->\n    <div\n      *ngIf=\"checkbox\"\n      class=\"ds-table-header-cell__checkbox\"\n      [class]=\"checkboxClass\"\n    >\n      <span class=\"ds-icon\" [class.ds-icon--filled]=\"checked || indeterminate\">\n        {{ checkboxIcon }}\n      </span>\n    </div>\n\n    <!-- Column label -->\n    <span *ngIf=\"label\" class=\"ds-table-header-cell__label\">{{ label }}</span>\n\n    <!-- Sort button -->\n    <ds-icon-button\n      *ngIf=\"sorting\"\n      size=\"sm\"\n      variant=\"icon\"\n      [ariaLabel]=\"'Sort: ' + (sortDirection ?? 'none')\"\n      (clicked)=\"onSortClick($event)\"\n    >\n      <span class=\"ds-icon\" [ngClass]=\"sortIconClass\">arrow_upward_alt</span>\n    </ds-icon-button>\n  </div>\n\n  <!-- Trailing actions: menu \u00B7 filter \u00B7 right resize handle -->\n  <div class=\"ds-table-header-cell__actions\">\n\n    <!-- Column menu button -->\n    <div #menuBtnEl *ngIf=\"menuControl\">\n      <ds-icon-button\n        size=\"sm\"\n        variant=\"icon\"\n        ariaLabel=\"Column options\"\n        (clicked)=\"onMenuClick(menuBtnEl)\"\n      >\n        <span class=\"ds-icon ds-table-header-cell__menu-icon\">more_vert</span>\n      </ds-icon-button>\n    </div>\n\n    <!-- Filter button (filled icon) -->\n    <ds-icon-button\n      *ngIf=\"filtering\"\n      size=\"sm\"\n      variant=\"icon\"\n      ariaLabel=\"Filter column\"\n    >\n      <span class=\"ds-icon ds-icon--filled\">filter_alt</span>\n    </ds-icon-button>\n\n    <!-- Right resize handle \u2014 draggable -->\n    <div\n      class=\"ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing\"\n      [class.ds-table-header-cell__resize-handle--active]=\"showRightPipe\"\n      (mousedown)=\"onResizeStart($event)\"\n    >\n      <span *ngIf=\"showRightPipe\" class=\"ds-table-header-cell__resize-bar\"></span>\n    </div>\n\n  </div>\n\n</div>\n", styles: [".ds-table-header-cell{display:flex;align-items:center;height:56px;width:100%;background:var(--color-surface-subtle);border-bottom:1px solid var(--color-border-secondary);box-sizing:border-box;overflow:hidden;position:relative}.ds-table-header-cell--checkbox-only{width:56px;flex-shrink:0}.ds-table-header-cell--checkbox-only .ds-table-header-cell__resize-handle{display:none}.ds-table-header-cell--dragging{background:var(--overlay-hovered);outline:2px solid var(--color-border-brand);outline-offset:-2px;cursor:grabbing}.ds-table-header-cell__resize-handle{display:flex;flex-direction:column;align-items:center;justify-content:center;width:16px;height:100%;flex-shrink:0}.ds-table-header-cell__resize-handle--trailing{justify-content:center;align-items:flex-end}.ds-table-header-cell__resize-handle--active{cursor:col-resize}.ds-table-header-cell__resize-bar{width:2px;height:14px;background:var(--color-border-primary);border-radius:1px}.ds-table-header-cell__content{display:flex;align-items:center;gap:var(--spacing-sm);flex:1 0 0;min-width:0;height:100%}.ds-table-header-cell__content--right{justify-content:flex-end}.ds-table-header-cell__label{font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:1}.ds-table-header-cell__checkbox{display:flex;align-items:center;justify-content:center;width:42px;height:42px;flex-shrink:0;cursor:pointer}.ds-table-header-cell__checkbox .ds-icon{color:var(--color-border-input)}.ds-table-header-cell__checkbox--checked .ds-icon,.ds-table-header-cell__checkbox--indeterminate .ds-icon{color:var(--color-surface-brand-bold)}.ds-table-header-cell__actions{display:flex;align-items:center;justify-content:flex-end;min-width:16px;height:100%;flex-shrink:0}.ds-table-header-cell__sort-icon--asc{color:var(--color-icon-brand)}.ds-table-header-cell__sort-icon--desc{color:var(--color-icon-brand);transform:rotate(180deg);display:inline-block}.ds-table-header-cell__sort-icon--none{color:var(--color-icon-subtle);opacity:.5}.ds-table-header-cell__menu-icon{color:var(--color-icon-default)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { label: [{
                type: Input
            }], align: [{
                type: Input
            }], sorting: [{
                type: Input
            }], filtering: [{
                type: Input
            }], menuControl: [{
                type: Input
            }], checkbox: [{
                type: Input
            }], pipeLeft: [{
                type: Input
            }], pipeRight: [{
                type: Input
            }], sortDirection: [{
                type: Input
            }], checked: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], widthChange: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Table Row Cell
 *
 * AG Grid custom cell renderer for the Onflo table system.
 * Uses Onflo tokens and Material Symbols — no AG Grid default styles.
 *
 * AG Grid usage (in your column def):
 *   {
 *     field: 'name',
 *     cellRenderer: DsTableRowCellComponent
 *   }
 *
 * Standalone usage:
 *   <ds-table-row-cell [value]="'Acme Corp'" />
 *   <ds-table-row-cell [value]="'$4,200'" align="right" />
 *
 * Figma: primitive/table-row-cell
 * Properties: align, cellData, gripper, checkbox, tier1Indent, tier2Indent, state
 * Used inside: component/table-row
 *
 * ADA: role="gridcell"; aria-selected on row selection; keyboard-accessible edit cells.
 */
class DsTableRowCellComponent {
    cdr;
    /** Cell value text. Overridden by agInit params.value. */
    value = null;
    /** Text alignment of cell content. */
    align = 'left';
    /** Whether to render cell data text (can be false for action-only cells). */
    cellData = true;
    /** Show row drag gripper handle. */
    gripper = false;
    /** Show row selection checkbox. */
    checkbox = false;
    /** Checked state for the selection checkbox. */
    checked = false;
    /** Indeterminate state for the selection checkbox. */
    indeterminate = false;
    /** Apply 32px tier-1 indent (for tree/grouped rows, depth 1). */
    tier1Indent = false;
    /** Apply 64px tier-2 indent (for tree/grouped rows, depth 2). */
    tier2Indent = false;
    /** Visual interaction state — typically driven by AG Grid row events. */
    state = 'default';
    get isHovered() { return this.state === 'hover'; }
    get isFocused() { return this.state === 'focus'; }
    get isSelected() { return this.checked; }
    agParams;
    rowSelectedListener;
    constructor(cdr) {
        this.cdr = cdr;
    }
    // ── AG Grid ICellRendererAngularComp interface ──────────────
    /** Called by AG Grid when this component is the cellRenderer. */
    agInit(params) {
        this.agParams = params;
        this.applyParams(params);
        // Sync checked state when row selection changes
        this.rowSelectedListener = () => {
            this.checked = params.node.isSelected();
            this.cdr.markForCheck();
        };
        params.node.addEventListener('rowSelected', this.rowSelectedListener);
    }
    /** Called by AG Grid when the cell value changes. */
    refresh(params) {
        this.applyParams(params);
        this.cdr.markForCheck();
        return true;
    }
    ngOnDestroy() {
        if (this.agParams && this.rowSelectedListener) {
            this.agParams.node.removeEventListener('rowSelected', this.rowSelectedListener);
        }
    }
    applyParams(params) {
        this.value = params.value != null ? String(params.value) : null;
        this.checked = params.node.isSelected();
        // Merge any extra params from colDef.cellRendererParams
        const extra = params.colDef?.cellRendererParams ?? {};
        if (extra.align)
            this.align = extra.align;
        if (extra.gripper)
            this.gripper = extra.gripper;
        if (extra.checkbox)
            this.checkbox = extra.checkbox;
        if (extra.tier1Indent)
            this.tier1Indent = extra.tier1Indent;
        if (extra.tier2Indent)
            this.tier2Indent = extra.tier2Indent;
    }
    // ── Checkbox helpers ─────────────────────────────────────────
    get checkboxIcon() {
        if (this.indeterminate)
            return 'indeterminate_check_box';
        if (this.checked)
            return 'check_box';
        return 'check_box_outline_blank';
    }
    get checkboxClass() {
        return (this.checked || this.indeterminate)
            ? 'ds-table-row-cell__checkbox--checked'
            : '';
    }
    // ── Display value ────────────────────────────────────────────
    get displayValue() {
        return this.value ?? '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTableRowCellComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTableRowCellComponent, isStandalone: true, selector: "ds-table-row-cell", inputs: { value: "value", align: "align", cellData: "cellData", gripper: "gripper", checkbox: "checkbox", checked: "checked", indeterminate: "indeterminate", tier1Indent: "tier1Indent", tier2Indent: "tier2Indent", state: "state" }, host: { attributes: { "role": "gridcell" }, properties: { "class.is-hovered": "this.isHovered", "class.is-focused": "this.isFocused", "class.is-selected": "this.isSelected" } }, ngImport: i0, template: "<div\n  class=\"ds-table-row-cell\"\n  [class.is-hovered]=\"state === 'hover'\"\n  [class.is-focused]=\"state === 'focus'\"\n>\n  <div\n    class=\"ds-table-row-cell__content\"\n    [class.ds-table-row-cell__content--right]=\"align === 'right'\"\n  >\n    <!-- Tier indent spacers (tree / grouped rows) -->\n    <span *ngIf=\"tier1Indent\" class=\"ds-table-row-cell__indent--tier1\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"tier2Indent\" class=\"ds-table-row-cell__indent--tier2\" aria-hidden=\"true\"></span>\n\n    <!-- Row drag gripper -->\n    <button\n      *ngIf=\"gripper\"\n      type=\"button\"\n      class=\"ds-table-row-cell__gripper\"\n      aria-label=\"Drag to reorder row\"\n    >\n      <span class=\"ds-icon\">drag_indicator</span>\n    </button>\n\n    <!-- Row selection checkbox -->\n    <div\n      *ngIf=\"checkbox\"\n      class=\"ds-table-row-cell__checkbox\"\n      [class]=\"checkboxClass\"\n    >\n      <span\n        class=\"ds-icon\"\n        [class.ds-icon--filled]=\"checked || indeterminate\"\n      >{{ checkboxIcon }}</span>\n    </div>\n\n    <!-- Cell data text -->\n    <span\n      *ngIf=\"cellData\"\n      class=\"ds-table-row-cell__data\"\n      [class.ds-table-row-cell__data--right]=\"align === 'right'\"\n    >{{ displayValue }}</span>\n\n  </div>\n</div>\n", styles: [".ds-table-row-cell{display:flex;align-items:center;height:56px;width:100%;padding:0 var(--spacing-lg);border-bottom:1px solid var(--color-border-subtle);box-sizing:border-box;overflow:hidden;position:relative;background:transparent;transition:background 80ms ease}.ds-table-row-cell--checkbox-only{width:56px;flex-shrink:0;padding:0}.ds-table-row-cell--totals{background:var(--color-surface-subtle);border-bottom:none}.ds-table-row-cell.is-hovered{background:var(--overlay-hovered)}.ds-table-row-cell.is-focused{background:var(--overlay-focused)}.ds-table-row-cell.is-selected{background:var(--overlay-selected)}.ds-table-row-cell__content{display:flex;align-items:center;gap:var(--spacing-sm);flex:1 0 0;min-width:0;height:100%}.ds-table-row-cell__content--right{justify-content:flex-end}.ds-table-row-cell__indent--tier1{width:32px;flex-shrink:0}.ds-table-row-cell__indent--tier2{width:64px;flex-shrink:0}.ds-table-row-cell__gripper{position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:var(--spacing-xs);border:none;background:transparent;border-radius:var(--radius-sm);cursor:grab;flex-shrink:0;color:var(--color-icon-subtle)}.ds-table-row-cell__gripper:active{cursor:grabbing}.ds-table-row-cell__gripper:focus{outline:none}.ds-table-row-cell__gripper:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-table-row-cell__gripper:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);pointer-events:none;opacity:0;background:var(--overlay-hovered);transition:opacity .12s ease}.ds-table-row-cell__gripper:hover:after{opacity:1}.ds-table-row-cell__gripper:active:after{background:var(--overlay-pressed);opacity:1}.ds-table-row-cell__gripper .ds-icon{font-size:20px;width:20px;height:20px}.ds-table-row-cell__checkbox{display:flex;align-items:center;justify-content:center;width:42px;height:42px;flex-shrink:0;cursor:pointer}.ds-table-row-cell__checkbox .ds-icon{color:var(--color-border-input)}.ds-table-row-cell__checkbox--checked .ds-icon,.ds-table-row-cell__checkbox--indeterminate .ds-icon{color:var(--color-surface-brand-bold)}.ds-table-row-cell__data{font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typescale-body-medium-weight);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1 0 0;min-width:0}.ds-table-row-cell__data--right{flex:0 1 auto}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTableRowCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-table-row-cell', standalone: true, imports: [CommonModule], changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        'role': 'gridcell',
                    }, template: "<div\n  class=\"ds-table-row-cell\"\n  [class.is-hovered]=\"state === 'hover'\"\n  [class.is-focused]=\"state === 'focus'\"\n>\n  <div\n    class=\"ds-table-row-cell__content\"\n    [class.ds-table-row-cell__content--right]=\"align === 'right'\"\n  >\n    <!-- Tier indent spacers (tree / grouped rows) -->\n    <span *ngIf=\"tier1Indent\" class=\"ds-table-row-cell__indent--tier1\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"tier2Indent\" class=\"ds-table-row-cell__indent--tier2\" aria-hidden=\"true\"></span>\n\n    <!-- Row drag gripper -->\n    <button\n      *ngIf=\"gripper\"\n      type=\"button\"\n      class=\"ds-table-row-cell__gripper\"\n      aria-label=\"Drag to reorder row\"\n    >\n      <span class=\"ds-icon\">drag_indicator</span>\n    </button>\n\n    <!-- Row selection checkbox -->\n    <div\n      *ngIf=\"checkbox\"\n      class=\"ds-table-row-cell__checkbox\"\n      [class]=\"checkboxClass\"\n    >\n      <span\n        class=\"ds-icon\"\n        [class.ds-icon--filled]=\"checked || indeterminate\"\n      >{{ checkboxIcon }}</span>\n    </div>\n\n    <!-- Cell data text -->\n    <span\n      *ngIf=\"cellData\"\n      class=\"ds-table-row-cell__data\"\n      [class.ds-table-row-cell__data--right]=\"align === 'right'\"\n    >{{ displayValue }}</span>\n\n  </div>\n</div>\n", styles: [".ds-table-row-cell{display:flex;align-items:center;height:56px;width:100%;padding:0 var(--spacing-lg);border-bottom:1px solid var(--color-border-subtle);box-sizing:border-box;overflow:hidden;position:relative;background:transparent;transition:background 80ms ease}.ds-table-row-cell--checkbox-only{width:56px;flex-shrink:0;padding:0}.ds-table-row-cell--totals{background:var(--color-surface-subtle);border-bottom:none}.ds-table-row-cell.is-hovered{background:var(--overlay-hovered)}.ds-table-row-cell.is-focused{background:var(--overlay-focused)}.ds-table-row-cell.is-selected{background:var(--overlay-selected)}.ds-table-row-cell__content{display:flex;align-items:center;gap:var(--spacing-sm);flex:1 0 0;min-width:0;height:100%}.ds-table-row-cell__content--right{justify-content:flex-end}.ds-table-row-cell__indent--tier1{width:32px;flex-shrink:0}.ds-table-row-cell__indent--tier2{width:64px;flex-shrink:0}.ds-table-row-cell__gripper{position:relative;display:flex;align-items:center;justify-content:center;width:32px;height:32px;padding:var(--spacing-xs);border:none;background:transparent;border-radius:var(--radius-sm);cursor:grab;flex-shrink:0;color:var(--color-icon-subtle)}.ds-table-row-cell__gripper:active{cursor:grabbing}.ds-table-row-cell__gripper:focus{outline:none}.ds-table-row-cell__gripper:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-table-row-cell__gripper:after{content:\"\";position:absolute;inset:0;border-radius:var(--radius-sm);pointer-events:none;opacity:0;background:var(--overlay-hovered);transition:opacity .12s ease}.ds-table-row-cell__gripper:hover:after{opacity:1}.ds-table-row-cell__gripper:active:after{background:var(--overlay-pressed);opacity:1}.ds-table-row-cell__gripper .ds-icon{font-size:20px;width:20px;height:20px}.ds-table-row-cell__checkbox{display:flex;align-items:center;justify-content:center;width:42px;height:42px;flex-shrink:0;cursor:pointer}.ds-table-row-cell__checkbox .ds-icon{color:var(--color-border-input)}.ds-table-row-cell__checkbox--checked .ds-icon,.ds-table-row-cell__checkbox--indeterminate .ds-icon{color:var(--color-surface-brand-bold)}.ds-table-row-cell__data{font-family:var(--ref-typescale-body-medium-font);font-size:var(--ref-typescale-body-medium-size);font-weight:var(--ref-typescale-body-medium-weight);line-height:var(--ref-typescale-body-medium-line-height);letter-spacing:var(--ref-typescale-body-medium-tracking);color:var(--color-text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1 0 0;min-width:0}.ds-table-row-cell__data--right{flex:0 1 auto}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { value: [{
                type: Input
            }], align: [{
                type: Input
            }], cellData: [{
                type: Input
            }], gripper: [{
                type: Input
            }], checkbox: [{
                type: Input
            }], checked: [{
                type: Input
            }], indeterminate: [{
                type: Input
            }], tier1Indent: [{
                type: Input
            }], tier2Indent: [{
                type: Input
            }], state: [{
                type: Input
            }], isHovered: [{
                type: HostBinding,
                args: ['class.is-hovered']
            }], isFocused: [{
                type: HostBinding,
                args: ['class.is-focused']
            }], isSelected: [{
                type: HostBinding,
                args: ['class.is-selected']
            }] } });

/**
 * Onflo Design System — Table Toolbar
 *
 * The toolbar displayed above an AG Grid table — contains search, filter,
 * settings, and optional action controls.
 *
 * Layout:
 *   [Left panel: action buttons] [Right panel: search · extras · filter · settings · download]
 *
 * When showActions is false, the right panel expands to fill the full width.
 *
 * Content projection slots:
 *   toolbar-actions  — left-side action buttons (shown only when showActions=true)
 *   toolbar-extra    — right-side extras between the search field and the fixed icon buttons
 *   toolbar-trailing — right-side buttons after settings (replaces or augments download)
 *
 * @example
 *   <!-- Full toolbar with actions -->
 *   <ds-table-toolbar [(filterActive)]="filterOpen" [(settingsActive)]="colsOpen">
 *     <ng-container toolbar-actions>
 *       <button ds-button variant="filled">Add Row</button>
 *       <button ds-button variant="outlined">Import</button>
 *     </ng-container>
 *   </ds-table-toolbar>
 *
 *   <!-- Search-only (no action panel) -->
 *   <ds-table-toolbar [showActions]="false" (searchValueChange)="onSearch($event)" />
 *
 *   <!-- Custom trailing button, no download -->
 *   <ds-table-toolbar [showDownload]="false">
 *     <ng-container toolbar-trailing>
 *       <button class="ds-table-toolbar__btn" type="button" aria-label="Export">
 *         <span class="ds-icon">upload_file</span>
 *       </button>
 *     </ng-container>
 *   </ds-table-toolbar>
 *
 * ADA:
 *   Filter and settings buttons expose aria-pressed for screen readers.
 *   Download and trailing buttons require aria-label on the projected elements.
 */
class DsTableToolbarComponent {
    /** Show the left-side action button panel. Default: true. */
    showActions = true;
    /** Placeholder text shown in the search field when empty. */
    searchPlaceholder = 'Search';
    /** Accessible label for the search field. */
    searchAriaLabel = 'Search';
    /** Current search field value. Use [(searchValue)] for two-way binding. */
    searchValue = '';
    /** Whether the filter toggle button is in the active/selected state. */
    filterActive = false;
    /** Whether the settings toggle button is in the active/selected state. */
    settingsActive = false;
    /** Show the download icon button. Default: true. */
    showDownload = true;
    /** Emits the new search value on every keystroke. */
    searchValueChange = new EventEmitter();
    /** Emits the current search value when the user presses Enter. */
    search = new EventEmitter();
    /** Emits the new filterActive state when the filter button is toggled. */
    filterActiveChange = new EventEmitter();
    /** Emits the new settingsActive state when the settings button is toggled. */
    settingsActiveChange = new EventEmitter();
    /** Emits when the download button is clicked. */
    downloadClick = new EventEmitter();
    onSearchValueChange(value) {
        this.searchValue = value;
        this.searchValueChange.emit(value);
    }
    onFilterSelectedChange(selected) {
        this.filterActive = selected;
        this.filterActiveChange.emit(selected);
    }
    onSettingsSelectedChange(selected) {
        this.settingsActive = selected;
        this.settingsActiveChange.emit(selected);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTableToolbarComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTableToolbarComponent, isStandalone: true, selector: "ds-table-toolbar", inputs: { showActions: "showActions", searchPlaceholder: "searchPlaceholder", searchAriaLabel: "searchAriaLabel", searchValue: "searchValue", filterActive: "filterActive", settingsActive: "settingsActive", showDownload: "showDownload" }, outputs: { searchValueChange: "searchValueChange", search: "search", filterActiveChange: "filterActiveChange", settingsActiveChange: "settingsActiveChange", downloadClick: "downloadClick" }, ngImport: i0, template: "<div class=\"ds-table-toolbar\">\n\n  <!-- Left panel \u2014 action buttons (hidden when showActions is false) -->\n  <div class=\"ds-table-toolbar__left\" *ngIf=\"showActions\">\n    <ng-content select=\"[toolbar-actions]\"></ng-content>\n  </div>\n\n  <!-- Right panel \u2014 search, optional extras, fixed icon buttons -->\n  <div class=\"ds-table-toolbar__right\">\n\n    <!-- Search field \u2014 grows to fill available space -->\n    <ds-search\n      [placeholder]=\"searchPlaceholder\"\n      [ariaLabel]=\"searchAriaLabel\"\n      [value]=\"searchValue\"\n      (valueChange)=\"onSearchValueChange($event)\"\n      (search)=\"search.emit($event)\"\n    ></ds-search>\n\n    <!-- Optional slot: extra filter chips, dropdowns, or buttons between search and icon buttons -->\n    <ng-content select=\"[toolbar-extra]\"></ng-content>\n\n    <!-- Filter toggle button \u2014 always present -->\n    <ds-icon-button-toggle\n      variant=\"outlined\"\n      [selected]=\"filterActive\"\n      (selectedChange)=\"onFilterSelectedChange($event)\"\n      ariaLabel=\"Toggle filters\"\n    >\n      <span class=\"ds-icon ds-icon--filled\">filter_alt</span>\n    </ds-icon-button-toggle>\n\n    <!-- Settings / column visibility toggle \u2014 always present -->\n    <ds-icon-button-toggle\n      variant=\"outlined\"\n      [selected]=\"settingsActive\"\n      (selectedChange)=\"onSettingsSelectedChange($event)\"\n      ariaLabel=\"Column settings\"\n    >\n      <span class=\"ds-icon ds-icon--filled\">settings</span>\n    </ds-icon-button-toggle>\n\n    <!-- Download button \u2014 shown by default, hide with [showDownload]=\"false\" -->\n    <ds-icon-button\n      *ngIf=\"showDownload\"\n      variant=\"outlined\"\n      ariaLabel=\"Download\"\n      (clicked)=\"downloadClick.emit()\"\n    >\n      <span class=\"ds-icon\">download</span>\n    </ds-icon-button>\n\n    <!-- Optional slot: trailing action buttons (replaces or supplements download) -->\n    <ng-content select=\"[toolbar-trailing]\"></ng-content>\n\n  </div>\n\n</div>\n", styles: [".ds-table-toolbar{display:flex;align-items:center;gap:var(--spacing-xl);height:74px;padding:0 var(--spacing-lg);background:var(--color-surface-page)}.ds-table-toolbar__left,.ds-table-toolbar__right{display:flex;align-items:center;gap:var(--spacing-sm);flex:1 0 0;min-width:0}.ds-table-toolbar ds-search,.ds-table-toolbar .ds-search{flex:1 0 0;min-width:0}.ds-table-toolbar__btn{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:42px;height:42px;padding:var(--spacing-xs);background:var(--color-surface-page);border:1px solid var(--color-border-primary);border-radius:var(--radius-sm);color:var(--color-icon-default);cursor:pointer;position:relative;overflow:hidden;transition:background .12s ease,border-color .12s ease,box-shadow .12s ease,color .12s ease}.ds-table-toolbar__btn:focus{outline:none}.ds-table-toolbar__btn:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover);color:var(--color-icon-brand)}.ds-table-toolbar__btn:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);color:var(--color-icon-brand);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-table-toolbar__btn:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active);color:var(--color-icon-brand)}.ds-table-toolbar__btn:disabled{color:var(--color-icon-disabled);border-color:var(--color-border-subtle);cursor:not-allowed}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: DsSearchComponent, selector: "ds-search", inputs: ["ariaLabel", "placeholder", "value", "leadingIcon", "disabled"], outputs: ["valueChange", "search", "cleared"] }, { kind: "component", type: DsIconButtonComponent, selector: "ds-icon-button", inputs: ["variant", "size", "ariaLabel", "isError", "disabled", "type"], outputs: ["clicked"] }, { kind: "component", type: DsIconButtonToggleComponent, selector: "ds-icon-button-toggle", inputs: ["variant", "size", "ariaLabel", "selected", "disabled", "type"], outputs: ["selectedChange", "clicked"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTableToolbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-table-toolbar', standalone: true, imports: [CommonModule, DsSearchComponent, DsIconButtonComponent, DsIconButtonToggleComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ds-table-toolbar\">\n\n  <!-- Left panel \u2014 action buttons (hidden when showActions is false) -->\n  <div class=\"ds-table-toolbar__left\" *ngIf=\"showActions\">\n    <ng-content select=\"[toolbar-actions]\"></ng-content>\n  </div>\n\n  <!-- Right panel \u2014 search, optional extras, fixed icon buttons -->\n  <div class=\"ds-table-toolbar__right\">\n\n    <!-- Search field \u2014 grows to fill available space -->\n    <ds-search\n      [placeholder]=\"searchPlaceholder\"\n      [ariaLabel]=\"searchAriaLabel\"\n      [value]=\"searchValue\"\n      (valueChange)=\"onSearchValueChange($event)\"\n      (search)=\"search.emit($event)\"\n    ></ds-search>\n\n    <!-- Optional slot: extra filter chips, dropdowns, or buttons between search and icon buttons -->\n    <ng-content select=\"[toolbar-extra]\"></ng-content>\n\n    <!-- Filter toggle button \u2014 always present -->\n    <ds-icon-button-toggle\n      variant=\"outlined\"\n      [selected]=\"filterActive\"\n      (selectedChange)=\"onFilterSelectedChange($event)\"\n      ariaLabel=\"Toggle filters\"\n    >\n      <span class=\"ds-icon ds-icon--filled\">filter_alt</span>\n    </ds-icon-button-toggle>\n\n    <!-- Settings / column visibility toggle \u2014 always present -->\n    <ds-icon-button-toggle\n      variant=\"outlined\"\n      [selected]=\"settingsActive\"\n      (selectedChange)=\"onSettingsSelectedChange($event)\"\n      ariaLabel=\"Column settings\"\n    >\n      <span class=\"ds-icon ds-icon--filled\">settings</span>\n    </ds-icon-button-toggle>\n\n    <!-- Download button \u2014 shown by default, hide with [showDownload]=\"false\" -->\n    <ds-icon-button\n      *ngIf=\"showDownload\"\n      variant=\"outlined\"\n      ariaLabel=\"Download\"\n      (clicked)=\"downloadClick.emit()\"\n    >\n      <span class=\"ds-icon\">download</span>\n    </ds-icon-button>\n\n    <!-- Optional slot: trailing action buttons (replaces or supplements download) -->\n    <ng-content select=\"[toolbar-trailing]\"></ng-content>\n\n  </div>\n\n</div>\n", styles: [".ds-table-toolbar{display:flex;align-items:center;gap:var(--spacing-xl);height:74px;padding:0 var(--spacing-lg);background:var(--color-surface-page)}.ds-table-toolbar__left,.ds-table-toolbar__right{display:flex;align-items:center;gap:var(--spacing-sm);flex:1 0 0;min-width:0}.ds-table-toolbar ds-search,.ds-table-toolbar .ds-search{flex:1 0 0;min-width:0}.ds-table-toolbar__btn{appearance:none;-webkit-appearance:none;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:42px;height:42px;padding:var(--spacing-xs);background:var(--color-surface-page);border:1px solid var(--color-border-primary);border-radius:var(--radius-sm);color:var(--color-icon-default);cursor:pointer;position:relative;overflow:hidden;transition:background .12s ease,border-color .12s ease,box-shadow .12s ease,color .12s ease}.ds-table-toolbar__btn:focus{outline:none}.ds-table-toolbar__btn:hover:not(:disabled){background:var(--overlay-hovered);border-color:var(--color-border-input-hover);color:var(--color-icon-brand)}.ds-table-toolbar__btn:focus-visible{background:var(--overlay-focused);border-color:var(--color-border-input-active);color:var(--color-icon-brand);box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-table-toolbar__btn:active:not(:disabled){background:var(--overlay-pressed);border-color:var(--color-border-active);color:var(--color-icon-brand)}.ds-table-toolbar__btn:disabled{color:var(--color-icon-disabled);border-color:var(--color-border-subtle);cursor:not-allowed}\n"] }]
        }], propDecorators: { showActions: [{
                type: Input
            }], searchPlaceholder: [{
                type: Input
            }], searchAriaLabel: [{
                type: Input
            }], searchValue: [{
                type: Input
            }], filterActive: [{
                type: Input
            }], settingsActive: [{
                type: Input
            }], showDownload: [{
                type: Input
            }], searchValueChange: [{
                type: Output
            }], search: [{
                type: Output
            }], filterActiveChange: [{
                type: Output
            }], settingsActiveChange: [{
                type: Output
            }], downloadClick: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Tabs
 *
 * Based on Angular Material mat-tab-group / mat-tab.
 * Import MatTabsModule in your Angular module.
 * See: https://material.angular.io/components/tabs/overview
 *
 * Figma: component/page-tab (label only). Height: 48px fixed.
 * Selected state is indicated by a 2px brand-blue bottom bar.
 * Badge is a 6px notification dot (not a count) — use [showBadge]="true".
 *
 * ADA: role="tablist" / role="tab" / aria-selected managed by mat-tab-group.
 *      Arrow key, Home, End navigation handled by mat-tab-group internally.
 *
 * @example
 *   <ds-tabs>
 *     <ds-tab label="Overview">Overview content here</ds-tab>
 *     <ds-tab label="Details" [showBadge]="true">Details content</ds-tab>
 *     <ds-tab label="Settings" [disabled]="true">Settings content</ds-tab>
 *   </ds-tabs>
 */
class DsTabComponent {
    /** Tab label text. */
    label = '';
    /** Show the 6px red notification dot next to the label. */
    showBadge = false;
    /** Material Symbol icon name shown before the label (optional). */
    icon = '';
    /** Disables the tab. */
    disabled = false;
    /** TemplateRef capturing projected body content — read by DsTabsComponent. */
    contentRef;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTabComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTabComponent, isStandalone: true, selector: "ds-tab", inputs: { label: "label", showBadge: "showBadge", icon: "icon", disabled: "disabled" }, viewQueries: [{ propertyName: "contentRef", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: `<ng-template><ng-content /></ng-template>`, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTabComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ds-tab',
                    standalone: true,
                    imports: [],
                    // Wraps projected body content in a TemplateRef so DsTabsComponent can forward
                    // it into the corresponding mat-tab via *ngTemplateOutlet.
                    template: `<ng-template><ng-content /></ng-template>`,
                }]
        }], propDecorators: { label: [{
                type: Input
            }], showBadge: [{
                type: Input
            }], icon: [{
                type: Input
            }], disabled: [{
                type: Input
            }], contentRef: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }] } });
class DsTabsComponent {
    cdr;
    tabs;
    /** Index of the currently active tab. */
    activeIndex = 0;
    /** Emits the index of the newly selected tab. */
    tabChange = new EventEmitter();
    constructor(cdr) {
        this.cdr = cdr;
    }
    ngAfterContentInit() {
        const first = this.tabs.toArray().findIndex(t => !t.disabled);
        this.activeIndex = first >= 0 ? first : 0;
        this.cdr.markForCheck();
    }
    onTabChange(index) {
        this.activeIndex = index;
        this.tabChange.emit(index);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTabsComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTabsComponent, isStandalone: true, selector: "ds-tabs", outputs: { tabChange: "tabChange" }, queries: [{ propertyName: "tabs", predicate: DsTabComponent }], ngImport: i0, template: "<mat-tab-group\n  [selectedIndex]=\"activeIndex\"\n  [disableRipple]=\"true\"\n  [dynamicHeight]=\"true\"\n  animationDuration=\"0ms\"\n  (selectedIndexChange)=\"onTabChange($event)\"\n>\n  <mat-tab\n    *ngFor=\"let tab of tabs.toArray()\"\n    [disabled]=\"tab.disabled\"\n  >\n    <ng-template mat-tab-label>\n      <span *ngIf=\"tab.icon\" class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">{{ tab.icon }}</span>\n      {{ tab.label }}\n      <span *ngIf=\"tab.showBadge\" class=\"ds-tabs__dot\" aria-label=\"New notification\"></span>\n    </ng-template>\n    <div class=\"ds-tabs__panel\">\n      <ng-container *ngTemplateOutlet=\"tab.contentRef\"></ng-container>\n    </div>\n  </mat-tab>\n</mat-tab-group>\n", styles: [".ds-tabs{display:flex;align-items:flex-end;border-bottom:1px solid var(--color-border-subtle);gap:0;position:relative}.ds-tabs__tab{appearance:none;border:none;background:transparent;display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-xs);min-width:56px;height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:.25px;color:var(--color-text-primary);white-space:nowrap;text-decoration:none;border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden;position:relative;cursor:pointer;transition:background .15s ease}.ds-tabs__tab:focus{outline:none}.ds-tabs__tab:hover:not(.is-disabled):not(.is-selected){background:var(--overlay-hovered)}.ds-tabs__tab:hover:not(.is-disabled).is-selected{background:var(--overlay-hovered)}.ds-tabs__tab:focus-visible{outline:none;box-shadow:0 0 0 3px var(--color-border-ada-focus-ring);z-index:1}.ds-tabs__tab:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-tabs__tab.is-disabled{color:var(--color-text-disabled);cursor:not-allowed;pointer-events:none}.ds-tabs__tab.is-selected:after{content:\"\";position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--color-surface-nav-active);border-radius:0}.ds-tabs__dot{display:inline-block;width:6px;height:6px;border-radius:var(--radius-full);background:var(--color-surface-accent-red-bold);flex-shrink:0}.ds-tabs__panel{padding:var(--spacing-xl) 0;color:var(--color-text-primary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size, 14px);line-height:var(--ref-typescale-body-medium-line-height, 20px)}.mat-mdc-tab-group{--mdc-tab-indicator-active-indicator-color: var(--color-surface-nav-active);--mdc-tab-indicator-active-indicator-height: 2px;--mat-tab-header-label-text-font: var(--ref-typeface-brand);--mat-tab-header-label-text-size: var(--ref-typescale-label-medium-size);--mat-tab-header-label-text-weight: var(--ref-typeface-weight-bold);--mat-tab-header-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-tab-header-inactive-label-text-color: var(--color-text-primary);--mat-tab-header-active-label-text-color: var(--color-text-primary);--mat-tab-header-inactive-hover-label-text-color: var(--color-text-primary);--mat-tab-header-active-hover-label-text-color: var(--color-text-primary);--mat-tab-header-inactive-focus-label-text-color: var(--color-text-primary);--mat-tab-header-active-focus-label-text-color: var(--color-text-primary);--mat-tab-header-divider-color: var(--color-border-subtle);--mat-tab-header-divider-height: 1px;--mat-tab-header-hover-state-layer-opacity: 0;--mat-tab-header-focus-state-layer-opacity: 0;--mat-tab-header-inactive-ripple-color: transparent;--mat-tab-header-active-ripple-color: transparent}.mat-mdc-tab.mat-mdc-tab-disabled{--mat-tab-header-inactive-label-text-color: var(--color-text-disabled)}.mat-mdc-tab{min-width:56px;min-height:48px;padding:var(--spacing-md) var(--spacing-lg);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden;transition:background .15s ease}.mat-mdc-tab:focus{outline:none}.mat-mdc-tab:focus-visible{outline:none;box-shadow:0 0 0 3px var(--color-border-ada-focus-ring);z-index:1}.mat-mdc-tab:hover:not(.mat-mdc-tab-disabled){background:var(--overlay-hovered)}.mat-mdc-tab:active:not(.mat-mdc-tab-disabled){background:var(--overlay-pressed)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "ngmodule", type: MatTabsModule }, { kind: "directive", type: i2$7.MatTabLabel, selector: "[mat-tab-label], [matTabLabel]" }, { kind: "component", type: i2$7.MatTab, selector: "mat-tab", inputs: ["disabled", "label", "aria-label", "aria-labelledby", "labelClass", "bodyClass", "id"], exportAs: ["matTab"] }, { kind: "component", type: i2$7.MatTabGroup, selector: "mat-tab-group", inputs: ["color", "fitInkBarToContent", "mat-stretch-tabs", "mat-align-tabs", "dynamicHeight", "selectedIndex", "headerPosition", "animationDuration", "contentTabIndex", "disablePagination", "disableRipple", "preserveContent", "backgroundColor", "aria-label", "aria-labelledby"], outputs: ["selectedIndexChange", "focusChange", "animationDone", "selectedTabChange"], exportAs: ["matTabGroup"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTabsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-tabs', standalone: true, imports: [CommonModule, MatTabsModule, DsTabComponent], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-tab-group\n  [selectedIndex]=\"activeIndex\"\n  [disableRipple]=\"true\"\n  [dynamicHeight]=\"true\"\n  animationDuration=\"0ms\"\n  (selectedIndexChange)=\"onTabChange($event)\"\n>\n  <mat-tab\n    *ngFor=\"let tab of tabs.toArray()\"\n    [disabled]=\"tab.disabled\"\n  >\n    <ng-template mat-tab-label>\n      <span *ngIf=\"tab.icon\" class=\"ds-icon ds-icon--sm\" aria-hidden=\"true\">{{ tab.icon }}</span>\n      {{ tab.label }}\n      <span *ngIf=\"tab.showBadge\" class=\"ds-tabs__dot\" aria-label=\"New notification\"></span>\n    </ng-template>\n    <div class=\"ds-tabs__panel\">\n      <ng-container *ngTemplateOutlet=\"tab.contentRef\"></ng-container>\n    </div>\n  </mat-tab>\n</mat-tab-group>\n", styles: [".ds-tabs{display:flex;align-items:flex-end;border-bottom:1px solid var(--color-border-subtle);gap:0;position:relative}.ds-tabs__tab{appearance:none;border:none;background:transparent;display:inline-flex;align-items:center;justify-content:center;gap:var(--spacing-xs);min-width:56px;height:48px;padding:var(--spacing-md) var(--spacing-lg);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-bold);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:.25px;color:var(--color-text-primary);white-space:nowrap;text-decoration:none;border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden;position:relative;cursor:pointer;transition:background .15s ease}.ds-tabs__tab:focus{outline:none}.ds-tabs__tab:hover:not(.is-disabled):not(.is-selected){background:var(--overlay-hovered)}.ds-tabs__tab:hover:not(.is-disabled).is-selected{background:var(--overlay-hovered)}.ds-tabs__tab:focus-visible{outline:none;box-shadow:0 0 0 3px var(--color-border-ada-focus-ring);z-index:1}.ds-tabs__tab:active:not(.is-disabled){background:var(--overlay-pressed)}.ds-tabs__tab.is-disabled{color:var(--color-text-disabled);cursor:not-allowed;pointer-events:none}.ds-tabs__tab.is-selected:after{content:\"\";position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--color-surface-nav-active);border-radius:0}.ds-tabs__dot{display:inline-block;width:6px;height:6px;border-radius:var(--radius-full);background:var(--color-surface-accent-red-bold);flex-shrink:0}.ds-tabs__panel{padding:var(--spacing-xl) 0;color:var(--color-text-primary);font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-body-medium-size, 14px);line-height:var(--ref-typescale-body-medium-line-height, 20px)}.mat-mdc-tab-group{--mdc-tab-indicator-active-indicator-color: var(--color-surface-nav-active);--mdc-tab-indicator-active-indicator-height: 2px;--mat-tab-header-label-text-font: var(--ref-typeface-brand);--mat-tab-header-label-text-size: var(--ref-typescale-label-medium-size);--mat-tab-header-label-text-weight: var(--ref-typeface-weight-bold);--mat-tab-header-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mat-tab-header-inactive-label-text-color: var(--color-text-primary);--mat-tab-header-active-label-text-color: var(--color-text-primary);--mat-tab-header-inactive-hover-label-text-color: var(--color-text-primary);--mat-tab-header-active-hover-label-text-color: var(--color-text-primary);--mat-tab-header-inactive-focus-label-text-color: var(--color-text-primary);--mat-tab-header-active-focus-label-text-color: var(--color-text-primary);--mat-tab-header-divider-color: var(--color-border-subtle);--mat-tab-header-divider-height: 1px;--mat-tab-header-hover-state-layer-opacity: 0;--mat-tab-header-focus-state-layer-opacity: 0;--mat-tab-header-inactive-ripple-color: transparent;--mat-tab-header-active-ripple-color: transparent}.mat-mdc-tab.mat-mdc-tab-disabled{--mat-tab-header-inactive-label-text-color: var(--color-text-disabled)}.mat-mdc-tab{min-width:56px;min-height:48px;padding:var(--spacing-md) var(--spacing-lg);border-radius:var(--radius-sm) var(--radius-sm) 0 0;overflow:hidden;transition:background .15s ease}.mat-mdc-tab:focus{outline:none}.mat-mdc-tab:focus-visible{outline:none;box-shadow:0 0 0 3px var(--color-border-ada-focus-ring);z-index:1}.mat-mdc-tab:hover:not(.mat-mdc-tab-disabled){background:var(--overlay-hovered)}.mat-mdc-tab:active:not(.mat-mdc-tab-disabled){background:var(--overlay-pressed)}\n"] }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { tabs: [{
                type: ContentChildren,
                args: [DsTabComponent]
            }], tabChange: [{
                type: Output
            }] } });

/**
 * ds-tag
 *
 * Navy pill chip for showing applied tags/filters. Use instead of ds-chip
 * when the design calls for a navy background with primary-text colour.
 *
 * Variants:
 *   default — removable tag (set [removable]="false" for read-only / display-only)
 *   more    — overflow count chip (e.g. "+2") — emits (moreClick)
 *   add     — dashed-border action button to create a new tag — emits (add)
 *
 * @example
 * <ds-tag label="Design" (removed)="onRemove()" />
 * <ds-tag label="Read only" [removable]="false" />
 * <ds-tag variant="more" [moreCount]="3" (moreClick)="onShowMore()" />
 * <ds-tag variant="add" (add)="onAddTag()" />
 * <ds-tag label="Design" size="sm" (removed)="onRemove()" />
 */
class DsTagComponent {
    label = '';
    variant = 'default';
    size = 'md';
    moreCount = 0;
    removable = true;
    disabled = false;
    error = false;
    removed = new EventEmitter();
    moreClick = new EventEmitter();
    add = new EventEmitter();
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTagComponent, isStandalone: true, selector: "ds-tag", inputs: { label: "label", variant: "variant", size: "size", moreCount: "moreCount", removable: "removable", disabled: "disabled", error: "error" }, outputs: { removed: "removed", moreClick: "moreClick", add: "add" }, ngImport: i0, template: "<!-- Default variant \u2014 removable or read-only tag -->\n<mat-chip\n  *ngIf=\"variant === 'default'\"\n  class=\"ds-tag\"\n  [class.ds-tag--sm]=\"size === 'sm'\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [disabled]=\"disabled\"\n  (removed)=\"removed.emit()\"\n>\n  <span class=\"ds-tag__label\">{{ label }}</span>\n  <button\n    *ngIf=\"removable\"\n    matChipRemove\n    class=\"ds-tag__remove\"\n    [attr.aria-label]=\"'Remove ' + label\"\n  >\n    <span class=\"ds-icon ds-icon--xs\">close</span>\n  </button>\n</mat-chip>\n\n<!-- More variant \u2014 overflow count -->\n<button\n  *ngIf=\"variant === 'more'\"\n  type=\"button\"\n  class=\"ds-tag ds-tag--more\"\n  [class.ds-tag--sm]=\"size === 'sm'\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [disabled]=\"disabled\"\n  [attr.aria-label]=\"'Show ' + moreCount + ' more tags'\"\n  (click)=\"moreClick.emit()\"\n>\n  <span class=\"ds-tag__label\">+{{ moreCount }}</span>\n</button>\n\n<!-- Add variant \u2014 create a new tag -->\n<button\n  *ngIf=\"variant === 'add'\"\n  type=\"button\"\n  class=\"ds-tag ds-tag--add\"\n  [class.ds-tag--sm]=\"size === 'sm'\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [disabled]=\"disabled\"\n  aria-label=\"Add tag\"\n  (click)=\"add.emit()\"\n>\n  <span class=\"ds-tag__label\">+ tag</span>\n</button>\n", styles: [".ds-tag{display:inline-flex;align-items:center;gap:var(--spacing-xs);height:32px;padding:0 var(--spacing-md);background:var(--color-surface-accent-navy);border:1px solid transparent;border-radius:var(--radius-full);font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-primary);cursor:default;overflow:hidden;position:relative}.ds-tag:after{content:\"\";position:absolute;inset:0;pointer-events:none}.ds-tag--sm{height:24px;padding:0 var(--spacing-sm)}.ds-tag:focus{outline:none}.ds-tag:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-tag:hover:not(.is-disabled):not(.is-error){border-color:var(--color-border-hover)}.ds-tag:hover:not(.is-disabled):not(.is-error):after{background:var(--overlay-hovered)}.ds-tag:active:not(.is-disabled):not(.is-error){border-color:var(--color-border-active)}.ds-tag:active:not(.is-disabled):not(.is-error):after{background:var(--overlay-pressed)}.ds-tag.is-error{background:var(--color-surface-error);color:var(--color-text-error)}.ds-tag.is-error .ds-tag__remove{color:var(--color-icon-error)}.ds-tag.is-disabled{background:var(--color-surface-disabled);color:var(--color-text-disabled);pointer-events:none}.ds-tag.is-disabled .ds-tag__remove{color:var(--color-icon-disabled)}.ds-tag--more{cursor:pointer}.ds-tag--add{background:transparent;border-style:dashed;border-color:var(--color-border-primary);cursor:pointer;appearance:none}.ds-tag--add:hover:not(:disabled):not(.is-disabled):not(.is-error){border-style:solid;border-color:var(--color-border-hover)}.ds-tag--add:hover:not(:disabled):not(.is-disabled):not(.is-error):after{background:var(--overlay-hovered)}.ds-tag--add:active:not(:disabled):not(.is-disabled):not(.is-error){border-style:solid;border-color:var(--color-border-active)}.ds-tag--add:active:not(:disabled):not(.is-disabled):not(.is-error):after{background:var(--overlay-pressed)}.ds-tag--add:disabled,.ds-tag--add.is-disabled{background:transparent;border-color:var(--color-border-subtle);color:var(--color-text-disabled);pointer-events:none}.ds-tag--add.is-error{background:transparent;border-style:dashed;border-color:var(--color-border-input-error);color:var(--color-text-error)}.ds-tag__label{white-space:nowrap;position:relative;z-index:1}.ds-tag__remove{appearance:none;border:none;background:transparent;padding:0;width:18px;height:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-default);border-radius:var(--radius-full);flex-shrink:0;position:relative;z-index:1;transition:background .12s}.ds-tag__remove:hover{background:var(--overlay-hovered)}.ds-tag__remove:focus{outline:none}.ds-tag__remove:focus-visible{box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-tag-list{display:flex;flex-wrap:wrap;gap:var(--spacing-xs);align-items:center}.ds-tag.mat-mdc-chip{--mdc-chip-container-height: 32px;--mdc-chip-container-shape: var(--radius-full);--mdc-chip-flat-container-color: var(--color-surface-accent-navy);--mdc-chip-outline-color: transparent;--mdc-chip-label-text-color: var(--color-text-primary);--mdc-chip-label-text-font: var(--ref-typescale-label-medium-font);--mdc-chip-label-text-size: var(--ref-typescale-label-medium-size);--mdc-chip-label-text-weight: var(--ref-typescale-label-medium-weight-prominent);--mdc-chip-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mdc-chip-label-text-tracking: var(--ref-typescale-label-medium-tracking);--mat-chip-trailing-action-color: var(--color-icon-default);--mat-chip-disabled-trailing-action-color: var(--color-icon-disabled);--mat-chip-hover-state-layer-opacity: 0;--mat-chip-focus-state-layer-opacity: 0;--mat-chip-selected-state-layer-opacity: 0;--mdc-chip-disabled-label-text-color: var(--color-text-disabled)}.ds-tag.mat-mdc-chip.ds-tag--sm{--mdc-chip-container-height: 24px}.ds-tag.mat-mdc-chip:hover:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-hover)}.ds-tag.mat-mdc-chip:active:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-active)}.ds-tag.mat-mdc-chip.is-error{--mdc-chip-flat-container-color: var(--color-surface-error);--mdc-chip-outline-color: transparent;--mdc-chip-label-text-color: var(--color-text-error);--mat-chip-trailing-action-color: var(--color-icon-error)}.ds-tag.mat-mdc-chip.is-disabled,.ds-tag.mat-mdc-chip.mat-mdc-chip-disabled{--mdc-chip-flat-container-color: var(--color-surface-disabled);--mdc-chip-label-text-color: var(--color-text-disabled)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatChipsModule }, { kind: "component", type: i2$3.MatChip, selector: "mat-basic-chip, [mat-basic-chip], mat-chip, [mat-chip]", inputs: ["role", "id", "aria-label", "aria-description", "value", "color", "removable", "highlighted", "disableRipple", "disabled"], outputs: ["removed", "destroyed"], exportAs: ["matChip"] }, { kind: "directive", type: i2$3.MatChipRemove, selector: "[matChipRemove]" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-tag', standalone: true, imports: [CommonModule, MatChipsModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- Default variant \u2014 removable or read-only tag -->\n<mat-chip\n  *ngIf=\"variant === 'default'\"\n  class=\"ds-tag\"\n  [class.ds-tag--sm]=\"size === 'sm'\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [disabled]=\"disabled\"\n  (removed)=\"removed.emit()\"\n>\n  <span class=\"ds-tag__label\">{{ label }}</span>\n  <button\n    *ngIf=\"removable\"\n    matChipRemove\n    class=\"ds-tag__remove\"\n    [attr.aria-label]=\"'Remove ' + label\"\n  >\n    <span class=\"ds-icon ds-icon--xs\">close</span>\n  </button>\n</mat-chip>\n\n<!-- More variant \u2014 overflow count -->\n<button\n  *ngIf=\"variant === 'more'\"\n  type=\"button\"\n  class=\"ds-tag ds-tag--more\"\n  [class.ds-tag--sm]=\"size === 'sm'\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [disabled]=\"disabled\"\n  [attr.aria-label]=\"'Show ' + moreCount + ' more tags'\"\n  (click)=\"moreClick.emit()\"\n>\n  <span class=\"ds-tag__label\">+{{ moreCount }}</span>\n</button>\n\n<!-- Add variant \u2014 create a new tag -->\n<button\n  *ngIf=\"variant === 'add'\"\n  type=\"button\"\n  class=\"ds-tag ds-tag--add\"\n  [class.ds-tag--sm]=\"size === 'sm'\"\n  [class.is-error]=\"error\"\n  [class.is-disabled]=\"disabled\"\n  [disabled]=\"disabled\"\n  aria-label=\"Add tag\"\n  (click)=\"add.emit()\"\n>\n  <span class=\"ds-tag__label\">+ tag</span>\n</button>\n", styles: [".ds-tag{display:inline-flex;align-items:center;gap:var(--spacing-xs);height:32px;padding:0 var(--spacing-md);background:var(--color-surface-accent-navy);border:1px solid transparent;border-radius:var(--radius-full);font-family:var(--ref-typescale-label-medium-font);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);letter-spacing:var(--ref-typescale-label-medium-tracking);color:var(--color-text-primary);cursor:default;overflow:hidden;position:relative}.ds-tag:after{content:\"\";position:absolute;inset:0;pointer-events:none}.ds-tag--sm{height:24px;padding:0 var(--spacing-sm)}.ds-tag:focus{outline:none}.ds-tag:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-tag:hover:not(.is-disabled):not(.is-error){border-color:var(--color-border-hover)}.ds-tag:hover:not(.is-disabled):not(.is-error):after{background:var(--overlay-hovered)}.ds-tag:active:not(.is-disabled):not(.is-error){border-color:var(--color-border-active)}.ds-tag:active:not(.is-disabled):not(.is-error):after{background:var(--overlay-pressed)}.ds-tag.is-error{background:var(--color-surface-error);color:var(--color-text-error)}.ds-tag.is-error .ds-tag__remove{color:var(--color-icon-error)}.ds-tag.is-disabled{background:var(--color-surface-disabled);color:var(--color-text-disabled);pointer-events:none}.ds-tag.is-disabled .ds-tag__remove{color:var(--color-icon-disabled)}.ds-tag--more{cursor:pointer}.ds-tag--add{background:transparent;border-style:dashed;border-color:var(--color-border-primary);cursor:pointer;appearance:none}.ds-tag--add:hover:not(:disabled):not(.is-disabled):not(.is-error){border-style:solid;border-color:var(--color-border-hover)}.ds-tag--add:hover:not(:disabled):not(.is-disabled):not(.is-error):after{background:var(--overlay-hovered)}.ds-tag--add:active:not(:disabled):not(.is-disabled):not(.is-error){border-style:solid;border-color:var(--color-border-active)}.ds-tag--add:active:not(:disabled):not(.is-disabled):not(.is-error):after{background:var(--overlay-pressed)}.ds-tag--add:disabled,.ds-tag--add.is-disabled{background:transparent;border-color:var(--color-border-subtle);color:var(--color-text-disabled);pointer-events:none}.ds-tag--add.is-error{background:transparent;border-style:dashed;border-color:var(--color-border-input-error);color:var(--color-text-error)}.ds-tag__label{white-space:nowrap;position:relative;z-index:1}.ds-tag__remove{appearance:none;border:none;background:transparent;padding:0;width:18px;height:18px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--color-icon-default);border-radius:var(--radius-full);flex-shrink:0;position:relative;z-index:1;transition:background .12s}.ds-tag__remove:hover{background:var(--overlay-hovered)}.ds-tag__remove:focus{outline:none}.ds-tag__remove:focus-visible{box-shadow:0 0 0 2px var(--color-border-ada-focus-ring)}.ds-tag-list{display:flex;flex-wrap:wrap;gap:var(--spacing-xs);align-items:center}.ds-tag.mat-mdc-chip{--mdc-chip-container-height: 32px;--mdc-chip-container-shape: var(--radius-full);--mdc-chip-flat-container-color: var(--color-surface-accent-navy);--mdc-chip-outline-color: transparent;--mdc-chip-label-text-color: var(--color-text-primary);--mdc-chip-label-text-font: var(--ref-typescale-label-medium-font);--mdc-chip-label-text-size: var(--ref-typescale-label-medium-size);--mdc-chip-label-text-weight: var(--ref-typescale-label-medium-weight-prominent);--mdc-chip-label-text-line-height: var(--ref-typescale-label-medium-line-height);--mdc-chip-label-text-tracking: var(--ref-typescale-label-medium-tracking);--mat-chip-trailing-action-color: var(--color-icon-default);--mat-chip-disabled-trailing-action-color: var(--color-icon-disabled);--mat-chip-hover-state-layer-opacity: 0;--mat-chip-focus-state-layer-opacity: 0;--mat-chip-selected-state-layer-opacity: 0;--mdc-chip-disabled-label-text-color: var(--color-text-disabled)}.ds-tag.mat-mdc-chip.ds-tag--sm{--mdc-chip-container-height: 24px}.ds-tag.mat-mdc-chip:hover:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-hover)}.ds-tag.mat-mdc-chip:active:not(.mat-mdc-chip-disabled):not(.is-error){--mdc-chip-outline-color: var(--color-border-active)}.ds-tag.mat-mdc-chip.is-error{--mdc-chip-flat-container-color: var(--color-surface-error);--mdc-chip-outline-color: transparent;--mdc-chip-label-text-color: var(--color-text-error);--mat-chip-trailing-action-color: var(--color-icon-error)}.ds-tag.mat-mdc-chip.is-disabled,.ds-tag.mat-mdc-chip.mat-mdc-chip-disabled{--mdc-chip-flat-container-color: var(--color-surface-disabled);--mdc-chip-label-text-color: var(--color-text-disabled)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], variant: [{
                type: Input
            }], size: [{
                type: Input
            }], moreCount: [{
                type: Input
            }], removable: [{
                type: Input
            }], disabled: [{
                type: Input
            }], error: [{
                type: Input
            }], removed: [{
                type: Output
            }], moreClick: [{
                type: Output
            }], add: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Textarea
 *
 * Based on Angular Material mat-form-field + matInput (appearance="outline", textarea).
 * Import MatFormFieldModule + MatInputModule in your Angular module.
 *
 * No fixed height — resizes vertically. Use ds-input for single-line fields.
 *
 * The host <ds-textarea> element acts as the .ds-textarea composite wrapper:
 *   - @HostBinding adds ds-textarea / is-error / is-disabled / is-readonly classes
 *   - data-mouse-focus suppression pattern (same as ds-input) — keyboard-only focus ring
 *
 * @example
 *   <ds-textarea label="Notes" placeholder="Add notes..." [(value)]="notes" />
 *   <ds-textarea label="Description" [isError]="true" errorText="Required field" />
 */
class DsTextareaComponent {
    el;
    // ── Host element bindings ─────────────────────────────────────────────────
    hostClass = true;
    get hostError() { return this.isError; }
    get hostDisabled() { return this.disabled; }
    get hostReadonly() { return this.readOnly; }
    constructor(el) {
        this.el = el;
    }
    // ── Composite wrapper focus ring — data-mouse-focus suppression ───────────
    onPointerDown() {
        this.el.nativeElement.setAttribute('data-mouse-focus', '');
    }
    onFocusOut() {
        this.el.nativeElement.removeAttribute('data-mouse-focus');
    }
    // ── Inputs ────────────────────────────────────────────────────────────────
    /** Label text shown above the field. */
    label = '';
    /** Marks the field as required (adds asterisk to label). */
    required = false;
    /** Placeholder text. */
    placeholder = '';
    /** Current value. Use [(value)] for two-way binding. */
    value = '';
    /** Number of rows. Default: 4 */
    rows = 4;
    /** Helper text shown below the field. */
    helperText = '';
    /** Error message shown below the field when isError is true. */
    errorText = '';
    /** Applies error styling and shows errorText. */
    isError = false;
    /** Disables the field. */
    disabled = false;
    /** Makes the field read-only. */
    readOnly = false;
    // ── Outputs ───────────────────────────────────────────────────────────────
    /** Emits the new value on every keystroke. */
    valueChange = new EventEmitter();
    // ── Internal ──────────────────────────────────────────────────────────────
    _textareaId = '';
    get textareaId() { return this._textareaId; }
    ngOnInit() {
        const slug = this.label.trim().toLowerCase().replace(/\s+/g, '-') || 'field';
        this._textareaId = `ds-textarea-${slug}-${Math.random().toString(36).slice(2)}`;
    }
    onInput(event) {
        this.value = event.target.value;
        this.valueChange.emit(this.value);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTextareaComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsTextareaComponent, isStandalone: true, selector: "ds-textarea", inputs: { label: "label", required: "required", placeholder: "placeholder", value: "value", rows: "rows", helperText: "helperText", errorText: "errorText", isError: "isError", disabled: "disabled", readOnly: "readOnly" }, outputs: { valueChange: "valueChange" }, host: { listeners: { "mousedown": "onPointerDown()", "touchstart": "onPointerDown()", "focusout": "onFocusOut()" }, properties: { "class.ds-textarea": "this.hostClass", "class.is-error": "this.hostError", "class.is-disabled": "this.hostDisabled", "class.is-readonly": "this.hostReadonly" } }, ngImport: i0, template: "<!-- External label \u2014 sits above the mat-form-field, not floating inside it -->\n<label *ngIf=\"label\" class=\"ds-textarea__label\" [for]=\"textareaId\">\n  {{ label }}<span *ngIf=\"required\" class=\"ds-textarea__required\" aria-hidden=\"true\">*</span>\n</label>\n\n<!-- mat-form-field owns the field box, border, and matInput textarea -->\n<mat-form-field\n  appearance=\"outline\"\n  subscriptSizing=\"dynamic\"\n  class=\"ds-textarea__field-wrapper\"\n>\n  <textarea\n    matInput\n    [id]=\"textareaId\"\n    [placeholder]=\"placeholder\"\n    [rows]=\"rows\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readOnly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"isError ? 'true' : null\"\n    [attr.aria-describedby]=\"(helperText || errorText) ? textareaId + '-helper' : null\"\n    (input)=\"onInput($event)\"\n  >{{ value }}</textarea>\n</mat-form-field>\n\n<!-- Helper / error text \u2014 external, below the field -->\n<span\n  *ngIf=\"(isError && errorText) || helperText\"\n  class=\"ds-textarea__helper\"\n  [id]=\"textareaId + '-helper'\"\n  [attr.role]=\"isError ? 'alert' : null\"\n>{{ isError && errorText ? errorText : helperText }}</span>\n", styles: [".ds-textarea{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-textarea__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-secondary);-webkit-user-select:none;user-select:none}.ds-textarea__required{color:var(--color-text-error);margin-left:2px}.ds-textarea__field{display:flex;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm);padding:var(--spacing-sm) var(--spacing-md);cursor:text;transition:border-color .15s ease,box-shadow .15s ease}.ds-textarea__field:hover{border-color:var(--color-border-input-hover)}.ds-textarea:focus-within .ds-textarea__field{border-color:var(--color-border-input-active)}.ds-textarea:focus-within:not([data-mouse-focus]) .ds-textarea__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea__control{flex:1;min-width:0;min-height:80px;border:none;outline:none;background:transparent;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:1.5;color:var(--color-text-primary);caret-color:var(--color-border-input-active);resize:vertical}.ds-textarea__control::placeholder{color:var(--color-text-placeholder)}.ds-textarea__control:disabled{cursor:not-allowed;resize:none}.ds-textarea__control[readonly]{cursor:default;resize:none}.ds-textarea__helper{font-family:var(--ref-typeface-plain);font-size:var(--ref-typescale-body-small-size);line-height:var(--ref-typescale-body-small-line-height);color:var(--color-text-secondary)}.ds-textarea.is-error .ds-textarea__field{border-color:var(--color-border-input-error)}.ds-textarea.is-error .ds-textarea__helper{color:var(--color-text-error)}.ds-textarea.is-error:focus-within .ds-textarea__field{border-color:var(--color-border-input-error)}.ds-textarea.is-error:focus-within:not([data-mouse-focus]) .ds-textarea__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea.is-disabled{pointer-events:none}.ds-textarea.is-disabled .ds-textarea__field{background:var(--color-surface-input-disabled);border-color:var(--color-border-subtle)}.ds-textarea.is-disabled .ds-textarea__label,.ds-textarea.is-disabled .ds-textarea__control,.ds-textarea.is-disabled .ds-textarea__helper{color:var(--color-text-disabled)}.ds-textarea.is-readonly .ds-textarea__field{background:var(--color-surface-default);border-color:var(--color-border-subtle);cursor:default}.ds-textarea.is-readonly .ds-textarea__control{cursor:default;color:var(--color-text-secondary)}.ds-textarea .mat-mdc-form-field{width:100%}.ds-textarea{--mdc-outlined-text-field-container-shape: var(--radius-sm);--mdc-outlined-text-field-outline-width: 1px;--mdc-outlined-text-field-outline-color: var(--color-border-input);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-hover);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-color: var(--color-text-primary);--mdc-outlined-text-field-input-text-placeholder-color: var(--color-text-placeholder);--mdc-outlined-text-field-caret-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-font: var(--ref-typeface-brand);--mdc-outlined-text-field-input-text-size: var(--ref-typescale-label-medium-size);--mdc-outlined-text-field-input-text-weight: var(--ref-typeface-weight-regular)}.ds-textarea .mat-mdc-floating-label,.ds-textarea .mdc-floating-label,.ds-textarea .mat-mdc-form-field-subscript-wrapper{display:none}.ds-textarea .mat-mdc-text-field-wrapper{background:var(--color-surface-input);padding:var(--spacing-sm) var(--spacing-md);transition:border-color .15s ease,box-shadow .15s ease}.ds-textarea .mdc-text-field__input{min-height:80px;resize:vertical}.ds-textarea:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea.is-error{--mdc-outlined-text-field-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-error)}.ds-textarea.is-error:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea.is-disabled{--mdc-outlined-text-field-disabled-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-disabled-input-text-color: var(--color-text-disabled);--mdc-outlined-text-field-disabled-outline-opacity: 1}.ds-textarea.is-disabled .mat-mdc-text-field-wrapper{background:var(--color-surface-input-disabled)}.ds-textarea.is-disabled .ds-textarea__label,.ds-textarea.is-disabled .ds-textarea__helper{color:var(--color-text-disabled)}.ds-textarea.is-disabled .mdc-text-field__input{resize:none}.ds-textarea.is-readonly{--mdc-outlined-text-field-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-hover-outline-color: var(--color-border-subtle)}.ds-textarea.is-readonly .mat-mdc-text-field-wrapper{background:var(--color-surface-default);cursor:default}.ds-textarea.is-readonly .mdc-text-field__input{cursor:default;color:var(--color-text-secondary);resize:none}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatFormFieldModule }, { kind: "component", type: i2$1.MatFormField, selector: "mat-form-field", inputs: ["hideRequiredMarker", "color", "floatLabel", "appearance", "subscriptSizing", "hintLabel"], exportAs: ["matFormField"] }, { kind: "ngmodule", type: MatInputModule }, { kind: "directive", type: i3.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly", "disabledInteractive"], exportAs: ["matInput"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTextareaComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-textarea', standalone: true, imports: [CommonModule, MatFormFieldModule, MatInputModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<!-- External label \u2014 sits above the mat-form-field, not floating inside it -->\n<label *ngIf=\"label\" class=\"ds-textarea__label\" [for]=\"textareaId\">\n  {{ label }}<span *ngIf=\"required\" class=\"ds-textarea__required\" aria-hidden=\"true\">*</span>\n</label>\n\n<!-- mat-form-field owns the field box, border, and matInput textarea -->\n<mat-form-field\n  appearance=\"outline\"\n  subscriptSizing=\"dynamic\"\n  class=\"ds-textarea__field-wrapper\"\n>\n  <textarea\n    matInput\n    [id]=\"textareaId\"\n    [placeholder]=\"placeholder\"\n    [rows]=\"rows\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readOnly\"\n    [required]=\"required\"\n    [attr.aria-invalid]=\"isError ? 'true' : null\"\n    [attr.aria-describedby]=\"(helperText || errorText) ? textareaId + '-helper' : null\"\n    (input)=\"onInput($event)\"\n  >{{ value }}</textarea>\n</mat-form-field>\n\n<!-- Helper / error text \u2014 external, below the field -->\n<span\n  *ngIf=\"(isError && errorText) || helperText\"\n  class=\"ds-textarea__helper\"\n  [id]=\"textareaId + '-helper'\"\n  [attr.role]=\"isError ? 'alert' : null\"\n>{{ isError && errorText ? errorText : helperText }}</span>\n", styles: [".ds-textarea{display:flex;flex-direction:column;gap:var(--spacing-xs)}.ds-textarea__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typescale-label-medium-weight-prominent);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-secondary);-webkit-user-select:none;user-select:none}.ds-textarea__required{color:var(--color-text-error);margin-left:2px}.ds-textarea__field{display:flex;background:var(--color-surface-input);border:1px solid var(--color-border-input);border-radius:var(--radius-sm);padding:var(--spacing-sm) var(--spacing-md);cursor:text;transition:border-color .15s ease,box-shadow .15s ease}.ds-textarea__field:hover{border-color:var(--color-border-input-hover)}.ds-textarea:focus-within .ds-textarea__field{border-color:var(--color-border-input-active)}.ds-textarea:focus-within:not([data-mouse-focus]) .ds-textarea__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea__control{flex:1;min-width:0;min-height:80px;border:none;outline:none;background:transparent;font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:1.5;color:var(--color-text-primary);caret-color:var(--color-border-input-active);resize:vertical}.ds-textarea__control::placeholder{color:var(--color-text-placeholder)}.ds-textarea__control:disabled{cursor:not-allowed;resize:none}.ds-textarea__control[readonly]{cursor:default;resize:none}.ds-textarea__helper{font-family:var(--ref-typeface-plain);font-size:var(--ref-typescale-body-small-size);line-height:var(--ref-typescale-body-small-line-height);color:var(--color-text-secondary)}.ds-textarea.is-error .ds-textarea__field{border-color:var(--color-border-input-error)}.ds-textarea.is-error .ds-textarea__helper{color:var(--color-text-error)}.ds-textarea.is-error:focus-within .ds-textarea__field{border-color:var(--color-border-input-error)}.ds-textarea.is-error:focus-within:not([data-mouse-focus]) .ds-textarea__field{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea.is-disabled{pointer-events:none}.ds-textarea.is-disabled .ds-textarea__field{background:var(--color-surface-input-disabled);border-color:var(--color-border-subtle)}.ds-textarea.is-disabled .ds-textarea__label,.ds-textarea.is-disabled .ds-textarea__control,.ds-textarea.is-disabled .ds-textarea__helper{color:var(--color-text-disabled)}.ds-textarea.is-readonly .ds-textarea__field{background:var(--color-surface-default);border-color:var(--color-border-subtle);cursor:default}.ds-textarea.is-readonly .ds-textarea__control{cursor:default;color:var(--color-text-secondary)}.ds-textarea .mat-mdc-form-field{width:100%}.ds-textarea{--mdc-outlined-text-field-container-shape: var(--radius-sm);--mdc-outlined-text-field-outline-width: 1px;--mdc-outlined-text-field-outline-color: var(--color-border-input);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-hover);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-color: var(--color-text-primary);--mdc-outlined-text-field-input-text-placeholder-color: var(--color-text-placeholder);--mdc-outlined-text-field-caret-color: var(--color-border-input-active);--mdc-outlined-text-field-input-text-font: var(--ref-typeface-brand);--mdc-outlined-text-field-input-text-size: var(--ref-typescale-label-medium-size);--mdc-outlined-text-field-input-text-weight: var(--ref-typeface-weight-regular)}.ds-textarea .mat-mdc-floating-label,.ds-textarea .mdc-floating-label,.ds-textarea .mat-mdc-form-field-subscript-wrapper{display:none}.ds-textarea .mat-mdc-text-field-wrapper{background:var(--color-surface-input);padding:var(--spacing-sm) var(--spacing-md);transition:border-color .15s ease,box-shadow .15s ease}.ds-textarea .mdc-text-field__input{min-height:80px;resize:vertical}.ds-textarea:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea.is-error{--mdc-outlined-text-field-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-hover-outline-color: var(--color-border-input-error);--mdc-outlined-text-field-focus-outline-color: var(--color-border-input-error)}.ds-textarea.is-error:focus-within:not([data-mouse-focus]) .mat-mdc-text-field-wrapper{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-textarea.is-disabled{--mdc-outlined-text-field-disabled-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-disabled-input-text-color: var(--color-text-disabled);--mdc-outlined-text-field-disabled-outline-opacity: 1}.ds-textarea.is-disabled .mat-mdc-text-field-wrapper{background:var(--color-surface-input-disabled)}.ds-textarea.is-disabled .ds-textarea__label,.ds-textarea.is-disabled .ds-textarea__helper{color:var(--color-text-disabled)}.ds-textarea.is-disabled .mdc-text-field__input{resize:none}.ds-textarea.is-readonly{--mdc-outlined-text-field-outline-color: var(--color-border-subtle);--mdc-outlined-text-field-hover-outline-color: var(--color-border-subtle)}.ds-textarea.is-readonly .mat-mdc-text-field-wrapper{background:var(--color-surface-default);cursor:default}.ds-textarea.is-readonly .mdc-text-field__input{cursor:default;color:var(--color-text-secondary);resize:none}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hostClass: [{
                type: HostBinding,
                args: ['class.ds-textarea']
            }], hostError: [{
                type: HostBinding,
                args: ['class.is-error']
            }], hostDisabled: [{
                type: HostBinding,
                args: ['class.is-disabled']
            }], hostReadonly: [{
                type: HostBinding,
                args: ['class.is-readonly']
            }], onPointerDown: [{
                type: HostListener,
                args: ['mousedown']
            }, {
                type: HostListener,
                args: ['touchstart']
            }], onFocusOut: [{
                type: HostListener,
                args: ['focusout']
            }], label: [{
                type: Input
            }], required: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], value: [{
                type: Input
            }], rows: [{
                type: Input
            }], helperText: [{
                type: Input
            }], errorText: [{
                type: Input
            }], isError: [{
                type: Input
            }], disabled: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Toggle / Switch
 *
 * A standalone Angular component wrapping the ds-toggle CSS class API.
 * For direct class usage without Angular:
 *   <label class="ds-toggle">
 *     <input type="checkbox" class="ds-toggle__control" />
 *     <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
 *     <span class="ds-toggle__label">Label</span>
 *   </label>
 *
 * @example
 *   <ds-toggle label="Enable notifications" [(checked)]="notificationsOn" />
 *   <ds-toggle label="Dark mode" [(checked)]="darkMode" />
 */
class DsToggleComponent {
    /** Label text displayed next to the toggle. */
    label = '';
    /** Whether the toggle is on (checked). Use [(checked)] for two-way binding. */
    checked = false;
    /** Disables the toggle. */
    disabled = false;
    /** Show check/close icon inside the thumb (icon variant). */
    showIcon = false;
    /** Emits the new checked value when toggled. */
    checkedChange = new EventEmitter();
    onChange(event) {
        this.checked = event.checked;
        this.checkedChange.emit(this.checked);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsToggleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: DsToggleComponent, isStandalone: true, selector: "ds-toggle", inputs: { label: "label", checked: "checked", disabled: "disabled", showIcon: "showIcon" }, outputs: { checkedChange: "checkedChange" }, ngImport: i0, template: "<mat-slide-toggle\n  class=\"ds-toggle\"\n  [class.ds-toggle--icon]=\"showIcon\"\n  [checked]=\"checked\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"true\"\n  (change)=\"onChange($event)\"\n>\n  <span *ngIf=\"label\" class=\"ds-toggle__label\">{{ label }}</span>\n  <ng-content></ng-content>\n</mat-slide-toggle>\n", styles: [".ds-toggle{display:inline-flex;align-items:center;gap:var(--spacing-sm);cursor:pointer;-webkit-user-select:none;user-select:none;position:relative}.ds-toggle__control{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.ds-toggle__track{flex-shrink:0;width:52px;height:32px;border-radius:var(--radius-full);background:var(--color-surface-accent-navy);display:flex;align-items:center;padding:var(--spacing-xs);transition:background-color .2s ease;position:relative}.ds-toggle__control:checked~.ds-toggle__track{background:var(--color-surface-brand-bold)}.ds-toggle__control:focus{outline:none}.ds-toggle__control:focus-visible~.ds-toggle__track{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-toggle__control:focus-visible~.ds-toggle__track .ds-toggle__thumb:before{background:var(--overlay-pressed)}.ds-toggle__thumb{width:24px;height:24px;border-radius:var(--radius-full);background:var(--color-icon-on-brand);flex-shrink:0;position:relative;transition:transform .2s ease}.ds-toggle__thumb:before{content:\"\";position:absolute;inset:-8px;border-radius:var(--radius-full);background:transparent;transition:background .15s ease;pointer-events:none}.ds-toggle__control:checked~.ds-toggle__track .ds-toggle__thumb{transform:translate(20px)}.ds-toggle:hover:not(.is-disabled) .ds-toggle__thumb:before{background:var(--overlay-hovered)}.ds-toggle:active:not(.is-disabled) .ds-toggle__thumb:before{background:var(--overlay-pressed)}.ds-toggle--icon .ds-toggle__thumb:after{content:\"close\";font-family:Material Symbols Rounded;font-size:16px;font-style:normal;font-variation-settings:\"FILL\" 1,\"wght\" 500,\"GRAD\" 0,\"opsz\" 20;line-height:1;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary)}.ds-toggle--icon .ds-toggle__control:checked~.ds-toggle__track .ds-toggle__thumb:after{content:\"check\";color:var(--color-surface-brand-bold)}.ds-toggle__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary)}.ds-toggle.is-disabled,.ds-toggle:has(.ds-toggle__control:disabled){cursor:not-allowed;pointer-events:none}.ds-toggle.is-disabled .ds-toggle__track,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__track{background:var(--color-surface-disabled);border:2px solid var(--color-border-subtle)}.ds-toggle.is-disabled .ds-toggle__thumb,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__thumb{background:var(--color-icon-disabled)}.ds-toggle.is-disabled .ds-toggle__thumb:before,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__thumb:before{display:none}.ds-toggle.is-disabled .ds-toggle__control:checked~.ds-toggle__track,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__control:checked~.ds-toggle__track{background:var(--color-surface-disabled)}.ds-toggle.is-disabled.ds-toggle--icon .ds-toggle__thumb:after,.ds-toggle.is-disabled .ds-toggle--icon .ds-toggle__thumb:after,.ds-toggle:has(.ds-toggle__control:disabled).ds-toggle--icon .ds-toggle__thumb:after,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle--icon .ds-toggle__thumb:after{color:var(--color-icon-disabled)}.ds-toggle.is-disabled .ds-toggle__label,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__label{color:var(--color-text-disabled)}.mat-mdc-slide-toggle.ds-toggle{--mdc-switch-track-width: 52px;--mdc-switch-track-height: 32px;--mdc-switch-track-shape: var(--radius-full);--mdc-switch-handle-width: 24px;--mdc-switch-handle-height: 24px;--mdc-switch-handle-shape: var(--radius-full);--mdc-switch-selected-track-color: var(--color-surface-brand-bold);--mdc-switch-selected-focus-track-color: var(--color-surface-brand-bold);--mdc-switch-selected-hover-track-color: var(--color-surface-brand-bold);--mdc-switch-selected-pressed-track-color: var(--color-surface-brand-bold);--mdc-switch-unselected-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-focus-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-hover-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-pressed-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-outline-width: 0px;--mdc-switch-selected-outline-width: 0px;--mdc-switch-selected-handle-color: var(--color-icon-on-brand);--mdc-switch-selected-focus-handle-color: var(--color-icon-on-brand);--mdc-switch-selected-hover-handle-color: var(--color-icon-on-brand);--mdc-switch-selected-pressed-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-focus-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-hover-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-pressed-handle-color: var(--color-icon-on-brand);--mdc-switch-handle-elevation: 0;--mdc-switch-handle-shadow-color: transparent;--mdc-switch-disabled-selected-track-color: var(--color-surface-disabled);--mdc-switch-disabled-unselected-track-color: var(--color-surface-disabled);--mdc-switch-disabled-selected-handle-color: var(--color-icon-disabled);--mdc-switch-disabled-unselected-handle-color: var(--color-icon-disabled);--mdc-switch-disabled-handle-opacity: 1;--mdc-switch-disabled-track-opacity: 1;--mdc-switch-disabled-selected-icon-opacity: 1;--mdc-switch-disabled-unselected-icon-opacity: 1;--mat-switch-selected-hover-state-layer-opacity: 0;--mat-switch-selected-focus-state-layer-opacity: 0;--mat-switch-selected-pressed-state-layer-opacity: 0;--mat-switch-unselected-hover-state-layer-opacity: 0;--mat-switch-unselected-focus-state-layer-opacity: 0;--mat-switch-unselected-pressed-state-layer-opacity: 0;--mat-switch-label-text-font: var(--ref-typeface-brand);--mat-switch-label-text-size: var(--ref-typescale-label-medium-size);--mat-switch-label-text-weight: var(--ref-typeface-weight-regular);--mat-switch-label-text-line-height: var(--ref-typescale-label-medium-line-height)}.mat-mdc-slide-toggle.ds-toggle:not(.ds-toggle--icon) .mdc-switch__icons{display:none}.mat-mdc-slide-toggle.ds-toggle.ds-toggle--icon{--mdc-switch-selected-icon-color: var(--color-surface-brand-bold);--mdc-switch-unselected-icon-color: var(--color-text-secondary)}.mat-mdc-slide-toggle.ds-toggle.ds-toggle--icon.mat-mdc-slide-toggle-disabled{--mdc-switch-selected-icon-color: var(--color-icon-disabled);--mdc-switch-unselected-icon-color: var(--color-icon-disabled)}.mat-mdc-slide-toggle.ds-toggle .mdc-switch__focus-ring{display:none}.mat-mdc-slide-toggle.ds-toggle:not(.mat-mdc-slide-toggle-disabled):hover .mdc-switch__ripple{background:var(--overlay-hovered);border-radius:var(--radius-full)}.mat-mdc-slide-toggle.ds-toggle:not(.mat-mdc-slide-toggle-disabled):active .mdc-switch__ripple{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-slide-toggle.ds-toggle .mdc-switch:focus{outline:none}.mat-mdc-slide-toggle.ds-toggle .mdc-switch:focus-visible .mdc-switch__track{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.mat-mdc-slide-toggle.ds-toggle .mdc-switch:focus-visible .mdc-switch__ripple{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-slide-toggle.ds-toggle.mat-mdc-slide-toggle-disabled .mdc-switch__track{border:2px solid var(--color-border-subtle)}.mat-mdc-slide-toggle.ds-toggle.mat-mdc-slide-toggle-disabled .ds-toggle__label{color:var(--color-text-disabled)}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: MatSlideToggleModule }, { kind: "component", type: i2$8.MatSlideToggle, selector: "mat-slide-toggle", inputs: ["name", "id", "labelPosition", "aria-label", "aria-labelledby", "aria-describedby", "required", "color", "disabled", "disableRipple", "tabIndex", "checked", "hideIcon", "disabledInteractive"], outputs: ["change", "toggleChange"], exportAs: ["matSlideToggle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsToggleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-toggle', standalone: true, imports: [CommonModule, MatSlideToggleModule], changeDetection: ChangeDetectionStrategy.OnPush, template: "<mat-slide-toggle\n  class=\"ds-toggle\"\n  [class.ds-toggle--icon]=\"showIcon\"\n  [checked]=\"checked\"\n  [disabled]=\"disabled\"\n  [disableRipple]=\"true\"\n  (change)=\"onChange($event)\"\n>\n  <span *ngIf=\"label\" class=\"ds-toggle__label\">{{ label }}</span>\n  <ng-content></ng-content>\n</mat-slide-toggle>\n", styles: [".ds-toggle{display:inline-flex;align-items:center;gap:var(--spacing-sm);cursor:pointer;-webkit-user-select:none;user-select:none;position:relative}.ds-toggle__control{position:absolute;opacity:0;width:0;height:0;pointer-events:none}.ds-toggle__track{flex-shrink:0;width:52px;height:32px;border-radius:var(--radius-full);background:var(--color-surface-accent-navy);display:flex;align-items:center;padding:var(--spacing-xs);transition:background-color .2s ease;position:relative}.ds-toggle__control:checked~.ds-toggle__track{background:var(--color-surface-brand-bold)}.ds-toggle__control:focus{outline:none}.ds-toggle__control:focus-visible~.ds-toggle__track{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-toggle__control:focus-visible~.ds-toggle__track .ds-toggle__thumb:before{background:var(--overlay-pressed)}.ds-toggle__thumb{width:24px;height:24px;border-radius:var(--radius-full);background:var(--color-icon-on-brand);flex-shrink:0;position:relative;transition:transform .2s ease}.ds-toggle__thumb:before{content:\"\";position:absolute;inset:-8px;border-radius:var(--radius-full);background:transparent;transition:background .15s ease;pointer-events:none}.ds-toggle__control:checked~.ds-toggle__track .ds-toggle__thumb{transform:translate(20px)}.ds-toggle:hover:not(.is-disabled) .ds-toggle__thumb:before{background:var(--overlay-hovered)}.ds-toggle:active:not(.is-disabled) .ds-toggle__thumb:before{background:var(--overlay-pressed)}.ds-toggle--icon .ds-toggle__thumb:after{content:\"close\";font-family:Material Symbols Rounded;font-size:16px;font-style:normal;font-variation-settings:\"FILL\" 1,\"wght\" 500,\"GRAD\" 0,\"opsz\" 20;line-height:1;position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary)}.ds-toggle--icon .ds-toggle__control:checked~.ds-toggle__track .ds-toggle__thumb:after{content:\"check\";color:var(--color-surface-brand-bold)}.ds-toggle__label{font-family:var(--ref-typeface-brand);font-size:var(--ref-typescale-label-medium-size);font-weight:var(--ref-typeface-weight-regular);line-height:var(--ref-typescale-label-medium-line-height);color:var(--color-text-primary)}.ds-toggle.is-disabled,.ds-toggle:has(.ds-toggle__control:disabled){cursor:not-allowed;pointer-events:none}.ds-toggle.is-disabled .ds-toggle__track,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__track{background:var(--color-surface-disabled);border:2px solid var(--color-border-subtle)}.ds-toggle.is-disabled .ds-toggle__thumb,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__thumb{background:var(--color-icon-disabled)}.ds-toggle.is-disabled .ds-toggle__thumb:before,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__thumb:before{display:none}.ds-toggle.is-disabled .ds-toggle__control:checked~.ds-toggle__track,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__control:checked~.ds-toggle__track{background:var(--color-surface-disabled)}.ds-toggle.is-disabled.ds-toggle--icon .ds-toggle__thumb:after,.ds-toggle.is-disabled .ds-toggle--icon .ds-toggle__thumb:after,.ds-toggle:has(.ds-toggle__control:disabled).ds-toggle--icon .ds-toggle__thumb:after,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle--icon .ds-toggle__thumb:after{color:var(--color-icon-disabled)}.ds-toggle.is-disabled .ds-toggle__label,.ds-toggle:has(.ds-toggle__control:disabled) .ds-toggle__label{color:var(--color-text-disabled)}.mat-mdc-slide-toggle.ds-toggle{--mdc-switch-track-width: 52px;--mdc-switch-track-height: 32px;--mdc-switch-track-shape: var(--radius-full);--mdc-switch-handle-width: 24px;--mdc-switch-handle-height: 24px;--mdc-switch-handle-shape: var(--radius-full);--mdc-switch-selected-track-color: var(--color-surface-brand-bold);--mdc-switch-selected-focus-track-color: var(--color-surface-brand-bold);--mdc-switch-selected-hover-track-color: var(--color-surface-brand-bold);--mdc-switch-selected-pressed-track-color: var(--color-surface-brand-bold);--mdc-switch-unselected-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-focus-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-hover-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-pressed-track-color: var(--color-surface-accent-navy);--mdc-switch-unselected-outline-width: 0px;--mdc-switch-selected-outline-width: 0px;--mdc-switch-selected-handle-color: var(--color-icon-on-brand);--mdc-switch-selected-focus-handle-color: var(--color-icon-on-brand);--mdc-switch-selected-hover-handle-color: var(--color-icon-on-brand);--mdc-switch-selected-pressed-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-focus-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-hover-handle-color: var(--color-icon-on-brand);--mdc-switch-unselected-pressed-handle-color: var(--color-icon-on-brand);--mdc-switch-handle-elevation: 0;--mdc-switch-handle-shadow-color: transparent;--mdc-switch-disabled-selected-track-color: var(--color-surface-disabled);--mdc-switch-disabled-unselected-track-color: var(--color-surface-disabled);--mdc-switch-disabled-selected-handle-color: var(--color-icon-disabled);--mdc-switch-disabled-unselected-handle-color: var(--color-icon-disabled);--mdc-switch-disabled-handle-opacity: 1;--mdc-switch-disabled-track-opacity: 1;--mdc-switch-disabled-selected-icon-opacity: 1;--mdc-switch-disabled-unselected-icon-opacity: 1;--mat-switch-selected-hover-state-layer-opacity: 0;--mat-switch-selected-focus-state-layer-opacity: 0;--mat-switch-selected-pressed-state-layer-opacity: 0;--mat-switch-unselected-hover-state-layer-opacity: 0;--mat-switch-unselected-focus-state-layer-opacity: 0;--mat-switch-unselected-pressed-state-layer-opacity: 0;--mat-switch-label-text-font: var(--ref-typeface-brand);--mat-switch-label-text-size: var(--ref-typescale-label-medium-size);--mat-switch-label-text-weight: var(--ref-typeface-weight-regular);--mat-switch-label-text-line-height: var(--ref-typescale-label-medium-line-height)}.mat-mdc-slide-toggle.ds-toggle:not(.ds-toggle--icon) .mdc-switch__icons{display:none}.mat-mdc-slide-toggle.ds-toggle.ds-toggle--icon{--mdc-switch-selected-icon-color: var(--color-surface-brand-bold);--mdc-switch-unselected-icon-color: var(--color-text-secondary)}.mat-mdc-slide-toggle.ds-toggle.ds-toggle--icon.mat-mdc-slide-toggle-disabled{--mdc-switch-selected-icon-color: var(--color-icon-disabled);--mdc-switch-unselected-icon-color: var(--color-icon-disabled)}.mat-mdc-slide-toggle.ds-toggle .mdc-switch__focus-ring{display:none}.mat-mdc-slide-toggle.ds-toggle:not(.mat-mdc-slide-toggle-disabled):hover .mdc-switch__ripple{background:var(--overlay-hovered);border-radius:var(--radius-full)}.mat-mdc-slide-toggle.ds-toggle:not(.mat-mdc-slide-toggle-disabled):active .mdc-switch__ripple{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-slide-toggle.ds-toggle .mdc-switch:focus{outline:none}.mat-mdc-slide-toggle.ds-toggle .mdc-switch:focus-visible .mdc-switch__track{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.mat-mdc-slide-toggle.ds-toggle .mdc-switch:focus-visible .mdc-switch__ripple{background:var(--overlay-pressed);border-radius:var(--radius-full)}.mat-mdc-slide-toggle.ds-toggle.mat-mdc-slide-toggle-disabled .mdc-switch__track{border:2px solid var(--color-border-subtle)}.mat-mdc-slide-toggle.ds-toggle.mat-mdc-slide-toggle-disabled .ds-toggle__label{color:var(--color-text-disabled)}\n"] }]
        }], propDecorators: { label: [{
                type: Input
            }], checked: [{
                type: Input
            }], disabled: [{
                type: Input
            }], showIcon: [{
                type: Input
            }], checkedChange: [{
                type: Output
            }] } });

/**
 * Onflo Design System — Tooltip Directive
 *
 * Composes Angular Material's MatTooltip with the Onflo token-styled surface.
 * Tooltip rendering, positioning, show/hide delay, and keyboard behaviour are
 * all handled by MatTooltip via CDK Overlay — identical to [matTooltip] usage.
 *
 * The Onflo tokens are applied via global .mat-mdc-tooltip overrides in
 * components/tooltip/_tooltip.scss.
 *
 * @example
 *   <button dsTooltip="Save changes">Save</button>
 *   <button [dsTooltip]="'Delete item'" [dsTooltipPosition]="'below'">Delete</button>
 *   <button dsTooltip="Disabled" [dsTooltipDisabled]="true">No tooltip</button>
 */
class DsTooltipDirective {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTooltipDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "21.2.7", type: DsTooltipDirective, isStandalone: true, selector: "[dsTooltip]", hostDirectives: [{ directive: i1$8.MatTooltip, inputs: ["matTooltip", "dsTooltip", "matTooltipPosition", "dsTooltipPosition", "matTooltipShowDelay", "dsTooltipShowDelay", "matTooltipHideDelay", "dsTooltipHideDelay", "matTooltipDisabled", "dsTooltipDisabled"] }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: DsTooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[dsTooltip]',
                    standalone: true,
                    hostDirectives: [
                        {
                            directive: MatTooltip,
                            inputs: [
                                'matTooltip: dsTooltip',
                                'matTooltipPosition: dsTooltipPosition',
                                'matTooltipShowDelay: dsTooltipShowDelay',
                                'matTooltipHideDelay: dsTooltipHideDelay',
                                'matTooltipDisabled: dsTooltipDisabled',
                            ],
                        },
                    ],
                }]
        }] });

class TopNavComponent {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: TopNavComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "21.2.7", type: TopNavComponent, isStandalone: true, selector: "ds-top-nav", host: { styleAttribute: "display: contents" }, ngImport: i0, template: "<header class=\"ds-top-nav\" role=\"banner\">\n  <div class=\"ds-top-nav__tabs\">\n    <ng-content />\n  </div>\n  <div class=\"ds-top-nav__actions\">\n    <ng-content select=\"[top-nav-actions]\" />\n  </div>\n</header>\n", styles: [".ds-top-nav{display:flex;align-items:center;gap:var(--spacing-lg);height:65px;width:100%;padding:0 var(--spacing-xl) 0 var(--spacing-md);box-sizing:border-box;background:var(--color-surface-page);border-bottom:2px solid var(--color-border-brand)}.ds-top-nav__tabs{display:flex;flex:1 0 0;align-items:flex-end;gap:var(--spacing-sm);height:100%;min-width:0;overflow:hidden}.ds-top-nav__actions{display:flex;align-items:center;gap:var(--spacing-lg);flex-shrink:0}.ds-top-nav__action-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;padding:0;box-sizing:border-box;border:none;border-radius:var(--radius-full);overflow:hidden;position:relative;background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand);cursor:pointer;font-family:var(--ref-typescale-title-h2-font);font-size:var(--ref-typescale-title-h2-size);font-weight:var(--ref-typescale-title-h2-weight);line-height:1;letter-spacing:var(--ref-typescale-title-h2-tracking);text-align:center}.ds-top-nav__action-btn .ds-icon{font-size:18px;color:currentColor}.ds-top-nav__action-btn:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-top-nav__action-btn:hover:after{background:var(--overlay-hovered)}.ds-top-nav__action-btn:active:after{background:var(--overlay-pressed)}.ds-top-nav__action-btn:focus{outline:none}.ds-top-nav__action-btn:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-top-nav__action-btn--orange{background:var(--color-surface-accent-orange-bold)}.ds-top-nav__action-btn--green{background:var(--color-surface-accent-green-bold)}.ds-top-nav__action-btn--navy{background:var(--color-surface-accent-navy-bold)}.ds-top-nav__action-badge{position:relative;flex-shrink:0}.ds-top-nav__action-badge .ds-badge-indicator{position:absolute;top:-4px;right:-4px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "21.2.7", ngImport: i0, type: TopNavComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ds-top-nav', standalone: true, imports: [CommonModule], host: { style: 'display: contents' }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<header class=\"ds-top-nav\" role=\"banner\">\n  <div class=\"ds-top-nav__tabs\">\n    <ng-content />\n  </div>\n  <div class=\"ds-top-nav__actions\">\n    <ng-content select=\"[top-nav-actions]\" />\n  </div>\n</header>\n", styles: [".ds-top-nav{display:flex;align-items:center;gap:var(--spacing-lg);height:65px;width:100%;padding:0 var(--spacing-xl) 0 var(--spacing-md);box-sizing:border-box;background:var(--color-surface-page);border-bottom:2px solid var(--color-border-brand)}.ds-top-nav__tabs{display:flex;flex:1 0 0;align-items:flex-end;gap:var(--spacing-sm);height:100%;min-width:0;overflow:hidden}.ds-top-nav__actions{display:flex;align-items:center;gap:var(--spacing-lg);flex-shrink:0}.ds-top-nav__action-btn{display:flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;padding:0;box-sizing:border-box;border:none;border-radius:var(--radius-full);overflow:hidden;position:relative;background:var(--color-surface-brand-bold);color:var(--color-icon-on-brand);cursor:pointer;font-family:var(--ref-typescale-title-h2-font);font-size:var(--ref-typescale-title-h2-size);font-weight:var(--ref-typescale-title-h2-weight);line-height:1;letter-spacing:var(--ref-typescale-title-h2-tracking);text-align:center}.ds-top-nav__action-btn .ds-icon{font-size:18px;color:currentColor}.ds-top-nav__action-btn:after{content:\"\";position:absolute;inset:0;border-radius:inherit;background:transparent;pointer-events:none}.ds-top-nav__action-btn:hover:after{background:var(--overlay-hovered)}.ds-top-nav__action-btn:active:after{background:var(--overlay-pressed)}.ds-top-nav__action-btn:focus{outline:none}.ds-top-nav__action-btn:focus-visible{box-shadow:0 0 0 3px var(--color-border-ada-focus-ring)}.ds-top-nav__action-btn--orange{background:var(--color-surface-accent-orange-bold)}.ds-top-nav__action-btn--green{background:var(--color-surface-accent-green-bold)}.ds-top-nav__action-btn--navy{background:var(--color-surface-accent-navy-bold)}.ds-top-nav__action-badge{position:relative;flex-shrink:0}.ds-top-nav__action-badge .ds-badge-indicator{position:absolute;top:-4px;right:-4px}\n"] }]
        }] });

/*
 * Public API Surface of @onflo/design-system
 *
 * Export every component and directive so consumers can import by name.
 * Token CSS is distributed separately via the tokens/ folder — import
 * tokens/css/design-tokens.css in your app's global stylesheet.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AgentStatusComponent, DsAccordionComponent, DsAccordionPanelComponent, DsAgPaginatorComponent, DsAlertComponent, DsAvatarComponent, DsBadgeComponent, DsButtonComponent, DsCardComponent, DsCheckboxComponent, DsChipComponent, DsDialogComponent, DsDividerComponent, DsHoverCardComponent, DsIconButtonComponent, DsIconButtonToggleComponent, DsIconComponent, DsInputComponent, DsLabelComponent, DsLeadingDirective, DsListComponent, DsListItemComponent, DsMenuComponent, DsPaginatorComponent, DsProgressComponent, DsRadioComponent, DsRadioGroupComponent, DsSearchComponent, DsSelectComponent, DsSkeletonComponent, DsSnackbarComponent, DsSpinnerComponent, DsTabComponent, DsTableHeaderCellComponent, DsTableRowCellComponent, DsTableToolbarComponent, DsTabsComponent, DsTagComponent, DsTextareaComponent, DsToggleComponent, DsTooltipDirective, DsTrailingDirective, NavButtonComponent, NavExpandComponent, NavSidebarComponent, NavTabComponent, TopNavComponent };
//# sourceMappingURL=onflo-design-system.mjs.map
