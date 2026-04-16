import * as i0 from '@angular/core';
import { OnInit, ElementRef, EventEmitter, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges, AfterContentInit, AfterViewInit, Renderer2, NgZone, AfterViewChecked, TemplateRef, QueryList } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatMenu, MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { Theme } from 'ag-grid-community';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as i1 from '@angular/material/tooltip';
import * as Highcharts from 'highcharts';

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
declare class DsSelectComponent implements OnInit {
    private el;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required. */
    required: boolean;
    /** Placeholder shown when no option is selected. */
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
    /** Emits the new value string when the selection changes. */
    valueChange: EventEmitter<string>;
    private _selectId;
    get selectId(): string;
    ngOnInit(): void;
    onSelectionChange(event: MatSelectChange): void;
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
declare class DsAutocompleteComponent implements OnInit, OnChanges, OnDestroy {
    private el;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required. */
    required: boolean;
    /** Placeholder shown inside the input. */
    placeholder: string;
    /** Current input value. Use [(value)] for two-way binding. */
    value: string;
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown below the field when isError is true. */
    errorText: string;
    /** Applies error styling and shows errorText. */
    isError: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Makes the field read-only (no typing, no autocomplete panel). */
    readonly: boolean;
    /**
     * The MatAutocomplete panel created by the consumer.
     * Required — wire up a <mat-autocomplete #auto> in your template
     * and pass the ref: [panel]="auto".
     */
    panel: MatAutocomplete;
    /** Emits the raw string value on every keystroke. */
    valueChange: EventEmitter<string>;
    /**
     * Forwarded from panel.optionSelected — emits when the user picks an option.
     * Also listen directly on your <mat-autocomplete> (optionSelected) if preferred.
     */
    optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;
    private _selectId;
    get selectId(): string;
    private _panelSub;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onInput(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsAutocompleteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsAutocompleteComponent, "ds-autocomplete", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "readonly": { "alias": "readonly"; "required": false; }; "panel": { "alias": "panel"; "required": false; }; }, { "valueChange": "valueChange"; "optionSelected": "optionSelected"; }, never, never, true, never>;
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

type DsEmptyStateSize = 'sm' | 'lg';
type DsEmptyStateLayout = 'vertical' | 'horizontal';
/**
 * Onflo Design System — Empty State
 *
 * Branded illustration + message shown when a content area has no data.
 * Use inside any container (table, card, full page) that may return zero results.
 *
 * Two sizes scale the graphic and typography:
 *   sm — for compact containers such as dashboard cards and table empty states
 *   lg — for full-page empty views
 *
 * Two layouts control graphic + text arrangement:
 *   vertical   — graphic above text (default; works in most containers)
 *   horizontal — graphic beside text (use when vertical space is constrained)
 *
 * Project optional action buttons into the default content slot.
 *
 * ADA: the graphic is aria-hidden (decorative); heading text conveys the state.
 *
 * @example
 *   <!-- Basic -->
 *   <ds-empty-state />
 *
 *   <!-- With custom message + action -->
 *   <ds-empty-state
 *     size="lg"
 *     heading="No results found"
 *     description="Try adjusting your search or filters.">
 *     <ds-button variant="outlined" (click)="clearFilters()">Clear filters</ds-button>
 *   </ds-empty-state>
 *
 *   <!-- Small horizontal — for constrained vertical space -->
 *   <ds-empty-state size="sm" layout="horizontal" heading="No items" />
 */
declare class DsEmptyStateComponent {
    /** Size variant. 'sm' for compact contexts; 'lg' for full-page empty states. Default: 'sm' */
    size: DsEmptyStateSize;
    /** Layout direction. 'vertical' stacks graphic above text; 'horizontal' places them side by side. Default: 'vertical' */
    layout: DsEmptyStateLayout;
    /** Primary message. Should describe what is empty, not just "No data". Default: 'No data available' */
    heading: string;
    /** Optional supporting text shown below the heading — use to suggest a next action or explain why. */
    description: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsEmptyStateComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsEmptyStateComponent, "ds-empty-state", never, { "size": { "alias": "size"; "required": false; }; "layout": { "alias": "layout"; "required": false; }; "heading": { "alias": "heading"; "required": false; }; "description": { "alias": "description"; "required": false; }; }, {}, never, ["*"], true, never>;
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
    /** Color variant. Defaults to red (notification). Use blue for informational, grey for neutral/inactive. */
    variant: 'red' | 'blue' | 'grey';
    get indicatorClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsBadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsBadgeComponent, "ds-badge", never, { "count": { "alias": "count"; "required": false; }; "dot": { "alias": "dot"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; }, {}, never, never, true, never>;
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
    /**
     * Toggle state. When set (true or false), marks this as a toggle button:
     * - Adds `.is-selected` class when true
     * - Binds `aria-pressed` on the native button element
     * Pair with `ds-button-group` wrapper for full toggle group semantics.
     */
    selected: boolean | null;
    /** Native button type attribute. Default: 'button' */
    type: 'button' | 'submit' | 'reset';
    /** Emits the native MouseEvent when the button is clicked. */
    clicked: EventEmitter<MouseEvent>;
    get buttonClasses(): string;
    /** Returns 'true'/'false' when this is a toggle button, null otherwise. */
    get ariaPressed(): 'true' | 'false' | null;
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsButtonComponent, "ds-button", never, { "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "type": { "alias": "type"; "required": false; }; }, { "clicked": "clicked"; }, never, ["[slot='icon-leading']", "*", "[slot='icon-trailing']", "[slot='icon-leading']", "*", "[slot='icon-trailing']", "[slot='icon-leading']", "*", "[slot='icon-trailing']"], true, never>;
}

/**
 * ds-card / ds-card-item
 *
 * Two card components for the Onflo Design System.
 *
 * ── ds-card (large vertical card) ────────────────────────────────────────────
 *
 * Full-height content card with an optional header, body, and optional actions
 * footer. Uses Angular Material MatCardModule for a11y baseline.
 *
 * Inputs:
 *   [variant]    'outlined' (default) | 'elevated'
 *   [icon]       Material Symbol name for the header leading icon (optional)
 *   [title]      Header title text (optional)
 *   [subtitle]   Header subtitle text (optional)
 *   [showClose]  Show a × dismiss button in the header (default: false)
 *
 * Outputs:
 *   (closeClick) Emits when the close button is clicked
 *
 * Content slots:
 *   (default)       Body content — any projected elements
 *   [card-actions]  Action buttons in the footer (omit for no footer)
 *
 * @example
 * <ds-card variant="outlined" icon="folder" title="Documents"
 *          subtitle="12 items" [showClose]="true" (closeClick)="onClose()">
 *   <p>Card body content goes here.</p>
 *   <div card-actions>
 *     <ds-button variant="text">Cancel</ds-button>
 *     <ds-button variant="filled">Save</ds-button>
 *   </div>
 * </ds-card>
 *
 * ── ds-card-item (compact horizontal card) ────────────────────────────────────
 *
 * Compact 56px-tall card that renders primary + optional secondary text.
 * When [interactive]="true" the entire card is hoverable and clickable.
 * An optional [card-action] slot (e.g. a more-menu button) stops click
 * propagation so it does not trigger (cardClick).
 *
 * Inputs:
 *   [primary]     Primary label text (required)
 *   [secondary]   Optional supporting text below primary
 *   [interactive] Makes the whole card clickable (default: false)
 *   [variant]     'outlined' (default) | 'elevated'
 *   [disabled]    Disables interactions
 *
 * Outputs:
 *   (cardClick)  Emits when the card body area is clicked (interactive only)
 *
 * Content slots:
 *   [leading]      Leading icon / avatar placed before the text
 *   [trailing]     Trailing static icon / status indicator
 *   [card-action]  Action button (e.g. more_vert) — click does NOT bubble to card
 *
 * @example
 * <!-- Simple navigable card -->
 * <ds-card-item primary="Team: Support" secondary="14 agents online"
 *               [interactive]="true" (cardClick)="navigate()">
 *   <span leading class="ds-icon">support_agent</span>
 *   <span trailing class="ds-icon ds-icon--sm">chevron_right</span>
 * </ds-card-item>
 *
 * <!-- Card with action button (more menu) -->
 * <ds-card-item primary="Inbox filter" [interactive]="true" (cardClick)="open()">
 *   <span leading class="ds-icon">filter_alt</span>
 *   <button card-action
 *           class="ds-icon-button ds-icon-button--icon ds-icon-button--sm"
 *           aria-label="More options" (click)="openMenu($event)">
 *     <span class="ds-icon">more_vert</span>
 *   </button>
 * </ds-card-item>
 */

/** Marker — place on the footer actions container projected into ds-card.
 *  @example <div card-actions><ds-button variant="filled">Save</ds-button></div>
 */
declare class DsCardActionsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsCardActionsDirective, "[card-actions]", never, {}, {}, never, never, true, never>;
}
/** Marker — place on the leading-slot element projected into ds-card-item.
 *  @example <span leading class="ds-icon">folder</span>
 */
declare class DsCardLeadingDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardLeadingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsCardLeadingDirective, "[leading]", never, {}, {}, never, never, true, never>;
}
/** Marker — place on the trailing-slot element projected into ds-card-item.
 *  @example <span trailing class="ds-icon ds-icon--sm">chevron_right</span>
 */
declare class DsCardTrailingDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardTrailingDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsCardTrailingDirective, "[trailing]", never, {}, {}, never, never, true, never>;
}
/** Marker — place on the action button projected into ds-card-item.
 *  Clicks on this element do not propagate to the card click handler.
 *  @example <button card-action class="ds-icon-button ..." (click)="openMenu($event)">...</button>
 */
declare class DsCardActionDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardActionDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsCardActionDirective, "[card-action]", never, {}, {}, never, never, true, never>;
}
declare class DsCardComponent implements AfterContentInit {
    private cdr;
    /** Visual variant: 'outlined' | 'elevated' */
    variant: 'outlined' | 'elevated';
    /** Material Symbol name for the leading icon in the header. */
    icon: string;
    /** Header title text. */
    title: string;
    /** Header subtitle text (smaller, secondary colour). */
    subtitle: string;
    /** Show a × close button in the top-right of the header. */
    showClose: boolean;
    /** Emits when the close button is clicked. */
    closeClick: EventEmitter<void>;
    private _actionsRef?;
    hasActions: boolean;
    constructor(cdr: ChangeDetectorRef);
    ngAfterContentInit(): void;
    get hasHeader(): boolean;
    onClose(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsCardComponent, "ds-card", never, { "variant": { "alias": "variant"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "title": { "alias": "title"; "required": false; }; "subtitle": { "alias": "subtitle"; "required": false; }; "showClose": { "alias": "showClose"; "required": false; }; }, { "closeClick": "closeClick"; }, ["_actionsRef"], ["*", "[card-actions]"], true, never>;
}
declare class DsCardItemComponent implements AfterContentInit {
    private cdr;
    /** Primary label text. */
    primary: string;
    /** Optional supporting text rendered below the primary label. */
    secondary: string;
    /** Makes the entire card clickable — adds hover/press states and emits (cardClick). */
    interactive: boolean;
    /** Visual variant: 'outlined' | 'elevated' */
    variant: 'outlined' | 'elevated';
    /** Disables pointer interactions and mutes text/icon colours. */
    disabled: boolean;
    /** Emits when the card body area is clicked (interactive mode only). */
    cardClick: EventEmitter<void>;
    private _leadingRef?;
    private _trailingRef?;
    private _actionRef?;
    hasLeading: boolean;
    hasTrailing: boolean;
    hasAction: boolean;
    constructor(cdr: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onCardClick(): void;
    onSpaceKey(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsCardItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsCardItemComponent, "ds-card-item", never, { "primary": { "alias": "primary"; "required": false; }; "secondary": { "alias": "secondary"; "required": false; }; "interactive": { "alias": "interactive"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "cardClick": "cardClick"; }, ["_leadingRef", "_trailingRef", "_actionRef"], ["[leading]", "[trailing]", "[card-action]"], true, never>;
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
declare class DsDatepickerComponent implements OnInit {
    private el;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required (adds asterisk to label). */
    required: boolean;
    /** Placeholder text shown in the input. Default: 'MM/DD/YYYY' */
    placeholder: string;
    /** Currently selected date. Use [(value)] for two-way binding. */
    value: Date | null;
    /** Minimum selectable date. */
    minDate: Date | null;
    /** Maximum selectable date. */
    maxDate: Date | null;
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown below the field when isError is true. */
    errorText: string;
    /** Applies error styling and shows errorText. */
    isError: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Emits the selected Date (or null) when the value changes. */
    valueChange: EventEmitter<Date>;
    private _fieldId;
    get fieldId(): string;
    ngOnInit(): void;
    onDateChange(event: MatDatepickerInputEvent<Date>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDatepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDatepickerComponent, "ds-datepicker", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

interface DsDateRange {
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
declare class DsDateRangePickerComponent implements OnInit {
    private el;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    constructor(el: ElementRef<HTMLElement>);
    onPointerDown(): void;
    onFocusOut(): void;
    /** Label text shown above the field. */
    label: string;
    /** Marks the field as required. */
    required: boolean;
    /** Placeholder for the start date input. */
    startPlaceholder: string;
    /** Placeholder for the end date input. */
    endPlaceholder: string;
    /** Currently selected start date. Use [(startDate)] for two-way binding. */
    startDate: Date | null;
    /** Currently selected end date. Use [(endDate)] for two-way binding. */
    endDate: Date | null;
    /** Minimum selectable date. */
    minDate: Date | null;
    /** Maximum selectable date. */
    maxDate: Date | null;
    /** Helper text shown below the field. */
    helperText: string;
    /** Error message shown below the field when isError is true. */
    errorText: string;
    /** Applies error styling and shows errorText. */
    isError: boolean;
    /** Disables the field. */
    disabled: boolean;
    /** Emits the new start date when it changes. */
    startDateChange: EventEmitter<Date>;
    /** Emits the new end date when it changes. */
    endDateChange: EventEmitter<Date>;
    /** Emits a {start, end} object whenever either date changes. */
    rangeChange: EventEmitter<DsDateRange>;
    private _startId;
    private _endId;
    get startId(): string;
    get endId(): string;
    ngOnInit(): void;
    onStartDateChange(event: MatDatepickerInputEvent<Date>): void;
    onEndDateChange(event: MatDatepickerInputEvent<Date>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDateRangePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDateRangePickerComponent, "ds-date-range-picker", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "startPlaceholder": { "alias": "startPlaceholder"; "required": false; }; "endPlaceholder": { "alias": "endPlaceholder"; "required": false; }; "startDate": { "alias": "startDate"; "required": false; }; "endDate": { "alias": "endDate"; "required": false; }; "minDate": { "alias": "minDate"; "required": false; }; "maxDate": { "alias": "maxDate"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "startDateChange": "startDateChange"; "endDateChange": "endDateChange"; "rangeChange": "rangeChange"; }, never, never, true, never>;
}

/**
 * Onflo Design System — Dialog
 *
 * A focused overlay for confirmations, forms, and alerts.
 * All body content is projected via the [dialog-body] slot;
 * action buttons are projected via [dialog-actions].
 * Pair with a backdrop when rendering outside MatDialog.
 *
 * ADA: Focus must be trapped while open (use Angular CDK FocusTrap or
 * MatDialog). Escape dismisses — caller handles close logic. Focus returns
 * to trigger on close. Set titleId to wire up aria-labelledby to the heading
 * inside the body slot.
 *
 * @example
 *   <!-- Angular component -->
 *   <ds-dialog titleId="confirm-dlg">
 *     <div dialog-body>
 *       <h2 class="ds-dialog__title" id="confirm-dlg">Confirm delete?</h2>
 *       <p class="ds-dialog__text">This action cannot be undone.</p>
 *     </div>
 *     <div dialog-actions>
 *       <ds-button variant="text" (clicked)="close()">Cancel</ds-button>
 *       <ds-button variant="filled" (clicked)="delete()">Delete</ds-button>
 *     </div>
 *   </ds-dialog>
 *
 *   <!-- Via MatDialog service -->
 *   this.dialog.open(MyDialogComponent, {
 *     panelClass: 'ds-dialog-overlay',
 *   });
 */
declare class DsDialogComponent {
    /** Whether to render the divider line between body and actions. Default: true. */
    showDivider: boolean;
    /** ID of the heading element inside [dialog-body] — wired to aria-labelledby. */
    titleId?: string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsDialogComponent, "ds-dialog", never, { "showDivider": { "alias": "showDivider"; "required": false; }; "titleId": { "alias": "titleId"; "required": false; }; }, {}, never, ["[dialog-body]", "[dialog-actions]"], true, never>;
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
 * Positioning: control panel direction via [xPosition] and [yPosition] on ds-menu.
 * The CDK overlay auto-flips above or left/right when the panel would overflow
 * the viewport.
 *
 * @example — Basic menu
 *   <button [matMenuTriggerFor]="myMenu.matMenu">Options</button>
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
    /** Horizontal position of the panel relative to the trigger. Default: 'after'. */
    xPosition: MenuPositionX;
    /** Vertical position of the panel relative to the trigger. Default: 'below'. */
    yPosition: MenuPositionY;
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
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMenuComponent, "ds-menu", never, { "xPosition": { "alias": "xPosition"; "required": false; }; "yPosition": { "alias": "yPosition"; "required": false; }; "search": { "alias": "search"; "required": false; }; "searchPlaceholder": { "alias": "searchPlaceholder"; "required": false; }; "searchValue": { "alias": "searchValue"; "required": false; }; }, { "searchValueChange": "searchValueChange"; }, never, ["*"], true, never>;
}

/** Marker directive — place on the tabs container projected into the modal tabs slot.
 *  @example <div modal-tabs><ds-tabs>...</ds-tabs></div>
 */
declare class DsModalTabsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsModalTabsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsModalTabsDirective, "[modal-tabs]", never, {}, {}, never, never, true, never>;
}
/** Marker directive — place on the actions container projected into the modal footer slot.
 *  @example <div modal-actions><ds-button variant="filled">Save</ds-button></div>
 */
declare class DsModalActionsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<DsModalActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DsModalActionsDirective, "[modal-actions]", never, {}, {}, never, never, true, never>;
}
type DsModalVariant = 'close' | 'collapse';
type DsModalSize = 'fixed' | 'full';
/**
 * Onflo Design System — Modal
 *
 * A full-featured modal panel with a sticky header, always-scrollable body,
 * optional tabs below the header, and an optional sticky actions footer.
 *
 * Two dismiss variants:
 *   close    — shows a × icon; use when the modal completes or cancels a task
 *   collapse — shows a collapse_content icon; use when minimizing to a tray or sidebar
 *
 * Two sizes:
 *   fixed — 500px wide, centered in the backdrop (default)
 *   full  — fills the full backdrop area (width 100%, height 100%)
 *
 * Content slots (via directives on projected elements):
 *   [modal-tabs]    — tabs row rendered below the header (detected automatically)
 *   [modal-actions] — footer action buttons (detected automatically; omit for no footer)
 *   (default)       — scrollable body content
 *
 * ADA:
 *   role="dialog" + aria-modal="true" on the modal host.
 *   Escape handling and focus trapping are the caller's responsibility
 *   (use Angular CDK FocusTrap or MatDialog for production).
 *   The (dismissClick) output fires on the dismiss button click — caller closes the modal.
 *
 * @example
 *   <ds-modal title="Edit Profile" subtitle="Update your account details"
 *             variant="close" size="fixed"
 *             (dismissClick)="closeModal()">
 *
 *     <!-- Optional tabs -->
 *     <div modal-tabs>
 *       <ds-tabs>
 *         <ds-tab label="Details" [active]="true" />
 *         <ds-tab label="Settings" />
 *       </ds-tabs>
 *     </div>
 *
 *     <!-- Scrollable body (no padding — add your own inside) -->
 *     <div style="padding: 16px;">
 *       <p>Profile form content goes here.</p>
 *     </div>
 *
 *     <!-- Optional actions footer -->
 *     <div modal-actions>
 *       <ds-button variant="text" (clicked)="closeModal()">Cancel</ds-button>
 *       <ds-button variant="filled" (clicked)="save()">Save</ds-button>
 *     </div>
 *
 *   </ds-modal>
 */
declare class DsModalComponent implements AfterContentInit {
    private cdr;
    /** Modal heading — always visible in the sticky header. */
    title: string;
    /** Optional subtext below the title (body-medium style). */
    subtitle: string;
    /** Dismiss button icon variant. 'close' shows ×; 'collapse' shows collapse_content. */
    variant: DsModalVariant;
    /** Width mode. 'fixed' = 500px; 'full' = fills backdrop. */
    size: DsModalSize;
    /** Emits when the dismiss (close / collapse) button is clicked. */
    dismissClick: EventEmitter<void>;
    private _tabsRef?;
    private _actionsRef?;
    hasTabs: boolean;
    hasActions: boolean;
    /** Unique ID for aria-labelledby wiring. */
    readonly titleId: string;
    constructor(cdr: ChangeDetectorRef);
    ngAfterContentInit(): void;
    onDismiss(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsModalComponent, "ds-modal", never, { "title": { "alias": "title"; "required": false; }; "subtitle": { "alias": "subtitle"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "size": { "alias": "size"; "required": false; }; }, { "dismissClick": "dismissClick"; }, ["_tabsRef", "_actionsRef"], ["[modal-tabs]", "*", "[modal-actions]"], true, never>;
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

declare class DsRichTextEditorComponent implements OnInit, OnDestroy {
    private el;
    private renderer;
    private ngZone;
    private cdr;
    readonly hostClass = true;
    get hostFocused(): boolean;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    get hostResizing(): boolean;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2, ngZone: NgZone, cdr: ChangeDetectorRef);
    /** Accessible label rendered above the editor and linked via aria-labelledby. */
    label: string;
    /** Required marker — adds * to the label. */
    required: boolean;
    /** Placeholder text shown when the editor is empty. */
    placeholder: string;
    /** Current HTML content. Use [(value)] for two-way binding. */
    value: string;
    /** Helper text shown below the shell. */
    helperText: string;
    /** Error message shown below the shell when isError is true. */
    errorText: string;
    /** Applies the error border and shows errorText. */
    isError: boolean;
    /** Disables the editor and toolbar. */
    disabled: boolean;
    /** Show the drag-resize handle in the bottom-right corner. Default true. */
    showResize: boolean;
    /** Show the expand button that opens a larger modal editor. Default true. */
    showExpand: boolean;
    /** Emits the new HTML string on every content change. */
    valueChange: EventEmitter<string>;
    readonly editorId: string;
    editorInstance: any;
    expandedEditorInstance: any;
    isFocused: boolean;
    isExpanded: boolean;
    expandedValue: string;
    isBold: boolean;
    isItalic: boolean;
    isUnderline: boolean;
    isBulletedList: boolean;
    isNumberedList: boolean;
    private _isResizing;
    private _resizeCleanup;
    private _expandBtnEl;
    ngOnInit(): void;
    ngOnDestroy(): void;
    get editorConfig(): {
        toolbar: {
            items: any[];
        };
        placeholder: string;
        language: string;
    };
    /** Called when the main editor instance is ready. */
    onEditorReady(editor: any): void;
    /** Called when the main editor content changes. */
    onEditorChange({ editor }: {
        editor: any;
    }): void;
    /** Called when the main editor gains focus. */
    onEditorFocus(_payload: any): void;
    /** Called when the main editor loses focus. */
    onEditorBlur(_payload: any): void;
    /** Called when the expanded modal editor is ready. */
    onExpandedEditorReady(editor: any): void;
    /** Called when the expanded editor content changes. */
    onExpandedEditorChange({ editor }: {
        editor: any;
    }): void;
    /**
     * Execute a CKEditor command by name.
     * @param command  e.g. 'bold', 'italic', 'underline', 'removeFormat',
     *                      'link', 'bulletedList', 'numberedList'
     * @param expanded When true, targets the expanded modal editor.
     */
    execCommand(command: string, expanded?: boolean): void;
    private _syncToolbarState;
    /** Opens the expanded modal editor. */
    expand(triggerEl?: HTMLElement): void;
    /** Closes the expanded modal editor, syncing content back to the main editor. */
    closeExpand(): void;
    /** Escape key closes the expand modal (bubbles from host). */
    onEscape(event: Event): void;
    /** Starts a JS-based vertical resize on mousedown of the resize handle. */
    onResizeStart(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsRichTextEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsRichTextEditorComponent, "ds-rich-text-editor", never, { "label": { "alias": "label"; "required": false; }; "required": { "alias": "required"; "required": false; }; "placeholder": { "alias": "placeholder"; "required": false; }; "value": { "alias": "value"; "required": false; }; "helperText": { "alias": "helperText"; "required": false; }; "errorText": { "alias": "errorText"; "required": false; }; "isError": { "alias": "isError"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "showResize": { "alias": "showResize"; "required": false; }; "showExpand": { "alias": "showExpand"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, true, never>;
}

type DsSaveBarVariant = 'default' | 'error';
/**
 * Onflo Design System — Save Bar
 *
 * Persistent bar that appears when a user has unsaved changes. Provides
 * Cancel, Save Progress, and Save and Exit actions. Use when a form or
 * settings page has unsaved changes that require explicit save or discard.
 * Do not use when changes auto-save.
 *
 * Default variant: blue border, info dot — "You have unsaved changes"
 * Error variant: red border, error dot — "Required information missing"
 *
 * ADA: announces its appearance via role="status" (default) / role="alert" (error).
 *
 * @example
 *   <ds-save-bar
 *     (cancelClick)="onCancel()"
 *     (saveProgressClick)="onSaveProgress()"
 *     (saveAndExitClick)="onSaveAndExit()" />
 *
 *   <ds-save-bar
 *     variant="error"
 *     message="Please complete all required fields."
 *     (cancelClick)="onCancel()"
 *     (saveProgressClick)="onSaveProgress()"
 *     (saveAndExitClick)="onSaveAndExit()" />
 */
declare class DsSaveBarComponent {
    /** Visual/semantic variant. Default: 'default' */
    variant: DsSaveBarVariant;
    /** Message text. Falls back to the variant default if not provided. */
    message: string;
    /** Cancel button label. */
    cancelLabel: string;
    /** Save Progress button label. */
    saveProgressLabel: string;
    /** Save and Exit button label. */
    saveAndExitLabel: string;
    /** Emits when Cancel is clicked. */
    cancelClick: EventEmitter<void>;
    /** Emits when Save Progress is clicked. */
    saveProgressClick: EventEmitter<void>;
    /** Emits when Save and Exit is clicked. */
    saveAndExitClick: EventEmitter<void>;
    get hostClass(): string;
    get role(): string;
    get displayMessage(): string;
    onCancel(): void;
    onSaveProgress(): void;
    onSaveAndExit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsSaveBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsSaveBarComponent, "ds-save-bar", never, { "variant": { "alias": "variant"; "required": false; }; "message": { "alias": "message"; "required": false; }; "cancelLabel": { "alias": "cancelLabel"; "required": false; }; "saveProgressLabel": { "alias": "saveProgressLabel"; "required": false; }; "saveAndExitLabel": { "alias": "saveAndExitLabel"; "required": false; }; }, { "cancelClick": "cancelClick"; "saveProgressClick": "saveProgressClick"; "saveAndExitClick": "saveAndExitClick"; }, never, never, true, never>;
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

declare class SubnavButtonComponent {
    label: string;
    selected: boolean;
    disabled: boolean;
    navClick: EventEmitter<void>;
    onNavClick(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubnavButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubnavButtonComponent, "ds-subnav-button", never, { "label": { "alias": "label"; "required": false; }; "selected": { "alias": "selected"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "navClick": "navClick"; }, never, never, true, never>;
}

declare class SubnavHeaderComponent {
    /** Section icon — Material Symbols Rounded name. Defaults to 'language'. */
    icon: string;
    text: string;
    expanded: boolean;
    disabled: boolean;
    expandedChange: EventEmitter<boolean>;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubnavHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubnavHeaderComponent, "ds-subnav-header", never, { "icon": { "alias": "icon"; "required": false; }; "text": { "alias": "text"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "expandedChange": "expandedChange"; }, never, ["*"], true, never>;
}

declare class SubnavSubheaderComponent {
    text: string;
    expanded: boolean;
    disabled: boolean;
    expandedChange: EventEmitter<boolean>;
    toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubnavSubheaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubnavSubheaderComponent, "ds-subnav-subheader", never, { "text": { "alias": "text"; "required": false; }; "expanded": { "alias": "expanded"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "expandedChange": "expandedChange"; }, never, ["*"], true, never>;
}

/**
 * Onflo Design System — Column Panel
 *
 * AG Grid custom tool panel for column configuration.
 * Implements IToolPanelAngularComp — register via toolPanelDef in gridOptions.
 *
 * Features:
 *   - Comfort/Compact density toggle
 *   - Column visibility toggle (checkbox per column, drag to reorder)
 *   - Pivot Mode toggle
 *   - Row Groups section — shows active groups as removable chips; "Add Column"
 *     opens an inline picker menu listing all groupable columns
 *   - Values (aggregation) section — "Add Column" opens same picker pattern
 *
 * AG Grid usage:
 *   gridOptions = {
 *     sideBar: {
 *       toolPanels: [{
 *         id: 'columns',
 *         labelDefault: 'Columns',
 *         labelKey: 'columns',
 *         iconKey: 'columns',
 *         toolPanel: DsColumnPanelComponent,
 *       }]
 *     }
 *   }
 *
 * Standalone usage (for a custom toggle side panel):
 *   <ds-column-panel
 *     [columns]="myColumns"
 *     [(density)]="density"
 *     (densityChange)="onDensityChange($event)"
 *     (columnVisibilityChange)="onColVisibility($event)"
 *   />
 *
 * ADA:
 *   Column checkboxes use role="checkbox" + aria-checked.
 *   Density buttons use aria-pressed.
 *   Pivot toggle is a native <input type="checkbox">.
 *   Add Column buttons use aria-expanded to reflect menu state.
 */

type TableDensity = 'comfort' | 'compact';
interface ColumnPanelItem {
    /** AG Grid column ID. */
    colId: string;
    /** Display name shown in the panel row. */
    label: string;
    /** Whether the column is currently visible. */
    visible: boolean;
    /**
     * When true the row is non-interactive (standalone usage only — shown at reduced
     * opacity with no pointer events). Not used when driven by the AG Grid API, where
     * lockVisible columns are hidden from the list entirely.
     */
    system?: boolean;
}
interface ColumnVisibilityChange {
    colId: string;
    visible: boolean;
}
/** Minimal AG Grid API surface needed by the column panel. */
interface AgColumnPanelApi {
    getAllGridColumns(): AgPanelColumn[];
    setColumnVisible(key: string, visible: boolean): void;
    moveColumn(key: string, toIndex: number): void;
    isPivotMode(): boolean;
    setPivotMode(mode: boolean): void;
    getRowGroupColumns(): AgPanelColumn[];
    addRowGroupColumn(key: string): void;
    removeRowGroupColumn(key: string): void;
    getValueColumns(): AgPanelColumn[];
    addValueColumn(key: string): void;
    removeValueColumn(key: string): void;
    getPivotColumns(): AgPanelColumn[];
    addPivotColumn(key: string): void;
    removePivotColumn(key: string): void;
    addEventListener(event: string, callback: () => void): void;
    removeEventListener(event: string, callback: () => void): void;
}
interface AgPanelColumn {
    getColId(): string;
    getColDef(): {
        headerName?: string;
        /**
         * Set true on colDef to hide this column from the Column Visibility list entirely.
         * The column still exists in the grid — it is just not shown in ds-column-panel.
         * Use on system columns that should never be toggled (checkbox cols, pinned action cols).
         */
        lockVisible?: boolean;
        suppressMovable?: boolean;
        /** Set true on colDef to allow this column to appear in the row groups picker. */
        enableRowGroup?: boolean;
        /** Set true on colDef to allow this column to appear in the values (aggregation) picker. */
        enableValue?: boolean;
        /** Set true on colDef to allow this column to appear in the pivot column labels picker. */
        enablePivot?: boolean;
        /**
         * Set true to prevent UI-based pinning changes (drag-to-pin and column menu pin options).
         * The column can still be pinned/unpinned via API. Use on system columns that should
         * always remain pinned or always remain unpinned.
         */
        lockPinned?: boolean;
        /**
         * Set true on colDef to hide this column from the tool panel column list entirely.
         * The column still exists in the grid — it is just not shown in ds-column-panel.
         * Use for internal system columns that consumers should never toggle or reorder.
         */
        suppressColumnsToolPanel?: boolean;
    };
    isVisible(): boolean;
}
/**
 * State persisted by the tool panel — returned from getState() and restored via
 * initialState in agInit. Integrates with AG Grid's grid state save/restore system.
 */
interface DsColumnPanelState {
    /** Which density is currently active. */
    density?: TableDensity;
    /** Whether the Column Visibility section is expanded. */
    colVisibilityExpanded?: boolean;
}
interface AgToolPanelParams {
    api: AgColumnPanelApi;
    /**
     * Call this whenever internal panel state changes so AG Grid's grid state
     * save/restore system knows the state has updated. Pass as `onStateUpdated`
     * from IToolPanelParams.
     */
    onStateUpdated?: () => void;
    /**
     * Previously saved panel state to restore on init. Populated by AG Grid when
     * grid state is restored. Contains whatever getState() returned last time.
     */
    initialState?: DsColumnPanelState;
    /** Hide the Pivot Mode toggle row. Default: false (shown). */
    suppressPivotMode?: boolean;
    /** Hide the Row Groups section (header, chips, Add Column picker). Default: false (shown). */
    suppressRowGroups?: boolean;
    /** Hide the Values (aggregation) section. Default: false (shown). */
    suppressValues?: boolean;
}
/** A column entry in the row-group or value picker menu. */
interface ColumnPickerOption {
    colId: string;
    label: string;
}
declare class DsColumnPanelComponent implements OnDestroy {
    private readonly cdr;
    /** Column list — auto-populated when [api] is bound, otherwise set manually. */
    columns: ColumnPanelItem[];
    /** Whether the Column Visibility section is expanded (controls the collapse toggle). */
    colVisibilityExpanded: boolean;
    /** Current row density. Use [(density)] for two-way binding. */
    density: TableDensity;
    /** Whether pivot mode is enabled. */
    pivotMode: boolean;
    /** Active row group columns shown as chips in the Row Groups section. */
    activeRowGroups: ColumnPickerOption[];
    /** Active value (aggregation) columns shown as chips in the Values section. */
    activeValueColumns: ColumnPickerOption[];
    /** Whether the row-group column picker menu is open. */
    showRowGroupMenu: boolean;
    /** Whether the value column picker menu is open. */
    showValueMenu: boolean;
    /** Active pivot columns shown as list rows in the Column Labels section. */
    activePivotColumns: ColumnPickerOption[];
    /** Whether the pivot column picker menu is open. */
    showPivotMenu: boolean;
    /** Whether the Pivot Mode row is hidden (set via suppressPivotMode toolPanelParam). */
    suppressPivotMode: boolean;
    /** Whether the Row Groups section is hidden (set via suppressRowGroups toolPanelParam). */
    suppressRowGroups: boolean;
    /** Whether the Values section is hidden (set via suppressValues toolPanelParam). */
    suppressValues: boolean;
    densityChange: EventEmitter<TableDensity>;
    columnVisibilityChange: EventEmitter<ColumnVisibilityChange>;
    pivotModeChange: EventEmitter<boolean>;
    private _api;
    private _onStateUpdated?;
    private readonly _colChanged;
    private readonly _pivotChanged;
    private readonly _groupChanged;
    constructor(cdr: ChangeDetectorRef);
    agInit(params: AgToolPanelParams): void;
    /**
     * Returns current panel state for AG Grid's grid state save/restore system.
     * AG Grid calls this when saving grid state (e.g. before page navigation).
     */
    getState(): DsColumnPanelState;
    /** Called by AG Grid when the tool panel is refreshed. */
    refresh(): void;
    ngOnDestroy(): void;
    onDocumentClick(): void;
    private _syncColumns;
    private _syncPivot;
    private _syncGroups;
    get rowGroupMenuOptions(): ColumnPickerOption[];
    get valueMenuOptions(): ColumnPickerOption[];
    get pivotMenuOptions(): ColumnPickerOption[];
    toggleColVisibility(): void;
    onDensityChange(value: TableDensity): void;
    toggleColumnVisibility(col: ColumnPanelItem): void;
    togglePivotMode(): void;
    toggleRowGroupMenu(event: Event): void;
    selectRowGroupColumn(col: ColumnPickerOption, event: Event): void;
    removeRowGroupColumn(colId: string): void;
    toggleValueMenu(event: Event): void;
    selectValueColumn(col: ColumnPickerOption, event: Event): void;
    removeValueColumn(colId: string): void;
    togglePivotMenu(event: Event): void;
    selectPivotColumn(col: ColumnPickerOption, event: Event): void;
    removePivotColumn(colId: string): void;
    onDragStart(event: DragEvent, index: number): void;
    onDrop(event: DragEvent, toIndex: number): void;
    onDragOver(event: DragEvent): void;
    checkboxIcon(col: ColumnPanelItem): string;
    checkboxClass(col: ColumnPanelItem): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsColumnPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsColumnPanelComponent, "ds-column-panel", never, { "columns": { "alias": "columns"; "required": false; }; "density": { "alias": "density"; "required": false; }; "pivotMode": { "alias": "pivotMode"; "required": false; }; }, { "densityChange": "densityChange"; "columnVisibilityChange": "columnVisibilityChange"; "pivotModeChange": "pivotModeChange"; }, never, never, true, never>;
}

/**
 * Onflo Design System — AG Grid Theme
 *
 * Pre-configured AG Grid theme for use with all Onflo tables.
 * Built on Quartz (AG Grid's modern default) with:
 *   - Material icon set — matches Onflo's Material Symbols Rounded usage
 *   - Standard density row/header height (56px)
 *   - Onflo spacing base unit (8px)
 *   - AG Grid's native borders disabled — ds-table-header-cell and
 *     ds-table-row-cell manage their own borders via Onflo tokens
 *
 * Color, typography, and surface tokens are applied separately via CSS custom
 * properties in _table-ag-theme.scss — they cannot be set programmatically
 * because they reference CSS variables that resolve at runtime.
 *
 * Usage:
 *   import { onfloTheme } from '@onflo/design-system';
 *
 *   gridOptions: GridOptions = {
 *     theme: onfloTheme,
 *     defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
 *     // ...
 *   };
 *
 * Density variants:
 *   The default density is 56px (standard). To switch density, set
 *   --ag-row-height and --ag-header-height on the grid's host element.
 *   These CSS custom properties override the withParams() defaults:
 *
 *   Comfortable (68px):
 *     .your-grid-host { --ag-row-height: 68px; --ag-header-height: 68px; }
 *
 *   Compact (42px):
 *     .your-grid-host { --ag-row-height: 42px; --ag-header-height: 42px; }
 *
 *   Note: also update ds-table-header-cell and ds-table-row-cell host heights
 *   to match — those components manage their own cell height independently.
 */

declare const onfloTheme: Theme;

/**
 * Onflo Design System — Table Context Menu
 *
 * Right-click context menu for AG Grid column headers and data rows.
 * Visual styling uses the existing ds-menu CSS class API — no new visual
 * language introduced; this component is purely a positioned overlay.
 *
 * ── Setup ────────────────────────────────────────────────────────────────────
 *
 * 1. Add to grid options:
 *      suppressContextMenu: true        — disables AG Grid's row context menu
 *      suppressHeaderContextMenu: true  — disables AG Grid's header context menu
 *
 * 2. Place once in your page/layout template:
 *      <ds-table-context-menu
 *        [visible]="ctxVisible"
 *        [x]="ctxX"
 *        [y]="ctxY"
 *        [items]="ctxItems"
 *        (closed)="ctxVisible = false"
 *      />
 *
 * 3. Wire context menu events on your column definitions:
 *
 *    Header (on the headerComponent):
 *      (headerContextMenu)="onHeaderRightClick($event)"
 *
 *    Row cell (on the cellRenderer):
 *      (rowContextMenu)="onRowRightClick($event)"
 *
 * ── Default item builders ─────────────────────────────────────────────────────
 *
 *   import {
 *     buildDefaultHeaderContextMenuItems,
 *     buildDefaultRowContextMenuItems,
 *   } from '@onflo/design-system';
 *
 *   onHeaderRightClick(e: DsTableHeaderContextMenuEvent): void {
 *     this.ctxItems = buildDefaultHeaderContextMenuItems(
 *       e.params.column.getColId(),
 *       e.params.api,
 *     );
 *     this.ctxX = e.x;
 *     this.ctxY = e.y;
 *     this.ctxVisible = true;
 *   }
 *
 *   onRowRightClick(e: DsTableRowContextMenuEvent): void {
 *     this.ctxItems = buildDefaultRowContextMenuItems(e.params.value);
 *     this.ctxX = e.x;
 *     this.ctxY = e.y;
 *     this.ctxVisible = true;
 *   }
 *
 * ── Customising items ─────────────────────────────────────────────────────────
 *
 * Spread, replace, or filter the default arrays per project:
 *
 *   this.ctxItems = [
 *     ...buildDefaultHeaderContextMenuItems(colId, api),
 *     { separator: true },
 *     { label: 'My Custom Action', icon: 'star', action: () => doSomething() },
 *   ];
 *
 * ADA: role="menu" on panel; role="menuitem" per item; Escape closes;
 *      aria-disabled on disabled items; focus moves to panel on open.
 */

/**
 * Emitted by DsTableHeaderCellComponent on right-click.
 * params.api exposes the AG Grid methods needed for the default header actions.
 */
interface DsTableHeaderContextMenuEvent {
    /** Cursor clientX — use as the x input on DsTableContextMenuComponent. */
    x: number;
    /** Cursor clientY — use as the y input on DsTableContextMenuComponent. */
    y: number;
    params: {
        column: {
            getColId(): string;
            getActualWidth(): number;
            getSort?(): string | null | undefined;
            getSortDef?(): {
                direction: 'asc' | 'desc' | null;
            } | null;
        };
        api: {
            setColumnWidth(colId: string, width: number, finished?: boolean): void;
            applyColumnState(params: {
                state: Array<{
                    colId: string;
                    sort?: 'asc' | 'desc' | null;
                }>;
                defaultState?: {
                    sort?: null;
                };
            }): void;
            setColumnPinned(colId: string, pinned: 'left' | 'right' | null): void;
            autoSizeColumn(colId: string, skipHeader?: boolean): void;
            resetColumnState(): void;
            addRowGroupColumn(colId: string): void;
        };
    };
}
/**
 * Emitted by DsTableRowCellComponent on right-click.
 * params.value is the raw cell value — pass it to buildDefaultRowContextMenuItems().
 */
interface DsTableRowContextMenuEvent {
    /** Cursor clientX — use as the x input on DsTableContextMenuComponent. */
    x: number;
    /** Cursor clientY — use as the y input on DsTableContextMenuComponent. */
    y: number;
    params: {
        value: unknown;
    };
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
    /** Column header display text (respects headerValueGetter). */
    displayName: string;
    /** Whether sorting is enabled on this column (from colDef.sortable). */
    enableSorting: boolean;
    /** Whether the column menu button should be shown (from colDef.suppressMenu). */
    enableMenu: boolean;
    /**
     * Whether a dedicated filter icon button should be shown (AG Grid v29+).
     * Maps to the `filtering` input. Falls back to the custom `filtering`
     * headerComponentParam when not provided by older AG Grid versions.
     */
    enableFilterButton?: boolean;
    column: {
        /**
         * Returns the current sort direction.
         * AG Grid v28 and earlier — use getSortDef when available.
         */
        getSort?(): string | null | undefined;
        /**
         * Returns the sort definition object — preferred API (AG Grid v29+).
         * `direction` is 'asc' | 'desc' | null; method returns null when column
         * is not sortable.
         */
        getSortDef?(): {
            direction: 'asc' | 'desc' | null;
        } | null;
        getActualWidth(): number;
        getColId(): string;
        /** Whether a filter is currently active on this column. */
        isFilterActive(): boolean;
        addEventListener(event: string, listener: () => void): void;
        removeEventListener(event: string, listener: () => void): void;
    };
    api: {
        /**
         * finished: false during drag (flex columns reflow in real-time),
         * finished: true on release (AG Grid finalizes state and fires columnResized).
         * Columns with flex: 1 in their colDef automatically fill remaining space.
         */
        setColumnWidth(key: string, newWidth: number, finished?: boolean): void;
        /** Sets a specific sort state on one or more columns. Used by the context menu sort actions. */
        applyColumnState(params: {
            state: Array<{
                colId: string;
                sort?: 'asc' | 'desc' | null;
            }>;
            defaultState?: {
                sort?: null;
            };
        }): void;
        /** Pins or unpins a column. Pass null to unpin. */
        setColumnPinned(colId: string, pinned: 'left' | 'right' | null): void;
        /** Auto-sizes a column to fit its content. */
        autoSizeColumn(colId: string, skipHeader?: boolean): void;
        /** Resets all column state (widths, visibility, order, pin, sort) to defaults. */
        resetColumnState(): void;
        /** Adds a column to the active row group set. */
        addRowGroupColumn(colId: string): void;
        /**
         * Selects all rows in the dataset, including filtered-out rows.
         * Use selectAllFiltered when you only want to select visible rows.
         */
        selectAll?(): void;
        /**
         * Selects only rows that pass the currently active filters (preferred over
         * selectAll for checkbox columns where "select all" means visible rows).
         */
        selectAllFiltered?(): void;
        /** Deselects all selected rows. */
        deselectAll?(): void;
        /**
         * Returns the currently selected row nodes. Used to calculate checked /
         * indeterminate state on the select-all checkbox.
         */
        getSelectedNodes?(): unknown[];
        /**
         * Returns the number of rows currently displayed (after filters).
         * Used alongside getSelectedNodes to determine indeterminate state.
         */
        getDisplayedRowCount?(): number;
        /** Subscribe to grid-level events (e.g. 'selectionChanged'). */
        addEventListener(event: string, listener: () => void): void;
        /** Unsubscribe from grid-level events. */
        removeEventListener(event: string, listener: () => void): void;
    };
    /** Advance sort direction through the cycle: none → asc → desc → none. */
    progressSort(multiSort?: boolean): void;
    /** Set an explicit sort direction. Use null to clear the sort. */
    setSort(sort: 'asc' | 'desc' | null, multiSort?: boolean): void;
    /** Show the column menu popup anchored to the supplied element. */
    showColumnMenu(source: HTMLElement): void;
    /** Show the filter popup anchored to the supplied element (AG Grid v29+). */
    showFilter(source: HTMLElement): void;
    /** Text alignment override passed via headerComponentParams. */
    align?: TableHeaderAlign;
    /** Explicit filter button visibility override via headerComponentParams. */
    filtering?: boolean;
    /** Show left resize pipe via headerComponentParams. */
    pipeLeft?: boolean;
    /** Show right resize pipe via headerComponentParams. */
    pipeRight?: boolean;
    /** Show select-all checkbox via headerComponentParams. */
    checkbox?: boolean;
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
    /**
     * Emits on right-click (contextmenu) when this component is used inside AG Grid.
     * Use with suppressHeaderContextMenu: true in grid options to disable AG Grid's
     * built-in header menu, then show <ds-table-context-menu> at the emitted coords.
     */
    headerContextMenu: EventEmitter<DsTableHeaderContextMenuEvent>;
    /** Whether a filter is currently active on this column — drives the filter icon colour. */
    filterActive: boolean;
    private agParams?;
    private sortChangedListener?;
    private filterChangedListener?;
    private selectionChangedListener?;
    private resizeStartX;
    private resizeStartWidth;
    private resizeCurrentWidth;
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
    /** Called by AG Grid to refresh the header when the column definition changes. */
    refresh(params: AgHeaderParams): boolean;
    ngOnDestroy(): void;
    /**
     * Reads standard AG Grid params and any custom headerComponentParams merged
     * in by AG Grid. Called on agInit and refresh.
     */
    private _applyAgParams;
    onSortClick(event: MouseEvent): void;
    get sortIconClass(): string;
    get sortAriaLabel(): string;
    get ariaSortValue(): string | null;
    /**
     * Toggle select-all / deselect-all.
     * Checked or indeterminate → deselect all.
     * Unchecked → select all displayed rows (respects active filters).
     */
    onCheckboxClick(): void;
    onMenuClick(triggerEl: HTMLElement): void;
    onFilterClick(triggerEl: HTMLElement): void;
    onContextMenu(event: MouseEvent): void;
    get checkboxIcon(): string;
    get checkboxClass(): string;
    /**
     * Double-click the resize handle to auto-size the column to fit its content.
     * Equivalent to double-clicking the built-in AG Grid resize grip.
     */
    onResizeDblClick(event: MouseEvent): void;
    onResizeStart(event: MouseEvent): void;
    private _cleanupResizeListeners;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableHeaderCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableHeaderCellComponent, "ds-table-header-cell", never, { "label": { "alias": "label"; "required": false; }; "align": { "alias": "align"; "required": false; }; "sorting": { "alias": "sorting"; "required": false; }; "filtering": { "alias": "filtering"; "required": false; }; "menuControl": { "alias": "menuControl"; "required": false; }; "checkbox": { "alias": "checkbox"; "required": false; }; "pipeLeft": { "alias": "pipeLeft"; "required": false; }; "pipeRight": { "alias": "pipeRight"; "required": false; }; "sortDirection": { "alias": "sortDirection"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; }, { "widthChange": "widthChange"; "headerContextMenu": "headerContextMenu"; }, never, never, true, never>;
}

/**
 * Onflo Design System — Table Header Group Cell
 *
 * AG Grid custom group header renderer for the Onflo table system.
 * Matches the visual language of DsTableHeaderCellComponent — same height,
 * background, border, and label typography.
 *
 * AG Grid usage (in your gridOptions):
 *   gridOptions = {
 *     defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF,
 *     columnDefs: [
 *       {
 *         headerName: 'Contact',
 *         headerGroupComponent: DsTableHeaderGroupCellComponent, // or via defaultColGroupDef
 *         openByDefault: false,
 *         marryChildren: true,
 *         children: [
 *           { field: 'firstName', headerName: 'First name' },
 *           { field: 'lastName',  headerName: 'Last name'  },
 *         ],
 *       },
 *     ],
 *   };
 *
 * Expandable groups:
 *   Mark some children with columnGroupShow: 'open' so the group
 *   has columns that only appear when expanded. This makes the group
 *   expandable and shows the expand/collapse chevron automatically.
 *
 * Figma: primitive/table-header-group-cell
 * ADA: expand button has aria-label + aria-expanded; role="columnheader" on host.
 */

/** Minimal interface for AG Grid group header params — avoids hard ag-grid dep. */
interface AgHeaderGroupParams {
    /** Group display text (respects headerValueGetter on the group def). */
    displayName: string;
    columnGroup: {
        /** Whether the group has columns that can be shown/hidden by expanding/collapsing. */
        isExpandable(): boolean;
        /** Whether the group is currently in an expanded state. */
        isExpanded(): boolean;
        /** The column group definition (headerName, marryChildren, etc.). */
        getColGroupDef(): {
            headerName?: string;
            marryChildren?: boolean;
        } | null;
        /**
         * Currently visible leaf columns in this group — useful when implementing
         * group-level resize (resize each leaf proportionally).
         */
        getDisplayedLeafColumns(): Array<{
            getColId(): string;
            getActualWidth(): number;
        }>;
        addEventListener(event: string, listener: () => void): void;
        removeEventListener(event: string, listener: () => void): void;
    };
    /** Call to programmatically expand or collapse the group. */
    setExpanded(expanded: boolean): void;
    /** Show the column group menu (Enterprise). Optional — not all group headers expose this. */
    showColumnMenu?(source: HTMLElement): void;
    /** Set a dynamic tooltip on the group header cell. */
    setTooltip?(value: string, shouldDisplayTooltip?: () => boolean): void;
}
declare class DsTableHeaderGroupCellComponent implements OnDestroy {
    private readonly cdr;
    /** Group display name — set by agInit. */
    label: string;
    /** Whether the group has expandable/collapsible children. */
    isExpandable: boolean;
    /** Whether the group is currently expanded. */
    isExpanded: boolean;
    private agParams?;
    private expandedListener?;
    constructor(cdr: ChangeDetectorRef);
    /** Called by AG Grid when this component is the headerGroupComponent. */
    agInit(params: AgHeaderGroupParams): void;
    /** Called by AG Grid when the column group definition changes. */
    refresh(params: AgHeaderGroupParams): boolean;
    ngOnDestroy(): void;
    onExpandToggle(): void;
    get expandAriaLabel(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableHeaderGroupCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableHeaderGroupCellComponent, "ds-table-header-group-cell", never, {}, {}, never, never, true, never>;
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
    /** Raw cell value (from field or valueGetter) — before valueFormatter is applied. */
    value: unknown;
    /**
     * Pre-formatted string produced by the column's valueFormatter, or null/undefined
     * when no valueFormatter is defined. Always prefer this over String(value) when
     * displaying text so that valueFormatter is honoured.
     */
    valueFormatted?: string | null;
    node: {
        /** Full row data object — useful for reading sibling fields in custom renderers. */
        data: unknown;
        /** Row node ID (from getRowId() or AG Grid's internal counter). */
        id?: string;
        isSelected(): boolean;
        /**
         * Programmatically select or deselect this row.
         * Used by the checkbox keyboard/click handler to toggle selection when
         * suppressRowClickSelection is true in gridOptions.
         */
        setSelected?(selected: boolean, clearSelection?: boolean): void;
        addEventListener(event: string, listener: () => void): void;
        removeEventListener(event: string, listener: () => void): void;
    };
    colDef?: {
        cellRendererParams?: Partial<DsTableRowCellComponent>;
    };
    /**
     * Registers a DOM element as the row drag handle for this cell.
     * Call in agInit (or after the handle element has rendered) when the column
     * uses rowDrag: true and a custom drag handle element is needed.
     *
     * @param dragElement  The element to use as the drag handle.
     * @param dragStartPixels  Pixels of movement before drag starts (default 4).
     * @param value  Optional drag value override shown in the drag ghost.
     * @param suppressVisibilityChange  When true, AG Grid won't auto-show/hide the
     *   handle based on rowDrag visibility rules (rowDragManaged, etc.).
     */
    registerRowDragger?(dragElement: HTMLElement, dragStartPixels?: number, value?: string, suppressVisibilityChange?: boolean): void;
}
declare class DsTableRowCellComponent implements OnDestroy, AfterViewChecked {
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
    /**
     * Emits on right-click (contextmenu) when this component is used inside AG Grid.
     * Use with suppressContextMenu: true in grid options to disable AG Grid's built-in
     * context menu, then show <ds-table-context-menu> at the emitted coords.
     */
    rowContextMenu: EventEmitter<DsTableRowContextMenuEvent>;
    /** Template ref for the gripper button — used to register the AG Grid row dragger. */
    gripperEl?: ElementRef<HTMLElement>;
    private agParams?;
    private rowSelectedListener?;
    /** Prevents re-registration on every change detection cycle once registered. */
    private gripperRegistered;
    constructor(cdr: ChangeDetectorRef);
    /** Called by AG Grid when this component is the cellRenderer. */
    agInit(params: AgCellRendererParams): void;
    /** Called by AG Grid when the cell value changes. */
    refresh(params: AgCellRendererParams): boolean;
    onContextMenu(event: MouseEvent): void;
    /**
     * Registers the gripper element as the AG Grid row drag handle once it
     * appears in the DOM. Runs after each change detection cycle but the
     * `gripperRegistered` flag ensures it only registers once.
     *
     * We cannot register in agInit directly because agInit runs before the
     * template has rendered the *ngIf="gripper" button — so the ElementRef
     * is not yet available at that point.
     */
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    private applyParams;
    /**
     * Toggle row selection when the checkbox is activated via click or keyboard.
     * Calls node.setSelected() so AG Grid's selection state stays in sync — this
     * correctly handles suppressRowClickSelection: true in gridOptions, where
     * clicking the row itself does not select it and the checkbox is the only trigger.
     */
    onCheckboxClick(): void;
    get checkboxIcon(): string;
    get checkboxClass(): string;
    get displayValue(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableRowCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableRowCellComponent, "ds-table-row-cell", never, { "value": { "alias": "value"; "required": false; }; "align": { "alias": "align"; "required": false; }; "cellData": { "alias": "cellData"; "required": false; }; "gripper": { "alias": "gripper"; "required": false; }; "checkbox": { "alias": "checkbox"; "required": false; }; "checked": { "alias": "checked"; "required": false; }; "indeterminate": { "alias": "indeterminate"; "required": false; }; "tier1Indent": { "alias": "tier1Indent"; "required": false; }; "tier2Indent": { "alias": "tier2Indent"; "required": false; }; "state": { "alias": "state"; "required": false; }; }, { "rowContextMenu": "rowContextMenu"; }, never, never, true, never>;
}

/**
 * Onflo Design System — Table Column Definition Utilities
 *
 * Pre-built defaultColDef and columnTypes for AG Grid + Onflo Design System.
 *
 * Quick start in your component:
 *
 *   import {
 *     DS_TABLE_DEFAULT_COL_DEF,
 *     DS_TABLE_COLUMN_TYPES,
 *   } from '@onflo/design-system';
 *
 *   gridOptions: GridOptions = {
 *     defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
 *     columnTypes: DS_TABLE_COLUMN_TYPES,
 *     columnDefs: [
 *       { field: 'name',   headerName: 'Name',   flex: 1, minWidth: 120 },
 *       { field: 'amount', headerName: 'Amount',  type: 'dsNumeric', aggFunc: 'sum' },
 *       { field: 'dept',   headerName: 'Dept',    type: 'dsGroupable' },
 *       { field: 'sel',    headerName: '',        type: 'dsCheckbox' },
 *     ],
 *   };
 */

/**
 * Default column group definition — applies DsTableHeaderGroupCellComponent to
 * every column group automatically. Set as defaultColGroupDef in gridOptions.
 *
 * Usage:
 *   gridOptions = {
 *     defaultColDef: DS_TABLE_DEFAULT_COL_DEF,
 *     defaultColGroupDef: DS_TABLE_DEFAULT_COL_GROUP_DEF,
 *   }
 */
declare const DS_TABLE_DEFAULT_COL_GROUP_DEF: {
    headerGroupComponent: typeof DsTableHeaderGroupCellComponent;
};
/**
 * Default column definition — applies Onflo header and cell renderers to every
 * column automatically. Override any property on individual colDefs as needed.
 *
 * Sets:
 *   - headerComponent → DsTableHeaderCellComponent
 *   - cellRenderer → DsTableRowCellComponent
 *   - sortable: true
 *   - resizable: true
 *   - minWidth: 80
 *
 * Does NOT set filter — add that yourself in defaultColDef or per-column via columnTypes.
 *
 * Usage:
 *   gridOptions = { defaultColDef: DS_TABLE_DEFAULT_COL_DEF }
 */
declare const DS_TABLE_DEFAULT_COL_DEF: {
    headerComponent: typeof DsTableHeaderCellComponent;
    cellRenderer: typeof DsTableRowCellComponent;
    sortable: boolean;
    resizable: boolean;
    minWidth: number;
};
/**
 * Column type definitions for common Onflo table patterns.
 * Register via columnTypes in gridOptions; apply per-column via type: 'dsNumeric' etc.
 * Multiple types can be combined: type: ['dsGroupable', 'dsNumeric'].
 *
 * Usage:
 *   gridOptions = { columnTypes: DS_TABLE_COLUMN_TYPES }
 *
 * Types:
 *   dsRightAligned — right-aligns both header label and cell text (no filter override)
 *   dsNumeric      — right-aligned + agNumberColumnFilter; use with aggFunc for aggregation
 *   dsGroupable    — sets enableRowGroup: true so the column appears in the row groups picker
 *   dsAggregatable — sets enableValue: true so the column appears in the values picker
 *   dsDate         — agDateColumnFilter with ISO-string comparator
 *   dsCheckbox     — fixed 56px checkbox-only column (no label, no resize, no sort/filter)
 *                    Pair with rowSelection + onRowSelected in gridOptions for actual selection.
 *   dsPinned       — pinned to the right, not movable or resizable; for action columns
 */
declare const DS_TABLE_COLUMN_TYPES: Record<string, object>;

/**
 * Onflo Design System — Table Group Expansion Store
 *
 * Persists AG Grid row group expansion state to localStorage so the user's
 * expanded/collapsed choices survive page navigations and browser refreshes.
 *
 * Usage (in your AG Grid host component):
 *
 *   import { DsTableGroupExpansionStore } from '@onflo/design-system';
 *
 *   private expansionStore = new DsTableGroupExpansionStore('my-table-groups');
 *
 *   gridOptions: GridOptions = {
 *     isGroupOpenByDefault: (params) =>
 *       this.expansionStore.isGroupOpenByDefault(params),
 *     onRowGroupOpened: (event) =>
 *       this.expansionStore.onRowGroupOpened(event),
 *   };
 *
 * The storageKey should be unique per grid/page so multiple grids on different
 * pages don't share expansion state.
 *
 * Groups default to collapsed. Only explicitly opened groups are stored.
 * Removing a group column clears its stored key automatically on next open/close
 * because the key is derived from the full ancestor path.
 */
/** Minimal row node surface needed for building a stable storage key. */
interface DsGroupNode {
    /** The field (column) being grouped on at this level. */
    field: string | null;
    /** The grouped value at this level. */
    key: string | null;
    /** Parent node — used to build the full ancestor path key. */
    parent?: DsGroupNode | null;
}
declare class DsTableGroupExpansionStore {
    private readonly _storageKey;
    constructor(storageKey: string);
    /**
     * Pass as `isGroupOpenByDefault` in AG Grid gridOptions.
     * Returns true for any group the user previously expanded.
     */
    isGroupOpenByDefault(params: {
        rowNode: DsGroupNode;
    }): boolean;
    /**
     * Pass as `onRowGroupOpened` in AG Grid gridOptions.
     * Saves or clears the expanded state for the toggled group.
     */
    onRowGroupOpened(event: {
        node: DsGroupNode & {
            expanded: boolean;
        };
    }): void;
    /** Removes all stored expansion state for this grid instance. */
    clear(): void;
    /**
     * Derives a stable key from the full ancestor path of the group node.
     * Example: "country:USA→department:Engineering"
     * Using → (U+2192) as separator to avoid collisions with common value chars.
     */
    private _nodeKey;
    private _read;
}

/**
 * Onflo Design System — Table Group Row Cell
 *
 * AG Grid custom renderer for full-width group rows.
 * Set as `groupRowRenderer` in gridOptions when using groupDisplayType: 'groupRows'.
 *
 * AG Grid usage (requires AG Grid Enterprise):
 *   gridOptions = {
 *     groupDisplayType: 'groupRows',      // Enterprise feature
 *     groupRowRenderer: DsTableGroupRowCellComponent,
 *   };
 *
 * Column definitions must include enableRowGroup: true for columns that consumers
 * can add to a row group (via ds-column-panel or ds-table-row-groups-bar):
 *   columnDefs = [
 *     { field: 'department', enableRowGroup: true },
 *   ];
 *
 * Features:
 *   - 4 nesting levels with 24px indent per level
 *   - Animated chevron expand/collapse toggle
 *   - "FieldName: Value" label with child row count
 *   - Aggregated column values shown on the right (requires aggFunc on colDefs)
 *
 * Expansion state persistence (across page navigations):
 *   import { DsTableGroupExpansionStore } from '@onflo/design-system';
 *   const store = new DsTableGroupExpansionStore('my-grid-groups');
 *   gridOptions = {
 *     ...,
 *     isGroupOpenByDefault: (params) => store.isGroupOpenByDefault(params),
 *     onRowGroupOpened:     (event)  => store.onRowGroupOpened(event),
 *   };
 *
 * Figma: primitive/table-group-row-cell
 * ADA: expand/collapse toggle button has aria-expanded and aria-label;
 *      aggregate region is aria-hidden (decorative — announced via status bar).
 * No Angular Material base — custom component.
 */

/** Minimal AG Grid params surface for a group row cell renderer. */
interface AgGroupRowCellParams {
    node: {
        /** The grouped value at this level (e.g. "Engineering"). */
        key: string | null;
        /** The field (column) being grouped (e.g. "department"). */
        field: string | null;
        /** Nesting depth — 0 = outermost group. */
        level: number;
        /** Whether this group is currently expanded. */
        expanded: boolean;
        /** Total count of leaf rows under this group node (or null). */
        allChildrenCount: number | null;
        /** Aggregated values keyed by field — populated when aggFunc is set on colDefs. */
        aggData: Record<string, unknown> | null;
        /** Expand or collapse this group node. */
        setExpanded(expanded: boolean): void;
        addEventListener(event: string, cb: () => void): void;
        removeEventListener(event: string, cb: () => void): void;
    };
    api: {
        /** Look up a column to resolve its display header name. */
        getColumn(key: string): {
            getColDef(): {
                headerName?: string;
            };
        } | null;
    };
    /**
     * When true, hides the "(N)" child count badge next to the group value.
     * Useful when row counts are shown in the aggregates region or via the status bar.
     * Default: false (count shown).
     */
    suppressCount?: boolean;
    /**
     * When true, disables expand/collapse on double-click on the row.
     * Default: false (double-click expands/collapses).
     */
    suppressDoubleClickExpand?: boolean;
    /**
     * When true, disables expand/collapse on Enter key press.
     * Default: false (Enter expands/collapses).
     */
    suppressEnterExpand?: boolean;
}
/** A single aggregated stat shown on the right of the group row. */
interface DsGroupAggStat {
    label: string;
    value: string;
}
declare class DsTableGroupRowCellComponent implements OnDestroy {
    private readonly cdr;
    value: string;
    fieldLabel: string;
    /** Clamped to 0–3 (4 levels). */
    level: number;
    expanded: boolean;
    childCount: number | null;
    aggregates: DsGroupAggStat[];
    /** When true, hides the "(N)" child count badge. Set via groupRowRendererParams. */
    suppressCount: boolean;
    private _params?;
    private readonly _expandedListener;
    constructor(cdr: ChangeDetectorRef);
    agInit(params: AgGroupRowCellParams): void;
    refresh(params: AgGroupRowCellParams): boolean;
    ngOnDestroy(): void;
    /** Left indent width in px — 24px per nesting level. */
    get indentWidth(): number;
    onToggle(event: Event): void;
    private _apply;
    private _resolveFieldLabel;
    private _resolveAggregates;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableGroupRowCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableGroupRowCellComponent, "ds-table-group-row-cell", never, {}, {}, never, never, true, never>;
}

/**
 * Onflo Design System — Table Status Bar
 *
 * Pinned aggregate row displayed between the data rows and the paginator.
 * Shows row counts (left) and optional numeric aggregate values (right).
 *
 * Standalone usage — bind inputs manually from your component:
 *   <ds-table-status-bar
 *     [rowCount]="displayedRows"
 *     [totalRowCount]="allRows"
 *     [average]="colAvg"
 *     [sum]="colSum"
 *   />
 *
 * AG Grid status bar usage:
 *   gridOptions = {
 *     statusBar: {
 *       statusPanels: [
 *         { statusPanel: DsTableStatusBarComponent, align: 'full-width' }
 *       ]
 *     }
 *   }
 *   When registered as a status panel, AG Grid calls agInit(params) and the
 *   component self-populates row counts from the grid API. Aggregate values
 *   are driven by range selection — bind them externally or extend agInit
 *   to hook into rangeSelectionChanged events.
 *
 * HTML class API:
 *   <div class="ds-table-status-bar">
 *     <div class="ds-table-status-bar__counts">
 *       <span class="ds-table-status-bar__stat">
 *         <span class="ds-table-status-bar__stat-label">Rows:</span>
 *         <span class="ds-table-status-bar__stat-value">100</span>
 *       </span>
 *       <span class="ds-table-status-bar__stat">
 *         <span class="ds-table-status-bar__stat-label">Total Rows:</span>
 *         <span class="ds-table-status-bar__stat-value">200</span>
 *       </span>
 *     </div>
 *     <div class="ds-table-status-bar__aggregates">
 *       <span class="ds-table-status-bar__stat">
 *         <span class="ds-table-status-bar__stat-label">Average:</span>
 *         <span class="ds-table-status-bar__stat-value">42.5</span>
 *       </span>
 *       <!-- ... -->
 *     </div>
 *   </div>
 *
 * Figma: primitive/table-status-bar
 * ADA: aria-live="polite" on the aggregates region so screen readers announce changes.
 */

/** Minimal AG Grid API surface needed by the status bar. */
interface AgStatusBarApi {
    getDisplayedRowCount(): number;
    getModel(): {
        getRowCount?(): number;
    } | null;
    addEventListener(event: string, callback: () => void): void;
    removeEventListener(event: string, callback: () => void): void;
}
interface AgStatusPanelParams {
    api: AgStatusBarApi;
}
declare class DsTableStatusBarComponent implements OnDestroy {
    private readonly cdr;
    /** Number of currently displayed (filtered) rows. */
    rowCount: number | null;
    /** Total row count in the dataset (pre-filter). */
    totalRowCount: number | null;
    /** Average value of the selected range / column. */
    average: number | null;
    /** Count of numeric cells in the selection. */
    count: number | null;
    /** Minimum value in the selection. */
    min: number | null;
    /** Maximum value in the selection. */
    max: number | null;
    /** Sum of values in the selection. */
    sum: number | null;
    private _api;
    private readonly _modelUpdated;
    constructor(cdr: ChangeDetectorRef);
    agInit(params: AgStatusPanelParams): void;
    /** Called by AG Grid when the status bar panel should refresh its data. */
    refresh(): void;
    ngOnDestroy(): void;
    private _syncRowCount;
    hasAggregates(): boolean;
    formatNumber(value: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableStatusBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableStatusBarComponent, "ds-table-status-bar", never, { "rowCount": { "alias": "rowCount"; "required": false; }; "totalRowCount": { "alias": "totalRowCount"; "required": false; }; "average": { "alias": "average"; "required": false; }; "count": { "alias": "count"; "required": false; }; "min": { "alias": "min"; "required": false; }; "max": { "alias": "max"; "required": false; }; "sum": { "alias": "sum"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Onflo Design System — Table Row Groups Bar
 *
 * Displayed between the table toolbar and the column header row when row
 * grouping is active. Provides:
 *   - A drop zone for dragging columns to set row groups (AG Grid native DnD)
 *   - Chips showing the currently active row group columns (removable)
 *
 * The bar auto-hides when no row groups are active ([hidden] host binding).
 *
 * Standalone usage:
 *   <ds-table-row-groups-bar
 *     [rowGroups]="activeGroups"
 *     (removeGroup)="onRemoveGroup($event)"
 *   />
 *
 * AG Grid integration:
 *   Bind [api] after the grid is ready. The component will subscribe to
 *   columnRowGroupChanged events and keep the chip list in sync automatically.
 *
 * HTML class API:
 *   <div class="ds-table-row-groups-bar">
 *     <div class="ds-table-row-groups-bar__drop-zone">
 *       <span class="ds-icon ds-table-row-groups-bar__drag-icon">drag_indicator</span>
 *       <span class="ds-table-row-groups-bar__placeholder">Drag here to set row groups</span>
 *       <div class="ds-table-row-groups-bar__chips">
 *         <!-- ds-tag chips here -->
 *       </div>
 *     </div>
 *   </div>
 *
 * Figma: component/table-row-groups-bar
 * ADA: Remove buttons on chips have aria-label.
 */

interface TableRowGroup {
    /** AG Grid column ID. */
    colId: string;
    /** Display label for the chip. */
    label: string;
}
/** Minimal AG Grid API surface needed by the row groups bar. */
interface AgRowGroupsApi {
    getRowGroupColumns(): {
        getColId(): string;
        getColDef(): {
            headerName?: string;
        };
    }[];
    addRowGroupColumn(key: string): void;
    removeRowGroupColumn(key: string): void;
    addEventListener(event: string, callback: () => void): void;
    removeEventListener(event: string, callback: () => void): void;
}
declare class DsTableRowGroupsBarComponent implements OnDestroy {
    private readonly cdr;
    /** Active row group columns shown as chips. Ignored when [api] is bound. */
    rowGroups: TableRowGroup[];
    /**
     * Emits the colId of the row group the user wants to remove.
     * When [api] is bound this is handled automatically; still emitted for external listeners.
     */
    removeGroup: EventEmitter<string>;
    private _api;
    private readonly _groupChanged;
    constructor(cdr: ChangeDetectorRef);
    /** Bind after the grid is ready to enable automatic sync with column state. */
    set api(value: AgRowGroupsApi | null);
    ngOnDestroy(): void;
    private _detach;
    private _syncGroups;
    onRemoveGroup(colId: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsTableRowGroupsBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsTableRowGroupsBarComponent, "ds-table-row-groups-bar", never, { "rowGroups": { "alias": "rowGroups"; "required": false; }; "api": { "alias": "api"; "required": false; }; }, { "removeGroup": "removeGroup"; }, never, never, true, never>;
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
declare class DsTextareaComponent implements OnInit, OnDestroy {
    private el;
    private renderer;
    private ngZone;
    private cdr;
    readonly hostClass = true;
    get hostError(): boolean;
    get hostDisabled(): boolean;
    get hostReadonly(): boolean;
    get hostResizing(): boolean;
    constructor(el: ElementRef<HTMLElement>, renderer: Renderer2, ngZone: NgZone, cdr: ChangeDetectorRef);
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
    private _isResizing;
    private _resizeCleanup;
    get textareaId(): string;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onInput(event: Event): void;
    /** Starts a JS-based vertical resize on mousedown of the resize handle. */
    onResizeStart(event: MouseEvent): void;
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

interface DsNavTabItem {
    id: string | number;
    label: string;
    active?: boolean;
}
declare class TopNavComponent implements AfterViewInit, OnDestroy {
    private cdr;
    private zone;
    private el;
    private _tabs;
    /**
     * Full ordered list of tabs. The component decides which tabs are visible
     * and which overflow into the "..." panel based on available strip width.
     */
    set tabs(value: DsNavTabItem[]);
    get tabs(): DsNavTabItem[];
    /** Emitted when a tab is clicked to become active. */
    tabActivate: EventEmitter<DsNavTabItem>;
    /** Emitted when a tab's × close button is clicked. */
    tabClose: EventEmitter<DsNavTabItem>;
    /** Emitted when "Close all tabs" is clicked in the overflow panel. */
    tabCloseAll: EventEmitter<void>;
    tabsContainer?: ElementRef<HTMLElement>;
    topNavHeader?: ElementRef<HTMLElement>;
    moreWrapper?: ElementRef<HTMLElement>;
    visibleCount: number;
    showMorePanel: boolean;
    morePanelLeft: number;
    private resizeObserver?;
    get visibleTabs(): DsNavTabItem[];
    get overflowTabs(): DsNavTabItem[];
    get hasOverflow(): boolean;
    constructor(cdr: ChangeDetectorRef, zone: NgZone, el: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    private recalculate;
    private setVisibleCount;
    onTabClick(tab: DsNavTabItem): void;
    onTabClose(tab: DsNavTabItem): void;
    onMoreClick(): void;
    onPanelTabActivate(tab: DsNavTabItem): void;
    onPanelTabClose(tab: DsNavTabItem, event: MouseEvent): void;
    onCloseAll(): void;
    onPanelKeydown(event: KeyboardEvent): void;
    onDocumentClick(event: MouseEvent): void;
    onEscape(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TopNavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TopNavComponent, "ds-top-nav", never, { "tabs": { "alias": "tabs"; "required": false; }; }, { "tabActivate": "tabActivate"; "tabClose": "tabClose"; "tabCloseAll": "tabCloseAll"; }, never, ["[top-nav-actions]"], true, never>;
}

/**
 * ds-chart
 *
 * Unified chart component wrapping Highcharts with the Onflo design theme.
 * Requires `highcharts` as a peer dependency: npm install highcharts
 *
 * The Onflo Highcharts theme (colors, typography, grid, tooltips) is applied
 * globally via Highcharts.setOptions() the first time any ds-chart renders.
 * Consuming apps that render Highcharts outside of ds-chart can also import
 * and apply the theme manually: import { onfloChartTheme } from '@onflo/design-system'.
 *
 * Inputs:
 *   [type]       'line' | 'area' | 'bar' | 'column' | 'donut' | 'pie'  (default: 'line')
 *   [title]      Optional chart title string
 *   [series]     Highcharts.SeriesOptionsType[] — the data series
 *   [categories] string[] — x-axis category labels (line, area, bar, column)
 *   [height]     number — chart height in px (default: 300)
 *   [legend]     boolean — show/hide legend (default: true)
 *   [loading]    boolean — shows spinner overlay and fades the chart (default: false)
 *   [options]    Highcharts.Options — advanced escape hatch, merged last
 *
 * @example
 * <!-- Line chart -->
 * <ds-chart
 *   type="line"
 *   title="Monthly Cases"
 *   [series]="[{ name: 'Opened', data: [245, 290, 310] }, { name: 'Closed', data: [230, 265, 290] }]"
 *   [categories]="['Jan', 'Feb', 'Mar']"
 * />
 *
 * @example
 * <!-- Donut chart -->
 * <ds-chart
 *   type="donut"
 *   title="Cases by Channel"
 *   [series]="[{ type: 'pie', data: [{ name: 'Email', y: 38 }, { name: 'Chat', y: 27 }] }]"
 * />
 *
 * @example
 * <!-- Loading state -->
 * <ds-chart type="column" [series]="data" [loading]="isLoading" />
 *
 * @example
 * <!-- Advanced — merge custom Highcharts options -->
 * <ds-chart type="line" [series]="data" [options]="{ yAxis: { title: { text: 'Cases' } } }" />
 */

type DsChartType = 'line' | 'area' | 'bar' | 'column' | 'donut' | 'pie';
declare class DsChartComponent implements AfterViewInit, OnChanges, OnDestroy {
    private platformId;
    /** Chart type. 'donut' is pie with a 60% inner radius. */
    type: DsChartType;
    /** Optional title rendered above the chart. */
    title?: string;
    /**
     * Highcharts series data.
     * For line/area/bar/column: [{ name: 'Series', data: [1, 2, 3] }, ...]
     * For pie/donut: [{ type: 'pie', data: [{ name: 'Label', y: 30 }, ...] }]
     */
    series: Highcharts.SeriesOptionsType[];
    /** X-axis category labels (line, area, bar, column charts). */
    categories?: string[];
    /** Chart height in px. Default: 300. */
    height: number;
    /** Show the chart legend. Default: true. */
    legend: boolean;
    /** Shows a spinner overlay and fades the chart area. */
    loading: boolean;
    /**
     * Advanced escape hatch — a raw Highcharts.Options object.
     * Merged last, so these override derived options and the Onflo theme where they conflict.
     */
    options?: Highcharts.Options;
    private chartContainer;
    private chart?;
    private initialized;
    private static themeApplied;
    constructor(platformId: object);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    private applyThemeOnce;
    private renderChart;
    private destroyChart;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsChartComponent, "ds-chart", never, { "type": { "alias": "type"; "required": false; }; "title": { "alias": "title"; "required": false; }; "series": { "alias": "series"; "required": false; }; "categories": { "alias": "categories"; "required": false; }; "height": { "alias": "height"; "required": false; }; "legend": { "alias": "legend"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; "options": { "alias": "options"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * onfloChartTheme
 *
 * Highcharts theme object for the Onflo Design System.
 * Apply once at app bootstrap: Highcharts.setOptions(onfloChartTheme)
 *
 * ds-chart applies this automatically — consuming apps only need to call
 * setOptions if they render Highcharts charts outside of ds-chart.
 *
 * All values are hardcoded to match the Onflo ref token palette
 * (Highcharts options are JavaScript objects, not CSS, so var() is not valid here).
 */

declare const ONFLO_CHART_COLORS: string[];
declare const onfloChartTheme: Highcharts.Options;

declare class DsMetricCardComponent {
    /** The primary value displayed prominently (e.g. '1,248', '4m 32s', '92.4%'). */
    value: string | number;
    /** Descriptor label rendered above the value, next to the icon. */
    label: string;
    /** Optional Material Symbols icon name rendered before the label. */
    icon: string;
    /**
     * Trend percentage (number only, no % symbol).
     * Positive values render in green with trending_up icon.
     * Negative values render in red with trending_down icon.
     * Omit (or set to null) to hide the trend row entirely.
     */
    trend: number | null;
    /** Context label for the trend row (e.g. 'vs last week', 'vs last month'). */
    trendLabel: string;
    /** Visual variant. 'brand' applies a blue-tinted background and border. */
    variant: 'default' | 'brand';
    /** Shows a skeleton pulse in the value slot while data is loading. */
    loading: boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsMetricCardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsMetricCardComponent, "ds-metric-card", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "icon": { "alias": "icon"; "required": false; }; "trend": { "alias": "trend"; "required": false; }; "trendLabel": { "alias": "trendLabel"; "required": false; }; "variant": { "alias": "variant"; "required": false; }; "loading": { "alias": "loading"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * A single selectable option within a filter group or tier.
 */
interface FilterOption {
    id: string;
    label: string;
}
/**
 * A tier is a sub-section within a filter group.
 * When `type` is absent the tier renders as a checkbox card grid.
 * Specialty tiers set `type` and omit `options`.
 */
interface FilterTier {
    id: string;
    label: string;
    /** Checkbox card grid (default when `type` is absent). */
    options?: FilterOption[];
    /** Specialty tier type — determines which input UI is rendered. */
    type?: 'date-range' | 'cost-range' | 'numeric-range';
    /** Slider minimum (cost-range, numeric-range). */
    min?: number;
    /** Slider maximum (cost-range, numeric-range). */
    max?: number;
    /** Slider step size (cost-range, numeric-range). */
    step?: number;
    /** Unit suffix for numeric-range labels, e.g. 'days'. */
    unit?: string;
    /** Display label override for the max value, e.g. '32+'. */
    maxLabel?: string;
}
/**
 * A top-level filter group shown as a nav item.
 * Two shapes exist: flat (options directly on the group) and tiered (options in tiers).
 * A third shape `date-preset` renders a single-select preset list.
 */
interface FilterGroup {
    id: string;
    label: string;
    /** Material Symbols ligature name, e.g. 'inventory_2'. */
    icon: string;
    /** Flat group — options rendered directly with no tier header. */
    options?: FilterOption[];
    /** Tiered group — options nested under named tier sections. */
    tiers?: FilterTier[];
    /**
     * `date-preset` — renders `options` as a single-select preset list
     * plus an expandable custom date range picker.
     */
    type?: 'date-preset';
}
/** A committed date range selection for a field-specific or custom date range. */
interface FilterDateRangeSelection {
    /** Matches FilterTier.id; null for a custom date-range in a date-preset group. */
    tierId: string | null;
    /** Formatted display label, e.g. 'Jan 5 – Feb 3'. */
    label: string;
    /** ISO date string 'YYYY-MM-DD'. */
    from?: string;
    /** ISO date string 'YYYY-MM-DD'. */
    to?: string;
    /** Mode used when adding — only set for date-preset custom ranges. */
    mode?: 'range' | 'single';
}
/** A committed cost range selection from a dual-thumb slider tier. */
interface FilterCostRangeSelection {
    tierId: string;
    /** Formatted display label, e.g. '$100 – $4,000'. */
    label: string;
    min: number;
    max: number;
}
/** A committed numeric range selection from a dual-thumb slider tier. */
interface FilterNumericRangeSelection {
    tierId: string;
    /** Formatted display label, e.g. '3–14 days'. */
    label: string;
    min: number;
    max: number;
}
/**
 * The committed filter selection state.
 * Emitted by ds-filter on Apply; consumed by ds-filter-bar; passed to the data layer.
 */
interface FilterSelection {
    /** Static checkbox option IDs. */
    optionIds: string[];
    /** Tier/group keys whose selections are EXCLUDED (NOT-filter). */
    excludedBuckets: string[];
    /** Field-specific and custom date range selections. */
    dateRanges: FilterDateRangeSelection[];
    /** Cost range slider selections. */
    costRanges: FilterCostRangeSelection[];
    /** Numeric range slider selections. */
    numericRanges: FilterNumericRangeSelection[];
    /** Single-select preset date option IDs (for date-preset groups). */
    datePresetIds: string[];
}
/**
 * A named saved filter set persisted to localStorage.
 * Range selections (date, cost, numeric) are excluded from saved sets.
 */
interface SavedFilterSet {
    /** 'fs-{timestamp}', generated on save. */
    id: string;
    name: string;
    /** ISO datetime string. */
    savedAt: string;
    /** Static checkbox option IDs — dynamic (range) IDs are excluded. */
    optionIds: string[];
    excludedBuckets: string[];
    /** Preset date option IDs. */
    datePresetIds: string[];
}
/** Empty selection sentinel — use as the default value for the selection input. */
declare const EMPTY_FILTER_SELECTION: FilterSelection;
/** Returns the total count of all active selections across all types. */
declare function getActiveFilterCount(s: FilterSelection): number;

type _ItemKind = 'option' | 'date-preset' | 'date-range' | 'cost-range' | 'numeric-range' | 'custom-date';
interface _SelectedBucketItem {
    id: string;
    label: string;
    kind: _ItemKind;
}
interface _SelectedBucket {
    key: string;
    label: string;
    items: _SelectedBucketItem[];
}
/**
 * Onflo Design System — Filter
 *
 * Full-screen filter modal with a three-panel layout:
 *   Left   — group navigation + search
 *   Center — option cards, tier accordions, range pickers
 *   Right  — selected filters summary (dark panel) + saved sets
 *
 * Two-way bindings:
 *   [(open)]      — controls modal visibility
 *   [(selection)] — committed FilterSelection; syncs on Apply
 *
 * Saved sets:
 *   Provide [savedSetsKey] with a unique localStorage key per context.
 *   Omit to hide the saved-sets feature entirely.
 *
 * @example
 *   <ds-filter
 *     [(open)]="filterOpen"
 *     [groups]="filterGroups"
 *     [(selection)]="filterSelection"
 *     [savedSetsKey]="'onflo-filter-sets-assets'"
 *     (filterCountChange)="filterCount = $event"
 *   />
 */
declare class DsFilterComponent implements OnChanges {
    /** Filter group definitions. */
    groups: FilterGroup[];
    /** Committed selection — two-way bindable via [(selection)]. */
    selection: FilterSelection;
    /** Whether the modal is open — two-way bindable via [(open)]. */
    open: boolean;
    /**
     * localStorage key for saved filter sets, e.g. 'onflo-filter-sets-assets'.
     * When omitted the saved-sets feature is hidden.
     */
    savedSetsKey?: string;
    /** Emits the committed FilterSelection when the user clicks Apply. */
    selectionChange: EventEmitter<FilterSelection>;
    /** Emits false when the modal closes. */
    openChange: EventEmitter<boolean>;
    /** Emits the total active filter count after every Apply or Clear All. */
    filterCountChange: EventEmitter<number>;
    readonly _activeGroupId: i0.WritableSignal<string>;
    readonly _searchQuery: i0.WritableSignal<string>;
    readonly _selectedIds: i0.WritableSignal<Set<string>>;
    readonly _excludedBuckets: i0.WritableSignal<Set<string>>;
    readonly _dateRanges: i0.WritableSignal<FilterDateRangeSelection[]>;
    readonly _costRanges: i0.WritableSignal<FilterCostRangeSelection[]>;
    readonly _numericRanges: i0.WritableSignal<FilterNumericRangeSelection[]>;
    readonly _datePresetIds: i0.WritableSignal<Set<string>>;
    readonly _collapsedTiers: i0.WritableSignal<Set<string>>;
    readonly _collapsedBuckets: i0.WritableSignal<Set<string>>;
    /** Draft state for date-range tier inputs; keyed by tierId. */
    readonly _fieldDateDrafts: i0.WritableSignal<Record<string, {
        from?: string;
        to?: string;
    }>>;
    /** Draft state for cost-range sliders; keyed by tierId. */
    readonly _costRangeDrafts: i0.WritableSignal<Record<string, {
        min: number;
        max: number;
    }>>;
    /** Draft state for numeric-range sliders; keyed by tierId. */
    readonly _numericRangeDrafts: i0.WritableSignal<Record<string, {
        min: number;
        max: number;
    }>>;
    readonly _activeFilterSetId: i0.WritableSignal<string>;
    readonly _savedSetsOpen: i0.WritableSignal<boolean>;
    readonly _savedSets: i0.WritableSignal<SavedFilterSet[]>;
    readonly _saveNameDraft: i0.WritableSignal<string>;
    readonly _customDateExpanded: i0.WritableSignal<boolean>;
    readonly _customDateDraft: i0.WritableSignal<{
        from?: string;
        to?: string;
    }>;
    readonly activeGroup: i0.Signal<FilterGroup>;
    readonly draftActiveCount: i0.Signal<number>;
    /** Cross-group search results — non-empty only when search query is present. */
    readonly searchResults: i0.Signal<{
        group: FilterGroup;
        options: Array<{
            id: string;
            label: string;
        }>;
    }[]>;
    /** Buckets of selected items for display in the right panel. */
    readonly selectedBuckets: i0.Signal<_SelectedBucket[]>;
    readonly activeSetName: i0.Signal<string>;
    private readonly _doc;
    ngOnChanges(changes: SimpleChanges): void;
    private _initDraftFromSelection;
    apply(): void;
    cancel(): void;
    clearAll(): void;
    setActiveGroup(groupId: string): void;
    setSearch(query: string): void;
    toggleOption(optionId: string): void;
    isOptionSelected(optionId: string): boolean;
    toggleBucketExclude(bucketKey: string): void;
    isBucketExcluded(bucketKey: string): boolean;
    toggleTierCollapse(tierId: string): void;
    isTierCollapsed(tierId: string): boolean;
    toggleBucketCollapse(bucketKey: string): void;
    isBucketCollapsed(bucketKey: string): boolean;
    selectDatePreset(presetId: string): void;
    isDatePresetSelected(presetId: string): boolean;
    toggleCustomDateExpanded(): void;
    setCustomDateDraft(field: 'from' | 'to', value: string): void;
    commitCustomDateRange(): void;
    setFieldDateDraft(tierId: string, field: 'from' | 'to', value: string): void;
    commitDateRange(tierId: string): void;
    getDateDraft(tierId: string, field: 'from' | 'to'): string;
    setCostRangeDraft(tierId: string, min: number, max: number): void;
    commitCostRange(tierId: string, min: number, max: number): void;
    getCostRangeDraft(tierId: string, tier: FilterTier): {
        min: number;
        max: number;
    };
    setNumericRangeDraft(tierId: string, min: number, max: number): void;
    commitNumericRange(tierId: string, min: number, max: number, unit?: string, maxLabel?: string): void;
    getNumericRangeDraft(tierId: string, tier: FilterTier): {
        min: number;
        max: number;
    };
    removeItem(item: _SelectedBucketItem): void;
    removeBucket(bucket: _SelectedBucket): void;
    private _loadSavedSets;
    private _persistSavedSets;
    toggleSavedSetsPanel(): void;
    setSaveNameDraft(name: string): void;
    saveCurrentSet(): void;
    updateCurrentSet(): void;
    loadSavedSet(set: SavedFilterSet): void;
    deleteSavedSet(id: string, event: Event): void;
    formatSavedAt(iso: string): string;
    onEscape(): void;
    private _close;
    private _formatDateRangeLabel;
    /** @internal Used in @for trackBy. */
    _trackById(_: number, item: {
        id: string;
    }): string;
    /** @internal Used in @for trackBy for buckets. */
    _trackByKey(_: number, b: _SelectedBucket): string;
    /** @internal Active selection count for a group — shown as nav badge. */
    _getGroupActiveCount(groupId: string): number;
    /** @internal Active option count for a checkbox tier — shown as tier badge. */
    _getTierActiveCount(tierId: string): number;
    /** @internal Returns HTML with the query term wrapped in <mark class="search-match">. */
    _highlightMatch(label: string, query: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsFilterComponent, "ds-filter", never, { "groups": { "alias": "groups"; "required": false; }; "selection": { "alias": "selection"; "required": false; }; "open": { "alias": "open"; "required": false; }; "savedSetsKey": { "alias": "savedSetsKey"; "required": false; }; }, { "selectionChange": "selectionChange"; "openChange": "openChange"; "filterCountChange": "filterCountChange"; }, never, never, true, never>;
}

interface _FilterChip {
    /** Bucket key — matches keys used in `FilterSelection.excludedBuckets`. */
    key: string;
    /** ID of the parent FilterGroup — emitted via (filterClick). */
    groupId: string;
    /** Card primary label — group label (flat/preset groups) or tier label. */
    primaryLabel: string;
    /** Card secondary text — comma-joined item labels or a range label. */
    secondaryText: string;
    isExcluded: boolean;
}
/**
 * Onflo Design System — Filter Bar
 *
 * Applied-filters strip rendered between the table toolbar and the table.
 * Renders one `ds-card-item` chip per active selection bucket.
 *
 * The host element should be hidden when no filters are active:
 * ```html
 * <ds-filter-bar [hidden]="filterCount === 0" … />
 * ```
 * The component does NOT self-hide — visibility is the consumer's responsibility.
 *
 * Clicking a chip's body emits `(filterClick)` with the `groupId` so the
 * consumer can re-open `ds-filter` scrolled to that group.
 * Clicking the × button emits `(selectionChange)` with that bucket removed.
 *
 * @example
 *   <ds-filter-bar
 *     [hidden]="filterCount === 0"
 *     [selection]="filterSelection"
 *     [groups]="filterGroups"
 *     (selectionChange)="filterSelection = $event"
 *     (filterClick)="filterOpen = true"
 *   />
 */
declare class DsFilterBarComponent {
    /** The committed selection to render as chips. */
    selection: FilterSelection;
    /** Filter group definitions — needed to resolve labels and icons for each chip. */
    groups: FilterGroup[];
    /**
     * Emits when the × button on a chip is clicked.
     * Payload is the current selection with that bucket fully removed.
     */
    selectionChange: EventEmitter<FilterSelection>;
    /**
     * Emits the `groupId` when the body of a chip is clicked.
     * The consumer typically uses this to re-open ds-filter navigated to that group.
     */
    filterClick: EventEmitter<string>;
    get chips(): _FilterChip[];
    onChipClick(chip: _FilterChip): void;
    onRemove(chip: _FilterChip, event: Event): void;
    private _buildChips;
    private _removeChip;
    /** @internal trackBy for @for. */
    _trackByKey(_: number, chip: _FilterChip): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<DsFilterBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DsFilterBarComponent, "ds-filter-bar", never, { "selection": { "alias": "selection"; "required": false; }; "groups": { "alias": "groups"; "required": false; }; }, { "selectionChange": "selectionChange"; "filterClick": "filterClick"; }, never, never, true, never>;
}

export { AgentStatusComponent, DS_TABLE_COLUMN_TYPES, DS_TABLE_DEFAULT_COL_DEF, DS_TABLE_DEFAULT_COL_GROUP_DEF, DsAccordionComponent, DsAccordionPanelComponent, DsAgPaginatorComponent, DsAlertComponent, DsAutocompleteComponent, DsAvatarComponent, DsBadgeComponent, DsButtonComponent, DsCardActionDirective, DsCardActionsDirective, DsCardComponent, DsCardItemComponent, DsCardLeadingDirective, DsCardTrailingDirective, DsChartComponent, DsCheckboxComponent, DsChipComponent, DsColumnPanelComponent, DsDateRangePickerComponent, DsDatepickerComponent, DsDialogComponent, DsDividerComponent, DsEmptyStateComponent, DsFilterBarComponent, DsFilterComponent, DsHoverCardComponent, DsIconButtonComponent, DsIconButtonToggleComponent, DsIconComponent, DsInputComponent, DsLabelComponent, DsLeadingDirective, DsListComponent, DsListItemComponent, DsMenuComponent, DsMetricCardComponent, DsModalActionsDirective, DsModalComponent, DsModalTabsDirective, DsPaginatorComponent, DsProgressComponent, DsRadioComponent, DsRadioGroupComponent, DsRichTextEditorComponent, DsSaveBarComponent, DsSearchComponent, DsSelectComponent, DsSkeletonComponent, DsSnackbarComponent, DsSpinnerComponent, DsTabComponent, DsTableGroupExpansionStore, DsTableGroupRowCellComponent, DsTableHeaderCellComponent, DsTableHeaderGroupCellComponent, DsTableRowCellComponent, DsTableRowGroupsBarComponent, DsTableStatusBarComponent, DsTableToolbarComponent, DsTabsComponent, DsTagComponent, DsTextareaComponent, DsToggleComponent, DsTooltipDirective, DsTrailingDirective, EMPTY_FILTER_SELECTION, NavButtonComponent, NavExpandComponent, NavSidebarComponent, NavTabComponent, ONFLO_CHART_COLORS, SubnavButtonComponent, SubnavHeaderComponent, SubnavSubheaderComponent, TopNavComponent, getActiveFilterCount, onfloChartTheme, onfloTheme };
export type { AgCellRendererParams, AgColumnPanelApi, AgGroupRowCellParams, AgHeaderGroupParams, AgHeaderParams, AgPaginationApi, AgPaginatorStatusPanelParams, AgPanelColumn, AgRowGroupsApi, AgStatusBarApi, AgStatusPanelParams, AgToolPanelParams, AgentStatusVariant, ColumnPanelItem, ColumnPickerOption, ColumnVisibilityChange, DsAlertSize, DsAlertVariant, DsAvatarSize, DsButtonSize, DsButtonVariant, DsChartType, DsColumnPanelState, DsDateRange, DsEmptyStateLayout, DsEmptyStateSize, DsGroupAggStat, DsGroupNode, DsHoverCardVariant, DsIconButtonSize, DsIconButtonToggleSize, DsIconButtonToggleVariant, DsIconButtonVariant, DsIconSize, DsInputType, DsModalSize, DsModalVariant, DsNavTabItem, DsPageEvent, DsSaveBarVariant, DsSelectOption, DsSnackbarData, DsSnackbarVariant, DsTooltipPosition, FilterCostRangeSelection, FilterDateRangeSelection, FilterGroup, FilterNumericRangeSelection, FilterOption, FilterSelection, FilterTier, SavedFilterSet, TableCellAlign, TableCellState, TableDensity, TableHeaderAlign, TableRowGroup, TableSortDirection };
