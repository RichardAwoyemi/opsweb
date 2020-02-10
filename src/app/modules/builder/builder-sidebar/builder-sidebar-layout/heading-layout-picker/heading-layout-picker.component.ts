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
  headingButtonPaddingTop: number;
  headingButtonPaddingLeft: number;
  headingButtonPaddingRight: number;
  headingButtonPaddingBottom: number;
  headingAlignmentClass: string;
  headingSocialLinksContainerStyle: any;
  headingHeaderStyle: any;
  headingSubheaderStyle: any;
  headingContainerClass: string;
  headingButtonStyle: any;
  headingStyle: any;
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

  private headingContainerClassSubscription: Subscription;
  private headingHeaderStyleSubscription: Subscription;
  private headingSubheaderStyleSubscription: Subscription;
  private headingButtonStyleSubscription: Subscription;
  private headingStyleSubscription: Subscription;
  private headingAlignmentClassSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private defaultHeadingStyleSubscription: Subscription;
  private headingComponentLayoutSubscription: Subscription;

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

    this.headingAlignmentClassSubscription = this.builderHeadingService.headingAlignmentClass.subscribe(response => {
      this.headingAlignmentClass = response;
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

    this.headingButtonStyleSubscription = this.builderHeadingService.headingButtonStyle.subscribe(response => {
      if (response) {
        this.headingButtonStyle = response;
      }
    });

    this.headingContainerClassSubscription = this.builderHeadingService.headingContainerClass.subscribe(response => {
      if (response) {
        this.headingContainerClass = response;
      }
    })

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
    this.headingHeaderStyle['text-align'] = alignment;
    this.headingSubheaderStyle['text-align'] = alignment;
    this.headingContainerClass = 'container text-' + alignment;
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
    this.builderHeadingService.headingContainerClass.next(this.headingContainerClass);
  }

  ngOnDestroy() {
    this.headingHeaderStyleSubscription.unsubscribe();
    this.headingSubheaderStyleSubscription.unsubscribe();
    this.headingButtonStyleSubscription.unsubscribe();
    this.headingStyleSubscription.unsubscribe();
    this.headingAlignmentClassSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    this.defaultHeadingStyleSubscription.unsubscribe();
    this.headingComponentLayoutSubscription.unsubscribe();
    this.headingContainerClassSubscription.unsubscribe();
  }
}
