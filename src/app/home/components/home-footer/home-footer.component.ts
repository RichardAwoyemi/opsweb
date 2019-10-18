import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html'
})
export class HomeFooterComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  today: number = Date.now();
  copyrightMessage = ' Opsonion. All rights reserved.';

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }
}
