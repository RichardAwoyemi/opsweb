import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './payment-methods.component.html',
})
export class PaymentMethodsComponent implements OnInit, AfterViewChecked {
  isMobile: Observable<BreakpointState>;
  private scrollExecuted = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }

  ngAfterViewChecked() {
    if (!this.scrollExecuted) {
      let routeFragmentSubscription: Subscription;

      // Automatic scroll

      routeFragmentSubscription = this.activatedRoute.fragment.subscribe(fragment => {
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.scrollExecuted = true;

            // Free resources

            setTimeout(() => {
              if (environment.production === false) {
                console.log('routeFragmentSubscription unsubscribe');
              }
              routeFragmentSubscription.unsubscribe();
            }, 1000);
          }
        }
      });
    }
  }
}
