import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXLogger } from 'ngx-logger';
import { FormPhotoUploadService } from '../form-photo-upload.service';
import { ImgurResponse, ImgurService } from '../../../services/imgur.service';
import { UserService } from '../../../services/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../../modules/core/store/user/user.reducer';
import { ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService,
    private imgurService: ImgurService,
    private userService: UserService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: any) => {
        if (result) {
          this.user = result;
        }
      });
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
      this.imgurService.upload(this.croppedImage.split('base64,')[1]).subscribe((imgurResponse: ImgurResponse) => {
        if (imgurResponse) {
          this.logger.debug('Picture uploaded to imgur');
          this.logger.debug(imgurResponse);
          this.userService.setUserPhoto(this.user.uid, imgurResponse.data.link).then(() =>
            this.toastrService.success('Your photo has been updated.', 'Great!')
          ).catch((error) => {
            this.toastrService.error(error, 'Oops!');
          });
        }
      });
    }
  }
}
