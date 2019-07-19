import { IModalComponent } from '../../../../shared/models/modal';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-builder-change-template-modal',
  templateUrl: './builder-change-template-modal.component.html'
})
export class BuilderChangeTemplateModalComponent implements IModalComponent, OnInit {
  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
