import { Component, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderService } from '../../builder.service';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../../shared/services/website.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BuilderActionsService } from '../builder-actions.service';

@Component({
  selector: 'app-builder-rename-website-modal',
  templateUrl: './builder-rename-website-modal.component.html'
})
export class BuilderRenameWebsiteModalComponent implements IModalComponent, OnDestroy {
  @Input() websiteName;
  @Input() newWebsiteName;

  private websiteNameAvailabilitySubscription: Subscription;

  constructor(
    private afs: AngularFirestore,
    private activeModal: NgbActiveModal,
    private builderService: BuilderService,
    private builderActionsService: BuilderActionsService,
    private websiteService: WebsiteService
  ) {
  }

  onConfirmButtonClick() {
    this.websiteNameAvailabilitySubscription = this.websiteService.checkIfWebsiteNameIsAvailable(this.newWebsiteName).subscribe(websites => {
      this.websiteService.renameWebsite(websites, this.activeModal, this.websiteService.websiteId.getValue(), this.newWebsiteName);
      this.websiteNameAvailabilitySubscription.unsubscribe();
    });
    this.builderActionsService.renameRenameWebsiteModalStatus.next({'open': false});
  }

  onCloseButtonClick() {
    this.websiteService.websiteName.next(this.websiteName);
    document.getElementById('builder-header-website-name').innerHTML = this.websiteName;
    this.builderActionsService.renameRenameWebsiteModalStatus.next({'open': false});
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    if (this.websiteNameAvailabilitySubscription) {
      this.websiteNameAvailabilitySubscription.unsubscribe();
    }
  }
}
