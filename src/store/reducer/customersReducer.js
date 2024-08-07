//about to delete
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