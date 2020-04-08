import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveComponentsPartialSelector } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-footer-options-picker',
  templateUrl: './footer-options-picker.component.html',
  styleUrls: ['./footer-options-picker.component.css'],
})
export class FooterOptionsPickerComponent implements OnInit, OnDestroy {
  fontNames: any;
  fontUnits: any;
  footerStyle: any;
  footerMenuOptions = [];
  navbarMenuOptions: any;
  footerCopyrightStyle: any;
  footerSocialLinksStyle: any;
  footerPageLinksStyle: any;
  footerCopyrightFontSize: number;
  defaultFooterStyle: any;
  pageComponents: any;
  footerSocialLinks: any;
  footerTemplate: string;
  footerCopyrightFontUnit = 'px';
  footerSocialLinksFontSize: number;
  footerSocialLinksFontUnit = 'px';
  footerPageLinksFontSize: number;
  footerPageLinksFontUnit = 'px';
  footerPageLinkFontName = 'Avenir Next Regular';
  footerCopyrightFontName = 'Avenir Next Regular';
  websiteChangeCount: number;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
    private builderFooterService: BuilderFooterService,
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
  ) {
  }

  ngOnInit() {
    this.builderNavbarService.navbarMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(navbarMenuOptionsResponse => {
      if (navbarMenuOptionsResponse) {
        this.navbarMenuOptions = navbarMenuOptionsResponse;

        this.builderFooterService.footerMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
          if (response) {
            this.footerMenuOptions = response;
          } else {
            for (let i = 0; i < this.navbarMenuOptions.length; i++) {
              const footerMenuOption = {};
              footerMenuOption['page'] = this.navbarMenuOptions[i];
              footerMenuOption['visible'] = false;
              this.footerMenuOptions.push(footerMenuOption);
            }
            this.builderFooterService.footerMenuOptions.next(this.footerMenuOptions);
          }
        });
      }
    });

    this.builderFooterService.footerSocialLinks.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      this.footerSocialLinks = response;
    });

    this.builderService.fontNames.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.builderService.fontUnits.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(templateResponse => {
      if (templateResponse) {
        this.footerTemplate = templateResponse['template'];

        this.templateService.getTemplateStyle(this.footerTemplate).pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
          if (response) {
            this.defaultFooterStyle = response[ActiveComponents.Footer];
          }
        });
      }
    });

    this.builderFooterService.footerCopyrightStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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

    this.builderFooterService.footerPageLinksStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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

    this.builderFooterService.footerSocialLinksStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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

    this.builderFooterService.footerSocialLinks.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response['facebookUrl']) {
        this.footerSocialLinks['facebookUrl'] = response['facebookUrl'];
        this.facebookUrl = response['facebookUrl'];
      }
      if (response['twitterUrl']) {
        this.footerSocialLinks['twitterUrl'] = response['twitterUrl'];
        this.twitterUrl = response['twitterUrl'];

      }
      if (response['instagramUrl']) {
        this.footerSocialLinks['instagramUrl'] = response['instagramUrl'];
        this.instagramUrl = response['instagramUrl'];
      }
      if (response['youtubeUrl']) {
        this.footerSocialLinks['youtubeUrl'] = response['youtubeUrl'];
        this.youtubeUrl = response['youtubeUrl'];
      }
      if (response['githubUrl']) {
        this.footerSocialLinks['githubUrl'] = response['githubUrl'];
        this.githubUrl = response['githubUrl'];
      }
      if (response['linkedinUrl']) {
        this.footerSocialLinks['linkedinUrl'] = response['linkedinUrl'];
        this.linkedinUrl = response['linkedinUrl'];
      }
    });

    this.builderFooterService.footerStyle.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.footerStyle = response;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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

      if (value) {
        if (value.trim().length === 0) {
          this.pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['footerSocialLinks'][`${key}Url`] = null;
        } else {
          this.pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['footerSocialLinks'][`${key}Url`] = value;
        }
      } else {
        this.pageComponents['pages'][activePageIndex]['components'][activeComponentIndex]['footerSocialLinks'][`${key}Url`] = null;
      }
    }
    this.builderComponentsService.pageComponents.next(this.pageComponents);
  }

  resetFooterCopyrightFontName() {
    this.footerCopyrightStyle['font-family'] = this.defaultFooterStyle['style']['footerCopyrightStyle']['font-family'];
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
    this.footerCopyrightStyle['font-size'] = this.defaultFooterStyle['style']['footerCopyrightStyle']['font-size'];
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
    this.footerSocialLinksStyle['font-size'] = this.defaultFooterStyle['style']['footerSocialLinksStyle']['font-size'];
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
    this.footerPageLinksStyle['font-family'] = this.defaultFooterStyle['style']['footerPageLinksStyle']['font-family'];
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
    this.footerPageLinksStyle['font-size'] = this.defaultFooterStyle['style']['footerPageLinksStyle']['font-size'];
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
    if (platform) {
      if (platform === 'facebook') {
        const footerSocialLinks = this.builderFooterService.footerSocialLinks.getValue();
        footerSocialLinks['facebookUrl'] = this.facebookUrl;
        this.builderFooterService.footerSocialLinks.next(footerSocialLinks);
        this.setFooterSocialLinks(platform, this.facebookUrl);
      }
      if (platform === 'twitter') {
        const footerSocialLinks = this.builderFooterService.footerSocialLinks.getValue();
        footerSocialLinks['twitterUrl'] = this.twitterUrl;
        this.builderFooterService.footerSocialLinks.next(footerSocialLinks);
        this.setFooterSocialLinks(platform, this.twitterUrl);
      }
      if (platform === 'instagram') {
        const footerSocialLinks = this.builderFooterService.footerSocialLinks.getValue();
        footerSocialLinks['instagramUrl'] = this.instagramUrl;
        this.builderFooterService.footerSocialLinks.next(footerSocialLinks);
        this.setFooterSocialLinks(platform, this.instagramUrl);
      }
      if (platform === 'youtube') {
        const footerSocialLinks = this.builderFooterService.footerSocialLinks.getValue();
        footerSocialLinks['youtubeUrl'] = this.youtubeUrl;
        this.builderFooterService.footerSocialLinks.next(footerSocialLinks);
        this.setFooterSocialLinks(platform, this.youtubeUrl);
      }
      if (platform === 'github') {
        const footerSocialLinks = this.builderFooterService.footerSocialLinks.getValue();
        footerSocialLinks['githubUrl'] = this.githubUrl;
        this.builderFooterService.footerSocialLinks.next(footerSocialLinks);
        this.setFooterSocialLinks(platform, this.githubUrl);
      }
      if (platform === 'linkedin') {
        const footerSocialLinks = this.builderFooterService.footerSocialLinks.getValue();
        footerSocialLinks['linkedinUrl'] = this.linkedinUrl;
        this.builderFooterService.footerSocialLinks.next(footerSocialLinks);
        this.setFooterSocialLinks(platform, this.linkedinUrl);
      }
    }
  }

  toggleFooterMenuOptionVisibility(index: number) {
    const footerMenuOptions = this.builderFooterService.footerMenuOptions.getValue();
    footerMenuOptions[index]['visible'] = !footerMenuOptions[index]['visible'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', footerMenuOptions);
    this.builderFooterService.footerMenuOptions.next(footerMenuOptions);
  }

  checkIfFooterMenuOptionIsVisible(menuOption: string, menuIndex): boolean {
    if (this.footerMenuOptions) {
      return this.footerMenuOptions[menuIndex]['visible'] === true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
