import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WebsiteService } from 'src/app/shared/services/website.service';
import { ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderService } from '../../../builder.service';

@Component({
  selector: 'app-sidebar-theme-change',
  templateUrl: './builder-sidebar-theme-change.component.html'
})

export class BuilderSidebarThemeChangeComponent implements OnInit, OnDestroy {

  elementThemes: any;
  elementTheme: any;
  component: any;
  componentStyle: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  property = 'color';
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
        this.component = response['pages'][this.data.pageIndex]['components'][this.data.componentIndex];
        this.elementTheme = this.component[`${this.data.componentName}Theme`];
        this.componentStyle = this.component['style'];
      }
    });

    this.data.componentService[this.data.getThemesFunction]().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.elementThemes = response;
      }
    });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe)).subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onThemeChange() {
    if (this.elementTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      const chosenTheme = this.elementThemes.filter(theme => theme.name === this.elementTheme)[0];
      const newComponentStyle = this.componentStyle;

      for (let i = 0; i < this.elementSettings.elements.length; i++) {
        const chosenElement = this.elementSettings.elements[i];
        newComponentStyle[chosenElement.name] = {...newComponentStyle[chosenElement.name], ...chosenTheme[chosenElement.name]};
      }

      this.builderComponentsService.setPageComponentById(this.activeEditComponentId, `${this.data.componentName}Theme`, this.elementTheme);
      this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'style', newComponentStyle);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, `${this.data.componentName}Theme`, ActiveThemes.Default);
    const defaultTemplate = this.builderComponentsService.activeTemplate.getValue()[this.data.componentName];
    for (let i = 0; i < this.elementSettings.elements.length; i++) {
      const chosenElementDetails = this.elementSettings.elements[i];
      this.builderComponentsService.setPageComponentByIdAndKey(
        this.activeEditComponentId,
        chosenElementDetails.name,
        chosenElementDetails.colourProperty,
        defaultTemplate['style'][chosenElementDetails.name][chosenElementDetails.colourProperty]
      );
    }
  }

  setElementColour(componentStyleInstance: any, elementName: string) {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, elementName, componentStyleInstance);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
