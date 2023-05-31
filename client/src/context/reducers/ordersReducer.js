const ordersReducer = (state = null, action) => {
    switch (action.type) {
        case "GET_ALL_ORDERS":
            return state;

        case "SET_ALL_ORDERS":
            return action.orders;

        default:
            return state;
    }
};

export default ordersReducer;