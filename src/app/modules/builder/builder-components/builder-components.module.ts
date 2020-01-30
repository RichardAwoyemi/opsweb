import { BuilderNavbarComponent } from './builder-navbar/builder-navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderHeroComponent } from './builder-hero/builder-hero.component';
import { BuilderNavbarService } from './builder-navbar/builder-navbar.service';
import { BuilderHeroService } from './builder-hero/builder-hero.service';
import { BuilderPlaceholderComponent } from './builder-placeholder/builder-placeholder.component';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { BuilderFooterComponent } from './builder-footer/builder-footer.component';
import { BuilderFeaturesComponent } from './builder-features/builder-features.component';
import { BuilderActionsModule } from '../builder-actions/builder-actions.module';
import { BuilderFooterService } from './builder-footer/builder-footer.service';
import { BuilderFeaturesService } from './builder-features/builder-features.service';

@NgModule({
  declarations: [
    BuilderNavbarComponent,
    BuilderPlaceholderComponent,
    BuilderHeroComponent,
    BuilderFooterComponent,
    BuilderFeaturesComponent
  ],
  imports: [
    CommonModule,
    BuilderActionsModule
  ],
  exports: [
    BuilderNavbarComponent,
    BuilderPlaceholderComponent,
    BuilderHeroComponent,
    BuilderFooterComponent,
    BuilderFeaturesComponent
  ],
  providers: [
    BuilderNavbarService,
    BuilderHeroService,
    BuilderFooterService,
    BuilderFeaturesService,
    SessionStorageService
  ],
  entryComponents: [
    BuilderNavbarComponent,
    BuilderPlaceholderComponent,
    BuilderHeroComponent,
    BuilderFooterComponent,
    BuilderFeaturesComponent
  ]
})

export class BuilderComponentsModule {
}
