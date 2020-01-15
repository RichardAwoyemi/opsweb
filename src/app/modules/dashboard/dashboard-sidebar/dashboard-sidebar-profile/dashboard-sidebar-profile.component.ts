import { Component } from '@angular/core';
import { ActiveSidebarSettings } from '../../dashboard';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard-sidebar-profile',
  templateUrl: './dashboard-sidebar-profile.component.html',
  styleUrls: ['./dashboard-sidebar-profile.component.css']
})
export class DashboardSidebarProfileComponent {
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  setActiveSidebar(selectedOption: string) {
    this.dashboardService.activeSidebarSetting.next(selectedOption);
  }
}
