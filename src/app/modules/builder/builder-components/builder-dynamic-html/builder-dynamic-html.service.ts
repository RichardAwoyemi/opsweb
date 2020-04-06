import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Injector
} from '@angular/core';
import { BuilderDynamicHtmlOptions, OnMount } from './builder-dynamic-html.interface';

export interface BuilderDynamicHtmlInterface {
  check: () => void;
  destroy: () => void;
}

function isBrowserPlatform() {
  return window != null && window.document != null;
}

@Injectable()
export class BuilderDynamicHtmlService {
  private componentFactories = new Map<string, ComponentFactory<any>>();
  private componentRefs = new Map<any, Array<ComponentRef<any>>>();

  constructor(private options: BuilderDynamicHtmlOptions, private cfr: ComponentFactoryResolver, private injector: Injector) {
    this.options.components.forEach(({ selector, component }) => {
      let cf: ComponentFactory<any>;
      cf = this.cfr.resolveComponentFactory(component);
      this.componentFactories.set(selector, cf);
    });
  }

  renderInnerHTML(elementRef: ElementRef, html: string): BuilderDynamicHtmlInterface {
    if (!isBrowserPlatform()) {
      return {
        check: () => {
        },
        destroy: () => {
        },
      };
    }
    elementRef.nativeElement.innerHTML = html;

    const componentRefs: Array<ComponentRef<any>> = [];
    this.options.components.forEach(({ selector }) => {
      const elements = (elementRef.nativeElement as Element).querySelectorAll(selector);
      Array.prototype.forEach.call(elements, (el: Element) => {
        const content = el.innerHTML;
        const cmpRef = this.componentFactories.get(selector).create(this.injector, [], el);

        el.removeAttribute('ng-version');

        if (cmpRef.instance.dynamicOnMount) {
          const attrsMap = new Map<string, string>();
          if (el.hasAttributes()) {
            Array.prototype.forEach.call(el.attributes, (attr: Attr) => {
              attrsMap.set(attr.name, attr.value);
            });
          }
          (cmpRef.instance as OnMount).dynamicOnMount(attrsMap, content, el);
        }

        componentRefs.push(cmpRef);
      });
    });
    this.componentRefs.set(elementRef, componentRefs);
    return {
      check: () => componentRefs.forEach(ref => ref.changeDetectorRef.detectChanges()),
      destroy: () => {
        componentRefs.forEach(ref => ref.destroy());
        this.componentRefs.delete(elementRef);
      },
    };
  }
}
