import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-delete-image-modal.component.html'
})
export class BuilderDeleteImageModalComponent implements IModalComponent {
  constructor(
    private activeModal: NgbActiveModal,
    private builderNavbarService: BuilderNavbarService,
    private toastrService: ToastrService
  ) {
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.builderNavbarService.navbarLogoImage.next('navbarLogoImage');
    this.builderNavbarService.navbarLogoText.next('Logo');
    this.toastrService.success('Your image has been deleted.', 'Great!');
  }
}
