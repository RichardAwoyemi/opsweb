import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class UtilService {
  IOS_APP_URL = 'https://itunes.apple.com';
  ANDROID_APP_URL = 'https://play.google.com';
  AIRTABLE_FORM_URL = 'https://airtable.com/shrRf5gBoMn300PBp';

  constructor(
    private logger: NGXLogger
  ) { }

  toTitleCase(str) {
    str = str.replace(/^\s+|\s+$/gm, '');
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  generateRandomString(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'.split('');
    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  getAppStoreLink(userAgentString: string) {
    if (userAgentString.indexOf('iPhone') > -1 ||
      userAgentString.indexOf('iPod') > -1 ||
      userAgentString.indexOf('iPad') > -1) {
      return this.IOS_APP_URL;
    } else if (/Android/.test(userAgentString)) {
      return this.ANDROID_APP_URL;
    }
  }

  createYearRange(start, end) {
    const s = new Date(start);
    const startYear = s.getFullYear();

    const e = new Date(end);
    const endYear = e.getFullYear();
    const arr = Array();

    for (let i = startYear; i <= endYear; i++) {
      arr.push(i);
    }

    return arr;
  }

  roundNumber(n: any, digits: number) {
    let negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    const multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if (negative) {
      n = (n * -1).toFixed(2);
    }
    return n;
  }

  setButtonAlignment(position) {
    if (position === 'center') {
      return 'gap-xy text-center';
    }
    if (position === 'left') {
      return 'gap-xy';
    }
  }

  openAirtableForm() {
    window.open(this.AIRTABLE_FORM_URL, '_blank');
  }

  copyMessage(referralUrl) {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.style.left = '0';
    selectBox.style.top = '0';
    selectBox.style.opacity = '0';
    selectBox.value = referralUrl;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    return;
  }
}