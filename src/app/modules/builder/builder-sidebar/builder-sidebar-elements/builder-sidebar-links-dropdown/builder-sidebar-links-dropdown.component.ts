import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { element } from 'protractor';

@Component({
  selector: 'app-sidebar-links-dropdown',
  templateUrl: './builder-sidebar-links-dropdown.component.html'
})

export class BuilderSidebarLinksDropdownComponent implements OnInit, OnDestroy {

  menuOption: any;
  menuOptions: any;
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
          this.menuOption = component[this.elementSettings.name];
        } else {
          this.menuOption = component['style'][this.elementSettings.name];
        }
        this.menuOptions = this.builderComponentsService.getPages();
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  resetDropdownLink() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    if (this.elementSettings.name in defaultTemplate['details']) {
      this.menuOption = defaultTemplate['details'][this.elementSettings.name];
    } else {
      this.menuOption = defaultTemplate['style'][this.elementSettings.name];
    }
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.menuOption);
  }

  setDropdownLink() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.menuOption);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
