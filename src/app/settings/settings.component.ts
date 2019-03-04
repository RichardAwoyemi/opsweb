import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment.staging';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';
import { ModalComponent } from '../_modals/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../_services/util.service';
import { AuthService } from '../_services/auth.service';

declare var $;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userData: any;
  user: any;
  campaignMode: boolean;
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
  isPasswordChangeEnabled: boolean;
  isMobile: Observable<BreakpointState>;

  @ViewChild('showVerifyIdentityModal') showVerifyIdentityModal: ElementRef;
  @ViewChild('showVerifyDocumentationModal') showVerifyDocumentationModal: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private modalService: NgbModal,
    private dataService: DataService,
    private utilService: UtilService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUserById(this.user.uid).subscribe(data => {
      if (data) {
        this.firstName = data['firstName'];
        this.lastName = data['lastName'];

        if (data['username']) {
          this.username = data['username'];
        }

        if (data['selectedTimezone']) {
          this.timezone = data['selectedTimezone'];
        } else {
          this.timezone = 'Greenwich Median Time';
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
        }

        if (data['city']) {
          this.city = data['city'];
        }

        if (data['postcode']) {
          this.postcode = data['postcode'];
        }
      }
    });

    this.dataService.getAllTimezones().subscribe(data => {
      if (data) {
        if (!environment.production) {
          console.log(data);
        }
        this.timezones = data;
      }
    });

    this.dataService.getAllCurrencies().subscribe(data => {
      if (data) {
        if (!environment.production) {
          console.log(data);
        }
        this.currencies = data;
      }
    });

    this.dataService.getAllDates().subscribe(data => {
      if (data) {
        if (!environment.production) {
          console.log(Object.values(data));
        }
        this.dates = Object.values(data);
      }
    });

    this.isPasswordChangeEnabled = this.authService.enableChangePasswordOption();
    this.campaignMode = environment.campaignMode;
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    const lastYear = (new Date().getFullYear() - 18).toString();
    this.years = this.utilService.createYearRange('1930', lastYear);
  }

  counter(i: number) {
    return new Array(i);
  }

  displayUpdateSuccess() {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Yay!';
    modalReference.componentInstance.message = 'Your settings have been updated.';
  }

  displayGenericError(error) {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Oops!';
    modalReference.componentInstance.message = error;
  }

  showVerifyIdentity() {
    $(this.showVerifyIdentityModal.nativeElement).modal('show');
  }

  showVerifyDocumentation() {
    $(this.showVerifyDocumentationModal.nativeElement).modal('show');
  }

  setUserCurrencyAndTimezonePreferences() {
    if (this.user.uid && this.timezone && this.currency) {
      this.userService.setUserCurrencyAndTimezonePreferences(this.user.uid, this.timezone, this.currency).then(() =>
        this.displayUpdateSuccess()
      ).catch((error) => {
        this.displayGenericError(error);
      });
    } else {
      this.displayGenericError('Please fill in all required fields.');
    }
  }

  setUserPersonalDetails() {
    if (this.user.uid && this.username && this.firstName && this.lastName && this.dobDay && this.dobMonth
      && this.dobYear && this.streetAddress1 && this.city && this.postcode) {
        if (this.dobDay !== 'Day' || this.dobMonth !== 'Month' || this.dobYear !== 'Year') {
          this.userService.setUserPersonalDetails(this.user.uid, this.username, this.firstName, this.lastName,
            this.dobDay, this.dobMonth, this.dobYear, this.streetAddress1, this.streetAddress2, this.city,
            this.postcode).then(() =>
              this.displayUpdateSuccess()
            ).catch((error) => {
              this.displayGenericError(error);
            });
        }
    } else {
      this.displayGenericError('Please fill in all required fields.');
    }
  }
}
