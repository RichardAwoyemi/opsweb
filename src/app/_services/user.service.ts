import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UtilService } from './util.service';
import { ReferralService } from './referral.service';
import { environment } from 'src/environments/environment';

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
    if (referralId) {
      return this.afs.collection('users', ref => ref.where('referralId', '==', referralId).limit(1)).valueChanges();
    }
  }

  getReferredUsers(referralId) {
    if (referralId) {
      return this.afs.collection('users', ref => ref.where('referredBy', '==', referralId).limit(3)).valueChanges();
    }
  }

  setUserData(uid, email, displayName, photoURL, firstName, lastName, referralId) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(userRef);
      let userData = {};
      if (!doc.exists) {
        userData = {
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
          emailVerified: true,
          firstName: firstName,
          lastName: lastName,
          referralId: referralId
        };
        transaction.set(userRef, { userData }, { merge: true }).then(() => {
          this.referralService.addUserToWaitlist(referralId);
        });
      }
    }).then(() => {
      if (!environment.production) {
        console.log(
          'Transaction successfully committed.'
        );
      }
    }).catch((error) => {
      if (!environment.production) {
        console.log('Transaction failed: ', error);
      }
    });
  }

  setReferralUserData(uid, email, displayName, photoURL, firstName, lastName, referralId, referredBy) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(userRef);
      let userData = {};
      if (!doc.exists) {
        userData = {
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
          emailVerified: true,
          firstName: firstName,
          lastName: lastName,
          referralId: referralId,
          referredBy: referredBy
        };
        transaction.set(userRef, { userData }, { merge: true }).then(() => {
          this.referralService.addUserToWaitlist(referralId).then(() => {
            this.referralService.addReferralPoints(referredBy);
          });
        });
      }
    }).then(() => {
      if (!environment.production) {
        console.log(
          'Transaction successfully committed.'
        );
      }
    }).catch((error) => {
      if (!environment.production) {
        console.log('Transaction failed: ', error);
      }
    });
  }

  processNewUser(result, firstName, lastName) {
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result.user.uid, result.user.email, result.user.displayName, result.user.photoURL, firstName, lastName, referralId);
  }

  processNewMobileUser(result, firstName, lastName) {
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result.uid, result.email, result.displayName, result.photoURL, firstName, lastName, referralId);
  }

  processNewUserReferral(result, firstName, lastName, referredBy) {
    const referralId = this.utilService.generateRandomString(8);
    this.setReferralUserData(result.user.uid, result.user.email, result.user.displayName,
      result.user.photoURL, firstName, lastName, referralId, referredBy);
  }

  processNewMobileUserReferral(result, firstName, lastName, referredBy) {
    const referralId = this.utilService.generateRandomString(8);
    this.setReferralUserData(result.uid, result.email, result.displayName,
      result.photoURL, firstName, lastName, referralId, referredBy);
  }

  setUserCurrencyAndTimezonePreferences(uid, timezone, currency) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      selectedCurrency: currency,
      selectedTimezone: timezone
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  setUserLegalNameData(uid, firstName, lastName) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    if (firstName && lastName) {
      userDetailData = {
        firstName: firstName,
        lastName: lastName
      };
    }
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  setUserPersonalDetails(uid, username, firstName, lastName, dobDay, dobMonth, dobYear, streetAddress1, streetAddress2, city, postcode) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    userDetailData = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      dobDay: dobDay,
      dobMonth: dobMonth,
      dobYear: dobYear,
      streetAddress1: streetAddress1,
      streetAddress2: streetAddress2,
      city: city,
      postcode: postcode
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }
}
