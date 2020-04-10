import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-image-size',
  templateUrl: './builder-sidebar-image-size.component.html'
})

export class BuilderSidebarImageSizeComponent implements OnInit, OnDestroy {

  imageSize: number;
  imageUnit = '%';
  styleObject: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();

  @Input() data: any;
  @Input() elementSettings: any;

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
          this.styleObject = component[this.elementSettings.name];
        } else {
          this.styleObject = component['style'][this.elementSettings.name];
        }
        this.imageSize = this.styleObject['width'].replace('%', '');
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  resetImageSize() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    this.styleObject['width'] = defaultTemplate['style'][this.elementSettings.name]['width'];
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.elementSettings.name, 'width', this.styleObject['width']);
  }

  setImageSize() {
    this.styleObject['width'] = this.imageSize + '%';
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.elementSettings.name, 'width', this.styleObject['width']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
