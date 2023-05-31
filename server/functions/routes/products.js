/* eslint-disable */
const router = require("express").Router()
const admin = require('firebase-admin')
const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });
const stripe = require('stripe')(process.env.STRIPE_KEY)
const express = require('express')

router.get("/", (req, res) => {
    return res.send("initial product router ");
});

//add new product
router.post("/create", async (req, res) => {
    try {
        const id = Date.now();
        const data = {
            productId: id,
            product_name: req.body.product_name,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            imageURL: req.body.imageURL,
        }
        const response = await db.collection("products").doc(`/${id}/`).set(data);
        console.log("response from backend products", response);
        return res.status(200).send({ success: true, data: response });
    }
    catch (err) {
        return res.send({ success: false, msg: `Error :${err}` });
    }

});

//get all products
router.get("/all", async (req, res) => {

    (async () => {
        try {

            let query = db.collection("products");
            let response = [];
            await query.get().then((querysnap) => {
                let docs = querysnap.docs;
                docs.map((doc) => {
                    response.push({ ...doc.data() });
                });
                return response;
            });

            return res.status(200).send({ success: true, data: response });
        }
        catch (err) {
            return res.send({ success: false, msg: `Error :${err}` });
        }
    })();


});

//delete a product
router.delete("/delete/:productId", async (req, res) => {

    const productId = req.params.productId;

    try {
        await db.collection("products").doc(`/${productId}/`).delete().then((result) => {
            return res.status(200).send({ success: true, data: result });
        });
    }
    catch (err) {
        return res.send({ success: false, msg: `Error :${err}` });
    }


});

//add to cart
router.post("/addToCart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {

        const doc = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .get();

        if (doc.data()) {
            const quantity = doc.data().quantity + 1
            const updateItem = await db
                .collection("cartItems")
                .doc(`/${userId}/`)
                .collection("items")
                .doc(`/${productId}/`)
                .update({ quantity });
            return res.status(200).send({ success: true, data: updateItem });
        } else {
            const data = {
                productId: productId,
                product_name: req.body.product_name,
                product_category: req.body.product_category,
                product_price: req.body.product_price,
                imageURL: req.body.imageURL,
                quantity: 1
            }
            const addItem = await db
                .collection("cartItems")
                .doc(`/${userId}/`)
                .collection("items")
                .doc(`/${productId}/`)
                .set(data);
            return res.status(200).send({ success: true, data: addItem });
        }

    }
    catch (err) {
        return res.send({ success: false, msg: `Error :${err}` });
    }

});

//update cart increate decrease cart items
router.post("/updateCart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const productId = req.query.productId;
    const type = req.query.type;

    try {

        const doc = await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .get();

        if (doc.data()) {
            if (type === "increment") {
                const quantity = doc.data().quantity + 1
                const updateItem = await db
                    .collection("cartItems")
                    .doc(`/${userId}/`)
                    .collection("items")
                    .doc(`/${productId}/`)
                    .update({ quantity });
                return res.status(200).send({ success: true, data: updateItem });
            } else {
                if (doc.data().quantity === 1) {
                    await db
                        .collection("cartItems")
                        .doc(`/${userId}/`)
                        .collection("items")
                        .doc(`/${productId}/`)
                        .delete()
                        .then((result) => {
                            return res.status(200).send({ success: true, data: result });
                        })
                }
                else {
                    const quantity = doc.data().quantity - 1
                    const updateItem = await db
                        .collection("cartItems")
                        .doc(`/${userId}/`)
                        .collection("items")
                        .doc(`/${productId}/`)
                        .update({ quantity });
                    return res.status(200).send({ success: true, data: updateItem });
                }

            }

        } else {

            return res.status(500).send({ success: false, data: addItem });
        }

    }
    catch (err) {
        return res.send({ success: false, msg: `Error :${err}` });
    }

});

//get all the cart items for that user 
router.get("/getCartItems/:user_id", async (req, res) => {
    const userId = req.params.user_id;

    (async () => {
        try {

            let query = db
                .collection("cartItems")
                .doc(`/${userId}/`)
                .collection("items");
            let response = [];

            await query.get().then((querysnap) => {
                let docs = querysnap.docs;

                docs.map((doc) => {
                    response.push({ ...doc.data() });
                });
                return response;
            });

            return res.status(200).send({ success: true, data: response });
        }
        catch (err) {
            return res.send({ success: false, msg: `Error :${err}` });
        }
    })();


});

//accept payment stripe
router.post('/create-checkout-session', async (req, res) => {
    console.log("data in create-checkout-session", req.body)
    console.log("running in create-checkout-session")
    const customer = await stripe.customers.create({
        metadata: {
            user_id: req.body.data.user.user_id,
            cart: JSON.stringify(req.body.data.cartItems),
            total: req.body.data.total,
        }
    })
    const line_items = req.body.data.cartItems.map(item => {
        return {
            price_data: {
                currency: 'LKR',
                product_data: {
                    name: item.product_name,
                    images: [item.imageURL],
                    metadata: {
                        id: item.productId
                    }
                },
                unit_amount: item.product_price * 100,
            },
            quantity: item.quantity,
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ['LK'],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {
                        amount: 0,
                        currency: 'lkr',
                    },
                    display_name: 'Free shipping',
                    delivery_estimate: {
                        minimum: {
                            unit: 'business_day',
                            value: 2,
                        },
                        maximum: {
                            unit: 'business_day',
                            value: 5,
                        },
                    },
                },
            },
        ],
        line_items,
        customer: customer.id,
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success`,
        cancel_url: `${process.env.CLIENT_URL}/`,
    });
    res.send({ url: session.url })
    console.log("session url from server", session.url);

});

// This is Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;
//const endpointSecret = process.env.WEBHOOK_SECRET_KEY

router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
    const sig = req.headers['stripe-signature'];

    let eventType;
    let data;

    if (endpointSecret) {
        let event;
        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        } catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }

    if (eventType === 'checkout.session.completed') {

        stripe.customers.retrieve(data.customer).then((customer) => {
            console.log('customer details from webhook', customer)
            console.log('data from webhook', data)
            createOrder(customer, data, res)
        })


    } else {
        console.log("checkout.session.not completed")
    }
    res.send().end();//to avoid writing others data fter all finish
});


const createOrder = async (customer, intent, res) => {
    console.log('inside orders')
    try {
        const orderId = Date.now();
        const data = {
            intentId: intent.id,
            orderId: orderId,
            amount: intent.amount_total,
            created: intent.created,
            payment_method_types: intent.payment_method_types,
            status: intent.payment_status,
            customer: intent.customer_details,
            shipping_details: intent.shipping_details,
            userId: customer.metadata.user_id,
            items: JSON.parse(customer.metadata.cart),
            total: customer.metadata.total,
            sts: "processing",

        }
        console.log("data before saving order", data)
        await db.collection("orders").doc(`/${orderId}/`).set(data);
        deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));
        console.log("*****************************************")

        return res.status(200).send({ success: true });
    }
    catch (err) {
        console.log(err)
    }
}

const deleteCart = async (userId, items) => {
    console.log('inside orders')
    console.log(userId);

    console.log("------------------------------------------")
    items.map(async (data) => {
        console.log("data insidide items.map", data)
        console.log('^^^^^^^^^^^^^^^^^indide orders^^^^^^^^^^', userId, data.productId);
        await db
            .collection("cartItems")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${data.productId}/`)
            .delete()
            .then(() => {
                console.log('cart items delete success')
            })
    })
}



//get all orders
router.get("/orders", async (req, res) => {

    (async () => {
        try {

            let query = db.collection("orders");
            let response = [];
            await query.get().then((querysnap) => {
                let docs = querysnap.docs;
                docs.map((doc) => {
                    response.push({ ...doc.data() });
                });
                return response;
            });

            return res.status(200).send({ success: true, data: response });
        }
        catch (err) {
            return res.send({ success: false, msg: `Error :${err}` });
        }
    })();


});


//update the order status

//update cart increate decrease cart items
router.post("/updateOrder/:order_id", async (req, res) => {
    const order_id = req.params.order_id;
    const sts = req.query.sts;

    try {
        const updateItem = await db
            .collection("orders")
            .doc(`/${order_id}/`)
            .update({ sts });
        return res.status(200).send({ success: true, data: updateItem });

    }
    catch (err) {
        return res.send({ success: false, msg: `Error :${err}` });
    }

});

module.exports = router