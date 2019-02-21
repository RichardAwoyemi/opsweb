import { Injectable, NgZone } from '@angular/core';
import { User } from '../_models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../_modals/modal.component';
import { UtilService } from './util.service';
import { auth } from 'firebase/app';
import { ReferralService } from './referral.service';

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
    private referralService: ReferralService,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
        this.setUserDetailData(result.user.uid, result.additionalUserInfo.profile['first_name'],
          result.additionalUserInfo.profile['last_name'], this.referralService.generateRandomString(8));
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = error.message;
      });
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
        this.setUserDetailData(result.user.uid, result.additionalUserInfo.profile['given_name'],
          result.additionalUserInfo.profile['family_name'], this.referralService.generateRandomString(8));
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = error.message;
      });
  }

  // Register with email/password
  register(email, password, firstName, lastName) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        // Call the SendVerificationMail() function when a new user signs up and returns promise
        this.sendVerificationMail();
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Yay!';
        modalReference.componentInstance.message = 'Your registration was successful.';
        this.setUserData(result.user);

        // Sanitise name before post
        firstName = this.utilService.toTitleCase(firstName);
        lastName = this.utilService.toTitleCase(lastName);
        this.setUserDetailData(result.user.uid, firstName, lastName, this.referralService.generateRandomString(8));
      }).catch((error) => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = error.message;
      });
  }

  // Register through referral
  registerWithReferral(email, password, firstName, lastName, referredBy) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        // Call the SendVerificationMail() function when a new user signs up and returns promise
        this.sendVerificationMail();
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Yay!';
        modalReference.componentInstance.message = 'Your registration was successful.';
        this.setUserData(result.user);

        // Sanitise name before post
        firstName = this.utilService.toTitleCase(firstName);
        lastName = this.utilService.toTitleCase(lastName);
        this.setUserReferralData(result.user.uid, firstName, lastName, this.referralService.generateRandomString(8), referredBy);
      }).catch((error) => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = error.message;
      });
  }

  // Sign in with email/password
  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          if (result.user.emailVerified === false) {
            this.router.navigate(['verify-email']);
            const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
            modalReference.componentInstance.header = 'Oops!';
            modalReference.componentInstance.message = 'Your email account has not been verified yet.';
          } else {
            localStorage.setItem('loggedIn', 'true');
            this.router.navigate(['dashboard']);
          }
        });
        this.setUserData(result.user);
      }).catch((error) => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = error.message;
      });
  }

  // Send email verification when new user sign up
  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

  // Reset forgot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Yay!';
        modalReference.componentInstance.message = 'Password reset email sent, check your inbox. ' +
          'If you do not receive this email, please check your spam or bulk email folder.';
      }).catch((error) => {
        const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
        modalReference.componentInstance.header = 'Oops!';
        modalReference.componentInstance.message = error.message;
      });
  }

  /* Setting up user data when registering with username/password, sign up with username/password and
  sign in with social auth provider in Firestore database using AngularFirestore +
  AngularFirestoreDocument service */
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    return userRef.set(userData, {
      merge: true
    });
  }

  setUserDetailData(uid, firstName, lastName, referralId) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      firstName: firstName,
      lastName: lastName,
      referralId: referralId
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  setUserReferralData(uid, firstName, lastName, referralId, referredBy) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const userDetailData = {
      firstName: firstName,
      lastName: lastName,
      referralId: referralId,
      referredBy: referredBy
    };
    return userRef.set(userDetailData, {
      merge: true
    });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn'));

    if (user == null) {
      localStorage.removeItem('loggedIn');
    }

    if (user !== null) {
      if (user.providerData[0].providerId !== 'facebook.com') {
        if (loggedIn === true && user.emailVerified !== false) {
          return true;
        }
      } else {
        if (loggedIn === true) {
          return true;
        }
      }
    }

    return false;
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('loggedIn');
      this.router.navigate(['login']);
    });
  }

  public clearLocalStorage() {
    localStorage.removeItem('user');
    localStorage.removeItem('loggedIn');
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
