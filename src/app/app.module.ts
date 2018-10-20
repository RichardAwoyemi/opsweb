import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecaptchaModule } from 'ng-recaptcha';
import { HttpClientModule } from '@angular/common/http';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { CareersComponent } from './careers/careers.component';
import { ContactComponent } from './contact/contact.component';
import { LegalComponent } from './legal/legal.component';
import { LoginComponent } from './login/login.component';
import { PressComponent } from './press/press.component';
import { PricesComponent } from './prices/prices.component';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { SupportComponent } from './support/support.component';
import { ServicesComponent } from './services/services.component';
import { PricesService } from 'src/providers/prices/prices.service';

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
    PricesComponent,
    RegisterComponent,
    ServicesComponent,
    StatusComponent,
    SupportComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    RecaptchaModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    PricesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
