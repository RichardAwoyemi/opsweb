import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarLayoutComponent } from './builder-sidebar-layout.component';
import { NavbarLayoutPickerComponent } from './navbar-layout-picker/navbar-layout-picker.component';
import { FormsModule } from '@angular/forms';
import { FooterLayoutPickerComponent } from './footer-layout-picker/footer-layout-picker.component';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarCompmonentsModule } from '../builder-sidebar-components/builder-sidebar-components.module';

@NgModule({
  declarations: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
    FooterLayoutPickerComponent,
    FooterLayoutPickerComponent
  ],
  imports: [
    BuilderSidebarElementModule,
    BuilderSidebarCompmonentsModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent,
    FooterLayoutPickerComponent,
    FooterLayoutPickerComponent
  ],
  providers: []
})

export class BuilderSidebarLayoutModule {
}
