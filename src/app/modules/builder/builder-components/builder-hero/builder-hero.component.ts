import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../builder.service';
import { BuilderHeroService } from './builder-hero.service';
import { ActiveComponents, ActiveElements, ActiveSettings, ActiveThemes } from '../../builder';
import { IComponent } from '../../../../shared/models/component';
import { BuilderComponentsService } from '../builder-components.service';

@Component({
  selector: 'app-builder-hero',
  templateUrl: './builder-hero.component.html'
})
export class BuilderHeroComponent implements OnInit, OnDestroy, IComponent {
  innerHeight: number;
  heroHeadingStyle: any;
  heroImageUrl: string;
  heroImageAlt: string;
  heroSubheadingStyle: any;
  heroBackgroundStyle: any;
  heroButtonStyle: any;
  activeEditComponent: string;
  activeEditComponentId: string;
  previewMode = false;
  componentName: string = ActiveComponents.Hero;
  componentId: string;
  heroHeadingText: string;
  heroButtonText: string;
  heroSubheadingText: string;
  heroComponentLayout: any;
  heroImageContainerClass: string;
  heroTextContainerClass: string;
  heroImageSize = 100;
  activeElement: string;
  componentDetail: any;
  activePageSetting: string;
  pageComponents: any;

  private heroTemplateSubscription: Subscription;
  private heroImageSizeSubscription: Subscription;
  private activeEditComponentSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;
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
  private activePageSettingSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderHeroService: BuilderHeroService,
    private builderComponentsService: BuilderComponentsService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.activeEditComponentSubscription = this.builderService.activeEditComponent.subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
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
        this.builderHeroService.heroTemplate.next(ActiveThemes.Default);
      }
    });

    this.heroThemeSubscription = this.builderHeroService.heroTheme.subscribe(response => {
      if (!response) {
        this.builderHeroService.heroTheme.next(ActiveThemes.Default);
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

    this.activePageSettingSubscription = this.builderService.activePageSetting.subscribe(activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePageSetting = activePageSettingResponse;
        this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
          if (response) {
            this.pageComponents = response;
            this.builderHeroService.heroTemplate.next(this.pageComponents['template']);
            if (this.elementRef.nativeElement['id']) {
              this.componentId = this.elementRef.nativeElement['id'];
              for (let i = 0; i < this.pageComponents['pages'].length; i++) {
                const pageName = this.pageComponents['pages'][i]['name'];
                if (pageName === this.activePageSetting) {
                  for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                    if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.componentId) {
                      this.componentDetail = this.pageComponents['pages'][i]['components'][j];
                      this.builderHeroService.heroBackgroundStyle.next(this.componentDetail['heroBackgroundStyle']);
                      this.builderHeroService.heroHeadingStyle.next(this.componentDetail['heroHeadingStyle']);
                      this.builderHeroService.heroSubheadingStyle.next(this.componentDetail['heroSubheadingStyle']);
                      this.builderHeroService.heroImageStyle.next(this.componentDetail['heroImageStyle']);
                      this.builderHeroService.heroButtonStyle.next(this.componentDetail['heroButtonStyle']);
                      this.builderHeroService.heroImageUrl.next(this.componentDetail['heroImageStyle']['src']);
                      this.builderHeroService.heroImageAlt.next(this.componentDetail['heroImageStyle']['alt']);
                      this.builderHeroService.heroComponentLayout.next(this.componentDetail['heroComponentLayout']);
                      this.builderHeroService.heroTheme.next(this.componentDetail['heroTheme']);
                      if (this.componentDetail['heroHeadingText']) {
                        this.builderHeroService.heroHeadingText.next(this.componentDetail['heroHeadingText']);
                      }
                      if (this.componentDetail['heroSubheadingText']) {
                        this.builderHeroService.heroSubheadingText.next(this.componentDetail['heroSubheadingText']);
                      }
                      if (this.componentDetail['heroButtonText']) {
                        this.builderHeroService.heroButtonText.next(this.componentDetail['heroButtonText']);
                      }
                    }
                  }
                }
              }
            }
          }
        });
      }
    });
  }

  setActiveEditComponent() {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
    if (this.activeEditComponent === ActiveComponents.Hero) {
      this.clearActiveEditComponent();
    } else {
      this.builderService.setActiveEditComponent(ActiveComponents.Hero, this.componentId);
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
    this.builderService.clearActiveEditComponent();
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
    return {'width': this.heroImageSize + '%'};
  }

  setActiveElementStyle(activeElement, element) {
    if (activeElement === element && !this.previewMode) {
      if (element.indexOf(element) > -1) {
        return element + '-edit';
      }
    }
  }

  selectHeroImage(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero, this.componentId);
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
    this.builderService.setActiveEditComponent(ActiveComponents.Hero, this.componentId);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-options-heading');
    event.stopPropagation();
  }

  selectHeroSubheading(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-options-subheading');
    event.stopPropagation();
  }

  selectHeroButton(event: any, elementId: string) {
    this.builderService.setActiveEditComponent(ActiveComponents.Hero, this.componentId);
    this.builderService.setSidebarOptionsSetting();
    this.builderService.activeElement.next(elementId);
    this.builderService.setActiveEditSetting(ActiveSettings.Options);
    this.builderService.triggerScrollTo('hero-options-button');
    event.stopPropagation();
  }

  setContentEditable() {
    return !this.previewMode;
  }

  removeLineBreaks(event: any) {
    BuilderService.removeLineBreaks(event);
  }

  saveHeroHeadingTextOption(heroHeadingText) {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderHeroService.heroHeadingText.next(heroHeadingText);
    this.builderComponentsService.setPageComponentById(this.componentId, 'heroHeadingText', heroHeadingText);
  }

  saveHeroSubheadingTextOption(heroSubheadingText) {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderHeroService.heroHeadingText.next(heroSubheadingText);
    this.builderComponentsService.setPageComponentById(this.componentId, 'heroSubheadingText', heroSubheadingText);
  }

  saveHeroButtonTextOption(heroButtonText) {
    this.builderService.activeElement.next(ActiveElements.Default);
    this.builderHeroService.heroButtonText.next(heroButtonText);
    this.builderComponentsService.setPageComponentById(this.componentId, 'heroButtonText', heroButtonText);
  }

  ngOnDestroy() {
    this.activeEditComponentSubscription.unsubscribe();
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
