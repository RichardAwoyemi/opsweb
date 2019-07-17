import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from 'src/app/task/services/task.service';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html'
})
export class CreateTaskModalComponent {
  constructor(
    public activeModal: NgbActiveModal,
    public taskService: TaskService
  ) { }
}
