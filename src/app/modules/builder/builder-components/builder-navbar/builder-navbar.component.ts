import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IComponent } from '../../../../shared/models/component';
import { UtilService } from '../../../../shared/services/util.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveElements, ActiveSettings, ActiveThemes } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';

@Component({
  selector: 'app-builder-navbar',
  templateUrl: './builder-navbar.component.html',
  styleUrls: ['./builder-navbar.component.css']
})
export class BuilderNavbarComponent implements OnInit, OnDestroy, IComponent {
  navbarStyle: any;
  navbarLinkStyle: any;
  navbarBrandStyle: any;
  navbarLogoImage: any;
  navbarLogoText: string;
  navbarTheme: string = ActiveThemes.Default;
  navbarMenuOptions: any;
  navbarLayoutClass: any;
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
    private builderService: BuilderService,
    private toastrService: ToastrService,
    private elementRef: ElementRef,
    private builderComponentsService: BuilderComponentsService,
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
                this.componentId = this.elementRef.nativeElement['id'];
                for (let j = 0; j < this.pageComponents['pages'][0]['components'].length; j++) {
                  if (this.pageComponents['pages'][0]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Navbar) {
                    this.navbarMenuOptions = this.builderComponentsService.getPages();
                    this.componentDetail = this.pageComponents['pages'][0]['components'][j];
                    this.navbarStyle = this.componentDetail['style']['navbarStyle'];
                    this.navbarLinkStyle = this.componentDetail['style']['navbarLinkStyle'];
                    this.navbarBrandStyle = this.componentDetail['style']['navbarBrandStyle'];
                    this.navbarLogoImageStyle = this.componentDetail['style']['navbarLogoImageStyle'];
                    this.navbarLayoutClass = this.componentDetail['navbarLayoutClass'];
                    this.navbarLogoText = this.componentDetail['navbarLogoText'];
                    this.navbarLogoImage = this.componentDetail['navbarLogoImage'];
                    this.navbarTheme = this.componentDetail['navbarTheme'];
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
      this.builderService.activeEditSetting.next(ActiveSettings.Colours);
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
    return !this.navbarLogoImage.src;
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
      this.builderService.setSidebarSetting(ActiveSettings.Options);
      this.builderService.activeElement.next(elementId);
      this.builderService.activeEditSetting.next(ActiveSettings.Options);
      this.builderService.triggerScrollTo('navbar-options-menu');
    }
    event.stopPropagation();
  }

  saveNavbarMenuOption(pageIndex: number, pageName: string) {
    if (pageName !== this.navbarMenuOptions[pageIndex]) {
      const oldPageName = this.navbarMenuOptions[pageIndex];
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
      this.builderService.setSidebarSetting(ActiveSettings.Options);
      this.builderService.activeElement.next(elementId);
      this.builderService.activeEditSetting.next(ActiveSettings.Options);
    }
    event.stopPropagation();
  }

  saveNavbarLogoBrandOption() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderComponentsService.setPageComponentsByName(this.componentName, 'navbarLogoText', this.navbarLogoText);
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
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
      this.builderService.setSidebarSetting(ActiveSettings.Options);
      this.builderService.activeElement.next(elementId);
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
