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
  footerStyle: any = {
    'padding': '1em'
  };
  footerTemplate: string = ActiveTemplates.Default;
  footerTheme: string = ActiveFooterThemes.Default;

  private footerStyleSubscription: Subscription;
  private footerThemesSubscription: Subscription;
  private footerThemeSubscription: Subscription;

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
  }

  onThemeChange() {
    this.builderFooterService.footerTheme.next(this.footerTheme);
    this.builderFooterService.setFooterTheme(this.footerTheme);
  }

  setFooterStyle() {
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  resetToDefault() {
    this.builderFooterService.footerTheme.next(ActiveFooterThemes.Default);
    this.builderFooterService.footerTemplate.next(this.footerTemplate);
    this.builderFooterService.setFooterTemplate(this.footerTemplate);
  }
}
