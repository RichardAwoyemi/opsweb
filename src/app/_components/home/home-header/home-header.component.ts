import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html'
})
export class HomeHeaderComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  title = 'The marketplace for services.';
  subtitle = 'Opsonion is a marketplace for specialist skills, connecting clients to vetted talent who deliver high-quality work.';
  headerImage = '/assets/img/home.svg';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
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
