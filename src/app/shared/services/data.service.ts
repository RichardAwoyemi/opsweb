import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, Observable } from 'rxjs';

@Injectable()
export class DataService {
  // Shared
  public dates: any;
  public webTemplateBusiness: any;

  // Web templates
  public webTemplateCategories: any;
  private datesDataPath = './assets/data/dates.json';
  private webTemplateCategoriesDataPath = './assets/data/web-templates/template-categories.json';
  private webTemplateBusinessDataPath = './assets/data/web-templates/template-business.json';

  constructor(
    public httpClient: HttpClient
  ) {
    this.dates = this.httpClient.get(this.datesDataPath);
    this.webTemplateCategories = this.httpClient.get(this.webTemplateCategoriesDataPath);
    this.webTemplateBusiness = this.httpClient.get(this.webTemplateBusinessDataPath);
  }

  public getAllDates(): Observable<any> {
    return this.dates;
  }


  public getWebTemplateBusiness(): Observable<any> {
    return this.webTemplateBusiness;
  }

  public getAllWebTemplates(): Observable<any> {
    return combineLatest([
      this.webTemplateBusiness,
    ]);
  }
}
