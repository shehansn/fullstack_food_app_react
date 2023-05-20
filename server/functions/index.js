/* eslint-disable eol-last */
/* eslint-disable object-curly-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccounKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser for our json data
app.use(express.json());

// cross origin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    next();
});

// firebase credentials
admin.initializeApp({
    credential: admin.credential.cert(serviceAccounKey),
});

// api endpoints
app.get("/", (req, res) => {
    return res.send("response get for intioal stage");
});

exports.app = functions.https.onRequest(app);