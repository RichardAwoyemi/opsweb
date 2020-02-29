import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderService } from '../../builder.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../../shared/services/website.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-builder-rename-website-modal',
  templateUrl: './builder-rename-website-modal.component.html'
})
export class BuilderRenameWebsiteModalComponent implements IModalComponent {
  @Input() websiteName;
  @Input() newWebsiteName;

  private websiteNameAvailabilitySubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private activeModal: NgbActiveModal,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private toastrService: ToastrService
  ) {
  }

  onConfirmButtonClick() {
    const websiteId = this.websiteService.websiteId.getValue();
    this.websiteNameAvailabilitySubscription = this.websiteService.checkIfWebsiteNameIsAvailable(this.newWebsiteName).subscribe(websites => {
      if (websites.size === 0) {
        const documentRef: AngularFirestoreDocument<any> = this.afs.doc(`websites/${websiteId}`);
        documentRef.set({
          name: this.newWebsiteName
        }, {merge: true});
        this.websiteService.websiteName.next(this.newWebsiteName);
        this.toastrService.success('Your website has been renamed.', 'Great!');
      } else {
        this.toastrService.error(`A website with this name already exists.`, 'Oops!');
      }
      this.activeModal.dismiss();
      this.websiteNameAvailabilitySubscription.unsubscribe();
    });
  }

  onCloseButtonClick() {
    this.websiteService.websiteName.next(this.websiteName);
    this.activeModal.dismiss();
  }
}
