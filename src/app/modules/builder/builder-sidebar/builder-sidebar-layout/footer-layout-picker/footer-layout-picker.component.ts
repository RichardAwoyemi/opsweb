import { Component, OnInit } from '@angular/core';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-layout-picker',
  templateUrl: './footer-layout-picker.component.html',
  styleUrls: ['./footer-layout-picker.component.css']
})
export class FooterLayoutPickerComponent implements OnInit {
  footerPaddingTop: number;
  footerPaddingLeft: number;
  footerPaddingRight: number;
  footerPaddingBottom: number;
  footerCopyrightPaddingTop: number;
  footerCopyrightPaddingLeft: number;
  footerCopyrightPaddingRight: number;
  footerCopyrightPaddingBottom: number;
  footerSocialLinksMarginTop: number;
  footerSocialLinksMarginLeft: number;
  footerSocialLinksMarginRight: number;
  footerSocialLinksMarginBottom: number;
  footerPageLinksPaddingTop: number;
  footerPageLinksPaddingLeft: number;
  footerPageLinksPaddingRight: number;
  footerPageLinksPaddingBottom: number;
  footerAlignmentClass: string;
  footerSocialLinksContainerStyle: any;
  footerStyle: any;
  footerCopyrightStyle: any;
  footerSocialLinksStyle: any;
  footerPageLinksStyle: any;
  footerTemplate: any;
  defaultFooterStyle: any;
  footerComponentLayout: number = 0;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  footerMenuOptions: string[];

  private footerStyleSubscription: Subscription;
  private footerCopyrightStyleSubscription: Subscription;
  private footerSocialLinksStyleSubscription: Subscription;
  private footerPageLinksStyleSubscription: Subscription;
  private footerAlignmentClassSubscription: Subscription;
  private footerSocialLinksContainerStyleSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;
  private footerComponentLayoutSubscription: Subscription;
  private facebookUrlSubscription: Subscription;
  private twitterUrlSubscription: Subscription;
  private instagramUrlSubscription: Subscription;
  private youtubeUrlSubscription: Subscription;
  private githubUrlSubscription: Subscription;
  private linkedinUrlSubscription: Subscription;
  private footerMenuOptionsSubscription: Subscription;

  constructor(
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.footerTemplateSubscription = this.builderFooterService.footerTemplate.subscribe(response => {
      this.footerTemplate = response;

      this.defaultFooterStyleSubscription = this.builderFooterService.getDefaultFooterStyle(this.footerTemplate).subscribe(response => {
        if (response) {
          this.defaultFooterStyle = response;
        }
      });
    });

    this.footerMenuOptionsSubscription = this.builderFooterService.footerMenuOptions.subscribe(response => {
      if (response) {
        let footerMenuOptions = [];
        Object.keys(response).forEach(function (key) {
          if (response[key] !== false) {
            footerMenuOptions.push(key);
          }
        });
        this.footerMenuOptions = footerMenuOptions;
      } else {
        this.footerMenuOptions = [];
      }
    });

    this.twitterUrlSubscription = this.builderFooterService.twitterUrl.subscribe(response => {
      this.twitterUrl = response;
    });

    this.instagramUrlSubscription = this.builderFooterService.instagramUrl.subscribe(response => {
      this.instagramUrl = response;
    });

    this.youtubeUrlSubscription = this.builderFooterService.youtubeUrl.subscribe(response => {
      this.youtubeUrl = response;
    });

    this.githubUrlSubscription = this.builderFooterService.githubUrl.subscribe(response => {
      this.githubUrl = response;
    });

    this.facebookUrlSubscription = this.builderFooterService.facebookUrl.subscribe(response => {
      this.facebookUrl = response;
    });

    this.linkedinUrlSubscription = this.builderFooterService.linkedinUrl.subscribe(response => {
      this.linkedinUrl = response;
    });


    this.footerAlignmentClassSubscription = this.builderFooterService.footerAlignmentClass.subscribe(response => {
      this.footerAlignmentClass = response;
    });

    this.footerSocialLinksContainerStyleSubscription = this.builderFooterService.footerSocialLinksContainerStyle.subscribe(response => {
      if (response) {
        this.footerSocialLinksContainerStyle = response;
      }
    });

    this.footerComponentLayoutSubscription = this.builderFooterService.footerComponentLayout.subscribe(response => {
      if (response) {
        this.footerComponentLayout = response;
      }
    });

    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;
        if (this.footerStyle['padding-top']) {
          this.footerPaddingTop = this.footerStyle['padding-top'].replace('px', '');
        }
        if (this.footerStyle['padding-left']) {
          this.footerPaddingLeft = this.footerStyle['padding-left'].replace('px', '');
        }
        if (this.footerStyle['padding-right']) {
          this.footerPaddingRight = this.footerStyle['padding-right'].replace('px', '');
        }
        if (this.footerStyle['padding-bottom']) {
          this.footerPaddingBottom = this.footerStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.footerCopyrightStyleSubscription = this.builderFooterService.footerCopyrightStyle.subscribe(response => {
      if (response) {
        this.footerCopyrightStyle = response;
        if (this.footerCopyrightStyle['padding-top']) {
          this.footerCopyrightPaddingTop = this.footerCopyrightStyle['padding-top'].replace('px', '');
        }
        if (this.footerCopyrightStyle['padding-left']) {
          this.footerCopyrightPaddingLeft = this.footerCopyrightStyle['padding-left'].replace('px', '');
        }
        if (this.footerCopyrightStyle['padding-right']) {
          this.footerCopyrightPaddingRight = this.footerCopyrightStyle['padding-right'].replace('px', '');
        }
        if (this.footerCopyrightStyle['padding-bottom']) {
          this.footerCopyrightPaddingBottom = this.footerCopyrightStyle['padding-bottom'].replace('px', '');
        }
      }
    });

    this.footerSocialLinksStyleSubscription = this.builderFooterService.footerSocialLinksStyle.subscribe(response => {
      if (response) {
        this.footerSocialLinksStyle = response;
        if (this.footerSocialLinksStyle['margin-top']) {
          this.footerSocialLinksMarginTop = this.footerSocialLinksStyle['margin-top'].replace('px', '');
        }
        if (this.footerSocialLinksStyle['margin-left']) {
          this.footerSocialLinksMarginLeft = this.footerSocialLinksStyle['margin-left'].replace('px', '');
        }
        if (this.footerSocialLinksStyle['margin-right']) {
          this.footerSocialLinksMarginRight = this.footerSocialLinksStyle['margin-right'].replace('px', '');
        }
        if (this.footerSocialLinksStyle['margin-bottom']) {
          this.footerSocialLinksMarginBottom = this.footerSocialLinksStyle['margin-bottom'].replace('px', '');
        }
      }
    });

    this.footerPageLinksStyleSubscription = this.builderFooterService.footerPageLinksStyle.subscribe(response => {
      if (response) {
        this.footerPageLinksStyle = response;
        if (this.footerPageLinksStyle['padding-top']) {
          this.footerPageLinksPaddingTop = this.footerPageLinksStyle['padding-top'].replace('px', '');
        }
        if (this.footerPageLinksStyle['padding-left']) {
          this.footerPageLinksPaddingLeft = this.footerPageLinksStyle['padding-left'].replace('px', '');
        }
        if (this.footerPageLinksStyle['padding-right']) {
          this.footerPageLinksPaddingRight = this.footerPageLinksStyle['padding-right'].replace('px', '');
        }
        if (this.footerPageLinksStyle['padding-bottom']) {
          this.footerPageLinksPaddingBottom = this.footerPageLinksStyle['padding-bottom'].replace('px', '');
        }
      }
    });
  }

  resetFooterAlignment() {
    this.setFooterAlignment('text-center');
    this.setComponentLayout(0);
  }

  setComponentLayout(footerComponentLayout: number) {
    this.builderFooterService.footerComponentLayout.next(footerComponentLayout);
    if (footerComponentLayout == 1) {
      this.footerSocialLinksContainerStyle['margin-right'] = '-10px';
      this.footerSocialLinksContainerStyle['margin-bottom'] = '-10px';
      this.footerSocialLinksContainerStyle['padding-top'] = '4px';
      this.builderFooterService.footerSocialLinksContainerStyle.next(this.footerSocialLinksContainerStyle);
    } else {
      this.footerSocialLinksContainerStyle['margin-right'] = '0';
      this.footerSocialLinksContainerStyle['padding-top'] = '0px';
      this.builderFooterService.footerSocialLinksContainerStyle.next(this.footerSocialLinksContainerStyle);
    }
  }

  setFooterAlignment(footerAlignment: string) {
    this.builderFooterService.footerAlignmentClass.next(footerAlignment);
    if (footerAlignment == 'text-left') {
      this.footerSocialLinksContainerStyle['margin-left'] = '-12px';
      this.builderFooterService.footerSocialLinksContainerStyle.next(this.footerSocialLinksContainerStyle);
    } else if (footerAlignment == 'text-right') {
      this.footerSocialLinksContainerStyle['margin-right'] = '-10px';
      this.builderFooterService.footerSocialLinksContainerStyle.next(this.footerSocialLinksContainerStyle);
    } else {
      this.footerSocialLinksContainerStyle['margin-left'] = '0px';
      this.builderFooterService.footerSocialLinksContainerStyle.next(this.footerSocialLinksContainerStyle);
    }
  }

  setFooterCopyrightPaddingTop() {
    this.footerCopyrightStyle['padding-top'] = `${ this.footerCopyrightPaddingTop }px`;
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  setFooterCopyrightPaddingLeft() {
    this.footerCopyrightStyle['padding-left'] = `${ this.footerCopyrightPaddingLeft }px`;
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  setFooterCopyrightPaddingRight() {
    this.footerCopyrightStyle['padding-right'] = `${ this.footerCopyrightPaddingRight }px`;
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  setFooterCopyrightPaddingBottom() {
    this.footerCopyrightStyle['padding-bottom'] = `${ this.footerCopyrightPaddingBottom }px`;
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  resetFooterCopyrightPaddingStyle() {
    this.footerCopyrightStyle['padding-top'] = this.defaultFooterStyle['footerCopyrightStyle']['padding-top'];
    this.footerCopyrightStyle['padding-left'] = this.defaultFooterStyle['footerCopyrightStyle']['padding-left'];
    this.footerCopyrightStyle['padding-right'] = this.defaultFooterStyle['footerCopyrightStyle']['padding-right'];
    this.footerCopyrightStyle['padding-bottom'] = this.defaultFooterStyle['footerCopyrightStyle']['padding-bottom'];
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  setFooterSocialLinksMarginTop() {
    this.footerSocialLinksStyle['margin-top'] = `${ this.footerSocialLinksMarginTop }px`;
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
  }

  setFooterSocialLinksMarginLeft() {
    this.footerSocialLinksStyle['margin-left'] = `${ this.footerSocialLinksMarginLeft }px`;
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
  }

  setFooterSocialLinksMarginRight() {
    this.footerSocialLinksStyle['margin-right'] = `${ this.footerSocialLinksMarginRight }px`;
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
  }

  setFooterSocialLinksMarginBottom() {
    this.footerSocialLinksStyle['margin-bottom'] = `${ this.footerSocialLinksMarginBottom }px`;
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
  }

  resetFooterSocialLinksMarginStyle() {
    this.footerSocialLinksStyle['margin-top'] = this.defaultFooterStyle['footerSocialLinksStyle']['margin-top'];
    this.footerSocialLinksStyle['margin-left'] = this.defaultFooterStyle['footerSocialLinksStyle']['margin-left'];
    this.footerSocialLinksStyle['margin-right'] = this.defaultFooterStyle['footerSocialLinksStyle']['margin-right'];
    this.footerSocialLinksStyle['margin-bottom'] = this.defaultFooterStyle['footerSocialLinksStyle']['margin-bottom'];
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
  }

  setFooterPageLinksPaddingTop() {
    this.footerPageLinksStyle['padding-top'] = `${ this.footerPageLinksPaddingTop }px`;
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  setFooterPageLinksPaddingLeft() {
    this.footerPageLinksStyle['padding-left'] = `${ this.footerPageLinksPaddingLeft }px`;
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  setFooterPageLinksPaddingRight() {
    this.footerPageLinksStyle['padding-right'] = `${ this.footerPageLinksPaddingRight }px`;
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  setFooterPageLinksPaddingBottom() {
    this.footerPageLinksStyle['padding-bottom'] = `${ this.footerPageLinksPaddingBottom }px`;
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  resetFooterPageLinksPaddingStyle() {
    this.footerPageLinksStyle['padding-top'] = this.defaultFooterStyle['footerPageLinksStyle']['padding-top'];
    this.footerPageLinksStyle['padding-left'] = this.defaultFooterStyle['footerPageLinksStyle']['padding-left'];
    this.footerPageLinksStyle['padding-right'] = this.defaultFooterStyle['footerPageLinksStyle']['padding-right'];
    this.footerPageLinksStyle['padding-bottom'] = this.defaultFooterStyle['footerPageLinksStyle']['padding-bottom'];
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  setFooterPaddingTop() {
    this.footerStyle['padding-top'] = `${ this.footerPaddingTop }px`;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  setFooterPaddingLeft() {
    this.footerStyle['padding-left'] = `${ this.footerPaddingLeft }px`;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  setFooterPaddingRight() {
    this.footerStyle['padding-right'] = `${ this.footerPaddingRight }px`;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  setFooterPaddingBottom() {
    this.footerStyle['padding-bottom'] = `${ this.footerPaddingBottom }px`;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  resetFooterPaddingStyle() {
    this.footerStyle['padding-top'] = this.defaultFooterStyle['footerStyle']['padding-top'];
    this.footerStyle['padding-left'] = this.defaultFooterStyle['footerStyle']['padding-left'];
    this.footerStyle['padding-right'] = this.defaultFooterStyle['footerStyle']['padding-right'];
    this.footerStyle['padding-bottom'] = this.defaultFooterStyle['footerStyle']['padding-bottom'];
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  setComponentLayoutSelectorClass(alignmentClass: string, componentLayout: number) {
    if (alignmentClass == this.footerAlignmentClass && componentLayout === this.footerComponentLayout) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  ngOnDestroy() {
    this.footerStyleSubscription.unsubscribe();
    this.footerCopyrightStyleSubscription.unsubscribe();
    this.footerSocialLinksStyleSubscription.unsubscribe();
    this.footerPageLinksStyleSubscription.unsubscribe();
    this.footerAlignmentClassSubscription.unsubscribe();
    this.footerSocialLinksContainerStyleSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
    this.defaultFooterStyleSubscription.unsubscribe();
    this.footerComponentLayoutSubscription.unsubscribe();
    this.facebookUrlSubscription.unsubscribe();
    this.twitterUrlSubscription.unsubscribe();
    this.instagramUrlSubscription.unsubscribe();
    this.youtubeUrlSubscription.unsubscribe();
    this.githubUrlSubscription.unsubscribe();
    this.linkedinUrlSubscription.unsubscribe();
    this.footerMenuOptionsSubscription.unsubscribe();
  }
}
