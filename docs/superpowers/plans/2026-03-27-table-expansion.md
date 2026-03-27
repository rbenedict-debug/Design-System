# Table Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the `#table` sim in `preview/index.html` to demonstrate scrollbars, a right-pinned actions column, column group headers, column drag indicator, row grouping by Status, a pinned totals bar, and a reskinned column tool panel — CSS/HTML only, no Angular component files.

**Architecture:** The existing 4-column static table sim is replaced with a 7-column scrollable layout. A new `#table-scroll` div introduces both `overflow-x` and `overflow-y` scrolling with custom styled scrollbars. The rightmost (Actions) column is sticky via `position: sticky; right: 0`. The column tool panel is a flex sibling of the main content area — when `data-panel-open` is present on `#table-sim`, the panel is visible and compresses the scroll area. SCSS modifiers and a new component SCSS file are added as source-of-truth alongside the inlined preview CSS.

**Tech Stack:** SCSS (BEM), HTML5, CSS custom properties (design tokens), no JavaScript

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| Modify | `components/table/_table-header-cell.scss` | Add `--dragging` modifier |
| Modify | `components/table/_table-row-cell.scss` | Add `--totals` modifier |
| Create | `components/column-panel/_column-panel.scss` | Column tool panel source styles |
| Modify | `components/index.scss` | Wire in `column-panel` |
| Modify | `preview/index.html` (style block) | Add sim-scoped CSS (scrollbars, pinned, groups, etc.) |
| Modify | `preview/index.html` (`#table` section) | Replace entire table sim HTML |

---

## Task 1: Add `--dragging` modifier to `_table-header-cell.scss`

**Files:**
- Modify: `components/table/_table-header-cell.scss`

- [ ] **Step 1: Add the modifier after the `--checkbox-only` block (after line 31)**

Open `components/table/_table-header-cell.scss`. After the closing `}` of `&--checkbox-only` (ends at line 31) and before the `// ── Resize handles ──` comment (line 33), insert:

```scss
  // ── Drag-in-progress state (column being dragged) ─────────────
  &--dragging {
    background: var(--overlay-hovered);
    outline: 2px solid var(--color-border-brand);
    outline-offset: -2px;
    cursor: grabbing;
  }
```

- [ ] **Step 2: Verify the file compiles without errors**

```bash
cd /Users/rebeccabenedict/Developer/Design-System && npx sass components/table/_table-header-cell.scss --no-source-map --style=compressed 2>&1 | head -5
```
Expected: no error output (empty or just the compiled CSS).

- [ ] **Step 3: Commit**

```bash
git add components/table/_table-header-cell.scss
git commit -m "feat(table): add --dragging modifier to table-header-cell"
```

---

## Task 2: Add `--totals` modifier to `_table-row-cell.scss`

**Files:**
- Modify: `components/table/_table-row-cell.scss`

- [ ] **Step 1: Add the modifier after the `--checkbox-only` block (after line 31)**

Open `components/table/_table-row-cell.scss`. After the closing `}` of `&--checkbox-only` (ends at line 31) and before the `// ── Interactive states ──` comment (line 33), insert:

```scss
  // ── Totals bar row — pinned above paginator, subtle bg, no bottom border ──
  &--totals {
    background: var(--color-surface-subtle);
    border-bottom: none;
  }
```

- [ ] **Step 2: Verify the file compiles**

```bash
cd /Users/rebeccabenedict/Developer/Design-System && npx sass components/table/_table-row-cell.scss --no-source-map --style=compressed 2>&1 | head -5
```
Expected: no error output.

- [ ] **Step 3: Commit**

```bash
git add components/table/_table-row-cell.scss
git commit -m "feat(table): add --totals modifier to table-row-cell"
```

---

## Task 3: Create `_column-panel.scss` and wire into `index.scss`

**Files:**
- Create: `components/column-panel/_column-panel.scss`
- Modify: `components/index.scss`

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p /Users/rebeccabenedict/Developer/Design-System/components/column-panel
```

- [ ] **Step 2: Write `_column-panel.scss`**

Create `components/column-panel/_column-panel.scss` with this exact content:

```scss
// Onflo Design System — Column Tool Panel
// AG Grid reskinned column visibility panel
// Shown as a flex sibling of the main grid when data-panel-open is present on #table-sim

.ds-column-panel {
  display: none; // revealed by #table-sim[data-panel-open]
  flex-direction: column;
  width: 260px;
  flex-shrink: 0;
  border-left: 1px solid var(--color-border-subtle);
  background: var(--color-surface-page);

  // ── Header: "Columns" title + close button ─────────────────────
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--color-border-subtle);
    flex-shrink: 0;
  }

  &__title {
    font-family: var(--ref-typescale-label-large-font);
    font-size: var(--ref-typescale-label-large-size);
    font-weight: var(--ref-typescale-label-large-weight-prominent);
    line-height: var(--ref-typescale-label-large-line-height);
    color: var(--color-text-primary);
  }

  // ── Scrollable column list ──────────────────────────────────────
  &__list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1 0 0;
  }

  // ── Single toggle row ───────────────────────────────────────────
  &__row {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-lg);
    min-height: 44px;

    // System columns (Checkbox, Actions) are non-configurable
    &--system {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  &__name {
    font-family: var(--ref-typescale-body-medium-font);
    font-size: var(--ref-typescale-body-medium-size);
    font-weight: var(--ref-typescale-body-medium-weight);
    line-height: var(--ref-typescale-body-medium-line-height);
    color: var(--color-text-primary);
  }
}

// Production toggle mechanism (reference for Angular integration)
#table-sim[data-panel-open] .ds-column-panel {
  display: flex;
}
```

- [ ] **Step 3: Add import to `components/index.scss`**

In `components/index.scss`, after the `@use 'table-toolbar/table-toolbar';` line (line 39), add:

```scss
@use 'column-panel/column-panel';
```

- [ ] **Step 4: Verify both files compile**

```bash
cd /Users/rebeccabenedict/Developer/Design-System && npx sass components/column-panel/_column-panel.scss --no-source-map --style=compressed 2>&1 | head -5
```
Expected: no error output.

- [ ] **Step 5: Commit**

```bash
git add components/column-panel/_column-panel.scss components/index.scss
git commit -m "feat: add ds-column-panel component (AG Grid column tool panel)"
```

---

## Task 4: Add sim CSS to `preview/index.html` style block

**Files:**
- Modify: `preview/index.html` (second `<style>` block — the component CSS block, not the tokens sentinel block)

- [ ] **Step 1: Locate the insertion point**

In `preview/index.html`, find the second `<style>` block (the component CSS block, after `<!-- ONFLO-TOKENS:END -->`). Search for `.ds-table-row-cell {` — the row cell CSS ends around that area. You will add the new CSS **after** the existing `.ds-table-row-cell` block and before the next component's CSS.

- [ ] **Step 2: Insert the following CSS block at that location**

```css
/* ═══════════════════════════════════════════════════════════════
   TABLE SIM — EXTENDED STYLES
   Scroll container, pinned column, group header, drag demo,
   row grouping, totals bar, column tool panel
   ═══════════════════════════════════════════════════════════════ */

/* ── Scroll container ──────────────────────────────────────── */
#table-scroll {
  overflow-x: auto;
  overflow-y: auto;
  max-height: 400px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-surface-scroll) var(--color-surface-subtle);
}
#table-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
#table-scroll::-webkit-scrollbar-track { background: var(--color-surface-subtle); }
#table-scroll::-webkit-scrollbar-thumb {
  background: var(--color-surface-scroll);
  border-radius: var(--radius-full);
}
#table-scroll::-webkit-scrollbar-corner { background: var(--color-surface-subtle); }

/* ── Pinned right column ───────────────────────────────────── */
/* Applied to both header cells and row cells in the Actions column */
.ds-table-pinned-right {
  position: sticky;
  right: 0;
  z-index: 2;
  background: var(--color-surface-subtle);
  box-shadow: -2px 0 6px rgba(0, 0, 0, 0.08);
}
/* Row cells default to page white; selection state renders over it */
.ds-table-row-cell.ds-table-pinned-right {
  background: var(--color-surface-page);
}
.ds-table-row-cell.ds-table-pinned-right.is-selected {
  background: var(--overlay-selected);
}

/* ── Column group header row ───────────────────────────────── */
.ds-table-col-group-header {
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-lg);
  height: 28px;
  border-left: 1px solid var(--color-border-secondary);
  border-right: 1px solid var(--color-border-secondary);
}
.ds-table-col-group-header__label {
  font-family: var(--ref-typescale-label-medium-font);
  font-size: var(--ref-typescale-label-medium-size);
  font-weight: var(--ref-typescale-label-medium-weight-prominent);
  line-height: var(--ref-typescale-label-medium-line-height);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

/* ── Column drag state (inline mirror of SCSS modifier) ──── */
.ds-table-header-cell--dragging {
  background: var(--overlay-hovered);
  outline: 2px solid var(--color-border-brand);
  outline-offset: -2px;
  cursor: grabbing;
}

/* ── Drop zone indicator ───────────────────────────────────── */
.ds-table-drop-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--color-border-brand);
  z-index: 10;
  border-radius: 2px;
  pointer-events: none;
}

/* ── Row group header rows ────────────────────────────────── */
.ds-table-group-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-md);
  height: 40px;
  background: var(--color-surface-subtle);
  border-bottom: 1px solid var(--color-border-subtle);
  cursor: default;
}
.ds-table-group-row__label {
  font-family: var(--ref-typescale-body-medium-font);
  font-size: var(--ref-typescale-body-medium-size);
  font-weight: var(--ref-typeface-weight-bold);
  line-height: var(--ref-typescale-body-medium-line-height);
  color: var(--color-text-primary);
}
.ds-table-group-row__count {
  font-weight: var(--ref-typescale-body-medium-weight);
  color: var(--color-text-secondary);
}

/* ── Totals bar ────────────────────────────────────────────── */
/* Inline mirror of --totals SCSS modifier */
.ds-table-row-cell--totals {
  background: var(--color-surface-subtle);
  border-bottom: none;
}
.ds-table-totals-bar {
  overflow: hidden;
  border-top: 2px solid var(--color-border-secondary);
}

/* ── Column tool panel (inline mirror of _column-panel.scss) ─ */
.ds-column-panel {
  display: none;
  flex-direction: column;
  width: 260px;
  flex-shrink: 0;
  border-left: 1px solid var(--color-border-subtle);
  background: var(--color-surface-page);
}
#table-sim[data-panel-open] .ds-column-panel { display: flex; }
.ds-column-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) var(--spacing-lg);
  border-bottom: 1px solid var(--color-border-subtle);
  flex-shrink: 0;
}
.ds-column-panel__title {
  font-family: var(--ref-typescale-label-large-font);
  font-size: var(--ref-typescale-label-large-size);
  font-weight: var(--ref-typescale-label-large-weight-prominent);
  line-height: var(--ref-typescale-label-large-line-height);
  color: var(--color-text-primary);
}
.ds-column-panel__list {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1 0 0;
}
.ds-column-panel__row {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-lg);
  min-height: 44px;
}
.ds-column-panel__row--system {
  opacity: 0.5;
  pointer-events: none;
}
.ds-column-panel__name {
  font-family: var(--ref-typescale-body-medium-font);
  font-size: var(--ref-typescale-body-medium-size);
  font-weight: var(--ref-typescale-body-medium-weight);
  line-height: var(--ref-typescale-body-medium-line-height);
  color: var(--color-text-primary);
}
```

- [ ] **Step 3: Save the file and open `preview/index.html` in a browser**

Confirm no visible errors on the page. The existing components outside of `#table` should look unchanged.

- [ ] **Step 4: Commit**

```bash
git add preview/index.html
git commit -m "feat(preview): add table sim extended CSS (scrollbars, pinned col, groups, panel)"
```

---

## Task 5: Replace the `#table` section HTML in `preview/index.html`

**Files:**
- Modify: `preview/index.html` lines 4469–4642 (the entire `<section id="table">` block)

- [ ] **Step 1: Replace lines 4469–4642 with the full block below**

Delete from `<!-- ── TABLE — FULL SIMULATION ──` through `</section>` (the closing tag at line 4642) and replace with:

```html
      <!-- ── TABLE — FULL SIMULATION ─────────────────────────────────────────── -->
      <section class="section" id="table">
        <h2 class="section-title">Table</h2>
        <p class="section-desc">Full AG Grid reskin — toolbar, column group headers, sticky header, scrollable data rows with custom scrollbars, right-pinned actions column, row grouping by Status, totals bar, and column tool panel. The Email column header shows the drag-in-progress state with a drop zone indicator between Status and Amount.</p>

        <div class="demo-row" style="flex-direction: column; align-items: stretch; gap: 0;">
          <div id="table-sim" data-panel-open style="border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); overflow: hidden; display: flex; width: 100%;">

            <!-- ── Main content area ──────────────────────────────────────────── -->
            <div style="flex: 1 1 0; min-width: 0; display: flex; flex-direction: column;">

              <!-- Toolbar — settings is-selected (panel is open) -->
              <div class="ds-table-toolbar">
                <div class="ds-table-toolbar__left">
                  <button class="ds-button ds-button--filled ds-button--leading-icon" type="button">
                    <span class="ds-button__icon ds-button__icon--leading"><span class="ds-icon">add</span></span>
                    New Item
                  </button>
                  <button class="ds-button ds-button--outlined ds-button--trailing-icon" type="button">
                    Bulk Actions
                    <span class="ds-button__icon ds-button__icon--trailing"><span class="ds-icon">arrow_drop_down</span></span>
                  </button>
                  <button class="ds-button ds-button--destructive ds-button--leading-icon" type="button">
                    <span class="ds-button__icon ds-button__icon--leading"><span class="ds-icon">delete</span></span>
                    Delete
                  </button>
                </div>
                <div class="ds-table-toolbar__right">
                  <div class="ds-search" role="search">
                    <div class="ds-search__field">
                      <span class="ds-search__search-btn" aria-hidden="true"><span class="ds-icon ds-icon--sm">search</span></span>
                      <input class="ds-search__control" type="search" placeholder="Search" aria-label="Search" />
                    </div>
                  </div>
                  <button class="ds-icon-button ds-icon-button-toggle ds-icon-button--outlined" type="button" aria-pressed="false" aria-label="Toggle filters" onclick="togglePressed(this)">
                    <span class="ds-icon ds-icon--filled">filter_alt</span>
                  </button>
                  <button class="ds-icon-button ds-icon-button-toggle ds-icon-button--outlined is-selected" type="button" aria-pressed="true" aria-label="Column settings" onclick="togglePressed(this)">
                    <span class="ds-icon ds-icon--filled">settings</span>
                  </button>
                  <button class="ds-icon-button ds-icon-button--outlined" type="button" aria-label="Download">
                    <span class="ds-icon">download</span>
                  </button>
                </div>
              </div>

              <!-- Scroll container: group header + header row + data rows -->
              <div id="table-scroll">
                <div style="min-width: 1006px; position: relative;">

                  <!-- Column group header row (sticky top: 0, z-index: 4) -->
                  <!-- Grid: 56px 200px 220px [300px=dept+status] 130px 100px -->
                  <div style="display: grid; grid-template-columns: 56px 200px 220px 300px 130px 100px; position: sticky; top: 0; z-index: 4; background: var(--color-surface-subtle); border-bottom: 1px solid var(--color-border-secondary);">
                    <div style="height: 28px;"></div><!-- checkbox: blank -->
                    <div style="height: 28px;"></div><!-- customer: blank -->
                    <div style="height: 28px;"></div><!-- email: blank -->
                    <div class="ds-table-col-group-header"><!-- Organization group -->
                      <span class="ds-table-col-group-header__label">Organization</span>
                    </div>
                    <div style="height: 28px;"></div><!-- amount: blank -->
                    <div class="ds-table-pinned-right" style="height: 28px;"></div><!-- actions: blank, pinned -->
                  </div>

                  <!-- Normal header row (sticky top: 28px, z-index: 3) -->
                  <!-- Grid: 56px 200px 220px 160px 140px 130px 100px = 1006px -->
                  <div style="display: grid; grid-template-columns: 56px 200px 220px 160px 140px 130px 100px; position: sticky; top: 28px; z-index: 3;">

                    <!-- Col 1: Checkbox header -->
                    <div class="ds-table-header-cell ds-table-header-cell--checkbox-only">
                      <div class="ds-table-header-cell__content" style="justify-content: center;">
                        <label class="ds-checkbox" aria-label="Select all rows">
                          <input type="checkbox" class="ds-checkbox__control" />
                          <span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span>
                        </label>
                      </div>
                    </div>

                    <!-- Col 2: Customer (sorted ascending) -->
                    <div class="ds-table-header-cell" data-col="customer">
                      <div class="ds-table-header-cell__resize-handle"></div>
                      <div class="ds-table-header-cell__content">
                        <span class="ds-table-header-cell__label">Customer</span>
                        <button type="button" class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" aria-label="Sorted ascending">
                          <span class="ds-icon ds-table-header-cell__sort-icon--asc">arrow_upward_alt</span>
                        </button>
                      </div>
                      <div class="ds-table-header-cell__actions">
                        <button type="button" class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" aria-label="Filter Customer">
                          <span class="ds-icon ds-icon--filled">filter_alt</span>
                        </button>
                        <div class="ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing ds-table-header-cell__resize-handle--active" data-resize-col="customer">
                          <span class="ds-table-header-cell__resize-bar"></span>
                        </div>
                      </div>
                    </div>

                    <!-- Col 3: Email (drag-in-progress state) -->
                    <div class="ds-table-header-cell ds-table-header-cell--dragging" data-col="email">
                      <div class="ds-table-header-cell__resize-handle"></div>
                      <div class="ds-table-header-cell__content">
                        <span class="ds-icon ds-icon--sm" style="color: var(--color-icon-subtle); flex-shrink: 0;">drag_indicator</span>
                        <span class="ds-table-header-cell__label">Email</span>
                      </div>
                      <div class="ds-table-header-cell__actions">
                        <div class="ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing" data-resize-col="email">
                          <span class="ds-table-header-cell__resize-bar"></span>
                        </div>
                      </div>
                    </div>

                    <!-- Col 4: Department (in Organization group) -->
                    <div class="ds-table-header-cell" data-col="department">
                      <div class="ds-table-header-cell__resize-handle"></div>
                      <div class="ds-table-header-cell__content">
                        <span class="ds-table-header-cell__label">Department</span>
                      </div>
                      <div class="ds-table-header-cell__actions">
                        <div class="ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing ds-table-header-cell__resize-handle--active" data-resize-col="department">
                          <span class="ds-table-header-cell__resize-bar"></span>
                        </div>
                      </div>
                    </div>

                    <!-- Col 5: Status (in Organization group, filterable) -->
                    <div class="ds-table-header-cell" data-col="status">
                      <div class="ds-table-header-cell__resize-handle"></div>
                      <div class="ds-table-header-cell__content">
                        <span class="ds-table-header-cell__label">Status</span>
                      </div>
                      <div class="ds-table-header-cell__actions">
                        <button type="button" class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" aria-label="Filter Status">
                          <span class="ds-icon ds-icon--filled">filter_alt</span>
                        </button>
                        <div class="ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing ds-table-header-cell__resize-handle--active" data-resize-col="status">
                          <span class="ds-table-header-cell__resize-bar"></span>
                        </div>
                      </div>
                    </div>

                    <!-- Col 6: Amount (right-aligned, sortable but unsorted) -->
                    <div class="ds-table-header-cell" data-col="amount">
                      <div class="ds-table-header-cell__resize-handle"></div>
                      <div class="ds-table-header-cell__content ds-table-header-cell__content--right">
                        <span class="ds-table-header-cell__label">Amount</span>
                        <button type="button" class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" aria-label="Sort Amount">
                          <span class="ds-icon ds-table-header-cell__sort-icon--none">arrow_upward_alt</span>
                        </button>
                      </div>
                      <div class="ds-table-header-cell__actions">
                        <div class="ds-table-header-cell__resize-handle ds-table-header-cell__resize-handle--trailing ds-table-header-cell__resize-handle--active" data-resize-col="amount">
                          <span class="ds-table-header-cell__resize-bar"></span>
                        </div>
                      </div>
                    </div>

                    <!-- Col 7: Actions (pinned right, no resize) -->
                    <div class="ds-table-header-cell ds-table-pinned-right" data-col="actions">
                      <div class="ds-table-header-cell__content" style="justify-content: center;">
                        <span class="ds-table-header-cell__label">Actions</span>
                      </div>
                    </div>

                  </div><!-- /header row -->

                  <!-- Data rows (7-column grid, same template as header) -->
                  <div style="display: grid; grid-template-columns: 56px 200px 220px 160px 140px 130px 100px; position: relative;">

                    <!-- Drop zone indicator: between Status (ends at 776px) and Amount -->
                    <div class="ds-table-drop-zone" style="left: 776px;"></div>

                    <!-- ── Active group header (expanded) ──────────────────── -->
                    <div style="grid-column: 1 / -1;">
                      <div class="ds-table-group-row">
                        <span class="ds-icon ds-icon--sm" style="color: var(--color-icon-default);">keyboard_arrow_down</span>
                        <span class="ds-table-group-row__label">Active <span class="ds-table-group-row__count">(4)</span></span>
                      </div>
                    </div>

                    <!-- Active Row 1: Acme Corporation -->
                    <div class="ds-table-row-cell ds-table-row-cell--checkbox-only sim-cell" data-row="a1"><div class="ds-table-row-cell__content" style="justify-content:center;"><label class="ds-checkbox" aria-label="Select Acme Corporation"><input type="checkbox" class="ds-checkbox__control" /><span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span></label></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="customer" data-row="a1"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__indent--tier1"></span><span class="ds-table-row-cell__data">Acme Corporation</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="email" data-row="a1"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">info@acmecorp.com</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="department" data-row="a1"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Engineering</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="status" data-row="a1"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Active</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="amount" data-row="a1"><div class="ds-table-row-cell__content ds-table-row-cell__content--right"><span class="ds-table-row-cell__data ds-table-row-cell__data--right">$14,200.00</span></div></div>
                    <div class="ds-table-row-cell ds-table-pinned-right sim-cell" data-col="actions" data-row="a1"><div class="ds-table-row-cell__content" style="justify-content:center; gap: var(--spacing-xs);"><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="View Acme Corporation"><span class="ds-icon">open_in_new</span></button><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="Delete Acme Corporation"><span class="ds-icon">delete</span></button></div></div>

                    <!-- Active Row 2: Cloud Systems Inc (selected) -->
                    <div class="ds-table-row-cell ds-table-row-cell--checkbox-only sim-cell is-selected" data-row="a2"><div class="ds-table-row-cell__content" style="justify-content:center;"><label class="ds-checkbox" aria-label="Select Cloud Systems Inc"><input type="checkbox" class="ds-checkbox__control" checked /><span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span></label></div></div>
                    <div class="ds-table-row-cell sim-cell is-selected" data-col="customer" data-row="a2"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__indent--tier1"></span><span class="ds-table-row-cell__data">Cloud Systems Inc</span></div></div>
                    <div class="ds-table-row-cell sim-cell is-selected" data-col="email" data-row="a2"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">hello@cloudsys.io</span></div></div>
                    <div class="ds-table-row-cell sim-cell is-selected" data-col="department" data-row="a2"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Product</span></div></div>
                    <div class="ds-table-row-cell sim-cell is-selected" data-col="status" data-row="a2"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Active</span></div></div>
                    <div class="ds-table-row-cell sim-cell is-selected" data-col="amount" data-row="a2"><div class="ds-table-row-cell__content ds-table-row-cell__content--right"><span class="ds-table-row-cell__data ds-table-row-cell__data--right">$31,000.00</span></div></div>
                    <div class="ds-table-row-cell ds-table-pinned-right sim-cell is-selected" data-col="actions" data-row="a2"><div class="ds-table-row-cell__content" style="justify-content:center; gap: var(--spacing-xs);"><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="View Cloud Systems Inc"><span class="ds-icon">open_in_new</span></button><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="Delete Cloud Systems Inc"><span class="ds-icon">delete</span></button></div></div>

                    <!-- Active Row 3: Echo Ventures Group -->
                    <div class="ds-table-row-cell ds-table-row-cell--checkbox-only sim-cell" data-row="a3"><div class="ds-table-row-cell__content" style="justify-content:center;"><label class="ds-checkbox" aria-label="Select Echo Ventures Group"><input type="checkbox" class="ds-checkbox__control" /><span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span></label></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="customer" data-row="a3"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__indent--tier1"></span><span class="ds-table-row-cell__data">Echo Ventures Group</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="email" data-row="a3"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">team@echoventures.co</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="department" data-row="a3"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Engineering</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="status" data-row="a3"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Active</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="amount" data-row="a3"><div class="ds-table-row-cell__content ds-table-row-cell__content--right"><span class="ds-table-row-cell__data ds-table-row-cell__data--right">$57,800.00</span></div></div>
                    <div class="ds-table-row-cell ds-table-pinned-right sim-cell" data-col="actions" data-row="a3"><div class="ds-table-row-cell__content" style="justify-content:center; gap: var(--spacing-xs);"><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="View Echo Ventures Group"><span class="ds-icon">open_in_new</span></button><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="Delete Echo Ventures Group"><span class="ds-icon">delete</span></button></div></div>

                    <!-- Active Row 4: Frontier Corp -->
                    <div class="ds-table-row-cell ds-table-row-cell--checkbox-only sim-cell" data-row="a4"><div class="ds-table-row-cell__content" style="justify-content:center;"><label class="ds-checkbox" aria-label="Select Frontier Corp"><input type="checkbox" class="ds-checkbox__control" /><span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span></label></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="customer" data-row="a4"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__indent--tier1"></span><span class="ds-table-row-cell__data">Frontier Corp</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="email" data-row="a4"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">contact@frontierco.com</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="department" data-row="a4"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Sales</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="status" data-row="a4"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data">Active</span></div></div>
                    <div class="ds-table-row-cell sim-cell" data-col="amount" data-row="a4"><div class="ds-table-row-cell__content ds-table-row-cell__content--right"><span class="ds-table-row-cell__data ds-table-row-cell__data--right">$22,400.00</span></div></div>
                    <div class="ds-table-row-cell ds-table-pinned-right sim-cell" data-col="actions" data-row="a4"><div class="ds-table-row-cell__content" style="justify-content:center; gap: var(--spacing-xs);"><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="View Frontier Corp"><span class="ds-icon">open_in_new</span></button><button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="Delete Frontier Corp"><span class="ds-icon">delete</span></button></div></div>

                    <!-- ── Pending group header (collapsed — no child rows) ──── -->
                    <div style="grid-column: 1 / -1;">
                      <div class="ds-table-group-row">
                        <span class="ds-icon ds-icon--sm" style="color: var(--color-icon-default);">keyboard_arrow_right</span>
                        <span class="ds-table-group-row__label">Pending <span class="ds-table-group-row__count">(2)</span></span>
                      </div>
                    </div>
                    <!-- No child rows: Pending group is collapsed -->

                  </div><!-- /data rows grid -->

                </div><!-- /min-width wrapper -->
              </div><!-- /table-scroll -->

              <!-- Totals bar — pinned above paginator, does not scroll vertically -->
              <div class="ds-table-totals-bar">
                <div style="display: grid; grid-template-columns: 56px 200px 220px 160px 140px 130px 100px; min-width: 1006px;">
                  <div class="ds-table-row-cell ds-table-row-cell--totals ds-table-row-cell--checkbox-only"></div>
                  <div class="ds-table-row-cell ds-table-row-cell--totals"><div class="ds-table-row-cell__content"><span class="ds-table-row-cell__data" style="font-weight: var(--ref-typeface-weight-bold);">Totals</span></div></div>
                  <div class="ds-table-row-cell ds-table-row-cell--totals"></div><!-- email -->
                  <div class="ds-table-row-cell ds-table-row-cell--totals"></div><!-- department -->
                  <div class="ds-table-row-cell ds-table-row-cell--totals"></div><!-- status -->
                  <div class="ds-table-row-cell ds-table-row-cell--totals"><div class="ds-table-row-cell__content ds-table-row-cell__content--right"><span class="ds-table-row-cell__data ds-table-row-cell__data--right">$125,400.00</span></div></div>
                  <div class="ds-table-row-cell ds-table-row-cell--totals ds-table-pinned-right"></div><!-- actions pinned -->
                </div>
              </div>

              <!-- Paginator -->
              <div class="ds-ag-paginator" style="width: 100%; border-top: 1px solid var(--color-border-subtle);">
                <div class="ds-ag-paginator__inner">
                  <div class="ds-ag-paginator__counter">
                    <span class="ds-ag-paginator__label">Items per page:</span>
                    <div class="ds-ag-paginator__select-wrap">
                      <select class="ds-ag-paginator__select" aria-label="Items per page">
                        <option selected>100</option>
                        <option>250</option>
                        <option>500</option>
                        <option>1000</option>
                      </select>
                      <span class="ds-ag-paginator__select-icon ds-icon">arrow_drop_down</span>
                    </div>
                  </div>
                  <div class="ds-ag-paginator__pagination">
                    <span class="ds-ag-paginator__range" aria-live="polite">1 - 100 of 3842</span>
                    <div class="ds-ag-paginator__nav">
                      <button class="ds-icon-button ds-icon-button--icon" type="button" aria-label="First page" disabled>
                        <span class="ds-icon">first_page</span>
                      </button>
                      <button class="ds-icon-button ds-icon-button--icon" type="button" aria-label="Previous page" disabled>
                        <span class="ds-icon">keyboard_arrow_left</span>
                      </button>
                      <button class="ds-icon-button ds-icon-button--icon" type="button" aria-label="Next page">
                        <span class="ds-icon">keyboard_arrow_right</span>
                      </button>
                      <button class="ds-icon-button ds-icon-button--icon" type="button" aria-label="Last page">
                        <span class="ds-icon">last_page</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div><!-- /main content area -->

            <!-- ── Column tool panel ──────────────────────────────────────────── -->
            <div class="ds-column-panel">
              <div class="ds-column-panel__header">
                <span class="ds-column-panel__title">Columns</span>
                <button class="ds-icon-button ds-icon-button--icon ds-icon-button--sm" type="button" aria-label="Close columns panel">
                  <span class="ds-icon">close</span>
                </button>
              </div>
              <div class="ds-column-panel__list">
                <!-- Checkbox: system column, OFF -->
                <div class="ds-column-panel__row ds-column-panel__row--system">
                  <label class="ds-toggle" aria-label="Toggle Checkbox column visibility">
                    <input type="checkbox" class="ds-toggle__control" />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Checkbox</span>
                </div>
                <!-- Customer: ON -->
                <div class="ds-column-panel__row">
                  <label class="ds-toggle" aria-label="Toggle Customer column visibility">
                    <input type="checkbox" class="ds-toggle__control" checked />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Customer</span>
                </div>
                <!-- Email: ON -->
                <div class="ds-column-panel__row">
                  <label class="ds-toggle" aria-label="Toggle Email column visibility">
                    <input type="checkbox" class="ds-toggle__control" checked />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Email</span>
                </div>
                <!-- Department: ON -->
                <div class="ds-column-panel__row">
                  <label class="ds-toggle" aria-label="Toggle Department column visibility">
                    <input type="checkbox" class="ds-toggle__control" checked />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Department</span>
                </div>
                <!-- Status: ON -->
                <div class="ds-column-panel__row">
                  <label class="ds-toggle" aria-label="Toggle Status column visibility">
                    <input type="checkbox" class="ds-toggle__control" checked />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Status</span>
                </div>
                <!-- Amount: ON -->
                <div class="ds-column-panel__row">
                  <label class="ds-toggle" aria-label="Toggle Amount column visibility">
                    <input type="checkbox" class="ds-toggle__control" checked />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Amount</span>
                </div>
                <!-- Actions: system column, OFF -->
                <div class="ds-column-panel__row ds-column-panel__row--system">
                  <label class="ds-toggle" aria-label="Toggle Actions column visibility">
                    <input type="checkbox" class="ds-toggle__control" />
                    <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
                  </label>
                  <span class="ds-column-panel__name">Actions</span>
                </div>
              </div>
            </div><!-- /column-panel -->

          </div><!-- /table-sim -->
        </div><!-- /demo-row -->
      </section>
```

- [ ] **Step 2: Open `preview/index.html` in a browser and verify visually**

Check:
1. `#table-sim` renders full width with column tool panel on the right
2. `#table-scroll` scrolls both horizontally and vertically
3. Custom scrollbars are visible (styled thumb) in Chrome/Safari
4. Actions column stays pinned to the right as you scroll horizontally
5. Group header row and header row stay sticky at the top as you scroll vertically
6. Column group header "Organization" spans Department + Status
7. Email column header shows drag styling (blue outline, hovered bg)
8. Blue drop zone indicator visible at the Status/Amount boundary
9. Active group header (with `keyboard_arrow_down`) is visible; 4 child rows below it
10. Pending group header (with `keyboard_arrow_right`) is visible; no child rows
11. Totals bar shows "Totals" and "$125,400.00" above the paginator
12. Column tool panel shows 7 toggle rows; Checkbox and Actions are dimmed (system)

- [ ] **Step 3: Commit**

```bash
git add preview/index.html
git commit -m "feat(preview): rebuild table sim — 7 cols, scrollbars, pinned col, grouping, totals, column panel"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Section 1: Scroll container (`#table-scroll`, `overflow-x: auto; overflow-y: auto`) — Task 4 + 5
- ✅ Section 1: Custom scrollbar styling (webkit + Firefox) — Task 4
- ✅ Section 1: `#table-sim` flex row, full width — Task 5
- ✅ Section 2: 7 columns, 1006px min-width — Task 5
- ✅ Section 2: Pinned right Actions column (`position: sticky; right: 0`) — Task 4 + 5
- ✅ Section 2: Column group header "Organization" (Department + Status) — Task 4 + 5
- ✅ Section 2: Email column dragging state + drop zone — Task 1 + 4 + 5
- ✅ Section 3: Row grouping by Status (Active expanded, Pending collapsed) — Task 5
- ✅ Section 3: Totals bar (pinned, above paginator) — Task 2 + 4 + 5
- ✅ Section 3: Column tool panel (7 toggle rows, system rows dimmed) — Task 3 + 4 + 5
- ✅ Settings button shows `is-selected` when panel is open — Task 5

**Placeholder scan:** No TBDs, no "implement later", all code blocks complete. ✓

**Type consistency:** Class names used in Task 4 CSS (`ds-table-pinned-right`, `ds-table-col-group-header`, `ds-table-group-row`, `ds-table-drop-zone`, `ds-table-totals-bar`, `ds-column-panel`) exactly match HTML in Task 5. ✓
