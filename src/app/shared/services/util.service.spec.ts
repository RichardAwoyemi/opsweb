import { UtilService } from './util.service';
import { TestBed, inject } from '@angular/core/testing';
import { NGXLogger, NGXLoggerHttpService, LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment';

describe('UtilService unit tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerModule.forRoot(environment.logging)
      ],
      providers: [
        UtilService,
        NGXLogger,
        NGXLoggerHttpService
      ]
    });
  });

  describe('toTitleCase()', () => {
    it('should return name in title case',
      inject([UtilService], (utilService) => {
        let name = 'priscilla';
        let formattedName = utilService.toTitleCase(name);
        expect(formattedName).toEqual('Priscilla');

        name = 'JOHN';
        formattedName = utilService.toTitleCase(name);
        expect(formattedName).toEqual('John');

        name = 'SaM    ';
        formattedName = utilService.toTitleCase(name);
        expect(formattedName).toEqual('Sam');

        name = '    RiChArD    ';
        formattedName = utilService.toTitleCase(name);
        expect(formattedName).toEqual('Richard');
      })
    );
  });

  describe('generateRandomString()', () => {
    it('should return a random string',
      inject([UtilService], (utilService) => {
        const random = utilService.generateRandomString(8);
        expect(random.length).toEqual(8);
      })
    );
  });

  describe('createYearRange()', () => {
    it('should return a range of years',
      inject([UtilService], (utilService) => {
        const years = utilService.createYearRange('2000', '2019');
        expect(years.length).toEqual(20);
        expect(years[0]).toEqual(2000);
        expect(years[10]).toEqual(2010);
        expect(years[19]).toEqual(2019);
      })
    );
  });

  describe('getAppStoreLink()', () => {
    it('should return the mobile app URL',
      inject([UtilService], (utilService) => {
        const iosURL = utilService.getAppStoreLink('Mozilla/5.0 (iPhone; CPU iPhone OS 6_1_4 like Mac OS X)' +
        'AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B350 Safari/8536.25');
        const androidURL = utilService.getAppStoreLink('Mozilla/5.0 (Linux; Android 6.0.1; SM-G532G Build/MMB29T)' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.83 Mobile Safari/537.36');
        expect(iosURL).toEqual(utilService.IOS_APP_URL);
        expect(androidURL).toEqual(utilService.ANDROID_APP_URL);
      })
    );
  });
});
