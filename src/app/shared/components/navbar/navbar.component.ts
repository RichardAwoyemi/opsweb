import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as userActions from 'src/app/modules/core/store/user/user.actions';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  currentRoute: string;
  navbarSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private routerService: RouterService,
    private authService: AuthService,
    private authStore: Store<fromAuth.State>,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.routerService.currentRoute.next(window.location.pathname);
    this.navbarSubscription = this.routerService.currentRoute.subscribe(result => {
      if (result) {
        this.currentRoute = result;
      }
    });
  }

  checkLoggedOutRoute() {
    return RouterService.checkLoggedOutRoute(this.currentRoute);
  }

  checkIfIsOnDomain() {
    return RouterService.checkIfIsOnDomain();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  signOut() {
    this.userStore.dispatch(userActions.signOut());
    this.authStore.dispatch(authActions.signOut());
  }
}
