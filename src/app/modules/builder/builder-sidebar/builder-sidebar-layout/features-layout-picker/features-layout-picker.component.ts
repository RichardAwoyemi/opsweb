import { Component, OnInit } from '@angular/core';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarLineBreakComponent } from '../../builder-sidebar-elements/builder-sidebar-line-break/builder-sidebar-heading.component';
import { BuilderSidebarPaddingComponent } from '../../builder-sidebar-elements/builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarTextAlignmentComponent } from '../../builder-sidebar-elements/builder-sidebar-text-alignment/builder-sidebar-text-alignment.component';

@Component({
  selector: 'app-features-layout-picker',
  templateUrl: './features-layout-picker.component.html',
  styleUrls: ['./features-layout-picker.component.css']
})

export class FeaturesLayoutPickerComponent implements OnInit {
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
      defaultStyleFunctionName: 'getDefaultFeaturesStyle',
      componentService: this.builderFeaturesService
    };

    const featuresStyleInfo = { elementName: 'featuresStyle' };
    const headingStyleInfo = { elementName: 'featuresHeadingStyle' };
    const subheadingStyleInfo = { elementName: 'featuresSubheadingStyle' };

    this.featuresData = { ...baseData, ...featuresStyleInfo};
    this.headingData = { ...baseData, ...headingStyleInfo };
    this.subheadingData = { ...baseData, ...subheadingStyleInfo };

    this.sidebarElementData = [
      { component: BuilderSidebarHeadingComponent, data: { heading: 'Features'} },
      { component: BuilderSidebarPaddingComponent, data: this.featuresData },
      { component: BuilderSidebarLineBreakComponent },
      { component: BuilderSidebarHeadingComponent, data: { heading: 'Heading'} },
      { component: BuilderSidebarTextAlignmentComponent, data: this.headingData },
      { component: BuilderSidebarPaddingComponent, data: this.headingData },
      { component: BuilderSidebarLineBreakComponent },
      { component: BuilderSidebarHeadingComponent, data: { heading: 'Subheading'} },
      { component: BuilderSidebarTextAlignmentComponent, data: this.subheadingData },
      { component: BuilderSidebarPaddingComponent, data: this.subheadingData }
    ];
  }
}
