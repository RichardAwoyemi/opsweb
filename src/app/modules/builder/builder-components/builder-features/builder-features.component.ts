import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveElements, ActiveOrientations, ActiveSettings, ActiveThemes } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { HttpClient } from '@angular/common/http';
import { BuilderFeaturesService } from './builder-features.service';
import { BuilderComponentsService } from '../builder-components.service';

@Component({
  selector: 'app-builder-features',
  templateUrl: './builder-features.component.html'
})
export class BuilderFeaturesComponent implements OnInit, IComponent, OnDestroy {
  componentName: string = ActiveComponents.Features;
  componentId: string;
  componentIndex: string;
  activeEditComponent: string;
  activeEditComponentId: string;
  innerHeight: number;
  previewMode: boolean;
  componentActive = false;
  activeElement: string;
  activePageSetting: string;
  componentDetail: any;
  featuresItemArray: any;
  featuresHeadingStyle: any;
  featuresSubheadingStyle: any;
  featuresStyle: any;
  pageComponents: any;
  featuresTheme: string = ActiveThemes.Default;

  private featuresBreakpointSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private featuresItemArraySubscription: Subscription;
  private featuresThemeSubscription: Subscription;
  private featuresHeadingStyleSubscription: Subscription;
  private featuresSubheadingStyleSubscription: Subscription;
  private activeElementSubscription: Subscription;
  private componentsDetailSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private builderService: BuilderService,
    private builderFeaturesService: BuilderFeaturesService,
    private builderComponentService: BuilderComponentsService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.featuresBreakpointSubscription = this.builderFeaturesService.featuresBreakpoint.subscribe(response => {
      if (response) {
        this.setNumberOfFeatures();
      }
    });

    this.activeElementSubscription = this.builderService.activeElement.subscribe(response => {
      if (response) {
        this.activeElement = response;
      }
    });

    this.builderService.toolbarMobileOrientationButton.subscribe(response => {
      if (response === this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.setNumberOfFeatures(ActiveOrientations.Mobile);
      }
    });

    this.builderService.toolbarDesktopOrientationButton.subscribe(response => {
      if (response === this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.setNumberOfFeatures(ActiveOrientations.Desktop);
      }
    });

    this.builderService.toolbarTabletOrientationButton.subscribe(response => {
      if (response === this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.setNumberOfFeatures(ActiveOrientations.Tablet);
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
                    this.featuresStyle = this.componentDetail['featuresStyle'];
                    this.featuresHeadingStyle = this.componentDetail['featuresHeadingStyle'];
                    this.featuresSubheadingStyle = this.componentDetail['featuresSubheadingStyle'];
                    this.featuresItemArray = this.componentDetail['featuresItemArray'];
                    this.featuresTheme = this.componentDetail['featuresTheme'];
                    this.componentIndex = this.componentDetail['componentIndex'];
                  }
                }
              }
            }
          }
        });
      }
    });
  }

  setNumberOfFeatures(orientation: string = null) {
    if (this.featuresItemArray) {
      this.builderFeaturesService.featuresItemArray.next(this.featuresItemArray);
      this.builderFeaturesService.setNumberOfFeatures(this.componentId, this.featuresItemArray.length, orientation);
    }
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    if (this.activeEditComponentId === this.componentId) {
      this.clearActiveEditComponent();
    } else {
      window.postMessage({
        'for': 'opsonion',
        'action': 'duplicate-component-selected',
        'message': this.componentId
      }, '*');
      this.builderService.activeEditComponentId.next(this.componentId);
      this.builderService.setActiveEditComponent(this.componentName, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
      this.setComponentStyle();
    }
  }

  selectFeaturesElement(event: any, elementId: string) {
    if (!this.previewMode) {
      window.postMessage({
        'for': 'opsonion',
        'action': 'duplicate-component-selected',
        'message': this.componentId
      }, '*');
      this.builderService.activeEditComponentId.next(this.componentId);
      this.builderService.setActiveEditComponent(ActiveComponents.Features, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Options);
      this.builderService.setSidebarOptionsSetting();
      if (elementId.indexOf('subheading') > -1) {
        this.builderService.triggerScrollTo('features-subheading-options');
      } else if (elementId.indexOf('heading') > -1) {
        this.builderService.triggerScrollTo('features-heading-options');
      }
      this.setComponentStyle();
      window.postMessage({'for': 'opsonion', 'action': 'element-selected', 'message': elementId}, '*');
      event.stopPropagation();
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName, this.componentActive);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setComponentStyle() {
    this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderFeaturesService.featuresItemArray.next(this.featuresItemArray);
    this.builderFeaturesService.featuresTheme.next(this.featuresTheme);
  }

  clearActiveEditComponent() {
    window.postMessage({
      'for': 'opsonion',
      'action': 'duplicate-component-deselected',
      'message': this.componentId
    }, '*');
    this.componentActive = false;
    this.builderService.clearActiveEditComponent();
  }

  setFeaturesClass(element) {
    if (this.previewMode) {
      return element + '-preview';
    }
    if (!this.previewMode) {
      return element + '-active';
    }
  }

  setContentEditable() {
    return !this.previewMode;
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for === 'opsonion') {
      if (e.data.action === 'unique-component-selected' || e.data.action === 'duplicate-component-deselected') {
        this.componentActive = false;
      }

      if (e.data.action === 'duplicate-component-selected') {
        this.componentActive = e.data.message === this.componentId;
      }

      if (e.data.action === 'element-selected') {
        this.builderService.activeElement.next(e.data.message);
      }

      if (e.data.action.indexOf(this.componentId) > -1) {
        if (e.data.action.indexOf('item') > -1) {
          this.setFeaturesItems(e.data.message);
        }
        if (e.data.action.indexOf('theme') > -1) {
          this.setFeaturesThemeStyle(e.data.message);
        }
        if (e.data.action.indexOf('style') > -1) {
          this.setFeaturesStyle(e.data.message);
        }
      }
    }
  }

  setFeaturesItems(items: any) {
    if (this.featuresStyle) {
      const components = this.builderComponentService.pageComponents.getValue();
      const activePageIndex = items['targetActiveComponent']['activePageIndex'];
      const activeComponentIndex = items['targetActiveComponent']['activeComponentIndex'];
      const timestamp = new Date().getTime();

      if (items['featuresItemWidth']) {
        this.featuresStyle['width'] = items['featuresItemWidth'];
        components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresStyle'] = this.featuresStyle;
        components['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
        this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
      }

      if (items['featuresItemArray']) {
        this.featuresItemArray = items['featuresItemArray'];
        components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresItemArray'] = this.featuresItemArray;
        components['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
        this.builderFeaturesService.featuresItemArray.next(this.featuresItemArray);
      }

      this.builderComponentService.pageComponents.next(components);
    }
  }

  setFeaturesStyle(style: any) {
    const components = this.builderComponentService.pageComponents.getValue();
    const activePageIndex = style['targetActiveComponent']['activePageIndex'];
    const activeComponentIndex = style['targetActiveComponent']['activeComponentIndex'];
    const timestamp = new Date().getTime();

    if (style['featuresStyle']) {
      const previousWidth = this.featuresStyle['width'];
      this.featuresStyle = style['featuresStyle'];
      this.featuresStyle['width'] = previousWidth;
      components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresStyle'] = this.featuresStyle;
      components['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
      this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    }

    if (style['featuresHeadingStyle']) {
      this.featuresHeadingStyle = style['featuresHeadingStyle'];
      components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresHeadingStyle'] = this.featuresHeadingStyle;
      components['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
      this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    }

    if (style['featuresSubheadingStyle']) {
      this.featuresSubheadingStyle = style['featuresSubheadingStyle'];
      components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresSubheadingStyle'] = this.featuresSubheadingStyle;
      components['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;
      this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    }
  }

  setFeaturesThemeStyle(theme: any) {
    const components = this.builderComponentService.pageComponents.getValue();
    const activePageIndex = theme['targetActiveComponent']['activePageIndex'];
    const activeComponentIndex = theme['targetActiveComponent']['activeComponentIndex'];
    const timestamp = new Date().getTime();

    components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresStyle'] = theme['featuresStyle'];
    components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresHeadingStyle'] = theme['featuresHeadingStyle'];
    components['pages'][activePageIndex]['components'][activeComponentIndex]['featuresSubheadingStyle'] = theme['featuresSubheadingStyle'];
    components['pages'][activePageIndex]['components'][activeComponentIndex]['timestamp'] = timestamp;

    this.featuresStyle = theme['featuresStyle'];
    this.featuresHeadingStyle = theme['featuresHeadingStyle'];
    this.featuresSubheadingStyle = theme['featuresSubheadingStyle'];

    this.builderComponentService.pageComponents.next(components);
  }

  setFeaturesOuterStyle() {
    if (this.featuresStyle) {
      return {
        'padding-top': this.featuresStyle['padding-top'],
        'padding-left': this.featuresStyle['padding-left'],
        'padding-right': this.featuresStyle['padding-right'],
        'padding-bottom': this.featuresStyle['padding-bottom'],
        'background-color': this.featuresStyle['background-color'],
      };
    }
  }

  setFeaturesInnerStyle() {
    if (this.featuresStyle) {
      return {
        'width': this.featuresStyle['width']
      };
    }
  }

  setActiveElement(elementId: string) {
    if (this.activeElement === elementId && !this.previewMode) {
      if (elementId.indexOf('subheading') > -1) {
        return 'features-subheading-edit';
      } else if (elementId.indexOf('heading') > -1) {
        return 'features-heading-edit';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  ngOnDestroy() {
    if (this.featuresBreakpointSubscription) {
      this.featuresBreakpointSubscription.unsubscribe();
    }
    if (this.featuresHeadingStyleSubscription) {
      this.featuresHeadingStyleSubscription.unsubscribe();
    }
    if (this.featuresSubheadingStyleSubscription) {
      this.featuresSubheadingStyleSubscription.unsubscribe();
    }
    if (this.featuresStyleSubscription) {
      this.featuresStyleSubscription.unsubscribe();
    }
    if (this.featuresThemeSubscription) {
      this.featuresThemeSubscription.unsubscribe();
    }
    if (this.activeEditComponentIdSubscription) {
      this.activeEditComponentIdSubscription.unsubscribe();
    }
    if (this.previewModeSubscription) {
      this.previewModeSubscription.unsubscribe();
    }
    if (this.activeEditComponentSubscription) {
      this.activeEditComponentSubscription.unsubscribe();
    }
    if (this.featuresItemArraySubscription) {
      this.featuresItemArraySubscription.unsubscribe();
    }
    if (this.componentsDetailSubscription) {
      this.componentsDetailSubscription.unsubscribe();
    }
  }
}
