import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveFooterThemes, ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BuilderFooterService {
  footerTemplate = new BehaviorSubject<string>(ActiveTemplates.Default);
  footerTheme = new BehaviorSubject<string>(null);
  footerStyle = new BehaviorSubject<Object>(null);

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private FOOTER_THEME_PATH = './assets/data/web-themes/footer.json';

  constructor(
    public httpClient: HttpClient
  ) {
  }

  getFooterThemes(): Observable<any> {
    return this.httpClient.get(this.FOOTER_THEME_PATH);
  }

  setFooterTemplate(templateId: string) {
    switch (templateId) {
      case ActiveTemplates.Default:
        this.httpClient.get(this.DEFAULT_TEMPLATE_PATH).subscribe(response => {
          this.setFooterTemplateStyle(response);
        });
        break;
      case ActiveTemplates.Quick:
        this.httpClient.get(this.QUICK_TEMPLATE_PATH).subscribe(response => {
          this.setFooterTemplateStyle(response);
        });
        break;
      case ActiveTemplates.Front:
        this.httpClient.get(this.FRONT_TEMPLATE_PATH).subscribe(response => {
          this.setFooterTemplateStyle(response);
        });
        break;
      default:
        break;
    }
  }

  setFooterTheme(themeId: string) {
    let response: any;
    switch (themeId) {
      case ActiveFooterThemes.Default:
        this.setFooterTemplate(this.footerTemplate.getValue());
        break;
      case ActiveFooterThemes.Stanley:
        this.httpClient.get(this.FOOTER_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveFooterThemes.Stanley;
          });
          this.setFooterTemplateStyle(response[0]);
        });
        break;
      default:
        break;
    }
  }

  setFooterThemeStyle(theme: any) {
    let footerStyle = this.footerStyle.getValue();
    if (footerStyle) {
      footerStyle = theme['footerStyle'];
    }
    this.footerStyle.next(footerStyle);
  }

  setFooterTemplateStyle(template: any) {
    this.footerStyle.next(template['footerStyle']);
  }
}
