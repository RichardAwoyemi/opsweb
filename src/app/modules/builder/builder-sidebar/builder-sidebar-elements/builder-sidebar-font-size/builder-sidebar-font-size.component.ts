import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { ActiveTemplates } from '../../../builder';

@Component({
  selector: 'app-sidebar-font-size',
  templateUrl: './builder-sidebar-font-size.component.html'
})

export class BuilderSidebarFontSizeComponent implements OnInit, OnDestroy {

  @Input() data: any;
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

  private activeEditComponentIdSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private elementSubscription: Subscription;
  private templateSubscription: Subscription;
  private defaultStyleSubscription: Subscription;

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
      }
    });

    this.elementSubscription = this.data.componentService[this.data.elementName].subscribe(response => {
      if (response) {
        this.styleObject = response;
        if (this.styleObject['font-size']) {
          if (this.styleObject['font-size'].indexOf('px') > -1) {
            this.elementFontSize = this.styleObject['font-size'].replace('px', '');
          }
          if (this.styleObject['font-size'].indexOf('em') > -1) {
            this.elementFontSize = this.styleObject['font-size'].replace('em', '');
          }
        }
    }
  });

  this.templateSubscription = this.builderComponentsService.pageComponents.subscribe(templateResponse => {
    if (templateResponse) {
      this.currentTemplate = templateResponse['template'];
      this.defaultStyleSubscription = this.data.componentService[this.data.defaultStyleFunctionName](this.currentTemplate).subscribe(response => {
        if (response) {
          this.defaultStyle = response;
        }
      });
    } else {
      this.defaultStyleSubscription = this.data.componentService[this.data.defaultStyleFunctionName](ActiveTemplates.Default).subscribe(response => {
        if (response) {
          this.defaultStyle = response;
        }
      });
    }
  });

    this.fontUnitsSubscription = this.builderService.fontUnits.subscribe(response => {
      if (response) {
        this.fontUnits = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  resetFontSize() {
    this.styleObject['font-size'] = this.defaultStyle[this.data.elementName]['font-size'];
    this.elementFontUnit = 'px';
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
  }

  setFontSize() {
    this.styleObject['font-size'] = this.elementFontSize + this.elementFontUnit;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
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
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy() {
    this.templateSubscription.unsubscribe();
    this.defaultStyleSubscription.unsubscribe();
    this.elementSubscription.unsubscribe();
    this.fontUnitsSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
