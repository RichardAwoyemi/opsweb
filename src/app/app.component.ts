import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from './_services/user.service';
import { User } from './_models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService) {
  }

  loggedIn = false;
  user: User;

  ngOnInit() {
    this.user = this.userService.getUserAccount();
  }

  ngAfterViewInit() {
    let userObjectSize = 0;

    if (this.user != null) {
      userObjectSize = Object.keys(this.user).length;
       if (environment.production === false) {
         console.log('Returned user object has ' + userObjectSize + ' properties');
       }
     }

     if (userObjectSize > 0) {
       this.loggedIn = true;
     }
  }

  onActivate(event) {
    window.scroll(0, 0);
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }

  logout() {
    this.userService.logout();
  }
}
