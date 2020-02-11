import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveHeadingThemes, ActiveTemplates } from '../../builder';
import { HttpClient } from '@angular/common/http';
import { BuilderService } from '../../builder.service';
import { UtilService } from '../../../../shared/services/util.service';

@Injectable()
export class BuilderHeadingService {
  headingHeaderStyle = new BehaviorSubject<Object>({});
  headingSubheaderStyle = new BehaviorSubject<Object>({});
  headingStyle = new BehaviorSubject<Object>({});
  headingTemplate = new BehaviorSubject<string>(null);
  headingTheme = new BehaviorSubject<string>(null);
  headingContainerClass = new BehaviorSubject<string>(null);
  headingContainerStyle = new BehaviorSubject<string>(null);
  headingItemArray = new BehaviorSubject<Object>({});
  headingAlignmentClass = new BehaviorSubject<string>('text-center');
  headingSocialLinksContainerStyle = new BehaviorSubject<Object>(null);
  headingSocialLinksStyle = new BehaviorSubject<Object>(null);
  headingPageLinksStyle = new BehaviorSubject<Object>(null);
  headingCopyrightStyle = new BehaviorSubject<Object>(null);
  headingMenuOptions = new BehaviorSubject<Object>(null);
  headingComponentLayout = new BehaviorSubject<number>(0);
  headingButtonStyle = new BehaviorSubject<string>(null);
  headingSubheaderCondition = new BehaviorSubject<boolean>(null);
  headingButtonCondition = new BehaviorSubject<boolean>(null);
  headingBackgroundImageUrl = new BehaviorSubject<string>(null);
  headingBackgroundImageStyle = new BehaviorSubject<string>(null);
  headingBackgroundImageAlt = new BehaviorSubject<string>(null);
  headingBackgroundColor = new BehaviorSubject<Object>({});
  headingBackgroundStyle = new BehaviorSubject<Object>({});

  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';
  private HEADING_THEME_PATH = './assets/data/web-themes/heading.json';

  constructor(
    private httpClient: HttpClient,
    private builderService: BuilderService,
    private utilService: UtilService
  ) {
  }

  getHeadingThemes(): Observable<any> {
    return this.httpClient.get(this.HEADING_THEME_PATH);
  }

  setHeadingTheme(themeId: string, componentId: string) {
    let response: any;
    switch (themeId) {
      case ActiveHeadingThemes.Default:
        this.builderService.postMessage('update-heading', '', 'set-heading-theme', this.headingTemplate.getValue());
        break;
      case ActiveHeadingThemes.Stanley:
        this.httpClient.get(this.HEADING_THEME_PATH).subscribe((themes: Array<any>) => {
          response = themes.filter(theme => {
            return theme.name == ActiveHeadingThemes.Stanley;
          });
          this.builderService.postMessage('update-heading', componentId, 'set-heading-theme', response[0]);
        });
        break;
      default:
        break;
    }
  }

  getDefaultHeadingStyle(templateId): Observable<any> {
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

  setComponentTemplate(templateId) {
    this.headingTheme.next(ActiveHeadingThemes.Default);
    this.headingTemplate.next(templateId);
  }

  resetBackgroundOpacity() {
    let newStyle = this.headingStyle.getValue();
    let backgroundColor = newStyle['background-color'];
    backgroundColor = this.utilService.hexToRgbA(backgroundColor).replace(/(?<=\,)([^,]*)(?=\))/, '0');
    newStyle['background-color'] = backgroundColor;
    this.headingStyle.next(newStyle);
  }

}
