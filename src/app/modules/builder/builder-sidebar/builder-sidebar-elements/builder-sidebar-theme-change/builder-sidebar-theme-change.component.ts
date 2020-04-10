import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { ActiveTemplates, ActiveThemes } from '../../../builder';
import { WebsiteService } from 'src/app/shared/services/website.service';

@Component({
  selector: 'app-sidebar-theme-change',
  templateUrl: './builder-sidebar-theme-change.component.html'
})

export class BuilderSidebarThemeChangeComponent implements OnInit, OnDestroy {

  elementThemes: any;
  elementTheme: any;
  styleObject: any;
  currentTemplate: any;
  defaultStyle: any;
  websiteChangeCount: number;
  activeEditComponentId: string;
  property = 'color';
  private elementSubscription: Subscription;
  private elementThemeSubscription: Subscription;
  private elementThemesSubscription: Subscription;
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

    if (this.data.isBackground) {
      this.property = 'background-' + this.property;
    }

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

    this.elementThemeSubscription = this.data.componentService[this.data.elementName].subscribe(response => {
      if (response) {
        this.elementTheme = response;
      } else {
        this.elementTheme = ActiveThemes.Default;
      }
    });

    this.elementThemesSubscription = this.data.componentService[this.data.getThemesFunction]().subscribe(response => {
      if (response) {
        this.elementThemes = response;
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

  onThemeChange() {
    if (this.elementTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, this.elementTheme);
      this.data.componentService[this.data.setThemeFunction](this.elementTheme, this.activeEditComponentId);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, this.data.elementName, ActiveThemes.Default);
    this.data.componentService[this.data.elementName].next(ActiveThemes.Default);

    for (var prop in this.data.components) {
      if (Object.prototype.hasOwnProperty.call(this.data.components, prop)) {
        const chosenComponentInfo = this.data.components[prop];
        const componentStyleInstance = this.data.componentService[chosenComponentInfo.elementName].getValue();
        componentStyleInstance[chosenComponentInfo.colourProperty] = this.defaultStyle[chosenComponentInfo.elementName][chosenComponentInfo.colourProperty];
        this.setElementColour(componentStyleInstance, chosenComponentInfo.elementName);
      }
    }
  }

  setElementColour(componentStyleInstance: any, elementName: string) {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, elementName, componentStyleInstance);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  ngOnDestroy() {
    this.elementSubscription.unsubscribe();
    this.elementThemeSubscription.unsubscribe();
    this.elementThemesSubscription.unsubscribe();
    this.templateSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.defaultStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
