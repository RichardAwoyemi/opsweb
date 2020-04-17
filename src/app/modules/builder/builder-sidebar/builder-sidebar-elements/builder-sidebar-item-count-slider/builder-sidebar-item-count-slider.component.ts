import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-item-count-slider',
  templateUrl: './builder-sidebar-item-count-slider.component.html',
  styleUrls: ['./builder-sidebar-item-count-slider.component.css']
})

export class BuilderSidebarItemCountSliderComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() elementSettings: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  elementArraySize: number;
  ngUnsubscribe = new Subject<void>();


  constructor(
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe)).subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response && this.data.componentIndex) {
        const pageComponent = response;
        const component = pageComponent['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
        if (this.elementSettings.name in component) {
          if (component[this.elementSettings.name]){
            this.elementArraySize = component[this.elementSettings.name].length || 1;
          }
        } else {
          if (component['style'][this.elementSettings.name]) {
            this.elementArraySize = component['style'][this.elementSettings.name].length;
          }
        }
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setElementCount(value: number) {
    this.data.componentService[this.data.updateElementCountFunction](this.activeEditComponentId, value);
  }

  resetElementCount() {
    this.setElementCount(3);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
