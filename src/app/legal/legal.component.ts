import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './legal.component.html'
})
export class LegalComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset);
  }
}
