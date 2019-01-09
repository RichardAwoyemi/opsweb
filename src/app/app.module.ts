import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

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
import { AccountManagementComponent } from './support/account-management/account-management.component';
import { PaymentMethodsComponent } from './support/payment-methods/payment-methods.component';
import { SecurityComponent } from './support/security/security.component';
import { TaskAdministrationComponent } from './support/task-administration/task-administration.component';
import { TransactionsComponent } from './support/transactions/transactions.component';
import { WalletServicesComponent } from './support/wallet-services/wallet-services.component';
import { ServicesComponent } from './services/services.component';

import { MarketsService } from 'src/app/_services/markets.service';
import { PriceComponent } from './markets/price/price.component';
import { EnvService } from './_services/env.service';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnonymousGuard } from './_guards/anonymous.guard';
import { AccountsComponent } from './accounts/accounts.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { ModalComponent } from './_modals/modal.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { UtilService } from './_services/util.service';
import { UserService } from './_services/user.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetupProfileComponent } from './setup-profile/setup-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CareersComponent,
    ContactComponent,
    LegalComponent,
    LoginComponent,
    PressComponent,
    PriceComponent,
    MarketsComponent,
    RegisterComponent,
    ServicesComponent,
    StatusComponent,
    SupportComponent,
    AccountManagementComponent,
    PaymentMethodsComponent,
    SecurityComponent,
    TaskAdministrationComponent,
    TransactionsComponent,
    WalletServicesComponent,
    DashboardComponent,
    AccountsComponent,
    ExchangeComponent,
    ModalComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    SetupProfileComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    MarketsService,
    EnvService,
    AuthService,
    UtilService,
    UserService,
    AuthGuard,
    AnonymousGuard,
    NgbModule,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeAv3UUAAAAAPYLttDEohg_KgyNifLN0Cx6IlPc',
      } as RecaptchaSettings,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
