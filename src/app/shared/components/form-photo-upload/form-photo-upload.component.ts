import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from '../simple-modal/simple-modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { FormPhotoUploadService } from './form-photo-upload.service';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-form-photo-upload',
  templateUrl: './form-photo-upload.component.html',
  styleUrls: ['./form-photo-upload.component.css']
})
export class FormPhotoUploadComponent implements OnInit {
  user: IUser = {
    displayName: null,
    dobDay: null,
    dobMonth: null,
    dobYear: null,
    email: null,
    emailVerified: false,
    onboardingComplete: false,
    postcode: null,
    selectedCurrency: null,
    selectedTimezone: null,
    streetAddress1: null,
    streetAddress2: null,
    city: null,
    uid: null,
    username: null,
    photoURL: '/assets/img/anonymous.jpg',
    firstName: null,
    lastName: null
  };

  constructor(
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService,
    private formPhotoUploadService: FormPhotoUploadService,
    private userStore: Store<fromUser.State>
  ) { }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: any) => {
        if (result) {
          this.user = result;
        }
      });
  }

  fileChangeEvent(event: any): void {
    this.formPhotoUploadService.event = event;
    if (event.target.files && event.target.files.length) {
      this.openCropImageModal();
    } else {
      this.simpleModalService.displayMessage('Oops!', 'Please select a photo to upload.');
    }
  }

  openCropImageModal() {
    this.modalService.open(CropImageModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }
}
