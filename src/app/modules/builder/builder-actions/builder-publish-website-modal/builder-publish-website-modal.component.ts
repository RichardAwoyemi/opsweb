import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../../shared/services/website.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../../shared/services/util.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-builder-publish-website-modal',
  templateUrl: './builder-publish-website-modal.component.html'
})
export class BuilderPublishWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  websiteId: string;

  private websiteIdSubscription: Subscription;
  private authSubscription: Subscription;

  constructor(
    public afAuth: AngularFireAuth,
    private activeModal: NgbActiveModal,
    private toastrService: ToastrService,
    private websiteService: WebsiteService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.websiteIdSubscription = this.websiteService.websiteId.subscribe(response => {
      if (response) {
        this.websiteId = response;
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.authSubscription = this.afAuth.authState.subscribe(result => {
      if (result) {
        this.websiteService.saveWebsite(result.uid).then(() => {
          this.router.navigate(['websites', this.websiteId]).then(() => {
            this.toastrService.success(`Your website has been published.`, 'Great!');
          });
        }).catch(() => {
          this.toastrService.error('Your website could not be saved. Please try again.', 'Oops!');
        });
      }
    });
  }

  ngOnDestroy() {
    UtilService.safeUnsubscribe(this.websiteIdSubscription);
    UtilService.safeUnsubscribe(this.authSubscription);
  }
}
