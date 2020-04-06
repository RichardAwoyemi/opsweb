import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../../shared/services/website.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-builder-publish-website-modal',
  templateUrl: './builder-publish-website-modal.component.html'
})
export class BuilderPublishWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  websiteId: string;

  private websiteIdSubscription: Subscription;

  constructor(
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
    this.router.navigate(['website', this.websiteId]).then(() => {
    });
    this.toastrService.success(`Your website has been published.`, 'Great!');
  }

  ngOnDestroy() {
    this.websiteIdSubscription.unsubscribe();
  }
}
