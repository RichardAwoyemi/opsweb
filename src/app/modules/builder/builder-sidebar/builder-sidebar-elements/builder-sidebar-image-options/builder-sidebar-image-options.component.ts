import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-image-options',
  templateUrl: './builder-sidebar-image-options.component.html'
})

export class BuilderSidebarImageOptionsComponent implements OnInit, OnDestroy {

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
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setOptionValue(optionValue) {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, optionValue);
  }

  setComponentLayoutSelectorClass(optionValue) {
    if (optionValue === this.styleObject) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  resetOptionValue() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    if (this.elementSettings.name in defaultTemplate['details']) {
      this.styleObject = defaultTemplate['details'][this.elementSettings.name];
    } else {
      this.styleObject = defaultTemplate['style'][this.elementSettings.name];
    }
    this.setOptionValue(this.styleObject);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
