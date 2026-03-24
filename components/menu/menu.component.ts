/**
 * ds-menu
 *
 * Based on Angular Material mat-menu.
 * Import MatMenuModule in your Angular module.
 *
 * In Angular, use the [matMenuTriggerFor] directive to bind the trigger.
 * The ds-menu SCSS classes are applied to the mat-menu panel.
 *
 * @example
 * <button [matMenuTriggerFor]="myMenu">Options</button>
 * <mat-menu #myMenu class="ds-menu">
 *   <button mat-menu-item class="ds-menu__item">
 *     <span class="ds-icon ds-icon--sm ds-menu__item-icon">edit</span>Edit
 *   </button>
 * </mat-menu>
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsMenuComponent {}
