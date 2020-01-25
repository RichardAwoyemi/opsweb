import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BuilderHeroService {
  heroHeadingStyle = new BehaviorSubject<Object>(null);
  heroSubheadingStyle = new BehaviorSubject<Object>(null);
  heroButtonStyle = new BehaviorSubject<Object>(null);
  heroImage = new BehaviorSubject<string>('default-hero.svg');

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private NAVBAR_THEME_PATH = './assets/data/web-themes/navbar.json';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getNavbarThemes(): Observable<any> {
    return this.httpClient.get(this.NAVBAR_THEME_PATH);
  }

  setHeroTemplate(templateId) {
    switch (templateId) {
      case ActiveTemplates.Default:
        this.httpClient.get(this.DEFAULT_TEMPLATE_PATH).subscribe(response => {
          this.setHeroTemplateStyle(response);
        });
        break;
      case ActiveTemplates.Quick:
        this.httpClient.get(this.QUICK_TEMPLATE_PATH).subscribe(response => {
          this.setHeroTemplateStyle(response);
        });
        break;
      case ActiveTemplates.Front:
        this.httpClient.get(this.FRONT_TEMPLATE_PATH).subscribe(response => {
          this.setHeroTemplateStyle(response);
        });
        break;
      default:
        break;
    }
  }

  setHeroThemeStyle() {
  }

  setHeroTemplateStyle(template: any) {
    this.heroHeadingStyle.next(template['heroHeadingStyle']);
    this.heroSubheadingStyle.next(template['heroSubheadingStyle']);
    this.heroButtonStyle.next(template['heroButtonStyle']);
    this.heroImage.next(`${ template['id'].toLowerCase() }-hero.svg`);
  }

  setComponentTemplate(templateId) {
    this.setHeroTemplate(templateId);
  }
}
