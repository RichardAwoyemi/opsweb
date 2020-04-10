import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponents, ActiveElements, ActiveOrientations } from './builder';
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

  resetAll() {
    this.resetMenu();
    this.resetTabs();
    this.resetToolbar();
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
    this.resetAll();
    this.sidebarTemplatesMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarTemplatesTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo('templates');
  }

  setSidebarComponentsSetting() {
    this.resetAll();
    this.toolbarComponentsButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarComponentsMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarComponentsTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo('components');
  }

  setSidebarColoursSetting() {
    this.resetAll();
    this.toolbarColoursButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarColoursMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarColoursTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo(`${this.activeEditComponent.getValue()}-colours`);
  }

  setSidebarLayoutSetting() {
    this.resetAll();
    this.toolbarLayoutButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarLayoutMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarLayoutTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo(`${this.activeEditComponent.getValue()}-layout`);
  }

  setSidebarOptionsSetting() {
    this.resetAll();
    this.toolbarOptionsButton.next(this.TOOLBAR_ACTIVE_BUTTON);
    this.sidebarOptionsMenu.next(this.SIDEBAR_ACTIVE_MENU);
    this.sidebarOptionsTab.next(this.SIDEBAR_ACTIVE_TAB);
    this.triggerScrollTo(`${this.activeEditComponent.getValue()}-options`);
  }

  setActiveEditComponent(componentName: string, componentId: string = null) {
    if (componentId != null) {
      this.activeEditComponentId.next(componentId);
    }
    this.activeEditComponent.next(componentName);
    this.setSidebarColoursSetting();
  }

  processIncomingMessages(e: any) {
    if (e.data.action) {
      if (e.data.action.includes('colour')) {
        this.setSidebarColoursSetting();
      }
      if (e.data.action.includes('option')) {
        this.setSidebarOptionsSetting();
      }
      if (e.data.action.includes('layout') || e.data.action.includes('postion')) {
        this.setSidebarLayoutSetting();
      }
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
    this.activeElement.next(ActiveElements.Default);
    this.setSidebarComponentsSetting();
    window.postMessage({ 'for': 'opsonion', 'action': 'deselect-text', }, '*');
  }
}
