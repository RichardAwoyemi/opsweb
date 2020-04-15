import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponents, ActiveOrientations, ActiveSettings } from 'src/app/modules/builder/builder';
import { BuilderService } from '../builder.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.css']
})
export class BuilderToolbarComponent implements OnInit, OnDestroy {
  activeButtonClass = 'toolbar-button toolbar-button-active';
  inactiveButtonClass = 'toolbar-button';
  activeOrientation: string;
  activeEditComponent: string;
  ACTIVE_COLOURS_SETTING = ActiveSettings.Colours;
  ACTIVE_COMPONENTS_SETTING = ActiveSettings.Components;
  ACTIVE_LAYOUT_SETTING = ActiveSettings.Layout;
  ACTIVE_OPTIONS_SETTING = ActiveSettings.Options;
  ACTIVE_DESKTOP_ORIENTATION = ActiveOrientations.Desktop;
  ACTIVE_TABLET_ORIENTATION = ActiveOrientations.Tablet;
  ACTIVE_MOBILE_ORIENTATION = ActiveOrientations.Mobile;
  toolbarClass = 'toolbar no-select';
  previewMode = false;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.previewMode = response;
        if (response) {
          this.toolbarClass = 'toolbar-preview no-select';
        } else {
          this.toolbarClass = 'toolbar no-select';
        }
      });
  }

  setActiveOrientationButtonClass(orientation) {
    return (this.builderService.activeOrientation.getValue() === orientation) ? this.activeButtonClass : this.inactiveButtonClass;
  }

  setActiveMenuButtonClass(menuItem) {
    return (this.builderService.activeEditSetting.getValue() === menuItem) ? this.activeButtonClass : this.inactiveButtonClass;
  }

  setActiveEditSetting(settingName: string) {
    if ([ActiveSettings.Colours, ActiveSettings.Components, ActiveSettings.Layout, ActiveSettings.Options]
      .includes(ActiveSettings[UtilService.toTitleCase(settingName)])) {
      this.builderService.activeEditSetting.next(settingName);
    }
  }

  toggleMenuItemVisibility(menuItem) {
    if (this.activeEditComponent === ActiveComponents.Placeholder) {
      if ([ActiveSettings.Colours, ActiveSettings.Layout, ActiveSettings.Options, ActiveSettings.Components].includes(menuItem)) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  setSecondaryToolbarButtonClass(activeOrientation) {
    if (Object.values(ActiveOrientations).includes(activeOrientation)) {
      this.builderService.activeOrientation.next(activeOrientation);
    }
  }

  togglePreview() {
    this.builderService.previewMode.next(!this.previewMode);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
