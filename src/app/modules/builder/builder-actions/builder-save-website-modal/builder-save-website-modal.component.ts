import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-builder-confirm-save-modal',
  templateUrl: './builder-save-website-modal.component.html'
})
export class BuilderSaveWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  pageComponents: any;
  websiteName: string;
  uid: string;
  private pageComponentsSubscription: Subscription;
  private websiteNameSubscription: Subscription;
  private authSubscription: Subscription;

  constructor(
    public afAuth: AngularFireAuth,
    private activeModal: NgbActiveModal,
    private websiteService: WebsiteService,
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });

    this.websiteNameSubscription = this.websiteService.websiteName.subscribe(response => {
      if (response) {
        this.websiteName = response;
      }
    });
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.authSubscription = this.afAuth.authState.subscribe(result => {
      if (result) {
        this.websiteService.saveWebsite(result.uid).then(() => {
          this.toastrService.success('Your website has been saved.', 'Great!');
        }).catch(() => {
          this.toastrService.error('Your website could not be saved. Please try again.', 'Oops!');
        });
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    UtilService.safeUnsubscribe(this.pageComponentsSubscription);
    UtilService.safeUnsubscribe(this.websiteNameSubscription);
    UtilService.safeUnsubscribe(this.authSubscription);
  }
}
