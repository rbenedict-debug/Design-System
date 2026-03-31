/**
 * ds-chip
 *
 * Based on Angular Material mat-chip.
 * Import MatChipsModule in your Angular module.
 *
 * @example
 * <ds-chip label="Design" icon="local_offer" (removed)="onRemove()" />
 * <ds-chip label="Error item" [error]="true" (removed)="onRemove()" />
 * <ds-chip label="No remove" [removable]="false" />
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'ds-chip',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsChipComponent {
  @Input() label = '';
  @Input() icon?: string;
  @Input() removable = true;
  @Input() disabled = false;
  @Input() error = false;
  @Output() removed = new EventEmitter<void>();
}
