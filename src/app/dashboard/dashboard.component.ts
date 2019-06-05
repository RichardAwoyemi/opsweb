import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription, Subject } from 'rxjs';
import { UserService } from '../_services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { TaskService } from '../_services/task.service';
import { DataService } from '../_services/data.service';
import { Options } from 'ng5-slider';

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
  selectedLengthCategory = 'day';
  selectedCategory: string;
  selectedTask = {
    similarApps: null,
    assignedTo: null,
    invoice: null
  };
  user$: Observable<any>;
  task: any;
  similarApps: any;
  tasksExist: boolean;
  BAG = 'DASHBOARD';
  backlogTasks = [];
  innerHeight: number;
  carePlanSelected: string;
  carePlanPrice = 0;
  costMultiplier = 1;
  speedMultiplier = 1;
  sliderValue: number;
  sliderOptions: Options = {
    stepsArray: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
    ],
    hideLimitLabels: true,
    translate: (value: number): string => {
      return this.taskService.speedOptions[value];
    }
  };

  manualRefresh: EventEmitter<void> = new EventEmitter<void>();
  private userSubscription: Subscription;
  private taskSubscription: Subscription;
  private similarAppsSubscription: Subscription;

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
    this.sliderValue = this.selectedTask['deliverySpeed'];
    this.manualRefresh.emit();
    this.logger.debug(`Active task: ${JSON.stringify(this.selectedTask)}`);
    $(this.taskModal.nativeElement).modal('show');
  }

  closeCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('hide');
  }

  completeTaskPreScreening() {
    if (this.selectedCategory) {
      this.closeCreateTaskModal();

      this.task = {
        category: this.selectedCategory,
        status: 'incomplete'
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
  }
}
