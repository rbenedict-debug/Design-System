import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';

export type DsTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Onflo Design System — Tooltip Directive
 *
 * Wraps the host element in a .ds-tooltip-wrapper and appends a .ds-tooltip.
 * The tooltip is shown via CSS :hover / :focus-within on the wrapper.
 *
 * @example
 *   <button dsTooltip="Save changes">Save</button>
 *   <button [dsTooltip]="'Delete item'" dsTooltipPosition="bottom">Delete</button>
 */
@Directive({
  selector: '[dsTooltip]',
  standalone: true,
})
export class DsTooltipDirective implements OnInit, OnDestroy {
  /** Tooltip text content. */
  @Input('dsTooltip') text = '';

  /** Tooltip position. Default: 'top' */
  @Input() dsTooltipPosition: DsTooltipPosition = 'top';

  private wrapper!: HTMLElement;
  private tooltipEl!: HTMLElement;

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;

    // Create wrapper
    this.wrapper = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(this.wrapper, 'ds-tooltip-wrapper');

    // Insert wrapper before host in the DOM
    const parent = host.parentNode!;
    this.renderer.insertBefore(parent, this.wrapper, host);
    this.renderer.appendChild(this.wrapper, host);

    // Create tooltip element
    this.tooltipEl = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(this.tooltipEl, 'ds-tooltip');
    if (this.dsTooltipPosition !== 'top') {
      this.renderer.addClass(this.tooltipEl, `ds-tooltip--${this.dsTooltipPosition}`);
    }
    this.renderer.setAttribute(this.tooltipEl, 'role', 'tooltip');
    this.tooltipEl.textContent = this.text;

    this.renderer.appendChild(this.wrapper, this.tooltipEl);
  }

  ngOnDestroy(): void {
    if (this.wrapper && this.wrapper.parentNode) {
      const parent = this.wrapper.parentNode;
      const host = this.el.nativeElement;
      this.renderer.insertBefore(parent, host, this.wrapper);
      this.renderer.removeChild(parent, this.wrapper);
    }
  }
}
