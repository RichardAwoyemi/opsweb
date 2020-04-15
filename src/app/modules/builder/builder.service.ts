import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { TourService } from '../../shared/services/tour.service';
import { ActiveComponents, ActiveElements, ActiveOrientations, ActiveSettings } from './builder';

@Injectable()
export class BuilderService {
  activeEditComponent = new BehaviorSubject<string>(null);
  activeEditComponentId = new BehaviorSubject<string>(ActiveComponents.Placeholder);
  activeEditSetting = new BehaviorSubject<string>(null);
  activePageSetting = new BehaviorSubject<string>('Home');
  activePageIndex = new BehaviorSubject<number>(0);
  activeElement = new BehaviorSubject<string>(null);
  activeOrientation = new BehaviorSubject<string>(null);
  activeScreenSize = new BehaviorSubject<string>(null);
  previewMode = new BehaviorSubject<boolean>(false);
  websiteMode = new BehaviorSubject<boolean>(false);
  fullScreenMode = new BehaviorSubject<boolean>(false);
  fontNames = new BehaviorSubject<string[]>(['Avenir Next Regular', 'Avenir Next Medium', 'Nunito Sans', 'Poppins']);
  fontUnits = new BehaviorSubject<string[]>(['px', 'em']);
  shepherdDefaultStepOptions: any = TourService.setupBuilderTourStepOptions;
  shepherdDefaultSteps: any = TourService.setupBuilderTourSteps();

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
        this.activeScreenSize.next(ActiveOrientations.Mobile);
      } else if (result.breakpoints[Breakpoints.Medium]) {
        this.activeScreenSize.next(ActiveOrientations.Tablet);
      } else {
        this.activeScreenSize.next(ActiveOrientations.Desktop);
      }
      if (!this.activeOrientation.getValue() && !this.websiteMode.getValue()) {
        this.activeOrientation.next(this.activeScreenSize.getValue());
      }
    });
  }

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

  setActiveEditComponent(componentName: string, componentId: string = ActiveComponents.Placeholder) {
    this.activeEditComponentId.next(componentId);
    this.activeEditComponent.next(componentName);
  }

  // noinspection JSUnusedLocalSymbols
  triggerScrollTo(elementId = null) {
  }

  clearActiveEditComponent() {
    this.activeEditComponentId.next(ActiveComponents.Placeholder);
    this.activeEditComponent.next(ActiveComponents.Placeholder);
    this.activeElement.next(ActiveElements.Default);
    window.postMessage({ 'for': 'opsonion', 'action': 'deselect-text', }, '*');
  }
}
