import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderNavbarService } from '../../../builder-components/builder-navbar/builder-navbar.service';
import { BuilderService } from '../../../builder.service';
import { BuilderSidebarColourPickerComponent } from '../../builder-sidebar-elements/builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { BuilderSidebarFontNameComponent } from '../../builder-sidebar-elements/builder-sidebar-font-name/builder-sidebar-font-name.component';
import { BuilderSidebarFontSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-font-size/builder-sidebar-font-size.component';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarImageSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-image-size/builder-sidebar-image-size.component';
import { BuilderSidebarLineBreakComponent } from '../../builder-sidebar-elements/builder-sidebar-line-break/builder-sidebar-heading.component';
import { BuilderSidebarPaddingComponent } from '../../builder-sidebar-elements/builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarSelectImageComponent } from '../../builder-sidebar-elements/builder-sidebar-select-image/builder-sidebar-select-image.component';
import { BuilderSidebarSortPagesComponent } from '../../builder-sidebar-elements/builder-sidebar-sort-pages/builder-sidebar-sort-pages.component';
import { BuilderSidebarTextAlignmentComponent } from '../../builder-sidebar-elements/builder-sidebar-text-alignment/builder-sidebar-text-alignment.component';
import { BuilderSidebarThemeChangeComponent } from '../../builder-sidebar-elements/builder-sidebar-theme-change/builder-sidebar-theme-change.component';

@Component({
  selector: 'app-sidebar-navbar-component',
  templateUrl: '../builder-sidebar-components-renderer.component.html',
})

export class SidebarNavbarComponent implements OnInit, OnDestroy {

  @Input() settings;

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
    private builderNavbarService: BuilderNavbarService
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
      componentName: ActiveComponents.Navbar,
      pageIndex: this.activePageIndex,
      componentIndex: this.activeComponentIndex,
      componentService: this.builderNavbarService,
      getThemesFunction: 'getNavbarThemes',
    };

    switch (this.settings) {
      case 'colours':
        this.sidebar = [
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'navbarStyle', colourProperty: 'background-color', sectionHeader: 'Background' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'navbarBrandStyle', colourProperty: 'color', sectionHeader: 'Text' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'navbarLinkStyle', colourProperty: 'color', sectionHeader: 'Link' } },
          {
            component: BuilderSidebarThemeChangeComponent, elementInfo: {
              elements: [
                { name: 'navbarStyle', colourProperty: 'background-color' },
                { name: 'navbarBrandStyle', colourProperty: 'color' },
                { name: 'navbarLinkStyle', colourProperty: 'color' }]
            }
          },
        ];
        break;
      case 'layout':
        this.sidebar = [
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Logo', includeLineBreak: false } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'navbarLogoImageStyle', condition: [{ property: 'navbarLogoImage', exists: true }] } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'navbarBrandStyle', condition: [{ property: 'navbarLogoImage', exists: false }] } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Menu' } },
          {
            component: BuilderSidebarTextAlignmentComponent, elementInfo: {
              name: 'navbarLayoutClass',
              buttonProperties: {
                left: {value: 'navbar-nav mr-auto'},
                center: {value: 'navbar-nav mx-auto'},
                right: {value: 'navbar-nav ml-auto'},
                justify: {visible: false}
              }
            }
          },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'navbarLinkStyle' } },
        ];
        break;
      case 'options':
        this.sidebar = [
          { component: BuilderSidebarSelectImageComponent, elementInfo: { name: 'navbarLogoImage', sectionHeader: 'Navbar', library: false, photos: false } },
          { component: BuilderSidebarImageSizeComponent, elementInfo: { name: 'navbarLogoImageStyle', sizeUnit: 'px', maxValue: 200, condition: [{ property: 'navbarLogoImage', exists: true }] } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Menu' } },
          { component: BuilderSidebarSortPagesComponent, elementInfo: { containerStyle: { 'padding-bottom': '1.5em' } } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'navbarLinkStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'navbarLinkStyle' } },
        ];
        break;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
