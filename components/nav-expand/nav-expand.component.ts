import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ds-nav-expand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-expand.component.html',
  styleUrls: ['./nav-expand.component.scss'],
  host: { style: 'display: contents' },
})
export class NavExpandComponent {
  /** Whether the sub-navigation panel is currently open. */
  @Input() open: boolean = true;

  /** Emitted when the button is clicked — caller toggles the panel. */
  @Output() toggle = new EventEmitter<void>();

  get ariaLabel(): string {
    return this.open ? 'Collapse navigation' : 'Expand navigation';
  }

  get iconName(): string {
    return this.open ? 'right_panel_open' : 'right_panel_close';
  }

  onClick(): void {
    this.toggle.emit();
  }
}
