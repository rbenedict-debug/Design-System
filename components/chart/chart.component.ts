/**
 * ds-chart
 *
 * Unified chart component wrapping Highcharts with the Onflo design theme.
 * Requires `highcharts` as a peer dependency: npm install highcharts
 *
 * The Onflo Highcharts theme (colors, typography, grid, tooltips) is applied
 * globally via Highcharts.setOptions() the first time any ds-chart renders.
 * Consuming apps that render Highcharts outside of ds-chart can also import
 * and apply the theme manually: import { onfloChartTheme } from '@onflo/design-system'.
 *
 * Inputs:
 *   [type]       'line' | 'area' | 'bar' | 'column' | 'donut' | 'pie'  (default: 'line')
 *   [title]      Optional chart title string
 *   [series]     Highcharts.SeriesOptionsType[] — the data series
 *   [categories] string[] — x-axis category labels (line, area, bar, column)
 *   [height]     number — chart height in px (default: 300)
 *   [legend]     boolean — show/hide legend (default: true)
 *   [loading]    boolean — shows spinner overlay and fades the chart (default: false)
 *   [options]    Highcharts.Options — advanced escape hatch, merged last
 *
 * @example
 * <!-- Line chart -->
 * <ds-chart
 *   type="line"
 *   title="Monthly Cases"
 *   [series]="[{ name: 'Opened', data: [245, 290, 310] }, { name: 'Closed', data: [230, 265, 290] }]"
 *   [categories]="['Jan', 'Feb', 'Mar']"
 * />
 *
 * @example
 * <!-- Donut chart -->
 * <ds-chart
 *   type="donut"
 *   title="Cases by Channel"
 *   [series]="[{ type: 'pie', data: [{ name: 'Email', y: 38 }, { name: 'Chat', y: 27 }] }]"
 * />
 *
 * @example
 * <!-- Loading state -->
 * <ds-chart type="column" [series]="data" [loading]="isLoading" />
 *
 * @example
 * <!-- Advanced — merge custom Highcharts options -->
 * <ds-chart type="line" [series]="data" [options]="{ yAxis: { title: { text: 'Cases' } } }" />
 */

import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as Highcharts from 'highcharts';
import { onfloChartTheme } from './chart-theme';

export type DsChartType = 'line' | 'area' | 'bar' | 'column' | 'donut' | 'pie';

@Component({
  selector: 'ds-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** Chart type. 'donut' is pie with a 60% inner radius. */
  @Input() type: DsChartType = 'line';

  /** Optional title rendered above the chart. */
  @Input() title?: string;

  /**
   * Highcharts series data.
   * For line/area/bar/column: [{ name: 'Series', data: [1, 2, 3] }, ...]
   * For pie/donut: [{ type: 'pie', data: [{ name: 'Label', y: 30 }, ...] }]
   */
  @Input() series: Highcharts.SeriesOptionsType[] = [];

  /** X-axis category labels (line, area, bar, column charts). */
  @Input() categories?: string[];

  /** Chart height in px. Default: 300. */
  @Input() height = 300;

  /** Show the chart legend. Default: true. */
  @Input() legend = true;

  /** Shows a spinner overlay and fades the chart area. */
  @Input() loading = false;

  /**
   * Advanced escape hatch — a raw Highcharts.Options object.
   * Merged last, so these override derived options and the Onflo theme where they conflict.
   */
  @Input() options?: Highcharts.Options;

  @ViewChild('chartContainer') private chartContainer!: ElementRef<HTMLDivElement>;

  private chart?: Highcharts.Chart;
  private initialized = false;

  // Static flag: theme is applied once globally per app session.
  private static themeApplied = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.applyThemeOnce();
    this.initialized = true;
    this.renderChart();
  }

  ngOnChanges(): void {
    if (!this.initialized) return;
    this.destroyChart();
    this.renderChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private applyThemeOnce(): void {
    if (DsChartComponent.themeApplied) return;
    Highcharts.setOptions(onfloChartTheme);
    DsChartComponent.themeApplied = true;
  }

  private renderChart(): void {
    if (!this.chartContainer?.nativeElement) return;

    const resolvedType: string = this.type === 'donut' ? 'pie' : this.type;

    const derivedOptions: Highcharts.Options = {
      chart: {
        type: resolvedType,
        height: this.height,
      },
      title: this.title ? { text: this.title } : { text: undefined },
      legend: { enabled: this.legend },
      series: this.series,
    };

    if (this.type === 'donut') {
      derivedOptions.plotOptions = {
        ...derivedOptions.plotOptions,
        pie: { innerSize: '60%' },
      };
    }

    if (this.categories?.length) {
      derivedOptions.xAxis = { categories: this.categories };
    }

    const finalOptions = Highcharts.merge(derivedOptions, this.options ?? {});
    this.chart = Highcharts.chart(this.chartContainer.nativeElement, finalOptions);
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = undefined;
    }
  }
}
