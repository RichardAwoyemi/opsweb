import { UserService } from './user.service';
import { TestBed, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { UtilService } from './util.service';
import { ReferralService } from './referral.service';

describe('UserService unit tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      providers: [
        UserService,
        UtilService,
        ReferralService,
        AngularFirestore,
        AngularFireAuth
      ]
    });
  });

  describe('getNumberOfUsers()', () => {
    it('should return total number of users', (done: DoneFn) => {
      inject([UserService], (userService) => {
        userService.getNumberOfUsers().subscribe((result) => {
          const noOfUsers = result.data.counter;
          console.log(`Total number of users: ${noOfUsers}`);
          expect(noOfUsers).toBeGreaterThan(0);
          done();
        });
      })();
    });
  });
});
