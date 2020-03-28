import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderActionsService } from '../builder-actions.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { ToastrService } from 'ngx-toastr';
import { ImgurResponse, ImgurService } from '../../../../shared/services/imgur.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { ActiveComponentsPartialSelector } from '../../builder';

@Component({
  selector: 'app-builder-select-image-modal',
  templateUrl: './builder-select-image-modal.component.html'
})
export class BuilderSelectImageModalComponent implements IModalComponent, OnInit, OnDestroy {
  private activeLibrarySelectedImageSubscription: Subscription;
  private activeLibrarySelectedImageAltTextSubscription: Subscription;
  private heroImageStyleSubscription: Subscription;
  private activeLibrarySelectedImage: any;
  private activeLibrarySelectedImageAltText: any;
  private heroImageStyle: any;

  constructor(
    private activeModal: NgbActiveModal,
    private builderHeroService: BuilderHeroService,
    private builderActionsService: BuilderActionsService,
    private builderComponentsService: BuilderComponentsService,
    private toastrService: ToastrService,
    private imgurService: ImgurService
  ) {
  }

  ngOnInit() {
    this.activeLibrarySelectedImageSubscription = this.builderActionsService.activeLibrarySelectedImage.subscribe(response => {
      this.activeLibrarySelectedImage = response;
    });

    this.activeLibrarySelectedImageAltTextSubscription = this.builderActionsService.activeLibrarySelectedImageAlt.subscribe(response => {
      this.activeLibrarySelectedImageAltText = response;
    });

    this.heroImageStyleSubscription = this.builderHeroService.heroImageStyle.subscribe(response => {
      this.heroImageStyle = response;
    });
  }

  async onConfirmButtonClick() {
    if (this.heroImageStyle['src'] && this.activeLibrarySelectedImageAltText) {
      if (this.activeLibrarySelectedImage) {
        this.uploadImage();
      } else {
        this.updateImage();
      }
    }
    this.activeModal.dismiss();
  }

  uploadImage() {
    if (this.activeLibrarySelectedImage.includes('base64')) {
      this.uploadImageToImgur();
    }
  }

  uploadImageToImgur() {
    this.imgurService.upload(this.activeLibrarySelectedImage.split('base64,')[1]).subscribe((imgurResponse: ImgurResponse) => {
      if (imgurResponse.status === 200) {
        this.activeLibrarySelectedImage = imgurResponse.data.link;
        this.updateImage();
      }
    });
  }

  updateImage() {
    const heroImageStyle = this.builderHeroService.heroImageStyle.getValue();
    if (this.activeLibrarySelectedImage) {
      heroImageStyle['src'] = this.activeLibrarySelectedImage;
    }
    if (this.activeLibrarySelectedImageAltText) {
      heroImageStyle['alt'] = this.activeLibrarySelectedImageAltText;
    }
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroImageStyle', heroImageStyle);
    this.builderHeroService.heroImageUrl.next(this.activeLibrarySelectedImage);
    this.builderHeroService.heroImageAlt.next(this.activeLibrarySelectedImageAltText);
    this.toastrService.success('Your image has been updated.', 'Great!');
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.activeLibrarySelectedImageSubscription.unsubscribe();
    this.activeLibrarySelectedImageAltTextSubscription.unsubscribe();
    this.heroImageStyleSubscription.unsubscribe();
  }
}
