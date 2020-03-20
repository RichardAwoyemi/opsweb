import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponents, ActiveOrientations } from './builder';
import { TourService } from '../../shared/services/tour.service';

@Injectable()
export class BuilderService {
  activeEditComponent = new BehaviorSubject<string>(null);
  activeEditComponentId = new BehaviorSubject<string>(null);
  activeEditSetting = new BehaviorSubject<string>(null);
  activePageSetting = new BehaviorSubject<string>('Home');
  activePageIndex = new BehaviorSubject<number>(0);
  activeElement = new BehaviorSubject<string>(null);
  activeOrientation = new BehaviorSubject<string>(ActiveOrientations.Desktop);
  SIDEBAR_INACTIVE_TAB = 'tab-pane fade tab-padding';
  SIDEBAR_INACTIVE_MENU = 'nav-link';
  SIDEBAR_ACTIVE_TAB = 'tab-pane fade active show tab-padding';
  SIDEBAR_ACTIVE_MENU = 'nav-link active';
  sidebarTemplatesMenu = new BehaviorSubject<string>(this.SIDEBAR_ACTIVE_MENU);
  sidebarTemplatesTab = new BehaviorSubject<string>(this.SIDEBAR_ACTIVE_TAB);
  sidebarPagesMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarPagesTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarComponentsMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarComponentsTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarColoursMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarColoursTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarLayoutMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarLayoutTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarOptionsMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarOptionsTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  sidebarDataMenu = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_MENU);
  sidebarDataTab = new BehaviorSubject<string>(this.SIDEBAR_INACTIVE_TAB);
  TOOLBAR_ACTIVE_BUTTON = 'toolbar-button toolbar-button-active';
  TOOLBAR_INACTIVE_BUTTON = 'toolbar-button';
  toolbarColoursButton = new BehaviorSubject<string>(this.TOOLBAR_ACTIVE_BUTTON);
  toolbarComponentsButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarLayoutButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarOptionsButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarDesktopOrientationButton = new BehaviorSubject<string>(this.TOOLBAR_ACTIVE_BUTTON);
  toolbarTabletOrientationButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  toolbarMobileOrientationButton = new BehaviorSubject<string>(this.TOOLBAR_INACTIVE_BUTTON);
  previewMode = new BehaviorSubject<boolean>(false);
  websiteMode = new BehaviorSubject<boolean>(false);
  fullScreenMode = new BehaviorSubject<boolean>(false);
  fontNames = new BehaviorSubject<string[]>(['Avenir Next Regular', 'Avenir Next Medium', 'Nunito Sans', 'Poppins']);
  fontUnits = new BehaviorSubject<string[]>(['px', 'em']);
  shepherdDefaultStepOptions: any = TourService.setupBuilderTourStepOptions;
  shepherdDefaultSteps: any = TourService.setupBuilderTourSteps();

  static removeLineBreaks(e: any) {
    const element = e.target;
    element.innerText = element.innerText.replace(/\n/g, '').trim();
  }

  static setComponentClass(previewMode: boolean, activeEditComponent: string, componentName: string, active: boolean = true) {
    if (previewMode) {
      return '';
    } else {
      if ((activeEditComponent === componentName) && active) {
        return 'component-border-active';
      } else {
        return 'component-border';
      }
    }
  }

  static setContextMenu(previewMode: boolean, activeEditComponent: string, componentName: string) {
    if (!previewMode && activeEditComponent === componentName) {
      return `${componentName}-edit-component no-select`;
    } else {
      return 'no-select';
    }
  }

  resetMenu() {
    this.sidebarTemplatesMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarPagesMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarComponentsMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarColoursMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarLayoutMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarOptionsMenu.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarDataMenu.next(this.SIDEBAR_INACTIVE_MENU);
  }

  resetTabs() {
    this.sidebarTemplatesTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarPagesTab.next(this.SIDEBAR_INACTIVE_MENU);
    this.sidebarComponentsTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarColoursTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarLayoutTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarOptionsTab.next(this.SIDEBAR_INACTIVE_TAB);
    this.sidebarDataTab.next(this.SIDEBAR_INACTIVE_TAB);
  }

  resetToolbar() {
    this.toolbarColoursButton.next(this.TOOLBAR_INACTIVE_BUTTON);
    this.toolbarComponentsButton.next(this.TOOLBAR_INACTIVE_BUTTON);
    this.toolbarLayoutButton.next(this.TOOLBAR_INACTIVE_BUTTON);
    this.toolbarOptionsButton.next(this.TOOLBAR_INACTIVE_BUTTON);
  }

  setActiveEditSetting(settingName: string) {
    this.activeEditSetting.next(settingName);
  }

  setSidebarTemplatesSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.sidebarTemplatesMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarTemplatesTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo('templates');
  }

  setSidebarComponentsSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarComponentsButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarComponentsMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarComponentsTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo('components');
  }

  setSidebarColoursSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarColoursButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarColoursMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarColoursTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo(`${this.activeEditComponent.getValue()}-colours`);
  }

  setSidebarLayoutSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarLayoutButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarLayoutMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarLayoutTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo(`${this.activeEditComponent.getValue()}-layout`);
  }

  setSidebarOptionsSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.toolbarOptionsButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarOptionsMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarOptionsTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo(`${this.activeEditComponent.getValue()}-options`);
  }

  setSidebarPagesSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.sidebarPagesMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarPagesTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo('pages');
  }

  setSidebarDataSetting() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
    this.sidebarDataMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarDataTab.next(this.SIDEBAR_ACTIVE_TAB);
  }

  setActiveEditComponent(componentName: string, componentId: string = null) {
    if (componentId != null) {
      this.activeEditComponentId.next(componentId);
    }
    this.activeEditComponent.next(componentName);
    this.setSidebarColoursSetting();
  }

  processIncomingMessages(e: any, activeEditComponent: string) {
    if (activeEditComponent === ActiveComponents.Navbar) {
      this.processIncomingNavbarMessages(e);
    }
    if (activeEditComponent === ActiveComponents.Footer) {
      this.processIncomingFooterMessages(e);
    }
    if (activeEditComponent === ActiveComponents.Features) {
      this.processIncomingFeaturesMessages(e);
    }
  }

  processIncomingNavbarMessages(e: any) {
    if (e.data.action === 'navbar-options-logo') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('navbar-options-logo');
    }
    if (e.data.action === 'navbar-options-menu') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('navbar-options-menu');
    }
    if (e.data.action === 'navbar-layout-logo') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('navbar-layout-logo');
    }
    if (e.data.action === 'navbar-layout-menu') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('navbar-layout-menu');
    }
    if (e.data.action === 'navbar-colours') {
      this.setSidebarColoursSetting();
      this.triggerScrollTo('navbar-colours');
    }
  }

  processIncomingFooterMessages(e: any) {
    if (e.data.action === 'footer-options-copyright') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('footer-options-copyright');
    }
    if (e.data.action === 'footer-layout-copyright') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('footer-layout-copyright');
    }
    if (e.data.action === 'footer-options-social') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('footer-options-social');
    }
    if (e.data.action === 'footer-layout-social') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('footer-layout-social');
    }
    if (e.data.action === 'footer-options-menu') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('footer-options-menu');
    }
    if (e.data.action === 'footer-layout-menu') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('footer-layout-menu');
    }
    if (e.data.action === 'footer-position') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('footer-layout');
    }
    if (e.data.action === 'footer-colours') {
      this.setSidebarColoursSetting();
      this.triggerScrollTo('footer-colours');
    }
  }

  processIncomingFeaturesMessages(e: any) {
    if (e.data.action === 'features-options-copyright') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('features-options-copyright');
    }
    if (e.data.action === 'features-layout-copyright') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('features-layout-copyright');
    }
    if (e.data.action === 'features-options-social') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('features-options-social');
    }
    if (e.data.action === 'features-layout-social') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('features-layout-social');
    }
    if (e.data.action === 'features-options-menu') {
      this.setSidebarOptionsSetting();
      this.triggerScrollTo('features-options-menu');
    }
    if (e.data.action === 'features-layout-menu') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('features-layout-menu');
    }
    if (e.data.action === 'features-position') {
      this.setSidebarLayoutSetting();
      this.triggerScrollTo('features-layout');
    }
    if (e.data.action === 'features-colours') {
      this.setSidebarColoursSetting();
      this.triggerScrollTo('features-colours');
    }
  }

  // noinspection JSUnusedLocalSymbols
  triggerScrollTo(elementId = null) {
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for === 'opsonion') {
      if (e.data.action === 'unique-component-selected' || e.data.action === 'duplicate-component-deselected') {
        this.activeEditComponentId.next(null);
      }
      if (e.data.action === 'duplicate-component-selected') {
        this.activeEditComponentId.next(e.data.message);
      }
    }
  }

  clearActiveEditComponent() {
    this.activeEditComponentId.next(ActiveComponents.Placeholder);
    this.activeEditComponent.next(ActiveComponents.Placeholder);
    this.setSidebarComponentsSetting();
  }
}
