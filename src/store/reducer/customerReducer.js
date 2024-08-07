export const initialState = {
    customers: [],
    tableColumn:[
        { id: "id", label: "Id", numeric: true, disablePadding: true },
        { id: "fullName", label: "Customer Name", numeric: false, disablePadding: false },
        { id: "phoneNumber", label: "Phone Number", numeric: false, disablePadding: false },
        { id: "vipType", label: "VIP Type", numeric: false, disablePadding: false },
        { id: "balance", label: "Balance", numeric: true, disablePadding: false },
        { id: "firstLanguage", label: "First Language", numeric: false, disablePadding: false },
        { id: "comingResource", label: "Visit Resource", numeric: false, disablePadding: false },
        { id: "birthday", label: "Birth Day", numeric: false, disablePadding: false,
            renderCell: (params) => {
                const date = new Date(params.value);
                const formattedDate = date.toISOString().split('T')[0];
                return formattedDate;
            }
        },
        { id: "note", label: "note", numeric: false, disablePadding: false },
    ],
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
    error: null,
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
                error: payload
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
                error: payload
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
                error: null
            };
        case "CLOSE_MODAL":
            console.log("OCLOSE_MODAL", payload);
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