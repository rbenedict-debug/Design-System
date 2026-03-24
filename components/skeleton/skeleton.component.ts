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

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSkeletonComponent {
  @Input() ariaLabel = 'Loading content';
  @Input() card = false;
  @Input() row = false;
}
