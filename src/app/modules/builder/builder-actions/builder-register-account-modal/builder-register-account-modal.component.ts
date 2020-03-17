import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { AuthService } from '../../../auth/auth.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-register-account-modal',
  templateUrl: './builder-register-account-modal.component.html'
})
export class BuilderRegisterAccountModalComponent implements IModalComponent {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  disableSaveButton = true;
  showFirstNameInputError = false;
  showLastNameInputError = false;
  showEmailInputError = false;
  showPasswordInputError = false;

  constructor(
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.authService.registerFromBuilder(this.email, this.password, this.firstName, this.lastName, this.builderComponentsService.pageComponents.getValue());
  }

  onChangeUpdateFirstName() {
    this.showFirstNameInputError = !(this.firstName && this.firstName.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdateLastName() {
    this.showLastNameInputError = !(this.lastName && this.lastName.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdateEmail() {
    this.showEmailInputError = !(this.email && this.email.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdatePassword() {
    this.showPasswordInputError = !(this.password && this.password.length > 0);
    this.onChangeUpdateSaveButton();
  }

  onChangeUpdateSaveButton() {
    this.disableSaveButton = this.showFirstNameInputError === false && this.showLastNameInputError === false && this.showEmailInputError === false && this.showPasswordInputError === false;
  }
}
