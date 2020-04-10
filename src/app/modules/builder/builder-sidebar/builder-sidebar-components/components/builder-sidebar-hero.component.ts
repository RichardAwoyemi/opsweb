import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { BuilderService } from '../../../builder.service';
import { BuilderSidebarColourPickerComponent } from '../../builder-sidebar-elements/builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { BuilderSidebarFontNameComponent } from '../../builder-sidebar-elements/builder-sidebar-font-name/builder-sidebar-font-name.component';
import { BuilderSidebarFontSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-font-size/builder-sidebar-font-size.component';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarLineBreakComponent } from '../../builder-sidebar-elements/builder-sidebar-line-break/builder-sidebar-heading.component';
import { BuilderSidebarPaddingComponent } from '../../builder-sidebar-elements/builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarTextAlignmentComponent } from '../../builder-sidebar-elements/builder-sidebar-text-alignment/builder-sidebar-text-alignment.component';
import { BuilderSidebarThemeChangeComponent } from '../../builder-sidebar-elements/builder-sidebar-theme-change/builder-sidebar-theme-change.component';
import { BuilderSidebarImageOptionsComponent } from '../../builder-sidebar-elements/builder-sidebar-image-options/builder-sidebar-image-options.component';
import { BuilderSidebarSelectImageComponent } from '../../builder-sidebar-elements/builder-sidebar-select-image/builder-sidebar-select-image.component';
import { BuilderSidebarImageSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-image-size/builder-sidebar-image-size.component';
import { BuilderSidebarLinksDropdownComponent } from '../../builder-sidebar-elements/builder-sidebar-links-dropdown/builder-sidebar-links-dropdown.component';

@Component({
  selector: 'app-sidebar-hero-component',
  templateUrl: '../builder-sidebar-components-renderer.component.html',
})

export class SidebarHeroComponent implements OnInit, OnDestroy {

  @Input() setting;

  sidebar: any;
  baseData: any;
  pageComponents: any;
  componentId: any;
  activePageIndex: number;
  activeComponentIndex: number;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private builderHeroService: BuilderHeroService
  ) {
  }

  ngOnInit() {

    this.builderService.activePageIndex.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(activePageIndexResponse => {
        this.activePageIndex = activePageIndexResponse;
        this.builderService.activeEditComponentId.pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(activeEditComponentIdResponse => {
            if (activeEditComponentIdResponse) {
              this.componentId = activeEditComponentIdResponse;
              this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
                .subscribe(pageComponentsResponse => {
                  if (pageComponentsResponse) {
                    this.pageComponents = pageComponentsResponse;
                    for (let j = 0; j < this.pageComponents['pages'][this.activePageIndex]['components'].length; j++) {
                      if (this.pageComponents['pages'][this.activePageIndex]['components'][j]['componentId'] === this.componentId) {
                        if (this.activeComponentIndex !== j) {
                          this.activeComponentIndex = j;
                          this.setupData();
                        }
                        break;
                      }
                    }
                  }
                });
            }
          });
      });

  }

  setupData() {
    this.baseData = {
      componentName: ActiveComponents.Hero,
      pageIndex: this.activePageIndex,
      componentIndex: this.activeComponentIndex,
      componentService: this.builderHeroService,
      updateElementCountFunction: 'setNumberOfHero',
      getThemesFunction: 'getHeroThemes',
    };

    switch (this.setting) {
      case 'layout':
        this.sidebar = [
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Hero' } },
          { component: BuilderSidebarImageOptionsComponent, elementInfo: {
             name: 'heroComponentLayout',
             sectionHeader: 'Position',
             optionSettings: [
               {src: 'assets/img/hero-layout-0.svg', alt: 'hero-layout-0', value: 0},
               {src: 'assets/img/hero-layout-1.svg', alt: 'hero-layout-1', value: 1}
             ] } },
          { component: BuilderSidebarLineBreakComponent },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Heading' } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'heroHeadingStyle' } },
          { component: BuilderSidebarLineBreakComponent },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Subheading' } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'heroSubheadingStyle' } }
        ];
        break;
      case 'colours':
        this.sidebar = [
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'heroBackgroundStyle', colourProperty: 'background-color', sectionHeader: 'Background' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'heroHeadingStyle', colourProperty: 'color', sectionHeader: 'Heading' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'heroSubheadingStyle', colourProperty: 'color', sectionHeader: 'Subheading' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'heroButtonStyle', colourProperty: 'background-color', sectionHeader: 'Button Background' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'heroButtonStyle', colourProperty: 'color', sectionHeader: 'Button Text' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'heroButtonStyle', colourProperty: 'border-color', sectionHeader: 'Button Border' } },
          {
            component: BuilderSidebarThemeChangeComponent, elementInfo: {
              elements: [
                { name: 'heroBackgroundStyle', colourProperty: 'background-color' },
                { name: 'heroHeadingStyle', colourProperty: 'color' },
                { name: 'heroSubheadingStyle', colourProperty: 'color' },
                { name: 'heroButtonStyle', colourProperty: 'background-color' },
                { name: 'heroButtonStyle', colourProperty: 'color' },
                { name: 'heroButtonStyle', colourProperty: 'border-color' }]
            }
          },
        ];
        break;
      case 'options':
        this.sidebar = [
          { component: BuilderSidebarSelectImageComponent, elementInfo: { name: 'heroImageStyle', sectionHeader: 'Hero' } },
          { component: BuilderSidebarImageSizeComponent, elementInfo: { name: 'heroImageStyle' } },
          { component: BuilderSidebarLineBreakComponent },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Heading' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'heroHeadingStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'heroHeadingStyle' } },
          { component: BuilderSidebarLineBreakComponent },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Subheading' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'heroSubheadingStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'heroSubheadingStyle' } },
          { component: BuilderSidebarLineBreakComponent },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Button' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'heroButtonStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'heroButtonStyle' } },
          { component: BuilderSidebarLinksDropdownComponent, elementInfo: { name: 'heroButtonLink', sectionHeader: 'Link' } },
        ];
        break;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
