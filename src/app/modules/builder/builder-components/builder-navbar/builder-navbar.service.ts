import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../builder-components.service';
import { UtilService } from '../../../../shared/services/util.service';
import { TemplateService } from '../../../../shared/services/template.service';

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
  navbarMenuOptions = new BehaviorSubject<any>(null);

  private NAVBAR_THEME_PATH = './assets/data/web-themes/navbar.json';

  constructor(
    private templateService: TemplateService,
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  getNavbarThemes(): Observable<any> {
    return this.httpClient.get(this.NAVBAR_THEME_PATH);
  }

  setNavbarTemplate(templateId: string) {
    this.templateService.getTemplateStyle(templateId).subscribe(response => {
      if (response) {
        const template = response['navbar']['style'];
        this.setNavbarTemplateStyle(template);
      }
    });
  }

  setNavbarTheme(themeId: string) {
    let response: any;
    switch (themeId) {
      case ActiveThemes.Default:
        this.setNavbarTemplate(this.navbarTemplate.getValue());
        break;
      case ActiveThemes.Stanley:
        this.httpClient.get(this.NAVBAR_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name === ActiveThemes.Stanley;
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

    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarTheme', theme['name']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Navbar, 'navbarStyle', 'background-color', theme['navbarStyle']['background-color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', 'color', theme['navbarLinkStyle']['color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', 'color', theme['navbarBrandStyle']['color']);

    this.navbarStyle.next(navbarStyle);
    this.navbarLinkStyle.next(navbarLinkStyle);
    this.navbarBrandStyle.next(navbarBrandStyle);
  }

  setNavbarTemplateStyle(template: any) {

    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarTheme', ActiveThemes.Default);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarStyle', template['navbarStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLinkStyle', template['navbarLinkStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarBrandStyle', template['navbarBrandStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Navbar, 'navbarLogoImageStyle', template['navbarLogoImageStyle']);

    this.navbarStyle.next(template['navbarStyle']);
    this.navbarLinkStyle.next(template['navbarLinkStyle']);
    this.navbarBrandStyle.next(template['navbarBrandStyle']);
    this.navbarLogoImageStyle.next(template['navbarLogoImageStyle']);
  }

  setNavbarMenuOptions(pageName, pageIndex) {
    const navbarMenuOptions = this.navbarMenuOptions.getValue();
    for (let i = 0; i < navbarMenuOptions.length; i++) {
      if (i === pageIndex) {
        this.navbarMenuOptions[i] = UtilService.toTitleCase(pageName);
      }
    }
    this.navbarMenuOptions.next(navbarMenuOptions);
  }

  deleteNavbarMenuOption(pageIndex) {
    const navbarMenuOptions = this.navbarMenuOptions.getValue();
    navbarMenuOptions.splice(pageIndex, 1);
    this.navbarMenuOptions.next(navbarMenuOptions);
  }
}
