import { BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './register.page.html',
})
export class RegisterComponent {
  isMobile: Observable<BreakpointState>;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    public router: Router
  ) { }

  model: any = {};

  public resolved(captchaResponse: string) {
    this.logger.debug(`Resolved captcha with response ${captchaResponse}:`);
  }

  register() {
    this.authService.register(this.model.email, this.model.password, this.model.firstName,
      this.model.lastName).then(() => {
    });
  }
}
