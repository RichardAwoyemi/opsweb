import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { AuthService } from '../../../auth/auth.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderRegisterAccountModalComponent } from '../builder-register-account-modal/builder-register-account-modal.component';

@Component({
  selector: 'app-builder-create-account-modal',
  templateUrl: './builder-create-account-modal.component.html'
})
export class BuilderCreateAccountModalComponent implements IModalComponent {
  constructor(
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authService: AuthService,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  googleSignIn() {
    this.authService.googleSignInFromBuilder(this.builderComponentsService.pageComponents.getValue());
    this.activeModal.dismiss();
  }

  facebookSignIn() {
    this.authService.facebookSignInFromBuilder(this.builderComponentsService.pageComponents.getValue());
    this.activeModal.dismiss();
  }

  emailSignIn() {
    this.activeModal.dismiss();
    this.modalService.open(BuilderRegisterAccountModalComponent, {windowClass: 'modal-holder', centered: true});
  }
}
