import { TestBed, async } from '@angular/core/testing';
import { HomeFooterComponent } from './home-footer.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from 'src/app/shared/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilService } from 'src/app/shared/services/util.service';
import { NGXLogger, NGXLoggerHttpService, LoggerModule } from 'ngx-logger';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ReferralService } from 'src/app/dashboard/services/referral.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeFooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFooterComponent],
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
      ]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeFooterComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have a copyright message', async(() => {
      app.copyrightMessage = 'Test copyright message';
      fixture.detectChanges();
      expect(document.getElementById('copyrightMessage').innerText).toContain(app.copyrightMessage);
    }));
  });
});
