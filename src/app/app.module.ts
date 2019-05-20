import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { Ng5SliderModule } from 'ng5-slider';

import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { PressComponent } from './press/press.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnonymousGuard } from './_guards/anonymous.guard';
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
import { SettingsComponent } from './settings/settings.component';
import { InviteComponent } from './invite/invite.component';
import { ExcelService } from './_services/excel.service';
import { CsvService } from './_services/csv.service';
import { PdfService } from './_services/pdf.service';
import { InboxComponent } from './inbox/inbox.component';
import { ReferralService } from './_services/referral.service';
import { FirebaseService } from './_services/firebase.service';
import { DataService } from './_services/data.service';
import { ModalService } from './_services/modal.service';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';
import { LoggerModule } from 'ngx-logger';
import { ImgurService } from './_services/imgur.service';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { ArchwizardModule } from 'angular-archwizard';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ReferralComponent } from './referral/referral.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TaskService } from './_services/task.service';
import { DragulaModule } from 'ng2-dragula';
import { BlockSpecialCharacterDirective } from './_directives/block.special.character.directive';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.ballSpin,
  bgsOpacity: 0.7
};

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: {
    delay: 4000,
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    LegalComponent,
    LoginComponent,
    PressComponent,
    RegisterComponent,
    DashboardComponent,
    ModalComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    SettingsComponent,
    InviteComponent,
    InboxComponent,
    OnboardingComponent,
    ReferralComponent,
    NewTaskComponent,
    BlockSpecialCharacterDirective
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    RecaptchaModule.forRoot(),
    DragulaModule.forRoot(),
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
    Ng5SliderModule,
    SwiperModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoggerModule.forRoot(environment.logging),
    ScrollToModule.forRoot(),
    ImageCropperModule,
    ArchwizardModule,
    TagInputModule
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
    TaskService,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LeAv3UUAAAAAPYLttDEohg_KgyNifLN0Cx6IlPc',
      } as RecaptchaSettings,
    },
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
