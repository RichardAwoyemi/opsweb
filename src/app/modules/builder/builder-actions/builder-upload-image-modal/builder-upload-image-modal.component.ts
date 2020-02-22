import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IModalComponent } from '../../../../shared/models/modal';
import { BuilderNavbarService } from '../../builder-components/builder-navbar/builder-navbar.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImgurResponse, ImgurService } from '../../../../shared/services/imgur.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-builder-upload-image-modal',
  templateUrl: './builder-upload-image-modal.component.html'
})
export class BuilderUploadImageModalComponent implements IModalComponent, OnInit {
  @Input() imageChangedEvent: any;
  croppedImage: any;
  innerHeight: number;
  modalHeight: any;

  constructor(
    private activeModal: NgbActiveModal,
    private imgurService: ImgurService,
    private toastrService: ToastrService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight - 300;
    this.modalHeight = {
      'height': `${this.innerHeight}px`
    };
  }

  onCloseButtonClick() {
    this.activeModal.dismiss();
  }

  onConfirmButtonClick() {
    this.activeModal.dismiss();
    if (this.croppedImage) {
      if (!environment.production) {
        this.uploadImageToImgur();
      }
    }
  }

  uploadImageToImgur() {
    this.imgurService.upload(this.croppedImage.split('base64,')[1]).subscribe((imgurResponse: ImgurResponse) => {
      if (imgurResponse.status === '200') {
        this.builderNavbarService.navbarLogoImage.next(imgurResponse.data.link);
        this.toastrService.success('Your image has been uploaded.', 'Great!');
      } else {
        this.toastrService.error('An error occurred while trying to upload your image. Please try again.', 'Oops!');
      }
    });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
