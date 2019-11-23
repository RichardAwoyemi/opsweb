import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderShowcaseLayoutComponent } from './builder-showcase-layout/builder-showcase-layout.component';
import { BuilderShowcaseComponent } from './builder-showcase.component';
import { BuilderShowcaseToolbarComponent } from './builder-showcase-toolbar/builder-showcase-toolbar.component';
import { BuilderShowcaseService } from './builder-showcase.service';
import { BuilderComponentModule } from '../builder-components/builder-component.module';
import { BuilderToolbarComponent } from '../builder-toolbar/builder-toolbar.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { BuilderComponentService } from '../builder-components/builder.component.service';
import { BuilderDynamicHtmlModule } from '../builder-components/builder-dynamic-html/builder-dynamic-html.module';
import { BuilderNavbarComponent } from '../builder-components/builder-navbar/builder-navbar.component';
import { ActiveComponentsPartialSelector } from '../builder';
import { BuilderHeroComponent } from '../builder-components/builder-hero/builder-hero.component';
import { BuilderPlaceholderComponent } from '../builder-components/builder-placeholder/builder-placeholder.component';
import { SimpleModalComponent } from '../../../shared/components/simple-modal/simple-modal.component';
import { SimpleModalService } from '../../../shared/components/simple-modal/simple-modal.service';
import { BuilderFooterComponent } from '../builder-components/builder-footer/builder-footer.component';
import { RouterModule } from '@angular/router';
import { BuilderFeaturesComponent } from '../builder-components/builder-features/builder-features.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { BuilderDynamicHtmlComponent } from '../builder-components/builder-dynamic-html/builder-dynamic-html.component';
import { SimpleModalModule } from '../../../shared/components/simple-modal/simple-modal.module';

@NgModule({
  declarations: [
    BuilderShowcaseLayoutComponent,
    BuilderShowcaseComponent,
    BuilderShowcaseToolbarComponent,
    BuilderToolbarComponent,
  ],
  imports: [
    CommonModule,
    BuilderComponentModule,
    NgbPopoverModule,
    BuilderComponentModule,
    SimpleModalModule,
    SortablejsModule.forRoot({ animation: 500 }),
    BuilderDynamicHtmlModule.forRoot({
      components: [
        { component: BuilderNavbarComponent, selector: ActiveComponentsPartialSelector.Navbar },
        { component: BuilderHeroComponent, selector: ActiveComponentsPartialSelector.Hero },
        { component: BuilderPlaceholderComponent, selector: ActiveComponentsPartialSelector.Placeholder },
        { component: BuilderFooterComponent, selector: ActiveComponentsPartialSelector.Footer },
        { component: BuilderFeaturesComponent, selector: ActiveComponentsPartialSelector.Features },
      ]
    }),
    RouterModule
  ],
  exports: [
    BuilderShowcaseLayoutComponent,
    BuilderShowcaseComponent,
    BuilderShowcaseToolbarComponent
  ],
  providers: [
    BuilderShowcaseService,
    BuilderComponentService,
    SimpleModalService
  ],
  entryComponents: [
    BuilderShowcaseLayoutComponent,
    BuilderDynamicHtmlComponent,
    SimpleModalComponent
  ]
})

export class BuilderShowcaseModule {
}
