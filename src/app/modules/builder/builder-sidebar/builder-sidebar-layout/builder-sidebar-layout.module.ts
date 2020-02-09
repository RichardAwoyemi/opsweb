import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarLayoutComponent } from './builder-sidebar-layout.component';
import { NavbarLayoutPickerComponent } from './navbar-layout-picker/navbar-layout-picker.component';
import { FormsModule } from '@angular/forms';
import { FooterLayoutPickerComponent } from './footer-layout-picker/footer-layout-picker.component';
import { FeaturesLayoutPickerComponent } from './features-layout-picker/features-layout-picker.component';
import { HeadingLayoutPickerComponent } from './heading-layout-picker/heading-layout-picker.component';
import { HeroLayoutPickerComponent } from './hero-layout-picker/hero-layout-picker.component';

@NgModule({
  declarations: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
    FooterLayoutPickerComponent,
    FeaturesLayoutPickerComponent,
    HeadingLayoutPickerComponent,
    HeroLayoutPickerComponent,
    FooterLayoutPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
    FooterLayoutPickerComponent,
    FeaturesLayoutPickerComponent,
    HeadingLayoutPickerComponent,
    HeroLayoutPickerComponent,
    FooterLayoutPickerComponent
  ],
  providers: []
})

export class BuilderSidebarLayoutModule {
}
