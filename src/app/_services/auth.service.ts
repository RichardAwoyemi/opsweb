import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../_modals/modal.component';
import { auth } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public modalService: NgbModal,
    private utilService: UtilService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    public ngZone: NgZone
  ) {
  }

  displayGenericError(error) {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Oops!';
    modalReference.componentInstance.message = error.message;
  }

  displayRegisterSucesss() {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Yay!';
    modalReference.componentInstance.message = 'Your registration was successful.';
  }

  displayVerifyEmailError() {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Oops!';
    modalReference.componentInstance.message = 'Your email account has not been verified yet.';
  }

  displayPasswordResetInfo() {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Yay!';
    modalReference.componentInstance.message = 'Password reset email sent, check your inbox. ' +
      'If you do not receive this email, please check your spam or bulk email folder.';
  }

  facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      const path = `/users/${result.user.uid}/`;
      const firstName = result.additionalUserInfo.profile['first_name'];
      const lastName = result.additionalUserInfo.profile['last_name'];
      if (firstName && lastName) {
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
        }
      } else {
        this.userService.processNewUser(result, null, null);
      }
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  facebookSignInWithReferral(referredBy) {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      const path = `/users/${result.user.uid}/`;
      const firstName = result.additionalUserInfo.profile['first_name'];
      const lastName = result.additionalUserInfo.profile['last_name'];
      if (firstName && lastName) {
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUserReferral(result, firstName, lastName, referredBy);
        }
      } else {
        this.userService.processNewUserReferral(result, null, null, referredBy);
      }
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  mobileFacebookSignInWithReferral(referredBy) {
  }

  mobileFacebookSignIn() {
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      const path = `/users/${result.user.uid}/`;
      const firstName = result.additionalUserInfo.profile['given_name'];
      const lastName = result.additionalUserInfo.profile['family_name'];
      if (firstName && lastName) {
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
        }
      } else {
        this.userService.processNewUser(result, null, null);
      }
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  mobileGoogleSignIn() {
  }

  googleSignInWithReferral(referredBy) {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      const path = `/users/${result.user.uid}/`;
      const firstName = result.additionalUserInfo.profile['given_name'];
      const lastName = result.additionalUserInfo.profile['family_name'];
      if (firstName && lastName) {
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUserReferral(result, firstName, lastName, referredBy);
        }
      } else {
        this.userService.processNewUserReferral(result, null, null, referredBy);
      }
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  mobileGoogleSignInWithReferral(referredBy) {
  }

  register(email, password, firstName, lastName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      this.sendVerificationMail();
      const path = `/users/${result.user.uid}/`;
      firstName = this.utilService.toTitleCase(firstName);
      lastName = this.utilService.toTitleCase(lastName);
      const doc = await this.firebaseService.docExists(path);
      if (!doc) {
        this.userService.processNewUser(result, firstName, lastName);
      }
      this.displayRegisterSucesss();
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  registerWithReferral(email, password, firstName, lastName, referredBy) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      this.sendVerificationMail();
      const path = `/users/${result.user.uid}/`;
      firstName = this.utilService.toTitleCase(firstName);
      lastName = this.utilService.toTitleCase(lastName);
      const doc = await this.firebaseService.docExists(path);
      if (!doc) {
        this.userService.processNewUserReferral(result, firstName, lastName, referredBy);
      }
      this.displayRegisterSucesss();
      this.ngZone.run(() => { this.router.navigate(['dashboard']); });
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  signIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.ngZone.run(() => { this.router.navigate(['verify-email']); });
    });
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail).then(() => {
      this.displayPasswordResetInfo();
    }).catch((error) => {
      this.displayGenericError(error);
    });
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null &&
      ((user.emailVerified === false && user.providerData[0].providerId === 'facebook.com') ||
        ((user.emailVerified !== false))) ? true : false);
  }

  enableChangePasswordOption() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      if (user.providerData[0].providerId === 'facebook.com' || user.providerData[0].providerId === 'google.com') {
        return false;
      }
    } else {
      return true;
    }
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  clearLocalStorage() {
    localStorage.removeItem('user');
  }

  checkIfMailExists(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.fetchSignInMethodsForEmail(email)
        .then(res => {
          if (res.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch(err => reject(err));
    });
  }
}
