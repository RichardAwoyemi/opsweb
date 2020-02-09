import { Component, OnInit } from '@angular/core';
import { BuilderHeadingService } from '../../../builder-components/builder-heading/builder-heading.service';
import { Subscription } from 'rxjs';
import { ActiveTemplates } from '../../../builder';

@Component({
  selector: 'app-heading-layout-picker',
  templateUrl: './heading-layout-picker.component.html',
  styleUrls: ['./heading-layout-picker.component.css']
})
export class HeadingLayoutPickerComponent implements OnInit {
  headingPaddingTop: number;
  headingPaddingLeft: number;
  headingPaddingRight: number;
  headingPaddingBottom: number;
  headingHeaderPaddingTop: number;
  headingHeaderPaddingLeft: number;
  headingHeaderPaddingRight: number;
  headingHeaderPaddingBottom: number;
  headingSubheaderPaddingTop: number;
  headingSubheaderPaddingLeft: number;
  headingSubheaderPaddingRight: number;
  headingSubheaderPaddingBottom: number;
  headingSocialLinksMarginTop: number;
  headingSocialLinksMarginLeft: number;
  headingSocialLinksMarginRight: number;
  headingSocialLinksMarginBottom: number;
  headingPageLinksPaddingTop: number;
  headingPageLinksPaddingLeft: number;
  headingPageLinksPaddingRight: number;
  headingPageLinksPaddingBottom: number;
  headingAlignmentClass: string;
  headingSocialLinksContainerStyle: any;
  headingHeaderStyle: any;
  headingSubheaderStyle: any;
  headingStyle: any;
  headingCopyrightStyle: any;
  headingSocialLinksStyle: any;
  headingPageLinksStyle: any;
  headingTemplate: any = ActiveTemplates.Default;
  defaultHeadingStyle: any;
  headingComponentLayout: number = 0;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  headingMenuOptions: string[];

  private headingHeaderStyleSubscription: Subscription;
  private headingSubheaderStyleSubscription: Subscription;
  private headingStyleSubscription: Subscription;
  private headingSocialLinksStyleSubscription: Subscription;
  private headingPageLinksStyleSubscription: Subscription;
  private headingAlignmentClassSubscription: Subscription;
  private headingSocialLinksContainerStyleSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private defaultHeadingStyleSubscription: Subscription;
  private headingComponentLayoutSubscription: Subscription;
  private facebookUrlSubscription: Subscription;
  private twitterUrlSubscription: Subscription;
  private instagramUrlSubscription: Subscription;
  private youtubeUrlSubscription: Subscription;
  private githubUrlSubscription: Subscription;
  private linkedinUrlSubscription: Subscription;
  private headingMenuOptionsSubscription: Subscription;

  constructor(
    private builderHeadingService: BuilderHeadingService
  ) {
  }

  ngOnInit() {
    this.headingTemplateSubscription = this.builderHeadingService.headingTemplate.subscribe(response => {
      this.headingTemplate = response;

      this.defaultHeadingStyleSubscription = this.builderHeadingService.getDefaultHeadingStyle(this.headingTemplate).subscribe(response => {
        if (response) {
          this.defaultHeadingStyle = response;
        }
      });
    });

    this.headingMenuOptionsSubscription = this.builderHeadingService.headingMenuOptions.subscribe(response => {
      if (response) {
        let headingMenuOptions = [];
        Object.keys(response).forEach(function (key) {
          if (response[key] !== false) {
            headingMenuOptions.push(key);
          }
        });
        this.headingMenuOptions = headingMenuOptions;
      } else {
        this.headingMenuOptions = [];
      }
    });

    this.twitterUrlSubscription = this.builderHeadingService.twitterUrl.subscribe(response => {
      this.twitterUrl = response;
    });

    this.instagramUrlSubscription = this.builderHeadingService.instagramUrl.subscribe(response => {
      this.instagramUrl = response;
    });

    this.youtubeUrlSubscription = this.builderHeadingService.youtubeUrl.subscribe(response => {
      this.youtubeUrl = response;
    });

    this.githubUrlSubscription = this.builderHeadingService.githubUrl.subscribe(response => {
      this.githubUrl = response;
    });

    this.facebookUrlSubscription = this.builderHeadingService.facebookUrl.subscribe(response => {
      this.facebookUrl = response;
    });

    this.linkedinUrlSubscription = this.builderHeadingService.linkedinUrl.subscribe(response => {
      this.linkedinUrl = response;
    });


    this.headingAlignmentClassSubscription = this.builderHeadingService.headingAlignmentClass.subscribe(response => {
      this.headingAlignmentClass = response;
    });

    this.headingSocialLinksContainerStyleSubscription = this.builderHeadingService.headingSocialLinksContainerStyle.subscribe(response => {
      if (response) {
        this.headingSocialLinksContainerStyle = response;
      }
    });

    this.headingComponentLayoutSubscription = this.builderHeadingService.headingComponentLayout.subscribe(response => {
      if (response) {
        this.headingComponentLayout = response;
      }
    });

    this.headingHeaderStyleSubscription = this.builderHeadingService.headingHeaderStyle.subscribe(response => {
      if (response) {
        this.headingHeaderStyle = response;
        if (this.headingHeaderStyle['padding-top']) {
          this.headingHeaderPaddingTop = this.headingHeaderStyle['padding-top'].replace('px', '');
        }
        if (this.headingHeaderStyle['padding-left']) {
          this.headingHeaderPaddingLeft = this.headingHeaderStyle['padding-left'].replace('px', '');
        }
        if (this.headingHeaderStyle['padding-right']) {
          this.headingHeaderPaddingRight = this.headingHeaderStyle['padding-right'].replace('px', '');
        }
        if (this.headingHeaderStyle['padding-bottom']) {
          this.headingHeaderPaddingBottom = this.headingHeaderStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.headingSubheaderStyleSubscription = this.builderHeadingService.headingSubheaderStyle.subscribe(response => {
      if (response) {
        this.headingSubheaderStyle = response;
        if (this.headingSubheaderStyle['padding-top']) {
          this.headingSubheaderPaddingTop = this.headingSubheaderStyle['padding-top'].replace('px', '');
        }
        if (this.headingSubheaderStyle['padding-left']) {
          this.headingSubheaderPaddingLeft = this.headingSubheaderStyle['padding-left'].replace('px', '');
        }
        if (this.headingSubheaderStyle['padding-right']) {
          this.headingSubheaderPaddingRight = this.headingSubheaderStyle['padding-right'].replace('px', '');
        }
        if (this.headingSubheaderStyle['padding-bottom']) {
          this.headingSubheaderPaddingBottom = this.headingSubheaderStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.headingStyleSubscription = this.builderHeadingService.headingStyle.subscribe(response => {
      if (response) {
        this.headingStyle = response;
        if (this.headingStyle['padding-top']) {
          this.headingPaddingTop = this.headingStyle['padding-top'].replace('px', '');
        }
        if (this.headingStyle['padding-left']) {
          this.headingPaddingLeft = this.headingStyle['padding-left'].replace('px', '');
        }
        if (this.headingStyle['padding-right']) {
          this.headingPaddingRight = this.headingStyle['padding-right'].replace('px', '');
        }
        if (this.headingStyle['padding-bottom']) {
          this.headingPaddingBottom = this.headingStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.headingSocialLinksStyleSubscription = this.builderHeadingService.headingSocialLinksStyle.subscribe(response => {
      if (response) {
        this.headingSocialLinksStyle = response;
        if (this.headingSocialLinksStyle['margin-top']) {
          this.headingSocialLinksMarginTop = this.headingSocialLinksStyle['margin-top'].replace('px', '');
        }
        if (this.headingSocialLinksStyle['margin-left']) {
          this.headingSocialLinksMarginLeft = this.headingSocialLinksStyle['margin-left'].replace('px', '');
        }
        if (this.headingSocialLinksStyle['margin-right']) {
          this.headingSocialLinksMarginRight = this.headingSocialLinksStyle['margin-right'].replace('px', '');
        }
        if (this.headingSocialLinksStyle['margin-bottom']) {
          this.headingSocialLinksMarginBottom = this.headingSocialLinksStyle['margin-bottom'].replace('px', '');
        }
      }
    });

    this.headingPageLinksStyleSubscription = this.builderHeadingService.headingPageLinksStyle.subscribe(response => {
      if (response) {
        this.headingPageLinksStyle = response;
        if (this.headingPageLinksStyle['padding-top']) {
          this.headingPageLinksPaddingTop = this.headingPageLinksStyle['padding-top'].replace('px', '');
        }
        if (this.headingPageLinksStyle['padding-left']) {
          this.headingPageLinksPaddingLeft = this.headingPageLinksStyle['padding-left'].replace('px', '');
        }
        if (this.headingPageLinksStyle['padding-right']) {
          this.headingPageLinksPaddingRight = this.headingPageLinksStyle['padding-right'].replace('px', '');
        }
        if (this.headingPageLinksStyle['padding-bottom']) {
          this.headingPageLinksPaddingBottom = this.headingPageLinksStyle['padding-bottom'].replace('px', '');
        }
      }
    });
  }

  resetHeadingAlignment() {
    this.setHeadingAlignment('left');
    this.setComponentLayout(0);
  }

  setComponentLayout(headingComponentLayout: number) {
    this.builderHeadingService.headingComponentLayout.next(headingComponentLayout);
    if (headingComponentLayout == 1) {
      this.headingSocialLinksContainerStyle['margin-right'] = '-10px';
      this.headingSocialLinksContainerStyle['margin-bottom'] = '-10px';
      this.headingSocialLinksContainerStyle['padding-top'] = '4px';
      this.builderHeadingService.headingSocialLinksContainerStyle.next(this.headingSocialLinksContainerStyle);
    } else {
      this.headingSocialLinksContainerStyle['margin-right'] = '0';
      this.headingSocialLinksContainerStyle['padding-top'] = '0px';
      this.builderHeadingService.headingSocialLinksContainerStyle.next(this.headingSocialLinksContainerStyle);
    }
  }


  resetHeadingCopyrightPaddingStyle() {
    this.headingCopyrightStyle['padding-top'] = this.defaultHeadingStyle['headingCopyrightStyle']['padding-top'];
    this.headingCopyrightStyle['padding-left'] = this.defaultHeadingStyle['headingCopyrightStyle']['padding-left'];
    this.headingCopyrightStyle['padding-right'] = this.defaultHeadingStyle['headingCopyrightStyle']['padding-right'];
    this.headingCopyrightStyle['padding-bottom'] = this.defaultHeadingStyle['headingCopyrightStyle']['padding-bottom'];
    this.builderHeadingService.headingCopyrightStyle.next(this.headingCopyrightStyle);
  }

  setHeadingSocialLinksMarginTop() {
    this.headingSocialLinksStyle['margin-top'] = `${ this.headingSocialLinksMarginTop }px`;
    this.builderHeadingService.headingSocialLinksStyle.next(this.headingSocialLinksStyle);
  }

  setHeadingSocialLinksMarginLeft() {
    this.headingSocialLinksStyle['margin-left'] = `${ this.headingSocialLinksMarginLeft }px`;
    this.builderHeadingService.headingSocialLinksStyle.next(this.headingSocialLinksStyle);
  }

  setHeadingSocialLinksMarginRight() {
    this.headingSocialLinksStyle['margin-right'] = `${ this.headingSocialLinksMarginRight }px`;
    this.builderHeadingService.headingSocialLinksStyle.next(this.headingSocialLinksStyle);
  }

  setHeadingSocialLinksMarginBottom() {
    this.headingSocialLinksStyle['margin-bottom'] = `${ this.headingSocialLinksMarginBottom }px`;
    this.builderHeadingService.headingSocialLinksStyle.next(this.headingSocialLinksStyle);
  }

  resetHeadingSocialLinksMarginStyle() {
    this.headingSocialLinksStyle['margin-top'] = this.defaultHeadingStyle['headingSocialLinksStyle']['margin-top'];
    this.headingSocialLinksStyle['margin-left'] = this.defaultHeadingStyle['headingSocialLinksStyle']['margin-left'];
    this.headingSocialLinksStyle['margin-right'] = this.defaultHeadingStyle['headingSocialLinksStyle']['margin-right'];
    this.headingSocialLinksStyle['margin-bottom'] = this.defaultHeadingStyle['headingSocialLinksStyle']['margin-bottom'];
    this.builderHeadingService.headingSocialLinksStyle.next(this.headingSocialLinksStyle);
  }

  setHeadingPageLinksPaddingTop() {
    this.headingPageLinksStyle['padding-top'] = `${ this.headingPageLinksPaddingTop }px`;
    this.builderHeadingService.headingPageLinksStyle.next(this.headingPageLinksStyle);
  }

  setHeadingPageLinksPaddingLeft() {
    this.headingPageLinksStyle['padding-left'] = `${ this.headingPageLinksPaddingLeft }px`;
    this.builderHeadingService.headingPageLinksStyle.next(this.headingPageLinksStyle);
  }

  setHeadingPageLinksPaddingRight() {
    this.headingPageLinksStyle['padding-right'] = `${ this.headingPageLinksPaddingRight }px`;
    this.builderHeadingService.headingPageLinksStyle.next(this.headingPageLinksStyle);
  }

  setHeadingPageLinksPaddingBottom() {
    this.headingPageLinksStyle['padding-bottom'] = `${ this.headingPageLinksPaddingBottom }px`;
    this.builderHeadingService.headingPageLinksStyle.next(this.headingPageLinksStyle);
  }

  resetHeadingPageLinksPaddingStyle() {
    this.headingPageLinksStyle['padding-top'] = this.defaultHeadingStyle['headingPageLinksStyle']['padding-top'];
    this.headingPageLinksStyle['padding-left'] = this.defaultHeadingStyle['headingPageLinksStyle']['padding-left'];
    this.headingPageLinksStyle['padding-right'] = this.defaultHeadingStyle['headingPageLinksStyle']['padding-right'];
    this.headingPageLinksStyle['padding-bottom'] = this.defaultHeadingStyle['headingPageLinksStyle']['padding-bottom'];
    this.builderHeadingService.headingPageLinksStyle.next(this.headingPageLinksStyle);
  }

  setHeadingHeaderPaddingTop() {
    this.headingHeaderStyle['padding-top'] = `${ this.headingHeaderPaddingTop }px`;
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
  }

  setHeadingHeaderPaddingLeft() {
    this.headingHeaderStyle['padding-left'] = `${ this.headingHeaderPaddingLeft }px`;
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
  }

  setHeadingHeaderPaddingRight() {
    this.headingHeaderStyle['padding-right'] = `${ this.headingHeaderPaddingRight }px`;
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
  }

  setHeadingHeaderPaddingBottom() {
    this.headingHeaderStyle['padding-bottom'] = `${ this.headingHeaderPaddingBottom }px`;
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
  }

  resetHeadingHeaderPaddingStyle() {
    this.headingHeaderStyle['padding-top'] = this.defaultHeadingStyle['headingHeaderStyle']['padding-top'];
    this.headingHeaderStyle['padding-left'] = this.defaultHeadingStyle['headingHeaderStyle']['padding-left'];
    this.headingHeaderStyle['padding-right'] = this.defaultHeadingStyle['headingHeaderStyle']['padding-right'];
    this.headingHeaderStyle['padding-bottom'] = this.defaultHeadingStyle['headingHeaderStyle']['padding-bottom'];
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
  }

  setHeadingSubheaderPaddingTop() {
    this.headingSubheaderStyle['padding-top'] = `${ this.headingSubheaderPaddingTop }px`;
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  setHeadingSubheaderPaddingLeft() {
    this.headingSubheaderStyle['padding-left'] = `${ this.headingSubheaderPaddingLeft }px`;
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  setHeadingSubheaderPaddingRight() {
    this.headingSubheaderStyle['padding-right'] = `${ this.headingSubheaderPaddingRight }px`;
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  setHeadingSubheaderPaddingBottom() {
    this.headingSubheaderStyle['padding-bottom'] = `${ this.headingSubheaderPaddingBottom }px`;
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  resetHeadingSubheaderPaddingStyle() {
    this.headingSubheaderStyle['padding-top'] = this.defaultHeadingStyle['headingSubheaderStyle']['padding-top'];
    this.headingSubheaderStyle['padding-left'] = this.defaultHeadingStyle['headingSubheaderStyle']['padding-left'];
    this.headingSubheaderStyle['padding-right'] = this.defaultHeadingStyle['headingSubheaderStyle']['padding-right'];
    this.headingSubheaderStyle['padding-bottom'] = this.defaultHeadingStyle['headingSubheaderStyle']['padding-bottom'];
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
  }

  setHeadingPaddingTop() {
    this.headingStyle['padding-top'] = `${ this.headingPaddingTop }px`;
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setHeadingPaddingLeft() {
    this.headingStyle['padding-left'] = `${ this.headingPaddingLeft }px`;
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setHeadingPaddingRight() {
    this.headingStyle['padding-right'] = `${ this.headingPaddingRight }px`;
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setHeadingPaddingBottom() {
    this.headingStyle['padding-bottom'] = `${ this.headingPaddingBottom }px`;
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  resetHeadingPaddingStyle() {
    this.headingStyle['padding-top'] = this.defaultHeadingStyle['headingStyle']['padding-top'];
    this.headingStyle['padding-left'] = this.defaultHeadingStyle['headingStyle']['padding-left'];
    this.headingStyle['padding-right'] = this.defaultHeadingStyle['headingStyle']['padding-right'];
    this.headingStyle['padding-bottom'] = this.defaultHeadingStyle['headingStyle']['padding-bottom'];
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setComponentLayoutSelectorClass(alignmentClass: string, componentLayout: number) {
    if (alignmentClass == this.headingAlignmentClass && componentLayout === this.headingComponentLayout) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  setHeadingAlignment(alignment: string) {
    this.headingStyle['text-align'] = alignment;
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  ngOnDestroy() {
    this.headingHeaderStyleSubscription.unsubscribe();
    this.headingSubheaderStyleSubscription.unsubscribe();
    this.headingStyleSubscription.unsubscribe();
    this.headingSocialLinksStyleSubscription.unsubscribe();
    this.headingPageLinksStyleSubscription.unsubscribe();
    this.headingAlignmentClassSubscription.unsubscribe();
    this.headingSocialLinksContainerStyleSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    this.defaultHeadingStyleSubscription.unsubscribe();
    this.headingComponentLayoutSubscription.unsubscribe();
    this.facebookUrlSubscription.unsubscribe();
    this.twitterUrlSubscription.unsubscribe();
    this.instagramUrlSubscription.unsubscribe();
    this.youtubeUrlSubscription.unsubscribe();
    this.githubUrlSubscription.unsubscribe();
    this.linkedinUrlSubscription.unsubscribe();
    this.headingMenuOptionsSubscription.unsubscribe();
  }
}
