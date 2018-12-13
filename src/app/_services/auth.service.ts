import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { EnvService } from './env.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {
  constructor(
    public http: HttpClient,
    private envService: EnvService,
    private myRoute: Router,
  ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    const token: string = localStorage.getItem('token');
    if (token === null) {
      return false;
    } else {
      const headers: HttpHeaders = new HttpHeaders({
        'Authorization': 'Basic ' + token
      });
      const options = { headers: headers };
      const apiUrl = this.envService.getApiUrl() + '/account';
      return this.http.post(apiUrl, options).pipe(map(response => {
        if (environment.production === false) {
          console.log(response);
        }
        return true;
      })),
      catchError(this.handleServerError);
    }
  }

  handleServerError(): any {
    return () => {
      return false;
    };
  }

  logout() {
    localStorage.removeItem('token');
    this.myRoute.navigate(['login']);
  }
}
