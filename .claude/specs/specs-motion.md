# Motion & Animation

Onflo's motion system is built on three duration tokens and a single standard easing curve,
aligned with Angular Material's Material Design 3 motion foundation.

---

## Duration tokens

| Token | Value | When to use |
|---|---|---|
| `--motion-duration-short` | 150ms | Hover states, focus rings, colour changes, icon swaps — anything that responds to immediate input |
| `--motion-duration-medium` | 200ms | Small UI elements entering or leaving — dropdowns opening, tooltips appearing, toggles |
| `--motion-duration-long` | 300ms | Larger surface transitions — panels sliding, modals entering, accordions expanding |

---

## Easing

Angular Material uses Material Design 3 easing curves. Onflo aligns to the same values
so component transitions feel consistent with the Angular Material behavioral layer.

> **Note:** Easing values are not yet in the Figma token system. Use the values below directly
> until they are added as `--motion-easing-*` tokens. They do not vary by theme so hardcoding
> is acceptable in the interim.

| Name | Value | When to use |
|---|---|---|
| Standard | `cubic-bezier(0.2, 0, 0, 1)` | Default for all transitions — elements staying on screen (hover, focus, state changes) |
| Enter | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` | Elements entering the screen — overlays, menus, drawers appearing |
| Exit | `cubic-bezier(0.3, 0.0, 0.8, 0.15)` | Elements leaving the screen — overlays, menus, drawers disappearing |

**Standard is correct for the vast majority of component transitions.** Only reach for Enter/Exit
when animating elements that actually move onto or off the visible area.

---

## Usage

```scss
// Hover state — short duration, standard easing
.ds-example {
  transition: background-color var(--motion-duration-short) cubic-bezier(0.2, 0, 0, 1);

  &:hover { background: var(--overlay-hovered); }
}

// Dropdown opening — medium duration, enter easing
.ds-example__panel {
  transition:
    opacity var(--motion-duration-medium) cubic-bezier(0.05, 0.7, 0.1, 1.0),
    transform var(--motion-duration-medium) cubic-bezier(0.05, 0.7, 0.1, 1.0);
}

// Accordion expanding — long duration, standard easing
.ds-example__body {
  transition: height var(--motion-duration-long) cubic-bezier(0.2, 0, 0, 1);
}
```

---

## Angular Material overlap

Angular Material manages its own transition timing internally for behavioral components
(menus, dialogs, overlays, ripples). Do not override Angular Material's animation timing
via `transition` on `.mat-*` or `.mdc-*` elements — it will conflict with the CDK overlay
animation lifecycle and cause visual glitches.

Apply Onflo transitions only to elements owned by Onflo's SCSS (BEM classes, pseudo-elements).

---

## prefers-reduced-motion

All transitions must be suppressed for users who request reduced motion. Add this to every
component that uses `transition` or `animation`:

```scss
@media (prefers-reduced-motion: reduce) {
  .ds-example {
    transition: none;
  }
}
```

**Or globally** — add once to `components/index.scss` or the consuming app's root stylesheet:

```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

The global approach is preferred — it catches any transition regardless of where it's defined
and removes the need to add the media query to every component individually.

---

## Rules

- Always use a duration token — never hardcode `0.2s`, `200ms`, etc.
- Always pair a duration with an easing curve — `transition: X var(--motion-duration-short)` alone uses the browser default (`ease`) which does not match the design system
- Never animate `width`, `height`, or `top/left` for performance — animate `transform` and `opacity` instead
- Never add motion to elements that purely convey state changes without movement (e.g. colour-only changes on text) — those should be instant or use `--motion-duration-short`
- Never override Angular Material's internal animation timing
- Always include `prefers-reduced-motion` suppression — either globally or per component
