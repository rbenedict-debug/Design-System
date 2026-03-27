# Text Fields Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align ds-select and ds-textarea visually and behaviorally with ds-input, enforce keyboard-only focus rings across all three, group them together in the preview, and harden the CLAUDE.md ADA rules so this issue cannot recur.

**Architecture:** All three components share the same Figma visual design (42px field, same label/helper/error token usage). In Angular they map to different Angular Material modules but use the same `data-mouse-focus` suppression pattern for focus ring management. The preview page groups them under a "Text Fields" nav sub-label with adjacent sections and shared context about the Angular Material split.

**Tech Stack:** Angular 17 standalone components, SCSS with CSS custom properties, vanilla JS for preview interactivity, HTML preview page.

---

## Files Modified

| File | Change |
|---|---|
| `components/select/_select.scss` | Label weight, helper text tokens, error state (no red label, error icon), keyboard-only focus ring |
| `components/select/select.component.ts` | Add `data-mouse-focus` suppression HostListeners |
| `components/select/select.component.html` | Add error icon element, hide arrow in error, add `aria-describedby` |
| `components/textarea/_textarea.scss` | Label weight, helper text tokens, error state (no red label), keyboard-only focus ring |
| `components/textarea/textarea.component.ts` | Add `data-mouse-focus` suppression HostListeners |
| `components/textarea/textarea.component.html` | No change needed — `aria-describedby` already implemented |
| `preview/index.html` | Remove trailing-arrow input demo; move select+textarea sections to after input; add nav sub-label; update inline CSS; extend JS to cover select+textarea |
| `CLAUDE.md` | Harden ADA focus ring rules; update textarea/select specs |

---

## Task 1: Fix `_select.scss` — style alignment + keyboard-only focus ring

**Files:**
- Modify: `components/select/_select.scss`

- [ ] **Step 1: Update label weight**

In `_select.scss`, change `&__label` font-weight from `--ref-typeface-weight-medium` to `--ref-typescale-label-medium-weight-prominent` to match ds-input.

```scss
&__label {
  font-family: var(--ref-typeface-brand);
  font-size: var(--ref-typescale-label-medium-size);
  font-weight: var(--ref-typescale-label-medium-weight-prominent);
  line-height: var(--ref-typescale-label-medium-line-height);
  color: var(--color-text-secondary);
  user-select: none;
}
```

- [ ] **Step 2: Update helper text typography**

Change `&__helper` to use body-small tokens and the plain typeface, matching ds-input exactly:

```scss
&__helper {
  font-family: var(--ref-typeface-plain);
  font-size: var(--ref-typescale-body-small-size);
  line-height: var(--ref-typescale-body-small-line-height);
  color: var(--color-text-secondary);
}
```

- [ ] **Step 3: Fix focus ring — keyboard-only**

Replace the existing unconditional `:focus-within` box-shadow rule:

```scss
// REMOVE this:
&:focus-within &__field {
  border-color: var(--color-border-input-active);
  box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring);
}

// REPLACE with these two rules:
&:focus-within &__field {
  border-color: var(--color-border-input-active);
}

&:focus-within:not([data-mouse-focus]) &__field {
  box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring);
}
```

- [ ] **Step 4: Add `&__error-icon` class (above the `.is-error` block)**

Add this new rule just before the `.is-error` block:

```scss
&__error-icon {
  color: var(--color-icon-error);
  flex-shrink: 0;
  pointer-events: none;
}
```

- [ ] **Step 5: Replace the ENTIRE existing `.is-error` block**

Find and delete the full existing `.is-error` block in `_select.scss` (it currently sets label red, changes arrow color, and has no `data-mouse-focus` guard). Replace it entirely with:

```scss
&.is-error {
  .ds-select__field   { border-color: var(--color-border-input-error); }
  .ds-select__helper  { color: var(--color-text-error); }
  .ds-select__arrow   { display: none; }
  // NOTE: label color intentionally NOT set — label stays --color-text-secondary

  &:focus-within .ds-select__field {
    border-color: var(--color-border-input-error);
  }

  &:focus-within:not([data-mouse-focus]) .ds-select__field {
    box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring);
  }
}
```

- [ ] **Step 6: Scope the focus arrow colour to non-error state**

Find the existing rule:
```scss
&:focus-within &__arrow {
  color: var(--color-icon-brand);
}
```
Replace it with:
```scss
&:focus-within:not(.is-error) &__arrow {
  color: var(--color-icon-brand);
}
```

- [ ] **Step 7: Commit**

```bash
git add components/select/_select.scss
git commit -m "Fix ds-select — keyboard-only focus ring, align label/helper/error to ds-input"
```

---

## Task 2: Fix `select.component.ts` — add mouse-focus suppression

**Files:**
- Modify: `components/select/select.component.ts`

- [ ] **Step 1: Add ElementRef import and HostListener**

Add `ElementRef` and `HostListener` to the Angular core import. Add the same suppression pattern used in `input.component.ts`:

```typescript
import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// ... DsSelectOption interface unchanged ...

@Component({
  selector: 'ds-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class DsSelectComponent {
  private _lastWasMouse = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('mousedown')
  @HostListener('touchstart')
  onPointerDown(): void { this._lastWasMouse = true; }

  @HostListener('keydown')
  onKeyDown(): void { this._lastWasMouse = false; }

  @HostListener('focusin')
  onFocusIn(): void {
    if (this._lastWasMouse) {
      this.elementRef.nativeElement.setAttribute('data-mouse-focus', '');
    }
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.elementRef.nativeElement.removeAttribute('data-mouse-focus');
    this._lastWasMouse = false;
  }

  // ... all existing @Input() / @Output() properties unchanged ...
}
```

- [ ] **Step 2: Add selectHelperId getter**

Add a getter for the helper element ID so the HTML can reference it in `aria-describedby`:

```typescript
get selectHelperId(): string {
  return this.selectId + '-helper';
}
```

- [ ] **Step 3: Commit**

```bash
git add components/select/select.component.ts
git commit -m "Add mouse-focus suppression to DsSelectComponent"
```

---

## Task 3: Fix `select.component.html` — error icon + aria-describedby

**Files:**
- Modify: `components/select/select.component.html`

- [ ] **Step 1: Add aria-describedby to select control**

Note: `selectHelperId` getter was added in Task 2 Step 2 — it is already available.

```html
<select
  [id]="selectId"
  class="ds-select__control"
  [value]="value"
  [disabled]="disabled"
  [required]="required"
  [attr.aria-invalid]="isError ? 'true' : null"
  [attr.aria-describedby]="(helperText || errorText) ? selectHelperId : null"
  (change)="onChange($event)"
>
```

- [ ] **Step 2: Replace static arrow with conditional arrow + error icon**

```html
<div class="ds-select__field">
  <select ...>...</select>

  <!-- Arrow — hidden in error state -->
  <span *ngIf="!isError" class="ds-icon ds-icon--sm ds-select__arrow" aria-hidden="true">expand_more</span>

  <!-- Error icon — shown in error state (matches ds-input pattern) -->
  <span
    *ngIf="isError && !disabled"
    class="ds-icon ds-icon--sm ds-icon--filled ds-select__error-icon"
    aria-hidden="true"
  >error</span>
</div>
```

- [ ] **Step 3: Add id to helper span**

```html
<span
  *ngIf="displayHelper"
  class="ds-select__helper"
  [id]="selectHelperId"
  [attr.role]="isError ? 'alert' : null"
>{{ displayHelper }}</span>
```

- [ ] **Step 4: Commit**

```bash
git add components/select/select.component.html
git commit -m "Add error icon and aria-describedby to ds-select template"
```

---

## Task 4: Fix `_textarea.scss` — style alignment + keyboard-only focus ring

**Files:**
- Modify: `components/textarea/_textarea.scss`

- [ ] **Step 1: Update label weight**

```scss
&__label {
  font-family: var(--ref-typeface-brand);
  font-size: var(--ref-typescale-label-medium-size);
  font-weight: var(--ref-typescale-label-medium-weight-prominent);
  line-height: var(--ref-typescale-label-medium-line-height);
  color: var(--color-text-secondary);
  user-select: none;
}
```

- [ ] **Step 2: Update helper text typography**

```scss
&__helper {
  font-family: var(--ref-typeface-plain);
  font-size: var(--ref-typescale-body-small-size);
  line-height: var(--ref-typescale-body-small-line-height);
  color: var(--color-text-secondary);
}
```

- [ ] **Step 3: Fix focus ring — keyboard-only**

```scss
// REMOVE:
&:focus-within &__field {
  border-color: var(--color-border-input-active);
  box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring);
}

// REPLACE with:
&:focus-within &__field {
  border-color: var(--color-border-input-active);
}

&:focus-within:not([data-mouse-focus]) &__field {
  box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring);
}
```

- [ ] **Step 4: Fix error state — remove red label**

```scss
&.is-error {
  .ds-textarea__field   { border-color: var(--color-border-input-error); }
  // REMOVE: .ds-textarea__label { color: var(--color-text-error); }  ← label must NOT turn red
  .ds-textarea__helper  { color: var(--color-text-error); }

  &:focus-within .ds-textarea__field {
    border-color: var(--color-border-input-error);
  }

  &:focus-within:not([data-mouse-focus]) .ds-textarea__field {
    box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring);
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add components/textarea/_textarea.scss
git commit -m "Fix ds-textarea — keyboard-only focus ring, align label/helper/error to ds-input"
```

---

## Task 5: Fix `textarea.component.ts` — add mouse-focus suppression

Note: `textarea.component.html` requires **no changes** — it already has `aria-describedby` and `[id]` on the helper span (lines 19 and 28). Only the `.ts` file changes in this task.

**Files:**
- Modify: `components/textarea/textarea.component.ts`

- [ ] **Step 1: Add ElementRef, HostListener, and suppression pattern**

```typescript
import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
})
export class DsTextareaComponent {
  private _lastWasMouse = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('mousedown')
  @HostListener('touchstart')
  onPointerDown(): void { this._lastWasMouse = true; }

  @HostListener('keydown')
  onKeyDown(): void { this._lastWasMouse = false; }

  @HostListener('focusin')
  onFocusIn(): void {
    if (this._lastWasMouse) {
      this.elementRef.nativeElement.setAttribute('data-mouse-focus', '');
    }
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this.elementRef.nativeElement.removeAttribute('data-mouse-focus');
    this._lastWasMouse = false;
  }

  // ... all existing @Input() / @Output() properties unchanged ...
}
```

- [ ] **Step 2: Commit**

```bash
git add components/textarea/textarea.component.ts
git commit -m "Add mouse-focus suppression to DsTextareaComponent"
```

---

## Task 6: Update `preview/index.html` — structure, CSS, and JS

This is the largest task. Work through it in sub-steps.

**Files:**
- Modify: `preview/index.html`

### 6A — Remove trailing-arrow input demo row

- [ ] **Step 1: Find and remove the "Trailing icon" demo row**

In the `#input` section, locate the demo row labelled `Trailing icon` (the two `arrow_drop_down` button demos, around line 2806–2833). Delete the entire `<div class="demo-row">` block for it — from the opening `<div class="demo-row">` through its closing `</div>`.

Also find the next demo row with label text `No trailing icon` and rename the label:
- Old: `<div class="demo-row-label">No trailing icon</div>`
- New: `<div class="demo-row-label">Default variants</div>`

### 6B — Update input section description

- [ ] **Step 2: Update the input section header description**

Replace the current section description with one that introduces the text fields family:

```html
<p class="section-desc">
  <strong>Text Fields — Input, Select, and Textarea</strong> share the same visual design in Figma: 42px field height (textarea: min-height, resizable), same label, helper, and error token usage.
  In Angular they map to different Angular Material modules:
  <code>MatInputModule</code> (input), <code>MatSelectModule</code> (select), and <code>MatInputModule</code> with <code>&lt;textarea&gt;</code> (textarea).
  <br>This section shows all three together. Use <code>class="ds-input"</code>, <code>class="ds-select"</code>, or <code>class="ds-textarea"</code> directly, or the corresponding Angular component.
  Source: <code>components/input/</code>, <code>components/select/</code>, <code>components/textarea/</code>
</p>
```

### 6C — Move select and textarea sections to after input

- [ ] **Step 3: Cut the select `<section>` block**

Find the `<section class="section" id="select">` block (currently between tooltip and avatar, ~line 3619) and its preceding `<hr class="divider" />`. Cut the entire block.

- [ ] **Step 4: Paste select section immediately after the input section**

Paste it (with its `<hr>`) right after the closing `</section>` of `#input`. The section header description for select should be updated to:

```html
<p class="section-desc">
  Native <code>&lt;select&gt;</code> wrapper — same 42px height and visual treatment as Input Field.
  Angular Material: <code>MatSelectModule</code>. Use <code>class="ds-select"</code> or <code>&lt;ds-select&gt;</code>.
  Source: <code>components/select/_select.scss</code>
</p>
```

- [ ] **Step 5: Cut and move textarea section**

Find the `<section class="section" id="textarea">` block (currently right after select in its original location). Cut it and paste it immediately after the newly placed select section.

Textarea section description:

```html
<p class="section-desc">
  Multi-line text input — resizable vertically, no fixed height. Same visual treatment as Input Field.
  Angular Material: <code>MatInputModule</code> with <code>&lt;textarea&gt;</code>. Use <code>class="ds-textarea"</code> or <code>&lt;ds-textarea&gt;</code>.
  Source: <code>components/textarea/_textarea.scss</code>
</p>
```

### 6D — Update the inline CSS for select and textarea

- [ ] **Step 6: Update ds-select inline CSS**

Find the `ds-select` CSS block in the `<style>` section. Update it to match the corrected `_select.scss`:

Key changes to make in the inline CSS:
- `__label` font-weight: `var(--ref-typescale-label-medium-weight-prominent)` (was `var(--ref-typeface-weight-medium)`)
- `__helper` font-family: `var(--ref-typeface-plain)` (was brand), font-size/line-height: body-small tokens (was label-small)
- Focus ring: split into two rules — `&:focus-within` for border only, `&:focus-within:not([data-mouse-focus])` for box-shadow
- Error state: remove `.ds-select__label { color: ... }` rule; add `.ds-select__arrow { display: none; }` and `.ds-select__error-icon { color: var(--color-icon-error); flex-shrink: 0; pointer-events: none; }`

Full replacement CSS block for select (write into the `<style>` after the sentinel block):

```css
/* ── ds-select ── */
.ds-select { display: flex; flex-direction: column; gap: var(--spacing-xs); }
.ds-select__label { font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; font-size: var(--ref-typescale-label-medium-size); font-weight: var(--ref-typescale-label-medium-weight-prominent); line-height: var(--ref-typescale-label-medium-line-height); color: var(--color-text-secondary); user-select: none; }
.ds-select__required { color: var(--color-text-error); margin-left: 2px; }
.ds-select__field { display: flex; align-items: center; height: 42px; background: var(--color-surface-input); border: 1px solid var(--color-border-input); border-radius: var(--radius-sm); padding: 0 var(--spacing-md); cursor: pointer; transition: border-color 0.15s ease, box-shadow 0.15s ease; position: relative; }
.ds-select__field:hover { border-color: var(--color-border-input-hover); }
.ds-select:focus-within .ds-select__field { border-color: var(--color-border-input-active); }
.ds-select:focus-within:not([data-mouse-focus]) .ds-select__field { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
.ds-select__control { flex: 1; min-width: 0; border: none; outline: none; background: transparent; appearance: none; -webkit-appearance: none; font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; font-size: var(--ref-typescale-label-medium-size); font-weight: var(--ref-typeface-weight-regular); line-height: var(--ref-typescale-label-medium-line-height); color: var(--color-text-primary); cursor: pointer; padding-right: var(--spacing-sm); }
.ds-select__control:disabled { cursor: not-allowed; }
.ds-select__control option[value=""] { color: var(--color-text-placeholder); }
.ds-select__arrow { color: var(--color-icon-subtle); flex-shrink: 0; pointer-events: none; transition: transform 0.15s ease; }
.ds-select:focus-within:not(.is-error) .ds-select__arrow { color: var(--color-icon-brand); }
.ds-select__error-icon { color: var(--color-icon-error); flex-shrink: 0; pointer-events: none; }
.ds-select__helper { font-family: var(--ref-typeface-plain), 'DM Sans', sans-serif; font-size: var(--ref-typescale-body-small-size); line-height: var(--ref-typescale-body-small-line-height); color: var(--color-text-secondary); }
.ds-select.is-error .ds-select__field { border-color: var(--color-border-input-error); }
.ds-select.is-error .ds-select__arrow { display: none; }
.ds-select.is-error .ds-select__helper { color: var(--color-text-error); }
.ds-select.is-error:focus-within .ds-select__field { border-color: var(--color-border-input-error); }
.ds-select.is-error:focus-within:not([data-mouse-focus]) .ds-select__field { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
.ds-select.is-disabled { pointer-events: none; }
.ds-select.is-disabled .ds-select__field { background: var(--color-surface-input-disabled); border-color: var(--color-border-subtle); }
.ds-select.is-disabled .ds-select__label { color: var(--color-text-disabled); }
.ds-select.is-disabled .ds-select__control { color: var(--color-text-disabled); cursor: not-allowed; }
.ds-select.is-disabled .ds-select__arrow { color: var(--color-icon-disabled); }
.ds-select.is-disabled .ds-select__helper { color: var(--color-text-disabled); }
```

- [ ] **Step 7: Update ds-textarea inline CSS**

Find the `ds-textarea` CSS block in the `<style>` section. Update it:

Key changes:
- `__label` font-weight: `var(--ref-typescale-label-medium-weight-prominent)`
- `__helper` font-family: `var(--ref-typeface-plain)`, font-size/line-height: body-small
- Focus ring: split into two rules
- Error state: remove `__label { color: ... }` rule

Full replacement CSS block:

```css
/* ── ds-textarea ── */
.ds-textarea { display: flex; flex-direction: column; gap: var(--spacing-xs); }
.ds-textarea__label { font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; font-size: var(--ref-typescale-label-medium-size); font-weight: var(--ref-typescale-label-medium-weight-prominent); line-height: var(--ref-typescale-label-medium-line-height); color: var(--color-text-secondary); user-select: none; }
.ds-textarea__required { color: var(--color-text-error); margin-left: 2px; }
.ds-textarea__field { display: flex; background: var(--color-surface-input); border: 1px solid var(--color-border-input); border-radius: var(--radius-sm); padding: var(--spacing-sm) var(--spacing-md); cursor: text; transition: border-color 0.15s ease, box-shadow 0.15s ease; }
.ds-textarea__field:hover { border-color: var(--color-border-input-hover); }
.ds-textarea:focus-within .ds-textarea__field { border-color: var(--color-border-input-active); }
.ds-textarea:focus-within:not([data-mouse-focus]) .ds-textarea__field { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
.ds-textarea__control { flex: 1; min-width: 0; min-height: 80px; border: none; outline: none; background: transparent; font-family: var(--ref-typeface-brand), 'DM Sans', sans-serif; font-size: var(--ref-typescale-label-medium-size); font-weight: var(--ref-typeface-weight-regular); line-height: 1.5; color: var(--color-text-primary); caret-color: var(--color-border-input-active); resize: vertical; }
.ds-textarea__control::placeholder { color: var(--color-text-placeholder); }
.ds-textarea__control:disabled { cursor: not-allowed; resize: none; }
.ds-textarea__control[readonly] { cursor: default; resize: none; }
.ds-textarea__helper { font-family: var(--ref-typeface-plain), 'DM Sans', sans-serif; font-size: var(--ref-typescale-body-small-size); line-height: var(--ref-typescale-body-small-line-height); color: var(--color-text-secondary); }
.ds-textarea.is-error .ds-textarea__field { border-color: var(--color-border-input-error); }
.ds-textarea.is-error .ds-textarea__helper { color: var(--color-text-error); }
.ds-textarea.is-error:focus-within .ds-textarea__field { border-color: var(--color-border-input-error); }
.ds-textarea.is-error:focus-within:not([data-mouse-focus]) .ds-textarea__field { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
.ds-textarea.is-disabled { pointer-events: none; }
.ds-textarea.is-disabled .ds-textarea__field { background: var(--color-surface-input-disabled); border-color: var(--color-border-subtle); }
.ds-textarea.is-disabled .ds-textarea__label { color: var(--color-text-disabled); }
.ds-textarea.is-disabled .ds-textarea__control { color: var(--color-text-disabled); }
.ds-textarea.is-disabled .ds-textarea__helper { color: var(--color-text-disabled); }
.ds-textarea.is-readonly .ds-textarea__field { background: var(--color-surface-default); border-color: var(--color-border-subtle); cursor: default; }
.ds-textarea.is-readonly .ds-textarea__control { cursor: default; color: var(--color-text-secondary); }
```

- [ ] **Step 8: Also update the select error demo in the preview HTML**

In the select error demo row in the preview, add the error icon span and remove the arrow span to match the new HTML pattern:

```html
<!-- Error state demo -->
<div class="ds-select is-error" style="width:220px;">
  <label class="ds-select__label" for="sel-error">Role<span class="ds-select__required">*</span></label>
  <div class="ds-select__field">
    <select id="sel-error" class="ds-select__control" aria-invalid="true">
      <option value="">Select a role...</option>
      <option value="admin">Admin</option>
      <option value="member">Member</option>
    </select>
    <!-- No arrow in error state -->
    <span class="ds-icon ds-icon--sm ds-icon--filled ds-select__error-icon" aria-hidden="true">error</span>
  </div>
  <span class="ds-select__helper" role="alert">Please select a role.</span>
</div>
```

### 6E — Update sidebar nav

- [ ] **Step 9: Move select and textarea nav links to follow input**

In the sidebar nav, move the `href="#select"` and `href="#textarea"` links to immediately after the `href="#input"` link. Add a subtle nav sub-label above the input link to group the three:

```html
<div class="nav-section-label" style="margin-top:8px; font-size:10px; opacity:0.6;">Form — Text Fields</div>
<a class="nav-link" href="#input" onclick="setActive(this)"><span class="nav-dot"></span>Input Field</a>
<a class="nav-link" href="#select" onclick="setActive(this)"><span class="nav-dot"></span>Select</a>
<a class="nav-link" href="#textarea" onclick="setActive(this)"><span class="nav-dot"></span>Textarea</a>
```

### 6F — Extend the preview JS for select and textarea

- [ ] **Step 10: Update the `data-mouse-focus` script**

The existing script only watches `.ds-input`. Update it to also handle `.ds-select` and `.ds-textarea`:

Replace the entire existing `data-mouse-focus` script block (the one currently only watching `.ds-input`) with:

```html
<!-- Text fields: keyboard-only focus ring — suppress ring when focus came from pointer -->
<script>
(function () {
  var lastWasMouse = false;
  document.addEventListener('mousedown', function () { lastWasMouse = true; }, true);
  document.addEventListener('touchstart', function () { lastWasMouse = true; }, true);
  // Reset on keydown — NOT on focusout, to correctly handle click-from-one-field-to-another
  document.addEventListener('keydown', function () { lastWasMouse = false; }, true);
  document.addEventListener('focusin', function (e) {
    var el = e.target && e.target.closest &&
      (e.target.closest('.ds-input') || e.target.closest('.ds-select') || e.target.closest('.ds-textarea'));
    if (!el) return;
    if (lastWasMouse) { el.setAttribute('data-mouse-focus', ''); }
    else              { el.removeAttribute('data-mouse-focus'); }
  }, true);
  document.addEventListener('focusout', function (e) {
    // Only remove the attribute — do NOT reset lastWasMouse here.
    // Resetting here would clear the flag before the next focusin fires
    // when clicking from one field directly to another.
    var el = e.target && e.target.closest &&
      (e.target.closest('.ds-input') || e.target.closest('.ds-select') || e.target.closest('.ds-textarea'));
    if (el) el.removeAttribute('data-mouse-focus');
  }, true);
})();
</script>
```

- [ ] **Step 11: Commit preview changes**

```bash
git add preview/index.html
git commit -m "Preview — group Text Fields (input/select/textarea), fix focus rings, update CSS"
```

---

## Task 7: Update `CLAUDE.md` — harden focus ring rules

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Strengthen the ADA focus ring rule in Component Rules > General**

Current text:
> Focus ring: always `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` — never `outline`

Replace with:

> **Focus ring: keyboard-only, always.** Use `box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring)` — never `outline`. For simple elements (buttons, links) use `:focus-visible`. For composite wrapper components that use `:focus-within`, you MUST use the `data-mouse-focus` suppression pattern — never apply `box-shadow` directly on `:focus-within` alone, as this fires on mouse clicks.

- [ ] **Step 2: Strengthen the ADA section focus ring rule**

In the ADA / Accessibility Standards > Focus ring section, expand the two-rule pattern to include the wrapper pattern:

```
// Simple interactive elements (buttons, links, etc.)
&:focus         { outline: none; }
&:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }

// Composite wrappers using :focus-within (ds-input, ds-select, ds-textarea)
&:focus-within                       { /* border-color change only — no ring */ }
&:focus-within:not([data-mouse-focus]) { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
// data-mouse-focus is set on mousedown/touchstart via HostListener in the Angular component
// and via the preview's JS handler — it suppresses the ring for pointer-initiated focus.
```

- [ ] **Step 3: Add to "What NOT to do" list**

Add these two items:

> - Never apply `box-shadow` focus ring directly on `:focus-within` — always pair with `:not([data-mouse-focus])` guard or the ring will fire on mouse clicks
> - Never use `:focus` where `:focus-visible` is appropriate — `:focus-visible` is keyboard-only by design for simple elements

- [ ] **Step 4: Update Textarea spec in CLAUDE.md**

The existing textarea spec is minimal. Add/update:

> - **Label typography**: label-medium, `weight-prominent` (600/bold), `--color-text-secondary` — same as ds-input. Label does NOT turn red in error state.
> - **Helper/supporting text**: body-small (12px, 16px line-height) using `--ref-typescale-body-small-*` tokens — same as ds-input.
> - **Error state**: red border (`--color-border-input-error`), red helper text, label stays `--color-text-secondary` (NOT red)
> - **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern — same as ds-input

- [ ] **Step 5: Update Select spec (or add if missing)**

Add/update the ds-select spec:

> ### Select (`ds-select`)
> - **Visual design**: identical to ds-input — same 42px height, same label/helper/error token usage, same field appearance. They are the same component in Figma.
> - **Angular Material**: `MatSelectModule` — native `<select>` element with custom arrow icon
> - **Label typography**: label-medium, `weight-prominent` (600/bold), `--color-text-secondary` — label does NOT turn red in error state
> - **Helper/supporting text**: body-small tokens — same as ds-input
> - **Arrow icon**: `expand_more` Material Symbol (`ds-select__arrow`) — hidden in error state
> - **Error state**: red border, red helper text, filled `error` icon replaces arrow (same pattern as ds-input error icon replacing trailing action), label stays `--color-text-secondary`
> - **Focus ring**: keyboard-only via `data-mouse-focus` suppression pattern

- [ ] **Step 6: Commit CLAUDE.md**

```bash
git add CLAUDE.md
git commit -m "CLAUDE.md — harden keyboard-only focus ring rules, add select/textarea specs"
```

---

## Task 8: Verify everything looks correct

- [ ] **Step 1: Open the preview in a browser**

Open `preview/index.html` in a browser. Navigate to the Text Fields group.

- [ ] **Step 2: Verify focus ring behavior**

For each of the three field types (Input, Select, Textarea):
- Click into the field with the mouse — no focus ring should appear (border-color change only)
- Tab into the field from keyboard — blue focus ring (`box-shadow`) should appear
- Click elsewhere — ring disappears

- [ ] **Step 3: Verify visual alignment**

All three fields should have:
- Same label weight (bold/prominent)
- Same helper text size (12px body-small)
- Label stays grey (not red) in error state
- Select error state shows filled error icon, no arrow
- Input and Textarea error state show filled error icon

- [ ] **Step 4: Verify select and textarea sections appear right after input in the page**

Scroll down from Input Field — Select should be next, then Textarea. Sidebar nav should show the same order with the "Form — Text Fields" sub-label.

- [ ] **Step 5: Final commit if any cleanup needed, then push check**

Per project git rules: push only after 10+ component changes since last push. Count locally — if threshold not reached, hold the push.

```bash
git log --oneline -10
```
