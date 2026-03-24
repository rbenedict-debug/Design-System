import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsSearchComponent } from '../search/search.component';

/**
 * Onflo Design System — Table Toolbar
 *
 * The toolbar displayed above an AG Grid table — contains search, filter,
 * settings, and optional action controls.
 *
 * Layout:
 *   [Left panel: action buttons] [Right panel: search · extras · filter · settings · download]
 *
 * When showActions is false, the right panel expands to fill the full width.
 *
 * Content projection slots:
 *   toolbar-actions  — left-side action buttons (shown only when showActions=true)
 *   toolbar-extra    — right-side extras between the search field and the fixed icon buttons
 *   toolbar-trailing — right-side buttons after settings (replaces or augments download)
 *
 * @example
 *   <!-- Full toolbar with actions -->
 *   <ds-table-toolbar [(filterActive)]="filterOpen" [(settingsActive)]="colsOpen">
 *     <ng-container toolbar-actions>
 *       <button ds-button variant="filled">Add Row</button>
 *       <button ds-button variant="outlined">Import</button>
 *     </ng-container>
 *   </ds-table-toolbar>
 *
 *   <!-- Search-only (no action panel) -->
 *   <ds-table-toolbar [showActions]="false" (searchValueChange)="onSearch($event)" />
 *
 *   <!-- Custom trailing button, no download -->
 *   <ds-table-toolbar [showDownload]="false">
 *     <ng-container toolbar-trailing>
 *       <button class="ds-table-toolbar__btn" type="button" aria-label="Export">
 *         <span class="ds-icon">upload_file</span>
 *       </button>
 *     </ng-container>
 *   </ds-table-toolbar>
 *
 * ADA:
 *   Filter and settings buttons expose aria-pressed for screen readers.
 *   Download and trailing buttons require aria-label on the projected elements.
 */
@Component({
  selector: 'ds-table-toolbar',
  standalone: true,
  imports: [CommonModule, DsSearchComponent],
  templateUrl: './table-toolbar.component.html',
  styleUrls: ['./table-toolbar.component.scss'],
})
export class DsTableToolbarComponent {
  /** Show the left-side action button panel. Default: true. */
  @Input() showActions = true;

  /** Placeholder text shown in the search field when empty. */
  @Input() searchPlaceholder = 'Search';

  /** Accessible label for the search field. */
  @Input() searchAriaLabel = 'Search';

  /** Current search field value. Use [(searchValue)] for two-way binding. */
  @Input() searchValue = '';

  /** Whether the filter toggle button is in the active/selected state. */
  @Input() filterActive = false;

  /** Whether the settings toggle button is in the active/selected state. */
  @Input() settingsActive = false;

  /** Show the download icon button. Default: true. */
  @Input() showDownload = true;

  /** Emits the new search value on every keystroke. */
  @Output() searchValueChange = new EventEmitter<string>();

  /** Emits the current search value when the user presses Enter. */
  @Output() search = new EventEmitter<string>();

  /** Emits the new filterActive state when the filter button is toggled. */
  @Output() filterActiveChange = new EventEmitter<boolean>();

  /** Emits the new settingsActive state when the settings button is toggled. */
  @Output() settingsActiveChange = new EventEmitter<boolean>();

  /** Emits when the download button is clicked. */
  @Output() downloadClick = new EventEmitter<void>();

  onSearchValueChange(value: string): void {
    this.searchValue = value;
    this.searchValueChange.emit(value);
  }

  onFilterToggle(): void {
    this.filterActive = !this.filterActive;
    this.filterActiveChange.emit(this.filterActive);
  }

  onSettingsToggle(): void {
    this.settingsActive = !this.settingsActive;
    this.settingsActiveChange.emit(this.settingsActive);
  }
}
