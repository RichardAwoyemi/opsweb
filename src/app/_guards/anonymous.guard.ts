import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnonymousGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      if (environment.production === false) {
        console.log('Token not found, redirecting to home');
      }
      return true;
    } else {
      this.router.navigate(['dashboard']);
      if (environment.production === false) {
        console.log('Token found, redirecting to dashboard');
      }
      return false;
    }
  }
}
