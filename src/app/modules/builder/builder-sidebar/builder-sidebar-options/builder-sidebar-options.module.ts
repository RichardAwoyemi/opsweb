import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarOptionsComponent } from './builder-sidebar-options.component';
import { NavbarOptionsPickerComponent } from './navbar-options-picker/navbar-options-picker.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { BuilderUploadImageModalComponent } from '../../builder-actions/builder-upload-image-modal/builder-upload-image-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImgurService } from '../../../../shared/services/imgur.service';
import { FormsModule } from '@angular/forms';
import { ArraySortModule } from '../../../../shared/pipes/array-sort/array-sort.module';
import { FooterOptionsPickerComponent } from './footer-options-picker/footer-options-picker.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarCompmonentsModule } from '../builder-sidebar-components/builder-sidebar-components.module';

@NgModule({
  declarations: [
    BuilderSidebarOptionsComponent,
    BuilderUploadImageModalComponent,
    NavbarOptionsPickerComponent,
    FooterOptionsPickerComponent,
  ],
  imports: [
    BuilderSidebarCompmonentsModule,
    BuilderSidebarElementModule,
    CommonModule,
    SortablejsModule,
    ImageCropperModule,
    FormsModule,
    ArraySortModule,
    NgbDropdownModule,
    Ng5SliderModule
  ],
  exports: [
    BuilderSidebarOptionsComponent,
    NavbarOptionsPickerComponent
  ],
  entryComponents: [
    BuilderUploadImageModalComponent
  ],
  providers: [
    ImgurService
  ]
})

export class BuilderSidebarOptionsModule {
}
