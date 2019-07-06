import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home-feature-card',
  templateUrl: './home-feature-card.component.html'
})
export class HomeFeatureCardComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  @Input() title: string;
  @Input() description: string;
  @Input() image: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }
}
