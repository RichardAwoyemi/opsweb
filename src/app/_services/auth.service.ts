import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../_modals/modal.component';
import { auth } from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

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
    private firebaseService: FirebaseService,
    private userService: UserService,
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

  completeSignIn() {
    localStorage.setItem('loggedIn', 'true');
    this.router.navigate(['dashboard']);
  }

  displaySignInError(error) {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Oops!';
    modalReference.componentInstance.message = error.message;
  }

  facebookSignIn() {
  //   const provider = new auth.FacebookAuthProvider();
  //   return this.afAuth.auth.signInWithPopup(provider).then((result) => {
  //     const firstName = result.additionalUserInfo.profile['first_name'];
  //     const lastName = result.additionalUserInfo.profile['last_name'];
  //     if (!this.referralService.checkIfReferralIdExists(result.user.uid)) {
  //       this.processNewSignIn(result, firstName, lastName);
  //     }
  //     localStorage.setItem('loggedIn', 'true');
  //     this.router.navigate(['dashboard']);
  //   }).catch((error) => {
  //     this.displaySignInError(error);
  //   });
  }

  facebookSignInWithReferral(referredBy) {
  //   const provider = new auth.FacebookAuthProvider();
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((result) => {
  //     }).catch((error) => {
  //       this.displaySignInError(error);
  //     });
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      const path = `/users/${result.user.uid}/`;
      const firstName = result.additionalUserInfo.profile['given_name'];
      const lastName = result.additionalUserInfo.profile['family_name'];
      const doc = await this.firebaseService.docExists(path);
      if (!doc) {
        this.userService.processNewUser(result, firstName, lastName);
      }
      this.completeSignIn();
    }).catch((error) => {
      this.displaySignInError(error);
    });
  }

  googleSignInWithReferral(referredBy) {
  //   const provider = new auth.GoogleAuthProvider();
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((result) => {
  //       if (!this.referralService.checkIfReferralIdExists(result.user.uid)) {
  //         const referralId = this.utilService.generateRandomString(8);
  //         this.setUserData(result.user);
  //         this.setUserDetailData(result.user.uid, result.additionalUserInfo.profile['given_name'],
  //           result.additionalUserInfo.profile['family_name'], referralId);
  //         this.referralService.addUserToWaitlist(referralId);
  //         this.referralService.addReferralPoints(referredBy);
  //       }

  //       localStorage.setItem('loggedIn', 'true');
  //       this.router.navigate(['dashboard']);
  //     }).catch((error) => {
  //       const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //       modalReference.componentInstance.header = 'Oops!';
  //       modalReference.componentInstance.message = error.message;
  //     });
  }

  // Register with email/password
  register(email, password, firstName, lastName) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       const referralId = this.utilService.generateRandomString(8);

  //       // Call the SendVerificationMail() function when a new user signs up and returns promise
  //       this.sendVerificationMail();
  //       const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //       modalReference.componentInstance.header = 'Yay!';
  //       modalReference.componentInstance.message = 'Your registration was successful.';
  //       this.setUserData(result.user);

  //       // Sanitise name before post
  //       firstName = this.utilService.toTitleCase(firstName);
  //       lastName = this.utilService.toTitleCase(lastName);

  //       this.setUserDetailData(result.user.uid, firstName, lastName, referralId);
  //       this.referralService.addUserToWaitlist(referralId);
  //     }).catch((error) => {
  //       const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //       modalReference.componentInstance.header = 'Oops!';
  //       modalReference.componentInstance.message = error.message;
  //     });
  }

  registerWithReferral(email, password, firstName, lastName, referredBy) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       const referralId = this.utilService.generateRandomString(8);

  //       // Call the SendVerificationMail() function when a new user signs up and returns promise
  //       this.sendVerificationMail();
  //       const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //       modalReference.componentInstance.header = 'Yay!';
  //       modalReference.componentInstance.message = 'Your registration was successful.';
  //       this.setUserData(result.user);

  //       // Sanitise name before post
  //       firstName = this.utilService.toTitleCase(firstName);
  //       lastName = this.utilService.toTitleCase(lastName);

  //       // Referral campaign
  //       this.referralService.addUserToWaitlist(referralId);
  //       this.setUserReferralData(result.user.uid, firstName, lastName, referralId, referredBy);
  //       this.referralService.addReferralPoints(referredBy);
  //     }).catch((error) => {
  //       const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //       modalReference.componentInstance.header = 'Oops!';
  //       modalReference.componentInstance.message = error.message;
  //     });
  }

  // Sign in with email/password
  signIn(email, password) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         if (result.user.emailVerified === false) {
  //           this.router.navigate(['verify-email']);
  //           const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //           modalReference.componentInstance.header = 'Oops!';
  //           modalReference.componentInstance.message = 'Your email account has not been verified yet.';
  //         } else {
  //           localStorage.setItem('loggedIn', 'true');
  //           this.router.navigate(['dashboard']);
  //         }
  //       });
  //       this.setUserData(result.user);
  //     }).catch((error) => {
  //       const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
  //       modalReference.componentInstance.header = 'Oops!';
  //       modalReference.componentInstance.message = error.message;
  //     });
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      });
  }

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

  clearLocalStorage() {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('loggedIn');
  }

  // checkIfMailExists(email: string): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afAuth.auth.fetchSignInMethodsForEmail(email)
  //       .then(res => {
  //         if (res.length === 0) {
  //           resolve(false);
  //         } else {
  //           resolve(true);
  //         }
  //       })
  //       .catch(err => reject(err));
  //   });
  // }
}
