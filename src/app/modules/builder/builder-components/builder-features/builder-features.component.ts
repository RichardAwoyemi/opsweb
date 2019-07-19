import { Component, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveSettings } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';

@Component({
  selector: 'app-builder-features',
  templateUrl: './builder-features.component.html'
})
export class BuilderFeaturesComponent implements OnInit, IComponent {
  componentName: string = ActiveComponents.Features;
  innerHeight: number;
  activeEditComponent: string;
  previewMode: boolean;
  private activeEditComponentSubscription: Subscription;
  private previewModeSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
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
    this.builderService.setActiveEditComponent(ActiveComponents.Features);
    this.builderService.setActiveEditSetting(ActiveSettings.Colours);
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.componentName);
  }
}
