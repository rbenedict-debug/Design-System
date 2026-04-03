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

const NAV_BUTTON_CONFIG: Record<NavButtonType, { icon: string; label: string }> = {
  tickets:   { icon: 'inbox',         label: 'Tickets'   },
  assets:    { icon: 'desktop_mac',   label: 'Assets'    },
  analytics: { icon: 'equalizer',     label: 'Analytics' },
  settings:  { icon: 'settings',      label: 'Settings'  },
  campaigns: { icon: 'campaign',      label: 'Campaign'  },
  home:      { icon: 'home',          label: 'Home'      },
  requests:  { icon: 'inbox',         label: 'Requests'  },
  systems:   { icon: 'monitor_heart', label: 'Systems'   },
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

  get config(): { icon: string; label: string } {
    return NAV_BUTTON_CONFIG[this.type];
  }
}
