import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActiveComponents } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { BuilderService } from '../../../builder.service';
import { BuilderSidebarColourPickerComponent } from '../../builder-sidebar-elements/builder-sidebar-colour-picker/builder-sidebar-colour-picker.component';
import { BuilderSidebarFontNameComponent } from '../../builder-sidebar-elements/builder-sidebar-font-name/builder-sidebar-font-name.component';
import { BuilderSidebarFontSizeComponent } from '../../builder-sidebar-elements/builder-sidebar-font-size/builder-sidebar-font-size.component';
import { BuilderSidebarFormInputComponent } from '../../builder-sidebar-elements/builder-sidebar-form-input/builder-sidebar-form-input.component';
import { BuilderSidebarHeadingComponent } from '../../builder-sidebar-elements/builder-sidebar-heading/builder-sidebar-heading.component';
import { BuilderSidebarImageOptionsComponent } from '../../builder-sidebar-elements/builder-sidebar-image-options/builder-sidebar-image-options.component';
import { BuilderSidebarLinksTickboxComponent } from '../../builder-sidebar-elements/builder-sidebar-links-tickbox/builder-sidebar-links-tickbox.component';
import { BuilderSidebarPaddingComponent } from '../../builder-sidebar-elements/builder-sidebar-padding/builder-sidebar-padding.component';
import { BuilderSidebarThemeChangeComponent } from '../../builder-sidebar-elements/builder-sidebar-theme-change/builder-sidebar-theme-change.component';

@Component({
  selector: 'app-sidebar-footer-settings',
  templateUrl: './builder-sidebar-settings-renderer.component.html',
})

export class SidebarFooterSettingsComponent implements OnInit, OnDestroy {

  settings: string;
  sidebar: any;
  baseData: any;
  pageComponents: any;
  componentId: any;
  componentName = ActiveComponents.Footer;
  isActive = false;
  activePageIndex: number;
  activeComponentIndex: number;
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderService: BuilderService,
    private builderComponentsService: BuilderComponentsService,
    private builderFooterService: BuilderFooterService
  ) {
  }

  ngOnInit() {

    this.builderService.activeEditSetting.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.settings = response;
        this.setupData();
      });

      this.builderService.activeEditComponent.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.isActive = this.componentName === response;
      });

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
      componentName: this.componentName,
      pageIndex: this.activePageIndex,
      componentIndex: this.activeComponentIndex,
      componentService: this.builderFooterService,
      getThemesFunction: 'getFooterThemes',
    };

    switch (this.settings) {
      case 'colours':
        this.sidebar = [
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'footerStyle', colourProperty: 'background-color', sectionHeader: 'Background' } },
          { component: BuilderSidebarColourPickerComponent, elementInfo: { name: 'footerStyle', colourProperty: 'color', sectionHeader: 'Text' } },
          {
            component: BuilderSidebarThemeChangeComponent, elementInfo: {
              elements: [
                { name: 'footerStyle', colourProperty: 'background-color' },
                { name: 'footerStyle', colourProperty: 'color' }]
            }
          },
        ];
        break;
      case 'layout':
        this.sidebar = [
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Footer', includeLineBreak: false } },
          {
            component: BuilderSidebarImageOptionsComponent, elementInfo: {
              sectionHeader: 'Position',
              optionSettings: [
                {
                  src: 'assets/img/footer-alignment-text-center-0.svg', alt: 'footer layout 0 center', update: [
                    { name: 'footerComponentLayout', value: 0 },
                    { name: 'footerAlignmentClass', value: 'text-center' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'padding-top', value: '4px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-top', value: '0px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-bottom', value: '-10px' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-left', value: '0.25em' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-right', value: '0.25em' },
                  ]
                },
                {
                  src: 'assets/img/footer-alignment-text-left.svg', alt: 'footer layout 0 left', update: [
                    { name: 'footerComponentLayout', value: 0 },
                    { name: 'footerAlignmentClass', value: 'text-left' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'padding-top', value: '4px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-top', value: '0px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-bottom', value: '-10px' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-left', value: '-12px' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-right', value: '0.75em' },
                  ]
                },
                {
                  src: 'assets/img/footer-alignment-text-right.svg', alt: 'footer layout 0 right', update: [
                    { name: 'footerComponentLayout', value: 0 },
                    { name: 'footerAlignmentClass', value: 'text-right' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'padding-top', value: '4px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-top', value: '0px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-bottom', value: '-10px' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-right', value: '-12px' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-left', value: '0.75em' },
                  ]
                },
                {
                  src: 'assets/img/footer-alignment-text-center-1.svg', alt: 'footer layout 1 center', update: [
                    { name: 'footerComponentLayout', value: 1 },
                    { name: 'footerAlignmentClass', value: 'text-center' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'padding-top', value: '6px' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-top', value: 'auto' },
                    { name: 'footerSocialLinksContainerStyle', childKey: 'margin-bottom', value: 'auto' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-left', value: '0.25em' },
                    { name: 'footerSocialLinksStyle', childKey: 'margin-right', value: '0.25em' },
                    { name: 'footerPageLinksStyle', childKey: 'margin-top', value: 'auto' },
                    { name: 'footerPageLinksStyle', childKey: 'margin-bottom', value: 'auto' },
                    { name: 'footerCopyrightStyle', childKey: 'margin-top', value: 'auto' },
                    { name: 'footerCopyrightStyle', childKey: 'margin-bottom', value: 'auto' },
                  ]
                }
              ]
            }
          },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'footerStyle', containerStyle: { 'padding-top': '1em' } } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Copyright' } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'footerCopyrightStyle' } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Pages' } },
          { component: BuilderSidebarPaddingComponent, elementInfo: { name: 'footerPageLinksStyle' } },
          {
            component: BuilderSidebarHeadingComponent, elementInfo: {
              name: 'Socials', any: true, condition: [
                { property: 'footerSocialLinks.facebookUrl', exists: true },
                { property: 'footerSocialLinks.twitterUrl', exists: true },
                { property: 'footerSocialLinks.instagramUrl', exists: true },
                { property: 'footerSocialLinks.youtubeUrl', exists: true },
                { property: 'footerSocialLinks.githubUrl', exists: true },
                { property: 'footerSocialLinks.linkedinUrl', exists: true }
              ]
            }
          },
          {
            component: BuilderSidebarPaddingComponent, elementInfo: {
              name: 'footerSocialLinksStyle', any: true,
              condition: [
                { property: 'footerSocialLinks.facebookUrl', exists: true },
                { property: 'footerSocialLinks.twitterUrl', exists: true },
                { property: 'footerSocialLinks.instagramUrl', exists: true },
                { property: 'footerSocialLinks.youtubeUrl', exists: true },
                { property: 'footerSocialLinks.githubUrl', exists: true },
                { property: 'footerSocialLinks.linkedinUrl', exists: true }
              ]
            }
          },
        ];
        break;
      case 'options':
        this.sidebar = [
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Social', includeLineBreak: false } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'footerSocialLinksStyle' } },
          {
            component: BuilderSidebarFormInputComponent, elementInfo: {
              sectionHeader: 'Links',
              fieldSettings: [
                { name: 'footerSocialLinks', childKey: 'facebookUrl', prependClass: 'ti-facebook', placeholder: 'Facebook URL' },
                { name: 'footerSocialLinks', childKey: 'twitterUrl', prependClass: 'ti-twitter', placeholder: 'Twitter URL' },
                { name: 'footerSocialLinks', childKey: 'instagramUrl', prependClass: 'ti-instagram', placeholder: 'Instagram URL' },
                { name: 'footerSocialLinks', childKey: 'youtubeUrl', prependClass: 'ti-youtube', placeholder: 'Youtube URL' },
                { name: 'footerSocialLinks', childKey: 'githubUrl', prependClass: 'ti-github', placeholder: 'Github URL' },
                { name: 'footerSocialLinks', childKey: 'linkedinUrl', prependClass: 'ti-linkedin', placeholder: 'LinkedIn URL' },
              ]
            }
          },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Pages' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'footerPageLinksStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'footerPageLinksStyle' } },
          { component: BuilderSidebarLinksTickboxComponent, elementInfo: { name: 'footerMenuOptions', pageKey: 'page', valueKey: 'visible' } },
          { component: BuilderSidebarHeadingComponent, elementInfo: { name: 'Copyright' } },
          { component: BuilderSidebarFontNameComponent, elementInfo: { name: 'footerCopyrightStyle' } },
          { component: BuilderSidebarFontSizeComponent, elementInfo: { name: 'footerCopyrightStyle' } }
        ];
        break;
        default:
          this.sidebar = [];
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
