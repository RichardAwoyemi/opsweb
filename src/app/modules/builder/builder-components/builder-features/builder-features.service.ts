import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BuilderService } from '../../builder.service';
import { UtilService } from '../../../../shared/services/util.service';
import { BuilderComponentsService } from '../builder-components.service';

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

  private FEATURES_THEME_PATH = './assets/data/web-themes/features.json';

  constructor(
    private httpClient: HttpClient,
    private breakpointObserver: BreakpointObserver,
    private builderComponentsService: BuilderComponentsService,
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
    switch (themeId) {
      case ActiveThemes.Default:
        this.setFeaturesThemeStyle(themeId, componentId);
        break;
      case ActiveThemes.Stanley:
        this.httpClient.get(this.FEATURES_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name === ActiveThemes.Stanley;
          });
          this.setFeaturesThemeStyle(response[0], componentId);
        });
        break;
      default:
        break;
    }
  }

  setFeaturesThemeStyle(theme: any, componentId: string) {
    if (theme) {
      if (theme['featuresHeadingStyle']) {
        const featuresHeadingStyle = { ...this.featuresHeadingStyle.getValue(), ...theme['featuresHeadingStyle'] };
        this.builderComponentsService.setPageComponentById(componentId, 'featuresHeadingStyle', featuresHeadingStyle);
        this.featuresHeadingStyle.next(featuresHeadingStyle);
      }
      if (theme['featuresSubheadingStyle']) {
        const featuresSubheadingStyle = { ...this.featuresSubheadingStyle.getValue(), ...theme['featuresSubheadingStyle'] };
        this.builderComponentsService.setPageComponentById(componentId, 'featuresSubheadingStyle', featuresSubheadingStyle);
        this.featuresSubheadingStyle.next(featuresSubheadingStyle);
      }
      if (theme['featuresStyle']) {
        const featuresStyle = { ...this.featuresStyle.getValue(), ...theme['featuresStyle'] };
        this.builderComponentsService.setPageComponentById(componentId, 'featuresStyle', featuresStyle);
        this.featuresStyle.next(featuresStyle);
      }
      this.builderComponentsService.setPageComponentById(componentId, 'featuresTheme', theme['name']);
      this.featuresTheme.next(theme['name']);
    }
  }

  setNumberOfFeatures(componentId, number: number, orientation: string = null) {
    if (number && !isNaN(number) && number <= 8) {
      let multiplier: number;
      const breakpoint = this.featuresBreakpoint.getValue();
      const showcaseOrientation = orientation || this.builderService.activeOrientation.getValue();
      if (breakpoint === 'small' || showcaseOrientation === 'mobile') {
        multiplier = number * 4;
      } else if (breakpoint === 'medium' || showcaseOrientation === 'tablet') {
        multiplier = 1;
      } else if (breakpoint === 'large' || showcaseOrientation === 'desktop') {
        multiplier = 1;
      }
      const tempFeaturesItemArray = this.featuresItemArray.getValue();
      const numberOfFeatures = Object.keys(tempFeaturesItemArray).length;
      const width = 100 * multiplier / number + '%';
      let i = 0;
      const featuresItemArray = [{}];
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
      return {
        'array': featuresItemArray,
        'width': width,
      };
    }
  }

  setFeaturesWidth(orientation: string = null, providedComponentId = null) {
    const featureComponents = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector.Features);
    const pageComponents = this.builderComponentsService.pageComponents.getValue();
    if (featureComponents.length > 0) {
      for (let i = 0; i < featureComponents.length; i++) {
        const activePageIndex = featureComponents[i]['activePageIndex'];
        const activeComponentIndex = featureComponents[i]['activeComponentIndex'];
        const component = pageComponents['pages'][activePageIndex]['components'][activeComponentIndex];
        const componentId = providedComponentId || component['componentId'];
        const number = component['featuresItemArray'].length;

        let multiplier: number;
        const breakpoint = this.featuresBreakpoint.getValue();
        const showcaseOrientation = orientation || this.builderService.activeOrientation.getValue();
        if (breakpoint === 'small' || showcaseOrientation === 'mobile') {
          multiplier = number * 4;
        } else if (breakpoint === 'medium' || showcaseOrientation === 'tablet') {
          multiplier = 1;
        } else if (breakpoint === 'large' || showcaseOrientation === 'desktop') {
          multiplier = 1;
        }

        const featuresWidth = 100 * multiplier / number + '%';
        this.builderComponentsService.setPageComponentById(componentId, 'featuresWidth', featuresWidth);
      }
    }
  }
}
