import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: 'AIzaSyC1_kUGqJtNyOnvRcXxTrBcHb_3YdRr1bk',
    authDomain: 'opsonion-live.firebaseapp.com',
    databaseURL: 'https://opsonion-live.firebaseio.com',
    projectId: 'opsonion-live',
    storageBucket: 'opsonion-live.appspot.com',
    messagingSenderId: '202919224596'
  },
  logging: {
    level: NgxLoggerLevel.INFO,
  },
  referralMode: true
};
