import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerModule, NGXLogger, NGXLoggerHttpService } from 'ngx-logger';
import { UtilService } from 'src/app/shared/services/util.service';
import { environment } from 'src/environments/environment';
import { HomeFooterComponent } from './home-footer.component';

describe('HomeFooterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFooterComponent],
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
