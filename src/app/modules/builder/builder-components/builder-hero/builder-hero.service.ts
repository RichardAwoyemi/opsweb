import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
