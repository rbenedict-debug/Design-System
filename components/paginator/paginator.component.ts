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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface DsPageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}

@Component({
  selector: 'ds-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
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

  onPage(event: PageEvent): void {
    this.pageChange.emit({ pageIndex: event.pageIndex, pageSize: event.pageSize, length: event.length });
  }
}
