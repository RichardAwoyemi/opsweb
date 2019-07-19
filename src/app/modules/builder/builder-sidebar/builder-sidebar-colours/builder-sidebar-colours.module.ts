import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarColoursComponent } from './builder-sidebar-colours.component';
import { NavbarColourPickerComponent } from './navbar-colour-picker/navbar-colour-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { FooterColourPickerComponent } from './footer-colour-picker/footer-colour-picker.component';

@NgModule({
  declarations: [
    BuilderSidebarColoursComponent,
    FooterColourPickerComponent,
    NavbarColourPickerComponent
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarColoursComponent,
    NavbarColourPickerComponent
  ],
  providers: []
})

export class BuilderSidebarColoursModule {
}
