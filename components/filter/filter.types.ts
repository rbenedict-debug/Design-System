// ============================================================
// Onflo Design System — Filter Types
// Public data contract for ds-filter and ds-filter-bar.
// ============================================================

/**
 * A single selectable option within a filter group or tier.
 */
export interface FilterOption {
  id: string;
  label: string;
}

/**
 * A tier is a sub-section within a filter group.
 * When `type` is absent the tier renders as a checkbox card grid.
 * Specialty tiers set `type` and omit `options`.
 */
export interface FilterTier {
  id: string;
  label: string;
  /** Checkbox card grid (default when `type` is absent). */
  options?: FilterOption[];
  /** Specialty tier type — determines which input UI is rendered. */
  type?: 'date-range' | 'cost-range' | 'numeric-range';
  /** Slider minimum (cost-range, numeric-range). */
  min?: number;
  /** Slider maximum (cost-range, numeric-range). */
  max?: number;
  /** Slider step size (cost-range, numeric-range). */
  step?: number;
  /** Unit suffix for numeric-range labels, e.g. 'days'. */
  unit?: string;
  /** Display label override for the max value, e.g. '32+'. */
  maxLabel?: string;
}

/**
 * A top-level filter group shown as a nav item.
 * Two shapes exist: flat (options directly on the group) and tiered (options in tiers).
 * A third shape `date-preset` renders a single-select preset list.
 */
export interface FilterGroup {
  id: string;
  label: string;
  /** Material Symbols ligature name, e.g. 'inventory_2'. */
  icon: string;
  /** Flat group — options rendered directly with no tier header. */
  options?: FilterOption[];
  /** Tiered group — options nested under named tier sections. */
  tiers?: FilterTier[];
  /**
   * `date-preset` — renders `options` as a single-select preset list
   * plus an expandable custom date range picker.
   */
  type?: 'date-preset';
}

/** A committed date range selection for a field-specific or custom date range. */
export interface FilterDateRangeSelection {
  /** Matches FilterTier.id; null for a custom date-range in a date-preset group. */
  tierId: string | null;
  /** Formatted display label, e.g. 'Jan 5 – Feb 3'. */
  label: string;
  /** ISO date string 'YYYY-MM-DD'. */
  from?: string;
  /** ISO date string 'YYYY-MM-DD'. */
  to?: string;
  /** Mode used when adding — only set for date-preset custom ranges. */
  mode?: 'range' | 'single';
}

/** A committed cost range selection from a dual-thumb slider tier. */
export interface FilterCostRangeSelection {
  tierId: string;
  /** Formatted display label, e.g. '$100 – $4,000'. */
  label: string;
  min: number;
  max: number;
}

/** A committed numeric range selection from a dual-thumb slider tier. */
export interface FilterNumericRangeSelection {
  tierId: string;
  /** Formatted display label, e.g. '3–14 days'. */
  label: string;
  min: number;
  max: number;
}

/**
 * The committed filter selection state.
 * Emitted by ds-filter on Apply; consumed by ds-filter-bar; passed to the data layer.
 */
export interface FilterSelection {
  /** Static checkbox option IDs. */
  optionIds: string[];
  /** Tier/group keys whose selections are EXCLUDED (NOT-filter). */
  excludedBuckets: string[];
  /** Field-specific and custom date range selections. */
  dateRanges: FilterDateRangeSelection[];
  /** Cost range slider selections. */
  costRanges: FilterCostRangeSelection[];
  /** Numeric range slider selections. */
  numericRanges: FilterNumericRangeSelection[];
  /** Single-select preset date option IDs (for date-preset groups). */
  datePresetIds: string[];
}

/**
 * A named saved filter set persisted to localStorage.
 * Range selections (date, cost, numeric) are excluded from saved sets.
 */
export interface SavedFilterSet {
  /** 'fs-{timestamp}', generated on save. */
  id: string;
  name: string;
  /** ISO datetime string. */
  savedAt: string;
  /** Static checkbox option IDs — dynamic (range) IDs are excluded. */
  optionIds: string[];
  excludedBuckets: string[];
  /** Preset date option IDs. */
  datePresetIds: string[];
}

/** Empty selection sentinel — use as the default value for the selection input. */
export const EMPTY_FILTER_SELECTION: FilterSelection = {
  optionIds: [],
  excludedBuckets: [],
  dateRanges: [],
  costRanges: [],
  numericRanges: [],
  datePresetIds: [],
};

/** Returns the total count of all active selections across all types. */
export function getActiveFilterCount(s: FilterSelection): number {
  return (
    s.optionIds.length +
    s.dateRanges.length +
    s.costRanges.length +
    s.numericRanges.length +
    s.datePresetIds.length
  );
}
