import { Type } from '@angular/core';

export class BuilderSidebarItem {
  constructor(public component: Type<any>, public data: any) {}
}
