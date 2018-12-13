import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { User } from '../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnvService } from './env.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ErrorModalComponent } from '../_modals/error.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class UserService {
  constructor(
    public http: HttpClient,
    private modalService: NgbModal,
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
        localStorage.setItem('token', btoa(user.username + ':' + user.password));
        if (environment.production === false) {
          console.log(response);
          console.log('Authentication success');
          console.log('Token is: ' + btoa(user.username + ':' + user.password));
        }
        location.reload();
      } else {
        if (environment.production === false) {
          console.log(response);
          console.log('Authentication failed');
        }
        const modalReference = this.modalService.open(ErrorModalComponent);
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = 'Your username and password appear to be incorrect. Please try again.';
        this.router.navigate(['/login']);
      }
    }, err => {
      if (environment.production === false) {
        console.log('The API service is currently inaccessible.');
        console.log(err);
        const modalReference = this.modalService.open(ErrorModalComponent);
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = 'We are unable to log you in at this time. Please try again.';
      }
    });
  }

  getUserAccount(): User {
    const apiUrl = this.envService.getApiUrl() + '/account';
    if (!localStorage.getItem('token')) {
      return null;
    }

    if (environment.production === false) {
      console.log('Authorization : Basic ' + localStorage.getItem('token'));
    }

    const headers: HttpHeaders = new HttpHeaders({
      'Authorization': 'Basic ' + localStorage.getItem('token')
    });
    const options = { headers: headers };

    this.http.post<Observable<Response>>(apiUrl, {}, options)
      .subscribe(response => {
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
      },
        err => {
          if (environment.production === false) {
            console.log(err);
          }
        });
    return this.user;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
