import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  HostListener,
  signal,
  computed,
  inject,
  DOCUMENT,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FilterGroup,
  FilterTier,
  FilterSelection,
  FilterDateRangeSelection,
  FilterCostRangeSelection,
  FilterNumericRangeSelection,
  SavedFilterSet,
  EMPTY_FILTER_SELECTION,
  getActiveFilterCount,
} from './filter.types';

// ── Internal interfaces ───────────────────────────────────────────────────────

type _ItemKind = 'option' | 'date-preset' | 'date-range' | 'cost-range' | 'numeric-range' | 'custom-date';

interface _SelectedBucketItem {
  id: string;
  label: string;
  kind: _ItemKind;
}

interface _SelectedBucket {
  key: string;
  label: string;
  items: _SelectedBucketItem[];
}

/**
 * Onflo Design System — Filter
 *
 * Full-screen filter modal with a three-panel layout:
 *   Left   — group navigation + search
 *   Center — option cards, tier accordions, range pickers
 *   Right  — selected filters summary (dark panel) + saved sets
 *
 * Two-way bindings:
 *   [(open)]      — controls modal visibility
 *   [(selection)] — committed FilterSelection; syncs on Apply
 *
 * Saved sets:
 *   Provide [savedSetsKey] with a unique localStorage key per context.
 *   Omit to hide the saved-sets feature entirely.
 *
 * @example
 *   <ds-filter
 *     [(open)]="filterOpen"
 *     [groups]="filterGroups"
 *     [(selection)]="filterSelection"
 *     [savedSetsKey]="'onflo-filter-sets-assets'"
 *     (filterCountChange)="filterCount = $event"
 *   />
 */
@Component({
  selector: 'ds-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsFilterComponent implements OnChanges {
  // ── Public Inputs ──────────────────────────────────────────────────────────

  /** Filter group definitions. */
  @Input() groups: FilterGroup[] = [];

  /** Committed selection — two-way bindable via [(selection)]. */
  @Input() selection: FilterSelection = { ...EMPTY_FILTER_SELECTION };

  /** Whether the modal is open — two-way bindable via [(open)]. */
  @Input() open = false;

  /**
   * localStorage key for saved filter sets, e.g. 'onflo-filter-sets-assets'.
   * When omitted the saved-sets feature is hidden.
   */
  @Input() savedSetsKey?: string;

  // ── Public Outputs ─────────────────────────────────────────────────────────

  /** Emits the committed FilterSelection when the user clicks Apply. */
  @Output() selectionChange = new EventEmitter<FilterSelection>();

  /** Emits false when the modal closes. */
  @Output() openChange = new EventEmitter<boolean>();

  /** Emits the total active filter count after every Apply or Clear All. */
  @Output() filterCountChange = new EventEmitter<number>();

  // ── Internal Signal State ──────────────────────────────────────────────────

  readonly _activeGroupId   = signal<string>('');
  readonly _searchQuery     = signal<string>('');
  readonly _selectedIds     = signal<Set<string>>(new Set());
  readonly _excludedBuckets = signal<Set<string>>(new Set());
  readonly _dateRanges      = signal<FilterDateRangeSelection[]>([]);
  readonly _costRanges      = signal<FilterCostRangeSelection[]>([]);
  readonly _numericRanges   = signal<FilterNumericRangeSelection[]>([]);
  readonly _datePresetIds   = signal<Set<string>>(new Set());
  readonly _collapsedTiers  = signal<Set<string>>(new Set());
  readonly _collapsedBuckets = signal<Set<string>>(new Set());

  /** Draft state for date-range tier inputs; keyed by tierId. */
  readonly _fieldDateDrafts   = signal<Record<string, { from?: string; to?: string }>>({});
  /** Draft state for cost-range sliders; keyed by tierId. */
  readonly _costRangeDrafts   = signal<Record<string, { min: number; max: number }>>({});
  /** Draft state for numeric-range sliders; keyed by tierId. */
  readonly _numericRangeDrafts = signal<Record<string, { min: number; max: number }>>({});

  readonly _activeFilterSetId   = signal<string | null>(null);
  readonly _savedSetsOpen       = signal<boolean>(false);
  readonly _savedSets           = signal<SavedFilterSet[]>([]);
  readonly _saveNameDraft       = signal<string>('');
  readonly _customDateExpanded  = signal<boolean>(false);
  readonly _customDateDraft     = signal<{ from?: string; to?: string }>({});

  // ── Computed ───────────────────────────────────────────────────────────────

  readonly activeGroup = computed((): FilterGroup | null =>
    this.groups.find(g => g.id === this._activeGroupId()) ?? null
  );

  readonly draftActiveCount = computed(() =>
    this._selectedIds().size +
    this._dateRanges().length +
    this._costRanges().length +
    this._numericRanges().length +
    this._datePresetIds().size
  );

  /** Cross-group search results — non-empty only when search query is present. */
  readonly searchResults = computed((): Array<{ group: FilterGroup; options: Array<{ id: string; label: string }> }> => {
    const q = this._searchQuery().toLowerCase().trim();
    if (!q) return [];
    return this.groups
      .map(g => {
        const allOptions: Array<{ id: string; label: string }> = [
          ...(g.options ?? []),
          ...(g.tiers ?? []).reduce((acc: Array<{ id: string; label: string }>, t) => acc.concat(t.options ?? []), []),
        ];
        return { group: g, options: allOptions.filter(o => o.label.toLowerCase().includes(q)) };
      })
      .filter(r => r.options.length > 0);
  });

  /** Buckets of selected items for display in the right panel. */
  readonly selectedBuckets = computed((): _SelectedBucket[] => {
    const buckets: _SelectedBucket[] = [];
    const optionIds = this._selectedIds();
    const presetIds = this._datePresetIds();

    for (const group of this.groups) {
      if (group.type === 'date-preset') {
        const items = (group.options ?? [])
          .filter(o => presetIds.has(o.id))
          .map(o => ({ id: o.id, label: o.label, kind: 'date-preset' as _ItemKind }));
        if (items.length) buckets.push({ key: group.id, label: group.label, items });

        const customRange = this._dateRanges().find(r => r.tierId === null);
        if (customRange) {
          buckets.push({
            key: 'custom-date',
            label: 'Custom Date',
            items: [{ id: 'custom-date', label: customRange.label, kind: 'custom-date' }],
          });
        }
      } else if (group.options) {
        const items = group.options
          .filter(o => optionIds.has(o.id))
          .map(o => ({ id: o.id, label: o.label, kind: 'option' as _ItemKind }));
        if (items.length) buckets.push({ key: group.id, label: group.label, items });
      } else if (group.tiers) {
        for (const tier of group.tiers) {
          if (tier.type === 'date-range') {
            const r = this._dateRanges().find(dr => dr.tierId === tier.id);
            if (r) buckets.push({ key: `dr-${tier.id}`, label: tier.label, items: [{ id: tier.id, label: r.label, kind: 'date-range' }] });
          } else if (tier.type === 'cost-range') {
            const r = this._costRanges().find(cr => cr.tierId === tier.id);
            if (r) buckets.push({ key: `cr-${tier.id}`, label: tier.label, items: [{ id: tier.id, label: r.label, kind: 'cost-range' }] });
          } else if (tier.type === 'numeric-range') {
            const r = this._numericRanges().find(nr => nr.tierId === tier.id);
            if (r) buckets.push({ key: `nr-${tier.id}`, label: tier.label, items: [{ id: tier.id, label: r.label, kind: 'numeric-range' }] });
          } else {
            const items = (tier.options ?? [])
              .filter(o => optionIds.has(o.id))
              .map(o => ({ id: o.id, label: o.label, kind: 'option' as _ItemKind }));
            if (items.length) buckets.push({ key: tier.id, label: tier.label, items });
          }
        }
      }
    }

    return buckets;
  });

  readonly activeSetName = computed(() => {
    const id = this._activeFilterSetId();
    if (!id) return '';
    return this._savedSets().find(s => s.id === id)?.name ?? '';
  });

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  private readonly _doc = inject(DOCUMENT);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) {
        this._initDraftFromSelection();
        if (!this._activeGroupId() && this.groups.length > 0) {
          this._activeGroupId.set(this.groups[0].id);
        }
        if (this.savedSetsKey) this._loadSavedSets();
        this._doc.body.style.overflow = 'hidden';
      } else {
        this._doc.body.style.overflow = '';
      }
    }
    if (changes['groups'] && !this._activeGroupId() && this.groups.length > 0) {
      this._activeGroupId.set(this.groups[0].id);
    }
  }

  private _initDraftFromSelection(): void {
    const s = this.selection;
    this._selectedIds.set(new Set(s.optionIds));
    this._excludedBuckets.set(new Set(s.excludedBuckets));
    this._dateRanges.set([...s.dateRanges]);
    this._costRanges.set([...s.costRanges]);
    this._numericRanges.set([...s.numericRanges]);
    this._datePresetIds.set(new Set(s.datePresetIds));
    this._fieldDateDrafts.set({});
    this._costRangeDrafts.set({});
    this._numericRangeDrafts.set({});
    this._searchQuery.set('');
    this._saveNameDraft.set('');
    this._savedSetsOpen.set(false);
    this._customDateExpanded.set(false);
    this._customDateDraft.set({});
  }

  // ── Public Actions ─────────────────────────────────────────────────────────

  apply(): void {
    const committed: FilterSelection = {
      optionIds:      [...this._selectedIds()],
      excludedBuckets: [...this._excludedBuckets()],
      dateRanges:     this._dateRanges(),
      costRanges:     this._costRanges(),
      numericRanges:  this._numericRanges(),
      datePresetIds:  [...this._datePresetIds()],
    };
    this.selectionChange.emit(committed);
    this.filterCountChange.emit(getActiveFilterCount(committed));
    this._close();
  }

  cancel(): void {
    this._close();
  }

  clearAll(): void {
    this._selectedIds.set(new Set());
    this._excludedBuckets.set(new Set());
    this._dateRanges.set([]);
    this._costRanges.set([]);
    this._numericRanges.set([]);
    this._datePresetIds.set(new Set());
    this._fieldDateDrafts.set({});
    this._costRangeDrafts.set({});
    this._numericRangeDrafts.set({});
    this._activeFilterSetId.set(null);
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  setActiveGroup(groupId: string): void {
    this._activeGroupId.set(groupId);
    this._searchQuery.set('');
  }

  setSearch(query: string): void {
    this._searchQuery.set(query);
  }

  // ── Option Toggle ──────────────────────────────────────────────────────────

  toggleOption(optionId: string): void {
    const ids = new Set(this._selectedIds());
    ids.has(optionId) ? ids.delete(optionId) : ids.add(optionId);
    this._selectedIds.set(ids);
    this._activeFilterSetId.set(null);
  }

  isOptionSelected(optionId: string): boolean {
    return this._selectedIds().has(optionId);
  }

  // ── Bucket Exclude ─────────────────────────────────────────────────────────

  toggleBucketExclude(bucketKey: string): void {
    const ex = new Set(this._excludedBuckets());
    ex.has(bucketKey) ? ex.delete(bucketKey) : ex.add(bucketKey);
    this._excludedBuckets.set(ex);
  }

  isBucketExcluded(bucketKey: string): boolean {
    return this._excludedBuckets().has(bucketKey);
  }

  // ── Tier Collapse (left panel) ─────────────────────────────────────────────

  toggleTierCollapse(tierId: string): void {
    const c = new Set(this._collapsedTiers());
    c.has(tierId) ? c.delete(tierId) : c.add(tierId);
    this._collapsedTiers.set(c);
  }

  isTierCollapsed(tierId: string): boolean {
    return this._collapsedTiers().has(tierId);
  }

  // ── Bucket Collapse (right panel) ─────────────────────────────────────────

  toggleBucketCollapse(bucketKey: string): void {
    const c = new Set(this._collapsedBuckets());
    c.has(bucketKey) ? c.delete(bucketKey) : c.add(bucketKey);
    this._collapsedBuckets.set(c);
  }

  isBucketCollapsed(bucketKey: string): boolean {
    return this._collapsedBuckets().has(bucketKey);
  }

  // ── Date Preset ────────────────────────────────────────────────────────────

  selectDatePreset(presetId: string): void {
    const group = this.activeGroup();
    if (!group) return;
    const groupIds = new Set((group.options ?? []).map(o => o.id));
    const presets = new Set(this._datePresetIds());
    for (const id of presets) { if (groupIds.has(id)) presets.delete(id); }
    presets.add(presetId);
    this._datePresetIds.set(presets);
    this._customDateExpanded.set(false);
    this._activeFilterSetId.set(null);
  }

  isDatePresetSelected(presetId: string): boolean {
    return this._datePresetIds().has(presetId);
  }

  toggleCustomDateExpanded(): void {
    this._customDateExpanded.update(v => !v);
  }

  setCustomDateDraft(field: 'from' | 'to', value: string): void {
    this._customDateDraft.update(d => ({ ...d, [field]: value }));
  }

  commitCustomDateRange(): void {
    const { from, to } = this._customDateDraft();
    if (!from && !to) return;
    const label = this._formatDateRangeLabel(from, to);
    const ranges = this._dateRanges().filter(r => r.tierId !== null);
    ranges.push({ tierId: null, label, from, to, mode: 'range' });
    this._dateRanges.set(ranges);
    // Deselect any active preset from this group
    const group = this.activeGroup();
    if (group?.type === 'date-preset') {
      const groupIds = new Set((group.options ?? []).map(o => o.id));
      const presets = new Set(this._datePresetIds());
      for (const id of presets) { if (groupIds.has(id)) presets.delete(id); }
      this._datePresetIds.set(presets);
    }
    this._activeFilterSetId.set(null);
  }

  // ── Date Range (tier) ──────────────────────────────────────────────────────

  setFieldDateDraft(tierId: string, field: 'from' | 'to', value: string): void {
    const drafts = { ...this._fieldDateDrafts() };
    drafts[tierId] = { ...drafts[tierId], [field]: value };
    this._fieldDateDrafts.set(drafts);
  }

  commitDateRange(tierId: string): void {
    const { from, to } = this._fieldDateDrafts()[tierId] ?? {};
    if (!from && !to) return;
    const label = this._formatDateRangeLabel(from, to);
    const ranges = this._dateRanges().filter(r => r.tierId !== tierId);
    ranges.push({ tierId, label, from, to });
    this._dateRanges.set(ranges);
    this._activeFilterSetId.set(null);
  }

  getDateDraft(tierId: string, field: 'from' | 'to'): string {
    return this._fieldDateDrafts()[tierId]?.[field] ?? '';
  }

  // ── Cost Range ─────────────────────────────────────────────────────────────

  setCostRangeDraft(tierId: string, min: number, max: number): void {
    this._costRangeDrafts.update(d => ({ ...d, [tierId]: { min, max } }));
  }

  commitCostRange(tierId: string, min: number, max: number): void {
    const label = `$${min.toLocaleString()} – $${max.toLocaleString()}`;
    const ranges = this._costRanges().filter(r => r.tierId !== tierId);
    ranges.push({ tierId, label, min, max });
    this._costRanges.set(ranges);
    this._activeFilterSetId.set(null);
  }

  getCostRangeDraft(tierId: string, tier: FilterTier): { min: number; max: number } {
    return this._costRangeDrafts()[tierId] ?? { min: tier.min ?? 0, max: tier.max ?? 100 };
  }

  // ── Numeric Range ──────────────────────────────────────────────────────────

  setNumericRangeDraft(tierId: string, min: number, max: number): void {
    this._numericRangeDrafts.update(d => ({ ...d, [tierId]: { min, max } }));
  }

  commitNumericRange(tierId: string, min: number, max: number, unit?: string, maxLabel?: string): void {
    const maxStr = maxLabel ?? `${max}`;
    const label = unit ? `${min}–${maxStr} ${unit}` : `${min}–${maxStr}`;
    const ranges = this._numericRanges().filter(r => r.tierId !== tierId);
    ranges.push({ tierId, label, min, max });
    this._numericRanges.set(ranges);
    this._activeFilterSetId.set(null);
  }

  getNumericRangeDraft(tierId: string, tier: FilterTier): { min: number; max: number } {
    return this._numericRangeDrafts()[tierId] ?? { min: tier.min ?? 0, max: tier.max ?? 100 };
  }

  // ── Remove Single Selections ───────────────────────────────────────────────

  removeItem(item: _SelectedBucketItem): void {
    switch (item.kind) {
      case 'option':
        const ids = new Set(this._selectedIds());
        ids.delete(item.id);
        this._selectedIds.set(ids);
        break;
      case 'date-preset':
        const presets = new Set(this._datePresetIds());
        presets.delete(item.id);
        this._datePresetIds.set(presets);
        break;
      case 'date-range':
        this._dateRanges.set(this._dateRanges().filter(r => r.tierId !== item.id));
        break;
      case 'custom-date':
        this._dateRanges.set(this._dateRanges().filter(r => r.tierId !== null));
        break;
      case 'cost-range':
        this._costRanges.set(this._costRanges().filter(r => r.tierId !== item.id));
        break;
      case 'numeric-range':
        this._numericRanges.set(this._numericRanges().filter(r => r.tierId !== item.id));
        break;
    }
    this._activeFilterSetId.set(null);
  }

  removeBucket(bucket: _SelectedBucket): void {
    for (const item of bucket.items) this.removeItem(item);
    const ex = new Set(this._excludedBuckets());
    ex.delete(bucket.key);
    this._excludedBuckets.set(ex);
  }

  // ── Saved Sets ─────────────────────────────────────────────────────────────

  private _loadSavedSets(): void {
    if (!this.savedSetsKey) return;
    try {
      const raw = localStorage.getItem(this.savedSetsKey);
      this._savedSets.set(raw ? (JSON.parse(raw) as SavedFilterSet[]) : []);
    } catch {
      this._savedSets.set([]);
    }
  }

  private _persistSavedSets(sets: SavedFilterSet[]): void {
    if (!this.savedSetsKey) return;
    try { localStorage.setItem(this.savedSetsKey, JSON.stringify(sets)); } catch { /* storage full */ }
  }

  toggleSavedSetsPanel(): void {
    this._savedSetsOpen.update(v => !v);
  }

  setSaveNameDraft(name: string): void {
    this._saveNameDraft.set(name);
  }

  saveCurrentSet(): void {
    const name = this._saveNameDraft().trim();
    if (!name) return;
    const set: SavedFilterSet = {
      id: `fs-${Date.now()}`,
      name,
      savedAt: new Date().toISOString(),
      optionIds:       [...this._selectedIds()],
      excludedBuckets: [...this._excludedBuckets()],
      datePresetIds:   [...this._datePresetIds()],
    };
    const sets = [set, ...this._savedSets()];
    this._savedSets.set(sets);
    this._persistSavedSets(sets);
    this._activeFilterSetId.set(set.id);
    this._saveNameDraft.set('');
  }

  updateCurrentSet(): void {
    const id = this._activeFilterSetId();
    if (!id) return;
    const sets = this._savedSets().map(s =>
      s.id === id
        ? { ...s, savedAt: new Date().toISOString(), optionIds: [...this._selectedIds()], excludedBuckets: [...this._excludedBuckets()], datePresetIds: [...this._datePresetIds()] }
        : s
    );
    this._savedSets.set(sets);
    this._persistSavedSets(sets);
  }

  loadSavedSet(set: SavedFilterSet): void {
    this._selectedIds.set(new Set(set.optionIds));
    this._excludedBuckets.set(new Set(set.excludedBuckets));
    this._datePresetIds.set(new Set(set.datePresetIds));
    this._dateRanges.set([]);
    this._costRanges.set([]);
    this._numericRanges.set([]);
    this._activeFilterSetId.set(set.id);
    this._savedSetsOpen.set(false);
  }

  deleteSavedSet(id: string, event: Event): void {
    event.stopPropagation();
    const sets = this._savedSets().filter(s => s.id !== id);
    this._savedSets.set(sets);
    this._persistSavedSets(sets);
    if (this._activeFilterSetId() === id) this._activeFilterSetId.set(null);
  }

  formatSavedAt(iso: string): string {
    try {
      return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch { return ''; }
  }

  // ── Keyboard ───────────────────────────────────────────────────────────────

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open) this.cancel();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private _close(): void {
    this._doc.body.style.overflow = '';
    this.openChange.emit(false);
  }

  private _formatDateRangeLabel(from?: string, to?: string): string {
    if (!from && !to) return '';
    const fmt = (iso: string): string => {
      const [, m, d] = iso.split('-');
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}`;
    };
    if (from && to) return `${fmt(from)} – ${fmt(to)}`;
    if (from) return `From ${fmt(from)}`;
    return `To ${fmt(to!)}`;
  }

  /** @internal Used in @for trackBy. */
  _trackById(_: number, item: { id: string }): string { return item.id; }
  /** @internal Used in @for trackBy for buckets. */
  _trackByKey(_: number, b: _SelectedBucket): string { return b.key; }

  /** @internal Active selection count for a group — shown as nav badge. */
  _getGroupActiveCount(groupId: string): number {
    const group = this.groups.find(g => g.id === groupId);
    if (!group) return 0;
    const optionIds = this._selectedIds();
    const presetIds = this._datePresetIds();

    if (group.type === 'date-preset') {
      const presetCount = (group.options ?? []).filter(o => presetIds.has(o.id)).length;
      const customCount = this._dateRanges().some(r => r.tierId === null) ? 1 : 0;
      return presetCount + customCount;
    }
    if (group.options) {
      return group.options.filter(o => optionIds.has(o.id)).length;
    }
    if (group.tiers) {
      return group.tiers.reduce((sum, tier) => {
        if (tier.type === 'date-range')    return sum + (this._dateRanges().some(r => r.tierId === tier.id) ? 1 : 0);
        if (tier.type === 'cost-range')    return sum + (this._costRanges().some(r => r.tierId === tier.id) ? 1 : 0);
        if (tier.type === 'numeric-range') return sum + (this._numericRanges().some(r => r.tierId === tier.id) ? 1 : 0);
        return sum + (tier.options ?? []).filter(o => optionIds.has(o.id)).length;
      }, 0);
    }
    return 0;
  }

  /** @internal Active option count for a checkbox tier — shown as tier badge. */
  _getTierActiveCount(tierId: string): number {
    const optionIds = this._selectedIds();
    for (const group of this.groups) {
      for (const tier of group.tiers ?? []) {
        if (tier.id === tierId) return (tier.options ?? []).filter(o => optionIds.has(o.id)).length;
      }
    }
    return 0;
  }

  /** @internal Returns HTML with the query term wrapped in <mark class="search-match">. */
  _highlightMatch(label: string, query: string): string {
    if (!query) return label;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return label.replace(new RegExp(escaped, 'gi'), m => `<mark class="search-match">${m}</mark>`);
  }
}
