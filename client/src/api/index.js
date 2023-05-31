import axios from "axios";

const baseURL = "http://127.0.0.1:5001/fullstack-food-app-react/us-central1/app";
const apiURL = "http://127.0.0.1:5001/fullstack-food-app-react/us-central1/app";

export const validateUserJWTToken = async (token) => {
    try {
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
            headers: { Authorization: "Bearer " + token },
        });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//add new product
export const addNewProduct = async (data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}


//get all products
export const getAllProducts = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/all`);
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//delete a product
export const deleteAProduct = async (productId) => {
    try {
        const res = await axios.delete(`${baseURL}/api/products/delete/${productId}`);
        console.log("delete from api", res.data.data)
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//get all users
export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/users/allUsers`);
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//add new item to cart
export const addNewItemToCart = async (user_id, data) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/addToCart/${user_id}`, { ...data });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//get all cartitems
export const getAllCartItems = async (user_id) => {
    try {
        const res = await axios.get(`${baseURL}/api/products/getCartItems/${user_id}`);
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//cart increment

export const incrementItemQuantity = async (user_id, productId, type) => {
    console.log(user_id, productId, type)
    try {
        const res = await axios.post(`${baseURL}/api/products/updateCart/${user_id}`, null, { params: { productId: productId, type: type } });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}
//sending body data as null

//cart decrement
export const decrementItemQuantity = async (user_id, productId, type) => {
    console.log(user_id, productId, type)
    try {
        const res = await axios.post(`${baseURL}/api/products/updateCart/${user_id}`, null, { params: { productId: productId, type: type } });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}


//get all orders
export const getAllOrders = async () => {
    try {
        const res = await axios.get(`${baseURL}/api/products/orders`);
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}

//update order sts
export const updateOrderSts = async (order_id, sts) => {
    try {
        const res = await axios.post(`${baseURL}/api/products/updateOrder/${order_id}`, null, { params: { sts: sts } });
        return res.data.data;
    }
    catch (err) {
        return err;
    }
}
