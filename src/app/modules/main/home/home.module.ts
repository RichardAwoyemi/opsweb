import { NgModule } from '@angular/core';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomePopupComponent } from './home-popup/home-popup.component';
import { HomeSectionHeaderComponent } from './home-section-header/home-section-header.component';
import { LoginButtonGroupComponent } from './login-button-group/login-button-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home.page';
import { RouterModule, Routes } from '@angular/router';
import { HomeBuildButtonComponent } from './home-build-button/home-build-button.component';
import { CommonModule } from '@angular/common';
import { BrowserMockupModule } from '../../../shared/components/browser-mockup/browser-mockup.module';
import { RouterService } from '../../../shared/services/router.service';

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomePopupComponent,
    HomeSectionHeaderComponent,
    HomeBuildButtonComponent,
    LoginButtonGroupComponent
  ],
  imports: [
    RouterModule.forChild(RouterService.checkIfIsOnDomain() ? routes : RouterService.getSubdomainRoutes('../..')),
    FontAwesomeModule,
    RouterModule,
    BrowserMockupModule,
    CommonModule
  ],
  exports: [
    HomeComponent,
    HomeHeaderComponent,
    HomePopupComponent,
    HomeSectionHeaderComponent,
    HomeBuildButtonComponent,
    LoginButtonGroupComponent
  ],
})

export class HomeModule {
}
