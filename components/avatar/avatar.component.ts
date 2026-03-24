import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DsAvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Onflo Design System — Avatar
 *
 * A standalone Angular component wrapping the ds-avatar CSS class API.
 * Renders an image if src is provided; falls back to initials or a generic icon.
 *
 * For direct class usage without Angular:
 *   <div class="ds-avatar ds-avatar--md">
 *     <img class="ds-avatar__img" src="..." alt="Name" />
 *   </div>
 *
 * @example
 *   <ds-avatar src="photo.jpg" initials="RB" alt="Rebecca Benedict" />
 *   <ds-avatar initials="JD" size="lg" />
 *   <ds-avatar size="sm" />
 */
@Component({
  selector: 'ds-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class DsAvatarComponent implements OnInit {
  /** Image URL. Falls back to initials or icon if empty or on error. */
  @Input() src = '';

  /** Initials to show when no image is available (max 2 chars). */
  @Input() initials = '';

  /** Alt text for the image. */
  @Input() alt = '';

  /** Size variant. Default: 'md' */
  @Input() size: DsAvatarSize = 'md';

  /** Whether the image failed to load. */
  imageError = false;

  get avatarClasses(): string {
    return `ds-avatar ds-avatar--${this.size}`;
  }

  get showImage(): boolean {
    return !!this.src && !this.imageError;
  }

  get showInitials(): boolean {
    return !this.showImage && !!this.initials;
  }

  get showIcon(): boolean {
    return !this.showImage && !this.initials;
  }

  get displayInitials(): string {
    return this.initials.slice(0, 2).toUpperCase();
  }

  ngOnInit(): void {
    this.imageError = false;
  }

  onImageError(): void {
    this.imageError = true;
  }
}
