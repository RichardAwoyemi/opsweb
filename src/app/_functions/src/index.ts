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

exports.deleteUser = functions.firestore
  .document('users/{userId}').onDelete(() => {
    const ref = admin.firestore().collection('counters').doc('users');
    return admin.firestore().runTransaction(async (transaction: any) => {
      const doc = await transaction.get(ref);
      if (!doc.exists) {
        transaction.set(ref, { counter: 100 });
        return 100;
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