import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from '../../../../../shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderService } from '../../../builder.service';

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
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private templateService: TemplateService
  ) {
  }

  ngOnInit() {
    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponentId = response;
          this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(pageDetails => {
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

    this.builderService.activePageSetting.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activePageSetting = response;
        }
      });

    this.builderFeaturesService.featuresTheme.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.featuresTheme = response;
        } else {
          this.featuresTheme = ActiveThemes.Default;
        }
      });

    this.builderFeaturesService.getFeaturesThemes().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.featuresThemes = response;
        }
      });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(templateResponse => {
        if (templateResponse) {
          this.featuresTemplate = templateResponse['template'];
          this.templateService.getTemplateStyle(this.featuresTemplate).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.defaultFeaturesStyle = response[ActiveComponents.Features];
              }
            });
        } else {
          this.templateService.getTemplateStyle(ActiveTemplates.Default).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.defaultFeaturesStyle = response[ActiveComponents.Features];
              }
            });
        }
      });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
