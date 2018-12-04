import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  user: User;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public userService: UserService) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
