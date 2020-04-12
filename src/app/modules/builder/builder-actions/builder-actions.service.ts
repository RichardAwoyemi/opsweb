import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BuilderActionsService {
  activeLibrarySelectedImage = new BehaviorSubject<string>(null);
  activeLibrarySelectedImageAlt = new BehaviorSubject<string>(null);
  activeLibrarySearchText = new BehaviorSubject<string>(null);
  renameRenameWebsiteModalStatus = new BehaviorSubject<any>({ 'open': false });

  static togglePageModalErrorMessage(pageName: string, pages: any): boolean {
    pageName = pageName.trim();
    if (pageName.length === 0) {
      return false;
    } else {
      for (let i = 0; i < pages.length; i++) {
        if (pageName.toLowerCase() === pages[i].toLowerCase().trim()) {
          return true;
        }
      }
    }
    return false;
  }

  static toggleWebsiteModalSaveButton(websiteName: string) {
    websiteName = websiteName.trim();
    return websiteName.length === 0;
  }

  static togglePageModalSaveButton(pageName: string, pages: any) {
    pageName = pageName.trim();
    if (pageName.length === 0) {
      return true;
    } else {
      for (let i = 0; i < pages.length; i++) {
        if (pageName.toLowerCase() === pages[i].toLowerCase().trim()) {
          return true;
        }
      }
    }
    return false;
  }
}
