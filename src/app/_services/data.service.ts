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

  constructor(
    public httpClient: HttpClient
  ) {
    this.timezones = this.httpClient.get(this.timeZonesDataPath);
    this.currencies = this.httpClient.get(this.currenciesDataPath);
    this.dates = this.httpClient.get(this.datesDataPath);
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
}