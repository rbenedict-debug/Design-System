# List Item Component Update — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the existing `ds-list` / `ds-list-item` component from string-based icon inputs to Angular content projection slots, fix interaction states, and add a full preview section to `preview/index.html`.

**Architecture:** In-place update of 3 existing files (`_list.scss`, `list.component.ts`, `list.component.html`) plus `preview/index.html`. Leading and trailing slots use `ng-content select="[leading]"` / `select="[trailing]"` with `@ContentChild` guards to conditionally render wrappers only when content is projected. No new files created.

**Tech Stack:** Angular 17+ (standalone, `@if` control flow), SCSS with design tokens, plain HTML class API for preview.

**Spec:** `docs/superpowers/specs/2026-03-26-list-item-update-design.md`

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `components/list/_list.scss` | Modify | Source SCSS — replace `__leading-icon`/`__trailing-icon`/`__trailing-meta` with `__leading`/`__trailing` flex containers; fix focus ring; update disabled state |
| `components/list/list.component.ts` | Modify | Remove `icon`/`trailingIcon`/`trailingMeta` inputs; add `@ContentChild` guards + `ngAfterContentInit` + `ChangeDetectorRef`; remove `CommonModule` |
| `components/list/list.component.html` | Modify | Replace `*ngIf` + icon spans with `@if` + `ng-content` slots |
| `preview/index.html` | Modify | Update inline CSS block (lines ~1730–1748); add sidebar nav link; add `#list` HTML section after `#search` |
| `CLAUDE.md` | Modify | Add list item slot API to component registry entry |

---

## Task 1: Update `_list.scss`

**Files:**
- Modify: `components/list/_list.scss`

- [ ] **Step 1: Replace the entire file with the updated SCSS**

```scss
// ============================================================
// Onflo Design System — List Component
// ============================================================
//
// Based on Angular Material mat-list / mat-nav-list / mat-list-item.
// Import MatListModule in your Angular module.
//
// Usage (HTML class API):
//   <ul class="ds-list" role="list">
//     <li class="ds-list-item" role="listitem">
//       <div class="ds-list-item__leading">
//         <span class="ds-icon">person</span>
//       </div>
//       <div class="ds-list-item__content">
//         <span class="ds-list-item__overline">Overline</span>
//         <span class="ds-list-item__primary">Primary text</span>
//         <span class="ds-list-item__secondary">Supporting text</span>
//       </div>
//       <div class="ds-list-item__trailing">
//         <span class="ds-icon ds-icon--sm">chevron_right</span>
//       </div>
//     </li>
//   </ul>
//
// Variants:    1-line | 2-lines | 3-lines (.ds-list-item--3-lines)
// Interactive: add .ds-list-item--interactive for hover/focus/pressed states
// States:      default, hover, focus, pressed, disabled (.is-disabled)
// ============================================================

// ── List container ────────────────────────────────────────────────────────────

.ds-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: var(--color-surface-page);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
}

// ── List item ─────────────────────────────────────────────────────────────────

.ds-list-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: transparent;
  border-bottom: 1px solid var(--color-border-subtle);
  position: relative;
  min-height: 48px;
  cursor: default;
  transition: background 0.12s ease;

  &:last-child { border-bottom: none; }

  // Interactive list item (nav list, menu-style)
  &--interactive {
    cursor: pointer;

    &:hover:not(.is-disabled)   { background: var(--overlay-hovered); }
    &:focus                     { outline: none; }
    &:focus-visible             { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
    &:active:not(.is-disabled)  { background: var(--overlay-pressed); }
  }

  // Disabled
  &.is-disabled {
    pointer-events: none;

    .ds-list-item__primary,
    .ds-list-item__secondary,
    .ds-list-item__overline     { color: var(--color-text-disabled); }

    .ds-list-item__leading > .ds-icon,
    .ds-list-item__trailing > .ds-icon { color: var(--color-icon-disabled); }
  }

  // ── Leading slot ────────────────────────────────────────────────────────────

  &__leading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    // No fixed width — .ds-icon owns 24px; ds-checkbox touch target is self-sized (42px)

    > .ds-icon {
      color: var(--color-icon-default);
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  }

  // ── Content ─────────────────────────────────────────────────────────────────

  &__content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  &__overline {
    font-family: var(--ref-typeface-brand);
    font-size: var(--ref-typescale-label-small-size);
    font-weight: var(--ref-typeface-weight-medium);
    line-height: var(--ref-typescale-label-small-line-height);
    color: var(--color-text-secondary);
    letter-spacing: var(--ref-typescale-label-small-tracking, 0.06em);
    text-transform: uppercase;
  }

  &__primary {
    font-family: var(--ref-typeface-brand);
    font-size: var(--ref-typescale-label-medium-size);
    font-weight: var(--ref-typeface-weight-medium);
    line-height: var(--ref-typescale-label-medium-line-height);
    color: var(--color-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__secondary {
    font-family: var(--ref-typeface-brand);
    font-size: var(--ref-typescale-label-small-size);
    font-weight: var(--ref-typeface-weight-regular);
    line-height: var(--ref-typescale-label-small-line-height);
    color: var(--color-text-secondary);
  }

  // 3-line variant: secondary wraps to 2 lines
  &--3-lines &__secondary {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
  }

  // ── Trailing slot ────────────────────────────────────────────────────────────

  &__trailing {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-left: auto;

    > .ds-icon {
      color: var(--color-icon-subtle);
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
    }
  }
}
```

- [ ] **Step 2: Verify no compile errors by opening `preview/index.html` in a browser**

The SCSS will be updated to the preview in a later task. Just ensure the file is syntactically clean (no obvious typos).

---

## Task 2: Update `list.component.ts`

**Files:**
- Modify: `components/list/list.component.ts`

- [ ] **Step 1: Replace the entire file with the updated component**

```typescript
/**
 * ds-list / ds-list-item
 *
 * Based on Angular Material mat-list / mat-list-item.
 *
 * Leading and trailing slots accept any projected content via attribute selectors:
 *   [leading]  — leading icon, checkbox, avatar, etc.
 *   [trailing] — trailing icon, chevron, etc.
 *
 * @example
 * <!-- Icon leading (nav / interactive list) -->
 * <ds-list>
 *   <ds-list-item primary="Settings" [interactive]="true">
 *     <span leading class="ds-icon">settings</span>
 *   </ds-list-item>
 * </ds-list>
 *
 * <!-- Checkbox leading (selection list) -->
 * <ds-list>
 *   <ds-list-item overline="Team" primary="Alice Johnson" secondary="alice@co.com" variant="3-lines">
 *     <ds-checkbox leading aria-label="Select Alice Johnson" />
 *   </ds-list-item>
 * </ds-list>
 *
 * <!-- Text only -->
 * <ds-list>
 *   <ds-list-item primary="Simple item" />
 * </ds-list>
 */

import {
  Component,
  Input,
  ContentChild,
  ElementRef,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'ds-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListItemComponent implements AfterContentInit {
  @Input() primary = '';
  @Input() secondary = '';
  @Input() overline = '';
  @Input() interactive = false;
  @Input() disabled = false;
  /** '1-line' | '2-lines' | '3-lines' */
  @Input() variant: '1-line' | '2-lines' | '3-lines' = '1-line';

  @ContentChild('[leading]', { static: false }) private _leadingRef?: ElementRef;
  @ContentChild('[trailing]', { static: false }) private _trailingRef?: ElementRef;

  hasLeading = false;
  hasTrailing = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.hasLeading = !!this._leadingRef;
    this.hasTrailing = !!this._trailingRef;
    this.cdr.markForCheck();
  }
}

@Component({
  selector: 'ds-list',
  standalone: true,
  imports: [],
  template: `<ul class="ds-list" role="list"><ng-content /></ul>`,
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListComponent {}
```

---

## Task 3: Update `list.component.html`

**Files:**
- Modify: `components/list/list.component.html`

- [ ] **Step 1: Replace the entire template with the updated version**

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
  @if (hasLeading) {
    <div class="ds-list-item__leading">
      <ng-content select="[leading]" />
    </div>
  }
  <div class="ds-list-item__content">
    @if (overline) {
      <span class="ds-list-item__overline">{{ overline }}</span>
    }
    <span class="ds-list-item__primary">{{ primary }}</span>
    @if (secondary) {
      <span class="ds-list-item__secondary">{{ secondary }}</span>
    }
  </div>
  @if (hasTrailing) {
    <div class="ds-list-item__trailing">
      <ng-content select="[trailing]" />
    </div>
  }
  <ng-content />
</li>
```

---

## Task 4: Update `preview/index.html` — CSS block

**Files:**
- Modify: `preview/index.html` lines ~1730–1748

The inline CSS for the list component lives between the comment `/* LIST */` and the next component block. Replace the old rules (which use `__leading-icon`, `__trailing-icon`, `__trailing-meta`, and the inset focus ring) with the updated ruleset.

- [ ] **Step 1: Find the existing list CSS block**

It starts around line 1730 with the comment `LIST  (ds-list / ds-list-item)` and runs through ~line 1748 (`__trailing-meta`).

- [ ] **Step 2: Replace the list CSS block with the updated rules**

Find this exact block (the comment through `__trailing-meta`):
```css
       LIST  (ds-list / ds-list-item)
       Source: components/list/_list.scss
    .ds-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; background: var(--color-surface-page); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border-subtle); }
    .ds-list-item { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md) var(--spacing-lg); background: transparent; border-bottom: 1px solid var(--color-border-subtle); position: relative; min-height: 48px; cursor: default; transition: background 0.12s ease; }
    .ds-list-item:last-child { border-bottom: none; }
    .ds-list-item--interactive { cursor: pointer; }
    .ds-list-item--interactive:hover:not(.is-disabled) { background: var(--overlay-hovered); }
    .ds-list-item--interactive:focus { outline: none; }
    .ds-list-item--interactive:focus-visible { box-shadow: inset 0 0 0 3px var(--color-border-ada-focus-ring); }
    .ds-list-item.is-disabled { pointer-events: none; }
    .ds-list-item.is-disabled .ds-list-item__primary, .ds-list-item.is-disabled .ds-list-item__secondary { color: var(--color-text-disabled); }
    .ds-list-item__leading-icon { font-family: 'Material Symbols Rounded'; font-size: 24px; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: var(--color-icon-default); flex-shrink: 0; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    .ds-list-item__content { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 1px; }
    .ds-list-item__overline { font-size: var(--ref-typescale-label-small-size); font-weight: var(--ref-typeface-weight-medium); color: var(--color-text-secondary); letter-spacing: 0.06em; text-transform: uppercase; font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; }
    .ds-list-item__primary { font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; font-size: var(--ref-typescale-label-medium-size); font-weight: var(--ref-typeface-weight-medium); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ds-list-item__secondary { font-size: var(--ref-typescale-label-small-size); color: var(--color-text-secondary); font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; }
    .ds-list-item__trailing-icon { font-family: 'Material Symbols Rounded'; font-size: 20px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: var(--color-icon-subtle); flex-shrink: 0; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20; }
    .ds-list-item__trailing-meta { font-size: var(--ref-typescale-label-small-size); color: var(--color-text-secondary); white-space: nowrap; flex-shrink: 0; }
```

Replace with:
```css
       LIST  (ds-list / ds-list-item)
       Source: components/list/_list.scss
    .ds-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; background: var(--color-surface-page); border-radius: var(--radius-md); overflow: hidden; border: 1px solid var(--color-border-subtle); }
    .ds-list-item { display: flex; align-items: center; gap: var(--spacing-md); padding: var(--spacing-md) var(--spacing-lg); background: transparent; border-bottom: 1px solid var(--color-border-subtle); position: relative; min-height: 48px; cursor: default; transition: background 0.12s ease; }
    .ds-list-item:last-child { border-bottom: none; }
    .ds-list-item--interactive { cursor: pointer; }
    .ds-list-item--interactive:hover:not(.is-disabled) { background: var(--overlay-hovered); }
    .ds-list-item--interactive:focus { outline: none; }
    .ds-list-item--interactive:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
    .ds-list-item--interactive:active:not(.is-disabled) { background: var(--overlay-pressed); }
    .ds-list-item.is-disabled { pointer-events: none; }
    .ds-list-item.is-disabled .ds-list-item__primary, .ds-list-item.is-disabled .ds-list-item__secondary, .ds-list-item.is-disabled .ds-list-item__overline { color: var(--color-text-disabled); }
    .ds-list-item.is-disabled .ds-list-item__leading > .ds-icon, .ds-list-item.is-disabled .ds-list-item__trailing > .ds-icon { color: var(--color-icon-disabled); }
    .ds-list-item__leading { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .ds-list-item__leading > .ds-icon { color: var(--color-icon-default); font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    .ds-list-item__content { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .ds-list-item__overline { font-family: var(--ref-typeface-brand); font-size: var(--ref-typescale-label-small-size); font-weight: var(--ref-typeface-weight-medium); line-height: var(--ref-typescale-label-small-line-height); color: var(--color-text-secondary); letter-spacing: 0.06em; text-transform: uppercase; }
    .ds-list-item__primary { font-family: var(--ref-typeface-brand); font-size: var(--ref-typescale-label-medium-size); font-weight: var(--ref-typeface-weight-medium); line-height: var(--ref-typescale-label-medium-line-height); color: var(--color-text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ds-list-item__secondary { font-family: var(--ref-typeface-brand); font-size: var(--ref-typescale-label-small-size); font-weight: var(--ref-typeface-weight-regular); line-height: var(--ref-typescale-label-small-line-height); color: var(--color-text-secondary); }
    .ds-list-item--3-lines .ds-list-item__secondary { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; white-space: normal; }
    .ds-list-item__trailing { display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-left: auto; }
    .ds-list-item__trailing > .ds-icon { color: var(--color-icon-subtle); font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20; }
```

---

## Task 5: Update `preview/index.html` — sidebar nav link

**Files:**
- Modify: `preview/index.html` line ~2012

- [ ] **Step 1: Add the List Item nav link in the Display group**

Find:
```html
      <a class="nav-link" href="#tabs" onclick="setActive(this)"><span class="nav-dot"></span>Tabs</a>
```

Replace with:
```html
      <a class="nav-link" href="#tabs" onclick="setActive(this)"><span class="nav-dot"></span>Tabs</a>
      <a class="nav-link" href="#list" onclick="setActive(this)"><span class="nav-dot"></span>List Item</a>
```

---

## Task 6: Update `preview/index.html` — HTML section

**Files:**
- Modify: `preview/index.html` — insert after the `#search` section closing tag (around line 4245)

The `#list` section must be inserted between the closing `</section>` of `#search` and the opening `<!-- TABLE -->` comment.

- [ ] **Step 1: Insert the list section HTML**

Find this exact text:
```html
      </section>

      <!-- ── TABLE — FULL SIMULATION ─────────────────────────────────────────── -->
      <section class="section" id="table">
```

Insert before it:
```html
      <!-- ── List Item ────────────────────────────────────────────────────────── -->
      <hr class="divider" />
      <section class="section" id="list">
        <div class="section-header">
          <h2 class="section-title">List Item</h2>
          <span class="section-source">components/list/_list.scss</span>
        </div>
        <p class="section-desc">A structured list of items. Supports leading/trailing content slots (icon, checkbox, avatar), optional overline, primary text, and supporting text. Add <code>.ds-list-item--interactive</code> for hover/focus/pressed states (used inside menus and nav lists). Checkbox-only lists omit the interactive modifier.</p>
        <div class="component-demo">

          <!-- HTML class API: trailing icon example (fulfills CSS API requirement) -->
          <div class="demo-row">
            <div class="demo-row-label">HTML class API</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">person</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Alice Johnson</span>
                    <span class="ds-list-item__secondary">alice@company.com</span>
                  </div>
                  <div class="ds-list-item__trailing">
                    <span class="ds-icon ds-icon--sm">chevron_right</span>
                  </div>
                </li>
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">person</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Bob Smith</span>
                    <span class="ds-list-item__secondary">bob@company.com</span>
                  </div>
                  <div class="ds-list-item__trailing">
                    <span class="ds-icon ds-icon--sm">chevron_right</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 1-line: icon leading -->
          <div class="demo-row">
            <div class="demo-row-label">1-line</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">settings</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Settings</span>
                  </div>
                </li>
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">notifications</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Notifications</span>
                  </div>
                </li>
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">person</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Profile</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 2-line: icon leading + secondary text -->
          <div class="demo-row">
            <div class="demo-row-label">2-line</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">person</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Alice Johnson</span>
                    <span class="ds-list-item__secondary">alice@company.com</span>
                  </div>
                </li>
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">person</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Bob Smith</span>
                    <span class="ds-list-item__secondary">bob@company.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- 3-line with overline: checkbox leading — matches Figma -->
          <div class="demo-row">
            <div class="demo-row-label">3-line + overline (checkbox)</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item ds-list-item--3-lines" role="listitem">
                  <div class="ds-list-item__leading">
                    <label class="ds-checkbox" style="margin: 0;">
                      <input type="checkbox" class="ds-checkbox__input" aria-label="Select Alice Johnson" />
                      <span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span>
                    </label>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__overline">Team</span>
                    <span class="ds-list-item__primary">Alice Johnson</span>
                    <span class="ds-list-item__secondary">Product designer working on the Onflo design system and component library.</span>
                  </div>
                </li>
                <li class="ds-list-item ds-list-item--3-lines" role="listitem">
                  <div class="ds-list-item__leading">
                    <label class="ds-checkbox" style="margin: 0;">
                      <input type="checkbox" class="ds-checkbox__input" aria-label="Select Bob Smith" checked />
                      <span class="ds-checkbox__touch"><span class="ds-checkbox__box"></span></span>
                    </label>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__overline">Team</span>
                    <span class="ds-list-item__primary">Bob Smith</span>
                    <span class="ds-list-item__secondary">Senior frontend engineer focused on Angular architecture and design systems.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Interactive: hover/focus/pressed visible -->
          <div class="demo-row">
            <div class="demo-row-label">Interactive (hover me)</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item ds-list-item--interactive" role="listitem" tabindex="0">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">inbox</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Inbox</span>
                  </div>
                </li>
                <li class="ds-list-item ds-list-item--interactive" role="listitem" tabindex="0">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">send</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Sent</span>
                  </div>
                </li>
                <li class="ds-list-item ds-list-item--interactive" role="listitem" tabindex="0">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">delete</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Trash</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Disabled -->
          <div class="demo-row">
            <div class="demo-row-label">Disabled</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item is-disabled" role="listitem" aria-disabled="true">
                  <div class="ds-list-item__leading">
                    <span class="ds-icon">person</span>
                  </div>
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Alice Johnson</span>
                    <span class="ds-list-item__secondary">alice@company.com</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Text only: no leading or trailing -->
          <div class="demo-row">
            <div class="demo-row-label">Text only</div>
            <div class="demo-row-items" style="flex-direction: column; align-items: stretch; width: 360px;">
              <ul class="ds-list" role="list">
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">First item</span>
                  </div>
                </li>
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Second item</span>
                  </div>
                </li>
                <li class="ds-list-item" role="listitem">
                  <div class="ds-list-item__content">
                    <span class="ds-list-item__primary">Third item</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>

```

---

## Task 7: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add list item spec to CLAUDE.md under Component Specifications**

Find:
```markdown
### Label (`ds-label`)
```

Insert before it:

```markdown
### List (`ds-list` + `ds-list-item`)
- **Container** (`ds-list`): `<ul role="list">` wrapper — `border-radius: --radius-md`, 1px `--color-border-subtle` border, `overflow: hidden`
- **Item** (`ds-list-item`): flex row, `gap: --spacing-md`, `padding: --spacing-md --spacing-lg`, `min-height: 48px`
- **Text slots** (inputs): `primary` (required), `secondary` (optional), `overline` (optional, uppercase label-small)
- **Variants**: `1-line` (default) | `2-lines` | `3-lines` — set via `[variant]` input; `--3-lines` modifier clamps secondary to 2 lines via `-webkit-line-clamp: 2`
- **Leading slot**: `<ng-content select="[leading]">` — place `[leading]` attribute on projected content (`<span leading class="ds-icon">`, `<ds-checkbox leading />`, etc.)
- **Trailing slot**: `<ng-content select="[trailing]">` — same pattern; use `ds-icon--sm` for trailing chevrons
- **Slot guards**: `@ContentChild('[leading]')` + `@ContentChild('[trailing]')` with `{static: false}` — wrappers only render when content is projected (prevents phantom flex gaps)
- **Interactive modifier**: `ds-list-item--interactive` — adds hover (`--overlay-hovered`), pressed (`--overlay-pressed`), and `:focus-visible` ring. Use in menus, nav lists. Do NOT use in pure selection lists (checkbox-only).
- **Disabled**: `.is-disabled` — `pointer-events: none`; text → `--color-text-disabled`; icons → `--color-icon-disabled`
- **Focus ring**: `:focus-visible` only — `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` (outset, keyboard-only, standard ADA pattern)
- **ADA**: `role="listitem"` on items; `tabindex="0"` + `aria-disabled` on interactive/disabled items; checkbox in leading slot must have `aria-label` (caller responsibility)
- **No Angular Material base** for list item itself — custom component (Angular Material `MatListModule` optional for semantic nav lists)

```

---

## Task 8: Commit

- [ ] **Step 1: Stage and commit all changes**

```bash
git add components/list/_list.scss \
        components/list/list.component.ts \
        components/list/list.component.html \
        preview/index.html \
        CLAUDE.md
git commit -m "Update ds-list-item: content projection slots, fix focus ring, add preview section"
```

---

## Visual Verification Checklist

After the commit, open `preview/index.html` in a browser and verify:

- [ ] List Item nav link appears in the sidebar under "Display"
- [ ] Clicking it scrolls to the `#list` section
- [ ] HTML class API row: 2-line items with person icon and chevron trailing icon render correctly
- [ ] 1-line row: 3 items with icons, no secondary text
- [ ] 2-line row: icon + primary + secondary
- [ ] 3-line + overline row: checkbox leading, overline text, primary, 2-line secondary (wraps)
- [ ] Interactive row: hover shows `--overlay-hovered` background; Tab to item shows outset focus ring (3px, ADA blue); click shows `--overlay-pressed`
- [ ] Disabled row: primary + secondary + icon all appear in disabled color
- [ ] Text-only row: no leading/trailing, no phantom gap
- [ ] No `__leading-icon`, `__trailing-icon`, or `__trailing-meta` class references remain
