import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ShepherdService } from 'angular-shepherd';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from 'src/app/shared/services/template.service';
import { RouterService } from '../../shared/services/router.service';
import { UtilService } from '../../shared/services/util.service';
import { WebsiteService } from '../../shared/services/website.service';
import { AuthService } from '../auth/auth.service';
import { ActiveComponents, ActiveElements, ActiveSettings } from './builder';
import { BuilderComponentsService } from './builder-components/builder-components.service';
import { BuilderService } from './builder.service';

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
  ngUnsubscribe = new Subject<void>();

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private builderService: BuilderService,
    private routerService: RouterService,
    private websiteService: WebsiteService,
    private shepherdService: ShepherdService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private templateService: TemplateService,
    private builderComponentsService: BuilderComponentsService) {
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.routerService.currentRoute.next(window.location.pathname);
    this.routerService.setCurrentRoute();
    this.websiteService.websiteName.next(UtilService.generateWebsiteName());
    this.builderService.setActiveEditComponent(ActiveComponents.Placeholder);
    this.builderService.activeEditSetting.next(ActiveSettings.Templates);

    this.ngxLoader.start();
    this.builderService.websiteMode.next(false);
    this.builderService.previewMode.next(false);
    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response => {
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
      this.websiteService.getWebsiteById(id).pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((response => {
            if (response && response['pages']) {
              this.websiteService.websiteName.next(response['name']);
              this.builderComponentsService.pageComponents.next({
                'pages': response['pages'],
                'template': response['template']
              });
            } else {
              this.templateService.getWebsite('default').then(getWebsiteResponse => {
                this.builderComponentsService.pageComponents.next(getWebsiteResponse);
              });
              if (!this.authService.isLoggedIn()) {
                this.toastrService.warning('All changes will not be saved until you create an account.');
                localStorage.setItem('builderTourComplete', 'false');
              }
            }
            this.websiteService.websiteLoaded.next(true);
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
