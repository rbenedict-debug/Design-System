import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsAlertVariant = 'info' | 'success' | 'warning' | 'error';

/**
 * Onflo Design System — Alert / Banner
 *
 * A standalone Angular component wrapping the ds-alert CSS class API.
 * For direct class usage without Angular:
 *   <div class="ds-alert ds-alert--info" role="alert">
 *     <span class="ds-icon ds-alert__icon">info</span>
 *     <div class="ds-alert__content">
 *       <strong class="ds-alert__title">Title</strong>
 *       <p class="ds-alert__message">Message</p>
 *     </div>
 *   </div>
 *
 * @example
 *   <ds-alert variant="info" title="Heads up" message="Your trial ends in 3 days." />
 *   <ds-alert variant="error" title="Something went wrong" message="Please try again." [dismissible]="true" />
 */
@Component({
  selector: 'ds-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class DsAlertComponent {
  /** Alert semantic variant. Default: 'info' */
  @Input() variant: DsAlertVariant = 'info';

  /** Optional bold title. */
  @Input() title = '';

  /** Main alert message. */
  @Input() message = '';

  /** Shows a dismiss (×) button. */
  @Input() dismissible = false;

  /** Optional action button label. */
  @Input() actionLabel = '';

  /** Whether the alert is currently visible. */
  visible = true;

  /** Emits when the dismiss button is clicked. */
  @Output() dismissed = new EventEmitter<void>();

  /** Emits when the action button is clicked. */
  @Output() actionClicked = new EventEmitter<void>();

  get alertClasses(): string {
    return `ds-alert ds-alert--${this.variant}`;
  }

  get iconName(): string {
    const icons: Record<DsAlertVariant, string> = {
      info: 'info',
      success: 'check_circle',
      warning: 'warning',
      error: 'error',
    };
    return icons[this.variant];
  }

  onDismiss(): void {
    this.visible = false;
    this.dismissed.emit();
  }

  onAction(): void {
    this.actionClicked.emit();
  }
}
