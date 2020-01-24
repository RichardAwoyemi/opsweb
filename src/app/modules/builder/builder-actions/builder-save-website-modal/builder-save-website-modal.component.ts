import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-confirm-save-modal',
  templateUrl: './builder-save-website-modal.component.html'
})
export class BuilderSaveWebsiteModalComponent implements IModalComponent, OnInit {
  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.toastrService.success('Your website has been saved.', 'Great!');
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
  }
}
