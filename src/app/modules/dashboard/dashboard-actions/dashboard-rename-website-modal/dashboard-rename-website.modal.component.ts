import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-rename-website-modal',
  templateUrl: './dashboard-rename-website-modal.component.html'
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
    this.newWebsiteName = this.websiteName;
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.websiteNameAvailabilitySubscription = this.websiteService.checkIfWebsiteNameIsAvailable(this.newWebsiteName).subscribe(websites => {
      if (websites.size === 0) {
        this.activeModal.close();
        const documentRef: AngularFirestoreDocument<any> = this.afs.doc(`websites/${this.websiteId}`);
        documentRef.set({
          name: this.newWebsiteName
        }, {merge: true});
        this.activeModal.close();
        this.toastrService.success('Your website has been renamed.');
      } else {
        this.toastrService.error(`A website with this name already exists.`);
      }
      this.websiteNameAvailabilitySubscription.unsubscribe();
    });
  }

  validateWebsiteName() {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(this.websiteName);
  }

  ngOnDestroy() {
    if (this.websiteNameAvailabilitySubscription) {
      this.websiteNameAvailabilitySubscription.unsubscribe();
    }
  }
}
