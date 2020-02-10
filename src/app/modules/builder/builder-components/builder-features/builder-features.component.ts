import { Component, HostListener, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { BuilderService } from '../../builder.service';
import { ActiveComponents, ActiveFeaturesThemes, ActiveSettings, ActiveTemplates } from '../../builder';
import { Subscription } from 'rxjs';
import { IComponent } from '../../../../shared/models/component';
import { HttpClient } from '@angular/common/http';
import { UtilService } from 'src/app/shared/services/util.service';
import { BuilderFeaturesService } from './builder-features.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-builder-features',
  templateUrl: './builder-features.component.html'
})
export class BuilderFeaturesComponent implements OnInit, IComponent, OnDestroy {
  componentName: string = ActiveComponents.Features;
  componentId = `${ActiveComponents.Features}-${UtilService.generateRandomString(8)}`;
  activeEditComponent: string;
  activeEditComponentId: string;
  innerHeight: number;
  previewMode: boolean;
  componentActive = false;
  activeElement: string;
  containerClass: string;
  featuresContainerStyle: any;
  featuresItemArray: any = [
    {
      'header': 'Seamless',
      'subheader': 'Building a website has never been easier than this!  Get started today, free of cost.'
    },
    {
      'header': 'Beautiful',
      'subheader': 'Leverage our amazing library of templates and themes! Minimalism has never looked so good.'
    },
    {
      'header': 'Growth',
      'subheader': 'Grow with ease and whilst recieving useful anayltics! It\' just what you need to grow!'
    }
  ];
  featuresHeaderStyle: any;
  featuresSubheaderStyle: any;
  featuresStyle: any = { 'width': '33.3%' };
  orientation: any;
  activeThemeName: string = ActiveFeaturesThemes.Default;

  private breakpointSubscription: Subscription;
  private featuresHeaderStyleSubscription: Subscription;
  private featuresSubheaderStyleSubscription: Subscription;
  private featuresStyleSubscription: Subscription;
  private activeThemeNameSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private containerClassSubscription: Subscription;
  private containerStyleSubscription: Subscription;
  private featuresItemArraySubscription: Subscription;
  private featuresTemplateSubscription: Subscription;
  private featuresThemeSubscription: Subscription;

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private FEATURES_THEME_PATH = './assets/data/web-themes/features.json';

  constructor(
    private httpClient: HttpClient,
    private builderService: BuilderService,
    private builderFeaturesService: BuilderFeaturesService
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

    this.featuresThemeSubscription = this.builderFeaturesService.featuresTheme.subscribe(response => {
      if (!response) {
        this.setFeaturesThemeStyle(this.builderFeaturesService.featuresTemplate.getValue());
        this.builderFeaturesService.featuresTemplate.next(ActiveTemplates.Default);
      } else if (response && this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.setFeaturesTheme(response);
      }
    });

    this.featuresTemplateSubscription = this.builderFeaturesService.featuresTemplate.subscribe(response => {
      if (response) {
        this.setFeaturesTemplate(response);
      }
    });

    this.featuresHeaderStyleSubscription = this.builderFeaturesService.featuresHeaderStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.featuresHeaderStyle = response;
      }
    });

    this.featuresSubheaderStyleSubscription = this.builderFeaturesService.featuresSubheaderStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.featuresSubheaderStyle = response;
      }
    });

    this.featuresStyleSubscription = this.builderFeaturesService.featuresStyle.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.featuresStyle = response;
      }
    });

    this.containerClassSubscription = this.builderFeaturesService.featuresContainerClass.subscribe(response => {
      if (response) {
        this.containerClass = response;
      }
    });

    this.containerStyleSubscription = this.builderFeaturesService.featuresContainerStyle.subscribe(response => {
      if (response) {
        this.featuresContainerStyle = response;
      }
    });

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.featuresItemArraySubscription = this.builderFeaturesService.featuresItemArray.subscribe(response => {
      if (this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.featuresItemArray = response;
      }
    });

    this.breakpointSubscription = this.builderFeaturesService.breakpoint.subscribe(response => {
      if (response) {
        this.updateFeatureWidth();
      }
    });

    this.builderService.toolbarMobileOrientationButton.subscribe(response => {
      if (response == this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.updateFeatureWidth('mobile');
      }
    });

    this.builderService.toolbarDesktopOrientationButton.subscribe(response => {
      if (response == this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.updateFeatureWidth('desktop');
      }
    });

    this.builderService.toolbarTabletOrientationButton.subscribe(response => {
      if (response == this.builderService.TOOLBAR_ACTIVE_BUTTON) {
        this.updateFeatureWidth('tablet');
      }
    });

    this.activeThemeNameSubscription = this.builderFeaturesService.featuresTheme.subscribe(response => {
      if (response && this.componentId == this.builderService.activeEditComponentId.getValue()) {
        this.activeThemeName = response;
      }
    });

  }

  updateFeatureWidth(orientaiton: string = null) {
    this.builderFeaturesService.adjustFeatureCount(Object.keys(this.featuresItemArray).length, orientaiton);
  }

  updateService() {
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
    this.builderFeaturesService.featuresItemArray.next(this.featuresItemArray);
  }

  setFeaturesTemplate(templateId: string) {
    switch (templateId) {
      case ActiveTemplates.Default:
        this.httpClient.get(this.DEFAULT_TEMPLATE_PATH).subscribe(response => {
          this.setFeaturesThemeStyle(response);
        });
        break;
      case ActiveTemplates.Quick:
        this.httpClient.get(this.QUICK_TEMPLATE_PATH).subscribe(response => {
          this.setFeaturesThemeStyle(response);
        });
        break;
      case ActiveTemplates.Front:
        this.httpClient.get(this.FRONT_TEMPLATE_PATH).subscribe(response => {
          this.setFeaturesThemeStyle(response);
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

  setFeaturesThemeStyle(theme: any) {
    if (theme) {

      if (theme['featuresHeaderStyle']) {
        const featureHeaderStyleTheme = theme['featuresHeaderStyle'];
        this.featuresHeaderStyle = { ...this.featuresHeaderStyle, ...featureHeaderStyleTheme };
      }

      if (theme['featuresSubheaderStyle']) {
        const featureSubheaderStyleTheme = theme['featuresSubheaderStyle'];
        this.featuresSubheaderStyle = { ...this.featuresSubheaderStyle, ...featureSubheaderStyleTheme };
      }

      if (theme['featuresStyle']) {
        const featureStyleTheme = theme['featuresStyle'];
        this.featuresStyle = { ...this.featuresStyle, ...featureStyleTheme };
      }

      this.builderFeaturesService['featuresHeaderStyle'].next(this.featuresHeaderStyle);
      this.builderFeaturesService['featuresSubheaderStyle'].next(this.featuresSubheaderStyle);
      this.builderFeaturesService['featuresStyle'].next(this.featuresStyle);
    }
  }

  setFeaturesTheme(themeId: string) {
    let response: any;
    switch (themeId) {
      case ActiveFeaturesThemes.Default:
        this.setFeaturesThemeStyle(this.builderFeaturesService.featuresTemplate.getValue());
        break;
      case ActiveFeaturesThemes.Stanley:
        this.httpClient.get(this.FEATURES_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveFeaturesThemes.Stanley;
          });
          this.setFeaturesThemeStyle(response[0]);
        });
        break;
      default:
        break;
    }
  }

  setFeaturesTemplateStyle(template: any) {
    this.featuresHeaderStyle = Object.assign(template['featuresHeaderStyle']);
    this.featuresSubheaderStyle = Object.assign(template['featuresSubheaderStyle']);
    this.featuresStyle = Object.assign(template['featuresStyle']);
    this.builderFeaturesService.featuresHeaderStyle.next(this.featuresHeaderStyle);
    this.builderFeaturesService.featuresSubheaderStyle.next(this.featuresSubheaderStyle);
    this.builderFeaturesService.featuresStyle.next(this.featuresStyle);
  }

  setFeatureTextClass() {
    if (this.previewMode) {
      return 'feature-text-preview';
    }
    if (!this.previewMode) {
      return 'feature-text-active';
    }
  }

  selectFeatureText(event: any, elementId: string, scrollTo: string) {
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
    this.featuresHeaderStyleSubscription.unsubscribe();
    this.featuresSubheaderStyleSubscription.unsubscribe();
    this.featuresStyleSubscription.unsubscribe();
    this.featuresTemplateSubscription.unsubscribe();
    this.featuresThemeSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.activeEditComponentSubscription.unsubscribe();
    this.containerClassSubscription.unsubscribe();
    this.containerStyleSubscription.unsubscribe();
    this.featuresItemArraySubscription.unsubscribe();
    this.activeThemeNameSubscription.unsubscribe();
  }
}
