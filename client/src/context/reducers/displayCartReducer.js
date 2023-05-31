const cartReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_CART_DISPLAY_STATE":
            return state;

        case "SET_CART_VISIBLE":
            return true;

        case "SET_CART_INVISIBLE":
            return false;

        default:
            return state;
    }
};

export default cartReducer;