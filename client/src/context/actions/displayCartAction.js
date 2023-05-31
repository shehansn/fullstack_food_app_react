export const setCartVisible = (data) => {
    return {
        type: "SET_CART_VISIBLE",

    };
};
export const setCartInVisible = (data) => {
    return {
        type: "SET_CART_INVISIBLE",

    };
};

export const getCartDisplayState = () => {
    return {
        type: "GET_CART_DISPLAY_STATE",
    };
};