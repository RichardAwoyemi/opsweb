import { NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { PressComponent } from './press/press.component';
import { MarketsComponent } from './markets/markets.component';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { SupportComponent } from './support/support.component';
import { ServicesComponent } from './services/services.component';
import { AccountManagementComponent } from './support/account-management/account-management.component';
import { TransactionsComponent } from './support/transactions/transactions.component';
import { PaymentMethodsComponent } from './support/payment-methods/payment-methods.component';
import { FaqsComponent } from './support/faqs/faqs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'legal', component: LegalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'press', component: PressComponent },
  { path: 'markets', component: MarketsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'status', component: StatusComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'support', component: SupportComponent },
  { path: 'account-management', component: AccountManagementComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'payment-methods', component: PaymentMethodsComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule implements OnInit {
  constructor() { }

  ngOnInit() {
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
  }
}
