import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }
}
