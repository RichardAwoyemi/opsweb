import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private logger: NGXLogger
  ) { }
  isMobile: Observable<BreakpointState>;
  task: any;

  @ViewChild('dev', {read: DragScrollComponent}) ds: DragScrollComponent;

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.task = window.localStorage.getItem('tasks');
    // if (this.task) {
    // } else {
    // }
    this.logger.debug(this.task);
  }

  moveDevLeft() {
    this.ds.moveLeft();
  }

  moveDevRight() {
    this.ds.moveRight();
  }
}
