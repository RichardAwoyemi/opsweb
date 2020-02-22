import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';

@Component({
  selector: 'app-builder-create-account-modal',
  templateUrl: './builder-create-account-modal.component.html'
})
export class BuilderCreateAccountModalComponent implements IModalComponent, OnInit, OnDestroy {
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

  ngOnDestroy() {
  }
}
