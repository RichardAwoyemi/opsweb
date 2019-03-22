import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.staging';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';
import { UtilService } from '../_services/util.service';
import { AuthService } from '../_services/auth.service';
import { ModalService } from '../_services/modal.service';
import { NGXLogger } from 'ngx-logger';

declare var $;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
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
  isPasswordChangeEnabled: boolean;
  isMobile: Observable<BreakpointState>;

  @ViewChild('showVerifyIdentityModal') showVerifyIdentityModal: ElementRef;
  @ViewChild('showVerifyDocumentationModal') showVerifyDocumentationModal: ElementRef;

  private datesSubscription: Subscription;
  private usernameSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private modalService: ModalService,
    private dataService: DataService,
    private utilService: UtilService,
    private authService: AuthService,
    private logger: NGXLogger
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
      }
    });

    this.dataService.getAllTimezones().subscribe(data => {
      if (data) {
        if (environment.production === false) {
          this.logger.debug(data);
        }
        this.timezones = data;
      }
    });

    this.dataService.getAllCurrencies().subscribe(data => {
      if (data) {
        if (environment.production === false) {
          this.logger.debug(data);
        }
        this.currencies = data;
      }
    });

    this.datesSubscription = this.dataService.getAllDates().subscribe(data => {
      if (data) {
        if (environment.production === false) {
          this.logger.debug(Object.values(data));
        }
        this.dates = Object.values(data);
      }
    });

    this.isPasswordChangeEnabled = this.authService.enableChangePasswordOption();
    this.referralMode = environment.referralMode;
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    const lastYear = (new Date().getFullYear() - 18).toString();
    this.years = this.utilService.createYearRange('1930', lastYear);
  }

  counter(i: number) {
    return new Array(i);
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
        this.modalService.displayMessage('Yay!', 'Your settings have been updated.')
      ).catch((error) => {
        this.modalService.displayMessage('Oops!', error);
      });
    } else {
      this.modalService.displayMessage('Oops!', 'Please fill in all required fields.');
    }
  }

  setUserPersonalDetails() {
    let messageDisplayed = false;
    if (this.user.uid && this.username && this.firstName && this.lastName &&
      this.dobDay && this.dobMonth && this.dobYear && this.streetAddress1 &&
      this.city && this.postcode) {
      if (this.dobDay !== 'Day' || this.dobMonth !== 'Month' || this.dobYear !== 'Year') {
        this.usernameSubscription = this.userService.getUserByUsername(this.username.toLowerCase()).subscribe((result) => {
          if (result) {
            if ((result.length > 0) && (result[0]['username'] === this.username.toLowerCase()) && (result[0]['uid'] !== this.user.uid)) {
              this.logger.debug('Username belongs to another user');
              this.modalService.displayMessage('Oops!', 'Please fill in all required fields.');
            } else {
              this.userService.setUserPersonalDetails(this.user.uid, this.username.toLowerCase(), this.firstName, this.lastName,
                this.dobDay, this.dobMonth, this.dobYear, this.streetAddress1, this.streetAddress2, this.city,
                this.postcode).then(() => {
                    if (!messageDisplayed) {
                      this.modalService.displayMessage('Yay!', 'Your settings have been updated.');
                      messageDisplayed = true;
                    }
                  }
                ).catch((error) => {
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
  }

  ngOnDestroy() {
    if (this.datesSubscription) {
      this.datesSubscription.unsubscribe();
    }
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }
}
