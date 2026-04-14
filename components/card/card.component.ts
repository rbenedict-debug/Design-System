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

import {
  Component,
  Directive,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

// ── Directives ────────────────────────────────────────────────────────────────

/** Marker — place on the footer actions container projected into ds-card.
 *  @example <div card-actions><ds-button variant="filled">Save</ds-button></div>
 */
@Directive({ selector: '[card-actions]', standalone: true })
export class DsCardActionsDirective {}

/** Marker — place on the leading-slot element projected into ds-card-item.
 *  @example <span leading class="ds-icon">folder</span>
 */
@Directive({ selector: '[leading]', standalone: true })
export class DsCardLeadingDirective {}

/** Marker — place on the trailing-slot element projected into ds-card-item.
 *  @example <span trailing class="ds-icon ds-icon--sm">chevron_right</span>
 */
@Directive({ selector: '[trailing]', standalone: true })
export class DsCardTrailingDirective {}

/** Marker — place on the action button projected into ds-card-item.
 *  Clicks on this element do not propagate to the card click handler.
 *  @example <button card-action class="ds-icon-button ..." (click)="openMenu($event)">...</button>
 */
@Directive({ selector: '[card-action]', standalone: true })
export class DsCardActionDirective {}

// ── ds-card ───────────────────────────────────────────────────────────────────

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, DsCardActionsDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCardComponent implements AfterContentInit {
  /** Visual variant: 'outlined' | 'elevated' */
  @Input() variant: 'outlined' | 'elevated' = 'outlined';

  /** Material Symbol name for the leading icon in the header. */
  @Input() icon = '';

  /** Header title text. */
  @Input() title = '';

  /** Header subtitle text (smaller, secondary colour). */
  @Input() subtitle = '';

  /** Show a × close button in the top-right of the header. */
  @Input() showClose = false;

  /** Emits when the close button is clicked. */
  @Output() closeClick = new EventEmitter<void>();

  @ContentChild(DsCardActionsDirective) private _actionsRef?: DsCardActionsDirective;

  hasActions = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.hasActions = !!this._actionsRef;
    this.cdr.markForCheck();
  }

  get hasHeader(): boolean {
    return !!(this.icon || this.title || this.subtitle || this.showClose);
  }

  onClose(): void {
    this.closeClick.emit();
  }
}

// ── ds-card-item ──────────────────────────────────────────────────────────────

@Component({
  selector: 'ds-card-item',
  standalone: true,
  imports: [CommonModule, DsCardLeadingDirective, DsCardTrailingDirective, DsCardActionDirective],
  template: `
    <div class="ds-card-item"
         [class.ds-card-item--interactive]="interactive"
         [class.ds-card-item--elevated]="variant === 'elevated'"
         [class.ds-card-item--no-leading]="!hasLeading"
         [class.ds-card-item--no-trailing]="!hasTrailing && !hasAction"
         [class.ds-card-item--no-slots]="!hasLeading && !hasTrailing && !hasAction"
         [class.is-disabled]="disabled"
         [attr.tabindex]="interactive && !disabled ? 0 : null"
         [attr.role]="interactive ? 'button' : null"
         [attr.aria-disabled]="disabled ? true : null"
         (click)="onCardClick()"
         (keydown.enter)="onCardClick()"
         (keydown.space)="onSpaceKey($event)">

      @if (hasLeading) {
        <div class="ds-card-item__leading">
          <ng-content select="[leading]" />
        </div>
      }

      <div class="ds-card-item__body">
        <span class="ds-card-item__primary">{{ primary }}</span>
        @if (secondary) {
          <span class="ds-card-item__secondary">{{ secondary }}</span>
        }
      </div>

      @if (hasTrailing) {
        <div class="ds-card-item__trailing">
          <ng-content select="[trailing]" />
        </div>
      }

      @if (hasAction) {
        <div class="ds-card-item__action" (click)="$event.stopPropagation()">
          <ng-content select="[card-action]" />
        </div>
      }

    </div>
  `,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCardItemComponent implements AfterContentInit {
  /** Primary label text. */
  @Input() primary = '';

  /** Optional supporting text rendered below the primary label. */
  @Input() secondary = '';

  /** Makes the entire card clickable — adds hover/press states and emits (cardClick). */
  @Input() interactive = false;

  /** Visual variant: 'outlined' | 'elevated' */
  @Input() variant: 'outlined' | 'elevated' = 'outlined';

  /** Disables pointer interactions and mutes text/icon colours. */
  @Input() disabled = false;

  /** Emits when the card body area is clicked (interactive mode only). */
  @Output() cardClick = new EventEmitter<void>();

  @ContentChild(DsCardLeadingDirective) private _leadingRef?: DsCardLeadingDirective;
  @ContentChild(DsCardTrailingDirective) private _trailingRef?: DsCardTrailingDirective;
  @ContentChild(DsCardActionDirective) private _actionRef?: DsCardActionDirective;

  hasLeading = false;
  hasTrailing = false;
  hasAction = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.hasLeading = !!this._leadingRef;
    this.hasTrailing = !!this._trailingRef;
    this.hasAction = !!this._actionRef;
    this.cdr.markForCheck();
  }

  onCardClick(): void {
    if (this.interactive && !this.disabled) {
      this.cardClick.emit();
    }
  }

  onSpaceKey(event: Event): void {
    event.preventDefault();
    this.onCardClick();
  }
}
