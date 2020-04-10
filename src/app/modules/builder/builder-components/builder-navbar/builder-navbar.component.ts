import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { IComponent } from '../../../../shared/models/component';
import { UtilService } from '../../../../shared/services/util.service';
import {
  ActiveComponents,
  ActiveComponentsPartialSelector,
  ActiveElements,
  ActiveSettings,
  ActiveThemes
} from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderFooterService } from '../builder-footer/builder-footer.service';
import { BuilderNavbarService } from './builder-navbar.service';

@Component({
  selector: 'app-builder-navbar',
  templateUrl: './builder-navbar.component.html',
  styleUrls: ['./builder-navbar.component.css']
})
export class BuilderNavbarComponent implements OnInit, OnDestroy, IComponent {
  navbarStyle: any;
  navbarLinkStyle: any;
  navbarBrandStyle: any;
  navbarLogoImage: string;
  navbarLogoText: string;
  navbarTheme: string = ActiveThemes.Default;
  navbarMenuOptions: any;
  navbarLayoutClass: any = 'navbar-nav ml-auto';
  activeEditComponent: string;
  activeEditComponentId: string;
  componentName: string = ActiveComponents.Navbar;
  componentId: string;
  activeElement: string;
  previewMode = false;
  navbarLogoImageStyle: any;
  pageComponents: any;
  componentDetail: any;
  activePageSetting: string;
  websiteMode: boolean;
  navbarOpen: boolean;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private templateService: TemplateService,
    private builderService: BuilderService,
    private toastrService: ToastrService,
    private elementRef: ElementRef,
    private builderComponentsService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {
    this.navbarOpen = false;

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.previewMode = response;
      });

    this.builderService.websiteMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.websiteMode = response;
      });

    this.builderNavbarService.navbarTheme.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (!response) {
          this.builderNavbarService.navbarTheme.next(ActiveThemes.Default);
        }
      });

    this.templateService.activeTemplate.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.builderNavbarService.setNavbarTemplateStyle(response[this.componentName]['style']);
        }
      });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponentId = response;
        }
      });

    this.builderNavbarService.navbarLogoImage.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarLogoImage = response;
        }
      });

    this.builderNavbarService.navbarLogoText.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarLogoText = response;
        }
      });

    this.builderNavbarService.navbarStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarStyle = response;
        }
      });

    this.builderNavbarService.navbarBrandStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarBrandStyle = response;
        }
      });

    this.builderNavbarService.navbarLinkStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarLinkStyle = response;
        }
      });

    this.builderNavbarService.navbarLayoutClass.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarLayoutClass = response;
        }
      });

    this.builderNavbarService.navbarMenuOptions.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarMenuOptions = response;
        }
      });

    this.builderNavbarService.navbarLogoImageStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.navbarLogoImageStyle = response;
        }
      });

    this.builderService.activeElement.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeElement = response;
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
                this.builderNavbarService.navbarTemplate.next(this.pageComponents['template']);
                this.componentId = this.elementRef.nativeElement['id'];
                for (let i = 0; i < this.pageComponents['pages'].length; i++) {
                  const pageName = this.pageComponents['pages'][i]['name'];
                  if (pageName === this.activePageSetting) {
                    for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                      if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                        this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                        this.builderNavbarService.navbarStyle.next(this.componentDetail['style']['navbarStyle']);
                        this.builderNavbarService.navbarLinkStyle.next(this.componentDetail['style']['navbarLinkStyle']);
                        this.builderNavbarService.navbarBrandStyle.next(this.componentDetail['style']['navbarBrandStyle']);
                        this.builderNavbarService.navbarLogoImageStyle.next(this.componentDetail['style']['navbarLogoImageStyle']);
                        this.builderNavbarService.navbarLayoutClass.next(this.componentDetail['navbarLayoutClass']);
                        this.builderNavbarService.navbarLogoText.next(this.componentDetail['navbarLogoText']);
                        this.builderNavbarService.navbarLogoImage.next(this.componentDetail['navbarLogoImage']);
                        this.builderNavbarService.navbarMenuOptions.next(this.componentDetail['navbarMenuOptions']);
                        this.builderNavbarService.navbarTheme.next(this.componentDetail['navbarTheme']);
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
    if (this.activeEditComponent === ActiveComponents.Navbar) {
      this.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  removeLineBreaks(event: any) {
    BuilderService.removeLineBreaks(event);
  }

  setActiveElementStyle(activeElement, element) {
    if (activeElement === element && !this.previewMode) {
      if (element.indexOf('navbar-logo-brand') > -1) {
        return 'nav-brand-edit';
      }
      if (element.indexOf('navbar-link') > -1) {
        return 'nav-link-edit';
      }
      if (element.indexOf('navbar-logo-image') > -1) {
        return 'nav-image-edit';
      }
    }
  }

  setContentEditable() {
    return !this.previewMode;
  }

  isNavbarLogoImageNull() {
    return !this.navbarLogoImage || this.navbarLogoImage === 'navbarLogoImage';
  }

  clearActiveEditComponent() {
    if (this.activeElement.indexOf('navbar-link') === -1) {
      this.builderService.clearActiveEditComponent();
    }
  }

  selectNavbarLink(pageIndex: number, event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next(this.navbarMenuOptions[pageIndex]);
      this.builderService.activePageIndex.next(pageIndex);
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.activeElement.next(elementId);
      this.builderService.setActiveEditSetting(ActiveSettings.Options);
      this.builderService.triggerScrollTo('navbar-options-menu');
    }
    event.stopPropagation();
  }

  saveNavbarMenuOption(pageIndex: number, pageName: string) {
    if (pageName !== this.navbarMenuOptions[pageIndex]) {
      const oldPageName = this.navbarMenuOptions[pageIndex];

      this.builderFooterService.setFooterMenuOptions(UtilService.toTitleCase(pageName), pageIndex);
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', this.builderFooterService.footerMenuOptions.getValue());
      this.builderNavbarService.setNavbarMenuOptions(UtilService.toTitleCase(pageName), pageIndex);
      this.navbarMenuOptions[pageIndex] = pageName;
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarMenuOptions', this.builderNavbarService.navbarMenuOptions.getValue());

      this.builderComponentsService.renamePage(UtilService.toTitleCase(pageName), oldPageName);
      this.builderService.activeElement.next(ActiveElements.Default);
      this.builderService.activePageSetting.next('Home');
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));

      this.toastrService.success('Your page has been renamed.', 'Great!');
    }
  }

  setNavbarLinkClass() {
    if (this.previewMode) {
      return 'nav-link nav-link-preview';
    }
    if (!this.previewMode) {
      return 'nav-link nav-link-active';
    }
  }

  selectNavbarLogoBrand(event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next('Home');
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.activeElement.next(elementId);
      this.builderService.setActiveEditSetting(ActiveSettings.Options);
      this.builderService.triggerScrollTo('navbar-options');
    }
    event.stopPropagation();
  }

  saveNavbarLogoBrandOption() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderNavbarService.navbarLogoText.next(this.navbarLogoText);
  }

  setNavbarLogoBrandClass() {
    if (this.previewMode) {
      return 'nav-logo-brand-preview';
    }
    if (!this.previewMode) {
      return 'nav-logo-brand-active';
    }
  }

  setNavbarLogoImageClass() {
    if (this.previewMode) {
      return 'nav-logo-image-preview';
    }
    if (!this.previewMode) {
      return 'nav-logo-image-active';
    }
  }

  selectNavbarLogoImage(event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next('Home');
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex('Home'));
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.activeElement.next(elementId);
      this.builderService.triggerScrollTo('navbar-options-logo');
    }
    event.stopPropagation();
  }

  toggleNavbar() {
    if (this.websiteMode) {
      this.navbarOpen = !this.navbarOpen;
    }
  }

  setNavbarOpenOption() {
    if (this.websiteMode) {
      return { 'show': this.navbarOpen };
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
