/**
 * ds-list / ds-list-item
 *
 * Based on Angular Material mat-list / mat-list-item.
 * Import MatListModule in your Angular module.
 *
 * @example
 * <ds-list>
 *   <ds-list-item primary="Alice Johnson" secondary="alice@company.com" icon="person" />
 *   <ds-list-item primary="Settings" icon="settings" [interactive]="true" (click)="navigate()" />
 * </ds-list>
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListItemComponent {
  @Input() primary = '';
  @Input() secondary = '';
  @Input() overline = '';
  @Input() icon?: string;
  @Input() trailingIcon?: string;
  @Input() trailingMeta = '';
  @Input() interactive = false;
  @Input() disabled = false;
  /** '1-line' | '2-lines' | '3-lines' */
  @Input() variant: '1-line' | '2-lines' | '3-lines' = '1-line';
}

@Component({
  selector: 'ds-list',
  standalone: true,
  imports: [CommonModule],
  template: `<ul class="ds-list" role="list"><ng-content /></ul>`,
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListComponent {}
