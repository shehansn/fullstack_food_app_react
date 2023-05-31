/* eslint-disable */
export const setCartItems = (items) => {
    return {
        type: "SET_CART_ITEMS",
        cartItems: items,
    };
};

export const getCartItems = () => {
    return {
        type: "GET_CART_ITEMS",
    };
};

export const setCartItemsNull = () => {
    return {
        type: "SET_CART_ITEMS_NULL",
        cartItems: null,
    };
};
