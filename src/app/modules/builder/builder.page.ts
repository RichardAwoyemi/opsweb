import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderService } from './builder.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../../shared/services/router.service';
import { ShepherdService } from 'angular-shepherd';
import { UtilService } from '../../shared/services/util.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.page.html'
})
export class BuilderComponent implements OnInit, AfterViewInit {
  innerWidth: number;
  previewMode = false;
  sidebarClass = 'col-md-3';
  showcaseClass = 'col-md-9';
  websiteName: string;
  previewModeSubscription: Subscription;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private builderService: BuilderService,
    private routerService: RouterService,
    private shepherdService: ShepherdService
  ) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
    this.builderService.websiteName.next(UtilService.generateWebsiteName());

    this.ngxLoader.start();
    this.previewModeSubscription = this.builderService.previewMode.subscribe((response => {
      if (response) {
        this.previewMode = response;
        this.showcaseClass = 'col-md-12';
      } else {
        this.previewMode = false;
        this.setBuilderPanelSizes();
      }
    }));
    this.ngxLoader.stop();
  }

  ngAfterViewInit() {
    const startTour = localStorage.getItem('builderTourComplete');
    if (!startTour || startTour === 'false') {
      this.shepherdService.defaultStepOptions = this.builderService.shepherdDefaultStepOptions;
      this.shepherdService.requiredElements = [];
      this.shepherdService.modal = true;
      this.shepherdService.confirmCancel = false;
      this.shepherdService.addSteps(this.builderService.shepherdDefaultSteps);
      this.shepherdService.start();
      localStorage.setItem('builderTourComplete', 'true');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (!this.previewMode) {
      this.setBuilderPanelSizes();
    }
  }

  setBuilderPanelSizes() {
    if (this.innerWidth > 1900) {
      this.showcaseClass = 'col-md-10';
      this.sidebarClass = 'col-md-2';
    } else {
      this.showcaseClass = 'col-md-9';
      this.sidebarClass = 'col-md-3';
    }
  }
}
