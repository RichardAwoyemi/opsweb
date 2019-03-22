import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  templateUrl: './transactions.component.html'
})
export class TransactionsComponent implements OnInit, AfterViewChecked {
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
