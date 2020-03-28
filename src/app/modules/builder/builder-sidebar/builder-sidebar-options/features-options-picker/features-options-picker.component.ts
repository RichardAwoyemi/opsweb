import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderSidebarFontNameComponent } from '../../builder-sidebar-elements/builder-sidebar-font-name/builder-sidebar-font-name.component';
import { BuilderSidebarFontSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-font-size/builder-sidebar-font-size.component';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarItemCountSliderComponent } from '../../builder-sidebar-elements/builder-sidebar-item-count-slider/builder-sidebar-item-count-slider.component';
import { BuilderSidebarLineBreakComponent } from '../../builder-sidebar-elements/builder-sidebar-line-break/builder-sidebar-heading.component';

@Component({
  selector: 'app-features-options-picker',
  templateUrl: './features-options-picker.component.html',
  styleUrls: ['./features-options-picker.component.css'],
})
export class FeaturesOptionsPickerComponent implements OnInit {
  options: Options = { showTicksValues: true, floor: 1, ceil: 8, step: 1 };
  sidebarElementData: any;
  featuresData: any;
  headingData: any;
  subheadingData: any;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
  ) {
  }

  ngOnInit() {

    const baseData = {
      componentName: 'features',
      elementContent: 'featuresItemArray',
      setAndGetElementsFunction: 'setCountAndGetFeatures',
      defaultStyleFunctionName: 'getDefaultFeaturesStyle',
      componentService: this.builderFeaturesService,
      sliderOptions: this.options
    };

    const featuresStyleInfo = { elementName: 'featuresStyle' };
    const headingStyleInfo = { elementName: 'featuresHeadingStyle' };
    const subheadingStyleInfo = { elementName: 'featuresSubheadingStyle' };

    this.featuresData = { ...baseData, ...featuresStyleInfo };
    this.headingData = { ...baseData, ...headingStyleInfo };
    this.subheadingData = { ...baseData, ...subheadingStyleInfo };

    this.sidebarElementData = [
      { component: BuilderSidebarHeadingComponent, data: { heading: 'Features' } },
      { component: BuilderSidebarItemCountSliderComponent, data: this.featuresData },
      { component: BuilderSidebarLineBreakComponent },
      { component: BuilderSidebarHeadingComponent, data: { heading: 'Heading' } },
      { component: BuilderSidebarFontNameComponent, data: this.headingData },
      { component: BuilderSidebarFontSizeComponent, data: this.headingData },
      { component: BuilderSidebarLineBreakComponent },
      { component: BuilderSidebarHeadingComponent, data: { heading: 'Subheading' } },
      { component: BuilderSidebarFontNameComponent, data: this.subheadingData },
      { component: BuilderSidebarFontSizeComponent, data: this.subheadingData },
      { component: BuilderSidebarLineBreakComponent }
    ];
  }
}
