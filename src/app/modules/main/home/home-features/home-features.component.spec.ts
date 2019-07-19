import { async, TestBed } from '@angular/core/testing';
import { HomeFeaturesComponent } from './home-features.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UtilService } from 'src/app/shared/services/util.service';
import { LoggerModule, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { environment } from 'src/environments/environment';

describe('HomeFeaturesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFeaturesComponent],
      imports: [
        LoggerModule.forRoot(environment.logging)
      ],
      providers: [
        UtilService,
        NGXLogger,
        NGXLoggerHttpService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));
  describe(':', () => {
    let fixture, app;

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeFeaturesComponent);
      app = fixture.debugElement.componentInstance;
    });

    afterEach(() => {
      fixture.destroy();
      app = null;
    });

    it('should create the component', async(() => {
      expect(app).toBeTruthy();
    }));

    it('should display features', async(() => {
      app.features = [
        {
          'title': 'Test feature 1',
          'description': 'Test description 1',
          'image': 'assets/img/talent.svg',
          'delay': 0
        },
        {
          'title': 'Test feature 2',
          'description': 'Test description 2',
          'image': 'assets/img/talent.svg',
          'delay': 1000
        },
        {
          'title': 'Test feature 3',
          'description': 'Test description 3',
          'image': 'assets/img/talent.svg',
          'delay': 2000
        }
      ];
      fixture.detectChanges();
      const featureCards = fixture.debugElement.queryAll(By.css('.feature-card'));
      expect(featureCards.length).toEqual(3);
      expect(featureCards[0].nativeElement.innerHTML).toContain(app.features[0].title);
      expect(featureCards[1].nativeElement.innerHTML).toContain(app.features[1].title);
      expect(featureCards[2].nativeElement.innerHTML).toContain(app.features[2].title);
    }));

    it('should display secondary features heading', async(() => {
      app.secondaryFeaturesSubheading = 'Test secondary features heading';
      app.secondaryFeaturesSubheading = 'Test secondary features subheading';
      fixture.detectChanges();
      expect(document.getElementById('secondaryFeaturesHeading').innerText).toBe(app.secondaryFeaturesHeading);
      expect(document.getElementById('secondaryFeaturesSubheading').innerText).toBe(app.secondaryFeaturesSubheading);
    }));
  });
});
