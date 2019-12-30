import { Component, OnInit } from '@angular/core';
import { ActiveFooterThemes, ActiveTemplates } from '../../../builder';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-colour-picker',
  templateUrl: './footer-colour-picker.component.html'
})
export class FooterColourPickerComponent implements OnInit {
  footerThemes: any;
  defaultFooterStyle: any;
  footerStyle: any;
  footerTemplate: string = ActiveTemplates.Default;
  footerTheme: string = ActiveFooterThemes.Default;
  private footerStyleSubscription: Subscription;
  private footerThemeSubscription: Subscription;
  private footerThemesSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;

  constructor(
    private builderFooterService: BuilderFooterService
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

    this.footerTemplateSubscription = this.builderFooterService.footerTemplate.subscribe(response => {
      if (response) {
        this.footerTemplate = response;

        this.defaultFooterStyleSubscription = this.builderFooterService.getDefaultFooterStyle(this.footerTemplate).subscribe(response => {
          if (response) {
            this.defaultFooterStyle = response;
          }
        });
      }
    });
  }

  onThemeChange() {
    if (this.footerTheme === ActiveFooterThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderFooterService.footerTheme.next(this.footerTheme);
      this.builderFooterService.setFooterTheme(this.footerTheme);
    }
  }

  setFooterStyle() {
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  resetToDefault() {
    this.builderFooterService.footerTheme.next(ActiveFooterThemes.Default);
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
  }
}
