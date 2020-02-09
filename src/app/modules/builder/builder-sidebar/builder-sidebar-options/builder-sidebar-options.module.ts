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
import { HeroOptionsPickerComponent } from './hero-options-picker/hero-options-picker.component';
import { FooterOptionsPickerComponent } from './footer-options-picker/footer-options-picker.component';
import { FeaturesOptionsPickerComponent } from './features-options-picker/features-options-picker.component';
import { HeadingOptionsPickerComponent } from './heading-options-picker/heading-options-picker.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    BuilderSidebarOptionsComponent,
    BuilderUploadImageModalComponent,
    NavbarOptionsPickerComponent,
    FooterOptionsPickerComponent,
    FeaturesOptionsPickerComponent,
    HeadingOptionsPickerComponent,
    HeroOptionsPickerComponent
  ],
  imports: [
    CommonModule,
    SortablejsModule,
    ImageCropperModule,
    FormsModule,
    ArraySortModule,
    NgbDropdownModule
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
