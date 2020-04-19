const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_cGAKgwczAAjmWfwDmdM3zqTQ00DhroAFOV');
const cors = require('cors')({ origin: true });

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.CheckoutSession = functions.https.onRequest((request, response) => {

    cors(request, response, () => {
        stripe.checkout.sessions.create({
            success_url: '',
            cancel_url: '',
            payment_method_types: ['card'],
            line_items: [{

            }]
        }, function (err, session) {
            response.send(session);
        });
    });
})