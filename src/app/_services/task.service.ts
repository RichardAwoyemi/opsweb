import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class TaskService {
  constructor(
    private logger: NGXLogger
  ) { }
  task: any;

  public checkIfUnsubmittedTaskExists() {
    this.logger.debug(`Checking to see if unsubmitted task exists`);
    this.task = window.localStorage.getItem('new-task');
    if (this.task) {
      this.logger.debug(`Unsubmitted task found:`);
      this.logger.debug(this.task);
      return true;
    } else {
      this.logger.debug(`Unsubmitted task not found`);
      return false;
    }
  }
}
