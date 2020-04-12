import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { SortablejsOptions } from 'ngx-sortablejs';

@Component({
  selector: 'app-sidebar-sort-pages',
  templateUrl: './builder-sidebar-sort-pages.component.html'
})

export class BuilderSidebarSortPagesComponent implements OnInit, OnDestroy {

  menuOptions: any;
  buttonProperties: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  childKeyProvided: boolean;
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();
  options: SortablejsOptions;

  @Input() data: any;
  @Input() elementSettings: any;

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
  ) {
    this.options = {
      onUpdate: function (e: any) {
        builderComponentsService.reorderPages(e.target.innerText.split('\n'));
      }
    };
  }

  ngOnInit() {

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response && this.data.componentIndex) {
        this.menuOptions = this.builderComponentsService.getPages();
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
