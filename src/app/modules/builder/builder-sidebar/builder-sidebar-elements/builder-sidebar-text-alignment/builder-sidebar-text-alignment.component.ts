import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

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
        const pageComponents = response;
        const component = pageComponents['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
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

  setAlignment(alignment: string) {
    this.styleObject['text-align'] = alignment;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.data.componentService[this.data.elementName].next(this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetAlignment() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    this.styleObject['text-align'] = defaultTemplate['style'][this.elementSettings.name]['text-align'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.builderComponentsService[this.data.elementName].next(this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
