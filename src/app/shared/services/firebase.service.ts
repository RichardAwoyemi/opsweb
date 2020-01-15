import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public logger: NGXLogger
  ) {
  }

  // static getCurrentTimestamp() {
  //   return firebase.firestore.FieldValue.serverTimestamp();
  // }
  //
  // static getDateFromTimestamp(serverTimestamp: any) {
  //   return new Date(serverTimestamp.seconds * 1000);
  // }

  // static getOrderDirection(orderDirection: boolean) {
  //   if (orderDirection) {
  //     return 'asc';
  //   } else {
  //     return 'desc';
  //   }
  // }


  async docExists(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }

  // createDocument(collectionPath: string) {
  //   const documentId = this.afs.createId();
  //   const documentPath = `${ collectionPath }/${ documentId }`;
  //   this.logger.debug(`Creating a document with generated Id at: '/${ documentPath }'`);
  //   const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
  //   return documentRef.set({}, { merge: true });
  // }
  //
  updateDocument(collectionName: string, documentName: string, data: any) {
    this.logger.debug(`Updating a document with id at: '/${ collectionName }/${ documentName }' with data:`);
    this.logger.debug(data);
    this.afs.collection(collectionName).doc(documentName).update(data);
  }

  createId() {
    const documentId = this.afs.createId();
    return documentId;
  }

  createDocument(collectionPath: string, documentId: string) {
    const documentPath = `${ collectionPath }/${ documentId }`;
    this.logger.debug(`Creating a document at '/${ documentPath }`);
    this.afs.doc(documentPath).set({}, { merge: true });
  }

  async createDocumentWithData(collectionPath: string, documentId: string, data: any, sensitive: boolean) {
    const documentPath = `${ collectionPath }/${ documentId }`;
    this.logger.debug(`Creating a document at '/${ documentPath }' with data:`);
    if (sensitive) {
      this.logger.debug('Not showing sensitive data');
    } else {
      this.logger.debug(data);
    }
    await this.afs.doc(documentPath).set(data, { merge: true });
  }

  async getDataInDocument(collectionName: string, documentName: string) {
    this.logger.debug(`Getting data in document '/${ collectionName }/${ documentName }'`);
    const data = await this.afs.collection(collectionName).doc(documentName).get();
    return (await data.toPromise()).data();
  }

  // getOrderedDocumentsInCollection(
  //   collectionName: string, orderBy: string, ascOrder: boolean) {
  //   const orderDirection = FirebaseService.getOrderDirection(ascOrder);
  //
  //   this.logger.debug(`Getting documents in collection '/${ collectionName }' orderedBy '${ orderBy } [${ orderDirection }]' `);
  //
  //   return this.afs.collection(collectionName,
  //     ref => ref.orderBy(orderBy, orderDirection)).snapshotChanges().pipe(map(actions => {
  //     return actions.map(action => {
  //       const data = action.payload.doc.data();
  //       const uid = action.payload.doc.id;
  //       return { uid, ...data };
  //     });
  //   }));
  // }
  //
  // getLimitedOrderedDocumentsInCollection(
  //   collectionName: string, orderBy: string, ascOrder: boolean, limit: number) {
  //   const orderDirection = FirebaseService.getOrderDirection(ascOrder);
  //
  //   this.logger.debug(`Getting documents in collection '/${ collectionName }' orderedBy '${ orderBy } [${ orderDirection }]' ` +
  //     `limited to '${ limit }'`);
  //
  //   return this.afs.collection(collectionName,
  //     ref => ref.orderBy(orderBy, orderDirection).limit(limit)).snapshotChanges().pipe(map(actions => {
  //     return actions.map(action => {
  //       const data = action.payload.doc.data();
  //       const uid = action.payload.doc.id;
  //       return { uid, ...data };
  //     });
  //   }));
  // }
  //
  // getLimitedOrderedDocumentsInCollectionFromStartIndex(
  //   collectionName: string, orderBy: string, ascOrder: boolean, limit: number, startAfterRef: any, startAfterIndex: number) {
  //   const orderDirection = FirebaseService.getOrderDirection(ascOrder);
  //
  //   this.logger.debug(`Getting documents in collection '/${ collectionName }' orderedBy '${ orderBy } [${ orderDirection }]' ` +
  //     `limited to '${ limit }' records starting after index '${ startAfterIndex }'`);
  //
  //   return this.afs.collection(collectionName,
  //     ref => ref.orderBy(orderBy, orderDirection).startAfter(startAfterRef).limit(limit)).snapshotChanges().pipe(map(actions => {
  //     return actions.map(action => {
  //       const data = action.payload.doc.data();
  //       const uid = action.payload.doc.id;
  //       return { uid, ...data };
  //     });
  //   }));
  // }
  //
  // getDocumentsInCollection(collectionName: string) {
  //   this.logger.debug(`Getting documents in collection '${ collectionName }'`);
  //   return this.afs.collection(collectionName).snapshotChanges().pipe(map(actions => {
  //     return actions.map(action => {
  //       const data = action.payload.doc.data();
  //       const uid = action.payload.doc.id;
  //       return { uid, ...data };
  //     });
  //   }));
  // }
}
