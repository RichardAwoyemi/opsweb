import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarOptionsComponent } from './builder-sidebar-options.component';
import { NavbarOptionsPickerComponent } from './navbar-options-picker/navbar-options-picker.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { NavbarOptionsPickerService } from './navbar-options-picker/navbar-options-picker.service';

@NgModule({
  declarations: [
    BuilderSidebarOptionsComponent,
    NavbarOptionsPickerComponent
  ],
  imports: [
    CommonModule,
    SortablejsModule
  ],
  exports: [
    BuilderSidebarOptionsComponent,
    NavbarOptionsPickerComponent
  ],
  providers: [
    NavbarOptionsPickerService
  ]
})

export class BuilderSidebarOptionsModule {
}
