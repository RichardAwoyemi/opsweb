const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.firestore
  .document('users/{userId}').onCreate(() => {
    const ref = admin.firestore().collection('counters').doc('users');
    return admin.firestore().runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { counter: 1 });
        return 1;
      }
      const newCount = doc.data().counter + 1;
      transaction.update(ref, {
        counter: newCount,
      });
      return newCount;
    })
      .then((newCount: any) => {
        console.log(
          `Transaction successfully committed and new user count is '${newCount}'.`
        );
      })
      .catch((error: any) => {
        console.log('Transaction failed: ', error);
      });
  });

exports.createTask = functions.firestore
  .document('tasks/{taskId}').onCreate(() => {
    const ref = admin.firestore().collection('counters').doc('tasks');
    return admin.firestore().runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { backlog: 1 });
        return 1;
      }
      const newCount = doc.data().backlog + 1;
      transaction.update(ref, {
        backlog: newCount,
      });
      return newCount;
    })
      .then((newCount: any) => {
        console.log(
          `Transaction successfully committed and new task count is '${newCount}'.`
        );
      })
      .catch((error: any) => {
        console.log('Transaction failed: ', error);
      });
  });

exports.deleteUser = functions.firestore
  .document('users/{userId}').onDelete(() => {
    const ref = admin.firestore().collection('counters').doc('users');
    return admin.firestore().runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { counter: 0 });
        return 0;
      }
      const newCount = doc.data().counter - 1;
      transaction.update(ref, {
        counter: newCount,
      });
      return newCount;
    })
      .then((newCount: any) => {
        console.log(
          `Transaction successfully committed and new user count is '${newCount}'.`
        );
      })
      .catch((error: any) => {
        console.log('Transaction failed: ', error);
      });
  });

exports.deleteTask = functions.firestore
  .document('tasks/{taskId}').onCreate(() => {
    const ref = admin.firestore().collection('counters').doc('tasks');
    return admin.firestore().runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { backlog: 0 });
        return 0;
      }
      const newCount = doc.data().backlog - 1;
      transaction.update(ref, {
        backlog: newCount,
      });
      return newCount;
    })
      .then((newCount: any) => {
        console.log(
          `Transaction successfully committed and new task count is '${newCount}'.`
        );
      })
      .catch((error: any) => {
        console.log('Transaction failed: ', error);
      });
  });

exports.getAllUsers = functions.https.onRequest((req: any, res: any) => {
  const users: Array<any> = [];
  return admin.auth().listUsers().then((userRecords: any) => {
    userRecords.users.forEach((user: any) => (users.push(user)));
    res.set('Access-Control-Allow-Origin', "*");
    res.end(JSON.stringify(users));
    console.log('Request successful!');
  }).catch((error: any) => console.log('Request failed: ', error));
})

exports.countAllUsers = functions.https.onRequest((req: any, res: any) => {
  const users: Array<any> = [];
  return admin.auth().listUsers().then((userRecords: any) => {
    userRecords.users.forEach((user: any) => (users.push(user)));
    const count: String = `{ "count": ${users.length} }`;
    res.set('Access-Control-Allow-Origin', "*");
    res.end(count);
    console.log('Request successful!');
  }).catch((error: any) => console.log('Request failed: ', error));
});
