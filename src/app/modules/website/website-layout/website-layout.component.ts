import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderComponentsService } from '../../builder/builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../shared/services/website.service';
import { ActivatedRoute } from '@angular/router';
import { BuilderService } from '../../builder/builder.service';

@Component({
  selector: 'app-website-layout',
  templateUrl: './website-layout.component.html'
})
export class WebsiteLayoutComponent implements OnInit {
  activePage = 'Home';
  pageComponents: any;
  builderComponents: any;
  id: string;

  private pageComponentsSubscription: Subscription;
  private activePageSettingSubscription: Subscription;
  private websiteSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.websiteService.websiteId.next(this.id);
    });
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
