/**
 * ds-metric-card
 *
 * KPI metric tile for dashboards. Displays a primary value with an optional
 * label, icon, and trend indicator.
 *
 * Inputs:
 *   [value]      string | number — the primary metric value (e.g. '4m 32s', 1248, '92.4%')
 *   [label]      string — descriptor label above the value (e.g. 'Avg Handle Time')
 *   [icon]       string — Material Symbols icon name shown before the label (optional)
 *   [trend]      number — percentage change; positive = up (green), negative = down (red)
 *   [trendLabel] string — context for the trend (e.g. 'vs last week')
 *   [variant]    'default' | 'brand'  (default: 'default')
 *   [loading]    boolean — shows a pulsing skeleton in the value slot (default: false)
 *
 * @example
 * <!-- Simple KPI card -->
 * <ds-metric-card
 *   value="1,248"
 *   label="Open Cases"
 *   icon="inbox"
 *   [trend]="8.3"
 *   trendLabel="vs last week"
 * />
 *
 * @example
 * <!-- Brand variant -->
 * <ds-metric-card
 *   value="92.4%"
 *   label="CSAT Score"
 *   icon="sentiment_satisfied"
 *   [trend]="-1.2"
 *   trendLabel="vs last month"
 *   variant="brand"
 * />
 *
 * @example
 * <!-- Loading state -->
 * <ds-metric-card value="" label="Resolution Rate" [loading]="true" />
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ds-metric-card',
  standalone: true,
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsMetricCardComponent {
  /** The primary value displayed prominently (e.g. '1,248', '4m 32s', '92.4%'). */
  @Input() value: string | number = '';

  /** Descriptor label rendered above the value, next to the icon. */
  @Input() label = '';

  /** Optional Material Symbols icon name rendered before the label. */
  @Input() icon = '';

  /**
   * Trend percentage (number only, no % symbol).
   * Positive values render in green with trending_up icon.
   * Negative values render in red with trending_down icon.
   * Omit (or set to null) to hide the trend row entirely.
   */
  @Input() trend: number | null = null;

  /** Context label for the trend row (e.g. 'vs last week', 'vs last month'). */
  @Input() trendLabel = '';

  /** Visual variant. 'brand' applies a blue-tinted background and border. */
  @Input() variant: 'default' | 'brand' = 'default';

  /** Shows a skeleton pulse in the value slot while data is loading. */
  @Input() loading = false;
}
