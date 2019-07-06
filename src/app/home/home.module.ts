import { NgModule } from '@angular/core';
import { HomeComponent } from './pages/home/home.page';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeFeaturesComponent } from './components/home-features/home-features.component';
import { HomeFeatureCardComponent } from './components/home-feature-card/home-feature-card.component';
import { HomeReviewsComponent } from './components/home-reviews/home-reviews.component';
import { HomeApplyComponent } from './components/home-apply/home-apply.component';
import { PressComponent } from './pages/press/press.page';
import { LegalComponent } from './pages/legal/legal.page';
import { LoginButtonGroupComponent } from '../shared/components/login-button-group/login-button-group.component';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { SwiperConfigInterface, SWIPER_CONFIG, SwiperModule } from 'ngx-swiper-wrapper';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeRoutingModule } from './home.routing.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  autoplay: {
    delay: 4000,
  },
};

@NgModule({
  declarations: [
    HomeComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeFeaturesComponent,
    HomeFeatureCardComponent,
    HomeReviewsComponent,
    HomeApplyComponent,
    PressComponent,
    LegalComponent,
    LoginButtonGroupComponent
  ],
  providers: [
    AuthService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  imports: [
    HomeRoutingModule,
    CommonModule,
    SwiperModule,
    FontAwesomeModule
  ],
  exports: [
    HomeNavbarComponent,
    HomeFooterComponent
  ],
  bootstrap: [HomeComponent]
})

export class HomeModule { }
