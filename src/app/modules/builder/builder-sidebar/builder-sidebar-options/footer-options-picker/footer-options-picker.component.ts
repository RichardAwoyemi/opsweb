import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { ActiveComponentsPartialSelector } from '../../../builder';
import { WebsiteService } from '../../../../../shared/services/website.service';

@Component({
  selector: 'app-footer-options-picker',
  templateUrl: './footer-options-picker.component.html',
  styleUrls: ['./footer-options-picker.component.css'],
})
export class FooterOptionsPickerComponent implements OnInit, OnDestroy {
  fontNames: any;
  fontUnits: any;
  footerStyle: any;
  navbarMenuOptions: any;
  footerCopyrightStyle: any;
  footerSocialLinksStyle: any;
  footerPageLinksStyle: any;
  footerCopyrightFontSize: number;
  defaultFooterStyle: any;
  pageComponents: any;
  footerTemplate: string;
  footerCopyrightFontUnit = 'px';
  footerSocialLinksFontSize: number;
  footerSocialLinksFontUnit = 'px';
  footerPageLinksFontSize: number;
  footerPageLinksFontUnit = 'px';
  footerPageLinkFontName = 'Avenir Next Regular';
  footerCopyrightFontName = 'Avenir Next Regular';
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteChangeCount: number;

  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private footerStyleSubscription: Subscription;
  private footerCopyrightStyleSubscription: Subscription;
  private footerSocialLinksStyleSubscription: Subscription;
  private footerPageLinksStyleSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;
  private facebookUrlSubscription: Subscription;
  private twitterUrlSubscription: Subscription;
  private instagramUrlSubscription: Subscription;
  private youtubeUrlSubscription: Subscription;
  private githubUrlSubscription: Subscription;
  private linkedinUrlSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private builderFooterService: BuilderFooterService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
  ) {
  }

  ngOnInit() {
    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
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

    this.footerTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(templateResponse => {
      if (templateResponse) {
        this.footerTemplate = templateResponse['template'];

        this.defaultFooterStyleSubscription = this.builderFooterService.getDefaultFooterStyle(this.footerTemplate).subscribe(response => {
          if (response) {
            this.defaultFooterStyle = response;
          }
        });
      }
    });

    this.footerCopyrightStyleSubscription = this.builderFooterService.footerCopyrightStyle.subscribe(response => {
      if (response) {
        this.footerCopyrightStyle = response;

        if (this.footerCopyrightStyle['font-size']) {
          if (this.footerCopyrightStyle['font-size'].indexOf('px') > -1) {
            this.footerCopyrightFontSize = this.footerCopyrightStyle['font-size'].replace('px', '');
          }
          if (this.footerCopyrightStyle['font-size'].indexOf('em') > -1) {
            this.footerCopyrightFontSize = this.footerCopyrightStyle['font-size'].replace('em', '');
          }
        }

        const footerFontNames = this.footerCopyrightStyle['font-family'].split(',');
        this.footerCopyrightFontName = footerFontNames[0].replace(/'/g, '');
      }
    });

    this.footerPageLinksStyleSubscription = this.builderFooterService.footerPageLinksStyle.subscribe(response => {
      if (response) {
        this.footerPageLinksStyle = response;

        if (this.footerPageLinksStyle['font-size']) {
          if (this.footerPageLinksStyle['font-size'].indexOf('px') > -1) {
            this.footerPageLinksFontSize = this.footerPageLinksStyle['font-size'].replace('px', '');
          }
          if (this.footerPageLinksStyle['font-size'].indexOf('em') > -1) {
            this.footerPageLinksFontSize = this.footerPageLinksStyle['font-size'].replace('em', '');
          }
        }

        const footerFontNames = this.footerPageLinksStyle['font-family'].split(',');
        this.footerPageLinkFontName = footerFontNames[0].replace(/'/g, '');
      }
    });

    this.footerSocialLinksStyleSubscription = this.builderFooterService.footerSocialLinksStyle.subscribe(response => {
      if (response) {
        this.footerSocialLinksStyle = response;

        if (this.footerSocialLinksStyle['font-size']) {
          if (this.footerSocialLinksStyle['font-size'].indexOf('px') > -1) {
            this.footerSocialLinksFontSize = this.footerSocialLinksStyle['font-size'].replace('px', '');
          }
          if (this.footerSocialLinksStyle['font-size'].indexOf('em') > -1) {
            this.footerSocialLinksFontSize = this.footerSocialLinksStyle['font-size'].replace('em', '');
          }
        }
      }
    });

    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });
  }

  setFooterSocialLinks(key, value) {
    const targetComponentLocation = this.builderComponentsService.getTargetComponentByName(ActiveComponentsPartialSelector.Footer);
    for (let i = 0; i < targetComponentLocation.length; i++) {
      const activePageIndex = targetComponentLocation[i]['activePageIndex'];
      const activeComponentIndex = targetComponentLocation[i]['activeComponentIndex'];
      this.pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['footerSocialLinks'][key] = value;
    }
    this.builderComponentsService.pageComponents.next(this.pageComponents);
  }

  resetFooterCopyrightFontName() {
    this.footerCopyrightStyle['font-family'] = this.defaultFooterStyle['footerCopyrightStyle']['font-family'];
    const footerFontNames = this.footerCopyrightStyle['font-family'].split(',');
    this.footerCopyrightFontName = footerFontNames[0].replace(/'/g, '');
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerCopyrightStyle', this.footerCopyrightStyle);
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  onFooterCopyrightFontNameChange() {
    this.footerCopyrightStyle['font-family'] = this.footerCopyrightFontName;
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerCopyrightStyle', this.footerCopyrightStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFooterCopyrightFontSize() {
    this.footerCopyrightStyle['font-size'] = this.defaultFooterStyle['footerCopyrightStyle']['font-size'];
    this.footerCopyrightFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerCopyrightStyle', this.footerCopyrightStyle);
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
  }

  setFooterCopyrightFontSize() {
    this.footerCopyrightStyle['font-size'] = this.footerCopyrightFontSize + this.footerCopyrightFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerCopyrightStyle', this.footerCopyrightStyle);
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFooterCopyrightFontUnitChange() {
    if (this.footerCopyrightFontUnit === 'em') {
      if (this.footerCopyrightFontSize < 16) {
        this.footerCopyrightFontSize = 16;
      }
      this.footerCopyrightFontSize = Math.round(this.footerCopyrightFontSize / 16);
    }

    if (this.footerCopyrightFontUnit === 'px') {
      this.footerCopyrightFontSize = Math.round(this.footerCopyrightFontSize * 16);
    }

    this.footerCopyrightStyle['font-size'] = this.footerCopyrightFontSize + this.footerCopyrightFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerCopyrightStyle', this.footerCopyrightStyle);
    this.builderFooterService.footerCopyrightStyle.next(this.footerCopyrightStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFooterSocialLinksFontSize() {
    this.footerSocialLinksStyle['font-size'] = this.defaultFooterStyle['footerSocialLinksStyle']['font-size'];
    this.footerSocialLinksFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerSocialLinksStyle', this.footerSocialLinksStyle);
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
  }

  setFooterSocialLinksFontSize() {
    this.footerSocialLinksStyle['font-size'] = this.footerSocialLinksFontSize + this.footerSocialLinksFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerSocialLinksStyle', this.footerSocialLinksStyle);
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFooterSocialLinksFontUnitChange() {
    if (this.footerSocialLinksFontUnit === 'em') {
      if (this.footerSocialLinksFontSize < 16) {
        this.footerSocialLinksFontSize = 16;
      }
      this.footerSocialLinksFontSize = Math.round(this.footerSocialLinksFontSize / 16);
    }

    if (this.footerSocialLinksFontUnit === 'px') {
      this.footerSocialLinksFontSize = Math.round(this.footerSocialLinksFontSize * 16);
    }

    this.footerSocialLinksStyle['font-size'] = this.footerSocialLinksFontSize + this.footerSocialLinksFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerSocialLinksStyle', this.footerSocialLinksStyle);
    this.builderFooterService.footerSocialLinksStyle.next(this.footerSocialLinksStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFooterPageLinksFontName() {
    this.footerPageLinksStyle['font-family'] = this.defaultFooterStyle['footerPageLinksStyle']['font-family'];
    const footerFontNames = this.footerPageLinksStyle['font-family'].split(',');
    this.footerPageLinkFontName = footerFontNames[0].replace(/'/g, '');
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerPageLinksStyle', this.footerPageLinksStyle);
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  onFooterPageLinksFontNameChange() {
    this.footerPageLinksStyle['font-family'] = this.footerPageLinkFontName;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerPageLinksStyle', this.footerPageLinksStyle);
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFooterPagesLinkFontSize() {
    this.footerPageLinksStyle['font-size'] = this.defaultFooterStyle['footerPageLinksStyle']['font-size'];
    this.footerPageLinksFontUnit = 'px';
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerPageLinksStyle', this.footerPageLinksStyle);
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
  }

  setFooterPageLinksFontSize() {
    this.footerPageLinksStyle['font-size'] = this.footerPageLinksFontSize + this.footerPageLinksFontUnit;
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerPageLinksStyle', this.footerPageLinksStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFooterPageLinksFontUnitChange() {
    if (this.footerPageLinksFontUnit === 'em') {
      if (this.footerPageLinksFontSize < 16) {
        this.footerPageLinksFontSize = 16;
      }
      this.footerPageLinksFontSize = Math.round(this.footerPageLinksFontSize / 16);
    }

    if (this.footerPageLinksFontUnit === 'px') {
      this.footerPageLinksFontSize = Math.round(this.footerPageLinksFontSize * 16);
    }

    this.footerPageLinksStyle['font-size'] = this.footerPageLinksFontSize + this.footerPageLinksFontUnit;
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerPageLinksStyle', this.footerPageLinksStyle);
    this.builderFooterService.footerPageLinksStyle.next(this.footerPageLinksStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onSocialLinkChange(platform: string) {
    if (platform === 'facebook') {
      if (this.facebookUrl) {
        this.setFooterSocialLinks('facebookUrl', this.facebookUrl);
        this.builderFooterService.facebookUrl.next(this.facebookUrl);
      }
    } else if (platform === 'twitter') {
      if (this.twitterUrl) {
        this.setFooterSocialLinks('twitterUrl', this.twitterUrl);
        this.builderFooterService.twitterUrl.next(this.twitterUrl);
      }
    } else if (platform === 'instagram') {
      if (this.instagramUrl) {
        this.setFooterSocialLinks('instagramUrl', this.instagramUrl);
        this.builderFooterService.instagramUrl.next(this.instagramUrl);
      }
    } else if (platform === 'youtube') {
      if (this.youtubeUrl) {
        this.setFooterSocialLinks('youtubeUrl', this.youtubeUrl);
        this.builderFooterService.youtubeUrl.next(this.youtubeUrl);
      }
    } else if (platform === 'github') {
      if (this.githubUrl) {
        this.setFooterSocialLinks('githubUrl', this.githubUrl);
        this.builderFooterService.githubUrl.next(this.githubUrl);
      }
    } else if (platform === 'linkedin') {
      if (this.linkedinUrl) {
        this.setFooterSocialLinks('linkedinUrl', this.linkedinUrl);
        this.builderFooterService.linkedinUrl.next(this.linkedinUrl);
      }
    }
  }

  toggleFooterMenuOptionVisibility(index: number) {
    let footerMenuOptions = this.builderFooterService.footerMenuOptions.getValue();
    const selectedNavbarMenuOption = this.navbarMenuOptions[index];

    if (footerMenuOptions === null) {
      footerMenuOptions = [];
      for (let i = 0; i < this.navbarMenuOptions.length; i++) {
        footerMenuOptions[this.navbarMenuOptions[i]] = this.navbarMenuOptions[i] === selectedNavbarMenuOption;
      }
    } else {
      Object.keys(footerMenuOptions).forEach(function (key) {
        if (key === selectedNavbarMenuOption) {
          footerMenuOptions[selectedNavbarMenuOption] = !footerMenuOptions[key];
        }
      });
      footerMenuOptions = this.builderFooterService.sortFooterMenuOptions(footerMenuOptions, this.navbarMenuOptions);
    }

    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', footerMenuOptions);
    this.builderFooterService.footerMenuOptions.next(footerMenuOptions);
  }

  checkIfFooterMenuOptionIsVisible(menuOption: string): boolean {
    const footerMenuOptions = this.builderFooterService.footerMenuOptions.getValue();
    if (footerMenuOptions && footerMenuOptions[menuOption]) {
      return footerMenuOptions[menuOption];
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.fontNamesSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.footerStyleSubscription.unsubscribe();
    this.footerCopyrightStyleSubscription.unsubscribe();
    this.footerSocialLinksStyleSubscription.unsubscribe();
    this.footerPageLinksStyleSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
    this.defaultFooterStyleSubscription.unsubscribe();
    this.facebookUrlSubscription.unsubscribe();
    this.twitterUrlSubscription.unsubscribe();
    this.instagramUrlSubscription.unsubscribe();
    this.youtubeUrlSubscription.unsubscribe();
    this.githubUrlSubscription.unsubscribe();
    this.linkedinUrlSubscription.unsubscribe();
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
