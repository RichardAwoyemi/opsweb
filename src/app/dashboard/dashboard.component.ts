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
  pricingCurrency = 'Currency';
  projectLength = 1;
  projectLengthCategory: string;
  selectedCategory: string;
  user$: Observable<any>;
  prices: any;

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

  onSelectedCategoryChange(value) {
    this.onAdd.emit();
    this.logger.debug(`${value}`);
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
    this.logger.debug('Completing task pre-screening with values:');
  }

  canEnterStep2: (MovingDirection) => boolean = () => {
    if (this.selectedCategory) {
      this.logger.debug(`Category set as ${this.selectedCategory}`);
      this.logger.debug('All conditions met... moving to step 2');
      return true;
    } else {
      this.logger.debug('Conditions not met... cannot move to step 2');
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
