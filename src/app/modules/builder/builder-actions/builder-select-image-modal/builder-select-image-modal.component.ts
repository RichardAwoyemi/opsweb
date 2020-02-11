import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription, BehaviorSubject } from 'rxjs';
import { BuilderActionsService } from '../builder-actions.service';
import { BuilderHeroService } from '../../builder-components/builder-hero/builder-hero.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';
import { ImgurResponse, ImgurService } from '../../../../shared/services/imgur.service';

@Component({
  selector: 'app-builder-select-image-modal',
  templateUrl: './builder-select-image-modal.component.html'
})
export class BuilderSelectImageModalComponent implements IModalComponent, OnInit, OnDestroy {
  private activeLibrarySelectedImageSubscription: Subscription;
  private activeLibrarySelectedImageAltTextSubscription: Subscription;
  private activeLibrarySelectedImage: any;
  private activeLibrarySelectedImageAltText: any;
  currentImageUrl: BehaviorSubject<any>;
  currentImageAlt: BehaviorSubject<any>;
  service: any;


  constructor(
    private activeModal: NgbActiveModal,
    private builderActionsService: BuilderActionsService,
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
  }

  async onConfirmButtonClick() {
    if (this.activeLibrarySelectedImage) {
      if (this.activeLibrarySelectedImage != this.currentImageUrl.getValue() || this.activeLibrarySelectedImageAltText != this.currentImageAlt.getValue()) {
        this.uploadImage();
      }
    }
    this.activeModal.dismiss();
  }

  uploadImage() {
    if (this.activeLibrarySelectedImage.includes('base64')) {
      if (!environment.production) {
        this.uploadImageToImgur();
      }
    } else {
      this.updateImage();
    }
  }

  uploadImageToImgur() {
    this.imgurService.upload(this.activeLibrarySelectedImage.split('base64,')[1]).subscribe((imgurResponse: ImgurResponse) => {
      if (imgurResponse.status == '200') {
        this.activeLibrarySelectedImage = imgurResponse.data.link;
        this.updateImage();
      }
    });
  }

  updateImage() {
    this.currentImageUrl.next(this.activeLibrarySelectedImage);
    this.currentImageAlt.next(this.activeLibrarySelectedImageAltText);
    this.toastrService.success('Your image has been updated.', 'Great!');
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.activeLibrarySelectedImageAltTextSubscription.unsubscribe();
    this.activeLibrarySelectedImageSubscription.unsubscribe();
  }
}
