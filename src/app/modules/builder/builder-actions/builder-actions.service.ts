import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BuilderActionsService {
  activeLibrarySelectedImage = new BehaviorSubject<any>(null);
  activeLibrarySearchText = new BehaviorSubject<string>(null);

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
