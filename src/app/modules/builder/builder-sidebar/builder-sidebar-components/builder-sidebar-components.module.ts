import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { SidebarFeaturesComponent } from './components/builder-sidebar-features.component';
import { SidebarHeroComponent } from './components/builder-sidebar-hero.component';
import { SidebarNavbarComponent } from './components/builder-sidebar-navbar.component';
import { SidebarFooterComponent } from './components/builder-sidebar-footer.component';
import { ReplacePipe } from 'src/app/shared/pipes/replace.pipe';

@NgModule({
  declarations: [
    SidebarFeaturesComponent,
    SidebarHeroComponent,
    SidebarNavbarComponent,
    SidebarFooterComponent,
    ReplacePipe
  ],
  imports: [
    BuilderSidebarElementModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    SidebarFeaturesComponent,
    SidebarHeroComponent,
    SidebarNavbarComponent,
    SidebarFooterComponent,
  ],
  providers: []
})

export class BuilderSidebarCompmonentsModule {
}
