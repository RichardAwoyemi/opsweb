import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';
import { User } from '../_models/user';
import { ModalService } from './modal.service';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public modalService: ModalService,
    private utilService: UtilService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private logger: NGXLogger,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  facebookSignIn() {
    this.logger.debug(`Initialising desktop Facebook sign in`);
    const provider = new auth.FacebookAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['first_name'];
        lastName = result.additionalUserInfo.profile['last_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
        }
        if (doc) {
          this.logger.debug(`${firstName} ${lastName} is a returning desktop user`);
        }
      }
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  facebookSignInWithReferral(referredBy) {
    this.logger.debug(`Initialising desktop Facebook sign in referred by ${referredBy}`);
    const provider = new auth.FacebookAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['first_name'];
        lastName = result.additionalUserInfo.profile['last_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUserReferral(result, firstName, lastName, referredBy);
        }
        if (doc) {
          this.logger.debug(`${firstName} ${lastName} is a returning desktop user`);
        }
      }
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  mobileFacebookSignInWithReferral(referredBy) {
    this.logger.debug(`Initialising mobile Facebook sign in referred by ${referredBy}`);
    const provider = new auth.FacebookAuthProvider();
    localStorage.setItem('referredBy', referredBy);
    return this.afAuth.auth.signInWithRedirect(provider);
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
          this.userService.processNewUser(result, firstName, lastName);
        }
        if (doc) {
          this.logger.debug(`${firstName} ${lastName} is a returning desktop user`);
        }
      }
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  mobileGoogleSignIn() {
    this.logger.debug('Initialising mobile Google sign in');
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  googleSignInWithReferral(referredBy) {
    this.logger.debug(`Initialising desktop Google sign in referred by ${referredBy}`);
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      firstName = result.additionalUserInfo.profile['given_name'];
      lastName = result.additionalUserInfo.profile['family_name'];
      const path = `/users/${result.user.uid}/`;
      const doc = await this.firebaseService.docExists(path);
      if (!doc) {
        this.userService.processNewUserReferral(result, firstName, lastName, referredBy);
      }
      if (doc) {
        this.logger.debug(`${firstName} ${lastName} is a returning desktop user`);
      }
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  mobileGoogleSignInWithReferral(referredBy) {
    this.logger.debug(`Initialising mobile Google sign in referred by ${referredBy}`);
    const provider = new auth.GoogleAuthProvider();
    localStorage.setItem('referredBy', referredBy);
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  async processMobileLogin(result, uid) {
    this.logger.debug('Initialising mobile login');
    const path = `/users/${uid}/`;
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const userData: User = {
        uid: uid,
        email: result.email,
        displayName: result.displayName,
        photoURL: result.photoURL,
        emailVerified: true
      };
      this.userService.processNewMobileUser(userData, null, null);
    }
  }

  async processMobileReferralLogin(result, uid, referredBy) {
    this.logger.debug(`Initialising mobile sign in referred by ${referredBy}`);
    const path = `/users/${uid}/`;
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const userData: User = {
        uid: uid,
        email: result.email,
        displayName: result.displayName,
        photoURL: result.photoURL,
        emailVerified: true
      };
      this.userService.processNewMobileUserReferral(userData, null, null, referredBy);
    }
  }

  register(email, password, firstName, lastName) {
    this.logger.debug('Initialising registration');
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result) {
        const path = `/users/${result.user.uid}/`;
        firstName = this.utilService.toTitleCase(firstName);
        lastName = this.utilService.toTitleCase(lastName);
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
          this.sendVerificationMail();
          this.modalService.displayMessage('Yay!', 'Your registration was successful.');
        }
      }
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  registerWithReferral(email, password, firstName, lastName, referredBy) {
    this.logger.debug(`Initialising registration with referral id ${referredBy}`);
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result) {
        const path = `/users/${result.user.uid}/`;
        firstName = this.utilService.toTitleCase(firstName);
        lastName = this.utilService.toTitleCase(lastName);
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUserReferral(result, firstName, lastName, referredBy);
          this.sendVerificationMail();
          this.modalService.displayMessage('Yay!', 'Your registration was successful.');
        }
      }
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  signIn(email, password) {
    this.logger.debug('Initialising sign in');
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  sendVerificationMail() {
    this.logger.debug('Sending verification email');
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.ngZone.run(() => { this.router.navigate(['verify-email']); });
    });
  }

  forgotPassword(passwordResetEmail) {
    this.logger.debug('Sending password reset email');
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      this.modalService.displayMessage('Yay!', 'Password reset email sent, please check your inbox.' +
        ' If you do not receive this email, check your spam or bulk email folder.');
    }).catch((error) => {
      this.modalService.displayMessage('Oops', error.message);
    });
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null &&
      ((user.emailVerified === false && user.providerData[0].providerId === 'facebook.com') ||
        ((user.emailVerified !== false))) ? true : false);
  }

  signOut() {
    this.logger.debug('Signing out');
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('referredBy');
      this.router.navigate(['login']);
    });
  }
}
