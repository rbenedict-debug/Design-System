import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

/**
 * Onflo Design System — Progress / Loader
 *
 * A standalone Angular component wrapping the ds-progress CSS class API.
 * For direct class usage without Angular:
 *   <!-- Determinate -->
 *   <div class="ds-progress" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
 *     <div class="ds-progress__track"><div class="ds-progress__fill" style="width:60%"></div></div>
 *   </div>
 *   <!-- Indeterminate -->
 *   <div class="ds-progress ds-progress--indeterminate" role="progressbar">
 *     <div class="ds-progress__track"><div class="ds-progress__fill"></div></div>
 *   </div>
 *
 * @example
 *   <ds-progress [value]="uploadProgress" label="Uploading file..." />
 *   <ds-progress label="Processing..." />   ← indeterminate (no value)
 */
@Component({
  selector: 'ds-progress',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
})
export class DsProgressComponent {
  /**
   * Progress value from 0–100. Null or undefined = indeterminate (animated).
   */
  @Input() value: number | null = null;

  /** Accessible label for the progress bar. */
  @Input() label = '';

  get isIndeterminate(): boolean {
    return this.value === null || this.value === undefined;
  }

  get clampedValue(): number {
    if (this.isIndeterminate) return 0;
    return Math.min(100, Math.max(0, this.value!));
  }

  get mode(): 'indeterminate' | 'determinate' {
    return this.isIndeterminate ? 'indeterminate' : 'determinate';
  }
}
