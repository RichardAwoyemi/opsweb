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
    const user = this.afAuth.currentUser;
    return !!user;
  }

  facebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    let firstName = null, lastName = null;
    return this.afAuth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['first_name'];
        lastName = result.additionalUserInfo.profile['last_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  facebookSignInWithBuilder(pageComponents) {
    const provider = new auth.FacebookAuthProvider();
    let firstName = null, lastName = null;
    return this.afAuth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['first_name'];
        lastName = result.additionalUserInfo.profile['last_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
        }
        localStorage.setItem('builderTourComplete', 'true');
        this.websiteService.createWebsiteFromSource(result.user.uid, pageComponents);
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  facebookSignInWithReferral(referredByUser) {
    const provider = new auth.FacebookAuthProvider();
    let firstName = null, lastName = null;
    return this.afAuth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['first_name'];
        lastName = result.additionalUserInfo.profile['last_name'];
        const path = `/users/${result.user.uid}/`;
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewReferredUser(result, firstName, lastName, referredByUser);
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  mobileFacebookSignIn() {
    const provider = new auth.FacebookAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }

  mobileFacebookSignInWithReferral(referredByUser) {
    const provider = new auth.FacebookAuthProvider();
    localStorage.setItem('referredBy', JSON.stringify(referredByUser));
    return this.afAuth.signInWithRedirect(provider);
  }

  googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['given_name'];
        lastName = result.additionalUserInfo.profile['family_name'];
        if (!result.user.uid) {
          this.userService.processNewUser(result, firstName, lastName);
        } else {
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            this.userService.processNewUser(result, firstName, lastName);
          }
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  googleSignInWithBuilder(pageComponents) {
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.signInWithPopup(provider).then(async (result) => {
      if (result) {
        firstName = result.additionalUserInfo.profile['given_name'];
        lastName = result.additionalUserInfo.profile['family_name'];
        if (!result.user.uid) {
          this.userService.processNewUser(result, firstName, lastName);
        } else {
          const path = `/users/${result.user.uid}/`;
          const doc = await this.firebaseService.docExists(path);
          if (!doc) {
            this.userService.processNewUser(result, firstName, lastName);
          }
        }
        localStorage.setItem('builderTourComplete', 'true');
        this.websiteService.createWebsiteFromSource(result.user.uid, pageComponents);
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  googleSignInWithReferral(referredByUser) {
    const provider = new auth.GoogleAuthProvider();
    let firstName = null;
    let lastName = null;
    return this.afAuth.signInWithPopup(provider).then(async (result) => {
      firstName = result.additionalUserInfo.profile['given_name'];
      lastName = result.additionalUserInfo.profile['family_name'];
      const path = `/users/${result.user.uid}/`;
      const doc = await this.firebaseService.docExists(path);
      if (!doc) {
        this.userService.processNewReferredUser(result, firstName, lastName, referredByUser);
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  mobileGoogleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithRedirect(provider);
  }

  mobileGoogleSignInWithReferral(referredByUser) {
    const provider = new auth.GoogleAuthProvider();
    localStorage.setItem('referredBy', JSON.stringify(referredByUser));
    return this.afAuth.signInWithRedirect(provider);
  }

  register(email, password, firstName, lastName) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result) {
        const path = `/users/${result.user.uid}/`;
        firstName = UtilService.toTitleCase(firstName);
        lastName = UtilService.toTitleCase(lastName);
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
          this.sendVerificationMail().then(() => {
          });
          this.toastrService.success('Your registration was successful.', 'Great!');
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  registerWithBuilder(email, password, firstName, lastName, pageComponents) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result) {
        const path = `/users/${result.user.uid}/`;
        firstName = UtilService.toTitleCase(firstName);
        lastName = UtilService.toTitleCase(lastName);
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewUser(result, firstName, lastName);
          this.sendVerificationMail().then(() => {
          });
          localStorage.setItem('builderTourComplete', 'true');
          this.websiteService.createWebsiteFromSource(result.user.uid, pageComponents);
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  registerWithReferral(email, password, firstName, lastName, referredByUser) {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(async (result) => {
      if (result) {
        const path = `/users/${result.user.uid}/`;
        firstName = UtilService.toTitleCase(firstName);
        lastName = UtilService.toTitleCase(lastName);
        const doc = await this.firebaseService.docExists(path);
        if (!doc) {
          this.userService.processNewReferredUser(result, firstName, lastName, referredByUser);
          this.sendVerificationMail().then(() => {
          });
          this.toastrService.success('Your registration was successful.', 'Great!');
        }
      }
    }).catch((error) => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
      this.logger.debug(error.message);
    });
  }

  signIn(email, password) {
    return new Promise<any>((resolve, reject) => {
      return this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
        resolve(res);
      }, err => reject(err));
    }).then(() => {
    });
  }

  async mobileLogin(result, uid) {
    const path = `/users/${uid}`;
    console.log(path);
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const userData: any = {
        user: {
          uid: uid,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          displayName: result.displayName,
          photoURL: result.photoURL,
          emailVerified: true
        }
      };
      this.userService.processNewUser(userData, result.firstName, result.lastName);
    }
  }

  async mobileReferralLogin(result, uid, referredByUser) {
    const path = `/users/${uid}`;
    const doc = await this.firebaseService.docExists(path);
    if (!doc) {
      const userData: any = {
        user: {
          uid: uid,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.email,
          displayName: result.displayName,
          photoURL: result.photoURL,
          emailVerified: true
        }
      };
      this.userService.processNewReferredUser(userData, result.firstName, result.lastName, referredByUser);
    }
  }

  sendVerificationMail() {
    return this.afAuth.currentUser.then((user) => {
      return user.sendEmailVerification().then(() => {
        this.router.navigate(['verify-email']);
      });
    });
  }

  checkAccountType() {
    return this.afAuth.currentUser.then((user) => {
      return user.providerData;
    });
  }

  resetPassword(email) {
    return this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.simpleModalService.displayMessage('Check your email', 'We have sent you an email with ' +
        'instructions on how to reset your password. If you do not receive this email within a few minutes, then please ' +
        'also check your junk or spam folder.');
    }).catch(() => {
      this.simpleModalService.displayMessage('Oops!', 'Something has gone wrong. Please try again.');
    });
  }

  signOut() {
    localStorage.removeItem('uid');
    this.afAuth.signOut().then(() => {
      window.location.reload();
    });
  }
}
