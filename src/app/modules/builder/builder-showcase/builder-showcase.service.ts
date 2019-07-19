import { Injectable } from '@angular/core';

@Injectable()
export class BuilderShowcaseService {
  static loadIframeCss(document: any, href) {
    let css = document.createElement('link');
    css.href = href;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);
  }

  static loadIframeJs(document: any, src) {
    let js = document.createElement('script');
    js.src = src;
    document.head.appendChild(js);
  }
}
