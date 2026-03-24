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

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsCardComponent {
  /** Visual variant: 'outlined' | 'elevated' */
  @Input() variant: 'outlined' | 'elevated' = 'outlined';
  /** Makes the card interactive with hover/press states */
  @Input() interactive = false;
}
