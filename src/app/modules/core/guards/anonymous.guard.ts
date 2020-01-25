import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AnonymousGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']).then(() => {
      });
    }
    return true;
  }
}
