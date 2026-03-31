/**
 * Onflo Design System — Tabs
 *
 * Based on Angular Material mat-tab-group / mat-tab.
 * Import MatTabsModule in your Angular module.
 * See: https://material.angular.io/components/tabs/overview
 *
 * Figma: component/page-tab (label only). Height: 48px fixed.
 * Selected state is indicated by a 2px brand-blue bottom bar.
 * Badge is a 6px notification dot (not a count) — use [showBadge]="true".
 *
 * ADA: role="tablist" / role="tab" / aria-selected managed by mat-tab-group.
 *      Arrow key, Home, End navigation handled by mat-tab-group internally.
 *
 * @example
 *   <ds-tabs>
 *     <ds-tab label="Overview">Overview content here</ds-tab>
 *     <ds-tab label="Details" [showBadge]="true">Details content</ds-tab>
 *     <ds-tab label="Settings" [disabled]="true">Settings content</ds-tab>
 *   </ds-tabs>
 */

import {
  Component, Input, Output, EventEmitter,
  ContentChildren, QueryList, AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'ds-tab',
  standalone: true,
  imports: [],
  // Wraps projected body content in a TemplateRef so DsTabsComponent can forward
  // it into the corresponding mat-tab via *ngTemplateOutlet.
  template: `<ng-template><ng-content /></ng-template>`,
})
export class DsTabComponent {
  /** Tab label text. */
  @Input() label = '';

  /** Show the 6px red notification dot next to the label. */
  @Input() showBadge = false;

  /** Material Symbol icon name shown before the label (optional). */
  @Input() icon = '';

  /** Disables the tab. */
  @Input() disabled = false;

  /** TemplateRef capturing projected body content — read by DsTabsComponent. */
  @ViewChild(TemplateRef, { static: true }) contentRef!: TemplateRef<unknown>;
}

@Component({
  selector: 'ds-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, DsTabComponent],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTabsComponent implements AfterContentInit {
  @ContentChildren(DsTabComponent) tabs!: QueryList<DsTabComponent>;

  /** Index of the currently active tab. */
  activeIndex = 0;

  /** Emits the index of the newly selected tab. */
  @Output() tabChange = new EventEmitter<number>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    const first = this.tabs.toArray().findIndex(t => !t.disabled);
    this.activeIndex = first >= 0 ? first : 0;
    this.cdr.markForCheck();
  }

  onTabChange(index: number): void {
    this.activeIndex = index;
    this.tabChange.emit(index);
  }
}
