/* eslint-disable */
const router = require("express").Router()
const admin = require('firebase-admin')

let data = [];

router.get("/", (req, res) => {
    return res.send("initial user route ");
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

//listAllUsers function
const listAllUsers = async (nextPageToken) => {
    // List batch of users, 1000 at a time.
    admin
        .auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            listUsersResult.users.forEach((userRecord) => {
                console.log('user', userRecord.toJSON());
                data.push(userRecord.toJSON());
            });
            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);
            }
        })
        .catch((error) => {
            console.log('Error listing users:', error);
        });
};
// Start listing users from the beginning, 1000 at a time.
//listAllUsers();

router.get("/allUsers", async (req, res) => {
    listAllUsers();
    try {
        console.log('from user')
        return res.status(200).send({ success: true, data: data, dataCount: data.length });
    }
    catch (error) {
        return res.send({
            success: false, msg: `Error in listning users : ${err}`
        });
    }
})

//delete user function
const deleteUser = async (uid) => {
    admin
        .auth()
        .deleteUser(uid)
        .then((result) => {
            console.log('Successfully deleted user');

        })
        .catch((error) => {
            console.log('Error deleting user:', error);
        });
}

router.get("/delete/:uid", async (req, res) => {
    const uid = req.params.uid;
    deleteUser(uid);

    try {
        console.log('delete from user')
        return res.status(200).send({ success: true, data: uid });
    }
    catch (error) {
        return res.send({
            success: false, msg: `Error deleteing user : ${err}`
        });
    }
})


module.exports = router