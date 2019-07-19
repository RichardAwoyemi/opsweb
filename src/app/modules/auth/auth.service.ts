import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { SimpleModalService } from '../../shared/components/simple-modal/simple-modal.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { UserService } from '../../shared/services/user.service';
import { UtilService } from '../../shared/services/util.service';
import { auth } from 'firebase/app';
import { IAuth } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public simpleModalService: SimpleModalService,
    private utilService: UtilService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private logger: NGXLogger,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }

  public static isLoggedIn() {
    return !!localStorage.getItem('uid');
  }

  static parseData(authData: any): Partial<IAuth> {
    return {
      uid: authData.uid,
      email: authData.email,
      providerId: authData.providerData[0].providerId,
      photoURL: authData.photoURL,
      emailVerified: authData.emailVerified,
    };
  }

  facebookSignIn() {
    this.logger.debug(`Initialising desktop Facebook sign in`);
    const provider = new auth.FacebookAuthProvider();
    let firstName = null, lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['first_name'];
        lastName = result.additionalUserInfo.profile['last_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewDesktopUser(result, firstName, lastName);
        }
        if (doc) {
          this.logger.debug(`${firstName} ${lastName} is a returning desktop user`);
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops', error.message);
    });
  }

  mobileFacebookSignIn() {
    this.logger.debug(`Initialising mobile Facebook sign in`);
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  googleSignIn() {
    this.logger.debug('Initialising desktop Google sign in');
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['given_name'];
        lastName = result.additionalUserInfo.profile['family_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewDesktopUser(result, firstName, lastName);
        }
        if (doc) {
          this.logger.debug(`${firstName} ${lastName} is a returning desktop user`);
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops', error.message);
    });
  }

  mobileGoogleSignIn() {
    this.logger.debug('Initialising mobile Google sign in');
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  async processMobileLogin(result, uid) {
    this.logger.debug('Initialising mobile login');
    const path = `/users/${uid}/`;
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const user: any = {
        uid: uid,
        email: result.email,
        displayName: result.displayName,
        photoURL: result.photoURL,
        emailVerified: true
      };
      this.userService.processNewMobileUser(user, null, null);
    }
  }

  register(email, password, firstName, lastName) {
    this.logger.debug('Initialising registration');
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result) {
        const path = `/users/${result.user.uid}/`;
        firstName = UtilService.toTitleCase(firstName);
        lastName = UtilService.toTitleCase(lastName);
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewDesktopUser(result, firstName, lastName);
          this.sendVerificationMail().then(() => {
          });
          this.simpleModalService.displayMessage('Great!', 'Your registration was successful.');
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops', error.message);
    });
  }

  signIn(email, password) {
    this.logger.debug('Initialising sign in');
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    }).then(() => {
    });
  }

  sendVerificationMail() {
    this.logger.debug('Sending verification email');
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['verify-email']).then(() => {
        });
      });
    }).then(() => {
    });
  }

  forgotPassword(passwordResetEmail) {
    this.logger.debug('Sending password reset email');
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      this.simpleModalService.displayMessage('Great!', 'Password reset email sent, please check your inbox.' +
        ' If you do not receive this email, check your spam or bulk email folder.');
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops', error.message);
    });
  }

  signOut() {
    localStorage.removeItem('uid');
    this.afAuth.auth.signOut().then(() => {
      window.location.reload();
    });
  }
}
