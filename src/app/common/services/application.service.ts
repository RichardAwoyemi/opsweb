import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';

@Injectable()
export class ApplicationService {
  constructor(
    private afs: AngularFirestore,
    private logger: NGXLogger,
    private firebaseService: FirebaseService
  ) { }

  applications: any;
  APPLICATIONS_ROOT = 'applications';

  createNewApplication(uid: String, primaryService: String, secondaryService: String, experienceLevel: String, portfolio: String) {
    const collectionPath = this.APPLICATIONS_ROOT;
    const newApplicationsRef: AngularFirestoreDocument<any> = this.firebaseService.createDocumentRef(collectionPath);
    this.logger.debug(`Creating application with generated id at: '/${newApplicationsRef.ref.path}'`);
    const application = {
      id: newApplicationsRef.ref.id,
      createdBy: uid,
      createdAt: new Date(),
      primaryService: primaryService,
      secondaryService: secondaryService,
      experienceLevel: experienceLevel,
      portfolio: portfolio,
      status: 'In Review'
    };
    this.logger.debug(application);
    newApplicationsRef.set(application);

    this.logger.debug(`Updating user at: '/users/${uid}'`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userData = {
      application: newApplicationsRef.ref.id
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  getApplicationByUserId(userId: any) {
    this.logger.debug(`Getting application by user id ${userId}`);
    if (userId) {
      return this.afs.collection('applications', ref => ref.where('createdBy', '==', userId).limit(1)).valueChanges();
    }
  }
}
