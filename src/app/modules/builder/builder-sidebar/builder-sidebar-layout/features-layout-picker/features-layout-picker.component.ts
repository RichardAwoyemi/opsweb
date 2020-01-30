import { Component, OnInit } from '@angular/core';
import { BuilderFeaturesService } from '../../../builder-components/builder-features/builder-features.service';
import { Subscription } from 'rxjs';
import { ActiveTemplates } from '../../../builder';

@Component({
  selector: 'app-features-layout-picker',
  templateUrl: './features-layout-picker.component.html',
  styleUrls: ['./features-layout-picker.component.css']
})
export class FeaturesLayoutPickerComponent implements OnInit {
  featuresPaddingTop: number;
  featuresPaddingLeft: number;
  featuresPaddingRight: number;
  featuresPaddingBottom: number;
  featuresHeaderPaddingTop: number;
  featuresHeaderPaddingLeft: number;
  featuresHeaderPaddingRight: number;
  featuresHeaderPaddingBottom: number;
  featuresSubheaderPaddingTop: number;
  featuresSubheaderPaddingLeft: number;
  featuresSubheaderPaddingRight: number;
  featuresSubheaderPaddingBottom: number;
  featuresSocialLinksMarginTop: number;
  featuresSocialLinksMarginLeft: number;
  featuresSocialLinksMarginRight: number;
  featuresSocialLinksMarginBottom: number;
  featuresPageLinksPaddingTop: number;
  featuresPageLinksPaddingLeft: number;
  featuresPageLinksPaddingRight: number;
  featuresPageLinksPaddingBottom: number;
  featuresAlignmentClass: string;
  featuresSocialLinksContainerStyle: any;
  featuresHeaderStyle: any;
  featuresSubheaderStyle: any;
  featuresStyle: any;
  featuresCopyrightStyle: any;
  featuresSocialLinksStyle: any;
  featuresPageLinksStyle: any;
  featuresTemplate: any = ActiveTemplates.Default;
  defaultFeaturesStyle: any;
  featuresComponentLayout: number = 0;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  featuresMenuOptions: string[];

  private featuresHeaderStyleSubscription: Subscription;
  private featuresSubheaderStyleSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private featuresSocialLinksStyleSubscription: Subscription;
  private featuresPageLinksStyleSubscription: Subscription;
  private featuresAlignmentClassSubscription: Subscription;
  private featuresSocialLinksContainerStyleSubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private defaultFeaturesStyleSubscription: Subscription;
  private featuresComponentLayoutSubscription: Subscription;
  private facebookUrlSubscription: Subscription;
  private twitterUrlSubscription: Subscription;
  private instagramUrlSubscription: Subscription;
  private youtubeUrlSubscription: Subscription;
  private githubUrlSubscription: Subscription;
  private linkedinUrlSubscription: Subscription;
  private featuresMenuOptionsSubscription: Subscription;

  constructor(
    private builderFeaturesService: BuilderFeaturesService
  ) {
  }

  ngOnInit() {
    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(response => {
      this.featuresTemplate = response;

      this.defaultFeaturesStyleSubscription = this.builderFeaturesService.getDefaultFeaturesStyle(this.featuresTemplate).subscribe(response => {
        if (response) {
          this.defaultFeaturesStyle = response;
        }
      });
    });

    this.featuresMenuOptionsSubscription = this.builderFeaturesService.featuresMenuOptions.subscribe(response => {
      if (response) {
        let featuresMenuOptions = [];
        Object.keys(response).forEach(function (key) {
          if (response[key] !== false) {
            featuresMenuOptions.push(key);
          }
        });
        this.featuresMenuOptions = featuresMenuOptions;
      } else {
        this.featuresMenuOptions = [];
      }
    });

    this.twitterUrlSubscription = this.builderFeaturesService.twitterUrl.subscribe(response => {
      this.twitterUrl = response;
    });

    this.instagramUrlSubscription = this.builderFeaturesService.instagramUrl.subscribe(response => {
      this.instagramUrl = response;
    });

    this.youtubeUrlSubscription = this.builderFeaturesService.youtubeUrl.subscribe(response => {
      this.youtubeUrl = response;
    });

    this.githubUrlSubscription = this.builderFeaturesService.githubUrl.subscribe(response => {
      this.githubUrl = response;
    });

    this.facebookUrlSubscription = this.builderFeaturesService.facebookUrl.subscribe(response => {
      this.facebookUrl = response;
    });

    this.linkedinUrlSubscription = this.builderFeaturesService.linkedinUrl.subscribe(response => {
      this.linkedinUrl = response;
    });


    this.featuresAlignmentClassSubscription = this.builderFeaturesService.featuresAlignmentClass.subscribe(response => {
      this.featuresAlignmentClass = response;
    });

    this.featuresSocialLinksContainerStyleSubscription = this.builderFeaturesService.featuresSocialLinksContainerStyle.subscribe(response => {
      if (response) {
        this.featuresSocialLinksContainerStyle = response;
      }
    });

    this.featuresComponentLayoutSubscription = this.builderFeaturesService.featuresComponentLayout.subscribe(response => {
      if (response) {
        this.featuresComponentLayout = response;
      }
    });

    this.featuresHeaderStyleSubscription = this.builderFeaturesService.featuresHeaderStyle.subscribe(response => {
      if (response) {
        this.featuresHeaderStyle = response;
        if (this.featuresHeaderStyle['padding-top']) {
          this.featuresHeaderPaddingTop = this.featuresHeaderStyle['padding-top'].replace('px', '');
        }
        if (this.featuresHeaderStyle['padding-left']) {
          this.featuresHeaderPaddingLeft = this.featuresHeaderStyle['padding-left'].replace('px', '');
        }
        if (this.featuresHeaderStyle['padding-right']) {
          this.featuresHeaderPaddingRight = this.featuresHeaderStyle['padding-right'].replace('px', '');
        }
        if (this.featuresHeaderStyle['padding-bottom']) {
          this.featuresHeaderPaddingBottom = this.featuresHeaderStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.featuresSubheaderStyleSubscription = this.builderFeaturesService.featuresSubheaderStyle.subscribe(response => {
      if (response) {
        this.featuresSubheaderStyle = response;
        if (this.featuresSubheaderStyle['padding-top']) {
          this.featuresSubheaderPaddingTop = this.featuresSubheaderStyle['padding-top'].replace('px', '');
        }
        if (this.featuresSubheaderStyle['padding-left']) {
          this.featuresSubheaderPaddingLeft = this.featuresSubheaderStyle['padding-left'].replace('px', '');
        }
        if (this.featuresSubheaderStyle['padding-right']) {
          this.featuresSubheaderPaddingRight = this.featuresSubheaderStyle['padding-right'].replace('px', '');
        }
        if (this.featuresSubheaderStyle['padding-bottom']) {
          this.featuresSubheaderPaddingBottom = this.featuresSubheaderStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.featuresStyleSubscription = this.builderFeaturesService.featuresStyle.subscribe(response => {
      if (response) {
        this.featuresStyle = response;
        if (this.featuresStyle['padding-top']) {
          this.featuresPaddingTop = this.featuresStyle['padding-top'].replace('px', '');
        }
        if (this.featuresStyle['padding-left']) {
          this.featuresPaddingLeft = this.featuresStyle['padding-left'].replace('px', '');
        }
        if (this.featuresStyle['padding-right']) {
          this.featuresPaddingRight = this.featuresStyle['padding-right'].replace('px', '');
        }
        if (this.featuresStyle['padding-bottom']) {
          this.featuresPaddingBottom = this.featuresStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.featuresSocialLinksStyleSubscription = this.builderFeaturesService.featuresSocialLinksStyle.subscribe(response => {
      if (response) {
        this.featuresSocialLinksStyle = response;
        if (this.featuresSocialLinksStyle['margin-top']) {
          this.featuresSocialLinksMarginTop = this.featuresSocialLinksStyle['margin-top'].replace('px', '');
        }
        if (this.featuresSocialLinksStyle['margin-left']) {
          this.featuresSocialLinksMarginLeft = this.featuresSocialLinksStyle['margin-left'].replace('px', '');
        }
        if (this.featuresSocialLinksStyle['margin-right']) {
          this.featuresSocialLinksMarginRight = this.featuresSocialLinksStyle['margin-right'].replace('px', '');
        }
        if (this.featuresSocialLinksStyle['margin-bottom']) {
          this.featuresSocialLinksMarginBottom = this.featuresSocialLinksStyle['margin-bottom'].replace('px', '');
        }
      }
    });

    this.featuresPageLinksStyleSubscription = this.builderFeaturesService.featuresPageLinksStyle.subscribe(response => {
      if (response) {
        this.featuresPageLinksStyle = response;
        if (this.featuresPageLinksStyle['padding-top']) {
          this.featuresPageLinksPaddingTop = this.featuresPageLinksStyle['padding-top'].replace('px', '');
        }
        if (this.featuresPageLinksStyle['padding-left']) {
          this.featuresPageLinksPaddingLeft = this.featuresPageLinksStyle['padding-left'].replace('px', '');
        }
        if (this.featuresPageLinksStyle['padding-right']) {
          this.featuresPageLinksPaddingRight = this.featuresPageLinksStyle['padding-right'].replace('px', '');
        }
        if (this.featuresPageLinksStyle['padding-bottom']) {
          this.featuresPageLinksPaddingBottom = this.featuresPageLinksStyle['padding-bottom'].replace('px', '');
        }
      }
    });
  }

  resetFeaturesAlignment() {
    this.setFeaturesAlignment('left');
    this.setComponentLayout(0);
  }

  setComponentLayout(featuresComponentLayout: number) {
    this.builderFeaturesService.featuresComponentLayout.next(featuresComponentLayout);
    if (featuresComponentLayout == 1) {
      this.featuresSocialLinksContainerStyle['margin-right'] = '-10px';
      this.featuresSocialLinksContainerStyle['margin-bottom'] = '-10px';
      this.featuresSocialLinksContainerStyle['padding-top'] = '4px';
      this.builderFeaturesService.featuresSocialLinksContainerStyle.next(this.featuresSocialLinksContainerStyle);
    } else {
      this.featuresSocialLinksContainerStyle['margin-right'] = '0';
      this.featuresSocialLinksContainerStyle['padding-top'] = '0px';
      this.builderFeaturesService.featuresSocialLinksContainerStyle.next(this.featuresSocialLinksContainerStyle);
    }
  }


  resetFeaturesCopyrightPaddingStyle() {
    this.featuresCopyrightStyle['padding-top'] = this.defaultFeaturesStyle['featuresCopyrightStyle']['padding-top'];
    this.featuresCopyrightStyle['padding-left'] = this.defaultFeaturesStyle['featuresCopyrightStyle']['padding-left'];
    this.featuresCopyrightStyle['padding-right'] = this.defaultFeaturesStyle['featuresCopyrightStyle']['padding-right'];
    this.featuresCopyrightStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresCopyrightStyle']['padding-bottom'];
    this.builderFeaturesService.featuresCopyrightStyle.next(this.featuresCopyrightStyle);
  }

  setFeaturesSocialLinksMarginTop() {
    this.featuresSocialLinksStyle['margin-top'] = `${ this.featuresSocialLinksMarginTop }px`;
    this.builderFeaturesService.featuresSocialLinksStyle.next(this.featuresSocialLinksStyle);
  }

  setFeaturesSocialLinksMarginLeft() {
    this.featuresSocialLinksStyle['margin-left'] = `${ this.featuresSocialLinksMarginLeft }px`;
    this.builderFeaturesService.featuresSocialLinksStyle.next(this.featuresSocialLinksStyle);
  }

  setFeaturesSocialLinksMarginRight() {
    this.featuresSocialLinksStyle['margin-right'] = `${ this.featuresSocialLinksMarginRight }px`;
    this.builderFeaturesService.featuresSocialLinksStyle.next(this.featuresSocialLinksStyle);
  }

  setFeaturesSocialLinksMarginBottom() {
    this.featuresSocialLinksStyle['margin-bottom'] = `${ this.featuresSocialLinksMarginBottom }px`;
    this.builderFeaturesService.featuresSocialLinksStyle.next(this.featuresSocialLinksStyle);
  }

  resetFeaturesSocialLinksMarginStyle() {
    this.featuresSocialLinksStyle['margin-top'] = this.defaultFeaturesStyle['featuresSocialLinksStyle']['margin-top'];
    this.featuresSocialLinksStyle['margin-left'] = this.defaultFeaturesStyle['featuresSocialLinksStyle']['margin-left'];
    this.featuresSocialLinksStyle['margin-right'] = this.defaultFeaturesStyle['featuresSocialLinksStyle']['margin-right'];
    this.featuresSocialLinksStyle['margin-bottom'] = this.defaultFeaturesStyle['featuresSocialLinksStyle']['margin-bottom'];
    this.builderFeaturesService.featuresSocialLinksStyle.next(this.featuresSocialLinksStyle);
  }

  setFeaturesPageLinksPaddingTop() {
    this.featuresPageLinksStyle['padding-top'] = `${ this.featuresPageLinksPaddingTop }px`;
    this.builderFeaturesService.featuresPageLinksStyle.next(this.featuresPageLinksStyle);
  }

  setFeaturesPageLinksPaddingLeft() {
    this.featuresPageLinksStyle['padding-left'] = `${ this.featuresPageLinksPaddingLeft }px`;
    this.builderFeaturesService.featuresPageLinksStyle.next(this.featuresPageLinksStyle);
  }

  setFeaturesPageLinksPaddingRight() {
    this.featuresPageLinksStyle['padding-right'] = `${ this.featuresPageLinksPaddingRight }px`;
    this.builderFeaturesService.featuresPageLinksStyle.next(this.featuresPageLinksStyle);
  }

  setFeaturesPageLinksPaddingBottom() {
    this.featuresPageLinksStyle['padding-bottom'] = `${ this.featuresPageLinksPaddingBottom }px`;
    this.builderFeaturesService.featuresPageLinksStyle.next(this.featuresPageLinksStyle);
  }

  resetFeaturesPageLinksPaddingStyle() {
    this.featuresPageLinksStyle['padding-top'] = this.defaultFeaturesStyle['featuresPageLinksStyle']['padding-top'];
    this.featuresPageLinksStyle['padding-left'] = this.defaultFeaturesStyle['featuresPageLinksStyle']['padding-left'];
    this.featuresPageLinksStyle['padding-right'] = this.defaultFeaturesStyle['featuresPageLinksStyle']['padding-right'];
    this.featuresPageLinksStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresPageLinksStyle']['padding-bottom'];
    this.builderFeaturesService.featuresPageLinksStyle.next(this.featuresPageLinksStyle);
  }

  setFeaturesHeaderPaddingTop() {
    this.featuresHeaderStyle['padding-top'] = `${ this.featuresHeaderPaddingTop }px`;
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
  }

  setFeaturesHeaderPaddingLeft() {
    this.featuresHeaderStyle['padding-left'] = `${ this.featuresHeaderPaddingLeft }px`;
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
  }

  setFeaturesHeaderPaddingRight() {
    this.featuresHeaderStyle['padding-right'] = `${ this.featuresHeaderPaddingRight }px`;
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
  }

  setFeaturesHeaderPaddingBottom() {
    this.featuresHeaderStyle['padding-bottom'] = `${ this.featuresHeaderPaddingBottom }px`;
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
  }

  resetFeaturesHeaderPaddingStyle() {
    this.featuresHeaderStyle['padding-top'] = this.defaultFeaturesStyle['featuresHeaderStyle']['padding-top'];
    this.featuresHeaderStyle['padding-left'] = this.defaultFeaturesStyle['featuresHeaderStyle']['padding-left'];
    this.featuresHeaderStyle['padding-right'] = this.defaultFeaturesStyle['featuresHeaderStyle']['padding-right'];
    this.featuresHeaderStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresHeaderStyle']['padding-bottom'];
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
  }

  setFeaturesSubheaderPaddingTop() {
    this.featuresSubheaderStyle['padding-top'] = `${ this.featuresSubheaderPaddingTop }px`;
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  setFeaturesSubheaderPaddingLeft() {
    this.featuresSubheaderStyle['padding-left'] = `${ this.featuresSubheaderPaddingLeft }px`;
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  setFeaturesSubheaderPaddingRight() {
    this.featuresSubheaderStyle['padding-right'] = `${ this.featuresSubheaderPaddingRight }px`;
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  setFeaturesSubheaderPaddingBottom() {
    this.featuresSubheaderStyle['padding-bottom'] = `${ this.featuresSubheaderPaddingBottom }px`;
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  resetFeaturesSubheaderPaddingStyle() {
    this.featuresSubheaderStyle['padding-top'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['padding-top'];
    this.featuresSubheaderStyle['padding-left'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['padding-left'];
    this.featuresSubheaderStyle['padding-right'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['padding-right'];
    this.featuresSubheaderStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresSubheaderStyle']['padding-bottom'];
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
  }

  setFeaturesPaddingTop() {
    this.featuresStyle['padding-top'] = `${ this.featuresPaddingTop }px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  setFeaturesPaddingLeft() {
    this.featuresStyle['padding-left'] = `${ this.featuresPaddingLeft }px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  setFeaturesPaddingRight() {
    this.featuresStyle['padding-right'] = `${ this.featuresPaddingRight }px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  setFeaturesPaddingBottom() {
    this.featuresStyle['padding-bottom'] = `${ this.featuresPaddingBottom }px`;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  resetFeaturesPaddingStyle() {
    this.featuresStyle['padding-top'] = this.defaultFeaturesStyle['featuresStyle']['padding-top'];
    this.featuresStyle['padding-left'] = this.defaultFeaturesStyle['featuresStyle']['padding-left'];
    this.featuresStyle['padding-right'] = this.defaultFeaturesStyle['featuresStyle']['padding-right'];
    this.featuresStyle['padding-bottom'] = this.defaultFeaturesStyle['featuresStyle']['padding-bottom'];
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  setComponentLayoutSelectorClass(alignmentClass: string, componentLayout: number) {
    if (alignmentClass == this.featuresAlignmentClass && componentLayout === this.featuresComponentLayout) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  setFeaturesAlignment(alignment: string) {
    this.featuresStyle['text-align'] = alignment;
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  ngOnDestroy() {
    this.featuresHeaderStyleSubscription.unsubscribe();
    this.featuresSubheaderStyleSubscription.unsubscribe();
    this.featuresStyleSubscription.unsubscribe();
    this.featuresSocialLinksStyleSubscription.unsubscribe();
    this.featuresPageLinksStyleSubscription.unsubscribe();
    this.featuresAlignmentClassSubscription.unsubscribe();
    this.featuresSocialLinksContainerStyleSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    this.defaultFeaturesStyleSubscription.unsubscribe();
    this.featuresComponentLayoutSubscription.unsubscribe();
    this.facebookUrlSubscription.unsubscribe();
    this.twitterUrlSubscription.unsubscribe();
    this.instagramUrlSubscription.unsubscribe();
    this.youtubeUrlSubscription.unsubscribe();
    this.githubUrlSubscription.unsubscribe();
    this.linkedinUrlSubscription.unsubscribe();
    this.featuresMenuOptionsSubscription.unsubscribe();
  }
}
