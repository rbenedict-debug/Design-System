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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-spinner',
  standalone: true,
  imports: [CommonModule],
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

  // Circumference of r=18: 2π*18 ≈ 113.1px
  readonly CIRCUMFERENCE = 113.1;

  get strokeDashoffset(): number {
    const fraction = Math.min(100, Math.max(0, this.value)) / 100;
    return this.CIRCUMFERENCE * (1 - fraction);
  }
}
