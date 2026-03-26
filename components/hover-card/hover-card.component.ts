/**
 * ds-hover-card
 *
 * A floating information card that follows the cursor, revealed on hover/focus.
 * Cursor tracking runs outside Angular's zone for performance — position updates
 * bypass change detection and write directly to the card's inline style.
 *
 * Variants:
 *   'bottom' (default) — card appears below the cursor; accent border on top
 *   'top'              — card appears above the cursor; accent border on bottom
 *
 * Content projection:
 *   Default slot       — the trigger element (anything the user hovers over)
 *   [card-content]     — content rendered inside the floating card
 *
 * ADA: Content is also accessible via keyboard focus; do not hide critical
 *      actions behind hover only.
 *
 * @example
 * <ds-hover-card variant="bottom">
 *   <button>Hover me</button>
 *   <div card-content>
 *     <p class="ds-hover-card__title">Order #4821</p>
 *     <p class="ds-hover-card__subtitle">Pending review</p>
 *     <p class="ds-hover-card__text">3 items · Submitted 2 hours ago</p>
 *   </div>
 * </ds-hover-card>
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsHoverCardVariant = 'bottom' | 'top';

@Component({
  selector: 'ds-hover-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsHoverCardComponent implements AfterViewInit, OnDestroy {
  /** Position variant. 'bottom' = card below cursor (default); 'top' = card above cursor. */
  @Input() variant: DsHoverCardVariant = 'bottom';

  /** Horizontal distance between cursor and card edge (px). */
  @Input() offsetX = 16;

  /** Vertical distance between cursor and card edge (px). */
  @Input() offsetY = 16;

  @ViewChild('triggerEl') private triggerEl!: ElementRef<HTMLElement>;
  @ViewChild('cardEl') private cardEl!: ElementRef<HTMLElement>;

  isVisible = false;

  private removeMouseMoveListener?: () => void;

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    // Mousemove runs outside Angular zone — position updates bypass CD entirely
    this.ngZone.runOutsideAngular(() => {
      this.removeMouseMoveListener = this.renderer.listen(
        this.triggerEl.nativeElement,
        'mousemove',
        (e: MouseEvent) => this.updatePosition(e)
      );
    });
  }

  ngOnDestroy(): void {
    this.removeMouseMoveListener?.();
  }

  onMouseEnter(e: MouseEvent): void {
    this.isVisible = true;
    this.cdr.markForCheck();
    this.updatePosition(e);
  }

  onMouseLeave(): void {
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  onFocusIn(e: FocusEvent): void {
    this.isVisible = true;
    this.cdr.markForCheck();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.positionNearRect(rect);
  }

  onFocusOut(): void {
    this.isVisible = false;
    this.cdr.markForCheck();
  }

  private updatePosition(e: MouseEvent): void {
    const card = this.cardEl?.nativeElement;
    if (!card) return;

    const cardH = card.offsetHeight;
    const cardW = card.offsetWidth || 360;

    let x = e.clientX + this.offsetX;
    let y =
      this.variant === 'top'
        ? e.clientY - cardH - this.offsetY
        : e.clientY + this.offsetY;

    // Clamp to viewport so card never overflows screen edge
    x = Math.max(8, Math.min(x, window.innerWidth - cardW - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - cardH - 8));

    this.renderer.setStyle(card, 'left', `${x}px`);
    this.renderer.setStyle(card, 'top', `${y}px`);
  }

  private positionNearRect(rect: DOMRect): void {
    const card = this.cardEl?.nativeElement;
    if (!card) return;

    const cardH = card.offsetHeight;
    const cardW = card.offsetWidth || 360;

    let x = rect.left;
    let y =
      this.variant === 'top'
        ? rect.top - cardH - 8
        : rect.bottom + 8;

    x = Math.max(8, Math.min(x, window.innerWidth - cardW - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - cardH - 8));

    this.renderer.setStyle(card, 'left', `${x}px`);
    this.renderer.setStyle(card, 'top', `${y}px`);
  }
}
