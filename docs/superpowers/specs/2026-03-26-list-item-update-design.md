# List Item Component Update — Design Spec
**Date:** 2026-03-26
**Status:** Approved

---

## Overview

Update the existing `ds-list` / `ds-list-item` component (already scaffolded in `components/list/`) to match the Figma design. The three Figma nodes provided (51964:67288, 63213:386213, 63213:386285) represent the **Default**, **Hover**, and **Pressed** interaction states of the 3-line list item variant. This is an in-place update — no new component directory is created.

---

## Figma Reference

| Node | State |
|---|---|
| 51964:67288 | Default |
| 63213:386213 | Hover |
| 63213:386285 | Pressed |

All three show: checkbox (leading) + overline + primary + secondary text (3-line) + optional trailing.

---

## Files Changed

```
components/list/_list.scss             ← update leading/trailing slots, icon color scoping
components/list/list.component.ts      ← remove icon/trailingIcon/trailingMeta inputs
components/list/list.component.html    ← replace icon spans with ng-content slots
preview/index.html                     ← update #list section demos
```

---

## SCSS: `_list.scss`

### Container (unchanged)
```scss
.ds-list {
  list-style: none;
  margin: 0; padding: 0;
  display: flex; flex-direction: column;
  background: var(--color-surface-page);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
}
```

### List item base
```scss
.ds-list-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);          // 12px
  padding: var(--spacing-md) var(--spacing-lg);  // 12px 16px
  background: transparent;
  border-bottom: 1px solid var(--color-border-subtle);
  position: relative;
  min-height: 48px;
  cursor: default;
  transition: background 0.12s ease;

  &:last-child { border-bottom: none; }
}
```

### Interactive modifier
```scss
.ds-list-item--interactive {
  cursor: pointer;

  &:hover:not(.is-disabled)  { background: var(--overlay-hovered); }
  &:focus                    { outline: none; }
  &:focus-visible            { box-shadow: inset 0 0 0 3px var(--color-border-ada-focus-ring); }
  &:active:not(.is-disabled) { background: var(--overlay-pressed); }
}
```

### Disabled state
```scss
.ds-list-item.is-disabled {
  pointer-events: none;

  .ds-list-item__primary,
  .ds-list-item__secondary,
  .ds-list-item__overline { color: var(--color-text-disabled); }

  // Icon color — scoped to ds-icon inside leading/trailing slots
  .ds-list-item__leading > .ds-icon,
  .ds-list-item__trailing > .ds-icon { color: var(--color-icon-disabled); }
}
```

### Leading slot (replaces `__leading-icon`)
```scss
.ds-list-item__leading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;

  // Color icons but not checkboxes
  > .ds-icon {
    font-size: 24px;
    width: 24px;
    height: 24px;
    color: var(--color-icon-default);
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
}
```

### Trailing slot (replaces `__trailing-icon`)
```scss
.ds-list-item__trailing {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;

  > .ds-icon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    color: var(--color-icon-subtle);
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
  }
}
```

### Content + text
```scss
.ds-list-item__content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.ds-list-item__overline {
  font-family: var(--ref-typeface-brand);
  font-size: var(--ref-typescale-label-small-size);
  font-weight: var(--ref-typeface-weight-medium);
  line-height: var(--ref-typescale-label-small-line-height);
  color: var(--color-text-secondary);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.ds-list-item__primary {
  font-family: var(--ref-typeface-brand);
  font-size: var(--ref-typescale-label-medium-size);
  font-weight: var(--ref-typeface-weight-medium);
  line-height: var(--ref-typescale-label-medium-line-height);
  color: var(--color-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-list-item__secondary {
  font-family: var(--ref-typeface-brand);
  font-size: var(--ref-typescale-label-small-size);
  font-weight: var(--ref-typeface-weight-regular);
  line-height: var(--ref-typescale-label-small-line-height);
  color: var(--color-text-secondary);
}

// 3-line: secondary wraps to 2 lines
.ds-list-item--3-lines .ds-list-item__secondary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
}
```

---

## Angular Component: `list.component.ts`

### DsListItemComponent

**Kept inputs:**
```ts
@Input() primary = '';
@Input() secondary = '';
@Input() overline = '';
@Input() interactive = false;
@Input() disabled = false;
@Input() variant: '1-line' | '2-lines' | '3-lines' = '1-line';
```

**Removed inputs:** `icon`, `trailingIcon`, `trailingMeta`

### DsListComponent
Unchanged — wrapper `<ul class="ds-list">` with `ng-content`.

---

## Template: `list.component.html`

```html
<li
  class="ds-list-item"
  [class.ds-list-item--interactive]="interactive"
  [class.ds-list-item--3-lines]="variant === '3-lines'"
  [class.is-disabled]="disabled"
  role="listitem"
  [attr.tabindex]="interactive ? 0 : null"
  [attr.aria-disabled]="disabled || null"
>
  <div class="ds-list-item__leading">
    <ng-content select="[leading]" />
  </div>
  <div class="ds-list-item__content">
    <span *ngIf="overline" class="ds-list-item__overline">{{ overline }}</span>
    <span class="ds-list-item__primary">{{ primary }}</span>
    <span *ngIf="secondary" class="ds-list-item__secondary">{{ secondary }}</span>
  </div>
  <div class="ds-list-item__trailing">
    <ng-content select="[trailing]" />
  </div>
  <ng-content />
</li>
```

**Note:** `__leading` and `__trailing` wrappers are always rendered. When no content is projected, they collapse to 0×0 because they have no intrinsic content. Consider using `@ContentChild` checks in the component to conditionally render the wrapper divs only when content is present (avoids phantom gap). This is a refinement that can be done in implementation.

---

## Preview: `preview/index.html`

Update (or add) the `#list` section. Demos to show:

| Row label | Content |
|---|---|
| 1-line | Leading icon (`person`), primary text only |
| 2-line | Leading icon (`person`), primary + secondary |
| 3-line with overline | Leading checkbox, overline + primary + secondary (2 lines) — matches Figma |
| Interactive | `--interactive` modifier, hover/focus/pressed observable |
| Disabled | `.is-disabled` on a 2-line item with leading icon |
| Text only | No leading/trailing, primary text only |

**Trailing slot** is not featured in preview (lower use case per design decision).

---

## Consumer Usage Examples

```html
<!-- Icon leading (nav list) -->
<ds-list [interactive]="true">
  <ds-list-item primary="Settings" [interactive]="true">
    <span leading class="ds-icon">settings</span>
  </ds-list-item>
  <ds-list-item primary="Profile" [interactive]="true">
    <span leading class="ds-icon">person</span>
  </ds-list-item>
</ds-list>

<!-- Checkbox leading (selection list) -->
<ds-list>
  <ds-list-item
    overline="Category"
    primary="Alice Johnson"
    secondary="alice@company.com"
    variant="3-lines"
  >
    <ds-checkbox leading aria-label="Select Alice Johnson" />
  </ds-list-item>
</ds-list>

<!-- Text only -->
<ds-list>
  <ds-list-item primary="Simple label" />
</ds-list>
```

---

## ADA Notes

- Interactive items: `tabindex="0"`, keyboard operable, `:focus-visible` ring (`inset 0 0 0 3px var(--color-border-ada-focus-ring)`)
- Disabled: `aria-disabled="true"` + `pointer-events: none`
- Checkbox in leading slot: caller is responsible for `aria-label` on the checkbox (as per `ds-checkbox` spec)
- No `role="list"` / `role="listitem"` changes needed — already present

---

## CLAUDE.md Update

The `ds-list` entry in the component registry needs the leading/trailing slot API documented.
