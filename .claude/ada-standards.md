# ADA / Accessibility Standards

All components must meet WCAG 2.1 AA. These rules are non-negotiable.

---

## Focus ring

- **Always** use `:focus-visible` (not `:focus`) for the visible focus ring — `:focus-visible` only activates during keyboard navigation, never on mouse clicks. This is correct ADA behaviour.
- Two patterns apply depending on element type:

  **Simple elements** (buttons, links, tabs — any element that is itself the focusable target):
  ```scss
  &:focus         { outline: none; }           // suppress browser default on ALL focus
  &:focus-visible { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); } // keyboard only
  ```

  **Composite wrappers** (ds-input, ds-select, ds-textarea — wrapper divs that use `:focus-within` because the inner `<input>` receives focus, not the wrapper):
  ```scss
  // Composite wrappers using :focus-within (ds-input, ds-select, ds-textarea)
  &:focus-within                         { /* border-color change only — no ring */ }
  &:focus-within:not([data-mouse-focus]) { box-shadow: 0 0 0 3px var(--color-border-ada-focus-ring); }
  // data-mouse-focus is set on mousedown/touchstart via HostListener in the Angular component
  // and via the preview's JS handler — it suppresses the ring for pointer-initiated focus.
  ```
- **Never** use `outline` as the focus indicator — it cannot be styled consistently across browsers
- **Never** use `border-color` as a substitute for the focus ring — borders affect layout and are inconsistent
- `overflow: hidden` on an element does NOT clip its own `box-shadow` — only a parent's clips a child's. `box-shadow` focus rings are safe regardless of an element's own overflow.

---

## Roles and ARIA

- Buttons that open/close: `aria-expanded`
- Icon-only buttons: always `aria-label` — no exceptions
- Tabs: `role="tablist"` on container, `role="tab"` + `aria-selected` on each tab button
- Inputs: `aria-invalid="true"` when in error state; `role="alert"` on error messages; `aria-describedby` linking input to helper/error text
- Disabled interactive elements: `aria-disabled="true"` (keep in tab order for screen readers) OR `disabled` attribute (removes from tab order) — use `disabled` for form controls, `aria-disabled` for custom interactive elements
- Loading/skeleton states: `aria-busy="true"` on the container being loaded

---

## Keyboard navigation

- All interactive elements must be reachable and operable via keyboard
- Tabs component: arrow keys (Left/Right) move between tabs; Home/End jump to first/last; Enter/Space select
- Dialogs: trap focus inside when open; Escape closes; return focus to trigger on close
- Menus: arrow keys navigate items; Escape closes and returns focus to trigger

---

## Colour contrast

- All text must meet WCAG AA contrast ratios: 4.5:1 for body text, 3:1 for large text and UI components
- Never convey information with colour alone — always pair with an icon, label, or pattern
