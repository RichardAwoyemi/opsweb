import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeHeaderComponent } from './home-header.component';
import { UserService } from 'src/app/shared/services/user.service';
import { NGXLoggerHttpService, NGXLogger, LoggerModule } from 'ngx-logger';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilService } from 'src/app/shared/services/util.service';
import { HttpClient } from 'selenium-webdriver/http';
import { ReferralService } from 'src/app/dashboard/services/referral.service';
import { HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('HomeHeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeHeaderComponent],
      providers: [
        UserService,
        UtilService,
        ReferralService,
        AngularFirestore,
        AngularFireAuth,
        NGXLogger,
        NGXLoggerHttpService
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        LoggerModule.forRoot(environment.logging),
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeHeaderComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));
  });
});
