import { NgModule } from '@angular/core';
import { RegisterComponent } from './pages/register/register.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './pages/login/login.page';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.page';
import { RouterModule } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { DashboardModule } from '../dashboard/dashboard.module';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LoginFormComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    SharedModule,
    DashboardModule,
    CommonModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeAv3UUAAAAAPYLttDEohg_KgyNifLN0Cx6IlPc',
      } as RecaptchaSettings,
    }
  ]
})

export class AuthModule { }
