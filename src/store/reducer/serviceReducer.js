export const initialState = {
    services: [],
    tableColumn: [     

    ],

    service:{
        id: 3,
        serviceType: "",
        servicePrice: 0,
        isTaxed: false,
        tips: 0,
        totalPaid: 0,
        serviceDate: "",
        serviceImg:"" ,
        customerId: "",
        employeeId: "",
        customerName:"" ,
        employeeName: "",
    },
    showModal: false,
    errors: ""
}

const serviceReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case "GET_SERVICES_SUCCESS":
            return {
                ...state,
                loading:false,
                services: payload
            }
        case "GET_SERVICES_FAILURE":
            return {
                ...state,
                loading:false,
                errors: payload
            }
        case "OPEN_EDIT_SERVICE":
            return {
                ...state,
                service: payload.service,
                showModal: true
            }
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
}

export default serviceReducer;