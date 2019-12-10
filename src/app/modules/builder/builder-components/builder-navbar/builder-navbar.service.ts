import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveNavbarThemes, ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BuilderNavbarService {
  navbarLogoImage = new BehaviorSubject<string>(null);
  navbarLogoText = new BehaviorSubject<string>('Logo');
  navbarLogoImageStyle = new BehaviorSubject<Object>({ 'height': '50px' });
  navbarTemplate = new BehaviorSubject<string>(ActiveTemplates.Default);
  navbarTheme = new BehaviorSubject<string>(null);
  navbarStyle = new BehaviorSubject<Object>({ 'padding': '1em' });
  navbarLinkStyle = new BehaviorSubject<Object>(null);
  navbarBrandStyle = new BehaviorSubject<Object>(null);
  navbarLayoutClass = new BehaviorSubject<Object>(null);
  navbarMenuOptions = new BehaviorSubject<Array<String>>(['Home', 'About', 'Features', 'Contact']);

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private NAVBAR_THEME_PATH = './assets/data/web-themes/navbar.json';

  constructor(
    public httpClient: HttpClient
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

  setNavbarThemeStyle(theme: any) {
    let navbarStyle = this.navbarStyle.getValue();
    let navbarLinkStyle = this.navbarLinkStyle.getValue();
    let navbarBrandStyle = this.navbarBrandStyle.getValue();
    let navbarLogoImageStyle = this.navbarLogoImageStyle.getValue();

    if (navbarStyle) {
      navbarStyle['background-color'] = theme['navbarStyle']['background-color'];
    } else {
      navbarStyle = theme['navbarStyle'];
    }

    if (navbarLinkStyle) {
      navbarLinkStyle['color'] = theme['navbarLinkStyle']['color'];
    } else {
      navbarLinkStyle = theme['navbarLinkStyle'];
    }

    if (navbarBrandStyle) {
      navbarBrandStyle['color'] = theme['navbarBrandStyle']['color'];
    } else {
      navbarBrandStyle = theme['navbarBrandStyle'];
    }

    if (navbarLogoImageStyle) {
      navbarLogoImageStyle['height'] = theme['navbarHeightStyle']['height'];
    }

    this.navbarStyle.next(navbarStyle);
    this.navbarLinkStyle.next(navbarLinkStyle);
    this.navbarBrandStyle.next(navbarBrandStyle);
    this.navbarLogoImageStyle.next(navbarLogoImageStyle);
  }

  setNavbarTemplateStyle(template: any) {
    this.navbarStyle.next(template['navbarStyle']);
    this.navbarLinkStyle.next(template['navbarLinkStyle']);
    this.navbarBrandStyle.next(template['navbarBrandStyle']);
    this.navbarLogoImageStyle.next(template['navbarLogoImageStyle']);
  }
}
