import { Component, OnInit, OnDestroy, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../_services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { DataService } from '../_services/data.service';
import { TaskService } from '../_services/task.service';

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
  user$: Observable<any>;
  prices: any;
  task: any;
  tasksExist: boolean;
  BAG = 'DASHBOARD';

  private userSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private taskService: TaskService,
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
  @ViewChild('taskModal') taskModal: ElementRef;

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

  openCreateTaskModal() {
    $(this.createTaskModal.nativeElement).modal('show');
  }

  openTaskModal() {
    $(this.taskModal.nativeElement).modal('show', { size: 'lg' });
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

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
