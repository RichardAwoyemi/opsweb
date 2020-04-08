import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropImageModalComponent } from './crop-image-modal/crop-image-modal.component';
import { FormPhotoUploadService } from './form-photo-upload.service';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { IUser } from 'src/app/shared/models/user';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-form-photo-upload',
  templateUrl: './form-photo-upload.component.html',
  styleUrls: ['./form-photo-upload.component.css']
})
export class FormPhotoUploadComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  user: IUser = {
    credits: 0,
    displayName: null,
    dobDay: null,
    dobMonth: null,
    dobYear: null,
    email: null,
    emailVerified: false,
    postcode: null,
    selectedCurrency: null,
    streetAddress1: null,
    streetAddress2: null,
    city: null,
    uid: null,
    username: null,
    photoURL: '/assets/img/anonymous.jpg',
    firstName: null,
    lastName: null,
    referralId: null,
    referredBy: null
  };

  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private formPhotoUploadService: FormPhotoUploadService,
    private breakpointObserver: BreakpointObserver,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
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
      this.toastrService.warning('Please select a photo to upload.', 'Oops!');
    }
  }

  setupUserProfilePhoto() {
    if (this.isMobile['matches']) {
      return { 'padding-bottom': '1em', 'text-align': 'center' };
    } else {
      return { 'text-align': 'center' };
    }
  }

  openCropImageModal() {
    this.modalService.open(CropImageModalComponent, { windowClass: 'modal-holder', centered: true, size: 'lg' });
  }
}
