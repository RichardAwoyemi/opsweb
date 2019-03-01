import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/environments/environment.staging';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { DataService } from '../_services/data.service';
import { ModalComponent } from '../_modals/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  currencies: any;
  timezones: any;
  isMobile: Observable<BreakpointState>;

  @ViewChild('showVerifyIdentityModal') showVerifyIdentityModal: ElementRef;
  @ViewChild('showVerifyDocumentationModal') showVerifyDocumentationModal: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private modalService: NgbModal,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUserById(this.user.uid).subscribe(data => {
      if (data) {
        this.firstName = data['firstName'];
        this.lastName = data['lastName'];

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

    this.campaignMode = environment.campaignMode;
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
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
    }
  }
}
