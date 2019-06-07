import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { TaskService } from '../_services/task.service';
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
  featureSelected: string;
  selectedLengthCategory = 'day';
  selectedCategory: string;
  selectedTask = {
    similarApps: null,
    assignedTo: null,
    invoice: null
  };
  user$: Observable<any>;
  task: any;
  webCustomFeatures: any;
  similarApps: any;
  tasksExist: boolean;
  BAG = 'DASHBOARD';
  backlogTasks = [];
  basket = [];
  basketTotal = 0;
  basketTotalAdjustments = 0;
  innerHeight: number;
  completionDate: string;
  carePlanPrice = 0;
  carePlanSelected: string;
  differenceInDays: number;
  deliverySpeed = 1;
  costMultiplier = 1;
  speedMultiplier = 1;

  private userSubscription: Subscription;
  private taskSubscription: Subscription;
  private similarAppsSubscription: Subscription;
  private webCustomFeaturesSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private userService: UserService,
    private taskService: TaskService,
    private ngxLoader: NgxUiLoaderService,
    private logger: NGXLogger,
    private router: Router,
  ) {
    this.userData = {
      firstName: null,
      lastName: null
    };
  }

  @ViewChild('createTaskModal') createTaskModal: ElementRef;
  @ViewChild('taskModal') taskModal: ElementRef;

  ngOnInit() {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.anonymousPhotoURL = '/assets/img/anonymous.jpg';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.innerHeight = window.innerHeight;

    this.userSubscription = this.userService.getUserById(this.user.uid).subscribe(result => {
      if (result) {
        this.setUser(result);
      }
    });

    this.taskSubscription = this.taskService.getTasksByUserId(this.user.uid).subscribe(result => {
      if (result) {
        this.setTasks(result);
      }
    });

    this.webCustomFeaturesSubscription = this.dataService.getAllWebCustomFeatures().subscribe(response => {
      if (response) {
        const merged = [].concat.apply([], response);
        this.logger.debug('Web custom features:');
        this.logger.debug(merged);
        this.webCustomFeatures = merged;
      }
    });

    this.similarAppsSubscription = this.dataService.getAllSimilarApps().subscribe(response => {
      if (response) {
        this.logger.debug('Similar apps:');
        this.logger.debug(response);
        this.similarApps = response;
      }
    });

    this.tasksExist = this.taskService.checkIfTasksExist();
    this.ngxLoader.stop();
  }

  setFeature(feature) {
    this.logger.debug(`Feature selected: ${JSON.stringify(feature)}`);
    this.featureSelected = feature;
  }

  setFeatureBgColor(feature) {
    if (this.featureSelected) {
      if ((feature['in_basket'] || !feature['in_basket']) && (feature['id'] === this.featureSelected['id'])) {
        return '#E8F0FE';
      }
    }
    if (feature['in_basket']) {
      return '#E5FFE5';
    }
    if (!feature['in_basket']) {
      return '#FFFFFF';
    }
  }

  isFeatureInBasket(feature): boolean {
    const found = this.basket.some(e => e['id'] === feature.id);
    return found;
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

  setTasks(result) {
    this.backlogTasks = [];
    this.logger.debug(`Number of tasks: ${result.length}`);
    this.logger.debug('Setting tasks:');
    for (let i = 0; i < result.length; i++) {
      this.logger.debug(result[i]);
      if (result[i].invoice == null || !result[i].assignedTo == null) {
        this.backlogTasks.push(result[i]);
      }
    }
  }

  openCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('show');
  }

  onCheckoutButtonClick() {
    $(this.taskModal.nativeElement).modal('hide');
  }

  openTaskModal(task: any) {
    this.selectedTask = task;
    if (this.selectedTask['carePlanPrice'] > 0) {
      this.carePlanSelected = 'yes';
    }

    if (this.selectedTask['product'] === 'web' && this.selectedTask['category'] === 'custom') {
      this.basket = this.taskService.setBasketItems(this.selectedTask['features'], this.webCustomFeatures);
    }

    this.deliverySpeed = this.selectedTask['deliverySpeed'];

    if (this.deliverySpeed === 0) {
      this.costMultiplier = this.taskService.relaxedCost;
      this.speedMultiplier = this.taskService.relaxedSpeed;
    }
    if (this.deliverySpeed === 1) {
      this.costMultiplier = this.taskService.standardCost;
      this.speedMultiplier = this.taskService.standardSpeed;
    }
    if (this.deliverySpeed === 2) {
      this.costMultiplier = this.taskService.primeCost;
      this.speedMultiplier = this.taskService.primeSpeed;
    }

    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
    this.differenceInDays = this.taskService.calculateDateDifference(this.basket, this.speedMultiplier);
    this.carePlanPrice = this.taskService.calculateCarePlanPrice(this.carePlanSelected, this.basketTotal);

    this.logger.debug(`Active task: ${JSON.stringify(this.selectedTask)}`);
    this.logger.debug(`Completion date was ${this.selectedTask['completionDate']}, now ${this.completionDate}`);
    this.logger.debug(`Care plan price was ${this.selectedTask['carePlanPrice']}, now ${this.carePlanPrice}`);
    $(this.taskModal.nativeElement).modal('show');
  }

  onChangeDeliverySpeed(e): void {
    let value = e.slice(0, e.indexOf(':'));
    value = parseInt(value, 10);
    this.logger.debug(`Delivery speed set to: ${(value)}`);
    if (value === 0) {
      this.costMultiplier = this.taskService.relaxedCost;
      this.speedMultiplier = this.taskService.relaxedSpeed;
      this.deliverySpeed = value;
    }
    if (value === 1) {
      this.costMultiplier = this.taskService.standardCost;
      this.speedMultiplier = this.taskService.standardSpeed;
      this.deliverySpeed = value;
    }
    if (value === 2) {
      this.costMultiplier = this.taskService.primeCost;
      this.speedMultiplier = this.taskService.primeSpeed;
      this.deliverySpeed = value;
    }
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
    this.differenceInDays = this.taskService.calculateDateDifference(this.basket, this.speedMultiplier);
    this.carePlanPrice = this.taskService.calculateCarePlanPrice(this.carePlanSelected, this.basketTotal);
  }

  closeCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('hide');
  }

  completeTaskPreScreening() {
    if (this.selectedCategory) {
      this.closeCreateTaskModal();
      this.task = {
        category: this.selectedCategory,
      };
      this.logger.debug(this.task);
      localStorage.setItem('tasks', JSON.stringify(this.task));
      this.router.navigate(['new-task']);
    }
  }

  setCarePlanBtnColour(value) {
    if (value === 'yes' && this.carePlanSelected === 'yes') {
      return 'btn-success';
    }
    if (value === 'no' && this.carePlanSelected === 'no') {
      return 'btn-success';
    }
    return 'btn-secondary';
  }

  setCarePlan(value) {
    this.logger.debug(`Care plan set to: ${value}`);
    this.carePlanSelected = value;
    this.carePlanPrice = this.taskService.calculateCarePlanPrice(this.carePlanSelected, this.selectedTask['price']);
    this.logger.debug(`Care plan price set to: ${this.carePlanPrice}`);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
    if (this.similarAppsSubscription) {
      this.similarAppsSubscription.unsubscribe();
    }
    if (this.webCustomFeaturesSubscription) {
      this.webCustomFeaturesSubscription.unsubscribe();
    }
  }
}
