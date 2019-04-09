import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';
import { UtilService } from '../_services/util.service';
import { ModalService } from '../_services/modal.service';
import { ImgurService, ImgurResponse } from '../_services/imgur.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBehance, faMediumM } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit, OnDestroy {
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
  availableOccupations = [
    'Admin Support',
    'Data Science and Analytics',
    'Design and Creative',
    'Digital Marketing',
    'Legal',
    'Sales and Marketing',
    'Translation',
    'Web, Mobile and Software Development',
    'Writing'
  ];
  noOfEmployeesList = [
    'It\'s just me',
    '2 - 9 employees',
    '10 - 99 employees',
    '100 - 499 employees',
    '500 - 1000 employees',
    'More than 1000 employees'
  ];

  private userSubscription: Subscription;
  private usernameSubscription: Subscription;
  private datesSubscription: Subscription;
  private occupationForm: FormGroup;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private ngxLoader: NgxUiLoaderService,
    private logger: NGXLogger,
    private dataService: DataService,
    private userService: UserService,
    private utilService: UtilService,
    private modalService: ModalService,
    private imgurService: ImgurService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.ngxLoader.start();

    library.add(faMediumM, faBehance);

    this.occupationForm = this.fb.group({
      occupationRows: this.fb.array([this.initOccupationRows()])
    });

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

  get occupationFormArray() {
    return this.occupationForm.get('occupationRows') as FormArray;
  }

  initOccupationRows() {
    return this.fb.group({
      occupationName: []
    });
  }

  addNewRow() {
    const selectedOccupation = this.occupationFormArray.value[this.occupationFormArray.value.length - 1]['occupationName'];
    this.logger.debug(`Current selection is: ${selectedOccupation}`);
    let processRequest = true;

    if (!selectedOccupation ||
      selectedOccupation === 'Select an occupation' ||
      selectedOccupation === null) {
      this.modalService.displayMessage('Oops!', 'You have not selected an occupation.');
      processRequest = false;
    }

    let count = 0;
    for (let i = 0; i < this.occupationFormArray.value.length; i++) {
      const currentOccupationInArray = this.occupationFormArray.value[i]['occupationName'];
      this.logger.debug(`At ${i}, we have "${currentOccupationInArray}"`);
      if (currentOccupationInArray === selectedOccupation) {
        count++;
      }
    }
    if (count > 1) {
      this.modalService.displayMessage('Oops!', 'You cannot select an occupation more than once.');
      processRequest = false;
    }

    if (processRequest === true) {
      this.logger.debug(`Adding new occupation: ${selectedOccupation}`);
      this.occupationFormArray.push(this.initOccupationRows());
      this.logger.debug(this.occupationFormArray.value);
    }
  }

  updateOccupation(selectedOccupation: string, index: number) {
    this.logger.debug(`Current selection is: ${selectedOccupation} at index ${index}`);
    let count = 0;
    let processRequest = true;

    if (!selectedOccupation ||
      selectedOccupation === 'Select an occupation' ||
      selectedOccupation === null) {
      this.modalService.displayMessage('Oops!', 'You have not selected an occupation.');
      processRequest = false;
    }

    for (let i = 0; i < this.occupationFormArray.value.length; i++) {
      const currentOccupationInArray = this.occupationFormArray.value[i]['occupationName'];
      this.logger.debug(`At ${i}, we have "${currentOccupationInArray}"`);
      if (currentOccupationInArray === selectedOccupation) {
        count++;
      }
    }
    if (count > 1) {
      this.modalService.displayMessage('Oops!', 'You cannot select an occupation more than once.');
      processRequest = false;
    }

    if (processRequest === true) {
      this.occupationFormArray.value[index]['occupationName'] = selectedOccupation;
      this.logger.debug(this.occupationFormArray.value);
    }
  }

  deleteRow(index: number) {
    this.logger.debug(`Deleting occupation row at ${index}`);
    this.occupationFormArray.removeAt(index);
    this.logger.debug(this.occupationForm.value);
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
              this.modalService.displayMessage('Yay!', 'Your photo has been updated.')
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
    if (this.username) {
      this.logger.debug('All conditions met... moving to step 2');
      this.setUserPersonalDetails();
      return true;
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

  canEnterStep3: (MovingDirection) => boolean = () => {
    if (this.hireToggle || this.workToggle) {
      this.logger.debug('All conditions met... moving to step 3');
      this.setAccountType();
      return true;
    } else {
      this.logger.debug('Conditions not met... cannot move to step 3');
      this.modalService.displayMessage('Oops!', 'Please select a valid option.');
      return false;
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

  completeOnboarding() {
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
