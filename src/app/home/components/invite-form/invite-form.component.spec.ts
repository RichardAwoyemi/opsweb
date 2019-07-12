import { TestBed, async } from '@angular/core/testing';
import { InviteFormComponent } from './invite-form.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('InviteFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      declarations: [InviteFormComponent]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(InviteFormComponent);
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
