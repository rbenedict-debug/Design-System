import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export type DsIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Onflo Design System — Icon
 *
 * Renders a Material Symbols Rounded icon. Supports outlined (default)
 * and filled styles via the variable font FILL axis.
 *
 * The font must be loaded in your app's index.html:
 *   <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" rel="stylesheet" />
 *
 * @example
 *   <ds-icon name="search" />
 *   <ds-icon name="bookmark" [filled]="true" />
 *   <ds-icon name="close" size="sm" />
 */
@Component({
  selector: 'ds-icon',
  standalone: true,
  template: `<span [class]="classes" [attr.aria-hidden]="true">{{ name }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DsIconComponent {
  /** Material Symbols icon name (e.g. "search", "bookmark", "close"). */
  @Input({ required: true }) name = '';

  /** Filled style (FILL=1). Default: false (outlined). */
  @Input() filled = false;

  /** Size. Default: 'md' (24px). */
  @Input() size: DsIconSize = 'md';

  get classes(): string {
    return [
      'ds-icon',
      this.size !== 'md' ? `ds-icon--${this.size}` : '',
      this.filled ? 'ds-icon--filled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
