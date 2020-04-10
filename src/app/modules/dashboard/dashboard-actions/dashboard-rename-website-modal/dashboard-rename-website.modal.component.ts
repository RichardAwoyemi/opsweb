import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';

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
  ngUnsubscribe = new Subject<void>();

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
    this.websiteService.checkIfWebsiteNameIsAvailable(this.newWebsiteName.toLowerCase()).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(websites => {
        this.websiteService.renameWebsite(websites, this.activeModal, this.websiteId, this.newWebsiteName.toLowerCase());
      });
  }

  onCloseButtonClick() {
    this.websiteService.websiteName.next(this.websiteName.toLowerCase());
    this.activeModal.dismiss();
  }

  validateWebsiteName() {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(this.websiteName.toLowerCase());
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
