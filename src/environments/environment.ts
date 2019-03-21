import { NgxLoggerLevel } from 'ngx-logger';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyAq-YVZaMqmR8Scwkuhvoccr0mQC0JgV-4',
    authDomain: 'opsonion-dev.firebaseapp.com',
    databaseURL: 'https://opsonion-dev.firebaseio.com',
    projectId: 'opsonion-dev',
    storageBucket: 'opsonion-dev.appspot.com',
    messagingSenderId: '994826852330'
  },
  referralMode: true,
  logging: {
    level: NgxLoggerLevel.DEBUG,
  },
  firebaseApiUrl: 'https://us-central1-opsonion-dev.cloudfunctions.net'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
