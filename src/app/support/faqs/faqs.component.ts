import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  templateUrl: './faqs.component.html'
})
export class FaqsComponent implements OnInit, AfterViewChecked {
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


class MyAppComponent {
  constructor(router: Router) {

    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(true); }
        }
      }
    });

  }
}