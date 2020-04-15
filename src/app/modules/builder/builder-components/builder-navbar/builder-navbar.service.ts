import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
