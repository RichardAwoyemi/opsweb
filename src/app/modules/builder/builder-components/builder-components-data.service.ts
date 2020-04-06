import { Injectable } from '@angular/core';
import { BuilderComponentsService } from './builder-components.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Injectable()
export class BuilderComponentsDataService {
  constructor(
    private builderComponentsService: BuilderComponentsService,
  ) {
  }

  // noinspection JSUnusedGlobalSymbols
  static getAdditionalFeaturesDetails(): any {
    return {
      'featuresItemArray': [
        {
          'heading': UtilService.generateRandomWord(),
          'subheading': 'Building a website has never been easier than this! Get started today, free of cost.'
        },
        {
          'heading': UtilService.generateRandomWord(),
          'subheading': 'Make our amazing library of templates and themes your own with our extensive range of custom options.'
        },
        {
          'heading': UtilService.generateRandomWord(),
          'subheading': 'Grow with ease and whilst receiving useful analytics. Just what you need to blossom.'
        }
      ]
    };
  }

  // noinspection JSUnusedGlobalSymbols
  getAdditionalNavbarDetails(pageComponents = null): any {
    let pages = {};
    (pageComponents == null) ? pages = this.builderComponentsService.pageComponents.getValue() : pages = pageComponents;
    const navbarMenuOptions = [];
    for (let i = 0; i < pages['pages'].length; i++) {
      navbarMenuOptions.push(pages['pages'][i]['name']);
    }
    return { 'navbarMenuOptions': navbarMenuOptions };
  }
}
