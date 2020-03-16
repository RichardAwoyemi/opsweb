import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { FirebaseService } from '../../shared/services/firebase.service';
import { UserService } from '../../shared/services/user.service';
import { UtilService } from '../../shared/services/util.service';
import { auth } from 'firebase/app';
import { IAuth } from '../../shared/models/user';
import { WebsiteService } from '../../shared/services/website.service';
import { ToastrService } from 'ngx-toastr';
import { SimpleModalService } from '../../shared/components/simple-modal/simple-modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private utilService: UtilService,
    private firebaseService: FirebaseService,
    private userService: UserService,
    private websiteService: WebsiteService,
    private simpleModalService: SimpleModalService,
    private toastrService: ToastrService,
    private logger: NGXLogger,
    private ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
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

  public isLoggedIn() {
    const user = this.afAuth.auth.currentUser;
    return !!user;
  }

  facebookSignIn() {
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
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', error.message);
    });
  }

  facebookSignInFromBuilder(pageComponents) {
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
        localStorage.setItem('builderTourComplete', 'true');
        this.websiteService.createWebsiteFromSource(result.user.uid, pageComponents);
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', error.message);
    });
  }

  mobileFacebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['given_name'];
        lastName = result.additionalUserInfo.profile['family_name'];
        if (!result.user.uid) {
          this.userService.processNewDesktopUser(result, firstName, lastName);
        } else {
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            this.userService.processNewDesktopUser(result, firstName, lastName);
          }
        }
      }
    }).catch(() => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
    });
  }

  googleSignInFromBuilder(pageComponents) {
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.auth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['given_name'];
        lastName = result.additionalUserInfo.profile['family_name'];
        if (!result.user.uid) {
          this.userService.processNewDesktopUser(result, firstName, lastName);
        } else {
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            this.userService.processNewDesktopUser(result, firstName, lastName);
          }
        }
        localStorage.setItem('builderTourComplete', 'true');
        this.websiteService.createWebsiteFromSource(result.user.uid, pageComponents);
      }
    }).catch(() => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
    });
  }

  mobileGoogleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(provider);
  }

  register(email, password, firstName, lastName) {
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
          this.toastrService.success('Your registration was successful.', 'Great!');
        }
      }
    }).catch(() => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
    });
  }

  signIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    }).then(() => {
    });
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['verify-email']).then(() => {
        });
      });
    }).then(() => {
    });
  }

  checkAccountType() {
    return this.afAuth.auth.currentUser.providerData;
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email).then(() => {
      this.simpleModalService.displayMessage('Check your email', 'We have sent you an email with ' +
        'instructions on how to reset your password. If you do not receive this email within a few minutes, then please ' +
        'also check your junk or spam folder.');
    }).catch(() => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
    });
  }

  signOut() {
    localStorage.removeItem('uid');
    this.afAuth.auth.signOut().then(() => {
      window.location.reload();
    });
  }
}
