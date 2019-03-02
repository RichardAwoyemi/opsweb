export class UtilService {
  IOS_APP_URL = 'https://itunes.apple.com';
  ANDROID_APP_URL = 'https://play.google.com';

  toTitleCase(str) {
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
}
