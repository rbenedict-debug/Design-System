import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FilterGroup,
  FilterSelection,
  EMPTY_FILTER_SELECTION,
} from '../filter/filter.types';

// ── Internal ──────────────────────────────────────────────────────────────────

interface _FilterChip {
  /** Bucket key — matches keys used in `FilterSelection.excludedBuckets`. */
  key: string;
  /** ID of the parent FilterGroup — emitted via (filterClick). */
  groupId: string;
  /** Card primary label — group label (flat/preset groups) or tier label. */
  primaryLabel: string;
  /** Card secondary text — comma-joined item labels or a range label. */
  secondaryText: string;
  isExcluded: boolean;
}

/**
 * Onflo Design System — Filter Bar
 *
 * Applied-filters strip rendered between the table toolbar and the table.
 * Renders one `ds-card-item` chip per active selection bucket.
 *
 * The host element should be hidden when no filters are active:
 * ```html
 * <ds-filter-bar [hidden]="filterCount === 0" … />
 * ```
 * The component does NOT self-hide — visibility is the consumer's responsibility.
 *
 * Clicking a chip's body emits `(filterClick)` with the `groupId` so the
 * consumer can re-open `ds-filter` scrolled to that group.
 * Clicking the × button emits `(selectionChange)` with that bucket removed.
 *
 * @example
 *   <ds-filter-bar
 *     [hidden]="filterCount === 0"
 *     [selection]="filterSelection"
 *     [groups]="filterGroups"
 *     (selectionChange)="filterSelection = $event"
 *     (filterClick)="filterOpen = true"
 *   />
 */
@Component({
  selector: 'ds-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsFilterBarComponent {
  // ── Public Inputs ──────────────────────────────────────────────────────────

  /** The committed selection to render as chips. */
  @Input() selection: FilterSelection = { ...EMPTY_FILTER_SELECTION };

  /** Filter group definitions — needed to resolve labels and icons for each chip. */
  @Input() groups: FilterGroup[] = [];

  // ── Public Outputs ─────────────────────────────────────────────────────────

  /**
   * Emits when the × button on a chip is clicked.
   * Payload is the current selection with that bucket fully removed.
   */
  @Output() selectionChange = new EventEmitter<FilterSelection>();

  /**
   * Emits the `groupId` when the body of a chip is clicked.
   * The consumer typically uses this to re-open ds-filter navigated to that group.
   */
  @Output() filterClick = new EventEmitter<string>();

  // ── Computed chips ─────────────────────────────────────────────────────────

  get chips(): _FilterChip[] {
    return this._buildChips();
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  onChipClick(chip: _FilterChip): void {
    this.filterClick.emit(chip.groupId);
  }

  onRemove(chip: _FilterChip, event: Event): void {
    event.stopPropagation();
    this.selectionChange.emit(this._removeChip(chip));
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private _buildChips(): _FilterChip[] {
    const chips: _FilterChip[] = [];
    const s = this.selection;
    const excluded = new Set(s.excludedBuckets);

    for (const group of this.groups) {
      if (group.type === 'date-preset') {
        const presets = (group.options ?? []).filter(o => s.datePresetIds.includes(o.id));
        if (presets.length) {
          chips.push({
            key: group.id,
            groupId: group.id,
            primaryLabel: group.label,
            secondaryText: presets.map(o => o.label).join(', '),
            isExcluded: excluded.has(group.id),
          });
        }
        const custom = s.dateRanges.find(r => r.tierId === null);
        if (custom) {
          chips.push({
            key: 'custom-date',
            groupId: group.id,
            primaryLabel: 'Custom Date',
            secondaryText: custom.label,
            isExcluded: excluded.has('custom-date'),
          });
        }
      } else if (group.options) {
        const items = group.options.filter(o => s.optionIds.includes(o.id));
        if (items.length) {
          chips.push({
            key: group.id,
            groupId: group.id,
            primaryLabel: group.label,
            secondaryText: items.map(o => o.label).join(', '),
            isExcluded: excluded.has(group.id),
          });
        }
      } else if (group.tiers) {
        for (const tier of group.tiers) {
          if (tier.type === 'date-range') {
            const r = s.dateRanges.find(dr => dr.tierId === tier.id);
            if (r) chips.push({ key: `dr-${tier.id}`, groupId: group.id, primaryLabel: tier.label, secondaryText: r.label, isExcluded: excluded.has(`dr-${tier.id}`) });
          } else if (tier.type === 'cost-range') {
            const r = s.costRanges.find(cr => cr.tierId === tier.id);
            if (r) chips.push({ key: `cr-${tier.id}`, groupId: group.id, primaryLabel: tier.label, secondaryText: r.label, isExcluded: excluded.has(`cr-${tier.id}`) });
          } else if (tier.type === 'numeric-range') {
            const r = s.numericRanges.find(nr => nr.tierId === tier.id);
            if (r) chips.push({ key: `nr-${tier.id}`, groupId: group.id, primaryLabel: tier.label, secondaryText: r.label, isExcluded: excluded.has(`nr-${tier.id}`) });
          } else {
            const items = (tier.options ?? []).filter(o => s.optionIds.includes(o.id));
            if (items.length) {
              chips.push({
                key: tier.id,
                groupId: group.id,
                primaryLabel: tier.label,
                secondaryText: items.map(o => o.label).join(', '),
                isExcluded: excluded.has(tier.id),
              });
            }
          }
        }
      }
    }

    return chips;
  }

  private _removeChip(chip: _FilterChip): FilterSelection {
    const s = this.selection;
    const key = chip.key;

    // Determine which option IDs belong to this chip so we can remove them
    const idsToRemove = new Set<string>();
    if (!key.startsWith('dr-') && !key.startsWith('cr-') && !key.startsWith('nr-') && key !== 'custom-date') {
      for (const group of this.groups) {
        if (group.id === key) {
          (group.options ?? []).forEach(o => idsToRemove.add(o.id));
          break;
        }
        for (const tier of group.tiers ?? []) {
          if (tier.id === key) {
            (tier.options ?? []).forEach(o => idsToRemove.add(o.id));
            break;
          }
        }
      }
    }

    return {
      optionIds:       s.optionIds.filter(id => !idsToRemove.has(id)),
      excludedBuckets: s.excludedBuckets.filter(k => k !== key),
      dateRanges: key === 'custom-date'
        ? s.dateRanges.filter(r => r.tierId !== null)
        : key.startsWith('dr-')
          ? s.dateRanges.filter(r => r.tierId !== key.slice(3))
          : s.dateRanges,
      costRanges:    key.startsWith('cr-') ? s.costRanges.filter(r => r.tierId !== key.slice(3)) : s.costRanges,
      numericRanges: key.startsWith('nr-') ? s.numericRanges.filter(r => r.tierId !== key.slice(3)) : s.numericRanges,
      datePresetIds: chip.key === chip.groupId
        ? s.datePresetIds.filter(id => {
            const group = this.groups.find(g => g.id === chip.groupId);
            return !(group?.options ?? []).some(o => o.id === id);
          })
        : s.datePresetIds,
    };
  }

  /** @internal trackBy for @for. */
  _trackByKey(_: number, chip: _FilterChip): string { return chip.key; }
}
