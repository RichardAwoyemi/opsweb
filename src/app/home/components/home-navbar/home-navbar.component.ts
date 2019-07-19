import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html'
})
export class HomeNavbarComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset ]);
  }
}
