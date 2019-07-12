import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { UtilService } from '../../shared/services/util.service';

@Injectable()
export class ReferralService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public utilService: UtilService,
    public http: HttpClient,
    private logger: NGXLogger
  ) {
  }

  getNoOfReferredUsers(referralId) {
    this.logger.debug('Getting number of referred users');
    if (referralId) {
      return this.afs.collection('counters').doc('waitlist').valueChanges()
        .pipe(map(referrals => referrals[referralId]));
    }
  }

  generateReferralUrl(referralId) {
    this.logger.debug('Generating referral link');
    return Observable.create((observer) => { observer.next(location.host + '/invite/' + referralId); });
  }

  addReferralPoints(userReferralId) {
    this.logger.debug('Adding referral points');
    const ref = this.afs.firestore.collection('counters').doc('waitlist');
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { [userReferralId]: 1 }, { merge: true });
      }
      const newCount = doc.data()[userReferralId] + 1;
      transaction.set(ref, { [userReferralId]: newCount }, { merge: true });
    }).then(() => {
        this.logger.debug('Transaction successfully committed.');
    }).catch((error) => {
        this.logger.debug(`Transaction failed: ${error}`);
    });
  }

  getWaitlist() {
    this.logger.debug('Getting waitlist');
    return this.afs.collection('counters').doc('waitlist').snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      this.logger.debug(data);
      return data;
    }));
  }

  async calculateRanking(referralId, waitlist) {
    this.logger.debug('Referral id:');
    this.logger.debug(referralId);
    this.logger.debug('Waitlist:');
    this.logger.debug(waitlist);

    if (waitlist && referralId) {
      if (!waitlist.hasOwnProperty(referralId)) {
        this.logger.debug('Referral id not found, creating new one');
        this.addUserToWaitlist(referralId);
      } else {
        this.logger.debug('Referral id found!');
      }

      const waitlistSorted = await this.sortRanking(waitlist);

      if (waitlistSorted) {
        this.logger.debug('Waitlist sorted:');
        this.logger.debug(waitlistSorted);
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
    this.logger.debug('Sorting ranking');
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
    this.logger.debug(`Adding ${referralId} to waitlist`);
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      transaction.set(waitlistRef, {
        [referralId]: 0,
      }, { merge: true });
    }).then(() => {
        this.logger.debug('Transaction successfully committed.');
    }).catch((error) => {
        this.logger.debug(`Transaction failed: ${error}`);
    });
  }
}
