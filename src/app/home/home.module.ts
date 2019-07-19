import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwiperConfigInterface, SwiperModule, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { UtilService } from '../shared/services/util.service';
import { SharedModule } from '../shared/shared.module';
import { HomeFeatureCardComponent } from './components/home-feature-card/home-feature-card.component';
import { HomeFeaturesComponent } from './components/home-features/home-features.component';
import { HomeFooterComponent } from './components/home-footer/home-footer.component';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HomeReviewsComponent } from './components/home-reviews/home-reviews.component';
import { HomeSectionHeaderComponent } from './components/home-section-header/home-section-header.component';
import { RegisterInterestButtonComponent } from './components/register-interest-button/register-interest-button';
import { HomeRoutingModule } from './home.routing.component';
import { HomeComponent } from './pages/home/home.page';
import { LegalComponent } from './pages/legal/legal.page';
import { PressComponent } from './pages/press/press.page';

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
    PressComponent,
    LegalComponent,
    HomeNavbarComponent,
    HomeFooterComponent,
    HomeHeaderComponent,
    HomeFeaturesComponent,
    HomeFeatureCardComponent,
    HomeReviewsComponent,
    HomeSectionHeaderComponent,
    RegisterInterestButtonComponent
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    UtilService
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
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