import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarOptionsComponent } from './builder-sidebar-options.component';
import { NavbarOptionsPickerComponent } from './navbar-options-picker/navbar-options-picker.component';

@NgModule({
  declarations: [
    BuilderSidebarOptionsComponent,
    NavbarOptionsPickerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BuilderSidebarOptionsComponent,
    NavbarOptionsPickerComponent
  ],
  providers: []
})

export class BuilderSidebarOptionsModule {
}