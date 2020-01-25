import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveNavbarThemes, ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BuilderNavbarService {
  navbarLogoImage = new BehaviorSubject<string>(null);
  navbarLogoText = new BehaviorSubject<string>('Logo');
  navbarLogoImageStyle = new BehaviorSubject<Object>(null);
  navbarTemplate = new BehaviorSubject<string>(null);
  navbarTheme = new BehaviorSubject<string>(null);
  navbarStyle = new BehaviorSubject<Object>(null);
  navbarLinkStyle = new BehaviorSubject<Object>(null);
  navbarBrandStyle = new BehaviorSubject<Object>(null);
  navbarLayoutClass = new BehaviorSubject<Object>(null);
  navbarMenuOptions = new BehaviorSubject<Array<String>>(['Home', 'About', 'Features', 'Contact']);

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private NAVBAR_THEME_PATH = './assets/data/web-themes/navbar.json';

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getNavbarThemes(): Observable<any> {
    return this.httpClient.get(this.NAVBAR_THEME_PATH);
  }

  setNavbarTemplate(templateId: string) {
    switch (templateId) {
      case ActiveTemplates.Default:
        this.httpClient.get(this.DEFAULT_TEMPLATE_PATH).subscribe(response => {
          this.setNavbarTemplateStyle(response);
        });
        break;
      case ActiveTemplates.Quick:
        this.httpClient.get(this.QUICK_TEMPLATE_PATH).subscribe(response => {
          this.setNavbarTemplateStyle(response);
        });
        break;
      case ActiveTemplates.Front:
        this.httpClient.get(this.FRONT_TEMPLATE_PATH).subscribe(response => {
          this.setNavbarTemplateStyle(response);
        });
        break;
      default:
        break;
    }
  }

  setNavbarTheme(themeId: string) {
    let response: any;
    switch (themeId) {
      case ActiveNavbarThemes.Default:
        this.setNavbarTemplate(this.navbarTemplate.getValue());
        break;
      case ActiveNavbarThemes.Stanley:
        this.httpClient.get(this.NAVBAR_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveNavbarThemes.Stanley;
          });
          this.setNavbarThemeStyle(response[0]);
        });
        break;
      default:
        break;
    }
  }

  getDefaultNavbarStyle(templateId): Observable<any> {
    switch (templateId) {
      case ActiveTemplates.Default:
        return this.httpClient.get(this.DEFAULT_TEMPLATE_PATH);
      case ActiveTemplates.Quick:
        return this.httpClient.get(this.QUICK_TEMPLATE_PATH);
      case ActiveTemplates.Front:
        return this.httpClient.get(this.FRONT_TEMPLATE_PATH);
      default:
        return this.httpClient.get(this.DEFAULT_TEMPLATE_PATH);
    }
  }

  setNavbarThemeStyle(theme: any) {
    let navbarStyle = this.navbarStyle.getValue();
    let navbarLinkStyle = this.navbarLinkStyle.getValue();
    let navbarBrandStyle = this.navbarBrandStyle.getValue();

    if (navbarStyle && theme['navbarStyle']['background-color']) {
      navbarStyle['background-color'] = theme['navbarStyle']['background-color'];
    } else {
      navbarStyle = theme['navbarStyle'];
    }

    if (navbarLinkStyle && theme['navbarLinkStyle']['color']) {
      navbarLinkStyle['color'] = theme['navbarLinkStyle']['color'];
    } else {
      navbarLinkStyle = theme['navbarLinkStyle'];
    }

    if (navbarBrandStyle && theme['navbarBrandStyle']['color']) {
      navbarBrandStyle['color'] = theme['navbarBrandStyle']['color'];
    } else {
      navbarBrandStyle = theme['navbarBrandStyle'];
    }

    this.navbarStyle.next(navbarStyle);
    this.navbarLinkStyle.next(navbarLinkStyle);
    this.navbarBrandStyle.next(navbarBrandStyle);
  }

  setNavbarTemplateStyle(template: any) {
    this.navbarStyle.next(template['navbarStyle']);
    this.navbarLinkStyle.next(template['navbarLinkStyle']);
    this.navbarBrandStyle.next(template['navbarBrandStyle']);
    this.navbarLogoImageStyle.next(template['navbarLogoImageStyle']);
  }

  setComponentTemplate(templateId) {
    this.navbarTheme.next(ActiveNavbarThemes.Default);
    this.navbarTemplate.next(templateId);
    this.setNavbarTemplate(templateId);
  }
}
