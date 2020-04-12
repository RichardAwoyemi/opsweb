import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { UtilService } from '../../../../../shared/services/util.service';

@Component({
  selector: 'app-sidebar-padding',
  templateUrl: './builder-sidebar-padding.component.html'
})

export class BuilderSidebarPaddingComponent implements OnInit, OnDestroy {

  condition = true;
  styleObject: any;
  currentTemplate: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  paddingTop: number;
  paddingLeft: number;
  paddingRight: number;
  paddingBottom: number;
  ngUnsubscribe = new Subject<void>();
  padArray = ['paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom'];

  @Input() data: any;
  @Input() elementSettings: any;

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private builderService: BuilderService,
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
          this.styleObject = component[this.elementSettings.name];
        } else {
          this.styleObject = component['style'][this.elementSettings.name];
        }

        if (this.elementSettings.condition) {
          for (let i = 0; i < this.elementSettings.condition.length; i++) {
            const criteria = this.elementSettings.condition[i];
            if (this.condition || this.elementSettings.any) {
              this.condition = (!!UtilService.getDeepProp(component, criteria.property) === criteria.exists);
              if (this.condition && this.elementSettings.any) { break; }
            }
          }
        }

        if (this.styleObject) {
          this.padArray.forEach(pad => {
            this[pad] = this.styleObject[UtilService.camelCaseToSelector(pad)].replace('px', '');
          });
        }

      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  setPadding(position: string, value: number) {
    this.styleObject[`padding-${position}`] = `${value}px`;
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetPaddingStyle() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];

    for (const pad of this.padArray) {
      const selectorIndex = UtilService.camelCaseToSelector(pad);
      this.styleObject[selectorIndex] = defaultTemplate['style'][this.elementSettings.name][selectorIndex];
      this[pad] = this.styleObject[selectorIndex].replace('px', '');
    }
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
