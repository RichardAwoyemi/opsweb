import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  public generateRandomString(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
}
