import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../_modals/modal.component';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private modalService: NgbModal,
  ) { }

  model: any = {};

  ngOnInit() {
    localStorage.removeItem('loggedIn');
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  login() {
    const email = this.model.email;
    const password = this.model.password;
    this.authService.signIn(email, password);
  }
}
