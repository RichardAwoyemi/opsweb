import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-page-modal.component.html'
})
export class BuilderDeletePageModalComponent implements IModalComponent {
  @Input() activePage;

  constructor(
    private activeModal: NgbActiveModal
  ) {
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
  }
}
