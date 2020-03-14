import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { AuthService } from '../../../auth/auth.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-create-account-modal',
  templateUrl: './builder-create-account-modal.component.html'
})
export class BuilderCreateAccountModalComponent implements IModalComponent {
  constructor(
    private activeModal: NgbActiveModal,
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
  }

  emailSignIn() {
  }
}
