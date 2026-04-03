import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type NavButtonType =
  | 'tickets'
  | 'assets'
  | 'analytics'
  | 'settings'
  | 'campaigns'
  | 'home'
  | 'requests'
  | 'systems';

const NAV_BUTTON_CONFIG: Record<NavButtonType, { icon: string; filled: boolean; label: string }> = {
  tickets:   { icon: 'inbox',         filled: true,  label: 'Tickets'   },
  assets:    { icon: 'desktop_mac',   filled: false, label: 'Assets'    },
  analytics: { icon: 'equalizer',     filled: false, label: 'Analytics' },
  settings:  { icon: 'settings',      filled: true,  label: 'Settings'  },
  campaigns: { icon: 'campaign',      filled: false, label: 'Campaign'  },
  home:      { icon: 'home',          filled: false, label: 'Home'      },
  requests:  { icon: 'inbox',         filled: true,  label: 'Requests'  },
  systems:   { icon: 'monitor_heart', filled: false, label: 'Systems'   },
};

@Component({
  selector: 'ds-nav-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
  host: { style: 'display: contents' },
})
export class NavButtonComponent {
  @Input() type: NavButtonType = 'tickets';
  @Input() selected: boolean = false;

  get config(): { icon: string; filled: boolean; label: string } {
    return NAV_BUTTON_CONFIG[this.type];
  }
}
