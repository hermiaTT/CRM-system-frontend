export const initialState = {
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
    loading: false,
    error: null,
    showModal: false
}

const customerReducer = (state, action) => {
    const {type, payload} = action;
    switch (type){
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
        case "OPEN_MODAL":
            return {
                ...state,
                showModal: true,
                error: null
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                showModal: false,
                error: null
            };
        default:
            return state;

    }
};

export default customerReducer;