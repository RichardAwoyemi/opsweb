import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormDobInputService } from './form-dob-input.service';
import { NGXLogger } from 'ngx-logger';
import { UtilService } from '../../services/util.service';
import { DataService } from '../../services/data.service';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';

@Component({
  selector: 'app-form-dob-input',
  templateUrl: './form-dob-input.component.html'
})
export class FormDobInputComponent implements OnInit, OnDestroy {
  dates: any;
  years: any;
  user: IUser;
  private dobDay: string;
  private dobMonth: string;
  private dobYear: string;
  private showDobDayInputError: any;
  private showDobMonthInputError: any;
  private showDobYearInputError: any;

  private datesSubscription: Subscription;
  private dobDaySubscription: Subscription;
  private dobDayInputErrorSubscription: Subscription;
  private dobMonthSubscription: Subscription;
  private dobMonthInputErrorSubscription: Subscription;
  private dobYearSubscription: Subscription;
  private dobYearInputErrorSubscription: Subscription;

  constructor(
    private utilService: UtilService,
    private dataService: DataService,
    private userService: UserService,
    private logger: NGXLogger,
    private userStore: Store<fromUser.State>,
    private formDobInputService: FormDobInputService
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (!result.dobDay) {
            this.dobDay = 'Day';
          } else {
            this.dobDay = this.user.dobDay;
            this.userService.dobDay.next(this.dobDay);
            this.formDobInputService.showDobDayInputError.next({ 'status': false });
          }
          if (!result.dobMonth) {
            this.dobMonth = 'Month';
          } else {
            this.dobMonth = this.user.dobMonth;
            this.userService.dobMonth.next(this.dobMonth);
            this.formDobInputService.showDobMonthInputError.next({ 'status': false });
          }
          if (!result.dobYear) {
            this.dobYear = 'Year';
          } else {
            this.dobYear = this.user.dobYear;
            this.userService.dobYear.next(this.dobYear);
            this.formDobInputService.showDobYearInputError.next({ 'status': false });
          }
        }
      });

    const lastYear = (new Date().getFullYear() - 18).toString();
    this.years = UtilService.createYearRange('1930', lastYear);
    this.datesSubscription = this.dataService.getAllDates().subscribe(data => {
      if (data) {
        this.dates = Object.values(data);
      }
    });

    this.datesSubscription = this.dataService.getAllDates().subscribe(data => {
      if (data) {
        this.dates = Object.values(data);
      }
    });

    this.dobDayInputErrorSubscription = this.formDobInputService.showDobDayInputError.subscribe(response => {
      if (response) {
        this.showDobDayInputError = response;
      }
    });

    this.dobMonthInputErrorSubscription = this.formDobInputService.showDobMonthInputError.subscribe(response => {
      if (response) {
        this.showDobMonthInputError = response;
      }
    });

    this.dobYearInputErrorSubscription = this.formDobInputService.showDobYearInputError.subscribe(response => {
      if (response) {
        this.showDobYearInputError = response;
      }
    });

    this.dobDaySubscription = this.userService.dobDay.subscribe((response => {
      if (response) {
        this.dobDay = response;
        this.formDobInputService.showDobDayInputError.next({ 'status': this.dobDay === 'Day' });
      }
    }));

    this.dobMonthSubscription = this.userService.dobMonth.subscribe((response => {
      if (response) {
        this.dobMonth = response;
        this.formDobInputService.showDobMonthInputError.next({ 'status': this.dobMonth === 'Month' });
      }
    }));

    this.dobYearSubscription = this.userService.dobYear.subscribe((response => {
      if (response) {
        this.dobYear = response;
        this.formDobInputService.showDobYearInputError.next({ 'status': this.dobYear === 'Month' });
      }
    }));
  }

  counter(i: number) {
    return new Array(i);
  }

  onChangeUpdateDob() {
    this.userService.dobDay.next(this.dobDay);
    this.userService.dobMonth.next(this.dobMonth);
    this.userService.dobYear.next(this.dobYear);

    this.formDobInputService.showDobDayInputError.next({ 'status': this.dobDay === 'Day' });
    this.formDobInputService.showDobMonthInputError.next({ 'status': this.dobMonth === 'Month' });
    this.formDobInputService.showDobYearInputError.next({ 'status': this.dobYear === 'Year' });
  }

  ngOnDestroy() {
    this.datesSubscription.unsubscribe();
    this.dobDaySubscription.unsubscribe();
    this.dobDayInputErrorSubscription.unsubscribe();
    this.dobMonthSubscription.unsubscribe();
    this.dobMonthInputErrorSubscription.unsubscribe();
    this.dobYearSubscription.unsubscribe();
    this.dobYearInputErrorSubscription.unsubscribe();
  }
}
