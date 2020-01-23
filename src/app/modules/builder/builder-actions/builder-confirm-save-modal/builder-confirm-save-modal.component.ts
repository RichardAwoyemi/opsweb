import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';

@Component({
  selector: 'app-builder-confirm-save-modal',
  templateUrl: './builder-confirm-save-modal.component.html'
})
export class BuilderConfirmSaveModalComponent implements IModalComponent, OnInit {
  constructor(
    private activeModal: NgbActiveModal,
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

  ngOnDestroy() {
  }
}
