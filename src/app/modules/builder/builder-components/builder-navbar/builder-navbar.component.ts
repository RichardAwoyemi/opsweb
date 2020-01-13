import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderNavbarService } from './builder-navbar.service';
import { ActiveComponents, ActiveElements, ActiveNavbarThemes, ActiveSettings, ActiveTemplates } from '../../builder';
import { IComponent } from '../../../../shared/models/component';
import { debounce } from '../../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-builder-navbar',
  templateUrl: './builder-navbar.component.html',
  styleUrls: ['./builder-navbar.component.css']
})
export class BuilderNavbarComponent implements OnInit, IComponent {
  innerHeight: number;
  navbarStyle: any;
  navbarLinkStyle: any;
  navbarBrandStyle: any;
  navbarLogoImage: string;
  navbarLogoText: string;
  navbarMenuOptions: any;
  navbarLayoutClass: any = 'navbar-nav ml-auto';
  activeEditComponent: string;
  componentName: string = ActiveComponents.Navbar;
  activeElement: string;
  previewMode: boolean = false;
  navbarInputStyle: any;
  navbarLogoImageStyle: any;
  private activeEditComponentSubscription: Subscription;
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

  constructor(
    private builderService: BuilderService,
    private builderNavbarService: BuilderNavbarService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.navbarThemeSubscription = this.builderNavbarService.navbarTheme.subscribe(response => {
      if (!response) {
        this.builderNavbarService.navbarTheme.next(ActiveNavbarThemes.Default);
      }
    });

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(response => {
      if (!response) {
        this.builderNavbarService.navbarTemplate.next(ActiveNavbarThemes.Default);
        this.builderNavbarService.setNavbarTemplate(ActiveTemplates.Default);
      }
    });

    this.navbarTemplateSubscription = this.builderNavbarService.navbarTemplate.subscribe(response => {
      if (!response) {
        this.builderNavbarService.navbarTemplate.next(ActiveNavbarThemes.Default);
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
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
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    if (this.activeEditComponent == ActiveComponents.Navbar) {
      this.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Navbar);
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
    if (activeElement == element && !this.previewMode) {
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

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  isNavbarLogoImageNull() {
    return !this.navbarLogoImage || this.navbarLogoImage == 'navbarLogoImage';
  }

  clearActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }

  selectNavbarLink(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Navbar);
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
    this.builderService.setActiveEditComponent(ActiveComponents.Navbar);
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
