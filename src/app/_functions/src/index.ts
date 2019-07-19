const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.token);
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
})

// When a user is created, register them with Stripe
exports.createStripeCustomer = functions.firestore
  .document('users/{userId}').onCreate(async (snap: any) => {  
    const user = snap.data();
    const customer = await stripe.customers.create({email: user.email});
    return snap.ref.set({stripeId: customer.id}, {merge: true});
});

// Charge the Stripe customer whenever an amount is written to the Realtime database
exports.createStripeCharge = functions.firestore
  .document('users/{userId}/payments/{id}').onCreate(async (snap: any , context: any) => {
    const chargeData = snap.data();
    try {
      // Look up the Stripe customer id written in createStripeCustomer
      const customerSnapshot = await admin.firestore().collection('users').doc(context.params.userId).get()
      const customer = customerSnapshot.data().stripeId;
      
      // Create a charge using the pushId as the idempotency key
      // protecting against double charges
      const idempotencyKey = context.params.id;
      const amount = chargeData.amount;
      const currency = chargeData.currency;
      const source = chargeData.source;
      const charge = {amount, currency, source, customer};

      console.log(charge);

      const response = await stripe.charges.create(charge, {idempotency_key: idempotencyKey});
      // If the result is successful, write it back to the database
      return snap.ref.set(response, { merge: true });
    } catch(error) {
      console.log(error);
  }
});