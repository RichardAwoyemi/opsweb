import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { Subscription } from 'rxjs';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { WebsiteService } from '../../../../../shared/services/website.service';

@Component({
  selector: 'app-footer-colour-picker',
  templateUrl: './footer-colour-picker.component.html'
})
export class FooterColourPickerComponent implements OnInit, OnDestroy {
  footerThemes: any;
  defaultFooterStyle: any;
  footerStyle: any;
  footerTemplate: string = ActiveTemplates.Default;
  footerTheme: string = ActiveThemes.Default;
  pageComponents: any;
  websiteChangeCount: number;

  private footerStyleSubscription: Subscription;
  private footerThemeSubscription: Subscription;
  private footerThemesSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;

  constructor(
    private builderFooterService: BuilderFooterService,
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;
      }
    });

    this.footerThemeSubscription = this.builderFooterService.footerTheme.subscribe(response => {
      if (response) {
        this.footerTheme = response;
      }
    });

    this.footerThemesSubscription = this.builderFooterService.getFooterThemes().subscribe(response => {
      if (response) {
        this.footerThemes = response;
      }
    });

    this.footerTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(templateResponse => {
      if (templateResponse) {
        this.footerTemplate = templateResponse['template'];

        this.defaultFooterStyleSubscription = this.builderFooterService.getDefaultFooterStyle(this.footerTemplate).subscribe(response => {
          if (response) {
            this.defaultFooterStyle = response;
          }
        });
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
      }
    });

    this.websiteChangeCountSubscription = this.websiteService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onThemeChange() {
    if (this.footerTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerTheme', this.footerTheme);
      this.builderFooterService.footerTheme.next(this.footerTheme);
      this.builderFooterService.setFooterTheme(this.footerTheme);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFooterStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerStyle', this.footerStyle);
    this.builderFooterService.footerStyle.next(this.footerStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderFooterService.footerTheme.next(ActiveThemes.Default);
    this.footerStyle['background-color'] = this.defaultFooterStyle['footerStyle']['background-color'];
    this.footerStyle['color'] = this.defaultFooterStyle['footerStyle']['color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerTheme', ActiveThemes.Default);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerStyle', this.footerStyle);
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  ngOnDestroy() {
    this.footerStyleSubscription.unsubscribe();
    this.footerThemeSubscription.unsubscribe();
    this.footerThemesSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
    this.defaultFooterStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}
