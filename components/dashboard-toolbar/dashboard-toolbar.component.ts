/**
 * ds-dashboard-toolbar
 *
 * Floating toolbar above a dashboard bento grid. Each control
 * (date selector, filter button, more button) is an individually
 * elevated element — no enclosing bar box. Visual language matches
 * ds-metric-card: elevation via box-shadow, no borders.
 *
 * Inputs:
 *   [title]        string  — page title (required)
 *   [subtitle]     string  — optional supporting text (date, status, etc.)
 *   [filterActive] boolean — marks filter button as toggled (brand bg + filled icon)
 *
 * Outputs:
 *   (filterClick) — emitted when the filter icon button is clicked
 *   (moreClick)   — emitted when the more icon button is clicked
 *
 * Content slots:
 *   [toolbar-filters] — one or more quick-filter controls pulled out from
 *                       the filter modal (e.g. a ds-dashboard-toolbar__date-select)
 *
 * @example
 * <ds-dashboard-toolbar
 *   title="Support Dashboard"
 *   subtitle="April 15, 2026 · Last updated 2 min ago"
 *   (filterClick)="openFilter()"
 *   (moreClick)="openMoreMenu()">
 *
 *   <div toolbar-filters class="ds-dashboard-toolbar__date-select">
 *     <span class="ds-icon ds-icon--sm" aria-hidden="true">calendar_today</span>
 *     <select aria-label="Date range" [(ngModel)]="selectedPeriod">
 *       <option value="today">Today</option>
 *       <option value="7d">Last 7 days</option>
 *       <option value="30d">Last 30 days</option>
 *       <option value="custom">Custom range</option>
 *     </select>
 *     <span class="ds-icon ds-icon--sm" aria-hidden="true">arrow_drop_down</span>
 *   </div>
 *
 * </ds-dashboard-toolbar>
 */

import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'ds-dashboard-toolbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'ds-dashboard-toolbar' },
})
export class DsDashboardToolbarComponent {
  /** Page title rendered as bare text on the canvas. */
  @Input() title = '';

  /** Optional supporting text shown below the title (date, status, etc.). */
  @Input() subtitle = '';

  /** When true, renders the filter button in the active state (brand bg, filled icon). */
  @Input() filterActive = false;

  /** Emitted when the filter icon button is clicked. */
  @Output() filterClick = new EventEmitter<void>();

  /** Emitted when the more options icon button is clicked. */
  @Output() moreClick = new EventEmitter<void>();
}
