import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment.staging';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

describe('DataService unit tests', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      RouterTestingModule
    ],
    providers: [
      DataService,
      HttpClient,
      HttpHandler,
      AngularFirestore,
      AngularFireAuth
    ]
  }));

  describe('getAllTimezones()', () => {
    it('should return total number of timezones',
      inject([DataService], (dataService) => {
        dataService.getAllTimezones().subscribe(result => expect(result.length).toBeGreaterThan(0));
      }));
  });

  describe('getAllCurrencies()', () => {
    it('should return total number of currencies',
      inject([DataService], (dataService) => {
        dataService.getAllCurrencies().subscribe(result => expect(result.length).toBeGreaterThan(0));
      }));
  });

  describe('getAllDates()', () => {
    it('should return total number of dates',
      inject([DataService], (dataService) => {
        dataService.getAllDates().subscribe(result => expect(result.length).toBeGreaterThan(0));
      }));
  });
});
