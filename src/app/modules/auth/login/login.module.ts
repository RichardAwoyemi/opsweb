import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/modules/core/guards/anonymous.guard';
import { AuthService } from '../auth.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login.page';
import { SectionHeaderGroupModule } from 'src/app/shared/components/section-header-group/section-header-group.module';
import { FormsModule } from '@angular/forms';
import { SocialLoginButtonGroupModule } from 'src/app/shared/components/social-login-button-group/social-login-button-group.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AnonymousGuard] },
];

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SectionHeaderGroupModule,
    FormsModule,
    SocialLoginButtonGroupModule,
    CommonModule
  ],
  providers: [
    AuthService
  ]
})

export class LoginModule { }
