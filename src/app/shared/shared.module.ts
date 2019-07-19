import { NgModule } from '@angular/core';
import { SectionHeaderGroupComponent } from './components/section-header-group/section-header-group.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

@NgModule({
  declarations: [
    SectionHeaderGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule
  ],
  exports: [
    SectionHeaderGroupComponent
  ]
})

export class SharedModule { }
