import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderActionsService } from '../builder-actions.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-builder-select-image-modal',
  templateUrl: './builder-select-image-modal.component.html'
})
export class BuilderSelectImageModalComponent implements IModalComponent, OnInit {
  private activeLibrarySelectedImageSubscription: Subscription;
  private activeLibrarySelectedImage: any;

  constructor(
    private activeModal: NgbActiveModal,
    private builderHeroService: BuilderHeroService,
    private builderActionsService: BuilderActionsService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.activeLibrarySelectedImageSubscription = this.builderActionsService.activeLibrarySelectedImage.subscribe(response => {
      this.activeLibrarySelectedImage = response;
    });
  }

  onConfirmButtonClick() {
    if (this.activeLibrarySelectedImage) {
      this.builderHeroService.heroImageUrl.next(this.activeLibrarySelectedImage['urls']['full']);
      this.builderHeroService.heroImageAlt.next(this.activeLibrarySelectedImage['alt_description']);
      this.toastrService.success('Your image has been updated.', 'Great!');
    }
    this.activeModal.dismiss();
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }
}
