import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../builder-components.service';

@Injectable()
export class BuilderHeroService {
  heroHeadingStyle = new BehaviorSubject<Object>(null);
  heroBackgroundStyle = new BehaviorSubject<Object>(null);
  heroSubheadingStyle = new BehaviorSubject<Object>(null);
  heroButtonStyle = new BehaviorSubject<Object>(null);
  heroButtonLink = new BehaviorSubject<string>(null);
  heroImageStyle = new BehaviorSubject<Object>(null);
  heroTemplate = new BehaviorSubject<string>(null);
  heroTheme = new BehaviorSubject<string>(null);
  heroImageSize = new BehaviorSubject<number>(100);
  heroImageUrl = new BehaviorSubject<string>(null);
  heroImageAlt = new BehaviorSubject<string>(null);
  heroHeadingText = new BehaviorSubject<string>(null);
  heroSubheadingText = new BehaviorSubject<string>(null);
  heroButtonText = new BehaviorSubject<string>(null);
  heroComponentLayout = new BehaviorSubject<number>(null);

  private HERO_THEME_PATH = './assets/data/web-themes/hero.json';

  constructor(
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  getHeroThemes(): Observable<any> {
    return this.httpClient.get(this.HERO_THEME_PATH);
  }

  setHeroTheme(themeId: string) {
    let response: any;
    switch (themeId) {
      case ActiveThemes.Default:
        this.setHeroThemeStyle(this.heroTemplate.getValue());
        break;
      case ActiveThemes.Stanley:
        this.httpClient.get(this.HERO_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name === ActiveThemes.Stanley;
          });
          this.setHeroThemeStyle(response[0]);
        });
        break;
      default:
        break;
    }
  }

  setHeroThemeStyle(theme: any) {
    let heroBackgroundStyle = this.heroBackgroundStyle.getValue();
    let heroHeadingStyle = this.heroHeadingStyle.getValue();
    let heroSubheadingStyle = this.heroSubheadingStyle.getValue();
    let heroButtonStyle = this.heroButtonStyle.getValue();

    if (heroBackgroundStyle && theme['heroBackgroundStyle']['background-color']) {
      heroBackgroundStyle['background-color'] = theme['heroBackgroundStyle']['background-color'];
    } else {
      heroBackgroundStyle = theme['heroBackgroundStyle'];
    }
    if (heroHeadingStyle && theme['heroHeadingStyle']['color']) {
      heroHeadingStyle['color'] = theme['heroHeadingStyle']['color'];
    } else {
      heroHeadingStyle = theme['heroHeadingStyle'];
    }
    if (heroSubheadingStyle && theme['heroSubheadingStyle']['color']) {
      heroSubheadingStyle['color'] = theme['heroSubheadingStyle']['color'];
    } else {
      heroSubheadingStyle = theme['heroSubheadingStyle'];
    }
    if (heroButtonStyle && theme['heroButtonStyle']['background-color']) {
      heroButtonStyle['background-color'] = theme['heroButtonStyle']['background-color'];
    } else {
      heroButtonStyle = theme['heroButtonStyle'];
    }
    if (heroButtonStyle && theme['heroButtonStyle']['border-color']) {
      heroButtonStyle['border-color'] = theme['heroButtonStyle']['border-color'];
    } else {
      heroButtonStyle = theme['heroButtonStyle'];
    }
    if (heroButtonStyle && theme['heroButtonStyle']['color']) {
      heroButtonStyle['color'] = theme['heroButtonStyle']['color'];
    } else {
      heroButtonStyle = theme['heroButtonStyle'];
    }

    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Hero, 'heroTheme', theme['name']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Hero, 'heroBackgroundStyle', 'background-color', theme['heroBackgroundStyle']['background-color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Hero, 'heroHeadingStyle', 'color', theme['heroHeadingStyle']['color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Hero, 'heroSubheadingStyle', 'color', theme['heroSubheadingStyle']['color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', 'background-color', theme['heroButtonStyle']['background-color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', 'border-color', theme['heroButtonStyle']['border-color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Hero, 'heroButtonStyle', 'color', theme['heroButtonStyle']['color']);

    this.heroBackgroundStyle.next(heroBackgroundStyle);
    this.heroHeadingStyle.next(heroHeadingStyle);
    this.heroSubheadingStyle.next(heroSubheadingStyle);
    this.heroButtonStyle.next(heroButtonStyle);
  }
}
