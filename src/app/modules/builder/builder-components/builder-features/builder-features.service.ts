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

  setNumberOfFeatures(activeEditComponentId: string, number: number, orientation: string = null) {
    const componentIndexArray = this.builderComponentsService.getActiveTargetComponentById(activeEditComponentId);
    const tempFeaturesItemArray = this.builderComponentsService.pageComponents.getValue()['pages'][componentIndexArray.activePageIndex]['components'][componentIndexArray.activeComponentIndex]['featuresItemArray'];
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
      this.builderComponentsService.setPageComponentById(activeEditComponentId, 'featuresItemArray', featuresItemArray);
      this.builderComponentsService.setPageComponentById(activeEditComponentId, 'featuresWidth', width);
    }
  }

  setFeaturesWidth(orientation: string = null) {
    const featureComponents = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector.Features);
    const pageComponents = this.builderComponentsService.pageComponents.getValue();
    if (featureComponents.length > 0) {
      for (let i = 0; i < featureComponents.length; i++) {
        const activePageIndex = featureComponents[i]['activePageIndex'];
        const activeComponentIndex = featureComponents[i]['activeComponentIndex'];
        const component = pageComponents['pages'][activePageIndex]['components'][activeComponentIndex];
        const componentId = component['componentId'];
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
