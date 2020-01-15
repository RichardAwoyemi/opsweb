import { NgModule } from '@angular/core';
import { DashboardBodyRewardsComponent } from './dashboard-body-rewards/dashboard-body-rewards.component';
import { DashboardBodySettingsComponent } from './dashboard-body-settings/dashboard-body-settings.component';
import { DashboardBodyComponent } from './dashboard-body.component';
import { DashboardBodyWebsitesComponent } from './dashboard-body-websites/dashboard-body-websites.component';
import { DashboardBodyTemplatesComponent } from './dashboard-body-templates/dashboard-body-templates.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DashboardBodySettingsComponent,
    DashboardBodyWebsitesComponent,
    DashboardBodyRewardsComponent,
    DashboardBodyTemplatesComponent,
    DashboardBodyComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardBodySettingsComponent,
    DashboardBodyWebsitesComponent,
    DashboardBodyRewardsComponent,
    DashboardBodyTemplatesComponent,
    DashboardBodyComponent
  ]
})

export class DashboardBodyModule {
}
