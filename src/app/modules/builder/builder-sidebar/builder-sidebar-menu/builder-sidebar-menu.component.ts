import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveSettings } from '../../builder';
import { debounce } from '../../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-builder-sidebar-menu',
  templateUrl: './builder-sidebar-menu.component.html',
  styleUrls: ['./builder-sidebar-menu.component.css']
})
export class BuilderSidebarMenuComponent implements OnInit, OnDestroy {
  innerHeight: number;
  SIDEBAR_ACTIVE_MENU = 'nav-link active';
  SIDEBAR_INACTIVE_MENU = 'nav-link';
  activeEditComponent: string;
  sidebarTemplatesMenu: string = this.SIDEBAR_ACTIVE_MENU;
  sidebarComponentsMenu: string = this.SIDEBAR_INACTIVE_MENU;
  sidebarColoursMenu: string = this.SIDEBAR_INACTIVE_MENU;
  sidebarLayoutMenu: string = this.SIDEBAR_INACTIVE_MENU;
  sidebarOptionsMenu: string = this.SIDEBAR_INACTIVE_MENU;
  sidebarPagesMenu: string = this.SIDEBAR_INACTIVE_MENU;
  sidebarDataMenu: string = this.SIDEBAR_INACTIVE_MENU;
  ACTIVE_TEMPLATES_SETTING: string = ActiveSettings.Templates;
  ACTIVE_COMPONENTS_SETTING: string = ActiveSettings.Components;
  ACTIVE_COLOURS_SETTING: string = ActiveSettings.Colours;
  ACTIVE_LAYOUT_SETTING: string = ActiveSettings.Layout;
  ACTIVE_OPTIONS_SETTING: string = ActiveSettings.Options;
  ACTIVE_PAGES_SETTING: string = ActiveSettings.Pages;
  ACTIVE_DATA_SETTING: string = ActiveSettings.Data;
  private sidebarTemplatesMenuSubscription: Subscription;
  private sidebarComponentsMenuSubscription: Subscription;
  private sidebarColoursMenuSubscription: Subscription;
  private sidebarLayoutMenuSubscription: Subscription;
  private sidebarOptionsMenuSubscription: Subscription;
  private sidebarPagesMenuSubscription: Subscription;
  private sidebarDataMenuSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.sidebarTemplatesMenuSubscription = this.builderService.sidebarTemplatesMenu.subscribe(response => {
      if (response) {
        this.sidebarTemplatesMenu = response;
      }
    });

    this.sidebarComponentsMenuSubscription = this.builderService.sidebarComponentsMenu.subscribe(response => {
      if (response) {
        this.sidebarComponentsMenu = response;
      }
    });

    this.sidebarColoursMenuSubscription = this.builderService.sidebarColoursMenu.subscribe(response => {
      if (response) {
        this.sidebarColoursMenu = response;
      }
    });

    this.sidebarLayoutMenuSubscription = this.builderService.sidebarLayoutMenu.subscribe(response => {
      if (response) {
        this.sidebarLayoutMenu = response;
      }
    });

    this.sidebarOptionsMenuSubscription = this.builderService.sidebarOptionsMenu.subscribe(response => {
      if (response) {
        this.sidebarOptionsMenu = response;
      }
    });

    this.sidebarPagesMenuSubscription = this.builderService.sidebarPagesMenu.subscribe(response => {
      if (response) {
        this.sidebarPagesMenu = response;
      }
    });

    this.sidebarDataMenuSubscription = this.builderService.sidebarDataMenu.subscribe(response => {
      if (response) {
        this.sidebarDataMenu = response;
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  setActiveEditSetting(settingName: string) {
    this.builderService.setActiveEditSetting(settingName);
    if (settingName === ActiveSettings.Templates) {
      this.builderService.setSidebarTemplatesSetting();
    }
    if (settingName === ActiveSettings.Colours) {
      this.builderService.setSidebarColoursSetting();
    }
    if (settingName === ActiveSettings.Components) {
      this.builderService.setSidebarComponentsSetting();
    }
    if (settingName === ActiveSettings.Layout) {
      this.builderService.setSidebarLayoutSetting();
    }
    if (settingName === ActiveSettings.Options) {
      this.builderService.setSidebarOptionsSetting();
    }
    if (settingName === ActiveSettings.Pages) {
      this.builderService.setSidebarPagesSetting();
    }
    if (settingName === ActiveSettings.Data) {
      this.builderService.setSidebarDataSetting();
    }
  }

  validateActiveEditComponent() {
    return !(this.activeEditComponent === ActiveComponents.Placeholder || !this.activeEditComponent);
  }

  ngOnDestroy() {
    this.sidebarTemplatesMenuSubscription.unsubscribe();
    this.sidebarComponentsMenuSubscription.unsubscribe();
    this.sidebarColoursMenuSubscription.unsubscribe();
    this.sidebarLayoutMenuSubscription.unsubscribe();
    this.sidebarOptionsMenuSubscription.unsubscribe();
    this.sidebarPagesMenuSubscription.unsubscribe();
    this.sidebarDataMenuSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
  }
}
