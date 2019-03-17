import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.staging';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ReferralService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public utilService: UtilService,
    public http: HttpClient,
  ) {
  }

  generateReferralIdForUser(userId, referralId) {
    const user = this.afs.firestore.collection('users').doc(userId);
    user.update({ referralId: referralId });
  }

  getNoOfReferredUsers(referralId) {
    if (referralId) {
      return this.afs.collection('counters').doc('waitlist').valueChanges()
        .pipe(map(referrals => referrals[referralId]));
    }
  }

  generateReferralUrl(referralId) {
    if (location.host.indexOf('localhost:4200') !== -1) {
      return Observable.create((observer) => { observer.next('localhost:4200/invite/' + referralId); });
    } else if (location.host.indexOf('opsonion.herokuapp.com') !== -1) {
      return Observable.create((observer) => { observer.next('opsonion.herokuapp.com/invite/' + referralId); });
    } else if (location.host.indexOf('opsonion.com') !== -1) {
      return Observable.create((observer) => { observer.next('opsonion.com/invite/' + referralId); });
    }
  }

  addReferralPoints(userReferralId) {
    const ref = this.afs.firestore.collection('counters').doc('waitlist');
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { [userReferralId]: 1 }, { merge: true });
      }
      const newCount = doc.data()[userReferralId] + 1;
      transaction.set(ref, { [userReferralId]: newCount }, { merge: true });
    }).then(() => {
      if (environment.production === false) {
        console.log(
          'Transaction successfully committed.'
        );
      }
    }).catch((error) => {
      if (environment.production === false) {
        console.log('Transaction failed: ', error);
      }
    });
  }

  getWaitlist() {
    return this.afs.collection('counters').doc('waitlist').snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      return data;
    }));
  }

  async calculateRanking(referralId, waitlist) {
    if (!environment.production) {
      console.log(referralId);
      console.log(waitlist);
    }

    if (waitlist && referralId) {
      if (!waitlist.hasOwnProperty(referralId)) {
        this.addUserToWaitlist(referralId);
      } else if (!environment.production) {
        console.log('Referral id found!');
      }

      const waitlistSorted = await this.sortRanking(waitlist);

      if (waitlistSorted) {
        if (!environment.production) {
          console.log(waitlistSorted);
        }
        const result = waitlistSorted.filter(obj => {
          return obj.referralId === referralId;
        });

        if (result[0]) {
          return result[0].ranking;
        }
      }
    }
  }

  sortRanking(obj) {
    const arr = [];
    let prop;

    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          'referralId': prop,
          'points': obj[prop],
          'ranking': 0
        });
      }
    }

    arr.sort(function (a, b) {
      return b.points - a.points;
    });

    for (let i = 0; i < arr.length; i++) {
      arr[i]['ranking'] = i + 1;
    }

    return arr;
  }

  addUserToWaitlist(referralId) {
    const waitlistRef = this.afs.firestore.collection('counters').doc('waitlist');
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      transaction.set(waitlistRef, {
        [referralId]: 0,
      }, { merge: true });
    }).then(() => {
      if (environment.production === false) {
        console.log(
          `Transaction successfully committed.`
        );
      }
    }).catch((error) => {
      if (environment.production === false) {
        console.log('Transaction failed: ', error);
      }
    });
  }
}
