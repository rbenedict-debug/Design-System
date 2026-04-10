import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-subnav-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subnav-header.component.html',
  styleUrls: ['./subnav-header.component.scss'],
  host: { style: 'display: contents' },
})
export class SubnavHeaderComponent {
  /** Section icon — Material Symbols Rounded name. Defaults to 'language'. */
  @Input() icon: string = 'language';
  @Input() text: string = 'Global';
  @Input() expanded: boolean = false;
  @Input() disabled: boolean = false;

  @Output() expandedChange = new EventEmitter<boolean>();

  toggle(): void {
    if (!this.disabled) {
      this.expanded = !this.expanded;
      this.expandedChange.emit(this.expanded);
    }
  }
}
