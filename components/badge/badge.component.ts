import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
@Component({
  selector: 'ds-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsBadgeComponent {
  /** Count value shown inside the circle (Large size). Ignored when dot=true. */
  @Input() count: string | number = '';

  /** Renders as a 6×6px dot with no text (Small size). */
  @Input() dot = false;

  get indicatorClasses(): string {
    return ['ds-badge-indicator', this.dot ? 'ds-badge-indicator--dot' : '']
      .filter(Boolean)
      .join(' ');
  }
}
