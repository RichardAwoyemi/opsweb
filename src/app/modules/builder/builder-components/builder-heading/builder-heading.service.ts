import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveHeadingThemes, ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BuilderService } from '../../builder.service';

@Injectable()
export class BuilderHeadingService {
  headingHeaderStyle = new BehaviorSubject<Object>({});
  headingSubheaderStyle = new BehaviorSubject<Object>({});
  headingStyle = new BehaviorSubject<Object>({});
  headingTemplate = new BehaviorSubject<string>(null);
  headingTheme = new BehaviorSubject<string>(null);
  headingContainerClass = new BehaviorSubject<string>(null);
  headingContainerStyle = new BehaviorSubject<string>(null);
  headingItemArray = new BehaviorSubject<Object>({});
  headingAlignmentClass = new BehaviorSubject<string>('text-center');
  headingSocialLinksContainerStyle = new BehaviorSubject<Object>(null);
  headingSocialLinksStyle = new BehaviorSubject<Object>(null);
  headingPageLinksStyle = new BehaviorSubject<Object>(null);
  headingCopyrightStyle = new BehaviorSubject<Object>(null);
  headingMenuOptions = new BehaviorSubject<Object>(null);
  headingComponentLayout = new BehaviorSubject<number>(0);
  facebookUrl = new BehaviorSubject<string>(null);
  twitterUrl = new BehaviorSubject<string>(null);
  instagramUrl = new BehaviorSubject<string>(null);
  youtubeUrl = new BehaviorSubject<string>(null);
  githubUrl = new BehaviorSubject<string>(null);
  linkedinUrl = new BehaviorSubject<string>(null);
  breakpoint = new BehaviorSubject<string>(null);

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private FEATURES_THEME_PATH = './assets/data/web-themes/heading.json';

  constructor(
    private httpClient: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private builderService: BuilderService
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small] || result.breakpoints[Breakpoints.Handset]) {
        this.breakpoint.next('small');
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.breakpoint.next('medium');
      }
      if (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
        this.breakpoint.next('large');
      }
    });
  }

  getHeadingThemes(): Observable<any> {
    return this.httpClient.get(this.FEATURES_THEME_PATH);
  }

  setHeadingTheme(themeId: string, componentId: string) {
    let response: any;
    switch (themeId) {
      case ActiveHeadingThemes.Default:
        this.builderService.postMessage('update-feature', '', 'set-heading-theme', this.headingTemplate.getValue());
        break;
      case ActiveHeadingThemes.Stanley:
        this.httpClient.get(this.FEATURES_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveHeadingThemes.Stanley;
          });
          this.builderService.postMessage('update-feature', componentId, 'set-heading-theme', response[0]);
        });
        break;
      default:
        break;
    }
  }

  getDefaultHeadingStyle(templateId): Observable<any> {
    switch (templateId) {
      case ActiveTemplates.Default:
        return this.httpClient.get(this.DEFAULT_TEMPLATE_PATH);
      case ActiveTemplates.Quick:
        return this.httpClient.get(this.QUICK_TEMPLATE_PATH);
      case ActiveTemplates.Front:
        return this.httpClient.get(this.FRONT_TEMPLATE_PATH);
      default:
        return this.httpClient.get(this.DEFAULT_TEMPLATE_PATH);
    }
  }


  adjustFeatureCount(number, orientation: string = null) {
    if (number && !isNaN(number) && number <= 8) {
      let multiplier: number;
      let breakpoint = this.breakpoint.getValue();
      let showcaseOrientation = orientation || this.builderService.activeOrientation.getValue();
      if (breakpoint == 'small' || showcaseOrientation == 'mobile') { multiplier = 4 } else
      if (breakpoint == 'medium' || showcaseOrientation == 'tablet') { multiplier = 1.5 } else
      if (breakpoint == 'large' || showcaseOrientation == 'desktop') { multiplier = 1 };
      const originalHeadingItemArray = this.headingItemArray.getValue();
      const currentFeatureCount = Object.keys(originalHeadingItemArray).length;
      let headingStyle = this.headingStyle.getValue();
      const width = 100 * multiplier / number + '%';
      let i = 0;
      let headingItemArray = [{}];
      while (i < Math.floor(number)) {
        if (i < currentFeatureCount) {
          headingItemArray[i] = (originalHeadingItemArray[i]);
          i++;
        } else {
          headingItemArray.push({
            'header': 'Extra',
            'subheader': 'If you want more heading, how could we ever say no to you? Tell \'em how great your platform is!'
          });
          i++;
        }
      }
      this.headingItemArray.next(headingItemArray);
      headingStyle['width'] = width;
      this.headingStyle.next(headingStyle);
    }
  }

  setComponentTemplate(templateId) {
    this.headingTheme.next(ActiveHeadingThemes.Default);
    this.headingTemplate.next(templateId);
  }

}
