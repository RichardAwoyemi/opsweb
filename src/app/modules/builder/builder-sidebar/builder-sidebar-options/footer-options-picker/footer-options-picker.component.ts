import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';

@Component({
  selector: 'app-footer-options-picker',
  templateUrl: './footer-options-picker.component.html',
  styleUrls: ['./footer-options-picker.component.css'],
})
export class FooterOptionsPickerComponent implements OnInit {
  footerFontName: string = 'Avenir Next Regular';
  fontNames: any;
  fontUnits: any;
  footerStyle: any;
  footerFontSize: number;
  defaultFooterStyle: any;
  footerTemplate: string;
  footerFontUnit: string = 'px';

  private fontNamesSubscription: Subscription;
  private fontUnitsSubscription: Subscription;
  private footerStyleSubscription: Subscription;
  private footerTemplateSubscription: Subscription;
  private defaultFooterStyleSubscription: Subscription;

  constructor(
    private builderFooterService: BuilderFooterService,
    private builderService: BuilderService,
  ) {
  }

  ngOnInit() {
    this.fontNamesSubscription = this.builderService.fontNames.subscribe(response => {
      if (response) {
        this.fontNames = response;
      }
    });

    this.fontUnitsSubscription = this.builderService.fontUnits.subscribe(response => {
      if (response) {
        this.fontUnits = response;
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

    this.footerStyleSubscription = this.builderFooterService.footerStyle.subscribe(response => {
      if (response) {
        this.footerStyle = response;

        if (this.footerStyle['font-size']) {
          if (this.footerStyle['font-size'].indexOf('px') > -1) {
            this.footerFontSize = this.footerStyle['font-size'].replace('px', '');
          }
          if (this.footerStyle['font-size'].indexOf('em') > -1) {
            this.footerFontSize = this.footerStyle['font-size'].replace('em', '');
          }
        }
      }
    });
  }

  resetFooterFontName() {
    this.footerStyle['font-family'] = this.defaultFooterStyle['footerStyle']['font-family'];
    const footerFontNames = this.footerStyle['font-family'].split(',');
    this.footerFontName = footerFontNames[0].replace(/'/g, '');
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  onFooterFontNameChange() {
    this.footerStyle['font-family'] = this.footerFontName;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  resetFooterFontSize() {
    this.footerStyle['font-size'] = this.defaultFooterStyle['footerStyle']['font-size'];
    this.footerFontUnit = 'px';
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  setFooterFontSize() {
    this.footerStyle['font-size'] = this.footerFontSize + this.footerFontUnit;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  onFooterFontUnitChange() {
    if (this.footerFontUnit == 'em') {
      if (this.footerFontSize < 16) {
        this.footerFontSize = 16;
      }
      this.footerFontSize = Math.round(this.footerFontSize / 16);
    }

    if (this.footerFontUnit == 'px') {
      this.footerFontSize = Math.round(this.footerFontSize * 16);
    }

    this.footerStyle['font-size'] = this.footerFontSize + this.footerFontUnit;
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }
}
