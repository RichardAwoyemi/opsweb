import { Component, OnInit, NgZone } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalComponent } from '../_modals/modal.component';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  errorMessage: String;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public modalService: NgbModal,
    public ngZone: NgZone,
    public router: Router
  ) { }

  model: any = {};

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  login() {
    const email = this.model.email;
    const password = this.model.password;
    this.authService.signIn(email, password).then((result) => {
      console.log(JSON.stringify(result.user));
      localStorage.setItem('user', JSON.stringify(result.user));
      this.ngZone.run(() => { this.router.navigate(['dashboard']); });
    }, error => {
      const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
      modalReference.componentInstance.header = 'Oops!';
      modalReference.componentInstance.message = error.message;
    });
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  facebookSignIn() {
    this.authService.facebookSignIn();
  }
}
