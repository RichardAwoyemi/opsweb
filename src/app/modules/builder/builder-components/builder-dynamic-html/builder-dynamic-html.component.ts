import { Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, } from '@angular/core';
import { BuilderDynamicHtmlInterface, BuilderDynamicHtmlService } from './builder-dynamic-html.service';

@Component({
  selector: 'builder-dynamic-html',
  template: '',
})
export class BuilderDynamicHtmlComponent implements DoCheck, OnChanges, OnDestroy {
  @Input() content: string;
  private ref: BuilderDynamicHtmlInterface = null;

  constructor(
    private renderer: BuilderDynamicHtmlService,
    private elementRef: ElementRef,
  ) {
  }

  ngOnChanges(_: SimpleChanges) {
    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
    if (this.content && this.elementRef) {
      this.ref = this.renderer.renderInnerHTML(this.elementRef, this.content);
    }
  }

  ngDoCheck() {
    if (this.ref) {
      this.ref.check();
    }
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.destroy();
      this.ref = null;
    }
  }
}
