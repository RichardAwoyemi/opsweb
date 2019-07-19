import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LoggerModule } from 'ngx-logger';
import { HomeModule } from './home/home.module';
import { UtilService } from './shared/services/util.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HomeModule,
    LoggerModule.forRoot(environment.logging),
  ],
  providers: [
    UtilService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
