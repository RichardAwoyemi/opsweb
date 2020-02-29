import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-confirm-save-modal',
  templateUrl: './builder-save-website-modal.component.html'
})
export class BuilderSaveWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  pageComponents: any;
  websiteName: string;
  private pageComponentsSubscription: Subscription;
  private websiteNameSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private websiteService: WebsiteService,
    private builderService: BuilderService,
    private builderComponentService: BuilderComponentsService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.pageComponentsSubscription = this.builderComponentService.pageComponents.subscribe(response => {
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
    this.websiteService.saveWebsite().then(() => {
      this.toastrService.success('Your website has been saved.', 'Great!');
    }).catch(() => {
      this.toastrService.error('Your website could not be saved. Please try again.', 'Oops!');
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.pageComponentsSubscription.unsubscribe();
  }
}
