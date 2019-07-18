import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTaskModalComponent } from '../create-task-modal/create-task-modal.component';
import { CreateApplicationModalComponent } from '../create-application-modal/create-application-modal.component';

@Component({
  selector: 'app-dashboard-empty-state',
  templateUrl: './dashboard-empty-state.component.html'
})
export class DashboardEmptyStateComponent {
  @Input() accountType: string;

  constructor(
    private modalService: NgbModal
  ) { }

  openCreateTaskModal() {
    this.modalService.open(CreateTaskModalComponent, { windowClass: 'modal-holder', centered: true });
  }

  openApplicationModal() {
    this.modalService.open(CreateApplicationModalComponent, { windowClass: 'modal-holder', centered: true });
  }
}
