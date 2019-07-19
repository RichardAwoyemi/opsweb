import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerModule, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { ReferralService } from 'src/app/dashboard/services/referral.service';
import { environment } from 'src/environments/environment';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { RegisterFormComponent } from './register-form.component';

describe('RegisterFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule,
        LoggerModule.forRoot(environment.logging),
        RouterTestingModule
      ],
      declarations: [
        RegisterFormComponent,
      ],
      providers: [
        UserService,
        UtilService,
        HttpClient,
        HttpHandler,
        ReferralService,
        AngularFirestore,
        AngularFireAuth,
        NGXLogger,
        NGXLoggerHttpService
      ]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterFormComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have necessary form elements', async(() => {
      const elements = fixture.debugElement.queryAll(By.css('.form-group'));
      expect(elements.length).toEqual(6);
    }));
  });
});
