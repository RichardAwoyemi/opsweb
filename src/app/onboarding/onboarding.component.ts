import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';
import { UtilService } from '../_services/util.service';
import { ModalService } from '../_services/modal.service';
import { ImgurService, ImgurResponse } from '../_services/imgur.service';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';

declare var $;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit, AfterViewInit, OnDestroy {
  userData: any;
  user: any;
  isMobile: Observable<BreakpointState>;
  firstName: string;
  lastName: string;
  timezone: string;
  currency: string;
  username: string;
  accountType: string;
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
  workToggle = false;
  hireToggle = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @ViewChild('showImageCroppingModal') showImageCroppingModal: ElementRef;

  private userSubscription: Subscription;
  private usernameSubscription: Subscription;
  private datesSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ngxLoader: NgxUiLoaderService,
    private logger: NGXLogger,
    private dataService: DataService,
    private userService: UserService,
    private utilService: UtilService,
    private modalService: ModalService,
    private imgurService: ImgurService,
    public router: Router
  ) { }

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

    this.datesSubscription = this.dataService.getAllDates().subscribe(data => {
      if (data) {
        this.logger.debug(Object.values(data));
        this.dates = Object.values(data);
      }
    });

    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    const lastYear = (new Date().getFullYear() - 18).toString();
    this.years = this.utilService.createYearRange('1930', lastYear);

    this.ngxLoader.stop();
  }

  ngAfterViewInit() {
    this.modalService.displayMessage('Welcome!', 'Thanks for signing up. Before we get started, please tell us a bit about yourself.');
  }

  counter(i: number) {
    return new Array(i);
  }

  handleFileInput(e) {
    this.ngxLoader.start();
    const reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgurService.upload(reader.result.toString().split('base64,')[1], this.user.uid).subscribe((imgurResponse: ImgurResponse) => {
          if (imgurResponse) {
            this.logger.debug('Picture uploaded to imgur');
            this.logger.debug(imgurResponse);
            this.userService.setUserPhoto(this.user.uid, imgurResponse.data.link).then(() =>
              this.modalService.displayMessage('Great!', 'Your photo has been updated.')
            ).catch((error) => {
              this.modalService.displayMessage('Oops!', error);
            });
            this.ngxLoader.stop();
          }
        });
      };
    }
  }

  canEnterStep2: (MovingDirection) => boolean = () => {
    if (this.username &&
        this.firstName &&
        this.lastName &&
        this.dobDay &&
        this.dobMonth &&
        this.dobYear &&
        this.streetAddress1 &&
        this.city &&
        this.postcode) {
        return this.setUserPersonalDetails();
    } else {
      this.logger.debug('Conditions not met... cannot move to step 2');
      this.modalService.displayMessage('Oops!', 'Please fill in all required fields correctly.');
      return false;
    }
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
              return false;
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
                this.postcode).catch((error) => {
                  if (!messageDisplayed) {
                    this.modalService.displayMessage('Oops!', error);
                    messageDisplayed = true;
                    return false;
                  }
                });
            }
            this.logger.debug('All conditions met... moving to step 2');
            return true;
          }
        });
      }
    } else {
      this.modalService.displayMessage('Oops!', 'Please fill in all required fields.');
      return false;
    }
    this.ngxLoader.stop();
  }

  toggleWork() {
    this.logger.debug('Work button clicked on step 2');
    if (!this.workToggle) {
      this.workToggle = !this.workToggle;
      this.hireToggle = !this.workToggle;
      this.logger.debug(`Work set to ${this.workToggle}`);
      this.logger.debug(`Hire set to ${this.hireToggle}`);
    }
  }

  toggleHire() {
    this.logger.debug('Hire button clicked on step 2');
    if (!this.hireToggle) {
      this.hireToggle = !this.hireToggle;
      this.workToggle = !this.hireToggle;
      this.logger.debug(`Work set to ${this.workToggle}`);
      this.logger.debug(`Hire set to ${this.hireToggle}`);
    }
  }

  completeOnboarding() {
    if (this.hireToggle || this.workToggle) {
      this.logger.debug('All conditions met... completing onboarding');
      this.logger.debug('Redirecting user to dashboard');
      this.setAccountType();
      this.setOnboardingAsComplete();
    } else {
      this.logger.debug('Conditions not met... cannot complete onboarding');
      this.modalService.displayMessage('Oops!', 'Please select a valid option.');
    }
  }

  setAccountType() {
    let messageDisplayed = false;
    this.ngxLoader.start();

    if (this.hireToggle) {
      this.accountType = 'hire';
    }
    if (this.workToggle) {
      this.accountType = 'work';
    }

    this.userService.setUserAccountType(this.user.uid, this.accountType).then().catch((error) => {
      if (!messageDisplayed) {
        this.modalService.displayMessage('Oops!', error);
        messageDisplayed = true;
      }
    });

    this.ngxLoader.stop();
  }

  setOnboardingAsComplete() {
    let messageDisplayed = false;
    this.userService.setOnboardingAsComplete(this.user.uid).then(() => {
      this.router.navigate(['login']);
    }).catch(() => {
      if (!messageDisplayed) {
        this.modalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
        messageDisplayed = true;
      }
    });
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
            this.modalService.displayMessage('Great!', 'Your photo has been updated.')
          ).catch((error) => {
            this.modalService.displayMessage('Oops!', error);
          });
          this.ngxLoader.stop();
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
    if (this.datesSubscription) {
      this.datesSubscription.unsubscribe();
    }
  }
}
