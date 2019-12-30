import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BuilderService } from '../builder.service';
import { debounce } from '../../../shared/decorators/debounce.decorator';

@Component({
  selector: 'app-builder-sidebar',
  templateUrl: './builder-sidebar.component.html',
  styleUrls: ['./builder-sidebar.component.css']
})
export class BuilderSidebarComponent implements OnInit, OnDestroy {
  innerHeight: number;
  sidebarTemplatesTab: string = 'tab-pane fade active show tab-padding';
  sidebarComponentsTab: string = 'tab-pane fade tab-padding';
  sidebarColoursTab: string = 'tab-pane fade tab-padding';
  sidebarLayoutTab: string = 'tab-pane fade tab-padding';
  sidebarOptionsTab: string = 'tab-pane fade tab-padding';
  sidebarPagesTab: string = 'tab-pane fade tab-padding';
  sidebarDataTab: string = 'tab-pane fade tab-padding';
  private sidebarDetailsTemplatesSubscription: Subscription;
  private sidebarDetailsComponentsSubscription: Subscription;
  private sidebarDetailsColoursSubscription: Subscription;
  private sidebarDetailsLayoutSubscription: Subscription;
  private sidebarDetailsOptionsSubscription: Subscription;
  private sidebarDetailsPagesSubscription: Subscription;
  private sidebarDetailsDataSubscription: Subscription;

  constructor(
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.sidebarDetailsTemplatesSubscription = this.builderService.sidebarTemplatesTab.subscribe(response => {
      if (response) {
        this.sidebarTemplatesTab = response;
      }
    });

    this.sidebarDetailsComponentsSubscription = this.builderService.sidebarComponentsTab.subscribe(response => {
      if (response) {
        this.sidebarComponentsTab = response;
      }
    });

    this.sidebarDetailsColoursSubscription = this.builderService.sidebarColoursTab.subscribe(response => {
      if (response) {
        this.sidebarColoursTab = response;
      }
    });

    this.sidebarDetailsLayoutSubscription = this.builderService.sidebarLayoutTab.subscribe(response => {
      if (response) {
        this.sidebarLayoutTab = response;
      }
    });

    this.sidebarDetailsOptionsSubscription = this.builderService.sidebarOptionsTab.subscribe(response => {
      if (response) {
        this.sidebarOptionsTab = response;
      }
    });

    this.sidebarDetailsPagesSubscription = this.builderService.sidebarPagesTab.subscribe(response => {
      if (response) {
        this.sidebarPagesTab = response;
      }
    });

    this.sidebarDetailsDataSubscription = this.builderService.sidebarDataTab.subscribe(response => {
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

  ngOnDestroy() {
    this.sidebarDetailsTemplatesSubscription.unsubscribe();
    this.sidebarDetailsComponentsSubscription.unsubscribe();
    this.sidebarDetailsColoursSubscription.unsubscribe();
    this.sidebarDetailsLayoutSubscription.unsubscribe();
    this.sidebarDetailsOptionsSubscription.unsubscribe();
    this.sidebarDetailsPagesSubscription.unsubscribe();
    this.sidebarDetailsDataSubscription.unsubscribe();
  }
}
