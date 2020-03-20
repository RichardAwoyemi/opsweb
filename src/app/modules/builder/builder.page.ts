import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderService } from './builder.service';
import { Subscription } from 'rxjs';
import { RouterService } from '../../shared/services/router.service';
import { ShepherdService } from 'angular-shepherd';
import { UtilService } from '../../shared/services/util.service';
import { WebsiteService } from '../../shared/services/website.service';
import { BuilderComponentsService } from './builder-components/builder-components.service';
import { ActiveComponents, ActiveElements } from './builder';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.page.html'
})
export class BuilderComponent implements OnInit, AfterViewInit, OnDestroy {
  innerWidth: number;
  previewMode = false;
  sidebarClass = 'col-md-3';
  showcaseClass = 'col-md-9';
  websiteName: string;
  previewModeSubscription: Subscription;
  websiteSubscription: Subscription;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private builderService: BuilderService,
    private routerService: RouterService,
    private websiteService: WebsiteService,
    private shepherdService: ShepherdService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private builderComponentsService: BuilderComponentsService) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
    this.websiteService.websiteName.next(UtilService.generateWebsiteName());
    this.builderService.setActiveEditComponent(ActiveComponents.Placeholder);
    this.builderService.setActiveEditSetting(ActiveElements.Default);
    this.builderService.setSidebarTemplatesSetting();

    this.ngxLoader.start();
    this.builderService.websiteMode.next(false);
    this.builderService.previewMode.next(false);
    this.previewModeSubscription = this.builderService.previewMode.subscribe((response => {
      if (response) {
        this.previewMode = response;
        this.showcaseClass = 'col-md-12';
      } else {
        this.previewMode = false;
        this.setBuilderPanelSizes();
      }
    }));

    const id = window.location.pathname.split('/')[2];
    if (id) {
      this.websiteService.websiteId.next(id);
      this.websiteSubscription = this.websiteService.getWebsite(id).subscribe((response => {
          if (response) {
            this.websiteService.websiteName.next(response['name']);
            if (response['pages']) {
              this.builderComponentsService.pageComponents.next({
                'pages': response['pages'],
                'template': response['template']
              });
            } else {
              this.builderComponentsService.pageComponents.next(this.builderComponentsService.defaultPageComponents.getValue());
              if (!this.authService.isLoggedIn()) {
                this.toastrService.warning('All changes will not be saved until you create an account.');
                localStorage.setItem('builderTourComplete', 'false');
              }
            }
            this.websiteService.websiteLoaded.next(true);
          }
        }
      ));
    }
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

  ngOnDestroy() {
    this.previewModeSubscription.unsubscribe();
    this.websiteSubscription.unsubscribe();
  }
}
