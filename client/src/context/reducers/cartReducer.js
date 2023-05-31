const cartReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_CART_ITEMS":
            return state;

        case "SET_CART_ITEMS":
            return action.cartItems;

        case "SET_CART_ITEMS_NULL":
            return action.cartItems;

        default:
            return state;
    }
};

export default cartReducer;