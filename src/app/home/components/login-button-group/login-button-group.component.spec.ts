import { LoginButtonGroupComponent } from './login-button-group.component';
import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';
import { NGXLogger, NGXLoggerHttpService, LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';

describe('LoginButtonGroupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        LoggerModule.forRoot(environment.logging)
      ],
      declarations: [LoginButtonGroupComponent],
      providers: [
        UtilService,
        NGXLogger,
        NGXLoggerHttpService
      ]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(LoginButtonGroupComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have option to sign in with Google', async(() => {
      fixture.detectChanges();
      expect(document.getElementById('googleLogin').innerText).toContain('Sign in with Google');
    }));

    it('should have option to sign in with Facebook', async(() => {
      fixture.detectChanges();
      expect(document.getElementById('facebookLogin').innerText).toContain('Sign in with Facebook');
    }));

    it('should have option to sign in with email address', async(() => {
      fixture.detectChanges();
      expect(document.getElementById('emailLogin').innerText).toContain('or use your email address');
    }));
  });
});
