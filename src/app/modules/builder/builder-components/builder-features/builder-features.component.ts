import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IComponent } from '../../../../shared/models/component';
import { ActiveComponents, ActiveElements, ActiveOrientations, ActiveSettings, ActiveThemes } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderFeaturesService } from './builder-features.service';

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
  featuresTemplate: string;
  featuresWidth: string;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private builderFeaturesService: BuilderFeaturesService,
    private builderComponentsService: BuilderComponentsService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.previewMode = response;
      });

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponentId = response;
        }
      });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });

    this.builderFeaturesService.featuresBreakpoint.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.setFeaturesWidth();
        }
      });

    this.builderService.activeElement.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeElement = response;
        }
      });

    this.builderService.toolbarMobileOrientationButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response === this.builderService.TOOLBAR_ACTIVE_BUTTON) {
          this.setFeaturesWidth(ActiveOrientations.Mobile);
        }
      });

    this.builderService.toolbarDesktopOrientationButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response === this.builderService.TOOLBAR_ACTIVE_BUTTON) {
          this.setFeaturesWidth(ActiveOrientations.Desktop);
        }
      });

    this.builderService.toolbarTabletOrientationButton.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response === this.builderService.TOOLBAR_ACTIVE_BUTTON) {
          this.setFeaturesWidth(ActiveOrientations.Tablet);
        }
      });

    this.builderService.activePageSetting.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activePageSettingResponse => {
        if (activePageSettingResponse) {
          this.activePageSetting = activePageSettingResponse;
          this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.pageComponents = response;
                this.featuresTemplate = this.pageComponents['template'];
                this.componentId = this.elementRef.nativeElement['id'];
                for (let i = 0; i < this.pageComponents['pages'].length; i++) {
                  const pageName = this.pageComponents['pages'][i]['name'];
                  if (pageName === this.activePageSetting) {
                    for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                      if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                        this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                        this.featuresItemArray = this.componentDetail['featuresItemArray'];
                        this.featuresStyle = this.componentDetail['style']['featuresStyle'];
                        this.featuresHeadingStyle = this.componentDetail['style']['featuresHeadingStyle'];
                        this.featuresSubheadingStyle = this.componentDetail['style']['featuresSubheadingStyle'];
                        this.featuresTheme = this.componentDetail['featuresTheme'];
                        this.featuresWidth = this.componentDetail['featuresWidth'];
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

  setFeaturesWidth(orientation: string = null) {
    this.builderFeaturesService.setFeaturesWidth(orientation);
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
    this.builderFeaturesService.featuresTemplate.next(this.featuresTemplate);
  }

  clearActiveEditComponent() {
    if (this.activeElement.indexOf('heading') === -1 && this.activeElement.indexOf('subheading') === -1) {
      window.postMessage({
        'for': 'opsonion',
        'action': 'duplicate-component-deselected',
        'message': this.componentId
      }, '*');
      this.componentActive = false;
      this.builderService.clearActiveEditComponent();
    }
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
    }
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
    if (this.featuresWidth) {
      return {
        'width': this.featuresWidth
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

  saveFeaturesHeadingStyleText(text, i) {
    this.featuresItemArray[i]['heading'] = text;
    this.builderComponentsService.setPageComponentById(this.componentId, 'featuresItemArray', this.featuresItemArray);
  }

  saveFeaturesSubheadingStyleText(text, i) {
    this.featuresItemArray[i]['subheading'] = text;
    this.builderComponentsService.setPageComponentById(this.componentId, 'featuresItemArray', this.featuresItemArray);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
