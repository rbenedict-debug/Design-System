/**
 * ds-accordion
 *
 * Based on Angular Material mat-expansion-panel inside mat-accordion.
 * Import MatExpansionModule in your Angular module.
 *
 * @example
 * <ds-accordion>
 *   <ds-accordion-panel title="General Settings" icon="settings">
 *     Content here
 *   </ds-accordion-panel>
 *   <ds-accordion-panel title="Notifications" [open]="true">
 *     Content here
 *   </ds-accordion-panel>
 * </ds-accordion>
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-accordion-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-accordion__panel" [class.is-open]="open">
      <button
        class="ds-accordion__trigger"
        [attr.aria-expanded]="open"
        [attr.aria-controls]="panelId"
        [disabled]="disabled"
        (click)="toggle()"
      >
        <span *ngIf="icon" class="ds-accordion__trigger-icon">{{ icon }}</span>
        <span class="ds-accordion__trigger-label">{{ title }}</span>
        <span class="ds-icon ds-accordion__chevron">expand_more</span>
      </button>
      <div class="ds-accordion__content" [id]="panelId" [hidden]="!open">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAccordionPanelComponent {
  @Input() title = '';
  @Input() icon?: string;
  @Input() open = false;
  @Input() disabled = false;

  panelId = `ds-acc-${Math.random().toString(36).slice(2, 8)}`;

  toggle(): void {
    if (!this.disabled) this.open = !this.open;
  }
}

@Component({
  selector: 'ds-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ds-accordion">
      <ng-content />
    </div>
  `,
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAccordionComponent {}
