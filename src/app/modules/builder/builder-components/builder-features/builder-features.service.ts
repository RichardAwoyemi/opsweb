import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveFeaturesThemes, ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BuilderService } from '../../builder.service';

@Injectable()
export class BuilderFeaturesService {
  featuresHeaderStyle = new BehaviorSubject<Object>({});
  featuresSubheaderStyle = new BehaviorSubject<Object>({});
  featuresStyle = new BehaviorSubject<Object>({});
  featuresTemplate = new BehaviorSubject<string>(null);
  featuresTheme = new BehaviorSubject<string>(null);
  featuresContainerClass = new BehaviorSubject<string>(null);
  featuresContainerStyle = new BehaviorSubject<string>(null);
  featuresItemArray = new BehaviorSubject<Object>({});
  featuresAlignmentClass = new BehaviorSubject<string>('text-center');
  featuresSocialLinksContainerStyle = new BehaviorSubject<Object>(null);
  featuresSocialLinksStyle = new BehaviorSubject<Object>(null);
  featuresPageLinksStyle = new BehaviorSubject<Object>(null);
  featuresCopyrightStyle = new BehaviorSubject<Object>(null);
  featuresMenuOptions = new BehaviorSubject<Object>(null);
  featuresComponentLayout = new BehaviorSubject<number>(0);
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
  private FEATURES_THEME_PATH = './assets/data/web-themes/features.json';

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

  getFeaturesThemes(): Observable<any> {
    return this.httpClient.get(this.FEATURES_THEME_PATH);
  }

  setFeaturesTheme(themeId: string, componentId: string) {
    let response: any;
    switch (themeId) {
      case ActiveFeaturesThemes.Default:
        this.builderService.postMessage('update-feature', '', 'set-features-theme', this.featuresTemplate.getValue());
        break;
      case ActiveFeaturesThemes.Stanley:
        this.httpClient.get(this.FEATURES_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveFeaturesThemes.Stanley;
          });
          this.builderService.postMessage('update-feature', componentId, 'set-features-theme', response[0]);
        });
        break;
      default:
        break;
    }
  }

  getDefaultFeaturesStyle(templateId): Observable<any> {
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
      const originalFeaturesItemArray = this.featuresItemArray.getValue();
      const currentFeatureCount = Object.keys(originalFeaturesItemArray).length;
      let featuresStyle = this.featuresStyle.getValue();
      const width = 100 * multiplier / number + '%';
      let i = 0;
      let featuresItemArray = [{}];
      while (i < Math.floor(number)) {
        if (i < currentFeatureCount) {
          featuresItemArray[i] = (originalFeaturesItemArray[i]);
          i++;
        } else {
          featuresItemArray.push({
            'header': 'Extra',
            'subheader': 'If you want more features, how could we ever say no to you? Tell \'em how great your platform is!'
          });
          i++;
        }
      }
      this.featuresItemArray.next(featuresItemArray);
      featuresStyle['width'] = width;
      this.featuresStyle.next(featuresStyle);
    }
  }

  setComponentTemplate(templateId) {
    this.featuresTheme.next(ActiveFeaturesThemes.Default);
    this.featuresTemplate.next(templateId);
  }

}
