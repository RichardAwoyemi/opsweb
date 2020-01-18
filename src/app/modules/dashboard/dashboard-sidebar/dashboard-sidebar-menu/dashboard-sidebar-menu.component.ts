import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveSidebarSettings } from '../../dashboard';
import { DashboardService } from '../../dashboard.service';
import { AuthService } from '../../../auth/auth.service';
import { IUser } from '../../../../shared/models/user';
import * as fromUser from '../../../core/store/user/user.reducer';
import { Store } from '@ngrx/store';
import { SimpleModalService } from '../../../../shared/components/simple-modal/simple-modal.service';

@Component({
  selector: 'app-dashboard-sidebar-links',
  templateUrl: './dashboard-sidebar-menu.component.html'
})
export class DashboardSidebarMenuComponent {
  ACTIVE_SIDEBAR_WEBSITES: string = ActiveSidebarSettings.Websites;
  ACTIVE_SIDEBAR_TEMPLATES: string = ActiveSidebarSettings.Templates;
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  ACTIVE_SIDEBAR_REWARDS: string = ActiveSidebarSettings.Rewards;
  user: IUser;
  messageDisplayed: boolean = false;

  constructor(
    public router: Router,
    private dashboardService: DashboardService,
    private simpleModalService: SimpleModalService,
    private authService: AuthService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (!this.user.firstName && !this.user.lastName) {
            this.dashboardService.activeSidebarSetting.next(ActiveSidebarSettings.AccountSettings);
            if (!this.messageDisplayed) {
              this.simpleModalService.displayMessage('👋', 'Please set up your account before continuing.');
              this.messageDisplayed = true;
            }
          }
        }
      });
  }

  signOut() {
    this.authService.signOut();
  }

  setActiveSidebar(selectedOption) {
    this.dashboardService.activeSidebarSetting.next(selectedOption);
  }

  setActiveSidebarClass(option) {
    if (option === this.dashboardService.activeSidebarSetting.getValue()) {
      return 'nav-link active';
    } else {
      return 'nav-link';
    }
  }
}
