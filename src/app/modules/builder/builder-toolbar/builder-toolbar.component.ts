import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../builder.service';
import { ActiveComponents, ActiveOrientations, ActiveSettings } from 'src/app/modules/builder/builder';

@Component({
  selector: 'app-builder-toolbar',
  templateUrl: './builder-toolbar.component.html',
  styleUrls: ['./builder-toolbar.component.css']
})
export class BuilderToolbarComponent implements OnInit {
  activeEditComponent: string;
  ACTIVE_COLOURS_SETTING: string = ActiveSettings.Colours;
  ACTIVE_COMPONENTS_SETTING: string = ActiveSettings.Components;
  ACTIVE_LAYOUT_SETTING: string = ActiveSettings.Layout;
  ACTIVE_OPTIONS_SETTING: string = ActiveSettings.Options;
  private activeEditComponentSubscription: Subscription;
  private toolbarButtonColourSubscription: Subscription;
  private toolbarButtonComponentsSubscription: Subscription;
  private toolbarButtonLayoutSubscription: Subscription;
  private toolbarButtonOptionsSubscription: Subscription;
  ACTIVE_DESKTOP_ORIENTATION: string = ActiveOrientations.Desktop;
  ACTIVE_TABLET_ORIENTATION: string = ActiveOrientations.Tablet;
  ACTIVE_MOBILE_ORIENTATION: string = ActiveOrientations.Mobile;
  private toolbarButtonColoursStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  private toolbarButtonComponentsStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  private toolbarButtonLayoutStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  private toolbarButtonOptionsStyle: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  private toolbarButtonDesktopOrientationSubscription: Subscription;
  private toolbarButtonTabletOrientationSubscription: Subscription;
  private toolbarButtonMobileOrientationSubscription: Subscription;
  previewMode: boolean = false;
  private previewModeSubscription: Subscription;
  toolbarButtonDesktopOrientation: string = this.builderService.TOOLBAR_ACTIVE_BUTTON;
  toolbarButtonMobileOrientation: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarButtonTabletOrientation: string = this.builderService.TOOLBAR_INACTIVE_BUTTON;
  toolbarClass: string = 'toolbar no-select';

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
      if (response) {
        this.toolbarClass = 'toolbar-preview no-select';
      } else {
        this.toolbarClass = 'toolbar no-select';
      }
    });

    this.toolbarButtonColourSubscription = this.builderService.toolbarColoursButton.subscribe(response => {
      if (response) {
        this.toolbarButtonColoursStyle = response;
      }
    });

    this.toolbarButtonComponentsSubscription = this.builderService.toolbarComponentsButton.subscribe(response => {
      if (response) {
        this.toolbarButtonComponentsStyle = response;
      }
    });

    this.toolbarButtonLayoutSubscription = this.builderService.toolbarLayoutButton.subscribe(response => {
      if (response) {
        this.toolbarButtonLayoutStyle = response;
      }
    });

    this.toolbarButtonOptionsSubscription = this.builderService.toolbarOptionsButton.subscribe(response => {
      if (response) {
        this.toolbarButtonOptionsStyle = response;
      }
    });

    this.toolbarButtonDesktopOrientationSubscription = this.builderService.toolbarDesktopOrientationButton.subscribe(response => {
      if (response) {
        this.toolbarButtonDesktopOrientation = response;
      }
    });

    this.toolbarButtonTabletOrientationSubscription = this.builderService.toolbarTabletOrientationButton.subscribe(response => {
      if (response) {
        this.toolbarButtonTabletOrientation = response;
      }
    });

    this.toolbarButtonMobileOrientationSubscription = this.builderService.toolbarMobileOrientationButton.subscribe(response => {
      if (response) {
        this.toolbarButtonMobileOrientation = response;
      }
    });
  }

  setActiveEditSetting(settingName: string) {
    this.builderService.setActiveEditSetting(settingName);
    if (settingName == ActiveSettings.Colours) {
      this.builderService.setSidebarColoursSetting();
      this.setPrimaryToolbarButtonClass(ActiveSettings.Colours);
    }
    if (settingName == ActiveSettings.Components) {
      this.builderService.setSidebarComponentsSetting();
      this.setPrimaryToolbarButtonClass(ActiveSettings.Components);
    }
    if (settingName == ActiveSettings.Layout) {
      this.builderService.setSidebarLayoutSetting();
      this.setPrimaryToolbarButtonClass(ActiveSettings.Layout);
    }
    if (settingName == ActiveSettings.Options) {
      this.builderService.setSidebarOptionsSetting();
      this.setPrimaryToolbarButtonClass(ActiveSettings.Options);
    }
  }

  setPrimaryToolbarButtonClass(activeSetting) {
    this.builderService.toolbarColoursButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarComponentsButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarLayoutButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);
    this.builderService.toolbarOptionsButton.next(this.builderService.TOOLBAR_INACTIVE_BUTTON);

    if (activeSetting == ActiveSettings.Colours) {
      this.builderService.toolbarColoursButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
    if (activeSetting == ActiveSettings.Components) {
      this.builderService.toolbarComponentsButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
    if (activeSetting == ActiveSettings.Layout) {
      this.builderService.toolbarLayoutButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
    if (activeSetting == ActiveSettings.Options) {
      this.builderService.toolbarOptionsButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
    }
  }

  toggleMenuItemVisibility(menuItem) {
    if (this.activeEditComponent == ActiveComponents.Placeholder) {
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

    if (activeOrientation == ActiveOrientations.Desktop) {
      this.builderService.toolbarDesktopOrientationButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
      this.builderService.activeOrientation.next(ActiveOrientations.Desktop);
    }
    if (activeOrientation == ActiveOrientations.Tablet) {
      this.builderService.toolbarTabletOrientationButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
      this.builderService.activeOrientation.next(ActiveOrientations.Tablet);
    }
    if (activeOrientation == ActiveOrientations.Mobile) {
      this.builderService.toolbarMobileOrientationButton.next(this.builderService.TOOLBAR_ACTIVE_BUTTON);
      this.builderService.activeOrientation.next(ActiveOrientations.Mobile);
    }
  }

  togglePreview() {
    this.builderService.previewMode.next(!this.previewMode);
  }
}
