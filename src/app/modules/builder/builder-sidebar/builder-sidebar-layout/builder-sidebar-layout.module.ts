import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarLayoutComponent } from './builder-sidebar-layout.component';
import { NavbarLayoutPickerComponent } from './navbar-layout-picker/navbar-layout-picker.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarLayoutComponent,
    NavbarLayoutPickerComponent
  ],
  providers: []
})

export class BuilderSidebarLayoutModule {
}
