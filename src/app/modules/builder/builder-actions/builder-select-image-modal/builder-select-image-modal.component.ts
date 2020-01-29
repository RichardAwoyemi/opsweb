import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';

@Component({
  selector: 'app-builder-select-image-modal',
  templateUrl: './builder-select-image-modal.component.html'
})
export class BuilderSelectImageModalComponent implements IModalComponent, OnInit {
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
