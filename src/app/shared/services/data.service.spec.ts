import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';

describe('DataService testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const timeZonesDataPath = './assets/data/timezones.json';
  const currenciesDataPath = './assets/data/currencies.json';
  const datesDataPath = './assets/data/dates.json';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('can test getTimezones() HttpClient.get request', () => {
    const testData: Data = { name: 'Test Data' };
    httpClient.get<Data>(timeZonesDataPath)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(timeZonesDataPath);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('can test getAllCurrencies() HttpClient.get request', () => {
    const testData: Data = { name: 'Test Data' };
    httpClient.get<Data>(currenciesDataPath)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(currenciesDataPath);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('can test getAllDates() HttpClient.get request', () => {
    const testData: Data = { name: 'Test Data' };
    httpClient.get<Data>(datesDataPath)
      .subscribe(data =>
        expect(data).toEqual(testData)
      );

    const req = httpTestingController.expectOne(datesDataPath);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });
});
