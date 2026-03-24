import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsBadgeVariant = 'filled' | 'subtle' | 'outlined';
export type DsBadgeColor = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export type DsBadgeSize = 'sm' | 'md';
export type DsBadgeType = 'label' | 'indicator';

/**
 * Onflo Design System — Badge
 *
 * Two modes controlled by `type`:
 *
 * **Label mode** (default, type="label") — inline status chip:
 *   <ds-badge variant="filled" color="brand">Active</ds-badge>
 *   <ds-badge variant="subtle" color="success" icon="check_circle">Completed</ds-badge>
 *   <ds-badge variant="outlined" color="error" [dismissible]="true" (dismissed)="remove()">Error</ds-badge>
 *
 * **Indicator mode** (type="indicator") — notification count/dot overlay:
 *   Wrap the host element in a div with `position: relative` (or use `.ds-badge-indicator__host`).
 *   ADA: Set aria-label on the parent button (e.g. "Notifications, 3 unread").
 *   <div class="ds-badge-indicator__host">
 *     <ds-icon-button aria-label="Notifications, 3 unread" />
 *     <ds-badge type="indicator" [count]="3" />
 *   </div>
 *   <ds-badge type="indicator" [dot]="true" />
 */
@Component({
  selector: 'ds-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class DsBadgeComponent {
  // ── Shared ──────────────────────────────────────────────────────────────────

  /** Badge mode. 'label' = inline chip; 'indicator' = count/dot overlay. Default: 'label' */
  @Input() type: DsBadgeType = 'label';

  // ── Label mode inputs ────────────────────────────────────────────────────────

  /** Visual style. Default: 'subtle' */
  @Input() variant: DsBadgeVariant = 'subtle';

  /** Semantic color. Default: 'default' */
  @Input() color: DsBadgeColor = 'default';

  /** Size. Default: 'md' */
  @Input() size: DsBadgeSize = 'md';

  /** Material Symbols icon name shown before the label. */
  @Input() icon = '';

  /** Shows a dismiss (×) button. */
  @Input() dismissible = false;

  /** Emits when the dismiss button is clicked. */
  @Output() dismissed = new EventEmitter<void>();

  // ── Indicator mode inputs ────────────────────────────────────────────────────

  /** Count value shown inside the indicator (large size). Ignored when dot=true. */
  @Input() count: string | number = '';

  /** Renders as a 6×6px dot with no text (small size). */
  @Input() dot = false;

  // ── Class helpers ────────────────────────────────────────────────────────────

  get badgeClasses(): string {
    return [
      'ds-badge',
      `ds-badge--${this.variant}`,
      `ds-badge--${this.color}`,
      this.size === 'sm' ? 'ds-badge--sm' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get indicatorClasses(): string {
    return ['ds-badge-indicator', this.dot ? 'ds-badge-indicator--dot' : '']
      .filter(Boolean)
      .join(' ');
  }

  onDismiss(event: MouseEvent): void {
    event.stopPropagation();
    this.dismissed.emit();
  }
}
