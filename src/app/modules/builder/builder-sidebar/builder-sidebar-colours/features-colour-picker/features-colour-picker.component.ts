import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponents, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { TemplateService } from '../../../../../shared/services/template.service';

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
    private websiteService: WebsiteService,
    private templateService: TemplateService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
        this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(pageDetails => {
          if (pageDetails) {
            this.pageComponents = pageDetails;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeEditComponentId) {
                  this.featuresStyle = this.pageComponents['pages'][i]['components'][j]['style']['featuresStyle'];
                  this.featuresHeadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['featuresHeadingStyle'];
                  this.featuresSubheadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['featuresSubheadingStyle'];
                }
              }
            }
          }
        });
      }
    });

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(response => {
      if (response) {
        this.activePageSetting = response;
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

    this.featuresTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(templateResponse => {
      if (templateResponse) {
        this.featuresTemplate = templateResponse['template'];
        this.defaultFeaturesStyleSubscription = this.templateService.getTemplateStyle(this.featuresTemplate).subscribe(response => {
          if (response) {
            this.defaultFeaturesStyle = response[ActiveComponents.Features];
          }
        });
      } else {
        this.defaultFeaturesStyleSubscription = this.templateService.getTemplateStyle(ActiveTemplates.Default).subscribe(response => {
          if (response) {
            this.defaultFeaturesStyle = response[ActiveComponents.Features];
          }
        });
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
      this.builderFeaturesService.setFeaturesTheme(this.featuresTheme, this.activeEditComponentId);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresStyle', this.featuresStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresTheme', ActiveThemes.Default);
    this.builderFeaturesService.featuresTheme.next(ActiveThemes.Default);
    this.featuresStyle['background-color'] = this.defaultFeaturesStyle['style']['featuresStyle']['background-color'];
    this.featuresHeadingStyle['color'] = this.defaultFeaturesStyle['style']['featuresHeadingStyle']['color'];
    this.featuresSubheadingStyle['color'] = this.defaultFeaturesStyle['style']['featuresSubheadingStyle']['color'];
    this.setFeaturesStyle();
    this.setFeaturesHeadingStyle();
    this.setFeaturesSubheadingStyle();
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
    this.builderComponentsSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
  }
}
