import { Injectable } from '@angular/core';
import { BuilderComponentsDataService } from '../../modules/builder/builder-components/builder-components-data.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Template } from '../models/template';
import {
  ActiveComponents,
  ActiveComponentsPartialSelector,
  ActiveTemplates,
  ActiveThemes
} from '../../modules/builder/builder';
import { HttpClient } from '@angular/common/http';
import { BuilderComponentsService } from '../../modules/builder/builder-components/builder-components.service';
import { UtilService } from './util.service';

@Injectable()
export class TemplateService {
  static selectedTemplates: Template[];
  static availableTemplates: Template[];
  activeTemplate = new BehaviorSubject<Object>(null);
  selectedTemplate: Subject<Template> = new Subject<Template>();
  private placeholder =
    {
      'componentType': ActiveComponents.Placeholder,
      'componentName': ActiveComponentsPartialSelector.Placeholder,
      'timestamp': new Date().getTime()
    };
  private TEMPLATE_FOLDER = './assets/data/web-templates/';
  private PAGE_STRUCTURES_FOLDER = './assets/data/web-page-structures/';

  constructor(
    private httpClient: HttpClient,
    private builderComponentsService: BuilderComponentsService,
    private builderComponentsDataService: BuilderComponentsDataService
  ) {
  }

  static parseTemplates(templates: Template[]) {
    const parsedTemplates = new Array<Template>();
    for (let i = 0; i < templates.length; i++) {
      parsedTemplates.push({
        id: templates[i].id,
        name: templates[i].name
      });
    }
    return parsedTemplates;
  }

  static parseAvailableTemplates(templates: Template[]) {
    this.availableTemplates = this.parseTemplates(templates);
  }

  static parseSelectedTemplates(templates: Template[]) {
    this.selectedTemplates = this.parseTemplates(templates);
  }

  async getRequestedJson(path: string): Promise<any> {
    return await this.httpClient.get(path).toPromise();
  }

  async getWebsite(templateId: string, structureId: string = 'default'): Promise<any> {
    let pageComponents = {};
    let styleTemplate = {};
    await this.getRequestedJson(`${this.PAGE_STRUCTURES_FOLDER}${structureId}.json`).then(async response => {
      pageComponents = response;
      await this.getRequestedJson(`${this.TEMPLATE_FOLDER}${templateId}.json`).then(async styleResponse => {
        styleTemplate = styleResponse;
        pageComponents['template'] = templateId;
        pageComponents = this.generatePagePlaceholders(pageComponents);
        pageComponents = this.generatePageComponents(pageComponents, styleTemplate);
        this.builderComponentsService.pageComponents.next(pageComponents);
        return await Promise.resolve(pageComponents);
      });
      return await Promise.resolve(pageComponents);
    });
    return await Promise.resolve(pageComponents);
  }

  getComponent(tempComponentName: string, template, index: number = null, pageComponents = null) {
    let pages = {};
    const componentName = UtilService.toTitleCase(tempComponentName);
    (pageComponents == null) ? pages = this.builderComponentsService.pageComponents.getValue() : pages = pageComponents;
    return {
      ...(index == null ? {} : { 'componentIndex': index }),
      'componentType': ActiveComponents[componentName],
      'componentId': `${ActiveComponents[componentName]}-${UtilService.generateRandomString(8)}`,
      [`${ActiveComponents[componentName]}Theme`]: ActiveThemes.Default,
      'componentName': ActiveComponentsPartialSelector[componentName],
      'style': template[ActiveComponents[componentName]]['style'],
      'timestamp': new Date().getTime(),
      ...template[ActiveComponents[componentName]]['details'],
      ...(typeof this.builderComponentsDataService[`getAdditional${componentName}Details`] === 'function' ? this.builderComponentsDataService[`getAdditional${componentName}Details`](pages) : {}),
      ...(typeof BuilderComponentsDataService[`getAdditional${componentName}Details`] === 'function' ? BuilderComponentsDataService[`getAdditional${componentName}Details`](pages) : {})
    };
  }

  updateTemplate(templateId) {
    if (Object.values(ActiveTemplates).includes(templateId)) {
      this.httpClient.get(`${this.TEMPLATE_FOLDER}${templateId}.json`).subscribe(response => {
        if (response) {
          const newStyle = response;
          const pageComponents = this.builderComponentsService.pageComponents.getValue();
          pageComponents['template'] = templateId;
          for (let i = 0; i < pageComponents['pages'].length; i++) {
            for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
              if (pageComponents.pages[i].components[j]['style']) {
                pageComponents.pages[i].components[j]['style'] = JSON.parse(JSON.stringify(newStyle[pageComponents.pages[i].components[j].componentType]['style']));
              }
            }
          }
          this.builderComponentsService.pageComponents.next(pageComponents);
        }
      });
    }
  }

  getTemplateStyle(templateId): Observable<any> {
    if (Object.values(ActiveTemplates).includes(templateId)) {
      return this.httpServiceRequest(`${this.TEMPLATE_FOLDER}${templateId}.json`);
    } else {
      return null;
    }
  }

  generatePagePlaceholders(pageComponents): any {
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = pageComponents['pages'][i]['components'].length; j >= 0; j--) {
        const placeholder = {
          ...this.placeholder,
          ...{ 'componentIndex': j * 2 },
          'componentId': `${ActiveComponents.Placeholder}-${UtilService.generateRandomString(8)}`
        };
        pageComponents['pages'][i]['components'].splice(j, 0, placeholder);
      }
    }
    return pageComponents;
  }

  private generatePageComponents(pageComponents, template = null) {
    for (let i = 0; i < pageComponents['pages'].length; i++) {
      for (let j = 0; j < pageComponents['pages'][i]['components'].length; j++) {
        if (pageComponents.pages[i].components[j]['componentType'] !== ActiveComponents.Placeholder) {
          const componentName = UtilService.toTitleCase(pageComponents.pages[i].components[j]);
          pageComponents.pages[i].components[j] = this.getComponent(componentName, template, j, pageComponents);
        }
      }
    }
    return pageComponents;
  }

  private httpServiceRequest(location): Observable<any> {
    return this.httpClient.get(location);
  }
}
