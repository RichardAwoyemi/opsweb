import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActiveComponentsFullSelector } from '../builder';

@Injectable()
export class BuilderComponentService {
  builderComponents = new BehaviorSubject<string[]>([
    `${ ActiveComponentsFullSelector.Placeholder }`,
    `${ ActiveComponentsFullSelector.Navbar }`,
    `${ ActiveComponentsFullSelector.Placeholder }`,
    `${ ActiveComponentsFullSelector.Footer }`,
    `${ ActiveComponentsFullSelector.Placeholder }`,
  ]);
  activeComponentIndex = new BehaviorSubject<number>(0);
}
