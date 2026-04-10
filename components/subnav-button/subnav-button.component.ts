import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() navClick = new EventEmitter<void>();

  onNavClick(): void {
    if (!this.disabled) {
      this.navClick.emit();
    }
  }
}
