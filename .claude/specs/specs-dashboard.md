# Dashboard Component Specs

Covers `ds-chart` (Highcharts wrapper) and `ds-metric-card` (KPI tile).

---

## ds-chart

### Purpose
A unified Highcharts wrapper that applies the Onflo theme — series colors, typography,
grid lines, tooltip style — automatically. Engineers provide data; the DS provides the visual system.

### Required peer dependency
`highcharts >=11` — consumers must `npm install highcharts`. It is NOT bundled.

### Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| `[type]` | `'line' \| 'area' \| 'bar' \| 'column' \| 'donut' \| 'pie'` | `'line'` | `'donut'` = pie with `innerSize: '60%'` |
| `[series]` | `Highcharts.SeriesOptionsType[]` | `[]` | For pie/donut: `[{ type: 'pie', data: [{ name: '...', y: N }] }]` |
| `[categories]` | `string[]` | `undefined` | X-axis labels for line/area/bar/column |
| `[title]` | `string` | `undefined` | Rendered by Highcharts above the plot area |
| `[height]` | `number` | `300` | Chart container height in px |
| `[legend]` | `boolean` | `true` | Show/hide Highcharts legend |
| `[loading]` | `boolean` | `false` | Spinner overlay + fades chart area |
| `[options]` | `Highcharts.Options` | `undefined` | Merged last — overrides theme + derived options |

### Theme application
- `onfloChartTheme` is applied via `Highcharts.setOptions()` once per app session (static flag).
- All values in the theme are **hardcoded hex** — Highcharts does not support CSS `var()`.
- To use the theme outside `ds-chart`: `import { onfloChartTheme } from '@onflo/design-system'` then `Highcharts.setOptions(onfloChartTheme)` at app bootstrap.

### Series color order (9 colors)
1. `#0B6EB4` — brand blue (primary)
2. `#45A55F` — green
3. `#FFBF00` — yellow
4. `#D70917` — red
5. `#43ADF2` — light blue
6. `#159B8E` — teal
7. `#EB6E08` — orange
8. `#622682` — purple
9. `#0B3057` — navy

### Common usage patterns

```typescript
// Line chart — two series, monthly data
<ds-chart
  type="line"
  title="Monthly Cases"
  [series]="[
    { name: 'Opened', data: [245, 290, 310, 285, 320, 298] },
    { name: 'Closed', data: [230, 265, 285, 270, 308, 310] }
  ]"
  [categories]="['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']"
  [height]="300"
/>

// Area chart — single series, filled
<ds-chart
  type="area"
  title="Resolution Rate (%)"
  [series]="[{ name: 'Resolution Rate', data: [82, 85, 88, 84, 91, 93] }]"
  [categories]="['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']"
/>

// Column chart
<ds-chart
  type="column"
  title="Cases by Day of Week"
  [series]="[{ name: 'Cases', data: [145, 210, 195, 230, 175, 80, 45] }]"
  [categories]="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
/>

// Donut chart
<ds-chart
  type="donut"
  title="Cases by Channel"
  [series]="[{
    type: 'pie',
    data: [
      { name: 'Email', y: 38 },
      { name: 'Chat', y: 27 },
      { name: 'Phone', y: 19 },
      { name: 'Portal', y: 11 },
      { name: 'Other', y: 5 }
    ]
  }]"
  [legend]="true"
/>

// Loading state
<ds-chart type="line" [series]="data" [loading]="isLoading" />

// Custom height + advanced options (y-axis title)
<ds-chart
  type="column"
  [series]="data"
  [height]="400"
  [options]="{ yAxis: { title: { text: 'Number of Cases' } } }"
/>
```

### What NOT to do with ds-chart
- Never import `highcharts-angular` — the DS ships its own thin wrapper, no extra dep needed.
- Never call `Highcharts.setOptions()` from consuming app code unless using Highcharts *outside* of ds-chart — it will be applied automatically on first ds-chart render.
- Never pass colors in `[options]` — the Onflo theme controls series colors.
- Never set chart.backgroundColor in options — keep it transparent so the container shows through.

---

## ds-metric-card

### Purpose
KPI tile for dashboard layouts. Shows a primary metric value prominently, with a label,
optional icon, and optional trend indicator (percentage change with directional arrow).

### Inputs

| Input | Type | Default | Notes |
|---|---|---|---|
| `[value]` | `string \| number` | `''` | Primary metric: '1,248', '4m 32s', '92.4%', etc. |
| `[label]` | `string` | `''` | Descriptor above the value: 'Open Cases', 'CSAT Score' |
| `[icon]` | `string` | `''` | Material Symbol icon name shown before the label |
| `[trend]` | `number \| null` | `null` | Percent change (no % suffix). Positive = green ↑, negative = red ↓. Omit to hide trend row. |
| `[trendLabel]` | `string` | `''` | Context text: 'vs last week', 'vs last month' |
| `[variant]` | `'default' \| 'brand'` | `'default'` | Brand: blue border + blue-tinted background |
| `[loading]` | `boolean` | `false` | Shows a pulsing skeleton in place of the value |

### CSS class API (no Angular)
```html
<div class="ds-metric-card">
  <div class="ds-metric-card__header">
    <span class="ds-icon ds-icon--sm">inbox</span>
    <span class="ds-metric-card__label">Open Cases</span>
  </div>
  <div class="ds-metric-card__value">1,248</div>
  <div class="ds-metric-card__trend">
    <span class="ds-icon ds-icon--xs ds-metric-card__trend-icon--positive">trending_up</span>
    <span class="ds-metric-card__trend-value is-positive">+8.3%</span>
    <span class="ds-metric-card__trend-label">vs last week</span>
  </div>
</div>

<!-- Brand variant -->
<div class="ds-metric-card ds-metric-card--brand"> ... </div>

<!-- Loading state -->
<div class="ds-metric-card is-loading">
  <div class="ds-metric-card__header">...</div>
  <div class="ds-metric-card__value">
    <span class="ds-metric-card__skeleton"></span>
  </div>
</div>
```

### Visual treatment
- **No border** on the default variant — elevation replaces the border. Card uses `box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2)` to float above the page surface.
- **Brand variant** adds `border: 1px solid var(--color-border-brand)` on top of the elevation as a visual accent.
- **Page background**: dashboard pages must use `background: var(--color-surface-page)` so the `--color-surface-default` card surface reads as elevated. Cards placed on a white/default background will not have meaningful contrast.

### Dashboard layout pattern
Metric cards are typically arranged in a 3–4 column grid above charts:
```html
<!-- Page wrapper — provides the canvas floor -->
<div style="background: var(--color-surface-page); padding: 24px;">
<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
  <ds-metric-card value="1,248"  label="Open Cases"      icon="inbox"            [trend]="8.3"  trendLabel="vs last week" />
  <ds-metric-card value="92.4%"  label="CSAT Score"      icon="sentiment_satisfied" [trend]="-1.2" trendLabel="vs last month" />
  <ds-metric-card value="4m 32s" label="Avg Handle Time" icon="timer"            [trend]="12"   trendLabel="vs last week" />
  <ds-metric-card value="87.3%"  label="Resolution Rate" icon="check_circle"     [trend]="2.1"  trendLabel="vs last month" />
</div>
<!-- chart tiles follow, also floating on --color-surface-page -->
</div>
```

### Trend sign convention
- `[trend]="8.3"` → `+8.3%` in green with `trending_up` icon
- `[trend]="-1.2"` → `-1.2%` in red with `trending_down` icon
- `[trend]="0"` → `+0%` in green (zero is treated as non-negative)
- `[trend]="null"` → trend row hidden entirely
