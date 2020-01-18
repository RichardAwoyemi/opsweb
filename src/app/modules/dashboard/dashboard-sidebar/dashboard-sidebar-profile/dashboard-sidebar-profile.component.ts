import { Component, HostListener, OnInit } from '@angular/core';
import { ActiveSidebarSettings } from '../../dashboard';
import { DashboardService } from '../../dashboard.service';
import { IUser } from '../../../../shared/models/user';
import * as fromUser from '../../../core/store/user/user.reducer';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { debounce } from '../../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-dashboard-sidebar-profile',
  templateUrl: './dashboard-sidebar-profile.component.html',
  styleUrls: ['./dashboard-sidebar-profile.component.css']
})
export class DashboardSidebarProfileComponent implements OnInit {
  ACTIVE_SIDEBAR_SETTINGS: string = ActiveSidebarSettings.AccountSettings;
  photoURL: string = '/assets/img/anonymous.jpg';
  user: IUser;
  dashboardSidebarWidth: number;

  constructor(
    private dashboardService: DashboardService,
    private userStore: Store<fromUser.State>,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.dashboardSidebarWidth = document.getElementById('dashboard-sidebar').offsetWidth - 30;

    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.dashboardSidebarWidth = document.getElementById('dashboard-sidebar').offsetWidth - 30;
  }

  redirectToBuilder() {
    this.router.navigate(['builder']).then(() => {
    });
  }

  setActiveSidebar(selectedOption: string) {
    this.dashboardService.activeSidebarSetting.next(selectedOption);
  }
}
