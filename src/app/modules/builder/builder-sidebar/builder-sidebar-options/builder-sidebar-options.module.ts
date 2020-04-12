import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderSidebarOptionsComponent } from './builder-sidebar-options.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImgurService } from '../../../../shared/services/imgur.service';
import { FormsModule } from '@angular/forms';
import { ArraySortModule } from '../../../../shared/pipes/array-sort/array-sort.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { BuilderSidebarElementModule } from '../builder-sidebar-elements/builder-sidebar-element.module';
import { BuilderSidebarCompmonentsModule } from '../builder-sidebar-components/builder-sidebar-components.module';

@NgModule({
  declarations: [
    BuilderSidebarOptionsComponent,
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
  ],
  providers: [
    ImgurService
  ]
})

export class BuilderSidebarOptionsModule {
}
