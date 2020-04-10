import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { IModalComponent } from '../../../../shared/models/modal';
import { IUser } from '../../../../shared/models/user';
import { UtilService } from '../../../../shared/services/util.service';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderActionsService } from '../../../builder/builder-actions/builder-actions.service';
import { BuilderService } from '../../../builder/builder.service';
import * as fromUser from '../../../core/store/user/user.reducer';

@Component({
  selector: 'app-dashboard-create-website-modal',
  templateUrl: './dashboard-create-website-modal.component.html'
})
export class DashboardCreateWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  user: IUser;
  disableSaveButton: boolean;
  websiteName: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private builderService: BuilderService,
    private afs: AngularFirestore,
    private userStore: Store<fromUser.State>,
    private websiteService: WebsiteService,
    private templateService: TemplateService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.websiteName = UtilService.generateWebsiteName();
    this.userStore.select('user')
      .pipe()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
  }

  onConfirmButtonClick() {
    this.websiteName = this.websiteName.toLowerCase();
    this.websiteService.checkIfWebsiteNameIsAvailable(this.websiteName).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(async websitesWithSameName => {
        if (websitesWithSameName.size === 0) {
          const documentId = this.afs.createId();
          const documentPath = `websites/${documentId}`;
          await this.templateService.getWebsite('default').then(response => {
            const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
            this.websiteService.getWebsitesByUserId(this.user.uid).pipe(takeUntil(this.ngUnsubscribe))
              .subscribe(websitesOwnedByUser => {
                if (websitesOwnedByUser.length < 3) {
                  documentRef.set({
                    name: this.websiteName,
                    id: documentId,
                    createdBy: this.user.uid,
                    pages: response['pages'],
                    template: response['template']
                  }, { merge: true }).then(() => {
                  });
                  this.builderService.setSidebarComponentsSetting();
                  this.builderService.activePageIndex.next(0);
                  this.toastrService.success('Your website has been created.');
                  this.activeModal.close();
                  this.router.navigateByUrl(`/builder/${documentId}`).then(() => {
                  });
                } else {
                  this.toastrService.error(`You cannot create more than 3 websites on your current plan.`);
                }
              });
          });
        } else {
          this.toastrService.error(`A website with this name already exists.`);
        }
      });
  }

  validateWebsiteName() {
    this.disableSaveButton = BuilderActionsService.toggleWebsiteModalSaveButton(this.websiteName);
  }

  onCloseButtonClick() {
    this.activeModal.close();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
