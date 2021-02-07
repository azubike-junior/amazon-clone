/* eslint-disable quotes */
const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Ge76CJ1vDysMZa4t47APsniHP5uDQtJxjFA9DnT7wYDZdRFuxemRog2SooISGSFviqog6MIRzwpolst3aZLAUNH00JlR0KpSk')

const app = express();

app.use(cors({ origin: true}));
app.use(express.json());

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log('====== total', total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency:"usd"
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

exports.api = functions.https.onRequest(app)

// http://localhost:5001/clone-5bfc5/us-central1/api