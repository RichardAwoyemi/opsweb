import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features-options-picker',
  templateUrl: './features-options-picker.component.html',
  styleUrls: ['./features-options-picker.component.css'],
})
export class FeaturesOptionsPickerComponent implements OnInit {
  fontNames: any;
  fontUnits: any;
  featuresHeaderStyle: any;
  featuresSubheaderStyle: any;
  featuresStyle: any;
  featuresItemArray: any;
  featuresCopyrightFontSize: number;
  defaultFeaturesStyle: any;
  featuresTemplate: string;
  featuresFont: string = 'Avenir Next Regular';
  featuresHeaderFontSize: string = '20';
  featuresSubheaderFontSize: string = '14';
  websiteChangeCount: number;
  numberOfFeatures: number;

  private featuresItemArraySubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private featuresHeaderStyleSubscription: Subscription;
  private featuresSubheaderStyleSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
  ) {
  }

  ngOnInit() {

    this.featuresHeaderStyleSubscription = this.builderFeaturesService.featuresHeaderStyle.subscribe(response => {
      this.featuresHeaderStyle = response;
    });

    this.featuresSubheaderStyleSubscription = this.builderFeaturesService.featuresSubheaderStyle.subscribe(response => {
      this.featuresSubheaderStyle = response;
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
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setNumberOfFeatures() {
    this.builderFeaturesService.adjustFeatureCount(this.numberOfFeatures);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFeaturesFontChange(parameterName: string, parameter: any, isHeader: boolean = true, isSubheader: boolean = true) {
    if (isHeader) {
      this.featuresHeaderStyle[parameterName] = parameter;
      this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
      this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
    }

    if (isSubheader) {
      this.featuresSubheaderStyle[parameterName] = parameter;
      this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
      this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
    }
  }

  resetFeatureFontSize(){
    this.featuresHeaderStyle['font-size'] = this.defaultFeaturesStyle['featuresHeaderStyle']['font-size'];
    this.featuresSubheaderStyle['font-size'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['font-size'];
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  resetFeaturesFontName() {
    this.featuresHeaderStyle['font-family'] = this.defaultFeaturesStyle['featuresHeaderStyle']['font-family'];
    this.featuresSubheaderStyle['font-family'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['font-family'];
    const featuresFont = this.featuresHeaderStyle['font-family'].split(','); //header assumed to be the same
    this.featuresFont = featuresFont[0].replace(/'/g, '');
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  ngOnDestroy() {
    this.featuresHeaderStyleSubscription.unsubscribe();
    this.featuresSubheaderStyleSubscription.unsubscribe();
    this.featuresStyleSubscription.unsubscribe();
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    this.defaultFeaturesStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
