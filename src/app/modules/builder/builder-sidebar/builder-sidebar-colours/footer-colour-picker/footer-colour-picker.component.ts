import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TemplateService } from '../../../../../shared/services/template.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { ActiveComponents, ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { BuilderFooterService } from '../../../builder-components/builder-footer/builder-footer.service';

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
  ngUnsubscribe = new Subject<void>();

  constructor(
    private builderFooterService: BuilderFooterService,
    private builderComponentsService: BuilderComponentsService,
    private websiteService: WebsiteService,
    private templateService: TemplateService
  ) {
  }

  ngOnInit() {
    this.builderFooterService.footerStyle.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerStyle = response;
        }
      });

    this.builderFooterService.footerTheme.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerTheme = response;
        }
      });

    this.builderFooterService.getFooterThemes().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.footerThemes = response;
        }
      });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(templateResponse => {
        if (templateResponse) {
          this.footerTemplate = templateResponse['template'];

          this.templateService.getTemplateStyle(this.footerTemplate).pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(response => {
              if (response) {
                this.defaultFooterStyle = response[ActiveComponents.Footer];
              }
            });
        }
      });

    this.builderComponentsService.pageComponents.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        if (response) {
          this.pageComponents = response;
        }
      });

    this.websiteService.getWebsiteChangeCount().pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
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
    this.footerStyle['background-color'] = this.defaultFooterStyle['style']['footerStyle']['background-color'];
    this.footerStyle['color'] = this.defaultFooterStyle['style']['footerStyle']['color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerTheme', ActiveThemes.Default);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerStyle', this.footerStyle);
    this.builderFooterService.footerStyle.next(this.footerStyle);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
