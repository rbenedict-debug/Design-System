import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-nav-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.scss'],
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavTabComponent {
  @Input() label = '';
  @Input() active = false;

  /** Emitted when the tab body is clicked (activate this tab). */
  @Output() tabClick = new EventEmitter<void>();

  /** Emitted when the × close button is clicked. */
  @Output() tabClose = new EventEmitter<void>();

  onTabClick(): void {
    this.tabClick.emit();
  }

  onCloseClick(event: MouseEvent): void {
    event.stopPropagation();
    this.tabClose.emit();
  }
}
