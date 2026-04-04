# Preview Multi-Page Redesign

**Date:** 2026-04-03  
**Status:** Approved

---

## Goal

Reorganize `preview/index.html` from a single long-scroll page into three distinct pages (Foundations, Components, Examples) with a topbar tab switcher. Remove Step 1/2 labels. Simplify the brand header to text-only.

---

## Topbar

- **Left:** Text — `Onflo Design System` (no icon/SVG)
- **Center:** Three page tab buttons — `Foundations` | `Components` | `Examples`
  - Active tab shows a bottom underline indicator using `--color-surface-nav-active`
  - Clicking a tab switches the visible page and updates the sidebar nav
- **Right:** Dark mode toggle (unchanged behavior)

---

## Sidebar

- Shows only the nav links relevant to the currently active page
- Switches nav content when the page tab changes
- Footer: `v0.3.0 · Angular + .NET Core` — no Step 1/2 labels

---

## Page 1 — Foundations

Sections in order:
1. Colours
2. Typography
3. Spacing
4. Border Radius
5. Shadows
6. Overlays
7. Icons

---

## Page 2 — Components

Sections ordered common → specialized:

**Form Controls**
- Input Field, Select, Textarea, Checkbox, Radio Button, Toggle, Search Field

**Actions**
- Button, Icon Button

**Feedback & Status**
- Alert, Badge, Tooltip, Progress, Hover Card

**Display**
- Avatar, Label, Tabs, List Item

**Navigation** (bottom — specialized, only used in nav composition)
- Nav Button, Agent Status, Nav Sidebar, Nav Tab, Top Nav, Nav Expand

**Table Primitives** (bottom — specialized, only used inside AG Grid)
- Table Header Cell, Table Row Cell, AG Grid Paginator, Table Toolbar

---

## Page 3 — Examples

Full-page simulations only — no isolated component demos here.

1. **Page Layout** — full app shell: nav sidebar + top nav + optional sub-nav + content area
2. **Split Page** — two-pane resizable layout
3. **Table** — full AG Grid simulation: toolbar + header row + data rows + paginator

---

## JS Behavior

- Three `<div class="page" id="page-foundations|components|examples">` containers in `<main>`
- Three corresponding nav `<div class="sidebar-nav-page">` groups (only active one visible)
- `switchPage(pageId)` function: hides all pages/navs, shows the target, updates active tab button
- Scroll spy and active nav link highlighting continues to work within each page
- Default page on load: Foundations
- Hash-based deep linking: `#colours` resolves to Foundations page, `#button` resolves to Components, etc. — map each anchor to its page and switch automatically on load

---

## What's Removed

- SVG icon from the brand header
- "Step 1 — Variables" badge from topbar
- "Step 2 — Components" from sidebar footer
- Nav group "Page Layouts" merged into Examples page
- Nav group "Actions" reorganized (nav primitives moved to Navigation group)
