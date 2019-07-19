import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UtilService } from './util.service';
import { NGXLogger } from 'ngx-logger';
import { Subject } from 'rxjs';
import { IUser } from '../models/user';

@Injectable()
export class UserService {
  user = new Subject();

  constructor(
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    private utilService: UtilService,
    private logger: NGXLogger
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
    this.logger.debug('Getting number of users');
    return this.afs.collection('counters').doc('users').snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      return { data };
    }));
  }

  setUserData(user) {
    this.logger.debug(`Setting user data`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ user.uid }`);
    const userData: any = {
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

  setUserDetailData(uid, firstName, lastName, referralId) {
    this.logger.debug(`Setting user detail data for ${ firstName } ${ lastName }`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ uid }`);
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

  static parseData(user: IUser) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      dobDay: user.dobDay,
      dobMonth: user.dobMonth,
      dobYear: user.dobYear,
      postcode: user.postcode,
      selectedCurrency: user.selectedCurrency,
      selectedTimezone: user.selectedTimezone,
      streetAddress1: user.streetAddress1,
      streetAddress2: user.streetAddress2,
      city: user.city,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName
    };
  }

  processNewMobileUser(result, firstName, lastName) {
    if (firstName && lastName) {
      this.logger.debug(`Processing ${ firstName } ${ lastName } as new moible user`);
    } else {
      this.logger.debug(`Processing anonymous as new mobile user`);
    }
    const referralId = UtilService.generateRandomString(8);
    this.setUserData(result).then(() => {
    });
    this.setUserDetailData(result.uid, firstName, lastName, referralId).then(() => {
    });
  }

  setUserCurrencyAndTimezonePreferences(uid, timezone, currency) {
    this.logger.debug(`Setting timezone and currency information for ${ uid }`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ uid }`);
    const userDetailData = {
      selectedCurrency: currency,
      selectedTimezone: timezone
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  getUserByUsername(username) {
    this.logger.debug(`Getting user with username '${ username }'`);
    if (username) {
      return this.afs.collection('users', ref => ref.where('username', '==', username).limit(1)).valueChanges();
    }
  }

  setUserPhoto(uid, photoURL) {
    this.logger.debug(`Setting user photo for ${ uid }`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ uid }`);
    const userPhotoData = {
      photoURL: photoURL,
    };
    return userRef.set(userPhotoData, {
      merge: true
    });
  }

  setUserPersonalDetails(uid, username, firstName, lastName, dobDay, dobMonth, dobYear, streetAddress1, streetAddress2, city, postcode) {
    this.logger.debug(`Setting personal details for ${ uid }`);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${ uid }`);
    let userDetailData = {};
    if (streetAddress2) {
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
        postcode: postcode,
        onboardingComplete: true
      };
    } else {
      userDetailData = {
        username: username,
        firstName: firstName,
        lastName: lastName,
        dobDay: dobDay,
        dobMonth: dobMonth,
        dobYear: dobYear,
        streetAddress1: streetAddress1,
        city: city,
        postcode: postcode
      };
    }
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  processNewDesktopUser(result, firstName, lastName) {
    if (firstName && lastName) {
      this.logger.debug(`Processing ${ firstName } ${ lastName } as new desktop user`);
    } else {
      this.logger.debug(`Processing anonymous as new desktop user`);
    }
    const referralId = UtilService.generateRandomString(8);
    this.setUserData(result.IUser).then(() => {
    });
    this.setUserDetailData(result.IUser.uid, firstName, lastName, referralId).then(() => {
    });
  }
}
