import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IComponent } from '../../../../shared/models/component';
import { ActiveComponents, ActiveElements, ActiveSettings } from '../../builder';
import { BuilderService } from '../../builder.service';
import { BuilderComponentsService } from '../builder-components.service';
import { BuilderHeroService } from './builder-hero.service';

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
  heroTheme: string;
  activeEditComponent: string;
  activeEditComponentId: string;
  previewMode: boolean;
  componentName: string = ActiveComponents.Hero;
  componentId: string;
  heroHeadingText: string;
  heroButtonText: string;
  heroSubheadingText: string;
  heroComponentLayout: any;
  heroImageContainerClass: string;
  heroTextContainerClass: string;
  heroButtonLink: string;
  heroImageSize: number;
  activeElement: string;
  componentDetail: any;
  activePageSetting: string;
  pageComponents: any;
  websiteMode = false;
  componentActive = false;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private builderHeroService: BuilderHeroService,
    private builderComponentsService: BuilderComponentsService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    this.builderService.websiteMode.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.websiteMode = response;
      }
    });

    this.builderService.previewMode.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      this.previewMode = response;
    });

    this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.activeEditComponent = response;
      }
    });

    this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
      }
    });

    this.builderService.activeElement.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
      if (response) {
        this.activeElement = response;
      }
    });

    this.builderService.activePageSetting.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(activePageSettingResponse => {
      if (activePageSettingResponse) {
        this.activePageSetting = activePageSettingResponse;
        this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(response => {
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
                      this.heroBackgroundStyle = this.componentDetail['style']['heroBackgroundStyle'];
                      this.heroHeadingStyle = this.componentDetail['style']['heroHeadingStyle'];
                      this.heroSubheadingStyle = this.componentDetail['style']['heroSubheadingStyle'];
                      this.heroButtonStyle = this.componentDetail['style']['heroButtonStyle'];
                      this.heroImageUrl = this.componentDetail['style']['heroImageStyle']['src'];
                      this.heroImageAlt = this.componentDetail['style']['heroImageStyle']['alt'];
                      this.heroComponentLayout = this.componentDetail['heroComponentLayout'];
                      this.heroImageSize = this.componentDetail['style']['heroImageStyle']['width'].replace('%', '');
                      this.heroTheme = this.componentDetail['heroTheme'];
                      this.heroButtonLink = this.componentDetail['heroButtonLink'];
                      this.heroHeadingText = this.componentDetail['heroHeadingText'];
                      this.heroSubheadingText = this.componentDetail['heroSubheadingText'];
                      this.heroButtonText = this.componentDetail['heroButtonText'];
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
    if (this.activeEditComponentId === this.componentId) {
      this.clearActiveEditComponent();
    } else {
      window.postMessage({
        'for': 'opsonion',
        'action': 'duplicate-component-selected',
        'message': this.componentId
      }, '*');
      this.builderService.activeEditComponentId.next(this.componentId);
      this.builderService.setActiveEditComponent(ActiveComponents.Hero, this.componentId);
      this.builderService.setActiveEditSetting(ActiveSettings.Colours);
      this.setComponentStyle();
    }
  }

  setComponentStyle() {
    this.builderHeroService.heroBackgroundStyle.next(this.heroBackgroundStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
    this.builderHeroService.heroImageUrl.next(this.heroImageUrl);
    this.builderHeroService.heroImageAlt.next(this.heroImageAlt);
    this.builderHeroService.heroComponentLayout.next(this.heroComponentLayout);
    this.builderHeroService.heroTheme.next(this.heroTheme);
    this.builderHeroService.heroButtonLink.next(this.heroButtonLink);
    this.builderHeroService.heroHeadingText.next(this.heroHeadingText);
    this.builderHeroService.heroSubheadingText.next(this.heroSubheadingText);
    this.builderHeroService.heroButtonText.next(this.heroButtonText);
  }

  setComponentClass() {
    return BuilderService.setComponentClass(this.previewMode, this.activeEditComponent, this.componentName, this.componentActive);
  }

  setContextMenu() {
    return BuilderService.setContextMenu(this.previewMode, this.activeEditComponent, this.componentName);
  }

  clearActiveEditComponent() {
    if (this.activeElement.indexOf('heading') === -1 && this.activeElement.indexOf('subheading') === -1 && this.activeElement.indexOf('button') === -1) {
      window.postMessage({
        'for': 'opsonion',
        'action': 'duplicate-component-deselected',
        'message': this.componentId
      }, '*');
      this.componentActive = false;
      this.builderService.clearActiveEditComponent();
    }
  }

  setHeroTextContainerClass() {
    if (this.heroComponentLayout === 0) {
      this.heroTextContainerClass = 'col-12 col-md-7 col-lg-6 order-md-1 pr-md-5';
      return this.heroTextContainerClass;
    }
    if (this.heroComponentLayout === 1) {
      this.heroTextContainerClass = 'col-12 col-md-7 col-lg-6 order-md-2 pr-md-5';
      return this.heroTextContainerClass;
    }
  }

  setHeroImageContainerClass() {
    if (this.heroComponentLayout === 0) {
      this.heroImageContainerClass = 'col-12 col-md-5 col-lg-6 order-md-2';
      return this.heroImageContainerClass;
    }
    if (this.heroComponentLayout === 1) {
      this.heroImageContainerClass = 'col-12 col-md-5 col-lg-6 order-md-1';
      return this.heroImageContainerClass;
    }
  }

  setHeroImageStyle() {
    return { 'width': this.heroImageSize + '%' };
  }

  setActiveElement(elementName: string) {
    if (this.activeElement === (this.componentId + '-' + elementName) && !this.previewMode) {
      return elementName + '-edit';
    } else {
      return '';
    }
  }

  selectHeroElement(event: any, elementId: string) {
    if (!this.previewMode) {
      window.postMessage({
        'for': 'opsonion',
        'action': 'duplicate-component-selected',
        'message': this.componentId
      }, '*');
      this.builderService.activeElement.next(elementId);
      this.builderService.activeEditComponentId.next(ActiveComponents.Placeholder);
      this.builderService.setActiveEditComponent(ActiveComponents.Hero, this.componentId);
      this.builderService.setSidebarOptionsSetting();
      this.builderService.setActiveEditSetting(ActiveSettings.Options);
      this.builderService.triggerScrollTo('hero-options');
      this.setComponentStyle();
      window.postMessage({ 'for': 'opsonion', 'action': 'element-selected', 'message': elementId }, '*');
      event.stopPropagation();
    }
  }

  setHeroClass(element) {
    if (this.previewMode) {
      return element + '-preview';
    }
    if (!this.previewMode) {
      return element + '-active';
    }
  }

  selectHeroButton(event: any, elementId: string) {
    if (this.websiteMode) {
      this.builderService.activePageSetting.next(this.heroButtonLink);
      this.builderService.activePageIndex.next(this.builderComponentsService.getPageIndex(this.heroButtonLink));
    } else {
      this.selectHeroElement(event, elementId);
    }
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


  @HostListener('window:message', ['$event'])
  onMessage(e) {
    if (e.data.for === 'opsonion') {
      if (e.data.action === 'unique-component-selected' || e.data.action === 'duplicate-component-deselected') {
        this.componentActive = false;
      }

      if (e.data.action === 'duplicate-component-selected') {
        this.componentActive = e.data.message === this.componentId;
      }

      if (e.data.action === 'element-selected') {
        this.builderService.activeElement.next(e.data.message);
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
