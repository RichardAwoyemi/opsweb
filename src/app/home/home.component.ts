import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { UtilService } from '../_services/util.service';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_services/auth.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  submitted = false;
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public modalService: NgbModal,
    public utilService: UtilService,
  ) {}

  ngOnInit() {
    library.add(faFacebookF, faGoogle, faLongArrowAltRight);
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset ]);
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  mobileGoogleSignIn() {
    this.authService.mobileGoogleSignIn();
  }

  facebookSignIn() {
    this.authService.facebookSignIn();
  }

  mobileFacebookSignIn() {
    this.authService.mobileFacebookSignIn();
  }
}
