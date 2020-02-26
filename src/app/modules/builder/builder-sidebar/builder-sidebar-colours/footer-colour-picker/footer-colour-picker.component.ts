import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';

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
    private builderComponentService: BuilderComponentsService,
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

    this.builderComponentsSubscription = this.builderComponentService.pageComponents.subscribe(response => {
      if (response) {
        this.pageComponents = response;
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

  setChanges() {
    const timestamp = new Date().getTime();
    for (let i = 0; i < this.pageComponents['pages'].length; i++) {
      for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
        if (this.pageComponents['pages'][i]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Footer) {
          this.pageComponents['pages'][i]['components'][j]['timestamp'] = timestamp;
          this.pageComponents['pages'][i]['components'][j]['footerTheme'] = this.footerTheme;
          this.pageComponents['pages'][i]['components'][j]['footerStyle'] = this.footerStyle;
        }
      }
    }
    this.builderComponentService.pageComponents.next(this.pageComponents);
  }

  ngOnDestroy() {
    this.setChanges();
    this.footerStyleSubscription.unsubscribe();
    this.footerThemeSubscription.unsubscribe();
    this.footerThemesSubscription.unsubscribe();
    this.footerTemplateSubscription.unsubscribe();
    this.defaultFooterStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
  }
}
