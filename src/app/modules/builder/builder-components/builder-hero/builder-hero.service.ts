import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../builder-components.service';

@Injectable()
export class BuilderHeroService {

  private HERO_THEME_PATH = './assets/data/web-themes/hero.json';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getHeroThemes(): Observable<any> {
    return this.httpClient.get(this.HERO_THEME_PATH);
  }
}
