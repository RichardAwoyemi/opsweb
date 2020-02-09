import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { ActiveTemplates } from '../../../builder';

@Component({
  selector: 'app-features-options-picker',
  templateUrl: './features-options-picker.component.html',
  styleUrls: ['./features-options-picker.component.css'],
})
export class FeaturesOptionsPickerComponent implements OnInit {
  fontNames: any;
  fontUnits: any;
  featuresStyle: any;
  featuresItemArray: any;
  defaultFeaturesStyle: any;
  featuresTemplate: string;
  featuresHeadingStyle: any;
  featuresHeadingFontName: string = 'Avenir Next Medium';
  featuresHeadingFontSize: number;
  featuresHeadingFontUnit: string = 'px';
  featuresSubheadingStyle: any;
  featuresSubheadingFontName: string = 'Avenir Next Medium';
  featuresSubheadingFontSize: number;
  featuresSubheadingFontUnit: string = 'px';
  websiteChangeCount: number;
  numberOfFeatures: number;
  activeEditComponentId: string;

  private activeEditComponentIdSubscription: Subscription;
  private featuresItemArraySubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private featuresHeadingStyleSubscription: Subscription;
  private featuresSubheadingStyleSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      this.activeEditComponentId = response;
    });

    this.featuresHeadingStyleSubscription = this.builderFeaturesService.featuresHeadingStyle.subscribe(response => {
      this.featuresHeadingStyle = response;
    });

    this.featuresSubheadingStyleSubscription = this.builderFeaturesService.featuresSubheadingStyle.subscribe(response => {
      this.featuresSubheadingStyle = response;
    });

    this.featuresStyleSubscription = this.builderFeaturesService.featuresStyle.subscribe(response => {
      this.featuresStyle = response;
    });

    this.featuresItemArraySubscription = this.builderFeaturesService.featuresItemArray.subscribe(response => {
      this.featuresItemArray = response;
      this.numberOfFeatures = Object.keys(this.featuresItemArray).length;
    });

    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.fontUnitsSubscription = this.builderService.fontUnits.subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(response => {
      if (response) {
        this.featuresTemplate = response;
        this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(this.featuresTemplate).subscribe(response => {
          if (response) {
            this.defaultFeaturesStyle = response;
          }
        });
      } else {
        this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(ActiveTemplates.Default).subscribe(response => {
          if (response) {
            this.defaultFeaturesStyle = response;
          }
        });
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.featuresHeadingStyleSubscription = this.builderFeaturesService.featuresHeadingStyle.subscribe(response => {
      if (response) {
        this.featuresHeadingStyle = response;

        if (this.featuresHeadingStyle['font-size']) {
          if (this.featuresHeadingStyle['font-size'].indexOf('px') > -1) {
            this.featuresHeadingFontSize = this.featuresHeadingStyle['font-size'].replace('px', '');
          }
          if (this.featuresHeadingStyle['font-size'].indexOf('em') > -1) {
            this.featuresHeadingFontSize = this.featuresHeadingStyle['font-size'].replace('em', '');
          }
        }

        const featuresFontNames = this.featuresHeadingStyle['font-family'].split(',');
        this.featuresHeadingFontName = featuresFontNames[0].replace(/'/g, '');
      }
    });

    this.featuresSubheadingStyleSubscription = this.builderFeaturesService.featuresSubheadingStyle.subscribe(response => {
      if (response) {
        this.featuresSubheadingStyle = response;

        if (this.featuresSubheadingStyle['font-size']) {
          if (this.featuresSubheadingStyle['font-size'].indexOf('px') > -1) {
            this.featuresSubheadingFontSize = this.featuresSubheadingStyle['font-size'].replace('px', '');
          }
          if (this.featuresSubheadingStyle['font-size'].indexOf('em') > -1) {
            this.featuresSubheadingFontSize = this.featuresSubheadingStyle['font-size'].replace('em', '');
          }
        }

        const featuresFontNames = this.featuresSubheadingStyle['font-family'].split(',');
        this.featuresSubheadingFontName = featuresFontNames[0].replace(/'/g, '');
      }
    });
  }

  setNumberOfFeatures() {
    this.builderFeaturesService.setNumberOfFeatures(this.activeEditComponentId, this.numberOfFeatures);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetNumberOfFeatures() {
    this.builderFeaturesService.setNumberOfFeatures(this.activeEditComponentId, 3);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesHeadingFontName() {
    this.featuresHeadingStyle['font-family'] = this.defaultFeaturesStyle['featuresHeadingStyle']['font-family'];
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderFeaturesService.setFeaturesHeadingStyle(this.activeEditComponentId);
  }

  resetFeaturesHeadingFontSize() {
    this.featuresHeadingStyle['font-size'] = this.defaultFeaturesStyle['featuresHeadingStyle']['font-size'];
    this.featuresHeadingFontUnit = 'px';
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderFeaturesService.setFeaturesHeadingStyle(this.activeEditComponentId);
  }

  onFeaturesHeadingFontNameChange() {
    this.featuresHeadingStyle['font-family'] = this.featuresHeadingFontName;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderFeaturesService.setFeaturesHeadingStyle(this.activeEditComponentId);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingFontSize() {
    this.featuresHeadingStyle['font-size'] = this.featuresHeadingFontSize + this.featuresHeadingFontUnit;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFeaturesHeadingFontUnitChange() {
    if (this.featuresHeadingFontUnit == 'em') {
      if (this.featuresHeadingFontSize < 16) {
        this.featuresHeadingFontSize = 16;
      }
      this.featuresHeadingFontSize = Math.round(this.featuresHeadingFontSize / 16);
    }

    if (this.featuresHeadingFontUnit == 'px') {
      this.featuresHeadingFontSize = Math.round(this.featuresHeadingFontSize * 16);
    }

    this.featuresHeadingStyle['font-size'] = this.featuresHeadingFontSize + this.featuresHeadingFontUnit;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesSubheadingFontName() {
    this.featuresSubheadingStyle['font-family'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['font-family'];
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderFeaturesService.setFeaturesSubheadingStyle(this.activeEditComponentId);
  }

  resetFeaturesSubheadingFontSize() {
    this.featuresSubheadingStyle['font-size'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['font-size'];
    this.featuresSubheadingFontUnit = 'px';
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
  }

  onFeaturesSubheadingFontNameChange() {
    this.featuresSubheadingStyle['font-family'] = this.featuresSubheadingFontName;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderFeaturesService.setFeaturesSubheadingStyle(this.activeEditComponentId);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingFontSize() {
    this.featuresSubheadingStyle['font-size'] = this.featuresSubheadingFontSize + this.featuresSubheadingFontUnit;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFeaturesSubheadingFontUnitChange() {
    if (this.featuresSubheadingFontUnit == 'em') {
      if (this.featuresSubheadingFontSize < 16) {
        this.featuresSubheadingFontSize = 16;
      }
      this.featuresSubheadingFontSize = Math.round(this.featuresSubheadingFontSize / 16);
    }

    if (this.featuresSubheadingFontUnit == 'px') {
      this.featuresSubheadingFontSize = Math.round(this.featuresSubheadingFontSize * 16);
    }

    this.featuresSubheadingStyle['font-size'] = this.featuresSubheadingFontSize + this.featuresSubheadingFontUnit;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy() {
    this.featuresHeadingStyleSubscription.unsubscribe();
    this.featuresSubheadingStyleSubscription.unsubscribe();
    this.featuresStyleSubscription.unsubscribe();
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
