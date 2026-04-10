import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-subnav-subheader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subnav-subheader.component.html',
  styleUrls: ['./subnav-subheader.component.scss'],
  host: { style: 'display: contents' },
})
export class SubnavSubheaderComponent {
  @Input() text: string = 'Label';
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
