import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  today: number = Date.now();
  copyrightMessage = ' Opsonion. All rights reserved.';
  footerSubscription: Subscription;
  currentRoute: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private routerService: RouterService,
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.footerSubscription = this.routerService.currentRoute.subscribe(result => {
      if (result) {
        this.currentRoute = result;
      }
    });
  }

  checkLoggedOutRoute() {
    RouterService.checkLoggedOutRoute(this.currentRoute);
  }
}
