# Component Specs — Filter

`DsFilterComponent`, `DsFilterBarComponent`

> The filter system is a two-component composition: `ds-filter` is the full-screen modal that drives the selection experience, and `ds-filter-bar` is the applied-filters summary strip between the toolbar and the table. Both are new DS components built from the Filters prototype (`~/Developer/Filters/`).

---

## TypeScript Interfaces

These interfaces define the public data contract. Import from `@onflo/design-system`.

### `FilterOption`

```typescript
interface FilterOption {
  id: string;
  label: string;
}
```

### `FilterTier`

A tier is a sub-section within a group. It can be a checkbox list, a date range picker, a cost range slider, or a numeric range slider. `type` discriminates between them; when absent, it defaults to a checkbox list.

```typescript
interface FilterTier {
  id: string;
  label: string;

  // Checkbox list — options are defined
  options?: FilterOption[];

  // Specialty tiers — options is absent; type + constraints define the UI
  type?: 'date-range' | 'cost-range' | 'numeric-range';

  // For cost-range and numeric-range:
  min?: number;
  max?: number;
  step?: number;

  // For numeric-range only:
  unit?: string;        // e.g. 'days'
  maxLabel?: string;    // override max label, e.g. '32+' when open-ended
}
```

### `FilterGroup`

A group appears in the left navigation. Two shapes exist: flat (options directly on the group) and tiered (options nested inside tiers).

```typescript
interface FilterGroup {
  id: string;
  label: string;
  icon: string;   // Material Symbols ligature name, e.g. 'inventory_2'

  // Flat group — options rendered directly (no tier header)
  options?: FilterOption[];

  // Tiered group — options nested under named tiers
  tiers?: FilterTier[];

  // Date preset group (Service Overview / special context)
  // Flat options are single-select presets; a custom date range picker is also shown.
  type?: 'date-preset';
}
```

### `FilterRangeSelection`

Dynamic selections (date ranges, cost ranges, numeric ranges) carry their resolved values as structured objects rather than opaque IDs.

```typescript
interface FilterDateRangeSelection {
  tierId: string;     // matches FilterTier.id; null for custom date-range preset
  label: string;      // formatted display label, e.g. 'Jan 5 – Feb 3'
  from?: string;      // ISO date 'YYYY-MM-DD'
  to?: string;        // ISO date 'YYYY-MM-DD'
  mode?: 'range' | 'single';  // for custom date-range in date-preset groups only
}

interface FilterCostRangeSelection {
  tierId: string;
  label: string;      // e.g. '$100 – $4,000'
  min: number;
  max: number;
}

interface FilterNumericRangeSelection {
  tierId: string;
  label: string;      // e.g. '3–14 days'
  min: number;
  max: number;
}
```

### `FilterSelection`

The committed selection state — emitted by `ds-filter` on apply, consumed by `ds-filter-bar`, and passed to the data layer for filtering.

```typescript
interface FilterSelection {
  // Static checkbox selections
  optionIds: string[];
  // Tier/group keys whose selections are EXCLUDED (NOT-filter logic)
  excludedBuckets: string[];
  // Dynamic range selections
  dateRanges: FilterDateRangeSelection[];
  costRanges: FilterCostRangeSelection[];
  numericRanges: FilterNumericRangeSelection[];
  // Single-select preset date option IDs (for date-preset groups)
  datePresetIds: string[];
}
```

**Empty selection sentinel:**
```typescript
const EMPTY_FILTER_SELECTION: FilterSelection = {
  optionIds: [],
  excludedBuckets: [],
  dateRanges: [],
  costRanges: [],
  numericRanges: [],
  datePresetIds: [],
};
```

**`activeFilterCount` helper** — the total number of individually selected items (used for the toolbar badge):

```typescript
function getActiveFilterCount(s: FilterSelection): number {
  return s.optionIds.length
    + s.dateRanges.length
    + s.costRanges.length
    + s.numericRanges.length
    + s.datePresetIds.length;
}
```

### `SavedFilterSet`

```typescript
interface SavedFilterSet {
  id: string;       // 'fs-{timestamp}', generated on save
  name: string;
  savedAt: string;  // ISO datetime
  // Only static + preset selections are saved (range selections are ephemeral)
  optionIds: string[];
  excludedBuckets: string[];
  datePresetIds: string[];
}
```

---

## `DsFilterComponent` API

**Selector**: `ds-filter`  
**Standalone**: yes  
**Dark panel**: the right "selected" panel renders with `data-theme="dark"` on its host element — all `--color-*` tokens resolve to their dark-theme values automatically.

### Inputs

| Input | Type | Default | Purpose |
|---|---|---|---|
| `groups` | `FilterGroup[]` | `[]` | Full filter group config for this page context |
| `selection` | `FilterSelection` | `EMPTY_FILTER_SELECTION` | Committed selection (two-way; use `[(selection)]`) |
| `open` | `boolean` | `false` | Modal open state (two-way; use `[(open)]`) |
| `savedSetsKey` | `string` | `''` | `localStorage` key for saved filter sets, e.g. `'onflo-filter-sets-assets'`. Empty string disables saved sets UI. |

### Outputs

| Output | Payload | When |
|---|---|---|
| `selectionChange` | `FilterSelection` | Two-way binding counterpart — fires when `open` transitions from true→false via Apply |
| `openChange` | `boolean` | Two-way binding counterpart — fires on open/close |
| `filterCountChange` | `number` | Fires whenever the draft selection size changes (for live badge count before Apply) |

### Template usage

```html
<ds-filter
  [(open)]="filterOpen"
  [groups]="filterGroups"
  [(selection)]="filterSelection"
  [savedSetsKey]="'onflo-filter-sets-assets'"
  (filterCountChange)="filterCount = $event"
/>
```

### Component class (skeleton)

```typescript
import { Component, input, output, model, signal, computed } from '@angular/core';
import { FilterGroup, FilterSelection, EMPTY_FILTER_SELECTION } from '@onflo/design-system';

@Component({
  selector: 'ds-filter',
  standalone: true,
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  // OnPush is preferred — all state flows through signals
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsFilterComponent {
  // Public API
  groups        = input<FilterGroup[]>([]);
  selection     = model<FilterSelection>(EMPTY_FILTER_SELECTION);
  open          = model<boolean>(false);
  savedSetsKey  = input<string>('');

  filterCountChange = output<number>();

  // Internal draft state (signals) — discarded on cancel, emitted on apply
  readonly draft = signal<FilterSelection>(EMPTY_FILTER_SELECTION);

  // ... internal state signals for activeGroupId, searchQuery, collapsedTiers, etc.

  apply(): void {
    this.selection.set(this.draft());
    this.open.set(false);
  }

  cancel(): void {
    this.draft.set(this.selection());   // revert draft to last committed state
    this.open.set(false);
  }

  clearAll(): void {
    this.draft.set(EMPTY_FILTER_SELECTION);
  }
}
```

---

## `DsFilterBarComponent` API

**Selector**: `ds-filter-bar`  
**Standalone**: yes  
**Visibility**: the host element should be hidden (`hidden` attribute or `[hidden]`) when `selection` is empty. The component does NOT self-hide — the consuming template controls this.

### Inputs

| Input | Type | Purpose |
|---|---|---|
| `selection` | `FilterSelection` | The committed selection to render as chips |
| `groups` | `FilterGroup[]` | Needed to resolve breadcrumb labels (group › tier) for each chip |

### Outputs

| Output | Payload | When |
|---|---|---|
| `selectionChange` | `FilterSelection` | Fires when a chip's remove (×) button is clicked; payload is selection with that bucket removed |
| `filterClick` | `string` | Emits `groupId` when a chip body is clicked — consumer opens the filter modal navigated to that group |

### Template usage

```html
<ds-filter-bar
  [hidden]="filterCount === 0"
  [selection]="filterSelection"
  [groups]="filterGroups"
  (selectionChange)="filterSelection = $event"
  (filterClick)="openFilterAtGroup($event)"
/>
```

---

## Composition with `ds-table-toolbar`

This is the canonical wiring pattern for all table pages with filtering. Claude Code agents in consuming projects MUST use this pattern as-is.

### Template

```html
<div class="ds-page-content__main ds-page-content__main--table"
     [attr.data-panel-open]="settingsActive || null">

  <ds-table-toolbar
    [title]="'Assets'"
    [(filterActive)]="filterOpen"
    [(settingsActive)]="settingsActive"
    [filterBadgeCount]="filterCount"
  >
    <button ds-button variant="filled" slot="toolbar-actions">Add Asset</button>
  </ds-table-toolbar>

  <ds-filter-bar
    [hidden]="filterCount === 0"
    [selection]="filterSelection"
    [groups]="filterGroups"
    (selectionChange)="onFilterSelectionChange($event)"
    (filterClick)="filterOpen = true"
  />

  <ag-grid-angular class="ds-ag-grid ag-theme-quartz" [gridOptions]="gridOptions" ... />
  <ds-ag-paginator [api]="gridApi" />

  <ds-column-panel [api]="gridApi" [(density)]="density" />
</div>

<ds-filter
  [(open)]="filterOpen"
  [groups]="filterGroups"
  [(selection)]="filterSelection"
  [savedSetsKey]="'onflo-filter-sets-assets'"
  (filterCountChange)="filterCount = $event"
/>
```

### Component class

```typescript
@Component({ standalone: true, imports: [/* ... DS components ... */], ... })
export class AssetsPageComponent {
  gridApi?: GridApi;
  settingsActive = false;
  filterOpen     = false;
  filterCount    = 0;
  filterGroups   = FILTER_GROUPS_ASSETS;  // FilterGroup[] config for this page
  filterSelection: FilterSelection = EMPTY_FILTER_SELECTION;

  onFilterSelectionChange(selection: FilterSelection): void {
    this.filterSelection = selection;
    this.filterCount = getActiveFilterCount(selection);
    // Apply to grid — pass to data service or ag-grid filter model as needed
    this.applyFiltersToGrid(selection);
  }

  onGridReady(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }
}
```

### How `filterBadgeCount` connects to the toolbar icon button

`ds-table-toolbar` passes `filterBadgeCount` to the `ds-icon-button-toggle` it renders for the filter button. This drives the `[count]` input on the badge inside the icon button. The badge is hidden when `filterBadgeCount` is 0 (or not provided) and shows the count when > 0.

---

## Internal State Model

For implementors of `DsFilterComponent`. Not part of the public API.

### Draft state (all signals)

```typescript
// Left nav
activeGroupId: Signal<string | null>      // currently selected filter group
searchQuery:   Signal<string>             // option search input value

// Option selections (mirrors FilterSelection but mutable during edit)
selectedOptionIds:     Signal<Set<string>>
excludedBuckets:       Signal<Set<string>>
dateRanges:            Signal<FilterDateRangeSelection[]>
costRanges:            Signal<FilterCostRangeSelection[]>
numericRanges:         Signal<FilterNumericRangeSelection[]>
datePresetIds:         Signal<string[]>

// UI collapse state (not part of committed selection)
collapsedTiers:                Signal<Set<string>>  // center panel tier sections
collapsedSelectedBuckets:      Signal<Set<string>>  // right panel bucket collapse
expandedSelectedBuckets:       Signal<Set<string>>  // explicit user overrides

// Date picker draft (not committed until Apply/Add)
fieldDateDrafts:       Signal<Record<string, { from?: string; to?: string }>>
costRangeDrafts:       Signal<Record<string, { min: number; max: number }>>
numericRangeDrafts:    Signal<Record<string, { min: number; max: number }>>

// Date preset custom picker state
datePickerMode:        Signal<'range' | 'single'>
dateRangeDraft:        Signal<{ start: Date | null; end: Date | null }>
datePresetCustomOpen:  Signal<boolean>
calendarOpen:          Signal<boolean>
activeDateInput:       Signal<'start' | 'end'>

// Saved sets
activeFilterSetId:     Signal<string | null>
savedSetsOpen:         Signal<boolean>
```

### Computed option metadata map

```typescript
// Computed from groups input — no manual maintenance needed
optionMeta: Signal<Map<string, FilterOptionMeta>>
// where FilterOptionMeta = { groupId, groupLabel, tierId, tierLabel, label }
```

### Bucket key logic

A "bucket" groups related selections for display in the right panel and for exclude toggling.
- For tiered groups: bucket key = `tier.id`
- For flat groups: bucket key = `group.id`
- Date ranges: bucket key = `tier.id` (or `group.id` for date-preset custom ranges)

### Right-panel auto-collapse

The right panel ("selected") auto-collapses a bucket when it has more than **4 selected options**. The user can override this per bucket. This threshold is `BUCKET_AUTO_COLLAPSE_THRESHOLD = 4` — do not change without design approval.

---

## Saved Sets API

### localStorage schema

```
Key: savedSetsKey input (e.g. 'onflo-filter-sets-assets')
Value: JSON.stringify(SavedFilterSet[])
```

One key per page context. Never use the same key across different page contexts.

### Saved sets panel behavior

- **Toggle button** label switches between "Save Filters" and "Load Filters" based on state:
  - "Save Filters" when: filters are selected AND (no active set OR active set has unsaved changes)
  - "Load Filters" otherwise
- **Save form**: text input (max 60 chars) + Save button; disabled when no filters are selected
- **Active set chip**: shown in the modal header when a saved set is loaded; includes an "Update" button that appears only when the current selection differs from the saved state
- **Sets list**: displayed newest-first; Load / Loaded (disabled) / Delete controls per row

### What is saved vs. excluded

| Selection type | Saved? |
|---|---|
| Static checkbox options | Yes |
| Date presets | Yes |
| `excludedBuckets` | Yes |
| Date range (field-specific or custom) | No — ephemeral |
| Cost range | No — ephemeral |
| Numeric range | No — ephemeral |

Rationale: range values depend on slider position at save time and are not reliably restorable without matching tier config. Consumers who need range persistence must implement their own serialization outside `SavedFilterSet`.

---

## Tier Type Reference

### `options` (default) — checkbox multi-select

Renders as a scrollable card grid. Each option is a `filter-card` with checkbox. "Select all" toggle present when tier has > 1 option.

```typescript
{ id: 'asset-type', label: 'Asset Type', options: [{ id: 'at-laptop', label: 'Laptop' }, ...] }
```

### `date-range` — date field picker (tiered groups)

Renders inline: two ISO date inputs (From / To) + Apply / Clear buttons. Does not use the floating calendar panel — pure text inputs.

```typescript
{ id: 'date-created', label: 'Created Date', type: 'date-range' }
```

ID format for committed range: `'dr-{tierId}'` (internal to component).

### `cost-range` — dual-thumb currency slider

Renders: range label ("$100 – $4,000") + dual-thumb slider with `--cr-min` / `--cr-max` CSS custom properties + Apply / Clear buttons.

```typescript
{ id: 'total-cost', label: 'Total Cost', type: 'cost-range', min: 0, max: 5000, step: 50 }
```

ID format for committed range: `'cr-{tierId}'` (internal to component).

### `numeric-range` — dual-thumb integer slider

Same visual as cost-range but displays unit suffix and supports an open-ended `maxLabel`.

```typescript
{ id: 'ticket-age', label: 'Ticket Age', type: 'numeric-range', min: 0, max: 32, step: 1, unit: 'days', maxLabel: '32+' }
```

ID format for committed range: `'nr-{tierId}'` (internal to component).

### `date-preset` (group-level type) — single-select preset list

Group-level flag (not a tier type). Renders a single-select list of named periods (e.g. "Last 7 days", "This month"). Also renders an expandable custom date range picker at the bottom of the list. Only one selection active at a time — selecting a preset clears any custom range, and vice versa.

```typescript
{
  id: 'dates', label: 'Date', icon: 'calendar_today', type: 'date-preset',
  options: [{ id: 'dp-7days', label: 'Last 7 days' }, ...]
}
```

---

## Key Behavioral Contracts

### Apply / cancel lifecycle

1. **Open**: `[(open)]` is set to `true` by the parent (toolbar filter button). Draft state is initialized from `selection` input.
2. **Edit**: User modifies selections. `filterCountChange` fires on every change with the current draft count.
3. **Apply**: Draft is committed (`selectionChange` fires), `open` is set to `false` (`openChange` fires).
4. **Cancel / close (Escape / backdrop)**: Draft is discarded and reverted to last committed `selection`. `selectionChange` does NOT fire.
5. **Clear All**: Resets draft to `EMPTY_FILTER_SELECTION`. Does not close the modal.

### Search behavior

- Searches across all groups simultaneously; nav switches to a "Search Results" pseudo-view (no group nav highlighted)
- Each matching group shown as a collapsible section; limit of **5 options shown per group** before a "Show more" control
- Matching text highlighted with `<mark class="search-match">` inside the option label
- Clearing search restores the previously active group

### Exclude (NOT filter) toggle

Each bucket in the right panel has an include/exclude toggle. When excluded:
- The bucket card in the filter bar gains `filter-applied-card--excluded` modifier (red tint)
- The card icon switches from `filter_alt` (filled) to `filter_alt_off` (filled)
- The consumer data layer should treat an excluded bucket as a NOT filter

### Badge count

`filterCountChange` emits the total count of ALL individually selected items (sum of `optionIds.length + dateRanges.length + costRanges.length + numericRanges.length + datePresetIds.length`). This includes items in excluded buckets — they are still "active" filters.

Counts above 99 should display as "99+" in the toolbar badge (handled inside `ds-icon-button-toggle`).

### Focus management

| Event | Focus target |
|---|---|
| Modal opens | Search input |
| Modal closes (Apply or Cancel) | Toolbar filter toggle button |
| Saved sets panel opens | Name input (if filters are selected); first "Load" button otherwise |
| Saved sets panel closes | Saved sets toggle button |

### Body scroll lock

When the modal is open: `document.body` receives `overflow: hidden`. Restored on close. This is handled inside `DsFilterComponent` via a document-level effect, not by the consumer.

---

## CSS Architecture

### Layout regions

```
.filter-modal
├── .filter-modal__header              (dark panel — data-theme="dark")
├── .filter-modal__body
│   ├── .filter-modal__nav             (left: group list)
│   ├── .filter-modal__options         (center: option cards)
│   └── .filter-modal__selected        (right: selected summary — data-theme="dark")
└── .filter-modal__footer              (dark panel — data-theme="dark")
```

`data-theme="dark"` is applied to the right panel host and the header/footer regions. All `--color-*` tokens resolve to their dark-theme values automatically — no hardcoded dark values in the SCSS.

### Filter bar

```
.filter-applied-bar
└── .filter-applied-cards              (scrollable horizontal row of chips)
    └── .ds-card-item.ds-card-item--interactive   (one per active bucket)
        └── .filter-applied-card__remove           (× button)
```

The filter bar uses the existing `ds-card-item` CSS class API for chips.

### BEM prefix

All filter-specific classes use the `filter-` prefix (never `ds-`). These are candidates for DS contribution during the future integration review.

DS component classes used in-template: `ds-button`, `ds-input`, `ds-chip`, `ds-icon-button`, `ds-icon-button-toggle`, `ds-empty-state`, `ds-tag`.

---

## File Structure (when implementing)

```
components/filter/
  _filter.scss              CSS class API (all .filter-* classes)
  filter.component.ts       DsFilterComponent
  filter.component.html
  filter.component.scss     @use 'filter' only

components/filter-bar/
  _filter-bar.scss
  filter-bar.component.ts   DsFilterBarComponent
  filter-bar.component.html
  filter-bar.component.scss
```

Register in `components/index.scss`:
```scss
@use 'filter/filter';
@use 'filter-bar/filter-bar';
```
