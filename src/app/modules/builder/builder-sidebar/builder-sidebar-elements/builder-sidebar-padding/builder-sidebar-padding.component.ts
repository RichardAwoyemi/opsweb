import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { ActiveTemplates } from '../../../builder';
import { WebsiteService } from 'src/app/shared/services/website.service';

@Component({
  selector: 'app-sidebar-padding',
  templateUrl: './builder-sidebar-padding.component.html'
})

export class BuilderSidebarPaddingComponent implements OnInit, OnDestroy {

  styleObject: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
  paddingBottom: number;
  private elementSubscription: Subscription;
  private templateSubscription: Subscription;
  private defaultStyleSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;

  @Input() data: any;

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
        if (this.styleObject['padding-top']) {
          this.paddingTop = this.styleObject['padding-top'].replace('px', '');
        }
        if (this.styleObject['padding-left']) {
          this.paddingLeft = this.styleObject['padding-left'].replace('px', '');
        }
        if (this.styleObject['padding-right']) {
          this.paddingRight = this.styleObject['padding-right'].replace('px', '');
        }
        if (this.styleObject['padding-bottom']) {
          this.paddingBottom = this.styleObject['padding-bottom'].replace('px', '');
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

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setPadding(position: string, value: number) {
    this.styleObject[`padding-${position}`] = `${value}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetPaddingStyle() {
    for (let i of ['padding-top', 'padding-left', 'padding-right', 'padding-bottom']) {
      this.styleObject[i] = this.defaultStyle[this.data.elementName][i];
    }
    this.paddingTop = this.styleObject['padding-top'].replace('px', '');
    this.paddingLeft = this.styleObject['padding-left'].replace('px', '');
    this.paddingRight = this.styleObject['padding-right'].replace('px', '');
    this.paddingBottom = this.styleObject['padding-bottom'].replace('px', '');
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.builderComponentsService[this.data.elementName].next(this.styleObject);
  }

  ngOnDestroy() {
    this.elementSubscription.unsubscribe();
    this.templateSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.defaultStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
