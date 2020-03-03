import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { WebsiteService } from '../../../../../shared/services/website.service';

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
  activeEditComponentId: string;
  activePageSetting: string;

  private featureStyleSubscription: Subscription;
  private featureHeadingStyleSubscription: Subscription;
  private featureSubheadingStyleSubscription: Subscription;
  private featuresThemesSubscription: Subscription;
  private featuresThemeSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
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

    this.featuresTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(featuresTemplateResponse => {
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

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onThemeChange() {
    if (this.featuresTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresTheme', this.featuresTheme);
      this.builderFeaturesService.featuresTheme.next(this.featuresTheme);
      this.builderFeaturesService.setFeaturesTheme(this.featuresTheme, this.activeEditComponentId);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresStyle', this.featuresStyle);
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresTheme', ActiveThemes.Default);
    this.builderFeaturesService.featuresTheme.next(ActiveThemes.Default);
    this.featuresStyle['background-color'] = this.defaultFeaturesStyle['featuresStyle']['background-color'];
    this.featuresHeadingStyle['color'] = this.defaultFeaturesStyle['featuresHeadingStyle']['color'];
    this.featuresSubheadingStyle['color'] = this.defaultFeaturesStyle['featuresSubheadingStyle']['color'];
    this.setFeaturesStyle();
    this.setFeaturesHeadingStyle();
    this.setFeaturesSubheadingStyle();
    this.builderFeaturesService.setFeaturesTheme(ActiveThemes.Default, this.activeEditComponentId);
  }

  ngOnDestroy() {
    this.featuresThemesSubscription.unsubscribe();
    this.featuresThemeSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    if (this.defaultFeaturesStyleSubscription) {
      this.defaultFeaturesStyleSubscription.unsubscribe();
    }
    this.websiteChangeCountSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.featureStyleSubscription.unsubscribe();
    this.featureHeadingStyleSubscription.unsubscribe();
    this.featureSubheadingStyleSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}
