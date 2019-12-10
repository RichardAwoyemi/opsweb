import { Injectable } from '@angular/core';

@Injectable()
export class UtilService {
  static toTitleCase(str: string) {
    str = str.replace(/^\s+|\s+$/gm, '');
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  static convertToHtmlTag(text: string) {
    return '<' + text + '></' + text + '/>';
  }

  static generateRandomString(length) {
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

  static dedupeAdjacent(a, targets) {
    return a.filter((e, i) => e !== a[i - 1] || !targets.includes(e));
  }

  static createYearRange(start, end) {
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

  static roundNumber(n: any, digits: number) {
    let negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    const multiplier = Math.pow(10, digits);
    n = parseFloat((n * multiplier).toFixed(11));
    n = (Math.round(n) / multiplier).toFixed(2);
    if (negative) {
      n = (n * -1).toFixed(2);
    }
    return n;
  }

  static copyMessage(referralUrl) {
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

  static getCurrentDate() {
    const date = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'];
    return `${ date.getDate() } ${ months[date.getMonth()] } ${ date.getFullYear() }`;
  }
}
