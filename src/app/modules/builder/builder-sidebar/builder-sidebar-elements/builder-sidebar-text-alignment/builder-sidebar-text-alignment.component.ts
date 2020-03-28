import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { ActiveTemplates } from '../../../builder';
import { WebsiteService } from 'src/app/shared/services/website.service';

@Component({
  selector: 'app-sidebar-text-alignment',
  templateUrl: './builder-sidebar-text-alignment.component.html'
})

export class BuilderSidebarTextAlignmentComponent implements OnInit, OnDestroy {

  styleObject: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
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

    this.elementSubscription = this.data.componentService[this.data.elementName].subscribe(response => {
      if (response) {
        this.styleObject = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setAlignment(alignment: string) {
    this.styleObject['text-align'] = alignment;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetAlignment() {
    this.styleObject['text-align'] = this.defaultStyle[this.data.elementName]['text-align'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.styleObject);
    this.builderComponentsService[this.data.elementName].next(this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy() {
    this.elementSubscription.unsubscribe();
    this.templateSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.defaultStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
