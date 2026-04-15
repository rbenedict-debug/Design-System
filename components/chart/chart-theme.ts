/**
 * onfloChartTheme
 *
 * Highcharts theme object for the Onflo Design System.
 * Apply once at app bootstrap: Highcharts.setOptions(onfloChartTheme)
 *
 * ds-chart applies this automatically — consuming apps only need to call
 * setOptions if they render Highcharts charts outside of ds-chart.
 *
 * All values are hardcoded to match the Onflo ref token palette
 * (Highcharts options are JavaScript objects, not CSS, so var() is not valid here).
 */

import * as Highcharts from 'highcharts';

// ── Series color palette ──────────────────────────────────────────────────────
// Ordered for maximum contrast between adjacent series.
// Maps to: brand blue, green, yellow, red, light blue, teal, orange, purple, navy.
export const ONFLO_CHART_COLORS: string[] = [
  '#0B6EB4', // --ref-color-primary-blue-default
  '#45A55F', // --ref-color-accent-green-default
  '#FFBF00', // --ref-color-accent-yellow-default
  '#D70917', // --ref-color-accent-red-default
  '#43ADF2', // --ref-color-accent-lightblue-default
  '#159B8E', // --ref-color-accent-teal-default
  '#EB6E08', // --ref-color-accent-orange-default
  '#622682', // --ref-color-accent-purple-default
  '#0B3057', // --ref-color-accent-darkblue-default
];

// ── Theme ─────────────────────────────────────────────────────────────────────

export const onfloChartTheme: Highcharts.Options = {
  colors: ONFLO_CHART_COLORS,

  chart: {
    backgroundColor: 'transparent',
    style: {
      fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
    },
    animation: { duration: 200 },
    spacingTop: 16,
    spacingRight: 16,
    spacingBottom: 16,
    spacingLeft: 16,
  },

  title: {
    text: undefined,
    style: {
      fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
      fontSize: '16px',
      fontWeight: '600',
      color: '#2D3638', // --ref-color-neutral-text-default
    },
  },

  subtitle: {
    style: {
      fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '400',
      color: '#73737F', // --ref-color-neutral-text-soft
    },
  },

  xAxis: {
    lineColor: '#E9E9E9',   // --ref-color-neutral-border-subtle
    tickColor: '#E9E9E9',
    gridLineColor: 'transparent',
    labels: {
      style: {
        fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: '400',
        color: '#73737F',
      },
    },
    title: {
      style: {
        fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: '500',
        color: '#73737F',
      },
    },
  },

  yAxis: {
    gridLineColor: '#E9E9E9',
    lineColor: 'transparent',
    tickColor: 'transparent',
    labels: {
      style: {
        fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: '400',
        color: '#73737F',
      },
    },
    title: {
      text: null,
      style: {
        fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
        fontSize: '12px',
        fontWeight: '500',
        color: '#73737F',
      },
    },
  },

  legend: {
    enabled: true,
    align: 'left',
    verticalAlign: 'bottom',
    layout: 'horizontal',
    itemStyle: {
      fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
      fontSize: '12px',
      fontWeight: '500',
      color: '#2D3638',
    },
    itemHoverStyle: {
      color: '#0B6EB4',
    },
    itemHiddenStyle: {
      color: '#9F9F9F',
    },
  },

  tooltip: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E9E9E9',
    borderRadius: 8,
    shadow: false,
    padding: 12,
    style: {
      fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
      fontSize: '12px',
      color: '#2D3638',
    },
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    series: {
      animation: { duration: 200 },
    },
    line: {
      lineWidth: 2,
      states: {
        hover: { lineWidth: 2 },
      },
      marker: {
        radius: 4,
        symbol: 'circle',
        lineWidth: 2,
        lineColor: '#FFFFFF',
      },
    },
    area: {
      lineWidth: 2,
      fillOpacity: 0.12,
      marker: {
        radius: 4,
        symbol: 'circle',
        lineWidth: 2,
        lineColor: '#FFFFFF',
      },
    },
    bar: {
      borderRadius: 4,
      borderWidth: 0,
    },
    column: {
      borderRadius: 4,
      borderWidth: 0,
      groupPadding: 0.15,
      pointPadding: 0.05,
    },
    pie: {
      borderWidth: 2,
      borderColor: '#FFFFFF',
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: '"Proxima Nova", "DM Sans", system-ui, sans-serif',
          fontSize: '12px',
          fontWeight: '500',
          textOutline: 'none',
          color: '#2D3638',
        },
      },
    },
  },
};
