import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderActionsService } from '../builder-actions.service';
import { Subscription } from 'rxjs';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-rename-page-modal',
  templateUrl: './builder-rename-page-modal.component.html'
})
export class BuilderRenamePageModalComponent implements IModalComponent {
  @Input() activePage: string;
  @Input() activePageIndex: number;
  pageName: string;
  displayError: boolean = false;
  disableSaveButton: boolean = false;
  navbarMenuOptions: any;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.displayError = false;
    this.disableSaveButton = true;
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    for (let i = 0; i < this.navbarMenuOptions.length; i++) {
      if (i === this.activePageIndex) {
        this.navbarMenuOptions[i] = UtilService.toTitleCase(this.pageName);
      }
    }
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);
    this.toastrService.success('Your page has been renamed.', 'Great!');
  }

  validatePageName() {
    if (this.pageName.toLowerCase().trim() !== this.activePage.toLowerCase().trim()) {
      this.displayError = BuilderActionsService.togglePageModalErrorMessage(this.pageName, this.navbarMenuOptions);
    }
    this.disableSaveButton = BuilderActionsService.togglePageModalSaveButton(this.pageName, this.navbarMenuOptions);
  }
}
