import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSidebarSettings } from '../../dashboard';
import { DashboardService } from '../../dashboard.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-dashboard-sidebar-links',
  templateUrl: './dashboard-sidebar-menu.component.html'
})
export class DashboardSidebarMenuComponent {
  sidebarWebsitesTab: string = 'nav-link';
  sidebarTemplatesTab: string = 'nav-link';
  sidebarAccountsTab: string = 'nav-link';
  sidebarRewardsTab: string = 'nav-link';
  ACTIVE_SIDEBAR_WEBSITES: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_TEMPLATES: string = ActiveSidebarSettings.Templates;
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  ACTIVE_SIDEBAR_REWARDS: string = ActiveSidebarSettings.Rewards;

  constructor(
    public router: Router,
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {

  }

  signOut() {
    this.authService.signOut();
  }

  setActiveSidebar(selectedOption) {
    this.dashboardService.activeSidebarSetting.next(selectedOption);
  }
}
