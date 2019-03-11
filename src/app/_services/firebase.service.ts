import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) { }

  async docExists(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }
}
