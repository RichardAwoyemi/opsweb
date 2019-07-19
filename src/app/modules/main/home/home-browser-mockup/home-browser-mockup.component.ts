import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-browser-mockup',
  templateUrl: './home-browser-mockup.component.html',
  styleUrls: ['./home-browser-mockup.component.css']
})
export class HomeBrowserMockupComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  @Input() img: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }
}
