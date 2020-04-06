import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { ActiveComponents, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';
import { WebsiteService } from '../../../../../shared/services/website.service';
import { TemplateService } from '../../../../../shared/services/template.service';

@Component({
  selector: 'app-hero-colour-picker',
  templateUrl: './hero-colour-picker.component.html'
})
export class HeroColourPickerComponent implements OnInit, OnDestroy {
  heroBackgroundStyle: any;
  heroHeadingStyle: any;
  heroSubheadingStyle: any;
  heroButtonStyle: any;
  heroTemplate: string = ActiveTemplates.Default;
  heroTheme: string = ActiveThemes.Default;
  heroThemes: any;
  websiteChangeCount: number;
  defaultHeroStyle: any;
  pageComponents: any;
  activeEditComponentId: string;

  private heroBackgroundStyleSubscription: Subscription;
  private heroHeadingStyleSubscription: Subscription;
  private heroSubheadingStyleSubscription: Subscription;
  private heroButtonStyleSubscription: Subscription;
  private heroThemeSubscription: Subscription;
  private heroThemesSubscription: Subscription;
  private heroTemplateSubscription: Subscription;
  private defaultHeroStyleSubscription: Subscription;
  private websiteChangeCountSubscription: Subscription;
  private builderComponentsSubscription: Subscription;
  private activeEditComponentIdSubscription: Subscription;

  constructor(
    private builderService: BuilderService,
    private builderHeroService: BuilderHeroService,
    private builderComponentsService: BuilderComponentsService,
    private templateService: TemplateService,
    private websiteService: WebsiteService
  ) {
  }

  ngOnInit() {
    this.activeEditComponentIdSubscription = this.builderService.activeEditComponentId.subscribe(response => {
      if (response) {
        this.activeEditComponentId = response;
        this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(pageDetails => {
          if (pageDetails) {
            this.pageComponents = pageDetails;
            for (let i = 0; i < this.pageComponents['pages'].length; i++) {
              for (let j = 0; j < this.pageComponents['pages'][i]['components'].length; j++) {
                if (this.pageComponents['pages'][i]['components'][j]['componentId'] === this.activeEditComponentId) {
                  this.heroSubheadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroSubheadingStyle'];
                  this.heroHeadingStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroHeadingStyle'];
                  this.heroButtonStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroButtonStyle'];
                  this.heroBackgroundStyle = this.pageComponents['pages'][i]['components'][j]['style']['heroBackgroundStyle'];
                }
              }
            }
          }
        });
      }
    });

    this.heroThemeSubscription = this.builderHeroService.heroTheme.subscribe(response => {
      if (response) {
        this.heroTheme = response;
      }
    });

    this.heroThemesSubscription = this.builderHeroService.getHeroThemes().subscribe(response => {
      if (response) {
        this.heroThemes = response;
      }
    });

    this.heroTemplateSubscription = this.builderComponentsService.pageComponents.subscribe(templateResponse => {
      if (templateResponse) {
        this.heroTemplate = templateResponse['template'];

        this.defaultHeroStyleSubscription = this.templateService.getTemplateStyle(this.heroTemplate).subscribe(response => {
          if (response) {
            this.defaultHeroStyle = response[ActiveComponents.Hero];
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
    if (this.heroTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroTheme', this.heroTheme);
      this.builderHeroService.setHeroTheme(this.heroTheme);
      this.builderHeroService.heroTheme.next(this.heroTheme);
    }
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroBackgroundStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroBackgroundStyle', this.heroBackgroundStyle);
    this.builderHeroService.heroBackgroundStyle.next(this.heroBackgroundStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroHeadingStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroSubheadingStyle() {
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroButtonStyle() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
    this.websiteService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroTheme', ActiveThemes.Default);
    this.builderHeroService.heroTheme.next(ActiveThemes.Default);

    this.heroBackgroundStyle['background-color'] = this.defaultHeroStyle['style']['heroBackgroundStyle']['background-color'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroBackgroundStyle', this.heroBackgroundStyle);
    this.builderHeroService.heroBackgroundStyle.next(this.heroBackgroundStyle);

    this.heroHeadingStyle['color'] = this.defaultHeroStyle['style']['heroHeadingStyle']['color'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);

    this.heroSubheadingStyle['color'] = this.defaultHeroStyle['style']['heroSubheadingStyle']['color'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroSubheadingStyle', this.heroSubheadingStyle);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);

    this.heroButtonStyle['background-color'] = this.defaultHeroStyle['style']['heroButtonStyle']['background-color'];
    this.heroButtonStyle['color'] = this.defaultHeroStyle['style']['heroButtonStyle']['color'];
    this.heroButtonStyle['border-color'] = this.defaultHeroStyle['style']['heroButtonStyle']['border-color'];
    this.builderComponentsService.setPageComponentById(this.activeEditComponentId, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
  }

  ngOnDestroy() {
    this.heroBackgroundStyleSubscription.unsubscribe();
    this.heroHeadingStyleSubscription.unsubscribe();
    this.heroSubheadingStyleSubscription.unsubscribe();
    this.heroButtonStyleSubscription.unsubscribe();
    this.heroThemeSubscription.unsubscribe();
    this.heroThemesSubscription.unsubscribe();
    this.heroTemplateSubscription.unsubscribe();
    this.defaultHeroStyleSubscription.unsubscribe();
    this.websiteChangeCountSubscription.unsubscribe();
    this.builderComponentsSubscription.unsubscribe();
    this.activeEditComponentIdSubscription.unsubscribe();
  }
}
