import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-task-category-option',
  templateUrl: './task-category-option.component.html'
})
export class TaskCategoryOptionComponent {
  selectedCategory: string;
  @Input() categoryOption: String;

  constructor(
    public activeModal: NgbActiveModal,
    private logger: NGXLogger
  ) { }

  onSelectedCategoryChange(event) {
    this.logger.debug(`Category changed to: ${event.target.value}`);
    this.selectedCategory = event.target.value;
  }
}
