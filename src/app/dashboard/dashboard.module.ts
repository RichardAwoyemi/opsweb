import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { DataService } from '../shared/services/data.service';
import { TaskService } from '../task/services/task.service';
import { CreateApplicationModalComponent } from './components/create-application-modal/create-application-modal.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';
import { DashboardEmptyStateComponent } from './components/dashboard-empty-state/dashboard-empty-state.component';
import { DashboardFooterComponent } from './components/dashboard-footer/dashboard-footer.component';
import { DashboardKanbanComponent } from './components/dashboard-kanban/dashboard-kanban.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { TaskCategoryOptionComponent } from './components/task-category-option/task-category-option.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.page';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardNavbarComponent,
    DashboardFooterComponent,
    DashboardEmptyStateComponent,
    CreateTaskModalComponent,
    CreateApplicationModalComponent,
    DashboardKanbanComponent,
    TaskCategoryOptionComponent
  ],
  providers: [
    DataService,
    TaskService
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
    CreateApplicationModalComponent
  ],
})

export class DashboardModule { }
