import { NgModule } from '@angular/core';
import { DashboardCreateWebsiteModalComponent } from './dashboard-create-website-modal/dashboard-create-website-modal.component';
import { BuilderActionsModule } from '../../builder/builder-actions/builder-actions.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardCreateWebsiteModalComponent
  ],
  imports: [
    BuilderActionsModule,
    FormsModule,
    CommonModule
  ],
  exports: [],
  entryComponents: [
    DashboardCreateWebsiteModalComponent
  ]
})

export class DashboardActionsModule {
}
