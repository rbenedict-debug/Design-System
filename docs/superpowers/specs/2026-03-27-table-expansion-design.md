# Table Expansion — Design Spec

**Date:** 2026-03-27
**Author:** Rebecca Benedict
**Scope:** `preview/index.html` only — no Angular component files in this session. Component formalization is a follow-up session.

---

## Overview

Expand the existing table sim in `preview/index.html` to demonstrate the full AG Grid reskin: horizontal/vertical scrolling with custom scrollbars, a right-pinned actions column, column group headers, a drag-in-progress indicator, row grouping by Status, a pinned totals bar, and a column tool panel that pushes the grid. All work is CSS/HTML only — no `.component.ts` changes.

---

## Section 1: Sim Layout & Scrolling

### Outer shell

`#table-sim` becomes a **flex row** (`display: flex; flex-direction: row`) at full width (`width: 100%`). The main content area (toolbar + scroll container + totals bar + paginator) is `flex: 1 1 0; min-width: 0`. The column tool panel is a flex sibling to the right.

### Scroll container

A new `#table-scroll` div wraps **only** the column group header row, the normal header row, and the data rows — not the toolbar, totals bar, or paginator.

```
#table-sim (flex row, full width)
  └── main content area (flex: 1 1 0)
        ├── .ds-table-toolbar
        ├── #table-scroll (overflow-x: auto; overflow-y: auto; max-height: ~400px)
        │     ├── column group header row
        │     ├── header row (sticky top: 0 inside scroll container)
        │     └── data rows (grouped, with expand/collapse states)
        ├── totals bar (outside scroll, always visible)
        └── .ds-ag-paginator
  └── column tool panel (260px, hidden by default)
```

The header row inside `#table-scroll` gets `position: sticky; top: 0; z-index: 3` so it stays visible as data rows scroll vertically. Same for the column group header row (`z-index: 4` to stay above the normal header).

### Scrollbar styling

Scoped to `#table-scroll`:

```css
/* Webkit */
#table-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
#table-scroll::-webkit-scrollbar-track { background: var(--color-surface-subtle); }
#table-scroll::-webkit-scrollbar-thumb {
  background: var(--color-surface-scroll);
  border-radius: var(--radius-full);
}
#table-scroll::-webkit-scrollbar-corner { background: var(--color-surface-subtle); }

/* Firefox */
#table-scroll { scrollbar-width: thin; scrollbar-color: var(--color-surface-scroll) var(--color-surface-subtle); }
```

---

## Section 2: Column Layout, Pinning & Drag Demo

### Column definitions

7 columns — wide enough total to require horizontal scrolling:

| # | Column | Width | Type |
|---|--------|-------|------|
| 1 | Checkbox | 56px | Sticky left |
| 2 | Customer | 200px | Sortable, draggable |
| 3 | Email | 220px | Normal scrolling |
| 4 | Department | 160px | Column group: "Organization" |
| 5 | Status | 140px | Column group: "Organization", filterable |
| 6 | Amount | 130px | Right-aligned, sortable |
| 7 | Actions | 100px | Sticky right, pinned |

**Total min-width:** ~1006px — forces horizontal scroll on typical preview viewports.

### CSS Grid

The inner grid uses:
```css
grid-template-columns: 56px 200px 220px 160px 140px 130px 100px;
min-width: 1006px; /* prevents grid from collapsing below content width */
```

### Pinned right column (Actions)

Every cell in column 7 — header and all row cells — gets:
```css
position: sticky;
right: 0;
z-index: 2;
background: var(--color-surface-subtle); /* header */
/* or */
background: var(--color-surface-page); /* row cells */
box-shadow: -2px 0 6px rgba(0,0,0,0.08); /* pin shadow separator */
```

The header cell uses `ds-table-header-cell` without resize handles (no resize interaction on pinned columns).
Each row cell uses `ds-table-row-cell` with two `ds-icon-button` elements (variant `icon`, size `sm`):
- `open_in_new` — view action
- `delete` — delete action (uses `--color-icon-default`; no red state in sim)

### Column group header row

A row above the normal header shows the "Organization" label spanning Department + Status columns. Structure:

```
[56px blank] [200px blank] [220px blank] [300px "Organization" group label] [130px blank] [100px blank]
```

The group label cell:
- `border-bottom: 1px solid var(--color-border-secondary)`
- `border-right: 1px solid var(--color-border-secondary)` (right edge of group)
- `border-left: 1px solid var(--color-border-secondary)` (left edge of group)
- Label typography: `--ref-typescale-label-medium-*`, bold, `--color-text-secondary`
- `background: var(--color-surface-subtle)`

### Drag demo

The Email column header gets a `ds-table-header-cell--dragging` modifier:
- `background: var(--overlay-hovered)`
- `outline: 2px solid var(--color-border-brand)`
- `outline-offset: -2px`
- `cursor: grabbing`

A drop zone indicator — a `4px wide` absolute-positioned div with `background: var(--color-border-brand)` — appears between the Status and Amount columns to show where Email would land.

---

## Section 3: Row Grouping, Totals Bar & Column Tool Panel

### Row grouping by Status

Two groups: "Active" (4 rows, expanded) and "Pending" (2 rows, collapsed).

**Group header row** — a `div` with `grid-column: 1 / -1` spanning all 7 columns, containing a `ds-table-row-cell`-styled flex row:
- A `keyboard_arrow_down` icon (expanded) or `keyboard_arrow_right` icon (collapsed) as a leading element inside the cell
- Group label: "Active (4)" or "Pending (2)" — `--color-text-primary`, bold (`--ref-typeface-weight-bold`)
- `background: var(--color-surface-subtle)`
- `border-bottom: 1px solid var(--color-border-subtle)`

**Child rows** — use existing `ds-table-row-cell__indent--tier1` (32px spacer) in the Customer column cell. Collapsed group rows are simply absent from the DOM in the static sim (Pending group shows only its header, no child rows).

**Checkbox column** in group header rows: blank (no checkbox, no content).

### Totals bar

Sits between `#table-scroll` and `.ds-ag-paginator`, outside the scroll container. Always visible.

Structure: a single row using the same 7-column grid as the main table:
- Column 1: blank
- Column 2: "Totals" — `--ref-typeface-weight-bold`, `--color-text-primary`
- Columns 3–5: blank
- Column 6: summed amount (e.g. "$47,830.00"), right-aligned
- Column 7: blank (sticky right, same background as header)

Styling via `ds-table-row-cell--totals` modifier:
```css
.ds-table-row-cell--totals {
  background: var(--color-surface-subtle);
  border-top: 2px solid var(--color-border-secondary);
}
```

Totals bar itself is `min-width: 1006px; overflow: hidden` so it aligns with the grid columns but does not independently scroll.

### Column tool panel

A `260px` flex sibling of the main content area inside `#table-sim`. Hidden by default; visible when `#table-sim` has `data-panel-open` attribute.

```css
#table-sim[data-panel-open] .ds-column-panel { display: flex; }
```

**Structure:**
```
.ds-column-panel (flex column, 260px, border-left: 1px solid --color-border-subtle)
  ├── .ds-column-panel__header (flex row, padding: --spacing-md --spacing-lg)
  │     ├── "Columns" label (label-large, bold, --color-text-primary)
  │     └── close ds-icon-button (variant: icon, size: sm, icon: close)
  └── .ds-column-panel__list (overflow-y: auto, flex: 1)
        └── .ds-column-panel__row × 7 (one per column)
              ├── ds-toggle (sm)
              └── column name label (body-medium, --color-text-primary)
```

**Toggle states:** Customer, Email, Department, Status, Amount → toggled ON. Checkbox and Actions → toggled OFF (system columns, not user-configurable).

**Panel open trigger:** The static sim hardcodes `data-panel-open` on `#table-sim` in the HTML so the panel is always visible for design review — no toggle interaction needed. The settings icon-button in the toolbar is hardcoded to `.is-selected` state to match. The CSS selector `#table-sim[data-panel-open] .ds-column-panel { display: flex; }` is included as a reference for how the production toggle would work.

**Width compression:** Because `data-panel-open` is present in the static sim, the main content area naturally compresses — the panel occupies its 260px of the flex row and the grid scrolls in the remaining space. No JS needed.

---

## New CSS Classes

| Class | File | Purpose |
|---|---|---|
| `ds-table-header-cell--dragging` | `_table-header-cell.scss` | Drag-in-progress visual state |
| `ds-table-row-cell--totals` | `_table-row-cell.scss` | Totals bar row styling |
| `.ds-column-panel` | new `_column-panel.scss` | Tool panel container |
| `.ds-column-panel__header` | new `_column-panel.scss` | Panel header row |
| `.ds-column-panel__list` | new `_column-panel.scss` | Scrollable column list |
| `.ds-column-panel__row` | new `_column-panel.scss` | Single column toggle row |

Scrollbar styles are scoped to `#table-scroll` in the preview `<style>` block (not a component file — webkit scrollbar APIs are not standardized enough for a component).

---

## What Is NOT In Scope

- Angular component files (`.component.ts`, `.component.html`, `.component.scss`)
- Filter panel
- Any JavaScript interactivity (expand/collapse toggle, drag behavior, panel open/close)
- The sim shows static snapshots of each state
