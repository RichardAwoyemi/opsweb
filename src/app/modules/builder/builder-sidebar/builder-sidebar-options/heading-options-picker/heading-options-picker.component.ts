import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderHeadingService } from '../../../builder-components/builder-heading/builder-heading.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-heading-options-picker',
  templateUrl: './heading-options-picker.component.html',
  styleUrls: ['./heading-options-picker.component.css'],
})
export class HeadingOptionsPickerComponent implements OnInit {
  fontNames: any;
  fontUnits: any;
  headingHeaderStyle: any;
  headingSubheaderStyle: any;
  headingStyle: any;
  headingItemArray: any;
  headingCopyrightFontSize: number;
  defaultHeadingStyle: any;
  headingTemplate: string;
  headingFont: string = 'Avenir Next Regular';
  headingHeaderFontSize: string = '20';
  headingSubheaderFontSize: string = '14';
  websiteChangeCount: number;
  numberOfHeading: number;

  private headingItemArraySubscription: Subscription;
  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private headingHeaderStyleSubscription: Subscription;
  private headingSubheaderStyleSubscription: Subscription;
  private headingStyleSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private defaultHeadingStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;

  constructor(
    private builderHeadingService: BuilderHeadingService,
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
  ) {
  }

  ngOnInit() {

    this.headingHeaderStyleSubscription = this.builderHeadingService.headingHeaderStyle.subscribe(response => {
      this.headingHeaderStyle = response;
    });

    this.headingSubheaderStyleSubscription = this.builderHeadingService.headingSubheaderStyle.subscribe(response => {
      this.headingSubheaderStyle = response;
    });

    this.headingStyleSubscription = this.builderHeadingService.headingStyle.subscribe(response => {
      this.headingStyle = response;
    });

    this.headingItemArraySubscription = this.builderHeadingService.headingItemArray.subscribe(response => {
      this.headingItemArray = response;
      this.numberOfHeading = Object.keys(this.headingItemArray).length;
    });

    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.fontUnitsSubscription = this.builderService.fontUnits.subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.headingTemplateSubscription = this.builderHeadingService.headingTemplate.subscribe(response => {
      if (response) {
        this.headingTemplate = response;

        this.defaultHeadingStyleSubscription = this.builderHeadingService.getDefaultHeadingStyle(this.headingTemplate).subscribe(response => {
          if (response) {
            this.defaultHeadingStyle = response;
          }
        });
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onHeadingFontChange(parameterName: string, parameter: any, isHeader: boolean = true, isSubheader: boolean = true) {
    if (isHeader) {
      this.headingHeaderStyle[parameterName] = parameter;
      this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
      this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
    }

    if (isSubheader) {
      this.headingSubheaderStyle[parameterName] = parameter;
      this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
      this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
    }
  }

  resetFeatureFontSize(){
    this.headingHeaderStyle['font-size'] = this.defaultHeadingStyle['headingHeaderStyle']['font-size'];
    this.headingSubheaderStyle['font-size'] = this.defaultHeadingStyle['headingSubheaderStyle']['font-size'];
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  resetHeadingFontName() {
    this.headingHeaderStyle['font-family'] = this.defaultHeadingStyle['headingHeaderStyle']['font-family'];
    this.headingSubheaderStyle['font-family'] = this.defaultHeadingStyle['headingSubheaderStyle']['font-family'];
    const headingFont = this.headingHeaderStyle['font-family'].split(','); //header assumed to be the same
    this.headingFont = headingFont[0].replace(/'/g, '');
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  ngOnDestroy() {
    this.headingHeaderStyleSubscription.unsubscribe();
    this.headingSubheaderStyleSubscription.unsubscribe();
    this.headingStyleSubscription.unsubscribe();
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    this.defaultHeadingStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
