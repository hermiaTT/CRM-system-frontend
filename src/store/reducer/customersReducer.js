export const initialState = {
    customers: [],
    loading:false,
    error: null,
};

const customersReducer = (state, action) => {
    const {type, payload} = action;

    switch (type){
        case "GET_CUSTOMERS_SUCCESS":
            console.log("GET_CUSTOMERS_SUCCESS", payload);
            return {
                ...state,
                loading: false,
                customers: payload
            };
        case "GET_CUSTOMERS_FAILURE":
            console.log("GET_CUSTOMERS_FAILURE", payload);
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default customersReducer;