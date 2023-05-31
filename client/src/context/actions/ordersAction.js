/* eslint-disable */
export const setAllOrders = (orders) => {
    return {
        type: "SET_ALL_ORDERS",
        orders: orders,
    };
};

export const getAllOrders = () => {
    return {
        type: "GET_ALL_ORDERS",
    };
};