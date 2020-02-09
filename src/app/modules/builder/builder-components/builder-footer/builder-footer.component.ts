import { Component, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveElements, ActiveSettings, ActiveTemplates, ActiveThemes } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { BuilderFooterService } from './builder-footer.service';
import { BuilderNavbarService } from '../builder-navbar/builder-navbar.service';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-builder-hero',
  templateUrl: './builder-footer.component.html'
})
export class BuilderFooterComponent implements OnInit, IComponent {
  componentName: string = ActiveComponents.Footer;
  componentId = `${ ActiveComponents.Footer }-${ UtilService.generateRandomString(8) }`;
  innerHeight: number;
  activeEditComponent: string;
  activeEditComponentId: string;
  today: number = Date.now();
  previewMode: boolean;
  footerStyle: any;
  navbarMenuOptions: any;
  footerMenuOptions: string[];
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  footerSocialLinksStyle: any;
  footerPageLinksStyle: any;
  footerPageLinksContainerStyle: any;
  footerPageLinksListStyle: any;
  footerCopyrightStyle: any;
  footerAlignmentClass: string;
  footerSocialLinksContainerStyle: any;
  footerComponentLayout: any;
  activeElement: string;
  copyrightText: string;

  private footerStyleSubscription: Subscription;
  private footerPageLinksStyleSubscription: Subscription;
  private footerSocialLinksStyleSubscription: Subscription;
  private footerSocialLinksContainerStyleSubscription: Subscription;
  private footerThemeSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private footerCopyrightStyleSubscription: Subscription;
  private footerMenuOptionsSubscription: Subscription;
  private footerAlignmentClassSubscription: Subscription;
  private footerComponentLayoutSubscription: Subscription;

  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private activeElementSubscription: Subscription;

  private facebookUrlSubscription: Subscription;
  private twitterUrlSubscription: Subscription;
  private instagramUrlSubscription: Subscription;
  private youtubeUrlSubscription: Subscription;
  private githubUrlSubscription: Subscription;
  private linkedinUrlSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.copyrightText = 'Copyright \u00A9 ' + new Date().getFullYear();

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      this.activeEditComponentId = response;
    });

    this.footerComponentLayoutSubscription = this.builderFooterService.footerComponentLayout.subscribe(response => {
      this.footerComponentLayout = response;
    });

    this.footerSocialLinksContainerStyleSubscription = this.builderFooterService.footerSocialLinksContainerStyle.subscribe(response => {
      this.footerSocialLinksContainerStyle = response;
    });

    this.footerAlignmentClassSubscription = this.builderFooterService.footerAlignmentClass.subscribe(response => {
      this.footerAlignmentClass = response;
    });

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
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

    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;
      }
    });

    this.activeElementSubscription = this.builderService.activeElement.subscribe(response => {
      if (response) {
        this.activeElement = response;
      }
    });

    this.footerPageLinksStyleSubscription = this.builderFooterService.footerPageLinksStyle.subscribe(response => {
      if (response) {
        this.footerPageLinksStyle = response;
        this.footerPageLinksContainerStyle = {
          'padding-top': this.footerPageLinksStyle['padding-top'],
          'padding-bottom': this.footerPageLinksStyle['padding-bottom']
        };
        this.footerPageLinksListStyle = {
          'font-family': this.footerPageLinksStyle['font-family'],
          'font-size': this.footerPageLinksStyle['font-size'],
          'padding-left': this.footerPageLinksStyle['padding-left'],
          'padding-right': this.footerPageLinksStyle['padding-right']
        };
      }
    });

    this.footerSocialLinksStyleSubscription = this.builderFooterService.footerSocialLinksStyle.subscribe(response => {
      if (response) {
        this.footerSocialLinksStyle = response;
      }
    });

    this.footerCopyrightStyleSubscription = this.builderFooterService.footerCopyrightStyle.subscribe(response => {
      if (response) {
        this.footerCopyrightStyle = response;
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;

        this.footerMenuOptionsSubscription = this.builderFooterService.footerMenuOptions.subscribe(response => {
          if (response) {
            let footerMenuOptions = [];
            Object.keys(response).forEach(function (key) {
              if (response[key] !== false) {
                footerMenuOptions.push(key);
              }
            });
            this.footerMenuOptions = footerMenuOptions;
          }
          if (!response) {
            this.footerMenuOptions = [];
          }
        });
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.footerThemeSubscription = this.builderFooterService.footerTheme.subscribe(response => {
      if (!response) {
        this.builderFooterService.footerTheme.next(ActiveThemes.Default);
        this.builderFooterService.setFooterTemplate(ActiveTemplates.Default);
      }
    });

    this.footerTemplateSubscription = this.builderFooterService.footerTemplate.subscribe(response => {
      if (!response) {
        this.builderFooterService.footerTemplate.next(ActiveThemes.Default);
      }
    });
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    if (this.activeEditComponent == ActiveComponents.Footer) {
      this.builderService.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(this.componentName, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setActiveElementStyle(activeElement, element) {
    if (activeElement == element && !this.previewMode) {
      if (element.indexOf('footer-copyright') > -1) {
        return 'footer-copyright-edit';
      }
    }
  }

  setFooterCopyrightClass() {
    if (this.previewMode) {
      return 'footer-copyright-preview';
    }
    if (!this.previewMode) {
      return 'footer-copyright-active';
    }
  }

  selectFooterCopyright(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Footer);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('footer-options-copyright');
    event.stopPropagation();
  }

  clearActiveEditComponent() {
    this.builderService.clearActiveEditComponent();
  }

  ngOnDestroy() {
    this.footerStyleSubscription.unsubscribe();
    this.footerPageLinksStyleSubscription.unsubscribe();
    this.footerSocialLinksStyleSubscription.unsubscribe();
    this.footerSocialLinksContainerStyleSubscription.unsubscribe();
    this.footerThemeSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
    this.footerCopyrightStyleSubscription.unsubscribe();
    this.footerMenuOptionsSubscription.unsubscribe();
    this.footerAlignmentClassSubscription.unsubscribe();
    this.footerComponentLayoutSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.facebookUrlSubscription.unsubscribe();
    this.twitterUrlSubscription.unsubscribe();
    this.instagramUrlSubscription.unsubscribe();
    this.youtubeUrlSubscription.unsubscribe();
    this.githubUrlSubscription.unsubscribe();
    this.linkedinUrlSubscription.unsubscribe();
    this.activeElementSubscription.unsubscribe();
  }
}
