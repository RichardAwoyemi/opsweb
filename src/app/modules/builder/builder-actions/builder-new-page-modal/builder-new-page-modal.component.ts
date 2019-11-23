import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-delete-page-modal',
  templateUrl: './builder-new-page-modal.component.html'
})
export class BuilderNewPageModalComponent implements IModalComponent, OnInit {
  @Input() activePage;
  pageName: string;
  displayError: boolean = false;
  disableSaveButton: boolean = false;
  navbarMenuOptions: any;
  private navbarMenuOptionsSubscription: Subscription;

  constructor(
    private builderNavbarService: BuilderNavbarService,
    private toastrService: ToastrService,
    private activeModal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick(): void {
    this.activeModal.dismiss();
    this.navbarMenuOptions.push(UtilService.toTitleCase(this.pageName));
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);
    this.toastrService.success('Your new page has been created.', 'Success!');
  }

  validatePageName() {
    if (!this.pageName || this.pageName.trim() == '') {
      this.displayError = false;
      this.disableSaveButton = true;
    } else {
      for (let i = 0; i < this.navbarMenuOptions.length; i++) {
        if (this.pageName.toLowerCase().trim() === this.navbarMenuOptions[i].toLowerCase().trim()) {
          this.displayError = true;
          this.disableSaveButton = true;
          break;
        } else {
          this.displayError = false;
          this.disableSaveButton = false;
        }
      }
    }
  }
}
