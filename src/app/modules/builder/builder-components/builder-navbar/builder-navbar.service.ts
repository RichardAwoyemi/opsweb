import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../builder-components.service';
import { UtilService } from '../../../../shared/services/util.service';
import { TemplateService } from '../../../../shared/services/template.service';

@Injectable()
export class BuilderNavbarService {
  private NAVBAR_THEME_PATH = './assets/data/web-themes/navbar.json';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getNavbarThemes(): Observable<any> {
    return this.httpClient.get(this.NAVBAR_THEME_PATH);
  }

}
