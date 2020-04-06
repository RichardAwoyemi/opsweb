import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-rename-website-modal',
  templateUrl: './dashboard-rename-website-modal.component.html',
  styleUrls: ['./dashboard-rename-website-modal.component.css']
})
export class DashboardRenameWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() websiteName;
  @Input() websiteId;
  newWebsiteName: string;
  disableSaveButton: boolean;

  private websiteNameAvailabilitySubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.newWebsiteName = this.websiteName.toLowerCase();
  }

  onConfirmButtonClick() {
    this.websiteNameAvailabilitySubscription = this.websiteService.checkIfWebsiteNameIsAvailable(this.newWebsiteName.toLowerCase()).subscribe(websites => {
      this.websiteService.renameWebsite(websites, this.activeModal, this.websiteId, this.newWebsiteName.toLowerCase());
      this.websiteNameAvailabilitySubscription.unsubscribe();
    });
  }

  onCloseButtonClick() {
    this.websiteService.websiteName.next(this.websiteName.toLowerCase());
    this.activeModal.dismiss();
  }

  validateWebsiteName() {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(this.websiteName.toLowerCase());
  }

  ngOnDestroy() {
    if (this.websiteNameAvailabilitySubscription) {
      this.websiteNameAvailabilitySubscription.unsubscribe();
    }
  }
}
