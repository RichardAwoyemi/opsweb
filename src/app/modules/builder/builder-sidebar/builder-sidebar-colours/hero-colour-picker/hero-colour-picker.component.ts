import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuilderService } from '../../../builder.service';
import { BuilderHeroService } from '../../../builder-components/builder-hero/builder-hero.service';
import { ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../../builder';
import { BuilderComponentsService } from '../../../builder-components/builder-components.service';

@Component({
  selector: 'app-hero-colour-picker',
  templateUrl: './hero-colour-picker.component.html'
})
export class HeroColourPickerComponent implements OnInit, OnDestroy {
  heroBackgroundStyle: any = {
    'color': '#FFF'
  };
  heroHeadingStyle: any = {
    'color': '#323d47'
  };
  heroSubheadingStyle: any = {
    'color': '#757575'
  };
  heroButtonStyle: any = {
    'border-color': '#2055EC',
    'background-color': '#2055EC',
    'color': '#FFFFFF'
  };
  heroTemplate: string = ActiveTemplates.Default;
  heroTheme: string = ActiveThemes.Default;
  heroThemes: any;
  websiteChangeCount: number;
  defaultHeroStyle: any;
  pageComponents: any;

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

  constructor(
    private builderHeroService: BuilderHeroService,
    private builderComponentsService: BuilderComponentsService,
    private builderService: BuilderService
  ) {
  }

  ngOnInit() {
    this.heroBackgroundStyleSubscription = this.builderHeroService.heroBackgroundStyle.subscribe(response => {
      if (response) {
        this.heroBackgroundStyle = response;
      }
    });

    this.heroHeadingStyleSubscription = this.builderHeroService.heroHeadingStyle.subscribe(response => {
      if (response) {
        this.heroHeadingStyle = response;
      }
    });

    this.heroSubheadingStyleSubscription = this.builderHeroService.heroSubheadingStyle.subscribe(response => {
      if (response) {
        this.heroSubheadingStyle = response;
      }
    });

    this.heroButtonStyleSubscription = this.builderHeroService.heroButtonStyle.subscribe(response => {
      if (response) {
        this.heroButtonStyle = response;
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

    this.heroTemplateSubscription = this.builderHeroService.heroTemplate.subscribe(heroTemplateResponse => {
      if (heroTemplateResponse) {
        this.heroTemplate = heroTemplateResponse;

        this.defaultHeroStyleSubscription = this.builderHeroService.getDefaultHeroStyle(this.heroTemplate).subscribe(response => {
          if (response) {
            this.defaultHeroStyle = response;
          }
        });
      }
    });

    this.builderComponentsSubscription = this.builderComponentsService.pageComponents.subscribe(response => {
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
    if (this.heroTheme === ActiveThemes.Default) {
      this.resetToDefault();
    } else {
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroTheme', this.heroTheme);
      this.builderHeroService.setHeroTheme(this.heroTheme);
      this.builderHeroService.heroTheme.next(this.heroTheme);
    }
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroBackgroundStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroBackgroundStyle', this.heroBackgroundStyle);
    this.builderHeroService.heroBackgroundStyle.next(this.heroBackgroundStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroHeadingStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', this.heroHeadingStyle);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroSubheadingStyle() {
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  setHeroButtonStyle() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', this.heroButtonStyle);
    this.builderHeroService.heroButtonStyle.next(this.heroButtonStyle);
    this.builderService.setWebsiteChangeCount(this.websiteChangeCount, 1);
  }

  resetToDefault() {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroTheme', ActiveThemes.Default);
    this.builderHeroService.heroTheme.next(ActiveThemes.Default);

    this.heroBackgroundStyle['background-color'] = this.defaultHeroStyle['heroBackgroundStyle']['background-color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroBackgroundStyle', ActiveThemes.Default);
    this.builderHeroService.heroBackgroundStyle.next(this.heroBackgroundStyle);

    this.heroHeadingStyle['color'] = this.defaultHeroStyle['heroHeadingStyle']['color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', ActiveThemes.Default);
    this.builderHeroService.heroHeadingStyle.next(this.heroHeadingStyle);

    this.heroSubheadingStyle['color'] = this.defaultHeroStyle['heroSubheadingStyle']['color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', ActiveThemes.Default);
    this.builderHeroService.heroSubheadingStyle.next(this.heroSubheadingStyle);

    this.heroButtonStyle['background-color'] = this.defaultHeroStyle['heroButtonStyle']['background-color'];
    this.heroButtonStyle['color'] = this.defaultHeroStyle['heroButtonStyle']['color'];
    this.heroButtonStyle['border-color'] = this.defaultHeroStyle['heroButtonStyle']['border-color'];
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', ActiveThemes.Default);
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
  }
}
