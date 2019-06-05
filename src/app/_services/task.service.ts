import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from '../_services/firebase.service';
import { User } from '../_models/user';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class TaskService {
  constructor(
    private afs: AngularFirestore,
    private logger: NGXLogger,
    private firebaseService: FirebaseService
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

  createNewTask(user: User, product: String, name: String, description: String, similarApps: Array<any>,
    category: String, basket: Array<any>, completionDate: String, currency: String, carePlanPrice: Number,
    basketTotal: Number, deliverySpeed: Number) {

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
      createdBy: user.uid,
      createdAt: new Date(),
      deliverySpeed: deliverySpeed
    };

    const newTaskRef: AngularFirestoreDocument<any> = this.firebaseService.createDocumentRef(collectionPath);
    this.logger.debug(`Creating new task with generated id at: '/${newTaskRef.ref.path}'`);
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
      return basketTotal * this.carePlanMultiplier;
    } else {
      return 0;
    }
  }
}
