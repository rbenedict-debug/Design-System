/**
 * ds-divider
 *
 * Based on Angular Material mat-divider.
 * Import MatDividerModule in your Angular module.
 *
 * @example
 * <ds-divider />
 * <ds-divider variant="inset" />
 * <ds-divider variant="subhead" label="Section" />
 * <ds-divider variant="vertical" />
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'ds-divider',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsDividerComponent {
  /** 'full' | 'inset' | 'middle-inset' | 'subhead' | 'vertical' | 'vertical-inset' */
  @Input() variant: 'full' | 'inset' | 'middle-inset' | 'subhead' | 'vertical' | 'vertical-inset' = 'full';
  @Input() label = '';
}
