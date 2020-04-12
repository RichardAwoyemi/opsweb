import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-sidebar-image-size',
  templateUrl: './builder-sidebar-image-size.component.html'
})

export class BuilderSidebarImageSizeComponent implements OnInit, OnDestroy {

  imageSize: number;
  sizeUnit = '%';
  maxValue = 100;
  minValue = 0;
  styleObject: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();
  condition = true;

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

        if (this.elementSettings.condition) {
          for (let i = 0; i < this.elementSettings.condition.length; i++) {
            const criteria = this.elementSettings.condition[i];
            if (this.condition || this.elementSettings.any) {
              this.condition = (!!UtilService.getDeepProp(component, criteria.property) === criteria.exists);
              if (this.condition && this.elementSettings.any) { break; }
            }
          }
        }

        this.sizeUnit = this.elementSettings.sizeUnit || this.sizeUnit;
        this.maxValue = this.elementSettings.maxValue || this.maxValue;
        this.minValue = this.elementSettings.minValue || this.minValue;
        if (this.styleObject) {
          this.imageSize = this.styleObject['width'].replace(this.sizeUnit, '');
        }
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
    this.styleObject['width'] = this.imageSize + this.sizeUnit;
    this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, this.elementSettings.name, 'width', this.styleObject['width']);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
