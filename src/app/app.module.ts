import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AuthService } from './modules/auth/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { CoreModule } from 'src/app/modules/core/core.module';
import { NavbarModule } from 'src/app/shared/components/navbar/navbar.module';
import { FooterModule } from 'src/app/shared/components/footer/footer.module';
import { RouterModule, Routes } from '@angular/router';
import { AnonymousGuard } from './modules/core/guards/anonymous.guard';
import { HomeModule } from './modules/main/home/home.module';
import { BuilderComponent } from './modules/builder/builder.page';
import { BuilderModule } from './modules/builder/builder.module';

const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AnonymousGuard] },
  { path: '', component: BuilderComponent, canActivate: [AnonymousGuard] },
  { path: '', loadChildren: './modules/main/main.module#MainModule' },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    NavbarModule,
    FooterModule,
    CoreModule,
    HomeModule,
    BuilderModule,
    CoreModule
  ],
  providers: [
    AuthService,
    UtilService,
    UserService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
