import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {
  public timezones: any;
  private timeZonesDataPath = './assets/data/timezones.json';
  public currencies: any;
  private currenciesDataPath = './assets/data/currencies.json';
  public dates: any;
  private datesDataPath = './assets/data/dates.json';
  public programmingTasks: any;
  private programmingTasksDataPath = './assets/data/tasks-programming.json';
  public webCategories: any;
  private webCategoriesDataPath = './assets/data/web-categories.json';
  public webCustom: any;
  private webCustomDataPath = './assets/data/web-custom.json';
  public webCustomAlert: any;
  private webCustomAlertDataPath = './assets/data/web-custom-alert.json';

  constructor(
    public httpClient: HttpClient
  ) {
    this.timezones = this.httpClient.get(this.timeZonesDataPath);
    this.currencies = this.httpClient.get(this.currenciesDataPath);
    this.dates = this.httpClient.get(this.datesDataPath);
    this.programmingTasks = this.httpClient.get(this.programmingTasksDataPath);
    this.webCategories = this.httpClient.get(this.webCategoriesDataPath);
    this.webCustom = this.httpClient.get(this.webCustomDataPath);
    this.webCustomAlert = this.httpClient.get(this.webCustomAlertDataPath);
  }

  public getAllTimezones(): Observable<any> {
    return this.timezones;
  }

  public getAllCurrencies(): Observable<any> {
    return this.currencies;
  }

  public getAllDates(): Observable<any> {
    return this.dates;
  }

  public getAllProgrammingTasks(): Observable<any> {
    return this.programmingTasks;
  }

  public getAllWebCategories(): Observable<any> {
    return this.webCategories;
  }

  public getAllWebCustom(): Observable<any> {
    return this.webCustom;
  }

  public getAllWebCustomAlert(): Observable<any> {
    return this.webCustomAlert;
  }
}
