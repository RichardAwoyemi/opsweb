import { AfterViewInit, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderComponentsService } from '../../builder/builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../shared/services/website.service';
import { ActivatedRoute } from '@angular/router';
import { BuilderService } from '../../builder/builder.service';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WebsiteLayoutComponent implements OnInit, AfterViewInit {
  activePage = 'Home';
  pageComponents: any;
  builderComponents: any;
  id: string;
  document: any;
  private pageComponentsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private websiteSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private element: ElementRef,
    private builderComponentsService: BuilderComponentsService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.websiteService.websiteId.next(this.id);
    });
  }

  private static appendToShadowRoot(shadowRoot, src) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', src);
    shadowRoot.append(link);
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageResponse => {
      if (activePageResponse) {
        this.activePage = activePageResponse;
        this.websiteSubscription = this.websiteService.getWebsite(this.id).subscribe((websiteResponse => {
          this.websiteService.websiteName.next(websiteResponse['name']);
          if (websiteResponse) {
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
            }
        }));
        }
        this.ngxLoader.stop();
      }
    );
  }

  ngAfterViewInit() {
    const shadowRoot: DocumentFragment = this.element.nativeElement.shadowRoot;
    WebsiteLayoutComponent.appendToShadowRoot(shadowRoot, 'assets/css/page.css');
    WebsiteLayoutComponent.appendToShadowRoot(shadowRoot, 'assets/css/website.css');
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
