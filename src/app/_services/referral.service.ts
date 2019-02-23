import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.staging';

@Injectable()
export class ReferralService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
  }

  public generateReferralIdForUser(userId, referralId) {
    const user = this.afs.firestore.collection('users').doc(userId);
    user.update({ referralId: referralId });
  }

  public generateReferralUrl(referralId) {
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

  public addReferralPoints(uid) {
    const ref = this.afs.firestore.collection('users').doc(uid);
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { referralScore: 1 }, { merge: true });
      }
      const newCount = doc.data().referralScore + 1;
      transaction.set(ref, { referralScore: newCount }, { merge: true });
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

  public addUserToWaitlist(referralId) {
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
