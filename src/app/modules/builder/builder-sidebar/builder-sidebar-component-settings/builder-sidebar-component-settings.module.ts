import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarFeaturesSettingsComponent } from './components/builder-sidebar-features-settings.component';
import { SidebarFooterSettingsComponent } from './components/builder-sidebar-footer-settings.component';
import { SidebarHeroSettingsComponent } from './components/builder-sidebar-hero-settings.component';
import { SidebarNavbarSettingsComponent } from './components/builder-sidebar-navbar-settings.component';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarComponentSettingsComponent } from './builder-sidebar-component-settings.component';
import { ImgurService } from '../../../../shared/services/imgur.service';

@NgModule({
  declarations: [
    BuilderSidebarComponentSettingsComponent,
    SidebarFeaturesSettingsComponent,
    SidebarHeroSettingsComponent,
    SidebarNavbarSettingsComponent,
    SidebarFooterSettingsComponent
    ],
  imports: [
    BuilderSidebarElementModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarComponentSettingsComponent,
    SidebarFeaturesSettingsComponent,
    SidebarHeroSettingsComponent,
    SidebarNavbarSettingsComponent,
    SidebarFooterSettingsComponent,
  ],
  providers: [
    ImgurService
  ]
})

export class BuilderSidebarCompmonentSettingsModule {
}
