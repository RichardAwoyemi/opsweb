import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { BuilderSidebarElementDirective } from './builder-sidebar-element.directive';
import { BuilderSidebarItem } from './builder-sidebar-items';

@Component({
  selector: 'app-sidebar-element',
  template: `<ng-template sidebar-element-host></ng-template>`
})
export class BuilderSidebarElementComponent implements OnInit {
  @Input() element: BuilderSidebarItem;
  @Input() baseData: any;
  @ViewChild(BuilderSidebarElementDirective, {static: true}) sidebarElementHost: BuilderSidebarElementDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
    ) {
    }

  ngOnInit() {
    this.loadComponent();
  }

  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.element.component);
    const viewContainerRef = this.sidebarElementHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance).data = this.baseData;
    (componentRef.instance).elementSettings = this.element.elementInfo;
  }
}
