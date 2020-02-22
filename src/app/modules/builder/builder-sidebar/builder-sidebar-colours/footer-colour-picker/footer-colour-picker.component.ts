import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';

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
  websiteChangeCount: number;
  private footerStyleSubscription: Subscription;
  private footerThemeSubscription: Subscription;
  private footerThemesSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;

  constructor(
    private builderFooterService: BuilderFooterService,
    private builderService: BuilderService
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

    this.footerTemplateSubscription = this.builderFooterService.footerTemplate.subscribe(footerTemplateResponse => {
      if (footerTemplateResponse) {
        this.footerTemplate = footerTemplateResponse;

        this.defaultFooterStyleSubscription = this.builderFooterService.getDefaultFooterStyle(this.footerTemplate).subscribe(response => {
          if (response) {
            this.defaultFooterStyle = response;
          }
        });
      }
    });

    this.websiteChangeCountSubscription = this.builderService.getWebsiteChangeCount().subscribe(response => {
      if (response) {
        this.websiteChangeCount = response['value'];
      }
    });
  }

  onThemeChange() {
    if (this.footerTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderFooterService.footerTheme.next(this.footerTheme);
      this.builderFooterService.setFooterTheme(this.footerTheme);
    }
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setFooterStyle() {
    this.builderFooterService.footerStyle.next(this.footerStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderFooterService.footerTheme.next(ActiveThemes.Default);
    this.footerStyle['background-color'] = this.defaultFooterStyle['footerStyle']['background-color'];
    this.footerStyle['color'] = this.defaultFooterStyle['footerStyle']['color'];
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  ngOnDestroy() {
    this.footerStyleSubscription.unsubscribe();
    this.footerThemeSubscription.unsubscribe();
    this.footerThemesSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
    this.defaultFooterStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
  }
}
