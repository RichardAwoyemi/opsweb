import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { IComponent } from '../../../../shared/models/component';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponents, ActiveElements, ActiveSettings, ActiveComponentsPartialSelector } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderNavbarService } from '../builder-navbar/builder-navbar.service';
import { BuilderFooterService } from './builder-footer.service';

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
  websiteMode: boolean;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
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

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponentId = response;
        }
      });

    this.builderService.websiteMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.websiteMode = response;
      });

    this.templateService.activeTemplate.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.builderFooterService.setFooterTemplateStyle(response[this.componentName]['style']);
        }
      });

    this.builderFooterService.footerComponentLayout.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerComponentLayout = response;
        }
      });

    this.builderFooterService.footerSocialLinksContainerStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.footerSocialLinksContainerStyle = response;
      });

    this.builderFooterService.footerAlignmentClass.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerAlignmentClass = response;
        }
      });

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.previewMode = response;
        }
      });

    this.builderFooterService.footerStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerStyle = response;
        }
      });

    this.builderFooterService.footerSocialLinks.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerSocialLinks = response;
        }
      });

    this.builderService.activeElement.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeElement = response;
        }
      });

    this.builderFooterService.footerPageLinksStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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

    this.builderFooterService.footerSocialLinksStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerSocialLinksStyle = response;
        }
      });

    this.builderFooterService.footerCopyrightStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerCopyrightStyle = response;
        }
      });

    this.builderFooterService.footerMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });

    this.builderService.activePageSetting.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activePageSettingResponse => {
        if (activePageSettingResponse) {
          this.activePageSetting = activePageSettingResponse;
          this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.pageComponents = response;
                this.builderFooterService.footerTemplate.next(this.pageComponents['template']);
                this.componentId = this.elementRef.nativeElement['id'];
                for (let j = 0; j < this.pageComponents['pages'][0]['components'].length; j++) {
                  if (this.pageComponents['pages'][0]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Footer) {
                    this.componentDetail = this.pageComponents['pages'][0]['components'][j];
                    this.builderFooterService.refreshFooterOptions(this.builderComponentsService.getPageArray(), this.componentDetail['footerMenuOptions']);
                    this.builderFooterService.footerStyle.next(this.componentDetail['style']['footerStyle']);
                    this.builderFooterService.footerSocialLinksContainerStyle.next(this.componentDetail['style']['footerSocialLinksContainerStyle']);
                    this.builderFooterService.footerSocialLinksStyle.next(this.componentDetail['style']['footerSocialLinksStyle']);
                    this.builderFooterService.footerPageLinksStyle.next(this.componentDetail['style']['footerPageLinksStyle']);
                    this.builderFooterService.footerCopyrightStyle.next(this.componentDetail['style']['footerCopyrightStyle']);
                    this.builderFooterService.footerComponentLayout.next(this.componentDetail['footerComponentLayout']);
                    this.builderFooterService.footerAlignmentClass.next(this.componentDetail['footerAlignmentClass']);
                    this.builderFooterService.footerSocialLinks.next(this.componentDetail['footerSocialLinks']);
                    this.builderFooterService.footerTheme.next(this.componentDetail['footerTheme']);
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
    return footerMenuOption['visible'] !== false;
  }

  checkSocialLinkStyle(footerSocialOption) {
    if (footerSocialOption === null) {
      return {};
    } else {
      return this.footerSocialLinksStyle;
    }
  }

  selectFooterLink(i, footerMenuOption) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next(footerMenuOption['page']);
      this.builderService.activePageIndex.next(i);
    }
  }

  openUrlInNewTab(footerSocialLink: any) {
    UtilService.openUrlInNewTab(footerSocialLink);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
