import { LoginButtonGroupComponent } from './login-button-group.component';
import { FormsModule } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Store } from '@ngrx/store';

describe('LoginButtonGroupComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, Store],
      declarations: [LoginButtonGroupComponent]
    }).compileComponents().then(() => {
    });
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
      expect(document.getElementById('googleLogin').innerText).toBe('Sign in with Google');
    }));

    it('should have option to sign in with Facebook', async(() => {
      expect(document.getElementById('facebookLogin').innerText).toBe('Sign in with Facebook');
    }));

    it('should have option to sign in with email address', async(() => {
      expect(document.getElementById('emailLogin').innerText.trim()).toBe('or use your email address');
    }));
  });
});
