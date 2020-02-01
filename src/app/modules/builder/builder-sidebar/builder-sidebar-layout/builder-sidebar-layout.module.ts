import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarLayoutComponent } from './builder-sidebar-layout.component';
import { NavbarLayoutPickerComponent } from './navbar-layout-picker/navbar-layout-picker.component';
import { FormsModule } from '@angular/forms';
import { FooterLayoutPickerComponent } from './footer-layout-picker/footer-layout-picker.component';
import { HeroLayoutPickerComponent } from './hero-layout-picker/hero-layout-picker.component';

@NgModule({
  declarations: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
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
    HeroLayoutPickerComponent,
    FooterLayoutPickerComponent
  ],
  providers: []
})

export class BuilderSidebarLayoutModule {
}
