import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from '../_services/firebase.service';
import { User } from '../_models/user';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable()
export class TaskService {
  constructor(
    private logger: NGXLogger,
    private firebaseService: FirebaseService
  ) { }

  task: any;
  TASKS_ROOT = 'tasks';

  checkIfTasksExist() {
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

  createNewTask(user: User, product: String, name: String, description: String, similarApps: Array<any>,
    category: String, basket: Array<any>, completionDate: String, currency: String, carePlanPrice: Number,
    basketTotal: Number, basketTotalAdjustments: Number) {

    const collectionPath = this.TASKS_ROOT;
    const task = {
      name: name,
      description: description,
      product: product,
      category: category,
      completionDate: completionDate,
      currency: currency,
      carePlanPrice: carePlanPrice,
      basketTotal: basketTotal,
      basketTotalAdjustments: basketTotalAdjustments,
      createdBy: user.uid
    };

    const newTaskRef: AngularFirestoreDocument<any> = this.firebaseService.createDocumentRef(collectionPath);
    this.logger.debug(`Creating new task with generated id at: '/${newTaskRef.ref.path}'`);
    this.logger.debug(task);
    newTaskRef.set(task);

    if (basket) {
      const basketPath = newTaskRef.ref.path + '/features';
      this.addFeaturesToTask(basket, basketPath);
    }

    if (similarApps) {
      const tagsPath = newTaskRef.ref.path + '/tags';
      this.addSimilarAppsToTask(similarApps, tagsPath);
    }
  }

  addFeaturesToTask(features: Array<any>, collectionPath: string) {
    for (let i = 0; i < features.length; i++) {
      const feature = {
        name: features[i].name,
        description: features[i].description,
        price: features[i].price_gbp
      };

      const newFeatureRef: AngularFirestoreDocument<any> = this.firebaseService.createDocumentRef(collectionPath);
      this.logger.debug(`Creating new feature with generated Id at: '/${newFeatureRef.ref.path}'`);
      this.logger.debug(feature);
      newFeatureRef.set(feature);
    }
  }

  addSimilarAppsToTask(similarApps: Array<any>, collectionPath: string) {
    for (let i = 0; i < similarApps.length; i++) {
      const similarApp = {
        name: similarApps[i].value
      };

      const newSimilarAppRef: AngularFirestoreDocument<any> = this.firebaseService.createDocumentRef(collectionPath);
      this.logger.debug(`Creating new similar app with generated Id at: '/${newSimilarAppRef.ref.path}'`);
      this.logger.debug(similarApp);
      newSimilarAppRef.set(similarApp);
    }
  }
}
