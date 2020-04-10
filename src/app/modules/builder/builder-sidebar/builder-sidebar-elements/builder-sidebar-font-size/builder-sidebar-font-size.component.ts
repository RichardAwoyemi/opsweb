import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-font-size',
  templateUrl: './builder-sidebar-font-size.component.html'
})

export class BuilderSidebarFontSizeComponent implements OnInit, OnDestroy {

  @Input() data: any;
  @Input() elementSettings: any;

  styleObject: any;
  fontUnits: any;
  elementFontSize: number;
  elementFontUnit = 'px';
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  pageComponents: any;
  elementCount: number;
  element: any;

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
        const pageComponents = response;
        const component = pageComponents['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
        if (this.elementSettings.name in component) {
          this.styleObject = component[this.elementSettings.name];
        } else {
          this.styleObject = component['style'][this.elementSettings.name];
          this.elementFontSize = this.styleObject['font-size'].replace('px', '').replace('em', '');
        }
      }
    });

    this.builderService.fontUnits.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  resetFontSize() {

    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    this.styleObject['font-size'] = defaultTemplate['style'][this.elementSettings.name]['font-size'];
    this.elementFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
  }

  setFontSize() {
    this.styleObject['font-size'] = this.elementFontSize + this.elementFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  onFontSizeUnitChange() {
    if (this.elementFontUnit === 'em') {
      if (this.elementFontSize < 16) {
        this.elementFontSize = 16;
      }
      this.elementFontSize = Math.round(this.elementFontSize / 16);
    }

    if (this.elementFontUnit === 'px') {
      this.elementFontSize = Math.round(this.elementFontSize * 16);
    }

    this.styleObject['font-size'] = this.elementFontSize + this.elementFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
