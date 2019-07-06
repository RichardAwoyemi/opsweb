import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from '../_services/firebase.service';
import { User } from '../_models/user';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from '../_services/util.service';

@Injectable()
export class TaskService {
  constructor(
    private afs: AngularFirestore,
    private logger: NGXLogger,
    private firebaseService: FirebaseService,
    private utilService: UtilService
  ) { }

  task: any;
  TASKS_ROOT = 'tasks';
  carePlanMultiplier = 0.025;
  relaxedCost = 0.75;
  relaxedSpeed = 5;
  standardCost = 1;
  standardSpeed = 1;
  primeCost = 1.5;
  primeSpeed = 0.5;
  speedOptions = ['Relaxed', 'Standard', 'Prime'];

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

  updateTask(task, basket) {
    this.logger.debug(`Creating task with generated id at: '/$tasks/${task.id}'`);
    this.logger.debug(`Task:`);
    this.logger.debug(`${JSON.stringify(task)}`);
    this.logger.debug(`Basket:`);
    this.logger.debug(`${JSON.stringify(basket)}`);
    this.logger.debug(`Similar Apps:`);
    this.logger.debug(`${JSON.stringify(task.similarApps)}`);

    const taskRef: AngularFirestoreDocument<any> = this.afs.doc(`tasks/${task.id}`);
    const taskData = {
      name: task.name,
      description: task.description,
      product: task.product,
      category: task.category,
      completionDate: task.completionDate,
      currency: task.currency,
      carePlanPrice: task.carePlanPrice,
      basketTotal: task.basketTotal,
      deliverySpeed: task.deliverySpeed,
      similarApps: task.similarApps
    };

    if (basket) {
      this.addFeaturesToTask(basket, `tasks/${task.id}`);
    }

    if (basket) {
      this.addFeaturesToTask(basket, `tasks/${task.id}`);
    }

    return taskRef.set(taskData, {
      merge: true
    });
  }

  createNewTask(user: User, product: String, name: String, description: String, similarApps: Array<any>,
    category: String, basket: Array<any>, completionDate: String, currency: String, ndaSigned: String,
    basketTotal: Number, deliverySpeed: Number, webLayout: String, webFont: String) {

    const collectionPath = this.TASKS_ROOT;

    const newTaskRef: AngularFirestoreDocument<any> = this.firebaseService.createDocumentRef(collectionPath);
    this.logger.debug(`Creating task with generated id at: '/${newTaskRef.ref.path}'`);

    const task = {
      id: newTaskRef.ref.id,
      name: name,
      description: description,
      product: product,
      category: category,
      completionDate: completionDate,
      currency: currency,
      ndaSigned: ndaSigned,
      basketTotal: basketTotal,
      createdBy: user.uid,
      createdAt: new Date(),
      done: false,
      deliverySpeed: deliverySpeed,
      webLayout: webLayout,
      webFont: webFont
    };

    this.logger.debug(task);
    newTaskRef.set(task);

    if (basket) {
      this.addFeaturesToTask(basket, newTaskRef.ref.path);
    }

    if (similarApps) {
      this.addSimilarAppsToTask(similarApps, newTaskRef.ref.path);
    }
  }

  addFeaturesToTask(features: Array<any>, collectionPath: string) {
    const featureList = [];
    const taskRef: AngularFirestoreDocument<any> = this.afs.doc(`${collectionPath}`);
    for (let i = 0; i < features.length; i++) {
      featureList.push(features[i].id);
    }
    const featureData = {
      features: featureList
    };
    this.logger.debug(`Creating new feature with generated id at: '/${collectionPath}'`);
    this.logger.debug(JSON.stringify(featureData));
    taskRef.set(featureData, { merge: true });
  }

  addSimilarAppsToTask(similarApps: Array<any>, collectionPath: string) {
    const similarAppsList = [];
    const taskRef: AngularFirestoreDocument<any> = this.afs.doc(`${collectionPath}`);
    for (let i = 0; i < similarApps.length; i++) {
      similarAppsList.push(similarApps[i].value);
    }
    const similarAppsData = {
      similarApps: similarAppsList
    };
    this.logger.debug(`Creating new similar app with generated id at: '/${collectionPath}'`);
    this.logger.debug(JSON.stringify(similarAppsData));
    taskRef.set(similarAppsData, { merge: true });
  }

  getTasksByUserId(userId) {
    this.logger.debug(`Getting tasks by user id ${userId}`);
    if (userId) {
      return this.afs.collection('tasks', ref => ref.where('createdBy', '==', userId)).valueChanges();
    }
  }

  calculateCarePlanPrice(carePlanSelected, basketTotal) {
    if (carePlanSelected === 'yes') {
      return this.utilService.roundNumber(basketTotal * this.carePlanMultiplier, 2);
    } else {
      return 0;
    }
  }

  calculateDateDifference(basket, speedMultiplier) {
    let totalWeeks = 0;
    for (let i = 0; i < basket.length; i++) {
      totalWeeks = totalWeeks + basket[i]['time_weeks'];
    }
    this.logger.debug(`Weeks total: ${totalWeeks}`);
    const expectedCompletionDate = new Date();
    const adjustedCompletionDate = new Date();
    const expectedTotalDays = Math.round(totalWeeks * 7);
    const adjustedtotalDays = Math.round(totalWeeks * 7 * speedMultiplier);
    expectedCompletionDate.setDate(expectedCompletionDate.getDate() + expectedTotalDays);
    adjustedCompletionDate.setDate(adjustedCompletionDate.getDate() + adjustedtotalDays);
    const diffTime = Math.abs(adjustedCompletionDate.getTime() - expectedCompletionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    this.logger.debug(`Difference in days: ${diffDays}`);
    return diffDays;
  }

  calculateCompletionDate(basket, speedMultiplier) {
    let totalWeeks = 0;
    for (let i = 0; i < basket.length; i++) {
      totalWeeks = totalWeeks + basket[i]['time_weeks'];
    }
    const totalDays = Math.round(totalWeeks * 7 * speedMultiplier);
    const completionDate = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    completionDate.setDate(completionDate.getDate() + totalDays);
    return `${completionDate.getDate()} ${monthNames[completionDate.getMonth() + 1]} ${completionDate.getFullYear()}`;
  }

  calculateBasketTotal(currency, basket, costMultiplier): number {
    let total = 0;
    this.logger.debug(`Basket size: ${basket.length}`);
    for (let i = 0; i < basket.length; i++) {
      if (currency = 'gbp') {
        total = total + basket[i]['price_gbp'];
      }
    }
    const basketTotal = this.utilService.roundNumber(total * costMultiplier, 2);
    const basketTotalAdjustments = this.utilService.roundNumber(total - (total * costMultiplier), 2);
    this.logger.debug(`Basket total: ${basketTotal}`);
    this.logger.debug(`Basket total adjustments: ${basketTotalAdjustments}`);
    return basketTotal;
  }

  setBasketItems(features, webCustomFeatures) {
    const basket = [];
    for (let i = 0; i < features.length; i++) {
      for (let j = 0; j < webCustomFeatures.length; j++) {
        if (features[i] === webCustomFeatures[j].id) {
          webCustomFeatures[j]['in_basket'] = true;
          basket.push(webCustomFeatures[j]);
        }
      }
    }
    this.logger.debug(`Basket items: ${JSON.stringify(basket)}`);
    return basket;
  }

  deleteTask(taskId) {
    this.logger.debug(`Deleting task: ${taskId}`);
    const taskRef: AngularFirestoreDocument<any> = this.afs.doc(`tasks/${taskId}`);
    taskRef.delete();
  }
}
