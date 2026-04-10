import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-subnav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subnav-button.component.html',
  styleUrls: ['./subnav-button.component.scss'],
  host: { style: 'display: contents' },
})
export class SubnavButtonComponent {
  @Input() label: string = 'Label';
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showFilter: boolean = false;

  @Output() navClick = new EventEmitter<void>();
  @Output() filterClick = new EventEmitter<void>();

  onNavClick(): void {
    if (!this.disabled) {
      this.navClick.emit();
    }
  }

  onFilterClick(event: Event): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.filterClick.emit();
    }
  }

  /** Keyboard support for the div+role="button" wrapper (when showFilter=true). */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.showFilter) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onNavClick();
    }
  }
}
