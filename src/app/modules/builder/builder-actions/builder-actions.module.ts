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

@NgModule({
  declarations: [
    BuilderDeletePageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderComponentToolbarComponent,
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
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderComponentToolbarComponent
  ],
  providers: [],
  entryComponents: [
    BuilderDeletePageModalComponent,
    BuilderNewPageModalComponent,
    BuilderDeleteComponentModalComponent,
    BuilderChangeTemplateModalComponent,
    BuilderComponentToolbarComponent
  ]
})

export class BuilderActionsModule {
}
