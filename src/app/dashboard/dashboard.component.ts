import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { UserService } from '../common/services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { TaskService } from '../task/services/task.service';
import { DataService } from '../common/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { DragulaService } from 'ng2-dragula';
import { ModalService } from '../common/services/modal.service';
import { ApplicationService } from '../common/services/application.service';

declare var $;

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  user: any;
  userData: any;
  applicationData: any;
  anonymousPhotoURL: string;
  firstName: string;
  lastName: string;
  featureSelected: string;
  selectedLengthCategory = 'day';
  selectedCategory: string;
  selectedTask = {
    similarApps: null,
    assignedTo: null,
    category: null,
    description: null,
    invoice: null
  };
  user$: Observable<any>;
  task: any;
  webCustomFeatures: any;
  similarApps: any;
  tasksExist: boolean;
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
  BAG = 'DASHBOARD';
  noOfTasks = 0;

  primaryService: String;
  secondaryService: String;
  experienceLevel: String;
  portfolio: String;

  private userSubscription: Subscription;
  private taskSubscription: Subscription;
  private applicationSubscription: Subscription;
  private similarAppsSubscription: Subscription;
  private webCustomFeaturesSubscription: Subscription;
  private resizeSubscription$: Subscription;
  private dragulaSubscription = new Subscription();
  private resizeObservable$: Observable<Event>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private userService: UserService,
    public taskService: TaskService,
    public applicationService: ApplicationService,
    private ngxLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private modalService: ModalService,
    private logger: NGXLogger,
    private router: Router,
    public dragulaService: DragulaService
  ) {
    this.userData = {
      firstName: null,
      lastName: null
    };
    this.dragulaService.destroy(this.BAG);
    this.dragulaService.createGroup(this.BAG, {
      revertOnSpill: true,
      direction: 'horizontal'
    });
    this.dragulaSubscription.add(this.dragulaService.drop(this.BAG)
      .subscribe(({ name, el }) => {
        this.logger.debug(`Drag and drop event detected for ${name}!`);
        this.logger.debug(el.innerHTML);
        if (el.innerHTML.indexOf('status="pending"')) {
          this.modalService.displayMessage('Oops!', 'This task cannot be promoted until it has been paid for.');
          this.dragulaService.find(this.BAG).drake.cancel(true);
        }
      }));
  }

  @ViewChild('createTaskModal') createTaskModal: ElementRef;
  @ViewChild('deleteTaskModal') deleteTaskModal: ElementRef;
  @ViewChild('editTaskModal') editTaskModal: ElementRef;
  @ViewChild('workApplicationModal') workApplicationModal: ElementRef;
  @ViewChild('applicationStatusModal') applicationStatusModal: ElementRef;

  ngOnInit() {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.anonymousPhotoURL = '/assets/img/anonymous.jpg';
    this.user = JSON.parse(localStorage.getItem('user'));
    this.innerHeight = window.innerHeight;

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this.innerHeight = window.innerHeight;
      this.logger.debug('Window resized: ', evt);
    });

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

    this.applicationSubscription = this.applicationService.getApplicationByUserId(this.user.uid).subscribe(result => {
      if (result) {
        this.setApplication(result[0]);
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

  onAddFeatureToBasketButtonClick(feature) {
    this.logger.debug(`Basket before feature added: ${JSON.stringify(this.basket)}`);
    feature.in_basket = true;
    this.basket.push(feature);
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
    this.logger.debug(`Basket after feature added: ${JSON.stringify(this.basket)}`);
  }

  onRemoveFeatureFromBasketButtonClick(feature) {
    this.setFeature(feature);
    this.logger.debug(`Basket before feature removed: ${JSON.stringify(this.basket)}`);
    this.logger.debug('Looping through basket items until item found');
    for (let i = 0; i < this.basket.length; i++) {
      this.logger.debug(this.basket[i]);
      if (this.basket[i]['id'] === feature.id) {
        this.logger.debug(`Found item to delete: ${JSON.stringify(this.basket[i])}`);
        this.basket.splice(i, 1);
      }
    }
    this.basketTotal = this.taskService.calculateBasketTotal('gbp', this.basket, this.costMultiplier);
    this.completionDate = this.taskService.calculateCompletionDate(this.basket, this.speedMultiplier);
    this.logger.debug(`Basket after feature removed: ${JSON.stringify(this.basket)}`);
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

  setApplication(result) {
    this.logger.debug('Setting application:');
    this.logger.debug(result);
    this.applicationData = result;
  }

  setTasks(result) {
    this.backlogTasks = [];
    this.logger.debug(`Number of tasks: ${result.length}`);
    this.noOfTasks = result.length;
    this.logger.debug('Setting tasks:');
    for (let i = 0; i < result.length; i++) {
      this.logger.debug(result[i]);
      if (result[i].invoice == null || !result[i].assignedTo == null) {
        this.backlogTasks.push(result[i]);
      }
    }
  }

  openDeleteTaskModal(task) {
    this.selectedTask = task;
    $(this.deleteTaskModal.nativeElement).modal('show');
  }

  deleteTask(task) {
    $(this.deleteTaskModal.nativeElement).modal('hide');
    if (task.id) {
      this.taskService.deleteTask(task.id);
      this.toastr.success('Task deleted!', null, {
        timeOut: 2000
      });
    } else {
      this.toastr.error('Task could not be deleted. Please try again!', null, {
        timeOut: 2000
      });
    }
  }

  openCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('show');
  }

  openApplyToWorkModal() {
    $(this.workApplicationModal.nativeElement).modal('show');
  }

  openApplicationStatusModal() {
    $(this.applicationStatusModal.nativeElement).modal('show');
  }

  onTaskModalCheckoutButtonClick() {
    $(this.editTaskModal.nativeElement).modal('hide');
    this.taskService.updateTask(this.selectedTask, this.basket);
    this.router.navigate(['checkout']);
  }

  onTaskModalSaveButtonClick() {
    $(this.editTaskModal.nativeElement).modal('hide');
    this.taskService.updateTask(this.selectedTask, this.basket);
    this.toastr.success('Task updated!', null, {
      timeOut: 2000
    });
  }

  onTaskModalCloseButtonClick() {
    $(this.editTaskModal.nativeElement).modal('hide');
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

    this.selectedTask['basketTotal'] = this.basketTotal;
    this.selectedTask['completionDate'] = this.completionDate;
    this.selectedTask['carePlanPrice'] = this.carePlanPrice;
    this.selectedTask['deliverySpeed'] = this.deliverySpeed;

    $(this.editTaskModal.nativeElement).modal('show');
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

    this.selectedTask['basketTotal'] = this.basketTotal;
    this.selectedTask['completionDate'] = this.completionDate;
    this.selectedTask['carePlanPrice'] = this.carePlanPrice;
    this.selectedTask['deliverySpeed'] = this.deliverySpeed;
  }

  closeCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('hide');
  }

  completeWorkApplication() {
    $(this.workApplicationModal.nativeElement).modal('hide');
    this.applicationService.createNewApplication(this.user.uid, this.primaryService, this.secondaryService,
      this.experienceLevel, this.portfolio);
    this.toastr.success('Application submitted!', null, {
      timeOut: 2000
    });
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

  setCarePlanButtonColour(value) {
    if (value === 'yes' && this.carePlanSelected === 'yes') {
      return 'btn-success';
    }
    if (value === 'no' && (this.carePlanSelected === 'no' || this.selectedTask['carePlanPrice'] === 0)) {
      return 'btn-success';
    }
    return 'btn-secondary';
  }

  setCarePlan(value) {
    this.logger.debug(`Care plan set to: ${value}`);
    this.carePlanSelected = value;
    if (this.carePlanSelected === 'yes') {
      this.carePlanPrice = this.taskService.calculateCarePlanPrice(this.carePlanSelected, this.basketTotal);
    } else {
      this.carePlanPrice = 0;
    }
    this.selectedTask['carePlanPrice'] = this.carePlanPrice;
    this.logger.debug(`Care plan price set to: ${this.carePlanPrice}`);
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.resizeSubscription$) {
      this.resizeSubscription$.unsubscribe();
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
    if (this.applicationSubscription) {
      this.applicationSubscription.unsubscribe();
    }
    if (this.dragulaSubscription) {
      this.dragulaSubscription.unsubscribe();
    }
    this.dragulaService.destroy(this.BAG);
  }
}
