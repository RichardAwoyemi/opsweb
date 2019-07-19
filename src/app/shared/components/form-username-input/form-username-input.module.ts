import { NgModule } from '@angular/core';
import { FormUsernameInputComponent } from './form-username-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlockSpecialCharacterDirective } from '../../directives/block-special-character.directive';
import { FormUsernameInputService } from './form-username-input.service';
import { SimpleModalModule } from '../simple-modal/simple-modal.module';

@NgModule({
  exports: [
    FormUsernameInputComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SimpleModalModule
  ],
  declarations: [
    FormUsernameInputComponent,
    BlockSpecialCharacterDirective
  ],
  providers: [
    FormUsernameInputService
  ]
})

export class FormUsernameInputModule {
}
