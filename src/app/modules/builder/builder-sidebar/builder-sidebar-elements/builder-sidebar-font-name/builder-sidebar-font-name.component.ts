import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

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
  fontNames: any;

  ngUnsubscribe = new Subject<void>();

  @Input() data: any;

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

    this.builderService.fontNames.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.data.componentService[this.data.elementName].pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.styleObject = response;
        const splitFontName = this.styleObject['font-family'].split(',');
        this.styleObjectFontName = splitFontName[0].replace(/'/g, '');
      }
    });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe(templateResponse => {
      if (templateResponse) {
        this.currentTemplate = templateResponse['template'];
        this.data.componentService[this.data.defaultStyleFunctionName](this.currentTemplate).pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
          if (response) {
            this.defaultStyle = response;
          }
        });
      } else {
        this.data.componentService[this.data.defaultStyleFunctionName](ActiveTemplates.Default).pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
          if (response) {
            this.defaultStyle = response;
          }
        });
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
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

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
