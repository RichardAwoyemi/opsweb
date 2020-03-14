import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UtilService } from './util.service';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user';

@Injectable()
export class UserService {
  user = new BehaviorSubject(<Object>(null));

  constructor(
    private afs: AngularFirestore
  ) {
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
      streetAddress1: user.streetAddress1,
      streetAddress2: user.streetAddress2,
      city: user.city,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      referralId: user.referralId,
      referredBy: user.referredBy
    };
  }

  getUserById(id) {
    return this.afs.collection('users').doc(id).snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      const uid = action.payload.id;
      return {uid, ...data};
    }));
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.user.uid}`);
    const userData: any = {
      uid: user.user.uid,
      email: user.user.email,
      displayName: user.user.displayName,
      photoURL: user.user.photoURL,
      emailVerified: true
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  setUserDetailData(uid, firstName, lastName, referralId) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    let userDetailData = {};
    if (firstName && lastName) {
      userDetailData = {
        displayName: `${firstName} ${lastName}`,
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

  processNewMobileUser(result, firstName, lastName) {
    const referralId = UtilService.generateRandomString(8);
    this.setUserData(result).then(() => {
    });
    this.setUserDetailData(result.uid, firstName, lastName, referralId).then(() => {
    });
  }

  getUserByUsername(username) {
    if (username) {
      return this.afs.collection('users', ref => ref.where('username', '==', username).limit(1)).valueChanges();
    }
  }

  setUserPhoto(uid, photoURL) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userPhotoData = {
      photoURL: photoURL,
    };
    return userRef.set(userPhotoData, {
      merge: true
    });
  }

  setUserPersonalDetails(uid, username, firstName, lastName, dobDay, dobMonth, dobYear, streetAddress1, streetAddress2, city, postcode) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
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
        postcode: postcode
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
    const referralId = UtilService.generateRandomString(8);
    this.setUserData(result).then(() => {
    });
    this.setUserDetailData(result.user.uid, firstName, lastName, referralId).then(() => {
    });
  }
}
