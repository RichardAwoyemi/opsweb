import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ForgotPasswordComponent } from '../auth/pages/forgot-password/forgot-password.page';
// import { LoginComponent } from '../auth/pages/login/login.page';
// import { RegisterComponent } from '../auth/pages/register/register.page';
// import { DashboardComponent } from '../dashboard/pages/dashboard/dashboard.page';
import { AnonymousGuard } from '../shared/guards/anonymous.guard';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ContactComponent } from './pages/contact/contact.page';
import { HomeComponent } from './pages/home/home.page';
// import { InviteComponent } from './pages/invite/invite.page';
import { LegalComponent } from './pages/legal/legal.page';
import { PressComponent } from './pages/press/press.page';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AnonymousGuard] },
  { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
  { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AnonymousGuard] },
  // { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  // { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
  // { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AnonymousGuard] },
  // { path: 'invite/:id', component: InviteComponent, canActivate: [AnonymousGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule implements OnInit {
  constructor() { }

  ngOnInit() {
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
  }
}
