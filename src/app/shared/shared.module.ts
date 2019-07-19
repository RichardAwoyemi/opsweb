import { NgModule } from '@angular/core';
import { SectionHeaderGroupComponent } from './components/section-header-group/section-header-group.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SectionHeaderGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SectionHeaderGroupComponent
  ]
})

export class SharedModule { }
