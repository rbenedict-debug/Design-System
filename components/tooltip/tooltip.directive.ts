import { Directive } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

export type DsTooltipPosition = 'above' | 'below' | 'left' | 'right';

/**
 * Onflo Design System — Tooltip Directive
 *
 * Composes Angular Material's MatTooltip with the Onflo token-styled surface.
 * Tooltip rendering, positioning, show/hide delay, and keyboard behaviour are
 * all handled by MatTooltip via CDK Overlay — identical to [matTooltip] usage.
 *
 * The Onflo tokens are applied via global .mat-mdc-tooltip overrides in
 * components/tooltip/_tooltip.scss.
 *
 * @example
 *   <button dsTooltip="Save changes">Save</button>
 *   <button [dsTooltip]="'Delete item'" [dsTooltipPosition]="'below'">Delete</button>
 *   <button dsTooltip="Disabled" [dsTooltipDisabled]="true">No tooltip</button>
 */
@Directive({
  selector: '[dsTooltip]',
  standalone: true,
  hostDirectives: [
    {
      directive: MatTooltip,
      inputs: [
        'matTooltip: dsTooltip',
        'matTooltipPosition: dsTooltipPosition',
        'matTooltipShowDelay: dsTooltipShowDelay',
        'matTooltipHideDelay: dsTooltipHideDelay',
        'matTooltipDisabled: dsTooltipDisabled',
      ],
    },
  ],
})
export class DsTooltipDirective {}
