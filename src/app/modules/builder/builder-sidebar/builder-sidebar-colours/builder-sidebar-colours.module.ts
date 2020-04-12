import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarColoursComponent } from './builder-sidebar-colours.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarCompmonentsModule } from '../builder-sidebar-components/builder-sidebar-components.module';

@NgModule({
  declarations: [
    BuilderSidebarColoursComponent,
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
