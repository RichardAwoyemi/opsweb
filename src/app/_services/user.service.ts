import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable()
export class UserService {
  userData: any;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone           // NgZone service to remove outside scope warning
  ) {
  }

  getUserById(id) {
    return this.afs.collection('users').doc(id).ref;
  }
}
