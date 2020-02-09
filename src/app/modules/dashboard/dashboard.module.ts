import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.page';
import { NgModule } from '@angular/core';
import { DashboardBodyModule } from './dashboard-body/dashboard-body.module';
import { DashboardSidebarModule } from './dashboard-sidebar/dashboard-sidebar.module';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    DashboardBodyModule,
    DashboardSidebarModule,
    CommonModule
  ],
  providers: [
    DashboardService
  ]
})

export class DashboardModule {
}