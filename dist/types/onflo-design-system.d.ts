import * as i0 from '@angular/core';
import { OnInit, ElementRef, ChangeDetectorRef, EventEmitter, OnDestroy, AfterViewInit, Renderer2, NgZone, AfterContentInit, TemplateRef, QueryList } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef } from '@angular/material/dialog';
import { MatMenu } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as i1 from '@angular/material/tooltip';

declare class DsAccordionPanelComponent {
    title: string;
    icon?: string;
    /** Initial expanded state. mat-expansion-panel owns open/close after first render. */
    set openInput(value: boolean);
    readonly open: i0.WritableSignal<boolean>;
    toggle(): void;
    disabled: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAccordionPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAccordionPanelComponent, "ds-accordion-panel", never, { "title": { "alias": "title"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "openInput": { "alias": "open"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}
declare class DsAccordionComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAccordionComponent, "ds-accordion", never, {}, {}, never, ["*"], true, never>;
}

interface DsSelectOption {
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
declare class DsSelectComponent implements OnInit {
    private el;
    private cdr;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    constructor(el: ElementRef<HTMLElement>, cdr: ChangeDetectorRef);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required. */
    required: boolean;
    /** Placeholder option text. */
    placeholder: string;
    /** Currently selected value. Use [(value)] for two-way binding. */
    value: string;
    /** Options array. */
    options: DsSelectOption[];
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown below the field when isError is true. */
    errorText: string;
    /** Applies error styling and shows errorText. */
    isError: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Emits new value when selection changes. */
    valueChange: EventEmitter<string>;
    inputRef: ElementRef<HTMLInputElement>;
    menuOpen: boolean;
    filterText: string;
    private _selectId;
    get selectId(): string;
    ngOnInit(): void;
    get selectedLabel(): string;
    /** Placeholder shown in the input: selected label when closed, hint when open. */
    get inputPlaceholder(): string;
    /** Options filtered by what the user has typed. */
    get filteredOptions(): DsSelectOption[];
    onMenuOpened(): void;
    onMenuClosed(): void;
    onInput(event: Event): void;
    onOptionSelect(opt: DsSelectOption): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSelectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSelectComponent, "ds-select", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "options": { "alias": "options"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

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

/** Minimal AG Grid API interface — avoids a hard ag-grid-community dependency. */
interface AgPaginationApi {
    paginationGetCurrentPage(): number;
    paginationGetPageSize(): number;
    paginationGetTotalPages(): number;
    paginationGetRowCount(): number;
    paginationGoToFirstPage(): void;
    paginationGoToPreviousPage(): void;
    paginationGoToNextPage(): void;
    paginationGoToLastPage(): void;
    paginationSetPageSize(size: number): void;
    addEventListener(event: string, callback: () => void): void;
    removeEventListener(event: string, callback: () => void): void;
}
/** Params injected by AG Grid when registered as a status panel component. */
interface AgPaginatorStatusPanelParams {
    api: AgPaginationApi;
}
declare class DsAgPaginatorComponent implements OnInit, OnDestroy {
    private readonly cdr;
    /**
     * AG Grid API instance.
     * Set this when using the component standalone (outside the grid status bar).
     * When used as a status panel, AG Grid injects the API via agInit().
     */
    set api(value: AgPaginationApi | null);
    get api(): AgPaginationApi | null;
    private _api;
    /** Page size options shown in the select. */
    pageSizeOptions: number[];
    currentPage: number;
    pageSize: number;
    totalRows: number;
    totalPages: number;
    private readonly _paginationListener;
    constructor(cdr: ChangeDetectorRef);
    /** Called by AG Grid when this component is registered as a status panel. */
    agInit(params: AgPaginatorStatusPanelParams): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    private attachToGrid;
    private detachFromGrid;
    private syncFromGrid;
    get rangeStart(): number;
    get rangeEnd(): number;
    get isFirstPage(): boolean;
    get isLastPage(): boolean;
    /** Current page size as a string for ds-select value binding. */
    get pageSizeStr(): string;
    /** Page size options mapped to DsSelectOption[] for ds-select. */
    get pageSizeSelectOptions(): DsSelectOption[];
    firstPage(): void;
    prevPage(): void;
    nextPage(): void;
    lastPage(): void;
    onPageSizeChange(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAgPaginatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAgPaginatorComponent, "ds-ag-paginator", never, { "api": { "alias": "api"; "required": false; }; "pageSizeOptions": { "alias": "pageSizeOptions"; "required": false; }; }, {}, never, never, true, never>;
}

type AgentStatusVariant = 'call' | 'live';
declare class AgentStatusComponent {
    variant: AgentStatusVariant;
    online: boolean;
    get icon(): string;
    get statusLabel(): string;
    get ariaLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AgentStatusComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AgentStatusComponent, "ds-agent-status", never, { "variant": { "alias": "variant"; "required": false; }; "online": { "alias": "online"; "required": false; }; }, {}, never, never, true, never>;
}

type DsAlertVariant = 'info' | 'success' | 'warning' | 'error';
type DsAlertSize = 'sm' | 'lg';
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
declare class DsAlertComponent {
    /** Alert semantic variant. Default: 'info' */
    variant: DsAlertVariant;
    /** Size variant. 'sm' = compact inline; 'lg' = two-section with header band. Default: 'sm' */
    size: DsAlertSize;
    /** Bold title text. SM: shown above body. LG: shown in tinted header band. */
    title: string;
    /** Body message text. SM: shown below title. LG: shown in white body section. */
    message: string;
    /** Shows a dismiss (×) button. */
    dismissible: boolean;
    /** Secondary action button label (text style, brand colour). Shown bottom-right. */
    actionLabel: string;
    /** Primary action button label (filled style). Shown bottom-right after secondary. */
    primaryActionLabel: string;
    /** Whether the alert is currently visible. */
    visible: boolean;
    /** Emits when the dismiss button is clicked. */
    dismissed: EventEmitter<void>;
    /** Emits when the secondary action button is clicked. */
    actionClicked: EventEmitter<void>;
    /** Emits when the primary action button is clicked. */
    primaryActionClicked: EventEmitter<void>;
    get alertClasses(): string;
    get iconName(): string;
    onDismiss(): void;
    onAction(): void;
    onPrimaryAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAlertComponent, "ds-alert", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "title": { "alias": "title"; "required": false; }; "message": { "alias": "message"; "required": false; }; "dismissible": { "alias": "dismissible"; "required": false; }; "actionLabel": { "alias": "actionLabel"; "required": false; }; "primaryActionLabel": { "alias": "primaryActionLabel"; "required": false; }; }, { "dismissed": "dismissed"; "actionClicked": "actionClicked"; "primaryActionClicked": "primaryActionClicked"; }, never, ["*", "*"], true, never>;
}

type DsAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
declare class DsAvatarComponent implements OnInit {
    /** Image URL. Falls back to initials or icon if empty or on error. */
    src: string;
    /** Initials to show when no image is available (max 2 chars). */
    initials: string;
    /** Alt text for the image. */
    alt: string;
    /** Size variant. Default: 'md' */
    size: DsAvatarSize;
    /** Whether the image failed to load. */
    imageError: boolean;
    get avatarClasses(): string;
    get showImage(): boolean;
    get showInitials(): boolean;
    get showIcon(): boolean;
    get displayInitials(): string;
    ngOnInit(): void;
    onImageError(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAvatarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAvatarComponent, "ds-avatar", never, { "src": { "alias": "src"; "required": false; }; "initials": { "alias": "initials"; "required": false; }; "alt": { "alias": "alt"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

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
declare class DsBadgeComponent {
    /** Count value shown inside the circle (Large size). Ignored when dot=true. */
    count: string | number;
    /** Renders as a 6×6px dot with no text (Small size). */
    dot: boolean;
    get indicatorClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsBadgeComponent, "ds-badge", never, { "count": { "alias": "count"; "required": false; }; "dot": { "alias": "dot"; "required": false; }; }, {}, never, never, true, never>;
}

type DsButtonVariant = 'filled' | 'outlined' | 'text' | 'destructive' | 'destructive-outlined';
type DsButtonSize = 'xs' | 'sm' | 'md' | 'lg';
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
declare class DsButtonComponent {
    /** Visual style. Default: 'filled' */
    variant: DsButtonVariant;
    /** Size scale. Default: 'md' */
    size: DsButtonSize;
    /** Disables the button and applies disabled styling. */
    disabled: boolean;
    /** Native button type attribute. Default: 'button' */
    type: 'button' | 'submit' | 'reset';
    /** Emits the native MouseEvent when the button is clicked. */
    clicked: EventEmitter<MouseEvent>;
    get buttonClasses(): string;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsButtonComponent, "ds-button", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "clicked": "clicked"; }, never, ["[slot='icon-leading']", "*", "[slot='icon-trailing']", "[slot='icon-leading']", "*", "[slot='icon-trailing']", "[slot='icon-leading']", "*", "[slot='icon-trailing']"], true, never>;
}

declare class DsCardComponent {
    /** Visual variant: 'outlined' | 'elevated' */
    variant: 'outlined' | 'elevated';
    /** Makes the card interactive with hover/press states */
    interactive: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsCardComponent, "ds-card", never, { "variant": { "alias": "variant"; "required": false; }; "interactive": { "alias": "interactive"; "required": false; }; }, {}, never, ["*"], true, never>;
}

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
declare class DsCheckboxComponent {
    /** Label text displayed next to the checkbox. */
    label: string;
    /** Whether the checkbox is checked. Use [(checked)] for two-way binding. */
    checked: boolean;
    /** Indeterminate state (partially selected). */
    indeterminate: boolean;
    /** Applies error styling. */
    isError: boolean;
    /** Disables the checkbox. */
    disabled: boolean;
    /** Emits the new checked value when toggled. */
    checkedChange: EventEmitter<boolean>;
    onChange(event: MatCheckboxChange): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsCheckboxComponent, "ds-checkbox", never, { "label": { "alias": "label"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "checkedChange": "checkedChange"; }, never, ["*"], true, never>;
}

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

declare class DsChipComponent {
    label: string;
    icon?: string;
    removable: boolean;
    disabled: boolean;
    error: boolean;
    active: boolean;
    removed: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsChipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsChipComponent, "ds-chip", never, { "label": { "alias": "label"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "error": { "alias": "error"; "required": false; }; "active": { "alias": "active"; "required": false; }; }, { "removed": "removed"; }, never, never, true, never>;
}

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

interface DsDialogData {
    title?: string;
    subtitle?: string;
    icon?: string;
    iconVariant?: 'default' | 'error' | 'warning' | 'success' | 'info';
    align?: 'left' | 'center';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}
declare class DsDialogComponent {
    private dialogRef;
    private data;
    constructor(dialogRef: MatDialogRef<DsDialogComponent>, data: DsDialogData | null);
    title: string;
    subtitle: string;
    icon?: string;
    iconVariant: 'default' | 'error' | 'warning' | 'success' | 'info';
    align: 'left' | 'center';
    size: 'sm' | 'md' | 'lg' | 'xl';
    closed: EventEmitter<void>;
    close(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDialogComponent, [{ optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDialogComponent, "ds-dialog", never, { "title": { "alias": "title"; "required": false; }; "subtitle": { "alias": "subtitle"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "iconVariant": { "alias": "iconVariant"; "required": false; }; "align": { "alias": "align"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "closed": "closed"; }, never, ["[slot=content]", "[slot=actions]"], true, never>;
}

declare class DsDividerComponent {
    /** 'full' | 'inset' | 'middle-inset' | 'subhead' | 'vertical' | 'vertical-inset' */
    variant: 'full' | 'inset' | 'middle-inset' | 'subhead' | 'vertical' | 'vertical-inset';
    label: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDividerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDividerComponent, "ds-divider", never, { "variant": { "alias": "variant"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}

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

type DsHoverCardVariant = 'bottom' | 'top';
declare class DsHoverCardComponent implements AfterViewInit, OnDestroy {
    private renderer;
    private ngZone;
    private cdr;
    /** Position variant. 'bottom' = card below cursor (default); 'top' = card above cursor. */
    variant: DsHoverCardVariant;
    /** Horizontal distance between cursor and card edge (px). */
    offsetX: number;
    /** Vertical distance between cursor and card edge (px). */
    offsetY: number;
    private triggerEl;
    private cardEl;
    isVisible: boolean;
    private removeMouseMoveListener?;
    constructor(renderer: Renderer2, ngZone: NgZone, cdr: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onMouseEnter(e: MouseEvent): void;
    onMouseLeave(): void;
    onFocusIn(e: FocusEvent): void;
    onFocusOut(): void;
    private updatePosition;
    private positionNearRect;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsHoverCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsHoverCardComponent, "ds-hover-card", never, { "variant": { "alias": "variant"; "required": false; }; "offsetX": { "alias": "offsetX"; "required": false; }; "offsetY": { "alias": "offsetY"; "required": false; }; }, {}, never, ["*", "[card-content]"], true, never>;
}

type DsIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
declare class DsIconComponent {
    /** Material Symbols icon name (e.g. "search", "bookmark", "close"). */
    name: string;
    /** Filled style (FILL=1). Default: false (outlined). */
    filled: boolean;
    /** Size. Default: 'md' (24px). */
    size: DsIconSize;
    get classes(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsIconComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsIconComponent, "ds-icon", never, { "name": { "alias": "name"; "required": true; }; "filled": { "alias": "filled"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, {}, never, never, true, never>;
}

type DsIconButtonVariant = 'icon' | 'filled' | 'outlined' | 'monogram';
type DsIconButtonSize = 'sm' | 'md';
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
declare class DsIconButtonComponent {
    /** Visual style. Default: 'icon' (ghost) */
    variant: DsIconButtonVariant;
    /** Size scale. Default: 'md' (40px) */
    size: DsIconButtonSize;
    /** Accessible label — required for screen readers. No visible text on icon buttons. */
    ariaLabel: string;
    /** Applies error styling via .is-error class. */
    isError: boolean;
    /** Disables the button and applies disabled styling. */
    disabled: boolean;
    /** Native button type attribute. Default: 'button' */
    type: 'button' | 'submit' | 'reset';
    /** Emits the native MouseEvent when the button is clicked. */
    clicked: EventEmitter<MouseEvent>;
    get buttonClasses(): string;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsIconButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsIconButtonComponent, "ds-icon-button", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": true; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "clicked": "clicked"; }, never, ["*"], true, never>;
}

type DsIconButtonToggleVariant = 'icon' | 'filled' | 'outlined' | 'outlined-letter';
type DsIconButtonToggleSize = 'sm' | 'md';
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
declare class DsIconButtonToggleComponent {
    /** Visual style. Default: 'icon' (ghost) */
    variant: DsIconButtonToggleVariant;
    /** Size scale. Default: 'md' (40px) */
    size: DsIconButtonToggleSize;
    /** Accessible label — required for screen readers. No visible text on icon buttons. */
    ariaLabel: string;
    /** Whether the toggle is currently selected/pressed. */
    selected: boolean;
    /** Disables the button and applies disabled styling. */
    disabled: boolean;
    /** Native button type attribute. Default: 'button' */
    type: 'button' | 'submit' | 'reset';
    /** Emits the new selected state — enables [(selected)] two-way binding. */
    selectedChange: EventEmitter<boolean>;
    /** Emits the native MouseEvent when the button is clicked. */
    clicked: EventEmitter<MouseEvent>;
    get buttonClasses(): string;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsIconButtonToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsIconButtonToggleComponent, "ds-icon-button-toggle", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": true; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "selectedChange": "selectedChange"; "clicked": "clicked"; }, never, ["*"], true, never>;
}

type DsInputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
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
declare class DsInputComponent implements OnInit {
    private el;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    get hostReadonly(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required (adds asterisk to label). */
    required: boolean;
    /** Input type. Default: 'text' */
    type: DsInputType;
    /** Placeholder text. */
    placeholder: string;
    /** Current value. Use [(value)] for two-way binding. */
    value: string;
    /** Material Symbols icon name for the leading (left) icon. */
    leadingIcon: string;
    /** Material Symbols icon name for the trailing (right) icon or action. */
    trailingIcon: string;
    /** Prefix text shown inside the field before the input (e.g. "$"). */
    prefix: string;
    /** Suffix text shown inside the field after the input (e.g. "USD"). */
    suffix: string;
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown below the field when isError is true. */
    errorText: string;
    /** Applies error styling and shows errorText. */
    isError: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Makes the field read-only. */
    readOnly: boolean;
    /** Emits the new value on every keystroke. */
    valueChange: EventEmitter<string>;
    /** Emits when the trailing action button is clicked. */
    trailingAction: EventEmitter<void>;
    private _inputId;
    get inputId(): string;
    ngOnInit(): void;
    onInput(event: Event): void;
    onTrailingAction(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsInputComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsInputComponent, "ds-input", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "type": { "alias": "type"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "leadingIcon": { "alias": "leadingIcon"; "required": false; }; "trailingIcon": { "alias": "trailingIcon"; "required": false; }; "prefix": { "alias": "prefix"; "required": false; }; "suffix": { "alias": "suffix"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readOnly": { "alias": "readOnly"; "required": false; }; }, { "valueChange": "valueChange"; "trailingAction": "trailingAction"; }, never, never, true, never>;
}

declare class DsLabelComponent {
    /** Color variant */
    color: 'green' | 'red' | 'yellow' | 'brand' | 'blue' | 'navy' | 'teal' | 'orange' | 'purple' | 'pink' | 'disabled';
    /** Size */
    size: 'xs' | 'sm' | 'md';
    /** Outline style (adds colored border) */
    outline: boolean;
    /** Optional leading icon (Material Symbols name) */
    icon?: string;
    /** Pill style — fully rounded shape */
    pill: boolean;
    /** Show status dot (pill style only) */
    dot: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsLabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsLabelComponent, "ds-label", never, { "color": { "alias": "color"; "required": false; }; "size": { "alias": "size"; "required": false; }; "outline": { "alias": "outline"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "pill": { "alias": "pill"; "required": false; }; "dot": { "alias": "dot"; "required": false; }; }, {}, never, ["*"], true, never>;
}

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
declare class DsLeadingDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsLeadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsLeadingDirective, "[leading]", never, {}, {}, never, never, true, never>;
}
/** Marker directive — place on any projected trailing-slot element: `<span trailing class="ds-icon ds-icon--sm">` */
declare class DsTrailingDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTrailingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTrailingDirective, "[trailing]", never, {}, {}, never, never, true, never>;
}
declare class DsListItemComponent implements AfterContentInit {
    private cdr;
    primary: string;
    secondary: string;
    overline: string;
    interactive: boolean;
    disabled: boolean;
    /**
     * '1-line' | '2-lines' | '3-lines'
     * Note: '1-line' and '2-lines' produce the natural single/two-text layout with no
     * CSS modifier. '3-lines' applies `.ds-list-item--3-lines` which clamps the secondary
     * text to 2 lines via -webkit-line-clamp.
     */
    variant: '1-line' | '2-lines' | '3-lines';
    private _leadingRef?;
    private _trailingRef?;
    hasLeading: boolean;
    hasTrailing: boolean;
    constructor(cdr: ChangeDetectorRef);
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsListItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsListItemComponent, "ds-list-item", never, { "primary": { "alias": "primary"; "required": false; }; "secondary": { "alias": "secondary"; "required": false; }; "overline": { "alias": "overline"; "required": false; }; "interactive": { "alias": "interactive"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; }, {}, ["_leadingRef", "_trailingRef"], ["[leading]", "[trailing]", "*"], true, never>;
}
declare class DsListComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsListComponent, "ds-list", never, {}, {}, never, ["*"], true, never>;
}

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
declare class DsMenuComponent {
    /** Exposes the mat-menu reference for use with [matMenuTriggerFor]. */
    matMenu: MatMenu;
    /** Show a sticky search field at the top of the menu panel. */
    search: boolean;
    /** Placeholder text for the search field. */
    searchPlaceholder: string;
    /** Current search value. Use [(searchValue)] for two-way binding. */
    searchValue: string;
    /** Emits on every keystroke in the search field. */
    searchValueChange: EventEmitter<string>;
    onSearchChange(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMenuComponent, "ds-menu", never, { "search": { "alias": "search"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "searchValue": { "alias": "searchValue"; "required": false; }; }, { "searchValueChange": "searchValueChange"; }, never, ["*"], true, never>;
}

type NavButtonType = 'tickets' | 'assets' | 'analytics' | 'settings' | 'campaigns' | 'home' | 'requests' | 'systems';
declare class NavButtonComponent {
    type: NavButtonType;
    selected: boolean;
    get config(): {
        icon: string;
        filled: boolean;
        label: string;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<NavButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavButtonComponent, "ds-nav-button", never, { "type": { "alias": "type"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; }, {}, never, never, true, never>;
}

declare class NavExpandComponent {
    /** Whether the sub-navigation panel is currently open. */
    open: boolean;
    /** Emitted when the button is clicked — caller toggles the panel. */
    toggle: EventEmitter<void>;
    get ariaLabel(): string;
    get iconName(): string;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavExpandComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavExpandComponent, "ds-nav-expand", never, { "open": { "alias": "open"; "required": false; }; }, { "toggle": "toggle"; }, never, never, true, never>;
}

declare class NavSidebarComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<NavSidebarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavSidebarComponent, "ds-nav-sidebar", never, {}, {}, never, ["[logo]", "[nav]", "[bottom]"], true, never>;
}

declare class NavTabComponent {
    label: string;
    active: boolean;
    /** Collapsed overflow indicator — shows "..." at 26px width, no close button. */
    more: boolean;
    /** Emitted when the tab body is clicked (activate this tab). */
    tabClick: EventEmitter<void>;
    /** Emitted when the × close button is clicked. */
    tabClose: EventEmitter<void>;
    onTabClick(): void;
    onCloseClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavTabComponent, "ds-nav-tab", never, { "label": { "alias": "label"; "required": false; }; "active": { "alias": "active"; "required": false; }; "more": { "alias": "more"; "required": false; }; }, { "tabClick": "tabClick"; "tabClose": "tabClose"; }, never, never, true, never>;
}

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

interface DsPageEvent {
    pageIndex: number;
    pageSize: number;
    length: number;
}
declare class DsPaginatorComponent {
    total: number;
    pageSize: number;
    pageIndex: number;
    pageSizeOptions: number[];
    showFirstLastButtons: boolean;
    pageChange: EventEmitter<DsPageEvent>;
    onPage(event: PageEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsPaginatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsPaginatorComponent, "ds-paginator", never, { "total": { "alias": "total"; "required": false; }; "pageSize": { "alias": "pageSize"; "required": false; }; "pageIndex": { "alias": "pageIndex"; "required": false; }; "pageSizeOptions": { "alias": "pageSizeOptions"; "required": false; }; "showFirstLastButtons": { "alias": "showFirstLastButtons"; "required": false; }; }, { "pageChange": "pageChange"; }, never, never, true, never>;
}

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
declare class DsProgressComponent {
    /**
     * Progress value from 0–100. Null or undefined = indeterminate (animated).
     */
    value: number | null;
    /** Accessible label for the progress bar. */
    label: string;
    get isIndeterminate(): boolean;
    get clampedValue(): number;
    get mode(): 'indeterminate' | 'determinate';
    static ɵfac: i0.ɵɵFactoryDeclaration<DsProgressComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsProgressComponent, "ds-progress", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; }, {}, never, never, true, never>;
}

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
declare class DsRadioComponent {
    /** Label text displayed next to the radio button. */
    label: string;
    /** The value this radio represents. */
    value: string;
    /** Applies error styling. */
    isError: boolean;
    /** Disables the radio button. */
    disabled: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsRadioComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsRadioComponent, "ds-radio", never, { "label": { "alias": "label"; "required": false; }; "value": { "alias": "value"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}
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
declare class DsRadioGroupComponent {
    /** Currently selected value. Use [(value)] for two-way binding. */
    value: string;
    /** Optional group name — shared across all child radios. */
    name: string;
    /** Emits the newly selected value. */
    valueChange: EventEmitter<string>;
    onChange(event: MatRadioChange): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsRadioGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsRadioGroupComponent, "ds-radio-group", never, { "value": { "alias": "value"; "required": false; }; "name": { "alias": "name"; "required": false; }; }, { "valueChange": "valueChange"; }, never, ["*"], true, never>;
}

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
declare class DsSearchComponent {
    private el;
    readonly hostDsInput = true;
    readonly hostDsSearch = true;
    readonly hostRole = "search";
    get hostDisabled(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Accessible label for the input. Required for ADA — no visible label is shown. */
    ariaLabel: string;
    /** Placeholder text shown when the field is empty. */
    placeholder: string;
    /** Current value. Use [(value)] for two-way binding. */
    value: string;
    /** Show the leading search icon. Default: true. */
    leadingIcon: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Emits the new value on every keystroke. */
    valueChange: EventEmitter<string>;
    /** Emits the current value when the user presses Enter. */
    search: EventEmitter<string>;
    /** Emits when the clear button is clicked. */
    cleared: EventEmitter<void>;
    get hasValue(): boolean;
    onInput(event: Event): void;
    onKeydown(event: KeyboardEvent): void;
    onClear(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSearchComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSearchComponent, "ds-search", never, { "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "leadingIcon": { "alias": "leadingIcon"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; "search": "search"; "cleared": "cleared"; }, never, never, true, never>;
}

declare class DsSkeletonComponent {
    ariaLabel: string;
    card: boolean;
    row: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSkeletonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSkeletonComponent, "ds-skeleton", never, { "ariaLabel": { "alias": "ariaLabel"; "required": false; }; "card": { "alias": "card"; "required": false; }; "row": { "alias": "row"; "required": false; }; }, {}, never, ["*"], true, never>;
}

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

type DsSnackbarVariant = 'text-only' | 'text-action' | 'text-longer-action';
interface DsSnackbarData {
    message?: string;
    variant?: DsSnackbarVariant;
    actionLabel?: string;
    showClose?: boolean;
}
declare class DsSnackbarComponent {
    private snackBarRef;
    private data;
    constructor(snackBarRef: MatSnackBarRef<DsSnackbarComponent>, data: DsSnackbarData | null);
    message: string;
    variant: DsSnackbarVariant;
    actionLabel: string;
    showClose: boolean;
    action: EventEmitter<void>;
    dismissed: EventEmitter<void>;
    get hasAction(): boolean;
    get isLongerAction(): boolean;
    onAction(): void;
    onDismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSnackbarComponent, [{ optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSnackbarComponent, "ds-snackbar", never, { "message": { "alias": "message"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "actionLabel": { "alias": "actionLabel"; "required": false; }; "showClose": { "alias": "showClose"; "required": false; }; }, { "action": "action"; "dismissed": "dismissed"; }, never, never, true, never>;
}

declare class DsSpinnerComponent {
    /** 'indeterminate' | 'determinate' */
    mode: 'indeterminate' | 'determinate';
    /** Progress value 0–100 (only for determinate mode) */
    value: number;
    /** 'sm' | 'md' | 'lg' */
    size: 'sm' | 'md' | 'lg';
    /** 'brand' | 'white' | 'subtle' */
    color: 'brand' | 'white' | 'subtle';
    ariaLabel: string;
    get diameter(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSpinnerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSpinnerComponent, "ds-spinner", never, { "mode": { "alias": "mode"; "required": false; }; "value": { "alias": "value"; "required": false; }; "size": { "alias": "size"; "required": false; }; "color": { "alias": "color"; "required": false; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; }; }, {}, never, never, true, never>;
}

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

type TableHeaderAlign = 'left' | 'right';
type TableSortDirection = 'asc' | 'desc' | null;
/** Minimal interface for AG Grid header params — avoids hard ag-grid-community dep. */
interface AgHeaderParams {
    displayName: string;
    enableSorting: boolean;
    enableMenu: boolean;
    column: {
        getSort(): string | null | undefined;
        getActualWidth(): number;
        getColId(): string;
        addEventListener(event: string, listener: () => void): void;
        removeEventListener(event: string, listener: () => void): void;
    };
    api: {
        setColumnWidth(key: string, newWidth: number): void;
    };
    progressSort(multiSort?: boolean): void;
    showColumnMenu(source: HTMLElement): void;
}
declare class DsTableHeaderCellComponent implements OnDestroy {
    private cdr;
    /** Column header label. Overridden by agInit displayName when used as AG Grid renderer. */
    label: string;
    /** Text alignment of cell contents. */
    align: TableHeaderAlign;
    /** Show sort icon button — clicking cycles asc → desc → none. */
    sorting: boolean;
    /** Show filter icon button. */
    filtering: boolean;
    /** Show column menu (more_vert) button. */
    menuControl: boolean;
    /** Show checkbox (select-all) at the leading edge. */
    checkbox: boolean;
    /** Show left resize pipe. */
    pipeLeft: boolean;
    /** Show right resize pipe (default on). */
    pipeRight: boolean;
    /** Current sort direction — can be set externally or driven by AG Grid. */
    sortDirection: TableSortDirection;
    /** Checked state for the select-all checkbox. */
    checked: boolean;
    /** Indeterminate state for the select-all checkbox. */
    indeterminate: boolean;
    /** Emits the new column width in px when the user drags the resize handle. */
    widthChange: EventEmitter<number>;
    private agParams?;
    private sortChangedListener?;
    private resizeStartX;
    private resizeStartWidth;
    private boundMouseMove?;
    private boundMouseUp?;
    constructor(cdr: ChangeDetectorRef);
    /** True when this column shows only a checkbox with no label text. */
    get isCheckboxOnly(): boolean;
    /** Whether the left resize pipe is shown (suppressed on checkbox-only columns). */
    get showLeftPipe(): boolean;
    /** Whether the right resize pipe is shown (suppressed on checkbox-only columns). */
    get showRightPipe(): boolean;
    /** Called by AG Grid when this component is the headerComponent. */
    agInit(params: AgHeaderParams): void;
    /** Called by AG Grid to refresh the header. */
    refresh(params: AgHeaderParams): boolean;
    ngOnDestroy(): void;
    onSortClick(event: MouseEvent): void;
    get sortIconClass(): string;
    get ariaSortValue(): string | null;
    onMenuClick(triggerEl: HTMLElement): void;
    get checkboxIcon(): string;
    get checkboxClass(): string;
    onResizeStart(event: MouseEvent): void;
    private _cleanupResizeListeners;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableHeaderCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableHeaderCellComponent, "ds-table-header-cell", never, { "label": { "alias": "label"; "required": false; }; "align": { "alias": "align"; "required": false; }; "sorting": { "alias": "sorting"; "required": false; }; "filtering": { "alias": "filtering"; "required": false; }; "menuControl": { "alias": "menuControl"; "required": false; }; "checkbox": { "alias": "checkbox"; "required": false; }; "pipeLeft": { "alias": "pipeLeft"; "required": false; }; "pipeRight": { "alias": "pipeRight"; "required": false; }; "sortDirection": { "alias": "sortDirection"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; }, { "widthChange": "widthChange"; }, never, never, true, never>;
}

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

type TableCellAlign = 'left' | 'right';
type TableCellState = 'default' | 'hover' | 'focus';
/** Minimal interface for AG Grid cell renderer params. */
interface AgCellRendererParams {
    value: unknown;
    node: {
        isSelected(): boolean;
        addEventListener(event: string, listener: () => void): void;
        removeEventListener(event: string, listener: () => void): void;
    };
    colDef?: {
        cellRendererParams?: Partial<DsTableRowCellComponent>;
    };
}
declare class DsTableRowCellComponent implements OnDestroy {
    private cdr;
    /** Cell value text. Overridden by agInit params.value. */
    value: string | null;
    /** Text alignment of cell content. */
    align: TableCellAlign;
    /** Whether to render cell data text (can be false for action-only cells). */
    cellData: boolean;
    /** Show row drag gripper handle. */
    gripper: boolean;
    /** Show row selection checkbox. */
    checkbox: boolean;
    /** Checked state for the selection checkbox. */
    checked: boolean;
    /** Indeterminate state for the selection checkbox. */
    indeterminate: boolean;
    /** Apply 32px tier-1 indent (for tree/grouped rows, depth 1). */
    tier1Indent: boolean;
    /** Apply 64px tier-2 indent (for tree/grouped rows, depth 2). */
    tier2Indent: boolean;
    /** Visual interaction state — typically driven by AG Grid row events. */
    state: TableCellState;
    get isHovered(): boolean;
    get isFocused(): boolean;
    get isSelected(): boolean;
    private agParams?;
    private rowSelectedListener?;
    constructor(cdr: ChangeDetectorRef);
    /** Called by AG Grid when this component is the cellRenderer. */
    agInit(params: AgCellRendererParams): void;
    /** Called by AG Grid when the cell value changes. */
    refresh(params: AgCellRendererParams): boolean;
    ngOnDestroy(): void;
    private applyParams;
    get checkboxIcon(): string;
    get checkboxClass(): string;
    get displayValue(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableRowCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableRowCellComponent, "ds-table-row-cell", never, { "value": { "alias": "value"; "required": false; }; "align": { "alias": "align"; "required": false; }; "cellData": { "alias": "cellData"; "required": false; }; "gripper": { "alias": "gripper"; "required": false; }; "checkbox": { "alias": "checkbox"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "tier1Indent": { "alias": "tier1Indent"; "required": false; }; "tier2Indent": { "alias": "tier2Indent"; "required": false; }; "state": { "alias": "state"; "required": false; }; }, {}, never, never, true, never>;
}

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
declare class DsTableToolbarComponent {
    /** Show the left-side action button panel. Default: true. */
    showActions: boolean;
    /** Placeholder text shown in the search field when empty. */
    searchPlaceholder: string;
    /** Accessible label for the search field. */
    searchAriaLabel: string;
    /** Current search field value. Use [(searchValue)] for two-way binding. */
    searchValue: string;
    /** Whether the filter toggle button is in the active/selected state. */
    filterActive: boolean;
    /** Whether the settings toggle button is in the active/selected state. */
    settingsActive: boolean;
    /** Show the download icon button. Default: true. */
    showDownload: boolean;
    /** Emits the new search value on every keystroke. */
    searchValueChange: EventEmitter<string>;
    /** Emits the current search value when the user presses Enter. */
    search: EventEmitter<string>;
    /** Emits the new filterActive state when the filter button is toggled. */
    filterActiveChange: EventEmitter<boolean>;
    /** Emits the new settingsActive state when the settings button is toggled. */
    settingsActiveChange: EventEmitter<boolean>;
    /** Emits when the download button is clicked. */
    downloadClick: EventEmitter<void>;
    onSearchValueChange(value: string): void;
    onFilterSelectedChange(selected: boolean): void;
    onSettingsSelectedChange(selected: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableToolbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableToolbarComponent, "ds-table-toolbar", never, { "showActions": { "alias": "showActions"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "searchAriaLabel": { "alias": "searchAriaLabel"; "required": false; }; "searchValue": { "alias": "searchValue"; "required": false; }; "filterActive": { "alias": "filterActive"; "required": false; }; "settingsActive": { "alias": "settingsActive"; "required": false; }; "showDownload": { "alias": "showDownload"; "required": false; }; }, { "searchValueChange": "searchValueChange"; "search": "search"; "filterActiveChange": "filterActiveChange"; "settingsActiveChange": "settingsActiveChange"; "downloadClick": "downloadClick"; }, never, ["[toolbar-actions]", "[toolbar-extra]", "[toolbar-trailing]"], true, never>;
}

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

declare class DsTabComponent {
    /** Tab label text. */
    label: string;
    /** Show the 6px red notification dot next to the label. */
    showBadge: boolean;
    /** Material Symbol icon name shown before the label (optional). */
    icon: string;
    /** Disables the tab. */
    disabled: boolean;
    /** TemplateRef capturing projected body content — read by DsTabsComponent. */
    contentRef: TemplateRef<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTabComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTabComponent, "ds-tab", never, { "label": { "alias": "label"; "required": false; }; "showBadge": { "alias": "showBadge"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, ["*"], true, never>;
}
declare class DsTabsComponent implements AfterContentInit {
    private cdr;
    tabs: QueryList<DsTabComponent>;
    /** Index of the currently active tab. */
    activeIndex: number;
    /** Emits the index of the newly selected tab. */
    tabChange: EventEmitter<number>;
    constructor(cdr: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onTabChange(index: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTabsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTabsComponent, "ds-tabs", never, {}, { "tabChange": "tabChange"; }, ["tabs"], never, true, never>;
}

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

declare class DsTagComponent {
    label: string;
    variant: 'default' | 'more' | 'add';
    size: 'md' | 'sm';
    moreCount: number;
    removable: boolean;
    disabled: boolean;
    error: boolean;
    removed: EventEmitter<void>;
    moreClick: EventEmitter<void>;
    add: EventEmitter<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTagComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTagComponent, "ds-tag", never, { "label": { "alias": "label"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "moreCount": { "alias": "moreCount"; "required": false; }; "removable": { "alias": "removable"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "error": { "alias": "error"; "required": false; }; }, { "removed": "removed"; "moreClick": "moreClick"; "add": "add"; }, never, never, true, never>;
}

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
declare class DsTextareaComponent implements OnInit {
    private el;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    get hostReadonly(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required (adds asterisk to label). */
    required: boolean;
    /** Placeholder text. */
    placeholder: string;
    /** Current value. Use [(value)] for two-way binding. */
    value: string;
    /** Number of rows. Default: 4 */
    rows: number;
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown below the field when isError is true. */
    errorText: string;
    /** Applies error styling and shows errorText. */
    isError: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Makes the field read-only. */
    readOnly: boolean;
    /** Emits the new value on every keystroke. */
    valueChange: EventEmitter<string>;
    private _textareaId;
    get textareaId(): string;
    ngOnInit(): void;
    onInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTextareaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTextareaComponent, "ds-textarea", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "rows": { "alias": "rows"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readOnly": { "alias": "readOnly"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

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
declare class DsToggleComponent {
    /** Label text displayed next to the toggle. */
    label: string;
    /** Whether the toggle is on (checked). Use [(checked)] for two-way binding. */
    checked: boolean;
    /** Disables the toggle. */
    disabled: boolean;
    /** Show check/close icon inside the thumb (icon variant). */
    showIcon: boolean;
    /** Emits the new checked value when toggled. */
    checkedChange: EventEmitter<boolean>;
    onChange(event: MatSlideToggleChange): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsToggleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsToggleComponent, "ds-toggle", never, { "label": { "alias": "label"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "showIcon": { "alias": "showIcon"; "required": false; }; }, { "checkedChange": "checkedChange"; }, never, ["*"], true, never>;
}

type DsTooltipPosition = 'above' | 'below' | 'left' | 'right';
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
declare class DsTooltipDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsTooltipDirective, "[dsTooltip]", never, {}, {}, never, never, true, [{ directive: typeof i1.MatTooltip; inputs: { "matTooltip": "dsTooltip"; "matTooltipPosition": "dsTooltipPosition"; "matTooltipShowDelay": "dsTooltipShowDelay"; "matTooltipHideDelay": "dsTooltipHideDelay"; "matTooltipDisabled": "dsTooltipDisabled"; }; outputs: {}; }]>;
}

declare class TopNavComponent {
    static ɵfac: i0.ɵɵFactoryDeclaration<TopNavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopNavComponent, "ds-top-nav", never, {}, {}, never, ["*", "[top-nav-actions]"], true, never>;
}

export { AgentStatusComponent, DsAccordionComponent, DsAccordionPanelComponent, DsAgPaginatorComponent, DsAlertComponent, DsAvatarComponent, DsBadgeComponent, DsButtonComponent, DsCardComponent, DsCheckboxComponent, DsChipComponent, DsDialogComponent, DsDividerComponent, DsHoverCardComponent, DsIconButtonComponent, DsIconButtonToggleComponent, DsIconComponent, DsInputComponent, DsLabelComponent, DsLeadingDirective, DsListComponent, DsListItemComponent, DsMenuComponent, DsPaginatorComponent, DsProgressComponent, DsRadioComponent, DsRadioGroupComponent, DsSearchComponent, DsSelectComponent, DsSkeletonComponent, DsSnackbarComponent, DsSpinnerComponent, DsTabComponent, DsTableHeaderCellComponent, DsTableRowCellComponent, DsTableToolbarComponent, DsTabsComponent, DsTagComponent, DsTextareaComponent, DsToggleComponent, DsTooltipDirective, DsTrailingDirective, NavButtonComponent, NavExpandComponent, NavSidebarComponent, NavTabComponent, TopNavComponent };
export type { AgCellRendererParams, AgHeaderParams, AgPaginationApi, AgPaginatorStatusPanelParams, AgentStatusVariant, DsAlertSize, DsAlertVariant, DsAvatarSize, DsButtonSize, DsButtonVariant, DsDialogData, DsHoverCardVariant, DsIconButtonSize, DsIconButtonToggleSize, DsIconButtonToggleVariant, DsIconButtonVariant, DsIconSize, DsInputType, DsPageEvent, DsSelectOption, DsSnackbarData, DsSnackbarVariant, DsTooltipPosition, TableCellAlign, TableCellState, TableHeaderAlign, TableSortDirection };
