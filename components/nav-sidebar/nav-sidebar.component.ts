import { Component } from '@angular/core';

@Component({
  selector: 'ds-nav-sidebar',
  standalone: true,
  templateUrl: './nav-sidebar.component.html',
  styleUrls: ['./nav-sidebar.component.scss'],
  host: { style: 'display: contents' },
})
export class NavSidebarComponent {}
