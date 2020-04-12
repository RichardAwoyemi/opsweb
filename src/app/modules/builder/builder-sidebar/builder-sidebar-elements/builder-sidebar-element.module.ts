import { NgModule } from '@angular/core';
import { BuilderSidebarFontNameComponent } from './builder-sidebar-font-name/builder-sidebar-font-name.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortablejsModule } from 'ngx-sortablejs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ArraySortModule } from 'src/app/shared/pipes/array-sort/array-sort.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { BuilderSidebarElementComponent } from './builder-sidebar-element.component';
import { BuilderSidebarElementDirective } from './builder-sidebar-element.directive';
import { BuilderSidebarHeadingComponent } from './builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarLineBreakComponent } from './builder-sidebar-line-break/builder-sidebar-heading.component';
import { BuilderSidebarPaddingComponent } from './builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarTextAlignmentComponent } from './builder-sidebar-text-alignment/builder-sidebar-text-alignment.component';
import { BuilderSidebarItemCountSliderComponent } from './builder-sidebar-item-count-slider/builder-sidebar-item-count-slider.component';
import { BuilderSidebarFontSizeComponent } from './builder-sidebar-font-size/builder-sidebar-font-size.component';
import { BuilderSidebarColourPickerComponent } from './builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { BuilderSidebarThemeChangeComponent } from './builder-sidebar-theme-change/builder-sidebar-theme-change.component';
import { BuilderSidebarImageOptionsComponent } from './builder-sidebar-image-options/builder-sidebar-image-options.component';
import { BuilderSidebarSelectImageComponent } from './builder-sidebar-select-image/builder-sidebar-select-image.component';
import { BuilderSidebarImageSizeComponent } from './builder-sidebar-image-size/builder-sidebar-image-size.component';
import { BuilderSidebarLinksDropdownComponent } from './builder-sidebar-links-dropdown/builder-sidebar-links-dropdown.component';
import { BuilderSidebarSortPagesComponent } from './builder-sidebar-sort-pages/builder-sidebar-sort-pages.component';
import { BuilderSidebarFormInputComponent } from './builder-sidebar-form-input/builder-sidebar-form-input.component';
import { BuilderSidebarLinksTickboxComponent } from './builder-sidebar-links-tickbox/builder-sidebar-links-tickbox.component';

const COMPONENTS = [
  BuilderSidebarItemCountSliderComponent,
  BuilderSidebarTextAlignmentComponent,
  BuilderSidebarPaddingComponent,
  BuilderSidebarLineBreakComponent,
  BuilderSidebarHeadingComponent,
  BuilderSidebarFontNameComponent,
  BuilderSidebarFontSizeComponent,
  BuilderSidebarColourPickerComponent,
  BuilderSidebarThemeChangeComponent,
  BuilderSidebarImageOptionsComponent,
  BuilderSidebarSelectImageComponent,
  BuilderSidebarImageSizeComponent,
  BuilderSidebarSortPagesComponent,
  BuilderSidebarLinksDropdownComponent,
  BuilderSidebarFormInputComponent,
  BuilderSidebarLinksTickboxComponent
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    BuilderSidebarElementDirective,
    BuilderSidebarElementComponent,
  ],
  imports: [
    CommonModule,
    SortablejsModule,
    ImageCropperModule,
    FormsModule,
    ArraySortModule,
    NgbDropdownModule,
    ColorPickerModule,
    Ng5SliderModule
  ],
  entryComponents: COMPONENTS,
  exports: [
    BuilderSidebarElementComponent
  ]
})
export class BuilderSidebarElementModule {
}
