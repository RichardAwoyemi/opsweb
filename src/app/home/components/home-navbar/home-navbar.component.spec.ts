import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerModule, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { HomeNavbarComponent } from './home-navbar.component';

describe('HomeNavbarComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeNavbarComponent],
      providers: [
        UtilService,
        NGXLogger,
        NGXLoggerHttpService
      ],
      imports: [
        RouterTestingModule,
        LoggerModule.forRoot(environment.logging),
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeNavbarComponent);
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
