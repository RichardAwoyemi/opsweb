import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';
import { UtilService } from '../_services/util.service';
import { AuthService } from '../_services/auth.service';
import { ModalService } from '../_services/modal.service';
import { NGXLogger } from 'ngx-logger';
import { ImgurService, ImgurResponse } from '../_services/imgur.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { CsvService } from '../_services/csv.service';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare var $;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [DatePipe]
})
export class SettingsComponent implements OnInit, OnDestroy {
  userData: any;
  user: any;
  referralMode: boolean;
  anonymousPhotoURL: string;
  firstName: string;
  lastName: string;
  timezone: string;
  currency: string;
  username: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postcode: string;
  currencies: any;
  timezones: any;
  dates: any;
  years: any;
  isPasswordChangeEnabled = false;
  isMobile: Observable<BreakpointState>;
  currentDate = new Date();
  formattedCurrentDate = '';
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @ViewChild('showImageCroppingModal') showImageCroppingModal: ElementRef;

  private datesSubscription: Subscription;
  private usernameSubscription: Subscription;
  private userSubscription: Subscription;
  private currenciesSubscription: Subscription;
  private timezonesSubscription: Subscription;
  private passwordSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private modalService: ModalService,
    private dataService: DataService,
    private utilService: UtilService,
    private afAuth: AngularFireAuth,
    private imgurService: ImgurService,
    private authService: AuthService,
    private ngxLoader: NgxUiLoaderService,
    private logger: NGXLogger,
    private datePipe: DatePipe,
    private csvService: CsvService,
  ) {
    this.formattedCurrentDate = this.datePipe.transform(this.currentDate, 'yyyyMMdd');
  }

  ngOnInit() {
    this.ngxLoader.start();

    this.user = JSON.parse(localStorage.getItem('user'));
    this.user.photoURL = 'https://i.imgflip.com/1slnr0.jpg';

    this.userSubscription = this.userService.getUserById(this.user.uid).subscribe(data => {
      if (data) {
        this.logger.debug('User data retrieved:');
        this.logger.debug(data);

        this.firstName = data['firstName'];
        this.lastName = data['lastName'];

        if (data['username']) {
          this.username = data['username'];
        }

        if (data['selectedTimezone']) {
          this.timezone = data['selectedTimezone'];
        } else {
          this.timezone = '(UTC) Edinburgh, London';
        }

        if (data['selectedCurrency']) {
          this.currency = data['selectedCurrency'];
        } else {
          this.currency = 'GBP';
        }

        if (data['dobYear']) {
          this.dobYear = data['dobYear'];
        } else {
          this.dobYear = 'Year';
        }

        if (data['dobMonth']) {
          this.dobMonth = data['dobMonth'];
        } else {
          this.dobMonth = 'Month';
        }

        if (data['dobDay']) {
          this.dobDay = data['dobDay'];
        } else {
          this.dobDay = 'Day';
        }

        if (data['streetAddress1']) {
          this.streetAddress1 = data['streetAddress1'];
        }

        if (data['streetAddress2']) {
          this.streetAddress2 = data['streetAddress2'];
        } else {
          this.streetAddress2 = null;
        }

        if (data['city']) {
          this.city = data['city'];
        }

        if (data['postcode']) {
          this.postcode = data['postcode'];
        }

        if (data['photoURL']) {
          this.user.photoURL = data['photoURL'];
        }

        if (data['email']) {
          this.user.email = data['email'];
        }

        this.userData = [
          {
            firstName: this.firstName,
            lastName: this.lastName,
            username: this.username,
            currency: this.currency,
            dateOfBirth: `${this.dobYear}-${this.dobMonth}-${this.dobDay}`,
            streetAddress: `${this.streetAddress1},${this.streetAddress2},${this.city},${this.postcode}`,
            photoURL: this.user.photoURL,
            email: this.user.email
          }
        ];
      }
    });

    this.timezonesSubscription = this.dataService.getAllTimezones().subscribe(data => {
      if (data) {
        this.logger.debug(data);
        this.timezones = data;
      }
    });

    this.currenciesSubscription = this.dataService.getAllCurrencies().subscribe(data => {
      if (data) {
        this.logger.debug(data);
        this.currencies = data;
      }
    });

    this.datesSubscription = this.dataService.getAllDates().subscribe(data => {
      if (data) {
        this.logger.debug(Object.values(data));
        this.dates = Object.values(data);
      }
    });

    this.passwordSubscription = this.afAuth.authState.subscribe(response => {
      if (response) {
        if (response.providerData[0].providerId === 'facebook.com' || response.providerData[0].providerId === 'google.com') {
          this.logger.debug('Disabling change password option');
          this.isPasswordChangeEnabled = false;
        } else {
          this.logger.debug('Enabling change password option');
          this.isPasswordChangeEnabled = true;
        }
        this.ngxLoader.stop();
      }
    });

    this.referralMode = environment.referralMode;
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    const lastYear = (new Date().getFullYear() - 18).toString();
    this.years = this.utilService.createYearRange('1930', lastYear);
  }

  counter(i: number) {
    return new Array(i);
  }

  setUserCurrencyAndTimezonePreferences() {
    this.ngxLoader.start();
    if (this.user.uid && this.timezone && this.currency) {
      this.userService.setUserCurrencyAndTimezonePreferences(this.user.uid, this.timezone, this.currency).then(() =>
        this.modalService.displayMessage('Yay!', 'Your settings have been updated.')
      ).catch((error) => {
        this.modalService.displayMessage('Oops!', error);
      });
    } else {
      this.modalService.displayMessage('Oops!', 'Please fill in all required fields.');
    }
    this.ngxLoader.stop();
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    if (event.target.files && event.target.files.length) {
      $(this.showImageCroppingModal.nativeElement).modal('show');
    } else {
      this.modalService.displayMessage('Oops!', 'Please select a photo to upload.');
    }
  }

  savePicture() {
    $(this.showImageCroppingModal.nativeElement).modal('hide');
    this.logger.debug('Saving image');
    if (this.croppedImage) {
      this.ngxLoader.start();
      this.imgurService.upload(this.croppedImage.split('base64,')[1], this.user.uid).subscribe((imgurResponse: ImgurResponse) => {
        if (imgurResponse) {
          this.logger.debug('Picture uploaded to imgur');
          this.logger.debug(imgurResponse);
          this.userService.setUserPhoto(this.user.uid, imgurResponse.data.link).then(() =>
            this.modalService.displayMessage('Yay!', 'Your photo has been updated.')
          ).catch((error) => {
            this.modalService.displayMessage('Oops!', error);
          });
          this.ngxLoader.stop();
        }
      });
    }
  }

  downloadAsCsv() {
    this.logger.debug('Downloading personal data in CSV format');
    this.logger.debug(this.userData);
    this.csvService.exportAsCsvFile(this.userData, this.formattedCurrentDate + '_userInformation');
  }

  setUserPersonalDetails() {
    this.ngxLoader.start();
    let messageDisplayed = false;
    if (
      this.user.uid &&
      this.username &&
      this.firstName &&
      this.lastName &&
      this.dobDay &&
      this.dobMonth &&
      this.dobYear &&
      this.streetAddress1 &&
      this.city &&
      this.postcode
    ) {
      if (this.dobDay !== 'Day' || this.dobMonth !== 'Month' || this.dobYear !== 'Year') {
        this.usernameSubscription = this.userService.getUserByUsername(this.username.toLowerCase().trim()).subscribe((result) => {
          if (result) {
            if ((result.length > 0) && (result[0]['username'] === this.username.toLowerCase().trim()) &&
              (result[0]['uid'] !== this.user.uid)) {
              this.logger.debug('Username belongs to another user');
              this.modalService.displayMessage('Oops!', 'This username is already in use.');
            } else {
              this.userService.setUserPersonalDetails(
                this.user.uid,
                this.username.toLowerCase(),
                this.utilService.toTitleCase(this.firstName),
                this.utilService.toTitleCase(this.lastName),
                this.dobDay,
                this.dobMonth,
                this.dobYear,
                this.streetAddress1,
                this.streetAddress2,
                this.city,
                this.postcode).then(() => {
                  if (!messageDisplayed) {
                    this.modalService.displayMessage('Yay!', 'Your settings have been updated.');
                    messageDisplayed = true;
                  }
                }).catch((error) => {
                  if (!messageDisplayed) {
                    this.modalService.displayMessage('Oops!', error);
                    messageDisplayed = true;
                  }
                });
            }
          }
        });
      }
    } else {
      this.modalService.displayMessage('Oops!', 'Please fill in all required fields.');
    }
    this.ngxLoader.stop();
  }

  changePassword() {
    if (this.user.email) {
      this.authService.forgotPassword(this.user.email);
    }
  }

  ngOnDestroy() {
    if (this.datesSubscription) {
      this.datesSubscription.unsubscribe();
    }
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
    if (this.currenciesSubscription) {
      this.currenciesSubscription.unsubscribe();
    }
    if (this.timezonesSubscription) {
      this.timezonesSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.passwordSubscription) {
      this.passwordSubscription.unsubscribe();
    }
  }
}
