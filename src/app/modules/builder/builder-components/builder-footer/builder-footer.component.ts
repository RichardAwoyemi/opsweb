import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { IComponent } from '../../../../shared/models/component';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveElements, ActiveSettings } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderFooterService } from './builder-footer.service';

@Component({
  selector: 'app-builder-footer',
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
  footerTheme: string;
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
  footerComponentLayout: number;
  activeElement: string;
  copyrightText: string;
  activePageSetting: string;
  pageComponents: any;
  componentDetail: any;
  websiteMode: boolean;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
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

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.previewMode = response;
        }
      });

      this.builderService.activeElement.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeElement = response;
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
                this.componentId = this.elementRef.nativeElement['id'];
                for (let j = 0; j < this.pageComponents['pages'][0]['components'].length; j++) {
                  if (this.pageComponents['pages'][0]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Footer) {
                    this.componentDetail = this.pageComponents['pages'][0]['components'][j];
                    if (this.builderComponentsService.getPages().length !== this.componentDetail['footerMenuOptions'].length) {
                      this.footerMenuOptions = this.builderFooterService.updateFooterMenuOptions(this.builderComponentsService.getPages(), this.componentDetail['footerMenuOptions']);
                      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', this.footerMenuOptions);
                    } else {
                      this.footerMenuOptions = this.componentDetail['footerMenuOptions'];
                    }
                    this.footerStyle = this.componentDetail['style']['footerStyle'];
                    this.footerSocialLinksContainerStyle = this.componentDetail['style']['footerSocialLinksContainerStyle'];
                    this.footerSocialLinksStyle = this.componentDetail['style']['footerSocialLinksStyle'];
                    this.footerPageLinksStyle = this.componentDetail['style']['footerPageLinksStyle'];
                    this.footerCopyrightStyle = this.componentDetail['style']['footerCopyrightStyle'];
                    this.footerComponentLayout = this.componentDetail['footerComponentLayout'];
                    this.footerAlignmentClass = this.componentDetail['footerAlignmentClass'];
                    this.footerSocialLinks = this.componentDetail['footerSocialLinks'];
                    this.footerTheme = this.componentDetail['footerTheme'];
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
      this.builderService.activeEditSetting.next(ActiveSettings.Colours);
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
    this.builderService.setSidebarSetting(ActiveSettings.Options);
    this.builderService.activeElement.next(elementId);
    this.builderService.activeEditSetting.next(ActiveSettings.Options);
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
    return Object.values(this.footerSocialLinks).some(link => (!!link));
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

  setSocialsClass(socialLinks) {
    return 'ti-' + socialLinks.replace('Url', '');
  }

  setContainerStyle(styleObj) {
    let styleContainer = {}
    styleContainer['padding-top'] = styleObj['padding-top'] || null;
    styleContainer['padding-bottom'] = styleObj['padding-bottom'] || null;
    return styleContainer;
  }

  setPagesLayoutOneClass() {
    return (this.checkFooterSocialLinks()) ? 'col-md-4 text-center' : 'col-md-8 text-right';
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
