import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponents, ActiveComponentsFullSelector } from '../builder';
import { UtilService } from '../../../shared/services/util.service';

@Injectable()
export class BuilderComponentsService {
  pageComponents = new BehaviorSubject<any>({
    'pages': [
      {
        'name': 'Home',
        'components': [
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Navbar }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Hero }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Features }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Features }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Footer }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
        ]
      },
      {
        'name': 'About',
        'components': [
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Navbar }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Footer }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
        ]
      },
      {
        'name': 'Features',
        'components': [
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Navbar }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Footer }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
        ]
      },
      {
        'name': 'Contact',
        'components': [
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Navbar }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
          `${ ActiveComponentsFullSelector.Footer }`,
          `${ ActiveComponentsFullSelector.Placeholder }`,
        ]
      },
    ]
  });
  activeComponentIndex = new BehaviorSubject<number>(0);

  getComponentCleanName(componentSelectorName: string) {
    switch (componentSelectorName) {
      case ActiveComponentsFullSelector.Navbar:
        return UtilService.toTitleCase(ActiveComponents.Navbar);
      case ActiveComponentsFullSelector.Hero:
        return UtilService.toTitleCase(ActiveComponents.Hero);
      case ActiveComponentsFullSelector.Footer:
        return UtilService.toTitleCase(ActiveComponents.Footer);
      default:
        return UtilService.toTitleCase(ActiveComponents.Placeholder);
    }
  }
}
