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
import { PriceComponent } from './markets/price/price.component';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { SupportComponent } from './support/support.component';
import { ServicesComponent } from './services/services.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountManagementComponent } from './support/account-management/account-management.component';
import { TransactionsComponent } from './support/transactions/transactions.component';
import { PaymentMethodsComponent } from './support/payment-methods/payment-methods.component';
import { SecurityComponent } from './support/security/security.component';
import { TaskAdministrationComponent } from './support/task-administration/task-administration.component';
import { WalletServicesComponent } from './support/wallet-services/wallet-services.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { AnonymousGuard } from './_guards/anonymous.guard';
import { ExchangeComponent } from './exchange/exchange.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ToolsComponent } from './tools/tools.component';
import { SettingsComponent } from './settings/settings.component';
import { TasksComponent } from './tasks/tasks.component';
import { InviteComponent } from './invite/invite.component';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { environment } from 'src/environments/environment';

let routes: Routes = [ ];

if (!environment.referralMode) {
  routes = [
    { path: '', component: HomeComponent, canActivate: [AnonymousGuard]  },
    { path: 'home', component: HomeComponent, canActivate: [AnonymousGuard] },
    { path: 'about', component: AboutComponent, canActivate: [AnonymousGuard] },
    { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
    { path: 'exchange', component: ExchangeComponent, canActivate: [AuthGuard] },
    { path: 'careers', component: CareersComponent, canActivate: [AnonymousGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AnonymousGuard] },
    { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
    { path: 'markets', component: MarketsComponent, canActivate: [AnonymousGuard] },
    { path: 'markets/:symbol', component: PriceComponent, canActivate: [AnonymousGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
    { path: 'status', component: StatusComponent, canActivate: [AnonymousGuard] },
    { path: 'services', component: ServicesComponent, canActivate: [AnonymousGuard] },
    { path: 'support', component: SupportComponent, canActivate: [AnonymousGuard] },
    { path: 'support/account-management', component: AccountManagementComponent, canActivate: [AnonymousGuard] },
    { path: 'support/transactions', component: TransactionsComponent, canActivate: [AnonymousGuard] },
    { path: 'support/payment-methods', component: PaymentMethodsComponent, canActivate: [AnonymousGuard]},
    { path: 'support/security', component: SecurityComponent, canActivate: [AnonymousGuard] },
    { path: 'support/task-administration', component: TaskAdministrationComponent, canActivate: [AnonymousGuard] },
    { path: 'support/wallet-services', component: WalletServicesComponent, canActivate: [AnonymousGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'verify-email', component: VerifyEmailComponent, canActivate: [AnonymousGuard] },
    { path: 'tools', component: ToolsComponent, canActivate: [AuthGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AnonymousGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
    { path: 'task/:id', component: TaskComponent, canActivate: [AuthGuard] },
    { path: 'tasks/new', component: NewTaskComponent, canActivate: [AuthGuard] },
    { path: 'invite', component: InviteComponent, canActivate: [AuthGuard] },
    { path: 'invite/:id', component: InviteComponent, canActivate: [AnonymousGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
}

if (environment.referralMode) {
  routes = [
    { path: '', component: HomeComponent, canActivate: [AnonymousGuard]  },
    { path: 'home', component: HomeComponent, canActivate: [AnonymousGuard] },
    { path: 'contact', component: ContactComponent, canActivate: [AnonymousGuard] },
    { path: 'legal', component: LegalComponent, canActivate: [AnonymousGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AnonymousGuard] },
    { path: 'press', component: PressComponent, canActivate: [AnonymousGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AnonymousGuard] },
    { path: 'verify-email', component: VerifyEmailComponent, canActivate: [AnonymousGuard] },
    { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AnonymousGuard] },
    { path: 'invite', component: InviteComponent, canActivate: [AuthGuard] },
    { path: 'invite/:id', component: InviteComponent, canActivate: [AnonymousGuard] },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
}

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
