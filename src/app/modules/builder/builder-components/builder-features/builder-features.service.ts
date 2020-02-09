import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveTemplates, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BuilderService } from '../../builder.service';
import { UtilService } from '../../../../shared/services/util.service';

@Injectable()
export class BuilderFeaturesService {
  featuresHeadingStyle = new BehaviorSubject<Object>({});
  featuresSubheadingStyle = new BehaviorSubject<Object>({});
  featuresStyle = new BehaviorSubject<Object>({});
  featuresTemplate = new BehaviorSubject<string>(null);
  featuresTheme = new BehaviorSubject<string>(null);
  featuresItemArray = new BehaviorSubject<Object>({});
  featuresAlignmentClass = new BehaviorSubject<string>('text-center');
  featuresBreakpoint = new BehaviorSubject<string>(null);

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
        this.featuresBreakpoint.next('small');
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.featuresBreakpoint.next('medium');
      }
      if (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
        this.featuresBreakpoint.next('large');
      }
    });
  }

  getFeaturesThemes(): Observable<any> {
    return this.httpClient.get(this.FEATURES_THEME_PATH);
  }

  setFeaturesTheme(themeId: string, componentId) {
    let response: any;
    let action = componentId + '-theme';
    switch (themeId) {
      case ActiveThemes.Default:
        const message = {
          'name': ActiveThemes.Default
        };
        window.postMessage({ 'for': 'opsonion', 'action': action, 'message': message }, '*');
        break;
      case ActiveThemes.Stanley:
        this.httpClient.get(this.FEATURES_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveThemes.Stanley;
          });
          window.postMessage({ 'for': 'opsonion', 'action': action, 'message': response[0] }, '*');
        });
        break;
      default:
        break;
    }
  }

  setFeaturesTemplate(templateId: string, componentId: string) {
    switch (templateId) {
      case ActiveTemplates.Default:
        this.httpClient.get(this.DEFAULT_TEMPLATE_PATH).subscribe(response => {
          this.setFeaturesThemeStyle(response, componentId);
        });
        break;
      case ActiveTemplates.Quick:
        this.httpClient.get(this.QUICK_TEMPLATE_PATH).subscribe(response => {
          this.setFeaturesThemeStyle(response, componentId);
        });
        break;
      case ActiveTemplates.Front:
        this.httpClient.get(this.FRONT_TEMPLATE_PATH).subscribe(response => {
          this.setFeaturesThemeStyle(response, componentId);
        });
        break;
      default:
        break;
    }
  }

  setFeaturesThemeStyle(theme: any, componentId: string) {
    const action = componentId + '-template';
    if (theme) {
      if (theme['featuresHeadingStyle']) {
        let featuresHeadingStyle = { ...this.featuresHeadingStyle.getValue(), ...theme['featuresHeadingStyle'] };
        this.featuresHeadingStyle.next(featuresHeadingStyle);
      }
      if (theme['featuresSubheadingStyle']) {
        let featuresSubheadingStyle = { ...this.featuresSubheadingStyle.getValue(), ...theme['featuresSubheadingStyle'] };
        this.featuresSubheadingStyle.next(featuresSubheadingStyle);
      }
      if (theme['featuresStyle']) {
        let featuresStyle = { ...this.featuresStyle.getValue(), ...theme['featuresStyle'] };
        this.featuresStyle.next(featuresStyle);
      }
      const message = {
        'featuresStyle': this.featuresStyle.getValue(),
        'featuresHeadingStyle': this.featuresHeadingStyle.getValue(),
        'featuresSubheadingStyle': this.featuresSubheadingStyle.getValue()
      };
      window.postMessage({ 'for': 'opsonion', 'action': action, 'message': message }, '*');
      this.featuresTheme.next(theme['name']);
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

  setNumberOfFeatures(componentId, number: number, orientation: string = null) {
    if (number && !isNaN(number) && number <= 8) {
      let multiplier: number;
      let breakpoint = this.featuresBreakpoint.getValue();
      let showcaseOrientation = orientation || this.builderService.activeOrientation.getValue();
      if (breakpoint == 'small' || showcaseOrientation == 'mobile') {
        multiplier = number * 4;
      } else if (breakpoint == 'medium' || showcaseOrientation == 'tablet') {
        multiplier = number * 1.5;
      } else if (breakpoint == 'large' || showcaseOrientation == 'desktop') {
        multiplier = 1;
      }
      const tempFeaturesItemArray = this.featuresItemArray.getValue();
      const numberOfFeatures = Object.keys(tempFeaturesItemArray).length;
      const width = 100 * multiplier / number + '%';
      let i = 0;
      let featuresItemArray = [{}];
      while (i < Math.floor(number)) {
        if (i < numberOfFeatures) {
          featuresItemArray[i] = (tempFeaturesItemArray[i]);
          i++;
        } else {
          featuresItemArray.push({
            'heading': UtilService.generateRandomWord(),
            'subheading': 'More features? We can\'t say no. Tell the world how great your platform is!'
          });
          i++;
        }
      }
      const message = {
        'featuresItemArray': featuresItemArray,
        'featuresItemWidth': width
      };
      window.postMessage({ 'for': 'opsonion', 'action': componentId + '-item', 'message': message }, '*');
      this.featuresItemArray.next(featuresItemArray);
    }
  }

  setFeaturesHeadingStyle(componentId: string) {
    const action = componentId + '-template';
    const message = {
      'featuresHeadingStyle': this.featuresHeadingStyle.getValue(),
    };
    window.postMessage({ 'for': 'opsonion', 'action': action, 'message': message }, '*');
  }

  setFeaturesSubheadingStyle(componentId: string) {
    const action = componentId + '-template';
    const message = {
      'featuresSubheadingStyle': this.featuresSubheadingStyle.getValue(),
    };
    window.postMessage({ 'for': 'opsonion', 'action': action, 'message': message }, '*');
  }

  setComponentTemplate(templateId) {
    this.featuresTheme.next(ActiveThemes.Default);
    this.featuresTemplate.next(templateId);
  }
}
