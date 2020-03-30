import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderSidebarColourPickerComponent } from '../../builder-sidebar-elements/builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { BuilderSidebarThemeChangeComponent } from '../../builder-sidebar-elements/builder-sidebar-theme-change/builder-sidebar-theme-change.component';

@Component({
  selector: 'app-features-colour-picker',
  templateUrl: './features-colour-picker.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeaturesColourPickerComponent implements OnInit {
  featuresData: any;
  headingData: any;
  subheadingData: any;
  fullData: any;
  sidebarElementData: any;

  constructor(
    private builderFeaturesService: BuilderFeaturesService,
  ) {
  }

  ngOnInit() {
    const featuresStyleInfo = { elementName: 'featuresStyle', colourSectionHeader: 'Background', colourProperty: 'background-color' };
    const headingStyleInfo = { elementName: 'featuresHeadingStyle', colourSectionHeader: 'Heading', colourProperty: 'color'};
    const subheadingStyleInfo = { elementName: 'featuresSubheadingStyle', colourSectionHeader: 'SubHeading', colourProperty: 'color' };
    const fullDataInfo = { elementName: 'featuresTheme', components: {featuresStyleInfo, headingStyleInfo, subheadingStyleInfo} };

    const baseData = {
      componentName: 'features',
      elementContent: 'featuresItemArray',
      setAndGetElementsFunction: 'setCountAndGetFeatures',
      defaultStyleFunctionName: 'getDefaultFeaturesStyle',
      componentService: this.builderFeaturesService,
      setThemeFunction: 'setFeaturesTheme',
      getThemesFunction: 'getFeaturesThemes',
      themeVar: 'featuresTheme'
    };

    this.featuresData = { ...baseData, ...featuresStyleInfo };
    this.headingData = { ...baseData, ...headingStyleInfo };
    this.subheadingData = { ...baseData, ...subheadingStyleInfo };
    this.fullData = { ...baseData, fullDataInfo };

    this.sidebarElementData = [
      { component: BuilderSidebarColourPickerComponent, data: this.featuresData },
      { component: BuilderSidebarColourPickerComponent, data: this.headingData },
      { component: BuilderSidebarColourPickerComponent, data: this.subheadingData },
      { component: BuilderSidebarThemeChangeComponent, data: this.fullData },
    ];
  }
}
