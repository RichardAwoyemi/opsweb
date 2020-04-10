import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from '../../builder';
import { BuilderService } from '../../builder.service';

@Component({
  selector: 'app-builder-placeholder',
  templateUrl: './builder-placeholder.component.html'
})
export class BuilderPlaceholderComponent implements OnInit, OnDestroy {
  @Input() componentId: number;
  previewMode = false;
  ngUnsubscribe = new Subject<void>();
  private activeEditComponent: string;

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.previewMode = response;
      });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.activeEditComponent = response;
        }
      });
  }

  onDragOver(e) {
    e.target.className = 'drop-box-active';
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
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
