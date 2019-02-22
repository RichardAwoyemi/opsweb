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
    const userRef = this.afs.firestore.collection('users').doc(`users/${uid}`);
    return this.afs.firestore.runTransaction(async (transaction: any) => {
      const doc = await transaction.get(userRef);
      if (!doc.exists) {
        transaction.set(userRef, { referralScore: 1 });
        return 1;
      }
      const newReferralScore = doc.data().referralScore + 1;
      transaction.update(userRef, {
        referralScore: newReferralScore,
      });
      return newReferralScore;
    })
      .then((newCount: any) => {
        console.log(
          `Transaction successfully committed and new score for '${uid}' is '${newCount}'.`
        );
      })
      .catch((error: any) => {
        console.log('Transaction failed: ', error);
      });
  }

  public addUserToWaitlist(referralId) {
    const waitlistDocRef = this.afs.firestore.collection('counters').doc('waitlist');
    return this.afs.firestore.runTransaction(function (transaction: any) {
      return transaction.get(waitlistDocRef).then(function (waitlistDoc: any) {
        if (!waitlistDoc.exists) {
          waitlistDocRef.set({ [referralId]: 0 });
        }
        const waitlistData = {
          [referralId]: 0
        };
        return waitlistDocRef.set(waitlistData, {
          merge: true
        });
      });
    }).then(function () {
      if (!environment.production) {
        console.log(`Transaction successfully committed and user with referral id '${referralId}' has been added to waitlist.`);
      }
    }).catch(function (error: any) {
      if (!environment.production) {
        console.log('Transaction failed: ', error);
      }
    });
  }
}
