import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BuilderActionsService {
  activeLibrarySelectedImage = new BehaviorSubject<string>(null);
  activeLibrarySelectedImageAlt = new BehaviorSubject<string>(null);
  activeLibrarySearchText = new BehaviorSubject<string>(null);
  renameRenameWebsiteModalStatus = new BehaviorSubject<any>({ 'open': false });

  static togglePageModalErrorMessage(pageName: string, navbarMenuOptions: any): boolean {
    pageName = pageName.trim();
    if (pageName.length === 0) {
      return false;
    } else {
      for (let i = 0; i < navbarMenuOptions.length; i++) {
        if (pageName.toLowerCase() === navbarMenuOptions[i].toLowerCase().trim()) {
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

  static togglePageModalSaveButton(pageName: string, navbarMenuOptions: any) {
    pageName = pageName.trim();
    if (pageName.length === 0) {
      return true;
    } else {
      for (let i = 0; i < navbarMenuOptions.length; i++) {
        if (pageName.toLowerCase() === navbarMenuOptions[i].toLowerCase().trim()) {
          return true;
        }
      }
    }
    return false;
  }
}
