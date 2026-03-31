import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule, MatSlideToggleChange } from '@angular/material/slide-toggle';

/**
 * Onflo Design System — Toggle / Switch
 *
 * A standalone Angular component wrapping the ds-toggle CSS class API.
 * For direct class usage without Angular:
 *   <label class="ds-toggle">
 *     <input type="checkbox" class="ds-toggle__control" />
 *     <span class="ds-toggle__track"><span class="ds-toggle__thumb"></span></span>
 *     <span class="ds-toggle__label">Label</span>
 *   </label>
 *
 * @example
 *   <ds-toggle label="Enable notifications" [(checked)]="notificationsOn" />
 *   <ds-toggle label="Dark mode" [(checked)]="darkMode" />
 */
@Component({
  selector: 'ds-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsToggleComponent {
  /** Label text displayed next to the toggle. */
  @Input() label = '';

  /** Whether the toggle is on (checked). Use [(checked)] for two-way binding. */
  @Input() checked = false;

  /** Disables the toggle. */
  @Input() disabled = false;

  /** Show check/close icon inside the thumb (icon variant). */
  @Input() showIcon = false;

  /** Emits the new checked value when toggled. */
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: MatSlideToggleChange): void {
    this.checked = event.checked;
    this.checkedChange.emit(this.checked);
  }
}
