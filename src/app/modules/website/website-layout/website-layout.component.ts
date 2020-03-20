import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BuilderComponentsService } from '../../builder/builder-components/builder-components.service';
import { Subscription } from 'rxjs';
import { WebsiteService } from '../../../shared/services/website.service';
import { ActivatedRoute } from '@angular/router';

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
  private websiteSubscription: Subscription;

  constructor(
    private websiteService: WebsiteService,
    private builderComponentsService: BuilderComponentsService,
    private ngxLoader: NgxUiLoaderService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  ngOnInit() {
    this.ngxLoader.start();

    this.websiteSubscription = this.websiteService.getWebsite(this.id).subscribe((response => {
        if (response) {
          if (response['pages']) {
            this.builderComponentsService.pageComponents.next({
              'pages': response['pages'],
              'template': response['template']
            });
          }

          this.pageComponentsSubscription = this.builderComponentsService.pageComponents.subscribe((pageComponentsResponse => {
            if (pageComponentsResponse) {
              this.pageComponents = pageComponentsResponse;
              this.setPageComponents();
            }
          }));
        }
      }
    ));

    this.ngxLoader.stop();
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
