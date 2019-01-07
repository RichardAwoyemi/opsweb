import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  userData: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }
}
