import { Component, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenu, MenuPositionX, MenuPositionY } from '@angular/material/menu';
import { DsSearchComponent } from '../search/search.component';

/**
 * Onflo Design System — Menu
 *
 * Based on Angular Material mat-menu.
 * Import MatMenuModule in your Angular module.
 *
 * Usage: add a template reference to <ds-menu> and pass its .matMenu to
 * [matMenuTriggerFor] on the trigger element. Place items inside using
 * mat-menu-item + the ds-menu CSS class API for full styling.
 *
 * Positioning: control panel direction via [xPosition] and [yPosition] on ds-menu.
 * The CDK overlay auto-flips above or left/right when the panel would overflow
 * the viewport.
 *
 * @example — Basic menu
 *   <button [matMenuTriggerFor]="myMenu.matMenu">Options</button>
 *   <ds-menu #myMenu>
 *     <button mat-menu-item class="ds-menu__item">
 *       <span class="ds-icon ds-icon--sm ds-menu__item-icon">edit</span>Edit
 *     </button>
 *     <hr class="ds-menu__divider" />
 *     <button mat-menu-item class="ds-menu__item ds-menu__item--destructive">
 *       <span class="ds-icon ds-icon--sm ds-menu__item-icon">delete</span>Delete
 *     </button>
 *   </ds-menu>
 *
 * @example — With search
 *   <ds-menu #myMenu [search]="true" searchPlaceholder="Find action…" [(searchValue)]="query">
 *     <!-- filtered items -->
 *   </ds-menu>
 *
 * @example — With checkboxes (single or multi-select)
 *   <button mat-menu-item class="ds-menu__item ds-menu__item--selected">
 *     <span class="ds-menu__item-check"><span class="ds-icon ds-icon--filled">check</span></span>
 *     Option A
 *   </button>
 *   <button mat-menu-item class="ds-menu__item">
 *     <span class="ds-menu__item-check"></span>
 *     Option B
 *   </button>
 *
 * @example — Submenu (multi-level)
 *   <button mat-menu-item class="ds-menu__item" [matMenuTriggerFor]="subMenu.matMenu">
 *     <span class="ds-icon ds-icon--sm ds-menu__item-icon">folder</span>
 *     Move to
 *     <span class="ds-menu__item-trailing"><span class="ds-icon ds-icon--sm">chevron_right</span></span>
 *   </button>
 *   <ds-menu #subMenu>
 *     <button mat-menu-item class="ds-menu__item">Inbox</button>
 *     <button mat-menu-item class="ds-menu__item">Archive</button>
 *   </ds-menu>
 */
@Component({
  selector: 'ds-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule, DsSearchComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsMenuComponent {
  /** Exposes the mat-menu reference for use with [matMenuTriggerFor]. */
  @ViewChild('menu') matMenu!: MatMenu;

  /** Horizontal position of the panel relative to the trigger. Default: 'after'. */
  @Input() xPosition: MenuPositionX = 'after';

  /** Vertical position of the panel relative to the trigger. Default: 'below'. */
  @Input() yPosition: MenuPositionY = 'below';

  /** Show a sticky search field at the top of the menu panel. */
  @Input() search = false;

  /** Placeholder text for the search field. */
  @Input() searchPlaceholder = 'Search';

  /** Current search value. Use [(searchValue)] for two-way binding. */
  @Input() searchValue = '';

  /** Emits on every keystroke in the search field. */
  @Output() searchValueChange = new EventEmitter<string>();

  onSearchChange(value: string): void {
    this.searchValue = value;
    this.searchValueChange.emit(value);
  }
}
