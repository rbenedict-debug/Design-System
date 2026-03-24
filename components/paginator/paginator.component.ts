/**
 * ds-paginator
 *
 * Based on Angular Material mat-paginator.
 * Import MatPaginatorModule in your Angular module.
 *
 * @example
 * <ds-paginator
 *   [total]="243"
 *   [pageSize]="10"
 *   [pageIndex]="0"
 *   (pageChange)="onPageChange($event)"
 * />
 */

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface DsPageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'ds-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsPaginatorComponent {
  @Input() total = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() showFirstLastButtons = true;
  @Output() pageChange = new EventEmitter<DsPageEvent>();

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  get rangeStart(): number {
    return this.pageIndex * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min((this.pageIndex + 1) * this.pageSize, this.total);
  }

  get isFirstPage(): boolean { return this.pageIndex === 0; }
  get isLastPage(): boolean  { return this.pageIndex >= this.totalPages - 1; }

  private emit(): void {
    this.pageChange.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize, length: this.total });
  }

  firstPage(): void  { this.pageIndex = 0; this.emit(); }
  prevPage(): void   { if (!this.isFirstPage) { this.pageIndex--; this.emit(); } }
  nextPage(): void   { if (!this.isLastPage) { this.pageIndex++; this.emit(); } }
  lastPage(): void   { this.pageIndex = this.totalPages - 1; this.emit(); }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 0;
    this.emit();
  }
}
