import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-kanban',
  templateUrl: './dashboard-kanban.component.html'
})
export class DashboardKanbanComponent {
  backlogTasks: any;
  inProgressTasks: any;
  doneTasks: any;
}
