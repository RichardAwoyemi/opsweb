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

exports.getWebsiteNameById = functions.https.onRequest((req: any, res: any) => {
  let websiteId = req.url.split("/");
  websiteId = websiteId[websiteId.length - 1];
  res.set('Access-Control-Allow-Origin', '*');
  const website = admin.firestore().collection('websites').doc(websiteId).get();
  return website.then(function (response: any) {
    if (response.data()) {
      res.end(`{ "websiteName": "${response.data()['name']}" }`);
    } else {
      res.end(`{ "websiteName": null }`);
    }
    console.log('Request successful!');
  }).catch((error: any) => console.log('Request failed: ', error));
});

exports.getWebsiteIdByName = functions.https.onRequest((req: any, res: any) => {
  let websiteName = req.url.split("/");
  websiteName = websiteName[websiteName.length - 1];
  res.set('Access-Control-Allow-Origin', '*');
  const website = admin.firestore().collection('websites', (ref: any) => ref.where('name', '==', websiteName).limit(1)).get();
  return website.then(function (response: any) {
    if (response.empty) {
      res.end(`{ "websiteId": null }`);
    } else {
      res.end(`{ "websiteId": ${JSON.stringify(response.docs[0].data()['id'])} }`);
    }
    console.log('Request successful!');
  }).catch((error: any) => console.log('Request failed: ', error));
});
