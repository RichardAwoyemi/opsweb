import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.staging';
import { UtilService } from './util.service';

@Injectable()
export class ReferralService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public utilService: UtilService
  ) {
  }

  generateReferralIdForUser(userId, referralId) {
    const user = this.afs.firestore.collection('users').doc(userId);
    user.update({ referralId: referralId });
  }

  generateReferralUrl(referralId) {
    if (environment.production) {
      return 'opsonion.com/invite/' + referralId;
    } else {
      if (location.host === 'localhost:4200') {
        return 'localhost:4200/invite/' + referralId;
      } else {
        return 'opsonion-web.herokuapp.com/invite/' + referralId;
      }
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

  getWaitlist() {
    return this.afs.collection('counters').doc('waitlist').snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      return data;
    }));
  }

  calculateRanking(referralId, waitlist) {
    if (!waitlist.hasOwnProperty(referralId)) {
      this.addUserToWaitlist(referralId);
    } else if (!environment.production) {
      console.log('Referral id found!');
    }

    const waitlistSorted = this.sortRanking(waitlist);
    if (!environment.production) {
      console.log('Waitlist: ', waitlist);
      console.log('Waitlist: ', waitlistSorted);
    }

    const result = waitlistSorted.filter(obj => {
      return obj.referralId === referralId;
    });

    return result[0].ranking;
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
      arr[i]['ranking'] = i + 101;
    }

    return arr;
  }

  addUserToWaitlist(referralId) {
    const ref = this.afs.firestore.collection('counters').doc('waitlist');
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      transaction.set(ref, {
        [referralId]: 0,
      }, { merge: true });
    }).then(() => {
      if (!environment.production) {
        console.log(
          `Transaction successfully committed.`
        );
      }
    }).catch((error) => {
      if (!environment.production) {
        console.log('Transaction failed: ', error);
      }
    });
  }
}
