import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { UtilService } from './util.service';
import { ReferralService } from './referral.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class UserService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public utilService: UtilService,
    public referralService: ReferralService,
    public logger: NGXLogger
  ) {
  }

  getUserById(id) {
    this.logger.debug(`Getting user ${id}`);
    return this.afs.collection('users').doc(id).snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      const uid = action.payload.id;
      return { uid, ...data };
    }));
  }

  getNumberOfUsers() {
    this.logger.debug('Getting number of users');
    return this.afs.collection('counters').doc('users').snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      return { data };
    }));
  }

  getUserByReferralId(referralId) {
    this.logger.debug(`Getting user by referral id ${referralId}`);
    if (referralId) {
      return this.afs.collection('users', ref => ref.where('referralId', '==', referralId).limit(1)).valueChanges();
    }
  }

  getReferredUsers(referralId) {
    this.logger.debug(`Getting referred users by referral id ${referralId}`);
    if (referralId) {
      return this.afs.collection('users', ref => ref.where('referredBy', '==', referralId).limit(3)).valueChanges();
    }
  }

  setUserData(user) {
    this.logger.debug(`Setting user data`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: true
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  setUserLegalNameData(uid, firstName, lastName) {
    this.logger.debug(`Setting user legal name data`);
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

  setUserDetailData(uid, firstName, lastName, referralId) {
    this.logger.debug(`Setting user detail data for ${firstName} ${lastName}`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    if (firstName && lastName) {
      userDetailData = {
        firstName: firstName,
        lastName: lastName,
        referralId: referralId
      };
    } else {
      userDetailData = {
        referralId: referralId
      };
    }
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  processNewUser(result, firstName, lastName) {
    if (firstName && lastName) {
      this.logger.debug(`Processing ${firstName} ${lastName} as new desktop user`);
    } else {
      this.logger.debug(`Processing anonymous as new desktop user`);
    }
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result.user);
    this.setUserDetailData(result.user.uid, firstName, lastName, referralId);
    this.referralService.addUserToWaitlist(referralId);
  }

  processNewMobileUser(result, firstName, lastName) {
    if (firstName && lastName) {
      this.logger.debug(`Processing ${firstName} ${lastName} as new moible user`);
    } else {
      this.logger.debug(`Processing anonymous as new mobile user`);
    }
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result);
    this.setUserDetailData(result.uid, firstName, lastName, referralId);
    this.referralService.addUserToWaitlist(referralId);
  }

  processNewUserReferral(result, firstName, lastName, referredBy) {
    if (firstName && lastName) {
      this.logger.debug(`Processing ${firstName} ${lastName} as new desktop user referred by ${referredBy}`);
    } else {
      this.logger.debug(`Processing anonymous as new desktop user referred by ${referredBy}`);
    }
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result.user);
    this.setUserReferralData(result.user.uid, firstName, lastName, referralId, referredBy);
    this.referralService.addUserToWaitlist(referralId);
    this.referralService.addReferralPoints(referredBy);
  }

  processNewMobileUserReferral(result, firstName, lastName, referredBy) {
    if (firstName && lastName) {
      this.logger.debug(`Processing ${firstName} ${lastName} as new mobile user referred by ${referredBy}`);
    } else {
      this.logger.debug(`Processing anonymous as new mobile user referred by ${referredBy}`);
    }
    const referralId = this.utilService.generateRandomString(8);
    this.setUserData(result);
    this.setUserReferralData(result.uid, firstName, lastName, referralId, referredBy);
    this.referralService.addUserToWaitlist(referralId);
    this.referralService.addReferralPoints(referredBy);
  }

  setUserReferralData(uid, firstName, lastName, referralId, referredBy) {
    this.logger.debug(`Setting user referral data for ${firstName} ${lastName} with referral id ${referralId} referred by ${referredBy}`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    if (firstName && lastName) {
      userDetailData = {
        firstName: firstName,
        lastName: lastName,
        referralId: referralId,
        referredBy: referredBy
      };
    } else {
      userDetailData = {
        referralId: referralId,
        referredBy: referredBy
      };
    }
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  setUserCurrencyAndTimezonePreferences(uid, timezone, currency) {
    this.logger.debug(`Setting timezone and currency information for ${uid}`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      selectedCurrency: currency,
      selectedTimezone: timezone
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  getUserByUsername(username) {
    this.logger.debug(`Getting user with username '${username}'`);
    if (username) {
      return this.afs.collection('users', ref => ref.where('username', '==', username).limit(1)).valueChanges();
    }
  }

  setUserPhoto(uid, photoURL) {
    this.logger.debug(`Setting user photo for ${uid}`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userPhotoData = {};
    userPhotoData = {
      photoURL: photoURL,
    };
    return userRef.set(userPhotoData, {
      merge: true
    });
  }

  setUserAccountType(uid, accountType) {
    this.logger.debug(`Setting user account type for ${uid} to ${accountType}`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    userDetailData = {
      accountType: accountType
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  setOnboardingAsComplete(uid) {
    this.logger.debug(`Setting onboarding status for ${uid} to complete`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    userDetailData = {
      onboardingComplete: true
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  setUserPersonalDetails(uid, username, firstName, lastName, dobDay, dobMonth, dobYear, streetAddress1, streetAddress2, city, postcode) {
    this.logger.debug(`Setting personal details for ${uid}`);
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
