import { Component, HostListener, OnInit } from '@angular/core';
import { RouterService } from '../../shared/services/router.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html'
})
export class DashboardComponent implements OnInit {
  sidebarClass = 'col-md-3';
  bodyClass = 'col-md-9';
  innerWidth: number;
  isMobile: Observable<BreakpointState>;

  constructor(
    private routerService: RouterService,
    private ngxLoader: NgxUiLoaderService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.innerWidth = window.innerWidth;
    this.setDashboardPanelSizes();
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
    this.ngxLoader.stop();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.setDashboardPanelSizes();
  }

  setDashboardPanelSizes() {
    if (this.innerWidth > 1900) {
      this.bodyClass = 'col-md-10';
      this.sidebarClass = 'col-md-2';
    } else {
      this.bodyClass = 'col-md-9';
      this.sidebarClass = 'col-md-3';
    }
  }
}
