import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.service';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';
import * as userActions from 'src/app/modules/core/store/user/user.actions';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  currentRoute: string;
  ngUnsubscribe = new Subject<void>();

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
    this.routerService.currentRoute.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
