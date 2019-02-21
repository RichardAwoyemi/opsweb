const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.firestore
  .document('users/{userId}').onCreate(() => {
    const userDocRef = admin.firestore().collection('counters').doc('users');
    return admin.firestore().runTransaction(function (transaction: any) {
      return transaction.get(userDocRef).then(function (userDoc: any) {
        if (!userDoc.exists) {
          userDocRef.set({ counter: 100 });
        }
        const newUserCount = userDoc.data().counter + 1;
        transaction.update(userDocRef, { counter: newUserCount });
      })
    }).then(function () {
      console.log('Transaction successfully committed!');
    }).catch(function (error: any) {
      console.log('Transaction failed: ', error);
    });
  });

exports.deleteUser = functions.firestore
  .document('users/{userId}').onDelete(() => {
    const userDocRef = admin.firestore().collection('counters').doc('users');
    return admin.firestore().runTransaction(function (transaction: any) {
      return transaction.get(userDocRef).then(function (userDoc: any) {
        if (!userDoc.exists) {
          userDocRef.set({ counter: 100 });
        }
        const newUserCount = userDoc.data().counter - 1;
        transaction.update(userDocRef, { counter: newUserCount });    
      })
    }).then(function () {
      console.log('Transaction successfully committed.');
    }).catch(function (error: any) {
      console.log('Transaction failed: ', error);
    });
  });