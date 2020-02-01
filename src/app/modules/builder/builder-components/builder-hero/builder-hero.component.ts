import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderHeroService } from './builder-hero.service';
import { ActiveComponents, ActiveElements, ActiveHeroThemes, ActiveSettings, ActiveTemplates } from '../../builder';
import { IComponent } from '../../../../shared/models/component';

@Component({
  selector: 'app-builder-hero',
  templateUrl: './builder-hero.component.html'
})
export class BuilderHeroComponent implements OnInit, IComponent {
  innerHeight: number;
  heroHeadingStyle: any;
  heroImageUrl: string;
  heroImageAlt: string;
  heroSubheadingStyle: any;
  heroBackgroundStyle: any;
  heroButtonStyle: any;
  activeEditComponent: string;
  previewMode: boolean = false;
  componentName: string = ActiveComponents.Hero;
  heroHeadingText: string;
  heroButtonText: string;
  heroSubheadingText: string;
  heroComponentLayout: any;
  heroImageContainerClass: string;
  heroTextContainerClass: string;
  heroImageSize: number = 100;
  activeElement: string;

  private heroTemplateSubscription: Subscription;
  private heroImageSizeSubscription: Subscription;
  private activeEditTaskComponentSubscription: Subscription;
  private heroButtonStyleSubscription: Subscription;
  private heroHeadingStyleSubscription: Subscription;
  private heroSubheadingStyleSubscription: Subscription;
  private heroImageUrlSubscription: Subscription;
  private heroImageAltSubscription: Subscription;
  private heroBackgroundStyleSubscription: Subscription;
  private heroThemeSubscription: Subscription;
  private previewModeSubscription: Subscription;
  private heroHeadingTextSubscription: Subscription;
  private heroButtonTextSubscription: Subscription;
  private heroSubheadingTextSubscription: Subscription;
  private heroComponentLayoutSubscription: Subscription;
  private heroImageContainerClassSubscription: Subscription;
  private heroTextContainerClassSubscription: Subscription;
  private activeElementSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderHeroService: BuilderHeroService
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.activeEditTaskComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.activeElementSubscription = this.builderService.activeElement.subscribe(response => {
      if (response) {
        this.activeElement = response;
      }
    });

    this.previewModeSubscription = this.builderService.previewMode.subscribe(response => {
      this.previewMode = response;
    });


    this.heroImageSizeSubscription = this.builderHeroService.heroImageSize.subscribe(response => {
      if (response) {
        this.heroImageSize = response;
      }
    });

    this.heroHeadingStyleSubscription = this.builderHeroService.heroHeadingStyle.subscribe(response => {
      if (response) {
        this.heroHeadingStyle = response;
      }
    });

    this.heroButtonStyleSubscription = this.builderHeroService.heroButtonStyle.subscribe(response => {
      if (response) {
        this.heroButtonStyle = response;
      }
    });

    this.heroSubheadingStyleSubscription = this.builderHeroService.heroSubheadingStyle.subscribe(response => {
      if (response) {
        this.heroSubheadingStyle = response;
      }
    });

    this.heroBackgroundStyleSubscription = this.builderHeroService.heroBackgroundStyle.subscribe(response => {
      if (response) {
        this.heroBackgroundStyle = response;
      }
    });

    this.heroTemplateSubscription = this.builderHeroService.heroTemplate.subscribe(response => {
      if (!response) {
        this.builderHeroService.heroTemplate.next(ActiveHeroThemes.Default);
        this.builderHeroService.setHeroTemplate(ActiveTemplates.Default);
      }
    });

    this.heroThemeSubscription = this.builderHeroService.heroTheme.subscribe(response => {
      if (!response) {
        this.builderHeroService.heroTheme.next(ActiveHeroThemes.Default);
      }
    });

    this.heroImageUrlSubscription = this.builderHeroService.heroImageUrl.subscribe(response => {
      if (response) {
        this.heroImageUrl = response;
      }
    });

    this.heroImageAltSubscription = this.builderHeroService.heroImageAlt.subscribe(response => {
      if (response) {
        this.heroImageAlt = response;
      }
    });

    this.heroHeadingTextSubscription = this.builderHeroService.heroHeadingText.subscribe(response => {
      if (response) {
        this.heroHeadingText = response;
      }
    });

    this.heroSubheadingTextSubscription = this.builderHeroService.heroSubheadingText.subscribe(response => {
      if (response) {
        this.heroSubheadingText = response;
      }
    });

    this.heroButtonTextSubscription = this.builderHeroService.heroButtonText.subscribe(response => {
      if (response) {
        this.heroButtonText = response;
      }
    });

    this.heroComponentLayoutSubscription = this.builderHeroService.heroComponentLayout.subscribe(response => {
      this.heroComponentLayout = response;
    });

    this.heroImageContainerClassSubscription = this.builderHeroService.heroImageContainerClass.subscribe(response => {
      this.heroImageContainerClass = response;
    });

    this.heroTextContainerClassSubscription = this.builderHeroService.heroTextContainerClass.subscribe(response => {
      this.heroTextContainerClass = response;
    });
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    if (this.activeEditComponent == ActiveComponents.Hero) {
      this.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Hero);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
    }
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  clearActiveEditComponent() {
    this.builderService.activeEditComponent.next(ActiveComponents.Placeholder);
    this.builderService.setSidebarComponentsSetting();
  }

  setHeroTextContainerClass() {
    if (this.heroComponentLayout['layout'] === 0) {
      this.builderHeroService.heroTextContainerClass.next('col-12 col-md-7 col-lg-6 order-md-1 pr-md-5');
      return this.heroTextContainerClass;
    }
    if (this.heroComponentLayout['layout'] === 1) {
      this.builderHeroService.heroTextContainerClass.next('col-12 col-md-7 col-lg-6 order-md-2 pr-md-5');
      return this.heroTextContainerClass;
    }
  }

  setHeroImageContainerClass() {
    if (this.heroComponentLayout['layout'] === 0) {
      this.builderHeroService.heroImageContainerClass.next('col-12 col-md-5 col-lg-6 order-md-2');
      return this.heroImageContainerClass;
    }
    if (this.heroComponentLayout['layout'] === 1) {
      this.builderHeroService.heroImageContainerClass.next('col-12 col-md-5 col-lg-6 order-md-1');
      return this.heroImageContainerClass;
    }
  }

  setHeroImageStyle() {
    return { 'width': this.heroImageSize + '%' };
  }

  setActiveElementStyle(activeElement, element) {
    if (activeElement == element && !this.previewMode) {
      if (element.indexOf(element) > -1) {
        return element + '-edit';
      }
    }
  }

  selectHeroImage(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-options');
    event.stopPropagation();
  }

  setHeroClass(element) {
    if (this.previewMode) {
      return element + '-preview';
    }
    if (!this.previewMode) {
      return element + '-active';
    }
  }

  selectHeroHeading(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-heading-options');
    event.stopPropagation();
  }

  selectHeroSubheading(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-subheading-options');
    event.stopPropagation();
  }

  selectHeroButton(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-button-options');
    event.stopPropagation();
  }

  setContentEditable() {
    return !this.previewMode;
  }

  removeLineBreaks(event: any) {
    BuilderService.removeLineBreaks(event);
  }

  saveHeroHeadingTextOption() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderHeroService.heroHeadingText.next(this.heroHeadingText);
  }

  saveHeroSubheadingTextOption() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderHeroService.heroSubheadingText.next(this.heroSubheadingText);
  }

  saveHeroButtonTextOption() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderHeroService.heroButtonText.next(this.heroButtonText);
  }

  ngOnDestroy() {
    this.activeEditTaskComponentSubscription.unsubscribe();
    this.heroBackgroundStyleSubscription.unsubscribe();
    this.heroButtonStyleSubscription.unsubscribe();
    this.heroHeadingStyleSubscription.unsubscribe();
    this.heroSubheadingStyleSubscription.unsubscribe();
    this.heroImageUrlSubscription.unsubscribe();
    this.heroImageAltSubscription.unsubscribe();
    this.heroHeadingTextSubscription.unsubscribe();
    this.heroThemeSubscription.unsubscribe();
    this.heroTemplateSubscription.unsubscribe();
    this.heroButtonTextSubscription.unsubscribe();
    this.heroSubheadingTextSubscription.unsubscribe();
    this.previewModeSubscription.unsubscribe();
    this.heroComponentLayoutSubscription.unsubscribe();
    this.heroImageContainerClassSubscription.unsubscribe();
    this.activeElementSubscription.unsubscribe();
  }
}
