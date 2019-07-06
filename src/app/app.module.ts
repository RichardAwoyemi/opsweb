import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';

import { AuthService } from './auth/services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './shared/services/user.service';
import { ReferralService } from './dashboard/services/referral.service';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from 'ngx-ui-loader';
import { LoggerModule } from 'ngx-logger';
import { HomeModule } from './home/home.module';
import { DashboardFooterComponent } from './dashboard/components/dashboard-footer/dashboard-footer.component';
import { DashboardNavbarComponent } from './dashboard/components/dashboard-navbar/dashboard-navbar.component';
import { UtilService } from './shared/services/util.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.ballSpin,
  bgsOpacity: 0.7
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardFooterComponent,
    DashboardNavbarComponent,
  ],
  entryComponents: [
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoggerModule.forRoot(environment.logging),
  ],
  providers: [
    AuthService,
    UtilService,
    UserService,
    ReferralService,
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
