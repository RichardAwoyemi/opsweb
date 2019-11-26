import { Component, Input, OnInit } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents } from '../../builder';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-builder-placeholder',
  templateUrl: './builder-placeholder.component.html'
})
export class BuilderPlaceholderComponent implements OnInit {
  @Input() componentId: number;
  previewMode: boolean = false;
  private previewModeSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponent: string;

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  onDragOver(e) {
    if (this.activeEditComponent == ActiveComponents.Placeholder) {
      e.target.className = 'drop-box-active';
    }
  }

  onDragLeave(e) {
    e.target.className = 'drop-box';
  }

  onDragExit(e) {
    e.target.className = 'drop-box';
  }

  onDropEvent(e) {
    e.target.className = 'drop-box';
  }

  setActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }

  clearActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }
}
