import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sidebar-element-host]',
})

export class BuilderSidebarElementDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
