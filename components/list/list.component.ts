/**
 * ds-list / ds-list-item
 *
 * Based on Angular Material mat-list / mat-list-item.
 *
 * Leading and trailing slots accept any projected content via attribute selectors:
 *   [leading]  — leading icon, checkbox, avatar, etc.
 *   [trailing] — trailing icon, chevron, etc.
 *
 * @example
 * <!-- Icon leading (nav / interactive list) -->
 * <ds-list>
 *   <ds-list-item primary="Settings" [interactive]="true">
 *     <span leading class="ds-icon">settings</span>
 *   </ds-list-item>
 * </ds-list>
 *
 * <!-- Checkbox leading (selection list) -->
 * <ds-list>
 *   <ds-list-item overline="Team" primary="Alice Johnson" secondary="alice@co.com" variant="3-lines">
 *     <ds-checkbox leading aria-label="Select Alice Johnson" />
 *   </ds-list-item>
 * </ds-list>
 *
 * <!-- Text only -->
 * <ds-list>
 *   <ds-list-item primary="Simple item" />
 * </ds-list>
 */

import {
  Component,
  Directive,
  Input,
  ContentChild,
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

/** Marker directive — place on any projected leading-slot element: `<span leading class="ds-icon">` */
@Directive({ selector: '[leading]', standalone: true })
export class DsLeadingDirective {}

/** Marker directive — place on any projected trailing-slot element: `<span trailing class="ds-icon ds-icon--sm">` */
@Directive({ selector: '[trailing]', standalone: true })
export class DsTrailingDirective {}

@Component({
  selector: 'ds-list-item',
  standalone: true,
  imports: [DsLeadingDirective, DsTrailingDirective, MatListModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListItemComponent implements AfterContentInit {
  @Input() primary = '';
  @Input() secondary = '';
  @Input() overline = '';
  @Input() interactive = false;
  @Input() disabled = false;
  /**
   * '1-line' | '2-lines' | '3-lines'
   * Note: '1-line' and '2-lines' produce the natural single/two-text layout with no
   * CSS modifier. '3-lines' applies `.ds-list-item--3-lines` which clamps the secondary
   * text to 2 lines via -webkit-line-clamp.
   */
  @Input() variant: '1-line' | '2-lines' | '3-lines' = '1-line';

  @ContentChild(DsLeadingDirective) private _leadingRef?: DsLeadingDirective;
  @ContentChild(DsTrailingDirective) private _trailingRef?: DsTrailingDirective;

  hasLeading = false;
  hasTrailing = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterContentInit(): void {
    this.hasLeading = !!this._leadingRef;
    this.hasTrailing = !!this._trailingRef;
    this.cdr.markForCheck();
  }
}

@Component({
  selector: 'ds-list',
  standalone: true,
  imports: [],
  imports: [MatListModule],
  template: `<mat-list class="ds-list"><ng-content /></mat-list>`,
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsListComponent {}
