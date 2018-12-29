import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['home']);
    }
    return true;
  }
}
