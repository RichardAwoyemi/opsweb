import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { first, map } from 'rxjs/operators';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public logger: NGXLogger
  ) { }

  async docExists(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
  }

  getCurrentTimestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getDateFromTimestamp(serverTimestamp: any) {
    return new Date(serverTimestamp.seconds * 1000);
  }

  createDocument(collectionPath: string) {
    const documentId = this.afs.createId();
    const documentPath = `${collectionPath}/${documentId}`;
    this.logger.debug(`Creating a document with generated Id at: '/${documentPath}'`);
    const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
    return documentRef.set({}, { merge: true });
  }

  updateDocument(documentPath: string, data: any) {
    this.logger.debug(`Updating a document with id at: '/${documentPath}' with data:`);
    this.logger.debug(data);
    const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
    documentRef.update(data);
  }

  createDocumentRef(collectionPath: string) {
    const documentId = this.afs.createId();
    const documentPath = `${collectionPath}/${documentId}`;
    return this.afs.doc(documentPath);
  }

  createDocumentWithId(collectionPath: string, documentId: string) {
    const documentPath = `${collectionPath}/${documentId}`;
    this.logger.debug(`Creating a document at '/${documentPath}'`);
    const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);
    return documentRef.set({}, { merge: true });
  }

  getDataInDocument(collectionName: string, documentName: string) {
    this.logger.debug(`Getting data in document '/${collectionName}/${documentName}'`);
    return this.afs.collection(collectionName).doc(documentName).snapshotChanges().pipe(map(action => {
      const data = action.payload.data();
      const uid = action.payload.id;
      return { uid, ...data };
    }));
  }

  getOrderedDocumentsInCollection(
    collectionName: string, orderBy: string, ascOrder: boolean) {
    const orderDirection = this.getOrderDirection(ascOrder);

    this.logger.debug(`Getting documents in collection '/${collectionName}' orderedBy '${orderBy} [${orderDirection}]' `);

    return this.afs.collection(collectionName,
      ref => ref.orderBy(orderBy, orderDirection)).snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      }));
  }

  getLimitedOrderedDocumentsInCollection(
    collectionName: string, orderBy: string, ascOrder: boolean, limit: number) {
    const orderDirection = this.getOrderDirection(ascOrder);

    this.logger.debug(`Getting documents in collection '/${collectionName}' orderedBy '${orderBy} [${orderDirection}]' ` +
      `limited to '${limit}'`);

    return this.afs.collection(collectionName,
      ref => ref.orderBy(orderBy, orderDirection).limit(limit)).snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      }));
  }

  getLimitedOrderedDocumentsInCollectionFromStartIndex(
    collectionName: string, orderBy: string, ascOrder: boolean, limit: number, startAfterRef: any, startAfterIndex: number) {
    const orderDirection = this.getOrderDirection(ascOrder);

    this.logger.debug(`Getting documents in collection '/${collectionName}' orderedBy '${orderBy} [${orderDirection}]' ` +
      `limited to '${limit}' records starting after index '${startAfterIndex}'`);

    return this.afs.collection(collectionName,
      ref => ref.orderBy(orderBy, orderDirection).startAfter(startAfterRef).limit(limit)).snapshotChanges().pipe(map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data();
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      }));
  }

  getDocumentsInCollection(collectionName: string) {
    this.logger.debug(`Getting documents in collection '${collectionName}'`);
    return this.afs.collection(collectionName).snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const uid = action.payload.doc.id;
        return { uid, ...data };
      });
    }));
  }

  getOrderDirection(orderDirection: boolean) {
    if (orderDirection) {
      return 'asc';
    } else {
      return 'desc';
    }
  }
}
