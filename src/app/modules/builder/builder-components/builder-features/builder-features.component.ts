import { Component, HostListener, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-builder-features',
  templateUrl: './builder-features.component.html'
})
export class BuilderFeaturesComponent implements OnInit, IComponent {
  componentName: string = ActiveComponents.Features;
  componentId: string = `${ ActiveComponents.Features }-${ UtilService.generateRandomString(8) }`;
  innerHeight: number;
  activeEditComponent: string;
  previewMode: boolean;
  componentActive: boolean = false;
  private activeEditComponentSubscription: Subscription;
  private previewModeSubscription: Subscription;

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  setActiveEditComponent() {
    window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-selected', 'message': this.componentId }, '*');
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
  }

  setComponentClass() {
    if (!this.previewMode) {
      if (this.componentActive) {
        return 'component-border-active';
      } else {
        return 'component-border';
      }
    } else {
      return '';
    }
  }

  setContextMenu() {
    if (!this.previewMode && this.componentActive) {
      return `${ this.componentName }-edit-component no-select`;
    } else {
      return 'no-select';
    }
  }

  clearActiveEditComponent() {
    this.componentActive = false;
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
    }
  }

  ngOnDestroy() {
    this.previewModeSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
  }
}
