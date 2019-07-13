import { NgModule } from '@angular/core';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { DataService } from '../shared/services/data.service';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardFooterComponent
  ],
  providers: [
    DataService
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    TagInputModule
  ],
  exports: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardFooterComponent
  ],
  bootstrap: []
})

export class DashboardModule { }
