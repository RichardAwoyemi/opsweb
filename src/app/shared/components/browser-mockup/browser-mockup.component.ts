import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-browser-mockup',
  templateUrl: './browser-mockup.component.html',
  styleUrls: ['./browser-mockup.component.css']
})
export class BrowserMockupComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  @Input() img: string;
  @Input() view: string;
  imageStyle: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  setImageOpacity(opacity) {
    this.imageStyle = {'opacity': opacity};
  }
}
