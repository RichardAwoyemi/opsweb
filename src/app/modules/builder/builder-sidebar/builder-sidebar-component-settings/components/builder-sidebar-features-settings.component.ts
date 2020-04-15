import { Component, OnDestroy, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderService } from '../../../builder.service';
import { BuilderSidebarColourPickerComponent } from '../../builder-sidebar-elements/builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { BuilderSidebarFontNameComponent } from '../../builder-sidebar-elements/builder-sidebar-font-name/builder-sidebar-font-name.component';
import { BuilderSidebarFontSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-font-size/builder-sidebar-font-size.component';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarItemCountSliderComponent } from '../../builder-sidebar-elements/builder-sidebar-item-count-slider/builder-sidebar-item-count-slider.component';
import { BuilderSidebarPaddingComponent } from '../../builder-sidebar-elements/builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarTextAlignmentComponent } from '../../builder-sidebar-elements/builder-sidebar-text-alignment/builder-sidebar-text-alignment.component';
import { BuilderSidebarThemeChangeComponent } from '../../builder-sidebar-elements/builder-sidebar-theme-change/builder-sidebar-theme-change.component';

@Component({
  selector: 'app-sidebar-features-settings',
  templateUrl: './builder-sidebar-settings-renderer.component.html',
})

export class SidebarFeaturesSettingsComponent implements OnInit, OnDestroy {

  settings: string;
  sidebar: any;
  baseData: any;
  pageComponents: any;
  componentId: any;
  componentName = ActiveComponents.Features;
  isActive = false;
  activePageIndex: number;
  activeComponentIndex: number;
  featuresCountSliderOptions: Options = { showTicksValues: true, floor: 1, ceil: 8, step: 1 };
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private builderFeaturesService: BuilderFeaturesService
  ) {
  }

  ngOnInit() {
    this.builderService.activeEditSetting.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.settings = response;
        this.setupData();
      });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.isActive = this.componentName === response;
      });

    this.builderService.activePageIndex.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activePageIndexResponse => {
        this.activePageIndex = activePageIndexResponse;
        this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(activeEditComponentIdResponse => {
            if (activeEditComponentIdResponse) {
              this.componentId = activeEditComponentIdResponse;
              this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(pageComponentsResponse => {
                  if (pageComponentsResponse) {
                    this.pageComponents = pageComponentsResponse;
                    for (let j = 0; j < this.pageComponents['pages'][this.activePageIndex]['components'].length; j++) {
                      if (this.pageComponents['pages'][this.activePageIndex]['components'][j]['componentId'] === this.componentId) {
                        if (this.activeComponentIndex !== j) {
                          this.activeComponentIndex = j;
                          this.setupData();
                        }
                        break;
                      }
                    }
                  }
                });
            }
          });
      });

  }

  setupData() {
    this.baseData = {
      componentName: this.componentName,
      pageIndex: this.activePageIndex,
      componentIndex: this.activeComponentIndex,
      componentService: this.builderFeaturesService,
      updateElementCountFunction: 'setNumberOfFeatures',
      getThemesFunction: 'getFeaturesThemes',
    };

    switch (this.settings) {
      case 'colours':
        this.sidebar = [
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'featuresStyle', colourProperty: 'background-color', sectionHeader: 'Background' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'featuresHeadingStyle', colourProperty: 'color', sectionHeader: 'Heading' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'featuresSubheadingStyle', colourProperty: 'color', sectionHeader: 'Subheading' } },
          {
            component: BuilderSidebarThemeChangeComponent, elementInfo: {
              elements: [
                { name: 'featuresStyle', colourProperty: 'background-color' },
                { name: 'featuresHeadingStyle', colourProperty: 'color' },
                { name: 'featuresSubheadingStyle', colourProperty: 'color' }]
            }
          },
        ];
        break;
      case 'layout':
        this.sidebar = [
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Features', includeLineBreak: false } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'featuresStyle' } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Heading' } },
          { component: BuilderSidebarTextAlignmentComponent, elementInfo: { name: 'featuresHeadingStyle', childKey: 'text-align', buttonClass: 'btn-xs' } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'featuresHeadingStyle' } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Subheading' } },
          { component: BuilderSidebarTextAlignmentComponent, elementInfo: { name: 'featuresSubheadingStyle', childKey: 'text-align', buttonClass: 'btn-xs' } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'featuresSubheadingStyle' } }
        ];
        break;
      case 'options':
        this.sidebar = [
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Features', includeLineBreak: false } },
          { component: BuilderSidebarItemCountSliderComponent, elementInfo: { name: 'featuresItemArray', sliderOptions: this.featuresCountSliderOptions } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Heading' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'featuresHeadingStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'featuresHeadingStyle' } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Subheading' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'featuresSubheadingStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'featuresSubheadingStyle' } },
        ];
        break;
      default:
        this.sidebar = [];
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
