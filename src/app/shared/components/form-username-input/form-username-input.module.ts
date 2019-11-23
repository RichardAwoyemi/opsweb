import { NgModule } from '@angular/core';
import { FormUsernameInputComponent } from './form-username-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlockAllSpecialCharacterDirective } from '../../directives/block-all-special-character.directive';
import { FormUsernameInputService } from './form-username-input.service';
import { SimpleModalModule } from '../simple-modal/simple-modal.module';

@NgModule({
  exports: [
    FormUsernameInputComponent,
    BlockAllSpecialCharacterDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    SimpleModalModule
  ],
  declarations: [
    FormUsernameInputComponent,
    BlockAllSpecialCharacterDirective
  ],
  providers: [
    FormUsernameInputService
  ]
})

export class FormUsernameInputModule {
}
