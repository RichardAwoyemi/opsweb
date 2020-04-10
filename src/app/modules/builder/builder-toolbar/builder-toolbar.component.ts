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
  activeEditComponent: string;
  ACTIVE_COLOURS_SETTING: string = ActiveSettings.Colours;
  ACTIVE_COMPONENTS_SETTING: string = ActiveSettings.Components;
  ACTIVE_LAYOUT_SETTING: string = ActiveSettings.Layout;
  ACTIVE_OPTIONS_SETTING: string = ActiveSettings.Options;
  ACTIVE_DESKTOP_ORIENTATION: string = ActiveOrientations.Desktop;
  ACTIVE_TABLET_ORIENTATION: string = ActiveOrientations.Tablet;
  ACTIVE_MOBILE_ORIENTATION: string = ActiveOrientations.Mobile;
  previewMode = false;
  toolbarButtonDesktopOrientation: string = this.builderService.TOOLBAR_ACTIVE_BUTTON;
  toolbarButtonMobileOrientation: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarButtonTabletOrientation: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarClass = 'toolbar no-select';
  toolbarButtonColoursStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarButtonComponentsStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarButtonLayoutStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarButtonOptionsStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
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

    this.builderService.toolbarColoursButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonColoursStyle = response;
        }
      });

    this.builderService.toolbarComponentsButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonComponentsStyle = response;
        }
      });

    this.builderService.toolbarLayoutButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonLayoutStyle = response;
        }
      });

    this.builderService.toolbarOptionsButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonOptionsStyle = response;
        }
      });

    this.builderService.toolbarDesktopOrientationButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonDesktopOrientation = response;
        }
      });

    this.builderService.toolbarTabletOrientationButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonTabletOrientation = response;
        }
      });

    this.builderService.toolbarMobileOrientationButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.toolbarButtonMobileOrientation = response;
        }
      });
  }

  setActiveEditSetting(settingName: string) {
    this.builderService.activeEditSetting.next(settingName);
    if ([ActiveSettings.Colours,ActiveSettings.Components, ActiveSettings.Layout, ActiveSettings.Options]
      .includes(ActiveSettings[UtilService.toTitleCase(settingName)])) {
      this.builderService.setSidebarSetting(settingName);
      this.setPrimaryToolbarButtonClass(settingName);
    }
  }

  setPrimaryToolbarButtonClass(activeSetting) {
    this.builderService.toolbarColoursButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarComponentsButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarLayoutButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarOptionsButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);

    if (activeSetting === ActiveSettings.Colours) {
      this.builderService.toolbarColoursButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
    if (activeSetting === ActiveSettings.Components) {
      this.builderService.toolbarComponentsButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
    if (activeSetting === ActiveSettings.Layout) {
      this.builderService.toolbarLayoutButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
    if (activeSetting === ActiveSettings.Options) {
      this.builderService.toolbarOptionsButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
  }

  toggleMenuItemVisibility(menuItem) {
    if (this.activeEditComponent === ActiveComponents.Placeholder) {
      if (menuItem === ActiveSettings.Colours) {
        return false;
      }
      if (menuItem === ActiveSettings.Layout) {
        return false;
      }
      if (menuItem === ActiveSettings.Options) {
        return false;
      }
    } else {
      if (menuItem === ActiveSettings.Components) {
        return false;
      }
    }
    return true;
  }

  setSecondaryToolbarButtonClass(activeOrientation: string) {
    this.builderService.toolbarDesktopOrientationButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarTabletOrientationButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarMobileOrientationButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);

    if (activeOrientation === ActiveOrientations.Desktop) {
      this.builderService.toolbarDesktopOrientationButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
      this.builderService.activeOrientation.next(ActiveOrientations.Desktop);
    }
    if (activeOrientation === ActiveOrientations.Tablet) {
      this.builderService.toolbarTabletOrientationButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
      this.builderService.activeOrientation.next(ActiveOrientations.Tablet);
    }
    if (activeOrientation === ActiveOrientations.Mobile) {
      this.builderService.toolbarMobileOrientationButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
      this.builderService.activeOrientation.next(ActiveOrientations.Mobile);
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
