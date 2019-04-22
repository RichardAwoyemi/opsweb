import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';

declare var $;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  user: any;
  userData: any;
  anonymousPhotoURL: string;
  firstName: string;
  lastName: string;
  selectedCurrency = 'Currency';
  selectedBudget = 'Budget';
  selectedLength = 1;
  selectedLengthCategory = 'day';
  selectedCategory: string;
  user$: Observable<any>;
  prices: any;
  task: any;

  private userSubscription: Subscription;
  private pricesSubscription: Subscription;
  onAdd = new EventEmitter();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private dataService: DataService,
    private ngxLoader: NgxUiLoaderService,
    private logger: NGXLogger,
    private router: Router
  ) {
    this.userData = {
      firstName: null,
      lastName: null
    };
  }

  @ViewChild('createTaskModal') createTaskModal: ElementRef;

  ngOnInit() {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';
    this.user = JSON.parse(localStorage.getItem('user'));

    this.userSubscription = this.userService.getUserById(this.user.uid).subscribe(result => {
      if (result) {
        if (!result['onboardingComplete']) {
          this.router.navigate(['dashboard']);
        }
        this.setUser(result);
        this.ngxLoader.stop();
      }
    });

    this.pricesSubscription = this.dataService.getAllPrices().subscribe(data => {
      if (data) {
        this.logger.debug(Object.values(data));
        this.prices = Object.values(data);
      }
    });
  }

  onSelectedCategoryChange(event) {
    this.logger.debug(`Category changed to: ${event.target.value}`);
    this.selectedCategory = event.target.value;
  }

  setUser(result) {
    this.logger.debug('Setting user:');
    this.logger.debug(result);
    this.userData = result;
  }

  openCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('show');
  }

  closeCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('hide');
  }

  completeTaskPreScreening() {
    if (this.selectedLength && this.selectedLengthCategory) {
      this.logger.debug(`Project duration set as: ${this.selectedLength} ${this.selectedLengthCategory}`);
      this.logger.debug('Completing task pre-screening!');

      this.task = {
        category: this.selectedCategory,
        budget: this.selectedBudget,
        currency: this.selectedCurrency,
        duration: `${this.selectedLength} ${this.selectedLengthCategory}`,
        status: 'incomplete'
      };
      this.logger.debug(this.task);
      localStorage.setItem('new-task', JSON.stringify(this.task));

      $(this.createTaskModal.nativeElement).modal('hide');
      this.router.navigate(['new-task']);
    } else {
      this.logger.debug('Conditions not met... cannot complete task pre-screening');
    }
  }

  canEnterStep2: (MovingDirection) => boolean = () => {
    if (this.selectedCategory) {
      this.logger.debug(`Category set as: ${this.selectedCategory}`);
      this.logger.debug('All conditions met... moving to step 2');
      return true;
    } else {
      this.logger.debug('Conditions not met... cannot move to step 2');
    }
  }

  canEnterStep3: (MovingDirection) => boolean = () => {
    if (this.selectedCurrency && this.selectedCurrency !== 'Currency' &&
        this.selectedBudget && this.selectedBudget !== 'Budget') {
      this.logger.debug(`Currency set as: ${this.selectedCurrency}`);
      this.logger.debug(`Budget set as: ${this.selectedBudget}`);
      return true;
    } else {
      this.logger.debug('Conditions not met... cannot move to step 3');
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.pricesSubscription) {
      this.pricesSubscription.unsubscribe();
    }
  }
}
