import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';
import { debounce } from '../../../../shared/decorators/debounce.decorator';
import { ActiveComponents, ActiveSettings } from '../../builder';
import { BuilderService } from '../../builder.service';

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
  ACTIVE_TEMPLATES_SETTING: string = ActiveSettings.Templates;
  ACTIVE_COMPONENTS_SETTING: string = ActiveSettings.Components;
  ACTIVE_COLOURS_SETTING: string = ActiveSettings.Colours;
  ACTIVE_LAYOUT_SETTING: string = ActiveSettings.Layout;
  ACTIVE_OPTIONS_SETTING: string = ActiveSettings.Options;
  ACTIVE_PAGES_SETTING: string = ActiveSettings.Pages;
  ngUnsubscribe = new Subject<void>();


  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.builderService.sidebarTemplatesMenu.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarTemplatesMenu = response;
        }
      });

    this.builderService.sidebarComponentsMenu.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarComponentsMenu = response;
        }
      });

    this.builderService.sidebarColoursMenu.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarColoursMenu = response;
        }
      });

    this.builderService.sidebarLayoutMenu.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarLayoutMenu = response;
        }
      });

    this.builderService.sidebarOptionsMenu.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarOptionsMenu = response;
        }
      });

    this.builderService.sidebarPagesMenu.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarPagesMenu = response;
        }
      });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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
    this.builderService.activeEditSetting.next(settingName);
    this.builderService.setSidebarSetting(settingName);
  }

  validateActiveEditComponent() {
    return !(this.activeEditComponent === ActiveComponents.Placeholder || !this.activeEditComponent);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
