import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveElements, ActiveOrientations, ActiveSettings, ActiveTemplates, ActiveThemes } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/shared/services/util.service';
import { BuilderFeaturesService } from './builder-features.service';

@Component({
  selector: 'app-builder-features',
  templateUrl: './builder-features.component.html'
})
export class BuilderFeaturesComponent implements OnInit, IComponent, OnDestroy {
  componentName: string = ActiveComponents.Features;
  componentId = `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`;
  activeEditComponent: string;
  activeEditComponentId: string;
  innerHeight: number;
  previewMode: boolean;
  componentActive = false;
  activeElement: string;
  featuresItemArray: any = [
    {
      'heading': UtilService.generateRandomWord(),
      'subheading': 'Building a website has never been easier than this! Get started today, free of cost.'
    },
    {
      'heading': UtilService.generateRandomWord(),
      'subheading': 'Make our amazing library of templates and themes your own with our extensive range of custom options.'
    },
    {
      'heading': UtilService.generateRandomWord(),
      'subheading': 'Grow with ease and whilst receiving useful analytics. It\'s just what you need to grow.'
    }
  ];
  featuresHeadingStyle: any;
  featuresSubheadingStyle: any;
  featuresStyle: any = { 'width': '33.3%' };
  featuresOrientation: any;
  featuresHeadingActiveStyle: string;
  featuresSubheadingActiveStyle: string;
  featuresTheme: string = ActiveThemes.Default;
  featuresTemplate: string = ActiveTemplates.Default;

  private featuresBreakpointSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private featuresItemArraySubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private featuresThemeSubscription: Subscription;
  private featuresHeadingStyleSubscription: Subscription;
  private featuresSubheadingStyleSubscription: Subscription;
  private activeElementSubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    private builderService: BuilderService,
    private builderFeaturesService: BuilderFeaturesService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.builderFeaturesService.featuresHeadingStyle.next({});
    this.builderFeaturesService.featuresSubheadingStyle.next({});
    this.builderFeaturesService.featuresStyle.next({});
    this.builderFeaturesService.featuresItemArray.next(this.featuresItemArray);

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(response => {
      if (response) {
        this.builderFeaturesService.setFeaturesTemplate(response, this.componentId);
      } else {
        this.builderFeaturesService.setFeaturesTemplate(this.featuresTemplate, this.componentId);
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
      if (response == this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.setNumberOfFeatures(ActiveOrientations.Mobile);
      }
    });

    this.builderService.toolbarDesktopOrientationButton.subscribe(response => {
      if (response == this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.setNumberOfFeatures(ActiveOrientations.Desktop);
      }
    });

    this.builderService.toolbarTabletOrientationButton.subscribe(response => {
      if (response == this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.setNumberOfFeatures(ActiveOrientations.Tablet);
      }
    });
  }

  setNumberOfFeatures(orientation: string = null) {
    this.builderFeaturesService.featuresItemArray.next(this.featuresItemArray);
    this.builderFeaturesService.setNumberOfFeatures(this.componentId, this.featuresItemArray.length, orientation);
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    if (this.activeEditComponentId == this.componentId) {
      this.clearActiveEditComponent();
    } else {
      window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-selected', 'message': this.componentId }, '*');
      this.builderService.activeEditComponentId.next(this.componentId);
      this.builderService.setActiveEditComponent(this.componentName, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
      this.setComponentStyle();
    }
  }

  selectFeaturesElement(event: any, elementId: string) {
    if (!this.previewMode) {
      window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-selected', 'message': this.componentId }, '*');
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
      window.postMessage({ 'for': 'opsonion', 'action': 'element-selected', 'message': elementId }, '*');
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
    window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-deselected', 'message': this.componentId }, '*');
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

  setActiveElementStyle(activeElement, element) {
    if (activeElement == element && !this.previewMode) {
      if (element.indexOf(element) > -1) {
        return element + '-edit';
      }
    }
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for == 'opsonion') {
      if (e.data.action == 'unique-component-selected' || e.data.action == 'duplicate-component-deselected') {
        this.componentActive = false;
      }

      if (e.data.action == 'duplicate-component-selected') {
        this.componentActive = e.data.message == this.componentId;
      }

      if (e.data.action == 'element-selected') {
        this.builderService.activeElement.next(e.data.message);
      }

      if (e.data.action.indexOf(this.componentId) > -1) {
        if (e.data.action.indexOf('item') > -1) {
          if (e.data.message['featuresItemWidth']) {
            this.featuresStyle['width'] = e.data.message['featuresItemWidth'];
          }
          if (e.data.message['featuresItemArray']) {
            this.featuresItemArray = e.data.message['featuresItemArray'];
          }
        }
        if (e.data.action.indexOf('theme') > -1) {
          this.setFeaturesThemeStyle(e.data.message);
        }
        if (e.data.action.indexOf('template') > -1) {
          this.setFeaturesTemplateStyle(e.data.message);
        }
      }
    }
  }

  setFeaturesThemeStyle(theme: any) {
    if (theme['featuresStyle']) {
      this.featuresStyle['background-color'] = theme['featuresStyle']['background-color'];
      this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    }
    if (theme['featuresHeadingStyle']) {
      this.featuresHeadingStyle['color'] = theme['featuresHeadingStyle']['color'];
      this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    }
    if (theme['featuresSubheadingStyle']) {
      this.featuresSubheadingStyle['color'] = theme['featuresSubheadingStyle']['color'];
      this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    }
    if (theme['name']) {
      this.featuresTheme = theme['name'];
      this.builderFeaturesService.featuresTheme.next(theme['name']);
    }
  }

  setFeaturesTemplateStyle(template: any) {
    if (template['featuresStyle']) {
      const previousWidth = this.featuresStyle['width'];
      this.featuresStyle = template['featuresStyle'];
      this.featuresStyle['width'] = previousWidth;
      this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    }
    if (template['featuresHeadingStyle']) {
      this.featuresHeadingStyle = template['featuresHeadingStyle'];
      this.builderFeaturesService.featuresHeadingStyle.next(this.featuresHeadingStyle);
    }
    if (template['featuresSubheadingStyle']) {
      this.featuresSubheadingStyle = template['featuresSubheadingStyle'];
      this.builderFeaturesService.featuresSubheadingStyle.next(this.featuresSubheadingStyle);
    }
  }

  setFeaturesOuterStyle() {
    return {
      'padding-top': this.featuresStyle['padding-top'],
      'padding-left': this.featuresStyle['padding-left'],
      'padding-right': this.featuresStyle['padding-right'],
      'padding-bottom': this.featuresStyle['padding-bottom'],
      'background-color': this.featuresStyle['background-color'],
    };
  }

  setFeaturesInnerStyle() {
    return {
      'width': this.featuresStyle['width']
    };
  }

  setActiveElement(elementId: string) {
    if (this.activeElement == elementId && !this.previewMode) {
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
    if (this.featuresTemplateSubscription) {
      this.featuresTemplateSubscription.unsubscribe();
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
  }
}
