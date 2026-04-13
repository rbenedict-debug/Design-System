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
- **Resize drag**: `(mousedown)` on the right handle starts a drag that calls `params.api.setColumnWidth()` and emits `(widthChange)`; `AgHeaderParams` interface includes `column.getActualWidth()` and `api.setColumnWidth(key, newWidth)`
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
- **Background**: `--color-surface-subtle`; **border-top**: 1px `--color-border-secondary`
- **Layout**: left `__counts` region (row counts) and right `__aggregates` region (numeric aggregates); `justify-content: space-between`; padding `0 var(--spacing-lg)`
- **Stat pair**: `__stat` contains `__stat-label` (body-small, `--color-text-secondary`) + `__stat-value` (body-small bold, `--color-text-primary`)
- **Gap between pairs**: `--spacing-xl` (24px) within each region
- **Counts**: "Rows: X" and "Total Rows: X" — shown on left
- **Aggregates**: "Average: X", "Count: X", "Min: X", "Max: X", "Sum: X" — shown on right; region has `aria-live="polite"` so screen readers announce changes
- **AG Grid integration**: implements minimal status panel API — subscribe to `modelUpdated` and `filterChanged` events to keep row counts in sync; aggregate values driven by range selection (bound externally)
- **No Angular Material base** — custom component

---

### Table Row Groups Bar (`ds-table-row-groups-bar`)
- **Purpose**: Bar between toolbar and column header row; provides a drop target for row groups and a density toggle.
- **Height**: 56px — fixed
- **Background**: `--color-surface-page`; **border-bottom**: 1px `--color-border-subtle`
- **Layout**: left `__drop-zone` (flex: 1 0 0) + right `__density` (flex-shrink: 0); `gap: var(--spacing-lg)` between
- **Drop zone**: `drag_indicator` icon (sm, `--color-icon-subtle`) + `__placeholder` text ("Drag here to set row groups", `--color-text-placeholder`) + `__chips` (row group chip tags); placeholder hidden when chips are present
- **Chips**: use `ds-tag ds-tag--sm` with close button; emit `(removeGroup)` on close; automatically synced from AG Grid when `[api]` is bound
- **Density toggle**: `ds-density-toggle` class — two adjacent buttons in a shared border container; "Comfort" (56px row height) and "Compact" (40px row height); `is-selected` modifier on the active button; `aria-pressed` on each button; `role="group" aria-label="Row density"` on the wrapper
- **AG Grid integration**: bind `[api]` after grid ready to auto-sync row group columns; emits `(densityChange)` — consumer must call `api.resetRowHeights()` and update `rowHeight` grid option
- **No Angular Material base** — custom component

---

### Column Panel (`ds-column-panel`)
- **Purpose**: AG Grid custom tool panel for column configuration. Slides in from the right when the gear toolbar button is active.
- **Width**: 300px — fixed; **border-left**: 1px `--color-border-subtle`
- **Display**: `display: none` by default; shown via `[data-panel-open]` on the enclosing container OR via `display: flex` on the Angular component host
- **Sections (top to bottom)**:
  1. **Density toggle** — `ds-density-toggle` fills full panel width; same Comfort/Compact pattern as row groups bar
  2. **Column Visibility** — section header (`visibility` icon + "Column Visibility"); scrollable list of `__col-row` items
  3. Divider
  4. **Pivot Mode** — single row with label + `ds-toggle` switch on the right
  5. Divider
  6. **Row Groups** — section header (`drag_indicator` icon + "Row Groups"); `__add-btn` row below
  7. Divider
  8. **Values** — section header (`functions` icon + "Values"); `__add-btn` row below
- **Column row** (`__col-row`, 42px): `__col-checkbox` (42×42 touch target, icon-based checkbox) + `__col-drag` (drag_indicator sm, `--color-icon-subtle`) + `__col-name` (body-medium, fills remaining space); `--system` modifier suppresses interaction (opacity 0.4, no pointer events)
- **Checkbox icon**: `check_box_outline_blank` (unchecked, `--color-border-input`) / `check_box` filled (checked, `--color-surface-brand-bold`); `role="checkbox"` + `aria-checked`
- **Add button** (`__add-btn`): 42px height, full width, `add_circle_outline` icon + "Add Column" text, `--color-text-brand` / `--color-icon-brand`
- **Drag to reorder**: HTML5 drag API — `dragstart` stores index, `dragover` + `drop` calls `api.moveColumn()`
- **Pivot Mode toggle**: native `<input type="checkbox">` inside `ds-toggle`; calls `api.setPivotMode()`
- **AG Grid integration**: implements IToolPanelAngularComp — `agInit(params)` + `refresh()`; subscribes to `columnVisible`, `columnMoved`, `pivotModeChanged` events
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
