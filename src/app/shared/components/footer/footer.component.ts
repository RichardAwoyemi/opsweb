import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RouterService } from '../../services/router.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.currentRoute = this.router.url;
    this.footerSubscription = RouterService.currentRoute.subscribe(result => {
      if (result) {
        this.currentRoute = result;
      }
    });
  }
}
