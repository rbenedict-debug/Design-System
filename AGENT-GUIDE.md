# Onflo Design System — Agent Guide

This file is loaded by Claude Code sessions in consuming projects. It defines the rules
for how the design system must be used. Read it fully before generating any UI code.

---

## CRITICAL: This package is read-only

**Never create, edit, delete, or modify any file inside `node_modules/@onflo/design-system/`.**
Never suggest that a team member modify the design system files from within their project.
All design system changes go through the Onflo Design System repository directly (owned by Rebecca).

---

## What this design system is

The Onflo Design System is the single source of truth for all UI in Onflo products.
It is built on **Angular (standalone components)** with **Angular Material** as the behavioral
foundation, and **.NET Core** on the backend. Every visual decision — color, spacing, typography,
radius, shadow, interaction states — is expressed as a CSS design token.

---

## Non-negotiable rules

### 1. Always use design tokens — no exceptions

**Never hardcode any visual value.** This includes:
- Colors: no hex (`#0B6EB4`), no rgb/rgba, no named colors (`blue`)
- Spacing: no raw `px` or `rem` values — use `--spacing-*`
- Typography: no raw font sizes — use `--ref-typescale-*` or `@include ds.type-*` mixins
- Radius: no raw `border-radius` values — use `--radius-*`
- Shadows: no raw `box-shadow` values — use `--shadow-elevation-*`

**Always use:**
```scss
// CSS custom properties (anywhere)
color: var(--color-text-primary);
background: var(--color-surface-page);
padding: var(--spacing-lg);
border-radius: var(--radius-md);

// SCSS variables (in .scss files, after @use)
@use '@onflo/design-system/tokens/scss/variables' as ds;
color: ds.$text-primary;
```

**Token reference — prefix meanings:**
| Prefix | Purpose |
|---|---|
| `--color-surface-*` | Backgrounds and fills |
| `--color-text-*` | All text |
| `--color-border-*` | Borders, dividers, focus rings |
| `--color-icon-*` | Icon colors |
| `--overlay-*` | Hover/pressed/focused interaction tints |
| `--spacing-*` | Padding, margin, gap (xs=4px, sm=8px, md=12px, lg=16px, xl=24px) |
| `--radius-*` | Border radii (sm, md, lg, full) |
| `--shadow-elevation-*` | Box shadows (1–3) |
| `--ref-typescale-*` | Typography scale (never reference directly in components — use semantic tokens) |

### 2. Always use existing components when they exist

Before writing any UI element from scratch, check the component list below.
If a matching component exists, use it — do not recreate it.

**How to import:**
```typescript
import { DsButtonComponent } from '@onflo/design-system';
import { DsInputComponent } from '@onflo/design-system';
// etc.
```

**Every component also has a CSS class API** (no Angular required):
```html
<button class="ds-button ds-button--filled">Label</button>
```

### 3. When a component does not exist

If you are helping explore a new design pattern that has no matching component:
- You **may** create a new component for that project
- You **must still use design tokens** for all visual values — no exceptions
- Note in your output that this is a candidate for the Onflo Design System
- Rebecca will evaluate it for addition to the system

### 4. Focus rings — always keyboard-only

Always use:
```scss
&:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
```
Never `outline`. Never `:focus` alone. Never `border-color` as the focus indicator.

For composite wrappers using `:focus-within`:
```scss
&:focus-within:not([data-mouse-focus]) { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
```

### 5. Dark mode

Apply `data-theme="dark"` to `<html>`. All `--color-*` tokens update automatically.
Never write separate dark-mode rules — the token system handles it.

---

## Component library

All components are Angular standalone components with a matching CSS class API.
BEM naming: `.ds-{component}`, `.ds-{component}__{element}`, `.ds-{component}--{modifier}`.

### Form inputs
| Component | Selector | Import |
|---|---|---|
| Text input | `<ds-input>` | `DsInputComponent` |
| Textarea | `<ds-textarea>` | `DsTextareaComponent` |
| Select dropdown | `<ds-select>` | `DsSelectComponent` |
| Autocomplete | `<ds-autocomplete>` | `DsAutocompleteComponent` |
| Checkbox | `<ds-checkbox>` | `DsCheckboxComponent` |
| Radio / group | `<ds-radio>`, `<ds-radio-group>` | `DsRadioComponent` |
| Toggle / switch | `<ds-toggle>` | `DsToggleComponent` |
| Date picker | `<ds-datepicker>` | `DsDatepickerComponent` |
| Date range picker | `<ds-date-range-picker>` | `DsDateRangePickerComponent` |

### Actions
| Component | Selector | Import |
|---|---|---|
| Button | `<ds-button>` | `DsButtonComponent` |
| Icon button | `<ds-icon-button>` | `DsIconButtonComponent` |
| Icon button toggle | use `ds-icon-button-toggle` class | `DsIconButtonToggleComponent` |

### Display
| Component | Selector | Import |
|---|---|---|
| Icon (Material Symbols Rounded) | `<ds-icon>` or `<span class="ds-icon">` | `DsIconComponent` |
| Badge indicator | `<ds-badge>` | `DsBadgeComponent` |
| Label (display tag) | `<ds-label>` | `DsLabelComponent` |
| Tag (removable/add/more) | `<ds-tag>` | `DsTagComponent` |
| Chip | `<ds-chip>` | `DsChipComponent` |
| Avatar | `<ds-avatar>` | `DsAvatarComponent` |
| Alert | `<ds-alert>` | `DsAlertComponent` |
| Tooltip | `[dsTooltip]` directive | `DsTooltipDirective` |
| Skeleton | `<ds-skeleton>` | `DsSkeletonComponent` |
| Spinner | `<ds-spinner>` | `DsSpinnerComponent` |
| Progress bar | `<ds-progress>` | `DsProgressComponent` |
| Divider | `<ds-divider>` | `DsDividerComponent` |

### Layout & containers
| Component | Selector | Import |
|---|---|---|
| Card (vertical) | `<ds-card>` | `DsCardComponent` |
| Card item (horizontal) | `<ds-card-item>` | `DsCardItemComponent` |
| Dialog | `<ds-dialog>` | `DsDialogComponent` |
| Modal | `<ds-modal>` | `DsModalComponent` |
| Accordion | `<ds-accordion>` | `DsAccordionComponent` |
| Hover card | `<ds-hover-card>` | `DsHoverCardComponent` |
| Save bar | `<ds-save-bar>` | `DsSaveBarComponent` |

### Navigation
| Component | Selector | Import |
|---|---|---|
| Tabs | `<ds-tabs>` + `<ds-tab>` | `DsTabsComponent` |
| Top nav bar | `<ds-top-nav>` | `DsTopNavComponent` |
| Nav tab | `<ds-nav-tab>` | `DsNavTabComponent` |
| Nav sidebar | `<ds-nav-sidebar>` | `DsNavSidebarComponent` |
| Nav button | `<ds-nav-button>` | `DsNavButtonComponent` |
| Nav expand | `<ds-nav-expand>` | `DsNavExpandComponent` |
| Sub-nav button | `<ds-subnav-button>` | `DsSubnavButtonComponent` |
| Sub-nav header | `<ds-subnav-header>` | `DsSubnavHeaderComponent` |
| Sub-nav subheader | `<ds-subnav-subheader>` | `DsSubnavSubheaderComponent` |
| Agent status | `<ds-agent-status>` | `DsAgentStatusComponent` |
| Paginator | `<ds-paginator>` | `DsPaginatorComponent` |

### Data / table
| Component | Selector | Import |
|---|---|---|
| Table header cell | `<ds-table-header-cell>` | `DsTableHeaderCellComponent` |
| Table row cell | `<ds-table-row-cell>` | `DsTableRowCellComponent` |
| Table toolbar | `<ds-table-toolbar>` | `DsTableToolbarComponent` |
| AG Grid paginator | `<ds-ag-paginator>` | `DsAgPaginatorComponent` |

### Content
| Component | Selector | Import |
|---|---|---|
| List | `<ds-list>` + `<ds-list-item>` | `DsListComponent` |
| Menu | `<ds-menu>` | `DsMenuComponent` |
| Snackbar | service | `DsSnackbarComponent` |
| Rich text editor | `<ds-rich-text-editor>` | `DsRichTextEditorComponent` |
| Search | `<ds-search>` | `DsSearchComponent` |

### Page layout patterns (CSS only — no Angular component)
| Pattern | CSS class | Use case |
|---|---|---|
| App shell | `.ds-page-layout` | Full layout: top-nav + sidebar + subnav + content |
| Split page | `.ds-split-page` | Two-panel resizable layout |

---

## Icons

Use **Material Symbols Rounded** via the `ds-icon` utility:
```html
<span class="ds-icon">search</span>               <!-- outlined, 24px -->
<span class="ds-icon ds-icon--filled">search</span> <!-- filled -->
<span class="ds-icon ds-icon--sm">close</span>      <!-- 20px -->
```
Or Angular component:
```html
<ds-icon name="search" />
<ds-icon name="bookmark" [filled]="true" size="sm" />
```

---

## CSS import in Angular projects

Two stylesheets must be included — tokens first, then components. Both are required.

**In `angular.json` styles array:**
```json
"styles": [
  "node_modules/@onflo/design-system/tokens/css/index.css",
  "node_modules/@onflo/design-system/dist/components.css",
  "src/styles.scss"
]
```

`tokens/css/index.css` — design tokens (CSS custom properties)
`dist/components.css` — global component CSS class API (`.ds-icon`, `.ds-button`, etc.)
Both are required. The components CSS must come after tokens so it can reference them.

**SCSS tokens in component stylesheets:**
```scss
@use 'node_modules/@onflo/design-system/tokens/scss/variables' as ds;
```

---

## Angular Material dependency

This design system uses Angular Material as the behavioral foundation.
Consuming projects must have Angular Material installed and `provideAnimations()` (or `provideAnimationsAsync()`) in their app config.

The design system themes Material components globally — do not apply your own Material theme. Import the design system tokens CSS before any other styles.

---

## What to check before building any UI element

1. Does this component exist in the list above? → Use it.
2. Is there a CSS class API version that fits? → Use it.
3. Are all colors/spacing/typography using tokens? → Required.
4. Is the focus ring keyboard-only via `:focus-visible`? → Required.
5. Does the component exist in Angular Material (behavior only)? → Wrap it with Onflo styles, don't re-implement the behavior.

---

## Preview reference

The design system ships a visual reference at `node_modules/@onflo/design-system/preview/index.html`.
Open it directly in a browser for a quick visual overview of available components and tokens.
This is for human reference — the source of truth for implementation is always the component source files.
