import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { FormPhotoUploadService } from '../form-photo-upload.service';
import { ImgurResponse, ImgurService } from '../../../services/imgur.service';
import { SimpleModalService } from '../../simple-modal/simple-modal.service';
import { UserService } from '../../../services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-crop-image-modal',
  templateUrl: './crop-image-modal.component.html'
})
export class CropImageModalComponent implements OnInit {
  imageChangedEvent: any;
  croppedImage: any;
  user: any;

  constructor(
    private logger: NGXLogger,
    public activeModal: NgbActiveModal,
    private formPhotoUploadService: FormPhotoUploadService,
    private simpleModalService: SimpleModalService,
    private imgurService: ImgurService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.imageChangedEvent = this.formPhotoUploadService.event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.logger.debug('Image cropped');
    this.croppedImage = event.base64;
    this.logger.debug(this.croppedImage);
  }

  imageLoaded() {
    this.logger.debug('Image loaded');
  }

  cropperReady() {
    this.logger.debug('Cropper ready');
  }

  loadImageFailed() {
    this.logger.debug('Load image failed');
  }

  savePicture() {
    this.activeModal.dismiss();
    this.logger.debug('Saving image');
    if (this.croppedImage) {
      this.imgurService.upload(this.croppedImage.split('base64,')[1], this.user.uid).subscribe((imgurResponse: ImgurResponse) => {
        if (imgurResponse) {
          this.logger.debug('Picture uploaded to imgur');
          this.logger.debug(imgurResponse);
          this.userService.setUserPhoto(this.user.uid, imgurResponse.data.link).then(() =>
            this.simpleModalService.displayMessage('Great!', 'Your photo has been updated.')
          ).catch((error) => {
            this.simpleModalService.displayMessage('Oops!', error);
          });
        }
      });
    }
  }
}
