import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsBadgeVariant = 'filled' | 'subtle' | 'outlined';
export type DsBadgeColor = 'default' | 'brand' | 'success' | 'warning' | 'error' | 'info';
export type DsBadgeSize = 'sm' | 'md';

/**
 * Onflo Design System — Badge / Tag / Chip
 *
 * A standalone Angular component wrapping the ds-badge CSS class API.
 * For direct class usage without Angular:
 *   <span class="ds-badge ds-badge--filled ds-badge--brand">Label</span>
 *
 * @example
 *   <ds-badge variant="filled" color="brand">Active</ds-badge>
 *   <ds-badge variant="subtle" color="success" icon="check_circle">Completed</ds-badge>
 *   <ds-badge variant="outlined" color="error" [dismissible]="true" (dismissed)="remove()">Error</ds-badge>
 */
@Component({
  selector: 'ds-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class DsBadgeComponent {
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

  onDismiss(event: MouseEvent): void {
    event.stopPropagation();
    this.dismissed.emit();
  }
}
