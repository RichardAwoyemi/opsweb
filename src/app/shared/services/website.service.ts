import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NGXLogger } from 'ngx-logger';
import { BuilderComponentsService } from '../../modules/builder/builder-components/builder-components.service';
import { map } from 'rxjs/operators';
import { BuilderService } from '../../modules/builder/builder.service';
import { ActiveTemplates } from '../../modules/builder/builder';
import { UtilService } from './util.service';
import { IUser } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable()
export class WebsiteService {
  constructor(
    private afs: AngularFirestore,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private toastrService: ToastrService,
    public logger: NGXLogger,
    public router: Router
  ) {
  }

  private websiteOwnershipSubscription: Subscription;

  createWebsiteFromTemplate(template: string, user: IUser) {
    const websiteName = UtilService.generateWebsiteName();
    const documentId = this.afs.createId();
    const documentPath = `websites/${documentId}`;
    const documentRef: AngularFirestoreDocument<any> = this.afs.doc(documentPath);

    const frontPageComponents = this.builderComponentsService.frontPageComponents.getValue();
    const quickPageComponents = this.builderComponentsService.quickPageComponents.getValue();
    const defaultPageComponents = this.builderComponentsService.defaultPageComponents.getValue();

    this.websiteOwnershipSubscription = this.getWebsitesByUserId(user.uid).subscribe(websitesOwnedByUser => {
      if (websitesOwnedByUser.length < 3) {
        switch (template['id']) {
          case ActiveTemplates.Front:
            documentRef.set({
              name: websiteName,
              id: documentId,
              createdBy: user.uid,
              pages: frontPageComponents['pages']
            }, {merge: true});
            break;
          case ActiveTemplates.Quick:
            documentRef.set({
              name: websiteName,
              id: documentId,
              createdBy: user.uid,
              pages: quickPageComponents['pages']
            }, {merge: true});
            break;
          default:
            documentRef.set({
              name: websiteName,
              id: documentId,
              createdBy: user.uid,
              pages: defaultPageComponents['pages']
            }, {merge: true});
            break;
        }
        this.builderService.setSidebarComponentsSetting();
        this.builderService.activePageIndex.next(0);
        this.toastrService.success('Your website has been created.');
        this.router.navigateByUrl(`/builder/${documentId}`).then(() => {
        });
      } else {
        this.toastrService.error(`You cannot create more than 3 websites on your current plan.`);
      }
      this.websiteOwnershipSubscription.unsubscribe();
    });
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

  checkIfWebsiteNameIsAvailable(name) {
    return this.afs.collection('websites', (ref) => ref.where('name', '==', name).limit(1)).get();
  }

  saveWebsite() {
    const id = this.builderService.websiteId.getValue();
    const pageComponents = this.builderComponentsService.pageComponents.getValue();
    if (id && pageComponents) {
      const websiteRef: AngularFirestoreDocument<any> = this.afs.doc(`websites/${id}`);
      return websiteRef.set(pageComponents, {
        merge: true
      });
    }
  }
}
