import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class WebsiteService {
  constructor(
    private afs: AngularFirestore,
    public logger: NGXLogger
  ) {
  }

  createWebsite(name) {
    return this.afs.collection('websites', (ref) => ref.where('name', '==', name).limit(1)).get();
  }

  renameWebsite() {
  }

  saveWebsite(name, componentsDetail) {
    componentsDetail = componentsDetail.filter((set => f => !set.has(f.componentId) && set.add(f.componentId))(new Set));
    console.log(componentsDetail);
  }
}
