import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './account-management.component.html'
})
export class AccountManagementComponent implements OnInit, AfterViewChecked {
  isMobile: Observable<BreakpointState>;
  fragment: any;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset);
  }

  ngAfterViewChecked(): void {
    if (this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
    }
  }
}
