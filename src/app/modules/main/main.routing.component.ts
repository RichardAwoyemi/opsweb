import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from 'src/app/modules/core/guards/anonymous.guard';
import { ContactComponent } from './contact/contact.page';
import { LegalComponent } from './legal/legal.page';
import { PressComponent } from './press/press.page';

const routes: Routes = [
  { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
  { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AnonymousGuard] },
  { path: 'login', loadChildren: '../auth/login/login.module#LoginModule', canActivate: [AnonymousGuard] },
  { path: 'register', loadChildren: '../auth/register/register.module#RegisterModule', canActivate: [AnonymousGuard] },
  { path: 'forgot-password', loadChildren: '../auth/forgot-password/forgot-password.module#ForgotPasswordModule', canActivate: [AnonymousGuard] },
  { path: 'verify-email', loadChildren: '../auth/verify-email/verify-email.module#VerifyEmailModule', canActivate: [AnonymousGuard] },
  { path: 'builder', loadChildren: '../builder/builder.module#BuilderModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule implements OnInit {
  constructor() { }

  ngOnInit() {
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' });
  }
}
