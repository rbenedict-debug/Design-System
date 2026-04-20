# Dashboard Component Specs

Covers `ds-chart` (Highcharts wrapper), `ds-metric-card` (KPI tile), and `ds-dashboard-toolbar` (floating page-level toolbar).

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
| `[icon]` | `string` | `''` | Material Symbol icon name — rendered filled, right-aligned after the label |
| `[trend]` | `number \| null` | `null` | Percent change (no % suffix). Positive = green ↑, negative = red ↓. Omit to hide trend row. |
| `[trendLabel]` | `string` | `''` | Context text: 'vs last week', 'vs last month' |
| `[variant]` | `'default' \| 'brand'` | `'default'` | Brand: blue border + blue-tinted background |
| `[loading]` | `boolean` | `false` | Shows a pulsing skeleton in place of the value |

### CSS class API (no Angular)
```html
<div class="ds-metric-card">
  <div class="ds-metric-card__header">
    <span class="ds-metric-card__label">Open Cases</span>
    <span class="ds-icon ds-icon--sm ds-icon--filled">inbox</span>
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

### Dashboard layout pattern — bento grid

**All dashboards use a bento box layout.** This is the standard — never use a simple uniform grid of equal-sized tiles.

A bento grid is a single CSS Grid with `grid-template-areas` where tiles vary in size: metric cards occupy 1×1 cells, the primary "hero" chart spans 2 columns × 2 rows, and supporting charts fill the remaining cells. The asymmetric composition creates visual hierarchy without adding complexity to the markup.

#### Canonical 4-column bento layout
```
┌────────┬────────┬─────────────────────┐
│ mc1    │ mc2    │                     │
│        │        │   hero chart        │
├────────┼────────┤   2 cols × 2 rows   │
│ mc3    │ mc4    │                     │
│        │        │                     │
├─────────────────┼────────┬────────────┤
│ wide chart      │ tile   │ tile       │
│ 2 cols          │ 1 col  │ 1 col      │
└─────────────────┴────────┴────────────┘
```

```html
<!-- Page wrapper — always use --color-surface-page as the canvas floor -->
<div style="background: var(--color-surface-page); padding: 24px;">

  <!-- Bento grid -->
  <div style="
    display: grid;
    grid-template-areas:
      'mc1  mc2  hero hero'
      'mc3  mc4  hero hero'
      'wide wide tile1 tile2';
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto auto;
    gap: 12px;
  ">

    <!-- Metric cards — 1×1 each -->
    <ds-metric-card style="grid-area: mc1;"  value="1,248"  label="Open Cases"      icon="inbox"               [trend]="8.3"  trendLabel="vs last week" />
    <ds-metric-card style="grid-area: mc2;"  value="92.4%"  label="CSAT Score"      icon="sentiment_satisfied" [trend]="-1.2" trendLabel="vs last month" />
    <ds-metric-card style="grid-area: mc3;"  value="4m 32s" label="Avg Handle Time" icon="timer"               [trend]="12"   trendLabel="vs last week" />
    <ds-metric-card style="grid-area: mc4;"  value="87.3%"  label="Resolution Rate" icon="check_circle"        [trend]="2.1"  trendLabel="vs last month" />

    <!-- Hero chart — spans 2 cols × 2 rows; use flex-column so chart fills the tall space -->
    <div style="grid-area: hero; background: var(--color-surface-page); border-radius: var(--radius-md); padding: 16px; box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2); display: flex; flex-direction: column;">
      <ds-chart type="line" style="flex: 1; min-height: 0;"
        [series]="[
          { name: 'Opened', data: [245, 290, 310, 285, 320, 298] },
          { name: 'Closed', data: [230, 265, 285, 270, 308, 310] }
        ]"
        [categories]="['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']"
        title="Monthly Cases"
      />
    </div>

    <!-- Wide chart — spans 2 cols -->
    <div style="grid-area: wide; background: var(--color-surface-page); border-radius: var(--radius-md); padding: 16px; box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2);">
      <ds-chart type="column"
        [series]="[{ name: 'Cases', data: [138, 211, 195, 237, 172, 71, 28] }]"
        [categories]="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
        title="Cases by Day of Week"
      />
    </div>

    <!-- Supporting tiles — 1×1 each -->
    <div style="grid-area: tile1; background: var(--color-surface-page); border-radius: var(--radius-md); padding: 16px; box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2);">
      <ds-chart type="donut"
        [series]="[{ type: 'pie', data: [{ name: 'Email', y: 38 }, { name: 'Chat', y: 27 }, { name: 'Phone', y: 19 }, { name: 'Portal', y: 11 }, { name: 'Other', y: 5 }] }]"
        title="Cases by Channel"
      />
    </div>

    <div style="grid-area: tile2; background: var(--color-surface-page); border-radius: var(--radius-md); padding: 16px; box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2);">
      <ds-chart type="area"
        [series]="[{ name: 'Avg Handle Time', data: [5.2, 5.6, 5.4, 4.6, 4.5, 4.5] }]"
        [categories]="['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr']"
        title="Avg Handle Time"
      />
    </div>

  </div>
</div>
```

#### Bento layout rules
- **Always use `grid-template-areas`** — named areas make the layout intention explicit and easy to adjust.
- **Hero tile spans at minimum 2 cols × 2 rows** — it must visually dominate. The most data-rich or business-critical chart is the hero.
- **Metric cards go in the 2×2 quadrant opposite the hero** — they balance the hero's weight.
- **Bottom row mixes one wide tile + two narrow tiles** — `2 cols + 1 col + 1 col` is the default; adjust to `2+2` or `3+1` for different content needs.
- **All chart tiles** use `background: var(--color-surface-page)` + `box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2)` to float above the page canvas.
- **Hero chart** should use `display: flex; flex-direction: column` with `flex: 1; min-height: 0` on the `<ds-chart>` to fill the tall grid area.
- **Gap is always `12px`** across the bento grid.
- **Never use a uniform equal-column grid** (`repeat(N, 1fr)`) for a dashboard — it loses the visual hierarchy the bento structure provides.

### Trend sign convention
- `[trend]="8.3"` → `+8.3%` in green with `trending_up` icon
- `[trend]="-1.2"` → `-1.2%` in red with `trending_down` icon
- `[trend]="0"` → `+0%` in green (zero is treated as non-negative)
- `[trend]="null"` → trend row hidden entirely

---

## ds-dashboard-toolbar

### Purpose
A floating page-level toolbar placed above the bento grid on dashboard pages.
Unlike `ds-table-toolbar`, there is **no enclosing box** — each control is its own
individually elevated element. The visual language matches `ds-metric-card`:
`box-shadow` for elevation, no borders.

### Design principles
- Title and subtitle are **bare text on the page canvas** — no background, no container.
- Each control in `__controls` floats independently using the same elevation as metric cards:
  `box-shadow: 0 1px 4px var(--shadow-elevation-1), 0 2px 8px var(--shadow-elevation-2)`.
- **No borders** on any control — elevation alone conveys the interactive surface.
- Quick filters are pulled out of the filter modal into the `__controls` row so the most
  common filter is one click away. The filter icon button still opens the full filter modal.

### Anatomy

| Element | Class | Role |
|---|---|---|
| Host | `ds-dashboard-toolbar` | Flex column, `align-items: flex-start`, 8px gap |
| Top row | `__identity` | Full-width flex row, `justify-content: space-between`, `align-items: baseline` — title left, subtitle right |
| Title | `__title` | `h1`, 20px/600, `--color-text-primary` |
| Subtitle | `__subtitle` | `p`, 12px/400, `--color-text-secondary` |
| Bottom row | `__controls` | Flex row of floating controls, `gap: 8px`, left-aligned below identity |
| Quick filter | `__date-select` | Input-style period selector with `calendar_today` leading icon and `arrow_drop_down` trailing icon |
| Icon button | `__btn` | 42×42px floating square, elevated, `filter_alt` / `more_vert` |
| Active state | `__btn.is-active` | Filter button when filter panel is open — brand blue fill |

### Inputs / Outputs (Angular)

| Input | Type | Notes |
|---|---|---|
| `[title]` | `string` | Page title (required) |
| `[subtitle]` | `string` | Optional supporting text — date, status, last-updated |

| Output | Notes |
|---|---|
| `(filterClick)` | Filter icon button clicked — open the filter modal |
| `(moreClick)` | More options icon button clicked |

Content slot: `[toolbar-filters]` — project quick-filter controls (e.g. `__date-select`) here.

### __date-select details
- 42px tall, `--radius-sm`, elevated (no border)
- Leading `ds-icon ds-icon--sm calendar_today` in `--color-icon-subtle`
- Native `<select>` — `appearance: none`, transparent background, 13px/500 text
- Trailing `ds-icon ds-icon--sm arrow_drop_down` in `--color-icon-default`
- Overlay tint via `::after` pseudo-element on hover
- Focus ring: `:focus-within:not([data-mouse-focus])` with `0 0 0 3px var(--color-border-ada-focus-ring)` added to the existing box-shadow (doesn't replace elevation)
- `data-mouse-focus` set via JS on mousedown/touchstart; removed on focusout — same pattern as `ds-input`

### CSS class API
```html
<div class="ds-dashboard-toolbar">
  <div class="ds-dashboard-toolbar__identity">
    <h1 class="ds-dashboard-toolbar__title">Support Dashboard</h1>
    <p class="ds-dashboard-toolbar__subtitle">April 15, 2026 · Last updated 2 min ago</p>
  </div>
  <div class="ds-dashboard-toolbar__controls">
    <!-- Pulled-out quick filter -->
    <div class="ds-dashboard-toolbar__date-select">
      <span class="ds-icon ds-icon--sm" aria-hidden="true">calendar_today</span>
      <select aria-label="Date range">
        <option>Today</option>
        <option>Last 7 days</option>
        <option>Last 30 days</option>
        <option>Custom range</option>
      </select>
      <span class="ds-icon ds-icon--sm" aria-hidden="true">arrow_drop_down</span>
    </div>
    <!-- Filter button — add is-active when filter panel is open -->
    <button class="ds-dashboard-toolbar__btn" type="button" aria-label="Filter">
      <span class="ds-icon" aria-hidden="true">filter_alt</span>
    </button>
    <!-- More options -->
    <button class="ds-dashboard-toolbar__btn" type="button" aria-label="More options">
      <span class="ds-icon" aria-hidden="true">more_vert</span>
    </button>
  </div>
</div>
```

### Angular component
```html
<ds-dashboard-toolbar
  title="Support Dashboard"
  subtitle="April 15, 2026 · Last updated 2 min ago"
  (filterClick)="openFilter()"
  (moreClick)="openMoreMenu()">

  <div toolbar-filters class="ds-dashboard-toolbar__date-select">
    <span class="ds-icon ds-icon--sm" aria-hidden="true">calendar_today</span>
    <select aria-label="Date range" [(ngModel)]="selectedPeriod">
      <option value="today">Today</option>
      <option value="7d">Last 7 days</option>
      <option value="30d">Last 30 days</option>
      <option value="custom">Custom range</option>
    </select>
    <span class="ds-icon ds-icon--sm" aria-hidden="true">arrow_drop_down</span>
  </div>

</ds-dashboard-toolbar>
```

### What NOT to do
- Never add a background or border to the `ds-dashboard-toolbar` container — it must be transparent.
- Never use a border on `__btn` or `__date-select` — elevation only.
- Never put action buttons (Export, New Case, etc.) in the toolbar controls — action buttons belong in the page header outside the toolbar, or in a `__btn.more_vert` menu.
- Never skip `aria-label` on `__btn` elements — they are icon-only.
- Never use `filter_alt` as the filter icon when no filters are active with `.is-active` — only apply `.is-active` when the filter panel is actually open or active filters exist.
