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

import { Component, Input, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'ds-accordion-panel',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  template: `
    <mat-expansion-panel
      class="ds-accordion__panel"
      [expanded]="open()"
      [disabled]="disabled"
      [hideToggle]="true"
    >
      <mat-expansion-panel-header
        class="ds-accordion__trigger"
        collapsedHeight="auto"
        expandedHeight="auto"
      >
        <span *ngIf="icon" class="ds-accordion__trigger-icon">{{ icon }}</span>
        <span class="ds-accordion__trigger-label">{{ title }}</span>
        <span class="ds-icon ds-accordion__chevron">expand_more</span>
      </mat-expansion-panel-header>
      <div class="ds-accordion__content">
        <ng-content />
      </div>
    </mat-expansion-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAccordionPanelComponent {
  @Input() title = '';
  @Input() icon?: string;
  /** Initial expanded state. mat-expansion-panel owns open/close after first render. */
  @Input('open') set openInput(value: boolean) { this.open.set(value); }
  readonly open = signal(false);
  toggle(): void { this.open.set(!this.open()); }
  @Input() disabled = false;
}

@Component({
  selector: 'ds-accordion',
  standalone: true,
  imports: [MatExpansionModule],
  template: `<mat-accordion class="ds-accordion" multi><ng-content /></mat-accordion>`,
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsAccordionComponent {}
