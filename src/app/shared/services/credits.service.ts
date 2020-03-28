import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';

@Injectable()
export class CreditsService {
  constructor(
    private afs: AngularFirestore,
    public logger: NGXLogger,
    public router: Router
  ) {
  }

  incrementCredit(id: any, value: number) {
    const documentPath = `users/${id}`;
    const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
    const increment = firestore.FieldValue.increment(value);
    return documentRef.set({credits: increment}, {
      merge: true
    });
  }

  // decrementCredit(id: any, value: number) {
  //   const documentPath = `credits/${id}`;
  //   const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
  //   const decrement = firestore.FieldValue.increment(value * -1);
  //   documentRef.update({ credit: decrement });
  // }
}
