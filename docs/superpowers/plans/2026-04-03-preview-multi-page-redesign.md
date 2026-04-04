# Preview Multi-Page Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize `preview/index.html` from a single scroll into three tab-switched pages (Foundations, Components, Examples) with a topbar page switcher, cleaned-up branding, and components regrouped common-to-specialized.

**Architecture:** All changes are to one file — `preview/index.html`. CSS additions go into the existing `<style>` block (after the `ONFLO-COMPONENTS:END` sentinel). A Python script handles the heavy section reordering. JS is updated in-place in the existing `<script>` block.

**Tech Stack:** Vanilla HTML/CSS/JS. Python 3 (for the reorder script — no dependencies). No build step needed for structural changes; run `npm run build` only if SCSS was also changed (it wasn't here).

---

## File Map

| File | Change |
|---|---|
| `preview/index.html` | All changes — CSS, HTML structure, JS |
| `scripts/reorder-preview.py` | One-shot helper script — delete after running |

---

## Section Reference

Current section IDs and which page they move to:

**Foundations:** `colours`, `typography`, `spacing`, `radius`, `shadows`, `overlays`, `icons`

**Components (ordered common → specialized):**
- Form Controls: `input`, `select`, `textarea`, `checkbox`, `radio`, `toggle`, `search`
- Actions: `button`, `icon-button`
- Feedback & Status: `alert`, `badge`, `tooltip`, `progress`, `hover-card`
- Display: `avatar`, `label`, `tabs`, `list`
- Navigation: `nav-button`, `agent-status`, `nav-sidebar`, `nav-tab`, `top-nav`, `nav-expand`
- Table Primitives: `table-header-cell`, `table-row-cell`, `ag-paginator`, `table-toolbar`

**Examples:** `page-layout`, `split-page-layout`, `table`

---

## Task 1: CSS — Add page-tab styles, update sidebar-brand

**Files:**
- Modify: `preview/index.html` (CSS `<style>` block, approx lines 427–660)

- [ ] **Step 1: Remove `.badge` CSS block** (no longer used after removing the Step 1 badge from the topbar)

Find and delete this block (lines ~599–607):
```css
    .badge {
      font-size: 11px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 9999px;
      background: var(--color-surface-brand);
      color: var(--color-text-brand);
      border: 1px solid var(--color-border-accordion);
    }
```

- [ ] **Step 2: Remove `.brand-mark` CSS block** (SVG icon is being removed from sidebar)

Find and delete these rules (lines ~480–488):
```css
    .brand-mark {
      width: 28px; height: 28px;
      background: var(--color-surface-nav-active);
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    .brand-mark svg { width: 16px; height: 16px; }
```

- [ ] **Step 3: Add page-tab styles**

Insert this block immediately after the `.theme-toggle:hover` rule (after line ~630):
```css
    /* Page tabs */
    .topbar-tabs {
      display: flex;
      align-items: stretch;
      height: 100%;
      gap: 4px;
    }

    .page-tab {
      padding: 0 16px;
      height: 100%;
      font-size: 13px;
      font-weight: 500;
      font-family: var(--preview-font);
      color: var(--color-text-secondary);
      border: none;
      border-bottom: 2px solid transparent;
      background: none;
      cursor: pointer;
      transition: color 0.12s, border-color 0.12s;
    }

    .page-tab:hover { color: var(--color-text-primary); }

    .page-tab.active {
      color: var(--color-surface-nav-active);
      font-weight: 600;
      border-bottom-color: var(--color-surface-nav-active);
    }
```

- [ ] **Step 4: Verify in browser** — open `preview/index.html` locally; no visual change expected yet since HTML hasn't changed.

---

## Task 2: HTML — Update topbar

**Files:**
- Modify: `preview/index.html` (topbar HTML, approx lines 6445–6457)

- [ ] **Step 1: Replace the entire topbar `<header>` block**

Find:
```html
    <header class="topbar">
      <span class="topbar-title">Design Tokens Reference</span>
      <div class="topbar-actions">
        <span class="badge">Step 1 — Variables</span>
        <button class="theme-toggle" onclick="toggleTheme()" id="themeBtn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="3" fill="currentColor"/>
            <path d="M7 1V2.5M7 11.5V13M1 7H2.5M11.5 7H13M2.9 2.9L3.96 3.96M10.04 10.04L11.1 11.1M11.1 2.9L10.04 3.96M3.96 10.04L2.9 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span id="themeLabel">Dark mode</span>
        </button>
      </div>
    </header>
```

Replace with:
```html
    <header class="topbar">
      <span class="topbar-title">Onflo Design System</span>
      <div class="topbar-tabs">
        <button class="page-tab active" data-page="foundations" onclick="switchPage('foundations')">Foundations</button>
        <button class="page-tab" data-page="components" onclick="switchPage('components')">Components</button>
        <button class="page-tab" data-page="examples" onclick="switchPage('examples')">Examples</button>
      </div>
      <button class="theme-toggle" onclick="toggleTheme()" id="themeBtn">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="3" fill="currentColor"/>
          <path d="M7 1V2.5M7 11.5V13M1 7H2.5M11.5 7H13M2.9 2.9L3.96 3.96M10.04 10.04L11.1 11.1M11.1 2.9L10.04 3.96M3.96 10.04L2.9 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
        <span id="themeLabel">Dark mode</span>
      </button>
    </header>
```

- [ ] **Step 2: Verify in browser** — topbar should now read "Onflo Design System" on the left, three tab buttons in the center (Foundations active), dark mode toggle on the right.

---

## Task 3: HTML — Update sidebar (brand, three navs, footer)

**Files:**
- Modify: `preview/index.html` (sidebar HTML, approx lines 6364–6441)

- [ ] **Step 1: Replace the sidebar brand block** (removes SVG icon)

Find:
```html
    <div class="sidebar-brand">
      <div class="brand-mark">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="5" height="5" rx="1" fill="white"/>
          <rect x="9" y="2" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
          <rect x="2" y="9" width="5" height="5" rx="1" fill="white" opacity="0.6"/>
          <rect x="9" y="9" width="5" height="5" rx="1" fill="white" opacity="0.3"/>
        </svg>
      </div>
      <div>
        <div class="brand-name">Onflo</div>
        <div class="brand-tag">Design System</div>
      </div>
    </div>
```

Replace with:
```html
    <div class="sidebar-brand">
      <div>
        <div class="brand-name">Onflo</div>
        <div class="brand-tag">Design System</div>
      </div>
    </div>
```

- [ ] **Step 2: Replace the entire `<nav class="sidebar-nav">` block** (one nav becomes three)

Find the entire block from `<nav class="sidebar-nav">` through `</nav>` (lines ~6381–6435):
```html
    <nav class="sidebar-nav">
      <div class="nav-section-label">Foundations</div>
      <a class="nav-link active" href="#colours" onclick="setActive(this)"><span class="nav-dot"></span>Colours</a>
      ...
      <a class="nav-link" href="#table-toolbar" onclick="setActive(this)"><span class="nav-dot"></span>Toolbar</a>
    </nav>
```

Replace the entire `<nav>...</nav>` block with these three navs:
```html
    <nav class="sidebar-nav" id="nav-foundations">
      <div class="nav-section-label">Foundations</div>
      <a class="nav-link active" href="#colours" onclick="setActive(this)"><span class="nav-dot"></span>Colours</a>
      <a class="nav-link" href="#typography" onclick="setActive(this)"><span class="nav-dot"></span>Typography</a>
      <a class="nav-link" href="#spacing" onclick="setActive(this)"><span class="nav-dot"></span>Spacing</a>
      <a class="nav-link" href="#radius" onclick="setActive(this)"><span class="nav-dot"></span>Border Radius</a>
      <a class="nav-link" href="#shadows" onclick="setActive(this)"><span class="nav-dot"></span>Shadows</a>
      <a class="nav-link" href="#overlays" onclick="setActive(this)"><span class="nav-dot"></span>Overlays</a>
      <a class="nav-link" href="#icons" onclick="setActive(this)"><span class="nav-dot"></span>Icons</a>
    </nav>

    <nav class="sidebar-nav" id="nav-components" style="display:none">
      <div class="nav-group-label">Form Controls</div>
      <a class="nav-link" href="#input" onclick="setActive(this)"><span class="nav-dot"></span>Input Field</a>
      <a class="nav-link" href="#select" onclick="setActive(this)"><span class="nav-dot"></span>Select</a>
      <a class="nav-link" href="#textarea" onclick="setActive(this)"><span class="nav-dot"></span>Textarea</a>
      <a class="nav-link" href="#checkbox" onclick="setActive(this)"><span class="nav-dot"></span>Checkbox</a>
      <a class="nav-link" href="#radio" onclick="setActive(this)"><span class="nav-dot"></span>Radio Button</a>
      <a class="nav-link" href="#toggle" onclick="setActive(this)"><span class="nav-dot"></span>Toggle</a>
      <a class="nav-link" href="#search" onclick="setActive(this)"><span class="nav-dot"></span>Search Field</a>

      <div class="nav-group-label">Actions</div>
      <a class="nav-link" href="#button" onclick="setActive(this)"><span class="nav-dot"></span>Button</a>
      <a class="nav-link" href="#icon-button" onclick="setActive(this)"><span class="nav-dot"></span>Icon Button</a>

      <div class="nav-group-label">Feedback &amp; Status</div>
      <a class="nav-link" href="#alert" onclick="setActive(this)"><span class="nav-dot"></span>Alert</a>
      <a class="nav-link" href="#badge" onclick="setActive(this)"><span class="nav-dot"></span>Badge</a>
      <a class="nav-link" href="#tooltip" onclick="setActive(this)"><span class="nav-dot"></span>Tooltip</a>
      <a class="nav-link" href="#progress" onclick="setActive(this)"><span class="nav-dot"></span>Progress</a>
      <a class="nav-link" href="#hover-card" onclick="setActive(this)"><span class="nav-dot"></span>Hover Card</a>

      <div class="nav-group-label">Display</div>
      <a class="nav-link" href="#avatar" onclick="setActive(this)"><span class="nav-dot"></span>Avatar</a>
      <a class="nav-link" href="#label" onclick="setActive(this)"><span class="nav-dot"></span>Label</a>
      <a class="nav-link" href="#tabs" onclick="setActive(this)"><span class="nav-dot"></span>Tabs</a>
      <a class="nav-link" href="#list" onclick="setActive(this)"><span class="nav-dot"></span>List Item</a>

      <div class="nav-group-label">Navigation</div>
      <a class="nav-link" href="#nav-button" onclick="setActive(this)"><span class="nav-dot"></span>Nav Button</a>
      <a class="nav-link" href="#agent-status" onclick="setActive(this)"><span class="nav-dot"></span>Agent Status</a>
      <a class="nav-link" href="#nav-sidebar" onclick="setActive(this)"><span class="nav-dot"></span>Nav Sidebar</a>
      <a class="nav-link" href="#nav-tab" onclick="setActive(this)"><span class="nav-dot"></span>Nav Tab</a>
      <a class="nav-link" href="#top-nav" onclick="setActive(this)"><span class="nav-dot"></span>Top Nav</a>
      <a class="nav-link" href="#nav-expand" onclick="setActive(this)"><span class="nav-dot"></span>Nav Expand</a>

      <div class="nav-group-label">Table Primitives</div>
      <a class="nav-link" href="#table-header-cell" onclick="setActive(this)"><span class="nav-dot"></span>Header Cell</a>
      <a class="nav-link" href="#table-row-cell" onclick="setActive(this)"><span class="nav-dot"></span>Row Cell</a>
      <a class="nav-link" href="#ag-paginator" onclick="setActive(this)"><span class="nav-dot"></span>AG Grid Paginator</a>
      <a class="nav-link" href="#table-toolbar" onclick="setActive(this)"><span class="nav-dot"></span>Toolbar</a>
    </nav>

    <nav class="sidebar-nav" id="nav-examples" style="display:none">
      <div class="nav-section-label">Examples</div>
      <a class="nav-link" href="#page-layout" onclick="setActive(this)"><span class="nav-dot"></span>Page Layout</a>
      <a class="nav-link" href="#split-page-layout" onclick="setActive(this)"><span class="nav-dot"></span>Split Page</a>
      <a class="nav-link" href="#table" onclick="setActive(this)"><span class="nav-dot"></span>Table</a>
    </nav>
```

- [ ] **Step 3: Replace the sidebar footer** (remove Step 2 label)

Find:
```html
    <div class="sidebar-footer">
      Step 2 — Components<br/>
      v0.3.0 · Angular + .NET Core
    </div>
```

Replace with:
```html
    <div class="sidebar-footer">
      v0.3.0 · Angular + .NET Core
    </div>
```

- [ ] **Step 4: Verify in browser** — sidebar should show "Onflo / Design System" without icon; only Foundations nav links visible; footer shows just the version string.

---

## Task 4: Python script — Reorder sections into page divs

This task extracts all 38 `<section>` elements from `<main class="content">` and rebuilds the content area as three `<div class="page">` containers in the correct order.

**Files:**
- Create: `scripts/reorder-preview.py` (delete after running)
- Modify: `preview/index.html` (main content area, lines ~6459–11115)

- [ ] **Step 1: Create the reorder script**

Create `scripts/reorder-preview.py`:
```python
import re, sys
from pathlib import Path

html_path = Path('preview/index.html')
text = html_path.read_text(encoding='utf-8')

# Extract all sections — each starts with 6-space indent, no nested <section> tags in this file
pattern = re.compile(
    r'( {6}<section class="section" id="([^"]+)">.*? {6}</section>)',
    re.DOTALL
)
sections = {}
for m in pattern.finditer(text):
    sections[m.group(2)] = m.group(1)

print(f'Extracted {len(sections)} sections: {list(sections.keys())}', file=sys.stderr)

# Page definitions — order within each page matters
PAGES = [
    ('foundations', [
        'colours', 'typography', 'spacing', 'radius', 'shadows', 'overlays', 'icons',
    ]),
    ('components', [
        # Form Controls
        'input', 'select', 'textarea', 'checkbox', 'radio', 'toggle', 'search',
        # Actions
        'button', 'icon-button',
        # Feedback & Status
        'alert', 'badge', 'tooltip', 'progress', 'hover-card',
        # Display
        'avatar', 'label', 'tabs', 'list',
        # Navigation (specialized)
        'nav-button', 'agent-status', 'nav-sidebar', 'nav-tab', 'top-nav', 'nav-expand',
        # Table Primitives (specialized)
        'table-header-cell', 'table-row-cell', 'ag-paginator', 'table-toolbar',
    ]),
    ('examples', [
        'page-layout', 'split-page-layout', 'table',
    ]),
]

# Verify all sections are accounted for
all_planned = [sid for _, ids in PAGES for sid in ids]
missing = [sid for sid in all_planned if sid not in sections]
extra = [sid for sid in sections if sid not in all_planned]
if missing:
    print(f'ERROR: sections in plan but not in file: {missing}', file=sys.stderr)
    sys.exit(1)
if extra:
    print(f'WARNING: sections in file but not in plan: {extra}', file=sys.stderr)

# Build replacement content for <main>
new_body_parts = []
for i, (page_id, section_ids) in enumerate(PAGES):
    display_attr = '' if i == 0 else ' style="display:none"'
    new_body_parts.append(f'\n\n      <div class="page" id="page-{page_id}"{display_attr}>')
    for sid in section_ids:
        new_body_parts.append('\n')
        new_body_parts.append(sections[sid])
    new_body_parts.append(f'\n\n      </div><!-- /#page-{page_id} -->')

new_main_body = ''.join(new_body_parts) + '\n\n    '

# Replace everything between <main class="content"> and </main>
main_open = '    <main class="content">\n'
main_close = '\n    </main>'

idx_start = text.index(main_open) + len(main_open)
idx_end = text.index(main_close)

new_text = text[:idx_start] + new_main_body + text[idx_end:]
html_path.write_text(new_text, encoding='utf-8')
print(f'Done. Wrote {len(new_text)} chars.', file=sys.stderr)
```

- [ ] **Step 2: Run the script from the repo root**

```bash
python3 scripts/reorder-preview.py
```

Expected output (stderr):
```
Extracted 38 sections: ['colours', 'typography', ...]
Done. Wrote NNNNN chars.
```

If you see `ERROR: sections in plan but not in file`, a section ID in the plan doesn't match the HTML. Read the file's actual section IDs with:
```bash
grep 'class="section" id=' preview/index.html
```
Then fix the ID in the script's `PAGES` list and re-run.

- [ ] **Step 3: Verify section count is still 38**

```bash
grep -c 'class="section" id=' preview/index.html
```
Expected: `38`

- [ ] **Step 4: Verify page div structure**

```bash
grep -n 'class="page"' preview/index.html
```
Expected — three lines showing:
```
NNNN:      <div class="page" id="page-foundations">
NNNN:      <div class="page" id="page-components" style="display:none">
NNNN:      <div class="page" id="page-examples" style="display:none">
```

- [ ] **Step 5: Delete the helper script**

```bash
rm scripts/reorder-preview.py
```

---

## Task 5: JavaScript — Add switchPage(), fix scroll spy, add hash routing

**Files:**
- Modify: `preview/index.html` (JS `<script>` block, approx lines 11117–end)

- [ ] **Step 1: Add `switchPage()` function**

Find the line `function setActive(el) {` and insert this block immediately before it:
```javascript
  function switchPage(page) {
    ['foundations', 'components', 'examples'].forEach(function(p) {
      var pageEl = document.getElementById('page-' + p);
      var navEl  = document.getElementById('nav-' + p);
      var tabEl  = document.querySelector('.page-tab[data-page="' + p + '"]');
      if (pageEl) pageEl.style.display = 'none';
      if (navEl)  navEl.style.display  = 'none';
      if (tabEl)  tabEl.classList.remove('active');
    });
    var activePage = document.getElementById('page-' + page);
    var activeNav  = document.getElementById('nav-' + page);
    var activeTab  = document.querySelector('.page-tab[data-page="' + page + '"]');
    if (activePage) activePage.style.display = '';
    if (activeNav)  activeNav.style.display  = '';
    if (activeTab)  activeTab.classList.add('active');
    window.scrollTo(0, 0);
  }

```

- [ ] **Step 2: Update `setActive` to scope active state to the visible nav**

Find:
```javascript
  function setActive(el) {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    el.classList.add('active');
  }
```

Replace with:
```javascript
  function setActive(el) {
    // Only clear active within the same nav to avoid touching hidden navs
    var parentNav = el.closest('nav');
    if (parentNav) {
      parentNav.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
    }
    el.classList.add('active');
  }
```

- [ ] **Step 3: Update scroll spy to scope to the visible page's nav**

Find:
```javascript
  // Highlight active nav item on scroll
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
```

Replace with:
```javascript
  // Highlight active nav item on scroll — scoped to the visible nav
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        // Find and update only the currently visible nav
        document.querySelectorAll('.sidebar-nav').forEach(function(nav) {
          if (nav.style.display === 'none') return;
          nav.querySelectorAll('.nav-link').forEach(function(l) {
            l.classList.toggle('active', l.getAttribute('href') === '#' + id);
          });
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(function(s) { observer.observe(s); });
```

- [ ] **Step 4: Add hash-based deep-link routing**

Find the line `  sections.forEach(function(s) { observer.observe(s); });` and insert this block immediately after it:
```javascript

  // Hash-based deep linking — resolve anchor to correct page on load
  var anchorPageMap = {
    colours: 'foundations', typography: 'foundations', spacing: 'foundations',
    radius: 'foundations', shadows: 'foundations', overlays: 'foundations', icons: 'foundations',
    input: 'components', select: 'components', textarea: 'components',
    checkbox: 'components', radio: 'components', toggle: 'components', search: 'components',
    button: 'components', 'icon-button': 'components',
    alert: 'components', badge: 'components', tooltip: 'components',
    progress: 'components', 'hover-card': 'components',
    avatar: 'components', label: 'components', tabs: 'components', list: 'components',
    'nav-button': 'components', 'agent-status': 'components', 'nav-sidebar': 'components',
    'nav-tab': 'components', 'top-nav': 'components', 'nav-expand': 'components',
    'table-header-cell': 'components', 'table-row-cell': 'components',
    'ag-paginator': 'components', 'table-toolbar': 'components',
    'page-layout': 'examples', 'split-page-layout': 'examples', table: 'examples',
  };
  var initHash = window.location.hash.slice(1);
  if (initHash && anchorPageMap[initHash]) {
    switchPage(anchorPageMap[initHash]);
    var target = document.getElementById(initHash);
    if (target) setTimeout(function() { target.scrollIntoView(); }, 50);
  }
```

- [ ] **Step 5: Verify in browser**
  - Open `preview/index.html` — Foundations page loads by default with Colours–Icons nav visible
  - Click "Components" tab — Components nav appears, form controls section visible first
  - Click "Examples" tab — shows Page Layout, Split Page, Table in nav
  - Append `#button` to the URL and reload — should land on Components page at the Button section
  - Scroll spy: scroll down a Foundations page, confirm nav link highlights update

---

## Task 6: Commit

- [ ] **Step 1: Verify no stray section count issues**

```bash
grep -c 'class="section" id=' preview/index.html
```
Expected: `38`

- [ ] **Step 2: Verify sentinel blocks are untouched**

```bash
grep -n 'ONFLO-TOKENS\|ONFLO-COMPONENTS' preview/index.html
```
Expected — same four lines as before:
```
11:<!-- ONFLO-TOKENS:START -->
425:<!-- ONFLO-TOKENS:END -->
NNN:<!-- ONFLO-COMPONENTS:START --><style>
NNN:</style><!-- ONFLO-COMPONENTS:END -->
```

- [ ] **Step 3: Commit**

```bash
git add preview/index.html
git commit -m "feat(preview): multi-page layout — Foundations / Components / Examples tabs"
```
