import { TestBed, async } from '@angular/core/testing';
import { HomeFeatureCardComponent } from './home-feature-card.component';

describe('HomeFeatureCardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFeatureCardComponent]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeFeatureCardComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should have a title and subtitle', async(() => {
      app.title = 'Test title';
      app.description = 'Test subtitle';
      fixture.detectChanges();
      expect(document.getElementById('featureCardTitle').innerText).toBe(app.title);
      expect(document.getElementById('featureCardDescription').innerText).toBe(app.description);
    }));
  });
});
