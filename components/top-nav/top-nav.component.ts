import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTabComponent } from '../nav-tab/nav-tab.component';

export interface DsNavTabItem {
  id: string | number;
  label: string;
  active?: boolean;
}

// Tab dimensions (must match _nav-tab.scss)
// Each tab: 130px wide; flex gap between items: 8px (--spacing-sm)
// N tabs in strip:  width = 130N + 8(N−1)  = 138N − 8
// N tabs + more:    width = 130N + 26 + 8N  = 138N + 26
const TAB_WIDTH = 130;
const MORE_WIDTH = 26;
const GAP = 8;

@Component({
  selector: 'ds-top-nav',
  standalone: true,
  imports: [CommonModule, NavTabComponent],
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNavComponent implements AfterViewInit, OnDestroy {
  private _tabs: DsNavTabItem[] = [];

  /**
   * Full ordered list of tabs. The component decides which tabs are visible
   * and which overflow into the "..." panel based on available strip width.
   */
  @Input()
  set tabs(value: DsNavTabItem[]) {
    this._tabs = value ?? [];
    // Assume all fit until the first measurement — prevents a 0-tab flash.
    this.visibleCount = this._tabs.length;
    this.recalculate();
  }
  get tabs(): DsNavTabItem[] {
    return this._tabs;
  }

  /** Emitted when a tab is clicked to become active. */
  @Output() tabActivate = new EventEmitter<DsNavTabItem>();

  /** Emitted when a tab's × close button is clicked. */
  @Output() tabClose = new EventEmitter<DsNavTabItem>();

  /** Emitted when "Close all tabs" is clicked in the overflow panel. */
  @Output() tabCloseAll = new EventEmitter<void>();

  @ViewChild('tabsContainer') tabsContainer?: ElementRef<HTMLElement>;
  @ViewChild('topNavHeader')  topNavHeader?: ElementRef<HTMLElement>;
  @ViewChild('moreWrapper')   moreWrapper?: ElementRef<HTMLElement>;

  visibleCount = 0;
  showMorePanel = false;
  morePanelLeft = 0;

  private resizeObserver?: ResizeObserver;

  // ── Derived slices ────────────────────────────────────────────────────────

  get visibleTabs(): DsNavTabItem[] {
    return this._tabs.slice(0, this.visibleCount);
  }

  get overflowTabs(): DsNavTabItem[] {
    return this._tabs.slice(this.visibleCount);
  }

  get hasOverflow(): boolean {
    return this._tabs.length > this.visibleCount;
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private el: ElementRef,
  ) {}

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  ngAfterViewInit(): void {
    this.recalculate();
    this.zone.runOutsideAngular(() => {
      this.resizeObserver = new ResizeObserver(() => this.recalculate());
      if (this.tabsContainer) {
        this.resizeObserver.observe(this.tabsContainer.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  // ── Overflow calculation ──────────────────────────────────────────────────

  private recalculate(): void {
    if (!this.tabsContainer) return;

    const containerWidth = this.tabsContainer.nativeElement.offsetWidth;
    const total = this._tabs.length;

    if (total === 0) {
      this.setVisibleCount(0);
      return;
    }

    // Can all tabs fit without a more button?
    // All-tabs width = TAB_WIDTH × N + GAP × (N−1) = 138N − 8
    const allFit = (TAB_WIDTH + GAP) * total - GAP <= containerWidth;

    let count: number;
    if (allFit) {
      count = total;
    } else {
      // Tabs + more button as one flex row with equal gaps:
      // width = 130×N + 26 + 8×N = 138N + 26
      // Solve: count = ⌊(containerWidth − 26) / 138⌋
      count = Math.floor((containerWidth - MORE_WIDTH) / (TAB_WIDTH + GAP));
      // Always leave at least one tab in overflow so the more button appears.
      count = Math.max(0, Math.min(count, total - 1));
    }

    this.setVisibleCount(count);
  }

  private setVisibleCount(count: number): void {
    if (count === this.visibleCount) return;
    this.zone.run(() => {
      this.visibleCount = count;
      this.cdr.markForCheck();
    });
  }

  // ── Tab interaction ───────────────────────────────────────────────────────

  onTabClick(tab: DsNavTabItem): void {
    this.showMorePanel = false;
    this.tabActivate.emit(tab);
  }

  onTabClose(tab: DsNavTabItem): void {
    this.tabClose.emit(tab);
  }

  // ── More panel ────────────────────────────────────────────────────────────

  onMoreClick(): void {
    if (this.showMorePanel) {
      this.showMorePanel = false;
      return;
    }

    // Compute left offset so panel aligns under the more button.
    if (this.topNavHeader && this.moreWrapper) {
      const headerRect = this.topNavHeader.nativeElement.getBoundingClientRect();
      const wrapperRect = this.moreWrapper.nativeElement.getBoundingClientRect();
      this.morePanelLeft = wrapperRect.left - headerRect.left;
    }

    this.showMorePanel = true;
  }

  onPanelTabActivate(tab: DsNavTabItem): void {
    this.showMorePanel = false;
    this.tabActivate.emit(tab);
  }

  onPanelTabClose(tab: DsNavTabItem, event: MouseEvent): void {
    event.stopPropagation();
    this.tabClose.emit(tab);
  }

  onCloseAll(): void {
    this.showMorePanel = false;
    this.tabCloseAll.emit();
  }

  onPanelKeydown(event: KeyboardEvent): void {
    const panel = (event.currentTarget as HTMLElement);
    const items = Array.from(
      panel.querySelectorAll<HTMLElement>('.ds-top-nav__more-item'),
    );
    if (!items.length) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(currentIndex + 1) % items.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length].focus();
    }
  }

  // ── Global close triggers ─────────────────────────────────────────────────

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.showMorePanel) return;
    // Close if click was outside the entire ds-top-nav host element.
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.showMorePanel = false;
      this.cdr.markForCheck();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (!this.showMorePanel) return;
    this.showMorePanel = false;
    this.cdr.markForCheck();
    // Return keyboard focus to the more button.
    this.moreWrapper?.nativeElement
      .querySelector<HTMLElement>('.ds-nav-tab--more')
      ?.focus();
  }
}
