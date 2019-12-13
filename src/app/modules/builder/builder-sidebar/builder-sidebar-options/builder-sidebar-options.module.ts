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

@NgModule({
  declarations: [
    BuilderSidebarOptionsComponent,
    BuilderUploadImageModalComponent,
    NavbarOptionsPickerComponent
  ],
  imports: [
    CommonModule,
    SortablejsModule,
    ImageCropperModule,
    FormsModule,
    ArraySortModule
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
