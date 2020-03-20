import { Injectable } from '@angular/core';

@Injectable()
export class IframeService {
  static loadIframeCss(document: any, href) {
    const css = document.createElement('link');
    css.href = href;
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.head.appendChild(css);
  }

  static loadIframeJs(document: any, src) {
    const js = document.createElement('script');
    js.src = src;
    document.head.appendChild(js);
  }
}
