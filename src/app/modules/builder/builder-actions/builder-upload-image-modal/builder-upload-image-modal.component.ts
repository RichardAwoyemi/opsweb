import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IModalComponent } from '../../../../shared/models/modal';
import { ImgurResponse, ImgurService } from '../../../../shared/services/imgur.service';
import { ActiveComponentsPartialSelector } from '../../builder';
import { BuilderComponentsService } from '../../builder-components/builder-components.service';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';

@Component({
  selector: 'app-builder-upload-image-modal',
  templateUrl: './builder-upload-image-modal.component.html'
})
export class BuilderUploadImageModalComponent implements IModalComponent, OnInit, OnDestroy {
  @Input() imageChangedEvent: any;
  croppedImage: any;
  innerHeight: number;
  modalHeight: any;
  pageComponents: any;

  ngUnsubscribe = new Subject<void>();

  constructor(
    private activeModal: NgbActiveModal,
    private imgurService: ImgurService,
    private toastrService: ToastrService,
    private builderNavbarService: BuilderNavbarService,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 300;
    this.modalHeight = {
      'height': `${this.innerHeight}px`
    };

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    if (this.croppedImage) {
      this.uploadImageToImgur();
    }
  }

  setNavbarOptionsStyle(key, value) {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, key, value);
    this.builderComponentsService.pageComponents.next(this.pageComponents);
  }

  uploadImageToImgur() {
    this.imgurService.upload(this.croppedImage.split('base64,')[1]).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((imgurResponse: ImgurResponse) => {
      if (imgurResponse.status === 200) {
        this.builderNavbarService.navbarLogoImage.next(imgurResponse.data.link);
        this.setNavbarOptionsStyle('navbarLogoImage', imgurResponse.data.link);
        this.toastrService.success('Your image has been uploaded.', 'Great!');
      } else {
        this.toastrService.error('An error occurred while trying to upload your image. Please try again.', 'Oops!');
      }
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
