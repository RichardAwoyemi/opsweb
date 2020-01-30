import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarLayoutComponent } from './builder-sidebar-layout.component';
import { NavbarLayoutPickerComponent } from './navbar-layout-picker/navbar-layout-picker.component';
import { FormsModule } from '@angular/forms';
import { FooterLayoutPickerComponent } from './footer-layout-picker/footer-layout-picker.component';
import { FeaturesLayoutPickerComponent } from './features-layout-picker/features-layout-picker.component';

@NgModule({
  declarations: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
    FooterLayoutPickerComponent,
    FeaturesLayoutPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
    FooterLayoutPickerComponent,
    FeaturesLayoutPickerComponent
  ],
  providers: []
})

export class BuilderSidebarLayoutModule {
}
