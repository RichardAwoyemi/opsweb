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

  public getAppStoreLink(userAgentString: string) {
    if (userAgentString.indexOf('iPhone') > -1 ||
      userAgentString.indexOf('iPod') > -1 ||
      userAgentString.indexOf('iPad') > -1) {
      return this.IOS_APP_URL;
    } else if (/Android/.test(userAgentString)) {
      return this.ANDROID_APP_URL;
    }
  }

  public showLandingPage() {
    const url = window.location.href;
    let landingPageActive = true;
    if (url.includes('localhost') || url.includes('herokuapp')) {
      landingPageActive = false;
    }
    return landingPageActive;
  }
}
