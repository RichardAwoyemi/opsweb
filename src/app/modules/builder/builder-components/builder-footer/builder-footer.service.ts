import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveComponentsPartialSelector, ActiveThemes } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../builder-components.service';
import { TemplateService } from '../../../../shared/services/template.service';

@Injectable()
export class BuilderFooterService {
  footerTemplate = new BehaviorSubject<string>(null);
  footerTheme = new BehaviorSubject<string>(null);
  footerStyle = new BehaviorSubject<any>(null);
  footerAlignmentClass = new BehaviorSubject<string>('text-center');
  footerSocialLinksContainerStyle = new BehaviorSubject<Object>(null);
  footerSocialLinksStyle = new BehaviorSubject<Object>(null);
  footerSocialLinks = new BehaviorSubject<any>(null);
  footerPageLinksStyle = new BehaviorSubject<Object>(null);
  footerCopyrightStyle = new BehaviorSubject<Object>(null);
  footerMenuOptions = new BehaviorSubject<any>([null]);
  footerComponentLayout = new BehaviorSubject<any>({ 'layout': 0 });

  private FOOTER_THEME_PATH = './assets/data/web-themes/footer.json';

  constructor(
    private templateService: TemplateService,
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService
  ) {
  }

  getFooterThemes(): Observable<any> {
    return this.httpClient.get(this.FOOTER_THEME_PATH);
  }

  setFooterTemplate(templateId: string) {
    this.templateService.getTemplateStyle(templateId).subscribe(response => {
      if (response) {
        const template = response['footer']['style'];
        this.setFooterTemplateStyle(template);
      }
    });
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

    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerTheme', footerStyle['name']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Footer, 'footerStyle', 'background-color', footerStyle['background-color']);
    this.builderComponentsService.setPageComponentsByNameAndKey(ActiveComponentsPartialSelector.Footer, 'footerStyle', 'color', footerStyle['color']);
    this.footerStyle.next(footerStyle);
  }

  setFooterTemplateStyle(template: any) {
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerTheme', ActiveThemes.Default);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerStyle', template['footerStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerSocialLinksStyle', template['footerSocialLinksStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerPageLinksStyle', template['footerPageLinksStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerCopyrightStyle', template['footerCopyrightStyle']);
    this.builderComponentsService.setPageComponentsByName(ActiveComponentsPartialSelector.Footer, 'footerSocialLinksContainerStyle', template['footerSocialLinksContainerStyle']);

    this.footerStyle.next(template['footerStyle']);
    this.footerSocialLinksStyle.next(template['footerSocialLinksStyle']);
    this.footerPageLinksStyle.next(template['footerPageLinksStyle']);
    this.footerCopyrightStyle.next(template['footerCopyrightStyle']);
    this.footerSocialLinksContainerStyle.next(template['footerSocialLinksContainerStyle']);
  }


  setFooterMenuOptions(pageName, pageIndex) {
    const footerMenuOptions = this.footerMenuOptions.getValue();
    footerMenuOptions[pageIndex]['page'] = pageName;
    this.footerMenuOptions.next(footerMenuOptions);
  }

  deleteFooterMenuOption(pageIndex: any) {
    const footerMenuOptions = this.footerMenuOptions.getValue();
    footerMenuOptions.splice(pageIndex, 1);
    this.footerMenuOptions.next(footerMenuOptions);
  }

  updateFooterMenuOptions(newPages = this.builderComponentsService.getPages(), oldPages = this.footerMenuOptions.getValue()) {
    const footerMenuOptions = [];
    for (let i = 0; i < newPages.length; i++) {
      let footerMenuOption = oldPages.filter(option => {
        let footerMenuOptionVisibility = false;
        if (option) {
          footerMenuOptionVisibility = option['page'] === newPages[i];
        }
        return footerMenuOptionVisibility;
      });
      if (footerMenuOption.length > 0) {
        footerMenuOption = footerMenuOption[0];
      } else {
        footerMenuOption = { 'page': newPages[i], 'visible': false };
      }
      footerMenuOptions.push(footerMenuOption);
    }
    this.footerMenuOptions.next(footerMenuOptions);
  }
}
