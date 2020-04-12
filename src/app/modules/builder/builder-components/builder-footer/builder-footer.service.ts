import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BuilderComponentsService } from '../builder-components.service';

@Injectable()
export class BuilderFooterService {

  private FOOTER_THEME_PATH = './assets/data/web-themes/footer.json';

  constructor(
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  getFooterThemes(): Observable<any> {
    return this.httpClient.get(this.FOOTER_THEME_PATH);
  }

  updateFooterMenuOptions(newPages = this.builderComponentsService.getPages(), oldPages): any[] {
    const footerMenuOptions = [];
    for (let i = 0; i < newPages.length; i++) {
      let footerMenuOption = oldPages.filter(option => {
        let footerMenuOptionVisibility = false;
        if (option) {
          footerMenuOptionVisibility = option['page'] === newPages[i];
        }
        return footerMenuOptionVisibility;
      });
      if (footerMenuOption.length > 0) {
        footerMenuOption = footerMenuOption[0];
      } else {
        footerMenuOption = { 'page': newPages[i], 'visible': false };
      }
      footerMenuOptions.push(footerMenuOption);
    }
    return footerMenuOptions;
  }
}
