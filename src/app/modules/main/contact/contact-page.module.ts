import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactComponent } from './contact.page';
import { FormsModule } from '@angular/forms';
import { SectionHeaderGroupModule } from 'src/app/shared/components/section-header-group/section-header-group.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SectionHeaderGroupModule
  ],
  exports: [
    ContactFormComponent,
    ContactComponent
  ],
  declarations: [
    ContactFormComponent,
    ContactComponent
  ]
})

export class ContactModule {
}
