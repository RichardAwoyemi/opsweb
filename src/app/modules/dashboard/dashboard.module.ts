import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.page';
import { NgModule } from '@angular/core';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { DashboardSidebarComponent } from './dashboard-sidebar/dashboard-sidebar.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardSidebarComponent,
    DashboardBodyComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: []
})

export class DashboardModule {
}
