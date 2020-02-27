import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';
import { BuilderComponentsService } from '../../modules/builder/builder-components/builder-components.service';
import { map } from 'rxjs/operators';
import { BuilderService } from '../../modules/builder/builder.service';

@Injectable()
export class WebsiteService {
  constructor(
    private afs: AngularFirestore,
    private builderComponentService: BuilderComponentsService,
    private builderService: BuilderService,
    public logger: NGXLogger
  ) {
  }

  getWebsitesByUserId(id) {
    return this.afs.collection('websites', ref => ref.where('createdBy', '==', id)).valueChanges();
  }

  getWebsite(id) {
    if (id) {
      return this.afs.collection('websites').doc(id).snapshotChanges().pipe(map(action => {
        const data = action.payload.data();
        const uid = action.payload.id;
        return {uid, ...data};
      }));
    }
  }

  createWebsite(name) {
    return this.afs.collection('websites', (ref) => ref.where('name', '==', name).limit(1)).get();
  }

  saveWebsite() {
    const id = this.builderService.websiteId.getValue();
    const pageComponents = this.builderComponentService.pageComponents.getValue();
    if (id && pageComponents) {
      const websiteRef: AngularFirestoreDocument<any> = this.afs.doc(`websites/${id}`);
      return websiteRef.set(pageComponents, {
        merge: true
      });
    }
  }

  deleteWebsite() {
  }
}
