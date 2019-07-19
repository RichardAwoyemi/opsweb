import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Template } from '../models/template';

@Injectable()
export class TemplateService {
  static searchText: string;
  static selectedTemplates: Template[];
  static availableTemplates: Template[];
  selectedCategory: Subject<string> = new Subject<string>();
  selectedTemplate: Subject<Template> = new Subject<Template>();

  static parseTemplates(templates: Template[]) {
    let parsedTemplates = new Array<Template>();
    for (let i = 0; i < templates.length; i++) {
      parsedTemplates.push({
        id: templates[i].id,
        name: templates[i].name,
        description: templates[i].description
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
}
