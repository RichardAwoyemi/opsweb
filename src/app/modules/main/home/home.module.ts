import { NgModule } from '@angular/core';
import { HomeFeatureCardComponent } from './home-feature-card/home-feature-card.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomePopupComponent } from './home-popup/home-popup.component';
import { HomeSectionHeaderComponent } from './home-section-header/home-section-header.component';
import { LoginButtonGroupComponent } from './login-button-group/login-button-group.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home.page';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { RouterModule } from '@angular/router';
import { HomeBuildButtonComponent } from './home-build-button/home-build-button.component';
import { HomeBrowserMockupComponent } from './home-browser-mockup/home-browser-mockup.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
    HomeFeaturesComponent,
    HomeFeatureCardComponent,
    HomeHeaderComponent,
    HomePopupComponent,
    HomeSectionHeaderComponent,
    HomeBuildButtonComponent,
    HomeBrowserMockupComponent,
    LoginButtonGroupComponent
  ],
  imports: [
    FontAwesomeModule,
    RouterModule,
    CommonModule
  ],
  exports: [
    HomeComponent,
    HomeFeatureCardComponent,
    HomeHeaderComponent,
    HomePopupComponent,
    HomeSectionHeaderComponent,
    HomeBuildButtonComponent,
    HomeBrowserMockupComponent,
    LoginButtonGroupComponent
  ],
})

export class HomeModule {
}
