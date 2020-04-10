import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { BuilderService } from '../builder.service';
import { debounce } from '../../../shared/decorators/debounce.decorator';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.css']
})
export class BuilderSidebarComponent implements OnInit, OnDestroy {
  innerHeight: number;
  sidebarTemplatesTab = 'tab-pane fade active show tab-padding';
  sidebarComponentsTab = 'tab-pane fade tab-padding';
  sidebarColoursTab = 'tab-pane fade tab-padding';
  sidebarLayoutTab = 'tab-pane fade tab-padding';
  sidebarOptionsTab = 'tab-pane fade tab-padding';
  sidebarPagesTab = 'tab-pane fade tab-padding';
  sidebarDataTab = 'tab-pane fade tab-padding';
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.builderService.sidebarTemplatesTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarTemplatesTab = response;
        }
      });

    this.builderService.sidebarComponentsTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarComponentsTab = response;
        }
      });

    this.builderService.sidebarColoursTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarColoursTab = response;
        }
      });

    this.builderService.sidebarLayoutTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarLayoutTab = response;
        }
      });

    this.builderService.sidebarOptionsTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarOptionsTab = response;
        }
      });

    this.builderService.sidebarPagesTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarPagesTab = response;
        }
      });

    this.builderService.sidebarDataTab.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.sidebarDataTab = response;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize() {
    this.innerHeight = window.innerHeight;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
