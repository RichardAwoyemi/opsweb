import { Component, Input, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderService } from '../../builder.service';
import { BuilderActionsService } from '../builder-actions.service';

@Component({
  selector: 'app-builder-rename-website-modal',
  templateUrl: './builder-rename-website-modal.component.html'
})
export class BuilderRenameWebsiteModalComponent implements IModalComponent, OnDestroy {
  @Input() websiteName;
  @Input() newWebsiteName;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private afs: AngularFirestore,
    private activeModal: NgbActiveModal,
    private builderService: BuilderService,
    private builderActionsService: BuilderActionsService,
    private websiteService: WebsiteService
  ) {
  }

  onConfirmButtonClick() {
    this.websiteService.checkIfWebsiteNameIsAvailable(this.newWebsiteName).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(websites => {
      this.websiteService.renameWebsite(websites, this.activeModal, this.websiteService.websiteId.getValue(), this.newWebsiteName.toLowerCase());
    });
    this.builderActionsService.renameRenameWebsiteModalStatus.next({ 'open': false });
  }

  onCloseButtonClick() {
    this.websiteService.websiteName.next(this.websiteName);
    document.getElementById('builder-header-website-name').innerText = this.websiteName.toLowerCase();
    this.builderActionsService.renameRenameWebsiteModalStatus.next({ 'open': false });
    this.activeModal.dismiss();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
