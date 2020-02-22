import { Component, OnDestroy, OnInit } from '@angular/core';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { Subscription } from 'rxjs';
import { ActiveTemplates } from '../../../builder';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';

@Component({
  selector: 'app-features-layout-picker',
  templateUrl: './features-layout-picker.component.html',
  styleUrls: ['./features-layout-picker.component.css']
})
export class FeaturesLayoutPickerComponent implements OnInit, OnDestroy {
  featuresPaddingTop: number;
  featuresPaddingLeft: number;
  featuresPaddingRight: number;
  featuresPaddingBottom: number;
  featuresHeadingPaddingTop: number;
  featuresHeadingPaddingLeft: number;
  featuresHeadingPaddingRight: number;
  featuresHeadingPaddingBottom: number;
  featuresSubheadingPaddingTop: number;
  featuresSubheadingPaddingLeft: number;
  featuresSubheadingPaddingRight: number;
  featuresSubheadingPaddingBottom: number;
  featuresAlignmentClass: string;
  featuresHeadingStyle: any;
  featuresSubheadingStyle: any;
  featuresStyle: any;
  featuresTemplate: any = ActiveTemplates.Default;
  defaultFeaturesStyle: any;
  pageComponents: any;
  activeComponentId: string;
  websiteChangeCount: number;

  private featuresHeadingStyleSubscription: Subscription;
  private featuresSubheadingStyleSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private featuresAlignmentClassSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;
  private activeComponentIdSubscription: Subscription;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.activeComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeComponentId = response;
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(featuresTemplateResponse => {
      this.featuresTemplate = featuresTemplateResponse;

      this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(this.featuresTemplate).subscribe(response => {
        if (response) {
          this.defaultFeaturesStyle = response;
        }
      });
    });

    this.featuresAlignmentClassSubscription = this.builderFeaturesService.featuresAlignmentClass.subscribe(response => {
      this.featuresAlignmentClass = response;
    });

    this.featuresHeadingStyleSubscription = this.builderFeaturesService.featuresHeadingStyle.subscribe(response => {
      if (response) {
        this.featuresHeadingStyle = response;
        if (this.featuresHeadingStyle['padding-top']) {
          this.featuresHeadingPaddingTop = this.featuresHeadingStyle['padding-top'].replace('px', '');
        }
        if (this.featuresHeadingStyle['padding-left']) {
          this.featuresHeadingPaddingLeft = this.featuresHeadingStyle['padding-left'].replace('px', '');
        }
        if (this.featuresHeadingStyle['padding-right']) {
          this.featuresHeadingPaddingRight = this.featuresHeadingStyle['padding-right'].replace('px', '');
        }
        if (this.featuresHeadingStyle['padding-bottom']) {
          this.featuresHeadingPaddingBottom = this.featuresHeadingStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.featuresSubheadingStyleSubscription = this.builderFeaturesService.featuresSubheadingStyle.subscribe(response => {
      if (response) {
        this.featuresSubheadingStyle = response;
        if (this.featuresSubheadingStyle['padding-top']) {
          this.featuresSubheadingPaddingTop = this.featuresSubheadingStyle['padding-top'].replace('px', '');
        }
        if (this.featuresSubheadingStyle['padding-left']) {
          this.featuresSubheadingPaddingLeft = this.featuresSubheadingStyle['padding-left'].replace('px', '');
        }
        if (this.featuresSubheadingStyle['padding-right']) {
          this.featuresSubheadingPaddingRight = this.featuresSubheadingStyle['padding-right'].replace('px', '');
        }
        if (this.featuresSubheadingStyle['padding-bottom']) {
          this.featuresSubheadingPaddingBottom = this.featuresSubheadingStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.featuresStyleSubscription = this.builderFeaturesService.featuresStyle.subscribe(response => {
      if (response) {
        this.featuresStyle = response;
        if (this.featuresStyle['padding-top']) {
          this.featuresPaddingTop = this.featuresStyle['padding-top'].replace('px', '');
        }
        if (this.featuresStyle['padding-left']) {
          this.featuresPaddingLeft = this.featuresStyle['padding-left'].replace('px', '');
        }
        if (this.featuresStyle['padding-right']) {
          this.featuresPaddingRight = this.featuresStyle['padding-right'].replace('px', '');
        }
        if (this.featuresStyle['padding-bottom']) {
          this.featuresPaddingBottom = this.featuresStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setFeaturesHeadingPaddingTop() {
    this.featuresHeadingStyle['padding-top'] = `${this.featuresHeadingPaddingTop}px`;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingPaddingLeft() {
    this.featuresHeadingStyle['padding-left'] = `${this.featuresHeadingPaddingLeft}px`;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingPaddingRight() {
    this.featuresHeadingStyle['padding-right'] = `${this.featuresHeadingPaddingRight}px`;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingPaddingBottom() {
    this.featuresHeadingStyle['padding-bottom'] = `${this.featuresHeadingPaddingBottom}px`;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesHeadingPaddingStyle() {
    this.featuresHeadingStyle['padding-top'] = this.defaultFeaturesStyle['featuresHeadingStyle']['padding-top'];
    this.featuresHeadingStyle['padding-left'] = this.defaultFeaturesStyle['featuresHeadingStyle']['padding-left'];
    this.featuresHeadingStyle['padding-right'] = this.defaultFeaturesStyle['featuresHeadingStyle']['padding-right'];
    this.featuresHeadingStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresHeadingStyle']['padding-bottom'];
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
  }

  setFeaturesSubheadingPaddingTop() {
    this.featuresSubheadingStyle['padding-top'] = `${this.featuresSubheadingPaddingTop}px`;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingPaddingLeft() {
    this.featuresSubheadingStyle['padding-left'] = `${this.featuresSubheadingPaddingLeft}px`;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingPaddingRight() {
    this.featuresSubheadingStyle['padding-right'] = `${this.featuresSubheadingPaddingRight}px`;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingPaddingBottom() {
    this.featuresSubheadingStyle['padding-bottom'] = `${this.featuresSubheadingPaddingBottom}px`;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesSubheadingPaddingStyle() {
    this.featuresSubheadingStyle['padding-top'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['padding-top'];
    this.featuresSubheadingStyle['padding-left'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['padding-left'];
    this.featuresSubheadingStyle['padding-right'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['padding-right'];
    this.featuresSubheadingStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['padding-bottom'];
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
  }

  setFeaturesPaddingTop() {
    this.featuresStyle['padding-top'] = `${this.featuresPaddingTop}px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesPaddingLeft() {
    this.featuresStyle['padding-left'] = `${this.featuresPaddingLeft}px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesPaddingRight() {
    this.featuresStyle['padding-right'] = `${this.featuresPaddingRight}px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesPaddingBottom() {
    this.featuresStyle['padding-bottom'] = `${this.featuresPaddingBottom}px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesPaddingStyle() {
    this.featuresStyle['padding-top'] = this.defaultFeaturesStyle['featuresStyle']['padding-top'];
    this.featuresStyle['padding-left'] = this.defaultFeaturesStyle['featuresStyle']['padding-left'];
    this.featuresStyle['padding-right'] = this.defaultFeaturesStyle['featuresStyle']['padding-right'];
    this.featuresStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresStyle']['padding-bottom'];
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  setFeaturesHeadingPosition(alignment: string) {
    this.featuresHeadingStyle['text-align'] = alignment;
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
  }

  setFeaturesSubheadingPosition(alignment: string) {
    this.featuresSubheadingStyle['text-align'] = alignment;
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
  }

  setChanges() {
    const timestamp = new Date().getTime();
    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
        if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeComponentId) {
          this.pageComponents['pages'][i]['components'][j]['timestamp'] = timestamp;
          this.pageComponents['pages'][i]['components'][j]['featuresStyle'] = this.featuresStyle;
          this.pageComponents['pages'][i]['components'][j]['featuresHeadingStyle'] = this.featuresHeadingStyle;
          this.pageComponents['pages'][i]['components'][j]['featuresSubheadingStyle'] = this.featuresSubheadingStyle;
        }
      }
    }
    this.builderComponentsService.pageComponents.next(this.pageComponents);
  }

  ngOnDestroy() {
    this.setChanges();
    this.featuresHeadingStyleSubscription.unsubscribe();
    this.featuresSubheadingStyleSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
    this.featuresStyleSubscription.unsubscribe();
    this.featuresAlignmentClassSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    this.defaultFeaturesStyleSubscription.unsubscribe();
  }
}
