import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponentsFullSelector } from '../builder';

@Injectable()
export class BuilderComponentService {
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
}
