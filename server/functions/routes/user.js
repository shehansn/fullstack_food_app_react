/* eslint-disable */
const router = require("express").Router()
const admin = require('firebase-admin')

router.get("/", (req, res) => {
    return res.send("initial route user");
});

router.get("/jwtVerification", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(500).send({ msg: "Authorization Token Not Found " });
    }
    const token = req.headers.authorization.split(" ")[1];

    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(500).json({ success: false, msg: "Unautherized access" });
        }
        return res.status(200).send({ success: true, data: decodeValue });
    }
    catch (err) {
        return res.send({
            success: false, msg: `Error in extracting the token:${err}`
        });
    }
});

module.exports = router