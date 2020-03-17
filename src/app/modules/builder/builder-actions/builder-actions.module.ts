import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderDeletePageModalComponent } from './builder-delete-page-modal/builder-delete-page-modal.component';
import { BuilderNewPageModalComponent } from './builder-new-page-modal/builder-new-page-modal.component';
import { BuilderComponentToolbarComponent } from './builder-component-toolbar/builder-component-toolbar.component';
import { BuilderDeleteComponentModalComponent } from './builder-delete-component-modal/builder-delete-component-modal.component';
import { BuilderChangeTemplateModalComponent } from './builder-change-template-modal/builder-change-template-modal.component';
import { FormsModule } from '@angular/forms';
import { SimpleModalModule } from '../../../shared/components/simple-modal/simple-modal.module';
import { BlockNonAlphabetCharactersDirective } from '../../../shared/directives/block-non-alphabet-characters.directive';
import { BuilderRenamePageModalComponent } from './builder-rename-page-modal/builder-rename-page-modal.component';
import { BuilderActionsService } from './builder-actions.service';
import { BuilderDeleteImageModalComponent } from './builder-delete-image-modal/builder-delete-image-modal.component';
import { BuilderCreateAccountModalComponent } from './builder-create-account-modal/builder-create-account-modal.component';
import { BuilderSaveWebsiteModalComponent } from './builder-save-website-modal/builder-save-website-modal.component';
import { BuilderRenameWebsiteModalComponent } from './builder-rename-website-modal/builder-rename-website-modal.component';
import { BuilderSelectImageModalComponent } from './builder-select-image-modal/builder-select-image-modal.component';
import { BuilderSelectImageUploadComponent } from './builder-select-image-modal/builder-select-image-upload/builder-select-image-upload.component';
import { BuilderSelectImagePhotosComponent } from './builder-select-image-modal/builder-select-image-photos/builder-select-image-photos.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { WebsiteService } from '../../../shared/services/website.service';
import { BuilderRegisterAccountModalComponent } from './builder-register-account-modal/builder-register-account-modal.component';

@NgModule({
  declarations: [
    BuilderDeletePageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderDeleteImageModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderComponentToolbarComponent,
    BuilderRenamePageModalComponent,
    BuilderCreateAccountModalComponent,
    BuilderSaveWebsiteModalComponent,
    BuilderRenameWebsiteModalComponent,
    BuilderSelectImageModalComponent,
    BlockNonAlphabetCharactersDirective,
    BuilderSelectImageUploadComponent,
    BuilderSelectImagePhotosComponent,
    BuilderRegisterAccountModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SimpleModalModule,
    ImageCropperModule,
  ],
  exports: [
    BuilderDeletePageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteImageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderComponentToolbarComponent,
    BuilderSaveWebsiteModalComponent,
    BuilderRenameWebsiteModalComponent,
    BuilderCreateAccountModalComponent,
    BuilderRegisterAccountModalComponent,
    BuilderSelectImageModalComponent,
    BlockNonAlphabetCharactersDirective
  ],
  providers: [
    BuilderActionsService,
    WebsiteService
  ],
  entryComponents: [
    BuilderDeletePageModalComponent,
    BuilderDeleteImageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderRenamePageModalComponent,
    BuilderComponentToolbarComponent,
    BuilderSaveWebsiteModalComponent,
    BuilderRenameWebsiteModalComponent,
    BuilderCreateAccountModalComponent,
    BuilderRegisterAccountModalComponent,
    BuilderSelectImageModalComponent
  ]
})

export class BuilderActionsModule {
}
