import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
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
import { UtilService } from './shared/services/util.service';
import { DashboardModule } from './dashboard/dashboard.module';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.ballSpin,
  bgsOpacity: 0.7
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    DashboardModule,
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
    ReferralService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
