import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  constructor(
    public http: HttpClient,
    private router: Router,
    public envService: EnvService) {
  }

  private user: User = new User();

  register(user: User) {
    const apiUrl = this.envService.getApiUrl();
    return this.http.post(apiUrl + '/register', user).pipe(map(response => response));
  }

  login(user: User) {
    let apiUrl = this.envService.getApiUrl();
    apiUrl = apiUrl + '/login';
    this.http.post<Observable<Response>>(apiUrl, {
      username: user.username,
      password: user.password
    }).subscribe(response => {
      if (response['message'] === 'Authentication success') {
        sessionStorage.setItem('token', btoa(user.username + ':' + user.password));
        if (environment.production === false) {
          console.log(response);
          console.log('Authentication success');
          console.log('Token is: ' + btoa(user.username + ':' + user.password));
          this.router.navigate(['/']);
        }
      } else {
        if (environment.production === false) {
          console.log(response);
          console.log('Authentication failed');
        }
      }
    });
  }

  getUserAccount(): User {
    let apiUrl = this.envService.getApiUrl();
    apiUrl = apiUrl + '/account';

    const sessionStorageObjectSize = Object.keys(sessionStorage['token']).length;
    if (environment.production === false) {
      console.log('Returned token object has ' + sessionStorageObjectSize + ' properties');
    }

    if (sessionStorageObjectSize === 0) {
      if (environment.production === false) {
        console.log('Token not found');
      }
      return null;
    }

    if (environment.production === false) {
      console.log('Authorization : Basic ' + sessionStorage.getItem('token'));
    }

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });
    const options = { headers: headers };

    this.http.post<Observable<Response>>(apiUrl, {}, options).subscribe(response => {
      if (environment.production === false) {
        console.log(response);
      }
      if (response['message'] === 'User found') {
        this.user.id = response['data'].id;
        this.user.email = response['data'].email;
        this.user.username = response['data'].username;
        this.user.firstName = response['data'].firstName;
        this.user.lastName = response['data'].lastName;
        this.user.avatar = response['data'].avatar;
      }
    });
    return this.user;
  }

  logout() {
    sessionStorage.setItem('token', '');
    this.router.navigate(['/']);
  }
}
