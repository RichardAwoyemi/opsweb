import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';

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
  public webCustomFeatures: any;
  public webCustomAlert: any;
  private webCustomAlertDataPath = './assets/data/web-custom-alert.json';
  public webCustomAuth: any;
  private webCustomAuthDataPath = './assets/data/web-custom-auth.json';
  public webCustomEcommerce: any;
  private webCustomEcommerceDataPath = './assets/data/web-custom-ecommerce.json';
  public webCustomFinance: any;
  private webCustomFinanceDataPath = './assets/data/web-custom-finance.json';
  public webCustomGames: any;
  private webCustomGamesDataPath = './assets/data/web-custom-games.json';
  public webCustomMultimedia: any;
  private webCustomMultimediaDataPath = './assets/data/web-custom-multimedia.json';
  public webCustomSocial: any;
  private webCustomSocialDataPath = './assets/data/web-custom-social.json';
  public similarApps: any;
  private similarAppsDataPath = './assets/data/similar-apps.json';

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
    this.webCustomAuth = this.httpClient.get(this.webCustomAuthDataPath);
    this.webCustomEcommerce = this.httpClient.get(this.webCustomEcommerceDataPath);
    this.webCustomFinance = this.httpClient.get(this.webCustomFinanceDataPath);
    this.webCustomGames = this.httpClient.get(this.webCustomGamesDataPath);
    this.webCustomMultimedia = this.httpClient.get(this.webCustomMultimediaDataPath);
    this.webCustomSocial = this.httpClient.get(this.webCustomSocialDataPath);
    this.similarApps = this.httpClient.get(this.similarAppsDataPath);
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

  public getAllWebCustomAuth(): Observable<any> {
    return this.webCustomAuth;
  }

  public getAllWebCustomEcommerce(): Observable<any> {
    return this.webCustomEcommerce;
  }

  public getAllWebCustomFinance(): Observable<any> {
    return this.webCustomFinance;
  }

  public getAllWebCustomGames(): Observable<any> {
    return this.webCustomGames;
  }

  public getAllWebCustomMultimedia(): Observable<any> {
    return this.webCustomMultimedia;
  }

  public getAllWebCustomSocial(): Observable<any> {
    return this.webCustomSocial;
  }

  public getAllWebCustomFeatures(): Observable<any> {
    return combineLatest([this.webCustomAlert,
                          this.webCustomAuth,
                          this.webCustomEcommerce,
                          this.webCustomFinance,
                          this.webCustomGames,
                          this.webCustomMultimedia,
                          this.webCustomSocial]);
  }

  public getAllSimilarApps(): Observable<any> {
    return this.similarApps;
  }
}
