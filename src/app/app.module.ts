import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { PressComponent } from './press/press.component';
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
import { ToolsComponent } from './tools/tools.component';
import { QRCodeModule } from 'angularx-qrcode';
import { SettingsComponent } from './settings/settings.component';
import { InviteComponent } from './invite/invite.component';
import { TasksComponent } from './tasks/tasks.component';
import { ExcelService } from './_services/excel.service';
import { CsvService } from './_services/csv.service';
import { PdfService } from './_services/pdf.service';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { InboxComponent } from './inbox/inbox.component';
import { ReferralService } from './_services/referral.service';
import { FirebaseService } from './_services/firebase.service';
import { DataService } from './_services/data.service';
import { ModalService } from './_services/modal.service';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';
import { LoggerModule } from 'ngx-logger';
import { ImgurService } from './_services/imgur.service';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ArchwizardModule } from 'angular-archwizard';
import { ImageCropperModule } from 'ngx-image-cropper';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.ballSpin,
  bgsOpacity: 0.7
};

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
    ToolsComponent,
    SettingsComponent,
    InviteComponent,
    TasksComponent,
    TaskComponent,
    UserComponent,
    NewTaskComponent,
    InboxComponent,
    OnboardingComponent
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
    AngularFireAuthModule,
    QRCodeModule,
    QuillModule,
    Ng5SliderModule,
    ImageCropperModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoggerModule.forRoot(environment.logging),
    ArchwizardModule
  ],
  providers: [
    AuthService,
    UtilService,
    UserService,
    ExcelService,
    CsvService,
    PdfService,
    ReferralService,
    AuthGuard,
    AnonymousGuard,
    FirebaseService,
    DataService,
    ModalService,
    ImgurService,
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
