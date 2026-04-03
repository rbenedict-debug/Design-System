import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AgentStatusVariant = 'call' | 'live';

@Component({
  selector: 'ds-agent-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agent-status.component.html',
  styleUrls: ['./agent-status.component.scss'],
  host: { style: 'display: contents' },
})
export class AgentStatusComponent {
  @Input() variant: AgentStatusVariant = 'call';
  @Input() online: boolean = true;

  get icon(): string {
    return this.variant === 'call' ? 'support_agent' : 'forum';
  }

  get statusLabel(): string {
    return this.online ? 'Online' : 'Offline';
  }

  get ariaLabel(): string {
    const typeName = this.variant === 'call' ? 'Call agent' : 'Live agent';
    return `${typeName} status: ${this.statusLabel}`;
  }
}
