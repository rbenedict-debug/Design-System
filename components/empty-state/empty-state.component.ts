import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsEmptyStateSize = 'sm' | 'lg';
export type DsEmptyStateLayout = 'vertical' | 'horizontal';

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
@Component({
  selector: 'ds-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsEmptyStateComponent {
  /** Size variant. 'sm' for compact contexts; 'lg' for full-page empty states. Default: 'sm' */
  @Input() size: DsEmptyStateSize = 'sm';

  /** Layout direction. 'vertical' stacks graphic above text; 'horizontal' places them side by side. Default: 'vertical' */
  @Input() layout: DsEmptyStateLayout = 'vertical';

  /** Primary message. Should describe what is empty, not just "No data". Default: 'No data available' */
  @Input() heading = 'No data available';

  /** Optional supporting text shown below the heading — use to suggest a next action or explain why. */
  @Input() description = '';
}
