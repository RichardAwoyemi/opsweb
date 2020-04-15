import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponentsPartialSelector } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';

@Injectable()
export class BuilderFeaturesService {
  private FEATURES_THEME_PATH = './assets/data/web-themes/features.json';

  constructor(
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService
  ) {
  }

  getFeaturesThemes(): Observable<any> {
    return this.httpClient.get(this.FEATURES_THEME_PATH);
  }

  setNumberOfFeatures(activeEditComponentId: string, number: number) {
    const componentIndexArray = this.builderComponentsService.getActiveTargetComponentById(activeEditComponentId);
    const tempFeaturesItemArray = this.builderComponentsService.pageComponents.getValue()['pages'][componentIndexArray.activePageIndex]['components'][componentIndexArray.activeComponentIndex]['featuresItemArray'];
    if (number && !isNaN(number) && number <= 8) {
      let multiplier: number;
      const breakpoint = this.builderService.activeScreenSize.getValue();
      const showcaseOrientation = this.builderService.activeOrientation.getValue();
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

  setFeaturesWidth() {
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
        const breakpoint = this.builderService.activeScreenSize.getValue();
        const showcaseOrientation = this.builderService.activeOrientation.getValue();
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
