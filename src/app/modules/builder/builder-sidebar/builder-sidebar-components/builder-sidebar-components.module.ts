import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { SidebarFeaturesComponent } from './components/builder-sidebar-features.component';
import { SidebarHeroComponent } from './components/builder-sidebar-hero.component';

@NgModule({
  declarations: [
    SidebarFeaturesComponent,
    SidebarHeroComponent,
  ],
  imports: [
    BuilderSidebarElementModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    SidebarFeaturesComponent,
    SidebarHeroComponent,
  ],
  providers: []
})

export class BuilderSidebarCompmonentsModule {
}
