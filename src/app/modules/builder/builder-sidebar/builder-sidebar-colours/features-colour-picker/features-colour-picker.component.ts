import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';

@Component({
  selector: 'app-features-colour-picker',
  templateUrl: './features-colour-picker.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeaturesColourPickerComponent implements OnInit, OnDestroy {
  featuresThemes: any;
  defaultFeaturesStyle: any;
  featuresStyle: any;
  featuresHeadingStyle: any;
  featuresSubheadingStyle: any;
  pageComponents: any;
  featuresTemplate: string;
  featuresTheme: string;
  websiteChangeCount: number;
  activeComponentId: string;
  activePageSetting: string;

  private featureStyleSubscription: Subscription;
  private featureHeadingStyleSubscription: Subscription;
  private featureSubheadingStyleSubscription: Subscription;
  private featuresThemesSubscription: Subscription;
  private featuresThemeSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private activeComponentIdSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

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

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(response => {
      if (response) {
        this.activePageSetting = response;
      }
    });

    this.featureStyleSubscription = this.builderFeaturesService.featuresStyle.subscribe(response => {
      if (response) {
        this.featuresStyle = response;
      }
    });

    this.featureHeadingStyleSubscription = this.builderFeaturesService.featuresHeadingStyle.subscribe(response => {
      if (response) {
        this.featuresHeadingStyle = response;
      }
    });

    this.featureSubheadingStyleSubscription = this.builderFeaturesService.featuresSubheadingStyle.subscribe(response => {
      if (response) {
        this.featuresSubheadingStyle = response;
      }
    });

    this.featuresThemeSubscription = this.builderFeaturesService.featuresTheme.subscribe(response => {
      if (response) {
        this.featuresTheme = response;
      } else {
        this.featuresTheme = ActiveThemes.Default;
      }
    });

    this.featuresThemesSubscription = this.builderFeaturesService.getFeaturesThemes().subscribe(response => {
      if (response) {
        this.featuresThemes = response;
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(featuresTemplateResponse => {
      if (featuresTemplateResponse) {
        this.featuresTemplate = featuresTemplateResponse;
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

  onThemeChange() {
    if (this.featuresTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderFeaturesService.featuresTheme.next(this.featuresTheme);
      this.builderFeaturesService.setFeaturesTheme(this.featuresTheme, this.activeComponentId);
    }
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesStyle() {
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingStyle() {
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingStyle() {
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderFeaturesService.featuresTheme.next(ActiveThemes.Default);
    this.featuresStyle['background-color'] = this.defaultFeaturesStyle['featuresStyle']['background-color'];
    this.featuresHeadingStyle['color'] = this.defaultFeaturesStyle['featuresHeadingStyle']['color'];
    this.featuresSubheadingStyle['color'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['color'];
    this.setFeaturesStyle();
    this.setFeaturesHeadingStyle();
    this.setFeaturesSubheadingStyle();
    this.builderFeaturesService.setFeaturesTheme(ActiveThemes.Default, this.activeComponentId);
  }

  setChanges() {
    const timestamp = new Date().getTime();
    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
        if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeComponentId) {
          this.pageComponents['pages'][i]['components'][j]['timestamp'] = timestamp;
          this.pageComponents['pages'][i]['components'][j]['featuresTheme'] = this.featuresTheme;
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
    this.featuresThemesSubscription.unsubscribe();
    this.featuresThemeSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    if (this.defaultFeaturesStyleSubscription) {
      this.defaultFeaturesStyleSubscription.unsubscribe();
    }
    this.websiteChangeCountSubscription.unsubscribe();
    this.activeComponentIdSubscription.unsubscribe();
    this.featureStyleSubscription.unsubscribe();
    this.featureHeadingStyleSubscription.unsubscribe();
    this.featureSubheadingStyleSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}
