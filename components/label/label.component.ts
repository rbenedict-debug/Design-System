/**
 * ds-label
 *
 * Custom Onflo component — display-only colored label for categorizing content.
 * Not interactive or removable. Use ds-chip for removable items.
 *
 * @example
 * <ds-label color="green">Active</ds-label>
 * <ds-label color="red" size="sm">Urgent</ds-label>
 * <ds-label color="brand" [outline]="true">Brand</ds-label>
 * <ds-label color="navy" icon="info">Informational</ds-label>
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsLabelComponent {
  /** Color variant */
  @Input() color: 'green' | 'red' | 'yellow' | 'brand' | 'blue' | 'navy' | 'teal' | 'orange' | 'purple' | 'pink' | 'disabled' = 'brand';
  /** Size */
  @Input() size: 'xs' | 'sm' | 'md' = 'md';
  /** Outline-only style (transparent background) */
  @Input() outline = false;
  /** Optional leading icon (Material Symbols name) */
  @Input() icon?: string;
}
