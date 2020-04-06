import { Component, OnDestroy, OnInit } from '@angular/core';
import { IModalComponent } from '../../../../shared/models/modal';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';
import { UtilService } from '../../../../shared/services/util.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../../../../shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../core/store/user/user.reducer';
import { Router } from '@angular/router';
import { BuilderComponentsService } from '../../../builder/builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder/builder.service';

@Component({
  selector: 'app-dashboard-create-website-modal',
  templateUrl: './dashboard-create-website-modal.component.html'
})
export class DashboardCreateWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  user: IUser;
  disableSaveButton: boolean;
  websiteName: string;

  private websiteAvailabilitySubscription: Subscription;
  private websiteOwnershipSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private afs: AngularFirestore,
    private userStore: Store<fromUser.State>,
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.websiteName = UtilService.generateWebsiteName();
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
  }

  onConfirmButtonClick() {
    this.websiteName = this.websiteName.toLowerCase();
    this.websiteAvailabilitySubscription = this.websiteService.checkIfWebsiteNameIsAvailable(this.websiteName).subscribe(websitesWithSameName => {
      if (websitesWithSameName.size === 0) {
        const documentId = this.afs.createId();
        const documentPath = `websites/${documentId}`;
        const defaultPageComponents = this.builderComponentsService.defaultPageComponents.getValue();
        const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
        this.websiteOwnershipSubscription = this.websiteService.getWebsitesByUserId(this.user.uid).subscribe(websitesOwnedByUser => {
          if (websitesOwnedByUser.length < 3) {
            documentRef.set({
              name: this.websiteName,
              id: documentId,
              createdBy: this.user.uid,
              pages: defaultPageComponents['pages'],
              template: defaultPageComponents['template']
            }, { merge: true });
            this.builderService.setSidebarComponentsSetting();
            this.builderService.activePageIndex.next(0);
            this.toastrService.success('Your website has been created.');
            this.activeModal.close();
            this.router.navigateByUrl(`/builder/${documentId}`).then(() => {
            });
          } else {
            this.toastrService.error(`You cannot create more than 3 websites on your current plan.`);
          }
          this.websiteOwnershipSubscription.unsubscribe();
        });
      } else {
        this.toastrService.error(`A website with this name already exists.`);
      }
      this.websiteAvailabilitySubscription.unsubscribe();
    });
  }

  validateWebsiteName() {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(this.websiteName);
  }

  onCloseButtonClick() {
    this.activeModal.close();
  }

  ngOnDestroy() {
    if (this.websiteOwnershipSubscription) {
      this.websiteOwnershipSubscription.unsubscribe();
    }
    if (this.websiteAvailabilitySubscription) {
      this.websiteAvailabilitySubscription.unsubscribe();
    }
  }
}
