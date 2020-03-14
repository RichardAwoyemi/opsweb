import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveElements, ActiveSettings } from '../../builder';
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
  footerMenuOptions: any;
  footerMenuOptionsCount: number;
  footerSocialLinksStyle: any;
  footerPageLinksStyle: any;
  footerPageLinksContainerStyle: any;
  footerPageLinksListStyle: any;
  footerCopyrightStyle: any;
  footerAlignmentClass: string;
  footerSocialLinksContainerStyle: any;
  footerSocialLinks: any;
  footerComponentLayout: any;
  activeElement: string;
  copyrightText: string;
  activePageSetting: string;
  pageComponents: any;
  componentDetail: any;

  private footerStyleSubscription: Subscription;
  private footerPageLinksStyleSubscription: Subscription;
  private footerSocialLinksSubscription: Subscription;
  private footerSocialLinksStyleSubscription: Subscription;
  private footerSocialLinksContainerStyleSubscription: Subscription;
  private footerCopyrightStyleSubscription: Subscription;
  private footerMenuOptionsSubscription: Subscription;
  private footerAlignmentClassSubscription: Subscription;
  private footerComponentLayoutSubscription: Subscription;

  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private activeElementSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService,
    private builderComponentsService: BuilderComponentsService,
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

    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;
      }
    });

    this.footerSocialLinksSubscription = this.builderFooterService.footerSocialLinks.subscribe(response => {
      if (response) {
        this.footerSocialLinks = response;
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

    this.footerMenuOptionsSubscription = this.builderFooterService.footerMenuOptions.subscribe(response => {
      this.footerMenuOptionsCount = 0;
      if (response) {
        this.footerMenuOptions = response;
        for (let i = 0; i < this.footerMenuOptions.length; i++) {
          if (this.footerMenuOptions[i]) {
            if (this.footerMenuOptions[i]['visible'] === true) {
              this.footerMenuOptionsCount++;
            }
          }
        }
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePageSetting = activePageSettingResponse;
        this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
          if (response) {
            this.pageComponents = response;
            this.builderFooterService.footerTemplate.next(this.pageComponents['template']);
            this.componentId = this.elementRef.nativeElement['id'];
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              const pageName = this.pageComponents['pages'][i]['name'];
              if (pageName === this.activePageSetting) {
                for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                  if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                    this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                    this.builderFooterService.footerStyle.next(this.componentDetail['footerStyle']);
                    this.builderFooterService.footerMenuOptions.next(this.componentDetail['footerMenuOptions']);
                    this.builderFooterService.footerSocialLinksContainerStyle.next(this.componentDetail['footerSocialLinksContainerStyle']);
                    this.builderFooterService.footerSocialLinksStyle.next(this.componentDetail['footerSocialLinksStyle']);
                    this.builderFooterService.footerPageLinksStyle.next(this.componentDetail['footerPageLinksStyle']);
                    this.builderFooterService.footerCopyrightStyle.next(this.componentDetail['footerCopyrightStyle']);
                    this.builderFooterService.footerComponentLayout.next(this.componentDetail['footerComponentLayout']);
                    this.builderFooterService.footerAlignmentClass.next(this.componentDetail['footerAlignmentClass']);
                    this.builderFooterService.footerSocialLinks.next(this.componentDetail['footerSocialLinks']);
                    this.builderFooterService.footerTheme.next(this.componentDetail['footerTheme']);
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

  displayFooterMenuOption(footerMenuOption) {
    if (footerMenuOption['visible'] === true) {
      return footerMenuOption['page'];
    } else {
      return null;
    }
  }

  checkIfVisibleFooterMenuOptions() {
    if (this.footerMenuOptions) {
      for (let i = 0; i < this.footerMenuOptions.length; i++) {
        if (this.footerMenuOptions[i]['visible'] === true) {
          return true;
        }
      }
    }
    return false;
  }

  checkFooterSocialLinks() {
    return !!(this.footerSocialLinks['facebookUrl'] || this.footerSocialLinks['twitterUrl'] || this.footerSocialLinks['youtubeUrl'] || this.footerSocialLinks['youtubeUrl']);
  }

  checkPageLinkStyle(footerMenuOption) {
    console.log(footerMenuOption);
    return footerMenuOption['visible'] !== false;
  }

  checkSocialLinkStyle(footerSocialOption) {
    if (footerSocialOption === null) {
      return {};
    } else {
      return this.footerSocialLinksStyle;
    }
  }


  ngOnDestroy() {
    this.footerStyleSubscription.unsubscribe();
    this.footerPageLinksStyleSubscription.unsubscribe();
    this.footerSocialLinksStyleSubscription.unsubscribe();
    this.footerSocialLinksContainerStyleSubscription.unsubscribe();
    this.footerCopyrightStyleSubscription.unsubscribe();
    this.footerMenuOptionsSubscription.unsubscribe();
    this.footerAlignmentClassSubscription.unsubscribe();
    this.footerComponentLayoutSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.activeElementSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
    this.activePageSettingSubscription.unsubscribe();
    this.footerSocialLinksSubscription.unsubscribe();
  }

}
