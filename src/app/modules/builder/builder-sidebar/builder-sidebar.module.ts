import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BuilderSidebarMenuComponent } from './builder-sidebar-menu/builder-sidebar-menu.component';
import { CommonModule } from '@angular/common';
import { BuilderSidebarComponentsComponent } from './builder-sidebar-components/builder-sidebar-components.component';
import { BuilderSidebarTemplatesComponent } from './builder-sidebar-templates/builder-sidebar-templates.component';
import { BuilderSidebarComponent } from './builder-sidebar.component';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarPagesComponent } from './builder-sidebar-pages/builder-sidebar-pages.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { NgbDropdownModule, NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ArraySortModule } from '../../../shared/pipes/array-sort/array-sort.module';
import { UnsplashService } from '../../../shared/services/unsplash.service';
import { ImageLibraryService } from 'src/app/shared/services/image-library.service';
import { BuilderSidebarCompmonentSettingsModule } from './builder-sidebar-component-settings/builder-sidebar-component-settings.module';

@NgModule({
  declarations: [
    BuilderSidebarMenuComponent,
    BuilderSidebarComponent,
    BuilderSidebarComponentsComponent,
    BuilderSidebarTemplatesComponent,
    BuilderSidebarPagesComponent,
    FilterPipe
  ],
  imports: [
    BuilderSidebarCompmonentSettingsModule,
    CommonModule,
    FormsModule,
    SortablejsModule,
    NgbDropdownModule,
    NgbPopoverModule,
    ArraySortModule,
    NgbTooltipModule
  ],
  exports: [
    BuilderSidebarComponent,
    FilterPipe
  ],
  providers: [
    UnsplashService,
    ImageLibraryService
  ]
})

export class BuilderSidebarModule {
}
