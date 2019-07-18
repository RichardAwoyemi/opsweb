import { TestBed, async } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';
import { UtilService } from '../../services/util.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReferralService } from 'src/app/dashboard/services/referral.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NGXLogger, NGXLoggerHttpService, LoggerModule } from 'ngx-logger';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';

describe('RegisterFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        LoggerModule.forRoot(environment.logging)
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
