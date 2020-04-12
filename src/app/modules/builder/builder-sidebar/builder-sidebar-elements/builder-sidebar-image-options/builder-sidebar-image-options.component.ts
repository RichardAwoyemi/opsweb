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

  component: any;
  styleObject: any;
  activeOption = null;
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

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response && this.data.componentIndex) {
        const pageComponent = response;
        this.component = pageComponent['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
      }
    });

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe)).subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
        this.getActiveOption();
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  getActiveOption() {
    for (let i = 0; i < this.elementSettings.optionSettings.length; i++) {
      if (this.activeOption !== null) { break; }
      for (let j = 0; j < this.elementSettings.optionSettings[i].update.length; j++) {
        const updateSettings = this.elementSettings.optionSettings[i].update[j];
        let parentElement = '';
        (this.component['style'].hasOwnProperty(updateSettings.name)) ? parentElement = this.component['style'][updateSettings.name] : parentElement = this.component[updateSettings.name];
        const currentValue = parentElement[updateSettings.childKey] || parentElement;
        if (currentValue !== updateSettings.value) { break; }
        if (((j + 1) === this.elementSettings.optionSettings[i].update.length)) {
          this.activeOption = i;
          break;
        }
      }
    }
  }

  setOptionValue(updateArray, index) {
    updateArray.forEach(obj => {
      if (obj.childKey) { this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, obj.name, obj.childKey, obj.value); }
      if (!obj.childKey) { this.builderComponentsService.setPageComponentById(this.activeEditComponentId, obj.name, obj.value); }
    });
    this.activeOption = index;
  }

  setComponentLayoutSelectorClass(index) {
    if (index === this.activeOption) {
      return 'layout-spacer-active';
    } else {
      return 'layout-spacer';
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
