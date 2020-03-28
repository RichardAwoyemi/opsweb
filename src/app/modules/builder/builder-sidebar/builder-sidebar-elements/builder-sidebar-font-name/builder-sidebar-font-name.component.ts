import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { ActiveTemplates } from '../../../builder';
import { WebsiteService } from 'src/app/shared/services/website.service';

@Component({
  selector: 'app-sidebar-font-name',
  templateUrl: './builder-sidebar-font-name.component.html'
})

export class BuilderSidebarFontNameComponent implements OnInit, OnDestroy {

  styleObject: any;
  styleObjectFontName: string;
  fontUnits: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  private fontNamesSubscription: Subscription;
  private elementSubscription: Subscription;
  private templateSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private defaultStyleSubscription: Subscription;
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

    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.elementSubscription = this.data.componentService[this.data.elementName].subscribe(response => {
      if (response) {
        this.styleObject = response;
        const splitFontName = this.styleObject['font-family'].split(',');
        this.styleObjectFontName = splitFontName[0].replace(/'/g, '');
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

  onFontNameChange() {
    this.styleObject['font-family'] = this.styleObjectFontName;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetFontName() {
    this.styleObject['font-family'] = this.defaultStyle[this.data.elementName]['font-family'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
  }

  ngOnDestroy() {
    this.fontNamesSubscription.unsubscribe();
    this.elementSubscription.unsubscribe();
    this.templateSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.defaultStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
