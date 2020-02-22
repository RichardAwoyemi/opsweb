import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { ToastrService } from 'ngx-toastr';
import { WebsiteService } from '../../../../shared/services/website.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder-confirm-save-modal',
  templateUrl: './builder-save-website-modal.component.html'
})
export class BuilderSaveWebsiteModalComponent implements IModalComponent, OnInit, OnDestroy {
  pageComponents: any;
  private pageComponentsSubscription: Subscription;

  constructor(
    private activeModal: NgbActiveModal,
    private websiteService: WebsiteService,
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
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    this.websiteService.saveWebsite('test', this.pageComponents);
    this.toastrService.success('Your website has been saved.', 'Great!');
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.pageComponentsSubscription.unsubscribe();
  }
}
