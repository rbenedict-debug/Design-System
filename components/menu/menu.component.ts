import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenu } from '@angular/material/menu';

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
 * @example
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
 */
@Component({
  selector: 'ds-menu',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsMenuComponent {
  /** Exposes the mat-menu reference for use with [matMenuTriggerFor]. */
  @ViewChild('menu') matMenu!: MatMenu;
}
