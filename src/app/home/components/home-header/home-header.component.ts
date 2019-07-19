import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html'
})
export class HomeHeaderComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  title = 'We bring your ideas to life.';
  subtitle = 'Opsonion helps companies and top-tier brands create first class digital products and experiences.';
  headerImage = '/assets/img/home.svg';
  headerHeight$: Observable<string>;
  rowAlignment$: Observable<string>;
  columnWidth$: Observable<string>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.headerHeight$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? 'header h-fullscreen' : 'header')
    );
    this.rowAlignment$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? 'row align-items-center h-100' : 'row')
    );
    this.columnWidth$ = this.breakpointObserver.observe([Breakpoints.Handset]).pipe(
      map(isHandset => isHandset ? 'col-lg-6' : '')
    );
  }
}