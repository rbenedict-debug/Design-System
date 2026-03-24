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
 * ADA: aria-selected on active tab, tabindex managed for arrow-key nav.
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
  ChangeDetectionStrategy, HostListener, ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-tab',
  standalone: true,
  template: '<ng-content />',
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
}

@Component({
  selector: 'ds-tabs',
  standalone: true,
  imports: [CommonModule, DsTabComponent],
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

  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    const first = this.tabs.toArray().findIndex(t => !t.disabled);
    this.activeIndex = first >= 0 ? first : 0;
  }

  select(index: number): void {
    if (!this.tabs.toArray()[index]?.disabled) {
      this.activeIndex = index;
      this.tabChange.emit(index);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const tabs = this.tabs.toArray();
    const total = tabs.length;
    let next = this.activeIndex;

    if (event.key === 'ArrowRight') {
      do { next = (next + 1) % total; } while (tabs[next].disabled && next !== this.activeIndex);
    } else if (event.key === 'ArrowLeft') {
      do { next = (next - 1 + total) % total; } while (tabs[next].disabled && next !== this.activeIndex);
    } else if (event.key === 'Home') {
      next = tabs.findIndex(t => !t.disabled);
    } else if (event.key === 'End') {
      next = tabs.map(t => !t.disabled).lastIndexOf(true);
    } else {
      return;
    }

    event.preventDefault();
    this.select(next);

    // Move focus to the newly active tab button
    const buttons = (this.el.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.ds-tabs__tab');
    buttons[next]?.focus();
  }
}
