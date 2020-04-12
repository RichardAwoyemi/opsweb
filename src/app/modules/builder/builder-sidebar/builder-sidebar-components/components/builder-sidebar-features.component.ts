import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Options } from 'ng5-slider';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { ActiveComponents } from '../../../builder';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarLineBreakComponent } from '../../builder-sidebar-elements/builder-sidebar-line-break/builder-sidebar-heading.component';
import { BuilderSidebarPaddingComponent } from '../../builder-sidebar-elements/builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarTextAlignmentComponent } from '../../builder-sidebar-elements/builder-sidebar-text-alignment/builder-sidebar-text-alignment.component';
import { BuilderSidebarColourPickerComponent } from '../../builder-sidebar-elements/builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { BuilderSidebarThemeChangeComponent } from '../../builder-sidebar-elements/builder-sidebar-theme-change/builder-sidebar-theme-change.component';
import { BuilderSidebarItemCountSliderComponent } from '../../builder-sidebar-elements/builder-sidebar-item-count-slider/builder-sidebar-item-count-slider.component';
import { BuilderSidebarFontNameComponent } from '../../builder-sidebar-elements/builder-sidebar-font-name/builder-sidebar-font-name.component';
import { BuilderSidebarFontSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-font-size/builder-sidebar-font-size.component';

@Component({
  selector: 'app-sidebar-features-component',
  templateUrl: '../builder-sidebar-components-renderer.component.html',
})

export class SidebarFeaturesComponent implements OnInit, OnDestroy {

  @Input() settings;

  sidebar: any;
  baseData: any;
  pageComponents: any;
  componentId: any;
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
      componentName: ActiveComponents.Features,
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
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
