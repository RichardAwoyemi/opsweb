import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  templateUrl: './security.component.html'
})
export class SecurityComponent implements OnInit, AfterViewChecked {
  isMobile: Observable<BreakpointState>;
  private scrollExecuted = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private utilService: UtilService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }

  ngAfterViewChecked() {
    this.utilService.automaticScroll(this.scrollExecuted, this.activatedRoute);
  }
}
