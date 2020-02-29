import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';

@Component({
  selector: 'app-builder-add-component-modal',
  templateUrl: './builder-add-component-modal.component.html'
})
export class BuilderAddComponentModalComponent implements IModalComponent, OnInit, OnDestroy {
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
