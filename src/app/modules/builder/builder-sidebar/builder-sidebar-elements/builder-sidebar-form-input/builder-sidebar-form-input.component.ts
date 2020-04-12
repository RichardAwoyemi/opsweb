import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-form-input',
  styleUrls: ['./builder-sidebar-form-input.component.css'],
  templateUrl: './builder-sidebar-form-input.component.html'
})

export class BuilderSidebarFormInputComponent implements OnInit, OnDestroy {
  currentInputs: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();
  fieldArray: any;

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
        const component = pageComponent['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
        if (!this.fieldArray) {
          this.fieldArray = [];
          this.elementSettings.fieldSettings.forEach(field => {
            let parentElement = '';
            (component['style'].hasOwnProperty(field.name)) ? parentElement = component['style'][field.name] : parentElement = component[field.name];
            let currentValue: any;
            (!!field.childKey) ? currentValue = parentElement[field.childKey] : currentValue = parentElement;
            this.fieldArray.push(currentValue || '');
          });
        }
      }
    });

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe)).subscribe(activeEditComponentIdResponse => {
      if (activeEditComponentIdResponse) {
        this.activeEditComponentId = activeEditComponentIdResponse;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onInputChange(field, i) {
    if (field.childKey) { this.builderComponentsService.setPageComponentByIdAndKey(this.activeEditComponentId, field.name, field.childKey, this.fieldArray[i]); }
    if (!field.childKey) { this.builderComponentsService.setPageComponentById(this.activeEditComponentId, field.name, this.fieldArray[i]); }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
