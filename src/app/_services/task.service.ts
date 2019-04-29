import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class TaskService {
  constructor(
    private logger: NGXLogger
  ) { }
  task: any;

  public checkIfTasksExist() {
    this.logger.debug(`Checking to see if tasks exist`);
    this.task = window.localStorage.getItem('tasks');
    if (this.task) {
      this.logger.debug(`Task found:`);
      this.logger.debug(this.task);
      return true;
    } else {
      this.logger.debug(`Task not found`);
      return false;
    }
  }
}
