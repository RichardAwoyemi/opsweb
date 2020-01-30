import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Template } from '../models/template';
import { ActiveTemplates } from '../../modules/builder/builder';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TemplateService {
  selectedTemplate: Subject<Template> = new Subject<Template>();

  static searchText: string;
  static selectedTemplates: Template[];
  static availableTemplates: Template[];
  private DEFAULT_TEMPLATE_PATH = './assets/data/web-templates/default.json';
  private QUICK_TEMPLATE_PATH = './assets/data/web-templates/business-1.json';
  private FRONT_TEMPLATE_PATH = './assets/data/web-templates/business-2.json';

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  static parseTemplates(templates: Template[]) {
    let parsedTemplates = new Array<Template>();
    for (let i = 0; i < templates.length; i++) {
      parsedTemplates.push({
        id: templates[i].id,
        name: templates[i].name
      });
    }
    return parsedTemplates;
  }

  getTemplate(templateId): Observable<any> {
    switch (templateId) {
      case ActiveTemplates.Default:
        return this.httpClient.get(this.DEFAULT_TEMPLATE_PATH);
      case ActiveTemplates.Quick:
        return this.httpClient.get(this.QUICK_TEMPLATE_PATH);
      case ActiveTemplates.Front:
        return this.httpClient.get(this.FRONT_TEMPLATE_PATH);
      default:
        return null;
    }
  }

  static parseAvailableTemplates(templates: Template[]) {
    this.availableTemplates = this.parseTemplates(templates);
  }

  static parseSelectedTemplates(templates: Template[]) {
    this.selectedTemplates = this.parseTemplates(templates);
  }
}
