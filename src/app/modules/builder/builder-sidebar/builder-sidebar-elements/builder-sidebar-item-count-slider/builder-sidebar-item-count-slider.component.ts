import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-sidebar-item-count-slider',
  templateUrl: './builder-sidebar-item-count-slider.component.html'
})

export class BuilderSidebarItemCountSliderComponent implements OnInit, OnDestroy {

  @Input() data: any;
  styleObject: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  pageComponents: any;
  elementCount: number;
  element: any;

  private activeEditComponentIdSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;


  constructor(
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
        this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
          if (response) {
            this.pageComponents = response;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeEditComponentId) {
                  if (this.pageComponents['pages'][i]['components'][j][this.data.elementContent]) {
                    this.elementCount = this.pageComponents['pages'][i]['components'][j][this.data.elementContent].length;
                    this.element = this.pageComponents['pages'][i]['components'][j][this.data.elementContent];
                  }
                  if (this.pageComponents['pages'][i]['components'][j][this.data.elementName]) {
                    this.styleObject = this.pageComponents['pages'][i]['components'][j][this.data.elementName];
                  }
                }
              }
            }
          }
        });
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setElementCount(value: number) {
    const newComponentDetails = this.data.componentService[this.data.setAndGetElementsFunction](value);
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementContent, newComponentDetails['array']);
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.data.elementName, 'width', newComponentDetails['width']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetElementCount() {
    const newComponentDetails = this.data.componentService[this.data.setAndGetElementsFunction](3);
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementContent, newComponentDetails['array']);
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.data.elementNameS, 'width', newComponentDetails['width']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy() {
    this.builderComponentsSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
