# Component Specs — Table Components

Table Header Cell, Table Row Cell, Table Status Bar, Table Row Groups Bar, AG Grid Paginator, Table Toolbar, Column Panel

> See preview-rules.md for the shared `#table` sim rule — individual component sections show isolated variants only; the shared table section shows the composed toolbar → row-groups-bar → header → rows → status-bar → paginator view.

---

### Full table composition order (top to bottom)

1. `ds-table-toolbar` (74px) — always present
2. `ds-table-row-groups-bar` (56px) — present when row grouping is available
3. AG Grid header row with `ds-table-header-cell` (56px)
4. AG Grid data rows with `ds-table-row-cell` (56px each)
5. Horizontal scrollbar (styled via `.ag-hscroll`)
6. `ds-table-status-bar` (56px) — present when aggregate values should be shown
7. `ds-ag-paginator` (56px)
8. `ds-column-panel` (300px, right side) — slides in/out via `[data-panel-open]` on container

---

### Table Header Cell (`ds-table-header-cell`)
- **Primitive** — internal component used inside `component/table-header-row`. AG Grid custom header renderer.
- **Height: 56px — fixed**
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Properties**: `align` (left/right), `sorting`, `filtering`, `menuControl`, `checkbox`, `pipeLeft`, `pipeRight`
- **Label typography**: `--ref-typescale-label-medium-*`, weight-prominent (bold), truncated with ellipsis
- **Resize bar**: 2px × 14px, `--color-border-primary`, inside 16px handle container; `pipeRight = true` by default, `pipeLeft = false` by default; `--active` modifier on the trailing handle enables `cursor: col-resize` and drag behavior
- **Resize drag**: `(mousedown)` on the right handle starts a drag. During drag: `setColumnWidth(colId, newWidth, false)` — `finished: false` keeps the resize in-progress so AG Grid flex columns redistribute in real-time. On `mouseup`: `setColumnWidth(colId, finalWidth, true)` — `finished: true` signals AG Grid to finalize state and fire `columnResized`. `AgHeaderParams` interface: `column.getActualWidth()`, `api.setColumnWidth(key, newWidth, finished?)`
- **Flex column pattern**: set `flex: 1` (no explicit `width`) on columns that should fill remaining space. Fixed columns keep an explicit `width`. When the user drags to resize a fixed column, AG Grid automatically redistributes the remaining width across flex columns. No extra code required — the `finished` flag protocol above is what enables real-time reflow during drag.
- **Icon buttons** (sort / filter / menu): use `<ds-icon-button size="sm" variant="icon">` — 32×32px ghost
- **Sort button**: `arrow_upward_alt` icon — only shown when column IS sorted. Sort state class on the icon span: `__sort-icon--asc` (brand), `__sort-icon--desc` (brand + rotate 180°). **When unsorted (`sortDirection === null`), do NOT render the sort button at all — no arrow shown.**
- **Filter button**: `<span class="ds-icon ds-icon--filled">filter_alt</span>` — always filled icon; default ghost colour (`--color-icon-default`)
- **Menu button**: icon uses `__menu-icon` class — `--color-icon-default` (grey ghost, turns brand on hover via ghost button styles); passes wrapper `div#menuBtnEl` to `onMenuClick()` as AG Grid positioning anchor
- **Checkbox** (select-all): `check_box_outline_blank` | `check_box` (filled, brand) | `indeterminate_check_box` (filled, brand)
- **Checkbox-only column**: auto-detected when `checkbox === true && !label` — applies `--checkbox-only` modifier (56px fixed width, both resize handles hidden); use with no `label` input
- **Right align**: `ds-table-header-cell__content--right` applies `justify-content: flex-end`
- **AG Grid**: implements `IHeaderAngularComp` — receives `agInit(params)`, `refresh(params)`, cleans up `sortChanged` listener and resize drag listeners in `ngOnDestroy`
- **No Angular Material base** — custom component

---

### Table Row Cell (`ds-table-row-cell`)
- **Primitive** — internal component used inside `component/table-row`. AG Grid custom cell renderer.
- **Height: 56px — fixed**
- **Padding**: `16px` horizontal (not resize handles — different from header cell)
- **Border-bottom**: 1px `--color-border-subtle` (lighter than header's `--color-border-secondary`)
- **States**: Default (transparent) | Hover (`.is-hovered` → `--overlay-hovered`) | Focus (`.is-focused` → `--overlay-focused`)
- **Properties**: `align` (left/right), `cellData`, `gripper`, `checkbox`, `tier1Indent` (32px), `tier2Indent` (64px)
- **Cell data typography**: `--ref-typescale-body-medium-*`, regular weight (400), 14px, 20px line-height, truncated with ellipsis
- **Left align**: `__data` has `flex: 1 0 0` (fills space). **Right align**: `__data--right` + `__content--right` (justify-end + shrink)
- **Gripper**: 32×32px ghost button, `drag_indicator` icon, cursor `grab` / `grabbing`
- **Checkbox**: same icon pattern as header checkbox — `check_box_outline_blank` / `check_box` / `indeterminate_check_box`
- **Tier indents**: `__indent--tier1` = 32px spacer, `__indent--tier2` = 64px spacer (for tree/grouped row hierarchy)
- **AG Grid**: implements `ICellRendererAngularComp` — `agInit(params)`, `refresh(params)`, syncs `checked` via `rowSelected` event
- **No Angular Material base** — custom component

---

### AG Grid Paginator (`ds-ag-paginator`)
- **Purpose**: Custom pagination panel that replaces AG Grid's built-in paginator. Use with `suppressPaginationPanel: true`.
- **Height**: 56px — fixed (matches AG Grid row / header height)
- **Background**: `--color-surface-subtle`; padding: `0 var(--spacing-lg)`; content: right-aligned
- **Integration**: Register as a status bar panel OR use standalone below the grid. Exposes `[api]` input (`AgPaginationApi`) and calls `agInit(params)` when used as a status panel.
- **"Items per page" selector**: `ds-select` component — 96px wide (constrained via `ds-ag-paginator__size-select` class), no label, `[options]` bound to `pageSizeSelectOptions` (number array mapped to `DsSelectOption[]`), `(valueChange)` calls `paginationSetPageSize`. The "Items per page:" span is `aria-hidden="true"` (visual label only). Always use `ds-select` — never a raw native `<select>`.
- **Range text**: `"1 - 50 of 200"` format (hyphen with spaces); Body Small typography (`--ref-typescale-body-small-*`); `--color-text-primary`; `aria-live="polite"`
- **Nav buttons**: 4 ghost buttons — `first_page`, `keyboard_arrow_left`, `keyboard_arrow_right`, `last_page`; 42×42px; `--radius-sm` (not `--radius-full`); disabled when at first/last page
- **Layout**: outer `gap: var(--spacing-lg)` (16px) between counter and pagination groups; inner groups `gap: var(--spacing-xs)` (4px)
- **ADA**: All nav buttons have `aria-label`; range label is `aria-live="polite"`
- **No Angular Material base** — custom component

---

### Table Status Bar (`ds-table-status-bar`)
- **Purpose**: Pinned aggregate row displayed between the data rows and the paginator.
- **Height**: 56px — fixed
- **Background**: `--color-surface-subtle`; **border-top**: 1px `--color-border-subtle`
- **Layout**: left `__counts` region (row counts) and right `__aggregates` region (numeric aggregates); `justify-content: space-between`; padding `0 var(--spacing-lg)`
- **Stat pair**: `__stat` contains `__stat-label` (label-medium regular, `--color-text-primary`) + `__stat-value` (label-medium weight-prominent, `--color-text-primary`)
- **Gap between pairs**: `--spacing-xl` (24px) within each region
- **Counts**: "Rows: X" and "Total Rows: X" — shown on left
- **Aggregates**: "Average: X", "Count: X", "Min: X", "Max: X", "Sum: X" — shown on right; region has `aria-live="polite"` so screen readers announce changes
- **AG Grid integration**: implements minimal status panel API — subscribe to `modelUpdated` and `filterChanged` events to keep row counts in sync; aggregate values driven by range selection (bound externally)
- **No Angular Material base** — custom component

---

### Table Row Groups Bar (`ds-table-row-groups-bar`)
- **Purpose**: Bar between toolbar and column header row; provides a drop target for row groups and shows active groups as removable chips.
- **Height**: 56px — fixed
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Layout**: single `__drop-zone` fills full width
- **Drop zone**: `drag_indicator` icon (sm, `--color-icon-subtle`) + `__placeholder` text ("Drag here to set row groups", label-medium weight-prominent, `--color-text-primary`) + `__chips` (row group chip tags); placeholder hidden when chips are present
- **Chips**: use `ds-tag ds-tag--sm` with close button; emit `(removeGroup)` on close; automatically synced from AG Grid when `[api]` is bound
- **AG Grid integration**: bind `[api]` after grid ready to auto-sync row group columns
- **Visibility**: auto-hides via `[hidden]` host binding when `rowGroups.length === 0`; consumer controls when to render the element
- **No density toggle** — density belongs in `ds-column-panel` only
- **No Angular Material base** — custom component

---

### Table Group Row Cell (`ds-table-group-row-cell`)
- **Purpose**: AG Grid custom renderer for full-width group rows. Set as `groupRowRenderer` in gridOptions when using `groupDisplayType: 'groupRows'`. **Requires AG Grid Enterprise license** — `groupRows` is an Enterprise-only feature.
- **`enableRowGroup: true`** must be set on any colDef that consumers can add to a row group (via `ds-column-panel` or `ds-table-row-groups-bar`). Without it, those columns will not group correctly when added programmatically.
- **Height**: fills AG Grid row height (controlled by `rowHeight` / `groupRowHeight` grid options); `min-height: 40px` ensures compact mode renders correctly
- **Background**: `--color-surface-subtle`; **border-bottom**: 1px `--color-border-secondary`
- **Layout (left to right)**: indent spacer + toggle button + label ("FieldName: Value") + count "(N)" + flex spacer + aggregates region
- **Indent spacer**: `24px × level` — 4 levels supported (0 = no indent, 1 = 24px, 2 = 48px, 3 = 72px); width set via inline style from `params.node.level`
- **Toggle button**: 32×32px, `border-radius: var(--radius-sm)`, transparent background, hover/active overlay via `::after`; focus ring keyboard-only via `:focus-visible`; `aria-expanded` reflects expansion state; `aria-label` = "[Expand/Collapse] FieldName: Value"
- **Chevron**: `chevron_right` icon (20px), `--color-icon-default`; rotates 90° with 150ms ease when expanded; expanded state sets `--color-icon-brand`
- **Field label** (`__field`): label-medium regular, `--color-text-secondary`; e.g. "Department: "
- **Group value** (`__value`): label-medium weight-prominent, `--color-text-primary`; truncated with ellipsis
- **Count** (`__count`): label-medium regular, `--color-text-secondary`; e.g. "(4)"
- **Aggregates region** (`__aggregates`): right-aligned; `gap: var(--spacing-xl)` between stat pairs; each `__stat` has `__stat-label` (label-medium regular, `--color-text-secondary`) + `__stat-value` (label-medium weight-prominent, `--color-text-primary`); populated from `params.node.aggData` when `aggFunc` is set on column definitions; `aria-hidden="true"` (announced via status bar)
- **Column header lookup**: uses `params.api.getColumn(field)?.getColDef()?.headerName` for display label; falls back to capitalised field name
- **AG Grid integration**: duck-types `ICellRendererAngularComp` (no hard ag-grid import) — `agInit(params)`, `refresh(params)`, listens to `expandedChanged` node event; cleans up in `ngOnDestroy`; host element `display: block; width: 100%; height: 100%` to fill full-width AG Grid cell
- **No Angular Material base** — custom component

### Table Group Expansion Store (`DsTableGroupExpansionStore`)
- **Purpose**: Plain TypeScript class (no Angular DI) for persisting row group expand/collapse state to `localStorage` across page navigations.
- **Constructor**: `new DsTableGroupExpansionStore(storageKey: string)` — `storageKey` must be unique per grid instance
- **`isGroupOpenByDefault(params)`**: pass as `isGroupOpenByDefault` in AG Grid gridOptions; returns `true` for previously-opened groups; default is collapsed
- **`onRowGroupOpened(event)`**: pass as `onRowGroupOpened` in AG Grid gridOptions; stores open state, removes closed state
- **`clear()`**: removes all stored expansion state for this grid
- **Key format**: full ancestor path joined with `→` (e.g. `country:USA→department:Engineering`) — survives column reordering, is stable across navigations
- **Storage errors** (quota exceeded): silently ignored — state loss on quota overflow is acceptable

---

### Column Panel (`ds-column-panel`)
- **Purpose**: AG Grid custom tool panel for column configuration. Slides in from the right when the gear toolbar button is active.
- **Width**: 300px — fixed; **background**: `--color-surface-subtle`; **border-left**: 1px `--color-border-secondary`
- **Display**: `display: none` by default; shown via `[data-panel-open]` on the enclosing container OR via `display: flex` on the Angular component host
- **Sections (top to bottom)**:
  1. **Density toggle** — `ds-density-toggle` fills full panel width; Comfort/Compact; `is-selected` + `aria-pressed` on each button
  2. **Column Visibility** — collapsible section header (`<button aria-expanded>` + `visibility` icon + "Column Visibility"); col-list shown/hidden by adjacent-sibling CSS rule
  3. Divider
  4. **Pivot Mode** — single row with label + `ds-toggle` switch on the right
  5. Divider
  6. **Row Groups** — section header (`drag_indicator` icon + "Row Groups"); active group chips (`__group-chips`, `ds-tag ds-tag--sm`); `__add-btn` with `aria-expanded`; inline `ds-column-panel__picker` menu
  7. Divider
  8. **Values** — section header (`functions` icon + "Values"); active value chips; `__add-btn` with `aria-expanded`; inline picker menu
- **Column row** (`__col-row`, 42px): `__col-checkbox` (42×42 touch target, icon-based checkbox) + `__col-drag` (drag_indicator sm, `--color-icon-subtle`) + `__col-name` (body-medium, fills remaining space); `--system` modifier suppresses interaction (opacity 0.4, no pointer events)
- **Checkbox icon**: `check_box_outline_blank` (unchecked, `--color-border-input`) / `check_box` filled (checked, `--color-surface-brand-bold`); `role="checkbox"` + `aria-checked`
- **Active group chips** (`__group-chips`): flex-wrap container of `ds-tag ds-tag--sm` chips with remove buttons; hidden when empty; remove button calls `removeRowGroupColumn(colId)` / `removeValueColumn(colId)`
- **Add button** (`__add-btn`): 42px height, full width, `add_circle_outline` icon + "Add Column" text, `--color-text-brand` / `--color-icon-brand`; `aria-expanded` reflects picker state
- **Inline picker menu** (`ds-column-panel__picker`): `ds-menu` class + `__picker` modifier; renders in normal document flow (no absolute positioning — panel has `overflow-y: auto`); lists non-system, non-active columns as `ds-menu__item` buttons; outside-click closes via `@HostListener('document:click')` with `event.stopPropagation()` on button and menu clicks; empty state shows "All columns grouped"
- **Drag to reorder**: HTML5 drag API — `dragstart` stores index, `dragover` + `drop` calls `api.moveColumn()`
- **Pivot Mode toggle**: native `<input type="checkbox">` inside `ds-toggle`; calls `api.setPivotMode()`
- **AG Grid integration**: implements IToolPanelAngularComp — `agInit(params)` + `refresh()`; subscribes to `columnVisible`, `columnMoved`, `pivotModeChanged`, `columnRowGroupChanged`, `columnValueChanged` events
- **No Angular Material base** — custom component

---

### Table Toolbar (`ds-table-toolbar`)
- **Purpose**: Toolbar above an AG Grid table — holds search, filter, settings, and action controls.
- **Height**: 74px — fixed
- **Layout**: two `flex: 1 0 0` panels side-by-side with `gap: var(--spacing-xl)` (24px); padding `0 var(--spacing-lg)` (16px)
- **Left panel** (`__left`): action buttons slot — `flex: 1 0 0`, `gap: var(--spacing-sm)`. Omit the `__left` div (or `[showActions]="false"`) for search-only mode; right panel fills full width.
- **Right panel** (`__right`): `flex: 1 0 0`, `gap: var(--spacing-sm)`. Contains: search (flex-fills remaining space), optional `[toolbar-extra]` content, filter toggle, settings toggle, optional download / `[toolbar-trailing]` content.
- **Icon buttons**: The Angular component uses `ds-icon-button-toggle` (variant="outlined") for filter and settings, and `ds-icon-button` (variant="outlined") for download. The `__btn` CSS class is preserved for the HTML class API and projected `[toolbar-trailing]` slot content only — it mirrors `ds-icon-button--outlined` behavior.
- **Content projection slots**:
  - `[toolbar-actions]` — left-side action buttons
  - `[toolbar-extra]` — right-side extras between search and fixed icon buttons (filter/date chips, dropdowns)
  - `[toolbar-trailing]` — right-side trailing buttons after settings (replaces or supplements download)
- **Inputs**: `showActions` (bool, default true), `searchPlaceholder`, `searchAriaLabel`, `searchValue`, `filterActive`, `settingsActive`, `showDownload` (bool, default true)
- **Outputs**: `searchValueChange`, `search`, `filterActiveChange`, `settingsActiveChange`, `downloadClick`
- **ADA**: Filter/settings buttons expose `aria-pressed`; all icon buttons have `aria-label`
- **No Angular Material base** — custom component
