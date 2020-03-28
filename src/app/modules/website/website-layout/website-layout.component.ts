import { AfterViewInit, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderComponentsService } from '../../builder/builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../shared/services/website.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BuilderService } from '../../builder/builder.service';
import { ToastrService } from 'ngx-toastr';
import { RouterService } from '../../../shared/services/router.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./website-layout.component.css']
})
export class WebsiteLayoutComponent implements AfterViewInit {
  activePage = 'Home';
  pageComponents: any;
  builderComponents: any;
  id: string;
  document: any;
  private pageComponentsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private websiteSubscription: Subscription;
  private websiteNameSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private element: ElementRef,
    private builderComponentsService: BuilderComponentsService,
    private ngxLoader: NgxUiLoaderService,
    private toastrSevice: ToastrService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    if (RouterService.checkIfIsOnDomain()) {
      this.setupInternalWebsite();
    } else {
      this.setupExternalWebsite();
    }
  }

  static addJsToShadowRoot(shadowRoot, src) {
    const link = document.createElement('script');
    link.setAttribute('src', src);
    shadowRoot.prepend(link);
  }

  private static addCssToShadowRoot(shadowRoot, src) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', src);
    link.setAttribute('type', 'text/css');
    shadowRoot.prepend(link);
  }

  setupInternalWebsite() {
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.websiteService.websiteId.next(this.id);
        this.setupWebsite();
      }
    });
  }

  setupExternalWebsite() {
    const full = window.location.host;
    const parts = full.split('.');
    if (parts[0] && parts[1] && parts[2]) {
      const websiteName = parts[0];
      this.websiteNameSubscription = this.websiteService.getWebsiteByName(websiteName).subscribe(response => {
        if (response[0]) {
          this.id = response[0]['id'];
          this.websiteService.websiteId.next(response[0]['id']);
          this.setupWebsite();
        } else {
          window.location.href = environment.domainUrl;
        }
      });
    }
  }

  setupWebsite() {
    this.ngxLoader.start();
    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageResponse => {
        if (activePageResponse) {
          this.activePage = activePageResponse;
          this.websiteSubscription = this.websiteService.getWebsiteById(this.id).subscribe((websiteResponse => {
            if (websiteResponse) {
              this.websiteService.websiteName.next(websiteResponse['name']);
              if (websiteResponse['pages']) {
                this.builderComponentsService.pageComponents.next({
                  'pages': websiteResponse['pages'],
                  'template': websiteResponse['template']
                });
                this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((pageComponentsResponse => {
                  if (pageComponentsResponse) {
                    this.pageComponents = pageComponentsResponse;
                    this.setPageComponents();
                  }
                }));
              }
            } else {
              this.toastrSevice.warning('This website cannot be found.', 'Oops!');
              this.router.navigate(['home']).then(() => {
              });
            }
          }));
        } else {
        }
        this.ngxLoader.stop();
      }
    );
  }

  ngAfterViewInit() {
    const shadowRoot = this.element.nativeElement.shadowRoot;
    WebsiteLayoutComponent.addJsToShadowRoot(shadowRoot, 'assets/js/page.min.js');
    WebsiteLayoutComponent.addCssToShadowRoot(shadowRoot, 'assets/css/fonts.css');
    WebsiteLayoutComponent.addCssToShadowRoot(shadowRoot, 'assets/css/website.css');
    WebsiteLayoutComponent.addCssToShadowRoot(shadowRoot, 'assets/css/page.css');
  }

  setPageComponents() {
    let tempBuilderComponents = null;
    this.builderComponents = [];
    this.builderComponentsService.activeComponentIndex.next(null);

    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      if (this.pageComponents['pages'][i]['name'] === this.activePage) {
        tempBuilderComponents = this.pageComponents['pages'][i]['components'];
      }
    }

    if (tempBuilderComponents) {
      for (let j = 0; j < tempBuilderComponents.length; j++) {
        this.builderComponents.push(`<${tempBuilderComponents[j]['componentName']} id='${tempBuilderComponents[j]['componentId']}'/><${tempBuilderComponents[j]['componentName']}>`);
      }
    }
  }
}
