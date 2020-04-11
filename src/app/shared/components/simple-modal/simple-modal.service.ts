import { SimpleModalComponent } from './simple-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleModalService {
  constructor(
    public ngbModal: NgbModal,
  ) {
  }

  displayMessage(header, message) {
    const modalReference = this.ngbModal.open(SimpleModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = header;
    modalReference.componentInstance.message = message;
  }
}
