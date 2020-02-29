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
  private datesSubscription: Subscription;

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

          if (!result.dobDay || result.dobDay.trim().length === 0) {
            this.dobDay = 'Day';
          } else {
            this.dobDay = this.user.dobDay;
          }

          if (!result.dobMonth || result.dobMonth.trim().length === 0) {
            this.dobMonth = 'Month';
          } else {
            this.dobMonth = this.user.dobMonth;
          }

          if (!result.dobYear || result.dobYear.trim().length === 0) {
            this.dobYear = 'Year';
          } else {
            this.dobYear = this.user.dobYear;
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
  }

  counter(i: number) {
    return new Array(i);
  }

  onChangeUpdateDob() {
    if (this.dobDay !== 'Day') {
      this.user.dobDay = this.dobDay;
    }
    if (this.dobMonth !== 'Month') {
      this.user.dobMonth = this.dobMonth;
    }
    if (this.dobYear !== 'Year') {
      this.user.dobYear = this.dobYear;
    }
    this.userService.user.next(this.user);

    this.formDobInputService.showDobDayInputError = this.user.dobDay === 'Day';
    this.formDobInputService.showDobMonthInputError = this.user.dobMonth === 'Month';
    this.formDobInputService.showDobYearInputError = this.user.dobYear === 'Year';
  }

  ngOnDestroy() {
    if (this.datesSubscription) {
      this.datesSubscription.unsubscribe();
    }
  }
}
