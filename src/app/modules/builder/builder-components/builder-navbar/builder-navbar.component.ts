import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from './builder-navbar.service';
import { ActiveComponents, ActiveElements, ActiveSettings, ActiveTemplates, ActiveThemes } from '../../builder';
import { IComponent } from '../../../../shared/models/component';
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
  navbarLogoImage: string;
  navbarLogoText: string;
  navbarTheme: string = ActiveThemes.Default;
  navbarTemplate: string = ActiveTemplates.Default;
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

  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private navbarStyleSubscription: Subscription;
  private navbarBrandStyleSubscription: Subscription;
  private navbarLinkStyleSubscription: Subscription;
  private navbarLayoutClassSubscription: Subscription;
  private navbarMenuOptionsSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private activeElementSubscription: Subscription;
  private navbarLogoImageSubscription: Subscription;
  private navbarLogoTextSubscription: Subscription;
  private navbarLogoImageStyleSubscription: Subscription;
  private navbarThemeSubscription: Subscription;
  private navbarTemplateSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private elementRef: ElementRef,
    private builderComponentService: BuilderComponentsService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.navbarThemeSubscription = this.builderNavbarService.navbarTheme.subscribe(response => {
      if (!response) {
        this.builderNavbarService.navbarTheme.next(ActiveThemes.Default);
      }
    });

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(response => {
      if (!response) {
        this.builderNavbarService.navbarTemplate.next(ActiveThemes.Default);
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.navbarLogoImageSubscription = this.builderNavbarService.navbarLogoImage.subscribe(response => {
      if (response) {
        this.navbarLogoImage = response;
      }
    });

    this.navbarLogoTextSubscription = this.builderNavbarService.navbarLogoText.subscribe(response => {
      if (response) {
        this.navbarLogoText = response;
      }
    });

    this.navbarStyleSubscription = this.builderNavbarService.navbarStyle.subscribe(response => {
      if (response) {
        this.navbarStyle = response;
      }
    });

    this.navbarBrandStyleSubscription = this.builderNavbarService.navbarBrandStyle.subscribe(response => {
      if (response) {
        this.navbarBrandStyle = response;
      }
    });

    this.navbarLinkStyleSubscription = this.builderNavbarService.navbarLinkStyle.subscribe(response => {
      if (response) {
        this.navbarLinkStyle = response;
      }
    });

    this.navbarLayoutClassSubscription = this.builderNavbarService.navbarLayoutClass.subscribe(response => {
      if (response) {
        this.navbarLayoutClass = response;
      }
    });

    this.navbarMenuOptionsSubscription = this.builderNavbarService.navbarMenuOptions.subscribe(response => {
      if (response) {
        this.navbarMenuOptions = response;
      }
    });

    this.navbarLogoImageStyleSubscription = this.builderNavbarService.navbarLogoImageStyle.subscribe(response => {
      if (response) {
        this.navbarLogoImageStyle = response;
      }
    });

    this.activeElementSubscription = this.builderService.activeElement.subscribe(response => {
      if (response) {
        this.activeElement = response;
      }
    });

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePageSetting = activePageSettingResponse;
        this.builderComponentsSubscription = this.builderComponentService.pageComponents.subscribe(response => {
          if (response) {
            this.pageComponents = response;
            this.componentId = this.elementRef.nativeElement['id'];
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              const pageName = this.pageComponents['pages'][i]['name'];
              if (pageName === this.activePageSetting) {
                for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                  if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                    this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                    this.builderNavbarService.navbarStyle.next(this.componentDetail['navbarStyle']);
                    this.builderNavbarService.navbarLinkStyle.next(this.componentDetail['navbarLinkStyle']);
                    this.builderNavbarService.navbarBrandStyle.next(this.componentDetail['navbarBrandStyle']);
                    this.builderNavbarService.navbarLogoImageStyle.next(this.componentDetail['navbarLogoImageStyle']);
                    this.builderNavbarService.navbarLayoutClass.next(this.componentDetail['navbarLayoutClass']);
                    this.builderNavbarService.navbarLogoText.next(this.componentDetail['navbarLogoText']);
                    this.builderNavbarService.navbarLogoImage.next(this.componentDetail['navbarLogoImage']);
                    this.builderNavbarService.navbarMenuOptions.next(this.componentDetail['navbarMenuOptions']);
                    this.builderNavbarService.navbarTheme.next(this.componentDetail['navbarTheme']);
                    this.builderNavbarService.navbarTemplate.next(this.componentDetail['navbarTemplate']);
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
    this.builderService.clearActiveEditComponent();
  }

  selectNavbarLink(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('navbar-options-menu');
    event.stopPropagation();
  }

  saveNavbarMenuOption(menuOptionIndex: number, newMenuOptionName: string) {
    for (let i = 0; i < this.navbarMenuOptions.length; i++) {
      if (menuOptionIndex === i) {
        this.navbarMenuOptions[i] = newMenuOptionName;
      }
    }
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderNavbarService.navbarMenuOptions.next(this.navbarMenuOptions);
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
    this.builderService.setActiveEditComponent(ActiveComponents.Navbar, this.componentId);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('navbar-options');
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
    this.builderService.setActiveEditComponent(ActiveComponents.Navbar);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.triggerScrollTo('navbar-options-logo');
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
    this.navbarStyleSubscription.unsubscribe();
    this.navbarBrandStyleSubscription.unsubscribe();
    this.navbarLinkStyleSubscription.unsubscribe();
    this.navbarLayoutClassSubscription.unsubscribe();
    this.navbarMenuOptionsSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.navbarLogoImageSubscription.unsubscribe();
    this.navbarLogoTextSubscription.unsubscribe();
    this.navbarLogoImageStyleSubscription.unsubscribe();
    this.navbarThemeSubscription.unsubscribe();
    this.navbarTemplateSubscription.unsubscribe();
  }
}
