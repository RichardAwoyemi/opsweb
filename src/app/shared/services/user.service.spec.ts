import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { NGXLogger } from 'ngx-logger';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { UtilService } from './util.service';
import { LoggerTestingModule } from 'ngx-logger/testing';

describe('UserService unit tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        LoggerTestingModule
      ],
      providers: [
        UserService,
        UtilService,
        HttpClient,
        HttpHandler,
        AngularFirestore,
        AngularFireAuth,
        NGXLogger
      ]
    });
  });

  describe('getNumberOfUsers()', () => {
    it('should return total number of users', (done: DoneFn) => {
      inject([UserService], (userService) => {
        userService.getNumberOfUsers().subscribe((result) => {
          const noOfUsers = result.data.counter;
          expect(noOfUsers).toBeGreaterThan(0);
          done();
        });
      })();
    });
  });
});
