import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarLayoutComponent } from './builder-sidebar-layout.component';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarCompmonentsModule } from '../builder-sidebar-components/builder-sidebar-components.module';

@NgModule({
  declarations: [
    BuilderSidebarLayoutComponent,
  ],
  imports: [
    BuilderSidebarElementModule,
    BuilderSidebarCompmonentsModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarLayoutComponent,
  ],
  providers: []
})

export class BuilderSidebarLayoutModule {
}
