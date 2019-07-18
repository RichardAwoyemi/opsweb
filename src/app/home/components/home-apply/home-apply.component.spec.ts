import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeApplyComponent } from './home-apply.component';

describe('HomeApplyComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      declarations: [HomeApplyComponent]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeApplyComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have a title', async(() => {
      expect(document.getElementById('apply-title').innerText).toBe('Want to work?');
    }));

    it('should have a subtitle', async(() => {
      expect(document.getElementById('apply-subtitle').innerText).toBe('Apply today to join our network of top talent');
    }));
  });
});
