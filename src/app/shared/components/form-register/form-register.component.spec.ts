import { async, TestBed } from '@angular/core/testing';
import { FormRegisterComponent } from './form-register.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';

describe('FormRegister', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, AngularFireAuthModule],
      declarations: [FormRegisterComponent]
    }).compileComponents().then(() => {
    });
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(FormRegisterComponent);
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
