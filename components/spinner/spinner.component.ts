/**
 * ds-spinner
 *
 * Based on Angular Material mat-progress-spinner.
 * Import MatProgressSpinnerModule in your Angular module.
 *
 * @example
 * <!-- Indeterminate -->
 * <ds-spinner aria-label="Loading" />
 *
 * <!-- Determinate at 60% -->
 * <ds-spinner mode="determinate" [value]="60" />
 *
 * <!-- Small white spinner inside a button -->
 * <ds-spinner size="sm" color="white" />
 */

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ds-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsSpinnerComponent {
  /** 'indeterminate' | 'determinate' */
  @Input() mode: 'indeterminate' | 'determinate' = 'indeterminate';
  /** Progress value 0–100 (only for determinate mode) */
  @Input() value = 0;
  /** 'sm' | 'md' | 'lg' */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  /** 'brand' | 'white' | 'subtle' */
  @Input() color: 'brand' | 'white' | 'subtle' = 'brand';
  @Input() ariaLabel = 'Loading';

  get diameter(): number {
    const sizes: Record<string, number> = { sm: 24, md: 40, lg: 56 };
    return sizes[this.size];
  }
}
