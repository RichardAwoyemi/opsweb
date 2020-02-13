import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveSettings, ActiveTemplates, ActiveHeadingThemes } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/shared/services/util.service';
import { BuilderHeadingService } from './builder-heading.service';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-builder-heading',
  templateUrl: './builder-heading.component.html',
  styleUrls: ['./builder-heading.component.css']
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
  headingContainerClass: string = 'text-center';
  headingBackgroundImageAlt: string;
  headingBackgroundImg: any = {};
  headingBackgroundStyle: any = {};
  headingBackgroundColor: any;
  activeThemeName: string = ActiveHeadingThemes.Default;

  private headingHeaderStyleSubscription: Subscription;
  private headingSubheaderStyleSubscription: Subscription;
  private headingButtonStyleSubscription: Subscription;
  private headingSubheaderConditionSubscription: Subscription;
  private headingButtonConditionSubscription: Subscription;
  private headingStyleSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private headingTemplateSubscription: Subscription;
  private headingThemeSubscription: Subscription;
  private headingContainerClassSubscription: Subscription;
  private headingBackgroundImageAltSubscription: Subscription;
  private headingBackgroundImageUrlSubscription: Subscription;
  private headingBackgroundColorSubscription: Subscription;
  private headingBackgroundStyleSubscription: Subscription;
  private activeThemeNameSubscription: Subscription;

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
      } else if (response && this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.setHeadingTheme(response);
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

    this.headingButtonStyleSubscription = this.builderHeadingService.headingButtonStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingButtonStyle = response;
      }
    });

    this.headingSubheaderConditionSubscription = this.builderHeadingService.headingSubheaderCondition.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingSubheaderCondition = response;
      }
    });

    this.headingButtonConditionSubscription = this.builderHeadingService.headingButtonCondition.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingButtonCondition = response;
      }
    });

    this.headingContainerClassSubscription = this.builderHeadingService.headingContainerClass.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingContainerClass = response;
      }
    });

    this.headingBackgroundImageUrlSubscription = this.builderHeadingService.headingBackgroundImageUrl.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        if (response) {
          this.headingBackgroundImg['background-image'] = "url(" + response + ")";
          this.builderHeadingService.resetBackgroundOpacity();
        } else {
          this.headingBackgroundImg['background-image'] = null;
        }
        this.updateBackgroundStyle();
      }
    });

    this.headingBackgroundStyleSubscription = this.builderHeadingService.headingBackgroundStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingBackgroundStyle = response;
      }
    });

    this.headingBackgroundImageAltSubscription = this.builderHeadingService.headingBackgroundImageAlt.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.headingBackgroundImageAlt = response;
      }
    });

    this.headingBackgroundColorSubscription = this.builderHeadingService.headingBackgroundColor.subscribe(response => {
      if (response) {
        this.headingBackgroundColor = response;
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.activeThemeNameSubscription = this.builderHeadingService.headingTheme.subscribe(response => {
      if (response && this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.activeThemeName = response;
      }
    });

  }

  updateService() {
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
    this.builderHeadingService.headingButtonStyle.next(this.headingButtonStyle);
    this.builderHeadingService.headingStyle.next(this.headingStyle);
    this.builderHeadingService.headingBackgroundStyle.next(this.headingBackgroundStyle);
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

  updateBackgroundStyle() {
    this.headingBackgroundStyle = { ...this.headingBackgroundStyle, ...this.headingBackgroundImg };
    this.builderHeadingService.headingBackgroundStyle.next(this.headingBackgroundStyle);
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

      if (theme['headingButtonStyle']) {
        const headingButtonStyleTheme = theme['headingButtonStyle'];
        this.headingButtonStyle = { ...this.headingButtonStyle, ...headingButtonStyleTheme };
      }

      if (theme['headingStyle']) {
        const headingStyleTheme = theme['headingStyle'];
        this.headingStyle = { ...this.headingStyle, ...headingStyleTheme };
      }

      if (theme['headingBackgroundStyle']) {
        const headingBackgroundStyle = theme['headingBackgroundStyle'];
        this.headingBackgroundStyle = { ...this.headingBackgroundStyle, ...headingBackgroundStyle };
      }

      this.builderHeadingService['headingHeaderStyle'].next(this.headingHeaderStyle);
      this.builderHeadingService['headingSubheaderStyle'].next(this.headingSubheaderStyle);
      this.builderHeadingService['headingButtonStyle'].next(this.headingButtonStyle);
      this.builderHeadingService['headingStyle'].next(this.headingStyle);
      this.builderHeadingService['headingBackgroundStyle'].next(this.headingBackgroundImg);
    }
  }

  setHeadingTheme(themeId: string) {
    let response: any;
    switch (themeId) {
      case ActiveHeadingThemes.Default:
        this.setHeadingThemeStyle(this.builderHeadingService.headingTemplate.getValue());
        break;
      case ActiveHeadingThemes.Stanley:
        this.httpClient.get(this.HEADING_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveHeadingThemes.Stanley;
          });
          this.setHeadingThemeStyle(response[0]);
        });
        break;
      default:
        break;
    }
  }

  setHeadingTemplateStyle(template: any) {
    this.headingHeaderStyle = Object.assign(template['headingHeaderStyle']);
    this.headingSubheaderStyle = Object.assign(template['headingSubheaderStyle']);
    this.headingStyle = Object.assign(template['headingStyle']);
    this.builderHeadingService.headingHeaderStyle.next(this.headingHeaderStyle);
    this.builderHeadingService.headingSubheaderStyle.next(this.headingSubheaderStyle);
    this.builderHeadingService.headingButtonStyle.next(this.headingButtonStyle);
    this.builderHeadingService.headingStyle.next(this.headingStyle);
  }

  setHeadingTextClass(classPrefix: string) {
    if (this.previewMode) {
      return classPrefix + ' heading-text-preview';
    }
    if (!this.previewMode) {
      return classPrefix + ' heading-text-active';
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
    this.headingHeaderStyleSubscription.unsubscribe();
    this.headingSubheaderStyleSubscription.unsubscribe();
    this.headingStyleSubscription.unsubscribe();
    this.headingTemplateSubscription.unsubscribe();
    this.headingThemeSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
    this.headingButtonStyleSubscription.unsubscribe();
    this.headingSubheaderConditionSubscription.unsubscribe();
    this.headingButtonConditionSubscription.unsubscribe();
    this.headingContainerClassSubscription.unsubscribe();
    this.headingBackgroundImageAltSubscription.unsubscribe();
    this.headingBackgroundImageUrlSubscription.unsubscribe();
    this.headingBackgroundColorSubscription.unsubscribe();
    this.headingBackgroundStyleSubscription.unsubscribe();
    this.activeThemeNameSubscription.unsubscribe();
  }
}
