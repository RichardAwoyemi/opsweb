import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  activeButtonClass = 'nav-link active';
  inactiveButtonClass = 'nav-link';
  activeEditComponent: string;
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

  setMenuClass(menuItem) {
    return (this.builderService.activeEditSetting.getValue() === menuItem) ? this.activeButtonClass : this.inactiveButtonClass;
  }

  setActiveEditSetting(settingName: string) {
    this.builderService.activeEditSetting.next(settingName);
  }

  validateActiveEditComponent() {
    return !(this.activeEditComponent === ActiveComponents.Placeholder || !this.activeEditComponent);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
