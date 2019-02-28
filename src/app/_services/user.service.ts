import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { UtilService } from './util.service';
import { ReferralService } from './referral.service';

@Injectable()
export class UserService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public utilService: UtilService,
    public referralService: ReferralService
  ) {
  }

  getUserById(id) {
    return this.afs.collection('users').doc(id).snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      const uid = action.payload.id;
      return { uid, ...data };
    }));
  }

  getNumberOfUsers() {
    return this.afs.collection('counters').doc('users').snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      return { data };
    }));
  }

  getUserByReferralId(referralId) {
    return this.afs.collection('users', ref => ref.where('referralId', '==', referralId).limit(1)).valueChanges();
  }

  getReferredUsers(referralId) {
    return this.afs.collection('users', ref => ref.where('referredBy', '==', referralId).limit(5)).valueChanges();
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  setUserDetailData(uid, firstName, lastName, referralId) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      firstName: firstName,
      lastName: lastName,
      referralId: referralId
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  processNewUser(result, firstName, lastName) {
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result.user);
    this.setUserDetailData(result.user.uid, firstName, lastName, referralId);
    this.referralService.addUserToWaitlist(referralId);
  }

  processNewUserReferral(result, firstName, lastName, referredBy) {
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result.user);
    this.setUserReferralData(result.user.uid, firstName, lastName, referralId, referredBy);
    this.referralService.addUserToWaitlist(referralId);
    this.referralService.addReferralPoints(referredBy);
  }

  setUserReferralData(uid, firstName, lastName, referralId, referredBy) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      firstName: firstName,
      lastName: lastName,
      referralId: referralId,
      referredBy: referredBy
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }
 }
