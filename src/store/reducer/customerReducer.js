export const initialState = {
    customers: [],
    customer: {
        firstName: "",
        lastName: "",
        phoneNumber: "",
        isVip: false,
        vipType: "",
        balance: 0,
        firstLanguage: "Madrian",
        comingResource: "",
        birthday: "",
        note: "",
    },
    showModal: false,
    loading:false,
    errors: null,
};

const customerReducer = (state, action) => {
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
                errors: payload
            };
        case "DELETE_CUSTOMER_OPTIMISTIC":
            return {
                ...state,
                customers: state.customers.filter(customer => customer.id !== payload),
            };
        case "DELETE_CUSTOMER_FAILURE":
            console.log("DELETE_CUSTOMER_FAILURE", payload);
            return {
                ...state,
                loading: false,
                errors: payload
            };
        //get single customer
        case "GET_CUSTOMER":
            console.log("GET_CUSTOMER", payload);
            return{
                ...state,
                loading: false,
                customer: payload
            };
        case "SUBMIT_CUSTOMER_SUCCESS":
            return{
                ...state,
                loading:false,
                customer: payload,
                showModal: false,
            };
        case "SUMBIT_CUSTOMER_FAILURE":
            console.log("SUMBIT_CUSTOMER_FAILURE", payload);
            return {
                ...state,
                loading: false,
                error: payload,
                showModal: true
            };
        case "OPEN_EDIT_CUSTOMER":
            console.log("OPEN_EDIT_CUSTOMER", payload)
            return {
                ...state,
                customer: payload.customer,
                showModal: true
            };
            
        case "OPEN_MODAL":
            console.log("OPEN_MODAL", payload);
            return {
                ...state,
                showModal: true,
                errors: null
            };
        case "CLOSE_MODAL":
            console.log("OCLOSE_MODAL", payload);
            return {
                ...state,
                showModal: false,
                errors: null
            };
        default:
            return state;

    }
};

export default customerReducer;