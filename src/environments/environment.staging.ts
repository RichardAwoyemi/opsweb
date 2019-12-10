import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: 'AIzaSyAq-YVZaMqmR8Scwkuhvoccr0mQC0JgV-4',
    authDomain: 'opsonion-dev.firebaseapp.com',
    databaseURL: 'https://opsonion-dev.firebaseio.com',
    projectId: 'opsonion-dev',
    storageBucket: 'opsonion-dev.appspot.com',
    messagingSenderId: '994826852330'
  },
  logging: {
    level: NgxLoggerLevel.DEBUG,
  },
  stripeId: 'pk_test_ofSdYFbZUTS9ZMMrk8fZHwe800bq0UGijl',
  firebaseApiUrl: 'https://us-central1-opsonion-dev.cloudfunctions.net'
};
