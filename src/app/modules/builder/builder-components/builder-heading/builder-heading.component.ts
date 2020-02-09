import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents,  ActiveSettings, ActiveTemplates } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/shared/services/util.service';
import { BuilderHeadingService } from './builder-heading.service';

@Component({
  selector: 'app-builder-heading',
  templateUrl: './builder-heading.component.html'
})
export class BuilderHeadingComponent implements OnInit, IComponent, OnDestroy {
  componentName: string = ActiveComponents.Heading;
  componentId = `${ActiveComponents.Heading}-${UtilService.generateRandomString(8)}`;
  activeEditComponent: string;
  activeEditComponentId: string;
  innerHeight: number;
  previewMode: boolean;
  componentActive = false;
  activeElement: string;
  headingHeaderStyle: any;
  headingSubheaderStyle: any;
  headingButtonStyle: any;
  headingSubheaderCondition: boolean = true;
  headingButtonCondition: boolean = true;
  headingStyle: any;

  private breakpointSubscription: Subscription;
  private headingHeaderStyleSubscription: Subscription;
  private headingSubheaderStyleSubscription: Subscription;
  private headingButtonStyleSubsciption: Subscription;
  private headingSubheaderConditionSubscription: Subscription;
  private headingButtonConditionSubsciption: Subscription;
  private headingStyleSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private headingThemeSubscription: Subscription;

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private HEADING_THEME_PATH = './assets/data/web-themes/heading.json';

  constructor(
    private httpClient: HttpClient,
    private builderService: BuilderService,
    private builderHeadingService: BuilderHeadingService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      this.activeEditComponentId = response;
      this.componentActive = response == this.componentId;
      if (this.componentActive) {
        this.updateService();
      }
    });

    this.headingThemeSubscription = this.builderHeadingService.headingTheme.subscribe(response => {
      if (!response) {
        this.setHeadingThemeStyle(this.builderHeadingService.headingTemplate.getValue());
        this.builderHeadingService.headingTemplate.next(ActiveTemplates.Default);
      }
    });

    this.headingTemplateSubscription = this.builderHeadingService.headingTemplate.subscribe(response => {
      if (response) {
        this.setHeadingTemplate(response);
      }
    });

    this.headingHeaderStyleSubscription = this.builderHeadingService.headingHeaderStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingHeaderStyle = response;
      }
    });

    this.headingSubheaderStyleSubscription = this.builderHeadingService.headingSubheaderStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingSubheaderStyle = response;
      }
    });

    this.headingStyleSubscription = this.builderHeadingService.headingStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingStyle = response;
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });
  }

  updateService() {
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setHeadingTemplate(templateId: string) {
    switch (templateId) {
      case ActiveTemplates.Default:
        this.httpClient.get(this.DEFAULT_TEMPLATE_PATH).subscribe(response => {
          this.setHeadingThemeStyle(response);
        });
        break;
      case ActiveTemplates.Quick:
        this.httpClient.get(this.QUICK_TEMPLATE_PATH).subscribe(response => {
          this.setHeadingThemeStyle(response);
        });
        break;
      case ActiveTemplates.Front:
        this.httpClient.get(this.FRONT_TEMPLATE_PATH).subscribe(response => {
          this.setHeadingThemeStyle(response);
        });
        break;
      default:
        break;
    }
  }

  setActiveEditComponent() {
    if (this.activeEditComponentId === this.componentId) {
      this.clearActiveEditComponent();
    } else {
      window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-selected', 'message': this.componentId }, '*');
      this.builderService.setActiveEditComponent(this.componentName, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName, this.componentActive);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName, this.componentActive);
  }

  clearActiveEditComponent() {
    window.postMessage({ 'for': 'opsonion', 'action': 'duplicate-component-deselected', 'message': this.componentId }, '*');
    this.componentActive = false;
    this.builderService.activeEditComponentId.next(null);
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }

  setHeadingThemeStyle(theme: any) {
    if (theme) {

      if (theme['headingHeaderStyle']) {
        const headingHeaderStyleTheme = theme['headingHeaderStyle'];
        this.headingHeaderStyle = { ...this.headingHeaderStyle, ...headingHeaderStyleTheme };
      }

      if (theme['headingSubheaderStyle']) {
        const headingSubheaderStyleTheme = theme['headingSubheaderStyle'];
        this.headingSubheaderStyle = { ...this.headingSubheaderStyle, ...headingSubheaderStyleTheme };
      }

      if (theme['headingStyle']) {
        const headingStyleTheme = theme['headingStyle'];
        this.headingStyle = { ...this.headingStyle, ...headingStyleTheme };
      }

      this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
      this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
      this.builderHeadingService.headingStyle.next(this.headingStyle);
    }
  }

  setHeadingTemplateStyle(template: any) {
    this.headingHeaderStyle = Object.assign(template['headingHeaderStyle']);
    this.headingSubheaderStyle = Object.assign(template['headingSubheaderStyle']);
    this.headingStyle = Object.assign(template['headingStyle']);
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setHeadingTextClass() {
    if (this.previewMode) {
      return 'heading-text-preview';
    }
    if (!this.previewMode) {
      return 'heading-text-active';
    }
  }

  selectHeadingText(event: any, elementId: string, scrollTo: string) {
    this.builderService.selectElement(
      this.componentName,
      this.componentId,
      elementId,
      ActiveSettings.Options,
      scrollTo
    );
    event.stopPropagation();
  }

  setContentEditable() {
    return !this.previewMode;
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for == 'opsonion') {
      if (e.data.action == 'unique-component-selected' || e.data.action == 'duplicate-component-deselected') {
        this.componentActive = false;
      }
      if (e.data.action == 'duplicate-component-selected') {
        this.componentActive = e.data.message == this.componentId;
      }
    }
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
    this.headingHeaderStyleSubscription.unsubscribe();
    this.headingSubheaderStyleSubscription.unsubscribe();
    this.headingStyleSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    this.headingThemeSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
  }
}