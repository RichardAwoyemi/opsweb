import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { Subscription } from 'rxjs';
import { BuilderActionsService } from '../builder-actions.service';
import { ToastrService } from 'ngx-toastr';
import { ImgurResponse, ImgurService } from '../../../../shared/services/imgur.service';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';

@Component({
  selector: 'app-builder-select-image-modal',
  templateUrl: './builder-select-image-modal.component.html'
})
export class BuilderSelectImageModalComponent implements IModalComponent, OnInit, OnDestroy {
  componentId: string;
  parentKey: string;
  childKeySrc = 'src';
  childKeyAlt = 'alt';
  private activeLibrarySelectedImageSubscription: Subscription;
  private activeLibrarySelectedImageAltTextSubscription: Subscription;
  private pageComponentSubscription: Subscription;
  private activeLibrarySelectedImage: any;
  private activeLibrarySelectedImageAltText: any;
  private componentParentKey: any;

  constructor(
    private activeModal: NgbActiveModal,
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
      (response) ? this.activeLibrarySelectedImageAltText = response : this.activeLibrarySelectedImageAltText = 'componentId';
    });

    this.pageComponentSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      const pageComponent = response;
      const targetComponentLocation = this.builderComponentsService.getActiveTargetComponentById(this.componentId);
      const targetComponent = pageComponent['pages'][targetComponentLocation.activePageIndex]['components'][targetComponentLocation.activeComponentIndex];
      if (targetComponent.hasOwnProperty(this.parentKey)) {
        this.componentParentKey = targetComponent[this.parentKey];
      } else {
        this.componentParentKey = targetComponent['style'][this.parentKey];
      }
    });
  }

  async onConfirmButtonClick() {
    if (this.componentParentKey[this.childKeySrc] && this.activeLibrarySelectedImageAltText) {
      if (this.activeLibrarySelectedImage.includes('base64')) {
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
    if (this.activeLibrarySelectedImage) {
      this.builderComponentsService.setPageComponentByIdAndKey(this.componentId, this.parentKey, this.childKeySrc, this.activeLibrarySelectedImage);
    }
    if (this.activeLibrarySelectedImageAltText) {
      this.builderComponentsService.setPageComponentByIdAndKey(this.componentId, this.parentKey, this.childKeyAlt, this.activeLibrarySelectedImage);
    }
    this.toastrService.success('Your image has been updated.', 'Great!');
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  ngOnDestroy() {
    this.activeLibrarySelectedImageSubscription.unsubscribe();
    this.activeLibrarySelectedImageAltTextSubscription.unsubscribe();
    this.pageComponentSubscription.unsubscribe();
  }
}
