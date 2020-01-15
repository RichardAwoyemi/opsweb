const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getAllUsers = functions.https.onRequest((req: any, res: any) => {
  const users: Array<any> = [];
  return admin.auth().listUsers().then((userRecords: any) => {
    userRecords.users.forEach((user: any) => (users.push(user)));
    res.set('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(users));
    console.log('Request successful!');
  }).catch((error: any) => console.log('Request failed: ', error));
});

exports.countAllUsers = functions.https.onRequest((req: any, res: any) => {
  const users: Array<any> = [];
  return admin.auth().listUsers().then((userRecords: any) => {
    userRecords.users.forEach((user: any) => (users.push(user)));
    const count: String = `{ "count": ${users.length} }`;
    res.set('Access-Control-Allow-Origin', '*');
    res.end(count);
    console.log('Request successful!');
  }).catch((error: any) => console.log('Request failed: ', error));
});
