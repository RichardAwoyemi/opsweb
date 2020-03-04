import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveElements, ActiveSettings, ActiveTemplates, ActiveThemes } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { BuilderFooterService } from './builder-footer.service';
import { BuilderNavbarService } from '../builder-navbar/builder-navbar.service';
import { BuilderComponentsService } from '../builder-components.service';

@Component({
  selector: 'app-builder-hero',
  templateUrl: './builder-footer.component.html'
})
export class BuilderFooterComponent implements OnInit, OnDestroy, IComponent {
  componentName: string = ActiveComponents.Footer;
  componentId: string;
  componentIndex: number;
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
  activePageSetting: string;
  pageComponents: any;
  componentDetail: any;

  private footerStyleSubscription: Subscription;
  private footerPageLinksStyleSubscription: Subscription;
  private footerSocialLinksStyleSubscription: Subscription;
  private footerSocialLinksContainerStyleSubscription: Subscription;
  private footerThemeSubscription: Subscription;
  private footerCopyrightStyleSubscription: Subscription;
  private footerMenuOptionsSubscription: Subscription;
  private footerAlignmentClassSubscription: Subscription;
  private footerComponentLayoutSubscription: Subscription;

  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private activeElementSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  private facebookUrlSubscription: Subscription;
  private twitterUrlSubscription: Subscription;
  private instagramUrlSubscription: Subscription;
  private youtubeUrlSubscription: Subscription;
  private githubUrlSubscription: Subscription;
  private linkedinUrlSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService,
    private builderComponentService: BuilderComponentsService,
    private elementRef: ElementRef,
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.copyrightText = 'Copyright \u00A9 ' + new Date().getFullYear();

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.footerComponentLayoutSubscription = this.builderFooterService.footerComponentLayout.subscribe(response => {
      if (response) {
        this.footerComponentLayout = response;
      }
    });

    this.footerSocialLinksContainerStyleSubscription = this.builderFooterService.footerSocialLinksContainerStyle.subscribe(response => {
      this.footerSocialLinksContainerStyle = response;
    });

    this.footerAlignmentClassSubscription = this.builderFooterService.footerAlignmentClass.subscribe(response => {
      if (response) {
        this.footerAlignmentClass = response;
      }
    });

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      if (response) {
        this.previewMode = response;
      }
    });

    this.twitterUrlSubscription = this.builderFooterService.twitterUrl.subscribe(response => {
      if (response) {
        this.twitterUrl = response;
      }
    });

    this.instagramUrlSubscription = this.builderFooterService.instagramUrl.subscribe(response => {
      if (response) {
        this.instagramUrl = response;
      }
    });

    this.youtubeUrlSubscription = this.builderFooterService.youtubeUrl.subscribe(response => {
      if (response) {
        this.youtubeUrl = response;
      }
    });

    this.githubUrlSubscription = this.builderFooterService.githubUrl.subscribe(response => {
      if (response) {
        this.githubUrl = response;
      }
    });

    this.facebookUrlSubscription = this.builderFooterService.facebookUrl.subscribe(response => {
      if (response) {
        this.facebookUrl = response;
      }
    });

    this.linkedinUrlSubscription = this.builderFooterService.linkedinUrl.subscribe(response => {
      if (response) {
        this.linkedinUrl = response;
      }
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

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(navbarMenuOptionsResponse => {
      if (navbarMenuOptionsResponse) {
        this.navbarMenuOptions = navbarMenuOptionsResponse;

        this.footerMenuOptionsSubscription = this.builderFooterService.footerMenuOptions.subscribe(response => {
          if (response) {
            const footerMenuOptions = [];
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

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePageSetting = activePageSettingResponse;
        this.builderComponentsSubscription = this.builderComponentService.pageComponents.subscribe(response => {
          if (response) {
            this.pageComponents = response;
            this.builderFooterService.footerTemplate.next(this.pageComponents['template']);
            if (this.elementRef.nativeElement['id']) {
              this.componentId = this.elementRef.nativeElement['id'];
              for (let i = 0; i < this.pageComponents['pages'].length; i++) {
                const pageName = this.pageComponents['pages'][i]['name'];
                if (pageName === this.activePageSetting) {
                  for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                    if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                      this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                      this.builderFooterService.footerStyle.next(this.componentDetail['footerStyle']);
                      this.builderFooterService.footerSocialLinksContainerStyle.next(this.componentDetail['footerSocialLinksContainerStyle']);
                      this.builderFooterService.footerSocialLinksStyle.next(this.componentDetail['footerSocialLinksStyle']);
                      this.builderFooterService.footerPageLinksStyle.next(this.componentDetail['footerPageLinksStyle']);
                      this.builderFooterService.footerCopyrightStyle.next(this.componentDetail['footerCopyrightStyle']);
                      this.builderFooterService.footerComponentLayout.next(this.componentDetail['footerComponentLayout']);
                      this.builderFooterService.footerAlignmentClass.next(this.componentDetail['footerAlignmentClass']);
                      this.builderFooterService.facebookUrl.next(this.componentDetail['footerSocialLinks']['facebookUrl']);
                      this.builderFooterService.twitterUrl.next(this.componentDetail['footerSocialLinks']['twitterUrl']);
                      this.builderFooterService.instagramUrl.next(this.componentDetail['footerSocialLinks']['instagramUrl']);
                      this.builderFooterService.youtubeUrl.next(this.componentDetail['footerSocialLinks']['youtubeUrl']);
                      this.builderFooterService.githubUrl.next(this.componentDetail['footerSocialLinks']['githubUrl']);
                      this.builderFooterService.linkedinUrl.next(this.componentDetail['footerSocialLinks']['linkedinUrl']);
                      this.builderFooterService.footerTheme.next(this.componentDetail['footerTheme']);
                    }
                  }
                }
              }
            }
          }
        });
      }
    });
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    if (this.activeEditComponent === ActiveComponents.Footer) {
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
    if (activeElement === element && !this.previewMode) {
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
