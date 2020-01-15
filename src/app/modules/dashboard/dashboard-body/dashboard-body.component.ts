import { Component, HostListener, OnInit } from '@angular/core';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { Subscription } from 'rxjs';
import { ActiveSidebarSettings } from '../dashboard';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-body',
  templateUrl: './dashboard-body.component.html'
})
export class DashboardBodyComponent implements OnInit {
  innerHeight: number;
  activeSidebar: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_WEBSITES: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_TEMPLATES: string = ActiveSidebarSettings.Templates;
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  ACTIVE_SIDEBAR_REWARDS: string = ActiveSidebarSettings.Rewards;

  private activeSidebarSettingSubscription: Subscription;

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.activeSidebarSettingSubscription = this.dashboardService.activeSidebarSetting.subscribe((response => {
      if (response) {
        this.activeSidebar = response;
      }
    }));
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }
}
