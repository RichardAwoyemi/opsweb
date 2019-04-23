import { NgModule, OnInit } from '@angular/core';
import { AuthGuard } from './_guards/auth.guard';
import { AnonymousGuard } from './_guards/anonymous.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { PressComponent } from './press/press.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InviteComponent } from './invite/invite.component';
import { ContactComponent } from './contact/contact.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AnonymousGuard]  },
  { path: 'home', component: HomeComponent, canActivate: [AnonymousGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AnonymousGuard] },
  { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [AnonymousGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AnonymousGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'invite/:id', component: InviteComponent, canActivate: [AnonymousGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule implements OnInit {
  constructor() { }

  ngOnInit() {
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
  }
}
