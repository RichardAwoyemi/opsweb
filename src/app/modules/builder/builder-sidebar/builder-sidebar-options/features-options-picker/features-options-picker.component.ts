import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { TemplateService } from 'src/app/shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderService } from '../../../builder.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-features-options-picker',
  templateUrl: './features-options-picker.component.html',
  styleUrls: ['./features-options-picker.component.css'],
})
export class FeaturesOptionsPickerComponent implements OnInit, OnDestroy {
  fontNames: any;
  fontUnits: any;
  featuresStyle: any;
  featuresItemArray: any;
  defaultFeaturesStyle: any;
  featuresTemplate: string;
  featuresHeadingStyle: any;
  featuresHeadingFontName: string;
  featuresHeadingFontSize: number;
  featuresHeadingFontUnit = 'px';
  featuresSubheadingStyle: any;
  featuresSubheadingFontName: string;
  featuresSubheadingFontSize: number;
  featuresSubheadingFontUnit = 'px';
  websiteChangeCount: number;
  numberOfFeatures: number;
  pageComponents: any;
  activeEditComponentId: string;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 }
    ]
  };
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
    .subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
        this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeEditComponentId) {
                  if (this.pageComponents['pages'][i]['components'][j]['featuresItemArray']) {
                    this.numberOfFeatures = this.pageComponents['pages'][i]['components'][j]['featuresItemArray'].length;
                    this.featuresItemArray = this.pageComponents['pages'][i]['components'][j]['featuresItemArray'];
                  }
                  if (this.pageComponents['pages'][i]['components'][j]['featuresStyle']) {
                    this.featuresStyle = this.pageComponents['pages'][i]['components'][j]['featuresStyle'];
                  }
                }
              }
            }
          }
        });
      }
    });

    this.builderFeaturesService.featuresHeadingStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.featuresHeadingStyle = response;
      }
    });

    this.builderFeaturesService.featuresSubheadingStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.featuresSubheadingStyle = response;
      }
    });

    this.builderService.fontNames.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.builderService.fontUnits.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.fontUnits = response;
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

    this.builderFeaturesService.featuresHeadingStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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

    this.builderFeaturesService.featuresSubheadingStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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

  setNumberOfFeatures(value: number) {
    const featuresComponent = this.builderFeaturesService.setNumberOfFeatures(this.activeEditComponentId, value);
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresItemArray', featuresComponent['featuresItemArray']);
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresWidth', featuresComponent['featuresItemWidth']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetNumberOfFeatures() {
    const featuresComponent = this.builderFeaturesService.setNumberOfFeatures(this.activeEditComponentId, 3);
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresItemArray', featuresComponent['featuresItemArray']);
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresWidth', featuresComponent['featuresItemWidth']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesHeadingFontName() {
    this.featuresHeadingStyle['font-family'] = this.defaultFeaturesStyle['style']['featuresHeadingStyle']['font-family'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
  }

  resetFeaturesHeadingFontSize() {
    this.featuresHeadingStyle['font-size'] = this.defaultFeaturesStyle['style']['featuresHeadingStyle']['font-size'];
    this.featuresHeadingFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
  }

  onFeaturesHeadingFontNameChange() {
    this.featuresHeadingStyle['font-family'] = this.featuresHeadingFontName;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesHeadingFontSize() {
    this.featuresHeadingStyle['font-size'] = this.featuresHeadingFontSize + this.featuresHeadingFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFeaturesHeadingFontUnitChange() {
    if (this.featuresHeadingFontUnit === 'em') {
      if (this.featuresHeadingFontSize < 16) {
        this.featuresHeadingFontSize = 16;
      }
      this.featuresHeadingFontSize = Math.round(this.featuresHeadingFontSize / 16);
    }

    if (this.featuresHeadingFontUnit === 'px') {
      this.featuresHeadingFontSize = Math.round(this.featuresHeadingFontSize * 16);
    }

    this.featuresHeadingStyle['font-size'] = this.featuresHeadingFontSize + this.featuresHeadingFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresHeadingStyle', this.featuresHeadingStyle);
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFeaturesSubheadingFontName() {
    this.featuresSubheadingStyle['font-family'] = this.defaultFeaturesStyle['style']['featuresSubheadingStyle']['font-family'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
  }

  resetFeaturesSubheadingFontSize() {
    this.featuresSubheadingStyle['font-size'] = this.defaultFeaturesStyle['style']['featuresSubheadingStyle']['font-size'];
    this.featuresSubheadingFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
  }

  onFeaturesSubheadingFontNameChange() {
    this.featuresSubheadingStyle['font-family'] = this.featuresSubheadingFontName;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFeaturesSubheadingFontSize() {
    this.featuresSubheadingStyle['font-size'] = this.featuresSubheadingFontSize + this.featuresSubheadingFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFeaturesSubheadingFontUnitChange() {
    if (this.featuresSubheadingFontUnit === 'em') {
      if (this.featuresSubheadingFontSize < 16) {
        this.featuresSubheadingFontSize = 16;
      }
      this.featuresSubheadingFontSize = Math.round(this.featuresSubheadingFontSize / 16);
    }

    if (this.featuresSubheadingFontUnit === 'px') {
      this.featuresSubheadingFontSize = Math.round(this.featuresSubheadingFontSize * 16);
    }

    this.featuresSubheadingStyle['font-size'] = this.featuresSubheadingFontSize + this.featuresSubheadingFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'featuresSubheadingStyle', this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
