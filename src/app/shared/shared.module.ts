import { NgModule } from '@angular/core';
import { SectionHeaderGroupComponent } from './components/section-header-group/section-header-group.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { SocialLoginButtonGroupComponent } from './components/social-login-button-group/social-login-button-group.component';

@NgModule({
  declarations: [
    SectionHeaderGroupComponent,
    ModalComponent,
    RegisterFormComponent,
    SocialLoginButtonGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  exports: [
    SectionHeaderGroupComponent,
    ModalComponent,
    RegisterFormComponent,
    SocialLoginButtonGroupComponent
  ]
})

export class SharedModule { }
