import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';

@Injectable()
export class DataService {
  private dates: any;
  private webTemplateBusiness: any;
  private datesDataPath = './assets/data/dates.json';
  private webTemplateBusinessDataPath = './assets/data/web-templates/template-business.json';

  constructor(
    public httpClient: HttpClient
  ) {
    this.dates = this.httpClient.get(this.datesDataPath);
    this.webTemplateBusiness = this.httpClient.get(this.webTemplateBusinessDataPath);
  }

  public getAllDates(): Observable<any> {
    return this.dates;
  }

  public getAllWebTemplates(): Observable<any> {
    return combineLatest([
      this.webTemplateBusiness
    ]);
  }
}
