import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { ActiveTemplates } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';
import { UtilService } from '../../../../../shared/services/util.service';

@Component({
  selector: 'app-sidebar-text-alignment',
  styleUrls: ['builder-sidebar-text-alignment.component.css'],
  templateUrl: './builder-sidebar-text-alignment.component.html'
})

export class BuilderSidebarTextAlignmentComponent implements OnInit, OnDestroy {

  styleObject: any;
  buttonProperties: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  ngUnsubscribe = new Subject<void>();
  childKeyProvided: boolean;

  @Input() data: any;
  @Input() elementSettings: any;

  constructor(
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.setupButtons();

    this.elementSettings.childKey ? this.childKeyProvided = true : this.childKeyProvided = false;

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

  setupButtons(){
    this.buttonProperties = {
      left: {visible: true, value: 'left'},
      center: {visible: true, value: 'center'},
      right: {visible: true, value: 'right'},
      justify: {visible: true, value: 'justify'},
    };
    if (this.elementSettings.buttonProperties){
      for (const prop in this.buttonProperties) {
        if (this.buttonProperties.hasOwnProperty(prop)){
          this.buttonProperties[prop] = {...this.buttonProperties[prop], ...this.elementSettings.buttonProperties[prop]};
        }
      }
    }
  }

  setAlignment(alignment: string) {
    if (this.childKeyProvided) {
      this.styleObject[this.elementSettings.childKey] = alignment;
    } else {
      this.styleObject = alignment;
    }
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetAlignment() {
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    if (this.childKeyProvided) {
      this.styleObject[this.elementSettings.childKey] = defaultTemplate['style'][this.elementSettings.name]['text-align'];
    } else {
      this.styleObject = defaultTemplate['style'][this.elementSettings.name]['text-align'];
    }
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.elementSettings.name, this.styleObject);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
