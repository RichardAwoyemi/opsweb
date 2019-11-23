import { NgModule } from '@angular/core';
import { BuilderSidebarColoursModule } from './builder-sidebar-colours/builder-sidebar-colours.module';
import { BuilderSidebarLayoutModule } from './builder-sidebar-layout/builder-sidebar-layout.module';
import { BuilderSidebarMenuComponent } from './builder-sidebar-menu/builder-sidebar-menu.component';
import { CommonModule } from '@angular/common';
import { BuilderSidebarComponentsComponent } from './builder-sidebar-components/builder-sidebar-components.component';
import { BuilderSidebarTemplatesComponent } from './builder-sidebar-templates/builder-sidebar-templates.component';
import { BuilderSidebarComponent } from './builder-sidebar.component';
import { BuilderSidebarOptionsModule } from './builder-sidebar-options/builder-sidebar-options.module';
import { ArraySortPipe } from '../../../shared/pipes/array-sort.pipe';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarPagesComponent } from './builder-sidebar-pages/builder-sidebar-pages.component';
import { BuilderSidebarDataComponent } from './builder-sidebar-data/builder-sidebar-data.component';

@NgModule({
  declarations: [
    BuilderSidebarMenuComponent,
    BuilderSidebarComponent,
    BuilderSidebarComponentsComponent,
    BuilderSidebarTemplatesComponent,
    BuilderSidebarPagesComponent,
    BuilderSidebarDataComponent,
    ArraySortPipe,
    FilterPipe
  ],
  imports: [
    BuilderSidebarColoursModule,
    BuilderSidebarOptionsModule,
    BuilderSidebarLayoutModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarComponent
  ]
})

export class BuilderSidebarModule {
}