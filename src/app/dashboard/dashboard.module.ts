import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { DataService } from '../shared/services/data.service';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { DashboardEmptyStateComponent } from './components/dashboard-empty-state/dashboard-empty-state.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.page';
import { ApplicationModalComponent } from './components/application-modal/application-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardFooterComponent,
    DashboardEmptyStateComponent,
    CreateTaskModalComponent,
    ApplicationModalComponent
  ],
  providers: [
    DataService
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    TagInputModule,
    NgbModule,
  ],
  exports: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardFooterComponent
  ],
  entryComponents: [
    CreateTaskModalComponent,
    ApplicationModalComponent
  ],
})

export class DashboardModule { }
