import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html'
})
export class CreateTaskModalComponent {
  selectedCategory: string;

  constructor(
    public activeModal: NgbActiveModal,
    private logger: NGXLogger
  ) { }

  onSelectedCategoryChange(event) {
    this.logger.debug(`Category changed to: ${event.target.value}`);
    this.selectedCategory = event.target.value;
  }
}
