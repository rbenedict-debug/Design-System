import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsAlertVariant = 'info' | 'success' | 'warning' | 'error';
export type DsAlertSize = 'sm' | 'lg';

/**
 * Onflo Design System — Alert / Banner
 *
 * Inline status banner for communicating success, warning, error, or info.
 * Use role="alert" for urgent messages; aria-live="polite" for informational ones.
 * Never rely on colour alone — icon and text both convey status.
 *
 * SM (default) — compact single row: tinted background, icon + title + body.
 * LG — two-section layout: tinted header band (icon + title), white body below.
 *
 * @example
 *   <ds-alert variant="info" title="Heads up" message="Your trial ends in 3 days." />
 *   <ds-alert variant="error" size="lg" title="Something went wrong" message="Please try again." [dismissible]="true" />
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

  /** Size variant. 'sm' = compact inline; 'lg' = two-section with header band. Default: 'sm' */
  @Input() size: DsAlertSize = 'sm';

  /** Bold title text. SM: shown above body. LG: shown in tinted header band. */
  @Input() title = '';

  /** Body message text. SM: shown below title. LG: shown in white body section. */
  @Input() message = '';

  /** Shows a dismiss (×) button. */
  @Input() dismissible = false;

  /** Optional action button label (SM only). */
  @Input() actionLabel = '';

  /** Whether the alert is currently visible. */
  visible = true;

  /** Emits when the dismiss button is clicked. */
  @Output() dismissed = new EventEmitter<void>();

  /** Emits when the action button is clicked. */
  @Output() actionClicked = new EventEmitter<void>();

  get alertClasses(): string {
    const sizeClass = this.size === 'lg' ? ' ds-alert--lg' : '';
    return `ds-alert ds-alert--${this.variant}${sizeClass}`;
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
