import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarColoursComponent } from './builder-sidebar-colours.component';
import { NavbarColourPickerComponent } from './navbar-colour-picker/navbar-colour-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { FooterColourPickerComponent } from './footer-colour-picker/footer-colour-picker.component';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarCompmonentsModule } from '../builder-sidebar-components/builder-sidebar-components.module';

@NgModule({
  declarations: [
    BuilderSidebarColoursComponent,
    FooterColourPickerComponent,
    NavbarColourPickerComponent
  ],
  imports: [
    BuilderSidebarCompmonentsModule,
    BuilderSidebarElementModule,
    CommonModule,
    ColorPickerModule,
    FormsModule
  ],
  exports: [
    BuilderSidebarColoursComponent
  ]
})

export class BuilderSidebarColoursModule {
}
