import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  model: any = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }
}
