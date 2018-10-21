import { Component, OnInit } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './support.component.html',
  styleUrls: [ './support.component.css' ]
})
export class SupportComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    library.add(faAngleRight);
    this.isMobile = this.breakpointObserver.observe(Breakpoints.Handset);
  }
}
