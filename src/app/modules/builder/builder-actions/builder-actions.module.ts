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
import { BuilderAddComponentModalComponent } from './builder-add-component-modal/builder-add-component-modal.component';

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
    BuilderAddComponentModalComponent,
    BlockNonAlphabetCharactersDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SimpleModalModule
  ],
  exports: [
    BuilderDeletePageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteImageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderComponentToolbarComponent,
    BuilderAddComponentModalComponent,
    BuilderCreateAccountModalComponent
  ],
  providers: [
    BuilderActionsService
  ],
  entryComponents: [
    BuilderDeletePageModalComponent,
    BuilderDeleteImageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderRenamePageModalComponent,
    BuilderComponentToolbarComponent,
    BuilderAddComponentModalComponent,
    BuilderCreateAccountModalComponent
  ]
})

export class BuilderActionsModule {
}
