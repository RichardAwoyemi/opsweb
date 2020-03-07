import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveTemplates, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../builder-components.service';

@Injectable()
export class BuilderFooterService {
  footerTemplate = new BehaviorSubject<string>(null);
  footerTheme = new BehaviorSubject<string>(null);
  footerStyle = new BehaviorSubject<Object>(null);
  footerAlignmentClass = new BehaviorSubject<string>('text-center');
  footerSocialLinksContainerStyle = new BehaviorSubject<Object>(null);
  footerSocialLinksStyle = new BehaviorSubject<Object>(null);
  footerPageLinksStyle = new BehaviorSubject<Object>(null);
  footerCopyrightStyle = new BehaviorSubject<Object>(null);
  footerMenuOptions = new BehaviorSubject<Object>(null);
  footerComponentLayout = new BehaviorSubject<any>({'layout': 0});
  facebookUrl = new BehaviorSubject<string>(null);
  twitterUrl = new BehaviorSubject<string>(null);
  instagramUrl = new BehaviorSubject<string>(null);
  youtubeUrl = new BehaviorSubject<string>(null);
  githubUrl = new BehaviorSubject<string>(null);
  linkedinUrl = new BehaviorSubject<string>(null);

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private FOOTER_THEME_PATH = './assets/data/web-themes/footer.json';

  constructor(
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService
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
      case ActiveThemes.Default:
        this.setFooterThemeStyle(this.footerTemplate.getValue());
        break;
      case ActiveThemes.Stanley:
        this.httpClient.get(this.FOOTER_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name === ActiveThemes.Stanley;
          });
          this.setFooterThemeStyle(response[0]);
        });
        break;
      default:
        break;
    }
  }

  setFooterThemeStyle(theme: any) {
    let footerStyle = this.footerStyle.getValue();
    if (footerStyle && theme['footerStyle']['background-color']) {
      footerStyle['background-color'] = theme['footerStyle']['background-color'];
    } else {
      footerStyle = theme['footerStyle'];
    }
    if (footerStyle && theme['footerStyle']['color']) {
      footerStyle['color'] = theme['footerStyle']['color'];
    } else {
      footerStyle = theme['footerStyle'];
    }
    this.footerStyle.next(footerStyle);

    const pageComponents = this.builderComponentsService.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Footer) {
          pageComponents['pages'][i]['components'][j]['footerStyle']['background-color'] = footerStyle['footerStyle']['background-color'];
          pageComponents['pages'][i]['components'][j]['footerStyle']['color'] = footerStyle['footerStyle']['color'];

        }
      }
    }
    this.builderComponentsService.pageComponents.next(pageComponents);
  }

  setFooterTemplateStyle(template: any) {
    this.footerStyle.next(template['footerStyle']);
    this.footerSocialLinksStyle.next(template['footerSocialLinksStyle']);
    this.footerPageLinksStyle.next(template['footerPageLinksStyle']);
    this.footerCopyrightStyle.next(template['footerCopyrightStyle']);
    this.footerSocialLinksContainerStyle.next(template['footerSocialLinksContainerStyle']);

    const pageComponents = this.builderComponentsService.pageComponents.getValue();
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents['pages'][i]['components'][j]['componentName'] === ActiveComponentsPartialSelector.Footer) {
          pageComponents['pages'][i]['components'][j]['footerStyle'] = template['footerStyle'];
          pageComponents['pages'][i]['components'][j]['footerSocialLinksStyle'] = template['footerSocialLinksStyle'];
          pageComponents['pages'][i]['components'][j]['footerPageLinksStyle'] = template['footerPageLinksStyle'];
          pageComponents['pages'][i]['components'][j]['footerCopyrightStyle'] = template['footerCopyrightStyle'];
          pageComponents['pages'][i]['components'][j]['footerSocialLinksContainerStyle'] = template['footerSocialLinksContainerStyle'];
        }
      }
    }
    this.builderComponentsService.pageComponents.next(pageComponents);
  }

  getDefaultFooterStyle(templateId): Observable<any> {
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

  sortFooterMenuOptions(unsortedFooterMenuOptions, navbarMenuOptions) {
    const sortedFooterMenuOptions = {};
    if (unsortedFooterMenuOptions && navbarMenuOptions) {
      Object.keys(unsortedFooterMenuOptions)
        .sort((a, b) => {
          return navbarMenuOptions.indexOf(a) - navbarMenuOptions.indexOf(b);
        }).forEach(r => sortedFooterMenuOptions[r] = unsortedFooterMenuOptions[r]);
    }
    return sortedFooterMenuOptions;
  }

  setComponentTemplate(templateId) {
    this.footerTheme.next(ActiveThemes.Default);
    this.footerTemplate.next(templateId);
    this.setFooterTemplate(templateId);
  }

  setFooterMenuOptions(pageName, pageIndex, navbarMenuOptions) {
    let footerMenuOptions = this.footerMenuOptions.getValue();
    if (footerMenuOptions) {
      footerMenuOptions[pageName] = footerMenuOptions[navbarMenuOptions[pageIndex]];
      const keys = Object.keys(footerMenuOptions);
      delete footerMenuOptions[keys[pageIndex]];
      footerMenuOptions = this.sortFooterMenuOptions(footerMenuOptions, navbarMenuOptions);
      this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerMenuOptions', footerMenuOptions);
      this.footerMenuOptions.next(footerMenuOptions);
    }
  }
}
