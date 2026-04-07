/**
 * ds-tag
 *
 * Navy pill chip for showing applied tags/filters. Use instead of ds-chip
 * when the design calls for a navy background with primary-text colour.
 *
 * Variants:
 *   default — removable tag (set [removable]="false" for read-only / display-only)
 *   more    — overflow count chip (e.g. "+2") — emits (moreClick)
 *   add     — dashed-border action button to create a new tag — emits (add)
 *
 * @example
 * <ds-tag label="Design" (removed)="onRemove()" />
 * <ds-tag label="Read only" [removable]="false" />
 * <ds-tag variant="more" [moreCount]="3" (moreClick)="onShowMore()" />
 * <ds-tag variant="add" (add)="onAddTag()" />
 * <ds-tag label="Design" size="sm" (removed)="onRemove()" />
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'ds-tag',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsTagComponent {
  @Input() label = '';
  @Input() variant: 'default' | 'more' | 'add' = 'default';
  @Input() size: 'md' | 'sm' = 'md';
  @Input() moreCount = 0;
  @Input() removable = true;
  @Input() disabled = false;
  @Input() error = false;
  @Output() removed = new EventEmitter<void>();
  @Output() moreClick = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();
}
