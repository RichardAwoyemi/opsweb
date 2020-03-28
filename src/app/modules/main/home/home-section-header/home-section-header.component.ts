import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-section-header',
  templateUrl: './home-section-header.component.html'
})
export class HomeSectionHeaderComponent implements OnInit {
  headerPadding$: Observable<any>;
  @Input() title: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit() {
    this.headerPadding$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? {'padding-top': '3em'} : {'padding-bottom': '0px', 'padding-top': '70px'})
    );
  }
}
